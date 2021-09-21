<style type="text/css">
	.for_map {
		overflow : hidden;
	}
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
		width: 320px !important;
	}
	.simpleInfoWindow .close {
		left: 318px !important;
	}
	.simpleInfoWindow .title {
		line-height:22px;
	}

</style>
<fieldset class="form-block for_delete">
	<div class="no-margin" style="margin:0px;vertical-align:bottom">

		<div class="for_map border-bottom gray" style="width: 100%;display: none;">
			{* карта при инициализации берет размеры контейнера (следующая строка), если их нет, делается 400*400px *}
			<div id="{$map_id}" class="map_img" style="height: 400px;width: 100%; margin-bottom: 10px;"></div>
		</div>
		<div class="for_map_button gray">
			<div class="fmb_inner">
				<div class="map_button gray">
					<a href="#"><span>показать карту</span></a>
				</div>
			</div>
		</div>
	</div>
</fieldset>
<script type="text/javascript">
	// карта
	var $map, $for_map, $for_map_button;
	var first = false;
    $map=$('#{$map_id}');
    $for_map=$map.closest('.for_map');
    $for_map_button =$for_map.parent().find('.for_map_button');

	function closeMap($map,$for_map,$for_map_button) {
		$for_map.removeClass('opened');
		$for_map_button.removeClass('opened').find('.map_button').removeClass('opened');
		$for_map.slideUp();
		$for_map_button.find('span').html('показать карту');
	}

	function openMap($map,$for_map,$for_map_button) {
		function mapReinit() {
		    if (!first) {
                if (EGIP.ready() && gcapi) {
                    gcapi.MapReinit('{$map_id}');
                } else {
                    setTimeout(mapReinit, 1000);
                }
                first = true;
            }
        }

        mapReinit();

        $for_map.slideDown();
		$for_map.addClass('opened');
		$for_map_button.addClass('opened').find('.map_button').addClass('opened');
		$for_map_button.find('span').html('cкрыть карту');
	}

    waitJqueryLoadApieatlasCallback[waitJqueryLoadApieatlasCallback.length] = function() {

        $(document).on('click', '.map_button', function(event) {
            event.preventDefault();

            if($for_map.hasClass('opened')) {
                closeMap($map,$for_map,$for_map_button);
            } else {
                //reInitMap();
                openMap($map,$for_map,$for_map_button);
            }
            return false;
        });

        EGIP.addMap('{$map_id}', { Zoom: 5, ScaleBar: true, Slider: true, OverviewMap: true,{if ($mouse_zoom)} dblClickZoom: true {/if}});
    }
</script>

{if !$no_include_js}
    {include file="$base_template_path/std_blocks/std_map.tpl" atlas_key=$atlas_key atlas_version=$atlas_version}
{/if}
