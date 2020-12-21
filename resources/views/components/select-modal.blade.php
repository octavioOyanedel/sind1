<div>
    <div class="form-group">
        <label for="{{$id}}" @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>
        <select required="true" class="select-modal form-control custom-select @error($wireModel) is-invalid @enderror" id="{{$id}}" wire:model="{{$wireModel}}">
            <option value="" selected>...</option>
            @foreach($coleccion as $item)
                @if ($wireModel === 'socio_estado_socio_id')
                    @if ($item->nombre != 'Activo')
                        <option value="{{ $item->id }}">{{ $item->nombre }}</option>
                    @endif                   
                @else
                    <option value="{{ $item->id }}">{{ $item->nombre }}</option>
                @endif                
            @endforeach
        </select>
        @error($wireModel)
            <small class="mensaje-error text-danger">{{ $message }}</small>
        @enderror
    </div>
</div>
