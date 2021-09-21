<fieldset class="form-block no-padding item-catalog" id="{$id}">
	<ul class="other-services"><li><a href="" onclick="HierarchyOpenCatalog(this,'{$id}');return false"><h3 style="margin-top:0px">{$title}</h3></a></li></ul>
	<div id="items-{$id}" style="display:none">
		<table class="item-catalog-categories">
			<tr>
				<td>	
				{foreach from=$items item=category name=name}
					<div onclick="HierarchyOpenCatalogCategory(this,'{$id}');return false"><a href="" onclick="return false" class="cursor">+</a> <a href="" onclick="return false" class="item-catalog-item">{$category.title}</a></div>
						<div style="display:none">
							<div>
							{foreach from=$category.items item=item}
								<div class=""><a href="" class="item-catalog-subitem" onclick="{$item.onclick}">{$item.title}</a></div>
							{/foreach}
							</div>
						</div>
					{if $smarty.foreach.name.index % ceil((count($items)/3)) == ceil((count($items)/3)-1)}
					</td><td>
					{/if}
					{/foreach}
				</td>
			</tr>
		</table>
	</div>
</fieldset>