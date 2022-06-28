import React, { PureComponent } from "react";

function scrollConnectPure(Component: React.ComponentType<any>) {
       return class ScrollConnectedPure extends PureComponent {
              
              render() {
                     return <Component {...this.props} />;
              }
       }
}

export default scrollConnectPure;
