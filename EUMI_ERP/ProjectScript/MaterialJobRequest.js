var CopyFlag = 0; var MainEditFlag = 0; var GridEditFlag = 0; var EditUnit = 0; var EditQty = 0; var EditPrice = 0; var ItemArray = [];
$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();

 if (e.keyCode == 27) {                         //ESC       :   Popup Close
        popuprefresh();
        ProductPopuprefresh();
        HideBOQDiv();
        HideJobPopup();
        HideIssuedDiv();
        $('#MRViewDiv').hide();
    }

});
//Document Ready Function
$(document).ready(function () {
    Serialnoload();
    GetUnit();

    if (usermenu1.indexOf("M292") != -1) { $("#URight").val("YES"); } else { $("#URight").val("NO"); }

    $("#MRDate").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#RequestedBy').focus(); }});
    $("#RequestedBy").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#Designation').focus(); }});
    $("#Designation").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#Attn').focus(); }});
    $("#Attn").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#Subject').focus(); } });
    $("#Subject").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#OfficeFileNo').focus(); }});
    $("#OfficeFileNo").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#Urgency').focus(); } });
    $("#Urgency").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#JobCode').focus(); } });
    $("#JobCode").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13 && $("#JobId").val()!=0) { e.preventDefault(); $('#product_0').focus(); } });
    $("#Purpose").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#product_0').focus(); } });
    $("#product_0").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13 && $("#productId_0").val() != 0) { e.preventDefault(); $('#quantity_0').focus(); } else if (key == 13 && $.trim($('#product_0').val()).toUpperCase() == 'JOB') { ShowJobPopup() } });
    $("#unit_0").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#quantity_0').focus(); } });
    $("#quantity_0").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#price_0').focus(); $('#price_0').select(); } });
    $("#price_0").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#btnadd').focus(); } });
    $("#otp").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#otpremarks').focus(); } });
    $("#otpremarks").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#btncnclsave').focus(); } });
    $("#descode").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#desdescription').focus(); } });
    $("#desdescription").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#btntermssave').focus(); } });

    $("#product_JOB").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#unit_JOB').focus(); } });
    $("#unit_JOB").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#quantity_JOB').focus(); } });
    $("#quantity_JOB").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#price_JOB').focus(); } });
    $("#price_JOB").keydown(function (e) { var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; if (key == 13) { e.preventDefault(); $('#btnaddjob').focus(); } });

    $('#btnok').click(function () {
        alertpopuprefresh();
        PrintMR(0);
        formrefresh(0);
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh(0);
    });

    $("#btnok").focus(function (e) {
        $("#btnok").removeClass("btn btn-outline-primary");
        $("#btnok").addClass("btn btn-primary");
    });
    $("#btnok").focusout(function (e) {
        $("#btnok").removeClass("btn btn-primary");
        $("#btnok").addClass("btn btn-outline-primary");
    });
    $("#btncnclalrt").focus(function (e) {
        $("#btncnclalrt").removeClass("btn btn-outline-primary");
        $("#btncnclalrt").addClass("btn btn-primary");
    });
    $("#btncnclalrt").focusout(function (e) {
        $("#btncnclalrt").removeClass("btn btn-primary");
        $("#btncnclalrt").addClass("btn btn-outline-primary");
    });


    $("#btnok").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btncnclalrt").focus();
        }
    });
    $("#btncnclalrt").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnok").focus();
        }
    });
});

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
}

function Serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            if (result.oList.length == 0) {
                $('#confirmff,#keyboardff').show();
            }
            else {
                getslno(result.oList);
                Defaultfocus();
            }

        }
    });

}
function getslno(result) {
    $('#MRNo').val(result[0].MRequistion);
}
function Defaultfocus() {
    $("#JobCode").focus();
}
function GetUnit() {

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
    $("#unit_0,#unit_JOB").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'unitname='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#unit_0,#unit_JOB").append(UnitSelect);
}

function CalcAmount(RowId) {

    var Qty = parseInt($("#quantity_" + RowId).val() || 0);
    var Price = parseFloat($("#price_" + RowId).val() || 0).toFixed(Decimal);

    var Amount = Qty * Price;

    $("#amount_" + RowId).val(parseFloat(Amount).toFixed(Decimal));

    if (RowId != '0' && RowId !='JOB') {
        CalcGrandTotal($("#GridLength").val());
    }

}


function CalcGrandTotal(GridLength) {

    var TotalAmount = 0;
    for (var i = 1; i <= GridLength; i++) {

        var Qty = parseInt($("#quantity_" + i).val() || 0);
        var Price = parseFloat($("#price_" + i).val() || 0).toFixed(Decimal);
        var Amount = Qty * Price;
        TotalAmount = TotalAmount + Amount;
    }

    $("#TotalAmount").val(parseFloat(TotalAmount).toFixed(Decimal));
    $("#TotalAmountLabel").text(parseFloat(TotalAmount).toFixed(Decimal));
}

