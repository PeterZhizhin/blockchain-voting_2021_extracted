{if $mosDesign}
    {include file="$base_template_path/std_mos/std_serial_number.tpl"}
{else}
	{if !isset($required)}{$required = true}{/if}

<div class="form-horizoontal person serial_number row wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)&&$container_id} id="{$container_id}"{/if}{if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
	{if $autocomplete_from}
		<input type="hidden" class="series_number_autocomplete master-field" name="{if isset($field_name)}{$field_name}{else}{$serial_name|replace:'field[':'field[internal.'}{/if}" data-series-name="{$serial_name}" data-number-name="{$number_name}"
		       data-series-min-len="{if isset($serial_minlength)}{$serial_minlength}{else}0{/if}" 
		       data-series-max-len="{if isset($serial_maxlength)}{$serial_maxlength}{else}0{/if}" 
		       data-number-min-len="{if isset($number_minlength)}{$number_minlength}{else}0{/if}" 
		       data-number-max-len="{if isset($number_maxlength)}{$number_maxlength}{else}0{/if}" 
		       value=""/>
	{/if}
	<label class="col-md-3 col-sm-4 col-xs-10" {if isset($id)&&$id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
	<div class="holder col-md-8 col-sm-7 col-xs-12">
        <div class="col-md-3 col-sm-4 col-xs-6">
		<input class="form-control {if isset($serial_class)&&$serial_class}{$serial_class}{/if}" style="max-width: 115px" {if isset($serial_class)&&$serial_class} class="{$serial_class}"{/if}{if isset($id)&&$id} id="{$id}"{/if} {if $serial_disabled}disabled{/if} type="text" name="{if isset($serial_name)}{$serial_name}{/if}" value="{if isset($serial_value)}{$serial_value}{/if}"
			 data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" 
					 {if !isset($serial_pattern)}
						{if isset($serial_minlength) || isset($serial_maxlength)}
							 data-pattern=".{ldelim}{if isset($serial_minlength)}{$serial_minlength}{else}0{/if}{if isset($serial_maxlength)},{$serial_maxlength}{/if}{rdelim}"
						{/if}
					{else}
						 {if isset($serial_pattern)} data-pattern="{$serial_pattern}"{/if}
					{/if}
					{if isset($serial_minlength)}
						minlength="{$serial_minlength}"
					{/if}
					{if isset($serial_maxlength)}
						maxlength="{$serial_maxlength}"
					{/if}
					{if isset($serial_mask)}data-mask="{$serial_mask}"{/if}{if isset($serial_required) && $serial_required} required="required"{/if}{if isset($serial_placeholder)} placeholder="{$serial_placeholder}"{/if}
					{if isset($serial_validator)} data-validatefunction="{$serial_validator}"{/if}/>
          <div class="withClearBox"></div>
        </div>
      
        <div class="col-md-3 col-sm-4 col-xs-6">
		<input class="form-control {if isset($number_class)}{$number_class}{/if}" style="max-width: 115px" {if isset($number_class)} class="{$number_class}"{/if}{if isset($number_id)} id="{$number_id}"{/if} {if $number_disabled}disabled{/if} type="text" name="{if isset($number_name)}{$number_name}{/if}" value="{if isset($number_value)}{$number_value}{/if}"
			 data-error-message="{if isset($number_error_message)}{$number_error_message}{else}Поле заполнено некорректно{/if}" 
					 {if !isset($number_pattern)}
						{if isset($number_minlength) || isset($number_maxlength)}
							 data-pattern=".{ldelim}{if isset($number_minlength)}{$number_minlength}{else}0{/if}{if isset($number_maxlength)},{$number_maxlength}{/if}{rdelim}"
						{/if}
					{else}
						 {if isset($number_pattern)} data-pattern="{$number_pattern}"{/if}
					{/if}
					{if isset($number_minlength)}
						minlength="{$number_minlength}"
					{/if}
					{if isset($number_maxlength)}
						maxlength="{$number_maxlength}"
					{/if}
{if isset($number_mask)}data-mask="{$number_mask}"{/if}{if isset($number_required) && $number_required} required="required"{/if}{if isset($number_placeholder)} placeholder="{$number_placeholder}"{/if}
{if isset($number_validator)} data-validatefunction="{$number_validator}"{/if}/>
        <div class="withClearBox"></div>
        </div>
        
</div>
<div class="col-md-1 col-sm-1 col-xs-2">
<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}{if isset($postscriptum)} postscriptum{/if}">
    {if isset($hint) || isset($hint_text)}
	<div class="hint hint-left">

			{if isset($hint)}
				{$hint}
			{else}
				<p class="header">{$hint_header}</p>
				<p>{$hint_text}</p>
			{/if}
			<div class="close"></div>
		</div>
	{/if}
	{if isset($postscriptum)}{$postscriptum}{/if}
	</div>
		</div>
	</div>
{/if}