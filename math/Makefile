all: lexer.js

lexer-commonjs.js: lexer.jison
	node ../../../node_modules/jison/lib/cli.js lexer.jison -o lexer-commonjs.js

lexer.js: lexer-commonjs.js
	echo 'define(function(require, exports, module) {' > lexer.js
	cat lexer-commonjs.js | grep -v source >> lexer.js
	echo '});' >> lexer.js

