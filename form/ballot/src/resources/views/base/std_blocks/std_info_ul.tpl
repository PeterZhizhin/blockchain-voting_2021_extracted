{assign var=title value=$title|default:'Сведения о заявителе'}
{assign var=id value=$id|default:'info_ul'} 
{assign var=contact value=$contact|default:'account'}
 
{assign var=autocomplete value=$autocomplete|default:'true'}

<fieldset class="form-block info_ul_block">
	<legend>{$title}</legend>

	{include file="$base_template_path/std_blocks/std_textarea.tpl" label="Полное наименование юридического лица" name="field[{$contact}.new_full_name]" id="{$id}_fullname" required="required" maxlength="250" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:FULL_NAME":""}}

	{if $show_short_name}
		{include file="$base_template_path/std_blocks/std_textarea.tpl" label="Краткое наименование юридического лица" name="field[{$contact}.name]" id="{$id}_name" required="required" maxlength="250" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:SHORT_NAME":""}}
	{else}
		<input type="hidden" id="{$id}_name" name="field[{$contact}.name]" />
	{/if}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="ИНН" name="field[{$contact}.new_inn]" id="{$id}_inn" required="required" minlength="10" maxlength="10" mask="9999999999" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:INN":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="ОГРН" name="field[{$contact}.new_ogrn]" id="{$id}_ogrn" required="required" minlength="13" maxlength="13" mask="9999999999999" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:OGRN":""}}

	{if $show_kpp}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="КПП" name="field[{$contact}.new_kpp]" id="{$id}_kpp" required="required" minlength="9" maxlength="9"  validator="kpp" mask="9999bb999" hint="123456789" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:KPP":""}}
	{/if}

	{if !$no_phone}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Контактный телефон" name="field[{$contact}.telephone1]" id="{$id}_phone" required="required" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num" hint="(495) 757-77-77" autocomplete_from={($autocomplete)?"LEGAL_INFO:PHONE":""}}

		{if $show_add_tel}
			{include file="$base_template_path/std_blocks/std_text.tpl" label="Дополнительный контактный телефон" name="field[internal.tel_ul.1]" id="{$id}_ul_phone1" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num"}
		{/if}

	{/if}

	{if $show_address}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Почтовый индекс и адрес" name="field[{$contact}.address2_line1]" id="{$id}_address" required="required" maxlength="250" autocomplete_from={($autocomplete)?"LEGAL_INFO:ADDRESS":""}}
	{/if}

	{if !$no_email}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес электронной почты" name="field[{$contact}.emailaddress1]" id="{$id}_email" required="required" maxlength="100" validator="email" placeholder="login@mail.ru" hint="login@mail.ru" autocomplete_from={($autocomplete)?"LEGAL_INFO:EMAIL":""}}
	{/if}
        {if $agent}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Агентский договор/Доверенность" name="field[{$contact}.contract]" id="{$id}_contract" required="required" maxlength="100"}
	{/if}

</fieldset>

<script type="text/javascript">
if(typeof(fields_inspector)!="undefined"){
	var info_ul_default = {
		'{$contact}.new_full_name' : { elk_block:'LEGAL_REG_INFO', elk_key:'FULL_NAME', required:{if $show_short_name}false{else}true{/if}, readonly:false, autocomplete:true},
		'{$contact}.name' : { elk_block:'LEGAL_REG_INFO', elk_key:'SHORT_NAME', required:true, readonly:true, autocomplete:true},
		
		'{$contact}.new_inn' : { elk_block:'LEGAL_REG_INFO', elk_key:'INN', required:true, readonly:true, autocomplete:true},
		'{$contact}.new_ogrn' : { elk_block:'LEGAL_REG_INFO', elk_key:'OGRN', required:true, readonly:true, autocomplete:true},
		{if $show_kpp}
		'{$contact}.new_kpp' : { elk_block:'LEGAL_REG_INFO', elk_key:'KPP', required:true, readonly:true, autocomplete:true},
		{/if}
		{if !$no_phone}
		'{$contact}.telephone1' : { elk_block:'LEGAL_INFO', elk_key:'PHONE', required:true, readonly:false, autocomplete:true},
		{/if}
		{if $show_address}
		'{$contact}.address2_line1' : { elk_block: 'LEGAL_INFO', elk_key:'ADDRESS', required:true, readonly:false, autocomplete:true},
		{/if}
		{if !$no_email}
		'{$contact}.emailaddress1' : { elk_block:'LEGAL_INFO', elk_key:'EMAIL', required:true, readonly:false, autocomplete:true}
		{/if}
	};
	fields_inspector.add_fields_default(info_ul_default);
}
{if !$show_short_name}
$(document).ready(function() {
	var $fullname=$("#{$id}_fullname");
	$fullname.on('change keyup paste', function() {
		$("#{$id}_name").val($(this).val());
	});
	if($fullname.val()!=""){
		$fullname.trigger("change");
	}
});
{/if}
</script>