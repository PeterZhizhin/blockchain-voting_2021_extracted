<?php

if (cfg('logout/on',false)) {
?>
    <div class="top_panel_mpgu">
        <div class="top_panel_cnt"> 
<!--        <div class="register">
                <a href="//pgu-dev.mos.ru/ru/" target="_parent" class="register_lnk">
                    <span class="register_lnk-i">Регистрация</span>
                </a> 
            </div>-->


            <?php
            if (!client_access::check_autorization()) {
				
				if (!cfg('logout/mos',false)) { ?>
				<div class="enter_block_mpgu">
					<a title="Войти" href="<?php print (OAuth::checkOAuthEnabled()?cfg('services/sudir_oauth/backurl').'?login=true&redirect_uri='.  urlencode(lib::getMainUrl().$_SERVER['REQUEST_URI']):lib::getMainUrl().'/ru/auth'); ?>" target="_parent" class="enter_lnk">
						<span class="enter_lnk-i">Войти</span>
					</a>
				</div>
				<?php } else { ?>
				<div class="form-infobox  white row" style="background-position: 30px 30px; padding:30px 30px 25px 75px">
				<div class="enter_block_mpgu col-md-4 col-sm-4 col-xs-4">
					<a title="Войти" href="<?php print (OAuth::checkOAuthEnabled()?cfg('services/sudir_oauth/backurl').'?login=true&redirect_uri='.  urlencode(lib::getMainUrl().$_SERVER['REQUEST_URI']):lib::getMainUrl().'/ru/auth'); ?>" target="_parent" class="enter_lnk button" style="margin:0px">
							<span class="enter_lnk-i">Войти</span>
						</a>
				</div>
				</div>
				<?php } ?>
				   
				
				<?php 
			} else { ?>
           
				
				<?php if (!cfg('logout/mos',false)) { ?>
				<div class="logout_block_mpgu">
					 <a title="Выйти" href="<?php echo  (OAuth::checkOAuthEnabled()?(cfg('services/sudir_oauth/backurl').'?logout=true&redirect_uri='.  urlencode(lib::getMainUrl().$_SERVER['REQUEST_URI'])):cfg('services/sudir_pages/logout')); ?>" target="_parent" class="logout_lnk ">
					<span class="logout_lnk-i">Выйти</span>
					</a>
				</div>
				<div class="fio"><?php $user = User::get_current_client(); echo '<a target="_blank" href="'. lib::getElkUrl() .'" class="user_name"><span>'.($user['SURNAME'].' '.$user['NAME'].' '.$user['PATRONYMIC']).'</span></a>'; ?></div>
				
				<?php } else { ?>
				<div class="form-infobox  white row wrap form-horizoontal" style="background-position: 30px 30px;  padding:30px 30px 25px 75px">
					<div class="fio col-md-4 col-sm-5 col-xs-10" style="font-size:26px;margin-bottom:5px;"><?php $user = User::get_current_client(); echo '<a target="_blank" href="'. lib::getElkUrl() .'" class="user_name"><span>'.($user['SURNAME'].' '.$user['NAME'].' '.$user['PATRONYMIC']).'</span></a>'; ?></div>
					<div class="logout_block_mpgu col-md-7 col-sm-6 col-xs-12">
						 <a title="Выйти" href="<?php echo  (OAuth::checkOAuthEnabled()?(cfg('services/sudir_oauth/backurl').'?logout=true&redirect_uri='.  urlencode(lib::getMainUrl().$_SERVER['REQUEST_URI'])):cfg('services/sudir_pages/logout')); ?>" target="_parent" class="logout_lnk  button" style="margin:0px">
							<span class="logout_lnk-i">Выйти</span>
						</a>
					</div>				
				</div>
				
					
				<?php } ?>	
	
			

            <?php if (cfg('use_elk')) { ?>
                <script type="text/javascript">
                    $(document).ready(function() {
                        ELK.ready(function() {
                            ELK.loadUserProfileData( {
                                blocks : ['FIO','LEGAL_REG_INFO'],
                                done : function ( data ) {
                                    if (data.LEGAL_REG_INFO!=undefined) {
                                        if (data.LEGAL_REG_INFO.SHORT_NAME!=undefined)
                                            $('.user_name span').html(data.LEGAL_REG_INFO.SHORT_NAME);
                                        else $('.user_name span').html('ИП '+data.LEGAL_REG_INFO.HEAD);
                                    }
                                    else {
                                        if (data.FIO!=undefined) {
                                            $('.user_name span').html(data.FIO.SURNAME+' '+data.FIO.NAME+' '+data.FIO.PATRONYMIC);
                                        }
                                    }
                                }
                            });
                        });
                    });
                </script>
            <?php } ?>
            <?php } ?>
        </div>

    </div>
<?php
}