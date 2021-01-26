import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    // Adding style class on body for dashboard page.
    this.document.body.className = 'header-mobile-fixed subheader-enabled aside-enabled aside-fixed aside-minimize';
  }

}
