import {CdkVirtualForOf, FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import {AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild} from '@angular/core';
import {ListRange} from "@angular/cdk/collections";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(56, 250, 500);
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
export class CdkVirtualScrollCustomStrategyExample implements AfterViewInit {
    @ViewChild('colA') colA: TemplateRef<any>;
    @ViewChild('colB') colB: TemplateRef<any>;
    @ViewChild('colC') colC: TemplateRef<any>;
    @ViewChild(CdkVirtualForOf) vfo: CdkVirtualForOf<any>;
    items = Array.from({length: 10000}).map((_, i) => `Item #${i}`);

    ngAfterViewInit(): void {
        this.vfo.viewChange.subscribe(value => {
            console.log(value);
        });
    }
}


/**  Copyright 2018 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license */