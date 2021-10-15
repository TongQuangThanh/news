import { DetailComponent } from './../shared/components/detail/detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { GroupOneComponent } from '../group/group-one/group-one.component';
import { ListOneComponent } from '../list/list-one/list-one.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
          },
          {
            path: ':id',
            component: ListOneComponent
          },
          {
            path: ':id/detail',
            component: DetailComponent
          }
        ]
      },
      {
        path: 'group',
        children: [
          {
            path: '',
            loadChildren: () => import('../group/group.module').then(m => m.GroupPageModule)
          },
          {
            path: ':id',
            component: GroupOneComponent
          },
          {
            path: ':id/detail',
            component: DetailComponent
          }
        ]
      },
      {
        path: '',
        redirectTo: '/home/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
