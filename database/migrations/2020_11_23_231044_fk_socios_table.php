<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('socios', function (Blueprint $table) {
            $table->foreign('distrito_id')->references('id')->on('distritos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('provincia_id')->references('id')->on('provincias')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('comuna_id')->references('id')->on('comunas')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('estado_socio_id')->references('id')->on('estado_socios')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('cargo_id')->references('id')->on('cargos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('sede_id')->references('id')->on('sedes')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('area_id')->references('id')->on('areas')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('nacion_socio_id')->references('id')->on('nacion_socios')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('socios', function (Blueprint $table) {
            //
        });
    }
}