function ProductAdd() {
    var item = $("#productId_0").val();

    if ($('#productId_0').val() == 0) {
        warningshow('Please Select Item', 'product_0');
        return false;
    }
    else if (ItemArray.indexOf(item) != -1) {
        ProductAlreadyAdded(0);
        return false;
    }
    else if ($('#unit_0').val() == 0) {
        warningshow('Please Select Unit', 'unit_0');
        return false;
    }
    else if (parseInt($('#quantity_0').val() || 0) == 0) {
        warningshow('Please Enter Quantity', 'quantity_0');
        return false;
    }
    else if ((parseFloat($("#price_0").val() || 0) > parseFloat($("#BOQAmt_0").val() || 0) || parseFloat($("#quantity_0").val() || 0) > parseFloat($("#boq_0").val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES') {
        CheckBOQ(0);
        return false;
    }
    else {
        ItemArray.push(item);

        var no = $('#tbl_materialrequest tr').length + 1;

        var CurrentLength = $("#GridLength").val();
        var id = parseInt(CurrentLength) + 1;
        $("#GridLength").val(id);

        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'>" +
            "<td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +

            "<td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +

            "<td id='td_" + id + "' class='jsgrid-cell'  style= 'width:4%;text-align:center' >" + no +
            "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +

            "<td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:12%;' >" +
            "<input type='text' id='product_" + id + "' value='" + $('#product_0').val() + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='productId_" + id + "' value='" + $("#productId_0").val() + "'>" + "</td>" +

            "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:18%;' >" +
            "<input type='text' id='productdesc_" + id + "' value='" + $('#productdesc_0').val() + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_3' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:7%;' >" +
            "<select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" + UnitSelect + "</select></td>" +

            "<td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='boq_" + id + "' value='" + parseInt($('#boq_0').val() || 0) + "' class='form-control' disabled style='height:30px;background-color:white' >" +
             "<input type='hidden' id='boqno_" + id + "' value='" + parseInt($("#boqno_0").val() || 0) + "'>" +
             "<input type='hidden' id='boqsubid_" + id + "' value='" + parseInt($("#boqsubid_0").val() || 0) + "'>" +
             "<input type='hidden' id='BOQAmt_" + id + "' value='" + parseFloat($("#BOQAmt_0").val() || 0) + "' /></td>" +

             "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='issued_" + id + "' value='" + parseInt($('#issued_0').val() || 0) + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='balance_" + id + "' value='" + parseInt($('#balance_0').val() || 0) + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_7' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='quantity_" + id + "' value='" + parseInt($('#quantity_0').val() || 0) + "'  class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")' /></td>" +

             "<td id='col_8' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='price_" + id + "' value='" + parseFloat($('#price_0').val() || 0).toFixed(Decimal) + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")'></td>" +

             "<td id='col_9' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='amount_" + id + "' value='" + parseFloat($('#amount_0').val() || 0).toFixed(Decimal) + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_10' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:8%;' >" +
            "<input type='text' id='resource_" + id + "' value='" + $('#resource_0').val() + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='resourceid_" + id + "' value='" + parseInt($("#resourceid_0").val() || 0) + "'>" + "</td>" +

            "</tr>";

        $('#tbl_materialrequest').append(ProdEditRow);
        $('#unit_' + id).val($('#unit_0').val());


        ClearProductRow(0);


        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        CalcGrandTotal($("#GridLength").val());
        $("#product_0").focus();
    }
}

function CheckBOQ(Row) {
    ProductPopuprefresh();
    
    var Allow = '';
    
    if ($("#URight").val() == 'YES') {
        ShowMRConfirm(0);
        var Allow = ' Continue?';
    }
    else {
        ShowMRConfirm(1);
       
    }
    
    $('#MRConfirmflag').val('ConfirmBOQ'); $('#MRConfirmRowId').val(Row);
    $('#MRconfirmmessage').text('Quantity or Price Is Greater Than BOQ!..' + Allow);
}

function CheckBOQConfirm(Row) {
    $("#BOQConfirmFlag").val("YES");
    if (Row == 0) {
        ProductAdd();
    }
    else{
        UpdateRow(Row)
    }
}

function ProductAlreadyAdded(row) {
    
    ProductPopuprefresh();
    $('#MRConfirmflag').val('PROAL'); $('#MRConfirmRowId').val(0);
    ShowMRConfirm(2)
    $('#MRconfirmmessage').text('Product Already Added!..');
}


function ShowMRConfirm(Flag) {
    $('#confirm').hide();
    $('#MRconfirm').show();
    if (Flag == 1) {
        $('#MRconfirmOk').hide();
        $('#MRconfirmCancel').show();
        $('#MRconfirmCancel').focus();
    }
    else if (Flag == 2) {
        $('#MRconfirmCancel').hide();
        $('#MRconfirmOk').show();
        $('#MRconfirmOk').focus();
    }
    else {
        $('#MRconfirmCancel').show();
        $('#MRconfirmOk').show();
        $('#MRconfirmOk').focus();
    }

    
}

function JobtAdd() {


    if ($.trim($('#product_JOB').val()) == '') {
        warningshow('Please Select Item', 'product_JOB');
        return false;
    }
    else if ($('#unit_JOB').val() == 0) {
        warningshow('Please Select Unit', 'unit_JOB');
        return false;
    }
    else if (parseInt($('#quantity_JOB').val() || 0) == 0) {
        warningshow('Please Enter Quantity', 'quantity_JOB');
        return false;
    }
    else {
        var no = $('#tbl_materialrequest tr').length + 1;

        var CurrentLength = $("#GridLength").val();
        var id = parseInt(CurrentLength) + 1;
        $("#GridLength").val(id);

        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'>" +
            "<td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +

            "<td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +

            "<td id='td_" + id + "' class='jsgrid-cell'  style= 'width:4%;text-align:center' >" + no +
            "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +

            "<td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:12%;' >" +
            "<input type='text' id='product_" + id + "' value='" + $('#product_JOB').val() + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='productId_" + id + "' value='0'>" + "</td>" +

            "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:18%;' >" +
            "<input type='text' id='productdesc_" + id + "' value='' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_3' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:7%;' >" +
            "<select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" + UnitSelect + "</select></td>" +

            "<td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='boq_" + id + "' value='0' class='form-control' disabled style='height:30px;background-color:white' >" +
             "<input type='hidden' id='boqno_" + id + "' value='0'>" +
             "<input type='hidden' id='boqsubid_" + id + "' value='0'>" +
             "<input type='hidden' id='BOQAmt_" + id + "' value='0' /></td>" +

             "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='issued_" + id + "' value='0' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='balance_" + id + "' value='0' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_7' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='quantity_" + id + "' value='" + parseInt($('#quantity_JOB').val() || 0) + "'  class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")' /></td>" +

             "<td id='col_8' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
             "<input type='text' id='price_" + id + "' value='" + parseFloat($('#price_JOB').val()||0).toFixed(Decimal) + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")'></td>" +

             "<td id='col_9' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='amount_" + id + "' value='" + parseFloat($('#amount_JOB').val() || 0).toFixed(Decimal) + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

             "<td id='col_10' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:8%;' >" +
            "<input type='text' id='resource_" + id + "' value='' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='resourceid_" + id + "' value='0'>" + "</td>" +

            "</tr>";

        $('#tbl_materialrequest').append(ProdEditRow);
        $('#unit_' + id).val($('#unit_JOB').val());


        HideJobPopup();
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        CalcGrandTotal($("#GridLength").val());
        $("#product_0").val('');
        $("#product_0").focus();
    }
}

function ClearProductRow(Flag) {
    ProductPopuprefresh();
    HideJobPopup();
    if (Flag == 0) { $("#product_0").val(''); }

    $("#productId_0,#ProductLength,#unit_0,#boq_0,#boqno_0,#boqsubid_0,#issued_0,#balance_0,#quantity_0,#resourceid_0,#BOQAmt_0").val(0);
    $("#productdesc_0,#resource_0").val('');
    $("#price_0,#amount_0").val(parseFloat(0).toFixed(Decimal));
    $("#BOQConfirmFlag").val("NO");
    $("#MRconfirmOk").show();

}




function formrefresh(Flag) {

    if (Flag != 1) {
        Serialnoload();
        CopyFlag = 0;
        MainEditFlag = 0;
        GridEditFlag = 0;
        EditUnit = 0;
        EditQty = 0;
        EditPrice = 0;
        $(".editds,.butndis,.btnde,.btnhide").prop("disabled", false);
        $(".dedisa").prop("disabled", true);
        $("#MRDiv,.btnde").show();
        $("#CopyMRDiv,.btnhide").hide();
        $("#MaxMRNo").val(0);
        $('#confirmOk').prop("disabled", false);
    }

    $("#RequestedBy,#Designation,#Attn,#Subject,#OfficeFileNo,#Urgency,#JobCode,#JobDesc,#Purpose,#ApprovedDate,#ApprovedByUser,#BOQ").val('');
    $("#GridLength,#RequestFlag,#ApprovedBy,#PEFlag,#RequestedById,#DesignationId,#JobId").val(0);
    $("#TotalAmount,#EstAmount").val(parseFloat(0).toFixed(Decimal));
    $("#TotalAmountLabel").text(parseFloat(0).toFixed(Decimal));
    $("#CopyStatus").text('');
    $("#MRDate").val(CurDate);
    $('#tbl_materialrequest tr').remove();
    ClearProductRow(0);
    $('.btnhide').hide();
    $("#CopyStatus").removeClass();
    ItemArray = [];
    $("#EstConfirmFlag").val("NO");
   
}


function NewMR() {
    if ($('#tbl_materialrequest tr').length > 0) {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('NewMR'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Data Will Be Lost !.. Do You Want To Continue?')

    }
    else {
        formrefresh(0);
    }

}




function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletegridrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')
}

function OKDeleteRow(RowId) {

    var slno = 1;
    var GridLength = $("#GridLength").val();
    $('#row_' + RowId).remove();
    ItemArray = [];
    for (var j = 1; j <= GridLength; j++) {
        if ($('#product_' + j).val() != undefined) {

            var item = $("#productId_" + j).val();
            if (ItemArray.indexOf(item) == -1 && item != '0') {
                ItemArray.push(item);
            }

            $('#td_' + j).text(slno);
            slno++;
        }
    }
    $('#product_0').focus();
    CalcGrandTotal(GridLength);
}

function Editrow(RowId) {
    $("#BOQConfirmFlag").val("NO");
    if (GridEditFlag == 0) {

        GridEditFlag = GridEditFlag + 1;
        $('#row_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');

        EditUnit = $('#unit_' + RowId).val();
        EditQty = $('#quantity_' + RowId).val();
        EditPrice = $('#price_' + RowId).val();

        $('#edit_' + RowId).hide();
        $('#update_' + RowId).show();

        $('#unit_' + RowId).prop('disabled', false);
        $('#quantity_' + RowId).prop('disabled', false);
        $('#price_' + RowId).prop('disabled', false);


    }
    else {
        warningshow('Update Edit Mode Row First');
    }
}

function CancelEdit(RowId) {

    $('#row_' + RowId).children('td, th').css('background-color', 'white');

    $('#unit_' + RowId).val(EditUnit);
    $('#quantity_' + RowId).val(EditQty);
    $('#price_' + RowId).val(EditPrice);

    EditUnit = 0;
    EditQty = 0;
    EditPrice = 0;
    GridEditFlag = GridEditFlag - 1;

    $('#edit_' + RowId).show();
    $('#update_' + RowId).hide();

    $('#unit_' + RowId).prop('disabled', true);
    $('#quantity_' + RowId).prop('disabled', true);
    $('#price_' + RowId).prop('disabled', true);

    CalcAmount(RowId);

}

function UpdateRow(RowId) {

    if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        return false;
    }
    else if (parseInt($('#quantity_' + RowId).val() || 0) == 0) {
        warningshow('Please Enter Quantity', 'quantity_' + RowId);
        return false;
    }
    else if (($('#productId_' + RowId).val() != 0) && (parseFloat($("#price_" + RowId).val() || 0) > parseFloat($("#BOQAmt_" + RowId).val() || 0) || parseFloat($("#quantity_" + RowId).val() || 0) > parseFloat($("#boq_" + RowId).val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES') {
        CheckBOQ(RowId)
        return false;
    }
    else {
        $('#row_' + RowId).children('td, th').css('background-color', 'white');

        EditUnit = 0;
        EditQty = 0;
        EditPrice = 0;
        GridEditFlag = GridEditFlag - 1;

        $('#edit_' + RowId).show();
        $('#update_' + RowId).hide();

        $('#unit_' + RowId).prop('disabled', true);
        $('#quantity_' + RowId).prop('disabled', true);
        $('#price_' + RowId).prop('disabled', true);

        CalcAmount(RowId);
        $("#BOQConfirmFlag").val('NO');
    }
}

function SaveMR() {
    if ($("#JobId").val() == 0) {
        warningshow('Please Select Job', 'JobCode');
        return false;
    }
    else if ($("#MRNo").val() == '') {
        warningshow('MR# Cannot be Null', 'MRNo');
        return false;
    }
    else if ($('#tbl_materialrequest tr').length == 0) {
        warningshow('No Products Added', 'product_0');
        return false;
    }
    else if (parseFloat($("#TotalAmount").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES") {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountSave'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('SaveMR'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Save This Material Request?')
    }

}
function OKSaveMR() {

    $('#btnsubmit').prop("disabled", true);
    $('#confirmOk').prop("disabled", true);

    var i = $("#GridLength").val();

    var oArray = new Array();
    for (var k = 1; k <= i; k++) {

        var MRNo = $('#MRNo').val();
        var MRDate = $('#MRDate').val();
        var RequestedById = $('#RequestedById').val();
        var DesignationId = $('#DesignationId').val();
        var Attn = $('#Attn').val();
        var Subject = $('#Subject').val();
        var OfficeFileNo = $('#OfficeFileNo').val();
        var Urgency = $('#Urgency').val();
        var JobNo = $('#JobId').val();
        var Purpose = $('#Purpose').val();
        var TotalAmount = $('#TotalAmount').val();

        var ItemId = $('#productId_' + k).val();
        var ItemCode = $('#product_' + k).val();
        var ItemDescription = $('#productdesc_' + k).val();
        var UnitId = $('#unit_' + k).val();
        var BOQQty = $('#boq_' + k).val();
        var IssuedQty = $('#issued_' + k).val();
        var BalanceQty = $('#balance_' + k).val();
        var Quantity = $('#quantity_' + k).val();
        var Price = $('#price_' + k).val();
        var Amount = $('#amount_' + k).val();
        var BOQNo = $('#boqno_' + k).val();
        var BOQSubId = $('#boqsubid_' + k).val();
        var ResourceId = $('#resourceid_' + k).val();
        var RequestFlag = $("#RequestFlag").val();

        var DeptId = ERPDeptId;
        var UserId = ERPUserId;

        var DelFlag = 1;
        var ApprovedBy = $("#ApprovedBy").val();
        var ApprovedDate = $("#ApprovedDate").val();
        var PEFlag = $("#PEFlag").val();
        var MRMainId = 0;
        var MRSubId = 0;
        var Variable1 = '';
        var Variable2 = '';


        if (!(typeof ItemId == "undefined")) {

            oArray.push({

                'MRNo': MRNo,
                'MRDate': MRDate,
                'RequestedById': RequestedById,
                'DesignationId': DesignationId,
                'Attn': Attn,
                'Subject': Subject,
                'OfficeFileNo': OfficeFileNo,
                'Urgency': Urgency,
                'JobNo': JobNo,
                'Purpose': Purpose,
                'TotalAmount': TotalAmount,

                'ItemId': ItemId,
                'ItemCode': ItemCode,
                'ItemDescription': ItemDescription,
                'UnitId': UnitId,
                'BOQQty': BOQQty,
                'IssuedQty': IssuedQty,
                'BalanceQty': BalanceQty,
                'Quantity': Quantity,
                'Price': Price,
                'Amount': Amount,
                'BOQNo': BOQNo,
                'BOQSubId': BOQSubId,
                'ResourceId': ResourceId,
                'RequestFlag': RequestFlag,

                'DeptId': DeptId,
                'UserId': UserId,

                'DelFlag': DelFlag,
                'ApprovedBy': ApprovedBy,
                'ApprovedDate': ApprovedDate,
                'PEFlag':PEFlag,
                'MRMainId': MRMainId,
                'MRSubId': MRSubId,
                'Variable1': Variable1,
                'Variable2': Variable2,

            })
        }
    }

    if (oArray != "") {

        var data = { 'MaterialRequestModel': oArray };
        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MaterialRequestInsert",
            data: data,
            success: function (result) {
                
                    var status = result.oList[0].Status;
                    var no = result.oList[0].MRNo;
                    $('#btnsubmit').prop("disabled", false);
                    Showalerts(status, no);
                
            }
        });
    }
    else {
        warningshow('No Products Added', 'product_0');
        $('#btnsubmit').prop("disabled", false);
    }
}

function MRGets(result) {

    if (result.length > 0) {
        $('#btnprint').show();

        if (result[0].RequestFlag == 0) {       //ONLY EDIT AND DELETE BEFORE APPROVAL OR REJECTION
            $('#btndelete,#btnedit,#btnprint').show();
            var Approval = 0;
        }
        else if (result[0].RequestFlag == 1) {  //APPROVED
            var Approval = 1;
        }
        else if (result[0].RequestFlag == 2) {  //REJECTED
            var Approval = 2;
        }

        for (var n = 0; n < result.length; n++) {

            $('#BOQ').val(result[n].BOQ);
            $('#EstAmount').val(parseFloat(result[n].EstAmount || 0).toFixed(Decimal));

            $('#MRNo').val(result[n].MRNo);
            $('#MRDate').val(result[n].MRDate);
            $('#RequestedById').val(result[n].RequestedById);
            $('#RequestedBy').val(result[n].UserName);
            $('#DesignationId').val(result[n].DesignationId);
            $('#Designation').val(result[n].Designation);
            $('#Attn').val(result[n].Attn);
            $('#Subject').val(result[n].Subject);
            $('#OfficeFileNo').val(result[n].OfficeFileNo);
            $('#Urgency').val(result[n].Urgency);
            $('#JobId').val(result[n].JobNo);
            $('#JobCode').val(result[n].JobCode);
            $('#JobDesc').val(result[n].JobDescription);
            $('#Purpose').val(result[n].Purpose);
            $('#TotalAmount').val(result[n].TotalAmount);
            $("#RequestFlag").val(result[n].RequestFlag);
            $("#ApprovedBy").val(result[n].ApprovedBy);
            $("#ApprovedDate").val(result[n].ApprovedDate);
            $("#PEFlag").val(result[n].PEFlag);
            $("#ApprovedByUser").val(result[n].ApprovedByUser);

            var id = parseInt(n + 1)            

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'>" +
            "<td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;' >" +
            "<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +

            "<td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:4%;display:none' >" +
            "<input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'>" +
            "<input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +

            "<td id='td_" + id + "' class='jsgrid-cell'  style= 'width:4%;text-align:center' >" + id +
            "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +

            "<td id='col_1' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:12%;' >" +
            "<input type='text' id='product_" + id + "' value='" + result[n].ItemCode + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='productId_" + id + "' value='" + result[n].ItemId + "'>" + "</td>" +

            "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:18%;' >" +
            "<input type='text' id='productdesc_" + id + "' value='" + result[n].ItemDescription + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_3' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:7%;' >" +
            "<select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" + UnitSelect + "</select></td>" +

            "<td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='boq_" + id + "' value='" + result[n].BOQQty + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='boqno_" + id + "' value='" + result[n].BOQNo + "'>" +
            "<input type='hidden' id='boqsubid_" + id + "' value='" + result[n].BOQSubId + "'>" +
            "<input type='hidden' id='BOQAmt_" + id + "' value='" + result[n].BOQAmt + "' /></td>" +

            "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='issued_" + id + "' value='" + result[n].IssuedQty + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='balance_" + id + "' value='" + result[n].BalanceQty + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_7' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='quantity_" + id + "' value='" + result[n].Quantity + "'  class='form-control' disabled style='height:30px;background-color:white' onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")' /></td>" +

            "<td id='col_8' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='price_" + id + "' value='" + result[n].Price + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumberInt(event, this)' onkeyup='CalcAmount(" + id + ")'></td>" +

            "<td id='col_9' class= 'jsgrid-cell jsgrid-align-center'  style= 'width:8%;' >" +
            "<input type='text' id='amount_" + id + "' value='" + result[n].Amount + "' class='form-control' disabled style='height:30px;background-color:white' ></td>" +

            "<td id='col_10' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:8%;' >" +
            "<input type='text' id='resource_" + id + "' value='" + result[n].ResourceCode + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            "<input type='hidden' id='resourceid_" + id + "' value='" + result[n].ResourceId + "'>" + "</td>" +

            "</tr>";


            $('#tbl_materialrequest').append(ProdEditRow);
            $('#unit_' + id).val(result[n].UnitId);
            CalcAmount(id);

            var item = $("#productId_"+id).val();
            if (ItemArray.indexOf(item) == -1 && item != '0') {
                ItemArray.push(item);
            }


        }
        $(".jsgrid-button").prop("disabled",true);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        CalcGrandTotal(id);
        $("#GridLength").val(id);

        if (Approval == 1) {
            $("#CopyStatus").removeClass();
            $("#CopyStatus").addClass('badge badge-success m-0');
            $("#CopyStatus").text('APPROVED');
        }
        else if (Approval == 2) {
            $("#CopyStatus").removeClass();
            $("#CopyStatus").addClass('badge badge-danger m-0');
            $("#CopyStatus").text('REJECTED');
        }

    }
    else {
        CheckeDeleted();
    }

}

function CopyMR() {
    if ($('#tbl_materialrequest tr').length > 0) {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('CopyMR'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Data Will Be Lost !.. Do You Want To Continue?')

    }
    else {
        OKCopyMR();
    }
}

function OKCopyMR() {
    $("#MRDiv,#btnsubmit,#btnlist").hide();
    $("#CopyMRDiv").show();
    formrefresh(1);
    $("#CopyMRNo").focus();
    $("#CopyMRNo,#MaxMRNo").val($("#MRNo").val());
    $("#CopyMRNo").select();
    $('.editds,.butndis').prop("disabled", true);
}

function EditMR() {
    EditInvoice(0);
}

function OKEditMR() {
    MainEditFlag = 1;
    $('#OTPDiv').fadeOut();
    $(".editds,.butndis,.btnde,.btnhide,.jsgrid-button").prop("disabled", false);
    $(".dedisa").prop("disabled", true);
    $("#MRDiv,#btnupdate,#btnlist").show();
    $("#CopyMRDiv,#btnedit,#btndelete,#btnsubmit,#btnprint,#btnlist").hide();

}

function UpdateMR() {

    if ($("#JobId").val() == 0) {
        warningshow('Please Select Job', 'JobCode');
        return false;
    }
    else if ($("#MRNo").val() == '') {
        warningshow('MR# Cannot be Null', 'MRNo');
        return false;
    }
    else if ($('#tbl_materialrequest tr').length == 0) {
        warningshow('No Products Added', 'product_0');
        return false;
    }
    else if (parseFloat($("#TotalAmount").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES") {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountCopy'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('UpdateMR'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Do You Want To Update This Material Request?')
    }
}

function OKUpdateMR() {

    $('#btnupdate').prop("disabled", true);
    $('#confirmOk').prop("disabled", true);

    var i = $("#GridLength").val();

    var oArray = new Array();
    for (var k = 1; k <= i; k++) {

        var MRNo = $('#MRNo').val();
        var MRDate = $('#MRDate').val();
        var RequestedById = $('#RequestedById').val();
        var DesignationId = $('#DesignationId').val();
        var Attn = $('#Attn').val();
        var Subject = $('#Subject').val();
        var OfficeFileNo = $('#OfficeFileNo').val();
        var Urgency = $('#Urgency').val();
        var JobNo = $('#JobId').val();
        var Purpose = $('#Purpose').val();
        var TotalAmount = $('#TotalAmount').val();

        var ItemId = $('#productId_' + k).val();
        var ItemCode = $('#product_' + k).val();
        var ItemDescription = $('#productdesc_' + k).val();
        var UnitId = $('#unit_' + k).val();
        var BOQQty = $('#boq_' + k).val();
        var IssuedQty = $('#issued_' + k).val();
        var BalanceQty = $('#balance_' + k).val();
        var Quantity = $('#quantity_' + k).val();
        var Price = $('#price_' + k).val();
        var Amount = $('#amount_' + k).val();
        var BOQNo = $('#boqno_' + k).val();
        var BOQSubId = $('#boqsubid_' + k).val();
        var ResourceId = $('#resourceid_' + k).val();
        var RequestFlag = $("#RequestFlag").val();

        var DeptId = ERPDeptId;
        var UserId = ERPUserId;

        var DelFlag = 1;
        var ApprovedBy = $("#ApprovedBy").val();
        var ApprovedDate = $("#ApprovedDate").val();
        var PEFlag = $("#PEFlag").val();
        var MRMainId = 0;
        var MRSubId = 0;
        var Variable1 = '';
        var Variable2 = '';


        if (!(typeof ItemId == "undefined")) {

            oArray.push({

                'MRNo': MRNo,
                'MRDate': MRDate,
                'RequestedById': RequestedById,
                'DesignationId': DesignationId,
                'Attn': Attn,
                'Subject': Subject,
                'OfficeFileNo': OfficeFileNo,
                'Urgency': Urgency,
                'JobNo': JobNo,
                'Purpose': Purpose,
                'TotalAmount': TotalAmount,

                'ItemId': ItemId,
                'ItemCode': ItemCode,
                'ItemDescription':ItemDescription,
                'UnitId': UnitId,
                'BOQQty': BOQQty,
                'IssuedQty': IssuedQty,
                'BalanceQty': BalanceQty,
                'Quantity': Quantity,
                'Price': Price,
                'Amount': Amount,
                'BOQNo': BOQNo,
                'BOQSubId': BOQSubId,
                'ResourceId': ResourceId,
                'RequestFlag': RequestFlag,

                'DeptId': DeptId,
                'UserId': UserId,

                'DelFlag': DelFlag,
                'ApprovedBy': ApprovedBy,
                'ApprovedDate': ApprovedDate,
                'PEFlag': PEFlag,
                'MRMainId': MRMainId,
                'MRSubId': MRSubId,
                'Variable1': Variable1,
                'Variable2': Variable2,

            })
        }
    }

    if (oArray != "") {

        var data = { 'MaterialRequestModel': oArray };
        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MaterialRequestUpdate",
            data: data,
            success: function (result) {
                
                    var status = result.oList[0].Status;
                    var no = result.oList[0].MRNo;
                    $('#btnupdate').prop("disabled", false);
                    Showalerts(status, no);
                
            }
        });
    }
    else {
        warningshow('No Products Added', 'product_0');
        $('#btnupdate').prop("disabled", false);
    }
}

function DeleteMR() {

    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('DeleteMR'); $('#ConfirmRowId').val(0);
    $('#confirmmessage').text('Do You Want To Delete This Material Request?')

}
function OKDeleteMR() {

    var data = {};
    data.MRNo = $('#MRNo').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../MaterialRequest/MaterialRequestDelete",
        data: data,
        success: function (result) {
            $('#OTPDiv').hide();
            var status = result.oList[0].Status;
            var no = result.oList[0].MRNo;
            Showalerts(status, no);

        }
    });

}

