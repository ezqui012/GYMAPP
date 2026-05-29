export class Membership{

    constructor(initDate, endDate, state, idMembershipType, idClient ){
        this.id_client=idClient;
        this.id_membership_type=idMembershipType;
        this.init_date=initDate;
        this.state=state;
        this.end_date=endDate;
        
    };
    setState(value){
        this.state=value;
    }
    setIdClient(value){
        this.id_client=value;
    }
    setIdMembershipType(value){
        this.id_membership_type=value;
    }
    setInitDate(value){
        this.init_date=value;
    }
    setEndDate(value){
        this.end_date=value;
    }

    getState(){
        return this.state;
    }

    getIdClient(){
        return this.id_client;
    }
    getIdMembershipType(){
        return this.id_membership_type;
    }
    getInitDate(){
        return this.init_date;
    }
    getEndDateClient(){
        return this.end_date;
    }

}