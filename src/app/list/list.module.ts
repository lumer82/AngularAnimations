import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MdCardModule, MdListModule } from '@angular/material';
import { ItemService } from '../shared/services/item.service';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdListModule
  ],
  declarations: [
    ListComponent,
    ListItemComponent
  ],
  exports: [
    ListComponent
  ],
  providers: [
    ItemService
  ]
})
export class ListModule {
}
