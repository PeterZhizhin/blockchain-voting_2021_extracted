{if !$num}
	{assign var=num value="100"}
{/if}
{literal}
<script type="text/javascript">
jQuery(document).ready(function() {
	var num = {/literal}'{$num}';{literal}

	values.push(new Array('file.' + num + '.documentkind', '', 'доверенность'));
	values.push(new Array('file.' + num + '.new_name', '112233'));
	values.push(new Array('file.' + num + '.new_docdate', '11.03.2010'));
	values.push(new Array('file.' + num + '.new_validityperiod', '10.03.2015'));
	values.push(new Array('file.' + num + '.new_whosign', 'Генеральный директор ООО "Компания"'));

	{/literal}{if $validate}{literal}
	jQuery("*[name='field[file." + num + ".documentkind]']").rules("add", {required: true});
	jQuery("*[name='field[file." + num + ".new_name]']").rules("add", {required: true});
	jQuery("*[name='field[file." + num + ".new_docdate]']").rules("add", {required: true, date_in_past: true});
	jQuery("*[name='field[file." + num + ".new_validityperiod]']").rules("add", {required: true, date_in_future: true});
	jQuery("*[name='field[file." + num + ".new_whosign]']").rules("add", {required: true});
	{/literal}{if !$skip_file_validate}{literal}
	jQuery("*[name='field[file." + num + ".documentbody]']").rules("add", {required: true});
	{/literal}{/if}{literal}
	{/literal}{/if}{literal}
});
</script>
{/literal}
	<fieldset><legend>Данные о документе-основании (доверенности)</legend>
	<table class="free_column">
	<tr>
		<td class="padding_bottom">
			Тип документа-основания:{if !$only_dov}<span class="required">*</span>{/if}
		</td>
		<td class="padding_bottom">
			Номер документа-основания:<span class="required">*</span>
		</td>
		<td class="padding_bottom">
			Дата выдачи документа-основания:<span class="required">*</span>
		</td>
	</tr>

	<tr>
		<td class="padding_bottom padding_right">
		{if !$only_dov}
			<select id="Doctype" name="field[file.{$num}.documentkind]">
				<option value=""></option>
				<option value="1">доверенность</option>
				<option value="2">договор-поручение</option>
				<option value="3">приказ</option>
				<option value="4">запрос</option>
				<option value="5">устав</option>
				<option value="6">положение</option>
				<option value="7">решение</option>
				<option value="8">распоряжение</option>
				<option value="9">выписка из протокола</option>
			</select>
		{else}
			<input type="hidden" name="field[file.{$num}.documentkind]" value="10002">
			<strong>Доверенность</strong>
		{/if}
		</td>
		<td class="padding_bottom padding_right">
			<input type="text" name="field[file.{$num}.new_name]" id="NumDoc">
		</td>
		<td class="padding_bottom padding_right">
			<input type="text" class="inputCalendarBefore" style="width: 100px;" name="field[file.{$num}.new_docdate]" id="DateDoc" maxlength="10">
		</td>
	</tr>
	<tr>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td class="padding_bottom">До какой даты действителен документ-основание:<span class="required">*</span></td>
		<td class="padding_bottom">Кем подписан документ-основание:<span class="required">*</span></td>
		<td class="padding_bottom">Копия документа-основания:{if !$skip_file_validate}<span class="required">*</span>{/if}</td>
	</tr>
	<tr>
		<td class="padding_bottom padding_right">
			<input type="text" class="inputCalendarAfter" style="width: 100px;" name="field[file.{$num}.new_validityperiod]" id="DateEndDoc" maxlength="10">
		</td>
		<td class="padding_bottom padding_right">
			<input type="text" name="field[file.{$num}.new_whosign]" id="KemDoc">
		</td>
		<td class="padding_bottom padding_right">
			<input type="file" name="field[file.{$num}.documentbody]" id="CopyDoc">
		</td>
	</tr>
	</table>
	</fieldset>