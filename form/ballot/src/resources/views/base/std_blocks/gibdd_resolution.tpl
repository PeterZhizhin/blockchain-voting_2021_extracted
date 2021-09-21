{assign var='label' value=$label|default:'Номер и дата постановления'}

{assign var='drn_name' value=$drn_name|default:'driverResolutionNumber'}
{assign var='drn_id' value=$drn_id|default:'driverResolutionNumber'}
{assign var='drn_value' value=$drn_value|default:''}
{assign var='drn_error_message' value=$drn_error_message|default:'Поле заполнено некорректно'}
{assign var='drn_class' value=$drn_class|default:'resolution_number'}

{assign var='drd_name' value=$drd_name|default:'driverResolutionDate'}
{assign var='drd_id' value=$drd_id|default:'driverResolutionDate'}
{assign var='drd_value' value=$drd_value|default:''}
{assign var='drd_error_message' value=$drd_error_message|default:'Поле заполнено некорректно'}
{assign var='drd_class' value=$drd_class|default:''}
{assign var='drd_validator' value=$drd_validator|default:'date_in_past_and_now_and_null'}

<div class="wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
	<label for="{$drn_id}">{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
	<div class="holder">
		<input
			size="20"
			class="{$drn_class} has-gibdd-letters has-gibdd-resolution-number" id="{$drn_id}" type="text" name="{$drn_name}" value="{$drn_value}" data-error-message="{$drn_error_message}"
			alt='gibdd_resolution' {if isset($required) && $required} required{/if}{if isset($drn_placeholder)} placeholder="{$drn_placeholder}"{/if}
			{if isset($drn_validator)} data-validator="{$drn_validator}"{/if}
		/>
		<input class="date_field{if isset($drd_class)} {$drd_class}{/if}" id="{$drd_id}" type="text" name="{$drd_name}" value="{$drd_value}"
					data-validatefunction="{$drd_validator}"
					data-error-message="{$drd_error_message}"
					data-mask="99.99.9999"/>
{if isset($hint) || isset($hint_text)}
	<div class="hint">
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
