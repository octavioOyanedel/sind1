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
    public $fechaNac;
    public $contacto;
    public $correo;
    public $fechaPucv;
    public $anexo;
    public $fechaSind1;
    public $direccion;
    // Variable id para edicion de socio
    public $id_socio;
    // Variable para mostrar socio
    public $socio;
    // Variable busqueda unica
    public $valor_busqueda;
    public $fechaNacIni;
    public $fechaNacFin;
    public $fechaSind1Ini;
    public $fechaSind1Fin;
    public $fechaPucvIni;
    public $fechaPucvFin;
    // Registros encontrados
    public $encontrados = [];
    public $flag_busqueda;
    // Variables select para evitar duplicado de mensajes de error entre modal y form principal
    public $regionModal;
    public $provinciaModal;
    public $sedeModal;    
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
            'fechaNac' => ['nullable', 'date'],
            'contacto' => ['nullable', 'numeric'],
            'correo' => ['nullable', 'email', 'unique:socios,correo'],
            'fechaPucv' => ['nullable', 'date'],
            'anexo' => ['nullable', 'numeric'],
            'fechaSind1' => ['nullable', 'date'],
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
            'fecha_nac' => $this->fechaNac,
            'contacto' => $this->contacto,
            'correo' => $this->correo,
            'fecha_pucv' => $this->fechaPucv,
            'anexo' => $this->anexo,
            'fecha_sind1' => $this->fechaSind1,
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
        $this->emit('alertaOk', 'Socio Incorporado.');
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
                'fechaNac' => ['nullable', 'date'],
                'contacto' => ['nullable', 'numeric'],
                'correo' => ['nullable', 'email', Rule::unique('socios')->ignore($socio)],
                'fechaPucv' => ['nullable', 'date'],
                'anexo' => ['nullable', 'numeric'],
                'fechaSind1' => ['nullable', 'date'],
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
                'fecha_nac' => $this->fechaNac,
                'contacto' => $this->contacto,
                'correo' => $this->correo,
                'fecha_pucv' => $this->fechaPucv,
                'anexo' => $this->anexo,
                'fecha_sind1' => $this->fechaSind1,
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
            $this->emit('alertaOk', 'Socio Editado.');
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
        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Socio Desvinculado.');
    }

    /**
     * Búsquedas unica y masiva de socios
     */
    public function busquedaUnica()
    {
        $this->resetFormBusquedaMasiva();
        if($this->validacionBusquedaUnica()){
            $this->emit('alertaInfo', 'Debe ingresar búsqueda.');
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
            $this->emit('alertaInfo', 'Debe seleccionar al menos un criterio de búsqueda.');
        }else{
            $this->encontrados = Socio::with(['distrito','provincia','comuna','nacionSocio','sede','area','cargo','estadoSocio'])->orderBy('apellido1','ASC')
            ->rangoFecha($this->fechaNacIni, $this->fechaNacFin, 'fecha_nac')
            ->rangoFecha($this->fechaSind1Ini, $this->fechaSind1Fin, 'fecha_sind1')
            ->rangoFecha($this->fechaPucvIni, $this->fechaPucvFin, 'fecha_pucv')
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
        //$this->flag_busqueda = NULL; 
        $this->forms = "_crear_editar";
        $this->titulo_form = "Incorporar Socio";
        $this->boton = "crear";       
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
        $this->fechaNac = $socio->fecha_nac;
        $this->contacto = $socio->contacto;
        $this->correo = $socio->correo;
        $this->fechaPucv = $socio->fecha_pucv;
        $this->anexo = $socio->anexo;
        $this->fechaSind1 = $socio->fecha_sind1;
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
        $this->emit('limpiarErrores');
        $this->resetFormEliminar();
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
        $this->fechaNac = NULL;
        $this->contacto = NULL;
        $this->correo = NULL;
        $this->fechaPucv = NULL;
        $this->anexo = NULL;
        $this->fechaSind1 = NULL;
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
        $this->nueva_region = NULL;
        $this->nueva_provincia = NULL;
        $this->nueva_comuna = NULL;
        $this->nueva_sede = NULL;
        $this->nueva_area = NULL;
        $this->nuevo_cargo = NULL;
        $this->nueva_nacion = NULL;
        $this->regionModal = NULL;
        $this->provinciaModal = NULL;
        $this->sedeModal = NULL;
        $this->emit('limpiarErrores'); 
    }

    public function resetFormBusquedaUnica(){
        $this->valor_busqueda = NULL;
    }

    public function resetFormEliminar(){
        $this->estado = NULL;
    }

    public function resetFormBusquedaMasiva()
    {
        $this->fechaNacIni = NULL;
        $this->fechaNacFin = NULL;
        $this->fechaSind1Ini = NULL;
        $this->fechaSind1Fin = NULL;
        $this->fechaPucvIni = NULL;
        $this->fechaPucvFin = NULL;
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

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Región Agregada.');
    }

    public function nuevaProvincia()
    {
        $this->validate([
            'regionModal' => 'required',
            'nueva_provincia' => ['required', new NombreRule, 'unique:provincias,nombre']
		]);

		Provincia::create([
            'nombre' => $this->nueva_provincia,
            'distrito_id' => $this->regionModal
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Provincia Agregada.');
    }

    public function nuevaComuna()
    {
        $this->validate([
            'provinciaModal' => 'required',
            'nueva_comuna' => ['required', new NombreRule, 'unique:comunas,nombre']
		]);

		Comuna::create([
            'nombre' => $this->nueva_comuna,
            'provincia_id' => $this->provincia
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Comuna Agregada.');
    }

    public function nuevaSede()
    {
        $this->validate([
            'nueva_sede' => ['required', new NombreRule, 'unique:sedes,nombre']
		]);

		Sede::create([
            'nombre' => $this->nueva_sede,
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Sede Agregada.');
    }

    public function nuevaArea()
    {
        $this->validate([
            'sedeModal' => 'required',
            'nueva_area' => ['required', new NombreRule, 'unique:areas,nombre']
		]);

		Area::create([
            'nombre' => $this->nueva_area,
            'sede_id' => $this->sede
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Área Agregada.');
    }

    public function nuevoCargo()
    {
        $this->validate([
            'nuevo_cargo' => ['required', new NombreRule, 'unique:cargos,nombre']
		]);

		Cargo::create([
            'nombre' => $this->nuevo_cargo,
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Cargo Agregado.');
    }

    public function nuevaNacion()
    {
        $this->validate([
            'nueva_nacion' => ['required', new NombreRule, 'unique:nacion_socios,nombre']
		]);

		NacionSocio::create([
            'nombre' => $this->nueva_nacion,
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Nacionalidad Agregada.');
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
            $this->fechaNacIni === NULL && 
            $this->fechaNacFin === NULL &&
            $this->fechaSind1Ini === NULL &&
            $this->fechaSind1Fin === NULL &&
            $this->fechaPucvIni === NULL &&
            $this->fechaPucvFin === NULL &&
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
            "fecha_nac" => $this->fechaNac,
            "contacto" => $this->contacto,
            "correo" => $this->correo,
            "direccion" => $this->direccion,
            "fecha_sind1" => $this->fechaSind1,
            "numero" => $this->numero,
            "anexo" => $this->anexo,
            "fecha_pucv" => $this->fechaPucv,
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
