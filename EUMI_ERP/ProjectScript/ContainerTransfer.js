$(document).ready(function () {
    $('#ToLocation').focus();
    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList);
        }
    });
    shownone();
    $('#txtdate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#ToLocation').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtdate').focus();
        }
    });
    $('#txtdate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct').focus();
        }
    });
    $('#txtproduct').keyup(function (e) {
        e.preventDefault();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (entrkey == 8) {
            removerow();
        }
    });
});
var LocationSelect = "";
function LocationLoad(result) {
    $("#ToLocation,#FromLocation").empty();
    LocationSelect = "<option value=0>-Select-</option>";
    //$("#ToLocation").append("<option value='0'>----Select Location---</option>");
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'>" + result[i].LocationName + "</option>";
    }
    $("#ToLocation,#FromLocation").append(LocationSelect);
    $('#FromLocation').val(2);
}

var tempEditbutton = '<h4><i class="ft-edit" style="color:#ff6f00"></i></h4>';
var tempUpdatebutton = '<h4><i class="ft-check-circle" style="color:#ff6f00"></i></h4>';
var Cancelbutton = '<h4><i class="ft-x" style="color:#ff6f00"></i></h4>';

function shownone() {
    var responseText = "<thead><tr style='text-align:center;color:blue'><th>No Transfer Searching Yet</th></tr></thead>";
    $('#tblContainerTransfer').html(responseText);
}
var t = 0;
function GetItem(result) {
    if (result[0].Flag == 0) {
        $('#confirm').show();
        $('#confirmCancel').hide();
        $('#confirmmessage').text('');
        $('#confirmmessage').text('Already Transfered');
        var responseText = "";
        var responseText = "<thead><tr style='text-align:center;color:red'><th>Already Transfered</th></tr></thead>";
        $('#tblContainerTransfer').html(responseText);
        $('#txtproduct').focus();
    }
    else {
        var responseText = "";
        if (result.length > 0) {
            $('#tblContainerTransfer tr').remove();
            var Loc = $('#ToLocation').val();


            //responseText = "<thead><tr style='background-color:#ebebe0;overflow-y:hidden'><th width=15px>SlNo</th><th style=display:none;></th><th>Chassis Number</th><th>Description</th><th>From Location</th><th>To Location</th><th>Key</th><th width=30px id='edithead' >Edit </th><th  width=30px style=display:none;'></th><th>Remove</th></tr></thead><tbody>";
            //for ( t = 0; t < result.length; t++) {
            //    var slno = parseInt(t + 1);

            //    responseText += '<tr id=' + "row" + slno + ' style="background-color:white;"><td id=' + "td" + slno + '>' + slno + '</td><td style=display:none; id="itemId' + slno + '">' + result[t].ItemId + '</td><td  id="Code' + slno + '">' + result[t].ItemCode + '</td><td id="Des' + slno + '" >' + result[t].Description + '</td><td><select   id="txttype1' + slno + '" class="form-control" style="width:160px;height:33px;"  disabled>' + LocationSelect + '</select><input type=text id="temptxttype1' + slno + '"  value=' + '2 ' + ' style="display:none;" /> </td><td> <select   id="txttype2' + slno + '" class="form-control" style="width:160px;height:33px;" disabled >"' + LocationSelect + '" <input type=text id="temptxttype2' + slno + '"  value=' + Loc + ' style="display:none;" /></select></td>' +
            //        '<td><select id= ' + 'txtkey' + slno + '  class="form-control" style="width:140px;height:33px;" disabled><option value="0">-Select-</option><option value="Yes">Yes</option><option value="No">No</option><input type=text  style="display:none;"  id="temptxtkey' + slno + '"  value=' + result[t].ItemKey + '></text></td>' +
            //        '<td   align=center id="txteditrow' + slno + '"  ><a   onclick="EditRows(' + slno + ')">' + tempEditbutton + '</a></td>' +
            //      '<td  align=left id="txtupdaterow' + slno + '" style="display:none;"> <a  style="float:left" onclick="UpdateRows(' + result[t].ItemId + ',' + slno + ',' + 0 + ')">' + tempUpdatebutton + '</a><a  style="float:right" onclick="CancelRows(' + slno + ')">' + Cancelbutton + '</a></td>' +
            //       ' <td align=center><a onclick="DeleteLocationTrnsfer(' + slno + ')">' + DeleteButton + '</a></td></tr>';
            //}



            responseText = "<thead><tr style='background-color:#ebebe0;overflow-y:hidden'><th width=15px>SlNo</th><th style=display:none;></th><th>Chassis Number</th><th>Description</th><th>From Location</th><th>To Location</th><th>Key</th><th>Remove</th></tr></thead><tbody>";
            for (t = 0; t < result.length; t++) {
                var slno = parseInt(t + 1);

                responseText += '<tr id=' + "row" + slno + ' style="background-color:white;"><td id=' + "td" + slno + '>' + slno + '</td><td style=display:none; id="itemId' + slno + '">' +
                    result[t].ItemId + '</td><td  id="Code' + slno + '">' +
                    result[t].ItemCode + '</td><td id="Des' + slno + '" >' +
                    result[t].Description + '</td><td><select   id="txttype1' + slno + '" class="form-control" style="width:160px;height:33px;">' +
                    LocationSelect + '</select><input type=text id="temptxttype1' + slno + '"  value=' + '2 ' + ' style="display:none;" /> </td><td> <select   id="txttype2' + slno + '" class="form-control" style="width:160px;height:33px;"  >"' +
                    LocationSelect + '" <input type=text id="temptxttype2' + slno + '"  value=' + Loc + ' style="display:none;" /></select></td>' +
                    '<td><select id= ' + 'txtkey' + slno + '  class="form-control" style="width:140px;height:33px;"><option value="0">-Select-</option><option value="Yes">Yes</option><option value="No">No</option><input type=text  style="display:none;"  id="temptxtkey' + slno + '"></text></td>' +
                    ' <td align=center><a onclick="DeleteLocationTrnsfer(' + slno + ')">' + DeleteButton + '</a></td></tr>';
            }




            $('#tblContainerTransfer').html(responseText + '</tbody>');
            $('#rowget').val(result.length)
            for (var i = 1; i <= result.length; i++) {
                $('#txttype1' + i).val('2');
                $('#txttype2' + i).val($('#ToLocation').val());
                $('#txtkey' + i).val(0);
            }
        }
    }
}
function DeleteLocationTrnsfer(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletelocntransfer'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('');
    $('#confirmmessage').text('Do You Want Delete This Record?');
}
var editflag = 0;
function EditRows(slno) {
    if (editflag == 1) {
        warningshow('Please Update Edit Mode')
    }
    else {
        editflag = 1;
        $('#temptxttype1' + slno).val($('#txttype1' + slno).val());
        $('#temptxttype2' + slno).val($('#txttype2' + slno).val());
        $('#temptxtkey' + slno).val($('#txtkey' + slno).val());
        $('#txtupdaterow' + slno).show();
        $('#txteditrow' + slno).hide();
        $('#txttype1' + slno).prop('disabled', false);
        $('#txttype2' + slno).prop('disabled', false);
        $('#txtkey' + slno).prop('disabled', false);
        $('#edithead').text('UpDate');
    }
}

