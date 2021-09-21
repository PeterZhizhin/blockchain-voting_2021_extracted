<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PBallotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('p_ballot', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('rawStoreBallotTx', 2000);
            $table->string('guid', 255);
            $table->string('votingId', 255);
            $table->text('mdm_cypher');
            $table->string('accountAddressBlock', 64);
            $table->string('rawTxHash', 64);
            $table->string('keyVerificationHash', 64);
            $table->integer('district');
            $table->timestamp('created_at')->default('NOW()');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('p_ballot');
    }
}
