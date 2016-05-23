import {Component} from 'angular2/core';
import {RouteParams, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Producto,ProductoService}   from './services/producto.service';

@Component({
    template: `
            <div id="products">
                <h3>Productos</h3>
                <ul class="nav nav-tabs">
                    <li><a data-toggle="tab" [routerLink]="['AdmProductos']">Productos existentes</a></li>
                    <li class="active"><a data-toggle="tab" href="#addproduct">Añadir producto</a></li>
                </ul>
                <div class="tab-content">
                    <div id="addproduct" class="tab-pane fade  in active">
                        <h3>Nuevo producto</h3>
                        <br>
                        <div id="formAddProducto">

                                <p>
                                    <label>Nombre del producto:</label>
                                    <input [(ngModel)]="producto.Nombre" type="text" name="name" required="required">
                                </p>
                                <div *ngIf="producto.Id">
                                    <label>Id: </label>{{producto.Id}}</div>
                                <div>
                                <p>
                                    <label>Imagen:</label>
                                    <input type="file">
                                </p>
                                <p>
                                    <label>Imagen:</label>
                                    <input [(ngModel)]="producto.Img" type="text" name="img" required="required">
                                </p>
                                <label>Descripción breve:</label>
                                <p>
                                    <textarea [(ngModel)]="producto.DescripcionC" rows="5" cols="100" required="required"></textarea>
                                </p>
                                <p>
                                    <label>Precio:</label>
                                    <input [(ngModel)]="producto.Precio" type="number" name="price" required="required">
                                </p>
                                <label>Descripción:</label>
                                <p>
                                    <textarea [(ngModel)]="producto.DescripcionL" rows="5" cols="100" required="required"></textarea>
                                </p>
                                <p>
                                    <label>Cantidad:</label>
                                    <input [(ngModel)]="producto.Stock" type="number" name="quantity">
                                </p>
                                <p>
                                    <label>Categoria:</label>
                                    <select>
                                        <option value="Ultrabook">Ultrabook</option>
                                        <option value="Portatil">Portatil</option>
                                        <option value="Smartphone">Smartphone</option>
                                        <option value="TabletPC">TabletPC</option>
                                    </select>
                                </p>
                                <button (click)="cancelar()" class="btn btn-default" name="cancelar" value="Cancelar" id="botonAdmin"><i class="fa fa-times fa-fw"></i> Cancelar</button>
                                <button (click)="guardar()" class="btn btn-default" name="enviar" value="Enviar" id="botonAdmin"><i class="fa fa-floppy-o fa-fw"></i> Guardar</button>

                        </div>
                    </div>
                </div>
            </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})

export class AdmNuevoProductoComponent {

  newProducto: boolean;
    producto: Producto;

    constructor(
      private _router:Router,
      routeParams:RouteParams,
      private service: ProductoService){

        let id = routeParams.get('id');
        if(id){
          service.getProducto(id).subscribe(
            producto => this.producto = producto,
            error => console.error(error)
          );
          this.newProducto = false;
        } else {
          this.producto = new Producto('','','',undefined,undefined,'',true,false,'');
          //this.producto.editarId(Producto.arrayProductos[Producto.arrayProductos.length-1].Id==this.producto.Id);
          this.newProducto = true;
        }
    }

    cancelar() {
      window.history.back();
    }

    guardar() {
      this.service.saveProducto(this.producto);
      window.history.back();
    }

}