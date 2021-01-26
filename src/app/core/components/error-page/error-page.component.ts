import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  statusCode!: string | null;
  errorMsg: string | undefined;
  errorDesc!: string | null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.statusCode = this.route.snapshot.paramMap.get('code');
    switch (this.statusCode) {
      case '500':
        this.errorMsg = 'Server error';
        this.errorDesc = 'Sorry, Something went wrong! we\'re currently trying to fix the problem. Please try after some time.';
        break;
      default:
        this.errorMsg = 'Unexpected error';
        this.errorDesc = 'Sorry, Something went wrong! we\'re currently trying to fix the problem. Please try after some time.';
        break;
    }
  }

}
