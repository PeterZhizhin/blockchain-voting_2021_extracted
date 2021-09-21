{if isset($use_captcha)&&$use_captcha==true&&isset($type_captcha)}
	<fieldset class="hidden form-block captcha {if $container_class}{$container_class}{/if}" {if $container_id}id="{$container_id}"{/if} style="min-height:100px">
		<legend>Проверочный код</legend>
		{if $type_captcha=='google'}
			<input type="hidden" id="captcha_input"  name="captcha_input" value=""/>
			<script src="{$options_captcha.js}"></script>
			<div class="g-recaptcha" style="display: inline-block" data-sitekey="{$options_captcha.public_key}"></div>
		{else}
			<div>
			{capture name='img_captcha'}
				<img alt="Введите код" class="captcha_img" title="Введите код" src="data:image/png;base64,{$captcha_img}">
				<div alt="Обновить код" class="captcha_refresh" title="Обновить код">&nbsp;</div>
			{/capture}
			
			{include file="$base_template_path/std_blocks/std_text.tpl" validator="captcha" minlength="4" maxlength="4" id="captcha_input" class="captcha_text" label=$smarty.capture.img_captcha name="captcha_input"	required=true hint="Код состоит только из строчных кириллических букв."}
			</div>
		{/if}
	</fieldset>

{/if}