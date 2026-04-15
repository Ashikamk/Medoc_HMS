var ItemCount = 1;
var SerialNo = 1;
var CopyFlag = 0;
var MainEditFlag = 0;
var FlagEdit = 0;
var StkFlag = 0;
$(document).ready(function () {
    Serialnoload(); 
    Defaultfocus();
    IssuedByLoad();
    CustodianLoad();
    UnitpageLoad();
    //Focus
    $('input').keydown(function (e) {
        if (e.which === 13) {
            $(this).closest('td').nextAll().eq(0).find('input').focus().select()
        }
    });
    $('input').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });
 
   
    $('select').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }
    });
    $('#Remarks_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
    });
    $('#IssuedBy').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#JobCode').select().focus();
        }
    });
    $('#Serial_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Qty_0').select().focus();
        }
    });
    $('#JobCode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#CustodianCode').select().focus();
        }
    });
    $('#CustodianCode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Remarks').select().focus();
        }
    });
    $('#Comments').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            $('#Product_0').select().focus();
        }
    });
    $('#VocNo').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 32) {
            e.preventDefault();
            CheckeDeleted();
        }
    });
    $('#Remarks_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').select().focus();
        }
    });
    $('#Date,#ExpDate,#ViewFromDate,#ViewToDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $("#otp").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#otpremarks').focus();
        }

    });
    $('#btnok').click(function () {
        alertpopuprefresh();
        PrintthisBill();
        formrefresh();
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
    });

    $("#otpremarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncnclsave').focus();
        }

    });
    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning");
    });
    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });
});
function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
}

function IssuedByLoad() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            var Department = result.oList[0].DepartmentName;
            var UserName = result.oList[0].User;
            var DepartmentId = result.oList[0].DepartmentId;
            var UserId = result.oList[0].UserId;
           
            $('#IssuedBy').val(UserName);
            $('#IssuedById').val(UserId);
            //alert($('#IssuedById').val())
            //$('#CustodianCode').select().focus();
        }
    });
}
function CustodianLoad() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/CustodianGetandGets",
        data: data,
        success: function (result) {
            var Department = result.oList[0].DepartmentName;
            var Code = result.oList[0].Code;
            var DepartmentId = result.oList[0].DepartmentId;
        

            $('#CustodianCode').val(Code);
            $('#CustodianId').val(DepartmentId);
            $('#CustodianName').val(Department);
        }
    });
}
function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'TMIR';
    datax.SlNo = $('#VocNo').val();
    datax.DepartmentId = ERPDeptId;
    datax.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Purchase/CheckDeletedPurchase",
        data: datax,
        success: function (result) {
            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            if (status == 1) {
                warningshow('No Data Found')
                $('#VocNo').focus().select();
            }

        }
    });
}

function formrefresh() {
    Serialnoload();
    Defaultfocus();
    IssuedByLoad();
    CustodianLoad();
    UnitpageLoad();
    StkFlag = 0;
    ProdFlag = 0;
    ItemCount = 1;
    $('#btnsubmit').prop("disabled", false);
    $('#confirmOk').prop("disabled", false);
    $('#ProductQty').val('')
    $('#ToolsManagementId').val('0');
    $('#IssuedBy').val('');
    $('#IssuedById').val('');
    $('#CustodianCode').val('');
    $('#CustodianName').val('');
    $('#CustodianId').val('');
    $('#JobCode').val('');
    $('#JobCodeId').val('');
    $('#Remarks').val('');
    $('#Comments').text('');
    $('#TotPcs').text('');
    $('#TotQty').text('');
    $('#JobcodeDesc').val('');
    $('#typeIssue').prop("checked", true);
    $('#tblToolsDetails tr').remove();
    $('#Date,#ExpDate,#ViewFromDate,#ViewToDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#VocNo').prop("disabled", true);
    $('#Date').prop("disabled", false);
    $('#IssuedBy').prop("disabled", false);
    $('#CustodianCode').prop("disabled", false);
    $('#CustodianName').prop("disabled", false);
    $('#JobCode').prop("disabled", false);
    $('#ExpDate').prop("disabled", false);
    $('#Remarks').prop("disabled", false);
    $('#Comments').prop("disabled", false);
    $('#Product_0').prop("disabled", false);
    $('#Pcs_0').prop("disabled", false);
    $('#Serial_0').prop("disabled", false);
    $('#Qty_0').prop("disabled", false);
    $('#Remarks_0').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#typeIssue').prop("disabled", false);
    $('#typeReturn').prop("disabled", false);
    $('.copydis').prop("disabled", false);

    $('#btnsubmit').show();
    $('#btnlist').show();
    $('#btnnew').show();   
    $('#btnprint').hide();
    $('#btndelete').hide();
    $('#btnedit').hide();
    $('#btnsaveedit').hide();


}
function UnitpageLoad() {
    var data = {};
    data.UnitId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data,
        success: function (result) {
            UnitLoad(result.oList);
        }
    });
}
function UnitLoad(result) {
    $("#Pcs_0").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#Pcs_0").append(UnitSelect);
}

