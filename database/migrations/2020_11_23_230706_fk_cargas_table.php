<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkCargasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cargas', function (Blueprint $table) {
            $table->foreign('parentesco_id')->references('id')->on('parentescos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('socio_id')->references('id')->on('socios')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cargas', function (Blueprint $table) {
            //
        });
    }
}
