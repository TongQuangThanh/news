import { SharedService } from './../../shared/services/shared.service';
import { sources } from '../../shared/source';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SourceService } from '../../shared/services/source.service';
import { faCalendarAlt, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-one',
  templateUrl: './list-one.component.html',
  styleUrls: ['./list-one.component.css']
})
export class ListOneComponent implements OnInit {
  customAlertOptions: any = {
    header: 'Thể loại',
    translucent: false
  };
  source: typeof sources[0];
  allGroups: any[];
  initRespond: any;
  respond: any;
  selectedGroups: any[];
  noContent = false;
  faCalendarAlt = faCalendarAlt;
  faLayerGroup = faLayerGroup;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sourceService: SourceService,
    private sharedService: SharedService) { }

  ngOnInit() {
    const code = this.activatedRoute.snapshot.paramMap.get('id');
    this.source = sources.find(source => source.code === code);
    this.allGroups = this.source.child.slice(1);
    this.getParentSource(code);
    this.router.events.subscribe(async (val: any) => {
      if (val instanceof NavigationEnd && val.url.endsWith(code) && this.respond) {
        this.respond = this.initRespond = await this.sharedService.checkIsReadOnList(this.respond);
      }
    });
  }

  getParentSource(code: string) {
    this.sharedService.showLoading();
    this.sourceService.getParentSource('list', code).subscribe(async (res: any) => {
      if (res.data) {
        res.data.items.forEach((it: any) => {
          it.read = false;
        });
        this.respond = this.initRespond = await this.sharedService.checkIsReadOnList(res.data);
        this.noContent = false;
      } else {
        this.noContent = true;
      }
      this.sharedService.hideLoading();
    }, (error: any) => {
      this.sharedService.hideLoading();
      this.sharedService.alertError('home/list');
    });
  }

  getGroupName(code: number) {
    return this.allGroups.find((group: any) => group.code === code).name;
  }

  setDefaultImg() {
    this.respond.image = this.source.logo;
  }

  getSourceByGroup() {
    const groupsCode = this.selectedGroups.map((gr: any) => gr.code);
    if (groupsCode.length > 0) {
      this.sharedService.showLoading();
      this.sourceService.getMultiParentSource('list', this.source.code, groupsCode).subscribe((res: any) => {
        if (res.data.length > 0) {
          this.respond = res.data[0];
          const restOfData = res.data.slice(1);
          for (const item of restOfData) {
            this.respond.items = this.respond.items.concat(item.items);
          }
        }
        this.sharedService.hideLoading();
      }, (error: any) => {
        this.sharedService.hideLoading();
        this.sharedService.alertError('home/list', false);
      });
    } else {
      this.respond = this.initRespond;
    }
  }

  goDetail(item: any) {
    this.sharedService.updateStorage(item.title);
    this.router.navigateByUrl(`home/list/${this.source.code}/detail`, { state: { item } });
  }

  showTitle(title: string) {
    return title ? title.replace(/(feed|RSS)/ig, '') : '';
  }

  getImageSource(description: any) {
    if (description.img) {
      return description.img.src ? description.img.src : this.source.logo;
    } else {
      let path = '';
      const imgStr = '<img src="';
      if (description.includes(imgStr)) {
        const start = description.indexOf(imgStr);
        const end = description.substring(start + imgStr.length).indexOf('"');
        path = description.substring(start + imgStr.length, start + imgStr.length + end);
      } else {
        path = this.source.logo;
      }
      return path;
    }
  }

  getDescription(description: any) {
    if (description.$text) {
      return description.$text.replace(/<[^>]+>/g, '');
    } else {
      return description.replace(/<[^>]+>/g, '');
    }
  }

  reset() {
    this.selectedGroups = [];
    this.respond = this.initRespond;
  }
}
