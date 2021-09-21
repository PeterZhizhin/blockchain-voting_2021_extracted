<style>
    .calendar-nav-bar {
        padding-top: 10px;
    }
    
    .calendar-nav-bar .prev {
        float: left;
    }

    .calendar-nav-bar .title-week, .calendar-nav-bar .title-day  {
        float: left;
        margin: 0 20px 20px 20px;
        font-weight: bold;
    }

    .calendar-nav-bar .title-week a, .calendar-nav-bar .title-day a {
        height: 24px;
        color: #333333;
        font-size: 18px;
        line-height: 24px;
    }

    .calendar-nav-bar .next {
        float: left;
    }

    .calendar-day-month {
        color: #9EA4AC;
    }

    .calendar-weekday {
        font-weight: bold;
        color: #333333;
    }

    .new-popup {
        height: 175.3px;
        width: 250px;
        border: 1px solid #DEE3E9;
        border-radius: 2px;
        background-color: #FFFFFF;

        display: none;
        position: absolute;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        z-index: 1000;
    }

    .new-popup-date {
        color: #333333;
        font-size: 18px;
        line-height: 24px;
    }

    .new-popup-container {
        margin: 24px 24px 24px 24px;
    }

    .calendar-popup-button {
        height: 56px;
        width: 202px;
        border-radius: 2px;
        background-color: #2589DE;
        text-align: center;
        color: #FFFFFF;
        /*font-family: "MCW XX Regular";*/
        font-size: 18px;
        line-height: 24px;
        padding-top: 15px;
        margin: 0;
    }

    .new-popup .close {
        display: block;
        content: "";
        position: absolute;
        top: 10px!important;;
        right: 10px!important;;
        width: 9px!important;;
        height: 9px!important;;
        cursor: pointer;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: url('{$CFG_MEDIA_HOST}/common/img/mos-ru/hint-close.png')!important;
        background-repeat: no-repeat;
        background-position: 0 0;
    }

    .new-popup .close:hover {
        background-position: 0 -11px!important;;
    }

    .new-popup.active{
        display: block;
    }

    .new-popup::before {
        display: block;
        content: "";
        position: absolute;
        top: 164px;
        left: 120px;
        width: 7px;
        height: 24px;
        border-right: none;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: url('{$CFG_MEDIA_HOST}/common/img/mos-ru/grey-hint.png') top left no-repeat;
        transform: rotate(-90deg);
    }

    .new-popup.new-arrow-left::before {
        left: 20px;
    }

    .new-popup.new-arrow-right::before {
        left: 225px;
    }

    span.time {
        display: initial;
    }

    .time-container {
        height: 24px;
        width: 46px;
        float: left;
        margin-right: 4px;
        margin-top: 4px;
        padding: 2px;
    }

    .new-calendar-button {
        height: 24px;
        width: 46px;
        border-radius: 2px;
        background-color: rgba(19,161,79,0.2);
    }

    .new-calendar-button.disabled {
        height: 23px;
        width: 46px;
        border-radius: 2px;
        background-color: rgba(243,245,247,0.6);
    }

    .new-calendar-button.disabled .time{
        height: 23px;
        width: 38px;
        color: #C5CAD0;
        /*font-family: "MCW XX Regular";*/
        font-size: 12px;
        line-height: 16px;
        text-align: center;
    }

    .new-calendar-button .time {
        height: 24px;
        width: 38px;
        color: #333333;
        /* font-family: "MCW XX Regular";*/
        font-size: 12px;
        line-height: 16px;
        text-align: center;
    }

    .new-calendar-button:focus {
        height: 24px;
        width: 46px;
        border-radius: 2px;
        background-color: #13A14F;
    }

    .new-calendar-button:focus .time {
        height: 24px;
        width: 38px;
        color: #FFFFFF;
        /* font-family: "MCW XX Regular"; */
        font-size: 12px;
        line-height: 16px;
        text-align: center;
    }

    .calendar-day-month {
        height: 16px;
        /*width: 78px;*/
        color: #9EA4AC;
        /*font-family: "MCW XX Regular";*/
        font-size: 14px;
        line-height: 16px;

        padding-left: 5px;
    }

    .calendar-weekday {
        height: 24px;
        /*width: 110px;*/
        color: #333333;
        /*font-family: "MCW XX Medium";*/
        font-size: 18px;
        line-height: 24px;

        font-weight: bold;
    }

    .time-container-title {
        margin-bottom: 10px;
    }

    .calendar-block .time-container-block {
        margin-bottom: 25px;
    }

