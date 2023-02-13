<div class="" x-data="multiselectfield($JsOptions)">
  <select $AttributesHTML>
    <template x-for="option in options">
      <option :value="option.Value" :selected="option.Selected" :disabled="option.Disabled" x-text="option.Title"></option>
    </template>
  </select>

  <div class="multiselectfield-cols">
    <ul class="multiselectfield-list" x-ref="list">
      <% loop $Options %>
        <% if not $Selected %>
          <li class="multiselectfield-item" data-title="$Title">
            <div
              class="multiselectfield-item-title"
              :class="getType($Value) && sortable && 'multiselectfield-item-title-sortable'"
            >
              $Title
            </div>
            <button
              class="multiselectfield-item-action"
              :class="getType($Value) ? 'font-icon-minus' : 'font-icon-plus-1'"
              @click="move"
              data-value="$Value"
            >
              <span class="sr-only" x-text="getType($Value) ? `<%t MultiSelectField.RemoveItem 'Remove item' %>`: `<%t MultiSelectField.AddItem 'Add item' %>`"></span>
            </button>
          </li>
        <% end_if %>
      <% end_loop %>
    </ul>

    <ul class="multiselectfield-list" x-ref="sortable">
      <% loop $Options %>
        <% if $Selected %>
          <li class="multiselectfield-item" data-title="$Title">
            <div
              class="multiselectfield-item-title"
              :class="getType($Value) && sortable && 'multiselectfield-item-title-sortable'"
            >
              $Title
            </div>
            <button
              class="multiselectfield-item-action"
              :class="getType($Value) ? 'font-icon-minus' : 'font-icon-plus-1'"
              @click="move"
              data-value="$Value"
            >
              <span class="sr-only" x-text="getType($Value) ? `<%t MultiSelectField.RemoveItem 'Remove item' %>`: `<%t MultiSelectField.AddItem 'Add item' %>`"></span>
            </button>
          </li>
        <% end_if %>
      <% end_loop %>
    </ul>
  </div>

</div>


