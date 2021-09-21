
{*
DEPRECEATED
*}

{* 
	data = { 
		label : 'optional',
		name : '',
		required : false, 
		containerClass : 'optional', 
		containerID : 0, 
		hintHeader : 'optional',
		hintText : 'optional',
		hint : 'optional'
		errorMessage : '',
		items = {
			class : класс input,
			value : атрибут input,
			id : атрибут input,
			label : подпись чека
			isChecked : выделенный? bool,
			attrs : 'optional'			
		}
	};
*}
{if isset($opr) }

<script type="text/html" id="{if isset($opr_id)}{$opr_id}{else}std_checkgroup{/if}">
	<div class="wrap <% if (data.containerClass) { %> <%= data.containerClass %><% } %>"<% if (data.containerID) { %> id="<%= data.containerID %>"<% } %>>
		<div class="holder">
		<% for ( var i in data.items ) { %>
			<input <% if (data.items[i].attrs) { %><%= data.items[i].attrs %><% } %> <% if (data.items[i].isChecked) { %>checked<% } %> <% if (data.items[i].class) { %> class="<%= data.items[i].class %>"<% } %><% if (data.items[i].id) { %> id="<%= data.items[i].id %>"<% } %> type="checkbox" name="<% if (data.name) { %><%= data.name %><% } %>" value="<% if (data.items[i].value) { %><%= data.items[i].value %><% } %>" data-error-message="<% if (data.errorMessage) { %><%=errorMessage%><% } else { %>Поле заполнено некорректно<% } %>"<% if (data.required) { %> required="required"<% } %>/>
			<label <% if (data.items[i].id) { %>for="<%= data.items[i].id %>"<% } %>><%= data.items[i].label %><% if (data.required) { %><span class="required">*</span><% } %></label>
		<% } %>
		<% if (data.hint && data.hintText) { %>
			<div class="hint hint-left">
				<% if (data.hint) { %>
					<%= data.hint %>
				<% } else { %>
					<p class="header"><%=data.hintHeader%></p>
					<p><%=data.hintText%></p>
				<% } %>
					<div class="close"></div>
			</div>
		<% } %>
		</div>
		<div class="additional<% if (data.hint || data.hintText) { %> hint-button<% } %>"></div>
	</div>
</script>
{elseif isset($items)}
<div class="wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
	<div class="holder">
		<input{if isset($class)} class="{$class}"{/if}{if isset($id)} id="{$id}"{/if} type="checkbox" name="{if isset($name)}{$name}{/if}" value="{if isset($value)}{$value}{/if}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}/>
		<label {if isset($id)}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
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
{/if}