import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {withObserver} from './utils';
import {Producto} from './producto.service';
import {PedidoProducto} from './pedido.service';
export class Usuario{
  private static num: number =0;
  private id: number;
  private nombre: string;
  private primerApellido: string;
  private segundoApellido: string;
  private userName: string;
  private userLogin: string;
  private email:string;
  private pedidos: Array<Array<PedidoProducto>>;
  private admin: boolean;


  constructor(nombre: string, primerApellido: string, segundoApellido: string, userName: string, userLogin: string,email:string,admin : boolean){
    Usuario.num = Usuario.num+1;
    this.id= Usuario.num;
    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.email = email;
    this.userName = userName;
    this.userLogin = userLogin;
    this.admin = admin;
    this.pedidos = new Array<Array<PedidoProducto>>();

  }
  set Comprar(pedido:Array<PedidoProducto>){
    this.pedidos.push(pedido);
  }
  get Comprados():Array<Array<PedidoProducto>>{
    return this.pedidos;
  }
  get Id():number{
    return this.id;
  }
  get Nombre():string{
    return this.nombre;
  }
  get Email():string{
    return this.email;
  }
  get PrimerApellido():string{
    return this.primerApellido;
  }
  get SegundoApellido():string{
    return this.segundoApellido;
  }
  get UserName():string{
    return this.userName;
  }
  get UserLogin():string{
    return this.userLogin;
  }

  get TipoUsuario():String{
    if(this.Nombre==''){
      return 'Anonimo';
    }else if(this.EsAdmin){
      return 'admin'
    }else{
      return 'usuario'};
  }
  get EsAdmin():boolean{
    return this.admin;
  }


  set Nombre(nombre:string){
     this.nombre=nombre;
  }
  set Email(e:string){
    this.email=e;
  }
  set PrimerApellido(pa:string){
    this.primerApellido=pa;
  }
  set SegundoApellido(sa:string){
    this.segundoApellido=sa;
  }
  set UserName(user:string){
    this.userName=user;
  }
  set UserLogin(pass:string){
    this.userLogin=pass;
  }
  get Usuario():Usuario{
    return this;
  }
}
@Injectable()
export class UsuarioService{
  users = [new Usuario('manolo', 'Felipe', 'estac', 'admin', 'admin','manolof.estac@gmail.com',true),
  new Usuario('Carlos', 'casf', 'perfsj', 'user', 'user','carlosC.ca@gmail.com',false)];

  usuario= new Usuario("","","","","","",false);

  get usuarioReg(){
    return withObserver(this.usuario);
  }

  getProducto(id: number | string) {
    let user = this.users.filter(h => h.Id === +id)[0]
    return withObserver(user);
  }

  getComprobarUsuario(nombre:string,pass:string):number {
    let encontrado:number =0;
    for(let user of this.users) {
      if (user.UserName==nombre && user.UserLogin==pass) {
        encontrado= user.Id;
      }
    }
    return encontrado;
  }
  getusuario(id:number | string){
      let usuario = this.users.filter(h => h.Id === +id)[0];
      return usuario;
  }

  set loguear(id:number){
    this.usuario = this.getusuario(id);
  }
  deloguear(){
    let usuario = new  Usuario("","","","","","",false);
    this.usuario = usuario;
  }
  getUsuarios(){
    return withObserver(this.users);
  }

  addPedido(pedido:Array<PedidoProducto>){
      let usuario = this.users.filter(h => h.Id === this.usuario.Id)[0];
      usuario.Comprar= pedido;
    }
}
