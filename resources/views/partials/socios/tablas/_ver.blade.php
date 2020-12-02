<div class="card">
	<div class="card-header">
		<span class="mb-0">Info Socio
            <a wire:click="mostrarTablaListar" class="float-right" href="#" title="Listar Socios">
                <i class="fas fa-list"></i>
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
                <td>{{formatoNombre($socio)}}</td>
            </tr>
            <tr>
                <th>Rut</th>
                <td>{{$socio->rut}}</td>
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
                <td>{{$socio->fecha_nac}}</td>
            </tr>
            <tr>
                <th>Región</th>
                <td>{{$socio->distrito_id}}</td>
            </tr>
            <tr>
                <th>Provincia</th>
                <td>{{$socio->provincia_id}}</td>
            </tr>
            <tr>
                <th>Comuna</th>
                <td>{{$socio->comuna_id}}</td>
            </tr>
            <tr>
                <th>Dirección</th>
                <td>{{$socio->direccion}}</td>
            </tr>
            <tr>
                <th>Nacionalidad</th>
                <td>{{$socio->nacion_socio_id}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Sindicales</td>
            </tr>
            <tr>
                <th>Estado Socio</th>
                <td>{{$socio->estado_socio_id}}</td>
            </tr>
            <tr>
                <th># Socio</th>
                <td>{{$socio->numero}}</td>
            </tr>
            <tr>
                <th>Fecha Ing. SIND1</th>
                <td>{{$socio->fecha_sind1}}</td>
            </tr>
            <tr class="cabecera-tabla">
                <td colspan="2">Datos Laborales</td>
            </tr>
            <tr>
                <th>Fecha Ing. PUCV</th>
                <td>{{$socio->fecha_pucv}}</td>
            </tr>
            <tr>
                <th>Anexo</th>
                <td>{{$socio->anexo}}</td>
            </tr>
            <tr>
                <th>Sede</th>
                <td>{{$socio->sede_id}}</td>
            </tr>
            <tr>
                <th>Área</th>
                <td>{{$socio->area_id}}</td>
            </tr>
            <tr>
                <th>Cargo</th>
                <td>{{$socio->cargo_id}}</td>
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

