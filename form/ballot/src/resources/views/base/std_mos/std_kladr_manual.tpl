{if (!isset($okrug))}{assign var="okrug" value="{$prefix|regex_replace:'/\.(address[0-9]+)/':'.new_$1'}_okrug"}{/if}
{if (!isset($rayon))}{assign var="rayon" value="{$prefix|regex_replace:'/\.(address[0-9]+)/':'.new_$1'}_rayon"}{/if}
{if (!isset($city))}{assign var="city" value="{$prefix}_city"}{/if}
{if (!isset($town))}{assign var="town" value="{$prefix}_town"}{/if}
{if (!isset($street))}{assign var="street" value="{$prefix}_line1"}{/if}
{if (!isset($dom))}{assign var="dom" value="{$prefix}_line2"}{/if}

{if (!isset($vlad))}{assign var="vlad" value="{$prefix|regex_replace:'/\.(address[0-9]+)/':'.new_$1'}_property"}{/if}
{if (!isset($korpus))}{assign var="korpus" value="{$prefix|regex_replace:'/\.(address[0-9]+)/':'.new_$1'}_line4"}{/if}
{if (!isset($stroenie))}{assign var="stroenie" value="{$prefix|regex_replace:'/\.(address[0-9]+)/':'.new_$1'}_structure"}{/if}
{if (!isset($room))}{assign var="room" value="{$prefix}_line3"}{/if}
{if (!isset($postal))}{assign var="postal" value="{$prefix}_postalcode"}{/if}
{if (!isset($okato))}{assign var="okato" value="{$prefix}_new_okato"}{/if}
{if (!isset($type))}{assign var="type" value="kladr"}{/if}
{if (!isset($postfix))}{assign var="postfix" value=""}{/if}
{if $type=='bti'||$type=="orient_bti"}
	{assign var="okrug_form" value=$BTI_district_and_areas_form.areas}
{else}
	{assign var="okrug_form" value=$moscowAreas_form}
{/if}

{*get data from internal class*}
{if $internal_okrug_form}{assign var="okrug_form" value=$internal_okrug_form}{/if}


<div class="row addr_manual_block{if isset($container_class)&&$container_class} {$container_class}{/if}">
{if $type=="kladr"||$type=='bti'}
	<input type="hidden" class="manual_okrug_input" name="field[{$okrug}{$postfix}]" value>
        {include file="$base_template_path/std_blocks/std_select.tpl" container_class="col-md-4 form-group"  context_search=true label="Округ" text="Выберите округ" name="field[internal.{$okrug}{$postfix}]" class="manual_okrug manual_okrug{if $type=='bti'}_bti{else}_kladr{/if}" required=true items=$okrug_form id="{$id}_okrug"}
	<input type="hidden" class="manual_rayon_input" name="field[{$rayon}{$postfix}]" value>
	
        {include file="$base_template_path/std_blocks/std_select.tpl" container_class="col-md-4 form-group"  context_search=true label="Район" text="Выберите район" name="field[internal.{$rayon}{$postfix}]" class="manual_rayon manual_rayon{if $type=='bti'}_bti{else}_kladr{/if}" required=true id="{$id}_rayon"}
	{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Улица" name="field[{$street}{$postfix}]" required=true  placeholder="Введите улицу, деревню, поселок, хутор и т.п." maxlength=200 class="manual_street" validator="main_ru" id="{$id}_street"}

        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Дом" name="field[{$dom}{$postfix}]" required="{if !isset($dom_no_required)||!$dom_no_required}true{else}false{/if}" class="manual_dom" validator="main_ru" hint="{$house_hint}" maxlength="10" id="{$id}_dom" }
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Владение" name="field[{$vlad}{$postfix}]"  class="manual_ownership" validator="main_ru" maxlength="10" id="{$id}_ownership"}
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Корпус" name="field[{$korpus}{$postfix}]"  class="manual_korpus" validator="main_ru" maxlength="10" id="{$id}_korpus"}
        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Строение" name="field[{$stroenie}{$postfix}]"  class="manual_stroenie" validator="main_ru" maxlength="100" id="{$id}_stroenie"}

	{if !isset($hide_room)||!$hide_room}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" label="Квартира/Офис" name="field[{$room}{$postfix}]" placeholder="Введите квартиру/офис" maxlength=15 class="manual_room" }{/if}
	{if isset($external_fields)&&$external_fields}{$external_fields}{/if}
    {if isset($show_okato)&&$show_okato}<input type="hidden" class="manual_okato" name="field[{$okato}]" />{/if}
{elseif $type=="manual"}
	{*TODO страна*}	
	{if !isset($hide_okrug)||!$hide_okrug}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" class="Federal_manual" label="Регион" required=true name="field[{$okrug}{$postfix}]" maxlength="100" hint="Московская область" validator="main_ru"}{/if}
	{if !isset($hide_rayon)||!$hide_rayon}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" class="Raion_manual" label="Район" required=false name="field[{$rayon}{$postfix}]" maxlength="100" hint="Волоколамский район" validator="main_ru"} {/if}
	{if !isset($hide_city)||!$hide_city}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" class="City_manual"  label="Город" required=false name="field[{$city}{$postfix}]" maxlength="100" hint="г. Волоколамск" validator="main_ru"} {/if}
	{if !isset($hide_town)||!$hide_town}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" class="Place_manual" label="Населенный пункт" required=false name="field[{$town}{$postfix}]" maxlength="100" hint="деревня Авдотьино" validator="main_ru"} {/if}
	{if !isset($hide_street)||!$hide_street}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group" class="Street_manual" label="Улица" required=true name="field[{$street}{$postfix}]" maxlength="50" hint="В случае если улица отсутствует следует указать «нет»" validator="main_ru"} {/if}
	{if !isset($hide_dom)||!$hide_dom}
            
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Дом" name="field[{$dom}{$postfix}]" required="{if !isset($dom_no_required)||!$dom_no_required}true{else}false{/if}" class="Building_manual" validator="main_ru" hint="{$house_hint}" maxlength="20"}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Владение" name="field[{$vlad}{$postfix}]"  class="VladenieNo_manual" validator="main_ru" maxlength="10"}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Корпус" name="field[{$korpus}{$postfix}]"  class="CorpusNo_manual" validator="main_ru" maxlength="10"}
            {include file="$base_template_path/std_blocks/std_text.tpl" container_class="col-md-4 form-group"  label="Строение" name="field[{$stroenie}{$postfix}]"  class="StroenieNo_manual" validator="main_ru" maxlength="10"}
            
	{/if}
	{if !isset($hide_room)||!$hide_room}{include file="$base_template_path/std_blocks/std_text.tpl" label="Квартира/офис" container_class="col-md-4 form-group"  class="Flat_manual" placeholder="Введите квартиру/офис" required=false name="field[{$room}{$postfix}]" maxlength="15" } {/if}
	{if isset($external_fields)&&$external_fields}{$external_fields}{/if}
    {if !isset($hide_postal)||!$hide_postal}{include file="$base_template_path/std_blocks/std_text.tpl" label="Индекс" container_class="col-md-4 form-group" class="PostalIndex_manual" required=true name="field[{$postal}{$postfix}]" minlength="6" maxlength="6" mask="999999" hint="102333"} {/if}
			
