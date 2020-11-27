<?php

namespace App\View\Components;

use Illuminate\View\Component;

class InputModal extends Component
{
    public $id;
    public $type;
    public $label;
    public $placeholder;
    public $wireModel;
    public $required;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($id, $type, $label, $placeholder, $wireModel, $required)
    {
        $this->id = $id;
        $this->type = $type;
        $this->label = $label;
        $this->placeholder = $placeholder;
        $this->wireModel = $wireModel;
        $this->required = $required;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.input-modal');
    }
}
