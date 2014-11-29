var HUD = {
	view: null,
	
	markers: [],
	
	attachTo: function(view){
		this.view = view;
		this.view.addListener("refresh", $.proxy(this.refresh, this));
	},
	
	refresh: function(){
		// Update marker positions
		if(this.markers.length > 0){
			var projector = new THREE.Projector();
			for(var i=0; i<this.markers.length; i++){
				var p = new THREE.Vector3().copy(this.markers[i].position);
				projector.projectVector(p, this.view.camera);
				var top = parseInt((-p.y+1) * (this.view.height) / 2);
				var left = parseInt((p.x+1) * (this.view.width) / 2);
				this.markers[i].element.css({
					display: (top < 0 || top > this.view.height || left < 0 || left > this.view.width || p.z >= 1) ? "none" : "",
					top: top,
					left: left
				});
			}
		}
	},
	
	mark: function(point, label){
		this.markers.push({
			position: point,
			element: $("<span>"+label+"</span>").css({color: "red", position: "absolute", top: 0, left: 0, borderColor: "red", borderTop: "1px solid red"})
		});
		
		this.view.container.append(this.markers[this.markers.length-1].element);
	}
}