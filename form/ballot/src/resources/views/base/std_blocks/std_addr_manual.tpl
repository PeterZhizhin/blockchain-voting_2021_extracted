{*
prefix, no_flat

$this->smarty->assign('moscowDistrictsJs', OMKTE::getDistrictsForJS());
*}
{assign var=postfix value="{$prefix|replace:'.':'_'|replace:'#':'_'}"}

<div class="addr_manual_block{if isset($container_class)} {$container_class}{/if}">
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Округ" name="field[{$prefix}.okrug]" class="manual_okrug" required=true items=$moscowAreas placeholder="Выберите..."}
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Район" name="field[{$prefix}.rayon]" class="manual_rayon" required=true placeholder="Выберите..."}
	{include file="$base_template_path/std_blocks/std_text.tpl" label="Улица" name="field[{$prefix}.street]" required=true placeholder="Улица" maxlength=250 class="manual_street"}
	<div class="wrap">
		<label>Дом<span class="required">*</span>/корпус/строение</label>
		<div class="holder">
			{assign var=message_error_hks value="Необходимо ввести номер дома или номер корпуса/строения"}
			<input type="text" style="width:28%; margin-right:10px;" name="field[{$prefix}.dom]" value="" placeholder="Дом" maxlength="50" class="house_korpus_stroenie house_korpus_stroenie{$postfix} manual_dom" data-error-message="{$message_error_hks}" validator="house_korpus_stroenie">&nbsp;
			<input type="text" style="width:28%; margin-right:10px;" name="field[{$prefix}.korpus]" value="" placeholder="Корпус" maxlength="50" class="house_korpus_stroenie house_korpus_stroenie{$postfix} manual_korpus" data-error-message="{$message_error_hks}" validator="house_korpus_stroenie">&nbsp;
			<input type="text" style="width:28%;" name="field[{$prefix}.stroenie]" value="" placeholder="Строение" maxlength="50" class="house_korpus_stroenie house_korpus_stroenie{$postfix} manual_stroenie" data-error-message="{$message_error_hks}" validator="house_korpus_stroenie">
		</div>
	</div>
	<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}"></div>
	{if empty($no_flat)}
	{include file="$base_template_path/std_blocks/std_text.tpl" label="Квартира" name="field[{$prefix}.room]" required=!(empty($validate_flat) || !$validate_flat) placeholder="Квартира" maxlength=15 class="manual_room" validator="flat"}
	{/if}
</div>
<script type="text/javascript">
	var manual_rayons = {if $moscowDistrictsJs}{$moscowDistrictsJs}{else}[]{/if};
	$(document).ready(function() {
		$.extend($.validator.messages, {
			house_korpus_stroenie: "Необходимо ввести номер дома или номер корпуса/строения",
		});
		$('.manual_okrug').on('change', function() {
			var val = $(this).val();
			if (!val) return;
			val = val.substr(0, 2);
			html = '<option value="">Выберите...</option>';
			for (k in manual_rayons[val]) {
			html += '<option value="' + val + manual_rayons[val][k].id +'">' + manual_rayons[val][k].name + '</option>';
		}
		$(this).closest('.addr_manual_block').find('.manual_rayon').html(html).trigger('chosen:update').trigger('change');
	});

//	$('[name="field[{$prefix}.dom]"], [name="field[{$prefix}.korpus]"], [name="field[{$prefix}.stroenie]"]').each(function() {
//		$(this).rules('add', { require_from_group: [1,".house_korpus_stroenie{$postfix}"] });
//	});

	});
	$.validator.addMethod("house_korpus_stroenie", function(value, element) {
		var block = $(element).parents('.wrap:first'),
			exist = false;

		block.find(".house_korpus_stroenie").each(function(){
			if($(this).val() != ""){
				exist = true;
				return false;
			}
		});

		if(exist){
			$(".house_korpus_stroenie").removeClass('error').addClass('valid').siblings('.error-message').hide();
		}

		return exist;
	});
</script>