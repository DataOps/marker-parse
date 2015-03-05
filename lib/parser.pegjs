{
	function child(child) {
		if (child.length) {
			var temp = [];
			for(var i = 0; i < child.length; i++) {
				temp.push({name: child[i], children: []});
			}
			return temp;
		} else {
			return child;
		}
	}

	function getChildren(child1, child2) {
		console.log(child2);
		return [child1,child2];
	}
}

start = ((op:value "\n"*) { return op })+

value = data / chartType / color / labels / relation / "-" / intRaw

_ = (' '*)? ':'? '='? (' '*)? {
	return null
}


int = digits:[0-9]+ {
	return {
		type: "int",
		value: parseInt(digits.join(""), 10)
	}
}

chars = str:[A-Za-z]+ {
	return {
		type: "string",
		value: str.join("")
	}
}

file = left:[A-Za-z]+ "." right:("csv") {
	return {
		type: "file",
		value: left.join("") + "." + right
	}
}

children
  = left:parent "," right:children { return getChildren(left, right) }
  / parent


parent = name:expression "-" children:children { 
	return {
		name: name,
		children: child(children)
	}
} / expression


intRaw = digits:[0-9]+ {
	return parseInt(digits.join(""), 10);
}

expression = intRaw / "("? children:children ")"? { return children; }

relation = relation:'#relation'+ _ expression:expression {
	return expression;
}

data = left:'#data'+ _ array:((','? " "* (file / int / chars) )+)? {
	return {
		type: "data",
		value: array ? array.map(function(array) { return array[2] }) : null
	}
}

chartType = left:'#type'+ _ right:[A-Za-z0-9?]+ {
	return {
		type: "type",
		value: right.join("")
	}
}

color = left:'#color'+ _ right:[A-Za-z0-9?]+ {
	return {
		type: "color",
		value: right.join("")
	}
}

labels = lbl:'#labels' _ lblVal:[A-Za-z]+{
	return {
		type: "labels",
		value: lblVal.join("")
	}
}