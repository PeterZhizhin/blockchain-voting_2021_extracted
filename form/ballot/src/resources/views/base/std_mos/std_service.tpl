{*Представляет собой набор услуг, в котором выбирается один из вариантов
	value - задает значение, выбранное по умолчанию
	containder_id =  id блока service_block
	items - массив услуг
	hint - справка
	name - название поля, которое отправляется
	label - название блока главное
	label_service - название блока услуг
	label_service_name - название выбранной услуги
	sub_label - название блока условий
	sub_input_required = true
	name_input = название поля условия 
	subservice_class - css класс для подгруппы услуги ( радио или чекбокс )
	type_input - радио или чекбокс, по умолчанию радио
*}

<div class="service_blocks ">

<fieldset class="form-block field field--error-popup radio-group form-group {if $block_class}{$block_class}{/if}">
	{if isset($label)&&$label}<legend>{$label}</legend>{/if}

<div class="wrap row service_block {if isset($container_class)} {$container_class}{/if}"  id="{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}">
	<input type='text' style="opacity:0; width:0px; height:20px;  position: absolute;" class="service_hidden" name='internal.{if isset($name)&&$name}{$name}{else}service{/if}' required="required" value="">
	<legend class="col-md-11 col-sm-11 col-xs-10">{if isset($label_service)&&$label_service}{$label_service}{else}Популярные услуги:{/if}{if isset($required) && $required} <span class="required"></span>{/if}</legend>
    <div class="col-md-1 col-sm-1 col-xs-2">
	<div class="additional{if isset($hint)&&$hint || isset($hint_text)} hint-button{/if}">{if isset($hint)&&$hint || isset($hint_text)}
			<div class="hint hint-left {if $label}hint-padding{/if}" >
				{if isset($hint)}
					{$hint}
				{else}
					<p class="header">{$hint_header}</p>
					<p>{$hint_text}</p>
				{/if}
				<div class="close"></div>
			</div>
	{/if}</div>
    </div>        
	{foreach from=$items item=item_name key=item_key}
            <div class="row service_row">
		<div class="holder col-md-12">
			<a href='#{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}' vid="{$item_key}" code="{if $item_name.code}{$item_name.code}{else}{$item_key}{/if}" class="dashed-link {if isset($class)&&$class}{$class}{/if}" id="{if isset($id)&&$id}{$id}{elseif isset($name)&&$name}{$name}{else}service{/if}-{$item_key}">{$item_name.name}</a>
		</div>
            </div>
	{/foreach}	
</div>
<div class="row"><div class="col-md-4"><div class="field__inner"></div></div></div>        
</fieldset>	
<fieldset class="form-block hidden no-legend form-group">
	<div class="wrap  service_block_control" id="{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}_result" vid="{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}">
		<div class="holder">
			<legend>{if isset($label_service_name)&&$label_service_name}{$label_service_name}{else}Услуга:{/if}</legend>
			<div class="title">Наименование услуги</div>
			<div class="delete_btn service_del" alt="Удалить" title="Удалить" ><a href="#" class="dashed-link">отменить выбор</a></div>
			<input type='hidden' class="service_value" name='{if isset($name)&&$name}{$name}{else}service{/if}' value="{if isset($value)&&$value}{$value}{/if}" />
			<input type='hidden' class="service_code" name='field[internal.staff][]' value='{if isset($name)&&$name}{$name}{else}service{/if}$'>	
		</div>
	</div>
	
</fieldset>	
	
