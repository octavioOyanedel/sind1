<div class="card">
    <div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormBuscarSocio" class="float-right text-success" href="#" title="Buscar Socio">
                <i class="fas fa-search"></i>
            </a>
        </span>
    </div>
		<div class="card-body">

			<x-input id="nombre1" type="text" label="1° Nombre" placeholder="Ej.: Amaro" wireModel="nombre1" required="si"/>

			<x-input id="nombre2" type="text" label="2° Nombre" placeholder="Ej.: Amaro" wireModel="nombre2" required=""/>

			<x-input id="apellido1" type="text" label="Apellido Pat." placeholder="Ej.: Barrueto" wireModel="apellido1" required="si"/>

			<x-input id="apellido2" type="text" label="Apellido Mat." placeholder="Ej.: Martínez" wireModel="apellido2" required=""/>

            <x-input id="rut" type="text" label="Rut" placeholder="Ej.: 11222333k" wireModel="rut" required="si"/>

			<x-input id="fecha-nac" type="date" label="Fecha Nac." placeholder="" wireModel="fecha_nac" required=""/>

			<x-select id="parentesco" label="Parentesco" modal="#nuevo-parentesco" wireModel="parentesco" required="" :coleccion="$parentescos"/>

			<div class="form-group">
				@if ($boton === 'crear')
					<button class="form-control btn btn-primary">Guardar</button>
				@else
					<button class="form-control btn btn-primary">Editar</button>
				@endif
			</div>
		</div>

	<!-- Ventanas Modales -->
    <x-modal id="nuevo-parentesco" titulo="Nuevo Parentesco" wireClick="nuevoParentesco" boton="Guardar" coleccion=""/>

    {{-- Modal continuar agregar carga familiar --}}
    {{-- <x-modal id="nuevo-estudio" titulo="Agregar Estudio Realizado Socio" wireClick=cargarFormEstudio boton="Si" coleccion=""/> --}}

</div>

@push('scripts')
    <script type="text/javascript">
        window.livewire.on('continuar_estudio', () => {
            $("#nuevo-estudio").modal();
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
