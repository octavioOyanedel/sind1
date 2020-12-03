<div class="card">
	<div class="card-header">
		<span class="mb-0">Buscar Socio/s
            <a wire:click="mostrarForm" class="float-right" href="#" title="Buscar Socio">
                <i class="fas fa-user-plus fa-xs"></i>
            </a>
        </span>
	</div>
	<div class="card-body">
        <div class="input-group">
            <input wire:model="valor_busqueda" id="buscar" type="text" class="form-control @error('valor_busqueda') is-invalid @enderror" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button wire:click="busquedaUnica" class="btn btn-primary" type="button" id="button-addon2"><i class="fas fa-search fa-xs"></i></button>
            </div>
            @error('valor_busqueda')
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>

        <hr class="">

        <x-rango-fecha id="fecha_nac" label="Rango Fecha Nac." wireModelIni="fechaNacIni" wireModelFin="fechaNacFin" />
        <x-rango-fecha id="fecha_pucv" label="Rango Ing. PUCV" wireModelIni="fechaPucvIni" wireModelFin="fechaPucvFin" />
        <x-rango-fecha id="fecha_sind1" label="Rango Ing. SIND1" wireModelIni="fechaSind1Ini" wireModelFin="fechaSind1Fin" />

        <x-select-busqueda id="region" label="Región" :coleccion="$regiones" wireModel="region"/>
        <x-select-busqueda id="provincia" label="Provincia" :coleccion="$provincias" wireModel="provincia"/>
        <x-select-busqueda id="comuna" label="Comuna" :coleccion="$comunas" wireModel="comuna"/>
        <x-select-busqueda id="sede" label="Sede" :coleccion="$sedes" wireModel="sede"/>
        <x-select-busqueda id="area" label="Área" :coleccion="$areas" wireModel="area"/>
        <x-select-busqueda id="cargo" label="Cargo" :coleccion="$cargos" wireModel="cargo"/>
        <x-select-busqueda id="nacion" label="Nacionalidad" :coleccion="$naciones" wireModel="nacion"/>

        <div class="form-group">
            <button wire:click="busquedaMasiva" class="form-control btn btn-primary">Buscar</button>
        </div>
	</div>
</div>
