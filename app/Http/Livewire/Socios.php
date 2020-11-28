<?php

namespace App\Http\Livewire;

use App\Models\Area;
use App\Models\Cargo;
use App\Models\Comuna;
use App\Models\Distrito;
use App\Models\NacionSocio;
use App\Models\Provincia;
use App\Models\Sede;
use Livewire\Component;

class Socios extends Component
{
    /**
     * Nombres vistas
     */
    public $form = "_crear";

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
    public $fechaNac;
    public $contacto;
    public $correo;
    public $fechaPucv;
    public $anexo;
    public $fechaSind1;
    public $direccion;

    public function render()
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

        return view('livewire.socios');
    }

    /**
     * Nueva región
     */
    public function nuevaRegion()
    {
        $this->validate([
			'nueva_region' => 'required'
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
            'nueva_provincia' => 'required'
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
            'nueva_comuna' => 'required'
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
            'nueva_sede' => 'required',
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
            'nueva_area' => 'required'
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
            'nuevo_cargo' => 'required',
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
            'nueva_nacion' => 'required',
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
    	$this->emit('limpiarModalForm');
    }    
}
