import { SourceService } from './../shared/services/source.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Group, RespondGroup } from '../shared/model/model';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit, AfterViewInit {
  groups: Group[];
  isNarrow = false;
  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    this.sourceService.getCategory('group').subscribe((res: RespondGroup) => this.groups = res.data);
  }

  ngAfterViewInit() {
    this.isNarrow = document.body.clientWidth <= 400 ? true : false;
  }
}
