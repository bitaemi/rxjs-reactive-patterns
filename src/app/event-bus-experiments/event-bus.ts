import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'LESSONS_LIST_AVAILABLE';
export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
    notify(data: any);
}

interface Subject {
    registerObserver(eventType: string, obs: Observer);
    unregisterObserver(eventType: string, obs: Observer);
    notifyObservers(eventType: string, data: any);
}

class EventBus implements Subject {

    private  collectionOfRegisteredObservers: {[key: string]: Observer[]} = {};

    registerObserver(eventType: string, obs: Observer) {
        this.obsersPerEventType(eventType).push(obs);
    }
    unregisterObserver(eventType: string, obs: Observer) {
        _.remove(this.obsersPerEventType(eventType), el => el === obs);
    }
    notifyObservers(eventType: string, data: any) {
        this.obsersPerEventType(eventType).forEach(obs => obs.notify(data));
    }

    private obsersPerEventType(eventType: string): Observer[] {
        const observersPerType = this.collectionOfRegisteredObservers[eventType];
        if (!observersPerType) {
            this.collectionOfRegisteredObservers[eventType] = [];
        }
        return this.collectionOfRegisteredObservers[eventType];
    }
}

export const globalEventBus = new EventBus();
