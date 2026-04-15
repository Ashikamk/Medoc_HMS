
var LocnSelect = ''; var TaxSelect = ''; var DrugSchedule = ''; var Copyflag = 0; var Editflag = 0; var DeptSelect = ""; var Updateflag = 0; var CurrentBillNo;
var RowCount = 1; var ProcCount = 1; var TaxRateArray = []; var LocArray = []; var ItemIdArray = [];
var IPTax; var OldLoc = 0; var QtyFlg = 0;
//-------Settings Table
var IPPatientFlag = CIPTaxZero; var INTaxType = CTaxType;
//-------End Settings Table

var SpecialFeeFlag = 1;


$(document).keydown(function (event) {
    //$('#Warningpopup').fadeOut();


    //PopUpShow

    var X = event.keyCode;

    if (X == 115)
    {
        PopUpShow(3);
    }

    if ((X > 111 && X < 124)) {
        if (X == 118) {                         // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            LastSalesTransactions();
        }
        else if (X == 119) {                    // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            LastPurchaseTransactions();
        }
        else if (X == 120) {                     // F9 :   All Transaction details Popup      
            AllTransaction();
        }

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }
    else if (X == 177) {                     // F9 :   All Transaction details Popup      
        PopUpShow(3);

        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;
    }
    else if (X == 27) {                         //ESC       :   Popup Close
            PopUpClose(1);
            PopUpClose(2);
            PopUpClose(3);
            PopUpClose(4);
            PopUpClose(5);
            ngOnPrescription();
            CloseAlert();
    }

});

$(document).ready(function () {
    Defaultfocus();
    LoadDate();
    BillLoad();
    DoctorLoad();
    //LocnLoad();
    GetTax();
    SubCategoryGets();
    BtnFocusClr();
    LoadAutoComplete();
    CalcGrandTotal(0);
    roundoffcalcn(0);
    DeptLoad();
    DynamicColor();

    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserLocationGetandGets",
        data: data,
        success: function (result) {
            for (var b = 0; b <= result.oList.length; b++) {
                if (b != result.oList.length)
                    LocArray.push(result.oList[b].LocationId);
                else
                    LocnLoad();
            }
        }
    });

    $('#SpecialFeeDiv').on('shown.bs.modal', function () {
        $('#SpecialFeeAmt').focus();
    })

    $(document).on('focusin', '#HLocation', function () {
        OldLoc = $(this).val();
    }).on('change', '#HLocation', function () {
        var current = parseInt($.trim($('#HLocation').val()));
        var LocNmae = $('#HLocation :selected').text();
        if (current != 0) { LocNmae = ' to ' + LocNmae }
        else { LocNmae = ' '}
        if ((LocArray.indexOf(current) == -1) && (current != UserLocationId))  
        {
            $('#HLocation').val(OldLoc);
            warningshow('No access' + LocNmae, 'HLocation');
        }
        else {
            OldLoc = current;
        }
    });

    //PopUpShow(2);

    if ((usermenu1.indexOf("M252") == -1)) { // From Total Taxable
        $("#DiscFromGrandTotal").prop("checked", false);
        $("#DiscFromGrandTotal").prop("disabled", true);
    }
    else {                                 // From GrandTotal
        $("#DiscFromGrandTotal").prop("checked", true);
        $("#DiscFromGrandTotal").prop("disabled", false);
    }

    $("#btnsubmit").click(function (e) {
       // $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
        SaveAndUpdateConfirm(1);
    });
    $("#btnsaveedit").click(function (e) {
       // $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
        SaveAndUpdateConfirm(2);
    });

    $('#HPatient').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#HPatient').val() != '') {
                if ($('#HRegNo').val() == '') {
                    $('#HDoctor').val(1);
                }
                $('#Product0').focus();
            }
        }
    });

    $('.topfocs:not(.btn,.AVFC)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('.topfocs');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });

    $('.proccls0:not(.atcmpl,.btn)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            //e.preventDefault();
            var ElId = this.id;
            if (ElId == 'ProcQty0') {
                e.preventDefault();
                $('#proceadd').focus();
            }

            
            //var inputs = $(this).closest('body').find('.proccls0:enabled');
           // inputs.eq(inputs.index(this) + 1).focus().select();

        }
        else if (key == 37)
        {
           
            if (ElId == 'ProcFee0')
            {
                e.preventDefault();
                $('#ProcQty0').focus().select();
            }
            else if (ElId == 'ProcQty0') {
                e.preventDefault();
                $('#Procedure0').focus().select();
            }
            else if (ElId == 'ProcTax0') {
                e.preventDefault();
                $('#ProcFee0').focus().select();
            }
        }
    });

    $('.proccls0.btn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $('#ProcTax0').focus().select();
        }
    });

    $('#ProcedurePopup').on('shown.bs.modal', function () {
        $('#Procedure0').focus();
    })
    $('#QtyModal').on('shown.bs.modal', function () {
        $('#BtnWarn').focus();
    })

    $('.proccls0.btn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $('#ProcTax0').focus().select();
        }
    });
    $('#btnSavedCancel').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37 || key == 39) {
            $('#btnSavedOk').focus();
        }
    });
    $('#btnSavedOk').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37 || key == 39) {
            $('#btnSavedCancel').focus();
        }
    });

    SelectPayType();
});

function SelectPayType()
{   
    if (SalesPayType == 'Credit') {
        $('#PayType').val(2);
    }
    else if (SalesPayType == 'UPI Pay') {
        $('#PayType').val(3);
    }
    else if (SalesPayType == 'Card Pay') {
        $('#PayType').val(4);
    }
    else {
        $('#PayType').val(1);
    }
}

//--------------------------Bill Load
function BillLoad() {
    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/BillSeriesGetandGets",
        data: data,
        success: function (result) {
            Billseriesload(result.oList);
        }
    });
}

function Billseriesload(result) {
   if (result.length == 0) {
       $("#confirmff").show();
   }
   else {
       $("#confirmff").hide();
       $("#HBillSeries").empty();
       for (var i = 0; i < result.length; i++) {
           $("#HBillSeries").append("<option value='" + result[i].id + "' name='" + result[i].CurrentNo + "' >" + result[i].BillDescription + "</option>");
       }
       $("#HBillSeries").val(result[0].id);
       $('#HBillNo').val(result[0].CurrentNo);
       CurrentBillNo = result[0].CurrentNo;
   }
}

function LoadBillNum()
{
    $('#HBillNo').val($("#HBillSeries :selected").attr('name'));
    CurrentBillNo = $('#HBillNo').val();

    if (Copyflag == 1)
    { copyrefresh(2); $('#HBillNoCopy').val($("#HBillSeries :selected").attr('name')); }
}
//--------------------------End Bill Load


//--------------------------Data Load
function LoadDate() {
    $('#HSalesDate').daterangepicker({
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);
   
    $('#DateFrom,#DateTo,#PrescFromDate,#PrescToDate').daterangepicker({
       
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);

    $('#PrescFromDate').daterangepicker({
        minDate: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    });

    $('#PrescToDate').daterangepicker({
        minDate: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()),
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);

     CheckEOD();
}

function CheckEOD() {
    if (EODType == 'EOD') {
        $("#HSalesDate").prop('disabled', true) //.addClass('bgclrwhite');
    }
    else {
        $("#HSalesDate").prop('disabled', false) //.removeClass('bgclrwhite');
    }
}

function DoctorLoad() {
    var data = {};                                       //dropdownbind
    data.DoctorId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevistDoctorGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#HDoctor").empty();
                $("#HDoctor").append("<option value='0' Fee='0'>Select</option>");
                for (var i = 0; i < result.oList.length; i++) {
                    $("#HDoctor").append("<option value='" + result.oList[i].DoctorId + "' Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }
            }
        }
    });
}

function LocnLoad() {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList);
        }
    });
}

function LocationLoad(result) {
    $("#HLocation").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocnSelect += "<option value='" + result[i].LocationId + "' name='" + result[i].NegativeBillingFlag + "'>" + result[i].LocationCode + "</option>";
     }
    $("#HLocation").append(LocnSelect);
    $('#HLocation').val(UserLocationId);

   // $('#HLocation').val(2);

}

function GetTax() {
    var data = {};
    data.TaxId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TaxGetandGets",
        data: data,
        success: function (result) {
            TaxLoad(result.oList);
        }
    });
}

function TaxLoad(result) {
    TaxRateArray = [];
    $("#Tax0").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    var TaxSplit = "";
    var s = 0;
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "' title='" + result[i].TaxName + "'>" + result[i].TaxName + "</option>";
        s = i + 1;
        TaxSplit = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +
        "<td class='text-center' id='TaxGrpname" + result[i].TaxRate + "'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox  text-center distxtbox dedisa bg-white borderno' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate / 2 + " %'></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='CGST_" + result[i].TaxRate + "' value='0.00'></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate / 2 + " %'></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='SGST_" + result[i].TaxRate + "' value='0.00'></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center bg-white borderno'  value='" + result[i].TaxRate + " %'></td>" +
        "<td class='text-center'><input type='text' disabled class='form-control smallTextbox dedisa text-center distxtbox bg-white borderno' id='IGST_" + result[i].TaxRate + "' value='0.00'></td>" +
        "</tr>";

        $('#tbltaxsplit').append(TaxSplit);

        TaxRateArray.push(parseInt(result[i].TaxRate));

        if (result[i].TaxRate == 0)
        { IPTax = result[i].TaxId; }
    }
    $("#Tax0,#ProcTax0").append(TaxSelect);
    TaxChange(0); ProcedTaxChange(0);
}

function TaxChange(Id)
{
    $("#TaxPercent" + Id).val($('#Tax' + Id).find("option:selected").attr("name") || 0);
    AmountCalc(Id);
    ClearFields(4,0);
    CalcGrandTotal(1);
    roundoffcalcn(0);
}

function ProcedTaxChange(Id) {
    $("#ProcTaxPerc" + Id).val($('#ProcTax' + Id).find("option:selected").attr("name") || 0);
    ProcedureAmountCalc(Id); 
    ProcedureGrandTotalCalc(1);
}

function SubCategoryGets() {       //DrugSchedule
    var data = {};
    data.SubCategoryId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SubCategoryGetandGets",
        data: data,
        success: function (result) {
            SubCategoryLoad(result.oList);
        }
    });
}

function SubCategoryLoad(result) {
    $("#DrugSchedule0").empty();
    DrugSchedule+="<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        DrugSchedule += "<option value='" + result[i].SubCategoryId + "'>" + result[i].SubCategoryName + "</option>";
    }
    $("#DrugSchedule0").append(DrugSchedule);
}

function DeptLoad()
{
     var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            DeptSelect = "";
            $("#select_dept").empty();
            DeptSelect = "<option value=0>-All-</option>";
            for (var j = 0; j < result.oList.length; j++) {
                DeptSelect += "<option value='" + result.oList[j].DepartmentId + "'name='" + result.oList[j].DepartmentName + "'>" + result.oList[j].DepartmentName + "</option>";
            }
            $("#select_dept").append(DeptSelect);
        }
    });
}

//--------------------------End Data Load

//--------------------------Transaction
function LastPurchaseTransactions() {
   
    var Type = 0;
    if ($('#select_status').prop("checked") == true)
        var Type = 1;

    if (($('#ProductId0').val() || 0) != 0) {
        var data = {};   //array
        data.ItemId = $('#ProductId0').val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = Type;

        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseTransactionSearch",
            data: data,
            success: function (result) {
                DivHideShow(0);
            if (result.length > 0)
            {
               
                disable_datatable('tblpurchasetrans');

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                      "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";
                var Qty = 0;

                for (var p = 0; p < result.length; p++) {
                    Z = p + 1;
                    var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                    var lpotr = '';
                    if (result[p].LPO != '0')
                        lpotr = result[p].LPO;

                    if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                        ProdRow = ProdRow + "<tr  id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td>" + result[p].SupplierName + "</td>" +
                            "<td>" + result[p].AccName + "</td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +
                             "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                            "</tr>";
                    }
                    else {
                        ProdRow = ProdRow + "<tr  id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +
                             "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                            "</tr>";
                    }

                    Qty = Qty + result[p].Quantity;

                }

                $("#totalnopurchase").text(result.length);
                $("#totalnopurchaseqty").text(Qty);

                $('#tblpurchasetrans').html(ProdRow + "</tbody>");

                datatableWithsearch('tblpurchasetrans', 'MultiplePurchaseT');

            }
        }
        });
    }
}

function LastSalesTransactions() {
    

    var Type = 0;
    if ($('#select_status_sales').prop("checked") == true)
        var Type = 1;

    if (($('#ProductId0').val()||0) != 0) {
        var data = {};   //array
        data.ProductId = $('#ProductId0').val();
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        data.type = Type;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesTransGetandGets",
            data: data,
            success: function (result) {
                    SalesTransLoad(result);
            }
        });
    }
}

function SalesTransLoad(result) {
    DivHideShow(1);
    disable_datatable('tblsalestrans');

    var ProdRow = "<thead><tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";

    var Qty = 0;
    for (var n = 0; n < result.length; n++) {

        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "</td>" +
                       "<td style='' class='text-left'>" + result[n].CustName + "</td>" +
                       "<td style='' class='text-right'>" + result[n].ProdQty + "</td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left' style=''>" + result[n].SalesMan + " </td>" +
                       "<td class='text-left'>" + result[n].DepartmentName + "</td>" +
                        "</tr>";
        
        Qty = Qty + parseInt(result[n].ProdQty || 0);
    }
    $('#tblsalestrans').html(ProdRow + "</tbody>");

    $("#totalnosales").text(result.length);
    $("#totalnosalesqty").text(Qty);

    datatableWithsearch('tblsalestrans', 'MultipleSalesT');
}

function AllTransaction() {
   
    if (($('#ProductId0').val() || 0) != 0) {
        DivHideShow(2);

        var Type = 0;
        if ($('#select_status_PREV').prop("checked"))
            var Type = 1;

        var data = {};
        data.ItemId = $('#ProductId0').val();
        data.UserId = ERPUserId;
        data.DepartmentId = ERPDeptId;
        data.Type = Type;
        $.ajax({
            type: "POST",
            url: "../Purchase/TransactionSearch",
            data: data,
            success: function (result) {
                if (result.length > 0) {
                 
                    disable_datatable('tblalltrans');

                    var BalQty = parseInt(result[0].OpeningQty);

                    var responseText = "<thead><tr><th>Bill#</th><th>Date</th><th>Type</th><th>Supplier</th><th>Status</th><th>Account</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th></tr>" +
                                  "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Supplier</th><th>Status</th><th>Account</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th></tr></thead><tbody>";


                    for (var n = 0; n < result.length; n++) {

                        if (result[n].Status == 'IN') {
                            BalQty += parseInt(result[n].Quantity)
                        }
                        else {
                            BalQty = BalQty - parseInt(result[n].Quantity)
                        }

                        responseText += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td >" + result[n].BillNo + "  </td>" +
                       "<td > " + result[n].InvoDate + "</td>" +
                       "<td  class='text-center'>" + result[n].TransType + " </td>" +
                       "<td >" + result[n].Salesman + " </td>" +
                       "<td >" + result[n].Status + "  </td>" +
                       "<td >" + result[n].AccountName + " </td>" +
                       //"<td >" + result[n].Remarks + "  </td>" +
                       "<td class='text-center'>" + result[n].Quantity + " </td>" +
                       "<td class='text-center'>" + BalQty + "  </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                       "<td >" + result[n].Locnname + " </td>" +
                       "<td >" + result[n].DeptName + "  </td>" +
                       //"<td >" + result[n].JobCode + " </td>" +
                       "</tr>";

                    }

                    $('#tblalltrans').html(responseText + '</tbody>');
                    datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                }
                else {

                    disable_datatable('tblalltrans');
                    var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                                 "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";
                    $('#tblalltrans').html(responseText + '</tbody>');
                    datatableWithsearch('tblalltrans', 'Single');

                }
            }

        });
    }
}
//--------------------------End Transaction


