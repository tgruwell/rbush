function PackingViewport(options){
	PackingViewport.parent.constructor.apply(this, arguments);
	
	if(options.showGrid){
		Draw.line(this, {x:0, y:0, z:0}, {x:1, y:0, z:0}, 0xff0000);
		Draw.line(this, {x:0, y:0, z:0}, {x:0, y:1, z:0}, 0x00ff00);
		Draw.line(this, {x:0, y:0, z:0}, {x:0, y:0, z:1}, 0x0000ff);
		
		// Create a grid in the XZ plane
		for(var i=-5; i<=5; i+=0.5){
			Draw.line(this, {x:i, y:-0.01, z:-5}, {x:i, y:-0.01, z:5}, 0xcccccc);
		}
		for(var i=-5; i<=5; i+=0.5){
			Draw.line(this, {x:-5, y:-0.01, z:i}, {x:5, y:-0.01, z:i}, 0xcccccc);
		}
	}
		
	this.camera.position.x = 6;
	this.camera.position.y = 5;
	this.camera.position.z = 5;
	this.camera.lookAt({x:0, y:0, z:0});
}

PackingViewport.prototype = {

	refresh: function(){
		PackingViewport.parent.refresh.apply(this, arguments);
	}
	
}

extend(PackingViewport, Viewport);