function PrintMR(flag) {
    if ($('#tbl_materialrequest tr').length > 0 && flag==0) {  //Save Print
        PrintthisBillWindows('MaterialRequestSave', i);
    }
    else if ($('#tbl_materialrequest tr').length > 0 && flag == 1) {   //Copy Print
        PrintthisBillWindows('MaterialRequestCopy', i);
    }
    else {
        warningshow('Please select a MR No. to print', 'CopyMRNo');
        $('#CopyMRNo').select();
    }
}

function GetPrevousornext(Value) {
    var NextInvoiceNo = $("#MaxMRNo").val(); 
    var SlNo = parseInt($('#CopyMRNo').val() || 0);
    SlNo = SlNo + Value;

    if ((SlNo <= 0) || (SlNo >= NextInvoiceNo)) {
        warningshow('MR# Not Valid', 'CopyMRNo');
        $("#CopyMRNo").select();
        return false;
    }
    else {
        $('#CopyMRNo').val(SlNo);
        var data = {};
        data.MRNo = SlNo;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MaterialRequestGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                MRGets(result.oList);
            }
        });
    }
}

function CopyFormView(SlNo) {

    $("#MRDiv,#btnsubmit,#btnlist,#MRViewDiv").hide();
    $("#CopyMRDiv").show();
    formrefresh(1);
    $("#CopyMRNo").focus();
    $("#CopyMRNo,#MaxMRNo").val($("#MRNo").val());
    $("#CopyMRNo").select();
    $('.editds,.butndis').prop("disabled", true);

        $('#CopyMRNo').val(SlNo);
        var data = {};
        data.MRNo = SlNo;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MaterialRequestGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                MRGets(result.oList);
            }
        });    
}

