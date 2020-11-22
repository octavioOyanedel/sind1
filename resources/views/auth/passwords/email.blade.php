@extends('layouts.app')

@section('content')
    <form method="POST" action="{{ route('password.email') }}">
        @csrf
        <div class="login">
            <div class="form-group text-center">
                <img src="\img\logo_verde.png" class="img-logo img-fluid rounded-circle mx-auto shadow" width="100" alt="Logo">
                <h3 class="my-4 modal-title">Recuperar Contraseña</h3>
            </div>

            <div class="form-group">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                @error('email')
                    <span class="invalid-feedback text-center" role="alert">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group small text-center">
                <a href="{{ route('login') }}" class="">Volver a inicio de sesión</a>
            </div>
            
            <button type="submit" class="btn bg-dark btn-block btn-lg text-white">Enviar</button>
        </div>
    </form>
@endsection
