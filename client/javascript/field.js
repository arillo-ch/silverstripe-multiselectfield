import Sortable from 'sortablejs';

export default (config) => ({
  ...config,

  init() {
    this.restoreEventListeners();
    this.initLists();
  },

  initLists() {
    if (!this.sortable) return;
    this.sortable = Sortable.create(this.$refs.sortable, {
      animation: 150,
      dataIdAttr: 'data-id',
      handle: '.multiselectfield-item-title',
      onUpdate: ({ oldIndex, newIndex }) => {
        this.options = this.updateArr([...this.options], oldIndex, newIndex);
      },
    });
  },

  updateArr(arr, from, to) {
    const item = this.options[from];
    arr = [...arr.slice(0, from), ...arr.slice(from + 1)];
    arr = [...arr.slice(0, to), item, ...arr.slice(to)];
    return arr;
  },

  getType(val) {
    const option = this.options.find((opt) => opt.Value === val);
    return option.Selected;
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
});
