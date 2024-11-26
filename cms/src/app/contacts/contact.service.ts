import { EventEmitter, Injectable, Output } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // Output seems to be optional here
  @Output() contactSelectedEvent = new EventEmitter<Contact>();

  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];

  maxContactId: number;

  constructor(private http: HttpClient) { 
    // this.getContacts();
    // this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
    .get<any>(
      'http://localhost:3000/contacts'
    )
    .subscribe(
      (contacts: Contact[]) => {
        console.log(contacts);
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  getContact(id: string): Contact{
    return this.contacts.find(contact => contact.id === id);
  }

  deleteContact(contact: Contact) {
    // if (!contact) {
    //   return;
    // }
    // const pos = this.contacts.indexOf(contact);
    // if (pos < 0){
    //   return;
    // }
    // this.contacts.splice(pos, 1);
    // this.storeContacts();
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response: Response) => {
        this.contacts.splice(pos, 1);
        this.storeContacts();
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.contacts.length; i++){
      let currentId = parseInt(this.contacts[i].id, 10);
      if (currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    // if (!newContact){
    //   return;
    // }
    // this.maxContactId++;
    // newContact.id = this.maxContactId.toString();
    // this.contacts.push(newContact);
    // this.storeContacts();
    if (!newContact) {
      return;
    }

    // make sure id of the new Document is empty
    newContact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        newContact,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.contacts.push(responseData.contact);
        // this.sortAndSend();
        this.storeContacts();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    // if (!originalContact || !newContact){
    //   return;
    // }
    // const pos = this.contacts.indexOf(originalContact);
    // if (pos < 0) {
    //   return;
    // }
    // newContact.id = originalContact.id;
    // this.contacts[pos] = newContact;
    // this.storeContacts();

    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex((d) => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/contacts/' + originalContact.id,
        newContact,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.contacts[pos] = newContact;
        this.storeContacts();
      });
  }

  storeContacts() {
    const stringDocuments = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `https://wdd430-1c82b-default-rtdb.firebaseio.com/contacts.json`;

    this.http.put(url, stringDocuments, { headers }).subscribe(
      (response) => {
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error) => {
        console.error('Error updating document:', error);
      }
    );
  }
}
