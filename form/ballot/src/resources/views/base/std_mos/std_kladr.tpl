{*
Параметры вызова шаблона:
$contact = "declarant" -- префикс контакта
$validate = true -- проверять обязательность улицы, дома и квартиры (если $validateFlat)
$validateFlat = true -- проверять обязательность квартиры
$skipkladr = false -- не передавать поле field[{$contact}.new_address1_kladr]
$skipPostalIndex =false -- не отображать и не передавать поле field[{$contact}.address1_postalcode]
$addressType = 1 -- 1 = адрес регистрации или юридический адрес, 2 = фактический адрес для юрлиц.
по умолчанию 1
*}
{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}
{if !$addressType}
	{assign var=addressType value=1}
	{assign var=aTpNmSfx value=''}
{else}
	{assign var=aTpNmSfx value="_{$addressType}"}
{/if}
{if $id && !$skipInit}
{literal}
	<script type="text/javascript">
		$(document).ready(function() {
			attachKladrProcessing($('#{/literal}{$id}{literal}'), {
				validate: {/literal}{if !isset($validate)||$validate}true{else}false{/if}{literal},
				validateFlat: {/literal}{if !isset($validateFlat)||$validateFlat}true{else}false{/if}{literal},
				limitRegionsTo: {/literal}[{$limitRegionsTo}]{literal},
{/literal}{if $defaultRegion}defaultRegion: {$defaultRegion},{/if}{literal}
				skipkladr: {/literal}{if !$skipkladr}false{else}{$skipkladr}{/if}{literal},
				includeOkato: {/literal}{if includeOkato}true{else}false{/if}{literal}
			});
		});
</script>
{/literal}
{/if}

