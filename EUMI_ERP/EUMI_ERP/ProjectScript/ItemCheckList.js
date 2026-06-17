var CheckListCmpLength = '';
var MaxCheckListId = 0;
var CopyFlag = 0;
var QtyCheckFlag = 0;
$(document).ready(function () {
    GetRows(0);

    $("#Chasisnumber").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#description").focus();
        }
    });
    $("#description").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btnsubmit").focus();
        }
    });
    Defaultfocus();
});
function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}
function empty() {
    $('#description').val('');
    $('#description').prop('disabled', false);
    $('#ItemId').val('');
}



function formrefresh() {
   
    $('#Chasisnumber').val('');
    $('#description').val('');
    $('#description').prop('disabled', false);   
    CheckListCmpLength = '';
    CopyFlag = 0;
    $('#ItemId').val('');
    $('#Chasisnumber').focus();
    $('#btndelete').hide();
    QtyCheckFlag = 0;
    GetRows(0);
}



function SaveAndUpdate(Flag) {
    QtyCheckFlag = 0;
    if ($('#ItemId').val() == 0) {
        warningshow('Please Enter Valid Chasis Number', 'Chasisnumber');
    }
    else if ($('#Chasisnumber').val() == "") {
        warningshow('Please Enter Chasis Number', 'Chasisnumber');
    }
    else if ($('#description').val() == "") {
        warningshow('Please Enter Description', 'description');
    }
    else {

        var check = 1;

        var oArray = new Array();
        for (var i = 1; i <= MaxCheckListId; i++) {
            var ItemId = $('#ItemId').val();
            var CheckListId = $('#checklistid' + i).val();
            var UserId = 1;
            var DeptId = 1;
            if ($('#avail' + i).is(':checked')) {
                check = 1;
            }
            else {
                check = 0;
            }

            var avail = check;
            var qty = $('#qty' + i).val();
            if (CopyFlag == 0)
                var DelFlag = 1;
            else if (CopyFlag == 1)
                var DelFlag = 0;

            //  alert(check)   

            if (avail == 1 && qty == 0) {
                QtyCheckFlag = 1;
                warningshow('Quantity Cannot be Zero', 'qty' + i);
                $('#qty' + i).select();
                break;
            }
            else {
                if (CheckListId != 0 && CheckListId != undefined) {
                    oArray.push({
                        'ItemId': ItemId,
                        'CheckListId': CheckListId,
                        'UserId': UserId,
                        'DeptId': DeptId,
                        'avail': avail,
                        'qty': qty,
                        'DelFlag': DelFlag
                    })
                }
            }
        }

        if (oArray != "" && QtyCheckFlag!=1) {
            var data = { 'CheckListNew': oArray };
            $.ajax(
        {
            type: "POST",
            url: "../LocationTransfer/CheckListInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[0].Status;
                    Showalerts(status);
                }
            }
        });
        }
    }
}



function ischecked(id) {

    if ($('#avail' + id).prop("checked")) {
        $('#qty' + id).val(1);
        $('#qty' + id).prop('disabled', false);
    }

    else {
        $('#qty' + id).val(0);
        $('#qty' + id).prop('disabled', true);
      
      
    }
    
}

function Defaultfocus()
{
    $('#Chasisnumber').focus(); 
}


function GetRows(CheckListId) {
    console.log('inside')
    var data = {};
    data.CheckListId = CheckListId;
    console.log(data)
    $.ajax({
        type: "POST",
        url: "../LocationTransfer/CheckListComponentsGetandGets",
        data: data,
        success: function (result) {
            ChecklistCmpLoad(result.oList);


        }
    }
    )
};



function GetList(CheckListId) {
    console.log('inside')
    $('#CheckListId').val(CheckListId)
    var data = {};
    data.CheckListId = CheckListId;
    console.log(data)
    $.ajax({
        type: "POST",
        url: "../LocationTransfer/CheckListGetandGets",
        data: data,
        success: function (result) {
            
            if (CheckListId == 0)
               CheckList(result.oList);
            else
                CheckListGet(result.oList);


        }
    }
    )
};



function CheckList(result) {
    disable_datatable('tblCheckListMain');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=15px>Slno</th><th>Chasis Number</th><th>Description</th><th>Components</th><th>Availability</th><th>Quantity</th><th>UserName</th><th width=15px>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td>' + slno + '</td><td>' + result[i].ItemCode + '</td><td>' + result[i].Description + '</td><td>' + result[i].Components + '</td><td>' + result[i].avail + '</td><td>' + result[i].qty + '</td><td>' + result[i].UserName + '</td></td><td align=center><a onclick="GetList(' + result[i].ItemId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblCheckListMain').html(responseText + '</tbody><tfoot><tr><th>Slno</th><th>ChasisNumber</th><th>Description</th><th>Components</th><th>Quantity</th><th>key</th><th>UserName</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch('tblCheckListMain');
}



function ChecklistCmpLoad(result) {
    $('#tbl_checklist tr').remove();
    var responseText = '';
    var slno = 0;
    var bt = '<i class="ft-camera"></i>';
    for (var i = 0; i < result.length; i++) {
        // alert(result[i].Key)
        slno = i + 1;

        responseText += '<tr><td><div class="form-group row" style="height:40px"><label class="col-md-4" for="code" id="Component_' + result[i].CheckListId + '">' + result[i].Key + '</label><input class="form-control" type="hidden" id="checklistid' + result[i].CheckListId + '" value="' + result[i].CheckListId + '" >' +
            '<div class="col-md-3 custom-control  custom-checkbox" ><input type="checkbox" class="custom-control-input" id="avail' + result[i].CheckListId + '" checked="" onchange=ischecked(' + result[i].CheckListId + ')><label class="custom-control-label" for="avail' + result[i].CheckListId + '">Available </label></div>' +
            '<div class="col-md-3 input-group" style="margin-top:-10px"><input class="form-control qtyzerocheck" type="text" style="height:100%" onkeypress="isNumberInt(event,this)" id="qty' + result[i].CheckListId + '" value="1" autocomplete="off"> <div class="input-group-append"><button class="btn btn-outline-primary" style="height:100%">' + bt + ' </button> </div>  </div></div></td></tr>';



        MaxCheckListId = result[i].CheckListId;
    }
    $('#tbl_checklist').append(responseText);
    CheckListCmpLength = result.length;
    
}



function CheckListGet(result) {
    console.log(result)
    for (var i = 0; i < result.length; i++) {
        $('#ItemId').val(result[i].ItemId);
        $('#Chasisnumber').val(result[i].ItemCode);
        $('#description').val(result[i].Description);
        $('#checklistid' + result[i].CheckListId).val(result[i].CheckListId);
        if (result[i].avail == 1) {
            $('#avail' + result[i].CheckListId).prop("checked", true);
            $('#qty' + result[i].CheckListId).prop("disabled", false);
        }
        else {
            $('#avail' + result[i].CheckListId).prop("checked", false);
            $('#qty' + result[i].CheckListId).prop("disabled", true);
        }
        
        $('#qty' + result[i].CheckListId).val(result[i].qty);

    }
    $('#listing').hide();
    $('#Entry').show();
    CopyFlag = 1;
    
}

function isNumberInt(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}