function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'MREQ';
    datax.SlNo = $('#CopyMRNo').val();
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

                swal('MR# ' + slno + ' ', "Cancelled!!!", "error");
                $('.swal-button swal-button--confirm').focus();
            }

        }
    });
}


function EditInvoice(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditInvoce(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();

}

function CheckEditInvoce(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Material Request Edit- OTP';
        else if (Flag == 1)
            Operation = 'Material Request Delete- OTP';

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
            OKEditMR();
        }
        else if (Flag == 1) {
            OKDeleteMR();
        }

    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}


function BOQDetails() {

    if ($("#JobId").val() == 0) {
        warningshow('Please Select Job', 'JobCode');
        return false;
    }
    else {
        var data = {};
        data.JobNo = $("#JobId").val();
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MaterialRequestBOQGets",
            data: data,
            success: function (result) {                
                BOQList(result.oList);

                popuprefresh();
                ProductPopuprefresh();
                HideJobPopup();

            }
        });
    }
}


function BOQList(result) {
    disable_datatable('tbl_BOQList');
    $("#BOQDiv").show();

    var responseText = "<thead>" +
        "<tr><th>Sl#</th><th>BOQ#</th><th>Item Code</th><th>Description</th><th>Quantity</th><th>Price</th></tr>" +
        "<tr><th> </th><th>BOQ#</th><th>Item Code</th><th>Description</th><th> </th><th> </th></tr>" +
        "</thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr>' +
            '<td align="center">' + slno + '</td>' +
            '<td> BOQ# - ' + result[l].BOQNo + '</td>' +
            '<td>' + result[l].ItemCode + '</td>' +
            '<td>' + result[l].ItemDescription + '</td>' +
            '<td align="center">' + result[l].Quantity + '</td>' +
            '<td align="right">' + parseFloat(result[l].Price||0).toFixed(Decimal) + '</td>' +
            '</tr>';
    }
    $('#tbl_BOQList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_BOQList', '1');
}

