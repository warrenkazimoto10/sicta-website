<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->string('slug')->unique();
            $table->foreignId('categorie_id')->nullable()->constrained('categories_articles')->nullOnDelete();
            $table->string('image_principale')->nullable();
            $table->text('extrait')->nullable();
            $table->longText('contenu')->nullable();
            $table->string('auteur')->nullable();
            $table->unsignedInteger('temps_lecture')->nullable();
            $table->date('date_publication')->nullable();
            $table->enum('statut', ['brouillon', 'publie', 'archive'])->default('brouillon');
            $table->boolean('a_la_une')->default(false);
            $table->boolean('tendance')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down(): void { Schema::dropIfExists('articles'); }
};
