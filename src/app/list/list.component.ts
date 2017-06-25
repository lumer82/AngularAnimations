import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { ItemService } from '../shared/services/item.service';
import { ListItemComponent } from './list-item/list-item.component';
import { animate, animateChild, group, query, stagger, style, transition, trigger } from '@angular/animations';

let timing = '200ms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('list', [
      transition(':enter', [
        query(':enter', style({ height: 0, overflow: 'hidden' }), { optional: true }),
        query(':enter', stagger(20, animate('50ms ease-out', style({ height: '*' }))), { optional: true })
      ]),
      transition('* => *', [
        query(':leave', [
          style({overflow: 'hidden', height: '48px', opacity: 0}),
          animate('{{timing}} ease-in', style({height: '0'}))
        ], {optional: true}),
        query(':enter', [
          style({height: 0}),
          group([
            animate('{{timing}} ease-in', style({height: '*'})),
            query('@itemState', animateChild())
          ])
        ], {optional: true})
      ], {params: {timing: timing}})
    ]),
    trigger('itemState', [
      transition(':enter', [
          style({transform: 'translate({{translate}})', 'z-index': 999, filter: 'blur(2px)'}),
          animate('{{timing}} ease-in-out', style({transform: 'translate(0)'}))
        ],
        {params: {translate: '0', timing: timing}})
    ])
  ]
})
export class ListComponent implements OnInit {

  source: Array<Item> = [];
  target: Array<Item> = [];

  positions: Map<Item, Position> = new Map();

  private sortItems = (a: Item, b: Item) => a.text.localeCompare(b.text);

  constructor(private itemService: ItemService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.source = ['test', 'bla', 'fasel', 'blubb', 'mist', 'damnit', 'jupp']
      .map(item => this.itemService.createItem(item))
      .sort(this.sortItems);
  }

  itemid(index: number, item: Item): number {
    return item.id;
  }

  /**
   * Moves a item from the source list to the target list
   * @param item the item to be moved
   * @param listItemComp the reference of the item to the listItemComponent
   */
  moveToTarget(item: Item, listItemComp: ListItemComponent): void {
    this.moveTo(this.source, this.target, item, listItemComp, (source, target) => {
      this.source = source;
      this.target = target;
    })
  }


  /**
   * Moves a item from the target list to the source list
   * @param item the item to be moved
   * @param listItemComp the reference of the item to the listItemComponent
   */
  moveToSource(item: Item, listItemComp: ListItemComponent): void {
    // cause we are moving the opposite direction, source and target are switched
    this.moveTo(this.target, this.source, item, listItemComp, (target, source) => {
      this.source = source;
      this.target = target;
    })
  }

  /**
   * moves an item from the given source array to the given target array.
   * Also saves the current position of the item, provided by element.
   * Afterwards assign get called, to assign the corresponding fields.
   *
   * @param source the source array to pluck the item
   * @param target the target array to push the item
   * @param item the item to be moved
   * @param element the HtmlElement or ListItemComponent to get the current position
   * @param assign the assign method to assign the new array to the fields.
   */
  private moveTo(source: Array<Item>,
                 target: Array<Item>,
                 item: Item,
                 element: HTMLElement | ListItemComponent,
                 assign: (source: Array<Item>, target: Array<Item>) => void): void  {
    const index = source.indexOf(item);
    const position = this.fixedPosition(element instanceof ListItemComponent ? element.elementRef.nativeElement : element);
    this.positions.set(item, position);
    source = [...source.slice(0, index), ...source.slice(index + 1, source.length)].sort(this.sortItems);
    target = [...target, item].sort(this.sortItems);
    assign(source, target);
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Calculates the needed translate values to appear as source item
   *
   * @param sourcePosition the position of the item on the source
   * @param listItemComp the listItemComponent to be animated
   * @returns a string used by css translate to move the listItemComp to the source position
   */
  public translate(sourcePosition: Position, listItemComp: ListItemComponent): string {
    if (!sourcePosition) {
      return '0';
    }
    const targetPosition = this.fixedPosition(listItemComp.elementRef.nativeElement);
    const translate = {
      top: sourcePosition.top - targetPosition.top + 9,// somewhere are 9 pixels missing. Didn't figure it out where. Any help is appreciated
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
