{assign var=search_button_text value=$search_button_text|default:"Запрос суммы"}

<div style="overflow:auto;margin-top:13px;" id="finder" class="row">
    <div class="col-md-3 col-sm-4 col-xs-12">
	   <a href="#getAmount" onclick="javascript:return false;" class="button green search-submit" id="getAmount">{$search_button_text}</a>
    </div>
    <div class="col-md-9 col-sm-8 col-xs-12">
        <div class="white finder-infoblock" style="display:none;overflow: hidden;">
            <span id="finder_loader" style="display:none"><img src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"/></span><span id="finder_loader_text"></span>
            <p id="validate_error" style="display: none;"><span class="alert" style="font-weight:bold;"></span></p>
        </div>
    </div>
</div>
