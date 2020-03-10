input -> _ statement _ {% d => d[1] %}

@{%
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
%}

statement 
	-> "SELECT"i __ selectors __ "FROM"i __ tables filters:? {% d => ({
		statement: d[0].toUpperCase(),
		selectors: d[2],
		tables: d[6],
		filters: d[7] || []
	}) %}
	| "UPDATE"i __ table __ "SET"i __ setters filters:? {% d => ({
		statement: d[0].toUpperCase(),
		setters: d[6],
		tables: [d[2]],
		filters: d[7] || []
	}) %}
	
variable -> [a-zA-Z0-9_]:+ {% d => d[0].join('') %}
indexable_variable
	-> variable {% id %}
	| variable ("." variable):+ 

# Table
tables 
	-> table {% d => [d[0]] %}
	| table _ "," _ tables {% d => [d[0], ...d[4]] %}

table
	-> variable by:? {% d => createTable(d[0], null, d[1]) %}
	| variable __ variable by:? {% d => createTable(d[0], d[2], d[3]) %}
	| variable __ "AS"i __ variable by:? {% d => createTable(d[0], d[4], d[5])  %}

by -> __ "BY"i __ variable {% d => d[3] %}

# Select
selectors
	-> selector {% d => [d[0]] %}
	| selector _ "," _ selectors {% d => [d[0], ...d[4]] %}

selector
	-> indexable_variable {% id %}
	| "*" {% id %}

# Update
setters
	-> assignment {% d => [d[0]] %}
	| assignment _ "," _ setters {% d => [d[0], ...d[4]] %}

assignment -> indexable_variable __ "=" __ value {% d => createAssignment(d[0], d[2], d[4]) %}
value 
	-> datatype {% id %}
	| "?" {% d=> `$${i++}` %}

# Filter
filters -> __ "WHERE"i __ filter additional_filters:* {% d => [createFilter(null,...d[3]), ...d[4]] %}

additional_filters
	-> __ "AND"i __ filter{% d => createFilter('AND', ...d[3]) %}
	| __ "OR"i __ filter {% d => createFilter('OR', ...d[3]) %}

filter -> variable __ comparison_operators __ datatype {% d => [ d[0], d[2], d[4] ] %}

comparison_operators
	-> "=" {% id %}
	| ">" {% id %}
	| "<" {% id %}
	| ">=" {% id %}
	| "<=" {% id %}
	| "<>" {% id %}


# DATA TYPES
# ----------
datatype 
	-> string {% id %}
	| number {% id %}
	| bool {% id %}
	| list
	| "null" {% d => null %}
	| timestamp

# Timestamp
timestamp 
	-> "`" date "T" "`" {% d => new Date(d[1]) %}
	| "`" date "T" time:? "`"  {% d => new Date(d.slice(1, -1).join('')) %}
date -> [0-9] [0-9] [0-9] [0-9] "-" [0-9] [0-9] "-" [0-9] [0-9] {% d => d.join('') %}
time
	-> [0-9] [0-9] ":" [0-9] [0-9] ":" [0-9] [0-9] {% d => d.join('') %}
	| time "." decimal {% d => d.join('') %}
	| time "." decimal timezone {% d => d.join('') %}
timezone 
	-> "Z" {% id %}
	| [+-] [0-9] [0-9] ":" [0-9] [0-9] {% d => d.join('') %}

# String
string -> "'" [a-zA-Z0-9_]:* "'" {% d => d[1].join('') %}

# Number
number
	-> decimal {% id %}
	| float
	| exponent

decimal -> [0-9]:+ {% d => Number(d[0].join('')) %}
float -> decimal "." decimal:? {% d => Number(`${d[0]}.${d[2]}`) %}
exponent # 2e0, 3.1e-4
	-> decimal "e" ([+-]):? decimal {% d => Number(d.join('')) %}
	| float "e" ([+-]):? decimal {% d => Number(d.join('')) %}

# Boolean
bool 
	-> "true"
	| "false"

# List
list 
	-> "[" list_items "]"
	| "[" "]"

list_items
	-> datatype
	| datatype "," list_items

# EXTRAS
# ------
_ -> [ \t\n]:*
__ -> [ \t\n]:+

