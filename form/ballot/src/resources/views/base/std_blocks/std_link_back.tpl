{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_link_back.tpl"}
{else}
<div class="link_back {if $container_class} {$container_class}{/if}"{if $container_id} id="{$container_id}"{/if}>
	<a {if isset($id)&&$id}id="{$id}"{/if} href="{$href}" >{if isset($ignore_image)&&!$ignore_image||!isset($ignore_image)}<img src="{$CFG_MEDIA_HOST}/common/img/elem/play_back.png" style="vertical-align:middle;margin-bottom:5px;margin-right:10px">{/if} {if $text}{$text}{else}Вернуться в каталог услуг{/if}</a>
</div>
{/if}
