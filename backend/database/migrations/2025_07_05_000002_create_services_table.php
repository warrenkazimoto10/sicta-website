<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nom');
            $table->string('icone')->nullable();          // nom d'icône Lucide (ex: "Shield")
            $table->string('resume')->nullable();          // court résumé (carte liste services)
            $table->string('hero_titre')->nullable();
            $table->string('hero_sous_titre')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('meta_title')->nullable();
            $table->string('meta_description', 500)->nullable();
            // 'code' = page React codée (par défaut) ; 'cms' = rendu depuis les blocs en base
            $table->string('source', 10)->default('code');
            $table->unsignedInteger('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down(): void { Schema::dropIfExists('services'); }
};
