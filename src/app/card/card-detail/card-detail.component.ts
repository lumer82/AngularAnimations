import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../shared/services/contact.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../shared/models/contact.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDetailComponent implements OnInit {

  contact: Contact;

  constructor(private activatedRoute: ActivatedRoute,
              private contactService: ContactService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.params
      .map(params => +params['id'])
      .switchMap(id => this.contactService.getContact(id))
      .subscribe(contact => {
        this.contact = contact
        this.changeDetectorRef.detectChanges();
      });
  }

}
