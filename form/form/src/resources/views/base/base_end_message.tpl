{block name="add_content"}{/block}
{block name="files"}{/block}


{capture assign = "message_type"}  
        {block name="message_type"}{/block} 
    {/capture}
<div class="form-result {$message_type} shadow-bottom">
	{block name="message_header"}<h2>Статус</h2>{/block}
        <input type="hidden" name="org_id" value="{$org_id}">
        <input type="hidden" name="form_id" value="{$form_id}">  
	{if !empty($app.APP_DATE)}<p>Дата и время подачи заявления: <b>{$app.APP_DATE|date_format:'%d.%m.%Y %H:%M:%S'}</b></p>{/if}
	{block name="message_complete_text"}
		{if $app.REG_NUM}
			<p class="app_id hidden">Номер заявления: <b>{$app.APP_ID}</b></p>
			<p class="reg_num">Единый регистрационный номер: <b>{$app.REG_NUM}{*{$app.REG_NUM|regex_replace:"/[0-9]+\-[0-9]+\-[0-9]+\-/":""|regex_replace:"/\/[0-9]+/":""}*}</b></p>
		{elseif $app.APP_ID}	
			<p class="app_id">Номер заявления: <b>{$app.APP_ID}</b></p>
		{/if}
	{/block}


{if trim($message_type)=="info"}
    {capture assign = "info_message_add_text"}  
        {block name="message_add_text"}{/block} 
    {/capture}
    {include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="" color="orange" text=$info_message_add_text}
{else}
    {block name="message_add_text"}{/block} 
{/if}


</div>