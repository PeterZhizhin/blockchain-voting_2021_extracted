{if (!isset($hide_okpo)||!$hide_okpo)}
    {literal}
    <script type="text/javascript">
        $(document).ready(function(){
            /**
             * Если поле ОКПО на форме скрыто - сделать его необязательным.
             */
            $('input[name="{/literal}field[internal.{$container_id}_name]{literal}"]').on('change', function() {
                var okpoRequired = $(this).val() === '0';
                var okpoElement = $(this).closest('.form-block.details_fieldset').find('.okpo input');
                if (okpoElement.length) {
                    change_req(okpoElement, okpoRequired);
                }
            });
        });
    </script>
    {/literal}
{/if}
{*Значения по умолчанию для label полей*}
{if (!isset($bank_name_label))}{assign var="bank_name_label" value="Полное наименование банка"}{/if}
{if (!isset($bik_label))}{assign var="bik_label" value="БИК"}{/if}
{if (!isset($kpp_label))}{assign var="kpp_label" value="КПП"}{/if}

{if !isset($show_fieldset)||$show_fieldset}
<fieldset class="form-block details_fieldset {if $fieldset_class}{$fieldset_class}{/if}" {if $autocomplete}data-elk-block="LEGAL_BANK_ACCOUNT"{/if}>
	<legend>Банковские реквизиты</legend>
{/if}
	<div class="details_block {if $container_class}{$container_class}{/if}" {if $container_id}id="{$container_id}"{/if}>

            {if $allow_budjet}
                {*«Бюджетная организация» или «Иное учреждение или организация»*}
               {include file="$base_template_path/std_blocks/std_radiogroup.tpl" layout="top" items=['1'=>"Бюджетная организация",'0'=>'Иное учреждение или организация'] required=true label="Тип банковской организации" name="field[internal.{$container_id}_name]" container_class="visual_controller stable_req"}
            {/if}

            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="gamburger bank_name {if $allow_budjet}visual visual_0 visual_1 hidden{/if}" class="{($autocomplete)?'master-field-in-block':''}" label="{$bank_name_label}" required=true name="{if $efp}field[{$prefix}][Bank][Name]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_bank]{/if}" maxlength="250" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:BANK_NAME":""} hint="ПАО «Сбербанк России»"}
            {if (isset($show_branch)&&$show_branch)}
                {include file="$base_template_path/std_blocks/std_text.tpl" label="Номер/наименование отделения кредитной организации" required=true name="{if $efp}field[{$service_container}][Bank][Branch]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_branch]{/if}" maxlength="250" hint="Для отделения Сбербанка Москвы, напр., 9038/0367"}
            {/if}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="bik {if $allow_budjet}visual visual_0 visual_1 hidden{/if}" label="{$bik_label}" validator="bik" required=true name="{if $efp}field[{$prefix}][Bank][BIK]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_bik]{/if}" minlength="9" maxlength="9" mask="999999999" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:BIK":""} hint="044583139"}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="kpp {if $allow_budjet}visual visual_0 visual_1 hidden{/if}" label="{$kpp_label}" required=true name="{if $efp}field[{$prefix}][Bank][KPP]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_kpp]{/if}" minlength="9" maxlength="9" mask="9999bb999" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:KPP":""} hint="997950001"}

            {if (!isset($hide_okpo)||!$hide_okpo)}
                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="okpo {if $allow_budjet}visual visual_0 hidden{/if}" label="ОКПО" validator="okpo" required=true name="{if $efp}field[{$prefix}][Bank][OKPO]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_okpo]{/if}"  minlength="8" maxlength="10" mask="9999999999" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:OKPO":""}}
            {/if}
            {if (isset($show_inn)&&$show_inn)}
                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="inn {if $allow_budjet}visual visual_0 hidden{/if}" label="ИНН кредитной организации" validator="inn_ul" minlength="10" maxlength="10" mask="9999999999" hint="7702000406" required=true name="{if $efp}field[{$prefix}][Bank][INN]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_inn]{/if}"  autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:INN":""} hint="7702000406"}
            {/if}

            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="rss {if $allow_budjet}visual visual_0 visual_1 hidden{/if}" label="{if isset($rssLabel)}{$rssLabel}{else}Расчетный счет{/if}" required=true name="{if $efp}field[{$prefix}][Bank][Account]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_ras_acc]{/if}" minlength="20" maxlength="20" mask="99999999999999999999" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:RS":""} hint="30232810700002000004"}
            {if (!isset($hide_kss)||!$hide_kss)}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="kss {if $allow_budjet}visual visual_0 visual_1 hidden{/if} stable_req" label="Корреспондентский счёт" required=false name="{if $efp}field[{$prefix}][Bank][korAccount]{else}field[{if isset($contact)&&$contact}{$contact}.{/if}new_kor_acc]{/if}" minlength="20" maxlength="20" mask="99999999999999999999" autocomplete_from={($autocomplete)?"LEGAL_BANK_ACCOUNT:KS":""}}
            {/if}
            {if $allow_budjet}
                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="name_budget {if $allow_budjet}visual visual_1 hidden{/if}" label="Наименование распорядителя бюджетных средств" required=true name="field[{if isset($contact)&&$contact}{$contact}.{/if}new_name_budget]" maxlength="250"}
                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="inn_bank {if $allow_budjet}visual visual_1 hidden{/if} stable_req" label="ИНН распорядителя бюджетных средств" required=false name="field[{if isset($contact)&&$contact}{$contact}.{/if}new_inn_bank]" validator="inn_ul" maxlength="10" mask="9999999999" }
                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="personal_account {if $allow_budjet}visual visual_1 hidden{/if}" label="Лицевой счет" validator="ls" required=true name="field[{if isset($contact)&&$contact}{$contact}.{/if}new_personal_account]" minlength="10" maxlength="20" mask="99999k99999999999999"}
            {/if}	

	</div>	
{if !isset($show_fieldset)||$show_fieldset}	
</fieldset>
{/if}


{*
Расчетный счет – поле обязательное
Корреспондентский счет 
Наименование Банка - поле обязательное
БИК - поле обязательное
КПП - поле обязательное

Наименование распорядителя бюджетных средств - поле обязательное
ИНН распорядителя бюджетных средств
Лицевой счет - поле обязательное
*}
