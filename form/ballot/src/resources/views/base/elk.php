<?php
$datetime = microtime(true);
if (cfg('use_elk')) {

    if (!empty($_GET['org_id'])&&!empty($_GET['form_id'])) {
        $suffix = Form::createLegalKeySuffix((string)$_GET['org_id'], (string)$_GET['form_id']);
    }
    else {
        $suffix = '';
    }
    $url = !empty(User::getLegalId($suffix))?(lib::getLegallkUrl()):(lib::getElkUrl().'/static');
    ?>
    <script type="text/javascript" src="<?php print $url; ?>/js/easyXDM-2.4.17.1.min.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
    <script type="text/javascript" src="<?php print $url; ?>/js/elk-api-0.3.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
    <script type="text/javascript" src="<?php print $url; ?>/js/elk-api-metadata-0.3.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
    <script type="text/javascript" src="<?php print lib::getJsUrl(); ?>/common/js_v3/forms/mpgu.elk-fill.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>

    <?php
    if (cfg('elk_token_request_data')) { ?>
    <script type="text/javascript">
    //{literal}
    $(document).ready(function() {
        ELK.requestToken(<?php echo cfg('elk_token_request_data'); ?>)
    });
    //{/literal}
    </script>


    <?php
    }




}