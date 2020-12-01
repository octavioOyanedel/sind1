<div class="card">
	<div class="card-header">
		<h4 class="mb-0">Listado Socios</h4>
	</div>
	<div class="card-body">
        @if (count($socios) != 0)
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered">
                    <thead class="cabecera-tabla">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Anexo</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Sede</th>
                            <th scope="col">Área</th>
                            <th scope="col">Cargo</th>
                            <th scope="col" colspan="3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($socios as $item)
                        <tr>
                            <th class="text-center" scope="row">{{$item->numero}}</th>
                            <td>{{formatoNombre($item)}}</td>
                            <td class="text-center">{{$item->anexo}}</td>
                            <td>{{$item->correo}}</td>
                            <td>{{imprimirRelacion($item->sede)}}</td>
                            <td>{{imprimirRelacion($item->area)}}</td>
                            <td>{{imprimirRelacion($item->cargo)}}</td>
                            <td wire:click="mostrarSocio({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-success"><i title="Ver socio" class="fas fa-user-check"></i></a></td>
                            <td wire:click="cargarFormEditar({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar socio" class="fas fa-user-edit"></i></a></td>
                            <td class="celda-accion text-center"><a href="#" class="text-danger"><i title="Eliminar socio" class="fas fa-user-minus"></i></a></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div class="alert alert-warning" role="alert">
                No existen <strong>socios</strong> registradoss.
            </div>
        @endif
	</div>
</div>

