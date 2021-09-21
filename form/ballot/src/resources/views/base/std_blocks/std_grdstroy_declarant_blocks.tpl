<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/fields_inspector.js"></script>

{* ФЛ *}
{if $LEGAL == false}
	{include file="$base_template_path/std_blocks/std_contact.tpl" title="Сведения о заявителе" autocomplete="1" show_residence_address="$show_contact_residence_address"}

	{include file="$base_template_path/std_blocks/std_declarant_passport.tpl" title='Паспорт гражданина РФ' contact='declarant' no_birthday='1' no_photo='1' autocomplete='1'}

	{* ИП *}
{elseif $IS_IP}
	{include file="$base_template_path/std_blocks/std_info_ip.tpl"}

	{if $user_proxy}
		{include file="$base_template_path/std_blocks/std_doveren_ip_ul.tpl"}
	{/if}
	
	{if $user_block}
		{include file="$base_template_path/std_blocks/std_contact.tpl" autocomplete="1"}
	{/if}
	{* ЮЛ *}
{else}
	{include file="$base_template_path/std_blocks/std_info_ul.tpl" show_short_name="1"}

	{if $user_proxy}
		{include file="$base_template_path/std_blocks/std_doveren_ip_ul.tpl"}
	{/if}

	{if $user_block}
		{include file="$base_template_path/std_blocks/std_contact.tpl" autocomplete="1"}
	{/if}
{/if}