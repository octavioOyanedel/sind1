<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkLaboralSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('laboral_socios', function (Blueprint $table) {
            $table->foreign('cargo_id')->references('id')->on('cargos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('sede_id')->references('id')->on('sedes')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('area_id')->references('id')->on('areas')->onUpdate('cascade')->onDelete('set null');
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
        Schema::table('laboral_socios', function (Blueprint $table) {
            //
        });
    }
}
