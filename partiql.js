// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

let i = 0;

function createFilter(type, left, operator, right){
	return {
		type,
		left,
		operator,
		right
	}
}

function createAssignment(left, operator, right){
	return {
		left,
		operator,
		right
	}
}

function createTable(name, alias, by){
	return {
		name,
		alias,
		by
	}
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "input", "symbols": ["_", "statement", "_"], "postprocess": d => d[1]},
    {"name": "statement$subexpression$1", "symbols": [/[sS]/, /[eE]/, /[lL]/, /[eE]/, /[cC]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "statement$subexpression$2", "symbols": [/[fF]/, /[rR]/, /[oO]/, /[mM]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "statement$ebnf$1", "symbols": ["filters"], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["statement$subexpression$1", "__", "selectors", "__", "statement$subexpression$2", "__", "tables", "statement$ebnf$1"], "postprocess":  d => ({
        	statement: d[0].toUpperCase(),
        	selectors: d[2],
        	tables: d[6],
        	filters: d[7] || []
        }) },
    {"name": "statement$subexpression$3", "symbols": [/[uU]/, /[pP]/, /[dD]/, /[aA]/, /[tT]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "statement$subexpression$4", "symbols": [/[sS]/, /[eE]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "statement$ebnf$2", "symbols": ["filters"], "postprocess": id},
    {"name": "statement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["statement$subexpression$3", "__", "table", "__", "statement$subexpression$4", "__", "setters", "statement$ebnf$2"], "postprocess":  d => ({
        	statement: d[0].toUpperCase(),
        	setters: d[6],
        	tables: [d[2]],
        	filters: d[7] || []
        }) },
    {"name": "variable$ebnf$1", "symbols": [/[a-zA-Z0-9_]/]},
    {"name": "variable$ebnf$1", "symbols": ["variable$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "variable", "symbols": ["variable$ebnf$1"], "postprocess": d => d[0].join('')},
    {"name": "indexable_variable", "symbols": ["variable"], "postprocess": id},
    {"name": "indexable_variable$ebnf$1$subexpression$1", "symbols": [{"literal":"."}, "variable"]},
    {"name": "indexable_variable$ebnf$1", "symbols": ["indexable_variable$ebnf$1$subexpression$1"]},
    {"name": "indexable_variable$ebnf$1$subexpression$2", "symbols": [{"literal":"."}, "variable"]},
    {"name": "indexable_variable$ebnf$1", "symbols": ["indexable_variable$ebnf$1", "indexable_variable$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "indexable_variable", "symbols": ["variable", "indexable_variable$ebnf$1"]},
    {"name": "tables", "symbols": ["table"], "postprocess": d => [d[0]]},
    {"name": "tables", "symbols": ["table", "_", {"literal":","}, "_", "tables"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "table$ebnf$1", "symbols": ["by"], "postprocess": id},
    {"name": "table$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "table", "symbols": ["variable", "table$ebnf$1"], "postprocess": d => createTable(d[0], null, d[1])},
    {"name": "table$ebnf$2", "symbols": ["by"], "postprocess": id},
    {"name": "table$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "table", "symbols": ["variable", "__", "variable", "table$ebnf$2"], "postprocess": d => createTable(d[0], d[2], d[3])},
    {"name": "table$subexpression$1", "symbols": [/[aA]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "table$ebnf$3", "symbols": ["by"], "postprocess": id},
    {"name": "table$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "table", "symbols": ["variable", "__", "table$subexpression$1", "__", "variable", "table$ebnf$3"], "postprocess": d => createTable(d[0], d[4], d[5])},
    {"name": "by$subexpression$1", "symbols": [/[bB]/, /[yY]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "by", "symbols": ["__", "by$subexpression$1", "__", "variable"], "postprocess": d => d[3]},
    {"name": "selectors", "symbols": ["selector"], "postprocess": d => [d[0]]},
    {"name": "selectors", "symbols": ["selector", "_", {"literal":","}, "_", "selectors"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "selector", "symbols": ["indexable_variable"], "postprocess": id},
    {"name": "selector", "symbols": [{"literal":"*"}], "postprocess": id},
    {"name": "setters", "symbols": ["assignment"], "postprocess": d => [d[0]]},
    {"name": "setters", "symbols": ["assignment", "_", {"literal":","}, "_", "setters"], "postprocess": d => [d[0], ...d[4]]},
    {"name": "assignment", "symbols": ["indexable_variable", "__", {"literal":"="}, "__", "value"], "postprocess": d => createAssignment(d[0], d[2], d[4])},
    {"name": "value", "symbols": ["datatype"], "postprocess": id},
    {"name": "value", "symbols": [{"literal":"?"}], "postprocess": d=> `$${i++}`},
    {"name": "filters$subexpression$1", "symbols": [/[wW]/, /[hH]/, /[eE]/, /[rR]/, /[eE]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "filters$ebnf$1", "symbols": []},
    {"name": "filters$ebnf$1", "symbols": ["filters$ebnf$1", "additional_filters"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "filters", "symbols": ["__", "filters$subexpression$1", "__", "filter", "filters$ebnf$1"], "postprocess": d => [createFilter(null,...d[3]), ...d[4]]},
    {"name": "additional_filters$subexpression$1", "symbols": [/[aA]/, /[nN]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "additional_filters", "symbols": ["__", "additional_filters$subexpression$1", "__", "filter"], "postprocess": d => createFilter('AND', ...d[3])},
    {"name": "additional_filters$subexpression$2", "symbols": [/[oO]/, /[rR]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "additional_filters", "symbols": ["__", "additional_filters$subexpression$2", "__", "filter"], "postprocess": d => createFilter('OR', ...d[3])},
    {"name": "filter", "symbols": ["variable", "__", "comparison_operators", "__", "datatype"], "postprocess": d => [ d[0], d[2], d[4] ]},
    {"name": "comparison_operators", "symbols": [{"literal":"="}], "postprocess": id},
    {"name": "comparison_operators", "symbols": [{"literal":">"}], "postprocess": id},
    {"name": "comparison_operators", "symbols": [{"literal":"<"}], "postprocess": id},
    {"name": "comparison_operators$string$1", "symbols": [{"literal":">"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operators", "symbols": ["comparison_operators$string$1"], "postprocess": id},
    {"name": "comparison_operators$string$2", "symbols": [{"literal":"<"}, {"literal":"="}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operators", "symbols": ["comparison_operators$string$2"], "postprocess": id},
    {"name": "comparison_operators$string$3", "symbols": [{"literal":"<"}, {"literal":">"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "comparison_operators", "symbols": ["comparison_operators$string$3"], "postprocess": id},
    {"name": "datatype", "symbols": ["string"], "postprocess": id},
    {"name": "datatype", "symbols": ["number"], "postprocess": id},
    {"name": "datatype", "symbols": ["bool"], "postprocess": id},
    {"name": "datatype", "symbols": ["list"]},
    {"name": "datatype$string$1", "symbols": [{"literal":"n"}, {"literal":"u"}, {"literal":"l"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "datatype", "symbols": ["datatype$string$1"], "postprocess": d => null},
    {"name": "datatype", "symbols": ["timestamp"]},
    {"name": "timestamp", "symbols": [{"literal":"`"}, "date", {"literal":"T"}, {"literal":"`"}], "postprocess": d => new Date(d[1])},
    {"name": "timestamp$ebnf$1", "symbols": ["time"], "postprocess": id},
    {"name": "timestamp$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "timestamp", "symbols": [{"literal":"`"}, "date", {"literal":"T"}, "timestamp$ebnf$1", {"literal":"`"}], "postprocess": d => new Date(d.slice(1, -1).join(''))},
    {"name": "date", "symbols": [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, {"literal":"-"}, /[0-9]/, /[0-9]/, {"literal":"-"}, /[0-9]/, /[0-9]/], "postprocess": d => d.join('')},
    {"name": "time", "symbols": [/[0-9]/, /[0-9]/, {"literal":":"}, /[0-9]/, /[0-9]/, {"literal":":"}, /[0-9]/, /[0-9]/], "postprocess": d => d.join('')},
    {"name": "time", "symbols": ["time", {"literal":"."}, "decimal"], "postprocess": d => d.join('')},
    {"name": "time", "symbols": ["time", {"literal":"."}, "decimal", "timezone"], "postprocess": d => d.join('')},
    {"name": "timezone", "symbols": [{"literal":"Z"}], "postprocess": id},
    {"name": "timezone", "symbols": [/[+-]/, /[0-9]/, /[0-9]/, {"literal":":"}, /[0-9]/, /[0-9]/], "postprocess": d => d.join('')},
    {"name": "string$ebnf$1", "symbols": []},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[a-zA-Z0-9_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": [{"literal":"'"}, "string$ebnf$1", {"literal":"'"}], "postprocess": d => d[1].join('')},
    {"name": "number", "symbols": ["decimal"], "postprocess": id},
    {"name": "number", "symbols": ["float"]},
    {"name": "number", "symbols": ["exponent"]},
    {"name": "decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$1", "symbols": ["decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1"], "postprocess": d => Number(d[0].join(''))},
    {"name": "float$ebnf$1", "symbols": ["decimal"], "postprocess": id},
    {"name": "float$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "float", "symbols": ["decimal", {"literal":"."}, "float$ebnf$1"], "postprocess": d => Number(`${d[0]}.${d[2]}`)},
    {"name": "exponent$ebnf$1$subexpression$1", "symbols": [/[+-]/]},
    {"name": "exponent$ebnf$1", "symbols": ["exponent$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "exponent$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "exponent", "symbols": ["decimal", {"literal":"e"}, "exponent$ebnf$1", "decimal"], "postprocess": d => Number(d.join(''))},
    {"name": "exponent$ebnf$2$subexpression$1", "symbols": [/[+-]/]},
    {"name": "exponent$ebnf$2", "symbols": ["exponent$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "exponent$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "exponent", "symbols": ["float", {"literal":"e"}, "exponent$ebnf$2", "decimal"], "postprocess": d => Number(d.join(''))},
    {"name": "bool$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool", "symbols": ["bool$string$1"]},
    {"name": "bool$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "bool", "symbols": ["bool$string$2"]},
    {"name": "list", "symbols": [{"literal":"["}, "list_items", {"literal":"]"}]},
    {"name": "list", "symbols": [{"literal":"["}, {"literal":"]"}]},
    {"name": "list_items", "symbols": ["datatype"]},
    {"name": "list_items", "symbols": ["datatype", {"literal":","}, "list_items"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[ \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [/[ \t\n]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[ \t\n]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "input"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
