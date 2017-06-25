import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Contact } from '../../shared/models/contact.model';

@Component({
  selector: 'app-card-list-entry',
  templateUrl: './card-list-entry.component.html',
  styleUrls: ['./card-list-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListEntryComponent {

  @Input()
  contact: Contact

  constructor() { }

}
