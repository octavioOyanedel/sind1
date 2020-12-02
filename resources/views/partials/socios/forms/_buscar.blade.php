<div class="card">
	<div class="card-header">
		<span class="mb-0">Buscar Socio/s
            <a wire:click="mostrarFormCrear" class="float-right" href="#" title="Buscar Socio">
                <i class="fas fa-user-plus fa-xs"></i>
            </a>
        </span>
	</div>
	<div class="card-body">
        <div class="input-group">
            <input wire:model="valor_busqueda" id="buscar" type="text" class="form-control @error('valor_busqueda') is-invalid @enderror" placeholder="Buscar" aria-label="Buscar" aria-describedby="button-addon2">
            <div class="input-group-append">
                <button class="btn btn-primary" type="button" id="button-addon2"><i class="fas fa-search fa-xs"></i></button>
            </div>
            @error('valor_busqueda') 
                <small class="text-danger">{{ $message }}</small>
            @enderror
        </div>
        <hr class="">
        
        <div class="form-group">
            <label for="">Rango Fecha Nac.</label>
            <div class="input-group">
                <input type="date" aria-label="First name" class="form-control mr-1">
                <input type="date" aria-label="Last name" class="form-control ml-1">
            </div>
        </div>

        <div class="form-group row">
            <label for="" class="col-sm-4 col-form-label">Región</label>
            <div class="col-sm-8">
                <select class="form-control custom-select" id="">
                    <option value="" selected>...</option>
    
                </select>
            </div>			 
            @error('region') 
                <small class="text-danger">{{ $message }}</small>
            @enderror           
        </div> 

        <div class="form-group">
            <button class="form-control btn btn-primary">Buscar</button>
        </div>        
	</div>
</div>