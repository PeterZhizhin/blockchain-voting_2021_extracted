{if isset($template) && template}
    <script id="pagination_tpl" type="text/html">
        <ul class="page-list">
            <% if (page > 1) { %>
            <li data-page="<%=page - 1%>"><a href="#">Пред.</a></li>
            <% } %>

            <% for (var i = 0; i < links.length; i++) { %>
            <li data-page="<%=links[i]%>" class="<%=(links[i] == page) ? 'current' : ''%>">
                <a href="#"><%=links[i]%></a>
            </li>
            <% } %>

            <% if (page < pages) { %>
            <li data-page="<%=page + 1%>"><a href="#">След.</a></li>
            <% } %>
        </ul>
    </script>
{else}
    <div class="pagination-block {$container_class}">
        <div class="pagination-items">
            {if $items}{$items}{/if}
        </div>
        <div class="pagination-elements {$elements_class}">
            <div class="pagination"></div>
            <div class="pagination-found-wrapper">Найдено: <span class="pagination-found"></span></div>
        </div>
    </div>
{/if}