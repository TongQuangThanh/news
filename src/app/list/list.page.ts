import { sources } from './../shared/source';
import { Component, OnInit } from '@angular/core';
import { SourceService } from '../shared/services/source.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  sources = sources;
  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    // this.sourceService.getData().subscribe((respond: any) => {
    //   this.sources = respond.data.source;
    //   this.storageService.set('sources', this.sources);
    // });
  }
}
