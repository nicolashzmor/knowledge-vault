import {AfterViewInit, Component, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DynamicRouterService} from "../dynamic-router.service";

@Component({
  selector: 'fec-dynamic-router-outlet',
  templateUrl: './dynamic-router-outlet.component.html',
  styleUrls: ['./dynamic-router-outlet.component.scss']
})
export class DynamicRouterOutletComponent implements AfterViewInit {
  @ViewChild('RouterOutlet', {read: ViewContainerRef, static: true}) outlet!: ViewContainerRef

  constructor(protected route: ActivatedRoute) {
  }

  ngAfterViewInit() {
    const component_key = this.route.snapshot.paramMap.get('component')
    if (component_key) {
      const type: Type<unknown> | undefined = DynamicRouterService.GetComponent(component_key)
      if (type) this.outlet.createComponent(type).changeDetectorRef.detectChanges()

    }
  }

}
