{if $mosDesign}
    {include file="$base_template_path/std_mos/std_label.tpl"}
{else}
<div class="row wrap valid label {if isset($container_class)} {$container_class}{/if} {if !$label}no-legend{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
	{if isset($text)&&$text!==false}
		{if isset($label)&&$label}<label class="col-md-3 col-sm-4 col-xs-10" {if isset($id)&&$id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
		<div class="holder col-md-8 col-sm-7 col-xs-12">
			{if isset($name)}<input{if isset($class)} class="{$class}"{/if}{if isset($id)} id="{$id}"{/if} type="hidden" name="{$name}" value="{$value}"{if isset($required) && $required} required="required"{/if}/>{/if}
			<p{if isset($text_class)&&$text_class} class="{$text_class}"{/if}>{$text}</p>
		</div>
	{else}
		<div class="holder col-md-8 col-sm-7 col-xs-12">
			{if isset($name)}<input{if isset($class)} class="{$class}"{/if}{if isset($id)} id="{$id}"{/if} type="hidden" name="{$name}" value="{$value}"{if isset($required) && $required} required="required"{/if}/>{/if}
			<label {if isset($id)}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
			
		</div>
	{/if}
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
{/if}