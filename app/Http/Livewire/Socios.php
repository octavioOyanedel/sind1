<?php

namespace App\Http\Livewire;

use App\Models\Area;
use App\Models\Cargo;
use App\Models\Carga;
use App\Models\Comuna;
use App\Models\Distrito;
use App\Models\Establecimiento;
use App\Models\EstadoEstudio;
use App\Models\EstadoSocio;
use App\Models\Estudio;
use App\Models\Grado;
use App\Models\NacionSocio;
use App\Models\Parentesco;
use App\Models\Provincia;
use App\Models\Sede;
use App\Models\Socio;
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
     *  VARIABLES
     */
    // Estado inicial de fomulariod y tablas ****************************************
    public $forms = "_form_socio";
    public $titulo_form = "Incorporar Socio";
    public $boton = "crear";
    public $tablas = "_listar_socio";
    public $titulo_tabla = "Listado de Socios";
    // Objetos socio, carga y estudio ***********************************************
    public $objeto_socio = NULL;
    public $objeto_carga = NULL;
    public $objeto_estudio = NULL;
    // Colecciones selects
    // Módulo socios ****************************************************************
    public $regiones = [];
    public $provincias = [];
    public $comunas = [];
    public $sedes = [];
    public $areas = [];
    public $cargos = [];
    public $naciones = [];
    public $estados = [];
    // Módulo cargas familiares ****************************************************
    public $parentescos = [];
    // Módulo estudio realizado ****************************************************
    public $grados = [];
    public $establecimientos = [];
    public $estado_estudios = [];
    // Variables 2way
    // Módulo socios ***************************************************************
    public $socio_nombre1 = NULL;
    public $socio_nombre2 = NULL;
    public $socio_apellido1 = NULL;
    public $socio_apellido2 = NULL;
    public $socio_rut = NULL;
    public $socio_genero = NULL;
    public $socio_fecha_nac = NULL;
    public $socio_contacto = NULL;
    public $socio_correo = NULL;
    public $socio_direccion = NULL;
    public $socio_fecha_sind1 = NULL;
    public $socio_numero = NULL;
    public $socio_anexo = NULL;
    public $socio_fecha_pucv = NULL;
    public $socio_distrito_id = NULL;
    public $socio_provincia_id = NULL;
    public $socio_comuna_id = NULL;
    public $socio_estado_socio_id = NULL;
    public $socio_cargo_id = NULL;
    public $socio_sede_id = NULL;
    public $socio_area_id = NULL;
    public $socio_nacion_socio_id = NULL;
    // Módulo cargas familiares ****************************************************
    public $carga_nombre1 = NULL;
    public $carga_nombre2 = NULL;
    public $carga_apellido1 = NULL;
    public $carga_apellido2 = NULL;
    public $carga_rut = NULL;
    public $carga_fecha = NULL;
    public $carga_parentesco_id = NULL;
    public $carga_socio_id = NULL;
    // Módulo estudio realizado ****************************************************
    public $estudio_grado_id = NULL;
    public $estudio_establecimiento_id = NULL;
    public $estudio_estado_estudio_id = NULL;
    public $estudio_socio_id  = NULL;
    // Flag búsqueda, permite direrenciar entre búsqueda única y masiva
    public $flag_busqueda;
    // Búsquedas unicas
    public $busqueda_socio = NULL;
    public $busqueda_carga = NULL;
    public $busqueda_estudio = NULL;
    // Nuevos registros
    // Socio ************************************************************************
    public $nueva_region;
    public $nueva_provincia;
    public $nueva_comuna;
    public $nueva_sede;
    public $nueva_area;
    public $nuevo_cargo;
    public $nueva_nacion;
    public $nueva_region_modal;
    public $nueva_provincia_modal;
    public $nueva_sede_modal;
    // Carga ************************************************************************
    public $nuevo_parentesco;
    // Estudio **********************************************************************
    public $nuevo_grado;
    public $nuevo_establecimiento;
    public $nuevo_estado_estudio;

    /**
     * Render clase livewire
     */
    public function render()
    {
        $this->alistarColecciones();
        return view('livewire.socios',[
            'socios' => Socio::with(['sede','area','cargo'])->orderBy('created_at', 'DESC')->simplePaginate(10)
        ]);
    }

    /**
     * Obtener colecciones para poblar selects
     */
    public function alistarColecciones()
    {
        $this->regiones = Distrito::orderBy('nombre', 'ASC')->get();
        $this->sedes = Sede::orderBy('nombre', 'ASC')->get();
        $this->cargos = Cargo::orderBy('nombre', 'ASC')->get();
        $this->naciones = NacionSocio::orderBy('nombre', 'ASC')->get();
        $this->estados = EstadoSocio::orderBy('nombre', 'ASC')->get();
        $this->parentescos = Parentesco::orderBy('nombre', 'ASC')->get();
        $this->grados = Grado::orderBy('nombre', 'ASC')->get();
        $this->establecimientos = Establecimiento::orderBy('nombre', 'ASC')->get();

        // Obtención de elementos anidados para poblar selects
    	if (!empty($this->socio_distrito_id)) {
    		$this->provincias = Provincia::where('distrito_id', $this->socio_distrito_id)->get();
    	}
    	if (!empty($this->socio_provincia_id)) {
    		$this->comunas = Comuna::where('provincia_id', $this->socio_provincia_id)->get();
        }
    	if (!empty($this->socio_sede_id)) {
    		$this->areas = Area::where('sede_id', $this->socio_sede_id)->get();
        }
    	if (!empty($this->estudio_grado_id)) {
    		$this->establecimientos = Establecimiento::where('grado_id', $this->estudio_grado_id)->get();
        }        
    }    
    
    /**
     * MÉTODOS DE CARGAS
     */
    // Carga de objetos
    public function cargarObjetoSocio(Socio $socio)
    {
        $this->objeto_socio = $socio;
    }

    public function cargarObjetoCarga(Carga $carga)
    {
        $this->objeto_carga = $carga;
    }

    public function cargarObjetoEstudio(Estudio $estudio)
    {
        $this->objeto_estudio = $estudio;
    }    

    // Carga de formularios
    // Socios ***********************************************************************
    public function cargarFormCrearSocio()
    {
        $this->forms = "_form_socio";
        $this->titulo_form = "Incorporar Socio";
        $this->boton = "crear";
    }

    public function cargarFormEditarSocio(Socio $socio)
    {
        $this->cargarObjetoSocio($socio);
        $this->forms = "_form_socio";
        $this->titulo_form = "Editar Socio";
        $this->boton = "editar";
    }

    public function cargarFormBuscarSocio()
    {
        $this->forms = "_buscar_socio";
        $this->titulo_form = "Buscar Socio/s";
    }

    // Cargas ***********************************************************************
    public function cargarFormCrearCarga()
    {
        $this->forms = "_form_carga";
        $this->titulo_form = "Agregar Carga Familiar";
        $this->boton = "crear";
    }

    public function cargarFormEditarCarga(Carga $carga)
    {
        $this->cargarObjetoCarga($carga);
        $this->forms = "_form_carga";
        $this->titulo_form = "Editar Carga Familiar";
        $this->boton = "editar";

    }

    public function cargarFormBuscarCarga()
    {
        $this->forms = "_buscar_carga";
        $this->titulo_form = "Buscar Carga/s";
    }

    // Estudios *********************************************************************
    public function cargarFormCrearEstudio()
    {
        $this->forms = "_form_estudio";
        $this->titulo_form = "Agregar Estudio";
        $this->boton = "crear";
    }

    public function cargarFormEditarEstudio(Estudio $estudio)
    {
        $this->cargarObjetoEstudio($estudio);
        $this->forms = "_form_estudio";
        $this->titulo_form = "Editar Estudio";
        $this->boton = "editar";
    }

    public function cargarFormBuscarEstudio()
    {
        $this->forms = "_buscar_estudio";
        $this->titulo_form = "Buscar Estudio/s";
    }

    // Poblar formularios de edición
    // Socios ***********************************************************************
    public function poblarFormEditarSocio(Socio $socio)
    {
        $this->socio_nombre1 = $socio->nombre1;
        $this->socio_nombre2 = $socio->nombre2;
        $this->socio_apellido1 = $socio->apellido1;
        $this->socio_apellido2 = $socio->apellido2;
        $this->socio_rut = $socio->rut;
        $this->socio_genero = $socio->genero;
        $this->socio_fecha_nac = $socio->fecha_nac;
        $this->socio_contacto = $socio->contacto;
        $this->socio_correo = $socio->correo;
        $this->socio_direccion = $socio->direccion;
        $this->socio_fecha_sind1 = $socio->fecha_sind1;
        $this->socio_numero = $socio->numero;
        $this->socio_anexo = $socio->anexo;
        $this->socio_fecha_pucv = $socio->fecha_pucv;
        $this->socio_distrito_id = $socio->distrito_id;
        $this->socio_provincia_id = $socio->provincia_id;
        $this->socio_comuna_id = $socio->comuna_id;
        $this->socio_cargo_id = $socio->cargo_id;
        $this->socio_sede_id = $socio->sede_id;
        $this->socio_area_id = $socio->area_id;
        $this->socio_nacion_socio_id = $socio->nacion_socio_id;        
    }    
    // Cargas ***********************************************************************
    public function poblarFormEditarCarga(Carga $carga)
    {
        $this->carga_nombre1 = $carga->nombre1;
        $this->carga_nombre2 = $carga->nombre2;
        $this->carga_apellido1 = $carga->apellido1;
        $this->carga_apellido2 = $carga->apellido2;
        $this->carga_rut = $carga->rut;
        $this->carga_fecha = $carga->fecha;
        $this->carga_parentesco_id = $carga->parentesco_id;
        $this->carga_socio_id = $carga->socio_id;        
    }
    // Estudios **********************************************************************
    public function poblarFormEditarEstudio(Estudio $estudio)
    {
        
    }

    // Carga de tablas
    // Socios ***********************************************************************
    public function cargarTablaMostrarSocio(Socio $socio)
    {
        //
    }

    public function cargarTablaListarSocio()
    {
        //
    }

    public function cargarTablaResultadosSocio()
    {
        //
    }

    // Cargas ***********************************************************************
    public function cargarTablaMostrarCarga(Carga $carga)
    {
        //
    }

    public function cargarTablaListarCarga()
    {
        //
    }

    public function cargarTablaResultadosCarga()
    {
        //
    }

    // Estudios **********************************************************************
    public function cargarTablaMostrarEstudio(Estudio $estudio)
    {
        //
    }

    public function cargarTablaListarEstudio()
    {
        //
    }

    public function cargarTablaResultadosEstudio()
    {
        //
    }
    
    /**
     * MÉTODOS  CRUD + BUSCAR
     */
    // Socios **********************************************************************
    public function crearSocio()
    {
        //
    }

    public function editarSocio()
    {
        //
    }    

    public function eliminarSocio()
    {
        //
    }

    public function BuscarSocioUnica()
    {
        //
    }      

    public function BuscarSocioMasiva()
    {
        //
    }   

    // Cargas **********************************************************************
    public function crearCarga()
    {
        //
    }

    public function editarCarga()
    {
        //
    }

    public function eliminarCarga()
    {
        //
    }

    public function BuscarCargaUnica()
    {
        //
    }      

    public function BuscarCargaMasiva()
    {
        //
    }   

    // Estudios **********************************************************************
    public function crearEstudio()
    {
        //
    }

    public function editarEstudio()
    {
        //
    }
    
    public function eliminarEstudio()
    {
        //
    }
    
    public function BuscarEstudioUnica()
    {
        //
    }      

    public function BuscarEstudioMasiva()
    {
        //
    }  
    
    /**
     * VERIFICACIÓN DE CAMBIOS AL EDITAR
     */
    // Socios **********************************************************************
    public function edicionSocios($socio)
    {
        //
    }

    public function crearArregloEdicionSocio()
    {
        //
    }

    // Cargas **********************************************************************
    public function edicionCarga($carga)
    {
        //
    }

    public function crearArregloEdicionCarga()
    {
        //
    }

    // Estudio *********************************************************************
    public function edicionEstudio($estudio)
    {
        //
    }

    public function crearArregloEdicionEstudio()
    {
        //
    }
    
    /**
     * VALIDACIÓN DE FORMULARIOS BUSCAR
     */
    // Socio **********************************************************************
    public function validarBusquedaUnicaSocio()
    {
        //
    }  

    public function validarBusquedaMasivaSocio()
    {
        //
    }  

    // Carga **********************************************************************
    public function validarBusquedaUnicaCarga()
    {
        //
    }  

    public function validarBusquedaMasivaCarga()
    {
        //
    }  

    // Estudio ********************************************************************
    public function validarBusquedaUnicaEstudio()
    {
        //
    }

    public function validarBusquedaMasivaEstudio()
    {
        //
    }

    /**
     * NUEVOS REGISTROS
     */
    // Socio ********************************************************************** 
    public function nuevaRegion()
    {
        $this->validate([
			'nueva_region' => ['required', new NombreRule, 'unique:distritos,nombre']
		]);

		Distrito::create([
			'nombre' => $this->nueva_region
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Región Agregada.');
    }

    public function nuevaProvincia()
    {
        $this->validate([
            'nueva_region_modal' => 'required',
            'nueva_provincia' => ['required', new NombreRule, 'unique:provincias,nombre']
		]);

		Provincia::create([
            'nombre' => $this->nueva_provincia,
            'distrito_id' => $this->nueva_region_modal
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Provincia Agregada.');
    }

    public function nuevaComuna()
    {
        $this->validate([
            'nueva_provincia_modal' => 'required',
            'nueva_comuna' => ['required', new NombreRule, 'unique:comunas,nombre']
		]);

		Comuna::create([
            'nombre' => $this->nueva_comuna,
            'provincia_id' => $this->nueva_provincia_modal
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Comuna Agregada.');
    }

    public function nuevaSede()
    {
        $this->validate([
            'nueva_sede' => ['required', new NombreRule, 'unique:sedes,nombre']
		]);

		Sede::create([
            'nombre' => $this->nueva_sede,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Sede Agregada.');
    }

    public function nuevaArea()
    {
        $this->validate([
            'nueva_sede_modal' => 'required',
            'nueva_area' => ['required', new NombreRule, 'unique:areas,nombre']
		]);

		Area::create([
            'nombre' => $this->nueva_area,
            'sede_id' => $this->nueva_sede_modal
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Área Agregada.');
    }

    public function nuevoCargo()
    {
        $this->validate([
            'nuevo_cargo' => ['required', new NombreRule, 'unique:cargos,nombre']
		]);

		Cargo::create([
            'nombre' => $this->nuevo_cargo,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Cargo Agregado.');
    }

    public function nuevaNacion()
    {
        $this->validate([
            'nueva_nacion' => ['required', new NombreRule, 'unique:nacion_socios,nombre']
		]);

		NacionSocio::create([
            'nombre' => $this->nueva_nacion,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Nacionalidad Agregada.');
    }   

    // Carga ********************************************************************** 
    public function nuevoParentesco()
    {
        $this->validate([
            'nuevo_parentesco' => ['required', new NombreRule, 'unique:parentescos,nombre']
		]);

		Parentesco::create([
            'nombre' => $this->nuevo_parentesco,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Parentesco Agregado.');
    }   

    // Estudios *******************************************************************
    public function nuevoGrado()
    {
        $this->validate([
            'nuevo_grado' => ['required', new NombreRule, 'unique:grados,nombre']
		]);

		Grado::create([
            'nombre' => $this->nuevo_grado,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Grado Académico Agregado.');
    }   

    public function nuevoEstablecimiento()
    {
        $this->validate([
            'nuevo_grado_modal' => 'required',
            'nuevo_establecimiento' => ['required', new NombreRule, 'unique:establecimientos,nombre']
		]);

		Establecimiento::create([
            'nombre' => $this->nuevo_establecimiento,
            'grado_id' => $this->nuevo_grado_modal
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Establecimiento Agregado.');
    }   

    public function nuevoEstado()
    {
        $this->validate([
            'nuevo_estado_estudio' => ['required', new NombreRule, 'unique:estado_estudios,nombre']
		]);

		EstadoEstudio::create([
            'nombre' => $this->nuevo_estado_estudio,
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Estado Estudio Agregado.');
    }   

    /**
     * RESET FORMS 
     */
    // Socio **********************************************************************
    public function resetFormSocio()
    {
        $this->socio_nombre1 = NULL;
        $this->socio_nombre2 = NULL;
        $this->socio_apellido1 = NULL;
        $this->socio_apellido2 = NULL;
        $this->socio_rut = NULL;
        $this->socio_genero = NULL;
        $this->socio_fecha_nac = NULL;
        $this->socio_contacto = NULL;
        $this->socio_correo = NULL;
        $this->socio_direccion = NULL;
        $this->socio_fecha_sind1 = NULL;
        $this->socio_numero = NULL;
        $this->socio_anexo = NULL;
        $this->socio_fecha_pucv = NULL;
        $this->socio_distrito_id = NULL;
        $this->socio_provincia_id = NULL;
        $this->socio_comuna_id = NULL;
        $this->socio_estado_socio_id = NULL;
        $this->socio_cargo_id = NULL;
        $this->socio_sede_id = NULL;
        $this->socio_area_id = NULL;
        $this->socio_nacion_socio_id = NULL;
    }

    // Carga **********************************************************************
    public function resetFormCarga()
    {
        $this->carga_nombre1 = NULL;
        $this->carga_nombre2 = NULL;
        $this->carga_apellido1 = NULL;
        $this->carga_apellido2 = NULL;
        $this->carga_rut = NULL;
        $this->carga_fecha = NULL;
        $this->carga_parentesco_id = NULL;
        $this->carga_socio_id = NULL;
    }

    // Estudio ******************************************************************** 
    public function resetFormEstudio()
    {
        $this->estudio_grado_id = NULL;
        $this->estudio_establecimiento_id = NULL;
        $this->estudio_estado_estudio_id = NULL;
        $this->estudio_socio_id  = NULL;
    }    
}
