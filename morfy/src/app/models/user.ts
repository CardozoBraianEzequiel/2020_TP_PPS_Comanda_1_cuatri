export class User {
    email?: string;
    name?: string;
    lastName?:string;
    id?: string;
    imageUrl?: string;
    type?: string;
    dni?:string;
    cuil?:string;
    approved?:boolean;


  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

}