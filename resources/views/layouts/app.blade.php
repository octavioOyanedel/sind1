<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/all.css') }}" rel="stylesheet">

</head>
<body class="sidebar-mini sidebar-closed sidebar-collapse" style="height: auto;">
    <div id="app">
        {{-- Carga de nav --}}
        @if (Request()->path() == 'login' || Request()->path() == 'password/reset')
            {{-- Se está en form login o reset email--}}
        @else
            {{-- Navbar superior --}}
            @include('layouts.partials._nav')
            {{-- Navbar lateral --}}
            @include('layouts.partials._aside')
        @endif
        {{-- Carga de contenido --}}
        <main class="">
            @yield('content')
        </main>
    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/all.js') }}"></script>
    @livewireScripts
    @stack('scripts')
</body>
</html>
