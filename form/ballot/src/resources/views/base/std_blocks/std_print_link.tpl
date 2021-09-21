<a href="#" {if isset($id)&&$id}{$id}{/if} {if isset($print_block)}print_block="{$print_block}"{/if} onclick="{if isset($onclick)&&$onclick}{$onclick}{/if} return false;" title="Распечатать" class="print {$class}">
	<img src="{$CFG_MEDIA_HOST}/common/img/elem/print_icon.png" alt="Распечатать"> Распечатать
</a> 