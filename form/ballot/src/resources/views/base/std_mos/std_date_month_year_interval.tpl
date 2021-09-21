{extends file="$base_template_path/std_mos/std_base_element.tpl"}

{block name="initialize" append}
	{$container_class="{$container_class} month_year_interval_select"}
{/block}

{block name="element"}
	{if !isset($name_from) && !isset($name_to) && isset($name_prefix)}
		{$name_from="{$name_prefix}_start{$name_suffix}"}
		{$name_to="{$name_prefix}_end{$name_suffix}"}
	{/if}
	{if !isset($id_from) && !isset($id_to) && isset($id)}
		{$id_from="{$id}-start"}
		{$id_to="{$id}-end"}
	{/if}

	<div class="d-flex">
		<div
			class="
				field
				field--lg
				field-width-md
				field--date
				mr-4
				{if isset($value_from)&&$value_from!==false}field--filled{/if} 

				holder
				holder-month
				element-control
				element-control-show-label
			"
		>
			<input
				class="
					form-control
					field__input
					{if isset($class)}{$class}{/if}
					{if isset($value_from) && $value_from!==false}valid{/if}

					element-input
					master-field
					month-year-picker-interval
					month-year-picker-interval-start
					hasDatepicker
				"
				autocomplete="off"
				data-mask="99.9999"
				type="text"
				data-pattern=".{ldelim}7,7{rdelim}" 
				name="{if $name_from}{$name_from}{/if}"
				value="{if isset($value_from) && $value_from!==false}{$value_from}{/if}" 
				data-validatefunction="{if $validator_from}{$validator_from} {/if}month_year_interval_valid" 
				{if isset($id_from) && $id_from}id="{$id_from}"{/if}
				{if $disabled}disabled="disabled"{/if}
				{if $readonly}readonly="readonly"{/if}
				data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
				{if isset($required) && $required}required="required"{/if}
				{if $placeholder}placeholder="{$placeholder}"{/if}
			/>
			<label class="control-label field__label">
				<span class="field__label-inner">{if isset($label_from) && $label_from}{$label_from}{else}Дата начала{/if}{if isset($required) && $required}<span class="required"></span>{/if}</span>
			</label>
			<div class="field__clear">
			</div>
		</div>

		<div
			class="
				field
				field--lg
				field--date
				{if isset($value_to)&&$value_to!==false}field--filled{/if}
				field-width-md

				holder
				holder-month
				element-control
				element-control-show-label
			"
		>
			<input
				class="
					form-control
					field__input
					{if isset($class)}{$class}{/if}
					{if isset($value_to)&&$value_to!==false}valid{/if}

					element-input
					master-field
					month-year-picker-interval
					month-year-picker-interval-end
					hasDatepicker
				"
				autocomplete="off"
				data-mask="99.9999" type="text" data-pattern=".{ldelim}7,7{rdelim}" 
				name="{if $name_to}{$name_to}{/if}"
				value="{if isset($value_to)&&$value_to!==false}{$value_to}{/if}" 
				data-validatefunction="{if $validator_to}{$validator_to} {/if}month_year_interval_valid month_year_interval_not_less|.month-year-picker-interval-start" 
				{if isset($id_to)&&$id_to}id="{$id_to}"{/if}
				{if $disabled}disabled="disabled"{/if}
				{if $readonly}readonly="readonly"{/if}
				data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
				{if isset($required) && $required}required="required"{/if}
				{if $placeholder}placeholder="{$placeholder}"{/if}
			/>
			<label class="control-label field__label">
				<span class="field__label-inner">{if isset($label_to) && $label_to}{$label_to}{else}Дата окончания{/if}{if isset($required) && $required}<span class="required"></span>{/if}</span>
			</label>
			<div class="field__clear">
			</div>
		</div>
	</div>
{/block}