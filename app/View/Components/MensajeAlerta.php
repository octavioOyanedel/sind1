<?php

namespace App\View\Components;

use Illuminate\View\Component;

class MensajeAlerta extends Component
{
    public $tipo;
    public $icono;
    public $mensaje;
    public $contenido;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($tipo, $icono, $mensaje, $contenido)
    {
        $this->tipo = $tipo;
        $this->icono = $icono;
        $this->mensaje = $mensaje;
        $this->contenido = $contenido;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.mensaje-alerta');
    }
}
