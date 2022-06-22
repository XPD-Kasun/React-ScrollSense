import scrollConnectProp from './scrollConnectProp';
import scrollConnectComponent from './scrollConnectComponent';
import React from 'react';

export default function withScrollSense(Component: React.ComponentType) {

       return {
              viaCallback: function (options) {

                     return scrollConnectProp(Component, options);

              },
              viaProps: function (options, mapProps) {

                     return scrollConnectComponent(Component, mapProps, options);

              }
       }

}