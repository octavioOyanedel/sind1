<div>
    <div class="form-group">
        <label for="{{$id}}">{{$label}}</label>
        <div class="input-group">
            <input id="{{$id}}" wire:model="{{$wireModelIni}}" type="date" class="form-control mr-1">
            <input wire:model="{{$wireModelFin}}" type="date" class="form-control ml-1">
        </div>
    </div>
</div>