//--------------------------AutoComplete
function LoadAutoComplete() {

   

    $("#HPatient").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            $("#PrescriptionInfoPopUp").fadeOut("slow");
            $('#btnprec').hide();

            $('.Ptdtls').val('');
            IPPAtiemtSelect(0);
            IPPAtiemtSelect(0);
            var data = {};
            data.PatientName = $("#HPatient").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_IPorPatientSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        const MR = (item.Add1).split("##");
                        return ({
                            ColCount: '3RRR',
                            label1: item.OPSerName + ' - ' + item.OPNumber,
                            label: item.PatientName,
                            label2: item.AadharNo,            //IP NUMBER
                            label3: MR[0],
                            label4: MR[3],
                            PatientId: item.PatientId,
                            DOB: item.DOB,
                            Contact: item.Contact,
                            OPNumber: item.OPNumber,
                            PatientName: item.PatientName,
                            IpNo: item.AadharNo,
                            IPYear: item.Status,
                            OPSerId: item.OPSerId,
                            address: item.Add1,
                            headers: ["RegNo", "Patient", "IP No", "Address", "Mobile"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#IPNumber').val(parseInt(ui.item.IpNo || 0));
            $('#HRegNowithseries').val(ui.item.label1);            
            $('#custaddress1').val(ui.item.address)
            GetRevisitMedicines(ui.item.OPSerId, ui.item.OPNumber,0);
            
            var data = {};                                       //dropdownbind
            data.PatientId = ui.item.PatientId;
            data.DeptId = ERPDeptId;
            $.ajax({
                type: "POST",
                url: "../Revisit/HMS_LAstRevisitGetsOP",
                data: data,
                success: function (result) {
                    if (result.oList.length > 0) {
                            $('#HRegNo').val(result.oList[0].OPNumber);
                            $('#HRegSeries').val(result.oList[0].OPSerId);
                            $('#HOpNo').val(result.oList[0].RevisitId);
                            $('#HDoctor').val(result.oList[0].DoctorId);
                            $('#HPatientId').val(result.oList[0].PatientId);
                           // $('#IPNumber').val((result.oList[0].OPSerName || 0));
                       
                            $('#SendSMS').val(result.oList[0].SendSMS);
                            $('#SpecialFees').val(result.oList[0].SpecialFees);

                            $('#HGender').val(result.oList[0].Gender);
                            GetPatientAge(result.oList[0].DOB);
                            Gettestadviceget(result.oList[0].OPNumber, result.oList[0].OPSerId, result.oList[0].RevisitId);
                            ChangeFee(result.oList[0].PatientId, result.oList[0].DoctorId, result.oList[0].RevisitId)
                        if ($('#IPNumber').val() != 0) {
                            if (AutoIPPaytype = 'CREDIT') {
                                $('#PayType').val(2);
                                warningshow('Pay type Credit Selected', '');
                            }
                        }
                        else {
                            $('#PayType').val(1);
                        }

                        IPPAtiemtSelect(0);
                        CreditBillGets();
                       
                    }
                }
            });
           
            $('#Product0').focus();
            
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#HRegNo').val() == '') && (($('#HRegSeries').val() || 0) != 0))) { 
            $('#Product0').focus();
          
        }
    });

    LoadProduct(0);
    LoadBatch(0);
  
}



function ChangeFee(Pid, DocId,RevId) {
    var data = {};
    data.DoctorId = DocId;
    data.PatientId = Pid;
    data.RevisitId = RevId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_DoctorFeegetsfromrevisit",
        data: data,
        success: function (result) {           
            DDCONFEE = parseFloat(result.oList[0].ConsultFees || 0).toFixed(Decimal)
            if (DDCONFEE != 0) {
                $('#ProcQty0').val(1);
                $('#ProcFee0').val(DDCONFEE);
                $('#Procedure0').val('.CONSULTING FEE')
                $('#ProcedureId0').val(9);
                ProcedureAmountCalc(0)
                //PopUpShow(3)
                AddProcedureConfrm(0);

            }
            else {
                ClearFields(5, 0),
                $('.PRCRow').remove(),
                ProcCount = 1;
                ProcedureGrandTotalCalc(1)
                defaultprocedure()
            }
           
        }
    });
   // PopUpClose(5)
}

   

function ShowcasualityPrescription() {
    
    $('#casualityInfoPopUp').hide();
    var data = {};
    data.OpNo = $('#HOpNo').val();;
    data.RegNo = $('#HRegNo').val();
    data.RegSeries = $('#HRegSeries').val();;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_CasualityAdviceGets",
        data: data,
        success: function (result) {
            debugger;
            console.log(result.oList)
            if (result.oList.length > 0) {

                for (var i = 0; i <= result.oList.length; i++) {
                    $('#Procedure0').val(result.oList[i].TestName)
                    $('#ProcedureId0').val(result.oList[i].TestId);
                    $('#ProcQty0').val(1);
                    $('#ProcFee0').val(result.oList[i].PRate);
                    ProcedureAmountCalc(0);
                    AddProcedureConfrm(0)
                }
               
            }
        }
    });
}

function Gettestadviceget(OPNumber, OPSerId, RevisitId) {
    debugger;
    $('#casualityInfoPopUp').hide();
    var data = {};
    data.OpNo = RevisitId;
    data.RegNo = OPNumber;
    data.RegSeries = OPSerId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_CasualityAdviceGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $('#casualityInfoPopUp').show();
            }
        }
    });
}

function LoadProduct(Id)
{
    $("#Product" + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            ClearFields(1, Id);
            if (($('#HLocation').val() || 0) == 0) {
                warningshow('Please Select Location', 'HLocation');
                $("#Product"+ Id).val('');
                return false;
            }
            else {
            var data = {};
            data.ItemCode = $("#Product" + Id).val();
            data.SlNumber = $('#HLocation').val();
            data.DeptId = ERPDeptId;
            data.UserId = ERPUserId;
            $.ajax({
                url: '../Pharmacy/HMS_PurchaseProductSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '4PurchasePros',
                            label: item.Description,
                            label1: item.ItemCode,
                            label2: item.Model1,
                            label3: item.Group,
                            label4: item.Category,
                            ProductId: item.ItemId,
                            headers: ["Name", "Code","Stock", "Company", "Type"]
                        })
                    }));
                }

            })
            }
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#ProductId' + Id).val(ui.item.ProductId);
            // $('#ProductDesc' + Id).val(ui.item.ProductDesc);
            // $('#Quantity' + Id).val(1);    
            $('#ProductDesc' + Id).focus();
            GetProdDetails(ui.item.ProductId, ERPDeptId);
        },
    })
    .on('autocompleteselect  autocompletefocus', function (ev, ui) {
        GetProdDetails(ui.item.ProductId, ERPDeptId);
    }).on('keydown', function (e) {
        if (Id == 0 && e.which == 40 && ($('#Product' + Id).val() == '')) {
            var Idf = 0;

            try {
                Idf = parseInt($('#TblSalesInvoice tr:first').attr('id').match(/\d+/)[0]);
            }
            catch (err) {

            }
            if (Idf != 0) {
                $('#Product' + Idf).focus().select();
            }
        }
        else if (Id != 0 && e.which == 13 && ($('#ProductId' + Id).val() > 0)) {
            $('#Quantity' + Id).focus().select();
        }
    });
}

function LoadBatch(Id) {
    ItemIdArray = []; QtyFlg = 0;
    $("#ProductDesc" + Id).autocomplete({ 
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            ClearFields(2, Id);
            ItemIdArray = [];
            for (var k = 1; k <= RowCount; k++) {
                if ($("#ProductDesc" + k).length != 0)
                { ItemIdArray.push(parseInt($.trim($("#BatchSlNo" + k).val()||0))); }
            }
            if (($('#ProductId'+Id).val() || 0) == 0) {
                //warningshow('Please Select Product', 'ProductId' + Id);
                //$("#ProductDesc"+Id).val('');
                return false;
            }
            else {
                var data = {};
                data.ProductId = $("#ProductId" + Id).val();
                data.HLocation = $("#HLocation").val();
                data.Batch = '';
                data.Type = 1;
                data.DeptId = ERPDeptId;
                data.UserId = ERPUserId;
                data.Flag = 0;
                $.ajax({
                    url: '../Hospital/HMS_BatchwiseItemDetailsGets',
                    type: "POST",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        if (data.length) {
                            response($.map(data, function (item) {
                                return ({
                                    //ColCount: '4',                                                                      
                                    //label: item.Batch,                                                                                        
                                    //label1: item.ProductDesc,
                                    //label2: item.Company,
                                    //label3: item.ItemExpiry,
                                    ColCount: '7',
                                    label: item.Batch,
                                    label1: item.ProductDesc,
                                    label2: item.Company,
                                    label3: item.ItemExpiry,
                                    label4: item.Stock,
                                    label5: item.Sellingrate,
                                    label6: item.Mrp,
                                    Company: item.Companycode,
                                    Expiry: item.ItemExpiry,
                                    SellPrice: item.Sellingrate,
                                    PurPrice: item.Purrate,
                                    BatchSlNo: item.BatchSlNo,
                                    Taxpers: item.Taxpers,
                                    Drugschedule: item.Drugschedule,
                                    Cess: item.Cess,
                                    Mrp: item.Mrp,
                                    HSN: item.Variable3,
                                    TotQty:item.Stock,
                                    headers: ["Batch", "Description", "Company", "ItemExpiry", "Stock", "Selling Price", "Mrp"]
                                })
                            }));
                            QtyFlg = 0;
                        }
                        else {   
                           // $("#ProductDesc" + Id).val('');
                            warningshow('No Stock Available!', 'Product' + Id);
                            QtyFlg = 1;
                        }
                    }
                })
            }
        },
        autoFocus: true,
        select: function (event, ui) {
           
            var D1 = (('28/' + ui.item.Expiry).split("/"));
            var D2 = ($('#HSalesDate').val().split("/"));
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const firstDate = new Date(D1[2], D1[1], D1[0]);
            const secondDate = new Date(D2[2], D2[1], D2[0]);
            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

           if (ItemIdArray.includes(ui.item.BatchSlNo)==true)
           {
            warningshow('Batch Already Added', "ProductDesc" + Id);
           }

           else if (diffDays<=0) {
                warningshow('Item Expired ! Billing Not Possible', "ProductDesc" + Id);
           }
           //else if (diffDays <= 90) {
           //    warningshow('Near Expiry', "ProductDesc" + Id);
           //}


           else
           {
              if (ui.item.TotQty > 0)
            {
                $('#StockQty' + Id).val(ui.item.TotQty);
                $('#Company' + Id).val(ui.item.Company);
                $('#Expiry' + Id).val(ui.item.Expiry);
                $('#SellPrice' + Id).val(ui.item.SellPrice);
                $('#PHSNCode' + Id).val(ui.item.HSN);
                $('#BatchSlNo' + Id).val(ui.item.BatchSlNo);
                $('#Quantity' + Id).val(1).focus().select();
                if (IPPAtiemtSelect(1) == false) {
                    $('#Tax' + Id).val(ui.item.Taxpers);
                    TaxChange(Id);
                }
                else {
                    IPPAtiemtSelect(0);
                }
                $('#PurPrice' + Id).val(ui.item.Mrp);
                $('#DrugSchedule' + Id).val(ui.item.Drugschedule);
                $("#Cess" + Id).val(ui.item.Cess);
                  QtyFlg = 0;

                

                  
                  $('#expdayse').text('Exp with in  '+diffDays +' days');


            }
            else
            {
                //$('#ProductDesc' + Id).val('');
                  warningshow('Not Enought stock! Current Stock is ' + (ui.item.TotQty), 'ProductDesc' + Id);
                  QtyFlg = 1;
            }
           }
        },
    })
    .on('autocompleteselect  autocompletefocus', function (ev, ui) {
    }).bind('focus', function () {       
        $(this).keydown();
    });
}

function SerachSalesBill()
{
    $("#HBillNoCopy").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            copyrefresh(2);
            var data = {};
            data.BillSlNo = $("#HBillNoCopy").val();
            data.BillSeriesId = $("#HBillSeries").val();
            data.LocId = $("#HDoctor").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../SalesInvoice/SerialNoSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '3',
                            label: item.BillSlNo,
                            label1: item.CustName,
                            label2: item.InvDate,
                            billsl: item.BillSlNo,
                            billseries: item.BillSeriesId,
                            DeptId:item.DeptId,
                            headers: ["Bill No", "Customer Name", "Inv Date"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            SalesGetCall(ui.item.billseries, ui.item.billsl, ui.item.DeptId, 0);
        },
    });
}

function ProcedureSearch(Id)
{
    $('#Procedure' + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#ProcedureId' + Id).val('');
            $('#ProcFee' + Id).val('');
            var data = {};
            data.ProcedureName = $('#Procedure' + Id).val();
            data.ProcedureId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_ProcedureSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'TWOEnq',
                            label: item.ProcedureCode,
                            label1: item.ProcedureName,
                            ProcedureId: item.ProcedureId,
                            Rate: item.Procedurecharge,
                            ProcedureName:item.ProcedureName,
                            headers: ["Procedure Code", "Procedure Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#ProcedureId' + Id).val(ui.item.ProcedureId);
            $('#ProcQty' + Id).val(1).focus().select();
            $('#ProcFee' + Id).val(parseFloat(ui.item.Rate).toFixed(Decimal));
            ProcedureAmountCalc(Id);            
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#ProcQty' + Id).val() || 0) != 0)) {
            $('#ProcQty' + Id).focus().select();
        }
    });
}
//--------------------------End AutoComplete


//--------------------------Save
function SaveAndUpdateConfirm(flg) {
    if ($.trim($('#HBillNo').val()) == '') {
        warningshow('Please Enter the BillNo', 'HBillNo');
    }
    else if (($('#HDoctor').val() || 0) == 0) {
        warningshow('Please Select Doctor', 'HDoctor');
    }
    else if ($.trim($('#HPatient').val()) == '') {
        warningshow('Please Select Patient', 'HPatient');
    }
    else if ((($('#HPatientId').val() || 0) == 0) && (($('#PayType').val()||0) == 2)) {
        warningshow('Please Select a valid Patient', 'HPatient');
    }
    else if (($('#HLocation').val() || 0) == 0) {
        warningshow('Please Select a valid HLocation', 'HLocation');
    }
    else if (($('#HLocation').val() || 0) == 0) {
        warningshow('Please Select a valid HLocation', 'HLocation');
    }
    else if ($('.SlRow').length == 0) { // && parseFloat( $('#Dconffee').val()+$('#DNebfee').val()+ $('#DDressfee').val()+$('#DvacFee').val()||0)> 0 
        warningshow('Please Enter the Medicines', 'Product0');
    }
    else if (parseFloat($('#BaseTextTotal').text() || 0) <= 0) {
        warningshow('Total amount must be greater than 0', 'Product0');
    }
    else if ((SpecialFeeFlag == 1) && ($('#SpecialFees').val() == 'YES') && (($('#SpecialFeeAmt').val() || 0) == 0))
    {
        SPFeePopup(0);
        warningshow('Please Enter Special Fees', 'SpecialFeeAmt');
    }

    else if ($.trim($('#Dconffee').val()) == '') {
        warningshow('Please Enter Consultation Fee', 'Dconffee');
    }

    else if ($.trim($('#DNebfee').val()) == '') {
        warningshow('Please Enter Neb Fee', 'DNebfee');
    }
    else if ($.trim($('#DDressfee').val()) == '') {
        warningshow('Please Enter Dress Fee', 'DDressfee');
    }
    else if ($.trim($('#DvacFee').val()) == '') {
        warningshow('Please Enter Vacc Fee', 'DvacFee');
    }
    else {
        if (flg == 1)
        {  Callconfirm('Do you want to Save?', 'SaveBill', 0);}
        else if (flg == 2)
        { Callconfirm('Do you want to Update?', 'UpdateBill', 0); }
    }
}

