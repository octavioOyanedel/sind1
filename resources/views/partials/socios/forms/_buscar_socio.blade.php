<div class="card">
	<div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormCrearSocio" class="float-right text-success" href="#" title="Incorporar Socio">
                <i class="fas fa-user-plus"></i>
            </a>
        </span>
	</div>
	<div class="card-body">
        <div class="input-group">
            <input wire:model="busqueda_socio" id="buscar" type="text" class="form-control @error('busqueda_socio') is-invalid @enderror" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button wire:click="busquedaUnicaSocio" class="btn btn-primary" type="button" id="button-addon2"><i class="fas fa-search fa-xs"></i></button>
            </div>
            @error('busqueda_socio')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <hr class="">

        <x-rango-fecha id="fecha_nac" label="Rango Fecha Nac." wireModelIni="buscar_socio_fecha_nac_ini" wireModelFin="buscar_socio_fecha_nac_fin" />
        <x-rango-fecha id="fecha_pucv" label="Rango Ing. PUCV" wireModelIni="buscar_socio_fecha_pucv_ini" wireModelFin="buscar_socio_fecha_pucv_fin" />
        <x-rango-fecha id="fecha_sind1" label="Rango Ing. SIND1" wireModelIni="fecha_sind1_ini" wireModelFin="fecha_sind1_fin" />
        @include('components.partials.forms._genero_buscar')
        <x-select-busqueda id="region" label="Región" :coleccion="$regiones" wireModel="buscar_socio_distrito_id"/>
        <x-select-busqueda id="provincia" label="Provincia" :coleccion="$provincias" wireModel="buscar_socio_provincia_id"/>
        <x-select-busqueda id="comuna" label="Comuna" :coleccion="$comunas" wireModel="buscar_socio_comuna_id"/>
        <x-select-busqueda id="sede" label="Sede" :coleccion="$sedes" wireModel="buscar_socio_sede_id"/>
        <x-select-busqueda id="area" label="Área" :coleccion="$areas" wireModel="buscar_socio_area_id"/>
        <x-select-busqueda id="cargo" label="Cargo" :coleccion="$cargos" wireModel="buscar_socio_cargo_id"/>
        <x-select-busqueda id="nacion" label="Nacionalidad" :coleccion="$naciones" wireModel="buscar_socio_nacion_socio_id"/>

        <div class="form-group">
            <button wire:click="busquedaMasivaSocio" class="form-control btn btn-primary">Buscar</button>
        </div>
	</div>
</div>
