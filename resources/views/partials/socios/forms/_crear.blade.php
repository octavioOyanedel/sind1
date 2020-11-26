<div class="card">
    <div class="card-header"><h4 class="mb-0">Incorporar Socio</h4></div>
	<form action="" class="">
		<div class="card-body">

			<div class="form-group row">
				<label for="rut" class="col-sm-4 col-form-label">Rut:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="rut" required>
				</div>			
			</div>

			<div class="form-group row">
				<label for="numero" class="col-sm-4 col-form-label"># Socio:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="numero" required>
				</div>			
			</div>			

			<div class="form-group row">
				<label for="nombre1" class="col-sm-4 col-form-label">1° Nombre:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="nombre1" required>
				</div>			
			</div>

			<div class="form-group row">
				<label for="nombre2" class="col-sm-4 col-form-label">2° Nombre:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="nombre2">
				</div>			
			</div>

			<div class="form-group row">
				<label for="apellido1" class="col-sm-4 col-form-label">Apellido Pat.:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="apellido1">
				</div>			
			</div>

			<div class="form-group row">
				<label for="apellido2" class="col-sm-4 col-form-label">Apellido Mat.:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="apellido2">
				</div>			
			</div>		

			<div class="form-group row">
				<label for="genero" class="col-sm-4 col-form-label">Género:</label>
				<div class="col-sm-8">
					  <select class="selects form-control form-control-sm" id="genero">
						<option value="" selected>...</option>
						<option value="Dama">Dama</option>
						<option value="Varón">Varón</option>
					  </select>
				</div>			
			</div>		

			<div class="form-group row">
				<label for="fecha_nac" class="col-sm-4 col-form-label">Fecha Nac.:</label>
				<div class="col-sm-8">
					<input type="date" class="form-control form-control-sm" id="fecha_nac">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="contacto" class="col-sm-4 col-form-label"># Contacto:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="contacto">
				</div>			
			</div>		

			<div class="form-group row">
				<label for="correo" class="col-sm-4 col-form-label">Correo:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="correo">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="fecha_pucv" class="col-sm-4 col-form-label">Fecha Ing. PUCV:</label>
				<div class="col-sm-8">
					<input type="date" class="form-control form-control-sm" id="fecha_pucv">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="anexo" class="col-sm-4 col-form-label">Anexo:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="anexo">
				</div>			
			</div>

			<div class="form-group row">
				<label for="fecha_sind1" class="col-sm-4 col-form-label">Fecha Ing. SIND1:</label>
				<div class="col-sm-8">
					<input type="date" class="form-control form-control-sm" id="fecha_sind1">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="region" class="col-sm-4 col-form-label">Región:</label>
				<div class="col-sm-8">
					<select wire:model="region" class="form-control form-control-sm" id="region">
					<option value="" selected>...</option>
						@foreach ($regiones as $r)
							<option value="{{ $r->id }}">{{ $r->nombre }}</option>
						@endforeach
					</select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="provincia" class="col-sm-4 col-form-label">Provincia:</label>
				<div class="col-sm-8">
					  <select wire:model="provincia" class="form-control form-control-sm" id="provincia">
						<option value="" selected>...</option>
						@foreach ($provincias as $p)
							<option value="{{ $p->id }}">{{ $p->nombre }}</option>
						@endforeach						
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="comuna" class="col-sm-4 col-form-label">Comuna:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="comuna">
						<option value="" selected>...</option>
						@foreach ($comunas as $c)
							<option value="{{ $c->id }}">{{ $c->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="direccion" class="col-sm-4 col-form-label">Dirección:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="direccion">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="sede" class="col-sm-4 col-form-label">Sede:</label>
				<div class="col-sm-8">
					  <select wire:model="sede" class="form-control form-control-sm" id="sede">
						<option value="" selected>...</option>
						@foreach ($sedes as $s)
							<option value="{{ $s->id }}">{{ $s->nombre }}</option>
						@endforeach								
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="area" class="col-sm-4 col-form-label">Área:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="area">
						<option value="" selected>...</option>
						@foreach ($areas as $a)
							<option value="{{ $a->id }}">{{ $a->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	
			
			<div class="form-group row">
				<label for="cargo" class="col-sm-4 col-form-label">Cargo:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="cargo">
						<option value="" selected>...</option>
						@foreach ($cargos as $c)
							<option value="{{ $c->id }}">{{ $c->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="nacionalidad" class="col-sm-4 col-form-label">Nacionalidad:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="nacionalidad">
						<option value="" selected>...</option>
						@foreach ($naciones as $n)
							<option value="{{ $n->id }}">{{ $n->nombre }}</option>
						@endforeach							
					  </select>
				</div>			
			</div>	

			<div class="form-group">
				<button type="submit" class="form-control btn btn-primary">Guardar</button>
			</div>

		</div>
	</form>
</div>
@push('scripts')
	{{-- Select2 --}}
	<script type="text/javascript">

	</script>
@endpush