function SaveAndUpdate(flg) {
    if (flg == 1) { $('#btnsubmit').prop('disabled', true); }
    else if (flg == 2) { $('#btnsaveedit').prop('disabled', true); }

    var BDFlag = 0; if ($("#DiscFromGrandTotal").prop("checked") == true) { BDFlag = 1; }
    var CessFlag = 0; if ($("#CessCheck").prop("checked") == true) { CessFlag = 1; }

    var oArray = new Array();
    var slno = 1;
    for (var i = 1; i <= RowCount; i++) {
        if ($('#Product' + i).val() != undefined) {

            oArray.push({
                'SalesMainId': parseInt(slno),
                'HBillSeries': $("#HBillSeries").val(),
                'HBillNo': $.trim($("#HBillNo").val()),
                'HPatient': $('#HPatientId').val(),
                'PayType': parseInt($("#PayType").val() || 0),
                'PRType': $("#PRType").val(),
                'HSalesDate': $("#HSalesDate").val(),
                'CurrencyId': 1,
                'CurrencyRate': $("#Discount" + i).val(),      //Discount
                'HLocation': $("#HLocation" + i).val() || 0,
                'HDoctor': $("#HDoctor").val() || 0,
                'Discount': parseFloat($("#Discount").val() || 0),
                'Discountpercent': $("#Discountpercent").val(),
                'TotalTaxable': $("#TotalTaxable").val(),
                'TotlaTax': $("#TotlaTax").val(),
                'BaseTextTotal': $("#BaseTextTotal").text(),
                'BCGST_0': parseFloat(Number($("#splittax_0").val() || 0)).toFixed(Decimal),
                'BCGST_5': parseFloat(Number($("#splittax_5").val() || 0)).toFixed(Decimal),
                'BCGST_12': parseFloat(Number($("#splittax_12").val() || 0)).toFixed(Decimal),
                'BCGST_18': parseFloat(Number($("#splittax_18").val() || 0)).toFixed(Decimal),
                'BCGST_28': parseFloat(Number($("#splittax_28").val() || 0)).toFixed(Decimal),
                'BCess': parseFloat($("#TotalCess").val() || 0),
                'RoundOff': $('#TotRoundOff').val() || 0,
                'BDFlag': BDFlag,
                'CessFlag': CessFlag,
                'Remarks': $("#Remarks").val() + '##' + $("#custaddress1").val() ,
                'SubId': 0,
                'ProductId': $("#ProductId" + i).val(),
                'ProductDesc': $("#Product" + i).val(),
                'BatchSlNo': $("#BatchSlNo" + i).val(),
                'Batch': $("#ProductDesc" + i).val(),
                'Company': $("#Company" + i).val(),
                'Expiry': $("#Expiry" + i).val(),
                'Quantity': $("#Quantity" + i).val(),
                'Free': $("#Free" + i).val()||0,
                'Pack': 0,
                'Loose': 0,
                'SellPrice': $("#SellPrice" + i).val(),
                'PurPrice': $("#PurPrice" + i).val(),
                'Tax': parseFloat($("#Tax" + i).val() || 0),
                'TaxPercent': parseFloat($("#Tax" + i).find("option:selected").attr("name") || 0),
                'TaxableAmt': parseFloat($("#TaxableAmt" + i).val() || 0),
                'TaxAmt': parseFloat($("#TaxAmt" + i).val() || 0),
                'Cess': parseFloat($("#Cess" + i).val() || 0),
                'CessAmount': parseFloat($("#CessAmount" + i).val() || 0),
                'Amount': $("#Amount" + i).val(),
                'DrugSchedule': parseFloat($("#DrugSchedule" + i).val() || 0),
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'Status': $.trim($('#HPatient').val()),
                'Terms': 0,
                'LPO_No': ($('#HOpNo').val()||0),
                /*anu*/
                'JobNo': parseInt($('#UPISpecialFeeAmt').val() || 0),
                /*anu*/
                'Area': parseInt($('#BAmount').val() || 0),
                'Flag': ($('#IPNumber').val() || 0),
                'Variable1': parseFloat(Number($("#splittaxable_0").val() || 0)).toFixed(Decimal),
                'Variable2': parseFloat(Number($("#splittaxable_5").val() || 0)).toFixed(Decimal),
                'Variable3': parseFloat(Number($("#splittaxable_12").val() || 0)).toFixed(Decimal),
                'Variable4': parseFloat(Number($("#splittaxable_18").val() || 0)).toFixed(Decimal),
                'Variable5': parseFloat(Number($("#splittaxable_28").val() || 0)).toFixed(Decimal),
                'SpecialFeeAmt': ($('#SpecialFeeAmt').val() || 0),
            });
            slno++;
        }
    }

    for (var i = 1; i <= ProcCount; i++) {
        if ($('#Procedure' + i).val() != undefined) {
            oArray.push({
                'SalesMainId': parseInt(slno),
                'HBillSeries': $("#HBillSeries").val(),
                'HBillNo': $.trim($("#HBillNo").val()),
                'HPatient': $('#HPatientId').val(),
                'PayType': parseInt($("#PayType").val() || 0),
                'PRType': $("#PRType").val(),
                'HSalesDate': $("#HSalesDate").val(),
                'CurrencyId': 1,
                'CurrencyRate': 1,
                'HLocation': $("#HLocation" + i).val() || 0,
                'HDoctor': $("#HDoctor").val() || 0,
                'Discount': 0,
                'Discountpercent': 0,
                'TotalTaxable': 0,
                'TotlaTax': 0,
                'BaseTextTotal': $("#ProcAmount").val(),
                'BCGST_0': parseFloat(Number($("#splittax_0").val() || 0)).toFixed(Decimal),
                'BCGST_5': parseFloat(Number($("#splittax_5").val() || 0)).toFixed(Decimal),
                'BCGST_12': parseFloat(Number($("#splittax_12").val() || 0)).toFixed(Decimal),
                'BCGST_18': parseFloat(Number($("#splittax_18").val() || 0)).toFixed(Decimal),
                'BCGST_28': parseFloat(Number($("#splittax_28").val() || 0)).toFixed(Decimal),
                'BCess': parseFloat($("#TotalCess").val() || 0),
                'RoundOff': $('#TotRoundOff').val()||0,
                'BDFlag': BDFlag,
                'CessFlag': CessFlag,
                'Remarks': $("#Remarks").val(),
                'SubId': 0,
                'ProductId': 0,
                'ProductDesc': $("#Procedure" + i).val(),
                'BatchSlNo': $("#ProcedureId" + i).val(),
                'Batch': '',
                'Company': '',
                'Expiry': '',
                'Quantity': $("#ProcQty" + i).val(),
                'Free': 0,
                'Pack': 0,
                'Loose': 0,
                'SellPrice': $("#ProcFee" + i).val(),
                'PurPrice': 0,
                'Tax': parseFloat($("#ProcTax" + i).val() || 0),
                'TaxPercent': parseFloat($("#ProcTax" + i).find("option:selected").attr("name") || 0),
                'TaxableAmt': parseFloat($("#ProcTaxable" + i).val() || 0),
                'TaxAmt': parseFloat($("#ProcTaxamt" + i).val() || 0),
                'Cess': 0,
                'CessAmount': 0,
                'Amount': $("#ProcTot" + i).val(),
                'DrugSchedule': 0,
                'DelFlag': 1,
                'UserId': ERPUserId,
                'DeptId': ERPDeptId,
                'Status': $.trim($('#HPatient').val()),
                'Terms': 0,
                'LPO_No': ($('#HOpNo').val() || 0),
                /*anu*/
                'JobNo': parseInt($('#UPISpecialFeeAmt').val() || 0),
                /*anu*/
                'Area': parseInt($('#BAmount').val() || 0),
                'Flag': ($('#IPNumber').val() || 0),
                'Variable1': parseFloat(Number($("#splittaxable_0").val() || 0)).toFixed(Decimal),
                'Variable2': parseFloat(Number($("#splittaxable_5").val() || 0)).toFixed(Decimal),
                'Variable3': parseFloat(Number($("#splittaxable_12").val() || 0)).toFixed(Decimal),
                'Variable4': parseFloat(Number($("#splittaxable_18").val() || 0)).toFixed(Decimal),
                'Variable5': parseFloat(Number($("#splittaxable_28").val() || 0)).toFixed(Decimal),
                'SpecialFeeAmt': ($('#SpecialFeeAmt').val() || 0),
            });
            slno++;
        }
    }


    //console.log(oArray);
    if (oArray != "") {

        if (flg == 1) {
            var data = { 'SaleInvoiceHospital': oArray };
            $.ajax({
                type: "POST",
                url: "../Hospital/HMS_SalesInvoiceInsert",
                data: data,
                success: function (result) {
                    $('#btnsubmit').prop('disabled', false);
                    if (result.oList.length > 0) {
                        $('#HBillNoSave').val(result.oList[0].HBillNo);
                        if (result.oList[0].Status == 10)
                        {
                            NotEnoughtQty(result.oList);
                        }
                        else
                        {
                            BillTime = $('#RevisitTime').text();
                            Billuser = $('#UserDetsss').text();
                            $('#HBillNo').val(result.oList[0].HBillNo)
                            Showalerts(result.oList[0].Status, result.oList[0].HBillNo);
                        }
                    }
                }
            })
        }
        else if (flg == 2)                                            //Update  
        {
            var data = { 'SaleInvoiceHospital': oArray };
            $.ajax({
                type: "POST",
                url: "../Hospital/HMS_SalesInvoiceUpdte",
                data: data,
                success: function (result) {
                    $('#btnsaveedit').prop('disabled', false);
                    if (result.oList.length > 0) {
                        $('#HBillNoSave').val(result.oList[0].HBillNo);
                        if (result.oList[0].Status == 10) {
                            NotEnoughtQty(result.oList);
                        }
                        else {
                            Showalerts(result.oList[0].Status, result.oList[0].HBillNo);
                        }
                    }
                }
            })
        }
    }
}

function NotEnoughtQty(result)
{
    $('.NwRws').remove();

    for (var j = 0; j < result.length;j++)
    {
        var TbRow = ' <tr class="NwRws">' +
           '     <td>' + result[j].ProductDesc + '</td>' +
           '     <td>' + result[j].Batch + '</td>' +
           '     <td>' + result[j].HLocationName + '</td>' +
           '     <td>' + result[j].Quantity + '</td>' +
           ' </tr>';

        $('#QtyCheckTable').append(TbRow);
    }
    
    $('#QtyModal').modal('show');
    $('#QtyModal').appendTo('body');

}

function SPFeePopup(flg)
{
    if (flg == 0)
    {
        //if (($('#SpecialFeeDiv').val() || 0) == 0) {
        //$('#TAmount,#SpecialFeeAmt,#GAmount,#BAmount').val('');
        //    $('#TAmount').val($('#BaseTextTotalProc').text());
        //}
        $('#TAmount').val($('#BaseTextTotalProc').text());
        SpceialAmountCalc();
        $('#SpecialFeeDiv').modal('show');
        $('#SpecialFeeDiv').appendTo('body');
    }
    else if (flg == 1)
    {
        $('#SpecialFeeDiv').modal('hide');
    }
}
//--------------------------End Save

//--------------------------COPY
function GetRows(flg) {
  
    if (Editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (Copyflag == 0) {
        if ($('.SlRow').length > 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            if (flg == 0)
            { $('#Confirmflag').val('copy'); }
            else if (flg == 1)
            { $('#Confirmflag').val('view'); }
            $('#ConfirmRowId').val(flg);
            $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        }
        else {
            BillCopy(flg);
        }
    }
    else {
        BillCopy(flg);
    }
}

function BillCopy(flg)      //flg:0 - Copy ,flg :1-View  
{
    Copyflag = 1;
    copyrefresh(0);

    if (flg == 1) {
        $("#myModal").modal("show");
        $("#myModal").appendTo("body");

        window.setTimeout(function () {
            $("#select_dept").focus();
        }, 200);

        CallViewList();
    }
}

function CallViewList() {
    var data = {};
    data.FromDate = $('#DateFrom').val();
    data.ToDate = $('#DateTo').val();
    data.DeptId = $('#select_dept').val();
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/SalesInvoiceGetList',
        data: data,
        success: function (result) {

            disable_datatable('tblViewList');
            $('#tblViewList tr').remove();

            var ProdRow = "<thead><tr><th style='width:3%'></th><th class='text-left' style='width:5%' >SalesInvoice</th><th style='width:5%' class='text-center'>Department</th><th style='width:5%' class='text-center'>Date</th><th style='width:15%'>Patient</th><th style='width:25%'>Address</th><th style='width:5%'>PayType</th><th style='width:10%'>User</th><th style='width:5%'>Location</th><th  style='width:5%'  class='text-right' >GrandTotal</th></tr>" +
                          "<tr><th style='width:3%'> </th><th class='text-left' style='width:5%'>SalesInvoice</th><th style='width:5%' class='text-center'> Department</th><th class='text-center' style='width:5%'>Date</th><th style='width:15%'>Patient</th><th style='width:25%'>Address</th><th style='width:5%'>PayType</th><th style='width:10%'>User</th><th style='width:5%'>Location</th><th  style='width:5%'  class='text-right'>GrandTotal</th></tr></thead><tbody>";

            if (result.length != 0) {

                for (var n = 0; n < result.length; n++) {

                    ProdRow += "<tr class='jsgrid-row' ondblclick='SalesGetCall(" + result[n].BillSeriesId + "," + result[n].BillSlNo + "," + result[n].DeptId + ",1)'>" +
                        //  "<td style='width:3%' class='text-center'>" +
                        //"<button class='btn white btn-round btn-xs' type='button' style='background-color:#FF9800;font-size:smaller;margin:0' onclick='SalesGetCall(" + result[n].BillSeriesId + "," + result[n].BillSlNo + "," + result[n].DeptId + ",1)' data-toggle='tooltip' data-placement='top' data-original-title=Print><i class='ft-printer'></i></button>" +
                        //"</td>" +
                        "<td style='width:3%' class='text-center'>" +
                        "<button class='btn  white btn-round btn-xs' type='button' style='background-color:black;font-size:smaller;margin:0' onclick='SalesGetCall(" + result[n].BillSeriesId + "," + result[n].BillSlNo + "," + result[n].DeptId + ",1)' data-toggle='tooltip' data-placement='top' data-original-title=Preview> <i class=ft-eye></i></button>" +
                        "</td>" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                        "<td class='text-center'>" + result[n].DepartmentName + " </td>" +
                       "<td class='text-center'>" + result[n].InvDate + "                                   </td>" +
                       "<td  class='text-left'>" + result[n].CustName + "                                   </td>" +
                       "<td  class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td class='text-left'>" + result[n].checkflag + "                                   </td>" +
                       "<td class='text-left'>" + result[n].UserName + "                                   </td>" +
                       "<td class='text-left'>" + result[n].Location + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].FCGrandTotal || 0).toFixed(Decimal) + " </td>" +
                        "</tr>";
                }
                $('#tblViewList').html(ProdRow + '</tbody>');
                datatableWithsearch('tblViewList', 'Multiple');
                $('#tblViewList').scrollTop(0);

            }
            else {
                $('#tblViewList').html(ProdRow + '</tbody>');
                datatableWithsearch('tblViewList', 'Multiple');
            }
        }
    });
}

//Clear All Values Before Copy Function
function copyrefresh(flg) {                                //flg:0 - Copy ,flg :1-View  ,flg:2 -New bill copy   ,flg:3 -Edit btn click
    if (flg == 3) {
        $('#BillNo').val($('#BillNoCopy').val());
        $('#saleinv,#btnsaveedit,#BtnClearproc').show();
        $('#Copysales,#btnprint,#btnedit,#btndelete,#btnsubmit,#btnview,#btnlist,#btnacctran,#btnprec').hide();
        $('.rdonl').attr('readonly', true).css('background-color', 'white');
        $('.dedisa.proccls,.dedisa.proccls0').addClass('bgclrwhite ');
        $('#HBillSeries').prop('disabled', true).addClass('bgclrwhite ');
        $('.form-control:not(.disb,.dedisa),#BillDate,#btnadd').prop('disabled', false);
        $('select:not(.disb)').prop('disabled', false);
        $('.jsgrid-cell> input,.jsgrid-cell >select').css('background-color', '');
        IPPAtiemtSelect(0);
        Defaultfocus();
        $('#HLocation').prop('disabled', true);
    }
    else  {
        $('#saleinv,.btn:not(.avdbtn),#btnedit,#btndelete').hide();
        $('.SlRow').remove();
        $('.PRCRow').remove();
        ProcedureGrandTotalCalc(1);
        if (flg != 2)
        {
            $('.form-control:not(.disb),#btnadd').prop('disabled', true);
            $('.form-control').css('background-color', '');
            $('.rdonl').removeClass('bgclrwhite');
            $('select:not(.disb)').prop('disabled', true);
            BillLoad();
            $('#HBillNoCopy').val($('#HBillNo').val());
        }
        $('#Copysales,#btnnew,#btnview,#btnadd,#btnsubmitsgo,#confirmCancel,#confirmOk').show();
        RowCount = 1; 
        $('.SlRow').remove();
        $('.form-control:not(select,.dedisa)').val('');
        $('select:not(.Avoidfld)').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
        $('#HLocation').val(UserLocationId);
        $('#HSalesDate').val(CurDate);

        ClearFields(3, 0);
        LoadDate();
        Defaultfocus();
        CalcGrandTotal(0);
        roundoffcalcn(0);
        PopUpClose(1);

        $('#btnotpcancel,#btnotpsave,#btnview').show();
        if (flg == 0)
            $('#HBillNoCopy').focus().select();
    }
    if (flg != 3)
    { $('#btnedit,#btndelete,#btnacctran,#btnprint,#btnprec').hide(); }
    CheckEOD();
}

function SalesGetCall(BillSeriesId, BillSlNo, DeptId, flg) {
    if (flg == 1) { PopUpClose(3); }
    var data = {};
    data.HBillNo = BillSeriesId;
    data.HBillSeries = BillSlNo;
    data.DeptId = DeptId;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_SalesGetandGets",
        data: data,
        success: function (result) {
            if (result.length > 0) {
                SalesGetandGets(result);
            }
            else {
                Showalerts(4, BillSlNo);
            }
        }
    });
}
var BillTime = ""
var Billuser=""
function SalesGetandGets(result)
{
    var data = {};                                       //dropdownbind
    data.PatientId = result[0].HPatient;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_LAstRevisitGetsOP",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {               
                $('#HGender').val(result.oList[0].Gender);
                $('#SendSMS').val(result.oList[0].SendSMS);
                $('#SpecialFees').val(result.oList[0].SpecialFees);
                GetPatientAge(result.oList[0].DOB);
            }
        }
    });

    var uname = (result[0].HPatientName).split("##")
    $('#HPatient').val(uname[0]);

    $('#billby').val(uname[1]);
    BillTime = uname[2];
    Billuser = uname[1];
    debugger;

    console.log(uname)

    $('#HRegNowithseries').val(uname[3]);
    


    $('#SalesMainId').val(result[0].SalesMainId);
    $('#HBillSeries').val(result[0].HBillSeries);
    $('#HBillNo').val(result[0].HBillNo);
    $('#HBillNoCopy').val(result[0].HBillNo).focus().select();
    
    $('#HPatientId').val(result[0].HPatient);
    $('#PayType').val(result[0].PayType);
    $('#PRType').val(result[0].PRType);
    $('#HSalesDate').val(result[0].HSalesDate);
    $('#CurrencyId').val(result[0].CurrencyId);
    $('#CurrencyRate').val(result[0].CurrencyRate);
    $('#HLocation').val(result[0].HLocation);
    $('#HDoctor').val(result[0].HDoctor);   
    $('#TotalTaxable').val(result[0].TotalTaxable);
    $('#TotlaTax').val(result[0].TotlaTax);
    $('#BaseTextTotal').text(result[0].BaseTextTotal);
    $('#TotalCess').val(result[0].BCess);


   

    var Qr=result[0].Remarks.split("##");
    $("#custaddress1").val(Qr[1] + '##' + Qr[2] + '##' + Qr[3] + '##' + Qr[4])
    $('#Remarks').val(Qr[0]);
    /*    anu */
    

