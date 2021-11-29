import { SourceService } from './../shared/services/source.service';
import { RespondSource, Source } from '../shared/model/model';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, AfterViewInit {
  sources: Source[];
  isNarrow = false;
  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    this.sourceService.getCategory('list').subscribe((res: RespondSource) => this.sources = res.data);
  }

  ngAfterViewInit() {
    this.isNarrow = document.body.clientWidth <= 400 ? true : false;
  }
}
