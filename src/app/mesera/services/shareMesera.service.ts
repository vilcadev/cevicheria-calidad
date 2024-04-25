import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({providedIn: 'root'})
export class ShareMeseraService {


    private mesaId: string;

    private mesaIdSubject = new BehaviorSubject<string>(null);
    mesaId$ = this.mesaIdSubject.asObservable();

    setMesaId(id: string) {
        this.mesaIdSubject.next(id);
      }


    // setMesaId(value:string){
    //     this.mesaId = value;
    // }

    getMesaId(){
        return this.mesaId;
    }

    resetVariable(){
        this.mesaId = null;
    }


}
