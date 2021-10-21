import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactDemoWidgetComponent } from './react-demo-widget.component';

describe('ReactDemoWidgetComponent', () => {
  let component: ReactDemoWidgetComponent;
  let fixture: ComponentFixture<ReactDemoWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactDemoWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactDemoWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
