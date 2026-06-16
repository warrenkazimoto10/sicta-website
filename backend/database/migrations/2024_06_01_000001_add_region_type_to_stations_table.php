<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('stations', function (Blueprint $table) {
            $table->string('region')->nullable()->after('longitude');
            $table->enum('type', ['permanent', 'periodique', 'mobile'])->default('permanent')->after('region');
        });
    }

    public function down(): void {
        Schema::table('stations', function (Blueprint $table) {
            $table->dropColumn(['region', 'type']);
        });
    }
};
