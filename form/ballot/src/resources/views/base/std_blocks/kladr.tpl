{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}
{literal}
<script type="text/javascript">
	var {/literal}{$contact}{literal}tmpKladrIndex = new Array(1000);
$(document).ready(function(){
//	{/literal}{$contact}{literal}kladr(0, '', true);
	{/literal}{if $default}{$contact}kladr(1, '', true);{/if}{literal}
	{/literal}{if !$validate}{literal}
	$("*[name='field[{/literal}{$contact}{literal}.address1_stateorprovince]']").rules("add", {required: true});
	$("*[name='field[{/literal}{$contact}{literal}.address1_line1]']").rules("add", {required: true});
	$("*[name='field[{/literal}{$contact}{literal}.address1_line2]']").rules("add", {required: true});
	$("*[name='field[{/literal}{$contact}{literal}.address1_line3]']").rules("add", {required: {/literal}{if !$validateFlat}true{else}{$validateFlat}{/if}{literal}});
	{/literal}{/if}{literal}
	//автокомплит для улиц
	$('[name="field[{/literal}{$contact}{literal}.address1_line1]"]').autocomplete({
		open: function() {
			var el=$('[name="field[{/literal}{$contact}{literal}.address1_line1]"]');
        	var position = el.position(),
            height =el.outerHeight(), bottom = position.top+height;
	        $("ul.ui-autocomplete").css({top: bottom-1+'px' });
    		},

		select:  function(event, ui) {
			StreetSelected=ui.item;
			$('#{/literal}{$contact}{literal}kladr5').val(ui.item.code);
			{/literal}{$contact}{literal}kladr(5,'',false,ui.item.postIndex, ui.item.code);
		},
		source: function( request, response ) {
              var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			  var result=[];
			  var v,i,c=0;
				if (typeof({/literal}{$contact}{literal}KladrStreets) != 'undefined' && {/literal}{$contact}{literal}KladrStreets.length) {
				  for (i=0;c< 20 && i<{/literal}{$contact}{literal}KladrStreets.length;i++){
					v={/literal}{$contact}{literal}KladrStreets[i];
					if ( matcher.test(v.NAME) ) {
					  text=v.NAME+', '+v.SOCR;
					  result[result.length]= {
						label: text.replace(
						  new RegExp(
							"(?![^&;]+;)(?!<[^<>]*)(" +
							$.ui.autocomplete.escapeRegex(request.term) +
							")(?![^<>]*>)(?![^&;]+;)", "gi"
						  ), "<strong>$1</strong>" ),
						value: text,
						postIndex: v.POST_INDEX,
						code:  v.CODE
					  };
					  c++;
					}
				  }
				}
			  response(result);
            }

	});

	$('[name="field[{/literal}{$contact}{literal}.address1_line1]"]').data( "autocomplete" )._renderItem = function( ul, item ) {
	  return $( "<li></li>" )
		.data( "item.autocomplete", item )
		.append( "<a>" + item.label + "</a>" )
		.appendTo( ul );
	};



	//автокомплит для домов
	//=====================================================================================
	$('[name="field[{/literal}{$contact}{literal}.address1_line2]"]').autocomplete({

		open: function() {
			var el=$('[name="field[{/literal}{$contact}{literal}.address1_line2]"]');
        	var position = el.position(),
            height =el.outerHeight(), bottom = position.top+height;
	        $("ul.ui-autocomplete").css({top: bottom-1+'px' });
            $("ul.ui-autocomplete").scrollTop(0);

    		},

		select:  function(event, ui) {
			{/literal}{$contact}{literal}setPostIndex(ui.item.postIndex, ui.item.code);

			$('[name="field[{/literal}{$contact}{literal}.new_address1_property]"]').val(ui.item.vladenie);
			$('[name="field[{/literal}{$contact}{literal}.new_address1_line4]"]').val(ui.item.corpus);
			$('[name="field[{/literal}{$contact}{literal}.new_address1_structure]"]').val(ui.item.stroenie);
			$('[name="field[{/literal}{$contact}{literal}.address1_line2]"]').val(ui.item.house + (ui.item.dev ? '/' + ui.item.dev : ''));
			return false;
		},
		source: function( request, response ) {
              var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			  var result=[];
			  var v,i,c=0;
			if (typeof({/literal}{$contact}{literal}KladrHouses) != 'undefined' && {/literal}{$contact}{literal}KladrHouses.length) {
			  for (i=0;c< 30 && i<{/literal}{$contact}{literal}KladrHouses.length;i++){
                v={/literal}{$contact}{literal}KladrHouses[i];
                if ( matcher.test(v.label) ) {
				  text=v.label;
                  result[result.length]= {
                    label: text.replace(
                      new RegExp(
                        "(?![^&;]+;)(?!<[^<>]*)(" +
                        $.ui.autocomplete.escapeRegex(request.term) +
                        ")(?![^<>]*>)(?![^&;]+;)", "gi"
                      ), "<strong>$1</strong>" ),
                    value: text,
					postIndex: v.postIndex,
					code:  v.code,
					house: v.house,
					dev: v.dev,
					corpus: v.corpus,
					stroenie: v.stroenie,
					vladenie: v.vladenie
                  };
				  c++;
				}
              }
			}
			  response(result);
            }

	});

	$('[name="field[{/literal}{$contact}{literal}.address1_line2]"]').data( "autocomplete" )._renderItem = function( ul, item ) {
	  return $( "<li></li>" )
		.data( "item.autocomplete", item )
		.append( "<a>" + item.label + "</a>" )
		.appendTo( ul );
	};

});

