{*
Модуль альтернативного календаря с выбором времени.
Даты и время добавляются при инициализации в calendar.init()

Используется в dogm/077060701, аналог используется на dzm/clinic
Подключение (где то внизу формы):
{ include file="alt_calendar.tpl" templates=true}

затем создать объект и инициализировать, как в примере подключения ниже.
{ include file="$base_template_path/std_blocks/alt_calendar.tpl" container_id="alt_time"}

var calendar = $('#alt_time').find('.alt_time_container').data('altCalendar');
calendar.set_filter({...});
calendar.reInit(times);
формат times - см.в prepare_times() на dogm/077060701

*}
{if !isset($templates) || !$templates}
<div class="wrap" id="{$container_id}">
	<div></div>
	<script type="text/javascript">
        var calendar;
        
		$(document).on('ready', function() {
			calendar = new alt_calendar();
			// установить фильтр
			// calendar.set_filter({});
			// добавить данные и отобразить
			calendar.init($('#{$container_id} > div:first'), [], "{$container_id}");
		});
	</script>
</div>
{else}

<link rel="stylesheet" type="text/css" media="all" href="{$CFG_CSS_HOST}/common/forms/dzm/alt_calendar.css">
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/alt_calendar.js"></script>

<div id="hint_times_pop" class="hint">
	<p class="header"></p>
	<div class="body"></div>
	<div class="close"></div>
</div>

<script type="text/html" id="alt_time_popup_free_default_tpl">
	<div class="alt_time_popup">
		<input type="hidden" id="reserve_doc_id" value="<%=data.doc_id%>">
		<input type="hidden" id="reserve_date" value="<%=data.date%>">
		<input type="hidden" id="reserve_time" value="<%=data.time%>">

		<p><b>Подтвердите выбор</b></p>
		<p><b>Дата:</b> <%=data.date%></p>
		<p><b>Время:</b> <%=data.time%></p>
		<br/>
		<a class="button button_time_reserve" href="#">Выбрать время</a>
	</div>
</script>

<script type="text/html" id="alt_time_popup_nofree_default_tpl">
	<div class="alt_time_popup">
		<p><b>Выбранное время недоступно.</b></p>
		<p><b>Дата:</b> <%=data.date%></p>
		<p><b>Время:</b> <%=data.time%></p>
		<p>Пожалуйста, выберите другое время.</p>
		<br/>
		<a class="button close_dialog" href="#">Закрыть</a>
	</div>
</script>

<script id="alt_time_content_tpl" type="text/html">
	<h2>
		Месяц 2014
	</h2>
	<div class="alt_time_navigation">
		<div class="slots_nav slots_nav_prev slot_enabled_nav">
			<a href="#"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-left.png"></a>
		</div>
		<div class="slots_nav slot_enabled_nav slots_nav_day">
			<a href="#">День</a>
		</div>
		<div class="slots_nav slot_enabled_nav slots_nav_week slots_nav_active">
			<a href="#">Неделя</a>
		</div>
		{*<div class="slots_nav slot_enabled_nav slots_nav_weekend">
			<a href="#">Выходные</a>
		</div>*}
		<div class="slots_nav slots_nav_next slot_enabled_nav">
			<a href="#"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-right.png"></a>
		</div>
	</div>
	<div class="alt_time_checkbox" {if !isset($showCheckbox)||!$showCheckbox}style="display:none;"{/if}>
		<input type="hidden" name="<%=name%>" class="alt_time_value">
		<input type="checkbox" name="field[internal.<%=id%>_checkbox]" id="<%=id%>" class="alt_time_only_active">
		<label for="<%=id%>">Показать только свободное время</label>
	</div>

	<table class="alt_time alt_time_week">
		<thead>
		<tr>
			<th class="clock"><span class="glyphicon glyphicon-time"></span></th>
			<th class="weekday weekday_1">Пн</th>
			<th class="weekday weekday_2">Вт</th>
			<th class="weekday weekday_3">Ср</th>
			<th class="weekday weekday_4">Чт</th>
			<th class="weekday weekday_5">Пт</th>
			<th class="weekday weekday_6">Сб</th>
			<th class="weekday weekday_7">Вс</th>
		</tr>
		</thead>
		<tbody>
		</tbody>
	</table>

	<table class="alt_time alt_time_day" style="display:none;">
		<thead>
		<tr>
			<th class="clock"><span class="glyphicon glyphicon-time"></span></th>
			<th class="weekday_day weekday_day_1">Сегодня</th>
		</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</script>

<script id="alt_time_week_line_tpl" type="text/html">
		<tr>
			<td><%=time%></td>
			<td class="weekday"><%=day1%></td>
			<td class="weekday"><%=day2%></td>
			<td class="weekday"><%=day3%></td>
			<td class="weekday"><%=day4%></td>
			<td class="weekday"><%=day5%></td>
			<td class="weekday"><%=day6%></td>
			<td class="weekday"><%=day7%></td>
		</tr>
</script>

<script id="alt_time_day_line_tpl" type="text/html">
		<tr>
			<td><%=time%></td>
			<td class="weekday_day"><%=day1%></td>
		</tr>
</script>
{/if}
