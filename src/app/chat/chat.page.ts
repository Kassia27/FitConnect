import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TalkService } from 'src/service/talk.service';
import Talk from 'talkjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  private inbox!: Talk.Inbox;
  private session!: Talk.Session;
  @ViewChild('talkjsContainer') talkjsContainer!: ElementRef;

  constructor(private talkService: TalkService) { }

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    const session = await this.talkService.createCurrentSession();
    this.inbox = await this.talkService.createInbox(session);
    this.inbox.mount(this.talkjsContainer.nativeElement);
  }
}
