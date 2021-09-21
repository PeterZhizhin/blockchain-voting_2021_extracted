<script id="elkConfirmBlock" type="text/html">
    {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="orange" id="elkError<%=postfix%>" container_class="hidden" text=""}	
    <div class="elkAsyncConfirmBlockAction col-xs-12 " style="text-align:left; padding-right: 30px; display: contents;">
            <a id="Confirm<%=postfix%>" class="push-button button blue" href="#">Сохранить</a>
            <a id="Cancel<%=postfix%>" class="push-button button blue small" href="#">Отменить</a>
    </div>
    
</script>

<script id="elk_edit_confirm" type="text/html">
    <div class="elk_confirm_block col-xs-12 hidden">
        <div class="ConfirmProcess col-xs-12 <%if ( error ) { %>hidden<%}%>">
            <p class="col-xs-12">Для подтверждения <%=labelRodPadej%> введите код валидации, который мы Вам выслали.</p>
            <div class="inputNew field col-xs-4">
                <div class="field__inner">
                    <label>Код из <%=code%></label>
                    <%for (var field in value) { %>
                        <input type="hidden" name="<%=field%>" value="<%=value[field]%>"/>
                    <%}%>
                    <input type="text" name="CODE" maxlength="5" data-mask="9|repeat" minlength="5" pattern="[0-9]{literal}{5,5}{/literal}" required="required" value="" />
                </div>
            </div>
            <div class="col-xs-8 ConfirmAction">
                <p class="later">Вы сможете запросить код через <span><%=timer%></span> сек.</p>
                <p class="refresh blue hidden">Выслать код повторно</p>
                <p class="cancel blue small">Отменить <%=labelCancel%></p>
            </div>
        </div>
        <div class="ConfirmSuccess ConfirmFinal col-xs-12 hidden"><p class="ConfirmSuccessText"><%=label%> успешно подтвержден.</p></div>
        <div class="ConfirmError ConfirmFinal col-xs-12 <%if ( !error ) { %>hidden<%}%>"><p class="ConfirmErrorText"><%if ( error ) { %><%=error%><%}%></p></div>
    </div>
</script>



<script id="validationConfirmBlock" type="text/html">
    <div class="validationConfirmBlock col-xs-12 " state="process" id="validationConfirmBlock<%=postfix%>">
        <div class="close state done error" id="Close<%=postfix%>"></div>
        <p class="title state process" >Выполняется проверка введенных ФИО, даты рождения и СНИЛС </p>
        <p class="title state done" >Введенные ФИО, дата рождения и СНИЛС подтверждены </p>
        <p class="title state error" >Введенные ФИО, дата рождения и СНИЛС не прошли проверку </p>
        <ul>
        <%for (var field in fields) { %>
        <li><b><%=field%>:</b> <%=fields[field]%></li>
        <%}%>
        </ul>
        <p class="state process">Для продолжения работы просьба дождаться результатов проверки введенных данных. Это можем занять до 5 минут.</p>
        <p class="state process">Для отмены изменения данных нажмите <a id="Cancel<%=postfix%>" class="push-button button blue small" href="#">Отменить изменения</a></p>
    </div>
    
</script>

<script id="elk_edit_inform" type="text/html">
    <div class="elk_inform_block col-xs-12" state="process">
        <p class="title state process" >Выполняется проверка введенных данных</p>
    </div>    
</script>

{*Темплейты для поля и радио для всяких динамик*}
{include file="$base_template_path/std_blocks/std_radiogroup.tpl" opr=true}

<div class="modal" id="modal-save-apartment-data" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-link" data-dismiss="modal">Отменитьы</button>
        </div>
        </div>
    </div>
</div>


