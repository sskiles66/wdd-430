import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contact: Contact;
  subscription: Subscription;

  term: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe((contactsList: Contact[]) => {
      this.contacts = contactsList;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string){ 
    this.term = value;
  }
}
