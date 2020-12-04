<div class="card">
	<div class="card-header">
		<span class="mb-0">Info Socio
            <a wire:click="cargarTablaListar" class="float-right text-dark" href="#" title="Listar Socios">
                <i class="fas fa-list"></i>
            </a>
            <a wire:click="cargarFormEdit({{$socio->id}})" class="float-right text-primary mr-4" href="#" title="Editar Socio">
                <i class="fas fa-user-edit"></i>
            </a>
            @if ($flag_busqueda != NULL)
                @if ($flag_busqueda === 'unica')
                    <a wire:click="busquedaUnica" class="float-right text-success mr-4" href="#" title="Volver a Resultados.">
                        <i class="fas fa-chevron-circle-left"></i>
                    </a>
                @else
                    <a wire:click="busquedaMasiva" class="float-right text-success mr-4" href="#" title="Volver a Resultados.">
                        <i class="fas fa-chevron-circle-left"></i>
                    </a>
                @endif                 
            @endif                      
        </span>
	</div>
	<div class="card-body">
        <table class="table table-bordered">
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Personales</td>
            </tr>
            <tr>
                <th>Nombre</th>
                <td>{{formatoNombre($socio)}}</td>
            </tr>
            <tr>
                <th>Rut</th>
                <td>{{formatoRut($socio->rut)}}</td>
            </tr>
            <tr>
                <th>Género</th>
                <td>{{$socio->genero}}</td>
            </tr>
            <tr>
                <th># Contacto</th>
                <td>{{$socio->contacto}}</td>
            </tr>
            <tr>
                <th>Correo</th>
                <td>{{$socio->correo}}</td>
            </tr>
            <tr>
                <th>Fecha Nac.</th>
                <td>{{fechaYmdAdmy($socio->fecha_nac)}}</td>
            </tr>
            <tr>
                <th>Región</th>
                <td>{{imprimirRelacion($socio->distrito)}}</td>
            </tr>
            <tr>
                <th>Provincia</th>
                <td>{{imprimirRelacion($socio->provincia)}}</td>
            </tr>
            <tr>
                <th>Comuna</th>
                <td>{{imprimirRelacion($socio->comuna)}}</td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>{{$socio->direccion}}</td>
            </tr>
            <tr>
                <th>Nacionalidad</th>
                <td>{{imprimirRelacion($socio->nacionSocio)}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Sindicales</td>
            </tr>
            <tr>
                <th>Estado Socio</th>
                <td>{{imprimirRelacion($socio->estadoSocio)}}</td>
            </tr>
            <tr>
                <th># Socio</th>
                <td>{{$socio->numero}}</td>
            </tr>
            <tr>
                <th>Fecha Ing. SIND1</th>
                <td>{{fechaYmdAdmy($socio->fecha_sind1)}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Laborales</td>
            </tr>
            <tr>
                <th>Fecha Ing. PUCV</th>
                <td>{{fechaYmdAdmy($socio->fecha_pucv)}}</td>
            </tr>
            <tr>
                <th>Anexo</th>
                <td>{{$socio->anexo}}</td>
            </tr>
            <tr>
                <th>Sede</th>
                <td>{{imprimirRelacion($socio->sede)}}</td>
            </tr>
            <tr>
                <th>Área</th>
                <td>{{imprimirRelacion($socio->area)}}</td>
            </tr>
            <tr>
                <th>Cargo</th>
                <td>{{imprimirRelacion($socio->cargo)}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Cargas Familiares</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Estudios Realizados</td>
            </tr>
        </table>
	</div>
</div>

