<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudio extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * RELACIONES
     */
    public function grado()
    {
        return $this->belongsTo('App\Models\Grado');
    }
    
    public function establecimiento()
    {
        return $this->belongsTo('App\Models\Establecimiento');
    }

    public function estadoEstudio()
    {
        return $this->belongsTo('App\Models\EstadoEstudio');
    }

    public function titulo()
    {
        return $this->belongsTo('App\Models\Titulo');
    }           
}
