import { NavService } from './core/services/nav.service';
import { NavItem } from './core/model/nav-item';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {VERSION} from '@angular/material';
import { SidenavService } from './core/sidenav/sidenav.service';
import { SidenavItem } from './core/sidenav/sidenav-item/sidenav-item.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @ViewChild('appDrawer') appDrawer: ElementRef;
  // version = VERSION;
  // navItems: NavItem[] = [
  //       {
  //         displayName: 'Operation',
  //         iconName: 'speaker_notes',
  //         children: [
  //           {
  //             displayName: 'Dashboard',
  //             iconName: 'star_rate',
  //             route: 'transaction'
  //           },
  //           {
  //             displayName: 'Transaction',
  //             iconName: 'star_rate',
  //             route: '/transaction/list'
  //           },
  //           {
  //             displayName: 'Accounts',
  //             iconName: 'star_rate',
  //             route: 'account/'
  //           }
  //         ]
  //       },
  //       {
  //         displayName: 'Feedback',
  //         iconName: 'feedback',
  //         route: 'feedback'
  //       }
  //     ];
  constructor(sidenavService: SidenavService) {

      const menu: SidenavItem[] = [];

      menu.push({
        name: 'APPS',
        position: 5,
        type: 'subheading',
        customClass: 'first-subheading'
      });

      menu.push({
        name: 'Transaction',
        routeOrFunction: '/transaction',
        icon: 'dashboard',
        position: 10,
        pathMatchExact: true
      });

      menu.forEach(item => sidenavService.addItem(item));
  }

  // ngAfterViewInit() {
  //   // this.navService.appDrawer = this.appDrawer;
  // }
}
