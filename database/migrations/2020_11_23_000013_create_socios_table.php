<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('socios', function (Blueprint $table) {
            $table->id();
            $table->string('nombre1');
            $table->string('nombre2')->nullable();
            $table->string('apellido1');
            $table->string('apellido2')->nullable();
            $table->string('rut')->unique();
            $table->enum('genero', ['Dama', 'Varón']);
            $table->date('fecha_nac')->nullable();
            $table->integer('contacto')->nullable();
            $table->string('correo')->unique()->nullable();
            $table->string('direccion')->nullable();
            $table->date('fecha_sind1')->nullable();
            $table->integer('numero')->unique();
            $table->integer('anexo')->nullable();
            $table->date('fecha_pucv')->nullable();
            $table->unsignedBigInteger('distrito_id')->nullable();
            $table->unsignedBigInteger('provincia_id')->nullable();
            $table->unsignedBigInteger('comuna_id')->nullable();
            $table->unsignedBigInteger('estado_socio_id')->nullable()->default(1);
            $table->unsignedBigInteger('cargo_id')->nullable();
            $table->unsignedBigInteger('sede_id')->nullable();
            $table->unsignedBigInteger('area_id')->nullable();
            $table->unsignedBigInteger('nacion_socio_id')->nullable();
            $table->softDeletes();
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
        Schema::dropIfExists('socios');
    }
}
