<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Traits\TestTrait;

class Socio extends Model
{
    use HasFactory;
    use SoftDeletes;
    use TestTrait;

    protected $guarded = [];

    /**
     * RELACIONES
     */
    public function distrito()
    {
        return $this->belongsTo('App\Models\Distrito');
    }

    public function provincia()
    {
        return $this->belongsTo('App\Models\Provincia');
    }

    public function comuna()
    {
        return $this->belongsTo('App\Models\Comuna');
    }

    public function nacionSocio()
    {
        return $this->belongsTo('App\Models\NacionSocio');
    }

    public function estadoSocio()
    {
        return $this->belongsTo('App\Models\EstadoSocio');
    }

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

    public function cargas()
    {
        return $this->hasMany('App\Models\Carga');
    }

    public function estudios()
    {
        return $this->hasMany('App\Models\Estudio');
    }

    /**
     * SCOPES
     */
    public function scopeGeneral($query, $q, $campo)
    {
        TestTrait::test($query, $q, $campo);
        //if ($q) {
        //    return $query->orWhere($campo, 'LIKE', "%$q%");
        //}
    }

    public function scopeGeneralAnd($query, $q, $campo)
    {
        if ($q) {
            return $query->where($campo, $q);
        }
    }

    public function scopeNombres($query, $nombre, $apellido)
    {
        if ($nombre && $apellido) {
            return $query->where('nombre1', '=', $nombre)->where('apellido1', '=', $apellido);
        }
    }

    public function scopeRangoFecha($query, $inicio, $fin, $campo)
    {
        if($inicio != null && $fin != null){
            return $query->whereBetween($campo, [$inicio, $fin]);
        }
        if($inicio != null && $fin === null){
            return $query->where($campo,'>=',$inicio);
        }
        if($inicio === null && $fin != null){
            return $query->where($campo,'<=',$fin);
        }
    }
}
