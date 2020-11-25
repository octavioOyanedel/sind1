<div class="card mx-0">
    <div class="card-header"><h4 class="mb-0">Incorporar Socio</h4></div>
	<form action="" class="">
		<div class="card-body">

			<div class="form-group row">
				<label for="rut" class="col-sm-4 col-form-label text-md-right">Rut:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="rut" required>
				</div>			
			</div>

			<div class="form-group row">
				<label for="numero" class="col-sm-4 col-form-label text-md-right"># Socio:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="numero" required>
				</div>			
			</div>			

			<div class="form-group row">
				<label for="nombre1" class="col-sm-4 col-form-label text-md-right">1° Nombre:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="nombre1" required>
				</div>			
			</div>

			<div class="form-group row">
				<label for="nombre2" class="col-sm-4 col-form-label text-md-right">2° Nombre:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="nombre2">
				</div>			
			</div>

			<div class="form-group row">
				<label for="apellido1" class="col-sm-4 col-form-label text-md-right">Apellido Pat.:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="apellido1">
				</div>			
			</div>

			<div class="form-group row">
				<label for="apellido2" class="col-sm-4 col-form-label text-md-right">Apellido Mat.:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="apellido2">
				</div>			
			</div>		

			<div class="form-group row">
				<label for="genero" class="col-md-4 col-form-label text-md-right">Género:</label>
				<div class="col-md-6">
					<div data-toggle="buttons" class="btn-group btn-group-toggle">
						<label class="btn btn-outline-secondary"><input type="radio" id="option1" autocomplete="off" value="Dama" required="required" class="w-50">Dama</label>
						<label class="btn btn-outline-secondary active"><input type="radio" id="option2" autocomplete="off" value="Varón" class="w-50">Varón</label>
					</div>
				</div>
			</div>			

			<div class="form-group row">
				<label for="fecha_nac" class="col-sm-4 col-form-label text-md-right">Fecha Nac.:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="fecha_nac">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="contacto" class="col-sm-4 col-form-label text-md-right"># Contacto:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="contacto">
				</div>			
			</div>		

			<div class="form-group row">
				<label for="correo" class="col-sm-4 col-form-label text-md-right">Correo:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="correo">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="fecha_pucv" class="col-sm-4 col-form-label text-md-right">Fecha Ing. PUCV:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="fecha_pucv">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="anexo" class="col-sm-4 col-form-label text-md-right">Anexo:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="anexo">
				</div>			
			</div>

			<div class="form-group row">
				<label for="fecha_sind1" class="col-sm-4 col-form-label text-md-right">Fecha Ing. SIND1:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="fecha_sind1">
				</div>			
			</div>	

			<div class="form-group row">
				<label for="region" class="col-sm-4 col-form-label text-md-right">Región:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="region">
						<option value="" selected>...</option>
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="provincia" class="col-sm-4 col-form-label text-md-right">Provincia:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="provincia">
						<option value="" selected>...</option>
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="comuna" class="col-sm-4 col-form-label text-md-right">Comuna:</label>
				<div class="col-sm-8">
					  <select class="form-control form-control-sm" id="comuna">
						<option value="" selected>...</option>
					  </select>
				</div>			
			</div>	

			<div class="form-group row">
				<label for="direccion" class="col-sm-4 col-form-label text-md-right">Dirección:</label>
				<div class="col-sm-8">
					<input type="text" class="form-control form-control-sm" id="direccion">
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