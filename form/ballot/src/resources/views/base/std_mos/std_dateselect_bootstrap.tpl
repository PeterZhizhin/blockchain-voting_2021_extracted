<script type='text/javascript'>
$(function(){        
    $('.dataselect-bs-start,.dataselect-bs-end').off('change.dateselect').on('change.dateselect',  function() {          
        var text = '',
            current = $(this).closest('.dataselect-body');
        
        if(current.find('.dataselect-bs-start').val()!='' && current.find('.dataselect-bs-end').val()!=''){
            text = current.find('.dataselect-bs-start').val()+' - '+current.find('.dataselect-bs-end').val();           
            current.find( ".js-main-dateselect" ).addClass('field--filled');
        } else {
            current.find( ".js-main-dateselect" ).removeClass('field--filled');
        }
        //make min date for second date
        if(current.find('.dataselect-bs-start').val()!=''){
            current.find('.dataselect-bs-end').datepicker('setStartDate',current.find('.dataselect-bs-start').val());
        } else{
            current.find('.dataselect-bs-end').datepicker('setStartDate','');
        }
        
        //make max date for first date
        if(current.find('.dataselect-bs-end').val()!=''){
            current.find('.dataselect-bs-start').datepicker('setEndDate',current.find('.dataselect-bs-end').val());
        } else{
            current.find('.dataselect-bs-start').datepicker('setEndDate','');
        }
        
        current.find('.js-main-dateselect input').val(text);    
    }); 
    $('.js-main-dateselect input').off('click.dateselect').on('click.dateselect',  function() {          
        $(this).closest('.dataselect-body').find('.dataselect-block').show();
        return false;
    });
    $('.js-main-dateselect .field__clear').off('click.dateselect').on('click.dateselect',  function() {  
        $(this).closest('.dataselect-body').find('.dataselect-bs-start').val('').datepicker('update');
        $(this).closest('.dataselect-body').find('.dataselect-bs-end').val('').datepicker('update');
    });
    $(document).mouseup(function (e){ 
        if(  
             !$('.dataselect-block').is(e.target)
             && $('.dataselect-block').has(e.target).length === 0             
             && !$('.datepicker').is(e.target)
             && $('.datepicker').has(e.target).length === 0
        ) 
        {            
            $('.datepicker,.dataselect-block').hide();
        }
    });    
});
</script>
<div class="dataselect-body col-md-4 form-group">
{include file="$base_template_path/std_blocks/std_text.tpl" label='Выбрать даты'  container_class="js-main-dateselect"}
<div class="dataselect-block">
        <span class="dataselect-block-title">Выбрать даты</span>
<div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_from) && $autocomplete_from && $autocomplete_from != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
		element-control	
		form-horizoontal
		wrap
                col-md-4 
                form-group                
	"
	{if $container_id}id="{$container_id}"{/if}
>
           <div class="field__inner">
            
            <input 
                class="
                dataselect-bs-start
                form-control field__input element-input master-field js-date-field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_from"{/if} type="text" name="{if isset($name_from)}{$name_from}{/if}" value="{if isset($value_from)}{$value_from}{/if}"{if isset($required) && $required} required="required"{/if}                
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999" placeholder="ДД.ММ.ГГГГ"/>
            
                {if isset($label_from)&&$label_from}
                    <label class="control-label field__label   element-label">
                            <span class="field__label-inner">{$label_from}{if isset($required) && $required} <span class="required"></span>{/if}</span>
                    </label>
		{/if}
	
            </div>
            
</div>
                <div
	class="
		field
		field--lg
		field--has-clear
		field--error-popup
		{if isset($value)&&$value!==false}field--filled{/if} 
		{if $container_class}{$container_class}{/if}
		{if isset($autocomplete_to) && $autocomplete_to && $autocomplete_to != ''}field--has-autocomplete{else}{/if}
		{if isset($hint) && $hint && $hint != 'false' || isset($hint_text) && $hint_text && $hint_text != 'false'}field--has-hint{/if}
		element-control		
		form-horizoontal
		wrap
                col-md-4 
                form-group
	"
	{if $container_id}id="{$container_id}"{/if}
>
           <div class="field__inner">
            
            <input 
                class="
                dataselect-bs-end
                form-control field__input element-input master-field js-date-field{if isset($class)} {$class}{/if}" {if isset($id)} id="{$id}_to"{/if} type="text" name="{if isset($name_to)}{$name_to}{/if}" value="{if isset($value_to)}{$value_to}{/if}"{if isset($required) && $required} required="required"{/if}
                
                data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"
                data-mask="99.99.9999" placeholder="ДД.ММ.ГГГГ"/>
            
                {if isset($label_to)&&$label_to}
                    <label class="control-label field__label   element-label">
                            <span class="field__label-inner">{$label_to}{if isset($required) && $required} <span class="required"></span>{/if}</span>
                    </label>
		{/if}
	
            </div>
    </div>            
</div>                
</div>                