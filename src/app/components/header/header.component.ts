import { UIControlService } from './../../services/uicontrol.service';
import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { NavigationStart, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { filter, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CartComponent, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private uiControlService: UIControlService) {}

  isShowCart$ = new Observable<boolean>();

  //handle cart visibility using service
  ngOnInit() {
    this.isShowCart$ = this.uiControlService.getCartVisiblity();
  }

  //handle cart visibility using router
  // ngOnInit() {

  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationStart))
  //     .subscribe((event) => {
  //       this.isShowCart = event.url === '/home';
  //     });
  // }
}
