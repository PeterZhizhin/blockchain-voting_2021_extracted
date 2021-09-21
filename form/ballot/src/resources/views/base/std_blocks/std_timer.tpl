<div class="wrap row valid timer {if isset($container_class)} {$container_class}{/if}" {if isset($id)} id="{$id}"{/if}>
	{if isset($label)&&$label}
		<label  class="col-md-3 col-xs-12" {if isset($id)&&$id}for="{$id}"{/if}>{$label}</label>
		<div class="holder col-md-8 col-xs-10">
	{else}
		<div class="holder col-md-11 col-xs-10">
	{/if}
	<div class="timer_bg" >
        <div class="timer_active hidden">&nbsp;</div>
		<div class="timer_text hidden"><span>init_timer(timestamp,id,show_sec,period,callback)</span></div>
	</div>
			
		</div>
	<div class="col-md-1 col-sm-2 col-xs-2">
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
</div>
<script type="text/javascript">
	{literal}
		
	
	{/literal}
</script>