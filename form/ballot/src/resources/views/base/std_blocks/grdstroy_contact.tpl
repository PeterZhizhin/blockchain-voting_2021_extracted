{if !$title}                {assign var=title value="Контактное лицо"} {/if}
{if !$id}                   {assign var=id value="user_block"} {/if}
{if !$contact}              {assign var=contact value="declarant"}{/if}
{* еще флаги:
auto_fill - не выводить кнопку, а сразу заполнить данными,
skip_fill - не выводить кнопку и ничего не заполнять,
hidden - скрыть fieldset,
tel_name - другое название для поля телефона,
not_req_lastname, not_req_firstname, not_req_middlename, not_req_tel, not_req_email - не делать обязательными поля *}
<fieldset id="{$id}"{if $hidden} style="display:none;"{/if}>
<legend>{$title}</legend>
<table class="free_column">
	<tr>
		<td class="padding_bottom padding_right">Фамилия:{if !$not_req_lastname}<span class="required">*</span>{/if}<br>
			<input type="text" id="{$id}_lastname" name="field[{$contact}.lastname]" value="" maxlength="250" {if !$not_req_lastname}required="required" {/if}>
		</td>
		<td class="padding_bottom padding_right">Имя:{if !$not_req_firstname}<span class="required">*</span>{/if}<br>
			<input type="text" id="{$id}_firstname" name="field[{$contact}.firstname]" value="" maxlength="250" {if !$not_req_firstname}required="required" {/if}>
		</td>
		<td class="padding_bottom padding_right">Отчество:{if !$not_req_middlename}<span class="required">*</span>{/if}<br>
			<input type="text" id="{$id}_middlename" name="field[{$contact}.middlename]" value="" maxlength="250" {if !$not_req_middlename}required="required" {/if}>
		</td>
	</tr>
	<tr>
		<td class="padding_bottom padding_right">{if $tel_name}{$tel_name}{else}Контактный телефон{/if}:{if !$not_req_tel}<span class="required">*</span>{/if}<br>
			<input type="text" id="{$id}_telephone1" name="field[{$contact}.telephone1]" value="" minlength="14" maxlength="250" {if !$not_req_tel}required="required" {/if}>
		</td>
		<td class="padding_bottom padding_right">Адрес электронной почты:{if !$not_req_email}<span class="required">*</span>{/if}<br>
			<input type="email" id="{$id}_emailaddress1" name="field[{$contact}.emailaddress1]" value="" maxlength="250" {if !$not_req_email}required="required" {/if}>
		</td>
		<td class="padding_bottom padding_right" style="vertical-Align: bottom;" align="left">
			{if !$skip_fill}
				{if $auto_fill}<div style="display: none;">{/if}
				{mpgu_button class='fill_button' text='Заполнить поля из личного кабинета'}
				{if $auto_fill}</div>{/if}
			{/if}
		</td>
	</tr>
</table>
<script type="text/javascript">
$('#{$id}_telephone1').setMask({ 'mask': "(999)999-99-99" });
//$('#{$id}_emailaddress1').rules('add', { email: true }); // не нужно изза type="email"

values.push(new Array('{$contact}.lastname', 'Иванов'));
values.push(new Array('{$contact}.firstname', 'Иван'));
values.push(new Array('{$contact}.middlename', 'Иванович'));
values.push(new Array('{$contact}.telephone1', '(495)757-77-77'));
values.push(new Array('{$contact}.emailaddress1', 'mail@mail.ru'));
applyHints();

{if !$skip_fill}
	var cabinet_data = {
		firstname: "{$client.NAME}",
		lastname: "{$client.SURNAME}",
		middlename: "{$client.PATRONYMIC}",
		telephone: "{$client.TELEPHONE}",
		email: "{$client.EMAIL}"
	};

	$(document).ready(function() {
		$('#{$id} .fill_button').on('click', function() {
			$('#{$id}_lastname').val(cabinet_data.lastname).trigger('blur');
			$('#{$id}_firstname').val(cabinet_data.firstname).trigger('blur');
			$('#{$id}_middlename').val(cabinet_data.middlename).trigger('blur');
			$('#{$id}_telephone1').val(cabinet_data.telephone).trigger('blur').trigger('input').trigger('paste').valid();
			$('#{$id}_emailaddress1').val(cabinet_data.email).trigger('blur');
			return false;
		}){if $auto_fill}.trigger('click'){/if};
	});
{/if}
</script>
</fieldset>
