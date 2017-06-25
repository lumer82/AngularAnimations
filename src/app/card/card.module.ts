import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardListComponent } from './card-list/card-list.component';
import { CardListEntryComponent } from './card-list/card-list-entry/card-list-entry.component';
import { CardRoutingModule } from './card.routes';
import { ContactService } from './shared/services/contact.service';
import { MdCardModule, MdListModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CardRoutingModule,
    MdCardModule,
    MdListModule
  ],
  declarations: [
    CardComponent,
    CardDetailComponent,
    CardListComponent,
    CardListEntryComponent
  ],
  providers: [
    ContactService
  ]
})
export class CardModule {
}
