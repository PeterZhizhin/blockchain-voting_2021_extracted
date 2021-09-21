{*
	$addressVariation: набирается буквами: r - жилой(residental), u - нежилой (unhabited),
	s - служебный (service), n - владения (vladenie)
*}

{if !$addressType} {assign var=addressType value=1} {/if}

{if $id && !$skipInit}
<script type="text/javascript">
	$(document).ready(function() {
		attachOOAddressProcessing('{$id}', {
			{if $allowNewMoscow}allowNewMoscow: true,{/if} //разрешить новую москву
			{if $disableOkrugArr}disableOkrugArr: {$disableOkrugArr},{/if} //коды округов 2х значные для блокировок
			{if $addressVariation}addressVariation: '{$addressVariation}',{/if}
			{if $onlyWithBuild}onlyWithBuild: true,{/if} // Выбирать улицы только с домамми.
			{if $onlyWithFlat}onlyWithFlat: true,{/if} // Выбирать дома только с квартирами.
			{if $onlyResidential}onlyResidential: true,{/if} // Выбирать только жилые квартиры.
			{if $allowAll}allowAll: true,{/if} // Все адреса (плюс ошибочно введенные)
		});
	});
</script>
{/if}

<div class="{if $container_class}{$container_class}{/if}">
	{if $manualAddressBlock}
		{include file="$base_template_path/std_blocks/std_checkbox.tpl" label="Ввести адрес вручную" name="field[internal.no_street{$id}]" value="1" container_class="visual_controller form-group" class="no_street" id="no_street{$id}"}
	{/if}

	<div class="bti visual visual_0 {if $class}{$class}{else}free_column{/if}" {if ($id!='')}id="{$id}"{/if}>
		<div class="row">
			<input type="hidden" name="field[internal.staff][]" value="bti${$contact}${$id}${$addressType}">
			{include file="$base_template_path/std_blocks/std_text.tpl" label="Улица" id="{if ($id!='')}{$id}_street{else}false{/if}" required=$validate container_class="Street_box col-md-8 form-group" class="Street" placeholder="Выберите улицу" name="field[internal.{$contact}.new_address{$addressType}_street]" hint='Для адресов вида <b>Зеленоград, корпус NNN</b>, следует вводить улицу "город Зеленоград"' autocomplete="off"}

			{if !$submit_id}
				<input type="hidden" class="StreetOMK" name="field[{$contact}.new_address{$addressType}_street]" />
				<input type="hidden" class="StreetID" name="field[internal.{$contact}.new_address{$addressType}_street_id]" />
			{else}
				<input type="hidden" class="StreetID" name="field[{$contact}.new_address{$addressType}_street]" />
			{/if}

			<input type="hidden" class="StreetName" name="field[{$contact}.address{$addressType}_line1]" />

			{if isset($unkv)&&$unkv}{$unkv=true}{else}{$unkv=false}{/if}

			{if $validate && (!isset($validateFlat) || $validateFlat !=false)} 
				{$flatrequired = true}
			{else}
				{$flatrequired = false}
			{/if}

			{if (!isset($validate) || $validate)&&(!isset($validateBuild) || $validateBuild)} 
				{$validateBuild = true}
			{else}
				{$validateBuild = false}
			{/if}
			<div class="hidden BuildingLoader StreetLoader col-md-12" style='width: 80px; height: 80px; z-index: 80; max-width: 80px; margin: -13px 0px 0px -33px;'>
				<div class="loader_adv">
					<img src="{$CFG_MEDIA_HOST}/common/img/mos-ru/loader.gif">
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col-md-4 form-group" {if isset($container_id)} id="{$container_id}"{/if}>
				{include file="$base_template_path/std_blocks/std_text.tpl" id="id_internal.{$contact}.address{$addressType}_line2" label="Дом/Владение" class="Building" name="field[internal.{$contact}.address{$addressType}_line2_name]" placeholder="Введите дом/владение/строение/корпус" required=$validateBuild maxlength="250"}
				<input type="hidden" class="BuildingId" name="field[internal.{$contact}.address{$addressType}_line2]" />
			</div>
			{if !$skipFlat}
				<div class="col-md-4 form-group" {if isset($container_id)} id="{$container_id}"{/if}>
					{if !$unkv}
						{include file="$base_template_path/std_blocks/std_text.tpl" label="Квартира/офис" id="id_{$contact}.address{$addressType}_line3" container_class="" class="Flat" text=""  name="field[{$contact}.address{$addressType}_line3]" placeholder="Квартира/помещение/офис" required=$flatrequired maxlength="15"}
					{else}
						<input type="hidden" class="Flat form-control" name="field[{$contact}.address{$addressType}_line3]" value="0"/>
						{include class="UNKV" label='Квартира/офис' file="$base_template_path/std_blocks/std_select.tpl" context_search=true id="{$contact}{$addressType}_new_unkv"  name="field[{$contact}.new_address{$addressType}_unkv]" text="Выберите квартиру/помещение/офис " required=$flatrequired}
						{if !$v6&&!$unom}
							<input type="hidden" class="UnadVal" name="field[{$contact}.new_address{$addressType}_unad]" value="0"/>
						{/if}
					{/if}
				</div>
			{/if}

			<input type="hidden" class="Unom" name="field[internal.{$contact}.new_address{$addressType}_new_unom]" />
			<input type="hidden" class="Unad" name="field[internal.{$contact}.new_address{$addressType}_unad]"/>

			<input type="hidden" class="HouseNo" name="field[{$contact}.address{$addressType}_line2]" />
			<input type="hidden" class="CorpusNo" name="field[{$contact}.new_address{$addressType}_line4]" />
			<input type="hidden" class="StroenieNo" name="field[{$contact}.new_address{$addressType}_structure]" />
			<input type="hidden" class="VladenieNo" name="field[{$contact}.new_address{$addressType}_property]" />
		</div>

		<div class="row margin_l_r_0">
			{include file="$base_template_path/std_blocks/std_infoblock.tpl" id="id_{$contact}.address{$addressType}_BuildingMessage" container_class="BuildingMessage hidden italic col-md-12 form-group" color="orange" text="<b>Внимание!</b> Введенный номер дома не найден в едином справочнике адресов города Москвы.</br>Проверьте правильность вводимых данных. Если вы уверены, что данные внесены корректно, можете продолжить заполнение заявления."}
			{include file="$base_template_path/std_blocks/std_infoblock.tpl" id="id_{$contact}.address{$addressType}_BuildingFlatMessage" container_class="BuildingFlatMessage hidden italic col-md-12 form-group" color="orange" text="<b>Внимание!</b> Для введенной улицы не найдены дома с квартирами в едином справочнике адресов города Москвы.</br>Просьба обратиться в БТИ."}
			{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="FlatMessage hidden italic col-md-12 form-group"  id="id_{$contact}.address{$addressType}_FlatMessage" color="orange" text="<b>Внимание!</b> Либо для данного дома нет квартир, либо введённый номер квартиры не найден в едином справочнике адресов города Москвы, либо Вы не выбрали из выпадающего списка.<br/>Проверьте правильность вводимых данных, если Вы уверены, что данные внесены корректно, можете продолжить заполнение заявления."}
		</div>

		{* v6 параметр приводит верстку в соответствие схеме асгуф *}
		{if $v6}
			{if $okato}
				<input type="hidden" class="OkatoVal" name="field[{$contact}.new_address{$addressType}_new_okato]" />
			{/if}
			{if $unom}
				<input type="hidden" class="UnomVal" name="field[{$contact}.new_address{$addressType}_new_unom]" />
			{/if}
			{if $unad}
				<input type="hidden" class="Unad" name="field[{$contact}.new_address{$addressType}_new_unad]" />
			{/if}
		{else}
			{* TODO: выяснить причину такой записи *}
			{if $okato}<input type="hidden" class="OkatoVal" name="field[{$contact}.new_okato]" />{/if}
			{if $unom}<input type="hidden" class="UnomVal" name="field[{$contact}.new_unom]" />{/if}
		{/if}

		{if $showRoom}
			<div class="row">
				{include file="$base_template_path/std_blocks/std_text.tpl" label="Комната" placeholder="Укажите комнату" container_class="Room_box col-md-4 form-group" maxlength="100" class="Room" id="{if ($id!='')}{$id}_room{else}false{/if}" name="field[{$contact}.new_address{$addressType}_room]"}
			</div>
		{/if}

		{if !isset($skipDistr)||!$skipDistr}
			<input type="hidden" class="AreaVal" name="field[{$contact}.new_address{$addressType}_okrug]" />
			<input type="hidden" class="DistrictVal" name="field[{$contact}.new_address{$addressType}_rayon]" />
			<div class="bti_distr_manual_block hidden">{include file="$base_template_path/std_blocks/std_kladr_manual.tpl" id="" container_id="" type="orient_bti" orient=false container_class="" prefix="internal.visual.{$contact}.new_address{$addressType}"}</div>	
			<div class="row">
				{include file="$base_template_path/std_mos/std_text.tpl" disabled=true readonly=true label='Округ' container_class="col-md-4 form-group bti_distr_block Area_box"  text="" class="AreaLabel" id="{if ($id!='')}{$id}_area{else}false{/if}" name="field[internal.{$contact}.new_address{$addressType}_okrug_name]" value=""}
				{include file="$base_template_path/std_mos/std_text.tpl" disabled=true readonly=true label='Район' container_class="col-md-4 form-group bti_distr_block {if $okato_area}hidden{/if}" class="DistrictLabel" id="{if ($id!='')}{$id}_district{else}false{/if}" text="" name="field[internal.{$contact}.new_address{$addressType}_rayon_name]" value=""}
			</div>
		{/if}
	</div>

	{if $manualAddressBlock}
		<div class="visual visual_1 manual_address_block hidden {if $class}{$class}{else}free_column{/if} {if $container_class}{$container_class}{/if}" {if ($id != '')}id="{$id}_manual_block"{/if}>
		{block name="manual_address"}
			{include file="$base_template_path/std_blocks/std_text.tpl" label="Введите адрес" container_class="col-md-8" name="field[{if ($manualAddressName != '')}{$manualAddressName}{else}internal.{$contact}.address_manual{/if}]" required=true maxlength="250" class="{$id}_manual_address" id="{if ($id != '')}{$id}_manual_address{else}false{/if}"}
		{/block}
		</div>
	{/if}
</div>