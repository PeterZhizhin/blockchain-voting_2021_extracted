{*
$name - название переменной инпута
$id - id блока
$style - стиль
$valuaA - значение слайдера в левом положении
$valueB - значение слайдера в правом положении
$selected = a/b выбранный элемент по умолчанию
$titleA - название левого пункта
$titleB - название правого пункта
$onchange - функция при изменении значения
$disabled
*}
<div class="form-horizoontal row wrap {$container_class}">
	<div class="col-xs-12 slider{if $disabled} disabled{/if}{if $class} {$class}{/if}" {if $id}id="{$id}"{/if} {if $style}style="{$style}"{/if}>
	<input type="radio" name="{$name}" value="{$valueA}" {if !$selected || $selected == "a"||$selected == $valueA}CHECKED{/if} class="hidden">
	<input type="radio" name="{$name}" value="{$valueB}" {if $selected == "b"||$selected == $valueB}CHECKED{/if}  class="hidden">
	<div class="left_block"><a name="{$valueA}" {if $disabled} class="disabled"{/if} href="" onclick="javascript:return false">{$titleA}</a></div>
	<div class="img">{if $selected == "b"||$selected == $valueB}<img src="{$CFG_MEDIA_HOST}/common/img/elem/slider-right.png">{else}<img src="{$CFG_MEDIA_HOST}/common/img/elem/slider-left.png">{/if}</div>
	<div class="right_block"><a href="" {if $disabled} class="disabled"{/if} name="{$valueB}" onclick="javascript:return false">{$titleB}</a></div>
	</div>
</div>
{if $onchange}<script type="text/javascript">$(document).ready(function() {
	var currentSliderSelectedInput = $('div.slider input[name="{$name}"]:checked');
    $('input[name="{$name}"]').change(function() {
        if (currentSliderSelectedInput.is($(this)))
            return;
        currentSliderSelectedInput = $(this);
    	{$onchange} 
    }); 
});</script>{/if}
<style>
    .slider .left_block {
    display: inline-block;
}
</style>