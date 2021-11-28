import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SourceService } from '../../shared/services/source.service';
import { groups, sources } from '../../shared/source';

@Component({
  selector: 'app-group-one',
  templateUrl: './group-one.component.html',
  styleUrls: ['./group-one.component.css']
})
export class GroupOneComponent implements OnInit {
  group: typeof groups[0];
  // sources: typeof sources;
  customAlertOptions: any = {
    header: 'Nguồn',
    translucent: false
  };
  allLists: any[];
  selectedLists: any[];
  initResponds: any;
  responds: any;
  isNarrow = false;
  noContent = false;
  code = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sourceService: SourceService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.paramMap.get('id');
    this.group = groups.find(group => group.code === this.code);
    this.getParentSource();
    this.router.events.subscribe(async (val: any) => {
      if (val instanceof NavigationEnd && val.url.endsWith(this.code) && this.responds) {
        this.responds = await this.sharedService.checkIsReadOnGroup(this.responds);
      }
    });
  }

  getParentSource() {
    this.sharedService.showLoading().then(() => {
      this.sourceService.getParentSource('group', this.code).subscribe(async (res: any) => {
        if (res.data.length > 0) {
          res.data.forEach((it: any) => {
            it.items.forEach((item: any) => item.read = false);
          });
          this.responds = this.initResponds = await this.sharedService.checkIsReadOnGroup(res.data);
          const srcOfGr = this.responds.map((it: any) => it.code);
          this.allLists = sources.filter(source => srcOfGr.includes(source.code));
          this.noContent = false;
        } else {
          this.noContent = true;
        }
        this.sharedService.hideLoading();
      }, async (error: any) => {
        console.log(error);
        this.sharedService.hideLoading();
        this.sharedService.alertError('home/group');
      });
    });
  }

  getSource(code: string) {
    return sources.find(source => source.code === code);
  }

  goDetail(item: any) {
    this.sharedService.updateStorage(item.title);
    this.router.navigateByUrl(
      `home/group/${this.code}/detail`, { state: { item } });
  }

  showTitle(title: string) {
    return title ? title.replace(/(feed|RSS)/ig, '') : '';
  }

  getImageSource(code: string, description: any) {
    if (description.img) {
      return description.img.src ? description.img.src : this.getSource(code).logo;
    } else {
      let path = '';
      const imgStr = '<img src="';
      if (description.includes(imgStr)) {
        const start = description.indexOf(imgStr);
        const end = description.substring(start + imgStr.length).indexOf('"');
        path = description.substring(start + imgStr.length, start + imgStr.length + end);
      } else {
        path = this.getSource(code).logo;
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

  getSourceByList() {
    const listsCode = this.selectedLists.map((it: any) => it.code);
    if (listsCode.length > 0) {
      this.responds = this.initResponds.filter((it: any) => listsCode.includes(it.code));
    } else {
      this.responds = this.initResponds;
    }
  }

  reset() {
    this.selectedLists = [];
    this.responds = this.initResponds;
  }
}
