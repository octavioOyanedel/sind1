<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkResidenciaSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('residencia_socios', function (Blueprint $table) {
            $table->foreign('distrito_id')->references('id')->on('distritos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('provincia_id')->references('id')->on('provincias')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('comuna_id')->references('id')->on('comunas')->onUpdate('cascade')->onDelete('set null');
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
        Schema::table('residencia_socios', function (Blueprint $table) {
            //
        });
    }
}
