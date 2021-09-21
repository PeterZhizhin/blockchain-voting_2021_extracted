{*
@author Сорокин Константин Николаевич
@date 20.04.2020 18:45:15
@description 
*}
<script id="elk_edit_confirm" type="text/html">

     <div class="elk_confirm_block hidden">

        <div class="ConfirmSuccess ConfirmFinal small-icon hidden">
            {* <b>Успешно</b> *}
            <p>
                {* <%=label%> успешно подтвержден. *}
                <%if ( label=="Телефон" ) { %>
                    Ваш телефон подтвержден.
                <%} else { %>
                    Ваш электронный адрес подтвержден.
                <%} %>

            </p>
        </div>

        <div class="ConfirmProcess <%if ( error ) { %>hidden<%}%>">
            <div class="ConfirmSuccessJustMessage">
                <b>Код подтверждения</b>
                <p>СМС с кодом подтверждения №<span class="codeNumber"><%=number%></span> отправлено на ваш номер. Код действителен в течение <span class="lifeText"><%=lifeText%></span>.</p>
            </div>

            <div class="ConfirmError ConfirmFinal small-icon mb-4 <%if ( !error ) { %>hidden<%}%>">
                {* <b>Ошибка</b> *}
                <p><%if ( error ) { %><%=error%><%}%></p>
            </div>
            <div class="confirm-controls">
            	<%if ( code=="sms" ) { %>
                	<input type="text" name="CODE" id="confirmation-code" maxlength="5" minlength="5" required="true" placeholder="Код из СМС" role="textbox" arial-label="Код из СМС" class="mos-control inputNew mw-100 data-mask-5-digits">
                <%} else { %>
                	<input type="text" name="CODE" id="confirmation-code" maxlength="5" minlength="5" required="true" placeholder="Код из письма" role="textbox" arial-label="Код из письма" class="mos-control inputNew mw-100 data-mask-5-digits">
                <%} %>
                <div class="ConfirmAction">
                    <div class="later my-3 <%if ( timer===0 ) { %>hidden<%}%>">Вы сможете запросить код через <span role="timer" aria-live="polite" aria-label="<%=timer%>"><%=timer%></span> сек.</div>
                    <div>
                        <button class="refresh btn mright20 mos-btn mos-btn-blue my-2 <%if ( timer>0 ) { %>hidden<%}%>">Запросить код подтверждения</button>
                        <button class="cancel btn mos-btn mos-btn-gray my-2 mright20">Отменить</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


{*
    <div class="elk_confirm_block col-xs-12 col-md-12 col-lg-12 hidden">
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" title="Успешно" class="alert-info ConfirmSuccess ConfirmFinal col-xs-12 hidden" text="<p><%=label%> успешно подтвержден.</p>"}
        <div class="ConfirmProcess col-xs-12 <%if ( error ) { %>hidden<%}%>">
            {include file="$base_template_path/std_blocks/std_infoblock.tpl" title="Важно" class="" text="<p>Для подтверждения <%=labelRodPadej%> введите код  №<span class=\"codeNumber\"><%=number%></span> валидации, который мы Вам выслали. Код действителен в течение <span class=\"lifeText\"><%=lifeText%></span></p>"}
           
            {include file="$base_template_path/std_blocks/std_infoblock.tpl" title="Ошибка" class="alert-error ConfirmError ConfirmFinal col-xs-12 <%if ( !error ) { %>hidden<%}%>" text="<p><%if ( error ) { %><%=error%><%}%></p>"}
            <div class="flex confirm-controls">
                {include file="$base_template_path/std_blocks/std_text.tpl" label="Код из <%=code%>" class="inputNew" value="" required=true maxk="9|repeat" maxlength=5 minlength=5 name="CODE"}
                <div class="col-xs-12 col-md-8 ConfirmAction">
                       <p class="later <%if ( timer===0 ) { %>hidden<%}%>">Вы сможете запросить код через <span><%=timer%></span> сек.</p>
                       <button   class="refresh btn btn-primary mright20 <%if ( timer>0 ) { %>hidden<%}%>">Выслать код</button>
                       <button   class="cancel btn btn-secondary mright20" >Отменить </button>
                </div>
            </div>
        </div>
    </div>
 *}
</script>
