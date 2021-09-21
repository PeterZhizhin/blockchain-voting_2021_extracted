{if !isset($person_block_tmpl)}
{block name="person_block"}{assign var="person_block_tmpl" value="$base_template_path/std_blocks/std_person.tpl"}{/block}
{elseif ($person_block_tmpl|strpos:"/" === false)}
	{assign var="person_block_tmpl" value="$base_template_path/std_blocks/{$person_block_tmpl}"}
{/if}
{*
при подключении обязательно указывать

field_name_person="field[new_zayv_pod]" // название поля для радиокнопки заявитель/представитель
field_name_person_type="field[new_zayv_yavl]" // название поля для радиокнопки заявитель/представитель
person_type=$person_type // тип лица 1- физик, 2 - юрик, 3 - ип
field_name_ul_trustee="field[new_yavl_dov]" //имя поля для первое лицо организации или нет
field_name_ul_declarant="field[new_yavl]"


{assign var=file_document_trustee value=['docid'=>10901,'index'=>34,'class'=>'file_zip','name'=>'б/н','label'=>'Прикрепите документы, на основании которых действует уполномоченная организация (индивидуальный предприниматель)']}
{assign var=file_document_declarant_ul value=['docid'=>10002,'index'=>36,'class'=>'file_zip','name'=>'б/н','label'=>'Прикрепите доверенность(-и) на основании которых Вы действуете']}
{assign var=file_document_trustee_ul value=['docid'=>10002,'index'=>35,'class'=>'file_zip','name'=>'б/н','label'=>'Прикрепите доверенность(-и), на основании которых Вы действуете']}
//файлы в шаблоне обязательные		
file_document_trustee=$file_document_trustee
file_document_declarant_ul=$file_document_declarant_ul
file_document_trustee_ul=$file_document_trustee_ul


callback_change="updateShowingFields();" // пример колбека при обновлении типа лица 

возможные
field_label_ul_trustee //Вы являетесь: для юл доверенного лица
//массив связи по умолчанию такое,если не указывать другое
person_linked=[1=>[],2=>[2,3],3=>[2,3]]
	Адрес официального сайта опции
		show_website = false/true 
		hint_website_text = 'подсказка'
		required_website = false/true
*}
{*упустил момент где использовалось maxlength_fio нужно убрать и заменить на fio_length*}
{if isset($maxlength_fio)&&$maxlength_fio}{assign var=fio_length value=$maxlength_fio}{/if}
{*{if !isset($fio_length)}{/if}*}
{assign var=fio_length value=250}
{if !isset($maxlength_middlename)||$maxlength_middlename}{assign var=maxlength_middlename value=$fio_length}{/if}
{if !isset($maxlength_firstname)||$maxlength_firstname}{assign var=maxlength_firstname value=$fio_length}{/if}
{if !isset($maxlength_lastname)||$maxlength_lastname}{assign var=maxlength_lastname value=$fio_length}{/if}
{if !isset($person_show_birthdate)||$person_show_birthdate}{assign var=person_show_birthdate value=1}{/if}
{if !isset($person_show_phone)||$person_show_phone}{assign var=person_show_phone value=1}{/if}
{if !isset($person_show_email)||$person_show_email}{assign var=person_show_email value=1}{/if}
{if !isset($person_show_snils)}{assign var=person_show_snils value=0}{/if}
{if (!isset($person_linked))}{assign var=person_linked value=[1=>[],2=>[2,3],3=>[2,3]]}{/if}
{if (isset($required_website) && $required_website)}{assign var=required_website value=$required_website}{else}{assign var=required_website value=false}{/if}
{if (isset($hint_website_text) && $hint_website_text)} {assign var=hint_website_text value=$hint_website_text}{else}{assign var=hint_website_text value=false}{/if}
{if (isset($show_head_info) && !isset($use_orghead))} {assign var=use_orghead value=$show_head_info}{elseif !isset($use_orghead)}{assign var=use_orghead value=false}{/if}


{$maxlength_full_name = "500"}

{if !isset($start_index)}
	{if !isset($start_index)||$file_document_trustee_ul.index<$start_index}{$start_index= $file_document_trustee_ul.index}{/if}
	{if !isset($start_index)||$file_document_declarant_ul.index<$start_index}{$start_index= $file_document_declarant_ul.index}{/if}
	{if !isset($start_index)||$file_document_trustee.index<$start_index}{$start_index= $file_document_trustee.index}{/if}
	{if !isset($start_index)}{assign var=start_index value=0}{/if}
{/if}

<input type="hidden" name="field[internal.declarant_and_trustee_used]" value="1"/>
<input type="hidden" name="field[internal.remove_double]" value="1"/>
<input type='hidden' id="cat" name='field[new_type]' value='{$person_type}'/>

