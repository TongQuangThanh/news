/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GroupOneComponent } from './group-one.component';

describe('ListOneComponent', () => {
  let component: GroupOneComponent;
  let fixture: ComponentFixture<GroupOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