/*    anu  */
    $('#HOpNo').val(result[0].LPO_No);
    $('#HRegNo').val(result[0].RegNo);
    $('#IPNumber').val(result[0].Variable1);
    $('#ProcAmount').val(parseFloat(result[0].Variable2).toFixed(Decimal));

   
    var gnTot = parseFloat(result[0].BaseTextTotal);
    var ProcTot = parseFloat(result[0].Variable2);
    var TotPAmt=gnTot+ProcTot;
    $('#BaseTextTotalProc').text(parseFloat(TotPAmt).toFixed(Decimal));  

    if (result[0].BDFlag == 1) { $("#DiscFromGrandTotal").prop("checked", true); }
    else { $("#DiscFromGrandTotal").prop("checked", false); }
    if (result[0].CessFlag == 1) { $("#CessCheck").prop("checked", true); }
    else { $("#CessCheck").prop("checked", false); }

    $('#TotRoundOff').val(result[0].RoundOff);
    if (result[0].RoundOff != 0) { $("#roundoffstatus").prop("checked", true); }
    else { $("#roundoffstatus").prop("checked", false); }

    for(var i=0;i<result.length;i++)
    {
        if(result[i].ProductId != 0)
        {
             if ($('.SlRow').length == 0) { RowCount = 1; }

            var Id = parseInt(RowCount); var SlNo = parseInt($('.SlRow').length) + 1;

            var BICOM = (result[i].Company).split("##")

        var ProdRow =
             '<tr class="jsgrid-header-row SlRow" id="SlRows' + Id + '" onfocusout=UpdateRow(0,' + Id + ') >' +
             '<td class="jsgrid-align-center crspnt" style="width:2%" onclick=DeleteRow(0,' + Id + ')><i class="icon-trash"></i></td>' +
             '<td class="jsgrid-align-center" style="width:3%" id="tdSl' + Id + '">' + SlNo + '</td>' +
             '<td class="jsgrid-align-left" style="width:13%"><input type="text" class="form-control smallTextbox brnone rdonl disb" id="Product' + Id + '" name="Product"  style="width:100%"  value="' + result[i].ProductDesc + '" onfocusout=UpdateRow(1,' + Id + ') readonly /></td>' +

            '<td class="jsgrid-align-left" style="width:5%"><input type="text"  class="form-control smallTextbox brnone rdonl disb" id="ProductDesc' + Id + '" name="ProductDesc"  style="width:100%"  value="' + result[i].Batch + '" onfocusout=UpdateRow(2,' + Id + ') readonly /></td>' +


            '<td class="jsgrid-align-center" style="width:5%"><input type="hidden"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Company' + Id + '"  style="width:100%"  value="' + BICOM[0] + '" readonly />' + BICOM[1] + '</td>' +

            '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Expiry' + Id + '"  style="width:100%"  value="' + result[i].Expiry + '" readonly /></td>' +
             '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Quantity" id="Quantity' + Id + '" onkeypress="isNumberInt(event, this)" onkeyup="ClearFields(4,0),AmountCalc(' + Id + ')"  style="width:100%"  value="' + result[i].Quantity + '" /></td>' +
             '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Free" id="Free' + Id + '"     onkeypress="isNumberInt(event, this)" style="width:100%"  value="' + result[i].Free + '" /></td>' +
             '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass rdonl disb" name="SellPrice" id="SellPrice' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),AmountCalc(' + Id + ')"   style="width:100%"  value="' + parseFloat(result[i].SellPrice || 0).toFixed(Decimal) + '" readonly /></td>' +
             '<td class="jsgrid-align-right" style="width:4%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="PurPrice' + Id + '"  style="width:100%"  value="' + parseFloat(result[i].PurPrice || 0).toFixed(Decimal) + '" readonly /></td>' +

            '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Amount' + Id + '"  style="width:100%"  value="' + parseFloat(result[i].Amount) + '" readonly /></td>' +

            '<td class="jsgrid-align-center" style="width:8%">' +

            
            '<div class="input-group m-0">' +
             '<input type="text"  class="form-control smallTextbox  Itemclass" name="Discount" id="DiscountPerc' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',0)"   style="width:50%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;"  value="' + (0).toFixed(Decimal) + '" />' +
             '<input type="text"  class="form-control smallTextbox  Itemclass" name="Discount" id="Discount' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',1)"   style="width:50%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;"  value="' + (result[i].ProdDisc).toFixed(Decimal) + '" />' +
             '</div>' +
            '</td>' +
             '<td class="jsgrid-align-center" style="width:6%"> <div class="input-group m-0"><select id="Tax' + Id + '" class="form-control smallTextbox Itemclass pl-0 IpTax" style="width:60%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;padding: 0;" onchange="TaxChange(' + Id + ')"> ' + TaxSelect + ' </select> <input type="text" id="TaxPercent' + Id + '" style="width:40%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;" class="form-control smallTextbox rdonl bgclrwhite Itemclass"  readonly> </div></td>' +
             '<td class="jsgrid-align-right" style="width:5%"> <input type="text" id="TaxableAmt' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone"  readonly value="' + parseFloat(result[i].TaxableAmt || 0).toFixed(Decimal) + '"></td>' +
             '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="TaxAmt' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone"  readonly value="' + parseFloat(result[i].TaxAmt || 0).toFixed(Decimal) + '"></td>' +
             '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="CessAmount' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone" onkeypress="isNumberInt(event, this)" readonly value="' + parseFloat(result[i].CessAmount || 0).toFixed(Decimal) + '"></td>' +
             '<td class="jsgrid-align-right" style="width:5%"><select id="DrugSchedule' + Id + '" class="form-control smallTextbox Itemclass brnone" name="DrugSchedule">' + DrugSchedule + '</select></td>' +
             '<td class="jsgrid-align-center" style="width:5%;display:none">' +
             '<input type="text" class="form-control" id="ProductId' + Id + '"  value="' + result[i].ProductId + '" />' +
             '<input type="text" class="form-control" id="BatchSlNo' + Id + '"  value="' + result[i].BatchSlNo + '" />' +
             '<input type="text" class="form-control" id="Cess' + Id + '"   value="' + result[i].Cess + '" />' +
             '<input type="text" class="form-control" id="PHSNCode' + Id + '"   value="' + result[i].Variable3 + '" />' +
             '<input type="text" class="form-control" id="HLocation' + Id + '"   value="' + result[i].HLocation + '" />' +
             '</td>' +
             '</tr>';
        $('#TblSalesInvoice').append(ProdRow);
        DiscPecentCalc(Id, 1);
        $('#Tax' + Id).val(result[i].Tax);
        TaxChange(Id);
        $('#DrugSchedule' + Id).val(result[i].Drugschedule);
        RowCount++;
        $('.brnone').css('border', 'none');
        $('.brnone').css('border-radius', '0px');
        CalcGrandTotal(1);
        roundoffcalcn(0);
        LoadProduct(Id);
        LoadBatch(Id);
        ItemFocus();
        $('.SlRow input,.SlRow select,.input-group select').prop('disabled', 'true');
        $('.rdonl').removeClass('bgclrwhite');
            $('#btnedit,#btndelete,#btnacctran,#btnprint,#btnprec').show();

         
            if (parseFloat(result[0].Variable2 || 0) == 0) {
                $('#btnedit,#btndelete').show();
            }
            else {
                $('#btnedit,#btndelete').hide();
            }
        }
       
    }
   
    for (var j = 0; j < result.length; j++)
    {
        if(result[j].ProductId == 0)
        {
            if ($('.PRCRow').length == 0) { ProcCount = 1; }
            var Slno = parseInt($('.PRCRow').length) + 1; var Id = parseInt(ProcCount);
            var ProcRow = '<tr id="PCRow' + Id + '" class="PRCRow" onfocusout=AddProcedureConfrm(' + Id + ')>' +
                        '<td class="text-center" onclick=DeleteRow(2,' + Id + ') style="padding-top: .5rem;cursor:pointer"><i class="icon-trash"></i> </td>' +
                        '<td class="text-center" id="PCslno' + Id + '" style="">' + Slno + '</td>' +
                        '<td class="text-center " > <input type="text" id="Procedure' + Id + '" class="form-control proccls atcmpl smallTextbox " value="' + result[j].ProductDesc + '" onfocus="ProcedureSearch(' + Id + ')"></td>' +
                        '<td class="text-center" >  <input type="text" id="ProcQty' + Id + '" class="form-control proccls smallTextbox " value="' + result[j].Quantity + '" onkeyup="ProcedureAmountCalc(' + Id + ')" onkeypress="isNumberInt(event, this)"> </td>' +
                        '<td class="text-center" ><input type="text" id="ProcFee' + Id + '" class="form-control proccls smallTextbox " value="' + parseFloat(result[j].SellPrice).toFixed(Decimal) + '" autocomplete="off" onkeyup="ProcedureAmountCalc(' + Id + ')" onkeypress="isNumber(event,this)"></td>' +
                        '<td class="text-center" >  <div class="input-group m-0">' +
                         '<select  id="ProcTax' + Id + '" class="form-control col-md-7 IpTax proctx smallTextbox " style="padding: 0;border:none;border-right: 1px solid lightgrey!important;" onchange="ProcedTaxChange(' + Id + '),ProcedureAmountCalc(' + Id + ')">' + TaxSelect + '</select>' +
                         '<input type="text" id="ProcTaxPerc' + Id + '" style="border-left: 1px solid lightgrey!important;border:none;" class="form-control dedisa proccls col-md-5 smallTextbox " name="Name" autocomplete="off" disabled>' +
                         '</div></td>' +
                        '<td class="text-center"><input type="text" id="ProcTot' + Id + '" class="form-control dedisa proccls smallTextbox " value="' + parseFloat(result[j].Amount).toFixed(Decimal) + '" autocomplete="off" disabled></td>' +
                         '<td style="display:none">' +
                         '<input type="text" id="ProcedureId' + Id + '" class="form-control proccls" value="' + result[j].BatchSlNo + '" autocomplete="off" disabled>' +
                         '<input type="text" id="ProcTaxable' + Id + '" class="form-control proccls" value="' + parseFloat(result[j].TaxableAmt).toFixed(Decimal) + '" autocomplete="off" disabled>' +
                         '<input type="text" id="ProcTaxamt' + Id + '" class="form-control proccls" value="' + parseFloat(result[j].TaxAmt).toFixed(Decimal) + '" autocomplete="off" disabled>' +
                         '</td>' +
                '</tr>';



            $('#TblProcedure').append(ProcRow);


            if (result[j].BatchSlNo == 1) { $('#Dconffee').val(parseFloat(result[j].Amount).toFixed(Decimal)) }
            if (result[j].BatchSlNo == 2) { $('#DNebfee').val(parseFloat(result[j].Amount).toFixed(Decimal)) }
            if (result[j].BatchSlNo == 3) { $('#DDressfee').val(parseFloat(result[j].Amount).toFixed(Decimal)) }
            if (result[j].BatchSlNo == 4) { $('#DvacFee').val(parseFloat(result[j].Amount).toFixed(Decimal)) }

            $('#ProcTax' + Id).val(result[j].Tax).prop('disabled', true);
            $('.proccls').css('border', 'none').prop('disabled', true);
            $('.dedisa.proccls0').removeClass('bgclrwhite');
            ProcedTaxChange(Id);
            ProcCount++;
            ProcedureGrandTotalCalc(1);
        }
    }
    $('#Discount').val(result[0].Discount);
    $('#Discountpercent').val(result[0].Discountpercent);
    CalcDiscountSplitTax();
    roundoffcalcn(0);

    $('#UPISpecialFeeAmt').val(result[0].JobNo);
    $('#BAmount').val(result[0].Area);
    $('#SpecialFeeAmt').val(parseFloat(result[0].SpecialFeeAmt).toFixed(Decimal))
    mrpsellingratecalculation()
    
}

//----- Edit and Delete

//Check Edit or Delete 
function CheckEditandDeleteBill(Flag)              //Flag=0: Edit and Update   ,Flag=1:Delete    
{
    if ($.trim($('#txtotp').val()) == '') {
        warningshow('Enter OTP', 'txtotp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0) { Operation = 'Lab Bill Update'; }
        else if (Flag == 1) { Operation = 'Lab Bill Delete'; }

        var data = {};
        data.UserId = ERPUserId;
        data.OTP = $("#txtotp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Home/OTPCheckforUser",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                OTPCheck(status, Flag);
            }
        });
    }
}

//Check Otp for Edit and Delete
function OTPCheck(Status, Flag) {          //Flag=1: Edit and Update Contract  ,Flag=0:Delete Contract   , Flag=2:Close Contract 

    if (Status == 1) {
        $('#OTPDiv').hide(); $('#txtotp,#otpremarks,#otptype').val('');
        if (Flag == 0) { EditLabBill(); }
        else {
            $('#Confirmflag').val('DeleteBill');
            $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do You Want To Delete this Bill?');
            $('#confirm').show();
            $('#confirmOk').focus();
        }
    }
    else {
        warningshow('Invalid OTP', 'txtotp');
        $("#txtotp").select();
    }
}

//Edit 
function EditLabBill() {
    Updateflag = 1; Copyflag = 0;
    copyrefresh(3);
}

//Delete 
function DeleteBill(Flag) {      //Flag=0:Delete Contract  
    $('#btndelete').prop('disabled', true);
    var data = {};
    data.HBillNo = $('#HBillNoCopy').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.HBillSeries = $('#HBillSeries').val();
    data.Variable1 = '';
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_SalesInvoiceDelete",
        data: data,
        success: function (result) {
            $('#btndelete').prop('disabled', false);
            var status = result.oList[0].Status;
            var BillNo = result.oList[0].HBillNo;
            Showalerts(status, BillNo);
        }
    });
}

function GetBillPrevousornext(Value)
{
    var SlNo = parseInt($('#HBillNoCopy').val() || 0);
    SlNo = SlNo + Value;
    if ((SlNo <= 0) || (SlNo >= CurrentBillNo)) {
        warningshow('Bill Number Not Valid', 'HBillNoCopy');
        return false;
    }
    else {
        $('#HBillNoCopy').val(SlNo);
        copyrefresh(2);
        SalesGetCall($('#HBillSeries').val(), SlNo, ERPDeptId, 0);
    }
}
//-----End Edit and Delete

//--------------------------End COPY

//--------------------------Get Data Functions
function GetProdDetails(ItemId,DeptId)
{
    var data = {};
    data.ProductId = ItemId;
    data.CustId = 0;
    data.DeptId = DeptId;
    $.ajax({
        type: "POST",
        url: '../SalesInvoice/CustomerProductDetailsSearch',
        data: data,
        success: function (result) {
            CustPrdctLoad(result.oList);
        }
    });
}

function CustPrdctLoad(result) {
    $("#tblproductdetails tr").remove();

    if (!($('.modalProduct').is(':visible'))) {
        $('#productpdiv').modal("show");
        $("#productpdiv").appendTo("body");
        $('.modal-backdrop').removeClass("modal-backdrop");
    }

    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
           "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + result[n].ProductCode + "</b></td>" +
           "<td class='white font-weight-bold' style='border:none;font-weight:500' class='text-left'>" +
           "<table width='100%'>" +
           "<tr>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>C : </b>" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>LP : </b>" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>" + custstat + " : </b>" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "</td>" +
           "<td style='border:none;font-weight:500' class='text-left'><b>Stock : </b>" + (result[n].Sumtotqty || 0) + "</td>" +
           "<td style='border:none;font-weight:500'><button type='button' class='btn btn-primary btn-sm m-0' onclick='PopUpClose(1)'><i class='fa fa-close'></i></button></td>" +
           "</tr>" +
           "</table>" +
           "</td>" +
           "</tr>" +
            "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>" +
            "<tr class='jsgrid-row'><td colspan=2 class='text-left' style='border:none;font-weight:500'><b> LOCATION  :" + result[n].Bin_A + "</b></td ><td colspan=2  id='expdayse'  class='text-left' style='border:none;font-weight:700;color:yellow'><b></b></td ></tr>";


        $('#tblproductdetails').append(ProdRow);
        $('#tbllocqty').attr('border', '1');
        $('#tbllocqty').attr('bordercolor', 'white');

    }

}
//--------------------------End Get Data Functions


//--------------------------Table Add
function AddProductConfirm(flg)
{

    var name = ($('#Product0').val()).substring(0, 2);

    if($.trim($('#Product0').val())=='')
    {
        warningshow('Please Select Product', 'Product0');
    }
    else if (($('#ProductId0').val()||0) == 0) {
        warningshow('Please Select a valid Product', 'Product0');
    }
    else if ($.trim($('#ProductDesc0').val() ) =='') {
        warningshow('Please Select Batch', 'ProductDesc0');
    }
    else if (($('#BatchSlNo0').val()||0) == 0) {
        warningshow('Please Select a valid Batch', 'ProductDesc0');
    }
    else if (($('#Quantity0').val()||0) == 0) {
        warningshow('Please Select Quantity', 'Quantity0');
    }
    else if(DiscPecentCalc(0,0)==false)
    {
        return DiscPecentCalc(0, 0);
    }
    else if (($('#Tax0').val() || 0) == 0) {
        warningshow('Please Select Tax', 'Tax0');
    }
    else if (($('#Amount0').val() || 0) == 0 && name!='S-') {
        warningshow('Please Select Amount', 'Amount0');
    }
    else
    {
        AddProduct();
    }
}

