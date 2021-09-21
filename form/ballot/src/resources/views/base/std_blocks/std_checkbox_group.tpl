{if !isset($name)}{$name = "field[new_checkbox.$counter]"}{/if}
<div class="row wrap checkbox_group{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>    
        {if isset($label)&&$label}
            {if $label_position eq 'top'}
                <label class="top col-md-12 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
                <div class="left col-md-11 col-sm-11 col-xs-10">           
            {else}        
                <label class="left col-md-3 col-sm-4 col-xs-12">{$label}</label>
                <div class="left col-md-8 col-sm-7 col-xs-10">
            {/if}
	{/if}        
        
	{foreach from=$items item=item key=k}

		<div class="holder checkbox">
                <input class="{if isset($class)}{$class}{/if}" id="{$id}_{$k}" value="{if isset($item.value) && $item.value!==false}{$item.value}{else}1{/if}" type="checkbox" name="{$name|replace:'$counter':{$k}}" {if isset($item.checked)&&$item.checked}checked="checked"{/if}  {if isset($item.vid)&&$item.vid}vid="{$item.vid}"{/if}  {if isset($item.disabled)&&$item.disabled}disabled="disabled"{/if} {if $validator} data-validatefunction="{$validator}"{/if} data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($item.required) && $item.required} required="required"{/if}/>

			{if isset($item.name)}<label for="{$id}_{$k}">{$item.name}{if isset($item.required) && $item.required && $required==false}<span class="required">*</span>{/if}</label>{/if}
		</div>		
	{/foreach}
	{if isset($label)&&$label}</div>{/if}
    <div class="col-md-1 col-sm-1 col-xs-2">
	<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}">
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
    </div>
</div>				