function IssuedDetails() {
    if ($("#JobId").val() == 0) {
        warningshow('Please Select Job', 'JobCode');
        return false;
    }
    else {
        var data = {};
        data.JobNo = $("#JobId").val();
        data.ItemId = $("#productId_0").val();
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;

        $.ajax({
            type: "POST",
            url: "../MaterialRequest/MRIssueDetails",
            data: data,
            success: function (result) {
                IssuedDetailsList(result.oList);

                popuprefresh();
                ProductPopuprefresh();
                HideJobPopup();

            }
        });
    }

}

function IssuedDetailsList(result) {

    disable_datatable('tbl_IssuedList');
    $("#IssuedDiv").show();

    var responseText = "<thead>" +
        "<tr><th>Sl#</th><th>REQ#</th><th>Date</th><th>RequestedBy</th><th>Status</th><th>Item Code</th><th>Description</th><th>Quantity</th><th>IssuedQty</th><th>MI#</th></tr>" +
        "<tr><th> </th><th>REQ#</th><th>Date</th><th>RequestedBy</th><th>Status</th><th>Item Code</th><th>Description</th><th> </th><th> </th><th>MI#</th></tr>" +
        "</thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        if (result[l].Status == 'Pending') { var rowclass = 'badge-danger'; }
        else if (result[l].Status == 'Approved') { var rowclass = 'badge-success'; }
        else if (result[l].Status == 'Rejected') { var rowclass = 'badge-secondary'; }

        responseText += '<tr>' +
            '<td align="center">' + slno + '</td>' +
            '<td>' + result[l].MRNo + '</td>' +
            '<td>' + result[l].MRDate + '</td>' +
            '<td>' + result[l].RequestedBy + '</td>' +
            '<td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '">' + result[l].Status + '</span></div></td>' +
            '<td>' + result[l].ItemCode + '</td>' +
            '<td>' + result[l].ItemDescription + '</td>' +
            '<td align="center">' + result[l].Quantity + '</td>' +
            '<td align="center">' + result[l].IssuedQty + '</td>' +
            '<td>' + result[l].MINo + '</td>' +
            '</tr>';
    }
    $('#tbl_IssuedList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_IssuedList', '3');
}


