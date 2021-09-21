{*шаблон для простой электронной подписи, сам будет протягиватьв услуги, нужно только в классе фомры поднять параметр pep_status = array('1052')*}
{*
	обязательно передавать либо ено $eno либо app_id $app_id

*}
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/pep.js?{$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
{if !empty($app_id) || !empty($reg_num) }
	{*{if !empty($app_id)}{$service_number=$app_id}{else}{$service_number=$reg_num{/if}*}
	
	{literal}
	<script type="text/javascript">
	$(document).ready(function () {	
		//if (MPGU!=undefined) {
			if (MPGU.controller===undefined) MPGU.controller={};
			MPGU.controller.pep = true;
		//}
	});
	</script>
	{/literal}

	<script type="text/html" id="pep_template">
		
			<fieldset class="form-block pep_block" num="<%=num%>">
				<legend>Подписание простой электронной подписью</legend>
				
				<input type="hidden" name="pep" value="<%=action%>"/>
				<input type="hidden" name="pep_num" value="<%=num%>"/>
				
				<% if (num) { %>
					{include file="$base_template_path/std_blocks/std_infoblock.tpl" id="pep_infoblock" container_class="" color="orange" 
					text="Вам необходимо подписать данное обращение с помощью смс подтверждения. 
				ОИВ выслал на указанный Вами в заявлении телефонный номер смс с порядковым номером для заявления <b>{if !empty($reg_num)}$reg_num{else}$app_id{/if}</b>."}
					{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="pep_cancel" container_class="visual_controller" 
					label="Я отказываюсь подписывать данное обращение." value="1" name="field[internal.pep_cancel]"}
					<div class="visual visual_0">
					{include file="$base_template_path/std_blocks/std_text.tpl" label="Код №<%=num%>" class="pep_input" mask="9|repeat" maxlength="10" minlength="4" required=true id="pep_input" container_id="" name="pep_value" value="" hint="4-10 цифр, вида 999999"}
				<% } else { %>
					{include file="$base_template_path/std_blocks/std_infoblock.tpl" id="error_pep_block" container_class="" color="orange" 
					text="<%=info%>"}					
				<% } %>
				
				<% if (accept) { %>{include file="$base_template_path/std_blocks/std_push_button.tpl" skip_init=true id="get_new_code"  title="Запросить новый код" color_and_size="green" container_id=""  container_class=""}<% } %>
					</div>
			</fieldset>

	</script>

{/if}
