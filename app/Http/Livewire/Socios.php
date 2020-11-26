<?php

namespace App\Http\Livewire;

use App\Models\Distrito;
use App\Models\Provincia;
use Livewire\Component;

class Socios extends Component
{
    // Nombres vistas
    public $form = "_crear";

    // Colecciones selects
    public $regiones = [];
    public $provincias = [];

    // Variables livewire 2way binding
    public $region;
    public $provincia;

    public function render()
    {
        $this->regiones = Distrito::orderBy('nombre', 'ASC')->get();

        // Obtención de elementos anidados para poblar selects
    	if (!empty($this->region)) {
    		$this->provincias = Provincia::where('distrito_id', $this->region)->get();
    	}

        return view('livewire.socios');
    }
}
