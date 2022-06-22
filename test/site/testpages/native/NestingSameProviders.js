import react from 'react';
import ScrollSense from "react-scrollsense";
import ScrollBox from "./ScrollBox";

export default function NestingSameProviders() {

       return (
              <ScrollSense config={{delay:100}}>
                     <div style={{ background: '#aaa', height: '1500px', width: '100%' }}></div>
                     <NestedComponent></NestedComponent>
              </ScrollSense>
       )
};

const NestedComponent = () => {

       return (
              <div>
                     {
                            new Array(3).fill(undefined).map(() => <ScrollBox></ScrollBox>)
                     }
                     <ScrollSense config={{delay:3000}}>
                            <ScrollBox></ScrollBox>
                     </ScrollSense>
              </div>
       )
};