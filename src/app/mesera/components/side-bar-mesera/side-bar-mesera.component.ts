import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar-mesera',
  templateUrl: './side-bar-mesera.component.html',
  styleUrls: ['./side-bar-mesera.component.scss']
})
export class SideBarMeseraComponent {

    sidebarVisible: boolean = false;

    logout(){
        localStorage.removeItem('token');
    }

}
