import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-rtm-side-nav-menu',
  templateUrl: './rtm-side-nav-menu.component.html',
  styleUrls: ['./rtm-side-nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RtmSideNavMenuComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Adding style class on body for dashboard page.
    this.document.body.classList.remove('aside-minimize');
    this.document.body.classList.add('aside-primary');
  }

}
