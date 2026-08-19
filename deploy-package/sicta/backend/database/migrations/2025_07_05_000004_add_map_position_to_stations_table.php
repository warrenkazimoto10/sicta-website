<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('stations', function (Blueprint $table) {
            // Position du point sur la carte uploadée (pourcentage 0–100, précision sub-pixel)
            $table->decimal('map_x', 6, 3)->nullable()->after('longitude');
            $table->decimal('map_y', 6, 3)->nullable()->after('map_x');
        });
    }
    public function down(): void {
        Schema::table('stations', function (Blueprint $table) {
            $table->dropColumn(['map_x', 'map_y']);
        });
    }
};
