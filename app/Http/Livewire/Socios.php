<?php

namespace App\Http\Livewire;

use App\Models\Distrito;
use Livewire\Component;

class Socios extends Component
{
    public $form = "_crear";

    public function render()
    {
        return view('livewire.socios', [
            'regiones' => Distrito::orderBy('nombre', 'ASC')->get()
        ]);
    }
}
