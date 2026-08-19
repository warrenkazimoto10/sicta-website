<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('map_points', function (Blueprint $table) {
            $table->id();
            // 'ville' : représente une ville (survol = liste des stations de la ville)
            // 'station' : représente une station précise (survol = détail de la station)
            $table->string('type', 10)->default('ville');
            $table->string('ville')->nullable();                 // pour type=ville (relie aux stations par leur champ ville)
            $table->foreignId('station_id')->nullable()->constrained('stations')->nullOnDelete(); // pour type=station
            $table->string('label')->nullable();                 // nom personnalisé affiché (repli = ville ou nom station)
            $table->string('icone', 50)->default('MapPin');      // nom d'icône Lucide
            $table->string('taille', 10)->default('moyen');      // grand | moyen | petit
            $table->decimal('x', 6, 3);                          // position % 0–100
            $table->decimal('y', 6, 3);
            $table->unsignedInteger('ordre')->default(0);
            $table->timestamps();
        });

        // Les points ne sont plus portés par les stations
        Schema::table('stations', function (Blueprint $table) {
            $table->dropColumn(['map_x', 'map_y', 'map_label']);
        });
    }

    public function down(): void {
        Schema::table('stations', function (Blueprint $table) {
            $table->decimal('map_x', 6, 3)->nullable();
            $table->decimal('map_y', 6, 3)->nullable();
            $table->string('map_label')->nullable();
        });
        Schema::dropIfExists('map_points');
    }
};
