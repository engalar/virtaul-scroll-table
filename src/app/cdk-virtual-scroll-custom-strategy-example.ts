import {FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import {ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from '@angular/core';

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    super(50, 250, 500);
  }
}

/** @title Virtual scroll with a custom strategy */
@Component({
  selector: 'cdk-virtual-scroll-custom-strategy-example',
  styleUrls: ['cdk-virtual-scroll-custom-strategy-example.scss'],
  templateUrl: 'cdk-virtual-scroll-custom-strategy-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}]
})
export class CdkVirtualScrollCustomStrategyExample {
  @ViewChild('colA') colA: TemplateRef<any>;
  @ViewChild('colB') colB: TemplateRef<any>;
  @ViewChild('colC') colC: TemplateRef<any>;
  items = Array.from({length: 10000}).map((_, i) => `Item #${i}`);
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */