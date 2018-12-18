import {Directive, Input, OnChanges, SimpleChanges, ViewContainerRef} from '@angular/core';
import {CdkVirtualScrollCustomStrategyExample} from "./cdk-virtual-scroll-custom-strategy-example";

@Directive({
  selector: '[appMyDirective]'
})
export class MyDirectiveDirective implements OnChanges {
  @Input() appMyDirective: any;
  constructor(private _vc: ViewContainerRef, private c: CdkVirtualScrollCustomStrategyExample) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('appMyDirective')) {
      this._vc.clear();
      this._vc.createEmbeddedView(this.c.colA, {$implicit: this.appMyDirective});
      this._vc.createEmbeddedView(this.c.colB, {$implicit: this.appMyDirective});
      this._vc.createEmbeddedView(this.c.colC, {$implicit: this.appMyDirective});
    }
  }

}