export class MembershipType{
    
    constructor(name, description, duration, price){
        this.name=name,
        this.description=description,
        this.duration=duration;
        this.price=price;
    }

    update({ name, description, duration, price}) {
        if(name) this.name = name;
        if(description) this.description = description;
        if(duration) this.duration = duration;
        if(price) this.price = price;
    }
    setName(value){
        this.name=value;
    }
    setDescription(value){
        this.description=value;
    }
    setDuration(value){
        this.duration=value;
    }
    setPrice(value){
        this.price=value;
    }
    getName(){
        return this.name;
    }
    getDescription(){
        return this.description;
    }
    getDuration(){
        return this.duration;
    }
    getPrice(){
        return this.price;
    }
}