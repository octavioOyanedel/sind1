<div class="card">
    <div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormBuscar" class="float-right text-success" href="#" title="Buscar Socio">
                <i class="fas fa-search"></i>
            </a>		
        </span>
    </div>
		<div class="card-body">

			<x-input id="rut" type="text" label="Rut" placeholder="Ej.: 11222333k" wireModel="rut" required="si"/>

			<x-input id="numero" type="text" label="# Socio" placeholder="Ej.: 123" wireModel="numero" required="si"/>

			<x-input id="nombre1" type="text" label="1° Nombre" placeholder="Ej.: Amaro" wireModel="nombre1" required="si"/>

			<x-input id="nombre2" type="text" label="2° Nombre" placeholder="Ej.: Amaro" wireModel="nombre2" required=""/>

			<x-input id="apellido1" type="text" label="Apellido Pat." placeholder="Ej.: Barrueto" wireModel="apellido1" required="si"/>

			<x-input id="apellido2" type="text" label="Apellido Mat." placeholder="Ej.: Martínez" wireModel="apellido2" required=""/>

			@include('components.partials.forms._genero')

			<x-input id="fechaNac" type="date" label="Fecha Nac." placeholder="" wireModel="fechaNac" required=""/>

			<x-input id="contacto" type="text" label="# Contacto" placeholder="Ej.: 987654321" wireModel="contacto" required=""/>

			<x-input id="correo" type="text" label="Correo" placeholder="Ej.: sind1@pucv.cl" wireModel="correo" required=""/>

			<x-input id="fechaPucv" type="date" label="Fecha Ing. PUCV" placeholder="" wireModel="fechaPucv" required=""/>

			<x-input id="anexo" type="text" label="Anexo" placeholder="Ej.: 3096" wireModel="anexo" required=""/>

			<x-input id="fechaSind1" type="date" label="Fecha Ing. SIND1" placeholder="" wireModel="fechaSind1" required=""/>

			<x-select id="region" label="Región" modal="#nuevaRegion" wireModel="region" required="" :coleccion="$regiones"/>

			<x-select id="provincia" label="Provincia" modal="#nuevaProvincia" wireModel="provincia" required="" :coleccion="$provincias"/>

			<x-select id="comuna" label="Comuna" modal="#nuevaComuna" wireModel="comuna" required="" :coleccion="$comunas"/>

			<x-input id="direccion" type="text" label="Dirección" placeholder="Ej.: Calle 1, Casa N° 2" wireModel="direccion" required=""/>

			<x-select id="sede" label="Sede" modal="#nuevaSede" wireModel="sede" required="" :coleccion="$sedes"/>

			<x-select id="area" label="Area" modal="#nuevaArea" wireModel="area" required="" :coleccion="$areas"/>

			<x-select id="cargo" label="Cargo" modal="#nuevoCargo" wireModel="cargo" required="" :coleccion="$cargos"/>

			<x-select id="nacion" label="Nacionalidad" modal="#nuevaNacion" wireModel="nacion" required="" :coleccion="$naciones"/>

			<div class="form-group">
				@if ($boton === 'crear')
					<button wire:click="create" class="form-control btn btn-primary">Guardar</button>
				@else
					<button wire:click="update" class="form-control btn btn-primary">Editar</button>
				@endif
			</div>
		</div>

	<!-- Ventanas Modales -->
	<x-modal id="nuevaRegion" titulo="Nueva Región" wireClick="nuevaRegion" boton="Guardar" coleccion="" />
	<x-modal id="nuevaProvincia" titulo="Nueva Provincia" wireClick="nuevaProvincia" boton="Guardar" :coleccion="$regiones"/>
	<x-modal id="nuevaComuna" titulo="Nueva Comuna" wireClick="nuevaComuna" boton="Guardar" :coleccion="$provincias"/>
	<x-modal id="nuevaSede" titulo="Nueva Sede" wireClick="nuevaSede" boton="Guardar" coleccion=""/>
	<x-modal id="nuevaArea" titulo="Nueva Área" wireClick="nuevaArea" boton="Guardar" :coleccion="$sedes"/>
	<x-modal id="nuevoCargo" titulo="Nuevo Cargo" wireClick="nuevoCargo" boton="Guardar" coleccion=""/>
	<x-modal id="nuevaNacion" titulo="Nueva Nacionalidad" wireClick="nuevaNacion" boton="Guardar" coleccion=""/>

</div>

@push('scripts')
	<script type="text/javascript">
        window.livewire.on('cerrarModal', () => {
            $('#nuevaRegion').modal('hide');
			$('#nuevaProvincia').modal('hide');
			$('#nuevaComuna').modal('hide');
			$('#nuevaSede').modal('hide');
			$('#nuevaArea').modal('hide');
			$('#nuevoCargo').modal('hide');
			$('#nuevaNacion').modal('hide');
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
                timer: 3300,
                background: '#38c172',
                iconColor: '#fff'
            })
        });
	</script>
	<script type="text/javascript">
		window.livewire.on('alertaInfo', texto => {
			Swal.fire({
				toast: true,
				position: 'bottom-end',
				icon: 'warning',
				title: texto,
				showConfirmButton: false,
				timer: 3300,
				background: '#ffc107',
				iconColor: '#fff'
			})
		});
	</script>
@endpush
