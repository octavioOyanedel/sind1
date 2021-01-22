<div class="card">
    <div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormBuscar" class="float-right text-success" href="#" title="Buscar socio">
                <i class="fas fa-search"></i>
            </a>
            <a wire:click="cargarFormCrearCarga" class="float-right text-success mr-4" href="#" title="Agregar Carga Familiar">
                <i class="fas fa-users"></i>
            </a>            
        </span>
    </div>
		<div class="card-body">

            @if ($objeto_socio)
                <p class="text-center mb-3">SOCIO</p>
                <p class="text-center mb-3">{{formatoNombre($objeto_socio)}}</p>
            @endif

            <x-select id="grado" label="Grado Académico" modal="#nuevo-grado" wireModel="estudio_grado_id" required="si" :coleccion="$grados"/>

            <x-select id="establecimiento" label="Establecimientos" modal="#nuevo-establecimiento" wireModel="estudio_establecimiento_id" required="si" :coleccion="$establecimientos"/>

            <x-select id="estado" label="Estado Estudio" modal="#nuevo-estado" wireModel="estudio_estado_estudio_id" required="si" :coleccion="$estado_estudios"/>

            @if ($estudio_estado_estudio_id == 5)
                <x-select id="titulo" label="Título" modal="#nuevo-titulo" wireModel="estudio_titulo_id" required="si" :coleccion="$titulos"/>
            @endif
            

			<div class="form-group">
				@if ($boton === 'crear')
					<button wire:click="crearEstudio" class="form-control btn btn-primary">Guardar</button>
				@else
					<button wire:click="editarEstudio" class="form-control btn btn-primary">Editar</button>
				@endif
			</div>
		</div>

    {{-- Modal continuar agregar carga familiar --}}
    <x-modal id="nuevo-grado" titulo="Nuevo Grado" wireClick="" boton="Guardar" coleccion=""/>
    <x-modal id="nuevo-establecimiento" titulo="Nuevo Establecimiento" wireClick="" boton="Guardar" :coleccion="$grados"/>
    <x-modal id="nuevo-estado" titulo="Nuevo Estado" wireClick="" boton="Guardar" coleccion=""/>
    <x-modal id="nuevo-titulo" titulo="Nuevo Título" wireClick="" boton="Guardar" :coleccion="$establecimientos"/>

</div>

@push('scripts')
    <script type="text/javascript">
        window.livewire.on('continuar_estudio', () => {
            $("#nuevo-estudio").modal();
        });
    </script>
	<script type="text/javascript">
        window.livewire.on('cerrar_modal', () => {
            $('#nuevo-parentesco').modal('hide');
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