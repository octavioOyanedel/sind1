<div>
    <div class="form-group row">				
        <label for="{{$id}}" class="col-sm-4 col-form-label"  @if ($required === 'si') title="Campo Obligatorio." @endif>{{$label}} @if ($required === 'si') *@endif
            <a wire:click="limpiarModalForm" class="text-primary float-right" href="#" data-toggle="modal" data-target="{{$modal}}"><i role="button" class="fas fa-plus-circle"></i></a>
        </label>
        <div class="col-sm-8">
        <select wire:model="{{$wireModel}}" class="form-control form-control-sm @error($wireModel) is-invalid @enderror" id="{{$id}}">
            <option value="" selected>...</option>
                @foreach ($coleccion as $item)
                    <option value="{{ $item->id }}">{{ $item->nombre }}</option>
                @endforeach
            </select>
        </div>
        @error($wireModel)
            <small class="text-danger">{{ $message }}</small>
        @enderror				
    </div>	
</div>