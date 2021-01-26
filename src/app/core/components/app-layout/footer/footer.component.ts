import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public storage: StorageService,
  ) { }

  ngOnInit(): void {
  }

}
