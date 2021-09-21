{if !$title}                {assign var=title value="Сведения о заявителе"} {/if}
{if !$id}                   {assign var=id value="info_ul"} {/if}
{if !$contact}              {assign var=contact value="account"} {/if}

{* для автозаполнения на форме должны быть заполнены и переданы в смарти переменные:
   $this->smarty->assign('LEGAL', User::getLegalRecord());
   и $client (уже заполнена в конструкторе Form).

   id - должен быть корректным именем для id элемента и имени переменной js!
   еще переменные шаблона (флаги):
   hidden - скрыть fieldset,
   not_req_name, not_req_inn, not_req_ogrn, not_req_phone, not_req_email,
   readonly_name, readonly_inn, readonly_ogrn, readonly_phone, readonly_email

   include file="$base_template_path/std_blocks/grdstroy_info_ul.tpl" not_req_phone="1" readonly_name="1" readonly_inn="1" readonly_ogrn="1"
*}
<fieldset id="{$id}"{if $hidden} style="display:none;"{/if}>
  <legend>{$title}</legend>
  <table class="free_column">
	<tr>
	  <td class="padding_bottom">Полное наименование юридического лица:{if !$not_req_name}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="hidden" id="{$id}_name" name="field[{$contact}.name]" value="" maxlength="250" required="required">
		<textarea id="{$id}_fullname" name="field[{$contact}.new_full_name]" style="width:100%" {if !$not_req_name}required="required" {/if}maxlength="250"></textarea>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">ИНН:{if !$not_req_inn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_inn" name="field[{$contact}.new_inn]" maxlength="10" {if !$not_req_inn}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">ОГРН:{if !$not_req_ogrn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_ogrn" name="field[{$contact}.new_ogrn]" maxlength="13" {if !$not_req_ogrn}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Контактный телефон:{if !$not_req_phone}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_phone" name="field[{$contact}.telephone1]" minlength="14" maxlength="250"  {if !$not_req_phone}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Адрес электронной почты:{if !$not_req_email}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="email" id="{$id}_email" name="field[{$contact}.emailaddress1]" maxlength="250" {if !$not_req_email}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
  </table>
<script type="text/javascript">
$('#{$id}_phone').setMask({ 'mask': "(999)999-99-99" });
values.push(new Array('{$contact}.telephone1', '(495)757-77-77'));
applyHints();


{if !$contact_empty}
	var cabinet_data_ul_{$id} = {
		name:  "{$LEGAL.FULL_NAME|htmlspecialchars}",
		fullname:  "{$LEGAL.FULL_NAME|htmlspecialchars}",
		inn:   "{$LEGAL.INN}",
		ogrn:  "{$LEGAL.OGRN}",
		phone: "{$LEGAL.PHONE}",
		email: "{$LEGAL.EMAIL}"
//		phone: "{$client.TELEPHONE}",
//		email: "{$client.EMAIL}"
	};
	var readonly_data_ul_{$id} = {
		name: false,
		fullname:  {if $readonly_name}  true{else}false{/if},
		inn:   {if $readonly_inn}   true{else}false{/if},
		ogrn:  {if $readonly_ogrn}  true{else}false{/if},
		phone: {if $readonly_phone} true{else}false{/if},
		email: {if $readonly_email} true{else}false{/if},
	};
	$(document).ready(function() {
		for (id in cabinet_data_ul_{$id}) {
			if ($('#{$id}_' + id).length && cabinet_data_ul_{$id}[id]) {
				$('#{$id}_' + id).val(cabinet_data_ul_{$id}[id]).trigger('blur').trigger('input').trigger('paste').valid();
				if (readonly_data_ul_{$id}[id] ) {
					$('#{$id}_' + id).attr('readonly', 'readonly');
				}
			}
		}
	});
{/if}
</script>

</fieldset>
