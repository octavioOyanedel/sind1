<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contables', function (Blueprint $table) {
            $table->id();
            $table->date('fecha');
            $table->integer('numero');
            $table->string('cheque');
            $table->integer('monto');
            $table->text('detalle');
            $table->boolean('nulo');
            $table->unsignedBigInteger('cuenta_id')->nullable();
            $table->unsignedBigInteger('concepto_id')->nullable();
            $table->unsignedBigInteger('asociado_id')->nullable();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('tipo_contable_id');
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
        Schema::dropIfExists('contables');
    }
}
