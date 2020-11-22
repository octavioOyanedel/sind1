@extends('layouts.app')

@section('content')
    <form method="POST" action="{{ route('login') }}">
        @csrf
        <div class="login">
            <div class="form-group text-center">
                <img src="\img\logo_verde.png" class="img-logo img-fluid rounded-circle mx-auto shadow" width="100" alt="Logo">
                <h3 class="my-4 modal-title">Ingresar a SIND1</h3>
            </div>

            <div class="form-group">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
            </div>

            <div class="form-group">
                <input id="password" type="password" class="form-control @error('email') is-invalid @enderror" name="password" required autocomplete="current-password">
                @error('email')
                    <span class="invalid-feedback text-center" role="alert">{{ $message }}</span>
                @enderror
            </div>

            <div class="form-group small clearfix">
                <label class="checkbox">
                    <input class="" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}> Recuérdame
                </label>
                
                <a href="{{ route('password.request') }}" class="float-right">¿Olvidó su contraseña?</a>
            </div>
            <button type="submit" class="btn bg-dark btn-block btn-lg text-white">Entrar</button>
        </div>
    </form>
@endsection
