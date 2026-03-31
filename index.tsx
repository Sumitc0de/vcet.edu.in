import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { resolveBackendMediaUrl } from './utils/uploadedAssets';

const originalSetAttribute = Element.prototype.setAttribute;
const srcDescriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
const hrefDescriptor = Object.getOwnPropertyDescriptor(HTMLAnchorElement.prototype, 'href');

Element.prototype.setAttribute = function patchedSetAttribute(name: string, value: string) {
  if ((name === 'src' || name === 'href') && typeof value === 'string') {
    const resolved = resolveBackendMediaUrl(value);
    if (resolved) {
      return originalSetAttribute.call(this, name, resolved);
    }
  }
  return originalSetAttribute.call(this, name, value);
};

if (srcDescriptor?.set && srcDescriptor.get) {
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    configurable: true,
    enumerable: srcDescriptor.enumerable ?? true,
    get: srcDescriptor.get,
    set(value: string) {
      const resolved = typeof value === 'string' ? resolveBackendMediaUrl(value) : null;
      srcDescriptor.set!.call(this, resolved ?? value);
    },
  });
}

if (hrefDescriptor?.set && hrefDescriptor.get) {
  Object.defineProperty(HTMLAnchorElement.prototype, 'href', {
    configurable: true,
    enumerable: hrefDescriptor.enumerable ?? true,
    get: hrefDescriptor.get,
    set(value: string) {
      const resolved = typeof value === 'string' ? resolveBackendMediaUrl(value) : null;
      hrefDescriptor.set!.call(this, resolved ?? value);
    },
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
