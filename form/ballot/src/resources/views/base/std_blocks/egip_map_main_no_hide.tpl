<style type="text/css">
	.for_map_button.opened {
		height : 1px;
	}
	.for_map, .for_map.opened {
		padding: 10px 0 0 0;
	}
	/* fix для вывода ползунка масштаба карты, чтобы не расползался на пол экрана*/
	table.dijitSliderV {
		width: 30px;
	}
	/* fix. выводились поверх messagebox и других элементов */
	.ovwButton.ovwController.ovwShow, #_Copyrightmap, #_Titlemap {
		z-index: inherit !important;
	}
	/* fix. стили от карты переопеределяют глобальные стили портала */
	h1 {
	font-family: "ProximaNova", "Helvetica Neue", Arial, sans-serif;
	font-size: 42px;
	line-height: 50px;
	margin-bottom: 0px;
	margin-left: 0px;
	margin-right: 0px;
	margin-top: 0px;
	}
	/* балун на карте, делаем шире */
	.simpleInfoWindow {
		width: 280px !important;
		height: 130px !important;
	}
	.simpleInfoWindow .close {
		left: 278px !important;
	}
	.simpleInfoWindow .title {
		line-height:22px;
	}

</style>
<div class="for_delete">
	<div class="no-margin" style="margin:0px;vertical-align:bottom">
		{* карта при инициализации берет размеры контейнера (следующая строка), если их нет, делается 400*400px *}
		<div id="{$map_id}" class="map_img" style="height: 480px;width: 100%; margin-bottom: 10px;display:none;">
			<span class="error_map" style="color:red;">Карта еше не загружена. Дождитесь загрузки карты или перезагрузите страницу.</span>
		</div>
	</div>
</div>
<script type="text/javascript">
    // карта
    var $map;

    function try_show_map() {
//        console.log('try_show_map');
        if (EGIP.ready() && gcapi) {
            $map = $('#{$map_id}');
            $map.show();
            gcapi.MapReinit('{$map_id}');
        } else {
            setTimeout(try_show_map, 1000);
        }
    }
    waitJqueryLoadApieatlasCallback[waitJqueryLoadApieatlasCallback.length] = function() {
        EGIP.addMap('{$map_id}', { Zoom: 5, ScaleBar: true, Slider: true, OverviewMap: true, dblClickZoom: true });
    }
</script>

{if !$no_include_js}
	{include file="$base_template_path/std_blocks/std_map.tpl" atlas_key=$atlas_key atlas_version=$atlas_version}
{/if}
