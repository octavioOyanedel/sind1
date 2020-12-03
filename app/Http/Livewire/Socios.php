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
use Livewire\Component;
use App\Rules\NombreRule;
use App\Rules\RutRule;
use App\Rules\DireccionRule;
use Illuminate\Validation\Rule;

class Socios extends Component
{
    /**
     * Nombres vistas y componentes dinámicos de vistas
     */
    public $forms = "_crear_editar";
    public $titulo = "Incorporar Socio";
    public $boton = "crear";
    public $tablas = "_listar";

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
    public $socios = [];

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

    public function render()
    {
        $this->socios = Socio::with(['sede','area','cargo'])->orderBy('created_at', 'DESC')->get();
        $this->alistarColecciones();
        return view('livewire.socios');
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
     * Nuevo socio
     */
    public function incorporarSocio()
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

        Socio::create([
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

        $this->resetForm();
        $this->emit('alertaOk', 'Socio Incorporado.');
    }

    /**
     * Mostrar form editar socio
     */
    public function cargarFormEditar(Socio $socio)
    {
        $this->forms = "_crear_editar";
        $this->titulo = "Editar Socio";
        $this->boton = "editar";
        // captura de id para su posterior edición
        $this->id_socio = $socio->id;
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

    /**
     * Editar socio
     */
    public function editarSocio()
    {
        $socio = Socio::findOrfail($this->id_socio);
        if($this->datosEditados($socio->toArray()) > 0){
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

            $this->resetForm();
            $this->emit('alertaOk', 'Socio Editado.');
            $this->forms = "_crear_editar";
            $this->titulo = "Incorporar Socio";
            $this->boton = "crear";
        }else{
            $this->emit('alertaInfo', 'No se han hecho modificaciones en formulario.');
        }
    }

    /**
     * Mostrar Socio
     */
    public function mostrarSocio(Socio $socio)
    {
        $this->socio = $socio;
        $this->tablas = "_ver";
    }

    /**
     * Nueva región
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

    /**
     * Nueva provincia
     */
    public function nuevaProvincia()
    {
        $this->validate([
            'region' => 'required',
            'nueva_provincia' => ['required', new NombreRule, 'unique:provincias,nombre']
		]);

		Provincia::create([
            'nombre' => $this->nueva_provincia,
            'distrito_id' => $this->region
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Provincia Agregada.');
    }

    /**
     * Nueva provincia
     */
    public function nuevaComuna()
    {
        $this->validate([
            'provincia' => 'required',
            'nueva_comuna' => ['required', new NombreRule, 'unique:comunas,nombre']
		]);

		Comuna::create([
            'nombre' => $this->nueva_comuna,
            'provincia_id' => $this->provincia
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Comuna Agregada.');
    }

    /**
     * Nueva sede
     */
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

    /**
     * Nueva area
     */
    public function nuevaArea()
    {
        $this->validate([
            'sede' => 'required',
            'nueva_area' => ['required', new NombreRule, 'unique:areas,nombre']
		]);

		Area::create([
            'nombre' => $this->nueva_area,
            'sede_id' => $this->sede
        ]);

        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Área Agregada.');
    }

    /**
     * Nueva cargo
     */
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

    /**
     * Nueva nacion
     */
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
     * Limpiar campos de formularios de ventanas modales
     */
    public function limpiarModalForm()
    {
        $this->nueva_region = NULL;
        $this->nueva_provincia = NULL;
        $this->nueva_comuna = NULL;
        $this->nueva_sede = NULL;
        $this->nueva_area = NULL;
        $this->nuevo_cargo = NULL;
        $this->nueva_nacion = NULL;
    }

    /**
     * Limpiar campos de formularios
     */
    public function limpiarForm()
    {

    }

    /**
     * Reset 2way binding
     */
    public function resetForm()
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

    /**
     * Compara si existen cambios en formulario
     */
    public function datosEditados($socio)
    {
        unset($socio['id']);
        unset($socio['estado_socio_id']);
        unset($socio['deleted_at']);
        unset($socio['created_at']);
        unset($socio['updated_at']);
        $nuevos_datos = $this->crearArregloNuevosDatos();
        return count(array_diff_assoc($socio,$nuevos_datos));
    }
    /**
     * Crea arreglo asociativo con nuevos valores para comparación
     */
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

    /**
     * Cambia a form buscar
     */
    public function mostrarFormBuscar()
    {
        $this->valor_busqueda = '';
        $this->alistarColecciones();
        //$this->resetForm();
        $this->forms = "_buscar";
        $this->titulo = "Buscar Socio";
    }

    /**
     * Cambia a form crear
     */
    public function mostrarFormCrear()
    {
        //$this->resetForm();
        $this->forms = "_crear_editar";
        $this->titulo = "Incorporar Socio";
    }

    /**
     * Cambia a form editar
     */
    public function mostrarFormEditar()
    {
        //
    }

    /**
     * Mostrar listado de socios
     */
    public function mostrarTablaListar()
    {
        $this->tablas = "_listar";
    }

    /**
     * Búsqueda única
     */
    public function busquedaUnica()
    {
        $socios = Socio::withTrashed()->orderBy('apellido1','ASC')
            ->general($this->valor_busqueda, 'nombre1')
            ->get();
        dd($socios);
    }

    /**
     * Búsqueda masiva
     */
    public function busquedaMasiva()
    {
        dd($this->fechaNacIni);
        $this->fechaNacFin;
        $this->fechaSind1Ini;
        $this->fechaSind1Fin;
        $this->fechaPucvIni;
        $this->fechaPucvFin;
    }
}
