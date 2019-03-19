# Ben's Gulp Template

A modification of [this template](https://github.com/philsinatra/IDM-T380/tree/master/examples/05-build_systems).

### Features
- js linting (fixes basic syntax automatically)
- es6 & sass compilation to vanilla js & css
- file concatenation to main.js and style.css
- js & css minification
- sourcemaps

### Usage

1. Navigate to top of project directory in terminal
1. Run:
```
npm install
```

3. Then:
```
gulp
```
That's it.
Keep that terminal window open and Gulp will run appropriate functions upon saving changes in any files matching:
```
./src/js/**/*.js
./src/index.html
./src/style/*.+(scss|sass)
```
Alternatively, you may individually compile files respectively, using:
```
gulp js
gulp html
gulp css
```

### File Structure

```
gulp-template/
│   README.md
│   gulpfile.js
│   etc...
│
└───build
│   │   index.html
│   │
│   └───assets
│       └───fonts
│       │
│   └───css
│       │   main.min.css
│       │
│   └───js
│       │   main.min.js
│       │
│   
└───src
|   │   index.html
│   │
│   └───js
|       │   init.js
|       │   main.js
│       │
│   └───style
|       │   _fonts.scss
|       │   _reset.scss
|       │   style.scss

```
