<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [RxJs - reactive coding style outside a framework](#rxjs---reactive-coding-style-outside-a-framework)
  - [Environment setup](#environment-setup)
    - [Gulp Task Runner Configuration](#gulp-task-runner-configuration)
  - [RxJs - implementation examples outside a framework](#rxjs---implementation-examples-outside-a-framework)
    - [Autocomplete/Search Input Box NICE reactive implementation](#autocompletesearch-input-box-nice-reactive-implementation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# RxJs - reactive coding style outside a framework

## Environment setup

Make sure you have node installed.
```Bash
# To get this project ready, type the following commands from a command line in this directory:
npm install
npm install gulpjs/gulp-cli#4.0 -g # install gulp globally, if it is also installed inside the directory where you run your gulp command, it will take the local gulp version
npm install live-server -g

# To watch and build our server and client scripts, run:
gulp watch:scripts

# ALWAYS HAVE THAT TASK RUNNING WHEN DEVELOPING

# To launch the server for client-side examples:
live-server public

# To launch a server-side example in node:
npm run nodemon build/example_xx # Where "xx" is example number.

npm run nodemon here_of_file_you_have_on_server_dir

# hit Ctrl + S to restart the server whenever needed
# Ctrl + C to stop the server

```
### Gulp Task Runner Configuration


```JavaScript
"use strict";

var gulp = require("gulp"),
	$ = require("gulp-load-plugins")(),
	source = require("vinyl-source-stream"),
	browserify = require("browserify"),
	watchify = require("watchify"),
	babelify = require("babelify"),
	path = require("path"),
	fs = require("fs");
	
gulp.task("scripts:server", () => {
	return gulp.src("./src-server/**/*.js")
		.pipe($.cached("server"))
		.pipe($.babel())
		.pipe(gulp.dest("./build"));
});

gulp.task("watch:scripts:server", gulp.series(
	"scripts:server",
	() => gulp.watch("./src-server/**/*.js", gulp.series("scripts:server"))));

gulp.task("watch:scripts:client", () => {
	const files = fs.readdirSync("./src-client");
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		if (path.extname(file) !== ".js")
			continue;
			
		initBundlerWatch(path.join("src-client", file));
	}
	
	return gulp.watch("./src-client/**/*.js")
		.on("change", initBundlerWatch);
});

gulp.task("watch:scripts", gulp.parallel(
	"watch:scripts:client",
	"watch:scripts:server"))

let bundlers = {};
function initBundlerWatch(file) {
	if (bundlers.hasOwnProperty(file))
		return;
		
	const bundler = createBundler(file);
	bundlers[file] = bundler;
	
	const watcher = watchify(bundler);
	const filename = path.basename(file);
	
	function bundle() {
		return bundler
			.bundle()
			.on("error", error => console.error(error))
			.pipe(source(filename))
			.pipe(gulp.dest("./public/build"));
	}
	
	watcher.on("update", bundle);
	watcher.on("time", time => console.log(`Built client in ${time}ms`));
	
	bundle();
}

function createBundler(file) {
	const bundler = browserify(file);
	bundler.transform(babelify);
	return bundler;
}
```

## RxJs - implementation examples outside a framework

### Autocomplete/Search Input Box NICE reactive implementation

```JavaScript
import $ from "jquery";
import Rx from "rxjs/Rx";

const $title = $("#title");
const $results = $("#results");

// now use the RxJs Operators to process streams of keyboard events
Rx.Observable.fromEvents($title, "keyup") // capture the keyup events in an Obsevable stream of data Object
.map(e => e.target.value) // get the user input value
// now transform the initial Observable stream of data into the stream of data that doesnt allow new
// values identical with the last value received 
.distinctUntilChanged() // this RxJs operator will only produce a value if that value has changed from the previous value
.debounceTime(500) // wait 5ms until producing a new result from the incoming stream of data
// switch to a new Observable and cancel the previous stream of data if a new query is received before the  hall result comes in
// .mergeMap(query => getItems(query)) but because we do now what to get any results until the final query comes in - to avoid the ugly case when user types something and it gets a reversed order for the query results caused by a race condition
.switchMap(getItems) // we apply getItems fc. to each element resulted after appling the switchMap operator
// lastly, get the values from this last, fully processed stream of data
.subscribe(items => {
    $results.empty();
    $results.append(items.map(i => $('<li />').text(i)));
});

// Just to show case - simulate some requests
function getItems(title) {
    console.log(`Quering ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, "Item 2", `Another ${Math.random()}`]);
        }, 500 +(Math.random()*5000));

    })
}
```
