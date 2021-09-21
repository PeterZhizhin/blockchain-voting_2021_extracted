<script type='text/javascript'>    
    $.validator.addMethod('dataselect-bs-start', function(value, element) {        
        if(value.length==0) return true;                
        var date_value = tools.str2date(value);                
        if (date_value=='Invalid Date') {
                return false;
        } 
        if($(element).closest('.dataselect-body').find( ".dataselect-bs-end" ).val().length==10){
            var date_end = tools.str2date($(element).closest('.dataselect-body').find( ".dataselect-bs-end" ).val());                            
            if (date_end!='Invalid Date' && date_value>date_end) {
                    return false;
            }          
        }
        return true;
    });
    $.validator.addMethod('dataselect-bs-end', function(value, element) {        
        if(value.length==0) return true;                       
        var date_value = tools.str2date(value);                
        if (date_value=='Invalid Date') {
                return false;
        }    
        if($(element).closest('.dataselect-body').find( ".dataselect-bs-start" ).val().length==10){
            var date_start = tools.str2date($(element).closest('.dataselect-body').find( ".dataselect-bs-start" ).val());                
            if (date_start!='Invalid Date' && date_value<date_start) {
                    return false;
            }          
        }
        return true;
    });
$(function(){  
    var showCalendar = false;
    $('.js-main-dateselect input').off('click.dateselect').on('click.dateselect',  function() {                             
       $(this).closest('.dataselect-body').find('.dataselect-block').toggle();      
       return false;
    });   
    $('.dataselect-bs-start').off('change.dateselect').on('change.dateselect',  function() {          
        var current = $(this).closest('.dataselect-body');        
        if(current.find('.dataselect-bs-start').val().length==10 && !current.find('.dataselect-bs-start').hasClass('error') && current.find('.dataselect-bs-end').hasClass('error')){         
            current.find('.dataselect-bs-end').trigger('change');
        }         
        changeDateField(current);
    }); 
    $('.dataselect-bs-end').off('change.dateselect').on('change.dateselect',  function() {          
        var current = $(this).closest('.dataselect-body');        
        if(current.find('.dataselect-bs-end').val().length==10 && !current.find('.dataselect-bs-end').hasClass('error') && current.find('.dataselect-bs-start').hasClass('error')){
           current.find('.dataselect-bs-start').trigger('change');
        }                      
        changeDateField(current);
    });    
    $('.js-main-dateselect .field__clear').off('click.dateselect').on('click.dateselect',  function() {  
        $(this).closest('.dataselect-body').find('.dataselect-bs-start').val('').datepicker('update');
        $(this).closest('.dataselect-body').find('.dataselect-bs-end').val('').datepicker('update');
    });
    
    $(document).on('mouseup touchstart', function(e){
        if(  
             !$('.dataselect-block').is(e.target)
             && $('.dataselect-block').has(e.target).length === 0             
             && !$('.datepicker').is(e.target)
             && $('.datepicker').has(e.target).length === 0
             && !e.target.classList.contains("js-main-dateselect-input")             
        ) 
        {            
        
            $('.datepicker,.dataselect-block').hide();
        }
    });
  
    
    function changeDateField(current){
        var text = '';                    
        if(current.find('.dataselect-bs-start').val().length==10 && !current.find('.dataselect-bs-start').hasClass('error')){
            text +=current.find('.dataselect-bs-start').val();            
        }
        text += ' - ';
        if(current.find('.dataselect-bs-end').val().length==10 && !current.find('.dataselect-bs-end').hasClass('error')){
            text +=current.find('.dataselect-bs-end').val();                     
        }              
        if(text == ' - '){                        
            current.find( ".js-main-dateselect" ).removeClass('field--filled');
        } else {
            current.find( ".js-main-dateselect" ).addClass('field--filled');            
        }
        current.find('.js-main-dateselect input').val(text);    
    }

});
</script>
<div class="dataselect-body form-group col-md-4">
{include file="$base_template_path/std_blocks/std_text.tpl" label={$label}  container_class="js-main-dateselect col-filter" class="js-main-dateselect-input" readonly=true validator=""}
<div class="dataselect-block">
        <span class="dataselect-block-title">{$label}</span>
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
                data-validatefunction="dataselect-bs-start date_in_date {if isset($validator)}{$validator}{/if}"
                {if isset($validator)}data-default-validator="date_in_date {$validator}"{/if}
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
                data-validatefunction="dataselect-bs-end date_in_date {if isset($validator)}{$validator}{/if}"
                {if isset($validator)}data-default-validator="date_in_date {$validator}"{/if}
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