{elseif ($type=="orient" || $type=="orient_bti")}
	{*округа и районы из справочника омкте  и бти*}
	<input type="hidden" class="manual_okrug_input" name="field[{$okrug}{$postfix}]" value>
	{include file="$base_template_path/std_blocks/std_select.tpl" class="manual_okrug manual_okrug_{if $type=='orient_bti'}bti{else}kladr{/if}" container_class="col-md-4 form-group" label="Округ" text="Выберите округ" name="field[internal.{$okrug}{$postfix}]" items=$okrug_form required=true}
	<input type="hidden" class="manual_rayon_input" name="field[{$rayon}{$postfix}]" value>
	{include file="$base_template_path/std_blocks/std_select.tpl" class="manual_rayon manual_rayon_{if $type=='orient_bti'}bti{else}kladr{/if}" container_class="col-md-4 form-group"  label="Район" text="Выберите район" name="field[internal.{$rayon}{$postfix}]" required=true}
        {if !isset($orient)||$orient}
            {include file="$base_template_path/std_blocks/std_text.tpl" class="manual_orient manual_orient_{if $type=='orient_bti'}bti{else}kladr{/if}" container_class="col-md-4 form-group" label="{if $orient_label}{$orient_label}{else}Адресный ориентир{/if}" required="{if $orient_required}{$orient_required}true{/if}"  name="field[{$orient}{$postfix}]" maxlength="250" validator="main_ru"}
        {/if}
        {if isset($external_fields)&&$external_fields}{$external_fields}{/if}
	{if isset($show_okato)&&$show_okato}<input type="hidden" class="manual_okato manual_okato_{if $type=='orient_bti'}bti{else}kladr{/if}" name="field[{$okato}]" />{/if}
{/if}
</div>
{if !$skipInit}
<script type="text/javascript">
	{if $type=='bti'||$type=='orient_bti'}
		if (typeof (BTI_district_and_areas_form)=='undefined')
			var BTI_district_and_areas_form = {if $BTI_district_and_areas_form_json}{$BTI_district_and_areas_form_json}{else}[]{/if};
	{else}
		if (typeof (manual_rayons)=='undefined')
			var manual_rayons = {if $moscowDistrictsJs_form_json}{$moscowDistrictsJs_form_json}{else}[]{/if}; 
	{/if}
	
	init_kladr_manual("{$type}");	
</script>	
{/if}