<?php

namespace App\Http\Livewire;

use App\Models\Area;
use App\Models\Cargo;
use App\Models\Carga;
use App\Models\Comuna;
use App\Models\Distrito;
use App\Models\NacionSocio;
use App\Models\Provincia;
use App\Models\Sede;
use App\Models\Socio;
use App\Models\EstadoSocio;
use App\Models\Parentesco;
use Livewire\Component;
use App\Rules\NombreRule;
use App\Rules\RutRule;
use App\Rules\DireccionRule;
use Illuminate\Validation\Rule;
use Livewire\WithPagination;

class Socios extends Component
{
    use WithPagination;
	// Corrige error en estilos de paginación
    protected $paginationTheme = 'bootstrap';

    /**
     * Estado inicial de formulario y tabla
     */
    public $forms = "_crear_editar";
    public $titulo_form = "Incorporar Socio";
    public $boton = "crear";
    public $tablas = "_listar";
    public $titulo_tabla = "Listado de Socios";

    /**
     *  VARIABLES
     */
    // Objetos socio, carga y estudio
    public $obj_socio = NULL;
    public $obj_carga = NULL;
    public $obj_estudio = NULL;
    // Módulo socios
    public $regiones = [];
    public $provincias = [];
    public $comunas = [];
    public $sedes = [];
    public $areas = [];
    public $cargos = [];
    public $naciones = [];
    public $estados = [];
    // Módulo cargas familiares
    public $parentescos = [];
    // Módulo estudio realizado
    public $grados = [];
    public $establecimientos = [];
    public $estado_estudios = [];

    /**
     * Variables livewire 2way binding
     */

}
