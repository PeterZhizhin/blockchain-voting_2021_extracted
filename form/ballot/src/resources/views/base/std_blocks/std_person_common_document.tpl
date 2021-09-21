{include file="$base_template_path/std_blocks/std_serial_number.tpl" label="Серия и номер" required=true id="{$contact}Number" container_id="row{$contact}new_passport_serie" serial_name="field[{$contact}.new_passport_serie]" number_required=true number_id="{$contact}Number" number_container_id="row{$contact}new_passport" number_name="field[{$contact}.new_passport]" serial_maxlength='4' number_maxlength='6' serial_minlength='4' number_minlength='6'}
{include file="$base_template_path/std_blocks/std_date.tpl" label="Когда выдан" required=true id="{$contact}Date" container_id="row{$contact}new_passport_date" name="field[{$contact}.new_passport_date]" validator="date_in_past_and_now"}
{include file="$base_template_path/std_blocks/std_text.tpl" label="Кем выдан" required=true container_id="row{$contact}new_passport_place" name="field[{$contact}.new_passport_place]" maxlength="250"}
{if $validityperiod}
	{include file="$base_template_path/std_blocks/std_date.tpl" label="Срок действия" required=true id="{$contact}Validityperiod" container_id="row{$contact}new_validityperiod" name="field[{$contact}.new_validityperiod]" validator="date_in_future"}
{/if}
{if !$no_ovdcode}
	{include file="$base_template_path/std_blocks/std_text.tpl" label="Код подразделения" required=true id="{$contact}DivisionCode" container_id="row{$contact}new_divisioncode" name="field[{$contact}.new_divisioncode]"}
{/if}
{if !$no_birthday}
	{include file="$base_template_path/std_blocks/std_date.tpl" label="Дата рождения" required=true id="{$contact}.birth_date" name="field[{$contact}.birthdate]" validator="inputCalendarBefore"}

	{if !$no_birthplace}
		{include file="$base_template_path/std_blocks/std_text.tpl" label="Место рождения" required=true id="{$contact}BirthPlace" name="field[{$contact}.new_birthplace]"}
	{/if}
{/if}
{if !$no_photo}
	{if !$one_photo}
		{include file="$base_template_path/std_blocks/std_file.tpl" label="Страница паспорта с фотографией" required=!$free_photo name="field[{$contact}.0.contact_annotation.1.documentbody]" hint="Прикрепите электронный образ документа"}
		{include file="$base_template_path/std_blocks/std_file.tpl" label="Страница паспорта с адресом регистрации" required=!$free_photo name="field[{$contact}.0.contact_annotation.2.documentbody]" hint="Прикрепите электронный образ документа"}
	{else}
		{include file="$base_template_path/std_blocks/std_file.tpl" label="Электронный образ" required=!$free_photo name="field[{$contact}.0.contact_annotation.1.documentbody]" hint="Прикрепите электронный образ документа"}
	{/if}
{/if}
