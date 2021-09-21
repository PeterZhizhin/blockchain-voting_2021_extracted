{if $mosDesign}
    {include file="$base_template_path/std_mos/footer.tpl"}
{else}

{if !$hide_right_block}
    </div>
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 right-side sticky" id="form-info">
            <div class="form-info-show-detail col-md-12 col-sm-4 col-xs-12">
                <div class="info-icon"></div>
                <div class="info-text">
                    <a href="#" class="white_link">Информация по оформлению заявления</a></div>
            </div>


            <div class="right-block col-md-12 col-sm-8 col-xs-12">

                <div class="timer_head hidden">
                    <div class="timer_img">
                        <img src="{$CFG_MEDIA_HOST}/common/img/mos-ru/clock.png" alt="">
                    </div>
                    <div class="time_left">
                        <p class="timer_title">{if $timer_text}{$timer_text}{else}Оставшееся время:{/if}</p>
                        <p class="timer_value">init_timer_head()</p>
                    </div>
                </div>

                {if $download_app_file_enabled}
                <div class="info-block info-block-line form-additional form-draft col-md-12 col-sm-6 col-xs-12">

                        {if !$edit_draft}
                        <div class="media">
                          <div class="media-left">
                            <div class="note-icon"></div>
                          </div>
                          <div class="media-body">
                            Загрузить заявление из <a href="{$CFG_MAIN_HOST}/ru/drafts/" class="hover-underline">списка черновиков</a>
                          </div>
                        </div>
                        {/if}

                        <a href="#" class="button save-draft-button hover-btn" onclick="downloadAppFileFromForm(''); return false;">Сохранить черновик</a>
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
                    {include file="$base_template_path/std_blocks/std_infoblock.tpl" id="draft_favorites_info"  text="Внимание! Срок хранения черновиков на Портале составляет 40 дней" container_class="" color="orange"}
                </div>
                {/if}

                {if isset($faq)||isset($service_catalog_id)}
                <div class="info-block info-block-faq col-md-12 col-sm-6 col-xs-12">
                    <div class="info-item form-question ">
                        <p>Остались вопросы?<br> Посмотрите <a href="{if (!isset($faq)||$faq=='')&&isset($service_catalog_id)&&$service_catalog_id&&$service_catalog_id!=''}{$CFG_MAIN_HOST}/ru/faq/?service={$service_catalog_id}{elseif $faq==''}{$CFG_MAIN_HOST}/ru/faq/{else}{$faq}{/if}" style="border-bottom: 1px dashed">часто задаваемые вопросы</a> по этой услуге</p>
                    </div>
                </div>
                {/if}

                <div class="info-block info-block-faq col-md-12 col-sm-6 col-xs-12">
                    <div class="info-item form-save">
                        <form method="post" action="{$CFG_MAIN_HOST}/common/ajax/save/print/" target="_blank">
                            <input name="content" type="hidden" value="" />
                            <a class="button green-small js-form-save" href="#" data-action="print">
                                <span class="glyphicon glyphicon-print"></span> Печать
                            </a>
                            <a class="button green-small js-form-save" href="#" data-action="pdf">
                                <span class="glyphicon glyphicon-floppy-save"></span> Сохранить PDF
                            </a>
                        </form>
                    </div>
                </div>

                <div class="pinned-info"></div>

                <div id="mos_news_banner" class="col-md-12 col-sm-6 col-xs-12" style="display: inline-block; padding:0px; height:170px;"></div>
        </div>


    </div>
    {/if}
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

{if !$hide_right_block}</div>{/if}
{* Черновики, html для pop-up-а *}
{include file="$base_template_path/std_blocks/std_popup_draft.tpl" edit_draft=$edit_draft}
{include file="$base_template_path/elk_frontend_log.tpl"}


{/if}
