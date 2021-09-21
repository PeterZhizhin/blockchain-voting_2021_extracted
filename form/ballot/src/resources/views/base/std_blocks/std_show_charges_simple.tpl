{if not $prefix}
	{assign var="prefix" value="file.1"}
{/if}
{if not $id}
	{assign var="block_id" value="charges"}
{/if}
{literal}
	<script type="text/javascript">
		if (chargesNotAllowed == 'undefined')
			var chargesNotAllowed = [];

		function loadCharges(async) {
			
			$('#{/literal}{$block_id}_block{literal} .charges-loader').show();
			$('#{/literal}{$block_id}{literal} select').empty();
			$('#{/literal}{$block_id}{literal} select').append(
				OPR.templater('chargeTemplate', {
				chargeId: '',
				chargeExtId: '',
				chargeDesc: 'Идет подгрузка начислений...'
			})).trigger('chosen:updated');
	
				$.ajax({
				url: document.location,
				type: 'POST',
				dataType: 'json',
				async:async,
				data: {
					ajaxModule: 'RNiP',
					ajaxAction: 'searchChargesByServiceCode',
					service_code: '{/literal}{$service_code}{literal}',
					draft_id: (typeof(draftId) != "undefined")?draftId:false
				},
				success: function(data) {
					if (data && data.length !== undefined && data.length > 0 && !data.error) {
						$('#{/literal}{$block_id}{literal} select').empty().append(
							OPR.templater('chargeTemplate', {
							chargeId: '',
							chargeExtId: '',
							chargeDesc: 'Выберите начисление...'
						})
							);
						chargesNotAllowed = [];
						for (idx in data) {
							var chargeData = data[idx];
							if (chargeData.paymentsCount > 1)
								chargesNotAllowed.push(chargeData.id);
							chargeData.totalRub = Math.floor(chargeData.amount / 100);
							var kop = chargeData.amount % 100;
							chargeData.totalKop = kop < 10 ? '0' + kop : kop;
							$('#{/literal}{$block_id}{literal} select').append(
								OPR.templater('chargeTemplate', {
								chargeId: chargeData.id,
								chargeExtId: chargeData.extId,
								chargeDesc: chargeData.desc + ' (Сумма: ' + chargeData.totalRub + ' руб. ' + chargeData.totalKop + 'коп.)'
							}));
						}
						$('#{/literal}{$block_id}{literal} select option').each(function(idx, element) {
							if ($.inArray($(element).val(), chargesNotAllowed) >= 0) {
								$(element).css('color', '#999').attr('disabled','disabled');

							}
							else $(element).removeAttr('disabled');
						});
						if($('#{/literal}{$block_id}{literal} option').length > 1) $('#{/literal}{$block_id}{literal} select option').eq(1).attr('selected','selected');

						$('#{/literal}{$block_id}{literal} select').trigger('chosen:updated');
					} else {
						if (data.error) {
							if (data.info)
								data.error += '<br/>' + data.info;
							messagebox(data.error);
						} else {
							$('#{/literal}{$block_id}{literal} select').empty().append(
								OPR.templater('chargeTemplate', {
								chargeId: '',
								chargeExtId: '',
								chargeDesc: 'Не найдено ни одного начисления...'
							}));
							$('#{/literal}{$block_id}{literal} select').trigger('chosen:updated');
							//$('#{/literal}{$block_id}{literal}-no-result').prop('disabled', false).show().val('Не найдено ни одного начисления...');
						}
					}
				},
				complete: function(XHR, status) {
					$('#{/literal}{$block_id}_block{literal} .charges-loader').hide();
				}
			});
		}
		$(document).ready(function() {
			if ($('#make-charge-form').length == 0) { // если формы нет предопределенной
				$('<form/>', {id: 'make-charge-form'}).css('display', 'none').appendTo($('body'));
			} else {
				$('#make-charge-form').appendTo($('body'));
			}
			$('#make-charge-form').attr({action: '', method: 'post', target: '_blank'}).css('display', 'none');
			$('#make-charge-form').submit(function() {
				var form = $(this);
				form.attr('action', '{/literal}{$CFG_MAIN_HOST}{literal}/ru/application/charges/search/?service={/literal}{$service_code}{literal}');
				{/literal}{if $predefined_values}
				{foreach from=$predefined_values key=k item=v}
					{foreach from=$v key=ke item=val}{literal}
						if (form.find('input[name="{/literal}{$k}[{$ke}]"]{literal}').length == 0)
							form.append($('<input/>', {type: 'hidden', name: '{/literal}{$k}[{$ke}]{literal}', value: ''}));
						form.find('input[name="{/literal}{$k}[{$ke}]{literal}"]').val('{/literal}{$val}{literal}');
					{/literal}{/foreach}
				{/foreach}
				{/if}{literal}
				if (form.find('input[name="AMOUNT_TO_PAY"]').length == 0)
					form.append($('<input/>', {type: 'hidden', name: 'AMOUNT_TO_PAY', value: ''}));
				form.find('input[name="AMOUNT_TO_PAY"]').val('{/literal}{$cost}{literal}');
			});
			$('.charge').change(function() {
				var chargeUIN = $(this).find('option:selected').attr('rel');
				if ($.inArray($(this).find('option:selected').val(), chargesNotAllowed) >= 0) {
					messagebox('<div style="text-align: center;">\n\
						По данному начислению зарегистрировано несколько платежей.<br/>\n\
						Распечатайте квитанцию <a target="_blank" href="{$CFG_MAIN_HOST}/ru/application/charges/list/?uin=' + chargeUIN + '">со страницы начисления</a> и обратитесь в организацию, предоставляющая услугу, напрямую.\n\
					</div>');
					$(this).val('').trigger('chosen:updated');
				}
				else {
					var input = $(this).closest('.payment_block').find('.draft');
					var temp = input.val().split('$');
					input.val(temp[0]+'$'+$(this).find('option:selected').val());
				}
			});
{/literal}{if $autoload}loadCharges(false);{/if}{literal}
{/literal}{if $service_code}$('#make-charge-link').attr('href', '{$CFG_MAIN_HOST}/ru/application/charges/search/?service={$service_code}');{/if}{literal}

		});