function {/literal}{$contact}{literal}setPostIndex(idx, kladr){
	if (idx==null) idx='';
	$('[name="field[{/literal}{$contact}{literal}.address1_postalcode]"]').val(idx);
	$('[name="field[{/literal}{$contact}{literal}.address1_postalcode_text]"]').text(idx);
	{/literal}{if !$skipkladr}{literal}
	$('[name="field[{/literal}{$contact}{literal}.address1_kladr]"]').val(kladr);
	$('[name="field[{/literal}{$contact}{literal}.address1_kladr_text]"]').text(kladr);
	{/literal}{/if}{literal}
}

function {/literal}{$contact}{literal}cleanPostIndex()
{
	$('[name="field[{/literal}{$contact}{literal}.address1_postalcode]"]').val('');
	$('[name="field[{/literal}{$contact}{literal}.address1_postalcode_text]"]').text('');
}

function {/literal}{$contact}{literal}cleanKladrHouse(){
	$('[name="field[{/literal}{$contact}{literal}.new_address1_property]"]').val('');
	$('[name="field[{/literal}{$contact}{literal}.address1_line2]"]').val('');
	$('[name="field[{/literal}{$contact}{literal}.new_address1_line4]"]').val('');
	$('[name="field[{/literal}{$contact}{literal}.new_address1_structure]"]').val('');

	$('[name="field[{/literal}{$contact}{literal}.address1_line3]"]').val('');
	{/literal}{$contact}{literal}KladrHouses=[];
	return true;
}

function {/literal}{$contact}{literal}cleanKladrStreet(){
	{/literal}{$contact}{literal}cleanKladrHouse();
	$('[name="field[{/literal}{$contact}{literal}.address1_line1]"]').val('');
	{/literal}{$contact}{literal}KladrStreets=[];
}

function addOption (oListbox, text, value, isDefaultSelected, isSelected)
{
  var oOption = document.createElement("option");
  oOption.appendChild(document.createTextNode(text));
  oOption.setAttribute("value", value);

  if (isDefaultSelected) oOption.defaultSelected = true;
  else if (isSelected) oOption.selected = true;

  oListbox.appendChild(oOption);
}

function {/literal}{$contact}{literal}kladr(level, def, first, idx, code)
{
	$("#{/literal}{$contact}{literal}kladrLoader").show();
	id = '';
	while (id == '' && level) {
		if ($("#{/literal}{$contact}{literal}kladr"+level).val())
			id = $("#{/literal}{$contact}{literal}kladr"+level).val();
		else
			level--;
	}

	if (typeof({/literal}{$contact}{literal}tmpKladrIndex[id]) != "undefined" && {/literal}{$contact}{literal}tmpKladrIndex[id])
		jQuery('#{/literal}{$contact}{literal}kladr0').val({/literal}{$contact}{literal}tmpKladrIndex[id]); 

	if (level < 6)
	{
		$("#{/literal}{$contact}{literal}kladrLoader").show();

		var kladrDataKey=id+'';
		{/literal}{if $allowed_federal}kladrDataKey+='-f';{/if}{literal}

		if (typeof(KLADR_DATA[kladrDataKey])=='undefined'){
			if (typeof(KLADR_PENDING[kladrDataKey])=='undefined'){
				KLADR_PENDING[kladrDataKey]=[];
			}

			KLADR_PENDING[kladrDataKey].push(function(){
				{/literal}{$contact}{literal}ProcessAjaxKladrData(KLADR_DATA[kladrDataKey],level,def, first, idx, code);
			});

			if (KLADR_PENDING[kladrDataKey].length==1){


				$.ajax({
					url: document.location.href,
					type: "POST",
					dataType : "json",
					data: ({ajaxAction: 'getKladr', code: id{/literal}{if $allowed_federal}, allowed_federal: {$allowed_federal}{/if}{literal}}),
					success: function(data){
						{/literal}{$contact}{literal}ProcessAjaxKladrData(data, level,def, first, idx, code);
						KLADR_DATA[kladrDataKey]=data;
						var f;
						if (typeof(KLADR_PENDING[kladrDataKey])!='undefined' && KLADR_PENDING[kladrDataKey].length>0){
							while(KLADR_PENDING[kladrDataKey].length>0){
								KLADR_PENDING[kladrDataKey].pop()();
							}
						}
					//Trigger event for unlock field
					$( document ).trigger('kladrLoadSuccess');
					}
				});
			}
		} else {
			{/literal}{$contact}{literal}ProcessAjaxKladrData(KLADR_DATA[kladrDataKey],level,def, first, idx, code);
		}
	}
	else $("#{/literal}{$contact}{literal}kladrLoader").hide();
}


