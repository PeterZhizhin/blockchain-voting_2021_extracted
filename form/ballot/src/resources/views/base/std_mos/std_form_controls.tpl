{if isset($use_captcha)&&$use_captcha==true}
	{*автоматически подключим капчу*}
	{include file="$base_template_path/std_blocks/std_captcha.tpl"}
{/if}

<div class="row form-block form-controls {if isset($container_class)&&$container_class} {$container_class}{/if}">

        {if $position && $position=='left'}
            <div class="form-buttons col-md-5" style="text-align:left">
                    <a href="#" {if $target}target="{$target}"{/if} id="{if isset($id)&&$id}{$id}{else}button_next{/if}" style="margin-bottom:30px;" class="btn btn-primary btn-lg button">{if $button_name}{$button_name}{else}Продолжить{/if}</a>
            </div>
            <div class="form-info-messages  col-md-7">
                    <span id="{if isset($id)&&$id}{$id}_{/if}check_app_loader" class="hidden">&nbsp;<img src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="vertical-align:text-bottom"/>&nbsp;Проверка наличия поданных заявлений...</span>
                    <img class="loader hidden" src="{$CFG_MEDIA_HOST}/common/img/mos-ru/loader.gif" style="float:left;" id="{if isset($id)&&$id}{$id}_{/if}loader"/>

                    <span class="error hidden" id="{if isset($id)&&$id}{$id}_{/if}validate_error">Пожалуйста, проверьте правильность заполнения полей формы</span>
            </div>
        {else}
            <div class="form-info-messages  col-md-7">
                    <span id="{if isset($id)&&$id}{$id}_{/if}check_app_loader" class="hidden">&nbsp;<img src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="vertical-align:text-bottom"/>&nbsp;Проверка наличия поданных заявлений...</span>
                    <img class="loader hidden" src="{$CFG_MEDIA_HOST}/common/img/mos-ru/loader.gif" id="{if isset($id)&&$id}{$id}_{/if}loader"/>

                    <span class="error hidden" id="{if isset($id)&&$id}{$id}_{/if}validate_error">Пожалуйста, проверьте правильность заполнения полей формы</span>
            </div>

            <div class="form-buttons col-md-5">
                    <a href="#" {if $target}target="{$target}"{/if} id="{if isset($id)&&$id}{$id}{else}button_next{/if}" style="margin-bottom:30px;" class="btn btn-primary btn-lg button">{if $button_name}{$button_name}{else}Продолжить{/if}</a>
            </div>
        {/if}
</div>