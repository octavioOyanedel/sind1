<div class="card">
    <div class="card-header">
        <span class="mb-0">{{$titulo_form}}
            <a wire:click="cargarFormBuscar" class="float-right text-success" href="#" title="Buscar socio">
                <i class="fas fa-search"></i>
            </a>
            <a wire:click="cargarFormCrearEstudio" class="float-right text-success mr-4" href="#" title="Agregar Estudio">
                <i class="fas fa-user-graduate"></i>
            </a>            
        </span>
    </div>
		<div class="card-body">

            @if ($objeto_socio)
                <p class="text-center mb-3">SOCIO</p>
                <p class="text-center mb-3">{{formatoNombre($objeto_socio)}}</p>
            @endif

			<x-input id="nombre1" type="text" label="1° Nombre" placeholder="Ej.: Amaro" wireModel="carga_nombre1" required="si"/>

			<x-input id="nombre2" type="text" label="2° Nombre" placeholder="Ej.: Amaro" wireModel="carga_nombre2" required=""/>

			<x-input id="apellido1" type="text" label="Apellido Pat." placeholder="Ej.: Barrueto" wireModel="carga_apellido1" required="si"/>

			<x-input id="apellido2" type="text" label="Apellido Mat." placeholder="Ej.: Martínez" wireModel="carga_apellido2" required=""/>

            <x-input id="rut" type="text" label="Rut" placeholder="Ej.: 11222333k" wireModel="carga_rut" required="si"/>

			<x-input id="fecha-nac" type="date" label="Fecha Nac." placeholder="" wireModel="carga_fecha" required="si"/>

			<x-select id="parentesco" label="Parentesco" modal="#nuevo-parentesco" wireModel="carga_parentesco_id" required="si" :coleccion="$parentescos"/>

			<div class="form-group">
				@if ($boton === 'crear')
					<button wire:click="crearCarga" class="form-control btn btn-primary">Guardar</button>
				@else
					<button wire:click="editarCarga" class="form-control btn btn-primary">Editar</button>
				@endif
			</div>
		</div>

    {{-- Modal continuar agregar carga familiar --}}
    <x-modal id="nuevo-parentesco" titulo="Nuevo Parentesco" wireClick="nuevoParentesco" boton="Guardar" coleccion=""/>

</div>

@push('scripts')
    <script type="text/javascript">
        window.livewire.on('continuar_estudio', () => {
            $("#nuevo-estudio").modal();
        });
    </script>
@endpush