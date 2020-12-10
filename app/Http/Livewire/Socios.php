<?php

namespace App\Http\Livewire;

use App\Models\Area;
use App\Models\Cargo;
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
     * Coleciones para selects
     */
    public $regiones = [];
    public $provincias = [];
    public $comunas = [];
    public $sedes = [];
    public $areas = [];
    public $cargos = [];
    public $naciones = [];
    public $estados = [];
    /**
     * Variables livewire 2way binding
     */
    public $region;
    public $provincia;
    public $comuna;
    public $sede;
    public $area;
    public $cargo;
    public $nacion;
    public $estado;
    // Nuevos registros
    public $nueva_region;
    public $nueva_provincia;
    public $nueva_comuna;
    public $nueva_sede;
    public $nueva_area;
    public $nuevo_cargo;
    public $nueva_nacion;
    // Form socios
    public $rut;
    public $numero;
    public $nombre1;
    public $nombre2;
    public $apellido1;
    public $apellido2;
    public $genero;
    public $fecha_nac;
    public $contacto;
    public $correo;
    public $fecha_pucv;
    public $anexo;
    public $fecha_sind1;
    public $direccion;
    // Variable id para edicion de socio
    public $id_socio;
    // Variable para mostrar socio
    public $socio;
    // Variable busqueda unica
    public $valor_busqueda;
    public $fecha_nac_ini;
    public $fecha_nac_fin;
    public $fecha_sind1_ini;
    public $fecha_sind1_fin;
    public $fecha_pucv_ini;
    public $fecha_pucv_fin;
    // Registros encontrados
    public $encontrados = [];
    public $flag_busqueda;
    // Variables select para evitar duplicado de mensajes de error entre modal y form principal
    public $region_modal;
    public $provincia_modal;
    public $sede_modal;
    // Variables cargas familiares
    public $parentescos = [];
    public $parentesco;
    
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

    public function test()
    {
        $this->emit('continuar_carga');
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

        // Obtención de elementos anidados para poblar selects
    	if (!empty($this->region)) {
    		$this->provincias = Provincia::where('distrito_id', $this->region)->get();
    	}
    	if (!empty($this->provincia)) {
    		$this->comunas = Comuna::where('provincia_id', $this->provincia)->get();
        }
    	if (!empty($this->sede)) {
    		$this->areas = Area::where('sede_id', $this->sede)->get();
        }
    }

    /**
     * Acciones CRUD
     */
    public function create()
    {
        $this->validate([
            'rut' => ['required',  new RutRule, 'alpha_num', 'max:9', 'unique:socios,rut'],
            'numero' => ['required', 'numeric', 'unique:socios,numero'],
            'nombre1' => ['required', new NombreRule],
            'nombre2' => ['nullable', new NombreRule],
            'apellido1' => ['required', new NombreRule],
            'apellido2' => ['nullable', new NombreRule],
            'genero' => ['required', 'alpha'],
            'fecha_nac' => ['nullable', 'date'],
            'contacto' => ['nullable', 'numeric'],
            'correo' => ['nullable', 'email', 'unique:socios,correo'],
            'fecha_pucv' => ['nullable', 'date'],
            'anexo' => ['nullable', 'numeric'],
            'fecha_sind1' => ['nullable', 'date'],
            'region' => ['nullable'],
            'provincia' => ['nullable'],
            'comuna' => ['nullable'],
            'direccion' => ['nullable', new DireccionRule],
            'sede' => ['nullable'],
            'area' => ['nullable'],
            'cargo' => ['nullable'],
            'nacion' => ['nullable'],
        ]);

        $socio = Socio::create([
            'rut' => $this->rut,
            'numero' => $this->numero,
            'nombre1' => $this->nombre1,
            'nombre2' => $this->nombre2,
            'apellido1' => $this->apellido1,
            'apellido2' => $this->apellido2,
            'genero' => $this->genero,
            'fecha_nac' => $this->fecha_nac,
            'contacto' => $this->contacto,
            'correo' => $this->correo,
            'fecha_pucv' => $this->fecha_pucv,
            'anexo' => $this->anexo,
            'fecha_sind1' => $this->fecha_sind1,
            'distrito_id' => $this->region,
            'provincia_id' => $this->provincia,
            'comuna_id' => $this->comuna,
            'sede_id' => $this->sede,
            'area_id' => $this->area,
            'cargo_id' => $this->cargo,
            'nacion_socio_id' => $this->nacion
        ]);

        $this->resetFormsCrearEditar();
        $this->cargarTablaSocio($socio);
        $this->emit('nueva_carga');
        //$this->emit('alerta_ok', 'Socio Incorporado.');
    }

    public function createCarga()
    {
        $this->validate([
            'rut' => ['required',  new RutRule, 'alpha_num', 'max:9', 'unique:cargas,rut'],
            'nombre1' => ['required', new NombreRule],
            'nombre2' => ['nullable', new NombreRule],
            'apellido1' => ['required', new NombreRule],
            'apellido2' => ['nullable', new NombreRule],
            'fecha_nac' => ['nullable', 'date'],
            'parentesco' => ['nullable'],
        ]);

        $socio = Carga::create([
            'rut' => $this->rut,
            'nombre1' => $this->nombre1,
            'nombre2' => $this->nombre2,
            'apellido1' => $this->apellido1,
            'apellido2' => $this->apellido2,
            'fecha_nac' => $this->fecha_nac,
            'parentesco_id' => $this->parentesco
        ]);

        $this->resetFormsCrearEditar();
        $this->cargarTablaSocio($socio);
        $this->emit('alerta_ok', 'Carga Familiar Incorporada.');
    }

    public function update()
    {
        $socio = Socio::findOrfail($this->id_socio);
        if($this->registrosEditados($socio->toArray()) > 0){
            $this->validate([
                'rut' => ['required',  new RutRule, 'alpha_num', 'max:9', Rule::unique('socios')->ignore($socio)],
                'numero' => ['required', 'numeric', Rule::unique('socios')->ignore($socio)],
                'nombre1' => ['required', new NombreRule],
                'nombre2' => ['nullable', new NombreRule],
                'apellido1' => ['required', new NombreRule],
                'apellido2' => ['nullable', new NombreRule],
                'genero' => ['required', 'alpha'],
                'fecha_nac' => ['nullable', 'date'],
                'contacto' => ['nullable', 'numeric'],
                'correo' => ['nullable', 'email', Rule::unique('socios')->ignore($socio)],
                'fecha_pucv' => ['nullable', 'date'],
                'anexo' => ['nullable', 'numeric'],
                'fecha_sind1' => ['nullable', 'date'],
                'region' => ['nullable'],
                'provincia' => ['nullable'],
                'comuna' => ['nullable'],
                'direccion' => ['nullable', new DireccionRule],
                'sede' => ['nullable'],
                'area' => ['nullable'],
                'cargo' => ['nullable'],
                'nacion' => ['nullable'],
            ]);

            $socio->update([
                'rut' => $this->rut,
                'numero' => $this->numero,
                'nombre1' => $this->nombre1,
                'nombre2' => $this->nombre2,
                'apellido1' => $this->apellido1,
                'apellido2' => $this->apellido2,
                'genero' => $this->genero,
                'fecha_nac' => $this->fecha_nac,
                'contacto' => $this->contacto,
                'correo' => $this->correo,
                'fecha_pucv' => $this->fecha_pucv,
                'anexo' => $this->anexo,
                'fecha_sind1' => $this->fecha_sind1,
                'distrito_id' => $this->region,
                'provincia_id' => $this->provincia,
                'comuna_id' => $this->comuna,
                'direccion' => $this->direccion,
                'sede_id' => $this->sede,
                'area_id' => $this->area,
                'cargo_id' => $this->cargo,
                'nacion_socio_id' => $this->nacion
            ]);

            $this->forms = "_crear_editar";
            $this->titulo_form = "Incorporar Socio";
            $this->boton = "crear";
            $this->resetFormsCrearEditar();
            $this->cargarTablaSocio($socio);
            $this->emit('alerta_ok', 'Socio Editado.');
        }else{
            $this->emit('alertaInfo', 'No se han hecho modificaciones en formulario.');
        }
    }

    public function delete()
    {
        $this->validate([
            'estado' => 'required',
        ]);

        $socio = Socio::findOrFail($this->id_socio);
        $socio->estado_socio_id = $this->estado;
        $socio->update();
        $socio->delete();
        $this->cargarTablaListar();
        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Socio Desvinculado.');
    }

    /**
     * Búsquedas unica y masiva de socios
     */
    public function busquedaUnica()
    {
        $this->resetFormBusquedaMasiva();
        if($this->validacionBusquedaUnica()){
            $this->emit('alerta_info', 'Debe ingresar búsqueda.');
        }else{
            $nombre = separarNombreApellido($this->valor_busqueda)['nombre'];
            if(count(separarNombreApellido($this->valor_busqueda)) > 1){
                $apellido = separarNombreApellido($this->valor_busqueda)['apellido'];
            }
            $this->encontrados = Socio::with(['distrito','provincia','comuna','nacionSocio','sede','area','cargo','estadoSocio'])->orderBy('apellido1','ASC')
            ->nombres($nombre, $apellido)
            ->general($this->valor_busqueda, 'id')
            ->general($this->valor_busqueda, 'nombre1')
            ->general($this->valor_busqueda, 'nombre2')
            ->general($this->valor_busqueda, 'apellido1')
            ->general($this->valor_busqueda, 'apellido2')
            ->general($this->valor_busqueda, 'rut')
            ->general($this->valor_busqueda, 'anexo')
            ->general($this->valor_busqueda, 'numero')
            ->general($this->valor_busqueda, 'contacto')
            ->general($this->valor_busqueda, 'correo')
            ->general($this->valor_busqueda, 'direccion')
            ->get();
            $this->tablas = "_resultados";
            $this->titulo_tabla = "Resultados:";
            $this->flag_busqueda = "unica";
        }
    }

    public function busquedaMasiva()
    {
        $this->resetFormBusquedaUnica();
        if($this->validacionBusquedaMasiva()){
            $this->emit('alerta_info', 'Debe seleccionar al menos un criterio de búsqueda.');
        }else{
            $this->encontrados = Socio::with(['distrito','provincia','comuna','nacionSocio','sede','area','cargo','estadoSocio'])->orderBy('apellido1','ASC')
            ->rangoFecha($this->fecha_nac_ini, $this->fecha_nac_fin, 'fecha_nac')
            ->rangoFecha($this->fecha_sind1_ini, $this->fecha_sind1_fin, 'fecha_sind1')
            ->rangoFecha($this->fecha_pucv_ini, $this->fecha_pucv_fin, 'fecha_pucv')
            ->generalAnd($this->genero, 'genero')
            ->generalAnd($this->region, 'distrito_id')
            ->generalAnd($this->provincia, 'provincia_id')
            ->generalAnd($this->comuna, 'comuna_id')
            ->generalAnd($this->sede, 'sede_id')
            ->generalAnd($this->area, 'area_id')
            ->generalAnd($this->cargo, 'cargo_id')
            ->generalAnd($this->nacion, 'nacion_socio_id')
            ->get();
            $this->tablas = "_resultados";
            $this->flag_busqueda = "masiva";
        }
    }

    /**
     * Carga de vistas (tablas y forms)
     */
    public function cargarFormCreate()
    {
        $this->forms = "_crear_editar";
        $this->titulo_form = "Incorporar Socio";
        $this->boton = "crear";
    }

    public function cargarFormCreateCarga()
    {
        $this->forms = "_crear_editar_carga";
        $this->titulo_form = "Agregar Carga Familiar";
        $this->boton = "crear";

    }

    public function cargarFormEstudio()
    {
        //$this->forms = "_crear_editar_carga";
        //$this->titulo_form = "Agregar Carga Familiar";
        //$this->boton = "crear";
        //$this->emit('cerrar_modal');
    }

    public function cargarFormEdit(Socio $socio)
    {
        // captura de id para su posterior edición
        $this->prepararSocio($socio);
        $this->forms = "_crear_editar";
        $this->titulo_form = "Editar Socio";
        $this->boton = "Editar";
        $this->poblarFormEditar($socio);
    }

    public function cargarFormBuscar()
    {
        $this->resetFormBusquedaUnica();
        $this->resetFormBusquedaMasiva();
        $this->alistarColecciones();
        $this->forms = "_buscar";
        $this->titulo_form = "Buscar Socio/s";
    }

    public function cargarTablaSocio(Socio $socio)
    {
        if($this->validacionBusquedaUnica() && $this->validacionBusquedaUnica()){
            $this->flag_busqueda = NULL;
        }
        $this->socio = $socio;
        $this->tablas = "_ver";
        $this->titulo_tabla = "Info Socio";
    }

    public function cargarTablaListar()
    {
        $this->tablas = "_listar";
        $this->titulo_tabla = "Listado de Socios";
    }

    /**
     * Poblado de forms y captura de objeto socio
     */
    public function poblarFormEditar(Socio $socio)
    {
        $this->rut = $socio->rut;
        $this->numero = $socio->numero;
        $this->nombre1 = $socio->nombre1;
        $this->nombre2 = $socio->nombre2;
        $this->apellido1 = $socio->apellido1;
        $this->apellido2 = $socio->apellido2;
        $this->genero = $socio->genero;
        $this->fecha_nac = $socio->fecha_nac;
        $this->contacto = $socio->contacto;
        $this->correo = $socio->correo;
        $this->fecha_pucv = $socio->fecha_pucv;
        $this->anexo = $socio->anexo;
        $this->fecha_sind1 = $socio->fecha_sind1;
        $this->direccion = $socio->direccion;
        $this->region = $socio->distrito_id;
        $this->provincia = $socio->provincia_id;
        $this->comuna = $socio->comuna_id;
        $this->sede = $socio->sede_id;
        $this->area = $socio->area_id;
        $this->cargo = $socio->cargo_id;
        $this->nacion = $socio->nacion_socio_id;
    }

    public function prepararSocio(Socio $socio)
    {
        $this->resetFormEliminar();
        $this->resetFormsNuevos();
        $this->id_socio = $socio->id;
    }

    /**
     * Reset Formularios
     */
    public function resetFormsCrearEditar()
    {
        $this->rut = NULL;
        $this->numero = NULL;
        $this->nombre1 = NULL;
        $this->nombre2 = NULL;
        $this->apellido1 = NULL;
        $this->apellido2 = NULL;
        $this->genero = NULL;
        $this->fecha_nac = NULL;
        $this->contacto = NULL;
        $this->correo = NULL;
        $this->fecha_pucv = NULL;
        $this->anexo = NULL;
        $this->fecha_sind1 = NULL;
        $this->region = NULL;
        $this->provincia = NULL;
        $this->comuna = NULL;
        $this->direccion = NULL;
        $this->sede = NULL;
        $this->area = NULL;
        $this->cargo = NULL;
        $this->nacion = NULL;
    }

    public function resetFormsNuevos()
    {
        $this->resetErrorBag();
        $this->resetValidation();
        $this->nueva_region = NULL;
        $this->nueva_provincia = NULL;
        $this->nueva_comuna = NULL;
        $this->nueva_sede = NULL;
        $this->nueva_area = NULL;
        $this->nuevo_cargo = NULL;
        $this->nueva_nacion = NULL;
        $this->region_modal = NULL;
        $this->provincia_modal = NULL;
        $this->sede_modal = NULL;
    }

    public function resetFormBusquedaUnica(){
        $this->valor_busqueda = NULL;
    }

    public function resetFormEliminar(){
        $this->estado = NULL;
    }

    public function resetFormBusquedaMasiva()
    {
        $this->fecha_nac_ini = NULL;
        $this->fecha_nac_fin = NULL;
        $this->fecha_sind1_ini = NULL;
        $this->fecha_sind1_fin = NULL;
        $this->fecha_pucv_ini = NULL;
        $this->fecha_pucv_fin = NULL;
        $this->genero = NULL;
        $this->region = NULL;
        $this->provincia = NULL;
        $this->comuna = NULL;
        $this->sede = NULL;
        $this->area = NULL;
        $this->cargo = NULL;
        $this->nacion = NULL;
    }

    /**
     * Nuevos registros via ventanas modales
     */
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
            'region_modal' => 'required',
            'nueva_provincia' => ['required', new NombreRule, 'unique:provincias,nombre']
		]);

		Provincia::create([
            'nombre' => $this->nueva_provincia,
            'distrito_id' => $this->region_modal
        ]);

        $this->emit('cerrar_modal');
        $this->emit('alerta_ok', 'Provincia Agregada.');
    }

    public function nuevaComuna()
    {
        $this->validate([
            'provincia_modal' => 'required',
            'nueva_comuna' => ['required', new NombreRule, 'unique:comunas,nombre']
		]);

		Comuna::create([
            'nombre' => $this->nueva_comuna,
            'provincia_id' => $this->provincia
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
            'sede_modal' => 'required',
            'nueva_area' => ['required', new NombreRule, 'unique:areas,nombre']
		]);

		Area::create([
            'nombre' => $this->nueva_area,
            'sede_id' => $this->sede
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
    /**
     * Validacion de formularios vacios (nuevos o búsqueda) o sin cambios (editar)
     */
    public function validacionBusquedaUnica()
    {
        if($this->valor_busqueda === NULL){
            return true;
        }
        return false;
    }

    public function validacionBusquedaMasiva()
    {
        if( $this->genero === NULL &&
            $this->fecha_nac_ini === NULL &&
            $this->fecha_nac_fin === NULL &&
            $this->fecha_sind1_ini === NULL &&
            $this->fecha_sind1_fin === NULL &&
            $this->fecha_pucv_ini === NULL &&
            $this->fecha_pucv_fin === NULL &&
            $this->region === NULL &&
            $this->provincia === NULL &&
            $this->comuna === NULL &&
            $this->sede === NULL &&
            $this->area === NULL &&
            $this->cargo === NULL &&
            $this->nacion === NULL ){
            return true;
        }
        return false;
    }

    /**
     * Helpers propios
     */
    public function registrosEditados($socio)
    {
        unset($socio['id']);
        unset($socio['estado_socio_id']);
        unset($socio['deleted_at']);
        unset($socio['created_at']);
        unset($socio['updated_at']);
        $nuevos_datos = $this->crearArregloNuevosDatos();
        return count(array_diff_assoc($socio,$nuevos_datos));
    }

    public function crearArregloNuevosDatos()
    {
        return array(
            "nombre1" => $this->nombre1,
            "nombre2" => $this->nombre2,
            "apellido1" => $this->apellido1,
            "apellido2" => $this->apellido2,
            "rut" => $this->rut,
            "genero" => $this->genero,
            "fecha_nac" => $this->fecha_nac,
            "contacto" => $this->contacto,
            "correo" => $this->correo,
            "direccion" => $this->direccion,
            "fecha_sind1" => $this->fecha_sind1,
            "numero" => $this->numero,
            "anexo" => $this->anexo,
            "fecha_pucv" => $this->fecha_pucv,
            "distrito_id" => $this->region,
            "provincia_id" => $this->provincia,
            "comuna_id" => $this->comuna,
            "cargo_id" => $this->cargo,
            "sede_id" => $this->sede,
            "area_id" => $this->area,
            "nacion_socio_id" => $this->nacion,
        );
    }
}
