<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('service_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained('services')->cascadeOnDelete();
            // type de bloc : intro | avantages | etapes | tarifs | documents | faq | texte | cta | custom
            $table->string('type', 20);
            $table->string('titre')->nullable();
            $table->string('sous_titre')->nullable();
            // charge utile dont la forme dépend du type
            $table->json('contenu')->nullable();
            $table->unsignedInteger('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('service_sections'); }
};
