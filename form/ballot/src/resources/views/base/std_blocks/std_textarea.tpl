<div class="row form-horizoontal wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if} {if isset($autocomplete_from)&& $autocomplete_from && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
	{if !empty($label)}<label class="col-md-3 col-sm-4 col-xs-10" {if $id}for="{$id}"{/if}  style="vertical-align:top !important">{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
	<div class="holder {if !empty($label)}col-md-8 col-sm-7 col-xs-12{else}col-md-12 col-sm-12 col-xs-12{/if}">
		<textarea {if isset($maxlength)}maxlength="{$maxlength}"{/if} class="form-control {if isset($class)}{$class} {/if}master-field"{if isset($id)} id="{$id}"{/if} name="{if isset($name)}{$name}{/if}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}" {if !isset($pattern)} {if isset($minlength) || isset($maxlength)} pattern=".{ldelim}{if isset($minlength)}{$minlength}{else}0{/if},{if isset($maxlength)}{$maxlength}{/if}{rdelim}"{/if}{else}{if isset($pattern)} pattern="{$pattern}"{/if}{/if}{if isset($mask)}data-mask="{$mask}"{/if}{if isset($required) && $required} required="required"{/if}{if isset($validator)} data-validatefunction="{$validator}"{/if}{if isset($placeholder)} placeholder="{$placeholder}"{/if}>{if isset($value)}{$value}{/if}</textarea>
{if isset($hint) || isset($hint_text)}
	
{/if}
</div>

 <div class="col-md-1 col-sm-1 col-xs-2">
	<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}">
		<div class="hint hint-left">
			{if isset($hint)}
				{$hint}
			{else}
				<p class="header">{$hint_header}</p>
				<p>{$hint_text}</p>
			{/if}
		<div class="close"></div>
		</div>
		
		
  </div> 
	
</div>
	
</div>
