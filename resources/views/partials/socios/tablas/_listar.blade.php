<div class="card">
	<div class="card-header">
        <span class="mb-0">{{$titulo_tabla}}
            @if ($flag_busqueda != NULL)
                @if ($flag_busqueda === 'unica')
                    <a wire:click="busquedaUnica" class="float-right text-success mr-4" href="#" title="Volver a Resultados.">
                        <i class="fas fa-chevron-circle-left"></i>
                    </a>
                @else
                    <a wire:click="busquedaMasiva" class="float-right text-success mr-4" href="#" title="Volver a Resultados.">
                        <i class="fas fa-chevron-circle-left"></i>
                    </a>
                @endif                 
            @endif          
        </span>
	</div>
	<div class="card-body">
        @if (count($socios) != 0)
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered">
                    <thead class="cabecera-tabla">
                        <tr>
                            <td class="text-center" scope="col">#</td>
                            <td scope="col">Nombre</td>
                            <td class="text-center" scope="col">Anexo</td>
                            <td scope="col">Sede</td>
                            <td scope="col" colspan="3"></td>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($socios as $item)
                        <tr>
                            <th class="text-center" scope="row">{{$item->numero}}</th>
                            <td>{{formatoNombre($item)}}</td>
                            <td class="text-center">{{$item->anexo}}</td>
                            <td>{{imprimirRelacion($item->sede)}}</td>
                            <td wire:click="cargarTablaSocio({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-success"><i title="Ver socio" class="fas fa-user-check"></i></a></td>
                            <td wire:click="cargarFormEdit({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar socio" class="fas fa-user-edit"></i></a></td>
                            <td class="celda-accion text-center"><a wire:click="prepararSocio({{$item->id}})" href="#" class="text-danger" data-toggle="modal" data-target="#desvincular"><i title="Eliminar socio" class="fas fa-user-minus"></i></a></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="float-right">
					{{ $socios->links() }}
				</div>
            </div>
        @else
            <div class="alert alert-warning" role="alert">
                No existen <strong>socios</strong> registrados.
            </div>
        @endif
    </div>
    <x-modal id="desvincular" titulo="Desvincular Socio" wireClick="delete" boton="Desvincular" :coleccion="$estados"/>
</div>

@push('scripts')
    <script type="text/javascript">
        window.livewire.on('limpiarErrores', () => {
            $('.select-modal').removeClass("is-invalid");
            $('.mensaje-error').text('');
        });
    </script>
	<script type="text/javascript">
        window.livewire.on('cerrarModal', () => {
            $('#desvincular').modal('hide');
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
@endpush