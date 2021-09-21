{assign var=title value=$title|default:'Контактное лицо'}
{assign var=id value=$id|default:'user_block'}
{assign var=contact value=$contact|default:'declarant'}

{if !$autocomplete}{$autocomplete = false}{/if}

<fieldset class="form-block" id="{$id}">
	<legend>{$title}</legend>

	{include file="$base_template_path/std_blocks/std_text.tpl" label="Фамилия" required=true name="field[{$contact}.lastname]" validator="fio" id="{$id}_lastname" maxlength="50" autocomplete_from={($autocomplete)?"FIO:SURNAME":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="Имя" required=true name="field[{$contact}.firstname]" validator="fio" id="{$id}_firstname" maxlength="50" autocomplete_from={($autocomplete)?"FIO:NAME":""}}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="Отчество" required=true name="field[{$contact}.middlename]" validator="fio" id="{$id}_middlename" maxlength="50" autocomplete_from={($autocomplete)?"FIO:PATRONYMIC":""}}

	{if $show_jobtitle}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Должность" id="{$id}_jobtitle" required=true name="field[{$contact}.jobtitle]" maxlength="250" hint="Начальник отдела экплуатации и ремонта" autocomplete_from={($autocomplete)?"LEGAL_REG_INFO:HEAD_POSITION":""}}
	{/if}

	{if $show_residence_address}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес проживания" name="field[{$contact}.address1_line1]" id="{$id}_address1" required="required" maxlength="250"}
	{/if}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="{if $tel_name}{$tel_name}{else}Контактный телефон{/if}" validator="phone_num" id="{$id}_telephone1" minlength="15" required=true name="field[{$contact}.telephone1]" mask="(999) 999-99-99" placeholder="Введите номер телефона" hint="(495) 757-77-77" autocomplete_from={($autocomplete)?"PERSON:PHONE":""}}

	{if $show_add_tel}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Дополнительный контактный телефон" name="field[internal.tel_cont.1]" id="{$id}_contact_phone1" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num"}
	{/if}

	{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес электронной почты" required=true name="field[{$contact}.emailaddress1]" validator="email" id="{$id}_emailaddress" maxlength="100"  placeholder="login@mail.ru" hint="login@mail.ru" autocomplete_from={($autocomplete)?"REG_DATA:EMAIL":""}}
</fieldset>

<script type="text/javascript">
if(typeof(fields_inspector)!="undefined"){
	var info_fl_default = {
		'{$contact}.lastname' : { elk_block:'FIO', elk_key:'SURNAME', required:true, readonly:{if $LEGAL}false{else}true{/if}, autocomplete:{if !$autocomplete}false{else}true{/if}},
		'{$contact}.firstname' : { elk_block:'FIO', elk_key:'NAME', required:true, readonly:{if $LEGAL}false{else}true{/if}, autocomplete:{if !$autocomplete}false{else}true{/if}},
		'{$contact}.middlename' : { elk_block:'FIO', elk_key:'PATRONYMIC', required:false, readonly:{if $LEGAL}false{else}true{/if}, autocomplete:{if !$autocomplete}false{else}true{/if}},

		{if $show_jobtitle}
		'{$contact}.jobtitle' : { elk_block:'LEGAL_REG_INFO', elk_key:'HEAD_POSITION', required:false, readonly:true, autocomplete:{if !$autocomplete}false{else}true{/if}},
		{/if}

		'{$contact}.telephone1' : { elk_block:'PERSON', elk_key:'PHONE', required:true, readonly:false, autocomplete:{if !$autocomplete}false{else}true{/if}{if !$skip_fill}, button_fill:"{$id}_fill_button"{/if}},
		'{$contact}.emailaddress1' : { elk_block:'REG_DATA', elk_key:'EMAIL', required:true, readonly:false, autocomplete:{if !$autocomplete}false{else}true{/if}},
	};
	fields_inspector.add_fields_default(info_fl_default);
}
{if !$skip_fill}
$(document).ready(function() {
	$('#{$id}_fill_button').on('click', function() {
		fields_inspector.fill_button_click($(this).attr("id"));
		return false;
	}){if $autocomplete}.trigger('click'){/if};
});
{/if}
</script>