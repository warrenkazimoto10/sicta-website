<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('role')->nullable();
            $table->string('photo')->nullable();
            $table->string('email')->nullable();
            $table->string('linkedin')->nullable();
            $table->unsignedInteger('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });

        Schema::create('history_events', function (Blueprint $table) {
            $table->id();
            $table->string('annee', 20);
            $table->string('titre');
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->boolean('highlight')->default(false); // met la carte en avant (ex: année en cours)
            $table->unsignedInteger('ordre')->default(0);
            $table->boolean('actif')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('history_events');
        Schema::dropIfExists('team_members');
    }
};
