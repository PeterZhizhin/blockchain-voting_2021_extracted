{extends file="$base_template_path/std_blocks/std_file.tpl"}
{nocache}
{block name="form_field_name"}field[file.{$document_index}.documentbody]{/block}
{/nocache}
{block name="file_additional_fields"}
	{if isset($document_kind)&&$document_kind}
		<input type="hidden" name="field[file.{$document_index}.documentkind]" value="{$document_kind}"/>
	{/if}
	{if isset($send_index)&&$send_index}
		<input type="hidden" name="field[file.{$document_index}.index]" value="{$document_index}"/>
	{/if}
	{if isset($document_name)&&$document_name}
		<input type="hidden" name="field[file.{$document_index}.new_name]" value="{$document_name}"/>
	{/if}
	{if !empty($document_date)}
		<input type="hidden" name="field[file.{$document_index}.new_docdate]" value="{$document_date}"/>
	{/if}
	{if isset($portalid)&&$portalid}
		<input type="hidden" name="field[filefields.{$document_index}.{if isset($portalid_name)}{$portalid_name}{else}contact.new_portalid{/if}]" value="{$portalid}">
	{/if}
    {if !empty($document_guid)}
    	{include file="$base_template_path/std_blocks/std_guid.tpl" block_name="documents" block_counter=$document_index block_field="new_declarantdocid" guid=$document_guid}
    {/if}
	{if $label}<input type="hidden" class="file_label" name="field[file.{$document_index}.documentkind_title]" value="{$label}">{/if}
{/block}