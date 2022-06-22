---
title: Helper Functions
nav_order: 4
---
# Helpers

This module contains various helper functions that you can use to calculate various results easily. This is an optional module and can be loaded by importing helpers module.

```js
import * as helpers from 'react-scrollsense/helpers';
```

## Helper Reference

### 1. getVisibleHeight

getVisibleHeight returns the intersecting height for a provided `ScrollSensorEvent`. You can use this to get the visible height of an element when the sensor triggers a ScrollSensorEvent when that element intersects with the viewport.

```js
import { useRef, useEffect, useState} from 'react';
import { useScrollSense } from 'react-scrollsense';
import {getVisibleHeight} from 'react-scrollsense/helpers';

export function MyComponent() {

       let el = useRef();
       let [text, setText] = useState('');
       let sensor = useScrollSense();

       useEffect(() => {

              sensor.onIntersection(el.current, (scrollSensorEvent) => {

                     let visibleHeight = getVisibleHeight(scrollSensorEvent);
                     setText(visibleHeight);

              });

       }, [sensor])

       return (
              <div ref={el} className="my-component">
                     {text}
              </div>
       )

}

```


### 2. getVisibleWidth

`getVisibleWidth` returns the intersecting width for a provided `ScrollSensorEvent`. You can use this to get the visible width of an element when the sensor triggers a ScrollSensorEvent when that element intersects with the viewport. 

This function is similar to `getVisibleHeight` function above. Instead, this function is used when you implement horizontal scrolling.
