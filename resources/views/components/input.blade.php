<div>
    <div class="form-group row">
        <label for="{{$id}}" class="col-sm-4 col-form-label"  @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>
        <div class="col-sm-8">
            <input wire:model="{{$wireModel}}" type="{{$type}}" class="limpiar-input form-control @error($wireModel) is-invalid @enderror" id="{{$id}}" @if ($id === 'numero') placeholder="{{numeroRecomendado()}}" @else placeholder="{{$placeholder}}" @endif @if ($required === 'si') required @endif>
            @error($wireModel)
                <small class="text-danger">{{ $message }}</small>
            @enderror		
        </div>			
    </div>    
</div>