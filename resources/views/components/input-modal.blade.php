<div>
    <div class="form-group">
        <label for="{{$id}}" @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>
        <input wire:model="{{$wireModel}}" type="text" class="limpiar-input-modal form-control @error($wireModel) is-invalid @enderror"" id="{{$id}}" placeholder="{{$placeholder}}" @if ($required === 'si') required @endif>
        @error($wireModel) 
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>
</div>