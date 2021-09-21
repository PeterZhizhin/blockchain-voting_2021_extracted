{if $mosDesign}
    {include file="$base_template_path/std_mos/std_popup_draft.tpl"}
{else}
<style>
    .draft-buttons-block {
        padding-top: 15px;
    }
    .draft-options-block {
        padding-top: 10px;
    }
    #draft_save_form {
        border: 0px;
    }
    #draft_save_form .form-infobox{
        font-size:12px;
    }
    
</style>
<script type="text/html" id="popupDraftTemplate">
    <form id="draft_save_form">
    <div id="t_draft_block">
        <div id="t_draft_block2" class="holder col-md-10 col-sm-7 col-xs-12">
            {*<h3>Укажите имя для черновика:</h3>*}
            {*{include file="$base_template_path/std_blocks/std_text.tpl" required=true class="no-validate" name="t_draft_name" id="t_draft_name" value="<%=draft_name%>" style="width:100%;"}*}
            <input type="text" value="<%=draft_name%>" class="form_control" <%=draft_readonly%> required id="t_draft_name" name="t_draft_name" maxlength="255" style="width:100%;" placeholder="Укажите имя для черновика""/>
        </div>
        {include file="$base_template_path/std_blocks/std_infoblock.tpl" id="draft_favorites_info"  text="Услуга будет сохранена в блоке избранных услуг в Вашем Личном кабинете" container_class="" color="white"}
        <%=options%>
        <div class="right draft-buttons-block">
            <a class="button" id="draft-save-button" href="#">Сохранить</a>&nbsp;
            <a class="dashed-link messagebox-close btn-close-pop" href="#">Отмена</a>
        </div>
    </div>
    </form>
</script>
{* Опции, как сохранить черновик. Только для формы, восстановленной из черновика *}
<script type="text/html" id="draftOptionsTemplate">
    <div class="draft-options-block">
        {array vars="array('1' => 'Сохранить в текущий редактируемый черновик','0' => 'Сохранить новый черновик')" assign="draftChoice"}
        {include file="$base_template_path/std_blocks/std_radiogroup.tpl" items=$draftChoice name="t_draft_save" value=1}
    </div>
</script>
{/if}