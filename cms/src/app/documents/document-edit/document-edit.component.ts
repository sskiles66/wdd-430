import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.originalDocument = this.documentService.getDocument(params['id']);
        if (!this.originalDocument) {
          console.log("No document")
          return;
        }
        this.editMode = true;
        console.log(this.originalDocument)
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      } else {
        console.log("No id")
        this.editMode = false;
        return;
      }
    });
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document(
      this.route.params['id'],
      value.name,
      value.description,
      value.url,
      [],
    );
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['documents']);
  }
}
