import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchPlaceholders,getMetadata } from '../../scripts/aem.js'; 

// Fetch placeholders (you can adjust the parameter as needed)
const placeholders = await fetchPlaceholders(''); 

export default function decorate(block) {


// Create a placeholder value if not fetched from the server
const defaultPlaceholder = '';

const  foo  = placeholders.clickHereForMore;

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const link = div.querySelector('a'); // Assuming the link is an <a> element inside the card
      if (link) {
        link.textContent= foo || defaultPlaceholder;
      }
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
