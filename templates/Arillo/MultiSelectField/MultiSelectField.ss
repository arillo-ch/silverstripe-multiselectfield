<div class="" x-data="multiselectfield($JsOptions)">
  <select $AttributesHTML>
    <template x-for="option in options">
      <option :value="option.Value" :selected="option.Selected" :disabled="option.Disabled" x-text="option.Title"></option>
    </template>
    <%-- <% loop $Options %>
      <option value="$Value.XML"<% if $Selected %> selected="selected"<% end_if %><% if $Disabled %> disabled="disabled"<% end_if %>>$Title.XML</option>
    <% end_loop %> --%>
  </select>



    <div class="multiselectfield-cols">
      <ul class="multiselectfield-list" x-ref="left">
        <template x-for="option in options">
          <template x-if="!option.Selected">
            <li class="multiselectfield-item" :data-id="option.Value">
              <div class="multiselectfield-item-title multiselectfield-item-title-left" x-text="option.Title"></div>
              <button
                class="multiselectfield-item-action"
                :class="option.Selected ? 'font-icon-minus' : 'font-icon-plus-1'"
                @click="move(option.Value)"
              >
                <span class="sr-only" x-text="option.Selected ? `<%t MultiSelectField.RemoveItem 'Remove item' %>`: `<%t MultiSelectField.AddItem 'Add item' %>`"></span>
              </button>
            </li>
          </template>
        </template>
        <%-- <% loop $Options %>
          <% if not $Selected %>
            <li class="multiselectfield-item" data-id="$Value" data-sort="$Sort">
              <div class="multiselectfield-item-title multiselectfield-item-title-left">
                $Title
              </div>
              <button class="multiselectfield-item-action font-icon-plus-1" @click="add">
                <span class="sr-only">
                  <%t MultiSelectField.AddItem 'Add item' %>
                </span>
              </button>
            </li>
          <% end_if %>
        <% end_loop %> --%>
      </ul>
      <ul class="multiselectfield-list" x-ref="right">
        <template x-for="option in options">
          <template x-if="option.Selected">
            <li class="multiselectfield-item" :data-id="option.Value">
              <div class="multiselectfield-item-title multiselectfield-item-title-left" x-text="option.Title"></div>
              <button
                class="multiselectfield-item-action"
                :class="option.Selected ? 'font-icon-minus' : 'font-icon-plus-1'"
                @click="move(option.Value)"
              >
                <span class="sr-only" x-text="option.Selected ? `<%t MultiSelectField.RemoveItem 'Remove item' %>`: `<%t MultiSelectField.AddItem 'Add item' %>`"></span>
              </button>
            </li>
          </template>
        </template>
        <%-- <% loop $Options %>
          <% if $Selected %>
            <li class="multiselectfield-item" data-id="$Value" data-sort="$Sort">
              <div class="multiselectfield-item-title multiselectfield-item-title-right">
                $Title
              </div>
              <button class="multiselectfield-item-action font-icon-minus" @click="remove">
                <span class="sr-only">
                  <%t MultiSelectField.RemoveItem 'Remove item' %>
                </span>
              </button>
            </li>
          <% end_if %>
        <% end_loop %> --%>
      </ul>
    </div>

</div>


