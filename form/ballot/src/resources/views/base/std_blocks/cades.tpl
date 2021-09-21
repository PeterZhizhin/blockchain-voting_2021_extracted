{if $cades_sign}
<fieldset class="form-step">
		<legend>Параметры электронной подписи</legend>
		<fieldset class="form-block no-legend">
			{include file="$base_template_path/std_blocks/std_select.tpl" label="Выбор сертификата" id="cadesCertList"}
		</fieldset>
		<fieldset class="form-block" id="signDataBlock" style="display:none">
			<legend>Данные для подписания {include file="$base_template_path/std_blocks/std_slider.tpl" style="display:inline-block;margin-left:80px;" titleA="показать в текстовом виде" titleB="показать в XML" name="signDataTypeSlider" valueA="html" valueB="xml" onchange="javascript:changeSignDataDisplay($(this).val());"}</legend>
			
			<div id="signContainer"></div>
			<div id="cadesFormContainer"></div>
			<div id="cades_html"></div>
			<div id="cades_xml" style="display:none"></div>
		</fieldset>
</fieldset>
{/if}
{if $cades_sign}
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/base/cades.js"></script>
<div id="signContainer"></div>
<object id="cadesplugin" type="application/x-cades" class="hiddenObject" style="width: 1px; height: 1px; position: absolute; top: -100px; left: -100px;"></object>
{*<div id="cadesDataInfo" style="display:none;"  class='modalWindow'><div class="contur">
	<div class="content">
		<div class="tabs-header">
			<div style="clear:both;"></div>
		</div>
		<div id="cadesData"></div>
	</div></div>
</div>*}
<div style="display:none;" id="cadesFrameContainer">
	<iframe style="display:none;" id="cadesFileLoader" src="about:blank" name="cadesFileLoader" onLoad=""></iframe>
</div>
<script type="text/javascript">
$(document).ready(function() {
var cadesFiles = {};
var cadesAddedDocs = {};
var cadesBlockToDocs = {};	
if (OPR.Cades.checkPlugIn()) {
	//$('#cadesButtonNext').attr("disabled",true);
	//$('.cadesSigns').show();
	cadesFiles = { };
	cadesEnabled = true;
	OPR.Cades.init( { "cadesFiles" : cadesFiles } );
	var certs = OPR.Cades.getCertList();
	for(var i = 0; i < certs.length; i++) {
		$('#cadesCertList').append('<option value="'+certs[i].value+'">'+certs[i].name+'</option>');
	}
} else {
		/*$('#cades_info').show();
		$('.cadesInfos').show();*/
}
});


function changeSignDataDisplay(v) {
	if(v == 'html') {
		$('#cades_html').show();
		$('#cades_xml').hide();
	} else {
		$('#cades_html').hide();
		$('#cades_xml').show();
	}
}
</script>
{/if}

