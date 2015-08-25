# generator-tute-gulp

> [Yeoman](http://yeoman.io) generator

This generator scaffolds out an optimized gulp build process. While the gulp tasks could be easily adapted to different technologies, it's most easily used with:
- angular
- SASS
- bower
- single page application architecture where the all front-end assets are entirely static

Some included goodies:
- Gulp errors throw an OS notification via node-notifer and don't kill the entire gulp process.
- Javascript pipeline include ng-annotate and babel.
- Doing the stage or prod build will produce assets with hashes in the filename via gulp-rev. Those file names are then dynamically inserted into the index.html template via EJS.
- Node dev server that properly 404s via spa-server and has flexibility to add middleware.
- Live reloading.
- Handy-dandy gulp tasks


## Installation

```bash
npm install -g yo
```

To install generator-tute-gulp from npm, run:

```bash
npm install -g generator-tute-gulp
```

Finally, initiate the generator at your current directory:

```bash
yo tute-gulp
```


## License

MIT
