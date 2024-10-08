import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent  = new EventEmitter<Document>();
  documents: Document[] = [
    {
      id: "1",
      name: "Test 1",
      description: "Description 1",
      url: "url 1",
      children: []
    },
    {
      id: "2",
      name: "Test 2",
      description: "Description 2",
      url: "url 2",
      children: []
    },
    {
      id: "3",
      name: "Test 3",
      description: "Description 3",
      url: "url 3",
      children: []
    },
    {
      id: "4",
      name: "Test 4",
      description: "Description 4",
      url: "url 4",
      children: []
    },
  ];

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