function AddProduct()
{
    if ($('.SlRow').length == 0) { RowCount = 1; $('#HLocation').prop('disabled',true) }

    var Id = parseInt(RowCount); var SlNo = parseInt($('.SlRow').length) + 1;

    var CMD = ($('#Company0').val()).split("##");
  

    var ProdRow =
         '<tr class="jsgrid-header-row SlRow" id="SlRows' + Id + '" onfocusout=UpdateRow(0,' + Id + ') >' +
         '<td class="jsgrid-align-center crspnt" style="width:2%" onclick=DeleteRow(0,' + Id + ')><i class="icon-trash"></i></td>' +
         '<td class="jsgrid-align-center" style="width:3%" id="tdSl' + Id + '">' + SlNo + '</td>' +
         '<td class="jsgrid-align-left" style="width:13%"><input type="text" class="form-control smallTextbox brnone bgclrwhite" id="Product' + Id + '" name="Product"  style="width:100%"  value="' + $('#Product0').val() + '" onfocusout=UpdateRow(1,' + Id + ') disabled /></td>' +
         '<td class="jsgrid-align-left" style="width:5%"><input type="text"  class="form-control smallTextbox brnone bgclrwhite" id="ProductDesc' + Id + '" name="ProductDesc"  style="width:100%"  value="' + $('#ProductDesc0').val() + '" onfocusout=UpdateRow(2,' + Id + ') disabled /></td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="hidden"  class="form-control smallTextbox brnone bgclrwhite" id="Company' + Id + '"  style="width:100%"  value="' + CMD[0] + '" readonly />' + CMD[1]+'</td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone bgclrwhite" id="Expiry' + Id + '"  style="width:100%"  value="' + $('#Expiry0').val() + '" readonly /></td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Quantity" id="Quantity' + Id + '" onkeypress="isNumberInt(event, this)" onkeyup="SalesQtyCheck(' + Id + ',0)"  style="width:100%"  value="' + $('#Quantity0').val() + '" /></td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Free" id="Free' + Id + '"     onkeypress="isNumberInt(event, this)" onkeyup="SalesQtyCheck(' + Id + ',1)" style="width:100%"  value="' + $('#Free0').val() + '" /></td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass bgclrwhite" name="SellPrice" id="SellPrice' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),AmountCalc(' + Id + ')"   style="width:100%"  value="' + parseFloat($('#SellPrice0').val() || 0).toFixed(Decimal) + '" disabled /></td>' +
         '<td class="jsgrid-align-right" style="width:4%"><input type="text"  class="form-control smallTextbox brnone bgclrwhite" id="PurPrice' + Id + '"  style="width:100%"  value="' + parseFloat($('#PurPrice0').val() || 0).toFixed(Decimal) + '" readonly /></td>' +
         '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone bgclrwhite" id="Amount' + Id + '"  style="width:100%"  value="' + parseFloat($('#Amount0').val()) + '" readonly /></td>' +    
         '<td class="jsgrid-align-center" style="width:8%">' +
         '<div class="input-group m-0">' +
         '<input type="text"  class="form-control smallTextbox Itemclass" name="Discount" id="DiscountPerc' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',0)"   style="width:50%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;"  value="' + parseFloat($('#DiscountPerc0').val() || 0).toFixed(Decimal) + '" />' +
         '<input type="text"  class="form-control smallTextbox Itemclass" name="Discount" id="Discount' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',1)"   style="width:50%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;"  value="' + parseFloat($('#Discount0').val() || 0).toFixed(Decimal) + '" />' +
         '</div>' + 
         '</td>' +
         '<td class="jsgrid-align-center" style="width:6%"> <div class="input-group m-0"><select id="Tax' + Id + '" class="form-control smallTextbox Itemclass pl-0 IpTax" style="width:60%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;padding: 0;" onchange="TaxChange(' + Id + ')"> ' + TaxSelect + ' </select> <input type="text" id="TaxPercent' + Id + '" style="width:40%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;" class="form-control smallTextbox bgclrwhite Itemclass"  readonly> </div></td>' +
         '<td class="jsgrid-align-right" style="width:5%"> <input type="text" id="TaxableAmt' + Id + '" class="form-control smallTextbox bgclrwhite Itemclass brnone"  readonly value="' + parseFloat($('#TaxableAmt0').val() || 0).toFixed(Decimal) + '"></td>' +
         '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="TaxAmt' + Id + '" class="form-control smallTextbox bgclrwhite Itemclass brnone"  readonly value="' + parseFloat($('#TaxAmt0').val() || 0).toFixed(Decimal) + '"></td>' +
         '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="CessAmount' + Id + '" class="form-control smallTextbox bgclrwhite Itemclass brnone" onkeypress="isNumberInt(event, this)" readonly value="' + parseFloat($('#CessAmount0').val() || 0).toFixed(Decimal) + '"></td>' +
         '<td class="jsgrid-align-right" style="width:5%"><select id="DrugSchedule' + Id + '" class="form-control smallTextbox Itemclass brnone" name="DrugSchedule">' + DrugSchedule + '</select></td>' +
         '<td class="jsgrid-align-center" style="width:5%;display:none">' +
         '<input type="text" class="form-control" id="ProductId' + Id + '"  value="' + $('#ProductId0').val() + '" />' +
         '<input type="text" class="form-control" id="BatchSlNo' + Id + '"  value="' + $('#BatchSlNo0').val() + '" />' +
         '<input type="text" class="form-control" id="Cess' + Id + '"   value="' + $('#Cess0').val() + '" />' +
         '<input type="text" class="form-control" id="PHSNCode' + Id + '"   value="' + $('#PHSNCode0').val() + '" />' +
         '<input type="text" class="form-control" id="HLocation' + Id + '"   value="' + $('#HLocation').val() + '" />' +
         '<input type="text" class="form-control" id="StockQty' + Id + '"   value="' + $('#StockQty0').val() + '" />' +
         '</td>' +
         '</tr>';
    $('#TblSalesInvoice').append(ProdRow);
    $('#Tax' + Id).val($('#Tax0').val());
    TaxChange(Id);
    $('#DrugSchedule' + Id).val($('#DrugSchedule0').val());
    RowCount++;
    ClearFields(0,0);
    $('.brnone').css('border', 'none');
    $('.brnone').css('border-radius', '0px');
    CalcGrandTotal(1);
    roundoffcalcn(0);
    LoadProduct(Id);
    LoadBatch(Id);
    ItemFocus();

    IPPAtiemtSelect(0);
    mrpsellingratecalculation()
}


function mrpsellingratecalculation() {
    var Mrp = 0; var Selrate = 0; var Qt = 0; var SelTotal = 0; var Mrptotal = 0;
    for (var a = 1; a <= RowCount; a++) {

        Qt = parseInt($('#Quantity' + a).val() || 0);
        Selrate = parseFloat($('#SellPrice' + a).val() || 0);
        Mrp = parseFloat($('#PurPrice' + a).val() || 0);

        // Calculate the subtotal without rounding it to fixed decimal places
        var subTotalSel = parseFloat(Qt * Selrate);
        var subTotalMrp = parseFloat(Qt * Mrp);

        // Add the subtotal to the total variable directly
        SelTotal += subTotalSel;
        Mrptotal += subTotalMrp;

    }
    var svngs = parseFloat(Mrptotal - SelTotal).toFixed(2)

    $('#savingvalue').text('SAVINGS:' + parseFloat(svngs).toFixed(2))
    $('#mrpvalue').text('MRP VALUE:' + parseFloat(Mrptotal).toFixed(2))

    //console.log(SelTotal)
    //console.log(Mrptotal)

}


function SalesQtyCheck(Id,fl)
{
    if (($('#BatchSlNo' + Id).val() || 0) > 0)
    {
        var CurQty = parseInt($('#StockQty' + Id).val() || 0);
        var Qty = parseInt($('#Quantity' + Id).val() || 0); var Freq = parseInt($('#Free' + Id).val() || 0);
        if ((Qty + Freq) > CurQty)
        {
            if (fl==0)
            {
                $('#Quantity' + Id).val('');
                warningshow('Not Enought stock! Current Stock is ' + CurQty, 'Quantity' + Id);
            }
            else if (fl == 1) {
                $('#Free' + Id).val('');
                warningshow('Not Enought stock! Current Stock is ' + CurQty, 'Free' + Id);
            }
           
        }
    }
    if (fl == 0)
    {
        ClearFields(4, 0);
        AmountCalc(Id);
        mrpsellingratecalculation()
    }
}

function LocationChange(Id)
{
    if (($('#BatchSlNo' + Id).val() || 0) > 0)
    {
        ClearFields(2, Id);
        $('#ProductDesc' + Id).focus();
    }
}

//Add or Update Conditions of Procedure
function AddProcedureConfrm(Id)
{
    $('#CurEditId').val(Id);
    if ($.trim($('#Procedure' + Id).val()) == '') {
        warningshow('Please Select Procedure', 'Procedure' + Id);
        return false;
    }
    else if (($('#ProcedureId' + Id).val() || 0) == 0) {
        warningshow('Please Select Procedure', 'Procedure' + Id);
        return false;
    }
    else if (($('#ProcQty' + Id).val() || 0) == 0) {
        warningshow('Please Select Quantiy', 'ProcQty' + Id);
        return false;
    }
    //else if (($('#ProcFee' + Id).val() || 0) == 0) {
    //    warningshow('Please Select Fee', 'ProcFee' + Id);
    //    return false;
    //}
    //else if (($('#ProcTot' + Id).val() || 0) <= 0) {
    //    warningshow('Amount Must be greater than 0', 'ProcFee' + Id);
    //    return false;
    //}
    else
    {
       
        if (Id == 0)       //Add Procedure
        { AddProcedure(); }
        else       //Update Procedure
        { $('#CurEditId').val(0); ProcedureGrandTotalCalc(1); }
        return true;
    }
}

function AddProcedure()
{
        if ($('.PRCRow').length == 0) { ProcCount = 1;}
        var Slno = parseInt($('.PRCRow').length) + 1; var Id = parseInt(ProcCount);
        var ProcRow = '<tr id="PCRow' + Id + '" class="PRCRow" onfocusout=AddProcedureConfrm(' + Id + ')>' +
                    '<td class="text-center" onclick=DeleteRow(2,' + Id + ') style="padding-top: .5rem;cursor:pointer"><i class="icon-trash"></i> </td>' +
                    '<td class="text-center" id="PCslno' + Id + '" style="padding-top: .5rem;">' + Slno + '</td>' +
                    '<td class="text-center " > <input type="text" id="Procedure' + Id + '" class="form-control proccls atcmpl smallTextbox " value="' + $('#Procedure0').val() + '" onfocus="ProcedureSearch(' + Id + ')"></td>' +
                    '<td class="text-center" >  <input type="text" id="ProcQty' + Id + '" class="form-control proccls smallTextbox " value="' + $('#ProcQty0').val() + '" onkeyup="ProcedureAmountCalc(' + Id + ')" onkeypress="isNumberInt(event, this)"> </td>' +
                    '<td class="text-center" ><input type="text" id="ProcFee' + Id + '" class="form-control proccls smallTextbox " value="' + $('#ProcFee0').val() + '" autocomplete="off" onkeyup="ProcedureAmountCalc(' + Id + ')" onkeypress="isNumber(event,this)"></td>' +
                    '<td class="text-center" >  <div class="input-group m-0">'+
                     '<select  id="ProcTax' + Id + '" class="form-control col-md-7 IpTax proctx smallTextbox " style="padding: 0;border:none;border-right: 1px solid lightgrey!important;" onchange="ProcedTaxChange(' + Id + '),ProcedureAmountCalc(' + Id + ')">' + TaxSelect + '</select>' +
                     '<input type="text" id="ProcTaxPerc' + Id + '" style="border-left: 1px solid lightgrey!important;border:none;" class="form-control dedisa bgclrwhite col-md-5 smallTextbox " name="Name" autocomplete="off" disabled>' +
                     '</div></td>'+
                    '<td class="text-center"><input type="text" id="ProcTot' + Id + '" class="form-control dedisa proccls bgclrwhite smallTextbox " value="' + $('#ProcTot0').val() + '" autocomplete="off" disabled></td>' +
                     '<td style="display:none">' +
                     '<input type="text" id="ProcedureId' + Id + '" class="form-control proccls" value="' + $('#ProcedureId0').val() + '" autocomplete="off" disabled>' +
                     '<input type="text" id="ProcTaxable' + Id + '" class="form-control proccls" value="' + $('#ProcTaxable0').val() + '" autocomplete="off" disabled>' +
                     '<input type="text" id="ProcTaxamt' + Id + '" class="form-control proccls" value="' + $('#ProcTaxamt0').val() + '" autocomplete="off" disabled>' +
                     '</td>' +
                    '</tr>';
        $('#TblProcedure').append(ProcRow);
        $('#ProcTax' + Id).val($('#ProcTax0').val());
        $('.proccls').css('border','none');
        ProcedTaxChange(Id);
        ProcCount++;
        ClearFields(5, 0);
        ProcedureGrandTotalCalc(1);
        roundoffcalcn(0);
}
//--------------------------End Table Add


//--------------------------Edit Table 
function UpdateRow(flg,Id)
{
    if(flg==1)                            //Check Item valid
    {
        if (($('#ProductId' + Id).val()||0) == 0)
        {
            warningshow('Please Select Item', 'Product'+ Id);
            return false;
        }
    }
    else if (flg == 2) {                 //Check Batch valid
        if (QtyFlg == 1) { warningshow('No Stock Available!', 'Product' + Id); return false; }
        else
        {
            if (($('#BatchSlNo' + Id).val() || 0) == 0) {
                warningshow('Please Select Batch', 'ProductDesc' + Id);
                return false;
            }
        }
    }
    else if(flg==0)                      //Update Row
    {
        window.setTimeout(function () {
            if (UpdateRow(1,Id)==false) {
            return UpdateRow(1,Id);
        }
        else if (UpdateRow(2,Id) == false) {
            return UpdateRow(2,Id);
        }
        else if (($('#Quantity' + Id).val() || 0) == 0) {
            warningshow('Please Select Quantity', 'Quantity' + Id);
            return false;
        }
        else if (($('#SellPrice' + Id).val() || 0) == 0) {
            warningshow('Please Select Rate', 'SellPrice' + Id);
            return false;
        }
        else if (DiscPecentCalc(Id, 0) == false) {
            return DiscPecentCalc(Id, 0);
        }
        else if (($('#Tax' + Id).val() || 0) == 0) {
            warningshow('Please Select Tax', 'Tax' + Id);
        }
        else if (($('#Amount' + Id).val() || 0) == 0) {
            warningshow('Please Select Amount', 'Amount' + Id);
        }
        else {
            ClearFields(4,0);
            AmountCalc(Id);
            CalcGrandTotal(1);
            roundoffcalcn(0);
            return true;
        }
        }, 80);
    }
}

function DeleteRow(flg,Id)
{
    if (Copyflag == 0)
    {
        if (flg == 0) {
            Callconfirm('Data will be lost.Do you want to Continue?', 'DeleteRow', Id);
        }
        else if (flg == 1) {
            var Slno = 1;
            $('#SlRows' + Id).remove();
            for (var j = 1; j <= RowCount; j++) {
                if ($('#Product' + j).length != 0) {
                    $('#tdSl' + j).text(Slno);
                    Slno++;
                }
            }
            $('#Product0').focus().select();
            CalcGrandTotal(1);
            roundoffcalcn(0);
            if ($('.SlRow').length == 0) { $('#HLocation').prop('disabled', false); }
        }
        else if (flg == 2) {
            var Slno = 1;
            $('#PCRow' + Id).remove();
            for (var j = 1; j <= ProcCount; j++) {
                if ($('#Procedure' + j).length != 0) {
                    $('#PCslno' + j).text(Slno);
                    Slno++;
                }
            }
            window.setTimeout(function () {
                if (Id == parseInt($('#CurEditId').val())) { $('#CurEditId').val(''); }
            });

            $('#Procedure0').focus().select();
            ProcedureGrandTotalCalc(1);
            paymethodechange()
        }
    }

    mrpsellingratecalculation()
   
}
//--------------------------End Edit Table 


//--------------------------Focus
function BtnFocusClr()
{
    $(".btn-outline-primary").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-primary");
        $('#' + Id).addClass("btn-primary");
    });
    $(".btn-outline-primary").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-primary");
        $('#' + Id).addClass("btn-outline-primary");
    });
    $(".btn-outline-secondary").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-secondary");
        $('#' + Id).addClass("btn-secondary");
    });
    $(".btn-outline-secondary").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-secondary");
        $('#' + Id).addClass("btn-outline-secondary");
    });
    $(".btn-outline-warning").focus(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-outline-warning");
        $('#' + Id).addClass("btn-warning");
    });
    $(".btn-outline-warning").focusout(function (e) {
        var Id = $(this).attr('id');
        $('#' + Id).removeClass("btn-warning");
        $('#' + Id).addClass("btn-outline-warning");
    });
}

function ManualFocus(Id, Dest, pKey, e) {
    var key = 13;
    if (pKey != 0)
    { key = pKey }
    var code = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (code == key) {
        if (Dest == 'btnadd') {
            AddProductConfirm(0)
        }
        else {
            e.preventDefault();
            $('#' + Dest).focus();
        }
    }
}