</script>
<script type="text/html" id="chargeTemplate">
	<option value="<%=chargeId%>" rel="<%=chargeExtId%>"><%=chargeDesc%></option>
</script>
{/literal}


{if not $compact}			
<fieldset id="{$block_id}_block" class="{if isset($container_class)}{$container_class}{else}form-block{/if} payment_block {if !isset($title)}no-legend{/if}">
		{if isset($title)}<legend>{$title}</legend>{/if}
		<input type='hidden' class="draft" name='field[internal.staff][]' value='{$block_id}$'>
		<img src="{$CFG_MEDIA_HOST}/common/img/base/loader.gif" style="display:none; position: absolute; width: 200px; height: 20px; margin: -30px 0px 0px 420px; z-index: 1;" class="charges-loader" />
{/if}
		{if $documentkind}
			<input type="hidden" name="field[{$prefix}.documentkind]" value="{$documentkind}"/>
		{/if}
		{if $new_name}
			<input type="hidden" name="field[{$prefix}.new_name]" value="{$new_name}"/>
		{/if}
		
		<div class="wrap{if $container_class} {$container_class}{/if}"{if $block_id} id="{$block_id}"{/if}{if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
			{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="info" color="orange" text="После оплаты госпошлины нажмите на ссылку «Обновить» и выберите начисление."}	
			{include file="$base_template_path/std_blocks/std_select.tpl" class="charge" required="required"  name="field[{$prefix}.charge_id]" label="Выбор оплаченного начисления:" hint="Для отображения нового начисления нажмите на кнопку \"обновить\""}
            <div class="row">
			<div class="col-lg-offset-6 col-lg-3 col-md-offset-3 col-md-5 col-sm-7 col-xs-12">
			<a href="#" class="pay_btn button green-small" target="_blank" onclick="$('#make-charge-form').submit(); return false;">Оплатить через портал</a>
            </div>
            <div class="col-lg-offset-1 col-lg-2 col-md-offset-1 col-md-3 col-sm-5 col-xs-12">
			<a href="#" class="refresh_btn button" onclick="loadCharges(); return false;">Обновить</a>
		</div>
            </div>

{if not $compact}
</fieldset>
{/if}

