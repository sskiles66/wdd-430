import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('msgText') messageText: ElementRef;
  @ViewChild('subject') subject: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Stephen";

  onSendMessage(event: Event){
    event.preventDefault();
    const messageText = this.messageText.nativeElement.value;
    const subject = this.subject.nativeElement.value;
    const message: Message = {
      id: "1",
      sender: this.currentSender,
      subject: subject,
      msgText: messageText
    }
    this.addMessageEvent.emit(message);
  }

  onClearMessage(){
    this.messageText.nativeElement.value = "";
    this.subject.nativeElement.value = "";
  }
}
