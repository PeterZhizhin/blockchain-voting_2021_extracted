{if $has_additional_legals}
	{if count($availableDeclarants) == 1}
		<input type="hidden" id="mpgu-declarant-selector" name="legal_id" value="{$currentDeclarant}" data-guid="{$availableDeclarants.$currentDeclarant.guid}"/>
	{else}
	<style type="text/css">
		#legal-select-form .form-block {
			margin-right: 0px;
		}
		#legal-select-form .wrap .holder,
		#legal-select-form .form-block .wrap label + div.holder select {
			width: 660px;
		}
	</style>
	<form id="legal-select-form">		
		<input type="hidden" name="org_id" value="{$org_id}"/>
		<input type="hidden" name="form_id" value="{$form_id}"/>
		<fieldset class="form-step donotaddlink">
			<legend>Выбор текущего заявителя</legend>
			<fieldset class="form-block">
				{include file="$base_template_path/std_blocks/std_select.tpl" id="mpgu-declarant-selector" value=$currentDeclarant class="" label="Заявитель" items=$availableDeclarants name="legal_id" no_empty=true required="required" legal_select=true}
			</fieldset>
		</fieldset>
	</form>

	<script type="text/javascript">
		$(document).on('ready', function () {
			FormController.initialize($('#legal-select-form'));
			$('#mpgu-declarant-selector').on('change', function () {
				$.ajax({
					url: '{$CFG_MAIN_HOST}/ru/trustee/',
					type: "POST",
					dataType: "json",
					data: {
						ajax_top_change: 1,
						org_id: $('form input[name="org_id"]:eq(0)').val(),
						form_id: $('form input[name="form_id"]:eq(0)').val(),
						legal_id: $('#mpgu-declarant-selector').val()
					},
					success: function (data) {
						if (data.status !== 'ok') {
							alert(data.message);
						} else {
							document.location.reload();
							//alert(JSON.stringify(data));
						}
						return false;
					},
					error: function (data) {
						alert(JSON.stringify(data));
						return false;
					}
				});
			});
		});
	</script>
	{/if}
{/if}