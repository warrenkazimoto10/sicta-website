const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sicta_bd'
    });
    
    console.log('✅ Connexion MySQL réussie !');
    console.log('Base de données:', process.env.DB_NAME || 'sicta_bd');
    
    // Test simple : compter les tables
    const [tables] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [process.env.DB_NAME || 'sicta_bd']);
    
    console.log('✅ Tables trouvées:', tables[0].count);
    
    // Lister les tables
    const [tableList] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
      ORDER BY table_name
    `, [process.env.DB_NAME || 'sicta_bd']);
    
    console.log('\n📋 Tables dans la base de données:');
    tableList.forEach(table => {
      console.log('  -', table.table_name);
    });
    
    await connection.end();
    console.log('\n✅ Test terminé avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.error('\n💡 Vérifiez:');
    console.error('  1. MySQL est démarré');
    console.error('  2. La base de données "sicta_bd" existe');
    console.error('  3. Les identifiants dans .env sont corrects');
    if (connection) {
      await connection.end();
    }
    process.exit(1);
  }
}

testConnection();
