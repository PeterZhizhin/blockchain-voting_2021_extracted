{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}
{if $savedPassports and $savedPassports.ARRAY}
	{* новый вариант, опирается на данные из User::getClientPersonalData('PASSPORT_RF') *}
	{literal}
		<script type="text/javascript">
			jQuery(document).ready(function() {
				var contact = {/literal}'{$contact}';{literal}

				val = contact == 'declarant' ? '{/literal}{if $savedPassports.ARRAY[0].NUMBER}{$savedPassports.ARRAY[0].NUMBER}{else}47 08 859647{/if}{literal}' : '47 08 859647';
				values.push(new Array(contact + '.new_passport_full', val));
		{/literal}{if $birthday}{literal}
				val = contact == 'declarant' ? '{/literal}{if $savedPassports.ARRAY[0].BIRTHDAY}{$savedPassports.ARRAY[0].BIRTHDAY}{else}11.01.1963{/if}{literal}' : '11.01.1963';
				values.push(new Array(contact + '.birthdate', val, '', '1'));
		{/literal}{/if}{literal}
				applyHints();
				jQuery("*[name='field[internal." + contact + ".new_passport_full]']").rules("add", {required: true});
		{/literal}{if $birthday}{literal}
				jQuery("*[name='field[" + contact + ".birthdate]']").rules("add", {date_in_past: true});
		{/literal}{/if}{literal}
				jQuery("*[name='field[" + contact + ".new_passport_serie]']").mask('9999');
				jQuery("*[name='field[" + contact + ".new_passport]']").mask('999999');
				jQuery("*[name='field[internal." + contact + ".new_passport_full]']").change( function() {
					if (jQuery(this).val().match(/\d\d\s\d\d\s\d{6}/)) {
						var fullNumber = $(this).val().replace(/\s/g, '');
						jQuery("*[name='field[" + contact + ".new_passport_serie]']").val(fullNumber.substring(0,4));
						jQuery("*[name='field[" + contact + ".new_passport]']").val(fullNumber.substring(4));
					}
				}).mask('99 99 999999');
			});
		</script>
	{/literal}
	<fieldset><legend>{$title}</legend>
		<table class="free_column">
			<tr>
				<td class="padding_bottom">Тип документа, удостоверяющего личность:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<select name="field[{$contact}.new_doctype]" class="disabled">
						<option value="1">Паспорт гражданина РФ</option>
					</select>
				</td>
				<td></td>
			</tr>
			{if $savedPassports.ARRAY}
			<tr>
				<td class="padding_bottom">Выберите сохранённые паспортные данные из списка или укажите другие в поля ввода:</td>
				<td class="padding_bottom padding_right">
					<select name="field[internal.{$contact}.passport_autocomplete]" style="width:200px" onchange="
						jQuery('*[name=\'field[internal.{$contact}.new_passport_full]\']').val(this.options[this.selectedIndex].value); 
						jQuery('*[name=\'field[internal.{$contact}.new_passport_full]\']').change();
						jQuery('*[name=\'field[{$contact}.birthdate]\']').val(jQuery(this.options[this.selectedIndex]).attr('rel'));">
						<option value="" selected="selected">-- выберите паспорт --</option>
						{foreach from=$savedPassports.ARRAY item=Passport}
							<option value="{$Passport.NUMBER}" rel="{$Passport.BIRTHDAY}">{$Passport.COMMENT}</option>
						{/foreach}
					</select>
				</td>
				<td></td>
			</tr>
			{/if}			
			<tr>
				<td class="padding_bottom">Серия и номер документа:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<input type="hidden" name="field[{$contact}.new_passport_serie]" id="Serial" maxlength="4" value="">
					<input type="hidden" name="field[{$contact}.new_passport]" id="Serial" maxlength="6" value="">
					<input type="text" name="field[internal.{$contact}.new_passport_full]" id="Number" maxlength="12" value="">
				</td>
				<td></td>
			</tr>
			{if $birthday}
				<tr>
					<td class="padding_bottom">Дата рождения:<span class="required">*</span></td>
					<td class="padding_bottom padding_right">
						<input type="text" value="" name="field[{$contact}.birthdate]" id="{$contact}.birth_date" class="inputCalendarBefore" style="width: 90px;" maxlength="10">
					</td>
					<td></td>
				</tr>
			{/if}
		</table>
	</fieldset>
{else}
	{* старый вариант *}
	{literal}
		<script type="text/javascript">
			jQuery(document).ready(function() {
				var contact = {/literal}'{$contact}';{literal}

				var val = contact == 'declarant' ? '{/literal}{if $client.PASPORT_SERIES}{$client.PASPORT_SERIES}{else}4708{/if}{literal}' : '4708';
				values.push(new Array(contact + '.new_passport_serie', val));
				val = contact == 'declarant' ? '{/literal}{if $client.PASPORT_NOM}{$client.PASPORT_NOM}{else}859647{/if}{literal}' : '859647';
				values.push(new Array(contact + '.new_passport', val));
		{/literal}{if $birthday}{literal}
				val = contact == 'declarant' ? '{/literal}{if $client.BIRTHDAY}{$client.BIRTHDAY}{else}11.01.1963{/if}{literal}' : '11.01.1963';
				values.push(new Array(contact + '.birthdate', val, '', '1'));
		{/literal}{/if}{literal}
				applyHints();
				jQuery("*[name='field[" + contact + ".new_passport_serie]']").rules("add", {required: true});
				jQuery("*[name='field[" + contact + ".new_passport]']").rules("add", {required: true});
		{/literal}{if $birthday}{literal}
				jQuery("*[name='field[" + contact + ".birthdate]']").rules("add", {date_in_past: true});
		{/literal}{/if}{literal}

				jQuery("*[name='field[" + contact + ".new_passport_serie]']").mask('9999');
				jQuery("*[name='field[" + contact + ".new_passport]']").mask('999999');
			});
		</script>
	{/literal}
	<fieldset><legend>{$title}</legend>
		<table class="free_column">
			<tr>
				<td class="padding_bottom">Тип документа, удостоверяющего личность:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<select name="field[{$contact}.new_doctype]" class="disabled">
						<option value="1">Паспорт гражданина РФ</option>
					</select>
				</td>
				<td></td>
			</tr>	

			<tr>
				<td class="padding_bottom">Серия документа:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<input type="text" name="field[{$contact}.new_passport_serie]" id="Serial" maxlength="4" value="{if $contact == 'declarant'}{$client.PASPORT_SERIES}{/if}">
				</td>
				<td></td>
			</tr>

			<tr>
				<td class="padding_bottom">Номер документа:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<input type="text" name="field[{$contact}.new_passport]" id="Number" maxlength="6" value="{if $contact == 'declarant'}{$client.PASPORT_NOM}{/if}">
				</td>
				<td></td>
			</tr>
			{if $birthday}
				<tr>
					<td class="padding_bottom">Дата рождения:<span class="required">*</span></td>
					<td class="padding_bottom padding_right">
						<input type="text" value="{if $contact == 'declarant'}{$client.BIRTHDAY}{/if}" name="field[{$contact}.birthdate]" id="{$contact}.birth_date" class="inputCalendarBefore" style="width: 90px;" maxlength="10">
					</td>
					<td></td>
				</tr>
			{/if}
		</table>
	</fieldset>
{/if}
	<script type="text/javascript">
	$(document).ready(function() {
		if($('select[name="field[{$contact}.new_doctype]"] option').size()<=1){
			var text=$('select[name="field[{$contact}.new_doctype]"]:first').text();
			var value=$('select[name="field[{$contact}.new_doctype]"]:first').val();
			$('select[name="field[{$contact}.new_doctype]"]').parent().html('<input type="hidden" value="'+value+'" name="field[{$contact}.new_doctype]">'+text);
		}
	});
	</script>
