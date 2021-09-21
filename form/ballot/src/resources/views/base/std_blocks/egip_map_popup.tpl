{*
подключать ПЕРЕД <form>...</form>
{include file="$base_template_path/std_blocks/egip_map_popup.tpl" baloons=true|false}
если нужны всплавающие подсказки (балуны): подключать шаблон с baloons=true

в class.php в show() добавить:
$this->smarty->assign('atlas_key', params::$params['atlas_key']['value']);
$this->smarty->assign('atlas_version', params::$params['atlas_version']['value']);

mapbox() показывает адрес/адреса в попапе
по unom - должен быть задан address.unom
по координатам - address.x, address.y
по адресу (единственный) - address = строка адреса
	mapbox('Веселая 94')
по адресу/адресам(с балунами или без) - address - массив строк адресов / объектов массив объектов c подсказками(или без) {address:'...', baloon:{...}}
	mapbox(['Веселая 2', 'Веселая 3', 'Веселая 8', ])
	mapbox([{address:'Веселая 2',baloon:{title:'2',content:'222'}},{address:'Веселая 3',baloon:{title:'3!',content:'333'}},{address:'Веселая 8',baloon:{title:'8',content:'888'}}])
чтобы из балуна по кнопке перейти на форму - нужно как обычно закрывать попап ()
*}
{literal}
<style type="text/css">
	/* карта */
	.map_loader {
	position: relative;
	z-index: 10001;
	top: -50px;
	left: 100px;
	}
	.popup_messagebox_map {
	margin-top: -110px;
	padding: 32px;
	}
	.popup_messagebox_map {
	padding:20px;
	}
	.popup_messagebox_map h2{
	margin-top:0px;
	}
	.popup_messagebox_map p {
	margin-top:10px;color:#5d6264;font-size:16px;line-height:20px
	}
	.popup_messagebox_map .cross {
	width: 13px;
	height: 13px;
	background-image: url('{/literal}{$CFG_MEDIA_HOST}{literal}/common/img/elem/cross-small.png');
	float:right;
	cursor:pointer;
	opacity: 0.6;
	}
	.popup_messagebox_map .cross:hover {
	opacity: 1;
	}
	/*#map_popup .messagebox-body {
		width: 700px;
	}*/
	/* fix для вывода ползунка масштаба карты, чтобы не расползался на пол экрана*/
	table.dijitSliderV {
	width: 30px;
	}
	/* #dijit_form_VerticalRule_0 {
	top:54px;
	}
	#dijit_form_VerticalRuleLabels_0 {
	top:-60px;
	} */
	/* fix. стили от карты переопеределяют глобальные стили портала */
	h1 {	
		font-size: 35px;
		line-height: 50px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
	}
	@media screen and (max-width: 767px) {    
		h1 {
			font-size: 24px;
			margin-top: 0;
			margin-bottom: 15px;
			padding: 0 18px;
		}
	}
