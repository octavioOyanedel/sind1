<x-mensaje-alerta icono="fas fa-exclamation-triangle" mensaje="Confirmación." contenido="desvincular"/>
<x-select-modal id="estado" label="Estado Socio" required="si" :coleccion="$estados" wireModel="socio_estado_socio_id"/>