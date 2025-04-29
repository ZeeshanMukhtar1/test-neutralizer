import './neutralizer';

import React from 'react';
import { createRoot } from 'react-dom/client';

import Content from './Content';

import '@assets/styles/index.css';

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(<Content />);
