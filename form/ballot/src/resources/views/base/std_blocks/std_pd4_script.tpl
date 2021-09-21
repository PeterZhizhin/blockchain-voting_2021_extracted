<script type="text/html" id="pd4_template">

	<div id="invoice" class="hidden">
	<style>	
		
	@media print {	
		table{
			width:100%!important;
		}	
		.invoice { 
			width: 802px;
			clear: both;    
		}
		.invoice2 {
			border-top: 2px solid #000000;
		}
		.left_side {
			width: 208px;
			float: left;
			height: 315px
		}
		h3{
			padding: 23px 30px 25px 0;
			text-align: center;
			font-size: 16px;
		}
		h3:first-of-type {
			padding-bottom: 203px;
		}
		.invoice2 h3 {
			padding-top: 5px;
		}
		.invoice2 h3:first-of-type {
			padding-top: 275px;
			padding-bottom: 0;
		}
		.right_side {
			width: 573px;
			float: left;
			padding: 0 15px 15px 4px;
			display: inline-block;
			border-left: 2px solid #000000;
		}
		.form {
			font-size: 11px;
			text-align: right;
			height: 15px;
		}
		p {
			border-bottom: 1px solid #000000;
			font-size: 14px;
			font-weight: 600;
			padding: 6px 0 0px 0;
		}
		p.recipient {
			padding: 6px 7px 0px 7px;
		}
		span.sub {
			font-size: 10px;
			text-align: center;
			display: block;
			line-height: 0.5;
		}
		.number, .bank_number, .rub, .kop {
			display: inline-block;
		}
		.number p {
			padding-top: 5px;
			text-align:center;
		}
		.tax_number {
			padding-right: 27px;
		}
		b {
			display: inline-block;
			font-size: 16px;
			border: 1px solid #000000;
			padding: 0 4px 0 4px;
			font-weight: 400;
		}
		.bank_block_2 b {
			padding: 0 4px 0 3px;
		}
		b:not(:first-child) {
			margin-left: -1px;
		}
		span {
			display: inline-block;
			font-size: 11px;
		}
		.bank {
			display: inline-block;
			float: left;
			margin-top: 5px;
			margin-right: 7px;
		}
		.bank span{
			padding-top:5px;
		}
		.bank p{
			width: 355px;
			display: inline-block;
			margin: 0px 3px;
			padding-top: 3px;
		}
		.bank_block_2 .number {
			padding-left: 12px;
		}
		.payment_description {
			width: 348px;
			float: left;
		}
		.payment_description p {
			font-size: 12px;
			height: 32px;
		}
		.account_number {
			width: 200px;
			float: right;
		}
		.account_number p {
			height: 32px;
			text-align: center;
		}
		.name p, .address p {
			width: 460px;
			display: inline-block;
			margin-left: 5px;
			padding-top: 0;
		}
		.rub, .kop, .date_block p {
			margin: 0 5px;
			text-align: center;
			display: inline-block;
		}
		.rub {
			width: 65px;
		}
		.kop {
			width: 40px;
		}
		.sum1 {
			width: 48%;
			float: left;
		}
		.sum2 {
			width: 52%;
			float: left;
		}
		.total {
			width: 40%;
			clear: both;
			float: left;
		}
		.date_block {
			width: 60%;
			display: inline-block
		}
		.date, .year {
			width: 38px;
		}
		.month {
			width: 155px;
		}
		.inline {
			display: inline;
		}
		.sign {
			padding-left: 80px;
			font-weight: 600;
		}
		.sign + p {
			width: 135px;
			display: inline-block;
			margin: 0 5px;
			padding: 0;
		}

	}	
	</style>
	{foreach  item=class_diff from=[0=>'',1=>'invoice2']}
		<div class="invoice {$class_diff}">
			<div class="left_side">
				<h3>Квитанция</h3>
				<h3>Кассир</h3>
			</div>
			<div class="right_side">
				<div class="form">Форма №ПД-4</div>
				<div>
					<p class="recipient"><%=rcpt%></p>
					<span class="sub">(наименование получателя платежа)</span>
				</div>
				<div class="number tax_number">
					<p><%=inn%></p>
					<span class="sub">(ИНН получателя платежа)</span>
				</div>
				<div class="number">
					<p><%=schet%></p>
					<span class="sub">(номер счета получателя платежа)</span>
				</div>
				<div class="number tax_number">
					<p><%=kpp%></p>
					<span class="sub">(КПП получателя платежа)</span>
				</div>


				<div class="bank_block">
					<div class="bank">
						<span>в</span>
						<p><%=bank%></p>
						<span class="sub">(наименование банка получателя платежа)</span>
					</div>
					<div class="bank_number">
						<span>БИК:</span> 
						<div class="number">
							<p><%=bik%></p>
						</div>
					</div>
				</div>


				<div class="number tax_number">
					<p><%=kbk%></p>
					<span class="sub">(КБК получателя платежа)</span>
				</div>
				<%if (oktmo) { %><div class="number tax_number">
					<p><%=oktmo%></p>
					<span class="sub">(ОКТМО получателя платежа)</span>
				</div>
				<% } %>

				<div class="payment_description">
					<p class="title_of_payment_block"><%=desc%></p>
					<span class="sub">(назначение платежа)</span>
				</div>
				<div class="account_number">
					<p><%=ls%></p>
					<span class="sub">номер лицевого счета (код))</span>
				</div>
				<div class="name">
					<span>Ф.И.О. плательщика</span>
					<p class="fio_payment_block"><%=payer_name%></p>
				</div>
				<div class="address">
					<span>Адрес плательщика</span>
					<p class="address_payment_block"><%=payer_address%></p>
				</div>
				<div class="sum sum1">
					<span>Сумма платежа: </span><p class="rub"><%=sum_rubl%></p><span> руб. </span><p class="kop"><%=sum_kop%></p><span> коп. </span>
				</div>
				<div class="sum sum2">
					<span>Сумма платы за услуги: </span><p class="rub"><%=service_sum_rubl%></p><span> руб. </span><p class="kop"><%=service_sum_kop%></p><span> коп. </span>
				</div>
				<div class="sum total">
					<span>Итого:</span><p class="rub"><%=itogo_sum_rubl%></p><span> руб. </span><p class="kop"><%=itogo_sum_kop%></p><span> коп. </span>
				</div>
				<div class="date_block">
					"<p class="date"><%=day%></p>"<p class="month"><%=month%></p><p class="year"><%=year%></p><span>г.</span>
				</div>
				<span class="inline">С условиями приема указанной в платежном документе суммы, в т.ч. суммой взимаемой платы за услуги банка, ознакомнен и согласен.</span>
				<span class="sign">Подпись плательщика</span><p></p>

			</div>
		</div>
	{/foreach}

	</div>

</script>