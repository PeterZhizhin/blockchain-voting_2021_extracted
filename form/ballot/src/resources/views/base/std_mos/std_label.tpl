<div class="{if isset($container_class)}{$container_class}{/if} label-group">
	{if isset($name)}
		<input
			{if isset($class)}class="{$class}"{/if}
			{if isset($id)}id="{$id}"{/if}
			type="hidden"
			name="{$name}"
			value="{$value}"
			{if isset($required) && $required}required="required"{/if}
		/>
	{/if}

	{if isset($label) && $label}
		<label {if isset($id) && $id}for="{$id}"{/if} class="{$label_class}">
			{$label} {if isset($required) && $required}<span class="required"></span>{/if}
		</label>
	{/if}

	{if isset($text) && $text!==false}
	<div {if isset($text_class)&&$text_class}class="{$text_class}"{/if}>
		{$text}
	</div>
	{/if}

	{include file="$base_template_path/std_mos/std_hint.tpl"}
</div>
