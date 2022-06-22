import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { render } from 'react-dom';
import BasicRendering from './testpages/io/BasicRendering';
import BasicRenderingNative from './testpages/native/basicRendering';
import SpecificRendering from './testpages/io/specificRendering';
import SpecificRenderNative from './testpages/native/specificRendering';
import NestingSameProviders from './testpages/native/NestingSameProviders';
import NestingInsideIO from './testpages/native/NestingInsideIO';
import NestingSameProvidersIO from './testpages/io/NestingSameProviders';
import NestingInsideNativeEvent from './testpages/io/NestingInsideNativeEvent';
import NestingScrollerItem from './testpages/io/NestingScrollerItem';
import NestingScrollerItemNative from './testpages/native/NestingScrollerItem';
import './styles.css';

function App() {
       return (
              <div className="container">
                     <Router>
                            <Routes>
                                   <Route path="/native">
                                          <Route path="basic" element={<BasicRenderingNative></BasicRenderingNative>}></Route>
                                          <Route path="detach" element={<SpecificRenderNative></SpecificRenderNative>}></Route>
                                          <Route path="nesting" element={<NestingSameProviders></NestingSameProviders>}></Route>
                                          <Route path="ionesting" element={<NestingInsideIO></NestingInsideIO>}></Route>
                                          <Route path="nestinglist" element={<NestingScrollerItemNative></NestingScrollerItemNative>}></Route>
                                   </Route>
                                   <Route path="/io">
                                          <Route path="basic" element={<BasicRendering></BasicRendering>}></Route>
                                          <Route path="detach" element={<SpecificRendering></SpecificRendering>}></Route>
                                          <Route path="nesting" element={<NestingSameProvidersIO></NestingSameProvidersIO>}></Route>
                                          <Route path="nativenesting" element={<NestingInsideNativeEvent></NestingInsideNativeEvent>}></Route>
                                          <Route path="nestinglist" element={<NestingScrollerItem></NestingScrollerItem>}></Route>
                                   </Route>

                            </Routes>
                     </Router>
              </div>
       )
}

render(<App></App>, document.getElementById('root'));