<?php
use App\Models\Socio;

/**
 * Obtener arreglo con nombre y apellido candidato para busqueda
 * Input: string búsqueda
 * Output: arreglo con nombre y apellido
 */
function separarNombreApellido($q)
{
	$arreglo = array('nombre'=>'','apellido'=>'');
	if($q != ''){
		$aux = explode(' ', $q);
		$arreglo['nombre'] = $aux[0];
		if(count($aux) > 1){
			unset($aux[0]);
			$arreglo['apellido'] = implode(' ',$aux);
		}
	}
	return $arreglo;
}

/**
 * Obtiene número de socio + 1 para recomendar en form
 * incorporar socio.
 * Input: Void
 * Output: Int numero de socio recomendado
 */
function numeroRecomendado()
{
    $socio = Socio::orderBy('numero', 'DESC')->first();

    if($socio != null){
        $numero = $socio->numero + 1;
        $numero = strval($numero);
        //var_dump($numero);
        return 'Ej.: '.$numero;
    }else{
        return 'Ej.: 1';
    }
}

/**
 * Da formato a nombre apellidos, nombres
 * Input: Objeto
 * Output: String con nombre formateado
 */
function formatoNombre($objeto)
{
    if($objeto->apellido2 == null){
        return trim($objeto->apellido1.', '.$objeto->nombre1.' '.$objeto->nombre2);
    }else{
        return trim($objeto->apellido1.' '.$objeto->apellido2.', '.$objeto->nombre1.' '.$objeto->nombre2);
    }
}

/**
 * Imprime por pantalla relaciones siempre y cuando relación
 * no devuelva null
 * Input: Objeto
 * Output: String con valor
 */
function imprimirRelacion($objeto)
{
    if($objeto != null){
        //if($objeto instanceof App\Models\Sede){
        //    return $objeto->nombre;
        //}
        return $objeto->nombre;
    }
}
