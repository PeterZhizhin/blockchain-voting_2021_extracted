{*
    property: color_and_size, can be green-small,green, big_button,gray,blue, blue-small
    property: state, can be enabled, waiting, disabled 
*}
{if !isset($state)}{assign var=state value="enabled"}{/if}
{if isset($disabled)&&$disabled}{assign var=state value="disabled"}{/if}
<div push-button-state="{$state}"
	 class="row form-controls push-button-controls {if $container_class}{$container_class}{/if}"
	 {if $container_id}id="{$container_id}"{/if}>

		<div class="form-info-messages col-md-6 text-left">
				<img src="{$CFG_MEDIA_HOST}/common/img/mos-ru/loader.gif" class="loader loader-mini" style="display:none">

		</div>
		<div class="form-buttons col-md-6 text-right" style="position:relative;padding-right:0px;">
				<div style="" class="bblock {if $color_and_size}{$color_and_size}{/if}"></div>
				<a {if $id}id="{$id}"{/if}
				   class="push-button button btn btn-primary btn-lg"
				   href="#">{if $title}{$title}{/if}</a>
		</div>
</div>
{if !isset($skip_init)||!$skip_init}
<script type="text/javascript">
		//button click
		$( function () {
				$( '.push-button' ).off( 'click.push' ).onFirst( 'click.push', function () {
						var control = $( this ).closest( '.push-button-controls' );
						if ( $( control ).attr( 'push-button-state' ) == 'enabled' )
								$( control ).attr( 'push-button-state', 'waiting' );
						return false;
				} );
		} );

</script>
{/if}