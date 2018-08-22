import { NavService } from './core/services/nav.service';
import { NavItem } from './core/model/nav-item';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {VERSION} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[] = [
        {
          displayName: 'Operation',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Dashboard',
              iconName: 'star_rate',
              route: 'transaction'
            },
            {
              displayName: 'Transaction',
              iconName: 'star_rate',
              route: '/transaction/list'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'feedback'
        }
      ];
  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
