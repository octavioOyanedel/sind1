<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkContablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contables', function (Blueprint $table) {
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('concepto_id')->references('id')->on('conceptos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('asociado_id')->references('id')->on('asociados')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('tipo_contable_id')->references('id')->on('tipo_contables')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contables', function (Blueprint $table) {
            //
        });
    }
}
