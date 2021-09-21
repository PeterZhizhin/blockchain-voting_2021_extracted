<?php

$extStorage = cfg("services/ext_storage");
unset($extStorage['login']);
unset($extStorage['password']);

$esep = cfg('services/esep');
unset($esep['login']);
unset($esep['password']);
unset($esep['wsdl']);

?>

<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/ui/jquery-ui.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.nicescroll.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/ui/i18n/jquery.ui.datepicker-ru.js"></script>

<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.selectbox.min.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/chosen.jquery.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.bind-first-0.2.3.min.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.validate.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.meio.mask.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.tooltip_armd.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.json-2.4.min.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.autoSuggest.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/lib.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/stem.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/forms.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mpgu.forms.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/messagebox.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/layout.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/nrm_bg.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jstorage.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/document_type.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/fix_external_links.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/postmessages.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mpgu.lock-blocks.js"></script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/forms/mos-ru/design.js"></script>

<?php if (cfg('services/popup/on',false)) { ?>
    <script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/popup.js"></script>
<?php } ?>

<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/base/personEventCollector.js?date=<?php echo date('Y-m-d\TH'); ?>"></script>

<script type="text/javascript">
    jQuery.browser = {};
    jQuery.browser.mozilla=/mozilla/.test(navigator.userAgent.toLowerCase())&&!/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit=/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera=/opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());


</script>
<script type="text/javascript" src="<?php print $CFG_JS_HOST;?>/common/js_v3/jquery/jquery.history.js"></script>