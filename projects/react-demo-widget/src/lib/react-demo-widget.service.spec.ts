import { TestBed } from '@angular/core/testing';

import { ReactDemoWidgetService } from './react-demo-widget.service';

describe('ReactDemoWidgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReactDemoWidgetService = TestBed.get(ReactDemoWidgetService);
    expect(service).toBeTruthy();
  });
});
