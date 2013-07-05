var exec = require('child_process').exec;
var fs = require('fs');

function renderEquation( equation, callback ) {
    latex_file = '\\documentclass{article}\\usepackage[active,tightpage]{preview}\\setlength\\PreviewBorder{5pt}\\PreviewEnvironment{preview}\\begin{document}\\begin{preview}$' + equation + '$\\end{preview}\\end{document}';

    fs.writeFileSync('equation.tex', latex_file);

    exec('pdflatex equation.tex',
	 function (error, stdout, stderr) {
	     if (error == null) {
		 exec('mudraw -w 640 -o equation.png equation.pdf',
		      function (error, stdout, stderr) {
			  if (error == null) {
			      var data = fs.readFileSync('equation.png');
			      callback( error, data );
			  } else
			      callback( error, null );
		      });
	     } else {
		 callback( error, null );
	     }
	 });
    
    return;
};

module.exports.renderEquation = renderEquation;
