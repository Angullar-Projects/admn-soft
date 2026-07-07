import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ProductoFormModel } from '../domain/product.model';

@Injectable({
    providedIn:'root'
})
export class ProductApi {

    private readonly http= inject(HttpClient);
    private readonly apiBaseUrl=  `${environment.apiBaseUrl}/products`; 

    create(product: ProductoFormModel):Observable<ProductoFormModel>{
        return this.http.post<ProductoFormModel>(this.apiBaseUrl, product);
    }
}

