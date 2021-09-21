{* // TODO: переделать ФИО и еще чтото как надо С.Зенкову. см. скайп за 20 августа 2013  *}
{if !$title}                {assign var=title value="Сведения о заявителе"} {/if}
{if !$id}                   {assign var=id value="info_ip"} {/if}
{if !$contact_account}      {assign var=contact_account value="account"} {/if}
{if !$contact_head}         {assign var=contact_head value="head"} {/if}

{* для автозаполнения на форме должны быть заполнены и переданы в смарти переменные:
   $this->smarty->assign('LEGAL', User::getLegalRecord());
   и $client (уже заполнена в конструкторе Form).

   id - должен быть корректным именем для id элемента и имени переменной js!
   еще переменные шаблона (флаги):
   hidden - скрыть fieldset,
   not_req_name, not_req_inn, not_req_ogrn, not_req_phone, not_req_email,
   readonly_name, readonly_inn, readonly_ogrn, readonly_phone, readonly_email

   contact_account, contact_account - чтобы переопределить, потому что есть данные из $client и $LEGAL, которые должны ложиться в разные переменные
   обычное использование на стройках:
   include file="$base_template_path/std_blocks/grdstroy_info_ip.tpl" not_req_phone="1" readonly_lastname="1" readonly_firstname="1" readonly_middlename="1" readonly_inn="1" readonly_ogrn="1"
*}
<fieldset id="{$id}"{if $hidden} style="display:none;"{/if}>
  <legend>{$title}</legend>
  <input type="hidden" name="field[{$contact_account}.name]" value="ИП {$client.SURNAME|htmlspecialchars} {$client.NAME|htmlspecialchars} {$client.PATRONYMIC|htmlspecialchars}">
  <input type="hidden" name="field[{$contact_account}.new_okopf]" value="91">
  <table class="free_column">
	<tr>
	  <td class="padding_bottom">Фамилия:{if !$not_req_lastname}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_lastname"  name="field[{$contact_head}.lastname]" value="{$client.SURNAME|htmlspecialchars}" maxlength="250"{if !$not_req_lastname} required="required"{/if} readonly="readonly">
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Имя:{if !$not_req_firstname}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_firstname" name="field[{$contact_head}.firstname]" value="{$client.NAME|htmlspecialchars}" maxlength="250"{if !$not_req_firstname} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Отчество:{if !$not_req_middlename}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_middlename" name="field[{$contact_head}.middlename]" value="{$client.PATRONYMIC|htmlspecialchars}" maxlength="250"{if !$not_req_middlename} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">ИНН:{if !$not_req_inn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_inn" name="field[{$contact_account}.new_inn]" value="{$LEGAL.INN}" maxlength="12"{if !$not_req_inn} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">ОГРНИП:{if !$not_req_ogrn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_ogrn" name="field[{$contact_account}.new_ogrn]" value="{$LEGAL.OGRN}" maxlength="15"{if !$not_req_ogrn} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Контактный телефон:{if !$not_req_phone}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_phone" name="field[{$contact_head}.mobilephone]" value="{$client.TELEPHONE}" minlength="14" maxlength="250"{if !$not_req_phone} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Адрес электронной почты:{if !$not_req_email}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="email" id="{$id}_email" name="field[{$contact_head}.emailaddress1]" value="{$client.EMAIL}" maxlength="250"{if !$not_req_email} required="required"{/if}>
	  </td>
	  <td></td>
	</tr>
  </table>
<script type="text/javascript">
$('#{$id}_inn').setMask({ 'mask': "999999999999" });
$('#{$id}_ogrn').setMask({ 'mask': "999999999999999" });
$('#{$id}_phone').setMask({ 'mask': "(999)999-99-99" });
values.push(new Array('{$contact_head}.lastname', 'Иванов'));
values.push(new Array('{$contact_head}.firstname', 'Иван'));
values.push(new Array('{$contact_head}.middlename', 'Иванович'));
values.push(new Array('{$contact_head}.mobilephone', '(495)757-77-77'));
values.push(new Array('{$contact_head}.email', 'mail@mail.ru'));
applyHints();
var readonly_data_ip_{$id} = {
	lastname:   {if $readonly_lastname}     true{else}false{/if},
	firstname:  {if $readonly_firstname}    true{else}false{/if},
	middlename: {if $readonly_middlename}   true{else}false{/if},
	inn:        {if $readonly_inn}          true{else}false{/if},
	ogrn:       {if $readonly_ogrn}         true{else}false{/if},
	phone:      {if $readonly_phone}        true{else}false{/if},
	email:      {if $readonly_email}        true{else}false{/if},
};
// readonly только если уже есть значение
$(document).ready(function() {
	for (id in readonly_data_ip_{$id}) {
			if ($('#{$id}_' + id).length && readonly_data_ip_{$id}[id] && $('#{$id}_' + id).val()) {
				$('#{$id}_' + id).attr('readonly', 'readonly');
		}
	}
});
</script>
</fieldset>