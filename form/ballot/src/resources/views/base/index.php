<?php

$CFG_MAIN_HOST = 'localhost'; //lib::getMainUrl();
$CFG_JS_HOST = 'js/'; //lib::getJsUrl();
$CFG_CSS_HOST = ''; //lib::getCssUrl();
$CFG_MEDIA_HOST = ''; //lib::getMediaUrl();

require_once(resource_path() . '/include/params.php');
require_once(resource_path() . '/include/lib.php');
require_once(resource_path() . '/include/js_head.php');
require_once(resource_path() . '/include/elk.php');
require_once(resource_path() . '/include/jinba.php');
require_once(resource_path() . '/include/mos_ru_stat.php');

//require_once(params::$params['common_data_server']['value'].'module/module/module.php');
//require_once(params::$params['common_data_server']['value'].'cms_class/client_access.php');
?>

<!DOCTYPE html>
<html>
<head>
    <?php
    $title = 'Госуслуги Москвы';
    $keywords = '';
    $description = '';

    $isAuthorized = true;
    ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="google-site-verification" content="kA2jKykta5QrNay9jkrMx9WgPPQNGCi3txcPDBSm7Ws" />
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo $title; ?></title>
    <meta name="keywords" content="<?php echo $keywords; ?>" />
    <meta name="description" content="<?php echo $description; ?>" />

    <link rel="icon" type="image/x-icon" href="http://media.localhost/common/img/favicon/favicon.ico"/>
    <link rel="shortcut icon" type="image/x-icon" href="http://media.localhost/common/img/favicon/favicon.ico"/>
    <link href="http://media.localhost/common/img/favicon/icon76x76.png" rel="apple-touch-icon" sizes="76x76"/>
    <link href="http://media.localhost/common/img/favicon/icon96x96.png" rel="apple-touch-icon" sizes="96x96"/>
    <link href="http://media.localhost/common/img/favicon/icon120x120.png" rel="apple-touch-icon" sizes="120x120"/>
    <link href="http://media.localhost/common/img/favicon/icon152x152.png" rel="apple-touch-icon" sizes="152x152"/>
    <link href="http://media.localhost/common/img/favicon/icon180x180.png" rel="apple-touch-icon" sizes="180x180"/>
    <link href="http://media.localhost/common/img/favicon/icon192x192.png" rel="icon" sizes="192x192"/>
    <link href="http://media.localhost/common/img/favicon/icon128x128.png" rel="icon" sizes="128x128"/>

    <link rel="stylesheet" type="text/css" media="all" href="http://css.localhost/common/css/new/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" media="all" href="http://css.localhost/common/css/new/special.css" />
    <link rel="stylesheet" type="text/css" media="all" href="http://css.localhost/common/css/new/forms.css" />
    <link rel="stylesheet" type="text/css" media="all" href="http://css.localhost/common/css/new/print.css" />
    <link rel="stylesheet" type="text/css" media="all" href="http://css.localhost/common/css/new/jquery.autoSuggest.css" />

    <link rel="stylesheet" type="text/css" href="http://css.localhost/common/css/mos-ru/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="http://css.localhost/common/css/mos-ru/style.css">

    <link rel="stylesheet" type="text/css" href="http://css.localhost/common/css/mos-ru/chosen.min.css">
    <link rel="stylesheet" type="text/css" href="http://css.localhost/common/css/mos-ru/style_controls.css">

    <script type="text/javascript">

        function init_timer_head(timestamp, show_sec, period, callback) {
            if (period == undefined || (period < 60000 && !show_sec))
                period = 60000;
            if (typeof timer_head != 'undefined')
                clearInterval(timer_head['timer']);
            timer_head = {
                'time': timestamp,
                'period': period,
                'show_sec': show_sec,
                'func': function () {
                    if (timer_head['time'] <= 0) {
                        clearInterval(timer_head['timer']);
                        $('.timer_head .timer_value').html('Время вышло');
                        $('.timer_head').hide();
                        if (callback != undefined && callback)
                            eval(callback());
                    } else {
                        $('.timer_head .timer_value').html(countdown_timestamp_to_str(timer_head['time'], timer_head['show_sec']));
                        $('.timer_head').show();
                    }
                    timer_head['time'] = timer_head['time'] - timer_head['period'];
                }
            };
            timer_head['timer'] = setInterval(function () {
                timer_head.func();
            }, period);
            timer_head.func();
        }

    </script>



</head>
<body class="mainpage" >
<div class="shadow"></div>

<div class="popup_messagebox_shadow" style="display: none;"></div>
<div class="b-content main-page">


    <?php require_once(resource_path() . '/include/button_logout.php'); ?>

<!--    <span id="block.20159.CONTENT_TEXT.52.18123"></span>--><?php //echo $area_urgent_bar_52->get_body(); ?>


    <div id="body">
        <div class="row">
            <?php if (!$isAuthorized && cfg('pgu/button', false)) { ?>
                <span id="block.6162.CONTENT_TEXT.59.4126"></span><?php echo $area_not_auth_area_59->get_body(); ?>
            <?php } elseif (cfg('pgu/menu', false)) { ?>
                <div class="white full border-bottom shadow-bottom">
                    <span id="block.6160.CONTENT_TEXT.54.4124"></span><?php echo $area_auth_header_menu_54->get_body(); ?>
                </div>
            <?php } ?>

            <?php echo $content . 'выфвыфвыфывфлджыфвог' ?>

        </div>
    </div>

</div>
<?php
require_once(resource_path() . '/include/params.php');
require_once(resource_path() . '/script/mos_ru_head.php');
include_once(resource_path() . 'lib/template/banner.php');
include_once(resource_path() . '/std_blocks/messagebox.tpl');
require_once(resource_path() . 'lib/template/chat.php');
require_once(resource_path() . 'lib/template/mosTizer.php');
include_once(resource_path() . 'lib/template/templateTagManager.php');
include_once(resource_path() . 'lib/template/templateYandexMetric.php');
?>

</body>
</html>