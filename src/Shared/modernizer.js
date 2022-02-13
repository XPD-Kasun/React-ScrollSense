
export function isRafAvailable(){
	if(window.requestAnimationFrame){
		return true;
	}
	return false;
}