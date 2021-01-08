<div class="card">
	<div class="card-header">
		<span class="mb-0">Info Socio
            <a wire:click="cargarTablaListarSocio" class="float-right text-dark" href="#" title="Listar Socios">
                <i class="fas fa-list"></i>
            </a>
            <a wire:click="cargarFormEditarSocio({{$objeto_socio->id}})" class="float-right text-primary mr-4" href="#" title="Editar Socio">
                <i class="fas fa-user-edit"></i>
            </a>
        </span>
	</div>
	<div class="card-body">
        <table class="table table-bordered">
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Personales</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>{{formatoNombre($objeto_socio)}}</td>
            </tr>
            <tr>
                <th>Rut</th>
                <td>{{formatoRut($objeto_socio->rut)}}</td>
            </tr>
            <tr>
                <th>Género</th>
                <td>{{$objeto_socio->genero}}</td>
            </tr>
            <tr>
                <th># Contacto</th>
                <td>{{$objeto_socio->contacto}}</td>
            </tr>
            <tr>
                <th>Correo</th>
                <td>{{$objeto_socio->correo}}</td>
            </tr>
            <tr>
                <th>Fecha Nac.</th>
                <td>{{fechaYmdAdmy($objeto_socio->fecha_nac)}}</td>
            </tr>
            <tr>
                <th>Región</th>
                <td>{{imprimirRelacion($objeto_socio->distrito)}}</td>
            </tr>
            <tr>
                <th>Provincia</th>
                <td>{{imprimirRelacion($objeto_socio->provincia)}}</td>
            </tr>
            <tr>
                <th>Comuna</th>
                <td>{{imprimirRelacion($objeto_socio->comuna)}}</td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>{{$objeto_socio->direccion}}</td>
            </tr>
            <tr>
                <th>Nacionalidad</th>
                <td>{{imprimirRelacion($objeto_socio->nacionSocio)}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Sindicales</td>
            </tr>
            <tr>
                <th>Estado Socio</th>
                <td>{{imprimirRelacion($objeto_socio->estadoSocio)}}</td>
            </tr>
            <tr>
                <th># Socio</th>
                <td>{{$objeto_socio->numero}}</td>
            </tr>
            <tr>
                <th>Fecha Ing. SIND1</th>
                <td>{{fechaYmdAdmy($objeto_socio->fecha_sind1)}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Laborales</td>
            </tr>
            <tr>
                <th>Fecha Ing. PUCV</th>
                <td>{{fechaYmdAdmy($objeto_socio->fecha_pucv)}}</td>
            </tr>
            <tr>
                <th>Anexo</th>
                <td>{{$objeto_socio->anexo}}</td>
            </tr>
            <tr>
                <th>Sede</th>
                <td>{{imprimirRelacion($objeto_socio->sede)}}</td>
            </tr>
            <tr>
                <th>Área</th>
                <td>{{imprimirRelacion($objeto_socio->area)}}</td>
            </tr>
            <tr>
                <th>Cargo</th>
                <td>{{imprimirRelacion($objeto_socio->cargo)}}</td>
            </tr>
        </table>

        {{-- Tabla cargas --}}
        <div class="table-responsive mt-3">
            <table class="table table-striped table-hover table-bordered">
                @if(!$objeto_socio->cargas->isEmpty())
                    <thead class="cabecera-tabla">
                        <tr>
                            <td scope="col" colspan="8">Cargas Familiares</td>
                        </tr>
                    </thead>
                @else
                    <div class="alert alert-warning mt-3" role="alert">
                        <small>Socio no cuenta con cargas familiares registradas.</small>
                    </div>
                @endif
                <thead class="cabecera-tabla">
                    <tr>
                        <td scope="col">Nombre</td>
                        <td scope="col">Rut</td>
                        <td class="text-center" scope="col">Fecha Nac.</td>
                        <td class="text-center" scope="col">Edad</td>
                        <td class="text-center" scope="col">Parentesco</td>
                        <td scope="col" colspan="3"></td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($objeto_socio->cargas as $item)
                        <tr>
                            <td>{{formatoNombre($item)}}</td>
                            <td>{{formatoRut($item->rut)}}</td>
                            <td class="text-center">{{fechaYmdAdmy($item->fecha)}}</td>
                            <td class="text-center">{{obtenerEdad($item->fecha)}}</td>
                            <td class="text-center">{{$item->parentesco->nombre}}</td>
                            <td wire:click="cargarFormEditarCarga({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar carga familiar" class="fas fa-user-edit"></i></a></td>
                            <td class="celda-accion text-center"><a wire:click="cargarEliminarCarga({{$item->id}})" href="#" class="text-danger" data-toggle="modal" data-target="#eliminar-carga"><i title="Eliminar carga familiar" class="fas fa-user-minus"></i></a></td>
                        </tr>
                    @endforeach
                    <tr><td wire:click="cargarFormCrearCarga" colspan="8"><a href="#"><i class="fas fa-plus-circle"></i> Nueva Carga</a></td></tr>
                </tbody>
            </table>
        </div>

        {{-- Tabla estudios realizados --}}
        <div class="table-responsive mt-3">
            <table class="table table-striped table-hover table-bordered">
                @if(!$objeto_socio->estudios->isEmpty())
                    <thead class="cabecera-tabla">
                        <tr>
                            <td scope="col" colspan="8">Estudios Realizados</td>
                        </tr>
                    </thead>
                @else
                    <div class="alert alert-warning mt-3" role="alert">
                        <small>Socio no cuenta con estudios registrados.</small>
                    </div>
                @endif
                <thead class="cabecera-tabla">
                    <tr>
                        <td scope="col">Grado Académico</td>
                        <td scope="col">Establecimiento</td>
                        <td class="text-center" scope="col">Estado</td>
                        <td class="text-center" scope="col">Título</td>
                        <td scope="col" colspan="3"></td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($objeto_socio->estudios as $item)
                        <tr>
                            <td>grado</td>
                            <td>estab</td>
                            <td>estad</td>
                            <td>titul</td>
                            <td wire:click="cargarFormEditarEstudio({{$item->id}})" class="celda-accion text-center"><a href="#" class="text-primary"><i title="Editar estudio realizado" class="fas fa-user-edit"></i></a></td>
                            <td class="celda-accion text-center"><a wire:click="cargarEliminarEstudio({{$item->id}})" href="#" class="text-danger" data-toggle="modal" data-target="#eliminar-estudio"><i title="Eliminar estudio realizado" class="fas fa-user-minus"></i></a></td>
                        </tr>
                    @endforeach
                    <tr><td wire:click="cargarFormCrearEstudio" colspan="8"><a href="#"><i class="fas fa-plus-circle"></i> Nueva Estudio</a></td></tr>
                </tbody>
            </table>
        </div>
	</div>
</div>

{{-- Modal --}}
<x-modal id="eliminar-carga" titulo="Eliminar Carga" wireClick="eliminarCarga" boton="Eliminar" coleccion=""/>

@push('scripts')
	<script type="text/javascript">
        window.livewire.on('cerrar_modal', () => {
            $('#eliminar-carga').modal('hide');
        });
	</script>
@endpush
