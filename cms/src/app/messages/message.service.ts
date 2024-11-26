import { EventEmitter, Injectable, Output } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[];

  maxMessageId: number;

  @Output() messageChangedEvent = new EventEmitter<Message[]>();

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
    // this.getMessages();
    // this.maxMessageId = this.getMaxId();
  }

  getMessages() {
    this.http
    .get<any>(
      'http://localhost:3000/messages'
    )
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  getMessage(id: string): Message{
    return this.messages.find(message => message.id === id);
  }

  addMessage(message: Message){
    // if (!message) {
    //   return;
    // }
    // this.maxMessageId++;
    // message.id = this.maxMessageId.toString();
    // this.messages.push(message);
    // this.storeMessages();

    if (!message) {
      return;
    }

    // make sure id of the new Document is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{ message: string; returnedMessage: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        // add new document to documents
        this.messages.push(responseData.returnedMessage);
        // this.sortAndSend();
        this.storeMessages();
      });
  }

  getMaxId() {
    let maxId = 0;
    for (let i = 0; i < this.messages.length; i++) {
      let currentId = parseInt(this.messages[i].id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const stringMessages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const url = `https://wdd430-1c82b-default-rtdb.firebaseio.com/messages.json`;

    this.http.put(url, stringMessages, { headers }).subscribe(
      (response) => {
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error) => {
        console.error('Error updating document:', error);
      }
    );
  }
}
