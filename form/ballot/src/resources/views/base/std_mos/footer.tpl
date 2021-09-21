{if $download_app_file_enabled}
    <div class="form-additional form-draft row">
 
            <div class="col-md-4 padding_l_r_0">
                <a href="#" class="save-draft-button" onclick="downloadAppFileFromForm(''); return false;">Сохранить черновик</a>
            </div>    
            {if !$edit_draft}
            <div class="col-md-4 padding_l_r_0">
                <a href="{$CFG_MAIN_HOST}/ru/drafts/" class="load-draft-button">Загрузить заявление из списка черновиков</a>
            </div>    
            {/if}
            
            <div class="save-draft-info form-infobox green hidden">
                <p>Черновик сохранен</p>
            </div>
                <div style="display:none;">
                    <div id="downloadAppInfo" style="display:none;"  class="modalWindow">
                        <div class="contur">
                            <div class="content">
                                <div class="tabs-header">
                                    <div style="clear:both;"></div>
                                </div>
                                    <div id="downloadAppData"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="display:none;" id="downloadAppContainer">
                    <iframe style="display:none;" id="downloadAppLoader" src="about:blank" name="downloadAppLoader" onLoad=""></iframe>
                    <script type="text/javascript">
                        var edit_draft = {if $edit_draft}{$edit_draft}{else}false{/if};
                        $(document).ready(function() {
                            $('input[name="t_draft_type"]').on('change', function() {
                                $('#t_draft_block').toggle($(this).val());
                                $('#t_draft_block_notes').toggle($(this).val());
                            });
                            $('input[name="t_draft_save"]').on('change', function() {
                                $('#t_draft_block2').toggle($(this).val());
                            });
                        });
                    </script>
                </div>
        {include
            file="$base_template_path/std_blocks/std_infoblock.tpl"
            id="draft_favorites_info"
            text="Внимание! Срок хранения черновиков на Портале составляет 40 дней"
            color="warning"
        }
    </div>
{/if}


    <div id="mos_news_banner" class="col-md-12 col-sm-6 col-xs-12" style="display: inline-block; padding:0px; height:170px;"></div>
        
    {if $show_squares}
    <div class="col-md-12 col-sm-12 col-xs-12" id="scenarious_squares">
        {$Scenarious}
    </div>

    {/if}

{if $action == 'load_app'}
    <script type="text/javascript">
    draft_loading = true;
    draft_in_process = true;
    draft_fields = {if $fields}{$fields}{else}{ }{/if};
    draft_step = {if $load_app_step}{$load_app_step}{else}1{/if};

    $(document).ready(function() {
        {if $fields && $fields != 'null'}
            LockFields.lock( $( '#form_element' ));    
            setTimeout(function() {
                OPR.FormLoader.load(draft_fields,{$load_app_step}, {if $ext_user}{$ext_user}{else}""{/if}{if $final}, {$final}{/if});
            }, 1000);

            {if $final_ext_user}
            $('#form_element').append('<input type="hidden" name="final_ext_user" value="{$final_ext_user}">');
            {/if}
        {/if}
        {if $edit_draft}
            edit_draft = {$edit_draft};
            edit_draft_name = {if $edit_draft_name}"{$edit_draft_name}"{else}''{/if};
        {/if}
    });
    </script>

{/if}
<div id="saveAppContID" style="display:none;"></div>
<div style="display:none">
    <div id="messagebox">
        <div class="contur">
            <div id="messagebox_content"></div>
        </div>
    </div>
</div>


{* Черновики, html для pop-up-а *}
{include file="$base_template_path/std_blocks/std_popup_draft.tpl" edit_draft=$edit_draft}
{include file="$base_template_path/elk_frontend_log.tpl"}
</div>
<div class="pgu-help-block">
</div>
</div>