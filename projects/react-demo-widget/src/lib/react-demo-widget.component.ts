import { AfterViewInit, Component, Input, OnChanges} from '@angular/core';
import { FetchClient } from '@c8y/client';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FetchDeviceDetails } from 'react-library';

@Component({
  selector: 'cumulocity-react-demo-widget',
  template: '<div [id]="rootId"></div>',
  styleUrls: ['./react-demo-widget.component.css']
})
export class ReactDemoWidgetComponent implements OnChanges, AfterViewInit {

  @Input() config;
    public rootId = 'fetch-device-details';
    private hasViewLoaded = false;

    constructor(
      public fetchClient: FetchClient) {
      }
  
    public ngOnChanges() {
      this.renderComponent();
    }
  
    public ngAfterViewInit() {
      this.hasViewLoaded = true;
      this.renderComponent();
    }
  
    private renderComponent() {
      if (!this.hasViewLoaded) {
        return;
      }
      //   npm i react-query@3.19.6
      // npm i react@17.0.2 
      // npm i react-dom@17.0.2  

      ReactDOM.render(
        React.createElement(FetchDeviceDetails,{'fetchClient': this.fetchClient as any, 'id':'2170'}),
        document.getElementById(this.rootId)
      );
    }

}