function UpdateRows(ItemId, slno, LocTransId) {
    if ($('#txttype1' + slno).val() == $('#txttype2' + slno).val()) {
        warningshow('Load From and Load To Cannot Be Same')
    }
    else if ($('#txttype1' + slno).val() == null || $('#txttype1' + slno).val() == undefined || $('#txttype1' + slno).val() == 0) {
        warningshow('Select Load From', 'txttype1' + slno);
    }
    else if ($('#txttype2' + slno).val() == null || $('#txttype2' + slno).val() == undefined || $('#txttype2' + slno).val() == 0) {
        warningshow('Select Load To', 'txttype2' + slno);
    }
    else if ($('#txtkey' + slno).val() != 'Yes' && $('#txtkey' + slno).val() != 'No') {
        warningshow('Select Key', 'txtkey' + slno);
    }
    else {
        console.log(ItemId, slno, LocTransId);
        var from = $('#txttype1' + slno).val();
        var to = $('#txttype2' + slno).val();
        var key = $('#txtkey' + slno).val();
        var data = {};
        data.ItemId = ItemId;
        data.FromLoad = from;
        data.ToLoad = to;
        data.DeptId = ERPDeptId;
        data.LocTransId = LocTransId;
        data.ItemKey = key;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../LocationTransfer/EditItem",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                if (status == 2) {
                    Showalerts(status);
                    disablerow(slno);
                }
                else if (status == 0) {
                    warningshow('No Stock')
                }
            }
        });
    }

}
function Showalerts(Status, Billno) {
    if (Status == 2) {
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
        shownone();
    }
}

