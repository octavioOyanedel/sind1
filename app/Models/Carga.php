<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carga extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * RELACIONES
     */
    public function parentesco()
    {
        return $this->belongsTo('App\Models\Parentesco');
    }       
}
