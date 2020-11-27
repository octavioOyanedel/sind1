<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Modal extends Component
{
    public $id;
    public $titulo;
    public $wireClick;
    public $boton;
    public $coleccion;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $titulo, $wireClick, $boton, $coleccion)
    {
        $this->id = $id;
        $this->titulo = $titulo;
        $this->wireClick = $wireClick;
        $this->boton = $boton;
        $this->coleccion = $coleccion;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.modal');
    }
}
