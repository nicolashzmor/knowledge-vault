import {ComponentFixture, TestBed} from '@angular/core/testing';

import {VaultPageComponent} from './vault-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MockProvider} from "ng-mocks";
import {DynamicRouterService} from "../../features/dynamic-router/dynamic-router.service";

describe('VaultPageComponent', () => {
  let component: VaultPageComponent;
  let fixture: ComponentFixture<VaultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [MockProvider(DynamicRouterService)],
      declarations: [VaultPageComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
