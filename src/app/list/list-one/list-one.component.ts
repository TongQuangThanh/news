import { sources } from '../../shared/source';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SourceService } from '../../shared/services/source.service';

@Component({
  selector: 'app-list-one',
  templateUrl: './list-one.component.html',
  styleUrls: ['./list-one.component.css']
})
export class ListOneComponent implements OnInit {
  source: typeof sources[0];
  allGroups;
  respond;
  selectedGroups;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private sourceService: SourceService) { }

  ngOnInit() {
    const code = this.activatedRoute.snapshot.paramMap.get('id');
    this.source = sources.find(source => source.code === code);
    this.allGroups = this.source.child.slice(1);
    this.sourceService.getParentSource('list', code).subscribe((res: any) => {
      this.respond = res.data;
    });
  }

  goDetail(item: any) {
    this.router.navigateByUrl(`home/list/${this.source.code}/detail`, {
      state: { item, list: this.respond.items, source: this.source }
    });
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