</style>
<script type="text/javascript">
/**
* address либо просто строка адреса, либо {unom:123, addr:'Москва,...'}, либо {x:123, y:456, addr:'Москва,...'}
*/
function mapbox(address, width) {
	try {
		clearMessageboxes();
		if ((typeof(gcapi) == 'undefined') || (typeof(gcapi.MapReinit)!='function')) {
			messagebox('', 'Карта недоступна');
			return false;
		}

		/*if (!width) {
			var width = 740;
		} else {
			width = parseInt(width);
		}
		var wWidth = $(window).width();*/
		
		width = getPopupWidth();
		var leftOffset = -(width / 2);
		var map_width = width;
		//$('#map_div').css({width: (map_width)+'px'});
		$('#map_div').css({width: '100%'});		
		var top = (window.pageYOffset ? window.pageYOffset : document.body.scrollTop)  - $('#map_popup').parent().offset().top + 170;
		$('#map_popup').css({'position': 'absolute', 'top': top, 'margin-left':leftOffset, width: (width)+'px'});
		var first = true;
		$('#map_popup, .shadow').fadeIn('fast', function() {
			if (first) { // событие может вызываться несколько раз
				try {
                    // иначе будет неправильный размер карты
                    $('#map_div').show();
                    gcapi.MapReinit('map_div');
					EGIP.removeAllPoints('map_div');
					if (typeof(address.unom)!='undefined') { // показать по unom
						EGIP.addByUnom('map_div', address.unom, address.unom, address.addr || '');
					} else if (typeof(address.x)!='undefined') { // показать по координатам
						EGIP.removeAllPoints('map_div');
						EGIP.addTextPoint('map_div', {0: address});
						//EGIP.addTextPoint('map_div', 1, address.x, address.y, address.addr || '');
					} else  if (typeof(address)=='string'){ // показать по адресу
						EGIP.addAddress('map_div', 1, address);
					} else { // показать по массиву адресов (с/без подсказками)
						EGIP.addAddresses('map_div', address);
					}
				} catch (e) {
					if (typeof(console)=='object'&& typeof(console.log)=='function') {
						console.log('egip_map_popup ошибка инициализации: ', e);
					}

				}
			};

			first = false;
		});
	} catch (e) {
	}

	return false; // for <a> links
}
{/literal}
{*
// обработка ссылок "показать на карте"
$(document).on('click', '.show_on_map', function() {
	var map_type = 1;
	var mfc_id = $(this).closest('.wrap').attr('data-mfc_id'); // искать в текущем блоке
	if (!mfc_id) {
		var mfc_id = $(this).closest('.form-result').attr('data-mfc_id'); // искать в текущем блоке
		map_type = 2;
	}

	if (mfc_id) { // по координатам
		var addr = get_map_rec(offices, mfc_id, map_type); // выводить строку с адресом
//		var addr = {
//			x: offices[mfc_id].address.longitude,
//			y: offices[mfc_id].address.latitude,
//			addr: offices[mfc_id].address.value,
//            baloon: {},
//		};
	} else { // по адресу
		var $addr_container = $(this).closest('.wrap').find('.address'); // искать в блоке
		var addr = $addr_container.text().trim().replace(/^г\. /, '').trim();
	}
	mapbox(addr);

	return false;
});
*}{literal}

</script>
{/literal}
<div id="map_popup" class="popup popup_messagebox_map temp" style="display: none;">
	<div class="cross"></div>
	<a href="#" onclick="javascript:return false" class="btn-close-pop"></a>
	<h2 class="title1">Карта</h2>
	<div class="messagebox-body">
		{* карта при инициализации берет размеры контейнера (следующая строка), если их нет, делается 400*400px *}
		<div id="map_div" style="height: 480px;width: 100%;display: none;">
			<span class="error_map" style="color:red;">Карта еше не загружена. Дождитесь загрузки карты или перезагрузите страницу.</span>
		</div>
	</div>
</div>
<script type="text/javascript">
    waitJqueryLoadApieatlasCallback[waitJqueryLoadApieatlasCallback.length] = function() {
		// закрывать диалог карты при клике на тень
        $('body').on('click', '.shadow', function() {
            $('#map_popup, .popup_messagebox, .shadow').fadeOut('fast', clearMessageboxes());
        });

        $('#map_popup .cross').on('click', function() {
            $('#map_popup, .shadow').fadeOut('fast');
        });

        EGIP.addMap('map_div', {
            Zoom: 5,
            ScaleBar: true,
            Slider: true,
            OverviewMap: true,
            dblClickZoom: true,
            {if $baloons}baloons: true,{/if}
            autoZoom: true,
            addressTextType: 2
        });
    }
</script>

{if !$no_include_js}
	{include file="$base_template_path/std_blocks/std_map.tpl" atlas_key=$atlas_key atlas_version=$atlas_version}
{/if}