import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit{
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.originalContact = this.contactService.getContact(params['id']);
        if (!this.originalContact) {
          console.log("No contact")
          return;
        }
        this.editMode = true;
        console.log(this.originalContact)
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
      } else {
        console.log("No id")
        this.editMode = false;
        return;
      }
      if (this.contact.group){
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(
      this.route.params['id'],
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts,
    );
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    }else{
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['contacts']);
  }

  onDrop(event: Event){
    console.log(event);
  }

  onRemoveItem(index: number){
    this.groupContacts.splice(index, 1);
  }
}