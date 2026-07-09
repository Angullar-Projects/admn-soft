import { computed, Injectable, signal } from "@angular/core";
import { ProductoFormModel } from "../../domain/product.model";


//permite que esta clase sea un servicio inyectable
@Injectable({
    //root indica que habra una sola instancia de este servicio en toda la aplicación
    providedIn: 'root'
})
export class ProductoFacade {

    //variable signal que se encarga de verificar si la api esta enviando algo la api, se empieza con un valor de false, ya que no se esta enviando nada
    private readonly _loading = signal(false);
    //almacena un mensaje de error  en caso de existir, se empieza con un valor de null, ya que no hay ningun error
    private readonly _error= signal<string | null>(null);
    //guarda la operacion fue exitosa emoezamos con false, indica si hay exito al guardar
    private readonly _success = signal(false);
    ///guarda el producto creado que regresa la api, al inicio no hay producto, por eso empieza en null
    private readonly _createProduct = signal<ProductoFormModel | null>(null);
    //las variables computed son valores de solo lectura basados en signals
    //expone el valor de _loading, pero sin permitir que el componente lo modifique el componente puede leer pero no
    //modificar el valor
    readonly loading = computed( ()=> this._loading); 
    //permite que lea el error, peros in modificarlo o alterarlo
    readonly error = computed(()=> this._error()  );
    //permite que la UI sepa si el producto se guardo de forma correcta
    readonly success = computed( ()=> this._success());
    //permite que la ui lea el producto creado, sin modificar su estado
    readonly createProduct = computed(()=> this._createProduct());

    create( product: ProductoFormModel){
        //detectamos  el cambio oel movimiento
        this._loading.set(true);
        //limpiamos cualquier error anterior
        this._error.set(null);
        //reiniciamos la condicion de exito antes de guardar, si anteriormente se guardo
        //entonces se reinicia el proceso
        this._success.set(false);
        //limpiamos cualquier producto creado anteriormente
        this._createProduct.set(null);
    }
     
}