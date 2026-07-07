import { Injectable } from "@angular/core";


//permite que esta clase sea un servicio inyectable
@Injectable({
    //root indica que habra una sola instancia de este servicio en toda la aplicación
    providedIn: 'root'
})
export class ProductoFacade {

    constructor(){
        
    }
    
}