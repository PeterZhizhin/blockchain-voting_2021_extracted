{literal}
<script>
function goBack() {
	if (window.history!=undefined && window.history.length>0) {
		window.history.back();
		return false;
    } else {
	    return true;
    }
}
</script>
{/literal}
<a href="{$CFG_MAIN_HOST}/ru/" onclick="return goBack();" class="back"><span></span>Вернуться</a>