function Defaultfocus() {
    $('#JobCode').focus().select();
}

//Serial No Load Function
function Serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);
        }
    });
}

function getslno(result) {
    $('#VocNo').val(result[0].ToolsManagemant_No);
}


function ClearRow() {
    $('#ProductId_0').val('0');
    $('#Product_0,#Serial_0,#Qty_0,#Remarks_0,#Description_0').val('');
    $('#Pcs_0').val('0');
    $('#Product_0').focus();
}
function ProductAddforStock() {
    var Product = $("#Product_0").val()

    if (Product == "") {
        warningshow('Please Select Tool', 'Product_0');
        return false;
    }
    else if ($('#ProductId_0').val() == 0) {
        warningshow('Please Enter To Create New Tool', 'addproductbtn');
        return false;
    }
    else if ($('#Pcs_0').val() == '' || $('#Pcs_0').val() == '0') {
        warningshow('Please Enter Pcs', 'Pcs_0');
        return false;
    }
    else if ($('#Qty_0').val() == '' || $('#Qty_0').val() == '0') {
        warningshow('Please Enter Quantity', 'Qty_0');
        return false;
    }
    else {
        if ($('.jsgrid-row').length == 0) {
            ItemCount = 1;
            SerialNo = 1;
        }

        var Id = parseInt(ItemCount);
        var Slno = parseInt($('.jsgrid-row').length + 1);

        var ProdEditRow = "<tr ondblclick='EditRow(" + Id + ")' class='jsgrid-row' id='row_" + Id + "' >" +
           "<td id='edit_" + Id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:30px;' >" +
           "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + Id + ")'  title= Delete ></td>" +

           "<td id='td_" + Id + "' class='jsgrid-cell'  style= 'width:40px;text-align:center' >"
           + Slno + "<input type='hidden' id='sl_" + Id + "' value=" + Id + "></td>" +

           "<td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:150px;' >" +
           "<input type='hidden' id='ProductId_" + Id + "' value='" +
           $("#ProductId_0").val() + "'><input type='hidden' id='AvailProductQty_" + Id + "' value='" +
           $("#ProductQty").val() + "'>" +


           "<input type='text' id='Product_" + Id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
          $("#Product_0").val() + "'></td>" +

           "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' >" +
           "<input type='text' id='ProductDesc_" + Id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
           + $("#Description_0").val() + "'></td>" +

           "<td id='col_3' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:70px;' >" +
           "<select id='Pcs_" + Id + "' class='form-control'>'" + UnitSelect + "'</select></td>" +

            "<td id='col_4' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
           "<input type='text' id='Serial_" + Id + "' onkeypress='' class='form-control' disabled style='height:30px;background-color:white' value='"
           + $("#Serial_0").val() + "'></td>" +

           "<td id='col_5' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
           "<input type='text' id='Quantity_" + Id + "' onkeyup='CalcuAllTotal(),CheckStockOnEdit(" + Id + ")' onkeypress='isNumberInt(event, this)' class='form-control'  style='height:30px;background-color:white;text-align:center' value='"
           + $("#Qty_0").val() + "'></td>" +

           "<td id='col_6' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
           "<input type='text' id='Remarks_" + Id + "' onkeyup='' onkeypress='' class='form-control'  style='height:30px;background-color:white' value='"
           + $("#Remarks_0").val() + "'></td>" +
           "</tr>"
        $('#tblToolsDetails').append(ProdEditRow);
        $('#Pcs_' + Id).val($("#Pcs_0").val());
        ClearRow();
        ItemCount++;
        SerialNo++;
        CalcuAllTotal();
        //$("#ProducPopupAdd").focus();

    }
}

