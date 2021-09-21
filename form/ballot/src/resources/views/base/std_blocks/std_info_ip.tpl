{assign var=title value=$title|default:'Сведения о заявителе'}
{assign var=id value=$id|default:'info_ip'}
{assign var=contact_account value=$contact_account|default:'account'}
{assign var=contact_head value=$contact_head|default:'head'}

{assign var=autocomplete value=$autocomplete|default:'true'}

<fieldset class="form-block info_ip_block">
	<legend>{$title}</legend>

	<input type="hidden" id="{$id}_name" name="field[{$contact_account}.name]">

	<input type="hidden" name="field[{$contact_account}.new_okopf]" value="91">

	{include file="$base_template_path/std_blocks/std_text.tpl" class="{$id}_fio_ip" label="Фамилия" validator="fio" required="required" name="field[{$contact_head}.lastname]" id="{$id}_lastname" maxlength="50" autocomplete_from={($autocomplete)?"FIO:SURNAME":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" class="{$id}_fio_ip" label="Имя" validator="fio" required="required" name="field[{$contact_head}.firstname]" id="{$id}_firstname" maxlength="50" autocomplete_from={($autocomplete)?"FIO:NAME":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" class="{$id}_fio_ip" label="Отчество" validator="fio" required="required" name="field[{$contact_head}.middlename]" id="{$id}_middlename" maxlength="50" autocomplete_from={($autocomplete)?"FIO:PATRONYMIC":""}}


	{include file="$base_template_path/std_blocks/std_text.tpl" label="ИНН" name="field[{$contact_account}.new_inn]" id="{$id}_inn" required="required" minlength="12" maxlength="12" mask="999999999999" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:INN":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="ОГРНИП" name="field[{$contact_account}.new_ogrn]" id="{$id}_ogrn" required="required" minlength="15" maxlength="15" mask="999999999999999" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:OGRN":""}}

	{if !$no_phone}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Контактный телефон" name="field[{$contact_head}.telephone1]" id="{$id}_phone" required="required" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num" hint="(495) 757-77-77" autocomplete_from={($autocomplete)?"PERSON:PHONE":""}}
	{/if}

	{if !$no_email}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес электронной почты" name="field[{$contact_head}.emailaddress1]" id="{$id}_email" required="required" maxlength="100" validator="email" placeholder="login@mail.ru" hint="login@mail.ru" autocomplete_from={($autocomplete)?"REG_DATA:EMAIL":""}}
	{/if}
        {if $agent}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Агентский договор/Доверенность" name="field[{$contact}.contract]" id="{$id}_contract" required="required" maxlength="100"}
	{/if}
</fieldset>

<script type="text/javascript">
{literal}	
if(typeof(fields_inspector)!="undefined"){
	var info_ip_default = {
		'{$contact_head}.lastname' : { elk_block:'FIO', elk_key:'SURNAME', required:true, readonly:true, autocomplete:true},
		'{$contact_head}.firstname' : { elk_block:'FIO', elk_key:'NAME', required:true, readonly:true, autocomplete:true},
		'{$contact_head}.middlename' : { elk_block:'FIO', elk_key:'PATRONYMIC', required:true, readonly:true, autocomplete:true},
		'{$contact_account}.new_inn' : { elk_block:'LEGAL_REG_INFO', elk_key:'INN', required:true, readonly:true, autocomplete:true},
		'{$contact_account}.new_ogrn' : { elk_block:'LEGAL_REG_INFO', elk_key:'OGRN', required:true, readonly:true, autocomplete:true},
		'{$contact_head}.telephone1' : { elk_block:'PERSON', elk_key:'PHONE', required:true, readonly:false, autocomplete:true},
		'{$contact_head}.emailaddress1' : { elk_block:'REG_DATA', elk_key:'EMAIL', required:true, readonly:false, autocomplete:true}
	};
	fields_inspector.add_fields_default(info_ip_default);
}
$(document).ready(function() {
	var $fio_ip=$(".{/literal}{$id}{literal}_fio_ip");
	$fio_ip.on('change keyup paste', function() {
		$("#{/literal}{$id}{literal}_name").val("ИП "+$("#{/literal}{$id}{literal}_lastname").val()+" "+$("#{/literal}{$id}{literal}_firstname").val()+" "+ $("#{/literal}{$id}{literal}_middlename").val());
	});
	$fio_ip.each(function(){
		if($(this).val()!=""){
			$fio_ip.trigger("change");
			return;
		}
	});
});
{/literal}
</script>
