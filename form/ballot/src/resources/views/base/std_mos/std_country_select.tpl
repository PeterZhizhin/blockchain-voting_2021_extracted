{include file="$base_template_path/std_mos/std_select.tpl" 
label="{if isset($label)&&$label}{$label}{else}Страна{/if}"
context_search="{if isset($context_search)&&$context_search}true{/if}" 
multiple="{if isset($multiple)&&$multiple}multiple{/if}" 
id="{if isset($id)&&$id}{$id}{else}country{/if}"
name="{if isset($name)&&$name}{$name}{else}country{/if}" 
error_message="{if isset($error_message)&&$error_message}{$error_message}{else}Поле заполнено некорректно{/if}" 
required="{if isset($required) && $required}required{/if}" 
text="{if isset($text)&&$text}{$text}{/if} "
no_results_text="{if isset($no_results_text)&&$no_results_text}{$no_results_text}{/if} "
items=$std_country_select
container_class="country_select {$container_class}"
}

{*
оставил для будущего перевода на асинхрон
<script type="text/javascript">
	value ={if isset($value)&&$value}'{$value}'{else}false{/if};
	{literal}
		$.ajax({
					url: document.location,
					dataType: 'json',
					data: {
						ajaxModule: 'std_block',
						ajaxAction: 'country_list',
						ajaxSend: 1
					}}).done(function(data) {
					if (data.error==0) {
						var html ='';
						for (var i in data.result) {
							html+='<option value="'+data.result[i].key+'" '+((data.result[i].key==value)?'selected=selected':'')+'>'+data.result[i].value+'</option>';
						}
						$('[name="{/literal}{if isset($name)&&$name}{$name}{else}country{/if}{literal}"]').html(html).trigger("chosen:updated").valid();
					}
					else
						console.log(data.error)
		});
	{/literal}
</script>*}

		