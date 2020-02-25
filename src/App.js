// in src/App.js
import React from 'react';
import { Admin } from 'react-admin';
import dataProvider from './utils/dataProvider'

const App = () => <Admin dataProvider={dataProvider} />;

export default App;