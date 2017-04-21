import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderRequest } from '../order-window/order-request';
import { AdminService } from './admin.service';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

@Component({
    moduleId: module.id,
    selector: 'mm-admin',
    templateUrl: 'admin.component.html',
    styleUrls: ['admin.component.css']
})

export class AdminComponent implements OnInit {
    orderRequests: OrderRequest[];
    //selectedOrderRequest: OrderRequest;
    title: string = 'Welcome Admin';
    customerDetails: FormGroup;
    userDetails: FormGroup;
    source: LocalDataSource; // setting LocalDataSource for the table

    /**
     * settings for the smart table
     * @memberOf AdminComponent
     */
    settings = {
        mode: 'external',
        actions: {
            columnTitle: 'Actions'
        },
        delete: {
            confirmDelete: true
        },
        add: {
            confirmCreate: true
        },
        edit: {
            confirmSave: true
        },
        columns: {
            id: {
                title: 'ID',
                filter: false
            },
            fullname: {
                title: 'Fullname',
                filter: false
            },
            tel: {
                title: 'Primary Tel No.',
                filter: false
            },
            watel: {
                title: 'Whatsapp No.',
                filter: false
            },
            location: {
                title: 'Location',
                filter: false
            },
            mail: {
                title: 'Email',
                filter: false
            },
            manual: {
                title: 'Manual message',
                filter: false
            },
            termsAccepted: {
                title: 'Terms Accepted',
                filter: false
            },
            confirmationId: {
                title: 'Confirmation ID',
                filter: false
            }
            /*button: {
                title: 'Button',
                type: 'html',
                valuePrepareFunction: (value: any) => {
                    return '<button (click)="showAlert()">Test</button>';
                }
            }*/
        }
    };

    constructor(private adminService: AdminService, private fb: FormBuilder) {
        this.getOrderRequests();
    }

    /**
     * FormGroup initialization
     * @memberOf AdminComponent
     */
    ngOnInit() {
        this.customerDetails = this.fb.group({
            tel: ['', [Validators.required]],
            location: ['', [Validators.required]],
            fullname: ['', [Validators.required]],
            watel: ['', [Validators.required]],
            mail: [''],
            termsAccepted: [''],
            confirmationId: [''],
            manual: [''],
            id: ['']
        });

        this.userDetails = this.fb.group({
            tel: [''],
            location: [''],
            fullname: [''],
            watel: [''],
            mail: [''],
            uFile: [''],
            manual: [''],
            termsAccepted: [true],
            confirmationId: ['']
        });
    }

    onSearch(query: string = '') {
        this.source.setFilter([
            // fields we want to include in the search
            {
                field: 'id',
                search: query
            },
            {
                field: 'fullname',
                search: query
            },
            {
                field: 'tel',
                search: query
            },
            {
                field: 'mail',
                search: query
            }
        ], false);
        // second parameter specifying whether to perform 'AND' or 'OR' search
        // (meaning all columns should contain search query or at least one)
        // 'AND' by default, so changing to 'OR' by setting false here
    }

    /**
     * returns the orderRequests
     * @returns
     * @memberOf AdminComponent
     */
    /*  getOrderRequests(): void {
          this.adminService.getOrderRequests()
              .then(orderRequests => this.orderRequests = orderRequests);
      }
  
      /**
       * sets the selectedOrderRequest
       * @param {OrderRequest} orderRequest
       * @memberOf AdminComponent
       */
    /*   onSelect(orderRequest: OrderRequest): void {
           this.selectedOrderRequest = orderRequest;
       }
   
       /**
        * displays and hides the edit block on button click
        * @memberOf AdminComponent
        */
    /* edit(): void {
         let result = document.getElementById('edit').style.display;
         if (result === 'none') {
             document.getElementById('edit').style.display = 'block';
         } else {
             document.getElementById('edit').style.display = 'none';
         }
     }
 
     /**
      * passing the orderRequest object to the in memory db service
      * @param {{ value: OrderRequest, valid: boolean }} { value, valid }
      * @returns {void}
      * @memberOf AdminComponent
      */
    /* add({ value, valid }: { value: OrderRequest, valid: boolean }): void {
         this.adminService.create(value)
             .then(orderRequest => {
                 this.orderRequests.push(orderRequest);
                 console.log('All: ' + JSON.stringify(this.orderRequests));
             });
         this.selectedOrderRequest = null;
         this.customerDetails.reset();
     }
 
     /**
      * deletes an entry from the table
      * @param {OrderRequest} orderRequest
      * @memberOf AdminComponent
      */
    /*  delete(orderRequest: OrderRequest): void {
          this.adminService
              .delete(orderRequest.confirmationId)
              .then(() => {
                  this.orderRequests = this.orderRequests.filter((o: any) => o !== orderRequest);
                  if (this.selectedOrderRequest === orderRequest) { this.selectedOrderRequest = null; }
              });
      }*/

