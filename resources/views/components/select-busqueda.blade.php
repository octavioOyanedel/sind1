<div>
    <div class="form-group row">
        <label for="{{$id}}" class="col-sm-4 col-form-label">{{$label}}</label>
        <div class="col-sm-8">
            <select wire:model="{{$wireModel}}" class="form-control custom-select" id="{{$id}}">
                <option value="" selected>...</option>
                @foreach ($coleccion as $item)
                    <option value="{{$item->id}}">{{$item->nombre}}</option>
                @endforeach
            </select>
        </div>
        @error($wireModel)
            <small class="text-danger">{{ $message }}</small>
        @enderror
    </div>
</div>
