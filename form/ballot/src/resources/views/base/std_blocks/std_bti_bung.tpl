<div class="bti_bung">	
{if !empty($withCountry) }
<div class="row wrap valid label form-horizoontal"
    <label class="col-md-3 col-sm-4 col-xs-10">Государство</label>
    <div class="holder"><p>Российская федерация</p></div>
</div>
{/if}
{$no_empty = true}
{$region_dummy_form = ['Москва г.' => 'Москва г.']}
{$poselenie_dummy_form = ['нет' => 'нет']}
{$city_dummy_form = ['нет' => 'нет']}
{$district_dummy_form = ['нет' => 'нет']}

{include file="$base_template_path/std_blocks/std_select.tpl" container_class="" value="Москва г." context_search=false
    label="Регион" class="ignore manual_region manual_region_kladr" name="internal.region_dummy_form"
    id="region_dummy_form"
    required=false items=$region_dummy_form}

{include file="$base_template_path/std_blocks/std_select.tpl" container_class=""  value="нет" context_search=false
    label="Поселение" class="ignore  manual_poselenie manual_poselenie_kladr" name="internal.poselenie_dummy_form"
    id="poselenie_dummy_form"
    required=false items=$poselenie_dummy_form}

{include file="$base_template_path/std_blocks/std_select.tpl" container_class=""  value="нет" context_search=false
    label="Город" class="ignore manual_city_dummy manual_city_dummy_kladr" name="internal.city_dummy_form"
    id="city_dummy_form"
    required=false items=$city_dummy_form}

{include file="$base_template_path/std_blocks/std_select.tpl" container_class=""  value="нет" context_search=false
    label="Населённый пункт" class="ignore manual_district_dummy manual_district_dummy_kladr"
    name="internal.district_dummy_form" id="district_dummy_form"
    required=false items=$district_dummy_form}
</div>