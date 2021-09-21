@php

$CFG_MAIN_HOST = env('APP_URL');
$CFG_JS_HOST = env('APP_STATIC_URL', $CFG_MAIN_HOST);
$CFG_CSS_HOST = env('APP_CSS_URL', $CFG_JS_HOST);
$CFG_MEDIA_HOST = env('APP_MEDIA_URL', $CFG_JS_HOST);
$title          = env('APP_TITLE', 'Дистационное голосование');
$keywords       = env('APP_KEYWORDS', 'Дистационное голосование, Электронное голосование');
$description    = env('APP_DESCRITPION', 'Дистационное голосование');

@endphp

<meta http-equiv="X-UA-Compatible" content="IE=11"/>
<meta name="google-site-verification" content="kA2jKykta5QrNay9jkrMx9WgPPQNGCi3txcPDBSm7Ws" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

<meta charset="utf-8">
<title>{{ $title }}</title>
<meta name="keywords" content="{{ $keywords }}"/>
<meta name="description" content="{{ $description }}"/>
<!--Предзагружаем шрифты-->
{{--
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXRegular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXRegular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXMedium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXBold.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/rouble.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXRegular.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXRegular.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXMedium.woff" as="font" type="font/woff" crossorigin>
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/MCWXXBold.woff" as="font" type="font/woff" crossorigin>
 --}}
<link rel="preload" href="{{ $CFG_MEDIA_HOST }}/css/fonts/rouble.woff" as="font" type="font/woff" crossorigin>
<link rel="icon" type="image/x-icon" href="{{ $CFG_MEDIA_HOST }}/img/favicon/favicon.ico"/>
<link rel="shortcut icon" type="image/x-icon" href="{{ $CFG_MEDIA_HOST }}/img/favicon/favicon.ico"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon76x76.png" rel="apple-touch-icon" sizes="76x76"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon96x96.png" rel="apple-touch-icon" sizes="96x96"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon120x120.png" rel="apple-touch-icon" sizes="120x120"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon152x152.png" rel="apple-touch-icon" sizes="152x152"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon180x180.png" rel="apple-touch-icon" sizes="180x180"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon192x192.png" rel="icon" sizes="192x192"/>
<link href="{{ $CFG_MEDIA_HOST }}/img/favicon/icon128x128.png" rel="icon" sizes="128x128"/>


<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/font.css">
<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/jquery-ui.theme.min.css">

<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/bootstrap-datetimepicker.min.css">
<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/application.css">
<link rel="stylesheet" type="text/css" href="{{ $CFG_CSS_HOST }}/css/autocomplete.css">

<script type="text/javascript">
    var cfgMainHost = '{{ $CFG_MAIN_HOST }}';
    var cfgJsHost = '{{ $CFG_JS_HOST }}';
    var cfgCssHost = '{{ $CFG_CSS_HOST }}';
    var cfgMediaHost = '{{ $CFG_MEDIA_HOST }}';
    var ajaxUrl = cfgMainHost + '/ws/ajax/';
</script>


<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/jquery-ui.min.js"></script>

<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/popper.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/bootstrap.min.js"></script>

<!--  Полифил промисов для ИЕ 11  -->
<!--<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/es6-promise.auto.min.js"></script>-->
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/selectize.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/jquery.validate.min.js"></script>
{{--
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/Chart.bundle.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/Chart.min.js"></script>
--}}
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/messages_ru.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/inputmask/inputmask.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/inputmask/inputmask.extensions.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/inputmask/inputmask.numeric.extensions.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/inputmask/inputmask.date.extensions.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/inputmask/jquery.inputmask.min.js"></script>

<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/autocomplete.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/datepicker/moment.min.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/datepicker/moment-locales-ru.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/dev/datepicker/bootstrap-datetimepicker.min.js"></script>

<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/lib/validators.js"></script>
<script type="text/javascript" src="{{ $CFG_JS_HOST }}/js/main.js"></script>