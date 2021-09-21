{if !$contact}
	{assign var=contact value="declarant"}
{else}
	{assign var=empty value="1"}
{/if}
{if !$docTypeList}
	{assign var=docTypeList value="passportOnly"}
{/if}
{* docTypeList= passportOnly | full *}
{include file="$base_template_path/std_blocks/std_person_document.tpl" title=$title  docTypeList=$docTypeList autocomplete={$autocomplete}}