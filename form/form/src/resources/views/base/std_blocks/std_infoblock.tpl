<div class="alert verification-message {if !empty($class)}{$class}{else}alert-warning{/if}" {if !empty($id)}id="{$id}"{/if}>
   <button class="close" type="button"></button>
   {if !empty($title)}<h4>{$title}</h4>{/if}
   <div>
      <div {if !empty($id)}id="{$id}Body"{/if}>{$text}</div>
   </div>
</div>