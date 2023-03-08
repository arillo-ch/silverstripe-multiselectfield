import Sortable from 'sortablejs';

export default (config) => ({
  ...config,
  count: 0,
  searchTerm: '',
  isFirst: true,

  init() {
    this.$form = this.$refs.select.closest('form');
    this.restoreEventListeners();
    this.initSortable();
    this.update(this.options);
    this.$watch('options', this.update.bind(this));
  },

  update(options) {
    this.count = options.reduce((acc, option) => {
      acc = option.Selected ? acc + 1 : acc;
      return acc;
    }, 0);

    if (this.isFirst) this.isFirst = false;
    if (!this.isFirst) {
      this.$form.dispatchEvent(new CustomEvent('dirty'));
    }
  },

  // Sortable
  initSortable() {
    this.list = Sortable.create(this.$refs.list, {
      animation: 150,
      sort: false,
      group: {
        name: 'shared',
        put: false,
      },
      dataIdAttr: 'data-id',
      handle: '.multiselectfield-item-title',
      onEnd: () => {
        this.$nextTick(() => {
          this.options = [
            ...this.dataFromDom(this.$refs.sortable, true),
            ...this.dataFromDom(this.$refs.list),
          ];
        });
      },
    });

    this.sortable = Sortable.create(this.$refs.sortable, {
      animation: 150,
      group: 'shared',
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
    const item = target.parentNode;
    const val = parseInt(item.dataset.value);
    const list = item.parentNode;

    const isGonnaBeSortable = list === this.$refs.list;

    if (isGonnaBeSortable) {
      this.$refs.sortable.append(item);
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
      .sort((a, b) => parseInt(a.dataset.pos) - parseInt(b.dataset.pos))
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
    this.sortList(this.$refs.list);
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

    const escaped = this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const pat = new RegExp(escaped, 'i');
    const visible = pat.test(this.title);

    await this.$nextTick(() => {
      this.visible = visible;
    });
  },
});
