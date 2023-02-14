<li
  class="multiselectfield-item"
  data-title="$Title"
  data-value="$Value"
  data-disabled="$Disabled"
  data-pos="$Pos(0)"
  x-data="{title: '$Title', visible: true, value: $Value}"
  x-effect="updateItem"
  :class="searchTerm && !visible && 'is-hidden'"
>
  <div
    class="multiselectfield-item-title"
    :class="getSelected($Value) && sortable && 'multiselectfield-item-title-sortable'"
  >
    <span x-show="getSelected($Value) && sortable" class="font-icon-drag-handle multiselectfield-item-title-dragger"></span>
    $Title
  </div>
  <button
    class="multiselectfield-item-action"
    :class="getSelected($Value) ? 'font-icon-minus multiselectfield-item-action-remove' : 'font-icon-plus-1 multiselectfield-item-action-add'"
    @click="move"
    type="button"
  >
    <span class="sr-only" x-text="getSelected($Value) ? `<%t Arillo\MultiSelectField.RemoveItem 'Remove item' %>`: `<%t Arillo\MultiSelectField.AddItem 'Add item' %>`"></span>
  </button>
</li>