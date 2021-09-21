
<?php if (cfg('services/mos_ru/on')) { ?>
	
<script defer="defer" async="true" id="mos-layouts-boot" data-lang="ru"  data-domain="<?php echo cfg('services/mos_ru/domain') ?>" src="<?php echo cfg('services/mos_ru/js') ?>"  <?php if (!empty($service_catalog_id)) {echo 'data-feedback-url="'.lib::getMainUrl().'/ru/feedback/?service='.$service_catalog_id.'"';} ?>"></script>
<?php } ?>