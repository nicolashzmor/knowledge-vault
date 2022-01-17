import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicRouterOutletComponent } from './dynamic-router-outlet.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('DynamicRouterOutletComponent', () => {
  let component: DynamicRouterOutletComponent;
  let fixture: ComponentFixture<DynamicRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DynamicRouterOutletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
