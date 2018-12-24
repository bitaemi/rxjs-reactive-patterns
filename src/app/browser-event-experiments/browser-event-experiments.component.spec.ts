import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserEventExperimentsComponent } from './browser-event-experiments.component';

describe('BrowserEventExperimentsComponent', () => {
  let component: BrowserEventExperimentsComponent;
  let fixture: ComponentFixture<BrowserEventExperimentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowserEventExperimentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserEventExperimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
