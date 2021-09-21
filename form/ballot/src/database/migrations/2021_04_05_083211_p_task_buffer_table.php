<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PTaskBufferTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('p_task_buffer', function (Blueprint $table) {
            $table->id('p_task_buffer_id')->autoIncrement();
            $table->integer('pgu_user_id')->nullable();
            $table->string('plugin_name', 255)->nullable();
            $table->string('ext_id', 255)->nullable();
            $table->text('data')->nullable()->nullable();
            $table->integer('task_priority')->default(0);
            $table->integer('attempts')->default(0);
            $table->integer('max_attempts')->nullable();
            $table->integer('created_at')->default(0);
            $table->integer('try_till')->nullable();
            $table->integer('next_attempt_time')->default(0);
            $table->integer('unlock_time')->nullable();
            $table->smallInteger('failed');
            $table->integer('process_id')->nullable();
            $table->integer('app_id')->nullable();
            $table->string('message');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('p_task_buffer');
    }
}
