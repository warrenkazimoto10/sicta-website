<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('dossiers_galerie', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('categorie', ['agences', 'equipements', 'evenements', 'vehicules', 'autre'])->default('autre');
            $table->foreignId('article_id')->nullable()->constrained('articles')->nullOnDelete();
            $table->string('image_couverture')->nullable();
            $table->date('date')->nullable();
            $table->boolean('public')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('dossiers_galerie'); }
};