function HideIssuedDiv() {
    $("#IssuedDiv").hide();
}

function ViewMRDefault() {
    $("#ViewFromDate").val(CurDate);
    $("#ViewToDate").val(CurDate);
    $("#ViewToDate,#ViewFromDate").prop("disabled", false);
    ViewMR();
}

function ViewMR() {

    var data = {};
    data.Status = 'All';
    data.FromDate = $("#ViewFromDate").val();
    data.ToDate = $("#ViewToDate").val();
    data.Flag = 1;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;

    $.ajax({
        url: '../MaterialRequest/MaterialRequetApprovalGets',
        type: "POST",
        data: data,
        dataType: "json",
        success: function (result) {
            ApprovalGets(result.oList);
        }
    });

}

function ApprovalGets(result) {

    disable_datatable('tbl_MaterialRequestList');

    $("#MRViewDiv").show();
        var responseText = "<thead>" +
            "<tr><th>Sl#</th><th>MR#</th><th>Date</th><th>Job Code</th><th>Description</th><th>Requested By</th><th>Status</th><th>Approved By</th></tr>" +
            "<tr><th> </th><th>MR#</th><th>Date</th><th>Job Code</th><th>Description</th><th>Requested By</th><th>Status</th><th>Approved By</th></tr>" +
            "</thead><tbody>";
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);


            if (result[l].Status == 'Pending') {var rowclass = 'badge-danger';}
            else if (result[l].Status == 'Approved') { var rowclass = 'badge-success'; }
            else if (result[l].Status == 'Rejected') { var rowclass = 'badge-secondary'; }


            responseText += '<tr ondblclick=CopyFormView(\'' + result[l].MRNo + '\')>' +
                '<td align="center">' + slno + '</td>' +
                '<td align="center">' + result[l].MRNo + '</td>' +
                '<td>' + result[l].MRDate + '</td>' +
                '<td>' + result[l].JobCode + '</td>' +
                '<td>' + result[l].JobDescription + '</td>' +
                '<td>' + result[l].RequestedBy + '</td>' +
                '<td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '" id="status_' + slno + '">' + result[l].Status + '</span></div></td>' +
                '<td>' + result[l].ApprovedByUser + '</td>' +                
                '</tr>';
        }
        $('#tbl_MaterialRequestList').html(responseText + '</tbody>');

        datatableWithsearch('tbl_MaterialRequestList', '2');
    
}

