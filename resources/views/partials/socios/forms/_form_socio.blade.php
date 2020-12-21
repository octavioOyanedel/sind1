<div class="card">
    <div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormBuscarSocio" class="float-right text-success" href="#" title="Buscar Socio">
                <i class="fas fa-search"></i>
            </a>
        </span>
    </div>
	<div class="card-body">

		<x-input id="rut" type="text" label="Rut" placeholder="Ej.: 11222333k" wireModel="socio_rut" required="si"/>

		<x-input id="numero" type="text" label="# Socio" placeholder="Ej.: 123" wireModel="socio_numero" required="si"/>

		<x-input id="nombre1" type="text" label="1° Nombre" placeholder="Ej.: Amaro" wireModel="socio_nombre1" required="si"/>

		<x-input id="nombre2" type="text" label="2° Nombre" placeholder="Ej.: Amaro" wireModel="socio_nombre2" required=""/>

		<x-input id="apellido1" type="text" label="Apellido Pat." placeholder="Ej.: Barrueto" wireModel="socio_apellido1" required="si"/>

		<x-input id="apellido2" type="text" label="Apellido Mat." placeholder="Ej.: Martínez" wireModel="socio_apellido2" required=""/>

		@include('components.partials.forms._genero')

		<x-input id="fecha-nac" type="date" label="Fecha Nac." placeholder="" wireModel="socio_fecha_nac" required=""/>

		<x-input id="contacto" type="text" label="# Contacto" placeholder="Ej.: 987654321" wireModel="socio_contacto" required=""/>

		<x-input id="correo" type="text" label="Correo" placeholder="Ej.: sind1@pucv.cl" wireModel="socio_correo" required=""/>

		<x-input id="fecha-pucv" type="date" label="Fecha Ing. PUCV" placeholder="" wireModel="socio_fecha_pucv" required=""/>

		<x-input id="anexo" type="text" label="Anexo" placeholder="Ej.: 3096" wireModel="socio_anexo" required=""/>

		<x-input id="fecha-sind1" type="date" label="Fecha Ing. SIND1" placeholder="" wireModel="socio_fecha_sind1" required=""/>

		<x-select id="region" label="Región" modal="#nueva-region" wireModel="socio_distrito_id" required="" :coleccion="$regiones"/>

		<x-select id="provincia" label="Provincia" modal="#nueva-provincia" wireModel="socio_provincia_id" required="" :coleccion="$provincias"/>

		<x-select id="comuna" label="Comuna" modal="#nueva-comuna" wireModel="socio_comuna_id" required="" :coleccion="$comunas"/>

		<x-input id="direccion" type="text" label="Dirección" placeholder="Ej.: Calle 1, Casa N° 2" wireModel="socio_direccion" required=""/>

		<x-select id="sede" label="Sede" modal="#nueva-sede" wireModel="socio_sede_id" required="" :coleccion="$sedes"/>

		<x-select id="area" label="Area" modal="#nueva-area" wireModel="socio_area_id" required="" :coleccion="$areas"/>

		<x-select id="cargo" label="Cargo" modal="#nuevo-cargo" wireModel="socio_cargo_id" required="" :coleccion="$cargos"/>

		<x-select id="nacion" label="Nacionalidad" modal="#nueva-nacion" wireModel="socio_nacion_socio_id" required="" :coleccion="$naciones"/>

		<div class="form-group">
			@if ($boton === 'crear')
				<button wire:click="crearSocio" class="form-control btn btn-primary">Guardar</button>
			@else
				<button wire:click="editarSocio" class="form-control btn btn-primary">Editar</button>
			@endif
		</div>			
	</div>
</div>

<!-- Ventanas Modales -->
<x-modal id="nueva-region" titulo="Nueva Región" wireClick="nuevaRegion" boton="Guardar" coleccion="" />
<x-modal id="nueva-provincia" titulo="Nueva Provincia" wireClick="nuevaProvincia" boton="Guardar" :coleccion="$regiones"/>
<x-modal id="nueva-comuna" titulo="Nueva Comuna" wireClick="nuevaComuna" boton="Guardar" :coleccion="$provincias"/>
<x-modal id="nueva-sede" titulo="Nueva Sede" wireClick="nuevaSede" boton="Guardar" coleccion=""/>
<x-modal id="nueva-area" titulo="Nueva Área" wireClick="nuevaArea" boton="Guardar" :coleccion="$sedes"/>
<x-modal id="nuevo-cargo" titulo="Nuevo Cargo" wireClick="nuevoCargo" boton="Guardar" coleccion=""/>
<x-modal id="nueva-nacion" titulo="Nueva Nacionalidad" wireClick="nuevaNacion" boton="Guardar" coleccion=""/>




@push('scripts')
    <script type="text/javascript">
        window.livewire.on('nueva_carga', () => {
            $('#nueva-carga').modal('show');
        });
    </script>
	<script type="text/javascript">
        window.livewire.on('cerrar_modal', () => {
            $('#nueva-region').modal('hide');
			$('#nueva-provincia').modal('hide');
			$('#nueva-comuna').modal('hide');
			$('#nueva-sede').modal('hide');
			$('#nueva-area').modal('hide');
			$('#nuevo-cargo').modal('hide');
			$('#nueva-nacion').modal('hide');
            $('#nueva-carga').modal('hide');

        });
    </script>

    <script type="text/javascript">
        window.livewire.on('alerta_ok', texto => {
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
		window.livewire.on('alerta_info', texto => {
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
