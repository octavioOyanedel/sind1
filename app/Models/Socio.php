<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Socio extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $guarded = [];

    /**
     * RELACIONES
     */
    public function sede()
    {
        return $this->belongsTo('App\Models\Sede');
    }

    public function area()
    {
        return $this->belongsTo('App\Models\Area');
    }

    public function cargo()
    {
        return $this->belongsTo('App\Models\Cargo');
    }

    /**
     * SCOPES
     */
    public function scopeGeneral($query, $q, $campo)
    {
        if ($q) {
            return $query->orWhere($campo, 'LIKE', "%$q%");
        }
    }
}
