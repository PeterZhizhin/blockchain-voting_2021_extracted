{if !isset($type)}{$type = 'text'}{/if}
<div class="form-horizoontal row wrap timeselect"{if isset($container_id)} id="{$container_id}"{/if}>
	<label class="col-md-3 col-sm-4 col-xs-12" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
	<div class="holder col-md-8 col-sm-7 col-xs-10" >
		{if $type == 'text'}
        <div class="col-md-3 col-sm-6 col-xs-12">
			<div class="text from">с</div> <input class="form-control" {if isset($timefrom_class)} class="{$timefrom_class}"{/if}{if $id} id="{$id}_from"{/if} {if $timefrom_disabled}disabled{/if} type="text" name="{$timefrom_name}" value="{if isset($timefrom_value)}{$timefrom_value}{/if}"
			 data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
					 {if !isset($timefrom_pattern)}
						{if isset($timefrom_minlength) || isset($timefrom_maxlength)}
							 data-pattern=".{ldelim}{if isset($timefrom_minlength)}{$timefrom_minlength}{else}0{/if}{if isset($timefrom_maxlength)},{$timefrom_maxlength}{/if}{rdelim}"
						{/if}
					{else}
						 {if isset($timefrom_pattern)} data-pattern="{$timefrom_pattern}"{/if}
					{/if}
					{if isset($timefrom_mask)}data-mask="{$timefrom_mask}"{/if}{if isset($timefrom_required) && $timefrom_required} required{/if}{if isset($timefrom_placeholder)} placeholder="{$timefrom_placeholder}"{/if}
					{if isset($timefrom_validator)} data-validatefunction="{$timefrom_validator}"{/if}/>
        </div>        
        <div class="col-md-3 col-sm-6 col-xs-12">
		<div class="text text2">до</div> <input class="form-control" {if isset($timeto_class)} class="{$timeto_class}"{/if}{if $id} id="{$id}_to"{/if} {if $timeto_disabled}disabled{/if} type="text" name="{$timeto_name}" value="{if isset($timeto_value)}{$timeto_value}{/if}"
			 data-error-message="{if isset($timeto_error_message)}{$timeto_error_message}{else}Поле заполнено некорректно{/if}"
					 {if !isset($timeto_pattern)}
						{if isset($timeto_minlength) || isset($timeto_maxlength)}
							 data-pattern=".{ldelim}{if isset($timeto_minlength)}{$timeto_minlength}{else}0{/if}{if isset($timeto_maxlength)},{$timeto_maxlength}{/if}{rdelim}"
						{/if}
					{else}
						 {if isset($timeto_pattern)} data-pattern="{$timeto_pattern}"{/if}
					{/if}
{if isset($timeto_mask)}data-mask="{$timeto_mask}"{/if}{if isset($timeto_required) && $timeto_required} required{/if}{if isset($timeto_placeholder)} placeholder="{$timeto_placeholder}"{/if}
{if isset($timeto_validator)} data-validatefunction="{$timeto_validator}"{/if}/>
		{else}
        </div>        
        <div class="col-md-3 col-sm-6 col-xs-12">
			<div class="text from">с</div> <select name="{$timefrom_name}" class="chosen{if isset($context_search) && $context_search} context-search{/if}{if isset($class)} {$class}{/if}"{if isset($multiple)} multiple="multiple"{/if}{if isset($id)} id="{$id}_from"{/if} name="{if isset($name)}{$name}{/if}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}>
<option value=""></option>
{if isset($from_values)}
	{foreach from=$from_values item=item_name key=item_key}
		{if isset($value) && ($item_key eq $value)}
			<option value="{$item_key}" selected>{$item_name}</option>
		{else}
			<option value="{$item_key}">{$item_name}</option>
		{/if}
	{/foreach}
{/if}
</select> 
        </div>
        
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="text text2">до</div>
			<select name="{$timeto_name}" class="chosen{if isset($context_search) && $context_search} context-search{/if}{if isset($class)} {$class}{/if}"{if isset($multiple)} multiple="multiple"{/if}{if isset($id)} id="{$id}_to"{/if} name="{if isset($name)}{$name}{/if}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}>
<option value=""></option>
{if isset($to_values)}
	{foreach from=$to_values item=item_name key=item_key}
		{if isset($value) && ($item_key eq $value)}
			<option value="{$item_key}" selected>{$item_name}</option>
		{else}
			<option value="{$item_key}">{$item_name}</option>
		{/if}
	{/foreach}
{/if}
</select>
        </div>
		{/if}
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
</div>
<div class="col-md-1 col-sm-1 col-xs-2">
<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}{if isset($postscriptum)} postscriptum{/if}">
{if isset($postscriptum)}{$postscriptum}{/if}
</div>
    </div>
</div>
