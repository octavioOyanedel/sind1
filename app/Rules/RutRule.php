<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class RutRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $rutOriginal = $value;
        $ultimoDigito = 0;
        $ultimoDigitoObtenido = 0;
        $divisionEntera = 0;
        $restoDivisionEntera = 0;
        $aux = 0;
        $suma = 0;
        $serie = 2;
        //obtener último caracter
        $ultimoCaracter = substr($rutOriginal,strlen($rutOriginal)-1,1);
        //obtener string rut sin último caracter
        $rutCaracterSinDigito = substr($rutOriginal,0,-1);
        //convertir string rut sin dígito verificador a enteros
        $rutEnteroSinDigito = (int) $rutCaracterSinDigito;
        //evaluar último caracter y modificar en el caso de que sea k o 0
        if(strpos($rutOriginal,"K") == false && strpos($rutOriginal,"k") == false){
            //castea ultimoCaracter a entero
            $ultimoDigito = (int) $ultimoCaracter;
            //si ultimoDigito es 0 se asigna el numero 11
            if($ultimoDigito == 0){
                $ultimoDigito = 11;
            }
        }else{
            //si ultimoDigito es k se asigna el numero 10
            $ultimoDigito = 10;
        }
        //obtener suma de productos
        $aux = $rutEnteroSinDigito;
        while($aux > 0 ){
            //sacar último número
            $ultimoDigitoObtenido = $aux % 10;
            //verificar serie
            if($serie > 7){
                $serie = 2;
            }
            //sumar producto
            $suma = $suma + ($ultimoDigitoObtenido * $serie);
            //aumentar en uno a serie
            $serie++;
            //cortar rut, sacar último dígito
            $aux = (int) floor($aux / 10);
        }
        //Dividir suma por 11 y obtener parte entera
        $divisionEntera = intdiv($suma,11);
        //obtener el resto de division entera
        $restoDivisionEntera = $suma - (11 * $divisionEntera);
        //obtener dígito = 11 - resto
        $digitoHallado = 11 - $restoDivisionEntera;
        //evaluar último y dígito hallado
        if($ultimoDigito == $digitoHallado){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Campo :attribute no válido.';
    }
}
