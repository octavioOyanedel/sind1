<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSindicalSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sindical_socios', function (Blueprint $table) {
            $table->id();
            $table->integer('numero');
            $table->date('fecha');
            $table->unsignedBigInteger('estado_socio_id');
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
        Schema::dropIfExists('sindical_socios');
    }
}
