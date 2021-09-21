{if !empty($block_name) && isset($block_counter) && isset($guid)}
<input type="hidden" name="field[internal.guid][{$block_name}][{$block_counter}]" value="{$block_field}^{$guid}^{$block_link}">
{/if}