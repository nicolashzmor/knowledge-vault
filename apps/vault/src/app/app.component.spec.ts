import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockProvider} from "ng-mocks";
import {Store} from "@ngxs/store";
import {of} from "rxjs";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MockProvider(Store, {dispatch: () => of(false)})],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
