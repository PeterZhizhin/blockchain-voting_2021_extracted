{* Обратка для форм которые уже в проде, не нужно использовать $hint*}
{if isset($hint) && $hint && $hint != 'false'}
    {$hint_text = $hint}
{/if}

{if isset($hint_text) && $hint_text && $hint_text != 'false'}
    <div class="hint field__hint {if isset($hint_position)}hint--{$hint_position}{else}hint--top{/if}">
        <div class="hint__icon"></div>
        <div class="hint__popup">
            {if isset($hint_header)}<h5>{$hint_header}</h5>{/if}
            {$hint_text}
        </div>
    </div>
{/if}