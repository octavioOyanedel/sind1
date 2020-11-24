<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLaboralSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('laboral_socios', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('anexo');
            $table->unsignedBigInteger('cargo_id');
            $table->unsignedBigInteger('sede_id');
            $table->unsignedBigInteger('area_id');
            $table->unsignedBigInteger('socio_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('laboral_socios');
    }
}
