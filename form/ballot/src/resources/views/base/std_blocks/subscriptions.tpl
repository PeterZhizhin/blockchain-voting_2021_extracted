<script type="text/html" id="subscriptionsTemplate">
    <div class="form-infobox green">
        Настройте подписку на персональные уведомления.
        Для изменения настроек подписок и просмотра всех уведомлений перейдите в <a href="<%=elk_url%>" target="_blank">Личный кабинет</a>.
    </div>
    <form action="#" class="elk-save-popup subscription" id="elk-save-subscription-form" novalidate="novalidate">
        <fieldset class="form-block">
            <%=body%>
        </fieldset>
        <div class="right">
            <a class="button green" id="elk-subscription-button" href="#">Сохранить</a>&nbsp;
            <a class="dashed-link messagebox-close btn-close-pop" id="elk-subscription-cancel-button" href="#">Не сохранять</a>
        </div>
    </form>
</script>
{* Типы подписок *}
<script type="text/html" id="subscriptionsItem">
    <div>
        <div>
            <div class="channel-block">
                <strong><%=name%></strong>
            </div>
            <div class="channel-block">
                <%=items%>
            </div>
        </div>
        <div class="setting-block">
            <%=settings%>
        </div>
    </div>
</script>
{* Опции подписок (sms, email, push) *}
<script type="text/html" id="subscriptionsChannelOptions">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" value="<%=code%>" label="<%=name%>" name="subscription_settings[<%=streamId%>][]" id="elk-stream-<%=code%>-<%=streamId%>" dataProperties='data-stream-id="<%=streamId%>" data-subscribe-type="<%=code%>"<%=checked%><%=disabled%>' class="elk-streams <%=settingClass%>" container_class="<%=containerClass%>"}
</script>

{* Если основание подписки - машина *}
<script type="text/html" id="subscriptionsVehicleItem">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" class="elk-stream-options <%=optionClass%>" label="<%=comment%>"  value="<%=value%>" name="subscription_options[<%=streamId%>][]" id="elk-setting-VEHICLE-<%=streamId%>-<%=value%>" dataProperties='data-format="<%=field%>|<%=optionId%>" data-stream-id="<%=streamId%>"<%=checked%>'}
</script>

{* Если основание подписки - квартира *}
<script type="text/html" id="subscriptionsHouseItem">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" class="elk-stream-options <%=optionClass%>" label="<%=comment%>"  value="<%=value%>" name="subscription_options[<%=streamId%>][]" id="elk-setting-HOUSE-<%=streamId%>-<%=value%>" dataProperties='data-format="<%=field%>|<%=optionId%>" data-stream-id="<%=streamId%>"<%=checked%>' }
</script>

{* Если основание подписки - ЕГЭ *}
<script type="text/html" id="subscriptionsGiaItem">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" class="elk-stream-options <%=optionClass%>" label="<%=comment%>"  value="<%=value%>" name="subscription_options[<%=streamId%>][]" id="elk-setting-GIA-<%=streamId%>-<%=value%>" dataProperties='data-format="<%=field%>|<%=optionId%>" data-stream-id="<%=streamId%>"<%=checked%>'}
</script>

{* Если основание подписки - олимпиада  *}
<script type="text/html" id="subscriptionsOlympiadItem">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" class="elk-stream-options <%=optionClass%>" label="<%=comment%>"  value="<%=value%>" name="subscription_options[<%=streamId%>][]" id="elk-setting-OLYMPIAD-<%=streamId%>-<%=value%>" dataProperties='data-format="<%=field%>|<%=optionId%>" data-stream-id="<%=streamId%>"<%=checked%>'}
</script>
{* Если основание подписки - ВУ  *}
<script type="text/html" id="subscriptionsDriverItem">
    {include file="$base_template_path/std_blocks/std_checkbox.tpl" class="elk-stream-options <%=optionClass%>" label="ВУ <%=comment%>"  value="<%=value%>" name="subscription_options[<%=streamId%>][]" id="elk-setting-DRIVER_LICENSE-<%=streamId%>-<%=value%>" dataProperties='data-format="<%=field%>|<%=optionId%>" data-stream-id="<%=streamId%>"<%=checked%>'}
</script>

<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/subscriptions.js?time={$smarty.now|date_format:'%Y-%m-%dT%H'}"></script>