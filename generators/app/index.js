'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the ' + chalk.red('Yo-Tute') + ' generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'appName',
            message: 'What should I name the application?'
        }];

        this.prompt(prompts, function (props) {
            this.props = props;
            this.props.packageName = s(this.props.appName).humanize().slugify().value();
            this.props.appName = s(this.props.appName + ' app').camelize().value();
            // To access props later use this.props.someOption;
            done(); //go on to writing phase
        }.bind(this));
    },

    writing: {
        app: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {
                    'packageName': this.props.packageName
                }
            );

            this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('bower.json'),
                {
                    'packageName': this.props.packageName
                }
            );

            this.fs.copyTpl(
                this.templatePath('_index.ejs'),
                this.destinationPath('index.ejs'),
                {
                    'angularAppName': this.props.appName,
                    'packageName': this.props.packageName
                }
            );

            this.fs.copyTpl(
                this.templatePath('app/_app.js'),
                this.destinationPath('app/app.js'),
                {
                    'angularAppName': this.props.appName
                }
            );

            this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('gulpfile.js'),
                {}
            );

            this.directory(
                this.templatePath('_gulp-tasks'),
                this.destinationPath('gulp-tasks')
            );
        },

        projectfiles: function () {
            this.fs.copy(
                this.templatePath('jshintrc'),
                this.destinationPath('.jshintrc')
            );
        }
    }

    // install: function () {
    //     this.installDependencies();
    // }
});
