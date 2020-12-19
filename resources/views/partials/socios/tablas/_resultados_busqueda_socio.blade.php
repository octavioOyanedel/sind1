<div class="card">
	<div class="card-header">
        <span class="mb-0">{{$titulo_tabla}} 
            @if (count($resultados_busqueda_socio) > 0)
                <span class="text-primary"> >> <strong>{{ count($resultados_busqueda_socio) }}</strong></span>
            @endif
            <a wire:click="cargarTablaListar" class="float-right text-dark" href="#" title="Listar Socios">
                <i class="fas fa-list"></i>
            </a>             
        </span>
	</div>
	<div class="card-body">
        @if (count($resultados_busqueda_socio) != 0)
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered">
                    <thead class="cabecera-tabla">
                        <tr>
                            <td class="text-center" scope="col">#</td>
                            <td scope="col">Nombre</td>
                            <td class="text-center" scope="col">Anexo</td>
                            <td scope="col">Sede</td>
                            <td scope="col" colspan="3"></td>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($resultados_busqueda_socio as $item)
                            <tr>
                                <th class="text-center" scope="row">{{$item->numero}}</th>
                                <td>{{formatoNombre($item)}}</td>
                                <td class="text-center">{{$item->anexo}}</td>
                                <td>{{imprimirRelacion($item->sede)}}</td>
                                <td wire:click="cargarTablaSocio({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-success"><i title="Ver socio" class="fas fa-user-check"></i></a></td>
                                <td wire:click="cargarFormEdit({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar socio" class="fas fa-user-edit"></i></a></td>
                                <td class="celda-accion text-center"><a href="#" class="text-danger"><i title="Eliminar socio" class="fas fa-user-minus"></i></a></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="float-right">

				</div>
            </div>
        @else
            @if ($flag_busqueda === "unica")
                <x-mensaje-alerta icono="far fa-frown" mensaje="No se han encontrado resultados para tu búsqueda." contenido="busqueda_unica"/>
            @else
                <x-mensaje-alerta icono="far fa-frown" mensaje="No se han encontrado resultados para tu búsqueda." contenido="busqueda_masiva"/>
            @endif
            
        @endif
	</div>
</div>
