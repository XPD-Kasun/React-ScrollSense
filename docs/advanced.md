---
title: Advanced Guide
nav_order: 3
---

# Advanced Guide

While `useScrollSense` hook will be sufficient for most use cases, this library also comes with few other components you might find useful.

## withScrollSense HOC

Both io and scroll event sensors come with this HOC. This HOC returns another two HOCs.

1. `viaProps` HOC that will pass intersection information into your component as props.
2. `viaCallback` that will pass a callback prop which you can use to listen to intersection events.

### viaProps HOC

`viaProps` HOC is suitable for simple tasks like implementing an fade-in effect. Since this directly passes intersection info as props into your components, React might re-render them many times.

`viaProps` takes two arguments.

|Name|Description|
|----|-----------|
|options| An optional object of type `ConnectOptionsType`. For event-based HOC, only delay and rootMargin are supported. IO-based one only supports root, rootMargin, and threshold properties.|
|mapProps| An optional function that can be used to customize the names of the props passed to the component. This function takes an event of type `ScrollSensorEvent`
|

```js
import { Component } from 'react';
import { withScrollSense } from 'react-scrollsense';

class MyComponent extends Component{

       render(){

              if(this.props.inView) {
                     cls = 'item';
              }
              else {
                     cls  = 'item hidden';
              }
              return (
                     <div className={cls}>
                            Hello
                     </div>
              )
       }
}

export default withScrollSense(MyComponent).viaProps({
       rootMargin: '20px',
       delay: 200
}, ({isIntersecting}) => {
       return {
              inView: isIntersecting
       }
});

```

This example shows using both config and mapProps arguments. `mapProps` is used to rename the prop names in case you already use them in the component. Here we map `isInterecting` prop to `inView`. So inside the component, we can use `inView`.

### viaCallback HOC

`viaCallback` is suitable for implementing more complicated animations, since it won't re-render your components. This HOC is somewhat similar to `useScrollSense` hook. 

`viaCallback` only takes a single argument called options.

|Name|Description|
|----|-----------|
|options| An optional object of type `ConnectOptionsType`. For event-based HOC, only delay and rootMargin are supported. IO-based HOC only supports root, rootMargin, and threshold properties.|

If you have old class-based components, then you can use these HOCs to connect them to the sensor since hooks are not supported in class components.

## Typescript Usage

ScrollSense was originally written using Javascript and then ported to Typescript. Typescript type definition file is exported and you can import it by types.d.ts.

## Using requestAnimationFrame API

Request animation frame (or raf in short) api is a newer browser API created for delivering smoother animation capabilities for javascript. 

Raf is used behind the scenes internally by this library for scroll event based sensor, so if you add animations on scroll events, they will be run inside raf callbacks.

## Throttling in scroll events

Scroll event, unlike click events, triggers in large numbers in a small time frame. Because of this behavior, if you add a handler with complicated logic that takes lots of time to process, it can affect the user experience.

Scroll Sense implementation internally throttles scroll events and you can control throttling using the delay property of the config prop. This value depends on your interests and I found that 300ms is a balance between smoothness and efficiency. You are welcome to experiment with it and come to your own conclusion. 

If you set `delay` to 0, it will disable throttling.

## Intersection Observer vs Scroll Events

Let's discuss a few points on choosing one over the other.

Intersection observer is implemented internally by web browsers. So they perform better. Since they are implemented natively, browsers are optimized and process faster than javascript events. But the downside of this API is, it can't be used for continuous scroll detection. Intersection observer API use `thesholds` to mark cut-off points for intersection detection. Since they are discreet values, you can't achieve a continuous notification flow from an intersection observer.

Scroll event implementation on the other hand, is capable of such continuous detection. But the downside is the performance. These events trigger in large numbers, and if you do some heavy processing inside them, it can make your app render sluggish.

Fortunately, you can throttle the scroll events to increase the efficiency of the events. But throttling using a higher delay can lag your scroll animations. For smoother effects, you need to set the delay to a lower value. But again lower value means more events. So you need to try and find a suitable balance for throttling delay.

For one-time effects or discreet effects use an intersection observer. Use scroll events for everything else, including continuous animations and effects.


