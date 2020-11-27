<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SelectModal extends Component
{
    public $id;
    public $label;
    public $required;
    public $coleccion;
    public $wireModel;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $label, $required, $coleccion, $wireModel)
    {
        $this->id = $id;
        $this->label = $label;
        $this->required = $required;
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
        return view('components.select-modal');
    }
}
