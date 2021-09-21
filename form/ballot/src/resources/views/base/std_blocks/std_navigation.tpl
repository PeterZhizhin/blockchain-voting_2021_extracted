<div class="pagination for_delete">
	<ul class="page-list">
	{*{if $first_url}<li onClick="goToPage({1});return false;"><a href="{$first_url}"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-left.png"></a></li>{/if} *}
	{if $prev_url}<li onClick="goToPage({$page} - 1, $(this));return false;" class="prev"><a href="{$prev_url}"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-left.png"></a></li>{/if}
	{foreach from=$links item=link name=link}
		<li {if !$link.url}class="current"{else}onClick="goToPage('{$link.num}', $(this));return false;"{/if}><a href="{if $link.url}{$link.url}{else}{/if}">{$link.text}</a></li>
	{/foreach}
	{if $next_url}<li onClick="goToPage({$page} + 1, $(this));return false;" class="next"><a href="{$next_url}"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-right.png"></a></li>{/if}
	</ul>
</div>