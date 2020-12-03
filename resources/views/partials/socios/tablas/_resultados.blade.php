<div class="card">
	<div class="card-header">
		<span class="mb-0">Resultados Búsqueda</span>
	</div>
	<div class="card-body">
        @if (count($encontrados) != 0)
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
                        @foreach ($encontrados as $item)
                        <tr>
                            <th class="text-center" scope="row">{{$item->numero}}</th>
                            <td>{{formatoNombre($item)}}</td>
                            <td class="text-center">{{$item->anexo}}</td>
                            <td>{{imprimirRelacion($item->sede)}}</td>
                            <td wire:click="mostrarSocio({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-success"><i title="Ver socio" class="fas fa-user-check"></i></a></td>
                            <td wire:click="cargarFormEditar({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar socio" class="fas fa-user-edit"></i></a></td>
                            <td class="celda-accion text-center"><a href="#" class="text-danger"><i title="Eliminar socio" class="fas fa-user-minus"></i></a></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="float-right">

				</div>
            </div>
        @else
        <div class="alert alert-warning" role="alert">
            <h4 class="alert-heading"><i class="far fa-frown"></i></h4>
            <p>No se han encontrado resultados para tu búsqueda.</p>
            <hr>
            <p class="mb-0">
                Recomendaciones:
                <small class="">
                    <ul class="">
                        <li>rut</li>
                        <li>nombre + apellido</li>
                        <li>sólo nombre o apellido</li>
                        <li>correo</li>
                        <li># socio</li>
                        <li>anexo</li>
                        <li>dirección</li>
                        <li># contacto</li>
                    </ul>
                </small>
            </p>
          </div>
        @endif
	</div>
</div>