function CalcuAllTotal() {
    if ($('#tblToolsDetails').length == 0) {
        $('.botlbl').text('');
    }
    else if ($('#tblToolsDetails').length > 0) {
        $('.botlbl').text('');

        var TPcs = 0; var TQty = 0; 
        for (var Id = 1; Id < ItemCount; Id++) {
            if ($('#Product_' + Id).val() != undefined) {
                TPcs = parseInt(TPcs) + parseInt($('#Pcs_' + Id).val() || 0);
                TQty = parseInt(TQty) + parseInt($('#Quantity_' + Id).val() || 0);
            }
        }
        $('#TotPcs').text(TPcs);
        $('#TotQty').text(TQty);

    }

}
function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletegridrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')
}
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'deletegridrow') {
        detl(rowid)
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    //else if (Result == 'true' && status == 'createnew') {
    //    $('.form-control').prop('disabled', false);
    //    $('.jsgrid-button').prop('disabled', false);
    //    formrefresh(1);
    //}
    else if (Result == 'true' && status == 'save') {
        ConfirmSave();
    }
    else if (Result == 'true' && status == 'update') {
        ConfirmUpdate();
    }
    //else if (Result == 'true' && status == 'copy') {
    //    formrefresh(1);
    //    CopyFlag = 1;
    //    $('.form-control').prop('disabled', true);
    //    $('#VOCNo').prop("disabled", false);
    //    $('.jsgrid-button').prop('disabled', true);
    //    $('#btnsubmit').prop("disabled", true);
    //    $('#btnlist').prop("disabled", true);
    //    $('#btnadd').prop("disabled", true);
    //    $('#btnsubmit,#btnlist').hide();
    //    $('#VOCNo').focus();
    //    $('#VOCNo').select();
    //}
    //else if (Result == 'false' && status == 'copy') {
    //    CopyFlag = 0;
    //}
    else if (Result == 'true' && status == 'delete') {
        EditInvoice(1);
    }
    $('#confirm').fadeOut();

}

