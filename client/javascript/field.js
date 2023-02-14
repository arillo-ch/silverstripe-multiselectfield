import Sortable from 'sortablejs';

export default (config) => ({
  ...config,
  count: 0,
  searchTerm: '',

  init() {
    this.restoreEventListeners();
    this.initLists();
    this.updateCount(this.options);
    this.$watch('options', this.updateCount.bind(this));
  },

  updateCount(options) {
    this.count = options.reduce((acc, option) => {
      acc = option.Selected ? acc + 1 : acc;
      return acc;
    }, 0);
  },

  // Sortable
  initLists() {
    if (!this.sortable) return;
    this.sortable = Sortable.create(this.$refs.sortable, {
      animation: 150,
      dataIdAttr: 'data-id',
      handle: '.multiselectfield-item-title',
      onUpdate: ({ oldIndex, newIndex }) => {
        this.options = this.onUpdate([...this.options], oldIndex, newIndex);
      },
    });
  },

  onUpdate(arr, from, to) {
    const item = this.options[from];
    arr = [...arr.slice(0, from), ...arr.slice(from + 1)];
    arr = [...arr.slice(0, to), item, ...arr.slice(to)];
    return arr;
  },

  // Check if item is selected
  getSelected(val) {
    const option = this.options.find((opt) => opt.Value === val);
    return option.Selected;
  },

  // Move item via click
  move(e) {
    const { target } = e;
    const val = parseInt(target.dataset.value);
    const item = target.parentNode;
    const list = item.parentNode;

    const isGonnaBeSortable = list === this.$refs.list;

    if (isGonnaBeSortable) {
      this.$refs.sortable.append(item);
      if (!this.sortable) this.sortList(this.$refs.sortable);
    } else {
      this.$refs.list.append(item);
      this.sortList(this.$refs.list);
    }
    const option = this.options.find((opt) => opt.Value === val);
    option.Selected = isGonnaBeSortable;

    this.$nextTick(() => {
      this.options = [
        ...this.dataFromDom(this.$refs.sortable, true),
        ...this.dataFromDom(this.$refs.list),
      ];
    });
  },

  sortList(list) {
    Array.from(list.getElementsByTagName('LI'))
      .sort((a, b) => a.dataset.title.localeCompare(b.dataset.title))
      .forEach((li) => list.appendChild(li));
  },

  dataFromDom(list, Selected = false) {
    return Array.from(list.getElementsByTagName('LI')).map((item) => ({
      Value: parseInt(item.dataset.value),
      Title: item.dataset.title,
      Disabled: Boolean(item.dataset.disabled),
      Selected,
    }));
  },

  addAll() {
    this.$refs.sortable.append(...this.$refs.list.childNodes);
    this.options = this.options.map((option) => ({
      ...option,
      Selected: true,
    }));
  },

  removeAll() {
    this.$refs.list.append(...this.$refs.sortable.childNodes);
    this.options = this.options.map((option) => ({
      ...option,
      Selected: false,
    }));
  },

  // Helper to fix issue with `event-pollyfill`,
  // restore the original functionality of `handleEvent`
  restoreEventListeners() {
    if (!window._restoredListeners) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.append(iframe);

      window.EventTarget.prototype.addEventListener =
        iframe.contentWindow.EventTarget.prototype.addEventListener;
      window.EventTarget.prototype.removeEventListener =
        iframe.contentWindow.EventTarget.prototype.removeEventListener;
      window._restoredListeners = true;
    }
  },

  // Fuzzy search
  async updateItem() {
    if (!this.searchTerm || this.getSelected(this.value)) {
      this.visible = true;
      return;
    }

    const pat = new RegExp(this.searchTerm, 'i');
    const visible = pat.test(this.title);

    await this.$nextTick(() => {
      this.visible = visible;
    });
  },
});
