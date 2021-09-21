<script>
if (typeof ELKDataSelector == 'undefined') {
	var ELKDataSelector; 
		ELKDataSelector = (function(){
			var 
				ELK_SEL_CONTAINER_SELECTOR		= '.elk-data-selector-container',
				ELK_SEL_CHOSEN					= ' #elk_data_select_chosen',
				FIELD_CONTAINER_SELECTOR 		= '.fieldset-container',
				ELK_SEL_SELECTOR				= '#elk-data-select';
			var self,meta={},blocksToLoad=[],hasELKConnection = false,elkData = {},isELKReadyCall = false, elkDataSelector,fieldContainer, changedElems = {};
	
			function initDataSelector(blockToLoad) {
				var options = '', data = elkData[blockToLoad];
				for (var i=0; i<data.length; i++) {
					options += "<option value='"+i+"'>"+eval(meta[blockToLoad].ELKSelector)+"</option>";
				};
				options = "<option value='custom'>Ввести вручную</option>"+options;
				elkDataSelector.find('option').hide();
				elkDataSelector.append(options);
				elkDataSelector.on('change',function(ev,val) { 
					changeDataSelector(blockToLoad,val); }
				);
				elkDataSelector.trigger("chosen:updated");
			};
	
			function changeDataSelector(blockToLoad,val) {
				if(val.selected == 'custom') {
					clearChangedElems(blockToLoad);
					fieldContainer.show();
				}
				else
					fillForm(blockToLoad,parseInt(val.selected));
			};
	
			function clearChangedElems(blockToLoad) {
				for (var i in changedElems) {
					var el = $(i);
					switch(meta[blockToLoad].fields[meta[blockToLoad].fieldsReverse[i]].type) {
						case 'select':
						case 'date': 
							el.datepicker('enable');
						default:
							el.removeAttr('disabled').val('');
						case 'select':
// 							el.removeAttr('disabled');
							el.trigger("chosen:updated");
							break;
					}
				}
			};
	
			function escapeSelector(selector) {
				return selector.replace(/(!|"|#|\$|%|\'|\(|\)|\*|\+|\,|\.|\/|\:|\;|\?|@)/g, function($1, $2) {
					return "\\" + $2;
				});
			}
			
			function fillForm(block,index) {
				clearChangedElems(block);
				var data = elkData[block][index], field, fieldRev;
				for(var f in data) {
					field = meta[block].fields[f];
					if (typeof field != 'undefined') {
						var el = $(field.selector);
						switch(field.type) {
							case 'select':
							case 'date':
									el.datepicker(data[f]?'disable':'enable');
							default:
								if (data[f]) {
									el.val(data[f]);
									el.attr('disabled','true');
									changedElems[field.selector] = {};
								}
								else
									el.removeAttr('disabled').val('');
							case 'select':
								el.trigger("chosen:updated");
								break;
						}
						
					}
				};
				fieldContainer.show();
			};
	
			function loadBlock(params) { //blockToLoad, prefix
				if (typeof meta[params.blockToLoad] == 'undefined' ) {
					switch(params.blockToLoad) {
						case 'CHILDREN': 
							//			1. BIRTHDATE: "01.04.1997"
							//			2. BIRTH_CERT_DATE: "10.04.1997"
							//			3. BIRTH_CERT_NUMBER: "XIV-МЮ 777777"
							//			4. GENDER: "f"
							//			5. NAME: "Жанна"
							//			6. OMS_NUMBER: "2222222222222222"
							//			7. PATRONYMIC: "Агузаровна"
							//			8. SURNAME: "Кораблева"
							meta.CHILDREN = {
								fields : {
									SURNAME : { selector: '#'+escapeSelector(params.prefix+'-lastname'), type: 'text' },
									NAME : { selector: '#'+escapeSelector(params.prefix+'-firstname'), type: 'text' },
									PATRONYMIC : { selector: '#'+escapeSelector(params.prefix+'-middlename'), type: 'text' },
									GENDER : { selector: '#'+escapeSelector(params.prefix+'-gender'), type: 'select' },
									BIRTHDATE : { selector: '#'+escapeSelector(params.prefix+'-birthdate'), type: 'date' },
								},
								fieldsReverse: {},
								selectors : {},
								ELKSelector : "(data[i].SURNAME ? data[i].SURNAME : '') + ' ' + (data[i].NAME ? data[i].NAME : '') + ' ' + (data[i].PATRONYMIC ? data[i].PATRONYMIC : '')"
							};
					}
					var fieldsReverse = {};
					for (var i in meta[params.blockToLoad].fields)
						fieldsReverse[meta[params.blockToLoad].fields[i].selector] = i;
					meta[params.blockToLoad].fieldsReverse = fieldsReverse;
				}
				
				if (hasELKConnection) {
					loadELKBlock(params);
				}
				else {
					if (!isELKReadyCall) {
						ELK.ready(function() {
							hasELKConnection = true;
							processBlocks();
						});
						isELKReadyCall = true;
					}
					blocksToLoad.push(params);
				}
			};

			function loadELKBlock(params) {
				ELK.loadUserProfileData({
				    blocks: [params.blockToLoad],
				    done: function(data) {
						if(data[params.blockToLoad] !== undefined)
							elkData[params.blockToLoad] = data[params.blockToLoad] instanceof Array ? data[params.blockToLoad] : [data[params.blockToLoad]];
						else
							return false;
						elkDataSelector = $(ELK_SEL_SELECTOR);
						fieldContainer = $(FIELD_CONTAINER_SELECTOR);
						$(ELK_SEL_CHOSEN).one('mousedown', function() {
							initDataSelector(params.blockToLoad);
						});
						$(ELK_SEL_CONTAINER_SELECTOR).show();
						fieldContainer.hide();
				    }
				});
			};

			function processBlocks() {
				for (var i=0; i<blocksToLoad.length; i++)
					loadELKBlock(blocksToLoad[i]);
			};
			
			function init() {
				return {
					loadBlock: loadBlock
				};
					
			};
			if (!self) self = init();
			return self;
		})();

}
ELKDataSelector.loadBlock({ blockToLoad:"{$blockToLoad}",prefix:"{$person}" });
</script>