function ItemFocus() {
    $('.Itemclass').keydown(function (e) {
        var NextId = '';
        var Name = $(this).attr('name');
        var Id = $(this).attr('id').match(/\d+/)[0];
        var LeftId = ''; var RightId = '';

        if (Id != 0)
        {
            if (Name == 'Quantity') { LeftId = 'SellPrice'; RightId = 'Free'; }
            else if (Name == 'Free') { LeftId = 'Quantity'; RightId = 'SellPrice'; }
            else if (Name == 'SellPrice') { LeftId = 'Free'; RightId = 'Quantity'; }
        }
        else if (Id == 0)
        {
            if (Name == 'Quantity') { LeftId = 'Product'; RightId = 'Free'; }
            else if (Name == 'Free') { LeftId = 'Quantity'; RightId = 'btnadd'; }
        }

        
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if ((key == 13) || (key == 39)) {                                                //Enter
                   
            $('#' + RightId + Id).focus().select();
        }
        else if (key == 37) {                                                   //Left
            $('#' + LeftId + Id).focus().select(); 
        }
        else if (key == 40) {                                                   //Down
            $('input[name="' + Name + '"]').each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId > Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
        else if (key == 38) {                                                   //Up
            $($('input[name="' + Name + '"]').get().reverse()).each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId < Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
    });  
}
//--------------------------End Focus


//--------------------------Calculations
function CalcGrandTotal(flg)
{
    if(flg==0)       //FormRefresh
    {
        $('#BaseTextTotal,#BaseTextTotalProc').text((0).toFixed(Decimal));
        $('.calccls').val((0).toFixed(Decimal))
    }
    else if (flg == 1)       //Calculation
    {
        ClearFields(3,0);   //Clear Splittax fields
        var TotalAmt = 0; var TaxableAmt = 0; var TaxAmt = 0; var CessAmount = 0;
        for (var i = 1; i <= RowCount; i++)
        {
            if ($('#Amount' + i).length != 0)
            {
                var Amount = $('#Amount' + i).val() || 0; var Taxable = $('#TaxableAmt' + i).val() || 0; var Tax = $('#TaxAmt' + i).val() || 0; var Cess = 0;// $('#CessAmount' + i).val() || 0;
                TotalAmt = parseFloat(TotalAmt) + parseFloat(Amount);
                TaxableAmt = parseFloat(TaxableAmt) + parseFloat(Taxable);
                TaxAmt = parseFloat(TaxAmt) + parseFloat(Tax);
                CessAmount = parseFloat(CessAmount) + parseFloat(Cess);

                //SplitTaxCalculation
                var TaxRate = parseFloat($("#Tax" + i).find("option:selected").attr("name") || 0);
                var CurrentTaxable = $("#hiddensplittaxable_" + TaxRate).val();
                var NewTaxable = Number(CurrentTaxable) + Number($("#TaxableAmt" + i).val());
                $("#hiddensplittaxable_" + TaxRate).val(parseFloat(NewTaxable).toFixed(Decimal));
                $("#splittaxable_" + TaxRate).val(parseFloat(NewTaxable).toFixed(Decimal));

                var CurrentTax = $("#hiddensplittax_" + TaxRate).val();
                var NewTax = Number(CurrentTax) + Number($("#TaxAmt" + i).val());
                var CGST = (Number(NewTax).toFixed(Decimal)) / 2;
                $("#hiddensplittax_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));
                $("#splittax_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));

                if ($.trim($('#PRType :selected').text()) == 'Local') {
                    $("#CGST_" + TaxRate).val(parseFloat(CGST).toFixed(Decimal));
                    $("#SGST_" + TaxRate).val(parseFloat(CGST).toFixed(Decimal));
                    $("#IGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
                }
                else {
                    $("#CGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
                    $("#SGST_" + TaxRate).val(parseFloat(0).toFixed(Decimal));
                    $("#IGST_" + TaxRate).val(parseFloat(NewTax).toFixed(Decimal));
                }
            }
        }
        $('#BaseTextTotal').text((TotalAmt).toFixed(Decimal));
        $('#HiddenGrandTotal').val((TotalAmt).toFixed(Decimal));
        $('#TotalTaxable,#HiddenTaxable').val((TaxableAmt).toFixed(Decimal));
        $('#TotlaTax,#HiddenTax').val((TaxAmt).toFixed(Decimal));
        $('#TotalCess').val((CessAmount).toFixed(Decimal));

        var gnTot = parseFloat($('#BaseTextTotal').text()||0);
        var PrTot = parseFloat($('#ProcAmount').val()||0);
        var TotwithPRoc = gnTot + PrTot;
        $('#BaseTextTotalProc').text(parseFloat(TotwithPRoc).toFixed(Decimal))

        TaxSubAmountCalc(0);
    }
    /*anu*/
    paymethodechange();
    /*anu*/
}


function AmountCalc(Id)
{
   
    var TaxableAmount = 0; var TaxAmount = 0; var CessAmount = 0; var TotAmount = 0;
    var CessPer = 0;
    if ($("#CessCheck").prop("checked") == true) {
        CessPer = parseFloat($("#Cess" + Id).val() || 0); CessPer = isNaN(CessPer) ? 0 : CessPer;
    }
    else {
         CessPer = 0;
    }
    var Qty = $('#Quantity' + Id).val() || 0; var Rate = $('#SellPrice' + Id).val() || 0; var TaxPerc = $('#TaxPercent' + Id).val() || 0;
    var Disc = $('#Discount' + Id).val() || 0;

    Qty = isNaN(Qty) ? 0 : Qty; Rate = isNaN(Rate) ? 0 : Rate; TaxPerc = isNaN(TaxPerc) ? 0 : TaxPerc; Disc = isNaN(Disc) ? 0 : Disc;

    if (INTaxType == 'Exclusive') {
        TaxableAmount = (parseFloat(Qty) * parseFloat(Rate)) - parseFloat(Disc);
        TaxAmount = parseFloat(TaxableAmount) * parseFloat(TaxPerc) / 100;
        CessAmount = parseFloat(TaxableAmount) * parseFloat(CessPer) / 100;
        TotAmount = parseFloat(TaxableAmount) + parseFloat(TaxAmount) + parseFloat(CessAmount);
    }
    else if (INTaxType == 'Inclusive') {
        TotAmount = (parseFloat(Qty) * parseFloat(Rate)) - parseFloat(Disc);
        if (CessPer != 0)
            CessAmount = parseFloat(TotAmount) - (parseFloat(TotAmount) / ((parseFloat(CessPer) / 100) + 1));
        else
            CessAmount = 0;

        var TotafterCess = parseFloat(TotAmount) - parseFloat(CessAmount||0);

        if (TaxPerc != 0)
            TaxableAmount = parseFloat(TotafterCess) / ((parseFloat(TaxPerc) / 100) + 1);
        else
            TaxableAmount = parseFloat(TotafterCess);

        TaxAmount = parseFloat(TaxableAmount) * parseFloat(TaxPerc) / 100;
    }
    

    $('#TaxableAmt' + Id).val(parseFloat(TaxableAmount).toFixed(Decimal));
    $('#TaxAmt' + Id).val(parseFloat(TaxAmount).toFixed(Decimal));
    $('#CessAmount' + Id).val(parseFloat(CessAmount).toFixed(Decimal)); 
    $('#Amount' + Id).val(parseFloat(TotAmount).toFixed(Decimal));
}

function DiscPecentCalc(Id,flg)
{
    var DiscAmnt = parseFloat($('#Discount' + Id).val() || 0).toFixed(Decimal);     DiscAmnt = isNaN(DiscAmnt) ? 0 : DiscAmnt;
    var DiscPerc = parseFloat($('#DiscountPerc' + Id).val() || 0).toFixed(Decimal); DiscPerc = isNaN(DiscPerc) ? 0 : DiscPerc;

    var Qty = $('#Quantity' + Id).val() || 0; var Rate = $('#SellPrice' + Id).val() || 0;
    Qty = isNaN(Qty) ? 0 : Qty; Rate = isNaN(Rate) ? 0 : Rate;
    var Taxable = (parseFloat(Qty) * parseFloat(Rate)); Taxable = isNaN(Taxable) ? 0 : Taxable;
     
    if (Taxable > 0) {
        if (flg == 0) {                         //Amount calc
            $('#Discount' + Id).val((0).toFixed(Decimal));
            if (DiscPerc > 0) {
                DiscAmnt = (Taxable * DiscPerc) / 100;
                DiscAmnt = Number(DiscAmnt).toFixed(Decimal);
                $('#Discount' + Id).val(DiscAmnt);
            }
        }
        else if (flg == 1) {                   //Percentage calc
            $('#DiscountPerc' + Id).val((0).toFixed(Decimal));
            
            if (DiscAmnt > 0) {
                DiscPerc = (DiscAmnt * 100) / Taxable;
                DiscPerc = Number(DiscPerc).toFixed(Decimal);
                $('#DiscountPerc' + Id).val(DiscPerc);
            }
        }
    }

    if (parseFloat(DiscAmnt) >= parseFloat(Taxable))
    {
        var name = ($('#Product0').val()).substring(0, 2);
        if (name == 'S-') {

            
            AmountCalc(Id);
            return true;
        }
        else {
            $('#DiscountPerc' + Id).val(''); $('#Discount' + Id).val('');
            warningshow('Discount should be less than ' + Taxable);
            AmountCalc(Id);
            return false;
        }

        
    }
    else
    {
        AmountCalc(Id);
        return true;
    }
   
}

//Change Cess 
function ChangeCess(flg)
{
    if (flg == 0)                                        //Change Cess Checkbox
    {
        ClearFields(4,0);
        for (var i = 1; i <= RowCount; i++) {
            if ($('#Product' + i).val() != undefined) {
                AmountCalc(i);
            }
        }
        CalcGrandTotal(1);
        roundoffcalcn(0);
    }
}

//Roundoff
function roundoffcalcn(flg) {

    var gamt = 0; var roundgndtotal = 0; var gntamt = 0 ;  

    gamt = parseFloat($('#BaseTextTotalProc').text() || 0);
    gntamt = Math.round(gamt)||0;
    roundgndtotal = parseFloat(gntamt - gamt).toFixed(Decimal);

    if ($('#roundoffstatus').is(':checked')) {
        $('#TotRoundOff').val(roundgndtotal);
        $('#BaseTextTotalProc').text((gntamt || 0).toFixed(Decimal));
    }
    else {
        $('#TotRoundOff').val((0).toFixed(Decimal));
        CalcGrandTotal(1);
        if (flg == 0)
        { CalcDiscountSplitTax(); }
        else if (flg == 1)
        { CalcDiscountSplitTaxbyPrecentage(); }
    }
    paymethodechange();
   
}

//----Bill Discount 
function CalcDiscountSplitTax() {       //Calc from discountamount
    if ($('.SlRow').length > 0) {
        if (parseFloat($('#Discount').val() || 0) > 0) {
            var Totalamt = 0;
            if ($("#DiscFromGrandTotal").prop("checked") == false) {
                Totalamt = parseFloat($('#HiddenTaxable').val() || 0);
            }
            else {
                Totalamt = parseFloat($('#HiddenGrandTotal').val() || 0);
            }
            var DisAMt = parseFloat($('#Discount').val() || 0);
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
            var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
            $('#Discountpercent').val(Dispers.toFixed(Decimal));
            BillwiseDiscount(NetAMT, Dispers);
        }
        else {
            CalcGrandTotal(1);
            $('#Discountpercent').val('0.00');
        }
    }
}

function CalcDiscountSplitTaxbyPrecentage() {    //Calc from discountpercent
    if ($('.SlRow').length > 0) {
        if (parseFloat($('#Discountpercent').val() || 0) > 0) {

            var Totalamt = 0;
            if ($("#DiscFromGrandTotal").prop("checked") == false) {
                Totalamt = parseFloat($('#HiddenTaxable').val() || 0);
            }
            else {
                Totalamt = parseFloat($('#HiddenGrandTotal').val() || 0);
            }
            var DisPercen = parseFloat($('#Discountpercent').val() || 0);
            var DisAMt = parseFloat((Totalamt * DisPercen) / 100) || 0;
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
            $('#Discount').val(DisAMt.toFixed(Decimal));
            BillwiseDiscount(NetAMT, DisPercen);
        }
        else {
            CalcGrandTotal(1);
            $('#Discount').val('0.00');
        }
    }
}

function BillwiseDiscount(TotalAmt, Dispers) {

    var Flag;
    if ($("#DiscFromGrandTotal").prop("checked") == false) { Flag = 0; }           //Discount from Taxable
    else { Flag = 1; }                                                             //Discount from GrandTotal

    var FCAmount = 0, FCtottaxable = 0, FCtottax = 0, BillDisc = 0, BaseCess = 0;

    var AMT0 = 0, GST0 = 0;
    var AMT5 = 0, GST5 = 0;
    var AMT12 = 0, GST12 = 0;
    var AMT18 = 0, GST18 = 0;
    var AMT28 = 0, GST28 = 0;

    var SGST_0 = 0, SGST_5 = 0, SGST_12 = 0, SGST_18 = 0, SGST_28 = 0;

    var i = RowCount; var CessPer;

  
    for (var k = 1; k <= i; k++) {
       
            if ($('#Amount' + k).length > 0)
            {
                if ($("#CessCheck").prop("checked") == true) {
                    var CessPer = $("#Cess" + k).val();
                }
                else {
                    var CessPer = 0;
                }
                var CalcAmt = 0;
                if (Flag == 0)
                {
                    var Amount = $('#TaxableAmt' + k).val();
                    var GSTPERS = parseFloat($("#Tax" + k).find("option:selected").attr("name") || 0);

                    var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
                    disamt = disamt.toFixed(Decimal);
                    var TaxAmt = parseFloat(disamt * GSTPERS) / parseFloat(100);

                    var GStAmount = TaxAmt.toFixed(Decimal);
                    Amount = parseFloat(disamt) || 0;

                    var CessAmt = disamt * (CessPer / 100);
                    BaseCess = BaseCess + CessAmt;

                    CalcAmt = Amount;
                }
                else
                {
                    var Amount = $('#Amount' + k).val();
                    var GSTPERS = parseFloat($("#Tax" + k).find("option:selected").attr("name") || 0);

                    var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
                    disamt = disamt.toFixed(Decimal);
                    var newamount = parseFloat(disamt);

                    var ABC = 100 + Number(GSTPERS) + Number(CessPer);
                    var newtaxable = Number((100 * newamount) / ABC).toFixed(Decimal);

                    var TaxAmt = newtaxable * (GSTPERS / 100);

                    var GStAmount = TaxAmt.toFixed(Decimal);
                    Amount = parseFloat(disamt) || 0;

                    var CessAmt = newtaxable * (CessPer / 100);
                    BaseCess = BaseCess + CessAmt;

                    CalcAmt = newtaxable;
                }

                if (GSTPERS == 0) {
                    AMT0 = parseFloat(AMT0) + parseFloat(CalcAmt) || 0
                    GST0 = parseFloat(GST0 + GStAmount) || 0
                }
                else if (GSTPERS == 5) {
                    AMT5 = parseFloat(AMT5) + parseFloat(CalcAmt) || 0
                    GST5 = parseFloat(GST5) + parseFloat(GStAmount) || 0
                }
                else if (GSTPERS == 12) {
                    AMT12 = parseFloat(AMT12) + parseFloat(CalcAmt) || 0
                    GST12 = parseFloat(GST12) + parseFloat(GStAmount) || 0
                }
                else if (GSTPERS == 18) {
                    AMT18 = parseFloat(AMT18) + parseFloat(CalcAmt) || 0
                    GST18 = parseFloat(GST18) + parseFloat(GStAmount) || 0
                }
                else {
                    AMT28 = parseFloat(AMT28) + parseFloat(CalcAmt) || 0
                    GST28 = parseFloat(GST28) + parseFloat(GStAmount) || 0
                }
            }

            SGST_0 = Number(GST0.toFixed(Decimal)) / 2;
            SGST_5 = Number(GST5.toFixed(Decimal)) / 2;
            SGST_12 = Number(GST12.toFixed(Decimal)) / 2;
            SGST_18 = Number(GST18.toFixed(Decimal)) / 2;
            SGST_28 = Number(GST28.toFixed(Decimal)) / 2;

            $('#splittaxable_0').val(AMT0.toFixed(Decimal));
            $('#splittax_0').val(GST0.toFixed(Decimal));

            $('#splittaxable_5').val(AMT5.toFixed(Decimal));
            $('#splittax_5').val(GST5.toFixed(Decimal));

            $('#splittaxable_12').val(AMT12.toFixed(Decimal));
            $('#splittax_12').val(GST12.toFixed(Decimal));

            $('#splittaxable_18').val(AMT18.toFixed(Decimal));
            $('#splittax_18').val(GST18.toFixed(Decimal));

            $('#splittaxable_28').val(AMT28.toFixed(Decimal));
            $('#splittax_28').val(GST28.toFixed(Decimal));

            if ($.trim($('#PRType :selected').text()) == 'Local') {
                $("#SGST_0,#CGST_0").val(SGST_0.toFixed(Decimal));
                $("#SGST_5,#CGST_5").val(SGST_5.toFixed(Decimal));
                $("#SGST_12,#CGST_12").val(SGST_12.toFixed(Decimal));
                $("#SGST_18,#CGST_18").val(SGST_18.toFixed(Decimal));
                $("#SGST_28,#CGST_28").val(SGST_28.toFixed(Decimal));
                $("#IGST_0,#IGST_5,#IGST_12,#IGST_18,#IGST_28").val(parseFloat(0).toFixed(Decimal));
            }
            else {
                $("#IGST_0").val(GST0.toFixed(Decimal));
                $("#IGST_5").val(GST5.toFixed(Decimal));
                $("#IGST_12").val(GST12.toFixed(Decimal));
                $("#IGST_18").val(GST18.toFixed(Decimal));
                $("#IGST_28").val(GST28.toFixed(Decimal));
                $("#SGST_0,#CGST_0,#SGST_5,#CGST_5,#SGST_12,#CGST_12,#SGST_18,#CGST_18,#SGST_28,#CGST_28").val(parseFloat(0).toFixed(Decimal));
            }

            if (Flag == 0) {
                var GrandTotal = 0; var TotalTax = 0;
                TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
                GrandTotal = parseFloat(TotalAmt) + parseFloat(TotalTax) + parseFloat(BaseCess);
                $('#TotalTaxable').val(parseFloat(TotalAmt).toFixed(Decimal));
            }
            else
            {
                var GrandTotal = parseFloat(TotalAmt); var TotalTax = 0; var TotalTaxable = 0;
                TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
                TotalTaxable = parseFloat(TotalAmt) - parseFloat(TotalTax) - parseFloat(BaseCess);
                $('#TotalTaxable').val(parseFloat(TotalTaxable).toFixed(Decimal));
            }
           
            $('#BaseTextTotal').text(GrandTotal.toFixed(Decimal));
            $('#TotlaTax').val(parseFloat(TotalTax).toFixed(Decimal));
            $('#TotalCess').val(BaseCess.toFixed(Decimal));

            var gnTot = parseFloat($('#BaseTextTotal').text() || 0);
            var PrTot = parseFloat($('#ProcAmount').val() || 0);
            var TotwithPRoc = gnTot + PrTot;
            $('#BaseTextTotalProc').text(parseFloat(TotwithPRoc).toFixed(Decimal))

            TaxSubAmountCalc(0);
      }   
}

function ProcedureAmountCalc(Id) {

    var TaxableAmount = 0; var TaxAmount = 0; var CessAmount = 0; var TotAmount = 0;
   
    var Qty = $('#ProcQty' + Id).val() || 0; var Rate = $('#ProcFee' + Id).val() || 0; var TaxPerc = $('#ProcTaxPerc' + Id).val() || 0;

    Qty = isNaN(Qty) ? 0 : Qty; Rate = isNaN(Rate) ? 0 : Rate; TaxPerc = isNaN(TaxPerc) ? 0 : TaxPerc;

    TaxableAmount = parseFloat(Qty) * parseFloat(Rate);
    TaxAmount = parseFloat(TaxableAmount) * parseFloat(TaxPerc) / 100;
    TotAmount = parseFloat(TaxableAmount) + parseFloat(TaxAmount);

    $('#ProcTaxable' + Id).val(parseFloat(TaxableAmount).toFixed(Decimal));
    $('#ProcTaxamt' + Id).val(parseFloat(TaxAmount).toFixed(Decimal));
    $('#ProcTot' + Id).val(parseFloat(TotAmount).toFixed(Decimal));
}

function ProcedureGrandTotalCalc(flg) {
        var TotalAmt = 0; 
        for (var i = 1; i <= ProcCount; i++) {
            if ($('#ProcTot' + i).length != 0) {
                var Amount = $('#ProcTot' + i).val() || 0; 
                TotalAmt = parseFloat(TotalAmt) + parseFloat(Amount);
            }
        }
        $('#ProcTotalAmount').text((TotalAmt).toFixed(Decimal));
        $('#ProcAmount').val((TotalAmt).toFixed(Decimal));

        var gnTot = parseFloat($('#BaseTextTotal').text());
        var TotwithPRoc = gnTot + TotalAmt;
        $('#BaseTextTotalProc').text(parseFloat(TotwithPRoc).toFixed(Decimal))

}
//----End Bill Discount 

function GetPatientAge(Ag) {
    var age = AgeCalculation(Ag); var yearString = '';
    if (age.years > 1) yearString = age.years + " Years";
    else yearString = age.years + " Year";
   
    $('#Hage').val(yearString);
}

//Tax SubTotal Calculation
function TaxSubAmountCalc(flg)
{
    var SubTaxableamt = 0; var SubTaxamt = 0; var Cgstamt = 0; var Sgstamt = 0; var Igstamt = 0;
    for (var k = 0;k<TaxRateArray.length;k++)
    {
        var m = TaxRateArray[k];
        var SAmt1 = parseFloat($('#splittaxable_' + m).val());   var SAmt2 = parseFloat($('#splittax_' + m).val());
        var SAmt3 = parseFloat($('#CGST_' + m).val());           var SAmt4 = parseFloat($('#SGST_' + m).val());  
        var SAmt5 = parseFloat($('#IGST_' + m).val());

        SubTaxableamt = parseFloat(SubTaxableamt) + SAmt1;
        SubTaxamt = parseFloat(SubTaxamt) + SAmt2;
        Cgstamt = parseFloat(Cgstamt) + SAmt3;
        Sgstamt = parseFloat(Sgstamt) + SAmt4;
        Igstamt = parseFloat(Igstamt) + SAmt5;
    }

    $('#SubTaxable').val(SubTaxableamt.toFixed(Decimal));
    $('#SubTax').val(SubTaxamt.toFixed(Decimal));
    $('#SubCGST').val(Cgstamt.toFixed(Decimal));
    $('#SubSGST').val(Sgstamt.toFixed(Decimal));
    $('#SubIGST').val(Igstamt.toFixed(Decimal));
}

//Check Itemwise Discount then bill disc=0
function CheckDisc(evt, selectedvalue,fl)
{
    var ItemDisc = 0;
    for (var i = 1; i <= RowCount; i++)
    {
        var dis = $('#Discount' + i).val() || 0; dis = isNaN(dis) ? 0 : dis;
        ItemDisc = parseFloat(ItemDisc) + parseFloat(dis);
    }
    if(ItemDisc>0)
    {
        evt.preventDefault();
        $('#Discount').val('');
        $('#Discountpercent').val('');
        CalcDiscountSplitTax();
        if(fl==0)
            warningshow('Itemwise Discount Given', 'Discount');
        else if (fl == 1)
            warningshow('Itemwise Discount Given', 'Discountpercent');
        return false;
    }
    return true;
}

function SpceialAmountCalc()
{
    //var TotAmt = $('#TAmount').val() || 0;
    //var SpAmt = $('#SpecialFeeAmt').val() || 0;

    //if (Copyflag == 1) {
    //    $('#GAmount').val(parseFloat(parseFloat(TotAmt || 0) + parseFloat(SpAmt || 0)).toFixed(Decimal))
    //}
   
    //var GvAmt = $('#GAmount').val() || 0;

    //var Balamt = 0;
    //Balamt = (parseFloat(TotAmt) -( parseFloat(SpAmt) + parseFloat(GvAmt))||0);

    //$('#BAmount').val(parseFloat(Balamt).toFixed(Decimal));
}

//--------------------------End Calculations

//--------------------------Other Functions


function IPPAtiemtSelect(flg)                                          //Set Tax 0 when patient is IP
{
    return false;
}






function IPPAtiemtSelect1(flg)                                          //Set Tax 0 when patient is IP
{
    if (flg == 0)                  //Patient Selection
    {
        if ((IPPatientFlag) == 1 && (($('#IPNumber').val() || 0) > 0)) {
            $('.IpTax').val(IPTax);
            $('.IpTax').prop('disabled', true).addClass('bgclrwhite');
            ClearFields(4, 0);
            for (var i = 0; i <= RowCount; i++) {
                if ($('#Product' + i).val() != undefined) {
                   // TaxChange(i);
                   // AmountCalc(i);
                }
            }
            CalcGrandTotal(1);
            roundoffcalcn(0);
            PopUpShow(2);
        }
        else { $('.IpTax').prop('disabled', false).removeClass('bgclrwhite'); PopUpClose(4); }
    }
    else if(flg==1)            //Item Selection
    {
        if ((IPPatientFlag) == 1 && (($('#IPNumber').val() || 0) > 0)) { return true; }
        else { return false; }
    }
}

function PrintthisBillHospital(Type, Count, Flag)
{
    debugger;
    var PrintType = SalesBillType;                           // 'SALESNOTEPAD' : DotMatrix Print  , 'SALESLOCAL' : Normal Print
    if (PrintType == 'HMSSALESLOCAL')
        PrintthisBillWindowsHMS('SALES', Count, Flag, 0);
    else if (PrintType == 'HMSSALESQR')
        PrintthisBillWindowsHMS('SALESQR', Count, Flag, 0);

    else if (PrintType == 'SALESB2B')
        PrintthisBillWindowsHMS('SALESB2B', Count, Flag, 0);

    else if (PrintType == 'HMSSALESDMAT')
        PrintthisBillHospitalSales('SALES', Count, Flag);

    else if (PrintType == 'HMSSALESDMAT40ColGST')
        PrintthisBillHospitalSales11('SALES', Count, Flag);

    else if (PrintType == 'HMSSALESDMAT40ColsmallGST')
        PrintthisBillHospitalSales22('SALES', Count, Flag);
}
//--------------------------End Other Functions

//--------------------------Common
function ClearFields(Flag,Id)
{
    debugger;
    if(Flag==0)         //Clear After ItemAdd
    {
        $('.proddts,#Quantity0,#Amount0,#Free0,#TaxableAmt0,#TaxAmt0,#Discount0,#DiscountPerc0').val('');
        $('#Tax0').val($('#Tax0').find('option:first').val());
        TaxChange(0);
        $('#Product0').val('').focus();
        PopUpClose(1);
    }
    else if (Flag == 1)         //Clear before ItemCode AutoComplete
    {
        $('#Quantity' + Id + ',#Amount' + Id + ',#Free' + Id + ',#Company' + Id + ',#Expiry' + Id + ',#SellPrice' + Id + ',#PurPrice' + Id + ',#ProductId' + Id + ',#ProductDesc' + Id + ',#BatchSlNo' + Id + ',#Discount' + Id + ',#StockQty' + Id + ',#DiscountPerc' + Id).val('');
        $('#Tax' + Id).val($('#Tax' + Id).find('option:first').val()); TaxChange(Id);
        $('#DrugSchedule' + Id).val($('#DrugSchedule' + Id).find('option:first').val()); TaxChange(Id); 
        $('#TaxableAmt' + Id + ',#TaxAmt' + Id + ',#Cess' + Id + ',#CessAmount' + Id).val('');
    }
    else if (Flag == 2)         //Clear before Batch AutoComplete
    {
        $('#Quantity' + Id + ',#Amount' + Id + ',#Free' + Id + ',#Company' + Id + ',#Expiry' + Id + ',#SellPrice' + Id + ',#PurPrice' + Id + ',#BatchSlNo' + Id + ',#StockQty' + Id + ',#Discount' + Id + ',#DiscountPerc' + Id).val('');
        $('#Tax' + Id).val($('#Tax' + Id).find('option:first').val()); TaxChange(Id);
        $('#DrugSchedule' + Id).val($('#DrugSchedule' + Id).find('option:first').val()); TaxChange(Id);
        $('#TaxableAmt' + Id + ',#TaxAmt' + Id + ',#Cess' + Id + ',#CessAmount' + Id).val('');
    }
    else if(Flag == 3)        //Clear Split Tax Fields
    {
        $(".distxtbox").val(parseFloat(0).toFixed(Decimal));
    }
    else if (Flag == 4)        //Clear Discount Fields
    {
        $('#Discount,#Discountpercent').val('0.00');
    }
    else if (Flag == 5)        //Clear Procedure Fields
    {
        $('.proccls0').val('');      
        $('#ProcTax0').val($('#ProcTax0').find('option:first').val());
        ProcedTaxChange(0);
        IPPAtiemtSelect(0);
        $('#Procedure0').focus();
    }
    
}

function PopUpClose(Flag) {
    if (Flag == 1)
    { $("#productpdiv").modal("hide"); }
    else if (Flag == 2)
    { $("#TaxSpliPopup").modal("hide"); }
    else if (Flag == 3)
    { $("#myModal").modal("hide"); }
    else if (Flag == 4)
    { $('#TaxmsgDiv').fadeOut(); }
    else if (Flag == 5)
    {
        if (($('#CurEditId').val() || 0) != 0)
        {
            AddProcedureConfrm($('#CurEditId').val());
        }
        else {$('#ProcedurePopup').modal("hide"); }
    }
}

function DivHideShow(Flag) {
    if (Flag == 0)     // Last Purchase Transaction
    {
        $("#PurchaseTrans,#PurchaseStatusDiv").show();
        $("#SalesTrans,#SalesStatusDiv,#AllTrans,#AllStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product0').val() + '</span> : Last Purchase Transactions'));
    }
    else if (Flag == 1)     // Last Sales Transaction
    {
        $("#SalesTrans,#SalesStatusDiv").show();
        $("#PurchaseTrans,#PurchaseStatusDiv,#AllTrans,#AllStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product0').val() + '</span> : Last Sales Transactions'));
    }
    else if (Flag == 2)     // All Transaction
    {
        $("#AllTrans,#AllStatusDiv").show();
        $("#PurchaseTrans,#PurchaseStatusDiv,#SalesTrans,#SalesStatusDiv").hide();
        $("#PurchaseTransactionheader").html('<span style="color:red;">' + ($('#Product0').val() + '</span> : All Transactions'));
    }
    if (!($('#PurchaseTransactionPopup').is(':visible'))) {
        $("#PurchaseTransactionPopup").modal("show");
        $("#PurchaseTransactionPopup").appendTo("body");
    }
}

function PopUpShow(Flag)
{
    if(Flag==1)
    {
        $("#TaxSpliPopup").modal("show");
        $("#TaxSpliPopup").appendTo("body");
    }
    else if (Flag ==2) {             //Tax 0 MMsgShow
        $("#TaxmsgDiv").show();
    }
    else if (Flag == 3) {             //Procedure Show
        $("#ProcedurePopup").modal("show");
        $("#ProcedurePopup").appendTo("body");
        $('#Procedure0').focus().select();
    }
}

function Formrefreshconfirm(flg) {

  //  $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
    if (flg == 0)
    {
        var len = $('#TblSalesInvoice tr').length;
        if (len == 0) { formrefresh(0);}
        else { Callconfirm('Data will be lost.Do you want to Continue?', 'Refresh', 0); }
    }
}

function formrefresh(flg) {
    if (flg == 0)     //New Button click
    {
        RowCount = 1; Copyflag = 0; ProcCount = 1; ItemIdArray = [];

        $('.SlRow').remove();
        $("#PrescriptionInfoPopUp").fadeOut("slow");
        $('#btnprec').hide();
        $('.form-control:not(select,.dedisa)').val('');
        $('select:not(.Avoidfld)').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
        $('#HLocation').val(UserLocationId);
        $('#HSalesDate').val(CurDate);

        $('.form-control:not(.disb,.dedisa),#btnadd').prop('disabled', false);
        $('#HBillSeries').prop('disabled', false).removeClass('bgclrwhite ');

       // $('.form-control').css('background-color', '');
        $('.rdonl').addClass('bgclrwhite');
        $('#saleinv,#btnnew,#btnview,#btnadd,#btnsubmit,#btnlist,#BtnClearproc').show();
        $('#Copysales,#btnsaveedit,#btnprint,#btnedit,#btndelete,#btnacctran,#btnprec,#btnprecold').hide();
        $('select:not(.disb)').prop('disabled', false);

        ClearFields(3,0);
        BillLoad();
        LoadDate();
        Defaultfocus();
        CalcGrandTotal(0);
        roundoffcalcn(0);
        PopUpClose(1);
        IPPAtiemtSelect(0);
        CheckEOD();

        ClearFields(5, 0);
        $('.PRCRow').remove();
        ProcedureGrandTotalCalc(1);
        $('#HLocation').prop('disabled', false);
        SelectPayType();

        /*anu*/
        $('#ShowCreditBillPopUp').fadeOut('slow')
        $('#casualityInfoPopUp').fadeOut('slow')
        $('#UPISpecialFeeAmt').val(0);
        $('#SpecialFeeAmt').val(0);
        $('#BAmount').val(0);
        $("#custaddress1").val('')
    }
}

function Callconfirm(msg,status,flg) {   
  $('#confirm').show();
  $('#confirmOk').focus();
  $('#Confirmflag').val(status); $('#ConfirmRowId').val(flg); 
  $('#confirmmessage').text(msg);
}

function ConfirmboxResult(Result, status, rowid) {
    $('#confirmOk').prop('disabled', true);
    if (Result == 'true' && status == 'Refresh') {
        formrefresh(rowid);
    }
    else if (Result == 'true' && status == 'DeleteRow') {
        DeleteRow(1,rowid);
    }
    else if (Result == 'false') {
        Defaultfocus();
    }
    else if (Result == 'true' && status == 'SaveBill') {
        SaveAndUpdate(1);
    }
    else if (Result == 'true' && status == 'UpdateBill') {
        SaveAndUpdate(2);
    }
    else if (Result == 'true' && status == 'DeleteBill') {
        DeleteBill(0);
    }
    else if (Result == 'true' && status == 'copy') {
        BillCopy(rowid);
    }
    else if (Result == 'true' && status == 'view') {
        BillCopy(rowid);
    }
    $('#confirm').fadeOut();
    window.setTimeout(function () { $('#confirmOk').prop('disabled', false); }, 2000);
}

function Defaultfocus() {
    $('#HPatient').focus();
    if( Roundoff=='Yes')
    {        
        $("#roundoffstatus").prop("checked", true);
    }


}

function AskPrintSales(msg)
{
    $('#SaveText').text('');
    $('#SaveText').text(msg);
    $("#SavedAlert").modal("show");
    $("#SavedAlert").appendTo("body");
    $('#SavedAlert').on('shown.bs.modal', function () {
     $('#btnSavedOk').focus();
    })   
}

function SavePrintConfirm()
{
    $("#SavedAlert").modal("hide");
    PrintthisBillHospital('SALES', RowCount, 'SAVE');
    formrefresh(0);
}

function Showalerts(Status, BillNo) {
    if (Status == 1) {
        //formrefresh(0);
        //swal('BillNo - ' + BillNo, " Saved Successfully", "success");
        //$('.swal-button swal-button--info').focus();
        AskPrintSales('BillNo - ' + BillNo + ' Saved Successfully.Do you want to Print?');
    }
    else if (Status == 2) {
        //formrefresh(0);
        //swal('BillNo - ' + BillNo, " Updated Successfully", "success");
        //$('.swal-button swal-button--info').focus();
        AskPrintSales('BillNo - ' + BillNo + ' Updated Successfully.Do you want to Print?');
    }
    else if (Status == 3) {
        formrefresh(0);
        swal('BillNo - ' + BillNo, " Deleted!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 4) {
        swal('BillNo - ' + BillNo, " Not Exists!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 6) {
        swal('BillNo - ' + BillNo, " already exists", "warning");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 5) {
        swal('BillNo - ' + BillNo, " saving failed.Try again!", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 7) {
        swal('BillNo - ' + BillNo, " Closed", "error");
        $('.swal-button swal-button--info').focus();
    }
    else if (Status == 8) {
        swal('File Removed', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else  {
        swal('Same Bill No Found Please Check', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" class="form-control smallTextbox"  style="width:100%"  placeholder="' + title + '"/>')

    });


    var table = null;

    if (tablename == 'tbl_PIViewList') {

        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "autoWidth": false,
            "columnDefs": [
                            { "width": "40%", "targets": 4 },
            ],
            "order": [],
            "pageLength": -1,

        });
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
        });


    }
    else if (Type == 'MultipleAllTransaction') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            "columnDefs": [
                { "width": "6%", "targets": 0 },
                { "width": "6%", "targets": 1 },
                { "width": "5%", "targets": 2 },
                { "width": "30%", "targets": 3 },
                { "width": "5%", "targets": 4 },

            ],
            orderCellsTop: true,
            "order": [],
            autoWidth: false
        });

    }
    else if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,

        });

    }
    else {
        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
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
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
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

function GetTrans() {
    if (Copyflag == 1) {
        $("#CmnVoucherNo").val($("#HBillNoCopy").val());
        $("#CmnPref0").val("SI");
        $("#CmnPref1").val("");
        $("#CmnPref2").val("");
        $("#CmnPref3").val("");
        $("#CmnDeptId").val(ERPDeptId);
        $("#CmnUserId").val(ERPUserId);
        $("#CmnCondition").val("");
        CmnAccTransGet();
    }
}
//--------------------------End Common

function DateChange(DateX, Diff) {

    var DateY = DateX.split('/');
    var FormattedDate = DateY[2]+'-'+DateY[1]+'-'+DateY[0];

    var d = new Date(FormattedDate);
    d.setDate(d.getDate() + Diff);

    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yyyy = d.getFullYear();
    if (dd < 10) {dd = '0' + dd;}
    if (mm < 10) { mm = '0' + mm; }

    return (dd + '/' + mm + '/' + yyyy);

}




function Showoldprescription() {


    var data = {};
    data.RegSer = 1;
    data.RegNo = $('#HRegNo').val();
    data.HSalesDate = $("#PrescFromDate").val();
    data.Status = $("#PrescToDate").val();
    data.DeptId = ERPDeptId;
    data.Flag = 1;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_SalesRevisitGets",
        data: data,
        success: function (result) {           
            PreviousRevisitDetailsGets(result.oList);
            ShowPrescription()
        }
    });
}



function GetRevisitMedicines(RegSer,RegNo,Flag)
{

    $('#btnprecold').hide();
    if (Flag == 0) {
        $("#PrescFromDate").val(CurDate);
        $("#PrescToDate").val(CurDate);
        $("#PrescDate").prop("checked", true);
    }
    
    if ($("#PrescDate").prop("checked") == true) {
        Flag = 0;
    }
    else {
        Flag = 1;
    }

    var data = {};
    data.RegSer = RegSer;
    data.RegNo = RegNo;
    data.HSalesDate = $("#PrescFromDate").val();
    data.Status = $("#PrescToDate").val();
    data.DeptId = ERPDeptId;
    data.Flag = Flag;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_SalesRevisitGets",
        data: data,
        success: function (result) {
            if (result.oList[0].RegSer != 0) {
                $('#btnprecold').show();
            }

            if (result.oList.length > 1) {
                PreviousRevisitDetailsGets(result.oList);
            }
            else {
                $("#PrescriptionInfoPopUp").fadeOut("slow");
                $('#btnprec').hide();
            }
        }
    });
}

function PreviousRevisitDetailsGets(result) {

    $("#tbl_Prescription tr").remove();
    $("#Presc_0").prop("checked", true);
    $('.btnpresc').show();
    var slno=1
    var responseText = "";
    for (var i = 1; i < result.length; i++) {
        

        if (i == 1) {
            responseText += '<tr class="font-weight-normal">' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' +
                '<input type="checkbox" class="PrescBox" id="Presc_' + slno + '" checked />' +
                '</td>' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' + slno + '</td>' +
                '<td class="jsgrid-cell p-1" width="10%">' + result[i].Expiry + '</td>' +
                '<td class="jsgrid-cell p-1" width="8%" id="PresRevisit_' + slno + '">' + result[i].Flag + '</td>' +
                '<td class="jsgrid-cell p-1" width="8%">' + result[i].DelFlag + '</td>' +
                '<td class="jsgrid-cell p-1" width="24%">' + result[i].Variable1 + '</td>' +
                '<td class="jsgrid-cell p-1" width="40%">' + result[i].Batch + '</td>' +
                '</tr>';
        }

        else {
            responseText += '<tr class="font-weight-normal">' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' +
                '<input type="checkbox" class="PrescBox" id="Presc_' + slno + '" />' +
                '</td>' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' + slno + '</td>' +
                '<td class="jsgrid-cell p-1" width="10%">' + result[i].Expiry + '</td>' +
                '<td class="jsgrid-cell p-1" width="8%" id="PresRevisit_' + slno + '">' + result[i].Flag + '</td>' +
                '<td class="jsgrid-cell p-1" width="8%">' + result[i].DelFlag + '</td>' +
                '<td class="jsgrid-cell p-1" width="24%">' + result[i].Variable1 + '</td>' +
                '<td class="jsgrid-cell p-1" width="40%">' + result[i].Batch + '</td>' +
                '</tr>';
        }
        slno = parseInt(slno + 1);
    }
    $('#tbl_Prescription').html(responseText);

    
    $("#PrescriptionInfoPopUp").fadeIn("slow");
    $('#btnprec').show();
}

function ChangePrescBox() {
    if($("#Presc_0").prop("checked")==true)
    {
        $(".PrescBox").prop("checked", true);
    }
    else {
        $(".PrescBox").prop("checked", false);
    }
}

function ShowPrescription() {
   // $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
    if (!($('#PrescriptionModal').is(':visible'))) {
        $("#PrescriptionModal").modal("show");
        $("#PrescriptionModal").appendTo("body");
      

    }
}

function ngOnPrescription() {
    $("#PrescriptionModal").modal("hide");
    //$('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('show');
}


function ViewPrescription() {
  //  $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
    var RevisitData = '';
    var Count = $("#tbl_Prescription tr").length;

    for (var i = 1; i <= Count; i++) {

        if ($("#Presc_" + i).prop("checked") == true) {
            if (RevisitData == '') {
                RevisitData = $("#PresRevisit_" + i).text();
            }
            else {
                RevisitData = RevisitData + ',' + $("#PresRevisit_" + i).text();
            }
        }
    }
    if (RevisitData != '') {
        PrescriptionGets(RevisitData);
        ngOnPrescription();
    }
}


function GetPrescription() {
    var RevisitData = '';
    var Count = $("#tbl_Prescription tr").length;
    debugger;
    for (var i = 1; i <= Count; i++) {

        if ($("#Presc_" + i).prop("checked") == true) {
            if (RevisitData == '') {
                RevisitData = $("#PresRevisit_" + i).text();
                $('#HOpNo').val($("#PresRevisit_" + i).text());
            }
            else {
                RevisitData = RevisitData + ',' + $("#PresRevisit_" + i).text();
                $('#HOpNo').val($("#PresRevisit_" + i).text());
            }
        }
    }
    if (RevisitData != '') {
        PrescriptionGets(RevisitData);
        ngOnPrescription();
    }
}

function PrescriptionGets(RevisitData) {
    if (parseInt($("#HLocation").val() || 0) != 0) {
        var data = {};
        data.Status = RevisitData;
        data.HLocation = $("#HLocation").val();
        data.DeptId = 0;
        $.ajax({
            type: "POST",
            url: "../Hospital/HMS_SalesPrescriptionGets",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    PrescriptionLoad(result.oList);
                }
            }
        });
    }
    else {
        warningshow('Please Select Location', 'HLocation');
    }
}

