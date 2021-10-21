import { NgModule } from '@angular/core';
import { HOOK_COMPONENTS } from '@c8y/ngx-components';
import { ReactDemoWidgetComponent } from './react-demo-widget.component';
import { ReactDemoWidgetConfig } from './react-demo-widget.config';



@NgModule({
  declarations: [ReactDemoWidgetComponent,ReactDemoWidgetConfig],
  imports: [
  ],
  entryComponents: [ReactDemoWidgetComponent, ReactDemoWidgetConfig],
  providers: [
    {
    provide:  HOOK_COMPONENTS,
        multi: true,
        useValue: {
            id: 'react-demo-widget',
            label: 'Cumulocity React Demo Widget',
            description: 'This is my first cumulocity react demo widget',
            component: ReactDemoWidgetComponent,
            configComponent: ReactDemoWidgetConfig,
            data : {
                ng1 : {
                    options: { noDeviceTarget: false,
                    noNewWidgets: false,
                    deviceTargetNotRequired: false,
                    groupsSelectable: true
                    },
                }
            }
        }
    }],
  exports: [ReactDemoWidgetComponent, ReactDemoWidgetConfig]
})
export class ReactDemoWidgetModule { }
