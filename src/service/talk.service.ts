import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Talk from 'talkjs'

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  private currentUser!: Talk.User;

  async createUser(applicationUser: any) {
    await Talk.ready;
    return new Talk.User({
      id: applicationUser.id,
      name: applicationUser.username,
      photoUrl: applicationUser.photoUrl,
      /* role: applicationUser.role */
    });
    }

  async createCurrentSession() {
    await Talk.ready;
    const user = {
      id: 1,
      username: 'Yan',
      email: 'yanwesley@exemplo.com',
      photoUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      welcomeMessage: 'É',
      role: 'default'
    };
    this.currentUser = await this.createUser(user);
    const session = new Talk.Session({
      appId: 't555EaMm',
      me: this.currentUser
    });

    return session;
  }

  private async getOrCreateConversation(session: Talk.Session, otherApplicationUser: any) {
    const otherUser = await this.createUser(otherApplicationUser);
    const conversation = session.getOrCreateConversation(Talk.oneOnOneId(this.currentUser, otherUser));
    conversation.setParticipant(this.currentUser);
    conversation.setParticipant(otherUser);
    return conversation;
  }

  async createInbox(session: Talk.Session) {
    const otherApplicationUser = {
      id: 5,
      username: 'Time FitConnect',
      email: 'Rita@email.com',
      photoUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
      role: 'default'
    };

    const conversation = await this.getOrCreateConversation(session, otherApplicationUser);
    const inbox = session.createInbox();
    inbox.select(conversation);
    return inbox;
  }
  constructor() { }
}
