import Alpine from 'alpinejs';
import field from './field';
// import Sortable from 'sortablejs';

('use strict');
// (function ($) {
//   Sortable.create($('[x-ref="left"]')[0], {
//     // group: 'shared',
//     // animation: 150,
//   });

//   (function () {
//     Sortable.create(document.getElementById('test'), {
//       // group: 'shared',
//       // animation: 150,
//     });
//   })();

//   Sortable.create($('[x-ref="right"]')[0], {
//     group: 'shared',
//     animation: 150,
//   });

// })(window.jQuery);
if (typeof window.Alpine === 'undefined') {
  window.Alpine = Alpine;
}
Alpine.data('multiselectfield', field);
Alpine.start();
