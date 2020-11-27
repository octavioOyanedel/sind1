<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Select extends Component
{
    public $id;
    public $label;
    public $modal;
    public $wireModel;
    public $required;
    public $coleccion;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $label, $modal, $wireModel, $required, $coleccion)
    {
        $this->id = $id;
        $this->label = $label;
        $this->modal = $modal;
        $this->wireModel = $wireModel;
        $this->required = $required;
        $this->coleccion = $coleccion;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.select');
    }
}
