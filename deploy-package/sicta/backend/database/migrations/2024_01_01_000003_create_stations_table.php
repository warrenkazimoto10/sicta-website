<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('stations', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->enum('zone', ['abidjan', 'interieur']);
            $table->string('ville');
            $table->string('telephone');
            $table->string('horaires')->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->json('services_disponibles')->nullable();
            $table->string('texte_disponibilite')->nullable();
            $table->string('maps_url')->nullable();
            $table->boolean('actif')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    public function down(): void { Schema::dropIfExists('stations'); }
};
