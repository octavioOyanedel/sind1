<div wire:poll.keep-alive>
	<div class="row my-2 mx-0">

		{{-- CARD FORM --}}
		<div class="col-sm-12 col-md-4">
			@include("partials.socios.forms.$forms")
		</div>

		{{-- CARD TABLA --}}
		<div class="col-sm-12 col-md-8">
			@include("partials.socios.tablas.$tablas")
		</div>

	</div>
</div>
