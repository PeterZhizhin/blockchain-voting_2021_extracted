<?php
if (cfg('services/mos_ru/stat_url',false)) {
?>
<script type="text/javascript" id="statsmosru" src="<?php echo cfg('services/mos/stat_url'); ?>" onLoad="statsMosRuCounter()" defer="defer" async="true"></script>
<?php
}