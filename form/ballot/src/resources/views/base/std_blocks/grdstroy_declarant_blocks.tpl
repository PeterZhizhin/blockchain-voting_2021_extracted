{* ФЛ *}
{if $LEGAL == false}
		{include file="$base_template_path/std_blocks/declarant_personal_information.tpl" title="Сведения о заявителе" skip_gender=1 id=''}
		{include file="$base_template_path/std_blocks/declarant_passport.tpl" title='Паспорт гражданина РФ' contact='declarant' showSavedDocs='1' savedDocsReadonly='1' no_birthday='1' no_photo='1' id=''}
		<script type="text/javascript">
		$(document).ready(function() {
			if ($('input[name="field[declarant.emailaddress1]"]').length) {
				$('input[name="field[declarant.emailaddress1]"]').attr('maxlength','250').rules('add', { maxlength: 250 } );
				}
		});
		</script>
	{* ИП *}
{elseif $IS_IP}
	{include file="$base_template_path/std_blocks/grdstroy_info_ip.tpl" not_req_phone="1" readonly_lastname="1" readonly_firstname="1" readonly_middlename="1" readonly_inn="1" readonly_ogrn="1" id=""}
	{if $user_block}
		{include file="$base_template_path/std_blocks/grdstroy_contact.tpl" id=""}
	{/if}
	{* ЮЛ *}
{else}
	{if $counter_js && $before_inc}
		{include file="$base_template_path/std_blocks/grdstroy_info_ul.tpl" not_req_phone="1" readonly_name="1" readonly_inn="1" readonly_ogrn="1" id="" before_inc="{$before_inc}" counter_js="{$counter_js}" files_index="{$files_index}"}
	{else}
		{include file="$base_template_path/std_blocks/grdstroy_info_ul.tpl" not_req_phone="1" readonly_name="1" readonly_inn="1" readonly_ogrn="1" id=""}
	{/if}
	{if $user_proxy}
		{include file="$base_template_path/std_blocks/grdstroy_doveren_ul.tpl" id=""}
	{/if}
	{if $user_block}
		{include file="$base_template_path/std_blocks/grdstroy_contact.tpl" id=""}
	{/if}
{/if}