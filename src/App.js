import Main from './components/Main'
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Main />
      </div>
    </BrowserRouter>  
  );
}
export default App;
