{* 
	data = { 
		layout : 'horizontal', 
		label : 'optional',
		name : '',
		id : '',
		required : false, 
		containerClass : 'optional', 
		containerID : 0, 
		hintClass : 'optional',
		hintText : 'optional',
		value : 'default',
		items = {
			'value' : { 
				name : '', 
				attr : 'key="value"'
			},
			 
		}
	};
*}
{if isset($items)}
{*	{if isset($layout) && $layout eq 'horizontal'} *}
		<div class="wrap button_group{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
{*			{if isset($label) }<label {if $id}for="{$id}"{/if}>{$label}{if isset($required)}<span class="required">*</span>{/if}</label>{/if} *}
			<div class="holder">
				{foreach from=$items item=item_name key=item_key}
					{if isset($value) && ($item_key eq $value)}
						<input type="radio"{if isset($class)} class="{$class}"{/if} id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if $required} required{/if}/>
					{else}
						<input type="radio"{if isset($class)} class="{$class}"{/if} id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if $required} required{/if}/>
					{/if}
				{/foreach}
				{foreach from=$items item=item_name key=item_key}
					<div class="button_link">
					{if isset($value) && ($item_key eq $value)}
						<a href="#" class="button checked" data-buttongroup="{if isset($name)}{$name}{/if}" data-buttonfor="#{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</a>
					{else}
						<a href="#" class="button" data-buttongroup="{if isset($name)}{$name}{/if}" data-buttonfor="#{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</a>
					{/if}
					</div>
				{/foreach}
			</div>
			<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}"></div>
		</div>
{*	{else}
		{foreach from=$items item=item_name key=item_key name=radio_foreach}
			<div class="wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
				<div class="holder">
					{if isset($value) && ($item_key eq $value)}
						<input type="radio"{if isset($class)} class="{$class}"{/if} id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if $smarty.foreach.radio_foreach.first && isset($required)} required{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
					{else}
						<input type="radio"{if isset($class)} class="{$class}"{/if} id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if $smarty.foreach.radio_foreach.first && isset($required)} required{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
					{/if}
				</div>
				<div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}"></div>
			</div>
		{/foreach}
	{/if} *}
{/if}


