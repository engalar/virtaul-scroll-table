import {Component, OnInit} from '@angular/core';
import {ScColumn} from "../sc-data-table.component";

@Component({
    selector: 'app-wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.css']
})
export class WrapperComponent implements OnInit {
    columns: ScColumn[] = [
        {name: 'logicalFileName', width: 300, visible: true},
        {name: 'a', width: 300, visible: true},
        {name: 'b', width: 300, visible: true},
        {name: 'c', width: 300, visible: true},
        {name: 'd', width: 300, visible: true},
        {name: 'e', width: 300, visible: true},
        {name: 'f', width: 300, visible: true},
    ];

    constructor() {
    }

    ngOnInit() {
    }
    tableUtils = {
        limitStringWithMiddleDots(s, n) {
            return s;
        }
    }
}
