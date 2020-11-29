<?php
use App\Models\Socio;

/**
 * Obtiene número de socio + 1 para recomendar en form
 * incorporar socio.
 * Input: void
 * Output: int numero de socio recomendado
 */
function numeroRecomendado() 
{
    $numero = Socio::orderBy('numero', 'DESC')->first()->numero + 1;
    return 'Ej.: '.$numero; 
}