{if $person_linked.$person_type|count>0}
	<fieldset class="form-block cat_enjoy">
		{if $trustee_legend}<legend>{$trustee_legend}</legend>{/if}
		{*	ИП или ЮЛ 0.1	*}
			{if !isset($type_decl)}	{array vars="array('1' => 'Заявителем','2' => 'Представителем заявителя')" assign="type_decl"} {/if}
			{include file="$base_template_path/std_blocks/std_radiogroup.tpl" value="{if count($type_decl)==1}{if isset($type_decl[1])}1{else}2{/if}{else}1{/if}" container_class="type_decl visual_controller form_field_declaration_type" required=true items=$type_decl label="{if $field_label_person}{$field_label_person}{else}Заявление подается:{/if}" name=$field_name_person }
		
		<div class="hidden visual visual_2">
                    <div class="row {if $person_type==2}first-row{/if}">
			{* ФИЗ *}
			{if $person_type==1}
                        <legend class="col-md-12">{if $trustee_legend_1}{$trustee_legend_1}{else}Сведения об уполномоченном физическом лице{/if}</legend>
				{include file="$person_block_tmpl" container_class="" no_row=true show_email=$person_show_email show_phone=$person_show_phone show_work_phone="{if isset($person_show_work_phone)}{$person_show_work_phone}{else}0{/if}" phone_work_label="{if isset($phone_work_label)&&$phone_work_label}{$phone_work_label}{else}Телефон{/if}" person="trustee"  show_gender="{if isset($person_show_gender)}{$person_show_gender}{else}0{/if}" show_birthdate=$person_show_birthdate show_snils=$person_show_snils autocomplete=true maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
				{if !isset($hide_person_document_trustee) || !$hide_person_document_trustee}{include file="$base_template_path/std_blocks/std_person_document.tpl" portalid="trustee" wrapper="div" document_types=$document_types  autocomplete=true container_class="col-md-12" contact="trustee" title="Документ, удостоверяющий личность" required=true no_birthday="1" free_photo=false one_photo="0" no_photo="1" no_ovdcode="{if isset($declarant_show_ovdcode)}{!$declarant_show_ovdcode}{else}1{/if}" showSavedDocs="1" savedDocsReadonly="0" docTypeList="{if $declarant_docTypeList}{$declarant_docTypeList}{else}full{/if}"}{/if}
			{/if}
			{*	ЮЛ	*}
			{if $person_type==2}                                                           
                                <div class="col-md-12 form-group"><legend>{if $trustee_legend_2}{$trustee_legend_2}{else}Сведения об уполномоченной организации (юридическом лице){/if}</legend></div>
				{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_name_box col-md-4 form-group" label="Полное наименование" maxlength="{$maxlength_full_name}" required=true name="field[{if isset($custom)&&$custom}new_fullname{else}trustee.new_full_name{/if}]" validator="" autocomplete_from="LEGAL_REG_INFO:FULL_NAME"}
				{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_name_box col-md-4 form-group" label="Сокращенное наименование" maxlength="250" required=true name="field[{if isset($custom)&&$custom}new_name{else}trustee.name{/if}]" validator=""  autocomplete_from="LEGAL_REG_INFO:SHORT_NAME"}
				{if (isset($show_BrandName) && $show_BrandName)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_BrandName_box col-md-4 form-group" maxlength="250" label="Фирменное наименование" required=false name="field[{if isset($custom)&&$custom}new_brandname{else}trustee.new_brandname{/if}]" autocomplete_from="LEGAL_REG_INFO:SHOW_NAME"}{/if}{*autocomplete_from="LEGAL_INFO:SHOW_NAME"*}
				{if (isset($show_OrgFormCode) && $show_OrgFormCode)}
					{include file="$base_template_path/std_blocks/std_select.tpl" context_search=true container_class="trustee_org_OrgFormCode_box hidden elk_loaded cat cat2 col-md-4 form-group" label="Организационно-правовая форма" required=true name="field[{if isset($custom)&&$custom}new_okopf{else}trustee.new_okopf{/if}]" autocomplete_from="LEGAL_REG_INFO:OPF" }
					<script type="text/javascript">
						$(function() {	
							Lib.getReference('DTIU_030301_OKOPF_CODES','.trustee_org_OrgFormCode_box');
						});
					</script>
				{/if}
				{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_inn_box col-md-4 form-group" label="ИНН" required=true name="field[{if isset($custom)&&$custom}new_inn{else}trustee.new_inn{/if}]" validator="inn_ul" maxlength="10" mask="9999999999" autocomplete_from="LEGAL_REG_INFO:INN"}
				{*Инфоблок перед полями ЮЛ*}
				{if isset($show_trustee_ul_infoblock) && $show_trustee_ul_infoblock}{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="hidden cat cat2 trustee_ul_infoblock col-md-4 form-group" color="orange"  text="{$trustee_ul_infoblock_text}"}{/if}
				{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_ogrn_box col-md-4 form-group" label="ОГРН" required=true name="field[{if isset($custom)&&$custom}new_ogrn{else}trustee.new_ogrn{/if}]" maxlength="13" mask="9999999999999" validator="check_ogrn" autocomplete_from="LEGAL_REG_INFO:OGRN"}

				{if (isset($show_kpp) && $show_kpp)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_kpp_box decl hidden col-md-4 form-group" label="КПП" required=true name="field[{if isset($custom)&&$custom}new_kpp{else}trustee.new_kpp{/if}]" minlength="9" validator="kpp" maxlength="9" mask="9999bb999" hint="997950001" autocomplete_from="LEGAL_REG_INFO:KPP"}{/if}  {*autocomplete_from="LEGAL_REG_INFO:KPP"*}
				{if (isset($show_okpo) && $show_okpo)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_okpo_box decl hidden col-md-4 form-group" label="ОКПО" required=true name="field[{if isset($custom)&&$custom}new_okpo{else}trustee.new_okpo{/if}]" minlength="8" validator="okpo" maxlength="10" mask="9|repeat" hint="09808117"}{/if}
				{if (isset($show_okonh) && $show_okonh)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_org_okonx_box decl hidden col-md-4 form-group" label="ОКОНХ" required=true name="field[{if isset($custom)&&$custom}new_okonh{else}trustee.new_okonh{/if}]"  minlength="5" validator="" maxlength="5" mask="9|repeat" hint="84300"}{/if}

                                {/if}
                                {*	ИП	*}
                                {if $person_type==3}
                                        <legend class="col-md-12">{if $trustee_legend_3}{$trustee_legend_3}{else}Сведения об уполномоченной организации (индивидуальном предпринимателе){/if}</legend>                                
                                        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_ip_lastname_box col-md-4 form-group" label="Фамилия" required=true name="field[{if isset($custom)&&$custom}new_lastname{else}trustee_head.lastname{/if}]" autocomplete_from="FIO:SURNAME" maxlength=$maxlength_lastname validator="fio"}
                                        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_ip_firstname_box col-md-4 form-group" label="Имя" required=true name="field[{if isset($custom)&&$custom}new_firstname{else}trustee_head.firstname{/if}]" autocomplete_from="FIO:NAME" maxlength=$maxlength_firstname validator="fio"}
                                        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_ip_middlename_box col-md-4 form-group" label="Отчество" required=false name="field[{if isset($custom)&&$custom}new_middlename{else}trustee_head.middlename{/if}]" autocomplete_from="FIO:PATRONYMIC" maxlength=$maxlength_middlename validator="fio"}
                                        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_ip_inn_box col-md-4 form-group" label="ИНН" required=true name="field[{if isset($custom)&&$custom}new_inn{else}trustee.new_inn{/if}]" autocomplete_from="LEGAL_REG_INFO:INN" validator="inn_fiz" maxlength="12" mask="999999999999"}
                                        {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_ip_ogrnip_box col-md-4 form-group" label="ОГРНИП" required=true name="field[{if isset($custom)&&$custom}new_ogrn{else}trustee.new_ogrn{/if}]" autocomplete_from="LEGAL_REG_INFO:OGRN" maxlength="15" mask="999999999999999" validator="check_ogrnip"}
                                {/if}
                                {if $person_type>1}
                                        {if $person_show_phone}
                                                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_contact_phone col-md-4 form-group" label="Контактный телефон" required=true name="field[{if isset($custom)&&$custom}new_phone{else}trustee.telephone1{/if}]" autocomplete_from="LEGAL_INFO:PHONE" validator="phone_num" mask="(999) 999-99-99" placeholder="(926) 123-45-67" }
                                        {/if}
                                        {if $person_show_email}
                                                {include file="$base_template_path/std_blocks/std_text.tpl" container_class="trustee_contact_email col-md-4 form-group" label="Адрес электронной почты" required=true name="field[{if isset($custom)&&$custom}new_email{else}trustee.emailaddress1{/if}]" autocomplete_from="LEGAL_INFO:EMAIL" validator="email" placeholder="login@mail.ru" maxlength="100"}
                                        {/if}
                                {/if}
                                
				{if !isset($hide_info) || !$hide_info}<div class="row margin_l_r_0"><div class="col-md-12">{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="trustee_infoblock" color="orange"  text="{if isset($file_document_trustee.infoblock)}{$file_document_trustee.infoblock}{else}К заявлению необходимо прикрепить все документы, подтверждающие полномочия Вашей организации представлять интересы заявителя: доверенности, договоры, контракты и иные документы, подписанные электронной подписью доверителя или нотариуса.{/if}"}</div></div>{/if}
				{if !isset($hide_doc) || !$hide_doc}
                                <div class="row margin_l_r_0">			
					{if (!empty($use_multi_file))}                                            
						{capture assign = "file_document_trustee_block"}
							{include file="$base_template_path/std_blocks/std_document.tpl" portalid="trustee" send_index=true container_class="" document_kind=10901 document_name=$file_document_trustee.name document_index='<%=multiblockCounter%>' document_date=$file_document_trustee.date label=$file_document_trustee.label required=true  hint_header="Какого формата необходим файл?" class=$file_document_trustee.class hint_text=$file_document_trustee.hint}
						{/capture} 
						{include file="$base_template_path/std_blocks/std_person_multi.tpl" no_sub_container=true container_class="" subtitle=false inner=$file_document_trustee_block block_id="file_document_trustee_block" count_req=1 count_max=0}
					{else}                                                
						{include file="$base_template_path/std_blocks/std_document.tpl" portalid="trustee" send_index=true container_class="" document_kind=10901 document_name=$file_document_trustee.name document_index=$start_index document_date=$file_document_trustee.date label=$file_document_trustee.label required=true  hint_header="Какого формата необходим файл?" class=$file_document_trustee.class hint_text=$file_document_trustee.hint}
						{$start_index = $start_index+1}
					{/if}
					
					
				</div>	
				{/if}
                                
	
				
				
			{if $person_type==2}
				<div class="">
					{if !isset($hide_head_type) || !$hide_head_type}
						{array vars="array('1' => 'первым лицом организации (действуете на основании уставных документов);','2' => 'уполномоченным на подачу заявлений сотрудником организации, действующим на основании доверенности(-ей);')" assign="type_zayv"}
						{include file="$base_template_path/std_blocks/std_radiogroup.tpl" container_class="type_zayv visual_controller" required=true items=$type_zayv label="{if $field_label_ul_trustee}{$field_label_ul_trustee}{else}Вы являетесь:{/if}" name=$field_name_ul_trustee  label_position="top"}
					{/if}
                                        {if !isset($hide_info) || !$hide_info}<div class="row visual visual_2 hidden"><div class="col-md-12">{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="" color="orange"  text="К заявлению необходимо прикрепить все доверенности и иные документы, подписанные электронной подписью доверителя или нотариуса, подтверждающие Ваши полномочия на подачу заявления от имени организации."}</div></div>{/if}
					{if !isset($hide_doc) || !$hide_doc}
						
						{if (!empty($use_multi_file))}
							{capture assign = "file_document_trustee_ul_block"}
								{include file="$base_template_path/std_blocks/std_document.tpl" portalid="trustee" send_index=true container_class="" document_kind=10002 document_name=$file_document_trustee_ul.name document_index='<%=multiblockCounter%>' document_date=$file_document_trustee_ul.date label=$file_document_trustee_ul.label  required=true  hint_header="Какого формата необходим файл?" class=$file_document_trustee_ul.class hint_text=$file_document_trustee_ul.hint}
							{/capture} 
							{include file="$base_template_path/std_blocks/std_person_multi.tpl" no_sub_container=true container_class="visual visual_2 hidden" subtitle=false inner=$file_document_trustee_ul_block block_id="file_document_trustee_ul_block" count_req=1 count_max=0}
						{else}
							{include file="$base_template_path/std_blocks/std_document.tpl" portalid="trustee" send_index=true container_class="visual visual_2 hidden" document_kind=10002 document_name=$file_document_trustee_ul.name document_index=$start_index document_date=$file_document_trustee_ul.date label=$file_document_trustee_ul.label  required=true  hint_header="Какого формата необходим файл?" class=$file_document_trustee_ul.class hint_text=$file_document_trustee_ul.hint}
							{$start_index = $start_index+1}
						{/if}
						
						
						
					{/if}
					
					
					
					
					
				</div>
			{/if}
			
		
			{*			блок руководителя организации*}
			{if $person_type==2&&!empty($use_orghead)}
				<div>
					<legend>Сведения о руководителе уполномоченной организации</legend>
					{include file="$person_block_tmpl" container_class="" show_email=$orghead_show_email show_phone=$orghead_show_phone show_work_phone=$orghead_show_work_phone  person="trustee_head"  show_gender=$orghead_show_gender show_birthdate=$orghead_show_birthdate show_snils=$orghead_show_snils autocomplete=false maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
				</div>
			{/if}
			
			
			{*блок представителя физ лица организации в эцп*}
			{if ($person_type==2||$person_type==3) && $use_orgcontact}
				<div class="">
						<legend>Сведения о представителе уполномоченной организации</legend>
						{include file="$person_block_tmpl" container_class=" " show_email=$orgcontact_show_email show_phone=$orgcontact_show_phone show_work_phone=$orgcontact_show_work_phone phone_work_label=$orgcontact_work_label person="trustee_contact"  show_gender=$orgcontact_show_gender show_birthdate=$orgcontact_show_birthdate show_snils=$orgcontact_show_snils autocomplete=true maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
						{if !empty($use_orgcontact_document)}

							{include file="$base_template_path/std_blocks/std_person_document.tpl" contact="file.$start_index" document=true  document_no_file=true document_index=$start_index v6=true portalid="trustee_contact" wrapper="div" document_types=$document_types  autocomplete=true container_class="" title="Документ, удостоверяющий личность представителя представителя" required=true no_birthday="1" free_photo=false one_photo="0" no_photo="1" no_ovdcode="{if isset($orgcontact_show_ovdcode)}{!$orgcontact_show_ovdcode}{else}1{/if}" showSavedDocs="1" savedDocsReadonly="0" docTypeList="{if $declarant_docTypeList}{$declarant_docTypeList}{else}full{/if}"}
							{$start_index = $start_index+1}

						{/if}

				</div>
			{/if}


	

			
			
			{block name="trustee_after"}{/block}
                        </div>
		</div>
	</fieldset>
{/if}
<fieldset class="form-block cat cat1 cat2 cat3 pers_block row first-row">
    
        <div class="col-md-12"><legend>{if $declarant_legend}{$declarant_legend}{else}Сведения о заявителе{/if}</legend></div>
        <div class="row">
        
        
	{array vars="array()" assign="type_decl_person"}
	{if !isset($person_linked[$person_type])||'1'|in_array:$person_linked[$person_type]}
		{$type_decl_person[0] = 'Физическим лицом'}
	{/if}
	{if !isset($person_linked[$person_type])||'2'|in_array:$person_linked[$person_type]}
		{$type_decl_person[1] = 'Юридическим лицом'}
	{/if}
	{if !isset($person_linked[$person_type])||'3'|in_array:$person_linked[$person_type]}
		{$type_decl_person[2] = 'Индивидуальным предпринимателем'}
	{/if}
	
	{include file="$base_template_path/std_blocks/std_radiogroup.tpl" container_class="hidden type_decl_person" required=true items=$type_decl_person label="{if $field_label_person_type}{$field_label_person_type}{else}Заявитель является:{/if}" name=$field_name_person_type }
	
	
	{if !isset($person_linked[$person_type])||'2'|in_array:$person_linked[$person_type]||$person_linked.$person_type|count==0}
		{*	ЮЛ	*}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_fullname_box org_name_box elk_loaded hidden cat cat2 col-md-4 form-group" label="Полное наименование" maxlength="{$maxlength_full_name}" required=true validator="" name="field[account.new_full_name]" autocomplete_from="LEGAL_REG_INFO:FULL_NAME"}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_name_box elk_loaded hidden cat cat2 col-md-4 form-group" label="Сокращенное наименование" maxlength="250" required=true validator="" name="field[account.name]" autocomplete_from="LEGAL_REG_INFO:SHORT_NAME"}
		{if (isset($show_BrandName) && $show_BrandName)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_BrandName_box hidden cat cat2 col-md-4 form-group" maxlength="250" label="Фирменное наименование" required=false name="field[account.new_brandname]" autocomplete_from="LEGAL_REG_INFO:SHOW_NAME"}{/if}{* autocomplete_from="LEGAL_INFO:SHOW_NAME*}
		
		{if (isset($show_OrgFormCode) && $show_OrgFormCode)}
			{include file="$base_template_path/std_blocks/std_select.tpl" context_search=true value=$show_OrgFormCode container_class="org_OrgFormCode_box hidden elk_loaded cat cat2 col-md-4 form-group" label="Организационно-правовая форма" required=true name="field[account.new_okopf]" autocomplete_from="LEGAL_REG_INFO:OPF"}
			<script type="text/javascript">
				$(function() {	
					Lib.getReference('DTIU_030301_OKOPF_CODES','.org_OrgFormCode_box');
				});
			</script>
		{/if}
		
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_inn_box elk_loaded hidden cat cat2 col-md-4 form-group" label="ИНН" required=true name="field[account.new_inn]" validator="inn_ul" maxlength="10" mask="9999999999" autocomplete_from="LEGAL_REG_INFO:INN"}
		{*Инфоблок перед полями ЮЛ*}
		{if isset($show_declarant_ul_infoblock) && $show_declarant_ul_infoblock}{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="hidden cat cat2 declarant_ul_infoblock col-md-4 form-group" color="orange"  text="{$declarant_ul_infoblock_text}"}{/if}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_ogrn_box elk_loaded hidden cat cat2 col-md-4 form-group" label="ОГРН" required=true name="field[account.new_ogrn]" maxlength="13" mask="9999999999999" validator="check_ogrn" autocomplete_from="LEGAL_REG_INFO:OGRN"}
		{if (isset($show_kpp) && $show_kpp)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_kpp_box hidden elk_loaded cat cat2 col-md-4 form-group" label="КПП" required=true name="field[account.new_kpp]" minlength="9" validator="kpp" maxlength="9" mask="9999bb999" hint="997950001" autocomplete_from="LEGAL_REG_INFO:KPP"}{/if} {*autocomplete_from="LEGAL_REG_INFO:KPP"*}
		{if (isset($show_okpo) && $show_okpo)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_okpo_box decl hidden cat cat2 col-md-4 form-group" label="ОКПО" required=true name="field[account.new_okpo]" minlength="8" validator="okpo" maxlength="10" mask="9|repeat" hint="09808117"}{/if}
		{if (isset($show_okved) && $show_okved)}
			{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_okved_box elk_loaded hidden cat cat2 col-md-4 form-group" label="ОКВЭД" maxlength="8" minlength="5" mask="99.99.99" required=true validator="" name="field[account.new_okved]" autocomplete_from=""}
		{/if}
		{if (isset($show_okonh) && $show_okonh)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_okonx_box decl hidden cat cat2 col-md-4 form-group" label="ОКОНХ" required=true name="field[new_decl_okonh]"  minlength="5" validator="" maxlength="5" mask="9|repeat" hint="84300"}{/if}
		{if (isset($show_website) && $show_website)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_website_box hidden elk_loaded cat cat2 col-md-4 form-group" maxlength="250" label="Адрес официального сайта" required={$required_website} name="field[account.websiteurl]" hint={$hint_website_text}  }{/if}
		
	{/if}
	
	
	{if !isset($person_linked[$person_type])||'3'|in_array:$person_linked[$person_type]||$person_linked.$person_type|count==0} 
		{*	ИП	*}                
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="ip_lastname_box elk_loaded hidden cat cat3 col-md-4 form-group" label="Фамилия" required=true name="field[ip.lastname]" autocomplete_from="FIO:SURNAME" maxlength=$maxlength_lastname validator="fio"}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="ip_firstname_box elk_loaded hidden cat cat3 col-md-4 form-group" label="Имя" required=true name="field[ip.firstname]" autocomplete_from="FIO:NAME" maxlength=$maxlength_firstname validator="fio"}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="ip_middlename_box elk_loaded hidden cat cat3 col-md-4 form-group" label="Отчество" required=false name="field[ip.middlename]" autocomplete_from="FIO:PATRONYMIC" maxlength=$maxlength_middlename validator="fio"}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="ip_inn_box hidden elk_loaded cat cat3 col-md-4 form-group" label="ИНН" required=true name="field[ip.new_inn]" autocomplete_from="LEGAL_REG_INFO:INN" validator="inn_fiz" maxlength="12" mask="999999999999"}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="ip_ogrnip_box hidden elk_loaded cat cat3 col-md-4 form-group" label="ОГРНИП" required=true name="field[ip.new_ogrn]" autocomplete_from="LEGAL_REG_INFO:OGRN" maxlength="15" mask="999999999999999" validator="check_ogrnip"}
		{if (isset($show_website) && $show_website)}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="org_website_box hidden elk_loaded cat cat3 col-md-4 form-group" maxlength="250" label="Адрес официального сайта" required=false name="field[account.websiteurl_double]"  }{/if}
	{/if}
	
	
	
	
	{if $show_legal_address}{include file="$base_template_path/std_blocks/std_text.tpl" container_class="cat cat2 cat3 legal_address" label="{if isset($legal_address_label)&&$legal_address_label}{$legal_address_label}{else}Юридический адрес{/if}" required=true name="field[account.legal_address]" validator=""  maxlength="255" }{/if}  {*autocomplete_from="LEGAL_INFO:ADDRESS"*}
		
	{if !isset($person_linked[$person_type])||'1'|in_array:$person_linked[$person_type]||$person_linked.$person_type|count==0}
		{*	ФИЗ	*}
		{include file="$person_block_tmpl" container_class="cat cat1 hidden" show_email=$person_show_email show_phone=$person_show_phone show_work_phone="{if isset($person_show_work_phone)}$person_show_work_phone{else}0{/if}" phone_work_label="{if isset($phone_work_label)&&$phone_work_label}{$phone_work_label}{else}Телефон{/if}" person="declarant"  show_gender="{if isset($person_show_gender)}{$person_show_gender}{else}0{/if}" show_birthdate=$person_show_birthdate show_snils=$person_show_snils autocomplete=true maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
		{if !isset($hide_person_document_declarant) || !$hide_person_document_declarant}
			{include file="$base_template_path/std_blocks/std_person_document.tpl" wrapper="div" portalid="declarant" document_types=$document_types  autocomplete=true container_class="cat cat1" contact="declarant" title="Документ, удостоверяющий личность" required=true no_birthday="1" free_photo=false one_photo="0" no_photo="1" no_ovdcode="{if $declarant_show_ovdcode}{!$declarant_show_ovdcode}{else}1{/if}" showSavedDocs="1" savedDocsReadonly="0" docTypeList="{if $declarant_docTypeList}{$declarant_docTypeList}{else}full{/if}"}
		{/if}
	{/if}
		

	
	
	{if $person_show_phone}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="cat contact_phone cat2 cat3 elk_loaded col-md-4 form-group" label="Контактный телефон" required=true name="field[account.telephone1]" autocomplete_from="LEGAL_INFO:PHONE" validator="phone_num" mask="(999) 999-99-99" placeholder="(926) 123-45-67" }
	{/if}
	{if $person_show_email}
		{include file="$base_template_path/std_blocks/std_text.tpl" container_class="cat contact_email cat2 cat3 elk_loaded col-md-4 form-group" label="Адрес электронной почты" required=true name="field[account.emailaddress1]" autocomplete_from="LEGAL_INFO:EMAIL" validator="email" placeholder="login@mail.ru" maxlength="100"}
	{/if}
	{*хак для каких то левых полей*}
	{if isset($extra_fields)&&$extra_fields}{$extra_fields}{/if}

	

	
	
	<div class="cat only_person cat2">                
		{if !isset($hide_head_type) || !$hide_head_type}
			{array vars="array('1' => 'первым лицом организации (действуете на основании уставных документов);','2' => 'уполномоченным на подачу заявлений сотрудником организации, действующим на основании доверенности(-ей);')" assign="type_yavl"}
			{include file="$base_template_path/std_blocks/std_radiogroup.tpl" container_class="visual_controller margin_l_r_0" required=true items=$type_yavl label="{if $field_label_ul_declarant}{$field_label_ul_declarant}{else}Вы являетесь:{/if}" name=$field_name_ul_declarant  label_position="top"}
		{/if}
		{if !isset($hide_info) || !$hide_info}<div class="row visual visual_2 hidden"><div class="col-md-12">{include file="$base_template_path/std_blocks/std_infoblock.tpl" container_class="" color="orange"  text="К заявлению необходимо прикрепить все доверенности и иные документы, подписанные электронной подписью доверителя или нотариуса, подтверждающие Ваши полномочия на подачу заявления от имени организации."}</div></div>{/if}
		{if !isset($hide_doc) || !$hide_doc}

			{if (!empty($use_multi_file))}
				{capture assign = "file_document_declarant_block"}
                                    {include file="$base_template_path/std_blocks/std_document.tpl" portalid="account" send_index=true document_kind=10002 document_name=$file_document_declarant_ul.name document_index='<%=multiblockCounter%>' document_date=$file_document_declarant_ul.date label=$file_document_declarant_ul.label required=true  hint_header="Какого формата необходим файл?" class=$file_document_declarant_ul.class hint_text=$file_document_declarant_ul.hint}
				{/capture} 
				{include file="$base_template_path/std_blocks/std_person_multi.tpl" no_sub_container=true container_class="visual visual_2 hidden" subtitle=false inner=$file_document_declarant_block block_id="file_document_declarant_block" count_req=1 count_max=0}
			{else}
				{include file="$base_template_path/std_blocks/std_document.tpl" portalid="account" send_index=true container_class="visual visual_2 hidden" document_kind=10002 document_name=$file_document_declarant_ul.name document_index=$start_index document_date=$file_document_declarant_ul.date label=$file_document_declarant_ul.label required=true  hint_header="Какого формата необходим файл?" class=$file_document_declarant_ul.class hint_text=$file_document_declarant_ul.hint}
				{$start_index = $start_index+1}
			{/if}


		{/if}
	</div>

	
		
		{*			блок руководителя организации*}
		
	{if ('2'|in_array:$person_linked[$person_type])&&!empty($use_orghead) }
		<div class="cat cat2 hidden">
			<legend>Сведения о руководителе организации</legend>
			{include file="$person_block_tmpl" container_class="" show_email=$orghead_show_email show_phone=$orghead_show_phone show_work_phone=$orghead_show_work_phone  person="head"  show_gender=$orghead_show_gender show_birthdate=$orghead_show_birthdate show_snils=$orghead_show_snils autocomplete=false maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
		</div>
	{/if}

	{*блок представителя физ лица организации в эцп*}
	{if ('2'|in_array:$person_linked[$person_type]||'3'|in_array:$person_linked[$person_type]) && $use_orgcontact}
		<div class="hidden cat cat2 cat3">
				<legend>Сведения о представителе заявителя</legend>
				{include file="$person_block_tmpl" container_class=" " show_email=$orgcontact_show_email show_phone=$orgcontact_show_phone show_work_phone=$orgcontact_show_work_phone phone_work_label=$orgcontact_work_label person="legal_contact"  show_gender=$orgcontact_show_gender show_birthdate=$orgcontact_show_birthdate show_snils=$orgcontact_show_snils autocomplete=true maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename }
				{if !empty($use_orgcontact_document)}

					{include file="$base_template_path/std_blocks/std_person_document.tpl" contact="file.$start_index" document=true  document_no_file=true document_index=$start_index v6=true portalid="legal_contact" wrapper="div" document_types=$document_types  autocomplete=true container_class="hidden cat cat2 cat3" title="Документ, удостоверяющий личность представителя заявителя" required=true no_birthday="1" free_photo=false one_photo="0" no_photo="1" no_ovdcode="{if isset($orgcontact_show_ovdcode)}{!$orgcontact_show_ovdcode}{else}1{/if}" showSavedDocs="1" savedDocsReadonly="0" docTypeList="{if $declarant_docTypeList}{$declarant_docTypeList}{else}full{/if}"}
					{$start_index = $start_index+1}

				{/if}

		</div>
	{/if}
	</div>

</fieldset>
	


{if isset($use_contact)&&$use_contact&&$person_type>1}
	<fieldset class="form-block contact_block">
		<legend>{if $contact_legend}{$contact_legend}{else}Контактное лицо{/if}</legend>
		{block name="contact_before"}{/block}
		{include file="$person_block_tmpl" container_class="" show_email=true show_phone=true person="{if isset($custom)&&$custom}new_contact{else}contact{/if}"  show_gender="0" show_birthdate="{if isset($show_contact_birthdate)}$show_contact_birthdate{else}0{/if}" show_snils="{if isset($show_contact_snils)}$show_contact_snils{else}0{/if}" autocomplete="{if isset($autocomplete_contact)}$autocomplete_contact{else}1{/if}" maxlength_lastname=$maxlength_lastname maxlength_firstname=$maxlength_firstname maxlength_middlename=$maxlength_middlename}
		{block name="contact_after"}{/block}
	</fieldset>
{/if}



<script type="text/javascript">
	var person_type ={$person_type};
	var is_legal_ep = {if $is_legal_ep}true{else}false{/if};
	$(function() {
		function change_cat() {
			var type = {$person_type};
			if ($('.type_decl input:radio:checked').val()==='2') {
				type = 0;
				if ($('.type_decl_person input:radio:checked').length>0) {
					type = $('.type_decl_person input:radio:checked').val()*1+1;
				}
			}
			$('#cat').val(type);
			$('.pers_block .cat').hide();

			$('.pers_block .cat' + $('#cat').val()).show();
			//Передадим на форму тип лица
			
			if ($('.type_yavl input:radio:checked').length > 0 && $('.type_yavl').css('display') != 'none')
				$('.type_yavl input:radio:checked').trigger('change');
			if ($('.type_decl input:radio:checked').val()==='2')
				$('.only_person').hide();
			{if isset($callback_change)}eval("{$callback_change}");{/if}
		}
		
		function clearPerson() {                        
                        var blocks = $('.type_decl_person').nextAll();                        
                        blocks.find('input[type=text], input[type=date], select, textarea').removeAttr('readonly').val('');
                        blocks.find('input[type=text], input[type=date], select, textarea').closest('.field').not( ".chosen-block" ).removeClass('field--filled disabled field--focused');	                        
                        blocks.find('select option').removeAttr('selected').removeAttr('disabled');
                        blocks.find('input[type=radio], input[type=checkbox]').removeAttr('checked').removeAttr('disabled');
                        blocks.find('input[type=radio], input[type=checkbox]').trigger('change.visual');
                        blocks.find('select').trigger('choosen:updated').filter(':not(.doc-type-select)').trigger('change');                                                
                    }
		
		change_cat();
		//представитель
		$('.type_decl input:radio').off('change.std_declr').on('change.std_declr', function () {
			if ($(this).val() == 2) {
				if ($('.type_decl_person input:radio').length>1) //1 значение не показываем
					$('.type_decl_person').show(); //переключатель типа лица заявителя

                clearPerson();
                $('.pers_block .wrap').removeData('elk-filled');
				$('.person_block .wrap').each(function(){
					if ($(this).attr('data-elk-field')!=undefined) {
						$(this).attr('data-elk-field-backup',$(this).attr('data-elk-field'));
						$(this).removeAttr('data-elk-field');
					}
				});
				FormController.clearErrors($('.pers_block'));
			}
			else {
				$('.type_decl_person').hide(); //переключатель типа лица заявителя
				$('.person_block .wrap').each(function(){
					if ($(this).attr('data-elk-field-backup')!=undefined) {
						$(this).attr('data-elk-field',$(this).attr('data-elk-field-backup'));
						$(this).removeAttr('data-elk-field-backup');
					}
				});
				ELK.ready(function () {
					ELK.fill($('.pers_block'), function () {
						
					});

				});
			}
			change_cat();
			return false;
		});

		$('.type_decl_person input:radio').off('change.std_declr').on('change.std_declr', function () {
            clearPerson();

			FormController.clearErrors($('.pers_block'));
			change_cat();
			return false;
		});


		$('.type_yavl input').off('change.std_declr').on('change.std_declr', function () {
			$('.declarant_ul_box').hide();
			if ($(this).val() == 2&&$(this).closest('.wrap').css('display') != 'none')
				$('.declarant_ul_box').show();
		});
		$('.type_zayv input').off('change.std_declr').on('change.std_declr', function () {
			$('.document_trustee_ul').hide();
			if ($(this).val() == 2)
				$('.document_trustee_ul').show();
		});
		
		if ($('.type_decl input:radio').length==1) {
			$('.type_decl input:radio').attr('checked','checked').trigger('change');
		}
		else $('.type_decl input:radio:checked').trigger('change');
		
		if ($('.type_decl_person input:radio').length==1) $('.type_decl_person input:radio').attr('checked','checked').trigger('change'); 
		else $('.type_decl_person input:radio:checked').trigger('change');
		
	});
	
	
	
	{if !empty($use_multi_file)}
		FormController.file_index = {$start_index};
        $('#form_element').find('.multiblock-control a.block-button, .pmulti_link').data('increment-function', function(action, counter,value) {
		switch (action) {
			case 'init' :
				if (typeof FormController.dynamicCounters[counter] === 'undefined') {
					FormController.dynamicCounters[counter] = ++FormController.file_index;
                                }
				break;
			case 'get':
				FormController.dynamicCounters[counter] = FormController.file_index;
				return FormController.dynamicCounters[counter];
			case 'next':
				FormController.dynamicCounters[counter] = ++FormController.file_index;
				break;
		}
	});
	{/if}
</script>	


