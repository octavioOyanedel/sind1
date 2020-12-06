<div>
	<div wire:ignore.self class="modal fade" id="{{$id}}" data-keyboard="false" tabindex="-1" aria-labelledby="{{$id}}Label" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
                    <h5 class="modal-title" id="{{$id}}Label">{{$titulo}}</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
                    @switch($id)
                        @case('nueva-region')
                            @include('components.partials.forms._region')
                        @break
                        @case('nueva-provincia')
                            @include('components.partials.forms._provincia', ['regiones' => $coleccion])
						@break
						@case('nueva-comuna')
                            @include('components.partials.forms._comuna', ['provincias' => $coleccion])
						@break
						@case('nueva-sede')
                            @include('components.partials.forms._sede')
						@break
						@case('nueva-area')
                            @include('components.partials.forms._area', ['sedes' => $coleccion])
						@break
						@case('nuevo-cargo')
                            @include('components.partials.forms._cargo')
						@break
						@case('nueva-nacion')
                            @include('components.partials.forms._nacion')
						@break
						@case('desvincular')
                            @include('components.partials.forms._desvincular', ['estados' => $coleccion])
                        @break
                        @default
                    @endswitch
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button wire:click="{{$wireClick}}" type="button" class="btn btn-sm @if($id == "desvincular") btn-danger @else btn-primary @endif">{{$boton}}</button>
				</div>
			</div>
		</div>
	</div>
</div>
