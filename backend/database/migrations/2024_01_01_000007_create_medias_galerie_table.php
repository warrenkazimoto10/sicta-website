<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('medias_galerie', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_id')->constrained('dossiers_galerie')->cascadeOnDelete();
            $table->enum('type', ['image', 'video'])->default('image');
            $table->string('fichier');
            $table->string('legende')->nullable();
            $table->unsignedInteger('ordre')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('medias_galerie'); }
};
