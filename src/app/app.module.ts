import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListModule } from './list/list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routes';
import { MdButtonModule, MdToolbarModule } from '@angular/material';
import { CardRoutingModule } from './card/card.routes';
import { CardModule } from './card/card.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ListModule,
    CardModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdButtonModule,
    CardRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
