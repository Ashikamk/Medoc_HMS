$(document).ready(function () {
    Defaultfocus();
  //  GetNationalityselect(0);

    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {
            CountryLoad(result.oList);
        }
    });



    $("#btnsubmit").click(function (e) {
        if ($('#Email').val() != "") {
            var Email = $('#Email').val();
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            if (!re.test(Email)) {
                warningshow('Invalid Email ID', 'Email')
                return false
            }
        }
        SaveAndUpdate(1)
    });



    $("#PhoneNo,#Mobno").keypress(function (e) {
      
        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', $(this).attr('id')) 
            return false;
        }

    });


    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {
            CountryLoad(result.oList);
        }
    });

});

function CountryLoad(result) {
    $("#Nationality").empty();
    $("#Nationality").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Nationality").append("<option value='" + result[i].CountryId + "'>" + result[i].CountryName + "</option>"); 
    }
}

function Defaultfocus() {
    $('#LandName').focus();

}
function CountryLoad(result) {
    $("#Nationality").empty();
    $("#Nationality").append("<option value='0'>----Select Country----</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Nationality").append("<option value='" + result[i].CountryId + "'>" + result[i].CountryName + "</option>");
    }
}

function SaveAndUpdate(Flag) {

    if ($('#LandName').val() == "") {
        warningshow('Please Enter LandLord Name', 'LandName');
    }
    else if ($('#Nationality').val() == "0") {
        warningshow('Please Select Nationality', 'Nationality');
    }

        ////Submit Code in else part

    else {
        var data = {};   //array
        data.Lan_Id = $('#Lan_Id').val();;
        data.LandName = $('#LandName').val();
        data.Nationality = $('#Nationality').val();
        data.Profession = $('#Profession').val();
        data.Pobox = $('#Pobox').val();
        data.PhoneNo = $('#PhoneNo').val();
        data.Email = $('#Email').val();
        data.Faxno = $('#Faxno').val();
        data.Mobno = $('#Mobno').val();
        data.Address1 = $('#Address1').val();
        data.Address2 = $('#Address2').val();
        data.Address3 = $('#Address3').val();
        data.CreatedDate = CurDate;
        data.DelFlag = Flag;
        //ajax code for insert and update to master controller

        $.ajax({
            type: "POST",
            url: "../Realestate/LandlordInsertandUpdates",
            data: data,
            success: function (result) {
               
                    var status = result.oList[0].Status;
                   // alert(status);
                    Showalerts(status);
            
            }
        });
    }
}


function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}



function newform() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}


function formrefresh() {
    $('#LandName').val('');
    $('#Nationality').val('0');
    $('#Pobox').val('');
    $('#Profession').val('');
    $('#Address1').val('');
    $('#Address2').val('');
    $('#Address3').val('');
    $('#PhoneNo').val('');
    $('#Email').val('');
    $('#Faxno').val('');
    $('#Mobno').val('');
    
    $('#Lan_Id').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('#LandName').focus();

}


function GetRows(Lan_Id) {
    $('#Lan_Id').val(Lan_Id)
    var data = {};
    data.Lan_Id = Lan_Id;
    $.ajax({
        type: "POST",
        url: "../Realestate/LandlordGetandGetss",
        data: data,
        success: function (result) {
            if (Lan_Id == 0)
                ShowArealist(result.oList);
            else
                ShowAreaGet(result.oList);

        }
    });

}




function ShowArealist(result) {
    disable_datatable('tblBank');
    $('#Entry').hide();
    $('#listing').show();
    $('#btnnew').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Name</th><th>Email</th><th>Fax Number</th><th>Mobile</th><th>Adress</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].LandName + '</td><td>' + result[i].Email + '</td><td>' + result[i].Faxno + '</td><td>' + result[i].Mobno + '</td><td>' + result[i].Address1 + '</td><td><a onclick="GetRows(' + result[i].Lan_Id + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblBank').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>Name</th><th>Email</th><th>Fax Number</th><th>Mobile</th><th>Adress</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblBank');
}

function ShowAreaGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#LandName').val(result[i].LandName);
        $('#Nationality').val(result[i].Nationality);
        $('#Profession').val(result[i].Profession);
        $('#Pobox').val(result[i].Pobox);
        $('#PhoneNo').val(result[i].PhoneNo);
        $('#Email').val(result[i].Email);
        $('#Faxno').val(result[i].Faxno);
        $('#Mobno').val(result[i].Mobno);
       
        $('#Address1').val(result[i].Address1);
        $('#Address2').val(result[i].Address2);
        $('#Address3').val(result[i].Address3);
       
        $('#LandName').focus();
    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}