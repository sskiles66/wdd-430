import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    {
      id: "2",
      subject: "test subject",
      msgText: "Test message Text",
      sender: "Test Stephen"
    },
    {
      id: "3",
      subject: "test subject2",
      msgText: "Test message Text2",
      sender: "Test Stephen2"
    },
    {
      id: "4",
      subject: "test subject3",
      msgText: "Test message Text3",
      sender: "Test Stephen3"
    },
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
