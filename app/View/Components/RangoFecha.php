<?php

namespace App\View\Components;

use Illuminate\View\Component;

class RangoFecha extends Component
{
    public $id;
    public $label;
    public $wireModelIni;
    public $wireModelFin;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $label, $wireModelIni, $wireModelFin)
    {
        $this->id = $id;
        $this->label = $label;
        $this->wireModelIni = $wireModelIni;
        $this->wireModelFin = $wireModelFin;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.rango-fecha');
    }
}
