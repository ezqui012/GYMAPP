export class MembershipType{
    
    constructor(membershipName, description, duration, price){
        this.id=Date.now(),
        this._membershipName=membershipName,
        this._description=description,
        this._duration=duration;
        this._price=price;
    }

    update({ membershipName, description, duration, price}) {
        if(membershipName) this._membershipName = membershipName;
        if(description) this._description = description;
        if(duration) this._duration = duration;
        if(price) this._price = price;
    }
    set name(value){
        this._membershipName=value;
    }
    set description(value){
        this._description=value;
    }
    set duration(value){
        this._duration=value;
    }
    set price(value){
        this._price=value;
    }
    get name(){
        return this._membershipName;
    }
    get description(){
        return this._description;
    }
    get duration(){
        return this._duration;
    }
    get price(){
        return this._price;
    }
}