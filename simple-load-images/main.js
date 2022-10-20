import imageSrc from './apple.png';
import './styles.css';

// https://webpack.js.org/guides/asset-management/

function createComponent() {
  const element = document.createElement('img');

  element.src = imageSrc;
  return element;
}

document.body.appendChild(createComponent());