</style>

<script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/alt_calendar_redesign.js"></script>

<script id="alt_time_content_tpl" type="text/html">
    <div class="calendar-nav-bar js-calendar-nav-bar">
        <div class="prev js-calendar-nav js-calendar-nav-prev">
            <a href="#"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-left.png"></a>
        </div>
        <div class="title-day js-calendar-nav js-title-day">
            <a href="#">День</a>
        </div>
        <div class="title-week js-calendar-nav js-title-week">
            <a href="#">Неделя</a>
        </div>
        <div class="next js-calendar-nav js-calendar-nav-next">
            <a href="#"><img src="{$CFG_MEDIA_HOST}/common/img/elem/arrow-right.png"></a>
        </div>
    </div>

    <div class="calendar-block js-calendar-block js-week-block">
        <div class="js-week-times"></div>
    </div>

    <div class="calendar-block js-calendar-block js-day-block hidden">
        <div class="js-day-times"></div>
    </div>
</script>

<script id="alt_time_week_line_tpl" type="text/html">
    <div class="row time-container-block">
        <div class="col-xs-12 time-container-title">
            <span class="calendar-weekday"><%=date%></span>
            <span class="calendar-day-month"><%=month%></span>
        </div>

        <div class="col-xs-12 js-times-container">
            <% if (Object.keys(times).length == 0) { %>
                <span class="text-muted">Нет доступного времени для записи</span>
            <% } else { %>
                <% for (var i in times) { %>
                <div class="time-container js-time-container">
                    <%=times[i]['button']%>
                </div>
                <% } %>
            <% } %>
        </div>
    </div>
</script>

<script id="alt_time_day_line_tpl" type="text/html">
    <div class="row time-container-block">
        <div class="col-xs-12 time-container-title">
            <span class="calendar-weekday"><%=weekday%></span>
            <span class="calendar-day-month"><%=day_month%></span>
        </div>

        <div class="col-xs-12 js-times-container">
            <% if (Object.keys(times).length == 0) { %>
                <span class="text-muted">Нет доступного времени для записи</span>
            <% } else { %>
                <% for (var i in times) { %>
                <div class="time-container js-time-container">
                    <%=times[i]['button']%>
                </div>
                <% } %>
            <% } %>
        </div>
    </div>
</script>

<div id="hint_times_pop2" class="new-popup">
    <div class="new-popup-container"></div>
    <div class="close"></div>
</div>

<script type="text/html" id="alt_time_popup_free_default_tpl">
    <div class="alt_time_popup">
        <input type="hidden" id="reserve_date" value="<%=data.date%>">
        <input type="hidden" id="reserve_date" value="<%=data.dateOriginalFormat%>">
        <input type="hidden" id="reserve_time" value="<%=data.time%>">
        <input type="hidden" id="reserve_lpu" value="<%=data.idxLpu%>">

        <p class="new-popup-date">
            <b>Подтвердите выбор</b><br>
            <b>Дата: <%=data.date%></b><br>
            <b>Время: <%=data.time%></b>
        </p>
        <a href="#" class="button js-calendar-popup-button">Записаться</a>
    </div>
</script>

<script type="text/html" id="alt_time_popup_nofree_default_tpl">
    <div class="alt_time_popup">
        <p class="new-popup-date">
            <b>Дата:</b> <%=data.date%><br>
            <b>Время:</b> <%=data.time%><br>
            <span>Пожалуйста, выберите другое время.</span>
        </p>
        <a class="button close_dialog" href="#">Закрыть</a>
    </div>
</script>