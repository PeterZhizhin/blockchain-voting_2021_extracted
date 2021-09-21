<div class='ServiceHeader row'>
    <div class="Breadcrumbs" style="width: calc(100% - 150px)!important">
        <ul class="Breadcrumbs__list"><li class="Breadcrumbs__item"><a class="Breadcrumbs__link"></a></li>
            {if !empty($menu)}
        {foreach   $menu as $value name=menuList}
            {if $smarty.foreach.books.last}
                <li class="Breadcrumbs__item"><span>{$value.title}</span></li>
            {else}
                <li class="Breadcrumbs__item Breadcrumbs__item_right_arrow"><a class="Breadcrumbs__link" href="{$value.link}">{$value.title}</a></li> 
            {/if}
        {/foreach}   
                {/if}
        
        </ul>
    </div>      

        <div class="AboutService__toggle-btn exit_button" >
					<span class="AboutService__toggle-text" ><a href='{$logout}'>Выйти</a></span>
		</div>
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
                                                    Услуга оказывается в электронном виде
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
                                                
<h1>{if !empty($form_name)}{$form_name}{/if}</h1>