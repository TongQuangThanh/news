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
  responds;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sourceService: SourceService) { }

  ngOnInit() {
    const code = this.activatedRoute.snapshot.paramMap.get('id');
    this.sourceService.getParentSource('group', code).subscribe((res: any) => {
      this.responds = res.data;
      // this.sources = sources.filter(source => source.code === code);
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
      return description.$text;
    } else {
      if (description.includes('</a>')) {
        const start = description.indexOf('</a>');
        description = description.substring(start + 4);
      }
      if (description.includes('<img src=')) {
        const start = description.indexOf('/>');
        description = description.substring(start + 2);
      }
      return description.replace(/(<\/br>|<\/span>)/g, '');
    }
  }
}
