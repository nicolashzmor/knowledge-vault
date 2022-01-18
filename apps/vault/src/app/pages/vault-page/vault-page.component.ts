import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fec-vault-page',
  templateUrl: './vault-page.component.html',
  styleUrls: ['./vault-page.component.scss']
})
export class VaultPageComponent {

  constructor(protected route: ActivatedRoute) {

  }

}