//======================================COMMON=====================================================

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'deletegridrow') {
        OKDeleteRow(rowid);
    }
    else if (Result == 'true' && status == 'NewMR') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'CopyMR') {
        OKCopyMR();
    }
    else if (Result == 'true' && status == 'SaveMR') {
        OKSaveMR();
    }
    else if (Result == 'true' && status == 'DeleteMR') {
        EditInvoice(1);
    }
    else if (Result == 'true' && status == 'UpdateMR') {
        OKUpdateMR();
    }
    else if (Result == 'true' && status == 'EstAmountSave') {
        $("#EstConfirmFlag").val("YES");
        SaveMR();
        return;
    }
    else if (Result == 'true' && status == 'EstAmountCopy') {
        $("#EstConfirmFlag").val("YES");
        UpdateMR();
        return;
    }
    
    $("#EstConfirmFlag").val("NO");
    $('#confirm').fadeOut();

}


function MRConfirmboxResult(Result, status, rowid) {
    $('#confirm').hide();
    if (Result == 'true' && status == 'ConfirmBOQ') {
        CheckBOQConfirm(rowid,Result);
    }
    else if (Result == 'false' && status == 'ConfirmBOQ' && rowid == 0) {
        $("#product_0").focus();
    }
    else if (Result == 'false' && status == 'ConfirmBOQ' && rowid != 0) {
        CancelEdit(rowid);
    }
    else if (Result == 'true' && status == 'PROAL') {
        $("#produt_0").focus();
    }
    $("#EstConfirmFlag").val("NO");
    $('#MRconfirm').fadeOut();

}
//Numeric Only Text Boxes with Decimal Point

function isNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }

    return true;

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

//Show Warnig Popup right top

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status, no) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
       // formrefresh(0);
        //swal('MR# : ' + no + ' ', "Saved Successfully", "success");
        //$('.swal-button swal-button--confirm').focus();
         $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>MR# : ' + no + '</b><br> Saved Successfully!<br>Do you want to print this MI?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
        //formrefresh(0);
        //swal('MR# : ' + no + ' ', "Updated Successfully", "success");
        //$('.swal-button swal-button--confirm').focus();
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>MR# : ' + no + '</b><br> Updated Successfully!<br>Do you want to print this MI?');
        $('#btnok').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Enquiry No : ' + no + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else {
        swal('Same MR# Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}
function ShowalertsSmall(Status) {
    if (Status == 1) {
        popuprefresh();
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        popuprefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        popuprefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function DesgPopup() {
    ProductPopuprefresh();
    HideBOQDiv();
    HideJobPopup();

    $("#popupdiv").show();
    $("#descode,#desdescription").val('');
    $("#descode").focus();
}
function popuprefresh() {
    $("#popupdiv").hide();
    $("#descode,#desdescription").val('');
}

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}
function HideBOQDiv() {
    $("#BOQDiv").hide();
}

function ShowJobPopup() {

    $("#product_JOB,#quantity_JOB,#price_JOB,#amount_JOB").val('');
    $("#unit_JOB").val(0);

    $('#Jobdiv').show();
    $("#product_JOB").focus();
}
function HideJobPopup() {

    $("#Jobdiv").hide();

    $("#product_JOB,#quantity_JOB,#price_JOB,#amount_JOB").val('');
    $("#unit_JOB").val(0);
}

function SaveDesignation() {
    if ($.trim($('#descode').val()) == '') {
        warningshow('Please Enter Code', 'descode')
        return false;
    }
    else if ($.trim($('#desdescription').val()) == '') {
        warningshow('Please Enter Description', 'desdescription')
        return false;
    }
    else {

        var data = {};   //array
        data.DesignationId = 0;
        data.DesignationCode = $('#descode').val();
        data.DesignationDescription = $('#desdescription').val();
        data.DelFlag = 1;
        $.ajax({
            type: "POST",
            url: "../Master/DesignationInsertandUpdate",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                ShowalertsSmall(status);

            }
        });
    }
}


function CustPrdctLoad(result) {

    popuprefresh();
    HideBOQDiv();

    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) { custstat = "LSP";}
        else {custstat = "LSP";}
        $('#productpdiv,#Infospopup').slideDown();

        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");


        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + $("#productdesc_0").val() + "</b></td>" +
           "<td style='border:none;font-weight:500' class='text-left'><table width='100%'><tr><td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" + "</tr></table></td></tr>" +
           "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";



        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');

    }

}



function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
             $(this).html('<input type="text" class="form-control" style="width:100%"  placeholder="' + title + '"/>')           
    });

    var table = null;

    if (Type == '1') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                { "width": "5%", "targets": 0 },
                                { "width": "15%", "targets": 1 },
                                { "width": "20%", "targets": 2 },
                                { "width": "30%", "targets": 3 },
                                { "width": "15%", "targets": 4 },
                                { "width": "15%", "targets": 5 },                              
            ],
        });

    }
    else if (Type == '2') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                   { "width": "5%", "targets": 0 },
                                   { "width": "7%", "targets": 1 },
                                   { "width": "5%", "targets": 2 },
                                   { "width": "15%", "targets": 3 },
                                   { "width": "31%", "targets": 4 },
                                   { "width": "15%", "targets": 5 },
                                   { "width": "7%", "targets": 6 },
                                   { "width": "15%", "targets": 7 },
                    ],
        });

    }
    else if (Type == '3') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                   { "width": "5%", "targets": 0 },
                                   { "width": "7%", "targets": 1 },
                                   { "width": "6%", "targets": 2 },
                                   { "width": "15%", "targets": 3 },
                                   { "width": "6%", "targets": 4 },
                                   { "width": "15%", "targets": 5 },
                                   { "width": "25%", "targets": 6 },
                                   { "width": "7%", "targets": 7 },
                                   { "width": "7%", "targets": 8 },
                                   { "width": "7%", "targets": 9 },
                                   
            ],
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