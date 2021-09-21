{assign var='label' value=$label|default:'Серия и номер водительского удостоверения'}
{assign var='required' value=$required|default:''}

{assign var='ds_name' value=$ds_name|default:'driverLicenceSerie'}
{assign var='ds_id' value=$ds_id|default:'driverLicenceSerie'}
{assign var='ds_error_message' value=$ds_error_message|default:'Поле заполнено некорректно'}
{assign var='ds_value' value=$ds_value|default:''}
{assign var='ds_class' value=$ds_class|default:'sn_serie'}

{assign var='dn_name' value=$dn_name|default:'driverLicenceNumber'}
{assign var='dn_id' value=$dn_id|default:'driverLicenceNumber'}
{assign var='dn_error_message' value=$dn_error_message|default:'Поле заполнено некорректно'}
{assign var='dn_value' value=$dn_value|default:''}
{assign var='dn_class' value=$dn_class|default:'sn_number'}

{assign var='hint' value=$hint|default:'В нижней части водительского удостоверения, красными чернилами, пропечатаны серия и номер бланка удостоверения: <div class="vu-hint"></div>'}
<script>
    {literal}

    $(document).ready(function() {
        var params = {
            {/literal}ds_name: '{$ds_name}',
            dn_name: '{$dn_name}',
            ds_id: '{$ds_id}',
            dn_id: '{$dn_id}',
            is_required: '{$required}'{literal}};
        var dn = $('input#' + params.dn_id);
        var validation_rules = {};
        //ВУ
        var ds = $('input.has-licence-serie');
        if (ds.length) {
            $.validator.addMethod('gibdd_licence_serie', function(value, element) {
                return value == '' || /^\d\d[АБВЕКМНОРСТУХавекмнорстух\d]{2}$/.test(value);
            });
            ds.rules('add', {gibdd_licence_serie: true, minlength: 4, maxlength: 4});
        }
        var dn = $('input.has-licence-number');
        if (dn.length) {
            dn.rules('add', {digits: true, minlength: 6, maxlength: 6});
            dn.keyup(function(e) {
                if (e.keyCode == 8 && $(this).val() == '')
                    $(this).prev("input").focus();
            });
        }
    });

    {/literal}
</script>
<div class="form-horizoontal row wrap{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}>
    <label class="col-md-3 col-sm-4 col-xs-10" for="{$ds_id}">{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>
    <div class="holder  col-md-8 col-sm-7 col-xs-12">
        <div class="col-md-3 col-sm-4 col-xs-6">
            <input
                    class="{$ds_class} has-gibdd-letters has-licence-serie form-control" id="{$ds_id}" type="text"
                    name="{$ds_name}" value="{$ds_value}" data-error-message="{$ds_error_message}"
                    data-pattern=".{ldelim}0,4{rdelim}"
                    maxlength="4"
                    data-mask="99@@"{if $required} required{/if}{if isset($ds_placeholder)} placeholder="{$ds_placeholder}"{/if}
            />
        </div>
        <div class="col-md-3 col-sm-4 col-xs-6">
            <input
                    class="{$dn_class} has-licence-number form-control" id="{$dn_id}" type="text" name="{$dn_name}"
                    value="{$dn_value}" data-error-message="{$dn_error_message}"
                    data-pattern=".{ldelim}0,6{rdelim}"
                    maxlength="6"
                    data-mask="999999"
                    {if $required} required{/if}
                    {if isset($dn_placeholder)} placeholder="{$dn_placeholder}"{/if}
            />
        </div>
    </div>
    <div class="col-md-1 col-sm-1 col-xs-2">
        <div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}{if isset($postscriptum)} postscriptum{/if}">
            {if isset($hint) || isset($hint_text)}
                <div class="hint hint-left">

                    {if isset($hint)}
                        {$hint}
                    {else}
                        <p class="header">{$hint_header}</p>
                        <p>{$hint_text}</p>
                    {/if}
                    <div class="close"></div>
                </div>
            {/if}
            {if isset($postscriptum)}{$postscriptum}{/if}
        </div>
    </div>

</div>
