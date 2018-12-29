<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [1. Installation and start up](#1-installation-and-start-up)
  - [1.0. Development server](#10-development-server)
  - [1.1. Code scaffolding](#11-code-scaffolding)
  - [1.2. Build](#12-build)
  - [1.3. Running unit tests](#13-running-unit-tests)
  - [1.4. Running end-to-end tests](#14-running-end-to-end-tests)
  - [1.5. Further help](#15-further-help)
- [2. Reactive programming](#2-reactive-programming)
  - [2.1. Reactive Properties of Browser Events](#21-reactive-properties-of-browser-events)
  - [2.2. Relation Between Custom Application Events and Observer Pattern](#22-relation-between-custom-application-events-and-observer-pattern)
  - [2.3. Building an Application Based on a Custom Event Bus](#23-building-an-application-based-on-a-custom-event-bus)
  - [2.4. Global Event Bus (is NOT Scallable in Complexity)](#24-global-event-bus-is-not-scallable-in-complexity)
    - [2.4.1. Implementing a Global Event Bus](#241-implementing-a-global-event-bus)
    - [2.4.2. Broadcast Application Data using the Global Event Bus](#242-broadcast-application-data-using-the-global-event-bus)
    - [2.4.3. Add Support for Different Types of Application Events](#243-add-support-for-different-types-of-application-events)
  - [2.5. An Application Implemented in non-reactive style](#25-an-application-implemented-in-non-reactive-style)
  - [3.1. Asynchronous Apps in Reactive Style](#31-asynchronous-apps-in-reactive-style)
  - [3.2. Fix a timing issue](#32-fix-a-timing-issue)
  - [3.3. Introduce in App a new Reactive Pattern: Centralized Store](#33-introduce-in-app-a-new-reactive-pattern-centralized-store)
  - [3.4. The Store and the Observable, closely related](#34-the-store-and-the-observable-closely-related)
  - [3.5. Using RxJs Library, instead of previously discussed concepts](#35-using-rxjs-library-instead-of-previously-discussed-concepts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Understanding the OBSERVABLE PATTERN is the key for understanding RxJs Library and using the operators to programm in a reactive style.

We install YARN = a better package manager, using npm.

YARN is reliable, fast, secure - guarantees that I can have the exact same dependencies trees as someone has. Also is able to freeze my hall dependencies tree in a deterministic way. Build will complete succesfully due to yarn instalation.

# 1. Installation and start up

- ``npm i -g @angular/cli`` to install Angular Command Line Interface

- by default,the setting for each generated component, in angular.json is: ``"prefix": "app",``

- Run : ``ng new --skip-install rxjs-reactive-patterns`` to generate a simple, clean project structure, without dependencies

- ``npm i yarn -g`` to install yarn globaly

-  ``yarn` after this to quickly install dependencies for this app via YARN

## 1.0. Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 1.1. Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 1.2. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## 1.3. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 1.4. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## 1.5. Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# 2. Reactive programming

## 2.1. Reactive Properties of Browser Events

Observe the similarities between BROWSER EVENTS and reactive programming:


- we can register a listener (subscrieber) to the browser events (streaming of data about events)

- the listener is a function that is called multiple times - invoked by a third party mechanism

- we cannot trigger events on behalf of the browser

```TypeScript
this.hoverSelection = document.getElementById('hover');
  this.hoverSelection.addEventListener('mousemove', ev => {
    console.log(ev);
  });
```
- for example, above, we are not aware of how the internal browser mechanism for handling mouse moves work.

- we have no access to that mechanism and we cannot, for example trigger mouse events on behalf of the

browser which is actually a good thing. This means that if we want to build programs using the BROWSER EVENTS API,

- we need to build them in a way that we simply declare via certain functions and listener functions, how should we REACT to the arrival of the new event.

- by moving the callback to a separate function we can unsubribe from the sequence of events (the stream of mouse movement events)

```TypeScript
hoverSelection: HTMLElement;

// ..
  ngOnInit() {

  this.hoverSelection = document.getElementById('hover');
  this.hoverSelection.addEventListener('mousemove', onMouseMove);
  }

  unsubscribeFromEventListener() {
    console.log('Called unsubscribeFromEventListener()');
    this.hoverSelection.removeEventListener('mousemove', onMouseMove);
  }

}

function onMouseMove(ev: MouseEvent) {
    console.log(ev);
}
```
- the ability to subscribe and unsubscribe to streams of data is another similarity

BROWSER DOM EVENTS MECHANISM is a general way to handle asynchronous data and we use this general and powerfull concept also in reactive programming.

## 2.2. Relation Between Custom Application Events and Observer Pattern

A PATTERN =  A RECEPIE for how to build software:

![Observer Pattern Diagram](observerPattern.jpg)

Diagram above describes the receipe for implementing application events.

Is about LOOSE COUPLING between different parts of the application.

The Observer is an interface with ``notify`` method that provides new data.

**Is closely related to Browser Events mechanism.**

In the system there are multiple Observers that are observing on the SAME SUBJECT.

An observer wants to receive a notification if a SUBJECT has a a change in internal state,

so is going to register itself on the SUBJECT.

The subject will contain internally a COLLECTION OF REGISTERED OBSERVERS.

Whenever the SUBJECT has a change of internal state is going to notify the each OBSERVER from obeserverCollection, via ``notifyObservers``


Analogies:  Subject         <---------> hoverSelection
            
            registerEvent   <--------> addEventListener

            unregisterEvent <---------> removeEventListener

            collection of observers <---------> registered callbacks for onMouseMove, onClick methods

            notify          <----------> call the callbacks of onMouseMove  directly
             
            PUBLIC notifyObservers <---------> ! NO ANALOGIE - THIS IS A MAJOR DIFFERENCE -

            We are NOT ABLE TO TRIGGER EVENTS ON BEHALF OF THE BROWSER (the mouse movement, for example
            
            is an internal implementation of the Browser, private!

with the Observer Pattern, unlike the case of Browser Events any of the Observers can

trigger the emission of new values for all the other registered Observers.

This is unlike the case of browser callbacks -  we can only register callbacks and get back data.

```TypeScript
// similar to registering the onMouseMove and onClick in Subject's collection of Observers:
  this.hoverSelection.addEventListener('mousemove', onMouseMove);
  this.hoverSelection.addEventListener('click', onClick);
```

## 2.3. Building an Application Based on a Custom Event Bus

``git checkout -b custom-events`` and start implementing inside this new branch

``ng g c event-bus-experiments``

``ng g c lessons-list``

``ng g c lessons-counter``

Event Bus is an Observer interface with a notify method that gets some payload data (as parameter).

The EventBus class is not visible in other components, as we export only an instance of it:

``export const globalEventBus = new EventBus();``

## 2.4. Global Event Bus (is NOT Scallable in Complexity)

 Global Event Bus = is a component communication mechanism (that allows components to interact with each other), without @Input and @Output parameters, but is NOT Scallable in Complexity -

 that's why we USE Reactive Programming INSTEAD.

### 2.4.1. Implementing a Global Event Bus

Install Lodash Library and its type definitons to have the autocomplete available:

``yarn add lodash @types/lodash``

use it: ``import * as _ from 'loadash'``

``_.remove`` method mutates the array that we pass to it by appling the second parameter = a function, to it.

### 2.4.2. Broadcast Application Data using the Global Event Bus

Whenever component is initialized we are going to use the constantant ``globalEventBus``, instance of ``EventBus`` to notify all the subscribed Observers - in this case, we broadcast a list of lessons, to any observers that will need this data.

``globalEventBus.notifyObservers(testLessons);``

EventBusExperiments component, only knows about the ``globalEventBus``.

``LessonsListComponent implements Observer`` otherwise, if it implements the OnInit, the notify wont be called.

### 2.4.3. Add Support for Different Types of Application Events

 - add the `eventType` parameter to the EventBus methods;

 - examples of globalEventTypes: LESSONS_LIST_AVAILABLE, ADD_NEW_LESSON

 - change the collection of registered observers to be a map:

  ``{[key: string]: Observer[]} = {}``
  
  - add a private method to have a list of observersPerEventType

  - filter the collection of registered observers by event type

  - use a copy of testLessons array, instead of the entier testLessons:
  
  ``globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, testLessons.slice(0));``
   
## 2.5. An Application Implemented in non-reactive style

``git checkout -b custom-events-non-scalable``

  - more than one component modifies the same data;

  -there are multiple components in the application that are keeping a copy of ``Lessons[]``

  - tight coupling between LessonsComponent and the main component

  - in the LessonsComponent we have a different array than the one from 
  
  EventBusExperimentsComponent,
  
  and that's why the operations implemented at the level of LessonsComponent won't propagate to the level of EventBusExperimentsComponent

 - define an inline Observer to add as second parameter to register an Observer of type ADD_NEW_LESSON EVENT:

 ```TypeScript
  globalEventBus.registerObserver(ADD_NEW_LESSON, {
      notify: lessonText => {
        this.lessons.push({
          id: Math.random(),
          description: lessonText
        });
      }
    });
```
- shared data and no clear owner => issues whith DATA ENCAPSULATION

DO NOT USE SUCH IMPLEMENTATION, LIKE THE ONE FROM `custom-events-non-scalable` branch!!!

# 3. OBSERVABLE PATTERN - The Key Concept of Reactive Programming

The main issue with OBSERVER Pattern, as seen above, is that there is no clear separation between registering to get data(`registerObserver`) and the ability to emit that same data(`notifyObservers`) because each observer has access to the SUBJECT- but what we need is that only certain part of the application  should be able to emit certain events!

Changing the OBSERVER into OBSERVABLE to separate the ability to register from the one to observe:

notify           ------> next
notifyObservers  ------> next
registerObserver ------> subscribe
unregisterObserver -----> unsubscribe

The SUBJECT is still comparable to an Event Bus (magistrala):

```TypeScript
export interface Observer {
    next(data: any);
}

export interface Observable {
    subscribe(obs: Observer);
    unsubscribe(obs: Observer);
}
interface Subject extends Observer, Observable {
    next(data: any);
}
```

## 3.1. Asynchronous Apps in Reactive Style

Make maintainable apps without the use of MapGenerators and async.

We simply subscribe to the data and we get notified when the data is available in a transparent way.

- create a copy of the newList and store it at the level of lessons:

```TypeScript
export function initializeLessonsList(newList: Lesson[]) {
    lessons = _.cloneDeep(newList);
}
```
the lessonList$ used all over the app can subscribe to data, but doesn't have access to other different info about the data:

``export let lessonsList$: Observable;``

```TypeScript
export let lessonsList$: Observable = {
    subscribe: obs => lessonsListSubject.subscribe(obs),
    unsubscribe: obs => lessonsListSubject.unsubscribe(obs)
};
```
The `next` API is called on a subject, only at initialization:

```TypeScript
export function initializeLessonsList(newList: Lesson[]) {
    lessons = _.cloneDeep(newList);
    lessonsListSubject.next(lessons);
}
```
and is not accesible over different components!;

## 3.2. Fix a timing issue

We add ``obs.next(lessons);`` to the Observable object, so that any early subscribers will receive an empty array, immediatly and the late subscriber will receive the list of lessons. Otherwise the implementation works only when subscribing in the constructor, and not later on( for example in ngOnInit .., when the late subscriber calls subscribe after the list has initialized):

```TypeScript
export let lessonsList$: Observable = {
    subscribe: obs => {
        lessonsListSubject.subscribe(obs);
        obs.next(lessons);
    },
    unsubscribe: obs => lessonsListSubject.unsubscribe(obs)
};
```
The consummers of the data (lessons-list component that lists lessons, counter component that lists the count of lessons ...) only have access to the Observable(`LessonsList$`), not to the subject.

## 3.3. Introduce in App a new Reactive Pattern: Centralized Store

Use a second pattern in this app, to centralize data in a single place in the app and thus solve the ownership issue;

- after this, data can be modified only in one place of the app:

```TypeScript
class DataStore {
    private lessons: Lesson[] = [];
    private lessonsListSubject = new SubjectImplementation();
    public  lessonsList$: Observable = {
        subscribe: obs => {
            this.lessonsListSubject.subscribe(obs);
            obs.next(this.lessons);
        },
        unsubscribe: obs => this.lessonsListSubject.unsubscribe(obs)
    };
    initializeLessonsList(newList: Lesson[]) {
        this.lessons = _.cloneDeep(newList);
        this.lessonsListSubject.next(this.lessons);
    }
    addLesson(newLesson: Lesson) {
        this.lessons.push(_.cloneDeep(newLesson));
        this.lessonsListSubject.next(this.lessons);
    }
}

export const store = new DataStore();
```
DATA is ENCAPSULATED inside the STORE.

Because the lessons data from the store is not immutable we use:

```TypeScript
    broadcast() {
        this.lessonsListSubject.next(_.cloneDeep(this.lessons));
    }
```    

and we have to make sure that no methods that mutate the data exist outside the STORE.

Data is owened be the centralized STORE.

## 3.4. The Store and the Observable, closely related

We transform the Store(`DataStore`) from having an Observable property (`lessonsList$`),
into beeing an Observable.

## 3.5. Using RxJs Library, instead of previously discussed concepts

``git checkout -b introduce-rxjs``

Everything about the lib evolves around Observable, Subject, Obser and the other concepts discussed.

RxJs is a toolkit that allows us to build ASYNCHRONOUS programms around the Observable Pattern.

Angular CLI already added RxJs to app's package.json.

Whenever we create an Observable in the app we need to specify what kind of data is the Observable emitting: `` Observable<Lesson[]>`` - in this case, a list of lessons.

The Observable is directly connected to the Subject. 

```TypeScript
    private lessons: Lesson[] = [];
    private lessonsListSubject = new Subject();
    public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();
```
???

So the lessons list observable will emit the values that are broadcasted via this subject but the subject is kept private.

``BehaviorSubject`` - is a Subject Implementantion that remembers previously emitted values.

- Reactive Style = Build  the app by composing separate modules:

- separate components, separate services interact with each other in a decoupled way, by emitting data.

- each module reacts to the arrival of new data,  but it does not know the seaquences of operations that occur in other modules.

- whenever some part of the app needs data, it subscribes to it and provides an Observer

- the Observer knows how that particular part of the app will react to the arrival of new data

- the Subject is a way of sharing an execution of an Observable

# 4. Stateless Observable Services

We use Google's FireBase for getting data, also the AngularFireBase library is Observable based.

Starting from an imperative style implementation, and refactoring into a reactive implementation.


