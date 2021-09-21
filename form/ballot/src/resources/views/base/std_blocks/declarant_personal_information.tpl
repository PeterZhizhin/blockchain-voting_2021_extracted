{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}
{if $savedUserData}
	{* Новый варант, работает, если установлен savedUserData из User::getClientPersonalData() *}
	<script type="text/javascript">
		$(document).ready(function() {
			var contact = '{$contact}';
			$('#' + contact + '_phone').setMask('(999) 999-99-99');
			if ($('#' + contact + '_fax'))
				$('#' + contact + '_fax').setMask('(999) 999-99-99');

			values.push(new Array(contact + '.mobilephone', '(495) 417-81-47'));
			values.push(new Array(contact + '.emailaddress1', 'test@mail.com'));
		{if $empty}
			values.push(new Array(contact + '.lastname', 'Иванов'));
			values.push(new Array(contact + '.firstname', 'Иван'));
		{/if}
				values.push(new Array(contact + '.gendercode', 'Мужской', '1'));
			applyHints();
			$("*[name='field[" + contact + ".emailaddress1]']").rules('add', { email: true });
		{if !$not_required}
			$("*[name='field[" + contact + ".lastname]']").rules('add', { required: true });
			$("*[name='field[" + contact + ".firstname]']").rules('add', { required: true });
		{if !$skip_gender}$("*[name='field[" + contact + ".gendercode]']").rules('add', { required: true });{/if}
				$("*[name='field[" + contact + ".mobilephone]']").rules('add', { required: true });
			$("*[name='field[" + contact + ".emailaddress1]']").rules('add', { required: true });
	{/if}
			ELK.ready(function() {
				ELK.loadUserProfileData({
					blocks: ['FIO', 'PERSON'],
					done: function(data) {
						data.FIO = data.FIO || { };
						data.PERSON = data.PERSON || { };
						hasELKConnection = true;
						/*
						$('input[name="field[{$contact}.lastname]"]').val(data.FIO.SURNAME || '' );
						$('input[name="field[{$contact}.firstname]"]').val(data.FIO.NAME || '' );
						$('input[name="field[{$contact}.middlename]"]').val(data.FIO.PATRONYMIC || '' );
						*/
						if ((draft_loading !== undefined) && (!draft_loading)) {
						{if !$skip_gender}
							data.PERSON.GENDER = data.PERSON.GENDER || '';
							if (data.PERSON.GENDER === 'm') {
								$('select[name="field[{$contact}.gendercode]"] option[value="1"]').prop('selected', true);
							} else if (data.PERSON.GENDER === 'f') {
								$('select[name="field[{$contact}.gendercode]"] option[value="2"]').prop('selected', true);
							} else  {
								$('select[name="field[{$contact}.gendercode]"] option[value=""]').prop('selected', true);
							}
							{/if}
							$('input[name="field[{$contact}.mobilephone]"]').val(data.PERSON.PHONE || '' );
						}
					}
				});
			});
		});
</script>

<fieldset style="padding: 10px;"><legend>{$title}</legend>
	<table class="free_column">
		<tr>
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Фамилия:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.lastname]" maxlength="256" value="{if !$empty}{$client.SURNAME}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
			<td class="padding_bottom padding_right" {if $includeFax}colspan="2"{/if}>
				<p style="padding-bottom:4px">Имя:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.firstname]" maxlength="256" value="{if !$empty}{$client.NAME}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Отчество:</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.middlename]" maxlength="256" id="patronymic" value="{if !$empty}{$client.PATRONYMIC}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
		</tr>

		<tr>
			{if !$skip_gender}
				<td class="padding_bottom padding_right">
					<p style="padding-bottom:4px">Пол:{if !$not_required}<span class="required">*</span>{/if}</p>
					<select style="width:100px" id="sex" name="field[{$contact}.gendercode]">
						<option value="" selected="selected">Выберите...</option>
						<option value="1">Мужской</option>
						<option value="2">Женский</option>
					</select>
				</td>
			{/if}
			<td class="padding_bottom padding_right" {if $includeFax}style="width: 17%!important;" {/if}>
				<p style="padding-bottom:4px">{if !$includeFax}Контактный т{else}T{/if}елефон:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field" name="field[{$contact}.mobilephone]" maxlength="15" value="" id="{$contact}_phone"/>
			</td>
			{if $includeFax}
				<td class="padding_bottom padding_right" style="width: 16%!important;">
					<p style="padding-bottom:4px">Факс:</p>
					<input type="text" class="text_field" name="field[{$contact}.fax]" maxlength="15" value="" id="{$contact}_fax"/>
				</td>
			{/if}
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Адрес электронной почты:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input class="valid" type="text" maxlength="256" id="email" name="field[{$contact}.emailaddress1]" value="{if !$empty}{$client.EMAIL}{/if}"/>
			</td>
			{if $skip_gender}
				<td></td>
			{/if}
		</tr>
	</table>
