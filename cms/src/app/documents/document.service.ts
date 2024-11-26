import { EventEmitter, Injectable, Output } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[];

  documentListChangedEvent = new Subject<Document[]>();

  maxDocumentId: number;

  // May be redundant functionality that may not be doing anything
  @Output() documentSelectedEvent = new EventEmitter<Document>();

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    // return this.documents.slice();
    this.http.get<any>('http://localhost:3000/documents').subscribe(
      (documents: Document[]) => {
        console.log(documents);
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  deleteDocument(document: Document) {
    // if (!document) {
    //   return;
    // }
    // const pos = this.documents.indexOf(document);
    // if (pos < 0) {
    //   return;
    // }
    // this.documents.splice(pos, 1);
    // this.storeDocuments();
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response: Response) => {
        this.documents.splice(pos, 1);
        this.storeDocuments();
      });
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.documents.length; i++) {
      let currentId = parseInt(this.documents[i].id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(document: Document) {
    // if (!newDocument) {
    //   return;
    // }
    // this.maxDocumentId++;
    // newDocument.id = this.maxDocumentId.toString();
    // this.documents.push(newDocument);
    // this.storeDocuments();
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        // this.sortAndSend();
        this.storeDocuments();
      });
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    // if (!originalDocument || !newDocument) {
    //   return;
    // }
    // const pos = this.documents.indexOf(originalDocument);
    // if (pos < 0) {
    //   return;
    // }
    // newDocument.id = originalDocument.id;
    // this.documents[pos] = newDocument;
    // this.storeDocuments();
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id,
        newDocument,
        { headers: headers }
      )
      .subscribe((response: Response) => {
        this.documents[pos] = newDocument;
        this.storeDocuments();
      });
  }

  storeDocuments() {
    const stringDocuments = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `https://wdd430-1c82b-default-rtdb.firebaseio.com/documents.json`;

    this.http.put(url, stringDocuments, { headers }).subscribe(
      (response) => {
        console.log('Document updated successfully:', response);
        this.documentListChangedEvent.next(this.documents.slice());
      },
      (error) => {
        console.error('Error updating document:', error);
      }
    );
  }
}
