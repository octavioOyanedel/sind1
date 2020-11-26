<div class="card">
    <div class="card-header"><h4 class="mb-0">Incorporar Socio</h4></div>
	<form action="" class="">
		<div class="card-body">

			<x-input id="rut" type="text" label="Rut" placeholder="Ej.: 11222333k" wireModel="rut" required="si"/>

			<x-input id="numero" type="text" label="# Socio" placeholder="Ej.: 123" wireModel="numero" required="si"/>

			<x-input id="nombre1" type="text" label="1° Nombre" placeholder="Ej.: Amaro" wireModel="nombre1" required="si"/>

			<x-input id="nombre2" type="text" label="2° Nombre" placeholder="Ej.: Amaro" wireModel="nombre2" required=""/>

			<x-input id="apellido1" type="text" label="Apellido Pat." placeholder="Ej.: Barrueto" wireModel="apellido1" required="si"/>

			<x-input id="apellido2" type="text" label="Apellido Mat." placeholder="Ej.: Martínez" wireModel="apellido2" required=""/>	

			<div class="form-group row">
				<label for="genero" class="col-sm-4 col-form-label" title="Campo Obligatorio.">Género *</label>
				<div class="col-sm-8">
					  <select class="selects form-control form-control-sm" id="genero" required>
						<option value="" selected>...</option>
						<option value="Dama">Dama</option>
						<option value="Varón">Varón</option>
					  </select>
				</div>			
			</div>		

			<x-input id="fechaNac" type="date" label="Fecha Nac." placeholder="" wireModel="fechaNac" required=""/>

			<x-input id="contacto" type="text" label="# Contacto" placeholder="Ej.: 987654321" wireModel="contacto" required=""/>	

			<x-input id="correo" type="text" label="Correo" placeholder="Ej.: sind1@pucv.cl" wireModel="correo" required=""/>

			<x-input id="fechaPucv" type="date" label="Fecha Ing. PUCV" placeholder="" wireModel="fechaPucv" required=""/>

			<x-input id="anexo" type="text" label="Anexo" placeholder="Ej.: 3096" wireModel="anexo" required=""/>

			<div class="form-group row">
				<label for="fecha_sind1" class="col-sm-4 col-form-label">Fecha Ing. SIND1:</label>
				<div class="col-sm-8">
					<input type="date" class="form-control form-control-sm" id="fecha_sind1">
				</div>			
			</div>	

			<div class="form-group row">
				
				<label for="region" class="col-sm-4 col-form-label">Región:
					<a wire:click="limpiarModalForm" class="text-primary float-right" href="#" data-toggle="modal" data-target="#nuevaRegion"><i role="button" class="fas fa-plus-circle"></i></a>
				</label>
				<div class="col-sm-8">
					<select wire:model="region" class="form-control form-control-sm" id="region">
					<option value="" selected>...</option>
						@foreach ($regiones as $r)
							<option value="{{ $r->id }}">{{ $r->nombre }}</option>
						@endforeach
					</select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="provincia" class="col-sm-4 col-form-label">Provincia:</label>
				<div class="col-sm-8">
					  <select wire:model="provincia" class="form-control form-control-sm" id="provincia">
						<option value="" selected>...</option>
						@foreach ($provincias as $p)
							<option value="{{ $p->id }}">{{ $p->nombre }}</option>
						@endforeach						
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="comuna" class="col-sm-4 col-form-label">Comuna:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="comuna">
						<option value="" selected>...</option>
						@foreach ($comunas as $c)
							<option value="{{ $c->id }}">{{ $c->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<x-input id="direccion" type="text" label="Dirección" placeholder="Ej.: Calle 1, Casa N° 2" wireModel="direccion" required=""/>

			<div class="form-group row">
				<label for="sede" class="col-sm-4 col-form-label">Sede:</label>
				<div class="col-sm-8">
					  <select wire:model="sede" class="form-control form-control-sm" id="sede">
						<option value="" selected>...</option>
						@foreach ($sedes as $s)
							<option value="{{ $s->id }}">{{ $s->nombre }}</option>
						@endforeach								
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="area" class="col-sm-4 col-form-label">Área:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="area">
						<option value="" selected>...</option>
						@foreach ($areas as $a)
							<option value="{{ $a->id }}">{{ $a->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	
			
			<div class="form-group row">
				<label for="cargo" class="col-sm-4 col-form-label">Cargo:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="cargo">
						<option value="" selected>...</option>
						@foreach ($cargos as $c)
							<option value="{{ $c->id }}">{{ $c->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="nacionalidad" class="col-sm-4 col-form-label">Nacionalidad:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="nacionalidad">
						<option value="" selected>...</option>
						@foreach ($naciones as $n)
							<option value="{{ $n->id }}">{{ $n->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<div class="form-group">
				<button type="submit" class="form-control btn btn-primary">Guardar</button>
			</div>

		</div>
	</form>

	<!-- Modal -->
	<div wire:ignore.self class="modal fade" id="nuevaRegion" data-keyboard="false" tabindex="-1" aria-labelledby="nuevaRegionLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="nuevaRegionLabel">Nueva Región</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<div class="form-group">
						<label for="nombre">Nombre:</label>
						<input type="text" class="limpiar-input-modal form-control" id="nombre" wire:model="n_region">
						@error('n_region') 
							<small class="text-danger">{{ $message }}</small>
						@enderror
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">Cerrar</button>
					<button wire:click="nuevaRegion" type="button" class="btn btn-sm btn-primary">Guardar</button>
				</div>
			</div>
		</div>
	</div>	

</div>



@push('scripts')
	<script type="text/javascript">
		window.livewire.on('limpiarModalForm', () => {
			$('.limpiar-input-modal').val('');
		});
	</script>
	<script type="text/javascript">
        window.livewire.on('cerrarModal', () => {
            $('#nuevaRegion').modal('hide');
        });
	</script>
    <script type="text/javascript">
        window.livewire.on('alertaOk', texto => {
            Swal.fire({
                toast: true,
                position: 'bottom-end',
                icon: 'success',
                title: texto,
                showConfirmButton: false,
                timer: 2700,
                background: '#38c172',
                iconColor: '#fff'
            })   
        });
    </script>	
@endpush