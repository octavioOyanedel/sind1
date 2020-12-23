<div class="form-group row">
	<label for="genero" class="col-sm-4 col-form-label">Género *</label>
		<div class="col-sm-8">
		<select wire:model="socio_genero" class="form-control form-control-sm custom-select @error('socio_genero') is-invalid @enderror" id="genero" required>
			<option value="" selected>...</option>
			<option value="Dama">Dama</option>
			<option value="Varón">Varón</option>
		</select>
		@error('socio_genero')
			<small class="text-danger">{{ $message }}</small>
		@enderror
	</div>
</div>
