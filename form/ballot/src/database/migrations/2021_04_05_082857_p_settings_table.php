<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('p_settings', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('title');
            $table->string('publicKey');
            $table->longText('ballot');
            $table->timestamp('update')->nullable();
            $table->string('ballotRef')->nullable();
            $table->timestamp('startTime');
            $table->timestamp('endTime');
            $table->string('extId');
            $table->integer('status');
            $table->string('status_text', 100)->nullable();
            $table->smallInteger('is_test');
            $table->smallInteger('min_choices')->nullable();
            $table->smallInteger('max_choices')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('p_settings');
    }
}
