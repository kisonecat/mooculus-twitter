define(['underscore'],function(_) {
    console.log(_);

    var operators = {
	"+": function(operands) { return operands.join( ' + ' ); },
	"-": function(operands) { return operands.join( ' - ' ); },
	"~": function(operands) { return "-" + operands.join( ' - ' ); },
	"*": function(operands) { return operands.join( " \\cdot " ); },
	"/": function(operands) { return "\\frac{" + operands[0] + "}{" + operands[1] + "}"; },
	"^": function(operands) { return operands[0]  + "^{" + operands[1] + "}"; },
	"sin": function(operands) { return "\\sin " + operands[0]; },
	"cos": function(operands) { return "\\cos " + operands[0]; },
	"tan": function(operands) { return "\\tan " + operands[0]; },
	"arcsin": function(operands) { return "\\arcsin " + operands[0]; },
	"arccos": function(operands) { return "\\arccos " + operands[0]; },
	"arctan": function(operands) { return "\\arctan " + operands[0]; },
	"arccsc": function(operands) { return "\\arccsc " + operands[0]; },
	"arcsec": function(operands) { return "\\arcsec " + operands[0]; },
	"arccot": function(operands) { return "\\arccot " + operands[0]; },
	"csc": function(operands) { return "\\csc " + operands[0]; },
	"sec": function(operands) { return "\\sec " + operands[0]; },
	"cot": function(operands) { return "\\cot " + operands[0]; },
	"log": function(operands) { return "\\log " + operands[0]; },
	"sqrt": function(operands) { return "\\sqrt{" + operands[0] + "}"; },
	"abs": function(operands) { return "\\left|" + operands[0] + "\\right|"; },
	"apply": function(operands) { return operands[0] + "(" + operands[1] + ")"; },
    };

/*    
   expression =
    expression '+' term | 
    expression '-' term |
    term
*/

    function expression(tree) {
	if ((typeof tree === 'string') || (typeof tree === 'number')) {
	    return term(tree);	
	}

	var operator = tree[0];
	var operands = tree.slice(1);
	
	if ((operator == '+') || (operator == '-')) {
	    return operators[operator]( _.map( operands, function(v,i) { return term(v); } ) );
	}
	
	return term(tree);
    }

    /*
   term =
    term '*' factor |
    term nonMinusFactor |
    term '/' factor |
    factor
    */

    function term(tree) {
	if ((typeof tree === 'string') || (typeof tree === 'number')) {
	    return factor(tree);	
	}

	var operator = tree[0];
	var operands = tree.slice(1);
	
	if ((operator == '*') || (operator == '/')) {
	    return operators[operator]( _.map( operands, function(v,i) { return factor(v); } ) );
	}
	
	return factor(tree);	
    }

    /*
   factor =
    '(' expression ')' |
    number | 
    variable |
    function factor |
    factor '^' factor
    '-' factor |
    nonMinusFactor
    */

    function isFunctionSymbol( symbol )
    {
	var functionSymbols = ['sin', 'cos', 'tan', 'csc', 'sec', 'cot', 'arcsin', 'arccos', 'arctan', 'arcsin', 'arccos', 'arctan', 'log', 'log', 'exp', 'sqrt', 'abs'];
	return (functionSymbols.indexOf(symbol) != -1);
    }

    function factor(tree) {
	if (typeof tree === 'string') {
	    return tree;
	}    
	
	if (typeof tree === 'number') {
	    return tree;
	}
	
	var operator = tree[0];
	var operands = tree.slice(1);	

	if (isFunctionSymbol(operator)) {
	    return operators[operator]( _.map( operands, function(v,i) { return factor(v); } ) );
	}

	if (operator == '^') {
	    return operators[operator]( _.map( operands, function(v,i) { return factor(v); } ) );
	}

	if (operator == '~') {
	    return operators[operator]( _.map( operands, function(v,i) { return factor(v); } ) );
	}

	return '(' + expression(tree) + ')';
    }

    function astToText(tree) {
	return expression(tree);
    };

    /****************************************************************/
    // export
    return astToText;
});
