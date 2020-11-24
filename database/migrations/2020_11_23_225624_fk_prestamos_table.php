<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkPrestamosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('prestamos', function (Blueprint $table) {
            $table->foreign('socio_id')->references('id')->on('socios')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('pago_prestamo_id')->references('id')->on('pago_prestamos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('prestamos', function (Blueprint $table) {
            //
        });
    }
}
