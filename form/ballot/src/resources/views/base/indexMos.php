    <!DOCTYPE html>
    <html>
    <head>
    <?php // Выводит в коде название узла (веб-сервера)
    require_once(resource_path() . '/include/params.php');
    require_once(resource_path() . '/include/lib.php');

    $title          = 'Госуслуги Москвы';
    $keywords       = '';
    $description    = '';
    $isAuthorized   = true;        //client_access::check_autorization();
    $CFG_MAIN_HOST  = 'localhost'; //lib::getMainUrl();
    $CFG_JS_HOST    = '';          //lib::getJsUrl();
    $CFG_CSS_HOST   = '';          //lib::getCssUrl();
    $CFG_MEDIA_HOST = '';          //lib::getMediaUrl();
    ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="google-site-verification" content="kA2jKykta5QrNay9jkrMx9WgPPQNGCi3txcPDBSm7Ws" />

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php if (!empty($ceo_title)){ echo $ceo_title; } else { echo $title; } ?></title>
    <meta name="keywords" content="<?php if (!empty($ceo_keys)){ echo $ceo_keys; } else { echo $keywords; } ?>"/>
    <meta name="description" content="<?php if (!empty($ceo_desc)){ echo $ceo_desc; } else { echo $description; } ?>"/>

	<link rel="icon" type="image/x-icon" href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/favicon.ico"/>
	<link rel="shortcut icon" type="image/x-icon" href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/favicon.ico"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon76x76.png" rel="apple-touch-icon" sizes="76x76"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon96x96.png" rel="apple-touch-icon" sizes="96x96"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon120x120.png" rel="apple-touch-icon" sizes="120x120"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon152x152.png" rel="apple-touch-icon" sizes="152x152"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon180x180.png" rel="apple-touch-icon" sizes="180x180"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon192x192.png" rel="icon" sizes="192x192"/>
	<link href="<?php print $CFG_MEDIA_HOST;?>/common/img/favicon/icon128x128.png" rel="icon" sizes="128x128"/>
    <link rel="stylesheet" type="text/css" media="all" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" media="all" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/print.css" />
	<link rel="stylesheet" type="text/css" media="all" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/jquery.autoSuggest.css" />

    <link rel="stylesheet" type="text/css" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/style.css">

    <link rel="stylesheet" type="text/css" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/remove_button.less">
    <link rel="stylesheet" type="text/css" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/selectize.bootstrap3.less">

    <link rel="stylesheet" type="text/css" href="<?php print $CFG_CSS_HOST;?>/common/css/mos2_0/style_controls.css">

    <?php

    $extStorage = cfg("services/ext_storage");
    unset($extStorage['login']);
    unset($extStorage['password']);

    $esep = cfg('services/esep');
    unset($esep['login']);
    unset($esep['password']);
    unset($esep['wsdl']);

    ?>
    <script type="text/javascript">
    //{literal}
    var globalLegalCookieKey = '<?php echo ((isset($_SERVER['HTTP_IV_CERTSERIAL']) && $_SERVER['HTTP_IV_CERTSERIAL'] != 'NOT_FOUND')) ? md5($_SERVER['HTTP_IV_CERTSERIAL']) : -1 ?>';
    var cfgMainHost  = '<?php print $CFG_MAIN_HOST; ?>';
    var cfgJsHost    = '<?php print $CFG_JS_HOST; ?>';
    var cfgCssHost   = '<?php print $CFG_CSS_HOST; ?>';
    var cfgMediaHost = '<?php print $CFG_MEDIA_HOST; ?>';
    var MPGU = {
        controller:   {},
        isAuthorized: <?php print '(User::get_current_client())' ? 'true' : 'false'; ?>,
        dev:          <?php print (lib::isDev()) ? 'true' : 'false'; ?>,
        extStorage:   <?php print utf8_json_encode($extStorage); ?>,
        esep:         <?php print utf8_json_encode($esep); ?>,
        elk_host:     '<?php print 'lib::getElkUrl()'; ?>',
        services:     {'rnip': {'version': 'v1.15'}}, //print PoolConfig::me()->conf('rnip')->get('version', 'v1.15');
        elk_config:   <?php print utf8_json_encode(cfg('services/elk',array())) ?>,
        ispk:         '', //$ispk = PoolConfig::me()->conf('ispk')->getAll(); unset($ispk["connstring"]); print utf8_json_encode($ispk);
        personEventCollector: <?php print utf8_json_encode(cfg("services/person_event_collector")); ?>
    };
    var waitJqueryLoadApieatlasCallback = [];
    var EGIP = {
        ready: function() { return false; }
    };
    //{/literal}
    </script>

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/ui/jquery-ui.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.nicescroll.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/ui/i18n/jquery.ui.datepicker-ru.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.history.js"></script>
<!--    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.selectbox.min.js"></script>-->
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/chosen.jquery.js"></script><!--Не забыть выпилить-->
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/selectize.min.js"></script>

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.bind-first-0.2.3.min.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.validate.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.meio.mask.js"></script>

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.json-2.4.min.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.autoSuggest.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/lib.js"></script>

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/forms.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mpgu.forms.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/messagebox.js"></script>
<!--    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/layout.js"></script>-->

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/document_type.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/fix_external_links.js"></script>

    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mpgu.lock-blocks.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mos-ru/design.js"></script>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/personEventCollector.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
    <?php if (cfg('services/popup/on',false)) { ?>
        <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/popup.js"></script>
    <?php }

    require_once(resource_path() . '/include/elk.php');
    require_once(resource_path() . '/include/jinba.php');
    require_once(resource_path() . '/include/mos_ru_stat.php');

    ?>

    <script type="text/javascript">
        function init_timer_head(timestamp,show_sec,period,callback) {
            if (period==undefined||(period<60000&&!show_sec)) period=60000;
            if (typeof timer_head != 'undefined' )
                clearInterval(timer_head['timer']);
            timer_head = {
                'time':timestamp,
                'period':period,
                'show_sec':show_sec,
                'func':function(){
                    if (timer_head['time']<=0) {clearInterval(timer_head['timer']); $('.timer_head .timer_value').html('Время вышло'); $('.timer_head').hide(); if (callback!=undefined&&callback) eval(callback());}
                    else {$('.timer_head .timer_value').html(countdown_timestamp_to_str(timer_head['time'],timer_head['show_sec'])); $('.timer_head').show();}
                    timer_head['time'] = timer_head['time']-timer_head['period'];
                }
            };
            timer_head['timer'] = setInterval(function(){timer_head.func();},period);
            timer_head.func();
        }
    </script>


</head>
<body class="mainpage" >

    <div class="shadow"></div>

    <div class="popup_messagebox_shadow" style="display: none;"></div>
    <div class="b-content main-page">
        <div id="body">
            <div class="row">
                <?php if (!$isAuthorized&&cfg('pgu/button',false)) { ?>
                    {$areas.not_auth_area}
                <?php } elseif (cfg('pgu/menu',false)) { ?>
                <div class="white full border-bottom shadow-bottom">
                    {$areas.auth_header_menu}
                </div>
                <?php } ?>

                <?php echo $content ?>

            </div>
        </div>

    </div>
    <?php

    require_once(resource_path()     . '/script/mos_ru_head.php');
    require_once(resource_path()     . '/script/banner.php');
    require_once($base_template_path . '/std_blocks/messagebox.tpl');
    require_once(resource_path()     . '/script/mosTizer.php');
    require_once( resource_path()    . '/script/templateTagManager.php');
    require_once( resource_path()    . '/script/templateYandexMetric.php');

    ?>

</body>
</html>
