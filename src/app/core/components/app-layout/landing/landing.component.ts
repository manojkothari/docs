import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { LandingService } from 'src/app/core/services/landing.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(
    private storage: StorageService,
    private landingService: LandingService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  // Variable declaration.
  simulationCount = 0;
  baseLineCount = 0;

  ngOnInit(): void {

    // Adding style class on body for landing page.
    this.document.body.classList.add('landing-body');

    // Set user profile detail into local storage.
    this.storage.userId = 1;
    // this.storage.userName = 'Shravan';
    this.storage.tanentId = 1;
    this.storage.baseLineId = 2;
    this.storage.simulationId = 1;

    this.landingService.getSimulationCount(
      this.storage.userId,
      this.storage.tanentId,
      this.storage.baseLineId,
      this.storage.simulationId,
    ).subscribe((res) => {
      this.simulationCount = res.simulationCount;
    });

    this.landingService.getBaseLineCount(
      this.storage.userId,
      this.storage.tanentId,
      this.storage.baseLineId,
    ).subscribe((res) => {
      this.baseLineCount = res.baseLineCount;
    });

  }

  ngOnDestroy(): void {
    // Remove style class on body for landing page.
    this.document.body.classList.remove('landing-body');
  }

}
