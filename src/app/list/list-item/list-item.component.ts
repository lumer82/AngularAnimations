import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {

  @Input()
  item: any;

  constructor(public elementRef: ElementRef) {
  }

}
