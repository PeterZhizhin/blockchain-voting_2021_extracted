<div class="{$name}-wrapper wrapper_field {if isset($class)}{$class}{/if}" >
   <div class="form-group input input-ichiro {if !empty($value)}input-filled{/if} {if !empty($disabled)||!empty($readonly)}disabled{/if}">
       <label for="{if !empty($id)}{$id}{else}id_{$name}{/if}" class="control-label input_label input_label-ichiro">
           <span class="input_label-content input_label-content-ichiro">{$label}{if !empty($required) }<b class="required">*</b>{/if}</span>
       </label>
       <input name="{$name}" type="{if empty($password)}text{else}password{/if}" class="form-control input_field input_field-ichiro {if !empty($masterClass)}{$masterClass}{/if} {if !empty($confirmType)}needConfirm{/if}" id="{if !empty($id)}{$id}{else}id_{$name}{/if}" 
              data-validatefunction="{if !empty($mainValidator)}main{/if} {if !empty($validator)}{$validator}{/if} {if !empty($email)}email{/if} {if !empty($mask)&&(!isset($maskValidator)||$maskValidator)}mask{/if}" {if !empty($readonly)}readonly="readonly"{/if} {if !empty($disabled)}disabled="disabled"{/if} value="{if !empty($value)}{$value|replace:'"':'&quot;'}{/if}"
              {if !empty($required) }required="true" aria-required="true"{/if} {if !empty($minlength)}minlength="{$minlength}"{/if} {if !empty($maxlength)}maxlength="{$maxlength}"{/if}  {if !empty($rangelength)}rangelength="{$rangelength}"{/if}
              {if !empty($email)}data-inputmask="'alias': 'email'" {elseif !empty($mask)}data-mask="{$mask}"{/if} 
              {if !empty($number)}digits="true"{/if} 
              {if !empty($remoteUrl)}remote="{$remoteUrl}"{/if}  
              {if !empty($placeholder)}placeholder="{$placeholder}"{/if}
              {if !empty($confirmType)}data-confirmType="{$confirmType}" data-confirmTransport="{if !empty($confirmTransport)}{$confirmTransport}{else}sms{/if}"{/if}
              {if !empty($label)}aria-label="{$label}"{/if}
              autocomplete="{if !empty($autocomplete)}{$autocomplete}{else}off{/if}"
              />
             
       {if !empty($hint)}
       <div class="hint_block">
           <span>?</span>
           <div class="hint">
               <div>{$hint}</div>
           </div>
       </div>
       {/if}
       {if !empty($verify)}
            <div class="hint_block noborder selected-green">
                <span class="selected-green nodecoration"></span>
                <div class="hint">Информация проверена</div>
            </div>
       {/if}
   </div>
{if !empty($verify)}
<div class="profile__not-confirmed"></div>
{/if}
</div>