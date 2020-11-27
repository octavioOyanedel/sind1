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
                        @case('nuevaRegion')
                            @include('components.partials.forms._region')
                            @break
                        @case('nuevaProvincia')
                            @include('components.partials.forms._provincia', ['regiones' => $coleccion])
							@break
						@case('nuevaComuna')
                            @include('components.partials.forms._comuna', ['provincias' => $coleccion])
                            @break  							                         
                        @default                           
                    @endswitch
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
                    <button wire:click="{{$wireClick}}" type="button" class="btn btn-sm btn-primary">{{$boton}}</button>
				</div>
			</div>
		</div>
	</div>	
</div>