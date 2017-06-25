import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ContactService {

  private id: number = 0;

  private _contacts: Map<number, Contact>;

  contacts: Observable<Map<number, Contact>>;

  constructor() {
    this._contacts = Array(10)
      .fill('')
      .map(() => this.generateRandomCard())
      .reduce((map, contact) => {
        map.set(contact.id, contact);
        return map;
      }, new Map<number, Contact>());
    this.contacts = Observable.of(this._contacts);
  }

  getContact(id: number): Observable<Contact> {
    return Observable.of(this._contacts.get(id));
  }

  generateRandomCard(): Contact {
    return {
      id: this.id++,
      description: 'description',
      longdescription: 'longdesription',
      address: 'some street 42, 12345 Houston, Texas',
      firstname: 'Kill',
      lastname: 'Bill',
      birthday: new Date(1979,1,1)
    }
  }

}
