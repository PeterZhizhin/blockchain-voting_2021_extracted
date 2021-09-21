{if !$prefix}               {assign var=prefix value=""} {/if}

{* if $default}
	{assign var=agree0_hide value="1"}
	{assign var=agree1_name value="internal.agree1"}
	{assign var=agree2_name value="internal.agree2"}
{/if *}
{if !$sposob_title}         {assign var=sposob_title value="Способ выдачи результата"} {/if}
{if !$agree_title}          {assign var=agree_title value="Согласие с условиями предоставления услуги"} {/if}
{if !$sposob_id}            {assign var=sposob_id value="sposob"} {/if}
{if !$agree_id}             {assign var=agree_id value="agree"} {/if}

{if !$sposob_electron_name} {assign var=sposob_electron_name value="new_result"} {/if}
{if !$sposob_bumaga_name}   {assign var=sposob_bumaga_name value="new_result1"} {/if}

{if !$agree0_name}          {assign var=agree0_name value="internal.agree0"} {/if}
{if !$agree1_name}          {assign var=agree1_name value="internal.agree1"} {/if}
{if !$agree2_name}          {assign var=agree2_name value="internal.agree2"} {/if}

{if !$contact_account}      {assign var=contact_account value="account"} {/if}
{if !$contact_head}         {assign var=contact_head value="head"} {/if}

{*
   переменные шаблона (флаги):
   block_sposob_off, block_agree_off - вообще убрать блок, использовать максимум один из них одновременно иначе нет смысла

   disable_next_button_handler - отключить обработку включения/отключения кнопки "Далее" по умолчанию
   sposob_hidden, agree_hidden - скрыть fieldset,
   agree0_hide, agree1_hide, agree2_hide - не показывать пункт согласия
   sposob_electron_hide, sposob_bumaga_hide - не показывать пункт способа получения

   переменные шаблона (строки):
   sposob_id, agree_id - другие id для fieldset

   agree0_title, agree1_title, agree2_title - другие заголовки для согласия
   agree0_name, agree1_name, agree2_name - другие имена для переменных согласия

   sposob_electron_title, sposob_bumaga_title - другие заголовки для способа получения
   sposob_electron_name, sposob_bumaga_name - другие имена для переменных способа получения
   TODO: исправить более красиво: использование sposob_bumaga_hide даст проблему. Чтобы этого не было добавлен #new_result_1_noerror_non_exist_id

   подключение на kgsn/021103 (2 пункта в условиях):
   include file="$base_template_path/std_blocks/grdstroy_sposob_argee.tpl" agree0_hide="1" agree1_name="internal.agree" agree2_name="internal.agree2" sposob_electron_name="new_electronic_document" sposob_bumaga_name="new_given_personally"

   подключение на большинстве строек (когда 1 пункт в условиях):
   include file="$base_template_path/std_blocks/grdstroy_sposob_argee.tpl" agree1_hide="1" agree2_hide="1" agree0_name="new_check_gu"
*}
{if $block_sposob_off}
	{assign var=sposob_electron_hide value="1"}
	{assign var=sposob_bumaga_hide value="1"}
{/if}
{if $block_agree_off}
	{assign var=agree0_hide value="1"}
	{assign var=agree1_hide value="1"}
	{assign var=agree2_hide value="1"}
{/if}
{if $block_sposob_off && $block_agree_off}
	{assign var=disable_next_button_handler value="1"}
{/if}
{if !$sposob_bumaga_hide || !$sposob_electron_hide}
<style type="text/css">
  .hint{
	color:grey!important;
	font-size:12px;
}
</style>
<fieldset id="{$sposob_id}"{if $sposob_hidden} style="display:none;"{/if}>
	<input type="hidden" name="field[internal.staff][]" value="{$prefix}block_sposob$">
	<legend>{$sposob_title}</legend>
	<table class="free_column">
		{if !$sposob_bumaga_hide}
		<tr>
			<td class="padding_bottom" colspan="3">
{*				<input type="hidden" value="0" name="field[{$sposob_bumaga_name}]">*}
				<label for="{$prefix}new_result_1"><input type="checkbox" name="field[{$sposob_bumaga_name}]" value="1" id="{$prefix}new_result_1"/>&nbsp;{if $sposob_bumaga_title}{$sposob_bumaga_title}{else}Вручить лично{/if}</label>
			</td>
		</tr>
		{/if}
		{if !$sposob_electron_hide}
		<tr>
			<td class="padding_bottom" colspan="3">
{*				<input type="hidden" value="0" name="field[{$sposob_electron_name}]">*}
				<label for="{$prefix}new_result_2"><input type="checkbox" name="field[{$sposob_electron_name}]" value="1" id="{$prefix}new_result_2"/>&nbsp;{if $sposob_electron_title}{$sposob_electron_title}{else}Направить в форме электронного документа через Портал государственных и муниципальных услуг (функций) города Москвы{/if}</label>
				<br><span class="hint">Выберите хотя бы один из способов<span class="required">*</span></span>
			</td>
		</tr>
		{/if}
	</table>
