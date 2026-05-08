export class Membership{

    constructor(initDate, endDate, isActive, idMembershipType, idClient ){
        this.id_client=idClient;
        this.id_membership_type=idMembershipType;
        this.init_date=initDate;
        this.is_active=isActive;
        this.end_date=endDate;
        
    };
    set isActive(value){
        this.is_active=value;
    }
    set idClient(value){
        this.id_client=value;
    }
    set idMembershipType(value){
        this.id_membership_type=value;
    }
    set initDate(value){
        this.init_date=value;
    }
    set endDate(value){
        this.end_date=value;
    }

    get isActive(){
        return this.is_active;
    }

    get idClient(){
        return this.id_client;
    }
    get idMembershipType(){
        return this.id_membership_type;
    }
    get initDate(){
        return this.init_date;
    }
    get endDateClient(){
        return this.end_date;
    }

}