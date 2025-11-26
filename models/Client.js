export class Client {

    constructor (id, name, lastName, phone, ci, nit, photo, email){
        this.id=id;
        this.name=name;
        this.lastName=lastName;
        this.phone=phone;
        this.ci=ci;
        this.nit=nit;
        this.photo=photo
        this.email=email
    }
    getId(){
        return this.id;
    }
    getFullName(){
        return `${this.name} ${this.lastName}`;
    }
    getPhone(){
        return this.phone;
    }
    getCi(){
        return this.ci;
    }
    getNit(){
        return this.nit;
    }
    getEmail(){
        return this.email;
    }

    //setters
    setId(value){
        this.id=value;
    }
    setFullName(name){
        [this.name, this.lastName]= name.split(" ");
    }
    setPhone(value){
        this.phone=value;
    }
    setCi(value){
        this.ci=value;
    }
    setNit(value){
        this.nit=value;
    }
    setEmail(value){
        this.email=value;
    }
  

}