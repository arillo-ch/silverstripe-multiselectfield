/* global Alpine */
import field from './field';

if (typeof Alpine !== 'undefined') {
  Alpine.data('multiselectfield', field);
}
document.addEventListener('alpine:init', () => {
  Alpine.data('multiselectfield', field);
});
