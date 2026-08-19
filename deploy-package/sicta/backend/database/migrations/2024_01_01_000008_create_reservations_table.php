<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('numero_reservation')->unique();
            $table->foreignId('station_id')->nullable()->constrained('stations')->nullOnDelete();
            $table->enum('categorie_vehicule', ['moto', 'auto', 'pl']);
            $table->string('puissance_cv')->nullable();
            $table->string('immatriculation');
            $table->string('prenom');
            $table->string('nom');
            $table->string('telephone');
            $table->date('date_rdv');
            $table->string('heure_rdv');
            $table->enum('statut', ['en_attente', 'confirmee', 'annulee', 'realisee'])->default('en_attente');
            $table->text('note_interne')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('reservations'); }
};
