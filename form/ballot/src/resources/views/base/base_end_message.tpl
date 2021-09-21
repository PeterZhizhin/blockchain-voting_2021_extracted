{block name="add_content"}{/block}
{block name="files"}{/block}

{capture assign = "message_type"}
        {block name="message_type"}{/block} 
    {/capture}
<div class="form-result {$message_type} shadow-bottom">
	<h2>{block name="message_header"}{/block}</h2>
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

{if isset($show_error)&&$show_error}
	{if isset($error_text)&&$error_text}
		<p>{$error_text}</p>
	{else}
		<p>В настоящее время сервис ведомства недоступен.</p>
	{/if}
{/if}

{if trim($message_type)=="info"}
    {capture assign = "info_message_add_text"}  
        {block name="message_add_text"}{/block} 
    {/capture}
    {include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="" color="orange" text=$info_message_add_text}
{else}
    {block name="message_add_text"}{/block} 
{/if}

{if $unsubscribeEmailEnabled}
    <script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/base/unsubscribeEmail.js?cache={$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" 
        name="unsubscribeEmailEnabled" 
        label="Получать уведомления о статусе рассмотрения заявления на электронную почту, указанную в личном кабинете."
        required=false
        class=""
        container_class="small in_text"
        validator=""
        checked=true
    }
    <p>Если Вы не хотите получать уведомления на электронную почту, нажмите <a href="" class="unsubscribeEmailLink">Отказаться от подписки</a></p>
    <div class="info-message-small hidden unsubscribeEmailMessage"></div>
{/if}

{if empty($hide_cutalog_button)}
<div class="form-result-back-button" style="display:inline-block; width:100%; padding-bottom:0px;">
    <form class="sub_form">
        {block name="rate"}{include file="$base_template_path/std_blocks/std_rate_form.tpl"}{/block}
    </form>

        <span class="right">
            <a href="{$CFG_MAIN_HOST}/ru/" class="button btn btn-show btn-primary">Перейти в каталог услуг</a>
        </span>
    </div>
{elseif $hide_cutalog_button != 'hide_all'} {* dirty hack *}
    <div style="text-align: center;"><a href="{$CFG_MAIN_HOST}/ru/">Перейти в каталог услуг</a></div>
{/if}



</div>
{if $show_Scenarious}
	<div class="col-md-12 col-sm-12 col-xs-12">
		{$Scenarious}
	</div>
{/if}

{if $ACBlockEnabled}
<link rel="stylesheet" type="text/css" href="{$CFG_CSS_HOST}/common/css/new/ac.css" />
<div id="acblock-alt">
    <div class="acblock-logo"></div>
    <div class="acblock-text">
        <p>По инициативе мэра г.Москвы Сергея Семёновича Собянина запущена система электронных референдумов <a href="http://ag.mos.ru" target="_blank">Активный гражданин</a>. Теперь каждый житель города Москвы имеет возможность принять участие в решении важных для города проблем. В данный момент в городе Москве проходят референдумы по следующим вопросам:</p>
        <ul class="list-blue">
			{foreach from=$ACBlockLinks item=item}
				<li><a href="{$item.url}">{$item.title}</a></li>
			{/foreach}
        </ul>
        <p>Принять участие в электронных референдумах Вы можете прямо сейчас, используя Ваш логин и пароль от портала государственных услуг, никакой дополнительной регистрации не требуется.</p>
    </div>
    <div style="clear:both"></div>
</div>
<a href="http://ag.mos.ru" class="button green-small acblock-alt-button">Перейти к опросам</a>
{/if}

{if $IspkSubscribe}
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/base/subscribeIspk.js?cache={$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>
<style>
        .subscribeIspk-container p {
            color:#9EA4AC !important;
            font-family: "PT Sans";
        }
        .ispk_system{
            margin-top:20px;
            border-bottom: 1px solid #ccc;
            float: none;
            min-height: 70px;
            display:inline-block;
            width:100%;
        }
        .ispk_block{
            padding-left:60px;
            border-right: 1px solid #ccc;
            padding-right:10px;
            padding-bottom: 5px;
                min-width:140px;
        }
        .subscribeIspk_info a {
            color:#9EA4AC;
            text-decoration:underline;
        }
        .ispk_block_viber{
            background: url({$CFG_CSS_HOST}/common/img/mos-ru/viber_brand.svg) no-repeat 0px 0px;
        }
        .ispk_block_telegram{
            background: url({$CFG_CSS_HOST}/common/img/mos-ru/telegram_brand.svg) no-repeat 0px 0px;
        }
        .ispk_block .wrap .checkbox{ padding-top: 9px;}
        .subscribeIspk-other{
            padding: 0px 10px 0px 30px;
            color:#9EA4AC !important;
            font-family: "PT Sans";
            
        }
        .ispk_block  .custom-checkbox{
            padding-top:15px;
        }
        .ispk_block,.subscribeIspk-other{
            float: left;
        }
        .dashed-link.messagebox-close {
            margin-left: 40px;
            margin-right: 20px;
            white-space: nowrap;
        }
        @media (width: 320px) {
           .subscribeIspk-other{
            padding: 0px 10px 0px 10px;
            font-size:10px !important;
            }
        }
        .subscribeIspk_info{ font-size:14px !important; color:#9EA4AC !important; font-family: "PT Sans";}
    </style>
    <script type="text/html" id="subscribeIspk">
	<div id="subscribeIspk-container">
        <p class="">Для оперативного получения информации об изменении статуса рассмотрения заявления можно подписаться на получение уведомлений через меcсенджеры.</p>
        <div class="ispk_system">
            <%for (var system in systemArr) { %>
                <div class="ispk_block col-md-4 col-s-5 col-xs-5 ispk_block_<%=system%>">
                    {include file="$base_template_path/std_blocks/std_checkbox.tpl" 
                                name="<%=system%>" 
                                id="subscribeIspk-<%=system%>"
                                label="<%=systemArr[system]%>"
                                required=false
                                class=""
                                validator=""
                                value="<%=system%>"
                                checked=true
                            }
                </div>
            <%}%>
                <div class="subscribeIspk-other col-md-5 col-xs-5">
                    Скоро тут будут дополнительные подписки
                </div>           
        </div>
        <p class="subscribeIspk_info">Обратите внимание, что использование мессенджеров возможно при наличии интернет-соединения, соответствующего мобильного приложения и настроек, разрешающих получать сервисные сообщения. <a target="_blank" download href="{$CFG_MAIN_HOST}/common/upload/Инструкция для пользователя.pdf">Подробнее о настройках</a>. Подписка для пользователя бесплатна.</p>
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="red" id="SaveError" container_class="ispk_message hidden" text="Извините, сервис подписки на уведомления через мессенджеры сейчас недоступен. Следите за статусом Вашего заявления в Личном кабинете или в мобильном приложении «Госуслуги Москвы»."}	
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="red" id="SaveErrorCustom" container_class="ispk_message hidden" text=""}	
	
        <div class="">
		<a class="btn btn-primary btn-lg button green" id="subscribeIspk-save-button" href="#">Подписаться</a>
		<a class="dashed-link messagebox-close btn-close-pop" id="subscribeIspk-cancel-button" href="#">Отменить</a>
	</div>
</script>
{/if}
