---
title: 'Guide'
nav_order: 2
---

# Guide

## Intersection Detection

Intersection detection means detecting whether a DOM element intersects with the viewport. By viewport, we mean the currently viewable portion of the website.

To detect an intersection, we either need to

1. Subscribe to the scroll event.
2. Use Intersection Observer API

Differences between these two approaches are outlined in [IO VS Scroll](../IOVsScroll/readme.me).

onscroll event is the old way of detecting intersections. It runs on the main thread of the web browser and if not implemented properly, it can severely affect the performance of your site. But it has the ability to constantly check for interaction information, unlike the intersection observer.

Intersection observer is a newly defined API for this task. And it has good support in most browsers([Check here](https://caniuse.com/#feat=intersectionobserver)). But there are cases where intersection observer cannot be used. For example, in continuous scroll detection, you cannot use this. Instead, these cases require the old `onscroll` event to handle them.

## Detecting using scroll events

### 1. Add Sensor

To make the sensor available, wrap your contents with the ScrollSense component. Ideally, you can put this to the root level of your component hierarchy.

```js

```

`ScrollSense` takes a configuration object called config with following.

|Property|Description|
|--------|-----------|
|delay|Scroll events are throttled for performance reasons. The throttling interval can be set by `delay`.|
|[`rootMargin`](#roorMargin)|This sets a global offset which will be reduced from your component bounds. This is a string with either pixel or percentage components for top, right, bottom, and left. Examples : <br/></br><ul><li>'10px 20px 30px 10px' means, top offset is 10%. right 20px. bottom 30px and left 10%.</li><li>'0 20px' means top and bottom are 0px while right and left are 20px.</li><li>30 - all directions have 30px.</li>

> root for this sensor is the browser window viewport.

### 2. Connect your components

Now you can start adding scroll detection to your components. To do that, you can use the `useScrollSense` hook.

```js
```

`useScrollSense` hook returns an object with `onIntersection` and `detach` methods.

Use the returned `onIntersection` method to add your behavior when an intersection is detected.

`onIntersection` is called whenever your component intersects with the viewport. It needs a ref to your component and a callback which you can use to add your own logic when an intersection happens.

Make sure when you call this `onIntersection` method, it is supplied with a valid ref argument. Calling this method inside `useEffect` is the recommended way to do this.

You can use the `detach` method to stop listening to intersection events. Calling this method will detach your component from the sensor provider.

## Detecting using Intersection Observers

### 1. Add Sensor

To use the intersection observer API  sensor you need to import from the `react-scrollsense/io` module. 

```js

```

This ScrollSense accepts prop called config, with following

|Property|Description|
|--------|-----------|
|root|The DOM element or document whose bounding rectangle is used to check for the created intersection observer. [See here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root) for more info.|
|threshold|Amount of distance that your component should interact with the root to trigger an intersection event. This can be a floating number in the range [0,1] or an array of floating numbers in the range [0,1]. If it's a single value then it's considered a single detection point. If it's an array, we consider that as multiple detection points. [See here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/thresholds) for more info.|
|rootMargin|<a href="rootMargin">Same as above section on scroll events.</a>|

Additional notes on advanced use for threshold:

>Intersection observer API only accepts floating numbers in the range [0, 1]. Although this library allows you to provide percentages and pixels as specified below, they are internally converted to the above range for the API.

> Although, IO API only allows [0,1], you can use string percentage values. For example, [0, '5%', '10%', '20%']. When we provide percentage values, they are calculated into floating numbers between 0 - 1 internally by library. So internally this is equal to [0, 0.05, 0.1, 0.2].

> Also, if you are planning to use only the mode which uses a dedicated intersection observer per component (`useScrollSense()` or `useScrollSense(true)`), then you can also specify pixel values (as string) for threshold. For example : [20px, 50px]. The library will internally generate the percentage values using the width and height of the elements. But if you specify pixels for threshold values, you CAN NOT use any component that uses the single intersection observer mode (`useScrollSense(false)`). In this case, the threshold value will be set to 0.5. This limitation exists because all elements are sharing a single io. 

### 2. Connect your component to sensor

There are two ways to use intersection observer-based detection. 

One way is to use a single observer for all components. This will only create a single observer in the sensor provider.

The other way is to use an observer per component. This will create a dedicated observer for each component you connect with the sensor provider.

```js

```

`useScrollSense` accepts a single boolean parameter called, useMultipleIOs. Default is true if you don't pass it.

Setting it to true will create a dedicated intersection observer for your component.

If you set it to false, then a single intersection observer will handle all your components.

This returns an object which contains `onIntersection` and `detach` methods.

Use the `onIntersection` method to add your behavior when an intersection is detected.

Make sure when you call this returned `onIntersection` method, it is supplied with a valid ref argument. Calling this method inside `useEffect` is the recommended way to do this.

Use the `detach` method to unsubscribe from the sensor. You can use the return function of the `useEffect` hook to unsubscribe when the component gets unmounted. 


```js
```

## Examples

While its up to your imagination and requirements to decide what to do upon detecting an intersection, following are some of the common tasks you will find this library useful.

### 1. Adding fade-in effect

Let's say that you need to fade in your components as the user scrolls down. Here is a quick example of how to do that. Here I use intersection observer. You can use the scroll events also.


### 2. Change class on intersection

If you need to change element contents or their CSS classes when a component gets into the view, the following example may help you.

### 3. Animation on scroll

When you need to create animations, it's better to use the scroll-based sensor. It will give you continuous updates on an intersection.

