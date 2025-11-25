export class Employee{
    constructor(id, name, lastname, email, phone, ci, photo, schedule, role){
        this.id=id;
        this.name=name;
        this.lastname=lastname;
        this.email=email;
        this.phone=phone;
        this.ci=ci;
        this.photo=photo;
        this.role=role;
        this.schedule=schedule;
    }
    toObject(){
        return{
            name: this.name,
            lastname: this.lastname,
            emai: this.email,
            phone: this.phone,
            ci: this.ci,
            photo: this.photo,
            schedule: this.schedule,
            role: this.role
        }
    }
    //getters
    getEmployeeId(){
        return this.id;
    }
    getEmployeeFullName(){
        return `${this.name}` `${this.lastname}`;
    }
    getEmail(){
        return this.email;
    }
    getPhone(){
        return this.phone;
    }
    getCi(){
        return this.ci;
    }
    getPhoto(){
        return this.photo;
    }
    getSchedule(){
        return this.schedule;
    }
    getRole(){
        return this.role
    }

    //setters
    setId(value){
        this.id=value;
    }
    setName(value){
        this.name=value;
    }
    setLastname(value){
        this.lastname=value;
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
    setEmail(value){
        this.email=value;
    }
    setSchedule(value){
         this.schedule=value;
    }
    setRole(value){
         this.role=value;
    }    
    setPhoto(value){
         this.photo=value;
    }
}