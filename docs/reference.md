---
title: Reference
nav_order: 6
---

# Reference

This page describes the types used by this library. 

## [ScrollSensorEvent](#scrollsensorevent)

This event is triggered by the scroll sensor whenever it detects an element intersects with the provided viewport.

You can capture this event as an argument for the `onIntersection` method when you use `useScrollSense` or `withScrollSense` HOC.

```typescript
interface ScrollSensorEvent{
       isIntersecting: boolean,
       boundingClientRect?: DOMRect,
       time?: number,
       target?: HTMLElement,
       rootBounds?: DOMRect,
       intersectionRatio?: number,
       intersectionRect?: DOMRect,
       wndWidth?: number,
       wndHeight?: number,
       scrollTop?: number,
       scrollLeft?: number
}
```


