{*

Установлен или нет чекбокс - определяется по его состоянию checked
$('#id').is(':checked')

Для установки значения через js использовать
$('#id').prop('checked', true|false).trigger('change')

Для отлавливания изменений, как обычно
$('#id').on('change', function() {console.log($(this).prop('checked'));})

Подключается один раз в режиме шаблона:
{include file="$base_template_path/std_blocks/std_toggle_on_off.tpl" templates=true}

Затем как обычно, например:
{include file="$base_template_path/std_blocks/std_toggle_on_off.tpl" class="bufety_main" name="group1_all" checked=true}

Пример использования:
форма mosobr/ispp
*}
{* Подключаем стили и общие скрипты только один раз *}
{if empty($templates)}

{counter name="toggle_on_off_count" assign="toggle_on_off_count_value"}

{if empty($id)}
	{assign var="id" value="toggle_on_off_{$toggle_on_off_count_value}"}
{/if}

<div class="toggle-box toggle-on-off pull-right{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
	<input
		id="{$id}"
		type="checkbox"
		value="{if isset($value)}{$value}{else}1{/if}"
		{if $name} name="{$name}"{/if}
		{if $class}	class="{$class}"{/if}
		{if $checked} checked="checked"{/if}
		{if $data_text} data-text="{$data_text}"{/if}
		{if $data_i} data-i="{$data_i}"{/if}
		{if $data_ban} data-ban="{$data_ban}"{/if}
	>
	<div class="range"{if $disabled} disabled="disabled"{/if}></div>
	<span class="on">{if isset($on_text)}{$on_text}{else}Разрешено{/if}</span>
	<span class="off">{if isset($off_text)}{$off_text}{else}Запрещено{/if}</span>
</div>

{else}

<link rel="stylesheet" type="text/css" media="all" href="{$CFG_CSS_HOST}/common/css/new/jquery.nouislider.css"/>
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/jquery/jquery.nouislider.min.js"></script>

{literal}
<style type="text/css">
.time-range-holder .range {
	margin-top: 7px;
}
.time-range-holder .noUi-horizontal {
	height: 5px;
}
.time-range-holder select {
	display: none;
}
.time-range-holder .noUi-background,
.time-range-holder .noUi-target {
	border: none;
	-moz-border-radius: 2px;
	-webkit-border-radius: 2px;
	border-radius: 2px;
	-moz-background-clip: padding;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	background-color: #95a3a7;
	-moz-box-shadow: 0 1px 0 rgba(255,255,255,.4), inset 0 1px 2px rgba(0,0,0,.35);
	-webkit-box-shadow: 0 1px 0 rgba(255,255,255,.4), inset 0 1px 2px rgba(0,0,0,.35);
	box-shadow: 0 1px 0 rgba(255,255,255,.4), inset 0 1px 2px rgba(0,0,0,.35);
}
.time-range-holder .noUi-connect {
	background: #006b8e;
}
.time-range-holder .noUi-handle {
	width: 12px;
	height: 22px;
	-moz-border-radius: 3px;
	-webkit-border-radius: 3px;
	border-radius: 3px;
	-moz-background-clip: padding;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	background-color: #dfe8eb;
	-moz-box-shadow: 0 1px 2px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5);
	-webkit-box-shadow: 0 1px 2px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5);
	box-shadow: 0 1px 2px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.5);
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEyIDIyIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9ImhhdDAiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4MT0iNDkuNDc5MTY2NjY2NjY2NyUiIHkxPSIxNTclIiB4Mj0iNDkuNDc5MTY2NjY2NjY2NyUiIHkyPSI2Ljk5OTk5OTk5OTk5OTk5JSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDAiIHN0b3Atb3BhY2l0eT0iMC4yNCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZWZmZmYiIHN0b3Atb3BhY2l0eT0iMC4yNCIvPgogICA8L2xpbmVhckdyYWRpZW50PgoKPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjIyIiBmaWxsPSJ1cmwoI2hhdDApIiAvPgo8L3N2Zz4=);
	background-image: -moz-linear-gradient(bottom, rgba(0,0,0,.24) -89%, rgba(255,255,255,.24) 61%);
	background-image: -o-linear-gradient(bottom, rgba(0,0,0,.24) -89%, rgba(255,255,255,.24) 61%);
	background-image: -webkit-linear-gradient(bottom, rgba(0,0,0,.24) -89%, rgba(255,255,255,.24) 61%);
	background-image: linear-gradient(bottom, rgba(0,0,0,.24) -89%, rgba(255,255,255,.24) 61%);
}
.noUi-handle:after, .noUi-handle:before {
	display: none;
}
.noUi-horizontal .noUi-handle {
	left: -6px;
	top: -9px;
}
.time-range-holder .text-lower,
.time-range-holder .text-upper {
	color: #6b6c6d;
	font-size: 15px;
	text-shadow: 0 1px 0 #fff;
}

