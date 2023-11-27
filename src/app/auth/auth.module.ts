import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'
import { AuthRoutingModule } from './auth.routing.module';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations:[
        LoginComponent
    ],
    imports:[
        CommonModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,

        AuthRoutingModule,
        FormsModule,
    ],
    exports:[
    ]
    })
    export class AuthModule { }
