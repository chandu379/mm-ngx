import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent, ModalComponent } from './admin.component';
import { OrderRequestDetailComponent } from './orderRequest-detail.component';
import { AdminRoutingModule } from './admin-routing.module';
import { OrderWindowModule } from '../order-window/order-window.module';
import { AdminService } from './admin.service';
import { SharedModule } from '../shared/shared.module';

import { Ng2SmartTableModule } from 'ng2-smart-table'; // ng2-smart-table

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OrderWindowModule,
    SharedModule,
    Ng2SmartTableModule,
    Ng2Bs3ModalModule
    ],
  declarations: [AdminComponent, OrderRequestDetailComponent, ModalComponent],
  exports: [AdminComponent],
  providers: [AdminService]
})
export class AdminModule { }
