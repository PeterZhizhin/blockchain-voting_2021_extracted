<script type="text/html" id="multiblockblocktemplate{$block_id}">
	{$inner}
	<div class="multiblock-save-cancel right">
	<a href="#" class="button big_button multiblock-save" data-change="{$change_func}">Сохранить</a><a href="#" class="dashed-link multiblock-cancel" style="margin-left:20px; margin-right: 40px;">Отменить</a>
	</div>
</script>
<div class="{if isset($no_container)}{else}form-block{/if} multiblock-control" data-template-container-class="{if isset($container_class)}{$container_class}{else}form-block{/if}">
	<a href="#" class="block-button add" id="{$block_id}" data-template-id="multiblockblocktemplate{$block_id}">{if isset($add_text)}{$add_text}{else}Добавить документ{/if}</a>
</div>