</fieldset>
{else}
	{* Старый вариант *}
	{literal}
		<script type="text/javascript">
			$(document).ready(function() {
				var contact = {/literal}'{$contact}';{literal}
					$('#' + contact + '_phone').setMask('(999) 999-99-99');
					if ($('#' + contact + '_fax'))
						$('#' + contact + '_fax').setMask('(999) 999-99-99');

					values.push(new Array(contact + '.mobilephone', '(495) 417-81-47'));
					values.push(new Array(contact + '.emailaddress1', 'test@mail.com'));
		{/literal}{if $empty}{literal}
						values.push(new Array(contact + '.lastname', 'Иванов'));
						values.push(new Array(contact + '.firstname', 'Иван'));
		{/literal}{/if}{literal}
						values.push(new Array(contact + '.gendercode', 'Мужской', '1'));
						applyHints();

						$("*[name='field[" + contact + ".emailaddress1]']").rules('add', {email: true});

		{/literal}{if !$not_required}{literal}
							$("*[name='field[" + contact + ".lastname]']").rules('add', {required: true});
							$("*[name='field[" + contact + ".firstname]']").rules('add', {required: true});
	{/literal}{if !$skip_gender}{literal}$("*[name='field[" + contact + ".gendercode]']").rules('add', {required: true});{/literal}{/if}{literal}
								$("*[name='field[" + contact + ".mobilephone]']").rules('add', {required: true});
								$("*[name='field[" + contact + ".emailaddress1]']").rules('add', {required: true});
{/literal}{/if}{literal}
							});
</script>
{/literal}

<fieldset style="padding: 10px;"><legend>{$title}</legend>
	<table class="free_column">
		<tr>
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Фамилия:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.lastname]" maxlength="256" value="{if !$empty}{$client.SURNAME}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
			<td class="padding_bottom padding_right" {if $includeFax}colspan="2"{/if}>
				<p style="padding-bottom:4px">Имя:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.firstname]" maxlength="256" value="{if !$empty}{$client.NAME}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Отчество:</p>
				<input type="text" class="text_field{if !$empty} readonly_gray{/if}" name="field[{$contact}.middlename]" maxlength="256" id="patronymic" value="{if !$empty}{$client.PATRONYMIC}{/if}"{if !$empty} readonly="readonly"{/if}/>
			</td>
		</tr>

		<tr>
			{if !$skip_gender}
				<td class="padding_bottom padding_right">
					<p style="padding-bottom:4px">Пол:{if !$not_required}<span class="required">*</span>{/if}</p>
					<select style="width:100px" id="sex" name="field[{$contact}.gendercode]">
						<option value="" {if $client.SEX != NULL}disabled="disabled"{/if}>Выберите...</option>
						<option value="1" {if $client.SEX == 'M'}selected="selected" {else} {if $client.SEX != NULL} disabled="disabled"{/if}{/if}>Мужской</option>
						<option value="2" {if $client.SEX == 'F'}selected="selected" {else} {if $client.SEX != NULL} disabled="disabled"{/if}{/if}>Женский</option>
					</select>
				</td>
			{/if}
			<td class="padding_bottom padding_right" {if $includeFax}style="width: 17%!important;" {/if}>
				<p style="padding-bottom:4px">{if !$includeFax}Контактный т{else}T{/if}елефон:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input type="text" class="text_field" name="field[{$contact}.mobilephone]" maxlength="15" value="{if !$empty}{$client.TELEPHONE}{/if}" id="{$contact}_phone"/>
			</td>
			{if $includeFax}
				<td class="padding_bottom padding_right" style="width: 16%!important;">
					<p style="padding-bottom:4px">Факс:</p>
					<input type="text" class="text_field" name="field[{$contact}.fax]" maxlength="15" value="" id="{$contact}_fax"/>
				</td>
			{/if}
			<td class="padding_bottom padding_right">
				<p style="padding-bottom:4px">Адрес электронной почты:{if !$not_required}<span class="required">*</span>{/if}</p>
				<input class="valid" type="text" maxlength="256" id="email" name="field[{$contact}.emailaddress1]" value="{if !$empty}{$client.EMAIL}{/if}"/>
			</td>
			{if $skip_gender}
				<td></td>
			{/if}
		</tr>
	</table>
</fieldset>
{/if}
