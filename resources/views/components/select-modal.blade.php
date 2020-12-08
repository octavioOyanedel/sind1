<div>
    <div class="form-group">
        <label for="{{$id}}" @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>
        <select required="true" class="select-modal form-control custom-select @error($wireModel) is-invalid @enderror" id="{{$id}}" wire:model="{{$wireModel}}">
            <option value="" selected>...</option>
            @foreach($coleccion as $item)
                <option value="{{ $item->id }}">{{ $item->nombre }}</option>
            @endforeach
        </select>
        @error($wireModel)
            <small class="mensaje-error text-danger">{{ $message }}</small>
        @enderror
    </div>
</div>
