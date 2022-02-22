import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { render } from 'react-dom';
import BasicRendering from './testpages/io/BasicRendering';
import BasicRenderingNative from './testpages/native/basicRendering';
import SpecificRendering from './testpages/io/specificRendering';
import SpecificRenderNative from './testpages/native/specificRendering';
import './styles.css';

function App() {
       return (
              <div className="container">
                     <Router>
                            <Routes>
                                   <Route path="/native">
                                          <Route path="basic" element={<BasicRenderingNative></BasicRenderingNative>}></Route>
                                          <Route path="detach" element={<SpecificRenderNative></SpecificRenderNative>}></Route>
                                   </Route>
                                   <Route path="/io">
                                          <Route path="basic" element={<BasicRendering></BasicRendering>}></Route>
                                          <Route path="detach" element={<SpecificRendering></SpecificRendering>}></Route>
                                   </Route>
                            </Routes>
                     </Router>
              </div>
       )
}

render(<App></App>, document.getElementById('root'));