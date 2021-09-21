{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}

{if !$docTypeList}
	{assign var=docTypeList value="passportOnly"}
{/if}
{* docTypeList= passportOnly | full *}

<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/document_type.js"></script>
<script type="text/javascript">
	var savedDocs = {
		'1': {
			'empty_title': 'Указать данные паспорта вручную', 'data': []
		}
	};
	{* 
	{if !empty($passport_js)}
	savedDocs['1']['data'] = {$passport_js};
	{/if}
	*}
	if (passport_initializers === undefined)
		var passport_initializers = new Array();
	passport_initializers['{$contact}'] = function(contact) {
		var $this = $('.' + contact.replace('.', '\\.') + '_passport_data *[name="field[' + contact + '.new_doctype]"]');
		var type = $this.val();
		if (typeof(savedDocs[type]) != 'undefined' && typeof(savedDocs[type].data) != 'undefined') {
			$('#row' + contact.replace('.', '\\.') + 'prev_pass').show();
			var str = '<option value="" selected>' + (typeof(savedDocs[type].empty_title) != 'undefined' && savedDocs[type].empty_title ? savedDocs[type].empty_title : 'Указать данные паспорта вручную') + '</option>';
			for (var i in savedDocs[type].data)
				str += '<option value="' + i + '">' + savedDocs[type].data[i].COMMENT + '</option>';
			$('#' + contact.replace('.', '\\.') + 'prev_pass').removeAttr('disabled').html(str).change();
		}
	}

