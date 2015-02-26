start = ((op:value "\n"*) { return op })+

value = data / chartType / color / int

int = digits:[0-9]+ {
	return {
		type: "int",
		value: parseInt(digits.join(""), 10)
	}
}

data = left:'#data'+ (' '*)? ':'? '='? array:((','? " "* int)+)? {
	return {
		type: "data",
		array: array ? array.map(function(array) { return array[2] }) : null
	}
}

chartType = left:'#type'+ (' '*)? ':'? '='? ' '? right:[A-Za-z0-9?]+ {
	return {
		type: "type",
		value: right.join("")
	}
}

color = left:'#color'+ (' '*)? ':'? '='? ' '? '#'? right:[A-Za-z0-9?]+ {
	return {
		type: "color",
		value: right.join("")
	}
}