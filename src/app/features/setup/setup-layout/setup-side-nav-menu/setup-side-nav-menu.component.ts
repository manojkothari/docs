import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-setup-side-nav-menu',
  templateUrl: './setup-side-nav-menu.component.html',
  styleUrls: ['./setup-side-nav-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SetupSideNavMenuComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Adding style class on body for dashboard page.
    this.document.body.classList.remove('aside-minimize');
    this.document.body.classList.add('aside-primary');
  }
}
