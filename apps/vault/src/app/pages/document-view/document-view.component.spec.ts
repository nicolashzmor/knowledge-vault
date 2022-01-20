import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentViewComponent} from './document-view.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MockProvider} from "ng-mocks";
import {Store} from "@ngxs/store";
import {MarkdownReaderService} from "../../features/markdown-reader/markdown-reader.service";
import {DomSanitizer} from "@angular/platform-browser";
import {of} from "rxjs";

describe('DocumentViewComponent', () => {
  let component: DocumentViewComponent;
  let fixture: ComponentFixture<DocumentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        MockProvider(Store, {select: () => of(true)}),
        MockProvider(MarkdownReaderService),
        MockProvider(DomSanitizer)
      ],
      declarations: [DocumentViewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
