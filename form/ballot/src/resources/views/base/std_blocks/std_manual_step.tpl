{if !isset($toggable)}{$toggleable = true}{/if}
{if !isset($active)}{$active = false}{/if}
<div class="manual-step {if $active}active{/if}">
	<h3 class="manual-title">{if $toggable}<a href="" onclick="javascript:return false" class="dashed-link">{/if}{$step_title}{if $toggable}</a>{/if}</h3>
	{if !empty($step_content)}
	<div class="manual-content">{$step_content}</div>
	{/if}
</div>