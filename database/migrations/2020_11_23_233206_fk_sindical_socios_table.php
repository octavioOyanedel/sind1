<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FkSindicalSociosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sindical_socios', function (Blueprint $table) {
            $table->foreign('estado_socio_id')->references('id')->on('estado_socios')->onUpdate('cascade')->onDelete('set null');
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
        Schema::table('sindical_socios', function (Blueprint $table) {
            //
        });
    }
}
