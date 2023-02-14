import Alpine from 'alpinejs';
import field from './field';

(function ($) {
  if (typeof window.Alpine === 'undefined') {
    window.Alpine = Alpine;
  }
  Alpine.data('multiselectfield', field);
  Alpine.start();
})(window.jQuery);
