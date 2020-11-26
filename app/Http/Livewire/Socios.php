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
    // Nombres vistas
    public $form = "_crear";

    // Colecciones selects
    public $regiones = [];
    public $provincias = [];
    public $comunas = [];
    public $sedes = [];
    public $areas = [];
    public $cargos = [];
    public $naciones = [];

    // Variables livewire 2way binding
    // Selects
    public $region;
    public $provincia;
    public $sede;
    // Nuevos registros
    public $n_region;

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

    // Nueva región
    public function nuevaRegion()
    {
        $this->validate([
			'n_region' => 'required'
		]);

		Distrito::create([
			'nombre' => $this->n_region
        ]);   
        
        $this->emit('cerrarModal');
        $this->emit('alertaOk', 'Región Agregada.');
    }

    // Limpiar campos de formularios de ventanas modales
    public function limpiarModalForm()
    {
    	$this->emit('limpiarModalForm');
    }    
}