<script type="text/html" id="elk_save_form">
	<div id="elk-save-container">
	<h2>Сохранить <%=title%></h2>
	<form action="#" class="elk-save-popup" id="elk-save-data-form">

		<%for (var field in fields) { %>
		 
			<%if ( metadata[field]!=undefined ) { 
                          if ( metadata[field]["mask"]==undefined ) metadata[field]["mask"] = "";                        
                        %>

                                <%if ( 'GENDER' === field &&metadata[field]['type']=='checkbox') { %>
				{include file="$base_template_path/std_blocks/std_radiogroup.tpl"
					name="<%=field%>" 
					id="elk_<%=field%>"
					label="<%=metadata[field].title%>"
					required=true
					class="elk-field"
					layout="horizontal"
					items=['m'=>'Мужской','f'=>'Женский']
					template_value="fields[field]"
					opr=false
				}
		
				
				<%}else { %>
			
					<%if ( metadata[field]['details']&&metadata[field]['details'].length > 0 ) { %>
					
                        <%if ( metadata[field]['handbk']!==undefined ) { %>
                        {*  справочник, нужно вставить в селектор       *}
                        {include file="$base_template_path/std_blocks/std_select.tpl" 
                            class="elk-field handbk" 
                            required=true
                            no_empty=true  
                            name="<%=field%>" 
                            label="<%=metadata[field].title%>"
                            hint="<%=metadata[field]['details']%>"
                        }

                        <%}else { %>

                            <%if ( fields[field] !== null&&fields[field] !=='' ) { %>
                            {include file="$base_template_path/std_blocks/std_text.tpl" 
                                opr=true 
                                name="<%=field%>" 
                                id="elk_<%=field%>"
                                label="<%=metadata[field].title%>"
                                required=true
                                class="elk-field"
                                readonly="true"
                                hint="<%=metadata[field]['details']%>"
                                value="<%=fields[field]%>"
                            }
                            <%}else { %>
                            {include file="$base_template_path/std_blocks/std_text.tpl" 
                            opr=true 
                                name="<%=field%>" 
                                id="elk_<%=field%>"
                                label="<%=metadata[field].title%>"
                                required=true
                                class="elk-field"
                                hint="<%=metadata[field]['details']%>"
                                value="<%=fields[field]%>"
                            }
                            <%}%>
                        <%}%>
	

					<%}else { %>
                    
                        <%if ( metadata[field]['handbk']!==undefined ) { %>
                        {*  справочник, нужно вставить в селектор       *}
                        {include file="$base_template_path/std_blocks/std_select.tpl" 
                            class="elk-field handbk" 
                            required=true 
                            no_empty=true   
                            name="<%=field%>" 
                            label="<%=metadata[field].title%>"
                        }

                        <%}else { %>
                            <%if ( fields[field] !== null&&fields[field] !=='' ) { %>
                            {include file="$base_template_path/std_blocks/std_text.tpl" 
                                opr=true 
                                name="<%=field%>" 
                                id="elk_<%=field%>"
                                label="<%=metadata[field].title%>"
                                required=true
                                class="elk-field"
                                readonly="true"
                                value="<%=fields[field]%>"
                            }
                            <%}else if ((metadata[field].mask===undefined) ||( metadata[field].mask=='')){ %>
                            {include file="$base_template_path/std_blocks/std_text.tpl"
                                opr=true
                                name="<%=field%>"
                                id="elk_<%=field%>"
                                label="<%=metadata[field].title%>"
                                required=true
                                class="elk-field"
                                value="<%=fields[field]%>"
                                }
                            <%}else{ %>
                            {include file="$base_template_path/std_blocks/std_text.tpl" 
                                opr=true 
                                name="<%=field%>" 
                                id="elk_<%=field%>"
                                label="<%=metadata[field].title%>"
                                required=true
                                class="elk-field"
                                validator=""
                                value="<%=fields[field]%>"
                                mask="<%=metadata[field].mask%>"
                            }
                            <%}%>
                        <%}%>
					<%}%>
				<%}%>
			<%}%>
		<% } %>
		
		
	</form>
	
	{include file="$base_template_path/std_blocks/std_infoblock.tpl" color="green" text="Сохранив информацию в личном кабинете, вы получаете возможность удобного хранения и использования личной информации при получении городских услуг в электронном виде."}	

    {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="green" id="elkSaveDone" container_class="hidden elkSave" text=""}
    {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="red" id="elkSaveError" container_class="hidden elkSave" text=""}

	<div class="right">
		<a class="button green" id="elk-save-button" href="#">Сохранить</a>
		<a class="dashed-link messagebox-close btn-close-pop" id="elk-save-cancel-button" href="#">Не сохранять</a>
	</div>
</script>

<script type="text/html" id="elk_save_fields_form">
    <div id="elk-save-container">
        <h2>Сохранить <%=title%></h2>
        <%if ( text ) { %>
            <p></p><%=text%></p>
        <%}%>

        <form action="#" class="elk-save-popup" id="elk-save-data-form">

            <%for (var field in fields) { %>

                {include file="$base_template_path/std_blocks/std_hidden.tpl"
                    name="<%=field%>"
                    value="<%=fields[field]%>"
                }
            <%}%>

        </form>

        {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="green" text="Сохранив информацию в личном кабинете, вы получаете возможность удобного хранения и использования личной информации при получении городских услуг в электронном виде."}

        {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="green" id="elkSaveDone" container_class="hidden elkSave" text=""}
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" color="red" id="elkSaveError" container_class="hidden elkSave" text=""}

        <div class="right">
            <a class="button green" id="elk-save-button" href="#">Сохранить</a>
            <a class="dashed-link messagebox-close btn-close-pop" id="elk-save-cancel-button" href="#">Не сохранять</a>
        </div>
    </div>
</script>