</fieldset>
{* <script type="text/javascript">
 OPR.FormLoader.addListener('XXX{$prefix}block_sposob', function(object, fields) {
	$('[name="field[{$sposob_bumaga_name}]"]:hidden').val('0');
	$('[name="field[{$sposob_bumaga_name}]"]:checkbox').val('1');
	$('[name="field[{$sposob_electron_name}]"]:hidden').val('0');
	$('[name="field[{$sposob_electron_name}]"]:checkbox').val('1');
	if (fields['{$sposob_bumaga_name}'].value) {
		$('[name="field[{$sposob_bumaga_name}]"]:checkbox').attr('checked', 'checked');
	}
	if (fields['{$sposob_electron_name}'].value) {
		$('[name="field[{$sposob_electron_name}]"]:checkbox').attr('checked', 'checked');
	}
	return ['fields.{$sposob_bumaga_name}', 'fields.{$sposob_electron_name}'];
});
</script> *}
{/if}
{if !$agree0_hide || !$agree1_hide || !$agree2_hide}
<fieldset id="{$agree_id}"{if $agree_hidden} style="display:none;"{/if}>
	<legend>{$agree_title}</legend>
	<table class="free_column">
		{if !$agree0_hide}
		<tr>
			<td class="padding_bottom" colspan="3">
				<input type="checkbox" name="field[{$agree0_name}]" value="1" id="{$prefix}final_agree0"/><label for="{$prefix}final_agree0">{if $agree0_title}{$agree0_title}{else}Я ознакомлен с правилами предоставления государственной услуги и как заявитель несу ответственность за достоверность и подлинность предоставленных сведений и прикрепленных к заявлению электронных документов в соответствии с законодательством Российской Федерации и города Москвы.{/if}<span class="required">*</span></label>
			</td>
		</tr>
		{/if}
		{if !$agree1_hide}
		<tr>
			<td class="padding_bottom" colspan="3">
				<input type="checkbox" name="field[{$agree1_name}]" value="1" id="{$prefix}final_agree1"/><label for="{$prefix}final_agree1">{if $agree1_title}{$agree1_title}{else}Обязуюсь сообщать обо всех изменениях, связанных с представленными в настоящем заявлении документами и сведениями{/if}<span class="required">*</span></label>
			</td>
		</tr>
		{/if}
		{if !$agree2_hide}
		<tr>
			<td class="padding_bottom" colspan="3">
				<input type="checkbox" name="field[{$agree2_name}]" value="1" id="{$prefix}final_agree2"/><label for="{$prefix}final_agree2">{if $agree2_title}{$agree2_title}{else}Я ознакомлен с правилами предоставления государственной услуги и как заявитель несу ответственность за полноту и достоверность представленных сведений{/if}<span class="required">*</span></label>
				<br><span class="hint">Подтвердите оба условия<span class="required">*</span></span>
			</td>
		</tr>
		{/if}
	</table>
</fieldset>
{/if}

{if !$disable_next_button_handler}
<script type="text/javascript">
$(document).ready(function() {
	$('{if !$sposob_bumaga_hide}#{$prefix}new_result_1{else}#new_result_1_noerror_non_exist_id{/if}{if !$sposob_electron_hide}, #{$prefix}new_result_2{/if}{if !$agree0_hide}, #{$prefix}final_agree0{/if}{if !$agree1_hide}, #{$prefix}final_agree1{/if}{if !$agree2_hide}, #{$prefix}final_agree2{/if}').on('change', function() {
		if (!edit_draft) {
		if ({if $sposob_bumaga_hide && $sposob_electron_hide}true{else}({if !$sposob_bumaga_hide}$('#{$prefix}new_result_1').is(':checked'){/if}{if !$sposob_bumaga_hide && !$sposob_electron_hide} || {/if}{if !$sposob_electron_hide}$('#{$prefix}new_result_2').is(':checked') {/if}){/if}
			{if !$agree0_hide}&& $('#{$prefix}final_agree0').is(':checked'){/if}
			{if !$agree1_hide}&& $('#{$prefix}final_agree1').is(':checked'){/if}
			{if !$agree2_hide}&& $('#{$prefix}final_agree2').is(':checked'){/if}
			) {
				$('#button_next').removeAttr('disabled').removeClass('grey_btn').addClass('green_btn');
//				$('#button_next').removeAttr('disabled').removeClass('grey_btn');
				{if $cades_sign}
				if ($('#cadesButtonNext').length) {
					$('#cadesButtonNext').removeAttr('disabled').removeClass('grey_btn').addClass('green_btn');
				}
				{/if}
			} else {
//				$('#button_next').attr('disabled','disabled').addClass('grey_btn');
				$('#button_next').attr('disabled','disabled').removeClass('green_btn').addClass('grey_btn');
				{if $cades_sign}
				if ($('#cadesButtonNext').length) {
					$('#cadesButtonNext').attr('disabled','disabled').removeClass('green_btn').addClass('grey_btn');
				}
				{/if}
			}
		}
	}).trigger('change');
});

</script>
{/if}