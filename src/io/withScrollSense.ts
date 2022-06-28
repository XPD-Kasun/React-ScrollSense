import scrollConnectComponentMulti from "./scrollConnectComponentMulti";
import scrollConnectComponentSingle from "./scrollConnectComponentSingle";
import scrollConnectPropMulti from "./scrollConnectPropMulti";
import scrollConnectPropSingle from "./scrollConnectPropSingle";
import {ConnectOptionsType } from '../types';

export default function withScrollSense(Component) {

       return {
              viaCallback: function (options: ConnectOptionsType, useMultipleIO = false) {

                     if (useMultipleIO) {
                            return scrollConnectPropMulti(Component, options);
                     }
                     else {
                            return scrollConnectPropSingle(Component);
                     }

              },
              viaProps: function (
                     options: ConnectOptionsType,
                     mapProps: (ScrollSensorEvent) => any,
                     useMultipleIO = false
              ) {

                     if (useMultipleIO) {
                            return scrollConnectComponentMulti(Component, mapProps, options);
                     }
                     else {
                            return scrollConnectComponentSingle(Component, mapProps);
                     }


              }
       }
}