{if $mosDesign}
    {include file="$base_template_path/std_mos/std_timeslider.tpl"}
{else}
{if !isset($timefrom_value)}{$timefrom_value = '08:00'}{/if}
{if !isset($timeto_value)}{$timeto_value = '20:00'}{/if}
{if !isset($timemin)}{$timemin = '06:00'}{/if}
{if !isset($timemax)}{$timemax = '22:00'}{/if}
{if !isset($timestep)}{$timestep = '15'}{/if}

<div class="form-horizoontal row wrap timeslider"{if isset($container_id)} id="{$container_id}"{/if}>
	<label class="col-md-3 col-sm-4 col-xs-10" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
	<div class="holder col-md-8 col-sm-7 col-xs-12" >
		<input type="hidden" class="timestep" value="{$timestep}" />
		<input type="hidden" class="timemin" value="{$timemin}" />
		<input type="hidden" class="timemax" value="{$timemax}" />
		<input type="hidden" class="timeslider_from_value" name="{$timefrom_name}" value="{$timefrom_value}" />
		<input type="hidden" class="timeslider_to_value" name="{$timeto_name}" value="{$timeto_value}" />
		<div class="timefrom_display"></div><div class="timeselect_slider"></div>
		<div class="timeto_display"></div>
	</div>
</div>
{*
id, label, container_id, required - как обычно
timefrom_name - строка, название поля даты начала
timeto_name - строка, название поля даты окончания
timestep - число в минутах, от 1 до 60 - шаг слайдера
timemax - максимально возможное время в формате ЧЧ:ММ
timemin - минимально возможное время в формате ЧЧ:ММ
timefrom_value - указанное время начала
timeto_value - указанное время окончания
*}
{/if}