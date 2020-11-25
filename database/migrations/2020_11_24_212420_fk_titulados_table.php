<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkTituladosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('titulados', function (Blueprint $table) {
            $table->foreign('titulo_id')->references('id')->on('titulos')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('estudio_id')->references('id')->on('estudios')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('titulados', function (Blueprint $table) {
            //
        });
    }
}
