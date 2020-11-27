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

			<x-input id="fechaSind1" type="date" label="Fecha Ing. SIND1" placeholder="" wireModel="fechaSind1" required=""/>

			<x-select id="region" label="Región" modal="#nuevaRegion" wireModel="region" required="si" :coleccion="$regiones"/>

			<x-select id="provincia" label="Provincia" modal="#nuevaProvincia" wireModel="provincia" required="si" :coleccion="$provincias"/>

			<x-select id="comuna" label="Comuna" modal="#nuevaComuna" wireModel="comuna" required="si" :coleccion="$comunas"/>

			<x-input id="direccion" type="text" label="Dirección" placeholder="Ej.: Calle 1, Casa N° 2" wireModel="direccion" required=""/>

			<x-select id="sede" label="Sede" modal="#nuevaSede" wireModel="sede" required="si" :coleccion="$sedes"/>

			<x-select id="area" label="Area" modal="#nuevaArea" wireModel="area" required="si" :coleccion="$areas"/>
			
			<x-select id="cargo" label="cargo" modal="#nuevoCargo" wireModel="cargo" required="si" :coleccion="$cargos"/>

			<x-select id="nacion" label="Nacionalidad" modal="#nuevaNacion" wireModel="nacion" required="si" :coleccion="$naciones"/>

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