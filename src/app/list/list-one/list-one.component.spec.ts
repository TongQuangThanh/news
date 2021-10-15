/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListOneComponent } from './list-one.component';

describe('ListOneComponent', () => {
  let component: ListOneComponent;
  let fixture: ComponentFixture<ListOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
