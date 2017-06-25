import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContactService } from '../shared/services/contact.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../shared/models/contact.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {

  contacts: Observable<Array<Contact>>;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contacts = this.contactService.contacts.map(contactsMap => Array.from(contactsMap.values()));
  }

  contactId(index: number, contact: Contact): number {
    return contact.id;
  }
}
