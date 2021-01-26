import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-seg-side-nav-menu',
  templateUrl: './seg-side-nav-menu.component.html',
  styleUrls: ['./seg-side-nav-menu.component.scss']
})
export class SegSideNavMenuComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Adding style class on body for dashboard page.
    this.document.body.classList.remove('aside-minimize');
    this.document.body.classList.add('aside-primary');
  }

}