    /**
     * get the list of orderRequests
     * @memberOf AdminComponent
     */
    getOrderRequests() {
        this.source = new LocalDataSource();
        this.adminService.getOrderRequests()
            .then((orderRequests) => {
                this.source.load(orderRequests);
                console.log(' OrderRequests: ' + JSON.stringify(orderRequests) + ' \n ');
            });
    }

    /**
     * calling delete method from the adminService
     * @param {*} event
     * @memberOf AdminComponent
     */
    onDeleteConfirm(event: any) {
        let orderRequest: OrderRequest = event.data;
        console.log('Delete function called: ' + JSON.stringify(orderRequest));
        this.adminService.delete(orderRequest)
            .then(() => null);//{
        //this.source.remove(event.data);
        //});
        //this.source.remove(event.data);
        event.confirm.resolve();
        this.getOrderRequests();
    }

    /**
     * updates an entry
     * @param {*} event
     * @memberOf AdminComponent
     */
    onSaveConfirm(event: any) {
        //console.log('onSaveConfirm: ' + JSON.stringify(event.newData));
        this.adminService.update(event.newData)
            .then(() => null);//{
        //this.source.update(event.newData, JSON.stringify(event.newData));
        //});
        //event.confirm.resolve(event.newData);
        this.getOrderRequests();
    }

    /**
     * creating a new entry from the smart table
     * @param {*} event
     * @memberOf AdminComponent
     */
    onCreateConfirm(event: any) {
        this.adminService.create(event.newData)
            .then(() => null);//{
        //this.source.add(event.newData);
        //});
        event.confirm.resolve(event.newData);
        this.getOrderRequests();
    }

    onCreate(event: any) {
        console.log(event);
    }

    onDelete(event: any) {
        console.log(event);
    }

    onSave(event: any) {
        console.log(event);
    }
    /*
      showAlert() {
          alert('Button clicked');
      }*/
}

@Component({
    selector: 'app-modal',
    template: `
  <div (click)="onContainerClicked($event)" class="modal fade" tabindex="-1" [ngClass]="{'in': visibleAnimate}"
       [ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <ng-content select=".app-modal-header"></ng-content>
        </div>
        <div class="modal-body" (click)="onSubmit($event)">
          <ng-content select=".app-modal-body"></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select=".app-modal-footer"></ng-content>
        </div>
      </div>
    </div>
  </div>
  `,
    styles: [`
    .modal {
      background: rgba(0,0,0,0.6);
    }
  `]
})
export class ModalComponent {

    orderRequests: OrderRequest[];
    public visible = false;
    private visibleAnimate = false;

    constructor(private adminService: AdminService) {

    }

    public show(): void {
        this.visible = true;
        setTimeout(() => this.visibleAnimate = true, 100);
    }

    public hide(): void {
        this.visibleAnimate = false;
        setTimeout(() => this.visible = false, 300);
    }

    public onContainerClicked(event: MouseEvent): void {
        if ((<HTMLElement>event.target).classList.contains('modal')) {
            this.hide();
        }
        console.log(event);
    }

    onSubmit(event:any) {
        console.log(event);
    }

    /*onSubmit({ value, valid }: { value: OrderRequest, valid: boolean }): void {
        let result = JSON.stringify(value);
        if (!result) {
            return;
        }
        this.adminService.create(value)
            .then(orderRequest => {
                this.orderRequests.push(orderRequest);
            });
    }*/
}
