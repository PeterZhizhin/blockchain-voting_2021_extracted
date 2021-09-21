{if !isset($hint) && !isset($hint_text)}
	{assign var="hint_header" value="Какого формата необходим файл?"}
	{assign var="hint_text" value="Формат: MS Word, RTF,PDF,TIFF.<br/>Максимальный объем: 10 Мб"}
{/if}
{if isset($out_data)&&$out_data}{block name="file_additional_fields"}{/block}{/if}
{if !isset($no_file)||isset($no_file)&&!$no_file}
        <div class="row margin_l_r_0 wrap upload-area{if isset($container_class)} {$container_class}{/if}"{if isset($container_id)} id="{$container_id}"{/if}{if isset($autocomplete_from) && $autocomplete_from != ''} data-elk-field="{$autocomplete_from}"{/if}>    
        {if $mosDesign}    
                
                {if $label}<label  class="col-md-12 form-group file-label" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required"></span>{/if}</label>{/if}        
                <div class="holder col-md-12 form-group file-btn-body">
                        <input{if isset($class)} class="{$class}"{/if}{if isset($id)} id="{$id}"{/if} type="file" name="{block name="form_field_name"}{if isset($name)}{$name}{/if}{/block}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}{if isset($validator)} data-validatefunction="{$validator}"{/if}/>
                        {if !isset($out_data)||!$out_data}{block name="file_additional_fields"}{/block}{/if}
                        <div class="file-process empty">                    
                        <a href="#" class="file-btn">Прикрепить файл</a>
                        </div>
                        <div class="file-process loading">
                                <div class="file-remove" title="Отменить загрузку"></div>
                        </div>
                        <div class="file-process done">

                                <div class="file-info-container row margin_l_r_16">                    
                                        <div class="col-auto file-complated-img"></div>
                                        <div class="col file-info"><span class="file-name"></span>[<span class="file-size"></span>, <span class="file-ext"></span>]</div>                                        
                                        <div class="col-auto file-remove"><span>Удалить</span></div>
                                </div>
                        </div>

                </div>
                <div class="col-md-12 form-group file-hint">
                     {if isset($hint)}
                         {$hint}
                     {else}
                         <p class="header">{$hint_header}</p>
                         <p>{$hint_text}</p>
                     {/if}
                 </div>
                
                
                
        
        {else}    
        
	{if $label}<label  class="col-md-8 col-sm-7 col-xs-10" {if $id}for="{$id}"{/if}>{$label}{if isset($required) && $required}<span class="required">*</span>{/if}</label>{/if}
	<div class="holder {if $label}col-md-3 col-sm-4 col-xs-12{else}col-md-11 col-sm-11 col-xs-12{/if}">
		<input{if isset($class)} class="{$class}"{/if}{if isset($id)} id="{$id}"{/if} type="file" name="{block name="form_field_name"}{if isset($name)}{$name}{/if}{/block}" data-error-message="{if isset($error_message)}{$error_message}{else}Поле заполнено некорректно{/if}"{if isset($required) && $required} required="required"{/if}{if isset($validator)} data-validatefunction="{$validator}"{/if}/>
		{if !isset($out_data)||!$out_data}{block name="file_additional_fields"}{/block}{/if}
		<div class="file-process empty">
            <a class="button" href="#"><span class="plus"></span>Прикрепить файл</a>
		</div>
		<div class="file-process loading">
			<div class="file-remove" title="Отменить загрузку"></div>
		</div>
		<div class="file-process done">
			<div class="file-info-container">
				<div class="file-name"></div>
				<div class="file-info">[<span class="file-size"></span>, <span class="file-ext"></span>]</div>
				<div class="file-remove"></div>
			</div>
		</div>
		
	</div>
        <div class="col-md-1 col-sm-1 col-xs-2">
        <div class="additional{if isset($hint) || isset($hint_text)} hint-button{/if}">
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
            </div>
        </div>
       
        {/if}
         </div>
        

{else}
{*документ без тела файла*}
	{block name="file_additional_fields"}{/block}
{/if}
