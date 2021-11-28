import { SharedService } from './shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { faList, faLayerGroup, faInfoCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Danh sách', url: '/home/list', icon: faList },
    { title: 'Thể loại', url: '/home/group', icon: faLayerGroup },
    { title: 'About', url: '/about', icon: faInfoCircle },
  ];
  public action = [{ title: 'Exit', icon: faSignOutAlt }];

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
  }

  onClick(action: string) {
    if (action === 'Exit') {
      this.sharedService.exitApp();
    }
  }
}