<div class="elk-data-selector-container" style="display: none;">
{include file="$base_template_path/std_blocks/std_select.tpl" name="elk-data-select" id="elk-data-select" container_class="elk-data-select" no_results_text="Добавить к поиску" label="Выберите фамилию, имя и отчество ребенка" select_text=" " hint="{$elk_hint}"}
</div>
<div class="fieldset-container">
{array vars="array('m' => 'Мужской','f' => 'Женский')" assign="gender_dict"}
{include file="$base_template_path/std_blocks/std_text.tpl" label="Фамилия" required=true name="field[{$person}.lastname]" container_class="{$person}-lastname" id="{$person}-lastname"}
{include file="$base_template_path/std_blocks/std_text.tpl" label="Имя" required=true name="field[{$person}.firstname]" container_class="{$person}-firstname" id="{$person}-firstname"}
{include file="$base_template_path/std_blocks/std_text.tpl" label="Отчество" name="field[{$person}.middlename]" container_class="{$person}-middlename" id="{$person}-middlename"}
{if !isset($show_gender) || $show_gender}
	{include file="$base_template_path/std_blocks/std_select.tpl" items=$gender_dict label="Пол" required=true name="field[{$person}.gendercode]" container_class="{$person}-gender" id="{$person}-gender"}
{/if}
{if !isset($show_birthdate) || $show_birthdate}
	{include file="$base_template_path/std_blocks/std_date.tpl" label="Дата рождения" required=true name="field[{$person}.birthdate]" container_class="{$person}-birthdate" id="{$person}-birthdate" validator="date_in_past_and_now"}
{/if}
{if !isset($show_phone) || $show_phone}
	{include file="$base_template_path/std_blocks/std_text.tpl" label="Контактный телефон" validator="phone_num" container_class="{$person}-mobilephone" id="{$person}-mobilephone" required=true name="field[{$person}.mobilephone]" mask="(999) 999-99-99" placeholder="Введите номер мобильного телефона"}
{/if}
{if !isset($show_email) || $show_email}
	{include file="$base_template_path/std_blocks/std_text.tpl" label="Адрес электронной почты" required=true name="field[{$person}.emailaddress1]" validator="email" container_class="{$person}-emailaddress" id="{$person}-emailaddress"}
{/if}
{if !isset($show_snils) || $show_snils}
	{include file="$base_template_path/std_blocks/std_snils.tpl" label="СНИЛС" required=true name="field[{$person}.new_snils]" validator="snils" container_class="{$person}-snils" id="{$person}-snils"}
{/if}
</div>