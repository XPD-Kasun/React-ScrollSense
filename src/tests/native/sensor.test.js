import React from 'react';
import { Screen, render } from "@testing-library/react";
import ScrollSense from "../../native/ScrollSense";

describe('Native sensor provider', () => {

       global.innerHeight= 800;

       it('mounts without errors', () => {
              render(<ScrollSense></ScrollSense>);      
       });

})