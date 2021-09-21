<div class="wrap{if $container_class} {$container_class}{/if}"{if $container_id} id="{$container_id}"{/if}>
     <div class="egip_map">
		<div{if $id} id="{$id}"{/if} class="holder{if isset($class)} {$class}{/if}{if isset($container_class)} {$container_class}{/if}" style="height: 480px; width:100%; position: absolute;">
			<span class="error_map" style="color:red;">Карта еше не загружена. Дождитесь загрузки карты или перезагрузите страницу.</span>
		</div>
		<script type="text/javascript"> {*
			EGIP.addMap("{$id}", {
				Zoom: 5,
				ScaleBar: true,
				Slider: true,
				OverviewMap: true{if isset($dblclick_callback)},
				onDblClickFunc: {$dblclick_callback}{/if}
			}); *}
		</script>
	</div>
	<div class="additional"></div>
</div>