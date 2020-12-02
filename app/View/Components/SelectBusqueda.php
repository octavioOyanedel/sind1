<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SelectBusqueda extends Component
{
    public $id;
    public $label;
    public $coleccion;
    public $wireModel;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $label, $coleccion, $wireModel)
    {
        $this->id = $id;
        $this->label = $label;
        $this->coleccion = $coleccion;
        $this->wireModel = $wireModel;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.select-busqueda');
    }
}
