<div>
    <div class="form-group">
        <label for="{{$id}}" @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif</label>					 
        <select class="form-control" id="{{$id}}" wire:model="{{$wireModel}}">
            <option value="" selected>...</option>
            @foreach($coleccion as $item)
                <option value="{{ $item->id }}">{{ $item->nombre }}</option>			
            @endforeach
        </select>
        @error('region') 
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>
</div>