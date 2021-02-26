import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    columnDefs = [
        { field: 'make', sortable: true, filter: true, sortingOrder:['asc','desc'] },
        { field: 'model', sortable: true, filter: true },
        { colId: 'price', field: 'price', sortable: true, filter: true }
    ];

    go: GridOptions;
    rowData = [];
    private gridApi;
    private gridColumnApi;



    constructor(private http: HttpClient) {
    }

    ngOnInit() {
      this.rowData = [
        { "make": "Toyota", "model": "Celica", "price": 35000 },
        { "make": "Ford", "model": "Mondeo", "price": 32000 },
        { "make": "Porsche", "model": "Boxter", "price": 72000 },
        { "make": "Toyota", "model": "CRV", "price": 45000 },
        { "make": "Chevy", "model": "Cavlier", "price": 12000 },
        { "make": "Honda", "model": "Accord", "price": 32000 }
    ];
        //this.rowData = this.http.get('https://www.ag-grid.com/example-assets/small-row-data.json');
   const gridOptions = {
          // PROPERTIES
          // Objects like myRowData and myColDefs would be created in your application
          rowData: this.rowData,
          columnDefs: this.columnDefs,
          pagination: true,
          rowSelection: 'single',

          // EVENTS
          // Add event handlers
          onRowClicked: event => console.log('A row was clicked'),
          onColumnResized: event => console.log('A column was resized'),
          onGridReady: event => console.log('The grid is now ready'),

          // CALLBACKS
          //isScrollLag: () => false
      }

      this.go = gridOptions;

      }

      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

/*        this.http
          .get('https://www.ag-grid.com/example-assets/olympic-winners.json')
          .subscribe((data) => {
            this.rowData = data;
          }); */

          console.log("grid ready");
        this.gridColumnApi.applyColumnState({
            state: [
              {
                colId: 'price',
                sort: 'desc',
              },
            ],
            defaultState: { sort: null },
          });
      }

    ngAfterViewInit(){

      console.log(this.go.api);
  //    this.go.api.redrawRows();
      this.go.api.onSortChanged();

    }
}
