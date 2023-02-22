<div class="" x-data="multiselectfield($JsOptions)">
  <select $AttributesHTML>
    <template x-for="option in options">
      <option :value="option.Value" :selected="option.Selected" :disabled="option.Disabled" x-text="option.Title"></option>
    </template>
  </select>


  <div class="multiselectfield-field">
    <div class="multiselectfield-header">
      <div class="multiselectfield-search">
        <input
          type="text"
          class="multiselectfield-search-input"
          placeholder="<%t Arillo\MultiSelectField.Search 'Search' %>"
          x-model="searchTerm"
        >
        <button
          type="button"
          class="multiselectfield-search-clear"
          :class="searchTerm && 'is-visible'"
          @click="searchTerm = ''"
        >
          <span class="multiselectfield-search-clear-icon font-icon-cross-mark"></span>
        </button>

        <span class="font-icon-search multiselectfield-search-icon" :class="searchTerm && 'is-hidden'"></span>
      </div>
      <div class="multiselectfield-count">
        <span x-text="`${count} <%t Arillo\MultiSelectField.ItemsSelected 'items selected' %>`"></span>
      </div>
    </div>
    <div class="multiselectfield-lists">
      <ul class="multiselectfield-list" x-ref="list" :style="{maxHeight: `${maxHeight}px`}">
        <% loop $Options %>
          <% if not $Selected %>
            <% include Arillo\MultiSelectField\Option %>
          <% end_if %>
        <% end_loop %>
      </ul>

      <ul class="multiselectfield-list" x-ref="sortable" :style="{maxHeight: `${maxHeight}px`}">
        <% loop $Options %>
          <% if $Selected %>
            <% include Arillo\MultiSelectField\Option %>
          <% end_if %>
        <% end_loop %>
      </ul>
    </div>

    <div class="multiselectfield-footer">
      <button
        class="multiselectfield-action btn btn-primary font-icon-plus-1"
        type="button"
        @click="addAll"
      >
        <%t Arillo\MultiSelectField.AddAll 'Add all' %>
      </button>
      <button
        class="multiselectfield-action btn btn-danger font-icon-minus"
        type="button"
        @click="removeAll"
      >
        <%t Arillo\MultiSelectField.RemoveAll 'Remove all' %>
      </button>
    </div>
  </div>
</div>


