import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { render } from 'react-dom';
import BasicRendering from './testpages/io/basicRendering';
import NativeBasicRendering from './testpages/native/basicRendering';

import './styles.css';

function App() {
       return (
              <div className="container">
                     <Router>
                            <Routes>
                                   <Route path="/native" element={<NativeBasicRendering></NativeBasicRendering>}>
                                   </Route>
                                   <Route path="/io" element={<BasicRendering></BasicRendering>}>
                                   </Route>
                            </Routes>
                     </Router>
              </div>
       )
}

render(<App></App>, document.getElementById('root'));