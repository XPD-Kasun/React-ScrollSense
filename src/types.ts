import React, { ReactChild, ReactFragment, ReactPortal } from "react";

export type ReactChildren = JSX.Element[] | JSX.Element | ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
 
export interface ScrollSensorEvent {

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

export interface Tracker {
       pause: Function,
       resume: Function
}

export type ConnectOptionsType = {
       rootMargin?: String,
       threshold?: number,
       root?: HTMLElement,
       delay?: string | number
}

export type ScrollConnectedComponentProps = {
       rootMargin: string,
       threshold?: number,
       root?: HTMLElement
};

export type ScrollConnectedComponentState = {
       scrollInfo: ScrollSensorEvent,
       sensorProxy: Tracker | null
};

export type ScrollConnectedCallbackProps = ScrollConnectedComponentProps;
