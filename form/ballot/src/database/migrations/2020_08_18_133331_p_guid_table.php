<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PGuidTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('p_guid', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('vote_id')->index();
            $table->string('vote_ext_id');
            $table->string('guid')->index();
            $table->smallInteger('district');
            $table->string('session_id');
            $table->timestamp('vote_end');
            $table->timestamps();
            $table->boolean('opened')->default(false);
            $table->text('mdm_cypher')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('p_guid');
    }
}
