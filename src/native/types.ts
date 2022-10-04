import { ReactChildren, Tracker } from "../types"

export type NativeScrollContext = {
	addTracking: (el: HTMLElement, fn, options) => Tracker,
	updateTracking: (el: HTMLElement, fn, options) => void,
	removeTracking: (el: HTMLElement) => void,
	sensorType: 'native'
}

export interface ScrollSenseProps {
	children?: ReactChildren,
	config?: {
		rootMargin?: string | null
		delay?: string | number
	}
}

export interface ScrollSenseState {
	refreshToggle: boolean
}

export interface ScrollEntry {
	fn: (ScrollSensorEvent) => void,
	el: HTMLElement,
	isShowing: boolean,
	options: ParsedNativeConfig,
	overflowParent: {
		el: HTMLElement,
		xOverflow: boolean,
		yOverflow: boolean
	},
	isActive: boolean,
	isScrollContainer: boolean,
	isTriggered: boolean,
	continuous: boolean
}

export type ParsedNativeConfig = {
	delay?: number,
	rootMargin: ParsedRootMargin | null
};

export type ParsedRootMargin = {
       type: string[],
       margin: [number, number, number, number]
}       
