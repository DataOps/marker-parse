start = ((op:value "\n"*) { return op })+

value = data / chartType / color / int / chars /labels

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

data = left:'#data'+ _ array:((','? " "* (int / chars) )+)? {
	return {
		type: "data",
		array: array ? array.map(function(array) { return array[2] }) : null
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