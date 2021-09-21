<?php
$enabled = cfg('jinba/enabled');
$host    = cfg('jinba/host');

if ($host) {
    $urls = cfg('jinba/urls');
    if (!empty($urls)) {
        foreach ($urls as $url => $value) {
            if (strpos($_SERVER['REQUEST_URI'], $url) !== false) {
                $enabled = $value;
            }
        }
    }

}

if ($enabled) {
    ?>
    <script type="text/javascript" src="<?php print lib::getJsUrl(); ?>/common/js_v3/base/Jinba.Client.min.js"></script>
    <script type="text/javascript">
    //{literal}
    Jinba.config({
        url: '<?php print $host;?>',
        batchTimeout: <?php print cfg('jinba/time', 1000);?>
    });

    var TAG_WEBSITE = [
        {"name": "MPGU", "value": "<?php print params::$mainHost;?>"}
    ];
    var jinbaRequest = new Jinba.Request(location.pathname, TAG_WEBSITE);
    Jinba.MeasureNetworkTiming(jinbaRequest);
    Jinba.AddUserTimings(jinbaRequest);
    jinbaRequest.startMeasurement('app-init-id', 'app_init');

    window.addEventListener('DOMContentLoaded', function() {
        jinbaRequest.stopMeasurement('app-init-id');
        jinbaRequest.end();
    });
    //{/literal}
    </script>
    <?php
}