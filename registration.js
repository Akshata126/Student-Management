function validReg()
{
    var eid1=document.registration.eid;
    var name=document.registration.ename;
    var address=document.registration.addr;
    var ezip=document.registration.zipcd;
    var eemail=document.registration.emailid;
    var Mob=document.registration.MobNo;
    var City=document.registration.city;
    var State=document.registration.state;
    var Country=document.registration.country;
    if(eid_validation(eid1,5,12)){
        if(allLetter(name)){
            if(alphanumeric(address)){
                if(allnumeric(ezip)){
                    if(ValidateEmail(eemail)){
                        if(allnumeric(Mob)){
                            if(cityselect(City)){
                                if(stateselect(State)){
                                    if(countryselect(Country)){

                                    }

                                }
                            }
                        }
                    }
                }

            }
            

        }

    }
    return false;
}

function eid_validation(eid1,mx,my)
{
    var eid_len=eid1.value.length;
    if(eid_len==0||eid_len>=my||eid_len<mx)
    {
        alert("User id should not be empty / length between "+mx+ "to "+my);
        eid1.focus();
        return false;
    }
    return true;
}


function allLetter(name){
    var letters=/^[A-Za-z]+$/;
    if(name.value.match(letters)){
        return true;
    }
    else{
        alert("user name must be character");
        name.focus();
        return false;
    }

}

function alphanumeric(address){
    var letters=/^[0-9A-Za-z]+$/;
    if(address.value.match(letters)){
        return true;
    }
    else{
        alert("user address must be alpha numeric character only");
        address.focus();
        return false;
    }
}

function allnumeric(ezip){
    var letters=/^[0-9]+$/;
    if(ezip.value.match(letters)){
        return true;
    }
    else{
        alert("Zip code must be numeric character");
        ezip.focus();
        return false;
    }
}

function ValidateEmail(eemail){
    var emformat=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(eemail.value.match(emformat))
    {
        return true;
    }
    else
    {
        alert("You have entered invalid email address");
        eemail.focus();
        return false;
    }
}
function allnumeric(Mob){
    var letters=/^[0-9]+$/;
    if(Mob.value.match(letters)){
        return true;
    }
    else{
        alert("Mob No. must be numeric character");
        Mob.focus();
        return false;
    }
}


function cityselect(City){
    if(City.value=="Default"){
        alert("select your city from the list");
        City.focus();
        return false;
    }
    else{
        return true;
    }
}

function stateselect(State){
    if(State.value=="Default"){
        alert("select your state from the list");
        State.focus();
        return false;
    }
    else{
        return true;
    }

}

function stateselect(Country){
    if(Country.value=="Default"){
        alert("select your country from the list");
        Country.focus();
        return false;
    }
    else{
        return true;
    }

}