<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/js/adminlte.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/admin-lte@3.2/dist/css/adminlte.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&amp;display=fallback">
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.css" />
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid.min.js"></script>
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.3/jsgrid-theme.min.css" />
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx", 'resources/js/Pages/routine.tsx'])
    @inertiaHead
    <style>
        * {
            scroll-behavior: smooth;
        }
        .login-logo img {
            display: inline-block;
            vertical-align: middle;
        }
        .login-logo a {
            display: inline-block;
            vertical-align: middle;
        }
    </style>
</head>
<body>
    @if(!request()->is('login') && !request()->is('register'))
    <div class="wrapper">
        <div id="react-sidebar"></div>
        @if(request()->is('/'))
        <div class="content-wrapper d-flex justify-content-center align-items-center opacity-55">
            <img src="/images/example-logo.png" alt="" class="brand-image img-circle">
        </div>
        @else
        <div class="content-wrapper">
            @if(request()->is('includeRoutine'))
            <div id="react-include-routine"></div>
            @endif
            @if(request()->is('entidade-routine'))
                <div id="react-include-entidade-routine"></div>
            @endif
            @inertia
        </div>
    </div>
    @endif
    @endif
    @csrf
    @inertia
    @viteReactRefresh
    @vite('resources/js/app.tsx')
</body>
</html>