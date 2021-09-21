{if $mosDesign}
    {include file="$base_template_path/std_mos/std_select.tpl"}
{else}
    <div class="form-horizoontal form-group {if !$no_row}row{/if} wrap{if isset($container_class)&&$container_class} {$container_class}{/if} {if isset($value)&&$value}valid{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
    {if $label}
        <label class="col-md-3 col-sm-4 col-xs-10" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
    {/if}

		<div class="holder {if !$label && !$no_row}col-md-offset-3 col-sm-offset-4{/if} {if $no_row}col-md-3 col-sm-3 col-xs-10{else}col-md-8 col-sm-7 {if !$label}col-xs-10{else}col-xs-12{/if} {/if}">
			<select {if (!isset($no_empty)||!$no_empty)&&(!isset($multiple)||!$multiple)}data-placeholder="{if $text}{$text}{else}Выбрать...{/if}"{/if}
				{if isset($value)&&$value!==false}data-prevalue="{$value}"{/if} {if $validator} data-validatefunction="{$validator}"{/if}  {if $max_select}data-chosen-max_selected_options="{$max_select}"{/if}  class="form-control chosen master-field {if isset($value)&&$value!==false}valid{/if} {if isset($class)&&$class}{$class}{/if} {if isset($context_search) && $context_search} context-search{/if}" {if isset($multiple)&&$multiple} multiple="multiple"{/if}{if isset($id)&&$id} id="{$id}"{/if} name="{if isset($name)}{$name}{/if}" data-error-message="{if isset($error_message)&&$error_message}{$error_message}{else}Поле заполнено некорректно{/if}" {if isset($required) && $required} required="required"{/if} {if isset($text)&&$text} data-chosen-select-text="{$text}"{/if}{if isset($no_results_text)&&$no_results_text} data-chosen-no-results-text="{$no_results_text}"{/if} style="{if isset($style)&&$style}{$style}{/if}">
				{if (!isset($no_empty)||!$no_empty)&&(!isset($multiple)||!$multiple)}<option value="">{if $text}{$text}{else}Выбрать...{/if}</option>{/if}
				{if isset($items)}
					{foreach from=$items item=item_name key=item_key}
							{if $legal_select}
									<option value="{$item_key}" data-guid="{$item_name.guid}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name.value}</option>
							{else}
									{if is_array($item_name)}
											<optgroup label="{$item_key}">
													{foreach from=$item_name item=subitem_name key=subitem_key}
															{if $reverse}
																	<option value="{$subitem_name}" {if isset($value) && strcmp($value, $subitem_key) == 0}selected{/if}>{$subitem_key}</option>
															{else}
																	<option value="{$subitem_key}" {if isset($value) && strcmp($value, $subitem_key) == 0}selected{/if}>{$subitem_name}</option>
															{/if}
													{/foreach}
											</optgroup>
									{else}
											{if $reverse}
													<option value="{$item_name}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_key}</option>
											{elseif $send_name}
													<option value="{$item_name}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name}</option>
											{else}
													<option value="{$item_key}" {if isset($value) && strcmp($value, $item_key) == 0}selected{/if}>{$item_name}</option>
											{/if}
									{/if}
							{/if}
					{/foreach}
				{/if}
			</select>
            {if $postscriptum}<div class="lowertext">{$postscriptum}</div>{/if}

		</div>
		{if !$no_row}<div class="col-md-1 col-sm-1 col-xs-2">{/if}
		<div class="additional{if isset($hint) && $hint || isset($hint_text) && $hint_text} hint-button{/if} {if isset($postscriptum)} postscriptum{/if}">
			{if isset($hint) && $hint || isset($hint_text) && $hint_text}
				<div class="hint hint-left " >
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
        {if !$no_row}</div>{/if}
	</div>
{/if}