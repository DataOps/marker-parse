{
	function child(child) {
		if (typeof child === 'array') {
			var temp = [];
			for(var i = 0; i < child.length; i++) {
				temp.push({name: child[i], children: []});
			}
			return temp;
		} else if (typeof child === 'object') {
			var temp = [];
			for(var i = 0; i < child.length; i++) {
				temp.push({name: child[i], children: []});
			}
			return temp;
		} else {
			return {name: child, children: []};
		}
	}

	function getChildren(child1, child2) {
		console.log(child2);
		return [child1,child2];
	}
}

start = ((op:value "\n"*) { return op })+

value = data / chartType / color / labels / relation / selector

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



file = array:(('/'? [A-Za-z(_)?]+ )+)? "." "csv" {
	var tempArray = [];
	var returnStr = "";
	function lol(array) {
		array ? array.map(function(array) { tempArray.push(array[1].join("")) }) : null
		for(var i = 0; i < tempArray.length-1; i++) {
			returnStr += tempArray[i]+"/";
		}
		returnStr += tempArray[tempArray.length-1] + ".csv";
		return returnStr;
	}
	return {
		type: "file",
		value: lol(array)
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

charsRaw = az:[-A-Za-z0-9_/ /.?]+ {
	return az.join("")
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

chartType = left:'#type'+ _ right:charsRaw {
	return {
		type: "type",
		value: right
	}
}

color = left:'#color'+ _ right:charsRaw {
	return {
		type: "color",
		value: right
	}
}

labels = lbl:'#labels' _ lblVal:[A-Za-z]+{
	return {
		type: "labels",
		value: lblVal.join("")
	}
}

selector = '@' selName:charsRaw _ selValue:charsRaw {
	return {
		type: selName,
		value: selValue
	}
}