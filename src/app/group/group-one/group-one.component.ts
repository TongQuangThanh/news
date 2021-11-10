import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceService } from '../../shared/services/source.service';
import { groups, sources } from '../../shared/source';

@Component({
  selector: 'app-group-one',
  templateUrl: './group-one.component.html',
  styleUrls: ['./group-one.component.css']
})
export class GroupOneComponent implements OnInit {
  // group: typeof groups[0];
  // sources: typeof sources;
  responds: any;
  isNarrow = false;
  noContent = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sourceService: SourceService,
    private sharedService: SharedService) { }

  ngOnInit() {
    const code = this.activatedRoute.snapshot.paramMap.get('id');
    this.sharedService.showLoading();
    this.sourceService.getParentSource('group', code).subscribe((res: any) => {
      if (res.data.length > 0) {
        this.responds = res.data;
        this.noContent = false;
      } else {
        this.noContent = true;
      }
      this.sharedService.hideLoading();
    }, async (error: any) => {
      this.sharedService.hideLoading();
      this.sharedService.alertError('home/group');
    });
  }

  getGroups(code: string) {
    return groups.find(group => group.code === code);
  }

  getSource(code: string) {
    return sources.find(source => source.code === code);
  }

  goDetail(code: string, item: any) {
    this.router.navigateByUrl(
      `home/group/${this.getGroups(code)}/detail`,
      {
        state: { item, list: this.responds, group: this.getGroups(code) }
      });
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
}