{if $showSavedDocs}
		if (passportAutocompliteCallback === undefined)
			var passportAutocompliteCallback = function(element, contact, readonly, hideBirthday, hideBirthplace, hideOVDCode) {
				var maskedContact = contact.replace('.', '\\.');
				if ($(element).val()) {
					var doc_data = savedDocs[$('.' + maskedContact + '_passport_data *[name="field[' + contact + '.new_doctype]"]').val()].data[$(element).val()];
					var res = doc_data.NUMBER.match(/(\d\d)\s*(\d\d)\s*(\d\d\d\d\d\d)/);
					if (res) {
						doc_data.NUM = res[3];
						doc_data.SERIES = '' + res[1] + res[2];
					}
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport]"]').val(doc_data.NUM).removeClass('error');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_serie]"]').val(doc_data.SERIES).removeClass('error');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').val(doc_data.ISSUED_ON).removeClass('error');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_place]"]').val(doc_data.ISSUED_BY).removeClass('error');
					if (!hideOVDCode)
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_divisioncode]"]').val(doc_data.DIVISION_CODE).removeClass('error');
					if (!hideBirthday) {
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').val(doc_data.BIRTHDAY).removeClass('error');
						if (!hideBirthplace)
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_birthplace]"]').val(doc_data.BIRTHPLACE).removeClass('error');
					}
					if (readonly) {
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport]"]').attr('readonly', 'readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_serie]"]').attr('readonly', 'readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').attr('readonly', 'readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').next().hide();
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_place]"]').attr('readonly', 'readonly');
						if (!hideOVDCode)
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_divisioncode]"]').attr('readonly', 'readonly');
						if (!hideBirthday) {
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').attr('readonly', 'readonly');
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').next().hide();
							if (!hideBirthplace)
								$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_birthplace]"]').attr('readonly', 'readonly');
						}
					}
				} else {
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport]"]').val('');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_serie]"]').val('');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').val('');
					$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_place]"]').val('');
					if (!hideOVDCode)
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_divisioncode]"]').val('');
					if (!hideBirthday) {
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').val('');
						if (!hideBirthplace)
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_birthplace]"]').val('');
					}
					if (readonly) {
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport]"]').removeAttr('readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_serie]"]').removeAttr('readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').removeAttr('readonly');
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_date]"]').next().show();
						$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_passport_place]"]').removeAttr('readonly');
						if (!hideOVDCode)
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_divisioncode]"]').removeAttr('readonly');
						if (!hideBirthday) {
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').removeAttr('readonly');
							$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.birthdate]"]').next().show();
							if (!hideBirthplace)
								$('.' + maskedContact + '_passport_data input[name="field[' + contact + '.new_birthplace]"]').removeAttr('readonly');
						}
					}
				}
			}
{/if}

	$(document).ready(function() {
		var contact = '{$contact}';
		var maskedContact = contact.replace('.', '\\.');

		var val = contact == 'declarant' ? '{if $client.ISSUE_DATE}{$client.ISSUE_DATE}{else}17.06.2000{/if}' : '17.06.2000';
		values.push(new Array(contact + '.new_passport_date', val, '', '1'));
		var val = contact == 'declarant' ? '{if $client.PASPORT_ISSUED}{$client.PASPORT_ISSUED}{else}ОВД «Щукино»{/if}' : 'ОВД «Щукино»';
		values.push(new Array(contact + '.new_passport_place', val));
		var val = contact == 'declarant' ? '{if $client.BIRTHDAY}{$client.BIRTHDAY}{else}11.01.1963{/if}' : '11.01.1963';
		values.push(new Array(contact + '.birthdate', val, '', '1'));
		var val = contact == 'declarant' ? '{if $client.BIRTH_PLACE}{$client.BIRTH_PLACE}{else}г. Ангарск{/if}' : 'г. Ангарск';
		values.push(new Array(contact + '.new_birthplace', val));
	{if !$no_ovdcode}
		var val = contact == 'declarant' ? '{if $client.OVDCODE}{$client.OVDCODE}{else}111-222{/if}' : '111-222';
		values.push(new Array(contact + '.new_divisioncode', val));
	{/if}
		applyHints();

	{if !$no_birthday}
		$("." + maskedContact + "_passport_data *[name='field[" + contact + ".birthdate]']").rules("add", {
			date_in_past: true
		});
		{if !$no_birthplace}
		$("." + maskedContact + "_passport_data *[name='field[" + contact + ".new_birthplace]']").rules("add", {
			required: true
		});
		{/if}
	{/if}

		$("." + maskedContact + "_passport_data *[name='field[" + contact + ".new_passport_date]']").rules("add", {
			date_in_past_and_now: true
		});

	{if !$free_photo && !$no_photo}
		$("." + maskedContact + "_passport_data *[name='field[" + contact + ".0.contact_annotation.1.documentbody]']").rules("add", {
			required: true
		});
		{if !$one_photo && !$no_photo}
		$("." + maskedContact + "_passport_data *[name='field[" + contact + ".0.contact_annotation.2.documentbody]']").rules("add", {
			required: true
		});
		{/if}
	{/if}

		$('.' + maskedContact + '_passport_data *[name="field[' + contact + '.new_doctype]"]').on('change', function() {
			var type = $(this).val();
			if (typeof(savedDocs[type]) != 'undefined' && typeof(savedDocs[type].data) != 'undefined') {
				if (passport_initializers !== undefined && passport_initializers['{$contact}'] !== undefined)
					passport_initializers['{$contact}']('{$contact}');
			} else {
				$('#' + maskedContact + 'prev_pass').attr('disabled', 'disabled');
				$('#row' + maskedContact + 'prev_pass').hide();

				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport]"]').val('');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_serie]"]').val('');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_date]"]').val('');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_place]"]').val('');
	{if !$no_ovdcode}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_divisioncode]"]').val('');
	{/if}
	{if !$no_birthday}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.birthdate]"]').val('');
		{if !$no_birthplace}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_birthplace]"]').val('');
		{/if}
	{/if}
	{if $savedDocsReadonly}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport]"]').removeAttr('readonly');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_serie]"]').removeAttr('readonly');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_date]"]').removeAttr('readonly');
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_date]"]').next().show();
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_passport_place]"]').removeAttr('readonly');
		{if !$no_ovdcode}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_divisioncode]"]').removeAttr('readonly');
		{/if}
		{if !$no_birthday}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.birthdate]"]').removeAttr('readonly');
			{if !$no_birthplace}
				$('.' + maskedContact + '_passport_data input[name="field[{$contact}.new_birthplace]"]').removeAttr('readonly');
			{/if}
		{/if}
	{/if}
			}
		});

	{if $showSavedDocs}
		$('#' + contact.replace('.', '\\.') + 'prev_pass').on('change', function() {
			passportAutocompliteCallback(this, '{$contact}', {if $savedDocsReadonly}true{else}false{/if}, {if $no_birthday}true{else}false{/if}, {if $no_birthplace}true{else}false{/if}, {if $no_ovdcode}true{else}false{/if});
		});
	{/if}
		setDocType(contact);
		ELK.ready(function() {
			ELK.loadUserProfileData({
				blocks: ['PERSON', 'PASSPORT_RF'],
				done: function(data) {
					data.PASSPORT_RF = data.PASSPORT_RF || {};
					data.PERSON = data.PERSON || {};
					savedDocs['1']['data'] = [{
						NUMBER : data.PASSPORT_RF.NUMBER || '',
						ISSUED_ON : data.PASSPORT_RF.ISSUED_ON || '',
						ISSUED_BY : data.PASSPORT_RF.ISSUED_BY || '',
						DIVISION_CODE : data.PASSPORT_RF.DIVISION_CODE || '',
						BIRTHPLACE : data.PASSPORT_RF.BIRTHPLACE || '',
						BIRTHDAY : data.PERSON.BIRTHDATE || '',
						COMMENT : 'Мой паспорт'
					}];
					hasELKConnection = true;
					if ((draft_loading !== undefined) && (!draft_loading)) {
						passport_initializers[contact](contact);
						try {
							$('[name="field[internal.' + contact + '.prev_pass]"]').val(0);
							$('[name="field[internal.' + contact + '.prev_pass]"]').change();
						}
						catch(e) {

						}
					}
				}
			});
		});
	});

