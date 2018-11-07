import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { OrderWindowComponent } from './order-window.component';
import { OrderWindowRoutingModule } from './order-window-routing.module';
import { SharedModule } from '../shared/shared.module';

import { OrderRequestService } from './order-request.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrderWindowRoutingModule,
    SharedModule,
    Ng2Bs3ModalModule,
    ReactiveFormsModule],
  declarations: [OrderWindowComponent],
  exports: [OrderWindowComponent],
  providers: [OrderRequestService]
})
export class OrderWindowModule { }
