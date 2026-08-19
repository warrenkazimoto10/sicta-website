<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('stations', function (Blueprint $table) {
            // Nom personnalisé affiché sur la carte (si vide, on utilise le nom réel de la station)
            $table->string('map_label')->nullable()->after('map_y');
        });
    }
    public function down(): void {
        Schema::table('stations', function (Blueprint $table) {
            $table->dropColumn('map_label');
        });
    }
};
