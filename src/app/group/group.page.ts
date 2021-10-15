import { Component, OnInit } from '@angular/core';
import { SourceService } from '../shared/services/source.service';
import { groups } from '../shared/source';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  groups = groups;
  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    // this.sourceService.getData().subscribe((respond: any) => {
    //   this.groups = respond.data.group;
    // });
    // this.storageService.get('groups').then(groups => this.groups = groups);
  }
}
