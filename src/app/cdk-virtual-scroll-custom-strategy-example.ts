import {CdkVirtualForOf, FixedSizeVirtualScrollStrategy, VIRTUAL_SCROLL_STRATEGY} from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    PlatformRef,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {Platform} from "@angular/cdk/platform";
import {BehaviorSubject} from "rxjs";

export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
    constructor() {
        super(34, 250, 500);
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
    @ViewChild('colC') colC: TemplateRef<any>;
    @ViewChild(CdkVirtualForOf) cdkVirtualForOf: CdkVirtualForOf<any>;
    columns$: BehaviorSubject<any>;
    items: any[];

    columns = [
        {name: 'a', width: 10},
        {name: 'b', width: 10},
        {name: 'c', width: 10},
        {name: 'd', width: 10},
        {name: 'e', width: 10},
        {name: 'f', width: 10},
    ];

    constructor(private _platform: Platform, private _cd: ChangeDetectorRef) {
        this.columns$ = new BehaviorSubject(this.columns);
        let rownum = 50;
        if (_platform.BLINK) {
            rownum = 95;
        } else if (_platform.TRIDENT) {
            rownum = 50;
        } else if (_platform.FIREFOX) {
            rownum = 26;
        } else if (_platform.EDGE) {
            rownum = 50;
        } else {
            rownum = 50;
        }
        this.items = Array.from({length: 10000 * rownum}).map((_, i) => {
            return {
                a: `#${i} ${Math.random()}`,
                b: `#${i} ${Math.random()}`,
                c: `#${i} ${Math.random()}`,
                d: `#${i} ${Math.random()}`,
                e: `#${i} ${Math.random()}`,
                f: `#${i} ${Math.random()}`,
            };
        });
    }

    ngAfterViewInit(): void {
        this.cdkVirtualForOf.viewChange.subscribe(value => {
            console.log(value);
            this.columns = this.columns.reverse();
            this.columns$.next(this.columns);
        });
    }
}
