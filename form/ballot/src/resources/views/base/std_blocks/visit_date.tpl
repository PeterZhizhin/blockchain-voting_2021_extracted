{*	$title
	$description
	$selector

	Названия полей:
	$visit_date
	$visit_hour
	$visit_minute
	$visit_reason
*}

{literal}
<script type="text/javascript">
function get_work_date_future()
{
	var curdate = new Date();
	var shift = (curdate.getDay == 0 || curdate.getDay == 6) ? 3 : 7
	curdate = new Date(curdate.getFullYear(), curdate.getMonth(), curdate.getDate() + shift);
	day = curdate.getDate() < 10 ? '0' + curdate.getDate() : curdate.getDate();
	month = curdate.getMonth() < 9 ? '0' + (curdate.getMonth() * 1 + 1) : curdate.getMonth() * 1 + 1;
	year = curdate.getFullYear();
	return day + '.' + month + '.' + year;
}

jQuery(document).ready(function() {

	//Дата должна быть больше текущей. День должен быть рабочим. 
	jQuery.validator.addMethod("date_in_future_work_day", function(value, element) {
		if ( !element.value || !(new RegExp("^[0-9]{2}\\.[0-9]{2}\\.[0-9]{4}$", "").test(value)) ) {
			return false;
		}
		var now_date = new Date();

		var year  = element.value.substring(6,10);
		var month = element.value.substring(3,5);
		var day   = element.value.substring(0,2);
		var thisdate = new Date(year, month-1, day, 0, 0, 0, 0);

		if (thisdate.getDay()==0 || thisdate.getDay()==6) {return false;}

		if (year < now_date.getFullYear() || month > 12 || day > 31) {
			return false;
		}

		var element_date = new Date(year, month, day);

		var now_day = now_date.getDate();
		if (now_day < 10) {
			now_day = '0' + now_day;
		}
		var now_month = now_date.getMonth() + 1;
		if (now_month < 10) {
			now_month = '0' + now_month;
			}
		var max_date = new Date(now_date.getFullYear(), now_month, now_day);

		if (element_date < max_date) {
			return false;
		}

		if ( element_date  < new Date(1900, 1, 1) ) {
			return false;
		}

		return true;
	});
	
	
	//Вводится целое число от 9 до 17 
	jQuery.validator.addMethod("number_9_17", function(value, element) {
		if ( element.value < 9 || element.value > 18) {
			return false;
		}	else {
			return true;
		}
	});

	//Вводится целое число от 0 до 45 кратное 15 в формате ММ надо пофиксить, т.к. кратность не проверяется, но т.к. у нас список это не сильно важно
	jQuery.validator.addMethod("number_0_50", function(value, element) {
		if ( element.value < 0 || element.value > 45) {
			return false;
		}	else {
			return true;
		}
	});

	values.push( new Array('{/literal}{$visit_date}{literal}', get_work_date_future(), '', '1') );
	values.push( new Array('{/literal}{$visit_hour}{literal}', '13', '5') );
	values.push( new Array('{/literal}{$visit_minute}{literal}', '45', '4') );
	applyHints();
	jQuery("*[name='field[{/literal}{$visit_date}{literal}]']").rules("add", {date_in_future_work_day:true});
	jQuery("*[name='field[{/literal}{$visit_hour}{literal}]']").rules("add", {required:true});
	jQuery("*[name='field[{/literal}{$visit_minute}{literal}]']").rules("add", {required:true});
});

</script>
{/literal}
<fieldset style="padding: 10px; margin-top: 5px;">{if $title}<legend>{$title}</legend>{/if}
<div>
	{if $selector}<input type="radio" value="1" name="doc_version" checked="true"><b>Оригинал документа</b><br/>{/if}
	{if $description}{$description}{/if}
	Дата <input type="text" class="inputCalendarAfter" style="width: 90px;" name="field[{$visit_date}]" id="visit_date" maxlength="10">
	Время <select name="field[{$visit_hour}]" id="visit_hour" style="width:40px">
		<option value="1">09</option>
		<option value="2">10</option>
		<option value="3">11</option>
		<option value="4">12</option>
		<option value="5">13</option>
		<option value="6">14</option>
		<option value="7">15</option>
		<option value="8">16</option>
		<option value="9">17</option>
		<option value="10">18</option>
	</select>
	:
	<select name="field[{$visit_minute}]" id="visit_minute" style="width:40px">
		<option selected="" value="1">00</option>
		<option value="2">15</option>
		<option value="3">30</option>
		<option value="4">45</option>
	</select>
	{if $visit_reason}
	<table style="margin-top:10px;">
		<tr><td class="padding_bottom">Укажите цель записи на приём к специалисту службы:</td></tr>
		<tr><td><textarea name="field[{$visit_reason}]" style="width:300px;"></textarea></td></tr>
	</table>
	{/if}
</div>
</fieldset>