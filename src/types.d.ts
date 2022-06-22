
interface ScrollSensorEvent {

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

interface SensorProxy {
       pause: Function,
       resume: Function
}

type ConnectOptionsType = {
       rootMargin?: String,
       threshold?: number,
       root?: HTMLElement,
       delay?: string | number
}

type ScrollConnectedPropType = {
       rootMargin: string,
       threshold?: number,
       root?: HTMLElement
};

type ScrollConnectedStateType = {
       scrollInfo: ScrollSensorEvent,
       sensorProxy: SensorProxy | null
};

type ParsedRootMargin = {
       type: string[],
       margin: [number, number, number, number]
}