
<script type="text/html" id="pmulti_{$block_id}">
	{if !isset($no_sub_container) || isset($no_sub_container)&&!$no_sub_container}
		<fieldset class="pmulti_block {if isset($sub_class)}{$sub_class}{/if} {if !isset($subtitle)||isset($subtitle)&&!$subtitle}no-legend{/if}" file="<%=FormController.file_index%>" vid="{$block_id}" number="<%=multiblockCounter%>">
		
	{else}
		<div class="pmulti_block {if isset($sub_class)}{$sub_class}{/if}" number="<%=multiblockCounter%>" file="<%=FormController.file_index%>" vid="{$block_id}">
	{/if}
	{if isset($subtitle)&&$subtitle}
		<legend class="{if isset($subtitle_class)&&$subtitle_class}{$subtitle_class}{else}col-md-10{/if}">{$subtitle}</legend>
	{/if}
	{if $send_counter}
		<input type="hidden" class="pmulti_counter" name="{if $send_counter_name}{$send_counter_name}{else}field[internal.counter.<%=multiblockCounter%>]{/if}" value="<%=multiblockCounter%>"/>
	{/if}
        <div class="row">
            <div class="col-md-4 mb-3 pmulti-del {if !$del_text}hidden{/if}"  data-template-id="pmulti_{$block_id}" serial="{if isset($count_to_add)&&$count_to_add}{$count_to_add}{else}1{/if}" count="<%=multiblockCounter%>" bid="{$block_id}">
		<a href="" class="multiblock-save"><span class="minus"></span>{if $del_text}{$del_text}{else}Удалить{/if}</a>
            </div>
	</div>
	{$inner}

	{if !isset($no_sub_container) || isset($no_sub_container)&&!$no_sub_container}
		</fieldset>
	{else}
		</div>
	{/if}
</script>
<fieldset id="{$block_id}" class="{if isset($container_class)}{$container_class}{else}{if !isset($no_sub_container) || isset($no_sub_container)&&!$no_sub_container}form-block{/if}{/if} pmulti {if !isset($title)}no-legend{/if}" serial="{if isset($count_to_add)&&$count_to_add}{$count_to_add}{else}1{/if}" count-req="{if isset($count_req)}{$count_req}{else}0{/if}" max="{if isset($count_max)&&$count_max}{$count_max}{else}0{/if}">
		{if isset($title)}<legend>{$title}</legend>{/if}
		{if !isset($is_draft)||isset($is_draft)&&$is_draft}<input type='hidden' class='magic' name='field[internal.staff][]' value='{$block_id}$'>{/if}
    <a href="" class="pmulti_link " id="{$block_id}_sub" vid="sub" bid="{$block_id}"  data-template-id="pmulti_{$block_id}"><span class="plus"></span> <span>{if $add_text}{$add_text}{else}Добавить{/if}</span></a>
</fieldset>
<script type="text/javascript">
	$('#{$block_id}').data('callback', { 
		//в функцию каллбека можно присвоить 2 параметра: new_block (добавленный блока), container (мультиблок весь целиком)
		'add_before': {if !empty($callback_add_before)} function(container){
            return !!{$callback_add_before|trim}
        } {else}false{/if},
		'add_after': {if !empty($callback_add_after)} function (container, new_block) {
            {$callback_add_after|trim}
		} {else}false{/if},
		'add_req_before': {if !empty($callback_add_req_before)} function (container) {
            return !!{$callback_add_req_before|trim}
		} {else}false{/if},
		'add_req_after':{if !empty($callback_add_req_after)} function (container, new_block) {
		    {$callback_add_req_after|trim}
		} {else}false{/if},
		'del_before': {if !empty($callback_del_before)} function (container, btn) {
            return !!{$callback_del_before|trim}
		}{else}false{/if},
		'del_after': {if !empty($callback_del_after)} function (container, btn) {
            {$callback_del_after|trim}
		}{else}false{/if},
        'draft_before': {if isset($callback_draft_before)} function (container) {
            return !!{$callback_draft_before|trim}
        }{else}false{/if},
		'draft_after':{if isset($callback_draft_after)} function (container, new_block) {
			{$callback_draft_after|trim}
		} {else}false{/if},
		'max':{if !empty($callback_max)} function (container, max) {
            {$callback_max|trim}
        } {else}false{/if},
		"copy_block":{if !empty($multi_block)}{$multi_block}{else}false{/if},
		"re_num":{if !empty($re_num)}{$re_num}{else}false{/if}
	}); 
</script>
