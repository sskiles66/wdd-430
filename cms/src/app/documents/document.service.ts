import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[];

  documentListChangedEvent = new Subject<Document[]>();

  maxDocumentId: number;

  // May be redundant functionality that may not be doing anything
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document{
    return this.documents.find(document => document.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.documents.length; i++){
      let currentId = parseInt(this.documents[i].id, 10);
      if (currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