{* new_address1_type -- тип адресов, подаваемых в АС ГУФ: 1, -- текст, 0 OMK-классификаторы *}
<div class="row kladr {if $container_class}{$container_class}{/if} " {if ($id!='')}id="{$id}"{/if}>
	<input type="hidden" name="field[internal.staff][]" value="kladr${$contact}${$addressType}${$id}"/>
	{if $addressType==1 || $addressType==2}
	<input type="hidden" value="{$addressType}" name="field[{$contact}.new_address{$addressType}_type]"/>
	{/if}

	<input type="hidden" value="" name="field[{$contact}.{$new}address{$addressType}_stateorprovince]" class="FederalInput"/>
	<input type="hidden" value="" name="field[internal.{$contact}.{$new}address{$addressType}_stateorprovince_id]" class="FederalInput_id"/>
	<img class="FederalLoader hidden" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="position: absolute; margin: 15px 0px 0px 175px;"/>
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Регион" id="{$id}_region" context_search=(isset($federal_search) || $federal_search != 'false')  container_class="col-md-4 form-group FederalContainer" class="Federal" required=true name="field[internal.{$contact}{$aTpNmSfx}.region]" hint="{$hint_region}"}

	<input type="hidden" value="" name="field[{$contact}.{$new}address{$addressType}_county]" class="RaionInput"/>
	<input type="hidden" value="" name="field[internal.{$contact}.{$new}address{$addressType}_county_id]" class="RaionInput_id"/>
	<img class="RaionLoader hidden" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="position: absolute; margin: 15px 0px 0px 175px;"/>
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Район" container_class="col-md-4 form-group RaionContainer hidden" class="Raion" id="{$id}_raion" context_search="{$context_search}" name="field[internal.{$contact}{$aTpNmSfx}.Raion]" hint="{$hint_raion}"}
	
	<input type="hidden" value="" name="field[{$contact}.{$new}address{$addressType}_city]" class="CityInput"/>
	<input type="hidden" value="" name="field[internal.{$contact}.{$new}address{$addressType}_city_id]" class="CityInput_id"/>
	<img class="CityLoader hidden" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="position: absolute; margin: 15px 0px 0px 175px;"/>
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Город" container_class="col-md-4 form-group CityContainer hidden" class="City" id="{$id}_city" context_search="{$context_search}" name="field[internal.{$contact}{$aTpNmSfx}.City]" hint="{$hint_city}"}

	<input type="hidden" value="" name="field[{$contact}.{$new}new_address{$addressType}_town]" class="PlaceInput"/>
	<input type="hidden" value="" name="field[internal.{$contact}.{$new}address{$addressType}_town_id]" class="PlaceInput_id"/>
	<img class="PlaceLoader hidden" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="position: absolute; margin: 15px 0px 0px 175px;"/>
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Населённый пункт" container_class="col-md-4 form-group PlaceContainer hidden" id="{$id}_place" class="Place" context_search="{$context_search}" name="field[internal.{$contact}{$aTpNmSfx}.Place]" hint="{$hint_place}"}

	<input type="hidden" value="" name="field[internal.{$contact}.{$new}address{$addressType}_StreetInput_id]" class="StreetInput_id"/>

	 <img class="StreetLoader hidden"  src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif" style="position: absolute; margin: 15px 0px 0px 175px;"/>
	 <input type="hidden" class="StreetInput"  value="field[{if $skip_street}internal.{/if}{$contact}.{$new}address{$addressType}_line1]" name="field[{$contact}.{$new}address{$addressType}_line1]" class="StreetInput_id"/>
	{include file="$base_template_path/std_blocks/std_select.tpl" label="Улица" required=(!isset($validate) || $validate) id="{$id}_Street" hint="{$hint_street}"  container_class="col-md-4 form-group StreetContainer {if $hideStreet}hidden{/if}" class="Street" context_search="true" name="field[internal.{$contact}.{$new}address{$addressType}_line1]"  text="Выберите улицу..."}
	
	{if isset($use_manual)&&$use_manual}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" container_class="for_right_colmn visual_controller" name="field[internal.{$contact}.new_address{$addressType}_use_kladr]" id="internal_{$contact}_new_address{$addressType}_use_kladr" label="Дома нет в списке" value="1"}

		<div class="kladr_manual hidden {if isset($use_manual)&&$use_manual}visual visual_1{/if}" {if ($id!='')}id="{$id}_manual"{/if} style="display:none;">
			<input type="hidden" name="field[internal.remove_double]" value="1"/>
			{include file="$base_template_path/std_blocks/std_kladr_manual.tpl" hide_street=true hide_okrug=true hide_rayon=true hide_city=true hide_town=true container_class="" class="" type=$type prefix="{$contact}.address{$addressType}" postfix="_double"}
		</div>
		
	{/if}
		<div class="buildingWithHouses col-md-4 form-group">
			{include file="$base_template_path/std_blocks/std_select.tpl" label="Дом" id="{$id}_Building" class="Building" context_search="true" name="field[internal.{$contact}{$aTpNmSfx}.Building]" value="{if isset($value)}{$value}{/if}" required=(!isset($validate) || $validate) text="Дом..."}
		</div>

        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group visual hidden buildingWithoutHouses"  label="Дом" name="field[{$contact}.{$new}address{$addressType}_line2]"  class="HouseNo" validator="main_ru" hint="{$house_hint}" maxlength="20"}
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group visual hidden buildingWithoutHouses"  label="Владение" name="field[{$contact}.{$new}new_address{$addressType}_property]"  class="VladenieNo" validator="main_ru" maxlength="10"}
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group visual hidden buildingWithoutHouses"  label="Корпус" name="field[{$contact}.{$new}new_address{$addressType}_line4]"  class="CorpusNo" validator="main_ru" maxlength="10"}
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group visual hidden buildingWithoutHouses"  label="Строение" name="field[{$contact}.{$new}new_address{$addressType}_structure]"  class="StroenieNo" validator="main_ru" maxlength="10"}

		{include file="$base_template_path/std_blocks/std_text.tpl" label="Квартира/офис" class="Flat" text="" id="{$id}_Flat" value=false container_class="col-md-4 form-group" maxlength="15" name="field[{$contact}.{$new}address{$addressType}_line3]" disabled=$skip_street required=(!empty($validateFlat)) placeholder="Введите квартиру/офис"}

		{if $skipkladr != 'true'}
			<input type="hidden" name="field[{$contact}.{$new}new_address{$addressType}_kladr]" class="KLADRCode">
		{else}
			<input type="hidden" name="field[internal.{$contact}.{$new}new_address{$addressType}_kladr]" class="KLADRCode">
		{/if}
		{if $includeOkato}
			<input type="hidden" name="field[{$contact}.{$new}new_address{$addressType}_new_okato]" class="OKATO">
		{/if}
		{if $skipPostalIndex!='true'}
			{include file="$base_template_path/std_blocks/std_text.tpl" label='Индекс' class="PostalIndex" id="{$id}_postal" text="" value=false container_class="col-md-4 form-group PostalText" name="field[{$contact}.{$new}address{$addressType}_postalcode]" required="required"  disabled=$skip_street mask="999999"}
		{/if}
	{include file="$base_template_path/std_blocks/std_label.tpl" label='' text="" text_class="kladrError"}
</div>