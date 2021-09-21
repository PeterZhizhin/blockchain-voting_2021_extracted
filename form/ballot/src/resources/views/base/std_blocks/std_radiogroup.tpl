{if $mosDesign}
    {include file="$base_template_path/std_mos/std_radiogroup.tpl"}
{else}
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


	{if isset($hint)&&$hint!='false'&&!isset($hint_arr)}{assign var=hint_arr value=['1'=>$hint]}{/if}
	{if isset($hint_text)&&$hint_text!='false'&&$hint_text&&!isset($hint_text_arr)}{assign var=hint_text_arr value=['1'=>$hint_text]}{/if}

{if !empty($opr) }
<script type="text/html" id="{if isset($opr_id)}{$opr_id}{else}std_radiogroup{/if}">
	<% if (data.layout && data.layout == 'horizontal' ) { %>
		<div class="wrap<% if ( data.containerClass ) { %> <%=data.containerClass%><% } %>" <% if ( data.containerID ) { %>id="container_<%=data.containerID%>"<% } %>>
		<% if (data.label) { %>
			<label class="col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}><%=data.label%>
			<% if (data.required) { %>
				<span class="required">*</span>
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



			<div class="row wrap radiogroup{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)&&$container_id} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
				{if isset($label) }
					{if $label_position eq 'inline' || !isset($label_position)}
						<label class=" col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
					{/if}
					{if $label_position eq 'top'}
						<label class="top col-md-12 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
					{/if}
				{/if}
				<div class="holder {if !$label}col-md-10 col-sm-10 col-xs-12{else}col-md-8 col-sm-7 col-xs-12{/if}" {if $label_position eq 'top'}style="width:100%"{/if}>
					<div class="radiogroup radiogroup_error_show">
					{foreach from=$items item=item_name key=item_key name=radiogroup}

							<div class="holder radio holder inline col-lg-4 col-md-6 col-sm-6 col-xs-6" num="{$item_key}">
								{if isset($value) && ($item_key eq $value)}
										<input type="radio" class="master-field valid {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked="checked" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else if ({$template_value}===null) {  } else { %> checked="checked" <% } %>{/if}/>
									<label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
								{else}
									<input type="radio" class="master-field {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else if ({$template_value}===null) {  } else { %> checked="checked" <% } %>{/if}/>
									<label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
								{/if}
							</div>
					{/foreach}
					</div>

				</div>
				<div class="col-md-1 col-sm-1 col-xs-2">
					<div class="additional inline"><div class="{if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'} hint-button{/if}">
						{if isset($hint)&&$hint!='false'&&$hint || isset($hint_text)&&$hint_text&&$hint!='false'}
						<div class="hint hint-left inline">
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




		{elseif isset($layout) && $layout eq 'rows'}
			<div class="row wrap rows {if isset($label_position)&&$label_position eq 'top'}allwidth{/if} radiogroup{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>
				{if isset($label) }
					{if $label_position eq 'inline' || !isset($label_position)}
						<label class="col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
					{/if}
					{if $label_position eq 'top'}
						<label class="top col-md-12 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
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

			{if isset($label) }
				<div class="row wrap auto vradiogroup{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
					{if $label_position eq 'inline' || !isset($label_position)}
						<label class="col-md-3 col-sm-4 col-xs-11" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
					{/if}
					{if $label_position eq 'top'}
						<label class="top col-xs-12" {if $id}for="{$id}"{/if}>{$label}{if isset($required)&&$required}<span class="required">*</span>{/if}</label>
					{/if}
					<div class="holder {if $label_position eq 'top'}allwidth col-md-12 col-sm-12 col-xs-12{else}col-md-9 col-sm-8 col-xs-12{/if}" >

						{foreach from=$items item=item_name key=item_key name=radio_foreach}
							<div class="radiogroup" num="{$item_key}">
								<div class="holder radio holder col-md-11 col-sm-11 col-xs-12">
									{if isset($value) && ($item_key eq $value)}
										<input type="radio" class="master-field valid {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked="checked" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else  { if ({$template_value}===null) {  } else { %> checked="checked" <% } } %>{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
									{else}
										<input type="radio" class="master-field {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if (isset($disabled)&&$disabled) || (isset($disabledOther)&&$disabledOther)}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else  { if ({$template_value}===null) {  } else { %> checked="checked" <% } } %>{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
									{/if}
								</div>

								{if isset($hint_arr.$item_key)&&$hint_arr.$item_key!='false'&&$hint_arr.$item_key || isset($hint_text_arr.$item_key)&&$hint_text_arr.$item_key&&$hint_text_arr.$item_key!='false'}
								<div class="col-md-1 col-sm-1 col-xs-2">
									<div class="additional hint-button">
									<div class="hint hint-left hint_around">
									{if isset($hint_arr.$item_key)}
										{$hint_arr.$item_key}
									{else}
										<p class="header">{$hint_header}</p>
										<p>{$hint_text_arr.$item_key}</p>
									{/if}
									<div class="close"></div>
								</div>
									</div>
								</div>

								{/if}
							</div>
						{/foreach}

					</div>
				</div>
			{else}

				<div class="row wrap auto">
				{foreach from=$items item=item_name key=item_key name=radio_foreach}
					<div class="radiogroup col-xs-12 wrap {if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if} num="{$item_key}">
						<div class="radio holder {if isset($hint_arr.$item_key)&&$hint_arr.$item_key!='false'&&$hint_arr.$item_key || isset($hint_text_arr.$item_key)&&$hint_text_arr.$item_key&&$hint_text_arr.$item_key!='false'}col-md-11 col-sm-11 col-xs-11{/if}">
							{if isset($value) && ($item_key eq $value)}
								<input type="radio" class="master-field valid {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" checked="checked" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else  { if ({$template_value}===null) {  } else { %> checked="checked" <% } } %>{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
							{else}
								<input type="radio" class="master-field {if $class}{$class}{/if}" id="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}" name="{if isset($name)}{$name}{/if}" value="{$item_key}"{if isset($required)&&$required} required="required"{/if} {if isset($disabled)&&$disabled}disabled="disabled"{/if} {if $template_value}<% if ({$template_value}!="{$item_key}"&&{$template_value}!==null) { %> disabled="disabled"<% } else  { if ({$template_value}===null) { } else { %> checked="checked" <% } } %>{/if}/><label for="{if isset($id)}{$id}{else}{$name}{/if}-{$item_key}">{$item_name}</label>
							{/if}
						</div>


						{if isset($hint_arr.$item_key)&&$hint_arr.$item_key!='false'&&$hint_arr.$item_key || isset($hint_text_arr.$item_key)&&$hint_text_arr.$item_key&&$hint_text_arr.$item_key!='false'}
												<div class="col-md-1 col-sm-1 col-xs-1">
													<div class="additional inline">
															<div class="hint-button">
																<div class="hint hint-left inline" >
																	{if isset($hint_arr.$item_key)}
																			{$hint_arr.$item_key}
																	{else}
																			<p class="header">{$hint_header}</p>
																			<p>{$hint_text_arr.$item_key}</p>
																	{/if}
																	<div class="close"></div>
																</div>
															</div>
													</div>
												</div>

						{/if}
					</div>
				{/foreach}

				</div>
			{/if}
		{/if}
	{/if}
{/if}

