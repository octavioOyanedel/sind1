<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResidenciaSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('residencia_socios', function (Blueprint $table) {
            $table->id();
            $table->string('direccion');
            $table->unsignedBigInteger('distrito_id');
            $table->unsignedBigInteger('provincia_id');
            $table->unsignedBigInteger('comuna_id');
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
        Schema::dropIfExists('residencia_socios');
    }
}
