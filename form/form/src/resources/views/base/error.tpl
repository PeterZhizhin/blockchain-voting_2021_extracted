<link rel="stylesheet" type="text/css" href="/common/static/css/app/election/mgd2021.css?{$smarty.now|date_format:'%Y-%m-%dT%H'}" />

<nav>
	{include file="./menu.tpl" logout=$logout}
</nav>

<main>
	<div class="mos-container">
		<div style="padding:15% 5%;">
			<h1>{block name="error_code"}{/block}</h1>
			{* <h2>{block name="error_title"}Название ошибки{/block}</h2> *}
			<p>{block name="error_message"}Текст ошибки{/block}</p>
			<a href="{block name="link_url"}{/block}" class="">{block name="link_text"}Текст ссылки{/block}</a>
		</div>
		<div class="error_page_image">
			{block name="error_page_image"}{/block}
		</div>
	</div>
</main>
