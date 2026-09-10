<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@sicta.ci'],
            [
                'name' => 'Administrateur SICTA',
                'email' => 'admin@sicta.ci',
                'password' => Hash::make('sicta2025!'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );
    }
}
