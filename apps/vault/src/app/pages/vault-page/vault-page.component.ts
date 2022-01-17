import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DynamicRouterService} from "../../features/dynamic-router/dynamic-router.service";

@Component({
  selector: 'fec-vault-page',
  templateUrl: './vault-page.component.html',
  styleUrls: ['./vault-page.component.scss']
})
export class VaultPageComponent implements OnInit {

  constructor(protected route: ActivatedRoute, protected dynamicRouter: DynamicRouterService) {
  }

  ngOnInit(): void {
    console.log(this.route)
  }

}