function PrescriptionLoad(result) {

    $('#HLocation').val(result[0].HLocation);

    var LocnName = $('#HLocation option:selected').text();
    $('#btnprec').show();
    $('.SlRow').remove();

    var NoStock = 0; Prod = '';
    for (var i = 0; i < result.length; i++) {
        if (parseInt(result[i].Flag || 0) == 0) {
            if ($('.SlRow').length == 0) { RowCount = 1;}
            var Id = parseInt(RowCount); var SlNo = parseInt($('.SlRow').length) + 1;

            var COM = (result[i].Company).split("##");
            var ATool = "";
            
            //if (COM[1].length > 1) {
            //   // ATool = '<a style=""   href="#" data-toggle="tooltip" data-placement="left" title="' + COM[1] + '" class="tool_tip"></a>';
            //}

            var ProdRow =
                 '<tr class="jsgrid-header-row SlRow" id="SlRows' + Id + '" onfocusout=UpdateRow(0,' + Id + ') >' +
                '<td class="jsgrid-align-center crspnt" style="width:2%" onclick=DeleteRow(0,' + Id + ')>  <i class="icon-trash"></i></td>' +
                '<td class="jsgrid-align-center" style="width:3%" id="tdSl' + Id + '">' + SlNo + '</td>' +
                 '<td class="jsgrid-align-left" style="width:13%"><input type="text" class="form-control smallTextbox brnone bgclrwhite" id="Product' + Id + '" name="Product"  style="width:100%"  value="' + result[i].ProductDesc + '" onfocusout=UpdateRow(1,' + Id + ') disabled /></td>' +
                '<td class="jsgrid-align-left" align=center style="width:5%"><input type="text"  class="form-control smallTextbox brnone bgclrwhite" id="ProductDesc' + Id + '" name="ProductDesc"  style="width:100%"  value="' + result[i].Batch + '" onfocusout=UpdateRow(2,' + Id + ') disabled /></td>' +
                '<td class="jsgrid-align-center" align=center style="width:5%"> <input type="hidden"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Company' + Id + '"  style="width:100%"  value="' + COM[0] + '" readonly />' + COM[1]+'   </td>' +
                 '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Expiry' + Id + '"  style="width:100%"  value="' + result[i].Expiry + '" readonly /></td>' +
                '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Quantity" id="Quantity' + Id + '" onkeypress="isNumberInt(event, this)" onkeyup="ClearFields(4,0),AmountCalc(' + Id + ')"  style="width:100%"  value="' + result[i].Quantity + '" /></td>' +
                 '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass" name="Free" id="Free' + Id + '"     onkeypress="isNumberInt(event, this)" style="width:100%"  value="' + result[i].Free + '" /></td>' +
                 '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone Itemclass bgclrwhite" name="SellPrice" id="SellPrice' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),AmountCalc(' + Id + ')" disabled  style="width:100%"  value="' + parseFloat(result[i].SellPrice || 0).toFixed(Decimal) + '" /></td>' +
                 '<td class="jsgrid-align-right" style="width:4%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="PurPrice' + Id + '"  style="width:100%"  value="' + parseFloat(result[i].PurPrice || 0).toFixed(Decimal) + '" readonly /></td>' +

                '<td class="jsgrid-align-center" style="width:5%"><input type="text"  class="form-control smallTextbox brnone rdonl bgclrwhite" id="Amount' + Id + '"  style="width:100%"  value="0" readonly /></td>' +

                '<td class="jsgrid-align-center" style="width:8%">' +

                
                '<div class="input-group m-0">' +
                 '<input type="text"  class="form-control smallTextbox  Itemclass" name="Discount" id="DiscountPerc' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',0)"   style="width:50%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;"  value="' + (0).toFixed(Decimal) + '" />' +
                 '<input type="text"  class="form-control smallTextbox  Itemclass" name="Discount" id="Discount' + Id + '" onkeypress="isNumber(event, this)" onkeyup="ClearFields(4,0),DiscPecentCalc(' + Id + ',1)"   style="width:50%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;"  value="' + (0).toFixed(Decimal) + '" />' +
                 '</div>' +
                 '</td>' +
                 '<td class="jsgrid-align-center" style="width:6%"> <div class="input-group m-0"><select id="Tax' + Id + '" class="form-control smallTextbox Itemclass pl-0 IpTax" style="width:60%;border-radius:0px;border:none;border-right: 1px solid lightgrey!important;padding: 0;" onchange="TaxChange(' + Id + ')"> ' + TaxSelect + ' </select> <input type="text" id="TaxPercent' + Id + '" style="width:40%;border-radius:0px;border:none;border-left: 1px solid lightgrey!important;" class="form-control smallTextbox rdonl bgclrwhite Itemclass"  readonly> </div></td>' +
                 '<td class="jsgrid-align-right" style="width:5%"> <input type="text" id="TaxableAmt' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone"  readonly value="0"></td>' +
                 '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="TaxAmt' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone"  readonly value="0"></td>' +
                 '<td class="jsgrid-align-right" style="width:5%"><input type="text" id="CessAmount' + Id + '" class="form-control smallTextbox rdonl bgclrwhite Itemclass brnone" onkeypress="isNumberInt(event, this)" readonly value="0"></td>' +
                 '<td class="jsgrid-align-right" style="width:5%"><select id="DrugSchedule' + Id + '" class="form-control smallTextbox Itemclass brnone" name="DrugSchedule">' + DrugSchedule + '</select></td>' +
                 '<td class="jsgrid-align-center" style="width:5%;display:none">' +
                 '<input type="text" class="form-control" id="ProductId' + Id + '"  value="' + result[i].ProductId + '" />' +
                 '<input type="text" class="form-control" id="BatchSlNo' + Id + '"  value="' + result[i].BatchSlNo + '" />' +
                 '<input type="text" class="form-control" id="Cess' + Id + '"   value="' + result[i].Cess + '" />' +
                 '<input type="text" class="form-control" id="PHSNCode' + Id + '"   value="' + result[i].Variable3 + '" />' +
                 '<input type="text" class="form-control" id="HLocation' + Id + '"   value="' + $('#HLocation').val() + '" />' +
                 '<input type="text" class="form-control" id="StockQty' + Id + '"   value="0" />' +
                 '</td>' +
                 '</tr>';
            $('#TblSalesInvoice').append(ProdRow);
            $('#Tax' + Id).val(result[i].Tax);
            TaxChange(Id);
            $('#DrugSchedule' + Id).val(result[i].Drugschedule);
            RowCount++;
            $('.brnone').css('border', 'none');
            $('.brnone').css('border-radius', '0px');
            CalcGrandTotal(1);
            roundoffcalcn(0);
            LoadProduct(Id);
            LoadBatch(Id);
            ItemFocus();
            $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('show');

        }
        else {
            NoStock = 1;

            

            Prod = Prod+
                "<tr>" +
                "<td class='p-1'>" + result[i].ProductDesc + "</td>" +
                "<td class='p-1' align=center>" + parseFloat(result[i].Batch || 0) + "</td>" +
                "<td class='p-1' align=center>" + parseFloat(result[i].Batch - result[i].Quantity) + "</td>" +
                "<td class='p-1' align=center style='color:red;font-weight:bold;'>" + result[i].Quantity + "</td>" +
                "<td class='p-1'>" + LocnName + "</td>" +
                "</tr>";
    
        }

    }
    CalcDiscountSplitTax();


    if (NoStock == 1) {

       // $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('hide');
        $('#tblAlert tr').remove();
       if (!($('#Alertpopup').is(':visible'))) {
            $("#Alertpopup").modal("show");
            $("#Alertpopup").appendTo("body");
        }

       var StockTr = "<thead>" +
           "<tr>" +
           "<th colspan=5 class='text-center'><h2 style='color:red;font-weight:bold;'>Not Enough Quantity!</h2></th>" +
           "</tr>" +
           "<tr>" +
           "<th class='p-1' width='50%'>Description</th>" +
           "<th class='p-1 text-center'  width='10%'>Quantity</th>" +
           "<th class='p-1 text-center'  width='10%'>Stock</th>" +
           "<th class='p-1 text-center'  width='10%'>Shortage</th>" +
           "<th class='p-1'  width='20%'>Location</th>" +
           "</tr>" +
           "</thead><tbody>";

       $('#tblAlert').append(StockTr + Prod + '</tbody>');

        $("#btnokalert").focus();
    }

   
}

function CloseAlert() {
    $("#Alertpopup").modal("hide");
   // $('.tool_tip').tooltip({ trigger: 'manual' }).tooltip('show');
}
