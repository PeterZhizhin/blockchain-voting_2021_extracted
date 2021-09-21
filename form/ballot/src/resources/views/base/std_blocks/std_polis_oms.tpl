{if $mosDesign} 
    {include file="$base_template_path/std_mos/std_polis_oms.tpl"}
{else}

{if !isset($masterField)}
    {$masterField="OMS"}
{/if}

{if !isset($mask)}
    {$mask="9|repeat"}
{/if}

{if $isTemporary} {*временные полисы*}
    {$minlength="9"}
    {$omsValidator = "chktemp_oms"}
{else}
    {$minlength="16"}
    {$omsValidator = "chknew_oms"}
{/if}

{if $isOld}
    {$omsValidator = "chkold_oms"}
    {$mask="@@@@@@9999999999"}
{elseif $isAnc} {*старые полисы*}
    {$minlength="6"}
    {$omsValidator = "chkanc_oms"}
{/if}

{if $complex}
    {$autocomplete_from="COMPLEX_OMS:NUMBER"}
    {$block_from="COMPLEX_OMS"}
    {$many = true}
    {*определим типы фильтрации*}
    {if $isOnlyChild}
        {$origin = 'CHILD'}
    {elseif $isChild}
        {$origin = 'ME|CHILD|OTHER'}
    {else}
        {$origin = 'ME|OTHER'}
    {/if}
{elseif $isChild}
    {$autocomplete_from="CHILDREN:OMS_NUMBER"}
    {$many = true}
    {$block_from="CHILDREN"}
    {$origin = 'CHILD'}
{else}
    {$autocomplete_from="OMS:NUMBER"}
    {$block_from="OMS"}
    {$origin = 'ME'}
{/if}

{if $isMulty}
    {if $isOnlyChild}
        {$autocomplete_from="CHILDREN:OMS_NUMBER"}
        {$block_from="CHILDREN"}
        {$origin = 'CHILD'}
        {$many = true}
    {elseif $isChild}
        {$autocomplete_from="COMPLEX_OMS:NUMBER"}
        {$block_from="COMPLEX_OMS"}
        {$origin = 'ME|CHILD|OTHER'}
        {$many = true}
    {else}
        {$autocomplete_from="COMPLEX_OMS:NUMBER"}
        {$block_from="COMPLEX_OMS"}
        {$origin = 'ME|OTHER'}
        {$many = true}
    {/if}

    {$file="$base_template_path/std_blocks/std_multi_input.tpl"}
{else}
    {$file="$base_template_path/std_blocks/std_text.tpl"}
{/if}



{$hintOms="<div style='text-align:center;'><img src='{$CFG_MEDIA_HOST}/common/img/forms/polis.jpg' /></div>"}
{if $useOldHint}
    {$hintOms="<div style='text-align:center;'><img src='{$CFG_MEDIA_HOST}/common/img/forms/old_polis.png' /></div>"}
{/if}

{if $contact||$birthdate_name}<div data-elk-block="{$block_from}">{/if}
    {if $masterField=="OMS"}
        {if $many}
            {assign var=class value=$class|cat:' master-field-in-block'}
        {/if}
    {/if}
    {if $masterField=="OMS"||!isset($masterField)}
        {include
            file=$file
            label=$label
            name=$name
            value=$value
            minlength=$minlength
            maxlength="16"
            required=$required
            placeholder=$placeholder
            class=$class
            validator=$omsValidator
            age=$age
            origin=$origin
            mask=$mask
            hint=$hintOms
            autocomplete_from=$autocomplete_from
        }
    {/if}

    {if $masterField=="FIO"&&$many}  
        {assign var=surname_class value=$surname_class|cat:' master-field-in-block'}
        {assign var=surname_class value=$surname_class|cat:' master-field-in-block'}
    {/if}
    
    {if $age}
        {assign var="ageRange" value="|"|explode:$age}
        {assign var=birthdate_validator value=$birthdate_validator|cat:" {if isset($ageRange[0])}larger_age|{$ageRange[0]}{/if} {if isset($ageRange[1])}not_larger_age|{$ageRange[1]}{/if}"}
    {/if}

    {if $contact}
        {include
            file="$base_template_path/std_blocks/std_person_middlename_checkbox.tpl"
            person_age=$age
            person_origin=$origin
            show_work_phone=false
            show_home_phone=false
            surname_class=$surname_class
            show_phone="{if $show_phone}1{else}0{/if}"
            show_email="{if $show_email}1{else}0{/if}"
            show_inn=false
            show_snils=false
            show_gender=false
            child="{if $isChild&!$complex}1{else}0{/if}"
            person=$contact
            no_birthday=false
            no_ovdcode=false
            autocomplete=true
            mask=false
            minlength=false
            maxlength=false
            age=false
            origin=false
        }
    {elseif $birthdate_name}
        {if !isset($birthdate_id)}{$birthdate_id = $birthdate_name}{/if}
        {if $complex}
            {$af="COMPLEX_OMS:BIRTHDATE"}
        {elseif $isChild}
            {$af="CHILDREN:BIRTHDATE"}
        {else}
            {$af="PERSON:BIRTHDATE"}
        {/if}
        
        {include
            file="$base_template_path/std_blocks/std_date.tpl"
            label="Дата рождения"
            class="{$birthdate_class} birthday"
            required=true
            name="{$birthdate_name}"
            validator="date_in_past_and_now {$birthdate_validator}"
            autocomplete_from=$af
            id=$birthdate_id
        }
    {/if}

    {if $masterField=="FIO"}
        {include
            file=$file
            label=$label
            name=$name
            value=$value
            minlength=$minlength
            maxlength="16"
            required=$required
            placeholder=$placeholder
            class=$class
            validator=$omsValidator
            age=false
            origin=false
            mask=$mask
            hint=$hintOms
            autocomplete_from=$autocomplete_from
        }
    {/if}
{if $contact||$birthdate_name}</div>{/if}

{/if}