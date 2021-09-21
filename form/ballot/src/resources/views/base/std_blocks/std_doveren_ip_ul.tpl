<!-- date:2014-11-17 -->
{assign var=prefix value=$prefix|default:''}
{assign var=title value=$title|default:'Статус заявителя'}
{assign var=id value=$id|default:'user_proxy_block_ip_ul'}

{assign var=counter_js value=$counter_js|default:'file_counter'}
{assign var=files_index value=$files_index|default:'1999'}

{assign var=hint_text_dov_document value=$hint_text_dov_document|default:"Исходный файл должен быть формата pdf. Файл должен быть подписан прикрепленной подписью. Формат: `$doveren_documents.extensions|replace:',':', '`. Размер файла до `$doveren_documents.maxSizeStr`"}
<style type="text/css">
.text-hint {
	font-style: italic;
	font-size: 0.8em;
}
</style>

<fieldset id="{$id}" class="form-block info_dov_block">
	<legend>{$title}</legend>
	{array vars="array('2' => 'Да','1' => 'Нет')" assign="doveren_dict"}

	{include file="$base_template_path/std_blocks/std_radiogroup.tpl" layout="horizontal" class="{$id}_use_dov_ip_ul" id="{$id}_use_dov_ip_ul" items=$doveren_dict label="Заявитель действует по доверенности" required=true name="field[internal.{$prefix}use]" value="1"}

	<div class="{$id}_dov_ul_ip">
		{if $show_ip}
			{array vars="array('0' => 'Юридическое лицо','1' => 'Индивидуальный предприниматель')" assign="holder_dict"}

			{include file="$base_template_path/std_blocks/std_radiogroup.tpl" class="{$id}_int_ip_no" layout="horizontal" id="{$id}_int_ip_no" items=$holder_dict label="Правообладатель" required=true name="field[internal.{$prefix}is_ip]" value="0"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="Фамилия" container_class="{$id}_info_ip" name="field[{$prefix}new_lastname]" id="{$id}_dov_f" required="required" maxlength="50"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="Имя" container_class="{$id}_info_ip" id="{$id}_dov_i" name="field[{$prefix}new_firstname]" required="required" maxlength="50"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="Отчество" container_class="{$id}_info_ip" id="{$id}_dov_o" name="field[{$prefix}new_middlename]" required="required" maxlength="50"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="ИНН" container_class="{$id}_info_ip" id="{$id}_dov_inn_ip" name="field[{$prefix}new_inn_ip]" required="required" minlength="12" maxlength="12" mask="999999999999"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="ОГРНИП" container_class="{$id}_info_ip" id="{$id}_dov_ogrnip" name="field[{$prefix}new_ogrnip]" required="required" mask="999999999999999" minlength="15" maxlength="15"}
		{/if}

		{if $show_dov_ul_all_fields}
			{include file="$base_template_path/std_blocks/std_textarea.tpl" container_class="{$id}_info_ul" label='Правообладатель (полное наименование)' name="field[{$prefix}new_holder_name]" id="{$id}_fullname" required="required" maxlength="250"}

			{include file="$base_template_path/std_blocks/std_text.tpl" container_class="{$id}_info_ul" label="ИНН" name="field[{$prefix}new_inn]" id="{$id}_dov_inn_ul" required="required" minlength="10" maxlength="10" validator="checkInn" hint="1234567890" mask="9999999999"}

			{include file="$base_template_path/std_blocks/std_text.tpl" container_class="{$id}_info_ul" label="ОГРН" name="field[{$prefix}new_ogrn]" id="{$id}_dov_ogrn_ul" required="required" minlength="13" maxlength="13" hint="1234567890123" mask="9999999999999"}

			{include file="$base_template_path/std_blocks/std_text.tpl" label="Контактный телефон" name="field[{$prefix}new_phone]" id="{$id}_dov_phone" required="required" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num" hint="(495) 757-77-77"}

			{if $show_add_tel}
				{include file="$base_template_path/std_blocks/std_text.tpl" label="Дополнительный контактный телефон" name="field[internal.tel_dov.1]" id="{$id}_dov_phone1" minlength="15" maxlength="250" mask="(999) 999-99-99" placeholder="Введите номер телефона" validator="phone_num"}
			{/if}

			{include file="$base_template_path/std_blocks/std_textarea.tpl" label='Почтовый индекс и адрес' name="field[{$prefix}new_adress]" id="{$id}_dov_address" required="required" maxlength="250" hint="112580, Москва. 2-й Кожевнический пер."}

			{if $show_email}
				{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес электронной почты" name="field[{$prefix}new_email]" id="{$id}_dov_email" required="required" maxlength="100"  validator="email" placeholder="login@mail.ru" hint="login@mail.ru"}
			{/if}
		{/if}

		{include file="$base_template_path/std_blocks/std_label.tpl" label="Документы, подтверждающие право заявителя действовать от имени правообладателя, заверенные ЭП"}

		{capture name='document_dov'}
			<input type="hidden" name="field[internal.staff][]" value="block_user_proxy_ul$<%=multiblockCounter%>">
			{include file="$base_template_path/std_blocks/std_document.tpl"
				class="doveren_documents"
				id="{$id}_doc_<%=multiblockCounter%>"
				document_index="<%=multiblockCounter%>"
				document_kind="10002"
				document_name="б/н"
				label="Электронная копия документа"
				required=true
				hint_header="Какого формата необходим файл?" 
				hint_text="$hint_text_dov_document"
			}

			{include file="$base_template_path/std_blocks/std_label.tpl" label="<span class=\"text-hint\">{$hint_text_dov_document}</span>"}

			<div class="r_button" style="display:none">
				<a href="#" class="button del_dov_document">Удалить</a>
			</div>
		{/capture}

		{include file="$base_template_path/std_blocks/std_document.tpl" id="{$id}_doc_{$files_index}" class="doveren_documents" label="Электронная копия документа" document_index="{$files_index}" document_kind="10002" document_name="б/н" required="required" hint_header="Какого формата необходим файл?" hint_text="$hint_text_dov_document"}
		
		{include file="$base_template_path/std_blocks/std_label.tpl" label="<span class='text-hint'>{$hint_text_dov_document}</span>"}

	</div>
</fieldset>

<div class="{$id}_dov_ul_ip {$id}_dov_docs {$counter_js}">
	<div id="{$id}_dov_docs_draft"></div>
	{include file="$base_template_path/std_blocks/std_multiblock.tpl" inner="{$smarty.capture.document_dov}" block_id="{$id}_add_docs" add_text="Добавить документ"}
</div>

<script type="text/javascript">

OPR.FormLoader.addListener('block_user_proxy_ul', function(object, fields){
	var new_file_counter = parseInt(object[1]);

	$("#{$id}_dov_docs_draft").append("<fieldset class='form-block' id='box"+new_file_counter+"'>"+OPR.templater('multiblockblocktemplate{$id}_add_docs', { multiblockCounter:new_file_counter})+"</fieldset>");
	$("#box"+new_file_counter).find(".multiblock-save-cancel").remove();
	$("#box"+new_file_counter).find(".r_button").show();
	FormController.initialize($('#box'+new_file_counter));

	if ({$counter_js} < new_file_counter) {
		{$counter_js} = new_file_counter;
	}
});

$(document).ready(function() {
{if $show_ip}
	$(".{$id}_int_ip_no").on('change', function() {
		if ($(".{$id}_int_ip_no:checked").val() == '1') {
			$(".{$id}_info_ip").show();
			$(".{$id}_info_ul").hide();
		} else {
			$(".{$id}_info_ip").hide();
			$(".{$id}_info_ul").show();
		}
	}).trigger("change");
{/if}
	$(".{$id}_use_dov_ip_ul").on('change', function() {
	  if ($(".{$id}_use_dov_ip_ul:checked").val() == '2') {
			$(".{$id}_dov_ul_ip").show();
			{if $show_ip}
			$(".{$id}_int_ip_no").trigger("change");
			{/if}
	  } else {
			$(".{$id}_dov_ul_ip").hide();
	  }
	}).trigger("change");

	$('.{$counter_js} .multiblock-control a.block-button').data('increment-function', function(action, counter) {
		switch (action) {
			case 'init' :
				{$counter_js}++;
				if (typeof FormController.dynamicCounters[counter] === 'undefined')
					FormController.dynamicCounters[counter] = {$counter_js};
				break;
			case 'get':
				FormController.dynamicCounters[counter] = {$counter_js};
				return FormController.dynamicCounters[counter];
			case 'next':
				FormController.dynamicCounters[counter] = {$counter_js};
				break;
		}
	});

	$(document).on('click','.del_dov_document', function() {
		var cancel_click = $(this).parents('.form-block:first').find('.multiblock-cancel');

		if (cancel_click.length) {
			cancel_click.trigger('click');
		} else {
			$(this).parents('.form-block:first').remove();
		}

		return false;
	});

	$('.{$id}_dov_docs .multiblock-control').on('click', function() {
		$('.{$id}_dov_docs .multiblock-save-cancel .multiblock-save').on('click', function() {
			var $inputBlock = $(this).data('template-block');
			var $form = $(this).closest('form');
			var $fields = $inputBlock.find('input, textarea, select');

			for (var i = 0, count = $fields.length; i < count; ++i) {
				if (!($($fields.get(i)).is($form.data('validator').settings.ignore)) && !($($fields.get(i)).valid()))
					return false;
			}

			$(this).closest('fieldset').find('.r_button').show();
		});
	});
});
</script>