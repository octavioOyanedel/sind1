<div class="card">
	<div class="card-header">
		<h4 class="mb-0">Listado Socios</h4>
	</div>
	<div class="card-body">
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
					@forelse($socios as $s)
					<tr>
						<th class="text-center" scope="row">{{$s->numero}}</th>
						<td>{{formatoNombre($s)}}</td>
						<td class="text-center">{{$s->anexo}}</td>
						<td>{{$s->correo}}</td>
						<td>{{imprimirRelacion($s->sede)}}</td>
						<td>{{imprimirRelacion($s->area)}}</td>
						<td>{{imprimirRelacion($s->cargo)}}</td>
						<td class="celda-accion text-center"><a href="#" class="text-success"><i title="Ver socio" class="fas fa-user-check"></i></a></td>
						<td wire:click="cargarFormEditar({{$s->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar socio" class="fas fa-user-edit"></i></a></td>
						<td class="celda-accion text-center"><a href="#" class="text-danger"><i title="Eliminar socio" class="fas fa-user-minus"></i></a></td>
					</tr>					
					@empty
						<div class="alert alert-warning" role="alert">
							A simple warning alert with <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
						</div>					
					@endforelse
				</tbody>
			</table>
		</div>
	</div>
</div>

