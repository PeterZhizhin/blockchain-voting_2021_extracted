{if !$title}                {assign var=title value="Статус заявителя"} {/if}
{if !$id}                   {assign var=id value="user_proxy_block"} {/if}
{if !$counter_js}           {assign var=counter_js value="file_counter"} {/if}
{if !$files_index}          {assign var=files_index value="1999"} {/if}
{if !$prefix}               {assign var=prefix value=""} {/if}
{if !$filetype}             {assign var=filetype value="sig"} {/if}
{* if !$filedesc}             {assign var=filedesc value="Исходный файл должен быть формата pdf.<br>Файл должен быть подписан прикрепленной подписью.<br>Формат: sig.<br>Размер файла до 10 Мб."} {/if *}

{*
флаги: hidden
prefix - префикс для имен переменных, если нужен
before_inc - если нужен преинкремент счетчика файлов
block_showhide_id - чтобы полностью переопределить id блока который может скрываться и отображаться
files_index - номер для первого файла который появляется в статике
not_req_name, not_req_inn, not_req_ogrn, not_req_phone, not_req_address - сделать необязательным поле
filetype - тип файла
filedesc - подсказка для файла

подключение:
include file="$base_template_path/std_blocks/grdstroy_doveren_ul.tpl" counter_js="имя_переменной_счетчика_из_js"
для подключения нескольких блоков нужно обязательно указать разные id, prefix, files_index!
Вызывает callback_block_dov_ul_file(jqFileField) для каждого добавляемого файлового поля
*}
<style type="text/css">
  .hint {
	color:grey!important;
	font-size:12px;
}
</style>
<fieldset  id="{$id}"{if $hidden} style="display:none;"{/if}>
  <legend>{$title}</legend>
  <table class="free_column">
	<tr>
	  <td class="padding_bottom">Заявитель действует по доверенности:</td>
	  <td class="padding_bottom padding_right">
{*            <input type="checkbox" name="field[internal.Sh1_Block1_Spisok1]" value="1"> *}
		<input type="radio" value="1" id="int_dov_yes_{$id}" name="field[internal.{$prefix}use]" required="required"> <label for="int_dov_yes_{$id}">Да</label>
		&nbsp;&nbsp;
		<input type="radio" value="0" checked="checked" id="int_dov_no_{$id}" name="field[internal.{$prefix}use]" required="required"> <label for="int_dov_no_{$id}">Нет</label>
	  </td>
	  <td></td>
	</tr>
  </table>


  <table class="free_column" {if !$block_showhide_id}id="user_proxy_table_{$id}"{else}id="{$block_showhide_id}"{/if} style="display: none;">
	<tr>
	  <td class="padding_bottom">Правообладатель (полное наименование):{if !$not_req_name}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<textarea id="{$id}_fullname" name="field[{$prefix}new_holder_name]" style="width:100%" {if !$not_req_name}required="required" {/if}maxlength="250"></textarea>
	  </td>
	  <td></td>
	</tr>
{*	<tr>
	  <td class="padding_bottom">ИНН:{if !$not_req_inn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_dov_inn" name="field[{$prefix}new_inn]" minlength="10" maxlength="10" {if !$not_req_inn}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">ОГРН:{if !$not_req_ogrn}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_dov_ogrn" name="field[{$prefix}new_ogrn]" minlength="13" maxlength="13" {if !$not_req_ogrn}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Контактный телефон:{if !$not_req_phone}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<input type="text" id="{$id}_dov_phone" name="field[{$prefix}new_phone]" minlength="14" maxlength="250"  {if !$not_req_phone}required="required" {/if}>
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">Почтовый индекс и адрес:{if !$not_req_address}<span class="required">*</span>{/if}</td>
	  <td class="padding_bottom padding_right">
		<textarea id="{$id}_dov_address" name="field[{$prefix}new_adress]" style="width:100%" {if !$not_req_address}required="required" {/if}maxlength="250"></textarea>
	  </td>
	  <td></td>
	</tr> *}
	<tr>
	  <td class="padding_bottom" colspan="3">
		Документы, подтверждающие право заявителя действовать от имени правообладателя, заверенные ЭЦП
	  </td>
	</tr>
	<tr>
	  <td class="padding_bottom">Электронная копия документа:<span class="required">*</span></td>
	  <td class="padding_bottom padding_right">
		<input type="hidden" name="field[file.{$files_index}.documentkind]" value="10002">
		<input type="hidden" name="field[file.{$files_index}.new_name]" value="б/н">
		<input type="file" name="field[file.{$files_index}.documentbody]" id="file_dov_ul_{$files_index++}"  value="" maxlength="250" required="required" accepttype="{$filetype}">
		{if $filedesc}<br><span class = "hint">{$filedesc}</span>{/if}
	  </td>
	  <td></td>
	</tr>
	<tr>
	  <td class="padding_bottom">
		{mpgu_button class='add_user_proxy_block' text='Добавить документ'}
	  </td>
	</tr>
  </table>
</fieldset>
<script type="text/javascript">
//$('#{$id}_dov_phone').setMask({ 'mask': "(999)999-99-99" });
//$('#{$id}_dov_inn').setMask({ 'mask': "9999999999" });
//$('#{$id}_dov_ogrn').setMask({ 'mask': "9999999999999" });

values.push(new Array('{$prefix}new_holder_name', 'Общество с ограниченной ответственностью «Свобода»'));
//values.push(new Array('{$prefix}new_inn', '1234567890'));
//values.push(new Array('{$prefix}new_ogrn', '1234567890123'));
//values.push(new Array('{$prefix}new_phone', '(495)757-77-77'));
//values.push(new Array('{$prefix}new_adress', '112580, Москва. 2-й Кожевнический пер.'));
applyHints();
</script>
{* по идее, грузим все что ниже только один раз, иначе можем получить ошибки *}
{if !$block_ul_loaded}
{assign var=block_ul_loaded value="1"}
<script type="text/javascript">
	$(document).ready(function() {
		OPR.FormLoader.addListener('block_user_proxy', function(object, fields) {
			var returner = [];
			var current_number = object[1] * 1;
			var max_number =  Math.max(1 + parseInt(current_number), {$counter_js});
			{$counter_js} = current_number;

			{if $before_inc}
			{$counter_js}--;
			{/if}

			$('#{$id} .add_user_proxy_block').click();

			{$counter_js} = max_number;
			return returner;
		})
	});
	$('#{$id} :radio').on('change', function() {
	  if ($(this).val() == '1') {
		  $(this).closest('table').next().show();
	  } else {
		  $(this).closest('table').next().hide();
	  }
	});

	$('#{$id} .add_user_proxy_block').on('click', function() {
		{if $before_inc}
		{$counter_js}++;
		{/if}

		$(this).parents('tr:first').before(OPR.templater('user_proxy_tpl', { num: {$counter_js} }));
		$('#{$id} .del_user_proxy_block').on('click', function() {
			$(this).parents('tr:first').remove();
			return false;
		});
		// вызываем callback функцию
		if (typeof(callback_block_dov_ul_file) != 'undefined' && jQuery.isFunction(callback_block_dov_ul_file)) {
			callback_block_dov_ul_file($('#file_dov_ul_' + {$counter_js}));
		}
//		add_file_hint();
		{if !$before_inc}
		{$counter_js}++;
		{/if}

		return false;
	});
//	function add_file_hint() {
//		$(document).ready(function() {
//			$('#{$id} :input[accepttype]:not(.acceptedtype)').each(function() {
//			$(this).addClass('acceptedtype').rules("add", { "accept": $(this).attr('accepttype') });
//			$(this).on('change', function() { $(this).valid(); });
//			});
//		});
//	};
//	add_file_hint();
	// вызываем callback функцию для обязательного блока
	if (typeof(callback_block_dov_ul_file) != 'undefined' && jQuery.isFunction(callback_block_dov_ul_file)) {
		callback_block_dov_ul_file($('#file_dov_ul_' + ({$files_index++} - 1)));
	}
  </script>
<script type="text/html" id="user_proxy_tpl">
	<tr>
	  <td class="padding_bottom">Электронная копия документа:<span class="required">*</span></td>
	  <td class="padding_bottom padding_right">
		<input type="hidden" name="field[internal.staff][]" value="block_user_proxy$<%=num%>">
		<input type="hidden" name="field[file.<%=num%>.documentkind]" value="10002">
		<input type="hidden" name="field[file.<%=num%>.new_name]" value="б/н">
		<input type="file" name="field[file.<%=num%>.documentbody]" id="file_dov_ul_<%=num%>" value="" required="required" accepttype="{$filetype}">
		<br><span class = "hint">{$filedesc}</span>
	  </td>
	  <td class="padding_bottom" style="vertical-align: bottom; text-align: right;">
		<div>{mpgu_button class='del_user_proxy_block' text='Удалить'}</div>
	  </td>
	</tr>
</script>
{/if}