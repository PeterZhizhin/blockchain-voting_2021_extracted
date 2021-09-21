{if cfg('forms/rate-enabled')}
    {$CFG_JS_HOST=lib::getJsUrl()}
	{$empty_star="$CFG_MEDIA_HOST/common/img/mos-ru/star-empty.svg"}
	{$full_star="$CFG_MEDIA_HOST/common/img/mos-ru/star-full.svg"}
	<style>
		.star{
			cursor: pointer;

		}
        .stars{
            max-width: 362px;
        }
		.stars p {
            font-size:14px;
			padding: 0px;
			margin: 0px;
		}
		.msg_star, .msg_star2 {
            font-size:12px;
            font-weight: bold;
			padding: 7px 10px;
            margin-top:5px;
		}
        .result_star, .result_star2{
            font-color:#303030;
            background: #e6f5ed;
        }
        .message_star, message_star2{
            font-color:#303030;
            background: #f2f2f2;
        }
        .error_star, .error_star2{
            font-color:#fff;
            background: #E82F2B;
        }
		.stars_block{
			margin: 10px 0px;
		}
        .stars_comments {
            padding-top:15px;

        }
        .stars_comments textarea{
            max-width:none;
        }
        
	</style>
    <div class="stars left hidden" >
		<p class=""><b>Оцените удобство формы предоставляемой услуги</b></p>
        <div class="stars_block">
            <img src='{$empty_star}' title='Плохо' alt=Плохо class="star" onclick='rateStars(1,true,this)'/>
            <img src='{$empty_star}' title='Неудовлетворительно' alt=Неудовлетворительно class="star" onclick='rateStars(2,true,this)'/>
            <img src='{$empty_star}' title='Удовлетворительно' alt=Удовлетворительно class="star" onclick='rateStars(3,true,this)'/>
            <img src='{$empty_star}' title='Хорошо' alt=Хорошо class="star" onclick='rateStars(4,true,this)'/>
            <img src='{$empty_star}' title='Отлично' alt=Отлично class="star" onclick='rateStars(5,true,this)'/>
        </div>
        
        <div class='result_star msg_star hidden'>Ваш отзыв учтен!</div>
        <div class='error_star msg_star hidden'>Ваш отзыв по техническим причинам не учтен!</div>
        <div class='message_star msg_star hidden'></div>
        
        
        <div class="hidden stars_comments">
            <p><b>Добавьте комментарий</b></p>
            {include file="$base_template_path/std_blocks/std_textarea.tpl" class="magic app_comment_stars" name="comment" label=false placeholder="Например, качественно выполненная работа" maxlength="500" value=""}
            <a href="" onclick="comment_submit();return false" class="button btn-primary green comment-submit" style="margin:5px 0px;">Добавить комментарий</a>
        </div>
        
        <div class='result_star2 msg_star2 hidden'>Ваш комментарий учтен!</div>
        <div class='error_star2 msg_star2 hidden'>Ваш комментарий по техническим причинам не учтен!</div>
        <div class='message_star2 msg_star2 hidden'></div>
        
	</div>
	
    {if empty($skipInit)}
        <script type="text/javascript">
        var selectedRate = false;
        {if !empty($app.APP_ID)} var APP_ID = {$app.APP_ID}{/if};
        </script>
        <script type="text/javascript" src="{$CFG_JS_HOST}/common/js_v3/forms/rate_form.js"></script>
    {/if}
{/if}
