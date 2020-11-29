<div class="card">
	<div class="card-header">
		<h4 class="mb-0">Listado Socios</h4>
	</div>
	<div class="card-body">
		<div class="table-responsive">
			<table class="table table-striped table-hover">
				<thead class="cabecera-tabla">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Nombre</th>
						<th scope="col">Anexo</th>
						<th scope="col">Correo</th>
						<th scope="col">Sede</th>
						<th scope="col">Área</th>
						<th scope="col">Cargo</th>
						<th scope="col"></th>
						<th scope="col"></th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					@forelse($socios as $s)
					<tr>
						<th scope="row">{{$s->numero}}</th>
						<td>{{formatoNombre($s)}}</td>
						<td>{{$s->anexo}}</td>
						<td>{{$s->correo}}</td>
						<td>{{imprimirRelacion($s->sede)}}</td>
						<td>{{imprimirRelacion($s->area)}}</td>
						<td>{{imprimirRelacion($s->cargo)}}</td>
						<td><i class="fas fa-user-check"></i></td>
						<td><i class="fas fa-user-edit"></i></td>
						<td><i class="fas fa-user-minus"></i></td>
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

