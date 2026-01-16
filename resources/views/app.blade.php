<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/images/logo.png">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    @if(isset($meta))
        <!-- Social Media Meta Tags -->
        <meta property="og:title" content="{{ $meta['title'] }}" />
        <meta property="og:description" content="{{ $meta['description'] }}" />
        <meta property="og:image" content="{{ $meta['image'] }}" />
        <meta property="og:url" content="{{ $meta['url'] }}" />
        <meta property="og:type" content="{{ $meta['type'] ?? 'website' }}" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="{{ $meta['title'] }}" />
        <meta name="twitter:description" content="{{ $meta['description'] }}" />
        <meta name="twitter:image" content="{{ $meta['image'] }}" />
    @else
        <!-- Default Meta Tags -->
        <meta property="og:title" content="{{ config('app.name', 'Laravel') }}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="{{ url()->current() }}" />
        <meta property="og:image" content="{{ asset('/images/logo.png') }}" />

        <meta name="twitter:card" content="summary" />
    @endif
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>