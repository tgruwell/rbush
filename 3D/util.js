

function d2r(d){
	return Math.PI * d / 180;
}

function r2d(r){
	return r * 180 / Math.PI;
}

function inherit(basePrototype) {
	function F(){}
	F.prototype = basePrototype;
	return new F;
}

function extend(Child, Parent) {
	Child.prototype = inherit(Parent.prototype);
	Child.prototype.constructor = Child;
	Child.parent = Parent.prototype;
}