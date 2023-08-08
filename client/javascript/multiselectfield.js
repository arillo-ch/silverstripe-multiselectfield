import field from './field';

document.addEventListener('alpine:init', () => {
  // console.log('multiselectfield alpine:init');
  Alpine.data('multiselectfield', field);
});
