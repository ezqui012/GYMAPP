export class Membership{

    constructor(idClient, idMembershipType, initDate, endDate){
        this._idMembership=Date.now();
        this._idClient=idClient;
        this._idMembershipType=idMembershipType;
        this._initDate=initDate;
        this._endDate=endDate;
        
    };

    set idClient(value){
        this._idClient=value;
    }
    set idMembershipType(value){
        this._idMembershipType=value;
    }
    set initDate(value){
        this._initDate=value;
    }
    set endDate(value){
        this._endDate=value;
    }

    get idClient(){
        return this._idClient;
    }
    get idMembershipType(){
        return this._idMembershipType;
    }
    get initDate(){
        return this._initDate;
    }
    get endDateClient(){
        return this._endDate;
    }

}