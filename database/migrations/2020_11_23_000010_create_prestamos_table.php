<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrestamosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prestamos', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('numero');
            $table->string('cheque');
            $table->integer('monto');
            $table->boolean('nulo');
            $table->unsignedBigInteger('socio_id');
            $table->unsignedBigInteger('pago_prestamo_id')->nullable();
            $table->unsignedBigInteger('cuenta_id')->nullable();
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
        Schema::dropIfExists('prestamos');
    }
}
