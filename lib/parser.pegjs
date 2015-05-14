{
	function commentOrValue(comm, name, value) {
		if (comm != "") {
			return {type: "comment", value: null};
		} else {
			return {type: name, value: value};
		}
	}
}

start = ((val:value "\n"*) { return val })+

value =  data / typesAndValues / selector / charsRaw / ("\n" / "\t")

space = [(" ") / ("\t")]*

nlTab = [(\n\t)]+

_ = (space? ':'? '='? space?) {
	return null
}

types = 'type' / 'color' / 'title' / 'labels'

int = digits:[-0-9]+ {
	return {
		type: "int",
		value: parseInt(digits.join(""), 10)
	}
}

double = left:[-0-9]+ '.' right:[0-9]+ {
	return {
		type: "double",
		value: parseFloat(left.join("") + '.' + right.join(""))
	}	
}

chars = str:[A-Za-z]+ {
	return {
		type: "string",
		value: str.join("")
	}
}

file = array:(('/'? [A-Za-z(_)?]+ )+)? "." fileType:("csv"/"json") {
	var tempArray = [];
	var returnStr = "";
	function lol(array) {
		array ? array.map(function(array) { tempArray.push(array[1].join("")) }) : null
		for(var i = 0; i < tempArray.length-1; i++) {
			returnStr += tempArray[i]+"/";
		}
		returnStr += tempArray[tempArray.length-1] + "." + fileType;
		return returnStr;
	}
	return {
		type: "file",
		value: lol(array)
	}	
}

array = '[' array:((','? " "* (file / double / int / chars / array))+)? ']' {
	return {
		type: "array",
		value: (array ? array.map(function(array) { return array[2] }) : null)
	}
}

data = comm:("--")* _ '#data' _ array:(((nlTab/',')? nlTab? " "* (file / double / int / chars) ';'?)+) {
	var newArray = new Array([]);
	var valueArray = [];
	var tempArray = [];
	var separatorArray = [];
	var semiCounter = 0;

	function createArray(array) {
		(array ? array.map(function(array) { valueArray.push(array[3]); separatorArray.push(array[4]) }) : null)
		for(var i = 0; i < valueArray.length; i++) {
			tempArray.push(valueArray[i]);
			if (separatorArray[i] != null) {
				newArray[semiCounter] = tempArray;
				tempArray = [];
				semiCounter++;
			}
		}

		if (newArray.length > 1) {
			return newArray;
		} else {
			return valueArray;
		}
	}
	return commentOrValue(comm, "data", createArray(array))
}

intRaw = digits:[0-9]+ {
	return parseInt(digits.join(""), 10);
}

charsRaw = comm:("--")* _ az:[-A-Za-z0-9_/ /.?]+ {
	function temp(comm, value) {
		if (comm != "") {
			return {type: "comment", value: null};
		} else {
			return value;
		}
	}
	return temp(comm, az.join(""))
}

typesAndValues = comm:("--")* _ '#' left:(types) _ right:charsRaw {
	return commentOrValue(comm, left, right)
}

selector = comm:("--")* _ '@' selName:charsRaw _ array:(((nlTab/',')? nlTab? " "* (typesAndValues / double / int / chars) )+)? {
	return commentOrValue(comm, selName, (array ? array.map(function(array) { return array[3] }) : null))
}