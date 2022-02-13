import React, { PureComponent } from "react";

function scrollConnectPure(Component) {
       class ScrollConnectedPure extends PureComponent {
              
              render() {
                     return <Component {...this.props} />;
              }
       }

       return ScrollConnectedPure;
}

export default scrollConnectPure;
