<script type="text/html" id="popupDraftTemplate">
    <form id="draft_save_form">
    <div id="t_draft_block">
        <div class="row">
        <div id="t_draft_block2" class="holder col-md-12 field field--lg field--has-clear field--error-popup element-control error-baloon element-control-show-label form-horizoontal wrap">            
            <div class="field__inner">
                <input type="text" value="<%=draft_name%>" class="form_control" <%=draft_readonly%> required id="t_draft_name" name="t_draft_name" maxlength="255" style="width:100%;" placeholder="Укажите имя для черновика""/>
            </div>
        </div>
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" id="draft_favorites_info"  text="Услуга будет сохранена в блоке избранных услуг в Вашем Личном кабинете" container_class="" color="white"}
        <%=options%>
        </div>
        <div class="draft-buttons-block right">
            <a class="btn btn-primary btn-lg" id="draft-save-button" href="#">Сохранить</a><a class="dashed-link messagebox-close btn-close-pop" href="#" style="margin-left: 20px;">Отмена</a>
        </div>
    </div>
    </form>
</script>
{* Опции, как сохранить черновик. Только для формы, восстановленной из черновика *}
<script type="text/html" id="draftOptionsTemplate">
    <div class="draft-options-block col-md-12">
        {array vars="array('1' => 'Сохранить в текущий редактируемый черновик','0' => 'Сохранить новый черновик')" assign="draftChoice"}
        {include file="$base_template_path/std_blocks/std_radiogroup.tpl" items=$draftChoice name="t_draft_save" value=1}
    </div>
</script>