function {/literal}{$contact}{literal}ProcessAjaxKladrData(data, level,def, first, idx, code) {
			if (typeof(data.isError) != 'undefined' && data.isError == 1 && data.errorCode != 30) {
				$('#{/literal}{$contact}{literal}kladrError').html(data.errorText ? data.errorText : 'Произошла ошибка во время загрузки данных, попробуйте ещё раз позже');
				$('#{/literal}{$contact}{literal}kladrError').show();
				$("#{/literal}{$contact}{literal}kladrLoader").hide();
			}
			else {$('#{/literal}{$contact}{literal}kladrError').hide();
				$("#{/literal}{$contact}{literal}kladrinput" + level).val($("#{/literal}{$contact}{literal}kladr"+level+" :selected").html());
				var levels = new Array(5);
				//tmpKladrIndex.length = 0;
				$("#{/literal}{$contact}{literal}kladrLoader").hide();
				for (i = 1 * level + 1; i < 5; i++)
				{
					$("#{/literal}{$contact}{literal}kladrinput" + i).val('');
					$('#{/literal}{$contact}{literal}kladr' + i).get(0).length = 0;
					addOption(jQuery('#{/literal}{$contact}{literal}kladr' + i).get(0), 'Нет', '', false, 1);
				}
				{/literal}{$contact}{literal}cleanKladrHouse();
				{/literal}{$contact}{literal}cleanPostIndex();
				if (level != 5)
					{/literal}{$contact}{literal}cleanKladrStreet();
				else
					{/literal}{$contact}{literal}setPostIndex(idx, code);
				$.each(data, function(n, kladrLevel){
					if (n < 5)
						$.each(kladrLevel, function (i, item){
							sel = (def && i == def) ? 1 : 0;
							addOption($('#{/literal}{$contact}{literal}kladr' + n).get(0), item.NAME + (item.SOCR ? ', ' + item.SOCR : ''), item.CODE, false, sel);
							{/literal}{$contact}{literal}tmpKladrIndex[item.CODE] = item.POST_INDEX;
						});
					else if (n == 5)
						{/literal}{$contact}{literal}KladrStreets = kladrLevel;
					else if (n == 6)
						{/literal}{$contact}{literal}KladrHouses = kladrLevel;
				});
				for (i = 1 * level + 1; i < 5; i++)
					if ($("#{/literal}{$contact}{literal}kladr"+i).get(0).length > 1 && (level > 0 || first)) {
						$('#{/literal}{$contact}{literal}kladr' + i + '_container').show();
						$('#{/literal}{$contact}{literal}kladr'+i).removeAttr('disabled');
					}
					else {
						$('#{/literal}{$contact}{literal}kladr'+i).attr('disabled', 'disabled');
						$('#{/literal}{$contact}{literal}kladr' + i + '_container').hide();
					}
				if (def)
				{
					{/literal}{$contact}{literal}kladr(level * 1 + 1, '');
				}
			}
		}

