import './styles.css';

// https://webpack.js.org/guides/asset-management/

function createComponent() {
  const element = document.createElement('div');

  element.innerHTML = 'Hello World!';
  element.classList.add('main');

  return element;
}

document.body.appendChild(createComponent());
