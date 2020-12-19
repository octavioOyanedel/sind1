<div>
    <div class="alert alert-warning" role="alert">
        <h4 class="alert-heading"><i class="{{$icono}}"></i> >> {{$mensaje}}</h4>
        <hr>
        <p class="mb-0">
            @switch($contenido)
                @case('busqueda_unica')
                    @include('components.partials.alertas._busqueda_unica')
                    @break
                @case('busqueda_masiva')
                    @include('components.partials.alertas._busqueda_masiva')
                    @break
                @default
                    
            @endswitch
        </p>
    </div>
</div>