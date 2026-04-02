<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('measurements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('height', 8, 2)->nullable();
            $table->decimal('chest', 8, 2)->nullable();
            $table->decimal('waist', 8, 2)->nullable();
            $table->decimal('hips', 8, 2)->nullable();
            $table->decimal('shoulders', 8, 2)->nullable();
            $table->decimal('arm_length', 8, 2)->nullable();
            $table->decimal('inseam', 8, 2)->nullable();
            $table->decimal('neck', 8, 2)->nullable();
            $table->decimal('sleeve_length', 8, 2)->nullable();
            $table->decimal('thigh', 8, 2)->nullable();
            $table->decimal('calf', 8, 2)->nullable();
            $table->enum('method', ['manual', 'ai'])->default('manual');
            $table->decimal('ai_confidence_score', 5, 2)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('measurements');
    }
};