function formrefresh() {
    $('#ToLocation').focus();
    $('#ToLocation').val('0');
    $('#txtproduct').val('');
    $('#tblContainerTransfer tr').remove();
}
function CancelRows(slno) {
    $('#txttype1' + slno).val($('#temptxttype1' + slno).val());
    $('#txttype2' + slno).val($('#temptxttype2' + slno).val());
    $('#txtkey' + slno).val($('#temptxtkey' + slno).val());
    disablerow(slno);
}
function disablerow(slno) {
    $('#txttype1' + slno).prop('disabled', true);
    $('#txttype2' + slno).prop('disabled', true);
    $('#txtkey' + slno).prop('disabled', true);
    $('#edithead').text('Edit');
    $('#txtupdaterow' + slno).hide();
    $('#txteditrow' + slno).show();
    editflag = 0;
    transferload();
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function LocationChange() {

    if (($("#ToLocation").val() != 0) && ($('#ToLocation').val() == ($('#FromLocation').val()))) {
        warningshow('From Location and To Location Cannot be same', 'ToLocation');
        $("#ToLocation").val(0);
        return false;
    }
}
function AcceptAllTransactions() {
    var KeyCheck = 0;
    var count = $('#tblContainerTransfer tr').length;
    
    for (var k = 1; k <= $('#tblContainerTransfer tr').length-1 ; k++) {
        if (($("#txttype2" + k).val() != 0) && (($('#txttype2' + k).val()) == ($('#txttype1' + k).val()))) {
            warningshow('From Location and To Location Cannot be same', 'txttype2' + k);
            $("#txttype2" + k).val(0);
            return false;
        }

        else if ($('#txtkey' + k).val() == 0) {
            KeyCheck = 1;
        }
    }

    if (editflag == 1) {
        warningshow('Please Update Edit Mode');
    }
    else if ($('#txtproduct').val() == "") {
        warningshow('Please Enter A Container Number');
    }

    else if (KeyCheck == 1) {
        warningshow('Please Select Key Available or Not For All Chassis Number!!');
    }
    else if (count > 0) {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('transferall'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('');
        $('#confirmmessage').text('Do you want to Transfer All?');
    }
    else {
        warningshow('No Request Found !!!')
    }
}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'deletelocntransfer') {
        DeleteRow(rowid)
    }
    else
        if (Result == 'true' && status == 'transferall') {
            OKAcceptAllTransactions();
        }

    $('#confirm').fadeOut();

}
function DeleteRow(RowId) {

    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row' + RowId).remove();
    for (var j = 1; j <= t; j++) {
        if ($('#Code' + j).val() != undefined) {
            $('#td' + j).text(slno);
            slno++;
        }
    }
}
function OKAcceptAllTransactions() {
    rowcount = $('#tblContainerTransfer tr').length;
    if (rowcount > 0) {
        $('#btnsubmit').prop('disabled', true);
        var oArray = new Array();
        for (var k = 1; k <= $('#rowget').val() ; k++) {
            var data = {};
            console.log($('#itemId' + k).text())
            var ItemId = $('#itemId' + k).text();
            var FromLoad = $('#txttype1' + k).val();
            var ToLoad = $('#txttype2' + k).val();
            var ItemKey = $('#txtkey' + k).val();
            var UserId = ERPUserId;
            var DeptId = ERPDeptId;
            var TransferDate = $('#txtdate').val();
            //data.Location =UserLocationId;
            if ((ItemId != "undefined" && FromLoad != "undefined" && ToLoad != "undefined" && (ItemId != "") && ItemId != 0)) {
                console.log('g')
                oArray.push({
                    'ItemId': ItemId,
                    'FromLoad': FromLoad,
                    'ToLoad': ToLoad,
                    'ItemKey': ItemKey,
                    'UserId': UserId,
                    'DeptId': DeptId,
                    'TransferDate': TransferDate
                    //'Location': Location,
                })
            }
        }
        console.log(oArray)
        console.log('Array')
        if (oArray != "") {
            console.log('h')
            var data = { 'LocationTransferModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../LocationTransfer/ContainerLocationTransfer",
                data: data,
                success: function (result) {
                    for (var i = 0; i < result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        Showalerts(status);
                        $('#btnsubmit').prop('disabled', false);
                    }
                }
            });
        }

    }
}

function removerow() {

    $('#tblContainerTransfer tr').remove();
}