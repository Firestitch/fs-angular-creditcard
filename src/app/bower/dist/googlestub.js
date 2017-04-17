if(!google) {
	var google = {
					maps: {
						OverlayView: function() {},
						Marker: function() {},
						Map: function() {
							this.prototype = { enableKeyDragZoom: null };
						},
						MapTypeId: {},
						LatLng: function() {},
						event: {
							addListenerOnce: function() {},
							addListener: function() {}
						}
					}
				};
}
