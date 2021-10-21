import {Component, Input} from '@angular/core';

@Component({
    selector: 'lib-config-demo-widget',
    templateUrl: './react-demo-widget.config.html',
    styleUrls: ['./react-demo-widget.config.css']
})
export class ReactDemoWidgetConfig {
    @Input() config: any = {};
}