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
    public $tablas = "_listar_socios";
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
    // Módulo resultados búsquedas masivas *****************************************
    public $resultados_busqueda_socio = [];
    public $resultados_busqueda_carga = [];
    public $resultados_busqueda_estudio = [];
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
    public $flag_busqueda = NULL;
    // Búsquedas unicas
    public $busqueda_socio = NULL;
    public $busqueda_carga = NULL;
    public $busqueda_estudio = NULL;
    // Búsquedas masivas
    // Socio ************************************************************************
    public $buscar_socio_fecha_nac_ini = NULL;
    public $buscar_socio_fecha_nac_fin = NULL;
    public $buscar_socio_fecha_sind1_ini = NULL;
    public $buscar_socio_fecha_sind1_fin = NULL;
    public $buscar_socio_fecha_pucv_ini = NULL;
    public $buscar_socio_fecha_pucv_fin = NULL;
    public $buscar_socio_genero = NULL;
    public $buscar_socio_distrito_id = NULL;
    public $buscar_socio_provincia_id = NULL;
    public $buscar_socio_comuna_id = NULL;
    public $buscar_socio_sede_id = NULL;
    public $buscar_socio_area_id = NULL;
    public $buscar_socio_cargo_id = NULL;
    public $buscar_socio_nacion_socio_id = NULL;
    // Carga ************************************************************************
    public $buscar_carga_fecha_nac_ini = NULL;
    public $buscar_carga_fecha_nac_fin = NULL;
    public $buscar_carga_parentesco_id = NULL;
    // Estudio **********************************************************************
    public $buscar_estudio_grado_id = NULL;
    public $buscar_estudio_establecimiento_id = NULL;
    public $buscar_estudio_estado_estudio_id = NULL;
    // Nuevos registros
    // Socio ************************************************************************
    public $nueva_region = NULL;
    public $nueva_provincia = NULL;
    public $nueva_comuna = NULL;
    public $nueva_sede = NULL;
    public $nueva_area = NULL;
    public $nuevo_cargo = NULL;
    public $nueva_nacion = NULL;
    public $nueva_region_modal = NULL;
    public $nueva_provincia_modal = NULL;
    public $nueva_sede_modal = NULL;
    // Carga ************************************************************************
    public $nuevo_parentesco = NULL;
    // Estudio **********************************************************************
    public $nuevo_grado = NULL;
    public $nuevo_establecimiento = NULL;
    public $nuevo_estado_estudio = NULL;

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
        // Form crear, editar
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
        // Form buscar
    	if (!empty($this->buscar_socio_distrito_id)) {
    		$this->provincias = Provincia::where('distrito_id', $this->buscar_socio_distrito_id)->get();
        }     
    	if (!empty($this->buscar_socio_provincia_id)) {
    		$this->comunas = Comuna::where('provincia_id', $this->buscar_socio_provincia_id)->get();
        }
    	if (!empty($this->buscar_socio_sede_id)) {
    		$this->areas = Area::where('sede_id', $this->buscar_socio_sede_id)->get();
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
        $this->cargarTablaListarSocio();
        $this->cargarObjetoSocio($socio);
        $this->poblarFormEditarSocio($this->objeto_socio);
        $this->forms = "_form_socio";
        $this->titulo_form = "Editar Socio";
        $this->boton = "editar";
    }

    public function cargarFormBuscarSocio()
    {
        $this->forms = "_buscar_socio";
        $this->titulo_form = "Buscar Socio/s";
    }

    public function cargarEliminarSocio(Socio $socio)
    {   
        $this->resetFormEliminarSocio();
        $this->cargarObjetoSocio($socio);
        $this->resetMensajesErrorValidadion();
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
        $this->estudio_grado_id = $estudio->grado_id;
        $this->estudio_establecimiento_id = $estudio->establecimiento_id;
        $this->estudio_estado_estudio_id = $estudio->estado_estudio_id;
        $this->estudio_socio_id = $estudio->estado_estudio_id;
    }

    // Carga de tablas
    // Socios ***********************************************************************
    public function cargarTablaMostrarSocio(Socio $socio)
    {
        $this->cargarObjetoSocio($socio);
        $this->tablas = "_ver_socio";
        $this->titulo_tabla = "Info. de Socios";
    }

    public function cargarTablaListarSocio()
    {
        $this->tablas = "_listar_socios";
        $this->titulo_tabla = "Listado de Socios";
    }

    public function cargarTablaResultadosSocio()
    {
        $this->tablas = "_resultados_busqueda_socio";
        $this->titulo_tabla = "Listado de Socios";
    }

    // Cargas ***********************************************************************
    public function cargarTablaMostrarCarga(Carga $carga)
    {
        $this->cargarObjetoCarga($carga);
        $this->tablas = "_ver_carga";
        $this->titulo_tabla = "Info. de Carga Familiar";
    }

    public function cargarTablaListarCarga()
    {
        $this->tablas = "_listar_cargas";
        $this->titulo_tabla = "Listado de Cargas Familiares";
    }

    public function cargarTablaResultadosCarga()
    {
        $this->tablas = "_resultados_busqueda_carga";
        $this->titulo_tabla = "Listado de Cargas Familiares";
    }

    // Estudios **********************************************************************
    public function cargarTablaMostrarEstudio(Estudio $estudio)
    {
        $this->cargarObjetoEstudio($estudio);
        $this->tablas = "_ver_estudio";
        $this->titulo_tabla = "Info. de Estudio Realizado";
    }

    public function cargarTablaListarEstudio()
    {
        $this->tablas = "_listar_estudios";
        $this->titulo_tabla = "Listado de Estudios Realizados";
    }

    public function cargarTablaResultadosEstudio()
    {
        $this->tablas = "_resultados_busqueda_estudio";
        $this->titulo_tabla = "Listado de Estudios Realizados";
    }

    /**
     * MÉTODOS  CRUD + BUSCAR
     */
    // Socios **********************************************************************
    public function crearSocio()
    {
        // Variables livewire
        $this->validate([
            'socio_nombre1' => ['required', new NombreRule],
            'socio_nombre2' => ['nullable', new NombreRule],
            'socio_apellido1' => ['required', new NombreRule],
            'socio_apellido2' => ['nullable', new NombreRule],
            'socio_rut' => ['required',  new RutRule, 'alpha_num', 'max:9', 'unique:socios,rut'],
            'socio_genero' => ['required', 'alpha'],
            'socio_fecha_nac' => ['nullable', 'date'],
            'socio_contacto' => ['nullable', 'numeric'],
            'socio_correo' => ['nullable', 'email', 'unique:socios,correo'],
            'socio_direccion' => ['nullable', new DireccionRule],
            'socio_fecha_sind1' => ['nullable', 'date'],
            'socio_numero' => ['required', 'numeric', 'unique:socios,numero'],
            'socio_anexo' => ['nullable', 'numeric'],
            'socio_fecha_pucv' => ['nullable', 'date'],
            'socio_distrito_id' => ['nullable'],
            'socio_provincia_id' => ['nullable'],
            'socio_comuna_id' => ['nullable'],
            'socio_cargo_id' => ['nullable'],
            'socio_sede_id' => ['nullable'],
            'socio_area_id' => ['nullable'],
            'socio_nacion_socio_id' => ['nullable'],
        ]);
        // Campos de base de datos => valiables livewire
        $objeto = Socio::create([
            'rut' => $this->socio_rut,
            'numero' => $this->socio_numero,
            'nombre1' => $this->socio_nombre1,
            'nombre2' => $this->socio_nombre2,
            'apellido1' => $this->socio_apellido1,
            'apellido2' => $this->socio_apellido2,
            'genero' => $this->socio_genero,
            'fecha_nac' => $this->socio_fecha_nac,
            'contacto' => $this->socio_contacto,
            'correo' => $this->socio_correo,
            'fecha_pucv' => $this->socio_fecha_pucv,
            'anexo' => $this->socio_anexo,
            'fecha_sind1' => $this->socio_fecha_sind1,
            'distrito_id' => $this->socio_distrito_id,
            'provincia_id' => $this->socio_provincia_id,
            'comuna_id' => $this->socio_comuna_id,
            'direccion' => $this->socio_direccion,
            'sede_id' => $this->socio_sede_id,
            'area_id' => $this->socio_area_id,
            'cargo_id' => $this->socio_cargo_id,
            'nacion_socio_id' => $this->socio_nacion_socio_id,
        ]);
        $this->resetFormSocio();
        $this->cargarTablaMostrarSocio($objeto);
    }

    public function editarSocio()
    {
        if($this->edicionSocios($this->objeto_socio->toArray()) > 0){
            // Variables livewire
            $this->validate([
                'socio_nombre1' => ['required', new NombreRule],
                'socio_nombre2' => ['nullable', new NombreRule],
                'socio_apellido1' => ['required', new NombreRule],
                'socio_apellido2' => ['nullable', new NombreRule],
                'socio_rut' => ['required',  new RutRule, 'alpha_num', 'max:9', Rule::unique('socios','rut')->ignore($this->objeto_socio)],
                'socio_genero' => ['required', 'alpha'],
                'socio_fecha_nac' => ['nullable'],
                'socio_contacto' => ['nullable', 'numeric'],
                'socio_correo' => ['nullable', 'email', Rule::unique('socios','correo')->ignore($this->objeto_socio)],
                'socio_direccion' => ['nullable', new DireccionRule],
                'socio_fecha_sind1' => ['nullable'],
                'socio_numero' => ['required', 'numeric', Rule::unique('socios','numero')->ignore($this->objeto_socio)],
                'socio_anexo' => ['nullable', 'numeric'],
                'socio_fecha_pucv' => ['nullable'],
                'socio_distrito_id' => ['nullable'],
                'socio_provincia_id' => ['nullable'],
                'socio_comuna_id' => ['nullable'],
                'socio_cargo_id' => ['nullable'],
                'socio_sede_id' => ['nullable'],
                'socio_area_id' => ['nullable'],
                'socio_nacion_socio_id' => ['nullable'],
            ]);

            // Campos de base de datos => valiables livewire
            $this->objeto_socio->update([
                'rut' => $this->socio_rut,
                'numero' => $this->socio_numero,
                'nombre1' => $this->socio_nombre1,
                'nombre2' => $this->socio_nombre2,
                'apellido1' => $this->socio_apellido1,
                'apellido2' => $this->socio_apellido2,
                'genero' => $this->socio_genero,
                'fecha_nac' => $this->socio_fecha_nac,
                'contacto' => $this->socio_contacto,
                'correo' => $this->socio_correo,
                'fecha_pucv' => $this->socio_fecha_pucv,
                'anexo' => $this->socio_anexo,
                'fecha_sind1' => $this->socio_fecha_sind1,
                'distrito_id' => !strlen($this->socio_distrito_id) ? null : $this->socio_distrito_id,
                'provincia_id' => !strlen($this->socio_provincia_id) ? null : $this->socio_provincia_id,
                'comuna_id' => !strlen($this->socio_comuna_id) ? null : $this->socio_comuna_id,
                'direccion' => $this->socio_direccion,
                'sede_id' => !strlen($this->socio_sede_id) ? null : $this->socio_sede_id,
                'area_id' => !strlen($this->socio_area_id) ? null : $this->socio_area_id,
                'cargo_id' => !strlen($this->socio_cargo_id) ? null : $this->socio_cargo_id,
                'nacion_socio_id' => !strlen($this->socio_nacion_socio_id) ? null : $this->socio_nacion_socio_id,
            ]);
            $this->cargarFormCrearSocio();
            $this->resetFormSocio();
            $this->cargarTablaMostrarSocio($this->objeto_socio); 
            $this->emit('alerta_ok', 'Socio Editado.');
        }else{
            $this->emit('alerta_info', 'No se han hecho modificaciones en formulario.');
        }       
    }

    public function eliminarSocio()
    {
        $this->validate([
            'socio_estado_socio_id' => 'required',
        ]);

        $this->objeto_socio->estado_socio_id = $this->socio_estado_socio_id;
        $this->objeto_socio->update();
        $this->objeto_socio->delete();
        $this->resetFormBusquedaUnicaSocio();
        $this->resetFormBusquedaMasivaSocio();     
        $this->cargarTablaListarSocio();
        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Socio Desvinculado.');       
    }

    public function busquedaUnicaSocio()
    {
        $this->flag_busqueda="unica";
        $this->resetFormBusquedaMasivaSocio();
        if($this->validarBusquedaUnicaSocio()){
            $this->emit('alerta_info', 'Debe ingresar búsqueda.');
        }else{
            $nombre = separarNombreApellido($this->busqueda_socio)['nombre'];
            if(count(separarNombreApellido($this->busqueda_socio)) > 1){
                $apellido = separarNombreApellido($this->busqueda_socio)['apellido'];
            }
            $this->resultados_busqueda_socio = Socio::with(['distrito','provincia','comuna','nacionSocio','sede','area','cargo','estadoSocio'])->orderBy('apellido1','ASC')
            ->nombres($nombre, $apellido)
            ->general($this->busqueda_socio, 'id')
            ->general($this->busqueda_socio, 'nombre1')
            ->general($this->busqueda_socio, 'nombre2')
            ->general($this->busqueda_socio, 'apellido1')
            ->general($this->busqueda_socio, 'apellido2')
            ->general($this->busqueda_socio, 'rut')
            ->general($this->busqueda_socio, 'anexo')
            ->general($this->busqueda_socio, 'numero')
            ->general($this->busqueda_socio, 'contacto')
            ->general($this->busqueda_socio, 'correo')
            ->general($this->busqueda_socio, 'direccion')
            ->get();
            $this->cargarTablaResultadosSocio();
        }

    }

    public function busquedaMasivaSocio()
    {
        $this->flag_busqueda="masiva";
        $this->resetFormBusquedaUnicaSocio();
        if($this->validarBusquedaMasivaSocio()){
            $this->emit('alerta_info', 'Debe seleccionar al menos un criterio de búsqueda.');
        }else{
            $this->resultados_busqueda_socio = Socio::with(['distrito','provincia','comuna','nacionSocio','sede','area','cargo','estadoSocio'])->orderBy('apellido1','ASC')
            ->rangoFecha($this->buscar_socio_fecha_nac_ini, $this->buscar_socio_fecha_nac_fin, 'fecha_nac')
            ->rangoFecha($this->buscar_socio_fecha_sind1_ini, $this->buscar_socio_fecha_sind1_fin, 'fecha_sind1')
            ->rangoFecha($this->buscar_socio_fecha_pucv_ini, $this->buscar_socio_fecha_pucv_fin, 'fecha_pucv')
            ->generalAnd($this->buscar_socio_genero, 'genero')
            ->generalAnd($this->buscar_socio_distrito_id, 'distrito_id')
            ->generalAnd($this->buscar_socio_provincia_id, 'provincia_id')
            ->generalAnd($this->buscar_socio_comuna_id, 'comuna_id')
            ->generalAnd($this->buscar_socio_sede_id, 'sede_id')
            ->generalAnd($this->buscar_socio_area_id, 'area_id')
            ->generalAnd($this->buscar_socio_cargo_id, 'cargo_id')
            ->generalAnd($this->buscar_socio_nacion_socio_id, 'nacion_socio_id')
            ->get();
            $this->cargarTablaResultadosSocio();
        }        

    }

    // Cargas **********************************************************************
    public function crearCarga()
    {
        // Variables livewire
        $this->validate([
            'carga_nombre1' => ['required', new NombreRule],
            'carga_nombre2' => ['nullable', new NombreRule],
            'carga_apellido1' => ['required', new NombreRule],
            'carga_apellido2' => ['nullable', new NombreRule],
            'carga_rut' => ['required',  new RutRule, 'alpha_num', 'max:9', 'unique:cargas,rut'],
            'carga_fecha' => ['required', 'date'],
            'carga_parentesco_id' => ['required'],
            'carga_socio_id' => ['required'],
        ]);
        // Campos de base de datos => valiables livewire
        $objeto = Carga::create([
            'nombre1' => $this->carga_nombre1,
            'nombre2' => $this->carga_nombre2,
            'apellido1' => $this->carga_apellido1,
            'apellido2' => $this->carga_apellido2,
            'rut' => $this->carga_rut,
            'fecha' => $this->carga_fecha,
            'parentesco_id' => $this->carga_patentesco_id,
            'socio_id' => $this->carga_socio_id,
        ]);
        $this->resetFormCarga();
        $this->cargarTablaMostrarCarga($objeto);
    }

    public function editarCarga()
    {
        // Variables livewire
        $this->validate([
            'carga_nombre1' => ['required', new NombreRule],
            'carga_nombre2' => ['nullable', new NombreRule],
            'carga_apellido1' => ['required', new NombreRule],
            'carga_apellido2' => ['nullable', new NombreRule],
            'carga_rut' => ['required',  new RutRule, 'alpha_num', 'max:9', Rule::unique('cargas')->ignore($this->objeto_carga)],
            'carga_fecha' => ['required', 'date'],
            'carga_parentesco_id' => ['required'],
            'carga_socio_id' => ['required'],
        ]);
        // Campos de base de datos => valiables livewire
        $this->objeto_carga->update([
            'nombre1' => $this->carga_nombre1,
            'nombre2' => $this->carga_nombre2,
            'apellido1' => $this->carga_apellido1,
            'apellido2' => $this->carga_apellido2,
            'rut' => $this->carga_rut,
            'fecha' => $this->carga_fecha,
            'parentesco_id' => $this->carga_patentesco_id,
            'socio_id' => $this->carga_socio_id,
        ]);
    }

    public function eliminarCarga()
    {
        $this->objeto_carga->delete();
        $this->cargarTablaListarCarga();
    }

    public function BuscarCargaUnica()
    {
        $this->resultados_busqueda_carga = Carga::with(['parentesco'])->orderBy('apellido1','ASC')
        //->nombres($nombre, $apellido)
        ->general($this->busqueda_carga, 'id')
        ->general($this->busqueda_carga, 'nombre1')
        ->general($this->busqueda_carga, 'nombre2')
        ->general($this->busqueda_carga, 'apellido1')
        ->general($this->busqueda_carga, 'apellido2')
        ->general($this->busqueda_carga, 'rut')
        ->get();
    }

    public function BuscarCargaMasiva()
    {
        $this->resultados_busqueda_carga = Carga::with(['parentesco'])->orderBy('apellido1','ASC')
        ->rangoFecha($this->buscar_carga_fecha_nac_ini, $this->buscar_carga_fecha_nac_fin, 'fecha_nac')
        ->generalAnd($this->buscar_carga_parentesco_id, 'parentesco_id')
        ->get();
    }

    // Estudios **********************************************************************
    public function crearEstudio()
    {
        // Variables livewire
        $this->validate([
            'estudio_grado_id' => ['required'],
            'estudio_establecimiento_id' => ['required'],
            'estudio_estado_estudio_id' => ['required'],
            'estudio_socio_id' => ['required'],
        ]);
        // Campos de base de datos => valiables livewire
        $objeto = Estudio::create([
            'grado_id' => $this->estudio_grado_id,
            'establecimiento_id' => $this->estudio_establecimiento_id,
            'estado_estudio_id' => $this->estudio_estado_estudio_id,
            'socio_id' => $this->estudio_socio_id,
        ]);
        $this->resetFormEstudio();
        $this->cargarTablaMostrarEstudio($objeto);
    }

    public function editarEstudio()
    {
        // Variables livewire
        $this->validate([
            'estudio_grado_id' => ['required'],
            'estudio_establecimiento_id' => ['required'],
            'estudio_estado_estudio_id' => ['required'],
            'estudio_socio_id' => ['required'],
        ]);
        // Campos de base de datos => valiables livewire
        $this->objeto_estudio->update([
            'grado_id' => $this->estudio_grado_id,
            'establecimiento_id' => $this->estudio_establecimiento_id,
            'estado_estudio_id' => $this->estudio_estado_estudio_id,
            'socio_id' => $this->estudio_socio_id,
        ]);
    }

    public function eliminarEstudio()
    {
        $this->objeto_estudio->delete();
        $this->cargarTablaListarEstudio();
    }

    public function BuscarEstudioUnico()
    {
        // No aplíca
    }

    public function BuscarEstudioMasivo()
    {
        $this->resultados_busqueda_estudio = Estudio::with(['grado','establecimiento','estadoEstudio'])->orderBy('id','ASC')
        ->generalAnd($this->estudio_grado_id, 'grado_id')
        ->generalAnd($this->estudio_establecimiento_id, 'establecimiento_id')
        ->generalAnd($this->estudio_estado_estudio_id, 'estado_estudio_id')
        ->get();
    }

    /**
     * VERIFICACIÓN DE CAMBIOS AL EDITAR
     */
    // Socios **********************************************************************
    public function edicionSocios($socio)
    {
        unset($socio['id']);
        unset($socio['estado_socio_id']);
        unset($socio['deleted_at']);
        unset($socio['created_at']);
        unset($socio['updated_at']);
        $nuevos_datos = $this->crearArregloEdicionSocio();
        return count(array_diff_assoc($socio,$nuevos_datos));
    }

    public function crearArregloEdicionSocio()
    {
        return array(
            'nombre1' => $this->socio_nombre1,
            'nombre2' => $this->socio_nombre2,
            'apellido1' => $this->socio_apellido1,
            'apellido2' => $this->socio_apellido2,
            'rut' => $this->socio_rut,
            'genero' => $this->socio_genero,
            'fecha_nac' => $this->socio_fecha_nac,
            'contacto' => $this->socio_contacto,
            'correo' => $this->socio_correo,
            'direccion' => $this->socio_direccion,
            'fecha_sind1' => $this->socio_fecha_sind1,
            'numero' => $this->socio_numero,
            'anexo' => $this->socio_anexo,
            'fecha_pucv' => $this->socio_fecha_pucv,
            'distrito_id' => $this->socio_distrito_id,
            'provincia_id' => $this->socio_provincia_id,
            'comuna_id' => $this->socio_comuna_id,
            'cargo_id' => $this->socio_cargo_id,
            'sede_id' => $this->socio_sede_id,
            'area_id' => $this->socio_area_id,
            'nacion_socio_id' => $this->socio_nacion_socio_id,
        );
    }

    // Cargas **********************************************************************
    public function edicionCarga($carga)
    {
        unset($carga['id']);
        unset($carga['created_at']);
        unset($carga['updated_at']);
        $nuevos_datos = $this->crearArregloEdicionCarga();
        return count(array_diff_assoc($carga,$nuevos_datos));
    }

    public function crearArregloEdicionCarga()
    {
        return array(
            'nombre1' => $this->carga_nombre1,
            'nombre2' => $this->carga_nombre2,
            'apellido1' => $this->carga_apellido1,
            'apellido2' => $this->carga_apellido2,
            'rut' => $this->carga_rut,
            'fecha' => $this->carga_fecha,
            'parentesco_id' => $this->carga_patentesco_id,
            'socio_id' => $this->carga_socio_id,
        );
    }

    // Estudio *********************************************************************
    public function edicionEstudio($estudio)
    {
        unset($estudio['id']);
        unset($estudio['created_at']);
        unset($estudio['updated_at']);
        $nuevos_datos = $this->crearArregloEdicionEstudio();
        return count(array_diff_assoc($estudio,$nuevos_datos));
    }

    public function crearArregloEdicionEstudio()
    {
        return array(
            'grado_id' => $this->estudio_grado_id,
            'establecimiento_id' => $this->estudio_establecimiento_id,
            'estado_estudio_id' => $this->estudio_estado_estudio_id,
            'socio_id' => $this->estudio_socio_id,
        );
    }

    /**
     * VALIDACIÓN DE FORMULARIOS BUSCAR
     */
    // Socio **********************************************************************
    public function validarBusquedaUnicaSocio()
    {
        if($this->busqueda_socio === NULL){
            return true;
        }
        return false;
    }

    public function validarBusquedaMasivaSocio()
    {
        if( $this->buscar_socio_genero === NULL &&
            $this->buscar_socio_fecha_nac_ini === NULL &&
            $this->buscar_socio_fecha_nac_fin === NULL &&
            $this->buscar_socio_fecha_sind1_ini === NULL &&
            $this->buscar_socio_fecha_sind1_fin === NULL &&
            $this->buscar_socio_fecha_pucv_ini === NULL &&
            $this->buscar_socio_fecha_pucv_fin === NULL &&
            $this->buscar_socio_distrito_id === NULL &&
            $this->buscar_socio_provincia_id === NULL &&
            $this->buscar_socio_comuna_id === NULL &&
            $this->buscar_socio_sede_id === NULL &&
            $this->buscar_socio_area_id === NULL &&
            $this->buscar_socio_cargo_id === NULL &&
            $this->buscar_socio_nacion_socio_id === NULL ){
            return true;
        }
        return false;
    }

    // Carga **********************************************************************
    public function validarBusquedaUnicaCarga()
    {
        if($this->busqueda_carga === NULL){
            return true;
        }
        return false;
    }

    public function validarBusquedaMasivaCarga()
    {
        if( $this->buscar_carga_fecha_nac_ini === NULL &&
            $this->buscar_carga_fecha_nac_fin === NULL &&
            $this->buscar_carga_parentesco_id === NULL ){
            return true;
        }
        return false;
    }

    // Estudio ********************************************************************
    public function validarBusquedaUnicaEstudio()
    {
        if($this->busqueda_estudio === NULL){
            return true;
        }
        return false;
    }

    public function validarBusquedaMasivaEstudio()
    {
        if( $this->buscar_estudio_grado_id === NULL &&
            $this->buscar_estudio_establecimiento_id === NULL &&
            $this->buscar_estudio_estado_estudio_id === NULL ){
            return true;
        }
        return false;
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

    public function resetFormBusquedaUnicaSocio()
    {
        $this->busqueda_socio = NULL;
    }

    public function resetFormEliminarSocio()
    {
        $this->socio_estado_socio_id = NULL;
    }

    public function resetFormBusquedaMasivaSocio()
    {
        $this->buscar_socio_fecha_nac_ini = NULL;
        $this->buscar_socio_fecha_nac_fin = NULL;
        $this->buscar_socio_fecha_sind1_ini = NULL;
        $this->buscar_socio_fecha_sind1_fin = NULL;
        $this->buscar_socio_fecha_pucv_ini = NULL;
        $this->buscar_socio_fecha_pucv_fin = NULL;
        $this->buscar_socio_genero = NULL;
        $this->buscar_socio_distrito_id = NULL;
        $this->buscar_socio_provincia_id = NULL;
        $this->buscar_socio_comuna_id = NULL;
        $this->buscar_socio_sede_id = NULL;
        $this->buscar_socio_area_id = NULL;
        $this->buscar_socio_cargo_id = NULL;
        $this->buscar_socio_nacion_socio_id = NULL;
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

    public function resetFormBusquedaUnicaCarga()
    {
        $this->busqueda_carga = NULL;
    }

    public function resetFormBusquedaMasivaCarga()
    {
        $this->buscar_carga_fecha_nac_ini = NULL;
        $this->buscar_carga_fecha_nac_fin = NULL;
        $this->buscar_carga_parentesco_id = NULL;
    }

    // Estudio ********************************************************************
    public function resetFormEstudio()
    {
        $this->estudio_grado_id = NULL;
        $this->estudio_establecimiento_id = NULL;
        $this->estudio_estado_estudio_id = NULL;
        $this->estudio_socio_id  = NULL;
    }

    public function resetFormBusquedaUnicaEstudio()
    {
        $this->busqueda_estudio = NULL;
    }

    public function resetFormBusquedaMasivaEstudio()
    {
        $this->buscar_estudio_grado_id = NULL;
        $this->buscar_estudio_establecimiento_id = NULL;
        $this->buscar_estudio_estado_estudio_id = NULL;
    }

    public function resetFormsNuevosSocio()
    {
        $this->resetMensajesErrorValidadion();
        $this->nueva_region = NULL;
        $this->nueva_provincia = NULL;
        $this->nueva_comuna = NULL;
        $this->nueva_sede = NULL;
        $this->nueva_area = NULL;
        $this->nuevo_cargo = NULL;
        $this->nueva_nacion = NULL;
        $this->nueva_region_modal = NULL;
        $this->nueva_provincia_modal = NULL;
        $this->nueva_sede_modal = NULL;
    }

    public function resetFormsNuevosCarga()
    {
        $this->resetMensajesErrorValidadion();
        $this->nuevo_parentesco = NULL;  
    }

    public function resetFormsNuevosEstudio()
    {
        $this->resetMensajesErrorValidadion();        
        $this->nuevo_grado = NULL;
        $this->nuevo_establecimiento = NULL;
        $this->nuevo_estado_estudio = NULL;        
    }

    public function resetMensajesErrorValidadion()
    {
        $this->resetErrorBag();
        $this->resetValidation();
    }
}
