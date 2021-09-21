{* 
    Подключение для шаблонизатора:
    {include file="$base_template_path/std_blocks/std_infoblock.tpl" isTemplater=true}

    data = { 
        color : 'required',
        text : 'required',
        id : 'optional', 
        container_class : 'optional',
        style : 'optional',
    };
*}

{if (!isset($isTemplater))}
    <div
        class="
            alert
            alert-{$color}
            {if isset($container_class)&&$container_class}{$container_class}{/if} 
        "
        {if isset($id)}id="{$id}"{/if}
        {if isset($style)}style="{$style}"{/if}
    >
        {$text}
    </div>
{else}
    <script id="std_infoblock" type="text/html">
        <div class="form-infobox 
            <% if (data.container_class) { %> <%=data.container_class%> <% } %> 
            <% if (data.color) { %> <%=data.color%> <% } %>" 
             
            <% if (data.id) { %> id="<%=data.id%>" <% } %> 
            <% if (data.style) { %> style="<%=data.style%>" <% } %> 
        >
            <%=data.text%>
        </div>
    </script>
{/if}