.toggle-box .range {
	width: 26px;
	display: inline-block;
	margin: 0 10px;
}
.toggle-box [disabled] .noUi-handle {
	cursor: not-allowed;
}
.toggle-box input[type="checkbox"] {
	display: none;
}
.toggle-box .left-label,
.toggle-box .right-label {
	font-size: 16px;
	font-weight: bold;
	cursor: default;
}
.toggle-box.off .right-label,
.toggle-box .left-label {
	color: #2f89af;
	border-bottom: 1px dashed;
	cursor: pointer;
	position: relative;
}
.toggle-box.off .right-label small,
.toggle-box .left-label small {
	position: absolute;
	left: 0;
	top: 18px;
	font-weight: normal;
}
.toggle-box .right-label,
.toggle-box.off .left-label {
	color: #000;
	border-bottom: none;
}
.toggle-box .noUi-target {
	height: 14px;
	-moz-border-radius: 7px;
	-webkit-border-radius: 7px;
	border-radius: 7px;
	border: none;
}
.toggle-box .noUi-base {
	-moz-border-radius: 7px;
	-webkit-border-radius: 7px;
	border-radius: 7px;
	-moz-background-clip: padding;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	background-color: #008fcb;
	-moz-box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	-webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI5IDE0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9ImhhdDAiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4MT0iNTAlIiB5MT0iMTAwJSIgeDI9IjUwJSIgeTI9Ii0xLjQyMTA4NTQ3MTUyMDJlLTE0JSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMC4yIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KICAgPC9saW5lYXJHcmFkaWVudD4KCjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyOSIgaGVpZ2h0PSIxNCIgZmlsbD0idXJsKCNoYXQwKSIgLz4KPC9zdmc+);
	background-image: -moz-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: -o-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: -webkit-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
}
.toggle-box .noUi-horizontal .noUi-handle {
	left: -8px;
	top: -2px;
}
.toggle-box .noUi-handle {
	cursor: pointer;
	width: 16px;
	height: 16px;
	-moz-border-radius: 8px;
	-webkit-border-radius: 8px;
	border-radius: 8px;
	-moz-background-clip: padding;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	background: #f6f9fa; /* Old browsers */
	background: -moz-linear-gradient(top,  #f6f9fa 0%, #dbe6ea 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f6f9fa), color-stop(100%,#dbe6ea)); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(top,  #f6f9fa 0%,#dbe6ea 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(top,  #f6f9fa 0%,#dbe6ea 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(top,  #f6f9fa 0%,#dbe6ea 100%); /* IE10+ */
	background: linear-gradient(to bottom,  #f6f9fa 0%,#dbe6ea 100%); /* W3C */
	-moz-box-shadow: 0 1px 3px rgba(0,49,70,.66);
	-webkit-box-shadow: 0 1px 3px rgba(0,49,70,.66);
	box-shadow: 0 1px 3px rgba(0,49,70,.66);
}
.toggle.off {
	-moz-border-radius: 7px;
	-webkit-border-radius: 7px;
	border-radius: 7px;
	-moz-background-clip: padding;
	-webkit-background-clip: padding-box;
	background-clip: padding-box;
	background-color: #008fcb;
	-moz-box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	-webkit-box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	box-shadow: inset 0 1px 3px rgba(0,0,0,.25);
	background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDI5IDE0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48bGluZWFyR3JhZGllbnQgaWQ9ImhhdDAiIGdyYWRpZW50VW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiB4MT0iNTAlIiB5MT0iMTAwJSIgeDI9IjUwJSIgeTI9Ii0xLjQyMTA4NTQ3MTUyMDJlLTE0JSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMC4yIi8+CjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzAwMCIgc3RvcC1vcGFjaXR5PSIwLjIiLz4KICAgPC9saW5lYXJHcmFkaWVudD4KCjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyOSIgaGVpZ2h0PSIxNCIgZmlsbD0idXJsKCNoYXQwKSIgLz4KPC9zdmc+);
	background-image: -moz-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: -o-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: -webkit-linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
	background-image: linear-gradient(bottom, rgba(255,255,255,.2) 0%, rgba(0,0,0,.2) 100%);
}
.toggle-block.off {
	display: none;
}

.toggle-box.toggle-on-off .range {
	width: 21px;
}
.toggle-box.toggle-on-off .noUi-base {
	background: #5da74c;
	background: -moz-linear-gradient(top,  #5da74c 0%, #89c370 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#5da74c), color-stop(100%,#89c370));
	background: -webkit-linear-gradient(top,  #5da74c 0%,#89c370 100%);
	background: -o-linear-gradient(top,  #5da74c 0%,#89c370 100%);
	background: -ms-linear-gradient(top,  #5da74c 0%,#89c370 100%);
	background: linear-gradient(to bottom,  #5da74c 0%,#89c370 100%);
	box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);
	-moz-box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);
	-webkit-box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);
}
.toggle-box.toggle-on-off .noUi-origin {
	background: #c93b36;
	background: -moz-linear-gradient(top,  #c93b36 0%, #da584f 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#c93b36), color-stop(100%,#da584f));
	background: -webkit-linear-gradient(top,  #c93b36 0%,#da584f 100%);
	background: -o-linear-gradient(top,  #c93b36 0%,#da584f 100%);
	background: -ms-linear-gradient(top,  #c93b36 0%,#da584f 100%);
	background: linear-gradient(to bottom,  #c93b36 0%,#da584f 100%);
	box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);
	-moz-box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);
	-webkit-box-shadow: inset 0px 1px 3px rgba(0,0,0,0.25);

	-moz-border-radius: 7px;
	-webkit-border-radius: 7px;
	border-radius: 7px;
}
	.toggle-box.toggle-on-off span.on,
	.toggle-box.toggle-on-off span.off {
		cursor: pointer;
	}
	.toggle-box.toggle-on-off.off span.on {
		display: none;
	}
	.toggle-box.toggle-on-off span.off {
		display: none;
	}
	.toggle-box.toggle-on-off.off span.off {
		display: inline;
	}
	.toggle-box.toggle-on-off span.note {
		color: #606f76;
		font-size: 90%;
		display: block;
		float: left;
		margin-left: 10px;
	}


h2 .toggle-box {
	display: inline-block;
	margin-left: 15px;
}

</style>

<script type='text/javascript'>
	Link = $.noUiSlider.Link;
	function init_onoff_boxes($container, callback) {
		var slider_count = $container.find(".toggle-box").length;
		$container.find(".toggle-box").each(function(){
			var $toggle = $(this);
			(function($toggle){
				if (!window.setImmediate) {
					setTimeout(function(){
						init_onoff_box($toggle);
						slider_count--;
						if (slider_count === 0) {
							if (callback)
								callback();
						}
					}, 0);
				} else {
					setImmediate(function(){
						init_onoff_box($toggle);
						slider_count--;
						if (slider_count === 0) {
							if (callback)
								callback();
						}
					});
				}
			})($toggle);
		});
	}

	function init_onoff_box($toggle) {
		var $toggleRange = $toggle.find(".range");
		var $checkbox = $toggle.find("input");
		var $startVal = ($checkbox.prop('checked'))?1:0;
		$toggleRange.noUiSlider({
			start: $startVal,
			range: {
				'min': [0, 1],
				'max': 1
			},
			serialization: {
				lower: [
					new Link({
						target: toggle_on_off
					})
				],
				format: {
					decimals: 0
				}
			}
		}).addClass('toggle');

		$checkbox.on('change', function() {
			var checked_value = $(this).is(':checked') ? 1 : 0;
			var curr_value = $toggleRange.val();
			if (checked_value != curr_value) {
				$toggleRange.val(checked_value);
			}
		})

		$toggle.find(".left-label").on("click", function(){
			if (!($toggleRange.attr('disabled'))) {
				$toggleRange.val(0, { set: true });
			}
		});
		$toggle.find(".right-label").on("click", function(){
			if (!($toggleRange.attr('disabled'))) {
				$toggleRange.val(1, { set: true });
			}
		});
		$toggle.find(".noUi-handle").on("click", function(){
			var val = ($toggleRange.val()==1)?0:1;
			if (!($toggleRange.attr('disabled'))) {
				$toggleRange.val(val, { set: true });
			}
		});
		$toggle.find("span.on").on("click", function(){
			if (!($toggleRange.attr('disabled'))) {
				$toggleRange.val(0, { set: true });
			}
		});
		$toggle.find("span.off").on("click", function(){
			if (!($toggleRange.attr('disabled'))) {
				$toggleRange.val(1, { set: true });
			}
		});
		$toggle.on("set", function(){
			$(this).closest(".row").nextAll(".toggle-block").slideToggle("fast");
		});

	}


	$(document).on('ready', function() {
	});

	function toggle_on_off( value ){
		var $checkbox = $(this).closest(".toggle-box").find("input[type='checkbox']");
		if (value === '1') {
			$checkbox.attr('checked', 'checked').trigger('change');
		} else {
			$checkbox.attr('checked', 'checked').removeAttr('checked').trigger('change');;
		}
		$(this).parents(".toggle-box").toggleClass('off', value === "0");
	}
</script>
{/literal}
{/if}