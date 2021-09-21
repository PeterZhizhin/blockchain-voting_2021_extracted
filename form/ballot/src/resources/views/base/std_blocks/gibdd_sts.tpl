{assign var='dsts_name' value=$dsts_name|default:'driverSTS'}
{assign var='dsts_id' value=$dsts_id|default:'driverSTS'} 
{assign var='dsts_value' value=$dsts_value|default:''}
{assign var='hint' value=$hint|default:'В нижней части СТС, красными чернилами, пропечатан номер бланка свидетельства: <div class="sts-hint"></div>'}
{include file="$base_template_path/std_blocks/std_text.tpl" mask="99~~999999" class="has-gibdd-letters has-gibdd-sts" minlength=0 maxlength=10 label="Номер свидетельства о регистрации транспортного средства" id="$dsts_id" name="$dsts_name"}
