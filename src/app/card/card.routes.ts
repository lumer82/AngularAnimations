import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardComponent } from './card.component';
import { CardDetailComponent } from './card-detail/card-detail.component';
import { CardListComponent } from './card-list/card-list.component';

const routes: Routes = [
  {
    path: 'cards',
    component: CardComponent,
    children: [
      { path: ':id', component: CardDetailComponent },
      { path: '', component: CardListComponent }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})
export class CardRoutingModule {}
