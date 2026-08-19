<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->string('page', 50);
            $table->string('section_key', 100);
            $table->text('value')->nullable();
            $table->string('type', 20)->default('text');
            $table->timestamps();
            $table->unique(['page', 'section_key']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('page_sections');
    }
};
