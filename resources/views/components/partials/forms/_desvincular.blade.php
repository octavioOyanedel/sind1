<div class="alert alert-warning" role="alert">
    <h4 class="alert-heading"><i class="fas fa-exclamation-triangle"></i></h4>
    <p>Confirmación de desvinculación.</p>
    <hr>
    <p class="mb-0">
        <small class="">
            Debe seleccionar un motivo de desvinculación modificando su estado en selector a continuación.
        </small>
    </p>
</div>
<x-select-modal id="estado" label="Estado Socio" required="si" :coleccion="$estados" wireModel="estado"/>