</script>
{/literal}
<input type="hidden" value="1" name="field[{$contact}.new_address1_type]">
<table class="free_column">
	<tr>
		<td class="padding_bottom">Регион:<span class="required">*</span></td>
		<td class="padding_bottom padding_right" style="padding-left: 5px">
			<input type="hidden" value="" name="field[{$contact}.address1_stateorprovince]" id="{$contact}kladrinput1">
			<select id="{$contact}kladr1" onChange="{$contact}kladr(1,'',false);">
			{if $default}{html_options options=$defKladr selected=$default}
			{else}<option value=''>Нет</option>{html_options options=$defKladr}{/if}
			</select>
		</td>
		<td></td>
	</tr>
		<tr id='{$contact}kladr2_container' style='display: none'>
			<td class="padding_bottom">Район: </td>
			<td class="padding_bottom padding_right" style='padding-left: 5px'>
				<input type="hidden" value="" name="field[{$contact}.address1_county]" id="{$contact}kladrinput2">
				<select id="{$contact}kladr2" onChange="{$contact}kladr(2,'',false);"></select>
			</td>
			<td></td>
		</tr>
		<tr id='{$contact}kladr3_container' style='display: none'>
			<td class="padding_bottom">Город: </td>
			<td class="padding_bottom padding_right" style='padding-left: 5px'>
				<input type="hidden" value="" name="field[{$contact}.address1_city]" id="{$contact}kladrinput3">
				<select id="{$contact}kladr3" onChange="{$contact}kladr(3,'',false);"></select>
			</td>
			<td></td>
		</tr>
		<tr id='{$contact}kladr4_container' style='display: none'>
			<td class="padding_bottom">Населенный пункт: </td>
			<td class="padding_bottom padding_right" style="padding-left: 5px">
				<input type="hidden" value="" name="field[{$contact}.new_address1_town]" id="{$contact}kladrinput4">
				<select id="{$contact}kladr4" onChange="{$contact}kladr(4,'',false);"></select>
			</td>
			<td></td>
		</tr>
</table>

<table style="width: 100%" id="{$contact}AddressBlock" class="free_column">
  <tbody>
  <tr>
  <td style="width: 120px" class="padding_bottom">
    Улица:<span class="required">*</span> </td>
  <td style="padding: 5px 0;">
  <input type="hidden" value="" id="{$contact}kladr5">
     <input type="text" name="field[{$contact}.address1_line1]" class="StreetName">
    </td>
    <td style="padding: 5px 0 0 10px"><img id="{$contact}kladrLoader" style="display:none;vertical-align: middle" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"></td>
  </tr>
  <tr>
    <td style="width: 120px" class="padding_bottom">
      Дом:<span class="required">*</span>   </td>
    <td style="padding: 5px 0">
      <input type="text" name="field[{$contact}.address1_line2]" class="HouseNo" id="{$contact}kladr6" maxlength="10">
    </td>
    <td style="padding: 5px 0 0 10px"><img class="BuildingLoader" style="display:none;vertical-align: middle" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"></td>
  </tr>
  <tr>
    <td style="width: 120px" class="padding_bottom">
      Владение:</td>
    <td style="padding: 5px 0">
      <input type="text" name="field[{$contact}.new_address1_property]" class="VladenieNo" maxlength="10">
    </td>
    <td style="padding: 5px 0 0 10px"><img class="BuildingLoader" style="display:none;vertical-align: middle" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"></td>
  </tr>
  <tr>
    <td style="width: 120px" class="padding_bottom">
      Корпус:</td>
    <td style="padding: 5px 0">
      <input type="text" name="field[{$contact}.new_address1_line4]" class="CorpusNo" maxlength="10">
    </td>
    <td style="padding: 5px 0 0 10px"><img class="BuildingLoader" style="display:none;vertical-align: middle" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"></td>
  </tr>
  <tr>
    <td style="width: 120px" class="padding_bottom">
      Строение:</td>
    <td style="padding: 5px 0">
      <input type="text" name="field[{$contact}.new_address1_structure]" class="StroenieNo" maxlength="10">
    </td>
    <td style="padding: 5px 0 0 10px"><img class="BuildingLoader" style="display:none;vertical-align: middle" src="{$CFG_MEDIA_HOST}/common/img/base/loader2.gif"></td>
  </tr>
  <tr>
    <td style="width: 120px" class="padding_bottom">
      Квартира:{if $validate!='false' && (!isset($validateFlat) || $validateFlat != 'false')}<span class="required">*</span>{/if}</td>
    <td style="padding: 5px 0">

      <input class="Flat" name="field[{$contact}.address1_line3]" maxlength="10">
    </td>
    <td></td>
  </tr>
</tbody></table>
	{if !$skipkladr}<input type="hidden" name="field[{$contact}.new_address1_kladr]" class="StreetName">{/if}

	<table style="width: 100%" class="free_column">
	  <tbody>
	  <tr>
	  <td style="width: 120px"  class="padding_bottom">
		Индекс (заполняется автоматически):</td>
	  <td class="padding_bottom">
		 <span name="field[{$contact}.address1_postalcode_text]"></span>
		 <input type="hidden" name="field[{$contact}.address1_postalcode]" class="StreetName">
		</td>
		<td style="padding: 5px 0 0 10px"></td>
	  </tr>
	  <tr>
	  <td colspan=3 id="{$contact}kladrError" style="color:red"></td>
	  </tr>
	  </tbody>
	</table>