<script type="text/javascript">
{if isset($sub_label)&&$sub_label}{else}{assign var="sub_label" value='Условия'}{/if}
{literal}
var {/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if} = {$items|json_encode};{literal}

		
		$('.service_block .holder a').off('click.service').on('click.service', function(){
			var block= $(this).closest('.service_block');
			var id = block.attr('id');
			var name = block.attr('name');
			var input_name = {/literal}'{$name_input}'{literal};
			var sub_label_name = {/literal}'{$sub_label}'{literal};                                                
			if (!block.hasClass('disabled')) {
                                $(this).closest('.service_block').find('a').removeClass('service_checked');
                                $(this).addClass('service_checked');
				var mas = {/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}{literal}[$(this).attr('vid')]['items'];
				block.addClass('disabled');
				block.find('.hint-button').addClass('disabled');
                                block.find('a').addClass('disabled');
				var res_obj = $('#'+id+'_result');
				var count = 0;
				var name= false;
				var form = res_obj.closest('.form-block');                                
				var temp_input_name = {/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}{literal}[$(this).attr('vid')]['field']!=undefined?{/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}{literal}[$(this).attr('vid')]['field']:input_name;
				var temp_sub_label_name = {/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}{literal}[$(this).attr('vid')]['label']!=undefined?{/literal}{if isset($container_id)&&$container_id}{$container_id}{else}service{/if}{literal}[$(this).attr('vid')]['label']:sub_label_name;
				if (typeof mas == 'object') count=Object.keys(mas).length;
				else count = mas.length;
				if (count>0) {
					{/literal}{if isset($type_input)&&$type_input=='checkbox'}
						var html = ''; for (var j in mas){ html+= OPR.templater('checkbox', { data:mas[j],name:temp_input_name,label:mas[j],key:j,container_class:'{$subservice_class}'+j });}
					{else}
						var html = OPR.templater('radio', { data:mas,name:temp_input_name,label:temp_sub_label_name,key:j});
					{/if}{literal}
					
					res_obj.after(html);
					
					var holder =  form.find('.subservice_block .radiogroup')?form.find('.subservice_block .radiogroup'):form.find('.subservice_block .checkbox');
					{/literal}
					{if isset($type_input)&&$type_input=='checkbox'}
						
					{else}
						
						if (count>1) {
							//Из-за  проблемы радиогруппы, нужно из 1 кнопки сделать множество
							for (var i=1; i<=count-1;i++)	holder.after(holder.clone());

						}

						i=1;                                                
						for (var j in mas){
							i++;
							var obj = form.find('.radiogroup:nth-child('+i+')');
							name = obj.find('input[type=radio]').attr('name');
                                                        obj.attr('id','subservice_'+i);                                                        
							obj.find('input[type=radio]').attr('id','input_'+i).attr('vid',i).val(j).removeAttr('checked').attr('required','required').rules('add',{ required:true });
							obj.find('label').attr('for','input_'+i).html(mas[j]);
						}
					
					{/if}{literal}
					FormController.initialize(res_obj.closest('.form-block'));

				}
				//навеси событие обновления кода сервиса
				form.find('.subservice_block input:radio').on('change',function(){
					var service_value = $(this).closest('.form-block').find('.service_value');
					var arr_service = (service_value.attr('code')!=undefined)?service_value.attr('code').split(','):'';
					if (arr_service.length>1) {
						if (arr_service.length>=$(this).attr('vid')) {
							service_value.val(arr_service[$(this).attr('vid')-1]).trigger('change');
						}
						else service_value.val(arr_service[0]).trigger('change');
					}
				});
				res_obj.find('.title').html($(this).html());
				if ($(this).attr('code').split(',').length>1) {
					res_obj.find('input.service_value').attr('vid',$(this).attr('vid')).attr('code',$(this).attr('code')).val('').trigger('change');
				}
				else res_obj.find('input.service_value').attr('vid',$(this).attr('vid')).val($(this).attr('code')).trigger('change');
				
				var old = res_obj.find('input.service_code').val();
				var temp_old = old.split('$');
				res_obj.find('input.service_code').val(temp_old[0]+'$'+$(this).attr('vid'));
				block.find('.service_hidden').val(1).trigger('change').valid();
				
				res_obj.closest('.form-block').show();
				if (!block.hasClass('prog')) {
					var offset = res_obj.offset();
					$('html, body').animate({ scrollTop: offset.top }, 1100, function(){});
				}
				else block.removeClass('prog');
				
			}
			{/literal}{if !empty($service_callback)}
				var $service_callback = {$service_callback};
				if (typeof $service_callback ==='function') $service_callback();
			{/if}{literal}
		
			return false;
		});
                
		$('.service_block_control .service_del a').click(function(){
			var block= $(this).closest('.service_block_control');                        
			var id = block.attr('vid');
                        $(this).closest('.service_blocks').find('a').removeClass('service_checked').removeClass('disabled');;
			$('#'+id).removeClass('disabled').find('.hint-button').removeClass('disabled');
			$('#'+id).find('.service_hidden').val('').trigger('change').valid();
			block.find('.title').html('');
			block.find('input.service_value').val('').attr('vid',false).trigger('change');
			var old = block.find('input.service_code').val();
			var temp_old = old.split('$');
			block.find('input.service_code').val(temp_old[0]+'$');
			block.closest('.form-block').hide().find('.wrap').each(function(){
				if (!$(this).hasClass('service_block_control')) $(this).remove();
			});
			
			var offset = $('#'+id).offset();
			$('html, body').animate({ scrollTop: offset.top }, 1100, function(){});
			return false;
		});
	
		OPR.FormLoader.addListener('{/literal}{if isset($name)&&$name}{$name}{else}service{/if}{literal}', function(object, fields) {
			if (object[1]!='') {
				var id = $('[name="'+object[0]+'"]').closest('.wrap').attr('vid');
				$('#'+id).addClass('prog').find('.holder a[vid="'+object[1]+'"]').click();

			}

		return [];
		});
		

{/literal}
</script>

{if !isset($sub_input_required)||$sub_input_required}{assign var="sub_input_required" value=true}{/if}
{if isset($container_id)&&$container_id}{assign var="container_id" value=$container_id+'_radio'}{else}{assign var="container_id" value='service_radio'}{/if}

<script id="radio" type="text/html">
	{include file="$base_template_path/std_blocks/std_radiogroup.tpl" label='<%=label%>' required=$sub_input_required container_class="subservice_block" container_id=$container_id items="<%=data%>" name="<%=name%>" id="check_service_<%=key%>" hint=false  label_position="top"}
</script>

<script id="checkbox" type="text/html">
	{include file="$base_template_path/std_blocks/std_checkbox.tpl" label='<%=label%>' required=false container_class="subservice_block <%=container_class%>" container_id="check_service_block_<%=key%>" items="<%=data%>"
		name="<% if (name.indexOf('counter')>=0) { name=name.replace(/counter/,key); %><%=name%><% } else { %><%=name%>[<%=key%>]<% } %>" 
		id="check_service_<%=key%>" value="{if !empty($value)}{$value}{else}<%=key%>{/if}" validator="require_from_group|1|.check_service"  class="check_service"}
</script>

</div>