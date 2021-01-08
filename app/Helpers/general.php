<?php
use App\Models\Socio;

/**
 * Obtener arreglo con nombre y apellido candidato para busqueda
 * Input: string búsqueda
 * Output: arreglo con nombre y apellido
 */
function enlaceActivo($ruta)
{
    if(request()->routeIs($ruta)){
        return 'active';
    }

}

function obtenerEdad($fecha)
{
    $dia = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%d');
    $mes = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%m');
    $year = \Carbon\Carbon::parse($fecha)->age;

    if(\Carbon\Carbon::parse($fecha)->age == 0){ 
        if($mes == '0'){
            $edad = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%d '.obtenerDias($dia));
        }
        if($dia == '0'){          
            $edad = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%m '.obtenerMeses($mes));
        }  
        if($mes == '0' && $dia == '0'){
            $edad = 'Recién nacido.';
        }
        if($mes != '0' && $dia != '0'){
            $edad = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%m '.obtenerMeses($mes).' y %d '.obtenerDias($dia));
        }               
    }else{
        $edad = \Carbon\Carbon::parse($fecha)->diff(\Carbon\Carbon::now())->format('%y '.obtenerYears($year));
    }
    return $edad;
}

/**
 * Obtener string día o días según día de fecha de nacimiento
 * Input: cantidad de dias
 * Output: string Día o Días
 */
function obtenerDias($dia)
{
    $dias = NULL;
    if($dia == '1'){
        $dias = "Día";
    }else{
        $dias = "Días";
    }
    return $dias;
} 

/**
 * Obtener string mes o meses según mes de fecha de nacimiento
 * Input: cantidad de meses
 * Output: string Mes o Meses
 */
function obtenerMeses($mes)
{
    $meses = NULL;
    if($mes == '1'){
        $meses = "Mes";
    }else{
        $meses = "Meses";
    }
    return $meses;      
} 

/**
 * Obtener string año o años según mes de fecha de nacimiento
 * Input: cantidad de años
 * Output: string Año o Años
 */
function obtenerYears($year)
{
    $years = NULL;
    if($year == 1){
        $years = "Año";
    }else{
        $years = "Años";
    }  
    return $years;

} 
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
    $socio = Socio::withTrashed()->orderBy('numero', 'DESC')->first();

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

/**
 * IFormatea fecha de yyyy-mm-dd a dd-mm-yyyy
 * Input: Date fecha
 * Output: Date con fecha modificada
 */
function fechaYmdAdmy($fecha)
{
    if($fecha){
        return date('d-m-Y', strtotime($fecha));
    }

}

/**
 * Obtener rut formateado
 * Input: string rut 11222333k
 * Output: string rut formateado 11.222.333-k
 */
function formatoRut($valor)
{
    $rut = $valor;
    $largo = strlen($rut);
    $largoFinal = 0;
    $arrayRutFormato = array();
    $rutFinal = "";
    //obtener largo total para poblar nuevo array
    if ($largo == 9) {
        //si largo es 9 nuevo largo sera de 11 0-11 = 12
        $largoFinal = 12;
    } else {
        //si largo es 9 nuevo largo sera de 10 0-10 = 11
        $largoFinal = 11;
    }
    //formato inicial de array
    for ($i = 0; $i < $largoFinal; $i++) {
        if ($i == $largoFinal - 2) {
            array_push($arrayRutFormato, "-");
        } else {
            array_push($arrayRutFormato, ".");
        }
    }
    //convertir rut en array
    $arrayRut = str_split($rut);
    //recorrer array para construir nuevo array
    for ($i = 0; $i < $largoFinal; $i++) {
        if ($largo == 9) {
            if ($i >= 0 && $i <= 1) {
                $arrayRutFormato[$i] = $arrayRut[$i];
            }
            if ($i >= 3 && $i <= 5) {
                $arrayRutFormato[$i] = $arrayRut[$i - 1];
            }
            if ($i >= 7 && $i <= 9) {
                $arrayRutFormato[$i] = $arrayRut[$i - 2];
            }
            if ($i == 11) {
                $arrayRutFormato[$i] = $arrayRut[$i - 3];
            }
        } else {
            if ($i == 0) {
                $arrayRutFormato[$i] = $arrayRut[$i];
            }
            if ($i >= 2 && $i <= 4) {
                $arrayRutFormato[$i] = $arrayRut[$i - 1];
            }
            if ($i >= 6 && $i <= 8) {
                $arrayRutFormato[$i] = $arrayRut[$i - 2];
            }
            if ($i == 10) {
                $arrayRutFormato[$i] = $arrayRut[$i - 3];
            }
        }
    }
    //convertir array en string
    $rutFinal = implode("", $arrayRutFormato);
    $valor = $rutFinal;
    return $valor;
}
