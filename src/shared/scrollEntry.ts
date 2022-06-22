export default function scrollEntry(intersectionRatio, boundingClientRect, intersectionRect) {
	return {
		intersectionRatio,
		boundingClientRect,
		intersectionRect: intersectionRect ? intersectionRect : null
	}
}