function detl(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row_' + RowId).remove();

    for (var j = 1; j < ItemCount; j++) {
        if ($('#Product_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;
            
        }
    }
    CalcuAllTotal();
    $('#Product_0').focus();
}
function SaveToolsManagement() {

    if ($('#tblToolsDetails tr').length == 0) {
        warningshow('No Tools Added', 'Product_0');
        //var chkqty = $('#ProductQty').val();
        //var EntdQty = $('#Qty_0').val();
        //if (chkqty < EntdQty) {
        //    warningshow('Not Enough Stock!Available stock is ' + chkqty);
        //}
    }
    else if ($('#CustodianCode').val() == '') {
        warningshow('Please Select Custodian', 'CustodianCode');
    }
    else if ($('#JobCode').val() == '') {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please select a valid Job Code', 'JobCodeId');
        $('#JobCode').select();
        return false;
    }
      
    else {
        $('#Confirmflag').val('save'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }
}

function ConfirmSave() {
    $('#confirmOk').prop("disabled", true);
    $('#btnsubmit').prop("disabled", true);
    var oArray = new Array();

   //alert(ItemCount)
    for (var k = 1; k < ItemCount; k++) {
       
        var ToolsManagementId = $('#ToolsManagementId').val();
        var VocNo = $('#VocNo').val();
        var Date = $('#Date').val();
        var IssuedById = $('#IssuedById').val();
        var CustodianId = $('#CustodianId').val();
        var JobCodeId = $('#JobCodeId').val();
        var ExpDate = $('#Date').val();
        var MainRemarks = $('#Remarks').val();
        var Comments = $('#Comments').text();
        var TotPcs = $('#TotPcs').text();
        var TotQty = $('#TotQty').text();
        if ($('#typeIssue').prop("checked")) {
            var ManagementType = 'TTI';
        }
        else{
            var ManagementType = 'TTR';
        }

        var ToolId = $('#ProductId_' + k).val();
        var ToolCode = $('#Product_' + k).val();
        var ToolDesc = $('#ProductDesc_' + k).val();
        var Pcs = $('#Pcs_' + k).val();
        var SerialNo = $('#Serial_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var SubRemarks = $('#Remarks_' + k).val();

        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;
      
        if (JobCodeId != '0') {
            oArray.push({
                'ToolsManagementId':ToolsManagementId,
                'VocNo':VocNo,
                'Date':Date,
                'IssuedById':IssuedById,
                'CustodianId':CustodianId,
                'JobCodeId':JobCodeId,
                'ExpDate':ExpDate,
                'MainRemarks':MainRemarks,
                'Comments':Comments,
                'TotPcs':TotPcs,
                'TotQty':TotQty,
                'ManagementType':ManagementType,
                'ToolId':ToolId,
                'ToolCode':ToolCode,
                'ToolDesc':ToolDesc,
                'Pcs':Pcs,
                'SerialNo':SerialNo,
                'Quantity':Quantity,
                'SubRemarks':SubRemarks,
                'DeptId':DeptId,
                'UserId':UserId,
                'DelFlag':DelFlag,
            })
        }
    }
    if (oArray != "") {
        var data = { 'ToolsManagementModel': oArray };
        $.ajax({
            type: "POST",
            url: "../ProjectandJob/ToolsManagementInsert",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                var VocNo = result.oList[0].VocNo;
                ShowalertsNew(status, VocNo);
                
            }
        });
    }
    else {
        warningshow('No Products Added', 'Product_0');
        $('#btnsubmit').prop("disabled", false);
    }

}


function CheckStockOnEdit(Id) {
    var tbllength = $('#tblToolsDetails tr').length
    var Esumqty = 0;
    for (var i = 1; i <= tbllength; i++) {
        if (($('#ProductId_' + Id).val()) == ($('#ProductId_' + i).val())) {
            if (i == Id)                      //During Edit, add qty of rows except editing row
            continue;
        else {
            StkFlag = 1
            var EGridQty = parseInt($('#Quantity_' + i).val() || 0);
            Esumqty += parseInt(EGridQty);
               
            }
        }
      
        else {
            var EGridQty = parseInt($('#Quantity_' + Id).val() || 0);
            var EAvailQty = parseInt($('#AvailProductQty_' + Id).val() || 0);
            if (EGridQty > EAvailQty) {
                warningshow('Available stock is ' + $('#AvailProductQty_' + Id).val());
                $('#Quantity_' + Id).select().focus();
            }
        }

    }
    if (StkFlag == 1) {
        var CurrQty = parseInt($('#Quantity_' + Id).val() || 0);
        var EAvailQty = parseInt($('#AvailProductQty_' + Id).val() || 0);
        var finalvalue = parseInt(EAvailQty) - parseInt(Esumqty)
       // alert('CurrQty' + CurrQty)
        // alert('finalvalue' + finalvalue)
        if (CurrQty > finalvalue) {
            warningshow('Available stock is ' + $('#AvailProductQty_' + Id).val());
            $('#Quantity_' + Id).select().focus();
        }
    }
}


//Add Product to Grid
function ProductAdd() {
    var tbllength = $('#tblToolsDetails tr').length

    if ($('#tblToolsDetails tr').length == 0) {
        var chkqty = parseInt($('#ProductQty').val() || 0);
        var EntdQty = parseInt($('#Qty_0').val() || 0);

        if (EntdQty > chkqty) {
            warningshow('Available stock is ' + $('#ProductQty').val());
            $('#Qty_0').select().focus();
        }
        else {

            ProductAddforStock();
        }
    }
    else if ($('#tblToolsDetails tr').length != 0) {

        for (var i = 1; i <= tbllength; i++) {
            if (($('#ProductId_0').val()) == ($('#ProductId_' + i).val())) {
                var GridQty = parseInt($('#Quantity_' + i).val() || 0);
                var AvailQty = parseInt($('#ProductQty').val() || 0);
                var AddQty = parseInt($('#Qty_0').val() || 0);

                var sumqty = parseInt(GridQty) + parseInt(AddQty);
                if (sumqty > AvailQty) {
                    warningshow('Available stock is ' + $('#ProductQty').val());
                    $('#Qty_0').select().focus();
                }
                else {
                    ProductAddforStock();
                }
            }
            else {

                var chkqty = parseInt($('#ProductQty').val() || 0);
                var EntdQty = parseInt($('#Qty_0').val() || 0);
                if (EntdQty > chkqty) {
                    warningshow('Available stock is ' + $('#ProductQty').val());
                    $('#Qty_0').select().focus();
                }
                else {
                    ProductAddforStock();
                }
            }

        }
    }
}

function GetRows() {
    if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else {
        $('#VocNo').prop("disabled", false);
        $('#VocNo').focus();
        $('#VocNo').select();
    }
}


function GetList() {
    var data = {};
    data.FromDate = $('#ViewFromDate').val();
    data.ToDate = $('#ViewToDate').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/ToolsManagementList",
        data: data,
        success: function (result) {
            GetListView(result.oList);


        }
    });
}
function GetListView(result) {
    $('#ViewFromDate,#ViewToDate').prop("disabled", false);
   
    disable_datatable('tbl_ViewList');
   
    $('#ToolsManagementViewForm').show();
    var responseText = "<thead><tr><th>Sl#</th><th>TMType</th><th>TM#</th><th>Date</th><th>Issued By</th><th>Custodian</th></tr>" +
        "<tr><th> </th><th>TMType</th><th>TM#</th><th>Date</th><th>Issued By</th><th>Custodian</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr ondblclick="GetCopyofThis(' + result[l].VocNo + ',' + result[l].DeptId + ')">' +
        '<td style="" align="center">' + slno + '</td>' +
        '<td id=' + 'InvoView_' + slno + '>' + result[l].ManagementType + '</td>' +
        '<td>' + result[l].VocNo + '</td>' +
        '<td  align="center">' + result[l].Date + '</td>' +
        '<td>' + result[l].IssueName + '</td>' +
        '<td>' + result[l].CustodianName + '</td>' +
        '</tr>';
    }
    $('#tbl_ViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_ViewList', 'Multiple');

}

