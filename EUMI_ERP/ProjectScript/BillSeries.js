

function GetDepartment(id) {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad(result.oList, id);


        }
    });
}

function DepartmentLoad(result, a) {
    $("#dept1").empty();
    $("#dept1").append("<option value='0'>-All-</option>");
    for (var i = 0; i < result.length; i++) {
        $("#dept1").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }

}


$(function () {
    Defaultfocus1();
    GetDepartment(0);
    $("#btnsubmit1").click(function (e) {
        SaveAndUpdate1(1)
    });

    $("#btndelete1").click(function (e) {
        SaveAndUpdate1(0)
        //$('#confirm').show();
        //$('#confirmOk').focus();
    });


    $("#startingnum,#currntnum").keypress(function (e) {

        if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only', 'startingnum', 'currntnum')
            return false;
        }

    });
});

function Defaultfocus1() {
    $('#billdesc').focus();
}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdate1(0)
    }
    $('#confirm').fadeOut();

}


function SaveAndUpdate1(Flag) {
    if ($('#billtype').val() == 0) {
        warningshow('Please Select Type', 'billtype');
    }
   else if ($('#billdesc').val() == "") {
        warningshow('Please Enter Bill Description', 'billdesc');
    }
   
    else if ($('#prefix').val() == "") {
        warningshow('Please Enter Prefix', 'prefix');
    }
    else if ($('#startingnum').val() == "") {
        warningshow('Please Enter Starting Number', 'startingnum');
    }
    else if ($('#currntnum').val() == "") {
        warningshow('Please Enter Current Number', 'currntnum');
    }
    else if ($('#dept1').val() == 0) {
        warningshow('Please Select Department ', 'dept1');
    }
    else {
        var data = {};   //array
        data.id = $('#id').val();
        data.BillDescription = $('#billdesc').val();
        data.BillType = $('#billtype').val();
        data.Prefix = $('#prefix').val();
        data.Terms = $('#terms').val();
        data.StartingNo = $('#startingnum').val();
        data.CurrentNo = $('#currntnum').val();
        data.DeptId = $('#dept1').val();
        data.DeleteFlag = Flag;
        data.TP = $('#billtype').val();
        $.ajax({
            type: "POST",
            url: "../Company/BillSeriesInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalertsthis(status);
                }
            }
        });

    }


}
function formrefresh1() {
    $('#billdesc').val('');
    $('#billtype').val('0');
    $('#prefix').val('');
    $('#terms').val('0');
    $('#startingnum').val('');
    $('#currntnum').val('');
    $('#dept1').val('0');
    $('#billdesc').focus();
    $('#id').val(0);
    $('#btndelete1').hide();
}

function closetable1(value) {
    $('#Entry1').show();
    $('#listing1').hide();
    if (value == 1)
        formrefresh1();
}


function ShowBillSerieslist(result) {
    disable_datatable('tblbillseries');
    $('#Entry1').hide();
    $('#listing1').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Bill Description</th><th>Bill Type</th><th>Prefix</th><th>Terms</th><th>Starting Number</th><th>Current Number</th><th>Department</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].BillDescription + '</td><td>' + result[i].BillType + '</td><td>' + result[i].Prefix + '</td><td>' + result[i].PayTerms + '</td><td>' + result[i].StartingNo + '</td><td>' + result[i].CurrentNo + '</td><td>' + result[i].Dept + '</td><td><a onclick="GetRows1(' + result[i].id + ',' + "'" + result[i].BillType + "'" + ')">' + Editbutton + '</a></td></tr>';
    }

    $('#tblbillseries').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblbillseries');
}


function ShowBillSeriesGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#billdesc').val(result[i].BillDescription);
        $('#billtype').val(result[i].BillType);
        $('#prefix').val(result[i].Prefix);
        $('#terms').val(result[i].Terms);
        $('#startingnum').val(result[i].StartingNo);
        $('#currntnum').val(result[i].CurrentNo);
        $('#dept1').val(result[i].DeptId);
        $('#billdesc').focus();
    }
    $('#Entry1').show();
    $('#listing1').hide();
    $('#btndelete1').show();
}



function GetRows1(id, BillType) {
    $('#id').val(id)
    var data = {};
    data.id = id;
    data.BillType = BillType;
    $.ajax({
        type: "POST",
        url: "../Company/BSeriesGetandGets",
        data: data,
        success: function (result) {
            if (id == 0)
                ShowBillSerieslist(result.oList);
            else
                ShowBillSeriesGet(result.oList);

        }
    });

}

function Showalertsthis(Status) {
    if (Status == 1) {
        formrefresh1();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh1();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh1();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh1();
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}
$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();
    if (e.altKey && e.keyCode == 83) {
        SaveAndUpdate1(1)
    }
    else if (e.altKey && e.keyCode == 76) {
        GetRows1(0)
    }
    else if (e.altKey && e.keyCode == 67) {
        formrefresh1();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable1();
    }

})
