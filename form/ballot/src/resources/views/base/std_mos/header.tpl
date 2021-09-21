	<script type="text/javascript">
		document.title = '{if $form_name && $form_name != $state_structure_title}{$form_name}{$title_separator}{/if}{if $state_structure_title}{$state_structure_title}{$title_separator}{/if}' + document.title;
	</script>
        <div class='ServiceHeader'>{$menu}
		<div class="AboutService">
			<div class="AboutService__toggle">
				<div class="AboutService__toggle-btn">
					<i class="AboutService__toggle-icon"><svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path class="circle" d="M.625 9A8.374 8.374 0 0 0 9 17.375 8.374 8.374 0 0 0 17.375 9 8.374 8.374 0 0 0 9 .625 8.374 8.374 0 0 0 .625 9z" stroke="#D6DAE0" stroke-width="1.25" fill="#FFF" fill-rule="nonzero"></path><path d="M8.56 5.838h1.372V4.2H8.56v1.638zM8.546 14h1.386V7.084H7.706L7.3 8.218h1.246V14z" fill="#333"></path></g></svg></i><span class="AboutService__toggle-text">О сервисе</span>
				</div>
			</div>
			<div class="MosCollapse AboutService__window">
				<div class="MosCollapse__item">
					<div class="MosCollapse__header" role="button" tabindex="0" aria-expanded="false"><i class="arrow"></i></div>
					<div class="MosCollapse__content MosCollapse__content_inactive">
						<div class="MosCollapse__contentBox">
							<div class="AboutService__wrapper">
								<div class="AboutService__column">
									<div class="AboutService__header"></div>
									<div class="AboutService__content">
										<div class="pgu-about__grid">
											<div class="pgu-about__column pgu-about__column--left">
												<div class="pgu-about__content">
													{include file="$application_view_path/manualTxt.tpl"}
												</div>
											</div>
											<div class="pgu-about__column pgu-about__column--right">
												<div class="pgu-about__header">Важно знать</div>
												<div class="pgu-about__content">
													{if $download_app_file_enabled && !$edit_draft}<p>Загрузить заявление из <a href="{$CFG_MAIN_HOST}/ru/drafts/" class="hover-underline">списка черновиков</a></p>{/if}
{*													{if isset($faq)}<p><a href="{$CFG_MAIN_HOST}/ru/faq/?subject={$faq}" style="border-bottom: 1px dashed">Часто задаваемые вопросы</a> по этой услуге</p>{/if}*}
													<p class="information-for-service-link"><a href="#" class="js-form-info-show-detail" style="border-bottom: 1px dashed">Информация по услуге</a></p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="AboutService__action"><span role="none" class="AboutService__action-btn">Скрыть</span></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	{* Таймер госуслуг *}
	<div class="timer_head hidden">
	   <div class="timer_img">
		   <img src="{$CFG_MEDIA_HOST}/common/img/mos-ru/clock.png" alt="">
	   </div>
	   <div class="time_left">
		   <p class="timer_title">{if $timer_text}{$timer_text}{else}Оставшееся время:{/if}</p>
		   <p class="timer_value">init_timer_head()</p>
	   </div>
   </div>
	
{* Заменяем символ неразрывный пробел ( &#160; ) на обычный пробел. *}
<h1>{$form_name|replace:("&#160;"|html_entity_decode:$smarty.const.ENT_NOQUOTES:"UTF-8"):" "}</h1>
{if $card_url && $card_title}
        Услуга: <a href="{$card_url}" target="_blank" class="blank">{$card_title}</a>
        <br/><br/>
{/if}

{* Выводим текст после заголовка формы, задается через $this->smarty->assign в классе формы*}
{if isset($form_info) && $form_info}
	<div class="row form-info mb-3">
		<div class="col pr-0 pl-0">
			{$form_info}
		</div>
	</div>
{/if}

{if $special}

		<div class="add-to-favorites {if !$specialChecked}Добавить в избранное{else}add-to-favorites--added{/if} js-add-to-favorites mb-3">
			<div class="add-to-favorites__icon">
			</div>
			<div class="add-to-favorites__title">
				{if $specialChecked}Услуга в избранном{else}Добавить в избранное{/if}
			</div>
		</div>

		<div class='result_fav msg_fav hidden'>Список избранных услуг доступен в <a href="{$elk_host}">Личном кабинете</a></div>
		<div class="invalid-feedback js-fav-error hidden">
			Произошла ошибка на сервере
		</div>
		<div class='invalid-feedback message_fav msg_fav hidden'></div>

		<script type="text/javascript"> 
			$(document).ready(function() {        
				$('.js-add-to-favorites').on('click.fav',function(){
					$('.msg_fav').hide();
					var $toggleEl = $(this);
					var orgId     = '{$org_id}';
					var formId    = '{$form_id}';
					var ajaxData  = {
						'ajaxAction': ($toggleEl.hasClass('add-to-favorites--added') ? 'del' : 'add'),
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
							$('.js-fav-error').show();
						}
						else {

							if (data.error==0) {
								$('.result_fav')
									.css('opacity', 1)
									.show()
									.animate(
										{ opacity: '0' },
										8000,
										function() {
											$(this).hide();
										}
									);
								if ($toggleEl.hasClass('add-to-favorites--added')) {
									$('#fav_blocks_del').hide();
									$('#fav_blocks_add').show();
								}
								else {
									$('#fav_blocks_add').hide();
									$('#fav_blocks_del').show();
								}
							}
							else {
								$('.message_fav')
									.html(data.message)
									.css('opacity', 1)
									.show()
									.animate(
										{ opacity: '0' },
										8000,
										function() {
											$(this).hide();
										}
									);
							}
						}
					});
				});
			});
		</script>
	{/if}
        <div class="row margin_r_0">
        <div class="pgu-main-block col">
