{*
Модуль календаря с выбором времени.
Даты и время добавляются при инициализации в calendar.init() и calendar.reInit()

Для использования необходимо:
1. Один раз добавить в шаблон формы следующую строку.
{include file="$base_template_path/std_blocks/time_calendar.tpl" templates=true}

2. В том месте, где должен отображаться календарь добавить следующие строки:
{include file="$base_template_path/std_blocks/time_calendar.tpl" container_id="time_calendar_container1"}

Таким образом можно добавить несколько календарей.

3. Когда необходимо отобразить календарь, нужно сделать видимым контейнер календаря и заполнить календарь данными. Для этого нужно исполнить код javascript:
var calendar = $('#time_calendar_container1').data('timeCalendar');
calendar.set_filter({use: false,});
calendar.setLabels({
        caption1: 'ГБУЗ "ГП № 45 ДЗМ"',
        caption2: 'Москва, 5-й Войковский проезд, д.12 <a>Показать на карте</a>',
        caption3: 'Соловьева Людмила Петровна <span>Каб. 414</span>',
        sideContent: '',
});
calendar.reInit(data, 1);

4. Пример данных, которые можно передать календарю:
var data = {"23.10.2019":{"08:00":{"id":"25686","allow":false},"15:00":{"id":"25697","allow":false},"16:00":{"id":"25708","allow":true},"17:00":{"id":"25719","allow":false},"18:00":{"id":"25730","allow":false}},"24.10.2019":{"09:00":{"id":"25191","allow":true},"10:00":{"id":"25202","allow":false},"11:00":{"id":"25213","allow":false},"12:00":{"id":"25224","allow":true},"13:00":{"id":"25235","allow":false},"14:00":{"id":"25246","allow":false},"15:00":{"id":"25257","allow":false},"16:00":{"id":"25268","allow":false},"17:00":{"id":"25279","allow":false},"18:00":{"id":"25290","allow":false}}};
*}

{if ! isset($templates) || ! $templates}

<div class="wrap" id="{$container_id}">
</div>

<script type="text/javascript">
    var TimeCalendar;
    $(document).on('ready', function() {
        TimeCalendar = new time_calendar();
        TimeCalendar.init($('#{$container_id}'), [], '{$container_id}');
    });
</script>

{else}

<link rel="stylesheet" type="text/css" media="all" href="{$CFG_CSS_HOST}/common/css/new/time_calendar.css">
<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/time_calendar.js"></script>

<div id="hint_times_pop" class="hint timeCalendarHintTimesPop hint-norotate">
    <p class="header"></p>
    <div class="body"></div>
    <div class="close"></div>
</div>

<script type="text/html" id="time_calendar_popup_free_default_tpl">
    <div class="timeCalendarTimesPop">
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

<script type="text/html" id="time_calendar_popup_nofree_default_tpl">
    <div class="timeCalendarTimesPop">
        <p><b>Выбранное время недоступно.</b></p>
        <p><b>Дата:</b> <%=data.date%></p>
        <p><b>Время:</b> <%=data.time%></p>
        <p>Пожалуйста, выберите другое время.</p>
        <br/>
        <a class="button close_dialog" href="#">Закрыть</a>
    </div>
</script>

<script id="time_calendar_content_tpl" type="text/html">
    <div class="timeCalendarCaption1"><%=caption1%></div>
    <div class="timeCalendarCaption2"><%=caption2%></div>
    <div class="timeCalendarBox">
        <div>
            <div class="timeCalendarCaption3"><%=caption3%></div>
            <div class="timeCalendarScheduleOut">
                <div class="timeCalendarSchedule">
                    <div class="timeCalendarTable">
                        <div class="timeCalendarDaysContent">
                            <%=daysContent%>
                        </div>
                        
                        <button class="timeCalendarShowMore"><span>Посмотреть еще</span></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/html" id="time_calendar_days_tpl">
    <span class="timeCalendarDayBox">
        <div class="timeCalendarDayLabel">
            <div class="timeCalendarWeekday"><%=weekday%></div>
            <div class="timeCalendarMonthday"><%=day%> <%=month%></div>
        </div>
        <div class="timeCalendarDayLine">
            <%=times%>
        </div>
    </span>
</script>

<script type="text/html" id="time_calendar_empty_one_day_tpl">
    <div class="timeCalendarDayEmpty timeCalendarDayLine">
        <div class="timeCalendarDayLabel <%=weekdayClassFirst%>">
            <div class="timeCalendarWeekday"><%=weekdayFirst%></div>
            <div class="timeCalendarMonthday"><%=dayFirst%> <%=monthFirst%></div>
        </div>
        <div class="timeCalendarDayEmptyText">Нет доступного времени для записи</div>
    </div>
</script>

<script type="text/html" id="time_calendar_empty_days_interval_tpl">
    <div class="timeCalendarDayEmpty timeCalendarDayLine">
        <div class="timeCalendarDayLabel <%=weekdayClassFirst%>">
            <div class="timeCalendarWeekday"><%=weekdayFirst%></div>
            <div class="timeCalendarMonthday"><%=dayFirst%> <%=monthFirst%></div>
        </div>
        <span class="timeCalendarDayEmptySeparator">‒</span>
        <div class="timeCalendarDayLabel <%=weekdayClassLast%>">
            <div class="timeCalendarWeekday"><%=weekdayLast%></div>
            <div class="timeCalendarMonthday"><%=dayLast%> <%=monthLast%></div>
        </div>
        <div class="timeCalendarDayEmptyText">Нет доступного времени для записи</div>
    </div>
</script>

<script type="text/html" id="time_calendar_time_tpl">
    <span class="timeCalendarTimeBox">
        <span class="timeCalendarTime <%=className%>" data-date="<%=date%>" data-time="<%=time%>" data-id="<%=id%>"><%=time%></span>
    </span>
</script>

{/if}
