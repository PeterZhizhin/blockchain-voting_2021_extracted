{if !isset($default)}{$default=1}{/if}
<div class="checkbox checkbox_group wrapper_field col-md-12 col-lg-12 col-xs-12 {if !empty($class)}{$class}{/if}">
         <div class="checkbox-block checkbox-mobile">
             <label class="checkbox-inline" {if !empty($id)}for="{$id}"{/if}>
                 <input type="checkbox" class="input_field {if !empty($label)}aria-label="{$label}"{/if} {if !empty($masterClass)}{$masterClass}{/if}" name="{$name}" {if !empty($id)}id="{$id}"{/if} value="{$default}" {if !empty($value)&&$value==$default}checked="checked"{/if} {if !empty($readonly)||!empty($disabled)}readonly="readonly" disabled="disabled"{/if} {if !empty($placeholder)}placeholder="{$placeholder}"{/if} {if !empty($additional)}{$additional}{/if}/>{$label}<span></span>{if !empty($required) }<b class="required">*</b>{/if}
             </label>
             {if !empty($hint)}
              <div class="hint_block hint_block-inline-channel">
               <span>?</span>
               <div class="hint" style="">
                  <div>{$hint}</div>
               </div>
            </div>
            {/if}
         </div>
</div>