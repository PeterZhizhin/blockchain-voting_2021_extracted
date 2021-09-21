{*
Параметры вызова шаблона:
$id =	id блока-контейнера
$contact = "declarant" -- префикс контакта
$validate = true -- проверять обязательность
$default = 643 -- страна по умолчанию, 643= Россия
*}
{literal}
<script type="text/javascript">
$(document).ready(function(){
		attachCountryProcessing($('#{/literal}{$id}{literal}'),{
			validate: {/literal}{if !$validate}true{else}{$validate}{/if}{literal},
			default_: {/literal}{if !$default}643{else}{$default}{/if}{literal}
		});
});
</script>
{/literal}
<div id='{$id}'>
<input type="hidden" name="field[internal.staff][]" value="country_select${$contact}${$id}">
<table class="free_column">
	<tr>
		<td class="padding_bottom">Гражданство:{if $validate}<span class="required">*</span>{/if}</td>
		<td class="padding_bottom padding_right">
			<input  type="text" value="" class='CountryInput' name='{$contact}.CountryInput'>
			<input type="hidden" name="field[{$contact}.new_citizenship]" class="Country">
		</td>
		<td></td>
	</tr>
</table>
</div>