</script>

<fieldset class="{$contact}_passport_data"><legend>{$title}</legend>
	<table class="free_column">
		<tr>
			<td class="padding_bottom">Тип документа, удостоверяющего личность:<span class="required">*</span></td>
			<td class="padding_bottom padding_right">
				{if $docTypeList=='full'}
					<select name="field[{$contact}.new_doctype]" onchange="setDocType('{$contact}');" onkeyup="setDocType('{$contact}');">
						<option value="1">Паспорт гражданина РФ</option>
						<option value="2">Военный билет</option>
						<option value="3">Удостоверение личности офицера</option>
					</select>
				{else}
					<input type="hidden" name="field[{$contact}.new_doctype]" value="1">Паспорт гражданина РФ
				{/if}
			</td>
			<td></td>
		</tr>
		{if $showSavedDocs}
			<tr id="row{$contact}prev_pass">
				<td class="padding_bottom">Выбрать из сохраненных:</td>
				<td class="padding_bottom padding_right">
					<select name="field[internal.{$contact}.prev_pass]" id="{$contact}prev_pass">
						{*
						<option value="" selected>Указать данные паспорта вручную</option>
						{foreach from=$passport item=value key=key}
						<option value="{$key}">{$value.COMMENT}</option>
						{/foreach}
						*}
					</select>
				</td>
				<td></td>
			</tr>
		{/if}
		<tr id="row{$contact}new_passport_serie">
			<td class="padding_bottom">Серия документа:<span class="required" id="asterisk{$contact}new_passport_serie">*</span></td>
			<td class="padding_bottom padding_right">
				<input type="text" name="field[{$contact}.new_passport_serie]" id="{$contact}Serial" value="{if $contact == 'declarant'}{$client.PASPORT_SERIES}{/if}">
			</td>
			<td></td>
		</tr>

		<tr id="row{$contact}new_passport">
			<td class="padding_bottom">Номер документа:<span class="required" id="asterisk{$contact}new_passport">*</span></td>
			<td class="padding_bottom padding_right">
				<input type="text" name="field[{$contact}.new_passport]" id="{$contact}Number" value="{if $contact == 'declarant'}{$client.PASPORT_NOM}{/if}">
			</td>
			<td></td>
		</tr>

		<tr id="row{$contact}new_passport_date">
			<td class="padding_bottom">Когда выдан документ:<span class="required" id="asterisk{$contact}new_passport_date">*</span></td>
			<td class="padding_bottom padding_right">
				<input type="text" class="inputCalendarBefore" style="width: 90px;" name="field[{$contact}.new_passport_date]" id="{$contact}Date" maxlength="10" value="{if $contact == 'declarant'}{$client.ISSUE_DATE}{/if}">
			</td>
			<td></td>
		</tr>

		<tr id="row{$contact}new_passport_place">

			<td class="padding_bottom">Кем выдан документ:<span class="required" id="asterisk{$contact}new_passport_place">*</span></td>
			<td class="padding_bottom padding_right">
				<input type="text" name="field[{$contact}.new_passport_place]" maxlength="255" value="{if $contact == 'declarant'}{$client.PASPORT_ISSUED}{/if}">
			</td>
			<td></td>
		</tr>

		{if !$no_ovdcode}
			<tr id="row{$contact}new_divisioncode">
				<td class="padding_bottom">Код подразделения, выдавшего документ:<span class="required" id="asterisk{$contact}new_divisioncode">*</span></td>
				<td class="padding_bottom padding_right">
					<input type="text" name="field[{$contact}.new_divisioncode]" maxlength="50" value="{if $contact == 'declarant'}{$client.OVDCODE}{/if}">
				</td>
				<td></td>
			</tr>
		{/if}
		{if !$no_birthday}
			<tr>
				<td class="padding_bottom">Дата рождения:<span class="required">*</span></td>
				<td class="padding_bottom padding_right">
					<input type="text" value="{if $contact == 'declarant'}{$client.BIRTHDAY}{/if}" name="field[{$contact}.birthdate]" id="{$contact}.birth_date" class="inputCalendarBefore" style="width: 90px;" maxlength="10">
				</td>
				<td></td>
			</tr>
			{if !$no_birthplace}
				<tr>
					<td class="padding_bottom">Место рождения:<span class="required">*</span></td>
					<td class="padding_bottom padding_right">
						<input type="text" name="field[{$contact}.new_birthplace]" id="{$contact}BirthPlace" value="{if $contact == 'declarant'}{$client.BIRTH_PLACE}{/if}" maxlength="255">
					</td>
					<td></td>
				</tr>
			{/if}
		{/if}

		{if !$no_photo}

			{if !$one_photo}
				<tr>
					<td class="padding_bottom">Страница паспорта с фотографией:{if !$free_photo}<span class="required">*</span>{/if}</td>
					<td class="padding_bottom padding_right">
						<input type="file" name="field[{$contact}.0.contact_annotation.1.documentbody]">
						<font style="font-size:10px; color:#777777;">Прикрепите электронный образ документа</font>
					</td>
					<td></td>
				</tr>
				<tr>
					<td class="padding_bottom">Страница паспорта с адресом регистрации:{if !$free_photo}<span class="required">*</span>{/if}</td>
					<td class="padding_bottom padding_right">
						<input type="file" name="field[{$contact}.0.contact_annotation.2.documentbody]">
						<font style="font-size:10px; color:#777777;">Прикрепите электронный образ документа</font>
					</td>
					<td></td>
				</tr>
			{else}
				<tr>
					<td class="padding_bottom">Электронный образ документа:{if !$free_photo}<span class="required">*</span>{/if}</td>
					<td class="padding_bottom padding_right">
						<input type="file" name="field[{$contact}.0.contact_annotation.1.documentbody]">
						<font style="font-size:10px; color:#777777;">Прикрепите электронный образ документа</font>
					</td>
					<td></td>
				</tr>
			{/if}

		{/if}
	</table>
</fieldset>