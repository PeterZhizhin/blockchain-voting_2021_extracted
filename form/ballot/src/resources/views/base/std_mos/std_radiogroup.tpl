{if !empty($opr) }
<script type="text/html" id="{if isset($opr_id)}{$opr_id}{else}std_radiogroup{/if}">
	<% if (data.layout && data.layout == 'horizontal' ) { %>
		<div class="wrap<% if ( data.containerClass ) { %> <%=data.containerClass%><% } %>" <% if ( data.containerID ) { %>id="container_<%=data.containerID%>"<% } %>>
		<% if (data.label) { %>
			<label class="col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}><%=data.label%>
			<% if (data.required) { %>
				<span class="required"></span>
			<% } %>
			</label>
		<% } %>
			<div class="holder  col-xs-12">
			<% for ( var i in data.items ) { %>
				<div class="holder inline  col-xs-3">
				<% if ( data.value && data.value == i ) { %>

                        <input type="radio" <%=data.items[i].attr%> class="<%= data.class%>" id="<%=data.id%>-<%=i%>" checked name="<%=data.name%>" value="<%=i%>"/>
                    <label class="col-md-3 col-sm-4 col-xs-11" for="<%=data.id%>-<%=i%>"><%=data.items[i].name%></label>
				<% } else { %>
                    <input type="radio" <%=data.items[i].attr%> class="<%= data.class%>" id="<%=data.id%>-<%=i%>" name="<%=data.name%>" value="<%=i%>"/><label for="<%=data.id%>-<%=i%>"><%=data.items[i].name%></label>
				<% } %>
				</div>
			<% } %>
			</div>
                        <div class="col-md-1 col-sm-1 col-xs-2">
			<div class="additional <% if ( data.hintClass || data.hintText ) { %> hint-button <% } %>"></div>
                        </div>
		</div>
	<% } else { %>
		<% for ( var i in data.items ) { %>
			<div class="wrap<% if ( data.containerClass ) { %> <%=data.containerClass%><% } %>" <% if ( data.containerID ) { %>id="container_<%=data.containerID%>_<%=i%>"<% } %>>
				<div class="holder">
					<% if ( data.value && data.value == i ) { %>
                        <input type="radio" <%=data.items[i].attr%> class="<%= data.class%>" id="<%=data.id%>-<%=i%>" checked name="<%=data.name%>" value="<%=i%>"/><label for="<%=data.id%>-<%=i%>"><%=data.items[i].name%></label>
					<% } else { %>
						<input type="radio" <%=data.items[i].attr%> class="<%= data.class%>" id="<%=data.id%>-<%=i%>" name="<%=data.name%>" value="<%=i%>"/><label for="<%=data.id%>-<%=i%>"><%=data.items[i].name%></label>
					<% } %>
				</div>
                            <div class="col-md-1 col-sm-1 col-xs-2">
				<div class="additional <% if ( data.hintClass || data.hintText ) { %> hint-button <% } %>"></div>
                            </div>
			</div>
		<% } %>
	<% } %>
</script>

	{elseif isset($items)}
		{if isset($layout) && $layout eq 'horizontal'}
			<div class="wrap field field--error-popup radio-group{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)&&$container_id} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
				{if isset($label) }
				<div class="row">
					{capture assign=horizontal_label}
						<label class="top" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required"></span>{/if}</label>
					{/capture}
					{if isset($hint_text) && $hint_text && $hint_text != 'false'}
						<div class="col-md-8">{$horizontal_label}</div>
						<div class="col-md-4">{include file="$base_template_path/std_mos/std_hint.tpl"}</div>
					{else}
						<div class="col-md-12">{$horizontal_label}</div>
					{/if}
				</div>
				{/if}
				<div class="row radiogroup">
					{foreach from=$items item=item_name key=item_key name=radiogroup}
							{include file="$base_template_path/std_mos/std_radio.tpl" item_key=$item_key item_name=$item_name id=$id name=$name container_class="col-md-4"}
					{/foreach}
				</div>
                <div class="row">
                    <div class="{if $container_class_for_error}{$container_class_for_error}{else}col-md-4{/if}"><div class="field__inner"></div></div>
                </div>
            </div>
		{elseif isset($layout) && $layout eq 'rows'}
			<div class="row wrap rows {if isset($label_position)&&$label_position eq 'top'}allwidth{/if} radiogroup{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
				{if isset($label) }
					{if $label_position eq 'inline' || !isset($label_position)}
						<label class="col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required"></span>{/if}</label>
					{/if}
					{if $label_position eq 'top'}
						<label class="top col-md-12 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required"></span>{/if}</label>
					{/if}
				{/if}
				<div class="holder allwidth col-md-11 col-sm-11 col-xs-11">
					{foreach from=$items item=item_name key=item_key}
						<div class="radio holder rows  col-md-4 col-sm-6" num="{$item_key}">
							{if isset($value) && ($item_key eq $value)}

									<input type="radio" class="master-field valid {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked="checked" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else if ({$template_value}===null) {  } else { %> checked="checked" <% } %>{/if}/>
								<label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
							{else}

									<input type="radio" class="master-field {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else  { if ({$template_value}===null) {  } else { %> checked="checked" <% } } %>{/if}/>
								<label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
							{/if}
						</div>
					{/foreach}

				</div>
				<div class="col-md-1 col-sm-1 col-xs-2">
					<div class="additional rows"><div class="{if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'}  hint-button{/if}">
						{if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'}
						<div class="hint hint-left rows">
							{if isset($hint)}
								{$hint}
							{else}
								<p class="header">{$hint_header}</p>
								<p>{$hint_text}</p>
							{/if}
							<div class="close"></div>
						</div>
					{/if}
						</div></div>
				</div>
			</div>
		{else}			
                    <div class="row field field--error-popup wrap auto radio-group {if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>					                                    
                            {if isset($label) }<div class="col-md-12"><label {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required"></span>{/if}</label></div>{/if}									
                            {foreach from=$items item=item_name key=item_key name=radio_foreach}
                                    {include file="$base_template_path/std_mos/std_radio.tpl" item_key=$item_key item_name=$item_name id=$id name=$name container_class="col-md-12"
                                        disabled=((isset($disabledOther) && $disabledOther) && ($value neq $item_key) || (isset($disabled) && $disabled))
                                    }
                            {/foreach}
                            <div class="{if $container_class_for_error}{$container_class_for_error}{else}col-md-4{/if}"><div class="field__inner"></div></div>                                        
                    </div>
		{/if}
	{/if}

      
