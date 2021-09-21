<div class="wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
	{if isset($label)}
		<label {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
	{/if}
	<div class="holder">
		<select style="width: 100%" class="switch{if isset($class)} {$class}{/if}"{if isset($id)} id="{$id}"{/if} name="{if isset($name)}{$name}{/if}"data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}>
			{if isset($items) && count($items) eq 2}
				{foreach from=$items item=item_name key=item_key}
					{if isset($value) && ($item_key eq $value)}
						<option value="{$item_key}" selected>{$item_name}</option>
					{else}
						<option value="{$item_key}">{$item_name}</option>
					{/if}
				{/foreach}
			{/if}
		</select>
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
	<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}"></div>
</div>