<?php
 
namespace App\Traits;
 
trait TestTrait {
 
    public static function test($query, $q, $campo)
    {
        return $query->where($campo, $q);
    }
}
