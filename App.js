import "react-native-gesture-handler"
import React from 'react';
import Application from './src/application/Application'
import { Provider } from 'react-redux'
import store from './src/store/store'


const App = () => {
  return (
    <Provider store = {store}>
      <Application />
    </Provider>
  );
};

export default App;