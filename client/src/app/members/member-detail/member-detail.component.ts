import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../_models/member';
import { TabDirective, TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from "ngx-timeago";
import { DatePipe } from '@angular/common';
import { MemberMessagesComponent } from "../member-messages/member-messages.component";
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [TabsModule, GalleryModule, TimeagoModule, DatePipe, MemberMessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', { static: true }) memberTabs?: TabsetComponent
  private memberService = inject(MembersService)
  private route = inject(ActivatedRoute)
  private messageService = inject(MessageService)
  activeTab?: TabDirective;
  messages: Message[] = []
  member: Member = {} as Member
  images: GalleryItem[] = []

  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => {
        this.member = data['member'],
        this.member && this.member.photos.map(photo => {
          this.images.push(new ImageItem({src: photo.url, thumb: photo.url})
          )
        })
      }
    })

    this.route.queryParams.subscribe({
      next: params => {
        if (params['tab']) {
          this.selectTab(params['tab']);
        }
      }
    })
  }

  onTabActivate(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0 && this.member) {
      this.messageService.getMessageThread(this.member.userName).subscribe({
        next: messages => this.messages = messages
      })
    }
  }
  onUpdateMessages(event: Message) {
    this.messages.push(event);
  }
  selectTab(heading: string) {
    if (this.memberTabs) {
      const messageTab = this.memberTabs.tabs.find(x => x.heading === heading);
      if (messageTab) messageTab.active = true;
    }
  }
}
