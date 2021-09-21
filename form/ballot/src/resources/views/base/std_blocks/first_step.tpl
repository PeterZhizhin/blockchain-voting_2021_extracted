{if !$department_to}
	{assign var=department_to value="соответствующему департаменту правительства Москвы"}
{/if}
{literal}
<script type="text/javascript">
	$(document).ready(function(){
		$('.agreeCheck').click(function(){
		var btn = $('#button_next');
		if ($('#agree1').attr('checked') && $('#agree2').attr('checked') && $('#agree3').attr('checked')) {
			btn.removeClass('grey_btn');
			btn.removeAttr('disabled');
		}
		else {
			btn.addClass('grey_btn');
			btn.attr('disabled', 'disabled');
		}
		});
	});
</script>
{/literal}
<div style="font-size:150%; text-align:center;">Соглашение о предоставлении личной информации</div><br/>
<div class="tarea1123" style="width:100%;">
<p style="margin:4px 0"><strong>Порядок подачи заявления в&nbsp;электронном виде:</strong></p>
<p style="margin:4px 0">Настоящим во исполнение требований Федерального закона «О персональных данных» № 152-ФЗ от 27.07.2006 г. я даю свое согласие <b>{$department_to}</b>, его территориальным органам и его группе лиц на обработку моих персональных данных в целях обеспечения мне возможности подачи документов в электронном виде. Настоящее согласие выдано без ограничения срока его действия.</p>
<p style="margin:4px 0">Под обработкой персональных данных я понимаю сбор, систематизацию, накопление, хранение (в открытой сети Интернет), уточнение (обновление, изменение), использование, распространение (в том числе передачу), обезличивание, блокирование, уничтожение и любые другие действия (операции) с персональными данными.</p>
<p style="margin:4px 0">Под персональными данными я понимаю любую информацию, относящуюся ко мне, как к субъекту персональных данных, в том числе мою фамилию, имя, отчество, год, месяц, дату и место рождения, адрес, семейное, социальное, имущественное положение, образование, профессию, доходы, другую информацию.</p>
<p style="margin:4px 0">Я оставляю за собой право отозвать свое согласие посредством составления соответствующего письменного документа, который может быть направлен мной в адрес исполнителя по почте заказным письмом с уведомлением о вручении.</p>
</div>
<br/>
<p style="margin:7px 0"><input type="checkbox" name="field[internal.Agree1]" id="agree1" class="agreeCheck"> <label for="agree1">Я&nbsp;ознакомлен(а) с&nbsp;порядком подачи заявления в&nbsp;электронном виде</label></p>
<p style="margin:7px 0"><input type="checkbox" name="field[internal.Agree2]" id="agree2" class="agreeCheck"> <label for="agree2">Я&nbsp;подтверждаю свое согласие на&nbsp;передачу информации в&nbsp;электронной форме заявления по&nbsp;открытым каналам связи сети Интернет</label></p>
<p style="margin:7px 0"><input type="checkbox" name="field[internal.Agree3]" id="agree3" class="agreeCheck"> <label for="agree3">Я&nbsp;подтверждаю свое согласие на&nbsp;долгосрочное использование&nbsp;моих персональных данных</label></p>
<br/>