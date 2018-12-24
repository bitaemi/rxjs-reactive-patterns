import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.css']
})
export class BrowserEventExperimentsComponent implements OnInit {
hoverSelection: HTMLElement;

  constructor() { }

  ngOnInit() {

  this.hoverSelection = document.getElementById('hover');
  this.hoverSelection.addEventListener('mousemove', onMouseMove);
  this.hoverSelection.addEventListener('click', onClick);
  }

  unsubscribeFromEventListener() {
    console.log('Called unsubscribeFromEventListener()');
    this.hoverSelection.removeEventListener('mousemove', onMouseMove);
  }

}

function onMouseMove(ev: MouseEvent) {
    console.log(ev);
}

function onClick(ev: Event) {
  console.log(ev);
}
