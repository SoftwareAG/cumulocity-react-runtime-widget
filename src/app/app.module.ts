import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicAuth, Client, FetchClient, InventoryService } from '@c8y/client';
import { ReactDemoWidgetModule } from 'projects/react-demo-widget/src/lib/react-demo-widget.module';
import { CommonModule } from '@angular/common';
const auth = new BasicAuth({
  user: 'userName',
  password: 'password',
  tenant: 'tenantId'
  });

  const client = new Client(auth, 'http://localhost:4200');
client.setAuth(auth);
const fetchClient = client.core;
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactDemoWidgetModule,
    CommonModule

  ],
  providers: [
    {
    provide: InventoryService,
    useFactory: () => {
        return new InventoryService(fetchClient);
        }
    },
    { provide: FetchClient, useValue: client.core }],
  bootstrap: [AppComponent]
})
export class AppModule { }
