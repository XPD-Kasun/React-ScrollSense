import { Tracker } from '../types';

export type IOScrollContext = {
	addToSingleio: (el, fn, options) => Tracker,
	addToMultipleio: (el, fn, config) => Tracker,
	updateMultipleio: (el, fn, options) => null,
	removeTracking: (el, isMultiple) => void,
	sensorType: 'io'
}

export type ScrollSenseProps = {
	config?: {
		threshold?: number,
		root?: HTMLElement,
		rootMargin?: string
	}
};

export type ScrollSenseState = {
	refreshToggle: boolean
};