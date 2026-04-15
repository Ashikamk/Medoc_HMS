var AccId = 2;
$(document).ready(function () {


    Defaultfocus();

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)

    });
});


function addaccessories() {

    $('#Accessdiv').append("<div class='form-group row' >"+
        "<div class='col-md-4'></div>"+
        "<div class='col-md-4' style=margin-left:6.2%><input type='hidden' class='form-control' id='txtCustId" + AccId + "' value='0' />"+
        "<input type='text' class='form-control' id='txtcustomer" + AccId + "'  onkeypress=CustLoad(" + AccId + ") /></div>"+
        "<div class='col-md-3'></div></div>")
    AccId++;

}


function ShowSalesmanGet(result) {

    $("#selectsalesman").empty();
    $("#selectsalesman").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#selectsalesman").append("<option value='" + result[i].Id + "'  >" + result[i].FirstName + "</option>");
    }
}
var data = {};
data.Id = 0;
$.ajax({
    type: "POST",
    url: "../Master/SalesmanGetandGets",
    data: data,
    success: function (result) {
        ShowSalesmanGet(result.oList);
    }
});




function SaveAndUpdate(Flag) {
  
    if ($('#selectsalesman').val() == 0) {
        warningshow('Please Select Salesman', 'Salesman');
    }
    else {
        
        var XArray = new Array();
        for (var i = 0; i <= AccId ; i++) {
           
            var SalesManId = $('#selectsalesman').val();
            var CustomerId = $('#txtCustId' + i).val();

            if (CustomerId != undefined && CustomerId != 'undefined' && CustomerId != 0 && CustomerId != '') {
                XArray.push({ 'SalesmanId': SalesManId, 'SalesCustId': 0, 'CustomerId': CustomerId })
            }
        }
       console.log(XArray)
        if (XArray != "") {          
            var data = { 'SalesCust': XArray };
            $.ajax(
            {
            type: "POST",
            url: "../ProductMstElectroniccs/SalesCustUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                NewShowalertsfun(status);
            }
        });
        }
        else {
            warningshow('Please Select Customer', 'txtcustomer0');
        }
    }
}

function NewShowalertsfun(Status) {
    if (Status == 1) {
        formrefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }   
    else if (Status == 7) {
        swal('Already Linked', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }


}


function formrefresh() {
    AccId = 2;
    $('#selectsalesman').val(0); 
    $('#Accessdiv').html('');
    $('#txtcustomer0,#txtCustId0').val('');
    Defaultfocus();

}
function Defaultfocus() {
    $('#selectsalesman').focus();
}


//function Showaccessories(result) {
//    if (result.length >= 1) {
//        $('#Accsessories_1').val(result[0].AccessoriesName);
//        $('#Accsessories_1_Id').val(result[0].AccessoriesId);
//    }
//    for (var i = 1; i < result.length; i++) {

//        $('#Accessdiv').append("<div class='form-group row'><div class='col-md-3'><input type='hidden' class='form-control' id='Accsessories_" + AccId + "_Id' value='" + result[i].AccessoriesId + "' /><input type='text' class='form-control' id='Accsessories_" + AccId + "' onkeypress=AccessoriesLoad('Accsessories_" + AccId + "') onkeyup=CheckID('Accsessories_" + AccId + "') value='" + result[i].AccessoriesName + "' /></div></div>")
//        AccId++;

//    }
//}