function GetCopyofThis(VOCNo, DeptId) {
    var data = {};
    data.VOCNo = VOCNo;
    data.DeptId = DeptId;
    $.ajax({
        type: "POST",
        url: '../ProjectandJob/ToolManagementGetandGets',
        data: data,
        success: function (result) {
            $('#ToolsManagementViewForm').hide();
            $('#tblToolsDetails tr').remove();
            ToolManagementGets(result.oList);
            $('#btnnew').focus();
            $('.form-control').prop('disabled', true);
            $('#VocNo').prop("disabled", false);
            $('.jsgrid-button').prop('disabled', true);
            $('#btnsubmit').hide();
            $('#btnlist').hide();
            $('#btnadd').prop("disabled", true);
        }
    });
}
//Copy Function 
function ToolManagementGets(result) {
    if (result.length > 0) {

        CopyFlag = 1;
        $('#btnprint').show();
        $('#btnedit').show();
        $('#btndelete').show();

        for (var n = 0; n < result.length; n++) {
            $('#ToolsManagementId').val(result[n].ToolsManagementId);
            $('#VocNo').val(result[n].VocNo);
            $('#Date').val(result[n].Date);
            $('#IssuedBy').val(result[n].IssueName);
            $('#IssuedById').val(result[n].IssuedById);
            $('#CustodianCode').val(result[n].EmpCode);
            $('#CustodianName').val(result[n].CustodianName);
            $('#CustodianId').val(result[n].CustodianId);
            $('#JobCode').val(result[n].JobCodes);
            $('#JobCodeId').val(result[n].JobCodeId);
            $('#JobcodeDesc').val(result[n].Desc);
            $('#ExpDate').val(result[n].ExpDate);
            $('#Remarks').val(result[n].MainRemarks);
            $('#Comments').text(result[n].Comments);
            $('#TotQty').text(result[n].TotQty);

            if (result[n].ManagementType == 'TTI') {
                $('#typeIssue').prop("checked", true);

            }
            else {
                $('#typeReturn').prop("checked", true);
            }

            var Id = parseInt(n + 1);


            var ProdEditRow = "<tr ondblclick='EditRow(" + Id + ")' class='jsgrid-row' id='row_" + Id + "' >" +
              "<td id='edit_" + Id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:30px;' >" +
              "<input class='jsgrid-button jsgrid-delete-button copydis'  type= button onclick='DeleteRow(" + Id + ")'  title= Delete ></td>" +

              "<td id='td_" + Id + "' class='jsgrid-cell'  style= 'width:40px;text-align:center' >"
              + Id + "<input type='hidden' id='sl_" + Id + "' value=" + Id + "></td>" +

              "<td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:150px;' >" +
              "<input type='hidden' id='ProductId_" + Id + "' value='" +
              result[n].ToolId + "'><input type='hidden' id='AvailProductQty_" + Id + "' value='" +
                result[n].ToolQty + "'>" +

              "<input type='text' id='Product_" + Id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
             result[n].ToolCode + "'></td>" +

              "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' >" +
              "<input type='text' id='ProductDesc_" + Id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
              + result[n].ToolDesc + "'></td>" +

              "<td id='col_3' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:70px;' >" +
               "<select id='Pcs_" + Id + "' class='form-control' value='" + result[n].Pcs + "' >'" + UnitSelect + "'</select></td>" +

               "<td id='col_4' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
              "<input type='text' id='Serial_" + Id + "' onkeypress='' class='form-control' disabled style='height:30px;background-color:white' value='"
              + result[n].SerialNo + "'></td>" +

              "<td id='col_5' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
              "<input type='text' id='Quantity_" + Id + "' onkeyup='CalcuAllTotal(),CheckStockOnEdit(" + Id + ")' onkeypress='isNumberInt(event, this)' class='form-control copydis'  style='height:30px;background-color:white;text-align:center' value='"
              + result[n].Quantity + "'></td>" +

              "<td id='col_6' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:100px;' >" +
              "<input type='text' id='Remarks_" + Id + "' onkeyup='' onkeypress='' class='form-control copydis'  style='height:30px;background-color:white' value='"
              + result[n].SubRemarks + "'></td>" +
              "</tr>"

            $('#tblToolsDetails').append(ProdEditRow);
            $('#Pcs_' + Id).val(result[n].Pcs);
            //CalcuAllTotal();
            ItemCount++;
        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);

        $('#Date').prop("disabled", true);
        $('#IssuedBy').prop("disabled", true);
        $('#CustodianCode').prop("disabled", true);
        $('#CustodianName').prop("disabled", true);
        $('#JobCode').prop("disabled", true);
        $('#ExpDate').prop("disabled", true);
        $('#Remarks').prop("disabled", true);
        $('#Comments').prop("disabled", true);
        $('#Product_0').prop("disabled", true);
        $('#Pcs_0').prop("disabled", true);
        $('#Serial_0').prop("disabled", true);
        $('#Qty_0').prop("disabled", true);
        $('#Remarks_0').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#typeIssue').prop("disabled", true);
        $('#typeReturn').prop("disabled", true);
        $('.copydis').prop("disabled", true);
    }
    
}
function formrefreshconfirm() {
    $('#confirmmessage').html('');
    var rowcount = ItemCount;
    if (rowcount > 0) {
        $('#confirm').show();

        $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').append('Data will be lost.<br>Do you want to Continue?');
        $('#confirmOk').focus();
    }
    else {
        formrefresh();
    }
}
function DeleteToolsManagement() {
    $('#Confirmflag').val('delete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete?')
    $('#confirm').show();
    $('#confirmOk').focus();
}

