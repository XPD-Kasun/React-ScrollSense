function refresh() {
  dispatchEvent(new Event("viewportchanged"));
}

export default refresh;
