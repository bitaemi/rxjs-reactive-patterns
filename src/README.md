<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Environment setup for RxJs in Angular](#environment-setup-for-rxjs-in-angular)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Environment setup for RxJs in Angular
- ``npm i -g @angular/cli`` to install Angular Command Line Interface

- by default,the setting for each generated component, in angular.json is: ``"prefix": "app",``

- Run : ``ng new --skip-install rxjs-reactive-patterns`` to generate a simple, clean project structure, without dependencies

- ``npm i yarn -g`` to install yarn globally

-  `yarn` after this to quickly install dependencies for this app via YARN

- restart your IDE if you're using it's terminal, to refresh project content

1.0. Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

1.1. Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

1.2. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

1.3. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

1.4. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

1.5. Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

We install YARN = a better package manager, using npm.

YARN is reliable, fast, secure - guarantees that I can have the exact same dependencies tree as some team member has. Also is able to freeze my hall dependencies tree in a deterministic way. Build will complete succesfully due to yarn instalation.