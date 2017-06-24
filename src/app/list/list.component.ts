import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';
import { ListItemComponent } from './list-item/list-item.component';
import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

let timing = '200ms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('leaveAni', [
      transition('* => *', [
        query(':leave', [
          style({overflow: 'hidden', height: '48px', opacity: 0}),
          animate('{{timing}} ease-in', style({height: '0'}))
        ], {optional: true}),
        query(':enter', [
          style({height: 0}),
          group([
            animate('{{timing}} ease-in', style({height: '*'})),
            query('@create', animateChild())
          ])
        ], {optional: true})
      ], {params: {timing: timing}})
    ]),
    trigger('create', [
      transition(':enter', [
          style({transform: 'translate({{translate}})', 'z-index': 999, filter: 'blur(2px)'}),
          animate('{{timing}} ease-in-out', style({transform: 'translate(0)'}))
        ],
        {params: {translate: '0', timing: timing}})
    ])
  ]
})
export class ListComponent implements OnInit {

  source: Array<ItemMeta> = [];
  target: Array<ItemMeta> = [];

  private sortItems = (a: ItemMeta, b: ItemMeta) => a.item.text.localeCompare(b.item.text);

  constructor(private itemService: ItemService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.source = ['test', 'bla', 'fasel', 'blubb', 'mist', 'damnit', 'jupp']
      .map(item => this.itemService.createItem(item))
      .map(item => new ItemMeta(item, {top: -1, left: -1}))
      .sort(this.sortItems);
  }

  itemid(index: number, item: ItemMeta): number {
    return item.item.id;
  }

  moveToTarget(item: ItemMeta, listItemComp: ListItemComponent): void {
    const index = this.source.indexOf(item);
    const position = this.fixedPosition(listItemComp.elementRef.nativeElement);
    const newItem = new ItemMeta(item.item, position);
    this.source = [...this.source.slice(0, index), ...this.source.slice(index + 1, this.source.length)].sort(this.sortItems);
    this.target = [...this.target, newItem].sort(this.sortItems);
    this.changeDetectorRef.detectChanges();
  }

  moveToSource(item: ItemMeta, listItemComp: ListItemComponent): void {
    const index = this.target.indexOf(item);
    const position = this.fixedPosition(listItemComp.elementRef.nativeElement);
    const newItem = new ItemMeta(item.item, position);
    this.target = [...this.target.slice(0, index), ...this.target.slice(index + 1, this.target.length)].sort(this.sortItems);
    this.source = [...this.source, newItem].sort(this.sortItems);
    this.changeDetectorRef.detectChanges();
  }

  public translate(sourcePosition: Position, listItemComp: ListItemComponent): string {
    if (sourcePosition.top == -1 && sourcePosition.left == -1) {
      return '0';
    }
    const targetPosition = this.fixedPosition(listItemComp.elementRef.nativeElement);
    const translate = {
      top: sourcePosition.top - targetPosition.top + 9,
      left: sourcePosition.left - targetPosition.left
    };
    return `${translate.left}px, ${translate.top}px`;
  }

  private fixedPosition(element: HTMLElement): Position {
    const position = element.getBoundingClientRect();

    return {top: position.top, left: position.left};
  }

}

class Position {
  top: number;
  left: number;
}

class ItemMeta {
  item: Item;
  position: Position;


  constructor(item: Item, position: Position) {
    this.item = item;
    this.position = position;
  }
}
