<div>
	<div class="row my-2 mx-0">

		{{-- CARD FORM --}}
		<div class="col-sm-12 col-md-4">
			@include("partials.socios.forms.$form")
			@push('scripts')
				<script type="text/javascript">
					window.livewire.on('alertaOk', texto => {
						Swal.fire({
							toast: true,
							position: 'bottom-end',
							icon: 'success',
							title: texto,
							showConfirmButton: false,
							timer: 2700,
							background: '#38c172',
							iconColor: '#fff'
						})   
					});
				</script>	
			@endpush
		</div>

		{{-- CARD TABLA --}}
		<div class="col-sm-12 col-md-8">
			@include("partials.socios.tablas._listar")
		</div>

	</div>
</div>
