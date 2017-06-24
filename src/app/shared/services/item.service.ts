import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable()
export class ItemService {

  private id: number = 0;

  constructor() {
  }

  createItem(text: string): Item {
    return new Item(this.id++, text);
  }

}
