var esprima = require("esprima");
var options = {tokens: true, tolerant: true, loc: true, range: true };
var fs = require("fs");

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["analysis.js"];
	}

	console.log(args);
	var filePath = args[0];

	complexity(filePath);

	// Report
	for( var node in builders )
	{
		var builder = builders[node];
		builder.report();
	}

}

var builders = {};

// Represent a reusable "class" following the Builder pattern.
function FunctionBuilder()
{
	this.StartLine = 0;
	this.FunctionName = "";
	// The number of parameters for functions
	this.ParameterCount = 0;
	// Number of if statements/loops + 1
	this.SimpleCyclomaticComplexity = 0;
	// The max number of conditions if one decision statement.
	this.MaxConditions      = 0;
	// Whether the method is longer than 80 lines of code.
	this.LongMethod = false;

	this.report = function()
	{
		console.log(
		   (
		   	"{0}(): {1}\n" +
		   	"============\n" +
			   "SimpleCyclomaticComplexity: {2}\t" +
				"MaxConditions: {3}\t" +
				"LongMethod: {4}\t" +
				"Parameters: {5}\n\n"
			)
			.format(this.FunctionName, this.StartLine,
				     this.SimpleCyclomaticComplexity,
			        this.MaxConditions, this.LongMethod, this.ParameterCount)
		);
	}
};


// A builder for storing file level information.
function FileBuilder()
{
	this.FileName = "";
	// Number of strings in a file.
	this.Strings = 0;
	// Number of imports in a file.
	this.ImportCount = 0;

	this.report = function()
	{
		console.log (
			( "{0}\n" +
			  "~~~~~~~~~~~~\n"+
			  "ImportCount {1}\t" +
			  "Strings {2}\n"
			).format( this.FileName, this.ImportCount, this.Strings ));
	}
}

// A function following the Visitor pattern.
// Annotates nodes with parent objects.
function traverseWithParents(object, visitor)
{
    var key, child;

    visitor.call(null, object);

    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null && key != 'parent') 
            {
            	child.parent = object;
					traverseWithParents(child, visitor);
            }
        }
    }
}

function complexity(filePath)
{
	var buf = fs.readFileSync(filePath, "utf8");
	var ast = esprima.parse(buf, options);

	// A file level-builder:
	var fileBuilder = new FileBuilder();
	fileBuilder.FileName = filePath;
	fileBuilder.ImportCount = 0;
	builders[filePath] = fileBuilder;

	// Traverse program with a function visitor.
	traverseWithParents(ast, function (node) 
	{
		if (node.type === 'FunctionDeclaration' || (node.type === 'ExpressionStatement' && node.expression.right && node.expression.right.type === 'FunctionExpression') ) 
		{
			var builder = new FunctionBuilder();

			builder.StartLine    = node.loc.start.line;
			
			if (node.type === 'FunctionDeclaration') {
				builder.FunctionName = functionName(node);
			} else {
				if (node.expression.left.name != undefined) {
					builder.FunctionName = node.expression.left.name;
				} else if (node.expression.left.property != undefined) {
					builder.FunctionName = node.expression.left.property.name;
				}
				node = node.expression.right;
			}
			
			builder.ParameterCount = node.params.length;
			builder.EndLine = node.loc.end.line;

			if (builder.EndLine - builder.StartLine > 75)
			{
				builder.LongMethod = true;
			}
			
			
			traverseWithParents(node, function(child)
			{
				if( isDecision(child) )
				{
					builder.SimpleCyclomaticComplexity++;

					if (child.type == 'IfStatement') {
						var conditions = 1;
						traverseWithParents(child, function(child2) {
							if (child2.type == 'LogicalExpression') {
								conditions++;
							}
							if (conditions > builder.MaxConditions)
								builder.MaxConditions = conditions;
						});
						
					}
				}
			});

			builder.SimpleCyclomaticComplexity++;


			builders[builder.FunctionName] = builder;
		}

		if( node.type == 'Literal' && typeof(node.value == 'string' ) )
			fileBuilder.Strings++;

		if( node.type == 'Identifier' && node.name == 'require' && node.parent.type == 'CallExpression' )
			fileBuilder.ImportCount++;

	
	});

}

// Helper function for checking if a node is a "decision type node"
function isDecision(node)
{
	if( node.type == 'IfStatement' || node.type == 'ForStatement' || node.type == 'WhileStatement' ||
		 node.type == 'ForInStatement' || node.type == 'DoWhileStatement')
	{
		return true;
	}
	return false;
}

// Helper function for printing out function name.
function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "anon function @" + node.loc.start.line;
}

// Helper function for allowing parameterized formatting of strings.
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();

exports.main = main;