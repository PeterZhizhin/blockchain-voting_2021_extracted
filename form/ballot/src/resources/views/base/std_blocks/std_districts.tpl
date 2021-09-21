<div id="{$name}_inputs" style="display:none"></div>
<script type="text/html" id="{$name}">
	<div class="regionsPopup">
		<div class="img">
			<img src="{$CFG_MEDIA_HOST}/common/img/elem/districts.png" />
		</div>
		<div class="checklist">
			<div class="gray">
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}1" name="all" label="<b>Все округа</b>" value="0"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}2" name="field[cb]" label="Центральный (ЦАО)" value="1"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}3" name="field[cb]" label="Северный (САО)" value="9"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}4" name="field[cb]" label="Северо-Восточный (СВАО)" value="2"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}5" name="field[cb]" label="Восточный (ВАО)" value="3"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}6" name="field[cb]" label="Юго-Восточный (ЮВАО)" value="4"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}7" name="field[cb]" label="Южный (ЮАО)" value="5"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}8" name="field[cb]" label="Юго-Западный (ЮЗАО)" value="6"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}9" name="field[cb]" label="Западный (ЗАО)" value="7"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}10" name="field[cb]" label="Северо-Западный (СЗАО)" value="8"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}11" name="field[cb]" label="Зеленоград (ЗелАО)" value="10"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}12" name="field[cb]" label="Новомосковский" value="12"}
			{include file="$base_template_path/std_blocks/std_checkbox.tpl" id="district{$name}13" name="field[cb]" label="Троицкий" value="11"}
			</div>
			<div style="margin-top:30px">
				<a href="" onclick="javascript:return false" class="button green" style="width:298px">Подтвердить</a>
			</div>
		</div>
	</div>
</script>

