import Sortable from 'sortablejs';

export default (config) => ({
  ...config,

  init() {
    // this.prepareOptions();
    this.restoreEventListeners();
    this.initLists();
  },

  // prepareOptions() {
  //   this.optionsLeft = this.options.filter((item) => !item.Selected);
  //   this.optionsRight = this.options.filter((item) => item.Selected);
  // },

  initLists() {
    const opts = {
      group: 'shared',
      animation: 150,
      dataIdAttr: 'data-id',
      handle: '.multiselectfield-item-title',

      onEnd: (e) => {
        const itemsLeft = this.left.toArray().map((val) => {
          const opt = this.options.find(
            (option) => option.Value === parseInt(val)
          );
          opt.Selected = false;
          return opt;
        });
        const itemsRight = this.right.toArray().map((val) => {
          const opt = this.options.find(
            (option) => option.Value === parseInt(val)
          );
          opt.Selected = true;
          return opt;
        });

        // this.destroyLists();
        this.$nextTick(() => {
          this.options = [...itemsRight, ...itemsLeft];
          // this.initLists();
        });
      },
    };

    this.$nextTick(() => {
      this.left = Sortable.create(this.$refs.left, { ...opts, sort: false });
      this.right = Sortable.create(this.$refs.right, opts);
    });
  },

  move(val) {
    this.options = this.options.map((option) => {
      if (option.Value === val) {
        option.Selected = !option.Selected;
      }
      return option;
    });
    this.destroyLists();
    // this.prepareOptions();

    this.$nextTick(() => {
      this.initLists();
    });
  },

  destroyLists() {
    this.left.destroy();
    this.right.destroy();
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
