var webpack = require('webpack');
var dirs = require('./directories');
var base = require('./base');

base.entry = {
	bundle: [
		dirs.example+"index.js"
	]
}

base.module.loaders[0].loaders = [
	'react-hot'
//,	'flowcheck'
,	'babel'
]
base.output.publicPath = 'http://localhost:8080/';

module.exports = base;
