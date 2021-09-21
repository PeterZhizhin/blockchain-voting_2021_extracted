{if $mosDesign} 
    {include file="$base_template_path/std_mos/header.tpl"}
{else}

    {literal}
    <script type="text/javascript">
    $(document).ready(function() {
        // статус
        $('div#status_target').empty();
        $('div#source_status').appendTo('#status_target');
        // модальное окно и тултипы
        head_service();
        // заголовок
    {/literal}
        document.title = '{if $form_name && $form_name != $state_structure_title}{$form_name}{$title_separator}{/if}{if $state_structure_title}{$state_structure_title}{$title_separator}{/if}' + document.title;
    {literal}
    });
    </script>
    {/literal}
    {* Заменяем символ неразрывный пробел ( &#160; ) на обычный пробел. *}
    <h1>{$form_name|replace:("&#160;"|html_entity_decode:$smarty.const.ENT_NOQUOTES:"UTF-8"):" "}</h1>
    {if $card_url && $card_title}
        Услуга: <a href="{$card_url}" target="_blank" class="blank">{$card_title}</a>
        <br/><br/>
    {/if}
    {if $special}
        <style>
            .starFav{
                font-size: 15px;
                cursor:pointer;
                float:left;
            }
            .fav{
                font-size: 15px;
                height:30px;
            }
            .fav img {
                padding-right:10px;
                margin-top:-6px;
            }
            .fav > div { padding-top:10px; }
            .fav img + p { float:left; }
            .fav .msg_fav { float:left; padding-top: 0px;  padding-left:20px; }
        </style>
        {$empty_star="$CFG_MEDIA_HOST/common/img/mos-ru/star-empty.svg"}
        {$full_star="$CFG_MEDIA_HOST/common/img/mos-ru/star-full.svg"}
        <div class="fav">
            <div id="fav_blocks_add" class="{if $specialChecked}hidden{/if}">
                <img src='{$empty_star}' title='Добавить в избранное' alt="Добавить в избранное" class="starFav "/>
                <p>Добавить в избранное</p>
            </div>
            <div id="fav_blocks_del" class="{if !$specialChecked}hidden{/if}">
                <img src='{$full_star}' title='Удалить из избранного' alt="Удалить из избранного" class="starFav checked"/>
                <p>Услуга в избранном</p>
            </div>
            <div class='result_fav msg_fav hidden'>Список избранных услуг доступен в <a href="{$elk_host}">Личном кабинете</a></div>
            <div class='error_fav msg_fav hidden'></div>
            <div class='message_fav msg_fav hidden'></div>
        </div>

        <script type="text/javascript"> 
    $(document).ready(function() {        
       $('.starFav').on('click.fav',function(){
           $('.msg_fav').hide();
           var img = $(this);
           var orgId   = '{$org_id}';
           var formId  = '{$form_id}';
           var ajaxData={
               'ajaxAction': (img.hasClass('checked')?'del':'add'),
               'ajaxModule': 'favorites'
           };

           if (orgId == 'charges' && formId == 'search') {
               ajaxData['items[org_id]']  = orgId;
               ajaxData['items[form_id]'] = formId;  
               ajaxData['items[params]']   = '?service={$rnip_code}';
               ajaxData['items[title]'] = document.getElementsByTagName("title")[0].innerHTML;
           } else {
               ajaxData['items[org_id]']  = orgId;
               ajaxData['items[form_id]'] = formId;
           }

           $.ajax({
                url: cfgMainHost + '/common/ajax/',
                dataType: 'json',
                type: "POST",
                async: true,
                data: ajaxData
           })
            .always(function (data) {
                if (!data) {
                    $('.error_fav').show();
                }
                else {

                    if (data.error==0) {
                        $('.result_fav').css('opacity',1).show().animate({ opacity: "0" }, 8000,function(){ $(this).hide(); });
                        if (img.hasClass('checked')) {
                            $('#fav_blocks_del').hide();
                            $('#fav_blocks_add').show();

                        }
                        else {
                            $('#fav_blocks_add').hide();
                            $('#fav_blocks_del').show();

                        }
                    }
                    else {
                        $('.message_fav').html(data.message).css('opacity',1).show().animate({ opacity: "0" }, 8000,function(){ $(this).hide(); });
                    }
                }
            });
       }).on('mouseover.fav',function() {
            if (!$(this).hasClass('checked')) {
                if ($(this).attr('src')!='{$full_star}')
                    $(this).attr('src','{$full_star}');
            }
        }).on('mouseout.fav',function() {
            if (!$(this).hasClass('checked')) {
                if ($(this).attr('src')!='{$empty_star}')
                    $(this).attr('src','{$empty_star}');
            }
        });
    });
    </script>

    {/if}

{/if}