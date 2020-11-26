<div>
    <div class="form-group row">
        <label for="{{$id}}" class="col-sm-4 col-form-label"  @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>
        <div class="col-sm-8">
            <input wire:model="{{$wireModel}}" type="{{$type}}" class="form-control form-control-sm @error($wireModel) is-invalid @enderror" id="{{$id}}" placeholder="{{$placeholder}}" @if ($required === 'si') required @endif>
        </div>
        @error($wireModel)
            <small class="text-danger">{{ $message }}</small>
        @enderror			
    </div>    
</div>