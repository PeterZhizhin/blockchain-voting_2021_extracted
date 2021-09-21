<div class="file-download row">
    <div class="type-image col-sm-1 col-xs-2">
	<a href="{$url}"><img src="{$CFG_MEDIA_HOST}/common/img/icons/type-{$type}.png"></a>
    </div>
    <div class="description col-sm-10 col-xs-9">
	<div class="title col-xs-10"><a href="{$url}">{$title}</a></div>
	<div class="comment col-xs-10">{if $size}{$size}кб, {/if}{if $type}<span style="text-transform:uppercase">{if isset($ext)}{$ext}{else}{$type}{/if}</span>{/if}</div>
    </div>
    <div class="clearfix"></div>
</div>	