function EditInvoice(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditInvioce(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();

}
function CheckEditInvioce(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Tools Management Edit- OTP';
        else if (Flag == 1)
            Operation = 'Tools Management Delete- OTP';

        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#otp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                for (var i = 0; i < result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    OTPCheck(status, Flag)
                }
            }
        });
    }
}


function OTPCheck(status, Flag) {
    if (status == 1) {
        if (Flag == 0) {
            OKEditInvoice();
        }
        else if (Flag == 1) {
            ConfirmDelete();
        }
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}



function OKEditInvoice() {
    $('#OTPDiv').hide();
    $('#btnedit').hide();
    $('#btndelete').hide();
    $('#btnsaveedit').show();
    $('#btndelete').hide();
    $('.editds,#btnadd').prop("disabled", false);
    $('.jsgrid-button').prop('disabled', false);
    $('#VocNo').prop("disabled", true);
    MainEditFlag = 1;
    $('.copydis').prop("disabled", false);
    $('#Product_0,#Pcs_0,#Serial_0,#Qty_0,#Remarks_0').prop('disabled', false);
    $('#typeIssue').prop("disabled", false);
    $('#typeReturn').prop("disabled", false);
}
function UpdateToolManagement() {

    if ($('#tblToolsDetails tr').length == 0) {
        warningshow('No Tools Added', 'Product_0');
    }
    else if ($('#CustodianCode').val() == '') {
        warningshow('Please Select Custodian', 'CustodianCode');
    }
    else if ($('#JobCode').val() == '') {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please select a valid Job Code', 'JobCodeId');
        $('#JobCode').select();
        return false;
    }
    else {
        $('#Confirmflag').val('update'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Update?')
        $('#confirmOk').prop("disabled", false);
        $('#confirm').show();
        $('#confirmOk').focus();
    }
}

function ConfirmUpdate() {

    $('#btnsubmit').prop("disabled", true);
    $('#confirmOk').prop("disabled", true);
    var oArray = new Array();

   // alert(ItemCount)
    for (var k = 1; k < ItemCount; k++) {

        var ToolsManagementId = $('#ToolsManagementId').val();
        var VocNo = $('#VocNo').val();
        var Date = $('#Date').val();
        var IssuedById = $('#IssuedById').val();
        var CustodianId = $('#CustodianId').val();
        var JobCodeId = $('#JobCodeId').val();
        var ExpDate = $('#Date').val();
        var MainRemarks = $('#Remarks').val();
        var Comments = $('#Comments').text();
        var TotPcs = $('#TotPcs').text();
        var TotQty = $('#TotQty').text();
        if ($('#typeIssue').prop("checked")) {
            var ManagementType = 'TTI';
        }
        else {
            var ManagementType = 'TTR';
        }

        var ToolId = $('#ProductId_' + k).val();
        var ToolCode = $('#Product_' + k).val();
        var ToolDesc = $('#ProductDesc_' + k).val();
        var Pcs = $('#Pcs_' + k).val();
        var SerialNo = $('#Serial_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var SubRemarks = $('#Remarks_' + k).val();

        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;

        if (JobCodeId != '0') {
            oArray.push({
                'ToolsManagementId': ToolsManagementId,
                'VocNo': VocNo,
                'Date': Date,
                'IssuedById': IssuedById,
                'CustodianId': CustodianId,
                'JobCodeId': JobCodeId,
                'ExpDate': ExpDate,
                'MainRemarks': MainRemarks,
                'Comments': Comments,
                'TotPcs': TotPcs,
                'TotQty': TotQty,
                'ManagementType': ManagementType,
                'ToolId': ToolId,
                'ToolCode': ToolCode,
                'ToolDesc': ToolDesc,
                'Pcs': Pcs,
                'SerialNo': SerialNo,
                'Quantity': Quantity,
                'SubRemarks': SubRemarks,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
            })
        }
    }
    if (oArray != "") {
        var data = { 'ToolsManagementModel': oArray };
        $.ajax({
            type: "POST",
            url: "../ProjectandJob/ToolManagementUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                var VocNo = result.oList[0].VocNo;
                ShowalertsNew(status, VocNo);

            }
        });
    }
    else {
        warningshow('No Tool Added', 'Product_0');
        $('#btnsubmit').prop("disabled", false);
    }

}

function ConfirmDelete() {
    $('#OTPDiv').hide();
    var data = {};
    data.VocNo = $('#VocNo').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/ToolManagementDelete",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var VocNo = result.oList[0].VocNo;
            ShowalertsNew(status, VocNo);
        }
    });

}
function PrintthisBill() {
    if ($('#tblToolsDetails tr').length > 0) {
        PrintthisBillWindows('TM', i);
    }
    else {
        warningshow('Please select a TM Number to print', 'VocNo');
        $('#VocNo').select();
    }

}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date' || title == 'Currency' || title == 'SlNo' || title == 'OrderNo' || title == 'PerformaNo' || title == 'Sl#' || title == 'InvoiceNo' || title == 'PurchaseType') {
                $(this).html('<input type="text" class="form-control"  style="width:120px"  placeholder="' + title + '"/>')
            }
            else {
                $(this).html('<input type="text" class="form-control"   placeholder="' + title + '"/>')
            }
    });

    var table = null;

    if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            //"order": false,
        });

    }
    else if (Type == 'Multiple') {
        if (tablename == 'tbl_ViewList') {
            table = $('#' + tablename).DataTable({
                dom: 'tir',
                "columnDefs": [
                                { "width": "1%", "targets": 0 },
                                { "width": "3%", "targets": 1 },
                                { "width": "3%", "targets": 2 },
                                { "width": "2%", "targets": 3 },
                                { "width": "13%", "targets": 4 },
                                { "width": "13%", "targets": 5 },

                ],
                orderCellsTop: true,
                "order": [],
                "pageLength": -1
            });
        } else {

            table = $('#' + tablename).DataTable({
                dom: 'tir',
                "columnDefs": [
                    { "width": "1%", "targets": 0 },
                ],
                orderCellsTop: true,
                "order": [],
                "pageLength": -1
            });
        }

    }
    else if (Type == 'MultiplePurchaseT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 0 },
                { "width": "15%", "targets": 2 },
            ],
            orderCellsTop: true,
            "order": [],
            //"pageLength": -1,
            autoWidth: false
        });

    }
    else if (Type == 'MultipleSalesT') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "8%", "targets": 0 },
                 { "width": "8%", "targets": 1 },
                  { "width": "6%", "targets": 3 },
                   { "width": "7%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                     { "width": "20%", "targets": 6 },
                      { "width": "12%", "targets": 7 },
            ],
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
        });


    }
    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "10%", "targets": 5 },
                { "width": "12%", "targets": 6 },
                { "width": "10%", "targets": 13 },
            ],
            orderCellsTop: true,
            "order": [],
            //"pageLength": -1,
            autoWidth: false
        });

    }
    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(1) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    });
}

function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}














//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}
//Numeric Only Text Boxes without Decimal Point
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
function ShowalertsNew(Status, VOCNo) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>TM Number: ' + VOCNo + '</b><br> Saved Successfully!<br>Do you want to print this TM?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
        //formrefresh();
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>TM Number: ' + VOCNo +  '</b><br> Updated Successfully!<br>Do you want to print this TM?');
        $('#btnok').focus();
    }

    else if (Status == 3) {
        swal('TM Number: ' + VOCNo + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 4) {
        swal('TM Number: ' + VOCNo, "Cancelled", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }

}




        