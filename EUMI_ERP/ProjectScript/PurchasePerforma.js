//Global Variable Declaration

var i = 1; var x = 1; var TId = ""; var TaxSelect = ""; var LocationSelect = ""; var UnitSelect = ""; var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId;
var locn = ""; var unit = ""; var quantity = ""; var rate = ""; var disc = ""; var tax = ""; var taxper = ""; var FlagEdit = 0; var Invoice = 0;
var UnitFlag = 0; var UFlag = 0; var ProductFlag = 0; var Account = ""; var AccType = ""; var CreditAmt = ""; var DebitAmt = ""; var FlagCostEdit = 0;
var CopyFlag = 0; var NextPPNo = 0; var Z = 0; var CurrentCurrency = 0; var PONumber = ''; var jobrowid = ''; var jobrowcode = 0; var X = 0; var ULocId = UserLocationId;
var PerformaEditFlag = 0;
$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();
    var x = event.keyCode;
    if ((x > 111 && x < 124)) {
        if (x == 118) {                                                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            MonthwisePurchasepopuprefresh();
            $('#PendingPurchaseTransactionPopup').hide();
            LastSalesTransactions();
        }
        else if (x == 119) {                                               // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            MonthwisePurchasepopuprefresh();
            $('#PendingPurchaseTransactionPopup').hide();
            LastPurchaseTransactions();
        }
        else if (x == 120) {                                                // F9 :   All Transaction details Popup      
            MonthwisePurchasepopuprefresh();
            $('#PendingPurchaseTransactionPopup').hide();
            lastalltrans();
        }
        else if (x == 121) {                                                // F10 :   Monthwise details Popup     
            $('#PurchaseTransactionPopup').hide();
            $('#PendingPurchaseTransactionPopup').hide();
            $('#salestranspopupdiv').hide();
            $('#TransactionPopup').hide();
            $('#MonthwisePurchase').show();
            ProductPopuprefresh();
            MonthwisePurchasePopup($('#productId_0').val());;
        }
        else if (x == 123) {                                                // F12 :   Pending details Popup      
            MonthwisePurchasepopuprefresh();
            PendingPurchasespopup($('#productId_0').val());
            $('#PendingPurchaseTransactionPopup').show();
        }
        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }

    if (e.altKey && e.keyCode == 83) {                   //Alt+S     :   Save
        if (CopyFlag == 0) {
            $("#btnsubmit").click();
        }
        else {
            warningshow('Create New To Save');
        }
    }
    else if (e.altKey && e.keyCode == 67) {             //Alt+C     :   Copy
        if (CopyFlag == 0) {
            GetRows();
        }
    }
    else if (e.altKey && e.keyCode == 78) {             //Alt+N     :   New
        createnew();
    }

        //else if (e.altKey && e.keyCode == 89) {             //Alt+Y     :   Last Year Transactions

        //    LastYearTransactions();
        //}
    else if (e.keyCode == 27) {                         //ESC       :   Popup Close
        $('#FileUpload,#Uploaddiv').hide();
        popuprefresh();
        ClosePurTransPopup();
        ProductPopuprefresh();
        MonthwisePurchasepopuprefresh();
        CloseEnquiry();
        $('#PendingPurchaseTransactionPopup').hide();
        $('#purchaseViewForm').hide();
        CompareResultClose();
    }
        //Product Secondary Popup
    else if (e.altKey && e.keyCode == 51) {             //Alt+3     :   Last Purchase details Popup       


    }

    else if (e.altKey && e.keyCode == 49) {             //Alt+1    :   Last Sales details Popup       

    }
    else if (e.altKey && e.keyCode == 52) {         //Alt+4    :   All Transaction details Popup      

    }

});
$(document).ready(function () {
    //$('[data-toggle="tooltip"]').tooltip();
    $('#btnprint').hide();
    $('#btnUnloadprint').hide();
    var Decimal = 2;
    Serialnoload();
    GetLocation(0);
    GetUnit();
    GetTax();
    GetArea(0)
    GetCurrency(0);
    Terms(0);
    LoadProduct();

    $("#location").change(function (e) {
        $('#locn_0').val($('#location').val());
        var selectedValue = $(this).val();
    });

    $("#currency").change(function () {
        var selectedValue = $(this).val();
        $("#rate").val(parseFloat($(this).find("option:selected").attr("name")))
        CalcAmt();
        CalcGrandTotal(i);
    });

    $("#unit_0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit_0").val($(this).find("option:selected").attr("unitname"))
        if ($(this).find("option:selected").attr("unitname") == 'FOC') {
            UnitFlag = 1;
            $('#txtrate_0').val(0);
            CalcAmount(0);
        }
        else {
            UnitFlag = 0;
        }
    });

    $('#purchaseinvdate').val(CurDate);

    //Focus next element inside the form (text box)

    $('#purchaseinvoiceno1').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#purchasetype").focus();
        }

    });
    $("#purchaseinvoiceno").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 08) {
            formrefresh(1);
            $('#btnsubmit').prop("disabled", true);
            $('#purchaseinvoiceno').focus();

        }

    });
    $("#purchasetype").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#transfer').focus();
        }

    });
    $("#transfer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#suppliername').focus();
        }

    });
    $("#suppliername").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#supplierId').val() != 0) {
                e.preventDefault();
                $('#terms').focus();
            }
            else {
                warningshow('Select Valid Supplier', 'suppliername');
                return false;
            }
        }
        else {
            $('#supplierId').val(0);
        }

    });
    $("#purchaseinvdate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#terms').focus();
        }
    });
    $("#terms,#duedate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#location').focus();
        }

    });
    $("#location").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#placeofsupply').focus();
        }

    });
    $("#placeofsupply").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#shipdate').focus();
        }

    });
    $("#jobcode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#jobid').val() != 0) {
                e.preventDefault();
                $("#currency").focus();
            }
            else if ($('#jobid').val() == 0 && $("#jobcode").val() == '') {
                e.preventDefault();
                $('#currency').focus();
            }
            else if ($("#jobcode").val() != '') {
                warningshow('Select Valid Job', 'jobcode');
                return false;

            }
        }
        else {
            $('#jobid').val(0);
            $('#jobcodeid_0').val(0);
            $('#jobcode_0').val('');
        }

    });
    $("#jobcode_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }
        if (key == 08 || key == 46) {
            $('#jobcodeid_0').val(0);
        }

    });
    $('#shipdate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#currency").focus();
        }

    });
    $('#currency').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });
    $('#jobcode').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#product_0").focus();
        }

    });
    $('#rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });

    $("#product_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#productId_0').val() != 0) {
                $('#quantity_0').focus();
                $('#quantity_0').select();
            }
        }
        else {
            //$('#productId_0').val(0);
            if (key == 08 || key == 46) {
                $('#ProductLength').val('');
                ClearProductDetails();
                ProductPopuprefresh();
            }
        }

    });
    $("#locn_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#unit_0').focus();
        }

    });
    $("#unit_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_0').focus();
        }

    });

    $('#quantity_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtrate_0").focus();
            $("#txtrate_0").select();
        }

    });

    $('#txtrate_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#discount_0").focus();
            $("#discount_0").select();
        }

    });
    $('#discount_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tax_0").focus();
        }

    });
    $('#tax_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnadd").focus();
        }

    });


    $('#acctype').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#account").focus();
        }

    });
    $('#account').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#accountdescription").focus();
        }
        if (key == 08 || key == 46) {
            $('#accid').val(0);
        }

    });
    $("#otp").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#otpremarks').focus();
        }

    });
    $("#otpremarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncnclsave').focus();
        }

    });

    $('#accountdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#costamount").focus();
        }

    });
    $('#costamount').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnaddcost").focus();
        }

    });


    $('#LocationCode,#LocationName,#txtdesc,#txtcode,#txtname,#select_areagroup,#txt_code,#txt_cname,#txt_rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });

    $('#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btntermssave").focus();
        }

    });
    $('#LocationDescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnlocnsave").focus();
        }

    });
    $('#txtdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnareasave").focus();
        }

    });
    $('#txt_remark').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btncrncysave").focus();
        }

    });
    $('#ViewFromDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    $("#flip1").click(function () {
        $("#panel1").slideToggle("fast");
        $('#txtnotes').focus();
    });

    $("#terms").change(function () {
        var selectedValue = $(this).val();
        var terms = $(this).find("option:selected").attr("name");
        getdate(terms);
    });

});

function DeletePerforma() {
    $('#Confirmflag').val('performadelete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete this Performa ?')
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
}

function EditPerforma(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditPerforma(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();

}
function CheckEditPerforma(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Purchase Performa Edit- OTP , Performa No : ' + $("#purchaseinvoiceno").val();
        else if (Flag == 1)
            Operation = 'Purchase Performa Delete- OTP , Performa No : ' + $("#purchaseinvoiceno").val();

        var data = {};
        data.UserId = UId;
        data.OTP = $("#otp").val();
        data.Remarks = $('#otpremarks').val();
        data.Operation = Operation;
        data.DeptId = DepId;
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
            OKEditPerforma();
        }
        else if (Flag == 1) {
            DeleteThisPerforma();
        }

    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}

function OKEditPerforma() {
    PerformaEditFlag = 1;
    $('#OTPDiv').hide();
    $('#btnedit,#btnHistory').hide();
    $('#btnprint,#btnUnloadprint').hide();
    $('#btnsaveedit').show();
    $('#purchaseinv').show();

    $('#copypurchase,#btndelete').hide();
    $('.editds,#btnadd,#btnaddcost,#btncrncysave,#btncrncyclear').prop("disabled", false);

    $('#totdisc,#tottaxable,#tottax,#totcredit,#totdebit,#costdiff,#Discountpercent').prop("disabled", true);
    $('#invdiff').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#amount_0').prop("disabled", true);
    $('.butndis').prop("disabled", false);
    $('.jsgrid-button').prop('disabled', false);
    $('#accountdescription').val('Other Cost Against Purchase InvNo: ' + $('#purchaseinvoiceno').val())
    $("#btnExporttoExcel").hide();
    $('#CostCurrency,#CostCurrRate').prop("disabled", false);

    //for (var id = 1; id <= i; id++) {
    //    $('#unit_' + id).prop('disabled', false);
    //    $('#quantity_' + id).prop('disabled', false);
    //    $('#txtrate_' + id).prop('disabled', false);
    //    $('#discount_' + id).prop('disabled', false);
    //    $('#tax_' + id).prop('disabled', false);
    //    $('#locn_' + id).prop('disabled', false);
    //    $('#jobcode_' + id).prop('disabled', false);
    //}

    $('.costeditfields').prop('disabled', false);
}

function UpdatePurchasePerforma() {
    var r = parseFloat($('#rate').val());
    $("#rate").val(isNaN(r) ? 0 : r);

    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
        warningshow('Please Enter Performa Number', 'purchaseinvoiceno1');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select  Date', 'purchaseinvdate');
    }
    else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
        warningshow('Please Select Terms', 'terms');
    }

    else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
        $('#rate').select();
        warningshow('Enter Currency Rate', 'rate');
    }
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }
    else {

        $('#Confirmflag').val('ppupdate'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Update the Purchase Performa?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }
}
function UpdatePP() {
    $('#Loadingsave').show();
    var r = parseFloat($('#rate').val());
    $("#rate").val(isNaN(r) ? 0 : r);

    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
        warningshow('Please Enter Performa Number', 'purchaseinvoiceno1');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select  Date', 'purchaseinvdate');
    }
        //else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
        //    warningshow('Please Select Terms', 'terms');
        //}
        //else if (RateFlag == 1) {
        //    warningshow('Rate Must Be Greater Than Zero for all Items');
        //}
        //else if ($('#placeofsupply').val() == 0) {
        //    warningshow('Please Select Place of Supply', 'placeofsupply');
        //}
    else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
        $('#rate').select();
        warningshow('Enter Currency Rate', 'rate');
    }
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }

    else {                   //ajax code for insert and update to  controller
        $('#confirmOk').prop("disabled", true);
        $('#btnsubmit').prop("disabled", true);
        var tableleng = $('#tblpurchaseinvoice tr').length;
        var oArray = new Array();

        for (var d = 1; d <= i; d++) {
            var PPNo = $('#purchaseinvoiceno').val();
            var DONo = $('#purchaseinvoiceno1').val();
            var SupplierId = $('#supplierId').val();
            var PayType = 2;
            var PurchaseType = $('#purchasetype').val();
            var PPDate = $('#purchaseinvdate').val();
            var Terms = $('#terms').val();
            var DueDate = $('#duedate').val();
            var LocnId = $('#location').val();
            var PlaceOfSupply = $('#placeofsupply').val();
            var JobNo = $('#jobcode_' + d).val();
            var ShipDate = $('#shipdate').val();
            var CurrencyId = $('#currency').val();
            var CurrencyRate = $('#rate').val();
            var TotalDiscount = $('#totdisc').val();        //Foreign Currency
            var FCDiscount = $('#fcdiscount').val();        //Base Currency
            var TotalTaxable = $('#tottaxable').val();      //Foreign Currency
            var TotalTax = $('#tottax').val();              //Foreign Currency
            var GrandTotal = $('#GrandTotal').val();        //Foreign Currency
            var FCGrandTotal = $('#fcamount').val();        //Base Currency
            var FCTaxable = $('#fctaxable').val();          //Base Currency
            var FCTax = $('#fctax').val();                  //Base Currency
            var DepartmentId = DepId;
            var UserId = UId;
            var PPSubId = $('#SubId').val();
            var BatchSlno = 0;
            var Batch = '';
            var OrderId = $('#OrderId_' + d).val();
            var OrderSubId = $('#OrderSubId_' + d).val();
            var ItemId = $('#productId_' + d).val();
            var ItemCode = $('#product_' + d).val();
            var ItemDescription = $('#productdesc_' + d).val();
            var LocationId = $('#locn_' + d).val();
            var UnitId = $('#unit_' + d).val();
            var Quantity = $('#quantity_' + d).val();
            var Fraction = 1;
            var Rate = $('#txtrate_' + d).val();
            var BaseRate = $('#baserate_' + d).val();
            var Discount = $('#discount_' + d).val();
            var BaseDiscount = $('#basediscount_' + d).val();
            var TaxId = $('#tax_' + d).val();
            var TaxRate = $('#taxpercentage_' + d).val();
            var TaxableAmount = $('#txttaxable_' + d).val();
            var TaxAmount = $('#txttax_' + d).val();
            var TotalAmount = $('#amount_' + d).val();
            var BaseTaxable = $('#basetaxableamount_' + d).val();
            var BaseTax = $('#basetaxamount_' + d).val();
            var BaseAmount = $('#baseamount_' + d).val();        //Base Currency
            var Remarks = $('#txtnotes').val();
            var DeleteFlag = 1;
            var LPO = $('#lpo').val();
            var PONo = $('#PONo').val();

            if (!(typeof ItemCode == "undefined")) {
                oArray.push({
                    'PPNo': PPNo,
                    'DONo': DONo,
                    'SupplierId': SupplierId,
                    'PayType': PayType,
                    'PurchaseType': PurchaseType,
                    'PPDate': PPDate,
                    'Terms': Terms,
                    'DueDate': DueDate,
                    'LocnId': LocnId,
                    'PlaceOfSupply': PlaceOfSupply,
                    'JobNo': JobNo,
                    'ShipDate': ShipDate,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'FCDiscount': FCDiscount,
                    'TotalDiscount': TotalDiscount,
                    'TotalTaxable': TotalTaxable,
                    'TotalTax': TotalTax,
                    'GrandTotal': GrandTotal,
                    'FCTaxable': FCTaxable,
                    'FCTax': FCTax,
                    'FCGrandTotal': FCGrandTotal,
                    'Remarks': Remarks,
                    'DepartmentId': DepartmentId,
                    'UserId': UserId,
                    'PPSubId': PPSubId,
                    'BatchSlno': BatchSlno,
                    'Batch': Batch,
                    'ItemId': ItemId,
                    'ItemDescription': ItemDescription,
                    'ItemCode': ItemCode,
                    'LocationId': LocationId,
                    'UnitId': UnitId,
                    'Quantity': Quantity,
                    'Fraction': Fraction,
                    'Rate': Rate,
                    'BaseRate': BaseRate,
                    'Discount': Discount,
                    'BaseDiscount': BaseDiscount,
                    'TaxId': TaxId,
                    'TaxRate': TaxRate,
                    'TaxableAmount': TaxableAmount,
                    'TaxAmount': TaxAmount,
                    'TotalAmount': TotalAmount,
                    'BaseTaxable': BaseTaxable,
                    'BaseTax': BaseTax,
                    'BaseAmount': BaseAmount,
                    'OrderId': OrderId,
                    'DeleteFlag': DeleteFlag,
                    'LPO': LPO,
                    'OrderSubId': OrderSubId,
                    'PONo': PONo
                })

            }
        }

        if (oArray != "") {

            var data = {'PurchaseOrder': oArray };
            $.ajax({
                type: "POST",
                url: "../Purchase/PerformaEditandUpdate",
                data: data,
                success: function (result) {
                    $('#Loadingsave').hide();
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Pno = result.oList[i].PPNo;
                        var PDate = result.oList[i].PPDate;
                        var Jobno = result.oList[i].JobNo;
                        var CurrencyId = result.oList[i].CurrencyId;
                        var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status, Pno);
                    }
                }
            });
        }
        else {
            warningshow('No Products Added', 'product_0');
            $('#btnsubmit').prop("disabled", false);
        }

    }
}















function DeleteThisPerforma() {
    $('#OTPDiv').hide();
    //$('#Loading').show();
    var data = {};
    data.SlNo = $('#purchaseinvoiceno').val();
    data.DepartmentId = DepId;
    data.UserId = UId;
    $.ajax({
        type: "POST",
        url: "../Purchase/DeletePerforma",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            //$('#Loading').hide();
            Showalerts(status, slno);
        }
    });

}

function GetPerformaList() {
    // DescPophide();

    var dataPI = {};
    dataPI.FromDate = $('#ViewFromDate').val();
    dataPI.ToDate = $('#ViewToDate').val();
    dataPI.PurchaseDeptId = DepId;
    dataPI.DepartmentId = DepId;
    dataPI.UserId = UId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PerformaList",
        data: dataPI,
        success: function (result) {
            GetPPListView(result.oList);
        }
    });
}
function GetPPListView(result) {
    $('#ViewFromDate,#ViewToDate').prop("disabled", false);

    disable_datatable('tbl_PIViewList');

    $('#purchaseViewForm').show();
    var responseText = "<thead><tr><th>Sl#</th><th>Performa#</th><th>Date</th><th>Order#</th><th>Supplier</th><th>PType</th><th>Total Qty.</th><th>Grand Total</th><th>User</th></tr>" +
        "<tr><th> </th><th>Performa#</th><th>Date</th><th>Order#</th><th>Supplier</th><th>PType</th><th>Total Qty.</th><th>GrandTotal</th><th>User</th></tr></thead><tbody>";


    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr ondblclick="GetCopyofThisPERFORMA(' + result[l].InvoNo + ',' + result[l].DepartmentId + ',0)"><td style="" align="center">' + slno + '</td><td>' +
            result[l].InvoNo + '</td><td align="center">' +
            result[l].InvoDate + '</td><td>' +
            result[l].LPO + '</td><td>' +
            result[l].SupplierName + '</td><td>' +
            result[l].PurchaseType + '</td><td align="center">' +
            result[l].Quantity + '</td><td align="right">' +
            parseFloat(result[l].GrandTotal).toFixed(Decimal) + '</td><td>' +
            result[l].AccName + '</td></tr>'
    }

    $('#tbl_PIViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PIViewList', 'Multiple');

}


function GetCopyofThisPERFORMA(slno, dept, Print) {
    var data = {};
    data.PPNo = slno;
    data.DepartmentId = dept;
    $.ajax({
        type: "POST",
        url: "../Purchase/PerformaGetandGets",
        data: data,
        success: function (result) {
            formrefresh(1);

            PPGets(result.oList);
            $('#purchaseinv,#popupdiv,#jobpopupdiv,#PurchaseTransactionPopup,#productpdiv,#Enquirypopup').hide();
            $('#copypurchase').show();
            $('#btnExporttoExcel').show();
            $('#btnprvs').prop("disabled", false);
            $('#btnnxt').prop("disabled", false);

            //$('#tour1').show();
            $('.form-control').prop('disabled', true);
            $('#copypurchaseinvo').prop("disabled", false);
            $('.jsgrid-button').prop('disabled', true);
            $('#btnsubmit').prop("disabled", true);
            $('#fileUpload').hide();
            $('#upload,#btnformat').hide();
            $('#btnlist,#btnExporttoExcel,#btndelete,#btnprint,#btnnew,#btnUnloadprint').show();
            $('#btnadd').prop("disabled", true);
            $('#btncrncysave').prop("disabled", true);
            $('#btnaddcost').prop("disabled", true);
            $('.butndis').prop("disabled", true);
            $('#btnsubmit,#btnimport').hide();
            $('#copypurchaseinvo').focus();
            $('#copypurchaseinvo').select();
            $('#purchaseViewForm').hide();
        }
    });
}





function SavePP() {
    var r = parseFloat($('#rate').val());
    $("#rate").val(isNaN(r) ? 0 : r);

    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
        warningshow('Please Enter Performa Number', 'purchaseinvoiceno1');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select  Date', 'purchaseinvdate');
    }
    else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
        warningshow('Please Select Terms', 'terms');
    }
        //else if ($('#location').val() == 0) {
        //    warningshow('Please Select Location', 'location');
        //}
        //else if ($('#placeofsupply').val() == 0) {
        //    warningshow('Please Select Place of Supply', 'placeofsupply');
        //}
    else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
        $('#rate').select();
        warningshow('Enter Currency Rate', 'rate');
    }
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }
        //else if ($('#location').val() == 0) {
        //    warningshow('Please Select Location', 'location');
        //}
    else {

        $('#Confirmflag').val('ppsave'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save the Purchase Performa?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }
}

function ConfirmboxResult(Result, status, rowid) {


    if (Result == 'true' && status == 'deletegridrow') {
        detl(rowid)
    }
    else if (Result == 'true' && status == 'deletecostrow') {
        Costdel(rowid)
    }
    else if (Result == 'true' && status == 'createnew') {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'copy') {
        NextPPNo = parseInt($('#purchaseinvoiceno1').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#jobpopupdiv,#PurchaseTransactionPopup,#productpdiv,#Enquirypopup').hide();
        $('#copypurchase,#btndelete').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();


    } else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    else if (Result == 'true' && status == 'ppsave') {
        OKSavePP();
    }
    else if (Result == 'true' && status == 'performadelete') {
        EditPerforma(1);
    }
    else if (Result == 'true' && status == 'ppupdate') {
        $('#confirmOk').prop("disabled", true);
        UpdatePP();
    }
    $('#confirm').fadeOut();
}



function OKSavePP() {
    $('#Loadingsave').show();
    var r = parseFloat($('#rate').val());
    $("#rate").val(isNaN(r) ? 0 : r);

    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
        warningshow('Please Enter Performa Number', 'purchaseinvoiceno1');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select  Date', 'purchaseinvdate');
    }
        //else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
        //    warningshow('Please Select Terms', 'terms');
        //}
        //else if (RateFlag == 1) {
        //    warningshow('Rate Must Be Greater Than Zero for all Items');
        //}
        //else if ($('#placeofsupply').val() == 0) {
        //    warningshow('Please Select Place of Supply', 'placeofsupply');
        //}
    else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
        $('#rate').select();
        warningshow('Enter Currency Rate', 'rate');
    }
    else if ($('#jobcode').val() != '' && $('#jobid').val() == 0) {
        warningshow('Please Enter Valid Job No', 'jobcode');
    }
    else if ($('#product_0').val() != '') {
        warningshow('Product is not Added in Grid', 'product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('In Edit Mode-Please Update');
    }

    else {                   //ajax code for insert and update to  controller
        $('#confirmOk').prop("disabled", true);
        $('#btnsubmit').prop("disabled", true);
        var tableleng = $('#tblpurchaseinvoice tr').length;
        var oArray = new Array();

        for (var d = 1; d <= i; d++) {
            var PPNo = $('#purchaseinvoiceno').val();
            var DONo = $('#purchaseinvoiceno1').val();
            var SupplierId = $('#supplierId').val();
            var PayType = 2;
            var PurchaseType = $('#purchasetype').val();
            var PPDate = $('#purchaseinvdate').val();
            var Terms = $('#terms').val();
            var DueDate = $('#duedate').val();
            var LocnId = $('#location').val();
            var PlaceOfSupply = $('#placeofsupply').val();
            var JobNo = $('#jobcode_' + d).val();
            var ShipDate = $('#shipdate').val();
            var CurrencyId = $('#currency').val();
            var CurrencyRate = $('#rate').val();
            var TotalDiscount = $('#totdisc').val();        //Foreign Currency
            var FCDiscount = $('#fcdiscount').val();        //Base Currency
            var TotalTaxable = $('#tottaxable').val();      //Foreign Currency
            var TotalTax = $('#tottax').val();              //Foreign Currency
            var GrandTotal = $('#GrandTotal').val();        //Foreign Currency
            var FCGrandTotal = $('#fcamount').val();        //Base Currency
            var FCTaxable = $('#fctaxable').val();          //Base Currency
            var FCTax = $('#fctax').val();                  //Base Currency
            var DepartmentId = DepId;
            var UserId = UId;
            var PPSubId = $('#SubId').val();
            var BatchSlno = 0;
            var Batch = '';
            var OrderId = $('#OrderId_' + d).val();
            var OrderSubId = $('#OrderSubId_' + d).val();
            var ItemId = $('#productId_' + d).val();
            var ItemCode = $('#product_' + d).val();
            var ItemDescription = $('#productdesc_' + d).val();
            var LocationId = $('#locn_' + d).val();
            var UnitId = $('#unit_' + d).val();
            var Quantity = $('#quantity_' + d).val();
            var Fraction = 1;
            var Rate = $('#txtrate_' + d).val();
            var BaseRate = $('#baserate_' + d).val();
            var Discount = $('#discount_' + d).val();
            var BaseDiscount = $('#basediscount_' + d).val();
            var TaxId = $('#tax_' + d).val();
            var TaxRate = $('#taxpercentage_' + d).val();
            var TaxableAmount = $('#txttaxable_' + d).val();
            var TaxAmount = $('#txttax_' + d).val();
            var TotalAmount = $('#amount_' + d).val();
            var BaseTaxable = $('#basetaxableamount_' + d).val();
            var BaseTax = $('#basetaxamount_' + d).val();
            var BaseAmount = $('#baseamount_' + d).val();        //Base Currency
            var Remarks = $('#txtnotes').val();
            var DeleteFlag = 1;
            var LPO = $('#lpo').val();
            var PONo = $('#PONo').val();

            if (!(typeof ItemCode == "undefined")) {
                oArray.push({
                    'PPNo': PPNo,
                    'DONo': DONo,
                    'SupplierId': SupplierId,
                    'PayType': PayType,
                    'PurchaseType': PurchaseType,
                    'PPDate': PPDate,
                    'Terms': Terms,
                    'DueDate': DueDate,
                    'LocnId': LocnId,
                    'PlaceOfSupply': PlaceOfSupply,
                    'JobNo': JobNo,
                    'ShipDate': ShipDate,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'FCDiscount': FCDiscount,
                    'TotalDiscount': TotalDiscount,
                    'TotalTaxable': TotalTaxable,
                    'TotalTax': TotalTax,
                    'GrandTotal': GrandTotal,
                    'FCTaxable': FCTaxable,
                    'FCTax': FCTax,
                    'FCGrandTotal': FCGrandTotal,
                    'Remarks': Remarks,
                    'DepartmentId': DepartmentId,
                    'UserId': UserId,
                    'PPSubId': PPSubId,
                    'BatchSlno': BatchSlno,
                    'Batch': Batch,
                    'ItemId': ItemId,
                    'ItemDescription': ItemDescription,
                    'ItemCode': ItemCode,
                    'LocationId': LocationId,
                    'UnitId': UnitId,
                    'Quantity': Quantity,
                    'Fraction': Fraction,
                    'Rate': Rate,
                    'BaseRate': BaseRate,
                    'Discount': Discount,
                    'BaseDiscount': BaseDiscount,
                    'TaxId': TaxId,
                    'TaxRate': TaxRate,
                    'TaxableAmount': TaxableAmount,
                    'TaxAmount': TaxAmount,
                    'TotalAmount': TotalAmount,
                    'BaseTaxable': BaseTaxable,
                    'BaseTax': BaseTax,
                    'BaseAmount': BaseAmount,
                    'OrderId': OrderId,
                    'DeleteFlag': DeleteFlag,
                    'LPO': LPO,
                    'OrderSubId': OrderSubId,
                    'PONo': PONo
                })

            }
        }


        if (oArray != "") {

            var data = { 'PurchaseOrder': oArray };
            $.ajax({
                type: "POST",
                url: "../Purchase/PerformaInsertandUpdate",
                data: data,
                success: function (result) {
                    $('#Loadingsave').hide();
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Pno = result.oList[i].PPNo;
                        var PDate = result.oList[i].PPDate;
                        var Jobno = result.oList[i].JobNo;
                        var CurrencyId = result.oList[i].CurrencyId;
                        var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status, Pno);
                    }
                }
            });
        }
        else {
            warningshow('No Products Added', 'product_0');
            $('#btnsubmit').prop("disabled", false);
        }

    }

}
function Showalerts(Status, Pno) {

    if (Status == 1) {
        formrefresh(0);

        $('#tblpurchaseinvoice tr').remove();
        swal('Purchase Performa No-' + Pno + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        $('#tblpurchaseinvoice tr').remove();
        swal('Purchase Performa No-' + Pno + ' ', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        createnew();
        $('#tblpurchaseinvoice tr').remove();
        swal('Purchase Performa No-' + Pno + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else if (Status == 5) {
        swal('Purchase Performa No-' + Pno + ' Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Same Performa Number Already Exists For This Supplier', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

function GetRows() {
    CopyFlag = 1;
    var rowCount = document.getElementById('tblpurchaseinvoice').rows.length;
    if (rowCount == 0) {
        NextPPNo = parseInt($('#purchaseinvoiceno').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#jobpopupdiv,#PurchaseTransactionPopup,#productpdiv,#Enquirypopup').hide();
        $('#copypurchase').show();
        $('#btnExporttoExcel').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#fileUpload').hide();
        $('#upload,#btnformat').hide();
        $('#btnprint,#btnlist,#btnUnloadprint').show();
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnimport').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();

    }
    else {
        $('#Confirmflag').val('copy'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }

}

//Next and Previous of Current Invoice No Copy Function 

function GetBillPrevousornext(Value) {
    // $('#tour1').fadeOut();
    $('#Warningpopup').fadeOut();
    var PPNo = parseInt($('#purchaseinvoiceno').val() || 0);
    PPNo = PPNo + Value;
    //alert(PPNo)
    //alert(NextPPNo)
    if ((PPNo <= 0) || (PPNo >= NextPPNo)) {
        warningshow('Purchase Performa Number Not Valid', 'purchaseinvoiceno');
        return false;
    }
    else {
        $('#purchaseinvoiceno').val(PPNo);
        var data = {};
        data.PPNo = $('#purchaseinvoiceno').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PerformaGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                PPGets(result.oList);
                $('#btnnew').focus();
                $('.form-control').prop('disabled', true);
                $('#copypurchaseinvo').prop("disabled", false);
                $('.jsgrid-button').prop('disabled', true);
                $('#btnsubmit,#btnformat').hide();
                $('#btnlist,#btnExporttoExcel,#btndelete,#btnprint,#btnnew,#btnUnloadprint').show();

                $('#btnadd').prop("disabled", true);
                $('#btncrncysave').prop("disabled", true);
                $('#btnaddcost').prop("disabled", true);

            }
        });

    }

}

//Copy Function 

function PPGets(result) {
    if (result.length > 0) {
        $('#btnedit,#btnHistory').show();

        for (var n = 0; n < result.length; n++) {

            if (result[n].LPO != "") {
                $("#TransferNo").css("opacity", '100');
                $('#TransferNo').text('Order# :' + ' ' + result[n].LPO);
            }
            $('#purchaseinvoiceno1').val(result[n].DONo);
            $('#purchaseinvoiceno').val(result[n].PPNo);
            $('#copypurchaseinvo').val(result[n].DONo);
            $('#purchasetype').val(result[n].PurchaseType);
            $('#suppliername').val(result[n].SupplierName);
            $('#supplierId').val(result[n].SupplierId);
            $('#purchaseinvdate').val(result[n].PPDate);
            $('#terms').val(result[n].Term);
            $('#duedate').val(result[n].DueDate);
            $('#location').val(result[n].LocnId);
            $('#placeofsupply').val(result[n].PlaceOfSupply);
            $('#jobcode').val(result[n].JobCode);
            $('#shipdate').val(result[n].ShipDate);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(parseFloat(result[n].CurrencyRate));
            $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
            $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
            $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
            $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
            $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
            $("#fc").css("opacity", '100');
            $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
            $('#txtnotes').val(result[n].Remarks);
            if (result[n].LPO != 0) {
                $('#lpo').val(result[n].LPO);
            }
            if ($('#txtnotes').val() != '') {
                $('#panel1').show();
            }
            if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
                $("#fc").css("opacity", '0');
                $('#gndtotal').text(result[n].GrandTotal.toFixed(Decimal));
            }
            else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
                $("#fc").css("opacity", '100');
                $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
            }
            var no = $('#tblpurchaseinvoice tr').length + 1;
            var id = parseInt(n + 1)

            var bins = '';

            if (result[n].LocationId == 1) {
                if (result[n].BinA != '') { bins = bins + result[n].BinA; }
            }
            else if (result[n].LocationId == 2) {
                if (result[n].BinB != '') { bins = bins + result[n].BinB; }
            }
            else if (result[n].LocationId == 3) {
                if (result[n].BinC != '') { bins = bins + result[n].BinC; }
            }
            else if (result[n].LocationId == 4) {
                if (result[n].BinD != '') { bins = bins + result[n].BinD; }
            }
            else if (result[n].LocationId == 5) {
                if (result[n].BinE != '') { bins = bins + result[n].BinE; }
            }
            else if (result[n].LocationId == 6) {
                if (result[n].BinF != '') { bins = bins + result[n].BinF; }
            }
            else if (result[n].LocationId == 7) {
                if (result[n].BinG != '') { bins = bins + result[n].BinG; }
            }
            else if (result[n].LocationId == 8) {
                if (result[n].BinH != '') { bins = bins + result[n].BinH; }

            }
            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'>" +
                "<td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +
                "<td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +
                "<td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +
                "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='" + result[n].PoOrderid + "'><input type='hidden' id='productId_" + id + "' value='" +
               result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
               result[n].ItemCode + "'></td>" +
               "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' class='form-control' style='height:30px;background-color:white' disabled id='productdesc_" + id + "' value='" +
               result[n].ItemDescription + "'></td>" +
               "<td id='col_3' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
               LocationSelect + "</select></td>" +
               "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
               UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td>" +
               "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
               result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td>" +
               "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
               parseFloat(result[n].Rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='" + result[n].FCTax + "' ></td>" +
               "<td id='col_7' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
               parseFloat(result[n].Discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
               "<td id='col_8' class='jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
               parseFloat(result[n].TaxableAmount).toFixed(Decimal) + "' disabled></td>" +
               "<td id='col_9' class='jsgrid-cell jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
               TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
               parseFloat(result[n].TaxRate).toFixed(Decimal) + "></td>" +
               "<td id='col_10' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
               parseFloat(result[n].TaxAmount).toFixed(Decimal) + "'></td>" +
               "<td id='col_11' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
               parseFloat(result[n].TotalAmount).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + result[n].Amounts + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='" + result[n].TaxableAmounts + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='" + result[n].TaxAmounts + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td>" +
               "<td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
               + result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
               + result[n].JobCode + "'><input style='display:none' id=" + 'Bin' + id + " value=" + bins + "></td></tr>";
            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);
        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = result.length + 1;
        $('#btnformat').hide();
        CalcGrandTotal(id);
    }
    else {
        CheckeDeleted();
    }
}
function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'PP';
    datax.SlNo = $('#purchaseinvoiceno').val();
    datax.DepartmentId = DepId;
    datax.UserId = UId;
    $.ajax({
        type: "POST",
        url: "../Purchase/CheckDeletedPurchase",
        data: datax,
        success: function (result) {
            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            if (status == 1) {
                //$('#popupmessageInfo').text('Invoice No: ' + slno + ' Cancelled!!!');
                //$('#Infopopup').show();
                //setTimeout(function () { $('#Infopopup').hide(); }, 3000);

                swal('Purchase Performa-' + slno + ' ', "Cancelled!!!", "error");
                $('.swal-button swal-button--confirm').focus();
            }

        }
    });
}

function SearchPerforma() {
    if ($('#copypurchaseinvo').val() == '')
        warningshow('Please Select Performa', 'copypurchaseinvo');
    else
        PrintthisBillWindows('PERFORMA', i, 'COPY')
}

function PrintPerforma() {
    if ($('#copypurchaseinvo').val() == '')
        warningshow('Please Select Performa', 'copypurchaseinvo');
    else
        PrintthisBillWindows('UNLOADPERFORMA', i, 'COPY')
}
function Serialnoload() {
    var srlno = {};
    srlno.DeptId = DepId;

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
    //$('#purchaseinvoiceno1').val(result[0].PurchasePerforma);
    $('#purchaseinvoiceno').val(result[0].PurchasePerforma);
    $('#ImpTax').val(result[0].ImportPurTax);
    NextPPNo = parseInt(result[0].PurchasePerforma || 0);
}
function CheckPurchaseType() {
    if ($('#purchasetype').val() == 'Import') {
        $('#tax_0').val($('#ImpTax').val());
        $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"));
        if ($('#productId_0').val() != 0) {
            CalcAmount(0);
        }
    }
    else if ($('#purchasetype').val() == 'Local') {
        $('#tax_0').val(0);
        $("#taxpercentage_0").val('');
        if ($('#productId_0').val() != 0) {
            CalcAmount(0);
        }
    }
}

//Location Load Function

function GetLocation(id) {
    var data = {};
    data.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList, id);


        }
    });

}

function LocationLoad(result, a) {
    $("#location,#locn_0").empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#location,#locn_0").append(LocationSelect);
    //if (a == 0) {
    //    $('#location,#locn_0').val(ULocId);
    //}
    //else {
    $('#location').val(a);
    //}
}

//Unit Load Function

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
    $("#unit_0").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'unitname='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#unit_0").append(UnitSelect);
}

//Tax Load Function

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
    $("#tax_0").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#tax_0").append(TaxSelect);
}

//Place Of Supply Load Function

function GetArea(id) {
    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList, id);


        }
    });
}

function AreaLoad(result, a) {
    var DefaultArea = 0;
    $("#placeofsupply").empty();
    $("#placeofsupply").append("<option value='0'>-Place Of Supply-</option>");
    for (var i = 0; i < result.length; i++) {

        if (result[i].DefaultArea != 0) {
            DefaultArea = result[i].DefaultArea
        }
        $("#placeofsupply").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaCode + "</option>");
    }
    if (a == 0) {
        $('#placeofsupply').val(DefaultArea);
    }
    else {
        $('#placeofsupply').val(a);
    }
}
//Area Group Load Function

function GetAreaGroupselect(AreaGrpId) {
    var data = {};
    data.AreaGrpId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGroupGetandGets",
        data: data,
        success: function (result) {
            AreaGroupLoad(result.oList);

        }
    });

}

function AreaGroupLoad(result) {
    $("#select_areagroup").empty();
    $("#select_areagroup").append("<option value='0'>Select Group</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_areagroup").append("<option value='" + result[i].AreaGrpId + "'>" + result[i].AreaName + "</option>");
    }

}

//Currency Load Function

function GetCurrency(id) {

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/CurrencyGetandGets",
        data: data,
        success: function (result) {
            CurncyLoad(result.oList, id);
        }
    });
}

function CurncyLoad(result, a) {
    $("#currency").empty();
    var BaseCurrency = 0;

    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId
        }
        $("#currency").append("<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }

    $('#currency').val(BaseCurrency);
    $("#rate").val(parseFloat($("#currency").find("option:selected").attr("name")));
    if (a != 0) {
        $('#currency').val(a);
        $("#rate").val(parseFloat($("#currency").find("option:selected").attr("name")));
        CalcAmt();
    }
}

//Terms Load Function

function Terms(id) {
    var data = {};
    data.TermsId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/TermsGetandGets",
        data: data,
        success: function (result) {
            TermsLoad(result.oList, id);
        }
    });

}


function TermsLoad(result, a) {
    $("#terms").empty();
    $("#terms").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#terms").append("<option value='" + result[i].TermsId + "' name='" + result[i].Terms + "'>" + result[i].TermsDescription + "</option>");
    }
    if (a == 0) {
        $('#terms').val(0);
    }
    else {
        $('#terms').val(a);
        var terms = $("#terms").find("option:selected").attr("name");
        getdate(terms);
    }
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
function checkproduct() {
    var a = ($('#product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#productId_0').val(0);
    }

}
function Defaultfocus() {
    $('#purchaseinvoiceno1').focus();
}
function Productadd() {
    var Product = $("#product_0").val()
    var a = parseFloat($('#discount_0').val());
    var b = parseFloat($('#txtsubtotal_0').val());
    var c = parseFloat($('#txtrate_0').val());
    $("#discount_0").val(isNaN(a) ? 0 : a);
    $('#txtrate_0').val(isNaN(c) ? 0 : c);
    for (var p = 1; p <= i; p++) {
        if ($('#productId_' + p).val() == $('#productId_0').val())
            ProductFlag = 1;
    }
    if ($('#unit_0').find("option:selected").attr("unitname") == 'FOC') {
        UnitFlag = 1;
    }

    if (Product == "") {
        warningshow('Please Select Product', 'product_0');
        return false;
    }
    else if ($('#productId_0').val() == 0) {
        warningshow('Press Enter To Create New Product', 'addproductbtn');
        return false;
    }
    else if ($('#txtrate_0').val() == 0) {
        warningshow('Rate Cannot Be Zero', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
        //else if ($('#locn_0').val() == 0) {
        //    warningshow('Please Select Location', 'locn_0');
        //    return false;
        //}
    else if ($('#unit_0').val() == 0) {
        warningshow('Please Select Unit', 'unit_0');
        return false;
    }
    else if ($.trim($('#quantity_0').val()) == '' || $.trim($('#quantity_0').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_0');
        return false;
    }
    else if (UnitFlag == 1 && ($.trim($('#txtrate_0').val()) == '' || $('#txtrate_0').val() != 0)) {
        warningshow('Rate Must be 0 for Unit FOC', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }

    else if ($('#tax_0').val() == 0) {
        warningshow('Please Select Tax', 'tax_0');
        return false;
    }
    else if (a > b || parseFloat($('#amount_0').val()) < 0) {
        warningshow('Amount Cannot be Negative', 'discount_0');
        $('#discount_0').select();
        return false;
    }
    else if ($('#jobcodeid_0').val() == 0 && $('#jobcode_0').val() != '') {
        warningshow('Please Select Valid Job', 'jobcode_0');
    }
    else {

        if (ProductFlag == 1) {
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                ProductFlag = 0;
                return false;
            }
        }
        $('#prodappdiv').empty();
        $('#prodappdiv').append("<input type='text' id='product_0' class='form-control editds' style='height:65%;margin-left:1px' onkeypress='LoadProduct()' ><div class='input-group-append'><button class='btn btn-outline-primary' id='addproductbtn' type='button' style='height:65%' onclick=window.open('../Master/ItemMaster')>+</button></div>");

        var no = $('#tblpurchaseinvoice tr').length + 1;
        var id = parseInt(i)
        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
            $("#productId_0").val() + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' class='form-control' disabled style='height:30px;background-color:white'  id='productdesc_" + id + "' value='" +
            $("#productdesc_0").val() + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
            UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            parseInt($("#quantity_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#txtrate_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='" +
            parseFloat($("#baserate_0").val()).toFixed(Decimal) + "' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#discount_0").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            parseFloat($("#txttaxable_0").val()).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
            $("#taxpercentage_0").val() + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            parseFloat($("#txttax_0").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='" +
            parseFloat($("#txtsubtotal_0").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            parseFloat($("#amount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxableamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basediscount_0").val()).toFixed(Decimal) + "'></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + $("#jobcodeid_0").val() + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#jobcode_0").val() + "'></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_0').val());
        $('#unit_' + id).val($('#unit_0').val());
        $('#txtunit_' + id).val($('#txtunit_0').val());
        $('#locn_' + id).val($('#locn_0').val());
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        $('#proddiv1').animate({ scrollTop: 5000 }, 900);
        $('#proddiv2').animate({ scrollTop: 5000 }, 900);

        ClearProductRow();
        ProductPopuprefresh();
        i++;
        CalcGrandTotal(id);
        Product = '';
        UnitFlag = 0;
        ProductFlag = 0;
    }
}
function CalcGrandTotal(Id) {
    var GrandTotal = 0;
    $('#GrandTotal').val('')
    var TotalDiscount = 0;
    $('#totdisc').val('')
    var TotalTaxable = 0;
    $('#tottaxable').val('')
    var TotalTax = 0;
    $('#tottax').val('')
    var FCrate = parseFloat($('#rate').val() || 0);
    FCrate = isNaN(FCrate) ? 0 : FCrate;
    var FCAmount = 0;
    var FCtotdisc = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;


    $('#fcamount').val('')
    $('#fctaxable').val('')
    $('#fctax').val('')
    $('#fcdiscount').val('')

    for (var k = 1; k <= Id; k++) {
        var d = isNaN(parseFloat($('#discount_' + k).val() || 0)) ? 0 : parseFloat($('#discount_' + k).val() || 0);

        GrandTotal = GrandTotal + parseFloat($('#amount_' + k).val() || 0);
        TotalDiscount = TotalDiscount + d;
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxable_' + k).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttax_' + k).val() || 0);
        d = 0;
    }
    FCAmount = GrandTotal * FCrate;
    FCtotdisc = TotalDiscount * FCrate;
    FCtottaxable = TotalTaxable * FCrate;
    FCtottax = TotalTax * FCrate;

    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#totdisc').val(TotalDiscount.toFixed(Decimal));
    $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
    $('#tottax').val(TotalTax.toFixed(Decimal));
    $('#fcamount').val(FCAmount.toFixed(Decimal));
    $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
    $('#fctax').val(FCtottax.toFixed(Decimal));
    $('#fcdiscount').val(FCtotdisc.toFixed(Decimal));
    $('#fc').text(FCAmount.toFixed(Decimal));


    if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
        $("#fc").css("opacity", '0');
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
    }
    else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
        $("#fc").css("opacity", '100');
        $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
    }
}
//Edit Grid Function
function Editrow(RowId) {
    if (FlagEdit == 0) {
        FlagEdit = FlagEdit + 1;
        $('#row_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');
        locn = $('#locn_' + RowId).val();
        unit = $('#unit_' + RowId).val();
        quantity = $('#quantity_' + RowId).val();
        rate = $('#txtrate_' + RowId).val();
        disc = $('#discount_' + RowId).val();
        tax = $('#tax_' + RowId).val();
        taxper = $('#taxpercentage_' + RowId).val();
        jobrowid = $('#jobcodeid_' + RowId).val();
        jobrowcode = $('#jobcode_' + RowId).val();
        $('#edit_' + RowId).hide();
        $('#update_' + RowId).show();
        $('#locn_' + RowId).prop('disabled', false);
        $('#unit_' + RowId).prop('disabled', false);
        $('#quantity_' + RowId).prop('disabled', false);
        $('#txtrate_' + RowId).prop('disabled', false);
        $('#discount_' + RowId).prop('disabled', false);
        $('#tax_' + RowId).prop('disabled', false);
        $('#jobcode_' + RowId).prop('disabled', false);
        $('#locn_' + RowId).focus();
        CalcGrandTotal(i);
        Fnaddjobautocomplete(RowId)
    } else {
        warningshow('Update Edit Mode Row First');
    }
}

//Cancel Edit Grid Function

function CancelEdit(RowId) {
    FlagEdit = FlagEdit - 1;
    $('#row_' + RowId).children('td, th').css('background-color', 'white');
    $('#locn_' + RowId).val(locn);
    $('#unit_' + RowId).val(unit);
    $('#quantity_' + RowId).val(quantity);
    $('#txtrate_' + RowId).val(rate);
    $('#discount_' + RowId).val(disc);
    $('#tax_' + RowId).val(tax);
    $('#taxpercentage_' + RowId).val(taxper);
    $('#jobcodeid_' + RowId).val(jobrowid);
    $('#jobcode_' + RowId).val(jobrowcode);
    CalcAmount(RowId);
    CalcGrandTotal(i);
    $('#locn_' + RowId).prop('disabled', true);
    $('#unit_' + RowId).prop('disabled', true);
    $('#quantity_' + RowId).prop('disabled', true);
    $('#txtrate_' + RowId).prop('disabled', true);
    $('#discount_' + RowId).prop('disabled', true);
    $('#tax_' + RowId).prop('disabled', true);
    $('#jobcode_' + RowId).prop('disabled', true);
    $('#update_' + RowId).hide();
    $('#edit_' + RowId).show();
}

//Delete Grid Function

function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletegridrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?');

}
function detl(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row_' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#product_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;
        }
    }
    $('#product_0').focus();
    CalcGrandTotal(i);

}
//Update Grid Function

function UpdateRow(RowId) {
    if ($('#unit_' + RowId).find("option:selected").attr("unitname") == 'FOC') {
        UFlag = 1;
    }
    var a = parseFloat($('#discount_' + RowId).val()).toFixed(Decimal);
    var b = parseFloat($('#txtsubtotal_' + RowId).val()).toFixed(Decimal);
    var c = parseInt($('#quantity_' + RowId).val());
    var d = parseInt($('#demoqty_' + RowId).val());

    var e = parseFloat($('#txtrate_' + RowId).val()).toFixed(Decimal);
    $("#discount_" + RowId).val(isNaN(a) ? 0 : a);
    $('#txtrate_' + RowId).val(isNaN(e) ? 0 : e);

    //if ($('#locn_' + RowId).val() == 0) {
    //    warningshow('Press Select Location', '#locn_' + RowId);
    //    return false;
    //}
    //else
    if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        return false;
    }
    else if ($.trim($('#quantity_' + RowId).val()) == '' || $.trim($('#quantity_' + RowId).val()) == 0) {
        warningshow('Please Select Quantity', 'quantity_' + RowId);
        return false;
    }
    else if (UFlag == 1 && $('#txtrate_' + RowId).val() != 0) {
        warningshow('Rate Must be 0 for Unit FOC', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;

    }
    else if ($('#tax_' + RowId).val() == 0) {
        warningshow('Please Select Tax', 'tax_' + RowId);
        return false;
    }
        //else if ($('#discount_' + RowId).val() > 100) {
        //    warningshow('Discount Limit Exceeded', 'discount_' + RowId);
        //    $('#discount_' + RowId).select();
        //    return false;
        //}
    else if (parseFloat(a) > parseFloat(b) || parseFloat($('#amount_' + RowId).val()) < 0) {
        warningshow('Amount Cannot be Negative', 'discount_' + RowId);
        $('#discount_' + RowId).select();
        return false;
    }
    else if ($.trim($('#jobcode_' + RowId).val()) != '' && $('#jobcodeid_' + RowId).val() == 0) {
        warningshow('Enter A Valid Job ', 'jobcode_' + RowId);
        return false;
    }
    else {
        //if (d != 0 && c > d) {
        //    var result = confirm("Purchase Quantity is Greater than Order Quantity!.." + "\n" + "Do you want to Continue?")
        //    if (result == false) {
        //        return false;
        //    }
        //}
        if ($('#locn_' + RowId).val() != locn) {
            var Res = confirm('Location Changed!..Do You Want to Continue?');
            if (Res == false) {
                return false;
            }
        }
        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();
        FlagEdit = FlagEdit - 1;
        $('#row_' + RowId).children('td, th').css('background-color', 'white');
        var ratenum = parseFloat($("#txtrate_" + RowId).val());
        $("#txtrate_" + RowId).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#discount_" + RowId).val() || 0);
        $("#discount_" + RowId).val(disnum.toFixed(Decimal));

        $('#locn_' + RowId).prop('disabled', true);
        $('#unit_' + RowId).prop('disabled', true);
        $('#quantity_' + RowId).prop('disabled', true);
        $('#txtrate_' + RowId).prop('disabled', true);
        $('#discount_' + RowId).prop('disabled', true);
        $('#tax_' + RowId).prop('disabled', true);
        $('#jobcode_' + RowId).prop('disabled', true);

        CalcGrandTotal(i);

        locn = ""; unit = ""; quantity = ""; rate = "";
        disc = ""; tax = ""; taxper = "";
        UFlag = 0;
    }
}


//Calculation  Function for Both Amount Calculation in Grid and GrandTotal

function CalcAmt() {
    for (var m = 1; m <= i; m++) {
        CalcAmount(m)
    }
    CalcGrandTotal(i)
}


//Calculation  Function for Amount Calculation in Grid

function CalcAmount(row) {

    var quantity = parseFloat($('#quantity_' + row).val() || 0);
    var rate = parseFloat($('#txtrate_' + row).val() || 0).toFixed(Decimal);
    var discount = parseFloat($('#discount_' + row).val() || 0).toFixed(Decimal);
    rate = isNaN(rate) ? 0 : rate;
    discount = isNaN(discount) ? 0 : discount;
    var taxpercentage = parseFloat($("#taxpercentage_" + row).val() || 0);
    var currencyrate = parseFloat($("#rate").val() || 0);

    var tamount = parseFloat(quantity * rate)
    var taxableamount = parseFloat(tamount - discount)
    var taxamount = parseFloat(taxableamount * (taxpercentage / 100));
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));

    var atotalamount = totalamount.toFixed(Decimal)
    var baseamount = parseFloat(atotalamount * currencyrate);

    var ataxableamount = taxableamount.toFixed(Decimal)
    var basetaxableamount = parseFloat(ataxableamount * currencyrate);

    var ataxamount = taxamount.toFixed(Decimal)
    var basetaxamount = parseFloat(ataxamount * currencyrate);

    var adiscount = discount
    var basediscount = parseFloat(adiscount * currencyrate);

    var arate = rate
    var baserate = parseFloat(arate * currencyrate);


    $("#amount_" + row).val(totalamount.toFixed(Decimal));
    $("#txttaxable_" + row).val(taxableamount.toFixed(Decimal));
    $("#txttax_" + row).val(taxamount.toFixed(Decimal));
    $("#txtsubtotal_" + row).val(tamount.toFixed(Decimal));

    $("#baseamount_" + row).val(baseamount.toFixed(Decimal));
    $("#basetaxableamount_" + row).val(basetaxableamount.toFixed(Decimal));
    $("#basetaxamount_" + row).val(basetaxamount.toFixed(Decimal));
    $("#basediscount_" + row).val(basediscount.toFixed(Decimal));
    $("#baserate_" + row).val(baserate.toFixed(Decimal));

    if (row != 0) {
        CalcGrandTotal(i)

    }
}


//Calculation Of Grand Total (Base and FC) Function

function CalcGrandTotal(Id) {
    var GrandTotal = 0;
    $('#GrandTotal').val('')
    var TotalDiscount = 0;
    $('#totdisc').val('')
    var TotalTaxable = 0;
    $('#tottaxable').val('')
    var TotalTax = 0;
    $('#tottax').val('')
    var FCrate = parseFloat($('#rate').val() || 0);
    FCrate = isNaN(FCrate) ? 0 : FCrate;
    var FCAmount = 0;
    var FCtotdisc = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;


    $('#fcamount').val('')
    $('#fctaxable').val('')
    $('#fctax').val('')
    $('#fcdiscount').val('')

    for (var k = 1; k <= Id; k++) {
        var d = isNaN(parseFloat($('#discount_' + k).val() || 0)) ? 0 : parseFloat($('#discount_' + k).val() || 0);

        GrandTotal = GrandTotal + parseFloat($('#amount_' + k).val() || 0);
        TotalDiscount = TotalDiscount + d;
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxable_' + k).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttax_' + k).val() || 0);
        d = 0;
    }
    FCAmount = GrandTotal * FCrate;
    FCtotdisc = TotalDiscount * FCrate;
    FCtottaxable = TotalTaxable * FCrate;
    FCtottax = TotalTax * FCrate;

    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#totdisc').val(TotalDiscount.toFixed(Decimal));
    $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
    $('#tottax').val(TotalTax.toFixed(Decimal));
    $('#fcamount').val(FCAmount.toFixed(Decimal));
    $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
    $('#fctax').val(FCtottax.toFixed(Decimal));
    $('#fcdiscount').val(FCtotdisc.toFixed(Decimal));
    $('#fc').text(FCAmount.toFixed(Decimal));


    if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
        $("#fc").css("opacity", '0');
        $('#gndtotal').text(GrandTotal.toFixed(Decimal));
    }
    else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
        $("#fc").css("opacity", '100');
        $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
    }
}


//Clear Product Row Function

function ClearProductRow() {

    $('#product_0').val('');
    $("#locn_0").val($("#location").val());
    $("#unit_0").val(0);
    $('#quantity_0').val('');
    $('#txtrate_0').val('');
    $('#discount_0').val('');
    if ($('#purchasetype').val() == 'Local') {
        $('#tax_0').val(0);
        $('#taxpercentage_0').val('');
    }
    else if ($('#purchasetype').val() == 'Import') {
        $('#tax_0').val($('#ImpTax').val());
        $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"))
    }
    $('#amount_0').val('');
    $('#baseamount_0').val('');
    $('#basetaxableamount_0').val('');
    $('#basetaxamount_0').val('');
    $('#basediscount_0').val('');
    $('#productId_0').val(0)
    $('#productdesc_0').val('')
    $('#txttaxable_0').val('');
    $('#txttax_0').val('');
    $('#txtsubtotal_0').val('');
    $('#product_0').focus();

    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }

}

//Clear Product Details Except Product Name

function ClearProductDetails() {

    $('#productId_0').val(0);
    $('#productdesc_0').val('');
    $('#unit_0').val(0);
    $('#txtrate_0').val('');
    if ($('#purchasetype').val() == 'Local') {
        $('#tax_0').val(0);
        $('#taxpercentage_0').val('');
    }
    else if ($('#purchasetype').val() == 'Import') {
        $('#tax_0').val($('#ImpTax').val());
        $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"))
    }
    $('#quantity_0').val('');
    $('#discount_0').val('');
    $('#amount_0').val('');
    $('#baseamount_0').val('');
    $('#basetaxableamount_0').val('');
    $('#basetaxamount_0').val('');
    $('#basediscount_0').val('');
    $('#txttaxable_0').val('');
    $('#txttax_0').val('');
    $('#txtsubtotal_0').val('');
    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }


}
function SearchSupplier() {
    if ($('#supplierId').val() != 0) {
        var data = {};
        data.DONo = $.trim($('#purchaseinvoiceno1').val());
        data.SupplierId = $('#supplierId').val();
        $.ajax({
            type: "POST",
            url: "../Purchase/SupplierDONoSearch",
            data: data,
            success: function (result) {

                var status = result[0].Flag
                Show(status)
            }
        });
    }
}
function SampleExcelFormat() {
    //var flname = '../PerfomaExcelFormat/Purchase Performa - Testing' + ".xlsx";
    window.open('../PerfomaExcelFormat/PerformaTesting' + ".xlsx", '_blank');
}

function Show(status) {
    if (status == 1) {
        warningshow('Same DO Number Already Exists For This Supplier ', 'purchaseinvoiceno1');
        $('.form-control,.jsgrid-button,#btnsubmit,#btnadd,#btnlist').prop('disabled', true);
        $('#purchaseinvoiceno1').prop("disabled", false);
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno1').focus();
    }
    else if (status == 0) {

        $('.editds,.jsgrid-button,#btnsubmit,#btnadd,#btnlist').prop('disabled', false);
        $('#purchaseinvoiceno1,#transfer,#lpo').prop("disabled", false);
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno').prop("disabled", true);
        $('#invdiff').prop("disabled", true);
        $('#taxpercentage_0').prop("disabled", true);
        $('#amount_0').prop("disabled", true);
    }
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}
//For Save Currency Function

function SaveCurrency(Flag) {
    var rate = parseFloat($('#txt_rate').val()).toFixed(Decimal)
    rate = isNaN(rate) ? 0 : rate;
    if ($('#txt_code').val() == "") {
        warningshow('Please Enter Code', 'txt_code');
    }
    else if ($('#txt_cname').val() == "") {
        warningshow('Please Enter Name', 'txt_cname');
    }
    else if (rate == 0) {
        warningshow('Please Enter Rate', 'txt_rate');
    }
    else {
        var data = {};   //array
        data.Id = $('#CrncyId').val();
        data.CurrencyCode = $('#txt_code').val();
        data.CurrencyName = $('#txt_cname').val();
        data.CurrencyRate = rate;
        data.Remarks = $('#txt_remark').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/CurrencyInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].Id;
                    Showalertsthis(status);
                    GetCurrency(id);
                    $('#rate').val(data.CurrencyRate);
                }
            }

        });

    }
}

//For Save Area Function

function SavePlace(Flag) {
    if ($('#txtcode').val() == "") {
        warningshow('Please Enter Code', 'txtcode');
    }
    else if ($('#txtname').val() == "") {
        warningshow('Please Enter Name', 'txtname');
    }
    else if ($('#select_areagroup').val() == "0") {
        warningshow('Please Select Group', 'select_areagroup');
    }
    else {
        var data = {};   //array
        data.AreaId = $('#AreaId').val();;
        data.AreaName = $('#txtname').val();
        data.AreaGrpId = $('#select_areagroup').val();
        data.AreaCode = $('#txtcode').val();
        data.Description = $('#txtdescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/AreaInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].AreaId;
                    Showalertsthis(status);
                    GetArea(id);
                }
            }
        });

    }


}

//For Save Location Function

function SaveLocation(Flag) {
    if ($('#LocationCode').val() == "") {
        warningshow('Please Enter Code', 'LocationCode');
    }
    else if ($('#LocationName').val() == "") {
        warningshow('Please Enter Name', 'LocationName');
    }
    else {
        var data = {};   //array
        data.LocationId = $('#LocationId').val();;
        data.LocationName = $('#LocationName').val();
        data.LocationCode = $('#LocationCode').val();
        data.LocationDescription = $('#LocationDescription').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Master/LocationInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].LocationId;
                    Showalertsthis(status);
                    GetLocation(id);
                }
            }
        });

    }


}

//For Save Terms Function

function SaveTerms(Flag) {
    if ($('#txtdesc').val() == "") {
        warningshow('Please Enter Description', 'txtdesc');
    }
    else if ($('#txtterms').val() == "") {
        warningshow('Please Enter Terms', 'txtterms');
    }
    else {
        var data = {};   //array
        data.TermsId = $('#TermsId').val();;
        data.Terms = $('#txtterms').val();
        data.TermsDescription = $('#txtdesc').val();
        data.DelFlag = Flag;

        $.ajax({
            type: "POST",
            url: "../Master/TermsInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var id = result.oList[i].TermsId;
                    Showalertsthis(status);
                    Terms(id);
                    var tms = data.Terms;
                    getdate(tms);
                }
            }
        });

    }


}

function Showalertsthis(Status) {
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

//Popup Show Function 

function Addpopupwindow(Id) {
    if (Id != 5 && Id != 6 && Id != 7) {
        $("#popupdiv").css("margin-top", '0px');
        $('#currencydiv').hide(); $('#areadiv').hide();
        $('#locationdiv').hide(); $('#salesmandiv').hide();
        $('#termsdiv').hide(); $('#popupdiv').show();
    }
    if (Id == 1) {                                                  //For Terms Popup
        $('#myheader').text('Terms');
        $('#termsdiv').show();
        $('#txtdesc').focus();
    }
    else if (Id == 2) {                                             //For Location Popup
        $('#myheader').text('Location');
        $('#locationdiv').show();
        $('#LocationCode').focus();
    }
    else if (Id == 3) {
        GetAreaGroupselect(0);                                      //For Area Popup
        $('#myheader').text('Area');
        $('#areadiv').show();
        $('#txtcode').focus();
    }
    else if (Id == 4) {                                             //For Currency Popup
        $('#myheader').text('Currency');
        $('#currencydiv').show();
        $('#txt_code').focus();

    }

}
//On Change of Tax

function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#taxpercentage_" + TId).val($(selectObject).find("option:selected").attr("name"))
    CalcAmount(TId);

}
//Calculation Of DueDate
function ChangeInvDate() {

    var terms = $("#terms").find("option:selected").attr("name");
    getdate(terms);
}
function getdate(terms) {
    if ($('#terms').val() != 0) {
        var Dt = $('#purchaseinvdate').val();
        var someDate = new Date(Dt.slice(6, 10) + '-' + Dt.slice(3, 5) + '-' + Dt.slice(0, 2));
        someDate.setDate(parseInt(someDate.getDate()) + parseInt(terms));
        var month = +someDate.getMonth() + 1;
        var day = someDate.getDate();

        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }

        newdate = day + "/" + month + "/" + someDate.getFullYear();
        $('#duedate').val(newdate);
    }
    else {
        $('#duedate').val(CurDate);
    }

}






//Product Default Popup

function CustPrdctLoad(result) {


    for (var n = 0; n < result.length; n++) {
        var custstat;
        if (result[n].LastSellingPrice == 0) {
            custstat = "LSP";
        }
        else {
            custstat = "LSP";
        }
        $('#productpdiv,#Infospopup').slideDown();

        //$("#qrt").animate({
        //    left: '50%',
        //    visible: 'show',

        //});

        $('#prodheader').text('Location Stock Details');
        $('#productdiv').show();

        var strr = result[n].Locationstock;
        var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
        var strr2 = strr1.replace(/#/gi, "&emsp;");

        //var ProdRow ="<tr class='jsgrid-row' id='pdctrow'>" +
        //    "<td style='border:none;font-weight:500'><b>C :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].AvgCost || 0).toFixed(Decimal)) + " style='height:30px;background-color:white;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>LP :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LPCost || 0).toFixed(Decimal)) + " style='background-color:white;height:30px;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>" + custstat + " :</b> <input type='text' disabled='' class='text-center' value=" + (parseFloat(result[n].LastSellingPrice || 0).toFixed(Decimal)) + "  style='background-color:white;height:30px;border:none'></td>" +
        //    "<td style='border:none;font-weight:500'><b>Stock :</b> <input type='text' disabled='' class='text-center' value=" + (result[n].Sumtotqty || 0) + " style='background-color:white;height:30px;border:none'></td>" + "</tr>" +
        //    "<tr class='jsgrid-row' id='pdctrow1'><td colspan=4 class='text-left' style='border:none'> " + strr2 + "</td ></tr>";


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

//Popup Refresh for Default Popup

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}


//For Close Purchase Transaction Popup

function ClosePurTransPopup() {
    $('#PurchaseTransactionPopup').hide();
    $('#purchasetrans').hide();
    for (var j = 1; j <= Z; j++) {
        $('#pid_' + j).remove();
    }

}

//For Popup Refresh(Add New Popups)

function popuprefresh() {
    $('#popupdiv').hide();
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#txt_code').focus();
    $('#CrncyId').val(0);

    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#txtcode').focus();
    $('#AreaId').val(0);

    $('#LocationName').val('');
    $('#LocationCode').val('');
    $('#LocationDescription').val('');
    $('#LocationCode').focus();
    $('#LocationId').val(0);

    $('#code').val('');
    $('#txt_fname').val('');
    $('#txt_lname').val('');
    $('#txt_amount').val('');
    $('#txt_contactnumber').val('');
    $('#txt_address1').val('');
    $('#txt_address2').val('');
    $('#txt_address3').val('');
    $('#SalesmanId').val(0);

    $('#txtterms').val('');
    $('#txtdesc').val('');
    $('#txtdesc').focus();
    $('#TermsId').val(0);
}

function PurchaseHistory(SlNo) {
    var data = {};
    data.Status = 'PP';
    data.SlNo = SlNo;
    data.DepartmentId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseHistoryGets",
        data: data,
        success: function (result) {
            if (result.dList.length > 0) {

                var History = '<table style="table-layout:fixed;">';

                if (result.dList[0].PINumber != '') History = History + '<tr><td>PI # &nbsp; </td><td> : </td><td>' + result.dList[0].PINumber + '</td></tr>';
                if (result.dList[0].Variable1 != '') History = History + '<tr><td>MRV # &nbsp; </td><td> : </td><td>' + result.dList[0].Variable1 + '</td></tr>';
                if (result.dList[0].Variable2 != '') History = History + '<tr><td>PP # &nbsp; </td><td> : </td><td>' + result.dList[0].Variable2 + '</td></tr>';
                if (result.dList[0].PONo != '') History = History + '<tr><td>PO # &nbsp; </td><td> : </td><td>' + result.dList[0].PONo + '</td></tr>';
                if (result.dList[0].LPO != '') History = History + '<tr><td>PE # &nbsp; </td><td> : </td><td>' + result.dList[0].LPO + '</td></tr>';

                History = History + '</table>'

                $('#txthistory').html(History);
                $('#txthistory').show();
                $('#PurchaseHis_Div').slideDown(400);
            }
        }
    });
}















function formrefresh(RefreshFlag) {
    
    $('#btnedit,#btnHistory').hide();
    $('#btnsaveedit').hide();
    $('#tblOrderDetails tr').remove();
    var file = document.getElementById("fileUpload");
    file.value = file.defaultValue;
    //$('#tblpurchaseinvoice tr').remove();
    $('#copypurchaseinvo').val('');
    $('#purchaseinvoiceno1').val('');
    //$('#tour1').hide();
    $('#paytype').val(2);
    $('#purchasetype').val('Local');
    $('#transfer').val(0);
    $('#supplierId').val(0);
    $('#suppliername').val('');
    $('#purchaseinvdate').val(CurDate);
    $('#duedate').val(CurDate);
    $('#shipdate').val(CurDate);
    $('#terms').val(0);
    $('#location').val(0);
    $('#fcamount').val('');
    $('#fctaxable').val('');
    $('#fctax').val('');
    $('#fcdiscount').val('');
    $('#PPONo').val('');
    $('#rate').val('');
    $('#jobcode').val('');
    $('#jobid').val(0);
    $('#product_0').val('');
    $('#btndelete').hide();
    $('#locn_0').val(0);
    $('#unit').val(0);
    $('#quantity').val('');
    $('#txtrate').val('');
    $('#discount').val('');
    $('#SupInvoTotal').val('');
    $('#tax').val(0);
    $('#taxpercentage').val('');
    $('#txtnotes').val('');
    $("#panel1").hide();
    $('#disc').val('');
    $('#basedisc').val('');
    $('#totdisc').val('0.00');
    $('#tottaxable').val('0.00');
    $('#tottax').val('0.00');
    $('#GrandTotal').val('');
    $('#invdiff').val('');
    $('#taxamount').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    $('#TransferNo').text('TransferNo');
    $("#TransferNo").css("opacity", '0');
    for (var k = 1; k < i; k++) {
        $('#row_' + k).remove();
    }
    for (var k = 1; k < x; k++) {
        $('#costrow_' + k).remove();
    }
    $('#otrcost').val('');
    $('#totcredit').val('0.00');
    $('#totdebit').val('0.00');
    $('#costdiff').val('0.00');
    $('#totbasecredit').val('');
    $('#totbasedebit').val('');
    $('#costbasediff').val('');
    $('#btnformat').show();
    i = 1;
    x = 1;
    ClearProductDetails()
    Defaultfocus();

    $('#ProductLength').val();
    $('#suppliername').focus();
    $('#PPONo').prop("disabled", false);
    $('#lpo').prop("disabled", false);
    $('#confirmOk').prop("disabled", false);
    $('#btnsubmit').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#btncrncysave').prop("disabled", false);
    $('#btnaddcost').prop("disabled", false);
    $('#Warningpopup').fadeOut();
    $('#purchaseinvoiceno').prop("disabled", true);
    $('#invdiff').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#amount_0').prop("disabled", true);
    $('#totdisc,#tottaxable,#tottax').prop("disabled", true);
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#lpo').val('');
    $('#PONo').val('');
    if (RefreshFlag != 1) {
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist,#btnimport').show();
        $('#purchaseinv').show();
        $('#copypurchase').hide();
        Serialnoload();
        GetCurrency(0);
        GetArea(0);
        $('#purchaseinvoiceno').val('');
        CopyFlag = 0;
        $('#btnprint').hide();
        $('#btnUnloadprint').hide();
        $("#btnExporttoExcel").hide();
        // $('#tblpurchaseinvoice tr').remove();
    }
}

//Close Enquiry PopUP
function CloseEnquiry() {
    $('#Enquirypopup').hide();
    $('#Enquirydiv').hide();
    $('#OrderdivSup').hide(); $('#OrderdivSub').hide();

    $('#RowGetOrder,#RowGetOrder1').val('');

    PONumber = '';
    $('#tblEnquiry tr td').remove();

    $('#tblOrderSup tr td').remove(); $('#tblOrderSub tr td').remove();
}


//1st Transfer Popup 

function GetList(Id) {


    if ($('#transfer').val() == 0) {
        warningshow('Please Select Transfer Type', 'transfer');
        return false;
    }
    else {
        $('#Enquirydiv').hide();
        $('#Enquirydivcust').hide();
        $('#Enquirydivsup').hide();
        $('#Recalldiv').hide();

        if ($('#transfer').val() == 1) {

            if ($('#supplierId').val() == 0) {
                var data = {};
                data.SupplierId = 0;
                data.DepartmentId = DepId;
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PendingPurchaseOrderGets",
                    data: data,
                    success: function (result) {
                        CloseEnquiry()
                        $("#Enquirypopup").css("margin-top", '-50px');
                        $('#Enquirypopup').show();
                        $('#Enquiryheader').text('Pending Purchase Order');
                        $('#Enquirydiv').show();
                        ShowPOList(result.oList);

                    }
                });
            }
            else {
                var data = {};
                data.SupplierId = $('#supplierId').val();
                data.DepartmentId = DepId;
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PendingPurchaseOrderGets",
                    data: data,
                    success: function (result) {
                        CloseEnquiry()
                        $("#Enquirypopup").css("margin-top", '-50px');
                        $('#Enquirypopup').show();
                        $('#Enquiryheader').text('Pending Purchase Order');
                        $('#OrderdivSup').show();
                        ShowPOSupplierList(result.oList);

                    }
                });

            }
        }


    }
}

function ShowPOList(result) {
    disable_datatable('tblEnquiry');
    var responseText = "<thead><tr><th style='width:3px;'>SlNo#</th><th>Order No</th><th style='text-align:center;'>Order Date</th><th style='width:6%;'>Supplier Code</th><th>Supplier</th><th>Currency</th><th style='width:8%;'>Document Refrence</th><th  style='width:9%;'>Amount</th><th style='width:8%;text-align:center;'>Add</th></tr>" +
        "<tr><th  style='width:3px;'>SlNo#</th><th>OrderNo</th><th>Date</th><th style='width:6%;'>Code</th><th>Supplier</th><th>Currency</th><th style='width:8%;'>Reference</th><th  style='width:10%;text-align:center;'>Amount</th><th style='width:9%;'> </th></tr></thead><tbody>"; // For Search
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '>' +
           '<td style="width:3px;text-align:center;">' + slno + '</td>' +
           '<td>' + result[l].OrderNo + '</td>' +
           '<td style="text-align:center">' + result[l].OrderDate + '</td>' +
            '<td style="width:6%;">' + result[l].SupplierCode + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td><input type="hidden" id="Curr' + slno + '" value='
            + result[l].CurrencyId + '>'
            + result[l].CurrencyName + '</td>' +
           '<td style="width:8%;">' + result[l].DocRef + '</td>' +
           '<td style=text-align:right;width:9%;">' + parseFloat(result[l].BaseAmount || 0).toFixed(Decimal) + '</td>' +
           '<td style="text-align:center;width:8%;"><button class="btn white btn-round btn-primary" onclick="EditOrder(' + result[l].OrderNo + ')"> Add <i class="fa fa-plus-square"></i></button></td>' +
           '</tr>';
    }
    $('#tblEnquiry').html(responseText);
    datatableWithsearch('tblEnquiry', 'Single');


}


//List Enquiry Details Against Customer in Enquiry Popup table
function ShowPOSupplierList(result) {
    disable_datatable('tblOrderSup');
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoHeadCheck' 'custom-control-input cz-bg-image-display' onchange='SelectAllSupp()'>&nbsp;&nbsp;&nbsp;Select</th><th>SlNo#</th><th>Order No</th><th style='text-align:center;'>Order Date</th><th style='width:8%;'>Supplier Code</th><th>Supplier</th><th>Currency</th><th style='width:8%;'>Document Refrence</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>SlNo#</th><th>OrderNo</th><th>Date</th><th style='width:8%;'>Code</th><th>Supplier</th><th>Currency</th><th style='width:8%;'>Reference</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox"  checked  id=' + 'SlNoCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td>' +
             '<td>' + slno + '</td>' +
            '<td id=' + 'Ordercol' + slno + '>' + result[l].OrderNo + '<input type="hidden" id="OrderNo' + slno + '" value= ' + result[l].OrderNo + '></td>' +
           '<td style="text-align:center">' + result[l].OrderDate + '</td>' +
           '<td style="width:8%;">' + result[l].SupplierCode + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '<input type="hidden" id="Curr1' + slno + '" value=' + result[l].CurrencyId + '></td>' +
           '<td style="width:8%;">' + result[l].DocRef + '</td>' +
           '<td style=text-align:right>' + parseFloat(result[l].BaseAmount || 0).toFixed(Decimal) + '</td>' +
           '</tr>';
    }
    $('#tblOrderSup').html(responseText + '</tbody>');
    datatableWithsearch('tblOrderSup', 'Multiple');
    $('#RowGetOrder').val(result.length)
    $('#btnview').focus();
}


//OrderGet Function

function EditOrder(OrderNo) {
    if (OrderNo != 0) {

        CloseEnquiry();
        var data = {};
        data.OrderNo = OrderNo;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderGetandGets",
            data: data,
            success: function (result) {
                PurchaseOrderGets(result.oList);
            }
        });
    }

}

function SearchOrder(Flag) {
    if (Flag == 1) {
        var data = {};
        data.SupplierId = $('#OrderSupplierId').val();
        data.FromDate = $('#OrderFromDate').val();
        data.ToDate = $('#OrderToDate').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                CloseEnquiry()
                $("#Enquirypopup").css("margin-top", '-50px');
                $('#Enquirypopup').show();
                $('#Enquiryheader').text('Pending Purchase Order');
                $('#Enquirydiv').show();
                if ($('#OrderSupplierId').val() == 0) {
                    $('#OrderSupplier').val('');
                }
                ShowPOList(result.oList);

            }
        });
    }
    else if (Flag == 0) {

        $('#OrderFromDate').val(CurDate);
        $('#OrderToDate').val(CurDate);
        $('#OrderSupplierId').val(0);
        $('#OrderSupplier').val('');

        var data = {};
        data.SupplierId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                CloseEnquiry()
                $("#Enquirypopup").css("margin-top", '-50px');
                $('#Enquirypopup').show();
                $('#Enquiryheader').text('Pending Purchase Order');
                $('#Enquirydiv').show();
                ShowPOList(result.oList);

            }
        });
    }
}

function ClearOrder() {
    $('#OrderFromDate').val(CurDate);
    $('#OrderToDate').val(CurDate);
    $('#InvoiceFromDate').val(CurDate);
    $('#InvoiceToDate').val(CurDate);
    $('#OrderSupplierId').val(0);
    $('#OrderSupplier').val('');
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);
}

function BackOrder() {
    $('#OrderdivSub').hide();
    $('#OrderdivSup').show();
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);
}

function SearchorderSup(Flag) {
    if (Flag == 1) {

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = $('#InvoiceFromDate').val();
        data.ToDate = $('#InvoiceToDate').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                CloseEnquiry()
                $("#Enquirypopup").css("margin-top", '-50px');
                $('#Enquirypopup').show();
                $('#Enquiryheader').text('Pending Purchase Order');
                $('#OrderdivSup').show();
                ShowPOSupplierList(result.oList);

            }
        });
    }
    else if (Flag == 0) {
        $('#InvoiceFromDate').val(CurDate);
        $('#InvoiceToDate').val(CurDate);

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                CloseEnquiry()
                $("#Enquirypopup").css("margin-top", '-50px');
                $('#Enquirypopup').show();
                $('#Enquiryheader').text('Pending Purchase Order');
                $('#OrderdivSup').show();
                ShowPOSupplierList(result.oList);

            }
        });
    }

}

function SearchOrderSub(Flag) {
    if (Flag == 1) {
        var data = {};
        data.PONumber = PONumber;
        data.ItemId = $('#ProductPopUp1Id').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PerformaorderGetProduct",
            data: data,
            success: function (result) {
                if (PONumber != 0)
                    ShowItemGetOrder(result.oList);

            }
        });
    } else if (Flag == 0) {

        $('#ProductPopUp1Id').val(0);
        $('#ProductPopUp1').val('');

        var data = {};
        data.PONumber = PONumber;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PerformaorderGetProduct",
            data: data,
            success: function (result) {
                if (PONumber != 0)
                    ShowItemGetOrder(result.oList);

            }
        });
    }
}
//Order Gets

function PurchaseOrderGets(result) {

    i = 1;
    $("#tblpurchaseinvoice tr").remove();
    $('#tblpurchaseinvoice').show();
    for (var n = 0; n < result.length; n++) {
        if (result[n].Qty > 0) {
            $('#supplierId').val(result[n].SupplierId);
            $('#suppliername').val(result[n].SupplierName);
            $('#location').val(result[n].LocnId);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(result[n].CurrencyRate);
            $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
            $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
            $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
            $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
            $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
            $('#gndtotal').text('FC : ' + result[n].GrandTotal.toFixed(Decimal));
            $("#fc").css("opacity", '100');
            $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
            $('#terms').val(result[n].Terms);
            $('#shipdate').val(result[n].ExpectedDate);
            $('#lpo').val(result[n].OrderNo);
            $('#PONo').val(result[n].OrderNo);

            var no = $('#tblpurchaseinvoice tr').length + 1;
            var id = parseInt(n + 1)

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                        + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='OrderId_" + id + "' value='"
                        + result[n].OrderNo + "'><input type='hidden' id='OrderSubId_" + id + "' value='"
                        + result[n].PurchaseOrderSubId + "'><input type='hidden' id='productId_" + id + "' value='" +
                        result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                        result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' class='form-control' disabled style='height:30px;background-color:white'  id='productdesc_" + id + "' value='" +
                        result[n].ItemDescription + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                        LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
                        UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                        result[n].Qty + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                        parseFloat(result[n].Rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                        parseFloat(result[n].Discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                        parseFloat(result[n].TaxableAmount).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                        TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                        parseFloat(result[n].TaxRate) + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                        parseFloat(result[n].TaxAmount).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                        parseFloat(result[n].TotalAmount).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                        + result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                        + result[n].JobCode + "'></td></tr>";


            $('#tblpurchaseinvoice').append(ProdEditRow);

            $("#tblOrderDetails").append("<tr>" +
               "<td><input type='text' id='TempItemId_" + result[n].ItemId + "' value='" + result[n].ItemId + "'></td>" +
               "<td><input type='text' id='TempOrderId_" + result[n].ItemId + "' value='" + result[n].OrderNo + "'></td>" +
               "<td><input type='text' id='TempOrderSubId_" + result[n].ItemId + "' value='" + result[n].PurchaseOrderSubId + "'></td></tr>")

            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);
        }
    }


    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    $('#proddiv1').animate({ scrollTop: 5000 }, 900);
    i = parseInt(result.length) + 1;
    CalcAmt();

}



//View Popup of OrderView Button 

function ViewOrderWithSupplier() {
    var table = $("#tblOrderSup").DataTable();
    for (var h = 1; h <= 5; h++) {
        table.column(h).search('').draw();
    }

    PONumber = '';
    var row = $('#RowGetOrder').val();
    var CurrencyFlag = 0;


    for (var n = 1; n <= row; n++) {
        if ($("#SlNoCheck" + n).is(":checked")) {
            CurrentCurrency = $('#Curr1' + n).val();
            break;
        }
    }

    for (var d = 1; d <= row; d++) {
        if ($("#SlNoCheck" + d).is(":checked")) {
            if ($('#Curr1' + d).val() != CurrentCurrency) {
                CurrencyFlag = 1;
                break;
            }
            else
                continue;
        }
    }

    if (CurrencyFlag == 1) {
        warningshow('Select PO with Same Currency');
    }
    else {
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheck" + m).is(":checked")) {

                if (PONumber == '') {
                    PONumber += $('#OrderNo' + m).val();

                }
                else {
                    PONumber += ',' + $('#OrderNo' + m).val();
                }

            }
        }
        if (PONumber != '') {
            var data = {};
            data.PONumber = PONumber;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PerformaorderGetProduct",
                data: data,
                success: function (result) {
                    if (PONumber != 0)
                        ShowItemGetOrder(result.oList);

                }
            });
        }
    }

}

//table based on PO Number
function ShowItemGetOrder(result) {
    disable_datatable('tblOrderSub');
    $('#OrderdivSup').hide();
    $('#OrderdivSub').show();

    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadOrderItem' onchange='SelectAllOrderItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amt.</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if (result[l].Quantity != 0) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckOrderItem' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
                result[l].OrderNo + '<input type="hidden" id="ORId' + slno + '" value=' +
                result[l].OrderNo + '><input type="hidden" id= ' + 'Ordersub' + slno + ' value= ' +
                result[l].PurchaseOrderSubId + '></td><td id=' + 'Product' + slno + '>' +
                result[l].ItemCode + '<input type="hidden" id= ' + 'ProductIdgrid' + slno + ' value= ' +
                result[l].ItemId + '></td><td id=' + 'Des' + slno + '>' +
                result[l].ItemDescription + '<input type="text" style="display:none;" id= ' + 'locnid' + slno + ' value= ' +
                result[l].LocationId + '></td><td id=' + 'UnitName' + slno + '>' +
                result[l].UnitName + '<input type="text" style="display:none;" id= ' + 'UnitIdgrid' + slno + ' value= ' +
                result[l].UnitId + '></td><td id=' + 'qty' + slno + '>' +
                parseInt(result[l].Quantity) + '<input type="hidden" id="qty_' + slno + '" value=' +
                result[l].Quantity + '></td><td id=' + 'rate' + slno + '>' +
                parseFloat(result[l].Rate).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' +
                result[l].Rate + '></td><td id=' + 'discount' + slno + '>' +
                parseFloat(result[l].FCDiscount).toFixed(Decimal) + '<input type="hidden" id="dis_' + slno + '" value=' +
                result[l].FCDiscount + '><input type="text" style="display:none;" id= ' + 'taxid' + slno + ' value= ' +
                result[l].TaxId + '><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' +
                result[l].TaxRate + '><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' +
                result[l].FCTaxable + '></td></td><td id=' + 'taxamt' + slno + '>' +
                parseFloat(result[l].FCTax).toFixed(Decimal) + '<input type="hidden" id="taxamt_' + slno + '" value=' +
                result[l].FCTax + '></td><td style="text-align:right;" id=' + 'total' + slno + '>' +
                parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
                result[l].TotalAmount + '><input type="hidden" id="Currid' + slno + '" value=' +
                result[l].CurrencyId + '><input type="hidden" id="currrate' + slno + '" value=' +
                parseFloat(result[l].CurrencyRate) + '><input type="hidden" id="jobid' + slno + '" value=' +
                result[l].JobNo + '><input type="hidden" id="jobcode' + slno + '" value=' +
                result[l].JobCode + '></td></tr>';
        }
    }
    $('#tblOrderSub').html(responseText + '</tbody>');
    datatableWithsearch('tblOrderSub', 'Multiple');
    $('#RowGetOrder1').val(result.length)
    $('#btnPrdctaddPO').focus();
}


//Adding datas in grid in main form from PO list
function OrderProductAdd() {
    var table = $("#tblOrderSub").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }
    i = 1;
    var P = [];
    var PO = [];
    var row = $('#RowGetOrder1').val();
    $("#tblpurchaseinvoice tr").remove();

    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckOrderItem" + m).is(":checked")) {

            var productIdgrid = $('#ProductIdgrid' + m).val();
            var Product = $('#Product' + m).text();
            var Des = $('#Des' + m).text();
            var locnid = $('#locnid' + m).val();
            var unitIdgrid = $('#UnitIdgrid' + m).val();
            var unit = $('#UnitName' + m).text();
            var qty = parseInt($('#qty_' + m).val() || 0);
            var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
            var discount = parseFloat($('#dis_' + m).val() || 0).toFixed(Decimal);
            var taxid = $('#taxid' + m).val();
            var taxrate = parseFloat($('#taxrate' + m).val() || 0).toFixed(Decimal);
            var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
            var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
            var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
            var ORId = $('#ORId' + m).val();
            var OrderSub = $('#Ordersub' + m).val();
            var jobid = $('#jobid' + m).val();
            var jobcode = $('#jobcode' + m).val();
            $('#currency').val($('#Currid' + m).val());
            $('#rate').val($('#currrate' + m).val());
            P[m] = ORId;
            P.forEach(function (value) {
                if (PO.indexOf(value) == -1) PO.push(value);
            });
            var no = $('#tblpurchaseinvoice tr').length + 1;
            var id = parseInt(i);

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                   + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='OrderId_" + id + "' value='"
                   + ORId + "'><input type='hidden' id='OrderSubId_" + id + "' value='"
                   + OrderSub + "'><input type='hidden' id='productId_" + id + "' value='" +
                   productIdgrid + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                   Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' class='form-control' disabled style='height:30px;background-color:white'  id='productdesc_" + id + "' value='" +
                   Des + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                   LocationSelect + "</select></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
                   UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                   qty + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ><input type='hidden' id='demoqty_" + id + "' value='" + qty + "'></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                   parseFloat(rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                   parseFloat(discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                   parseFloat(taxableamt).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                   TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                   parseFloat(taxrate) + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                   parseFloat(taxamt).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                   parseFloat(total).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                   + jobid + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                   + jobcode + "'></td></tr>";
            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#unit_' + id).val(unitIdgrid);
            $('#locn_' + id).val(locnid);
            $('#tax_' + id).val(taxid);
            i++;
            $("#tblOrderDetails").append("<tr>" +
                "<td><input type='text' id='TempItemId_" + productIdgrid + "' value='" + productIdgrid + "'></td>" +
                "<td><input type='text' id='TempOrderId_" + productIdgrid + "' value='" + ORId + "'></td>" +
                "<td><input type='text' id='TempOrderSubId_" + productIdgrid + "' value='" + OrderSub + "'></td></tr>")
        }

    }
    $('#lpo').val(PO);
    $('#PONo').val(PO);
    i = parseInt($('#tblpurchaseinvoice tr').length) + 1;
    CalcAmt();
    CurrentCurrency = 0;
    CloseEnquiry();
}


function SelectAllSupp() {

    var rowCount = $('#RowGetOrder').val();
    var flag = $("#SlNoHeadCheck").is(":checked")

    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheck" + i) != null) {
            document.getElementById("SlNoCheck" + i).checked = flag;
        }
    }

}

//selecting checkbox in PO Item List
function SelectAllOrderItem() {
    var rowCount = $('#RowGetOrder1').val();
    var flag = $("#SlNoHeadOrderItem").is(":checked")
    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckOrderItem" + i) != null) {
            document.getElementById("SlNoCheckOrderItem" + i).checked = flag;
        }
    }

}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo' || title == 'Code' || title == 'SlNo#' || title == 'Reference' || title == 'Amount') {
                $(this).html('<input type="text" class="form-control"  style="width:80px;"  placeholder="' + title + '"/>')
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
        if (tablename == 'tbl_PIViewList') {
            table = $('#' + tablename).DataTable({
                dom: 'tir',
                "columnDefs": [
                                { "width": "1%", "targets": 0 },
                                { "width": "3%", "targets": 1 },
                                { "width": "5%", "targets": 2 },
                                { "width": "8%", "targets": 3 },
                                { "width": "10%", "targets": 4 },
                                { "width": "3%", "targets": 5 },
                                { "width": "3%", "targets": 6 },
                                { "width": "5%", "targets": 7 },
                                { "width": "5%", "targets": 8 },


                ],
                orderCellsTop: true,
                "order": [],
                "pageLength": -1
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
            //  "pageLength": -1,
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
            // "pageLength": -1
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




function PendingPurchasespopup(ItemId) {
    var pending = 0;
    var Intransit = 0;
    if ($('#select_statuspending').prop("checked"))
        var s = 1;
    else
        var s = 0;

    $('#totalpending').text('');
    $('#pendingtransid').val(0);
    if ($('#productId_0').val() != 0) {

        disable_datatable('tblpendingpurchasetrans');


        var data = {};   //array
        data.ItemId = ItemId;
        data.Department = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = s;

        $.ajax({
            type: "POST",
            url: "../StockReport/PendingPurchaseOrderSQ",
            data: data,
            success: function (result) {

                var ProdRow = "<thead><tr><th>Order#</th><th class='text-center'>Date</th><th>Supplier</th><th>Performa#</th><th>Order Qty.</th><th>In transit Qty.</th><th>Received Qty.</th><th class='text-center'>Arrival Date</th><th style='text-align:right'>FC Cost</th><th>Currency</th><th style='display:none'></th></tr>" +
                                     "<tr><th>Order#</th><th class='text-center'>Date</th><th>Supplier</th><th>Performa#</th><th>Order Qty.</th><th>In transit Qty.</th><th>Received Qty.</th><th class='text-center'>Arrival Date</th><th style='text-align:right'>FC Cost</th><th>Currency</th><th style='display:none'></th></tr></thead><tbody>";

                if (result.length != 0) {

                    for (var p = 0; p < result.length; p++) {
                        if (SuppDetailsRight == 'Yes') {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                            "<td class='text-center'>" + result[p].OrderNo + "</td>" +
                            "<td class='text-center'>" + result[p].OrderDate + "</td>" +
                            "<td class='text-left'>" + result[p].Supplier + "</td>" +
                             "<td class='text-left'>" + result[p].Column1 + "</td>" +
                            "<td style='text-align:center' class='QtyColour'>" + result[p].OrderQty + "</td>" +
                           "<td style='text-align:center' class='QtyColour'>" + result[p].PerformaQty + "</td>" +
                           "<td style='text-align:center' class='QtyColour'>" + result[p].RecQty + "</td>" +
                            "<td style='text-align:center'>" + result[p].PerformaDate + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].FCCost).toFixed(Decimal) + "</td>" +
                            "<td class='text-left'>" + result[p].Currency + "</td>" +
                            "<td class='text-right' style='display:none'>" + parseFloat(result[p].PendingQty).toFixed(Decimal) + "</td></tr>";
                        }
                        else {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                            "<td class='text-center'>" + result[p].OrderNo + "</td>" +
                            "<td class='text-center'>" + result[p].OrderDate + "</td>" +
                            "<td></td>" +
                             "<td class='text-left'>" + result[p].Column1 + "</td>" +
                            "<td style='text-align:center' class='QtyColour'>" + result[p].OrderQty + "</td>" +
                            "<td style='text-align:center' class='QtyColour'>" + result[p].PerformaQty + "</td>" +
                            "<td style='text-align:center' class='QtyColour'>" + result[p].RecQty + "</td>" +
                            "<td style='text-align:center'>" + result[p].PerformaDate + "</td>" +
                            "<td></td>" +
                            "<td class='text-left'>" + result[p].Currency + "</td>" +
                            "<td class='text-right' style='display:none'>" + parseFloat(result[p].PendingQty).toFixed(Decimal) + "</td></tr>";
                        }
                        pending += parseFloat(result[p].PendingQty);
                        Intransit += parseFloat(result[p].PerformaQty);
                    }

                    $('#tblpendingpurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblpendingpurchasetrans', 'MultiplePurchaseT');
                    $('#tblpendingpurchasetrans').scrollTop(0);
                    $('#totalpending').text(pending);
                    $('#totalintransit').text(Intransit);

                }
                else {
                    $('#totalpending').text(0);
                    $('#totalintransit').text(0);
                    $('#tblpendingpurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblpendingpurchasetrans', 'MultiplePurchaseT');
                }


                $('#allpendingcheckboxdiv').show();
                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#salestransdiv').hide();
                $('#PurchaseTransactionPopup').hide();
                $("#PendingPurchaseTransactionPopup").css("margin-top", '0px');
                $('#PendingPurchaseTransactionPopup').show();
                var ProductDesc = $('#product_0').val();
                var product = $('#productdesc_0').val();
                $('#PendingPurchaseTransactionheader').text(ProductDesc + '(' + product + ')' + ' :  Pending Details');
                $('#pendingpurchasetrans').show();

            }
        });
    }

}

function ClosePendingPurTransPopup() {
    var Z = $('#tblpendingpurchasetrans tr').length;
    $('#PendingPurchaseTransactionPopup').hide();
    $('#pendingpurchasetrans').hide();
    for (var j = 1; j <= Z; j++) {
        $('#pid_' + j).remove();
    }
}



function LastPurchaseTransactions() {

    if ($('#select_status').prop("checked"))
        var s = 1;
    else
        var s = 0;

    $('#transid').val(0);
    if ($('#productId_0').val() != 0) {


        var data = {};   //array
        data.ItemId = $('#productId_0').val();
        data.DepartmentId = DepId;
        data.UserId = UId;
        data.Type = s;

        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseTransactionSearch",
            data: data,
            success: function (result) {

                Z = $('#transid').val();


                disable_datatable('tblpurchasetrans');

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                      "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>FC Cost</th><th>Cost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";


                for (var p = 0; p < result.length; p++) {
                    Z = p + 1;
                    var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                    var lpotr = '';
                    if (result[p].LPO != '0')
                        lpotr = result[p].LPO;

                    if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                        ProdRow = ProdRow + "<tr id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td>" + result[p].SupplierName + "</td>" +
                            "<td>" + result[p].AccName + "</td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +
                             "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                            "</tr>";
                    }
                    else {
                        ProdRow = ProdRow + "<tr id='pid_" + Z + "'>" +
                            "<td>" + result[p].InvoNo + "</td>" +
                            "<td>" + result[p].InvoDate + "</td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                            "<td style='text-align:right'>" + parseFloat(result[p].FCGrandTotal).toFixed(Decimal) + "</td>" +
                            "<td style='text-align:right'>" + a + "</td>" +
                            //"<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                            "<td>" + result[p].Locnname + "</td>" +
                            "<td>" + result[p].CurrencyName + "</td>" +
                            "<td>" + result[p].DeptName + "</td>" +
                            "<td>" + lpotr + "</td>" +
                             "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                            "</tr>";
                    }



                }
                $('#tblpurchasetrans').html(ProdRow + "</tbody>");

                $('#alltranscheckboxdiv').show();
                $('#alltranscheckboxdivsales,#alltranscheckboxdivPREV').hide();
                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#salestrans,#alltrans').hide();
                $("#PurchaseTransactionPopup").css("margin-top", '0px');
                $('#PurchaseTransactionPopup').show();
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Purchase Transactions   [ Average Cost : ' + parseFloat(result[0].Cost).toFixed(Decimal) + ']');
                $('#purchasetrans').show();
                $('#transid').val(Z)
                ProductPopuprefresh();
                datatableWithsearch('tblpurchasetrans', 'MultiplePurchaseT');

            }
        });
    }
}





function LastSalesTransactions() {

    $('#alltranscheckboxdiv,#alltranscheckboxdivPREV').hide();
    $('#alltranscheckboxdivsales').show();

    X = $('#salestransid').val();
    //for (var j = 1; j <= X; j++) {
    //    $('#sid_' + j).remove();
    //}

    if ($('#select_status_sales').prop("checked"))
        var s = 1;
    else
        var s = 0;


    $('#salestransid').val(0);
    if ($('#productId_0').val() != 0) {
        var data = {};   //array
        data.ProductId = $('#productId_0').val();
        data.DeptId = DepId;
        data.UserId = UId;
        data.type = s;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/SalesTransGetandGets",
            data: data,
            success: function (result) {

                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#purchasetrans,#alltrans').hide();
                $('#salestrans').hide();
                $("#PurchaseTransactionPopup").css("margin-top", '0px');
                $('#PurchaseTransactionPopup').show();
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Sales Transactions');
                $('#salestrans').show();
                SalesTransLoad(result);
            }
        });
    }

}

function SalesTransLoad(result) {
    //$('#tblsalestrans tr td').remove();

    disable_datatable('tblsalestrans');


    $('#salestransid').val(result.length)

    var ProdRow = "<thead><tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:15%'>Address</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Department</th></tr>" +
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:12%'>AccountName</th><th style='width:15%'>Address</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th>SalesMan</th><th style='width:7%'>LPO</th><th>Department</th></tr></thead><tbody>";


    for (var n = 0; n < result.length; n++) {

        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
                       "<td class='text-left'>" + result[n].CustName + "                                   </td>" +
                       "<td class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td class='text-right'>" + result[n].ProdQty + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left'>" + result[n].SalesMan + " </td>" +
                       //"<td style='width:15%'>" + result.oList[n].ProductDescr + " </td>" +
                       //"<td class='text-right'>" + parseFloat(result[n].Amount || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].LPONumber + "                                   </td>" +
                       "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                        "</tr>";



    }
    $('#tblsalestrans').html(ProdRow + "</tbody>");

    datatableWithsearch('tblsalestrans', 'MultipleSalesT');
}



function lastalltrans() {
    if ($('#productId_0').val() != 0) {
        $('#alltranscheckboxdiv,#alltranscheckboxdivsales').hide();
        $('#alltranscheckboxdivPREV').show();
        disable_datatable('tblalltrans');
        $('#tblalltrans tr').remove();
        $('#productpdiv').hide();
        $('#productdiv').hide();
        $('#purchasetrans,#salestrans').hide();
        $("#PurchaseTransactionPopup").css("margin-top", '0px');
        $('#PurchaseTransactionPopup').show();
        $('#alltrans').show();
        ALLTransactionPopup($('#productId_0').val());
    }
}





function ALLTransactionPopup(ItemId) {

    if ($('#select_status_PREV').prop("checked"))
        var s = 1;
    else
        var s = 0;

    var data = {};
    data.ItemId = ItemId;
    data.UserId = UId;
    data.DepartmentId = ERPDeptId;
    data.Type = s;
    $.ajax({
        type: "POST",
        url: "../Purchase/TransactionSearch",
        data: data,
        success: function (result) {
            if (result.length > 0) {
                disable_datatable('tblalltrans');


                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : All Transactions');


                $('#alltransdiv').show();
                var BalQty = parseInt(result[0].OpeningQty);


                var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                              "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";


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
                   "<td >" + result[n].TransType + " </td>" +
                   "<td >" + result[n].Salesman + " </td>" +
                   "<td >" + result[n].Status + "  </td>" +
                   "<td >" + result[n].AccountName + " </td>" +
                   "<td >" + result[n].Remarks + "  </td>" +
                   "<td class='text-right'>" + result[n].Quantity + " </td>" +
                   "<td class='text-right'>" + BalQty + "  </td>" +
                   "<td class='text-right'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                   "<td class='text-right'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                   "<td >" + result[n].Locnname + " </td>" +
                   "<td >" + result[n].DeptName + "  </td>" +
                   "<td >" + result[n].JobCode + " </td>" + "</tr>";

                }

                $('#tblalltrans').html(responseText + '</tbody>');
                datatableWithsearch('tblalltrans', 'MultipleAllTransaction');

                $('#alltransdiv').scrollTop(0);
            }
            else {
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : All Transactions');
                disable_datatable('tblalltrans');
                $('#tblalltrans tr').remove();
                var responseText = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr>" +
                                 "<tr><th>Bill Number</th><th> Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account</th><th>Remarks</th><th>Quantity</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Department</th><th>Job Code</th></tr></thead><tbody>";
                $('#tblalltrans').html(responseText + '</tbody>');
                datatableWithsearch('tblalltrans', 'Multiple');

            }
        }

    });
}




function MonthwisePurchasePopup(ItemId) {
    var data = {};
    data.ItemId = ItemId;
    data.Department = ERPDeptId;
    $.ajax({
        type: "POST",
        url: '../Purchaseandsalesreports/MonthwisePurchaseStockQuery',
        data: data,
        success: function (result) {
            $('#MonthwisePurchase').show();
            var ProductDesc = $('#ItemCode').val();
            var product = $('#ItemDescription').val();
            $('#MonthwisePurchaseheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Monthwise Details');
            $('#MonthwisePurchasediv').show();
            MonthwisePurchaseLoad(result);

            var data = {};
            data.ItemId = ItemId;
            data.Department = ERPDeptId;
            $.ajax({
                type: "POST",
                url: '../Purchaseandsalesreports/MonthwiseSalesStockQuery',
                data: data,
                success: function (result) {
                    MonthwiseSalesLoad(result);
                }
            });
        }
    });
}


function MonthwisePurchaseLoad(result) {

    $('#pdtrowcnt').val(result.length);
    for (var n = 0; n <= result.length; n++) {
        $('#pdctrow' + n).remove();
    }
    $('#tblMonthwisePurchase td').remove();
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
         "<td >" + result[n].Year + "                          </td>" +
        "<td >" + parseInt(result[n].Column1 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column2 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column3 || 0) + "      </td>" +
        "<td >" + parseInt(result[n].Column4 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column5 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column6 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column7 || 0) + "         </td>" +
         "<td >" + parseInt(result[n].Column8 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column9 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column10 || 0) + "        </td>" +
         "<td >" + parseInt(result[n].Column11 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column12 || 0) + "        </td>" +
          "<td >" + parseInt(result[n].Column13 || 0) + "       </td>" +
        "</tr>";

        $('#tblMonthwisePurchase').append(ProdRow);

    }
}

function MonthwiseSalesLoad(result) {

    $('#pdtrowcnt').val(result.length);
    for (var n = 0; n <= result.length; n++) {
        // $('#pdctrow' + n).remove();
    }
    $('#tblMonthwiseSales td').remove();
    for (var n = 0; n < result.length; n++) {

        var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
        "<td >" + result[n].Year + "                          </td>" +
        "<td >" + parseInt(result[n].Column1 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column2 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column3 || 0) + "      </td>" +
        "<td >" + parseInt(result[n].Column4 || 0) + "       </td>" +
         "<td >" + parseInt(result[n].Column5 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column6 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column7 || 0) + "         </td>" +
         "<td >" + parseInt(result[n].Column8 || 0) + "        </td>" +
        "<td >" + parseInt(result[n].Column9 || 0) + "         </td>" +
        "<td >" + parseInt(result[n].Column10 || 0) + "        </td>" +
         "<td >" + parseInt(result[n].Column11 || 0) + "       </td>" +
        "<td >" + parseInt(result[n].Column12 || 0) + "        </td>" +
          "<td >" + parseInt(result[n].Column13 || 0) + "       </td>" +
        "</tr>";

        $('#tblMonthwiseSales').append(ProdRow);

    }
}


function MonthwisePurchasepopuprefresh() {
    var pdtrowcnt = $('#pdtrowcnt').val();
    for (var n = 0; n <= pdtrowcnt; n++) {
        $('#pdctrow' + n).remove();
    }
    $('#MonthwisePurchase').hide();
    $('#MonthwisePurchasediv').hide();
    $('#MonthwisePurchaseheader').text('Transaction Details')
}
function createnew() {
    var rowCount = document.getElementById('tblpurchaseinvoice').rows.length;
    if (rowCount == 0 || CopyFlag == 1) {
        $('.form-control').prop('disabled', false);
        $('.jsgrid-button').prop('disabled', false);
        formrefresh(0);
        CopyFlag = 0;
    }
    else {
        $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will be Lost. Do you want to Continue?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }
}
var i; var a = "0.00"; var total = 0; var CopyFlag = 0; var InvoDate = ""; var JobId = 0; var x = 0; var EditFlag = 0;
//function Import(){
//    $("#customView").hide();
//    $('#FileUpload,#Uploaddiv').show();
//}
function Upload() {
    $("#customView").show();
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");

    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }

        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }

};

function ProcessExcel(data) {

    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    $('#popupdiv').show();
    $("#tblpurchaseinvoice1 tr").remove();
    //Add the data rows from Excel file.
    for (var i = 0; i < excelRows.length; i++) {
        if (excelRows[i]["ItemCode"] == undefined) { var ItemCode = '' } else { var ItemCode = excelRows[i]["ItemCode"] }
        if (excelRows[i]["Model"] == undefined) { var Model = '' } else { var Model = excelRows[i]["Model"] }
        if (excelRows[i]["Quantity"] == undefined) { var Quantity = '' } else { var Quantity = excelRows[i]["Quantity"] }
        if (excelRows[i]["Rate"] == undefined) { var Rate = '' } else { var Rate = excelRows[i]["Rate"] }
        var id = parseInt(i + 1)
        //Add the data row.id=' + "locID" + i + '

        var row = '<tr class="jsgrid-row" id="row_' + id + '">' +

                '<td id="td_' + id + '" class= jsgrid-cell align=center style= text-align:center><input type="text" id=' + "no_" + id + ' class="form-control griddata" disabled style="height:30px;background-color:white;text-align:center" value=" ' + id + ' "></td>' +
                '<td id=" + "td' + id + ' " class= jsgrid-cell  style= text-align:center><input type="text" id=' + "ItemCode" + id + ' class="form-control griddata" disabled style="height:30px;background-color:white;text-align:center" value="' + ItemCode + '"></td>' +
               '<td id=" + "td' + id + ' " class= jsgrid-cell  style= text-align:center><input type="text" id=' + "model" + id + ' class="form-control griddata" disabled style="height:30px;background-color:white;text-align:center" value="' + Model + '"></td>' +
                '<td class= jsgrid-cell  style=text-align:center><input type="text" id=' + "quantity" + id + ' class="form-control griddata" disabled style="height:30px;background-color:white;text-align:center" value="' + Quantity + '"></td>' +
                '<td class= jsgrid-cell  style= text-align:center><input type="text" id=' + "rate" + id + ' class="form-control griddata" disabled style="height:30px;;background-color:white;text-align:center" value="' + Rate + '"></td>' +
        '</tr>'
        $("#tblpurchaseinvoice1").append(row);
    }
    $('#popupdiv').hide();
    $('#RowLength').val(i + 1);


};
function CheckBoxEnable() {
    $('#btnquantity').prop("checked", false)
    $('#btnprice').prop("checked", false)
    $('#btnboth').prop("checked", false)

}
function CompareItems() {

    if ($('#fileUpload').val() == 0) {
        warningshow('Please Select a File', 'fileUpload');
    }
    else {
        if ($('#btnquantity').is(":checked") || $('#btnprice').is(":checked") || $('#btnboth').is(":checked"))
            $('#select_status_items').prop("checked", false)
        else
            $('#select_status_items').prop("checked", true)

        $('#CompareResult').show();
        $('#FileUpload').hide();

        var oArray = new Array();
        var count = $('#tblpurchaseinvoice tr').length;
        var count1 = $('#tblpurchaseinvoice1 tr').length;
        var cn = count + count1;

        if ($('#select_status_items').prop("checked"))
            var selected = 1;

        else
            var selected = 0;
        if ($('#btnquantity').is(":checked"))
            var Qtyselected = 1;
        else
            var Qtyselected = 0;

        if ($('#btnprice').is(":checked"))
            var Prselected = 1;
        else
            var Prselected = 0;
        if ($('#btnboth').is(":checked"))
            var Bothselected = 1;
        else
            var Bothselected = 0;

        for (var j = 1; j <= cn; j++) {

            var Idno = $('#sl_' + j).val();
            var ItemCode = $('#product_' + j).val();
            var Description = $('#productdesc_' + j).val();
            var NoQty = $('#quantity_' + j).val();
            var ItemRate = $('#txtrate_' + j).val();

            var ExcelItemCode = '';
            if (($('#ItemCode' + j).val() != undefined)) {
                ExcelItemCode = $('#ItemCode' + j).val();
            }
            var modelm1 = '';
            if ($('#model' + j).val() != undefined)
            { var modelm1 = $('#model' + j).val(); }
            var TotQty = '';
            if ($('#quantity' + j).val() != undefined)
            { var TotQty = $('#quantity' + j).val(); }
            var Price = '';
            if ($('#rate' + j).val() != undefined)
            { var Price = $('#rate' + j).val(); }
            var selectedvalue = selected;
            var Quantityselected = Qtyselected;
            var Priceselected = Prselected;
            var Bselected = Bothselected;
            if ((modelm1 != undefined) || (ItemCode != undefined))
                oArray.push({
                    'ItemCode': ItemCode,
                    'Description': Description,
                    'NoQty': NoQty,
                    'ItemRate': ItemRate,
                    'ExcelItemCode': ExcelItemCode,
                    'modelm1': modelm1,
                    'TotQty': TotQty,
                    'Price': Price,
                    'selectedvalue': selectedvalue,
                    'Quantityselected': Quantityselected,
                    'Priceselected': Priceselected,
                    'Bselected': Bselected,

                })
        }
        if (oArray != "") {
            var data = { 'ItemMasterModel': oArray };
            $.ajax({
                type: "POST",
                url: '../Purchase/CompareItems',
                data: data,
                success: function (result) {
                    $('#divreports').show();
                    disable_datatables('tblpurchaseinvoice2', 'buttonPlace');
                    var row = '';
                    var responseText = "<thead>" +
                        "<tr><th>Sl#</th><th style='display:none;'></th><th>Item Code</th><th>Item Description</th><th>Model#</th><th style='text-align:center;'>Order Qty.</th><th style='text-align:center;'>Received Qty.</th><th style='text-align:center;'>Difference Qty.</th><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th><th>Order Rate</th><th >Received Rate</th><th style='text-align:center;'>Difference Rate</th><th style='text-align:center;'>Status</th></tr>" +
                        "<tr><th>Sl#</th><th style='display:none;'></th><th>Item Code</th><th>Item Description</th><th>Model Number</th><th>Order Quantity</th><th>Received Quantity</th><th>Difference Quantity</th><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th><th>Order Rate</th><th >Received Rate</th><th style='text-align:center;'>Difference Rate</th><th>Status</th></tr></thead><tbody>";
                    for (var j = 0; j < result.length; j++) {
                        var Status = '';
                        var CheckDesc = '';
                        Status = result[j].Status;
                        CheckDesc = result[j].DifferenceItemdesc;
                        var slno = parseInt(j + 1);
                        if (Status == 'Type1') {
                            ItemStatus = 'Not Ordered';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none"></td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default  btn-success mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';
                        }
                        else if (Status == 'Type2' && CheckDesc == '') {
                            ItemStatus = 'Item Not Added';
                            responseText += '<tr style="background-color:red;color:white"><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default  btn-warning mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';
                        }
                        else if (Status == 'Type2' && CheckDesc != '') {
                            ItemStatus = 'Item Added';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default  btn-warning mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';
                        }
                        else if (Status == 'Type3') {
                            ItemStatus = 'Quantity Difference';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default   btn-info mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';
                        }
                        else if (Status == 'Type4') {
                            ItemStatus = 'OK';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default  btn-primary mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';

                        }
                        else if (Status == 'Type5') {
                            ItemStatus = 'Rate Difference';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default  btn-basic mb1 round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';

                        }
                        else if (Status == 'Type6') {
                            ItemStatus = 'Rate/Quantity Diff';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default btn btn-primary mb1 bg-orange round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';

                        }
                        else if (Status == 'Type7') {
                            ItemStatus = 'Pending';
                            responseText += '<tr><td style="text-align:center">' + slno + '</td><td id="Col18_' + slno + '" style="display:none">' + result[j].ItemId + '</td><td id="Col1_' + slno + '">' + result[j].DifferenceItemcode + '</td><td id="Col2_' + slno + '">' + result[j].DifferenceItemdesc + '</td><td id="Col3_' + slno + '">' + result[j].Differencemodel + '</td><td id="Col4_' + slno + '" style="text-align:center">' + result[j].Orderquantity + '</td><td id="Col5_' + slno + '" style="text-align:center">' + result[j].Receivedquantity + '</td><td id="Col6_' + slno + '" style="text-align:center">' + result[j].Differencequantity + '</td><td id="Col7_' + slno + '" style="display:none">' + result[j].Unit + '</td><td id="Col8_' + slno + '" style="display:none">' + result[j].Rate + '</td><td  id="Col9_' + slno + '" style="display:none">' + result[j].Group + '</td><td id="Col11_' + slno + '" style="text-align:right">' + parseFloat(result[j].Gridrate).toFixed(Decimal) + '</td><td id="Col12_' + slno + '" style="text-align:right">' + parseFloat(result[j].ExcelRate).toFixed(Decimal) + '</td><td id="Col13_' + slno + '" style="text-align:right">' + parseFloat(result[j].DifferenceRate).toFixed(Decimal) + '</td><td id="Col10_' + slno + '"><button class="badge badge-default btn btn-primary mb1 btn-secondary round"  style="font-weight:normal;color:white;border:none;width:150px;margin-left:15px;" disabled >' + ItemStatus + '</button></td></tr>';

                        }

                    }
                    $('#tblpurchaseinvoice2').html(responseText + '</tbody>');
                    var title = 'Purchase Performance';
                    datatableWithsearchs('tblpurchaseinvoice2', true, title, 'buttonPlace');
                    $('#header').text(title);
                }
            });
        }

    }

}





function CompareResultClose() {
    $('#CompareResult,#Resultdiv').hide();
    var file = document.getElementById("fileUpload");
    file.value = file.defaultValue;
    $('#select_status_items').prop("checked", false)
}

function AddReceivedItems() {

    $('#tblpurchaseinvoice tr').remove();
    $('#CompareResult,#Resultdiv').hide();
    var Row_no = $('#tblpurchaseinvoice2 tr').length - 2;
    var rowslno = 1;
    for (k = 1; k <= Row_no; k++) {
        if (($('#Col1_' + k).text() != '') && ($('#Col5_' + k).text() != 0) && ($('#Col2_' + k).text() != '')) {

            var ids = parseInt(k);
            //alert($('#Col18_' + k).text())
            var OrderTempId = parseInt($("#TempOrderId_" + $('#Col18_' + k).text()).val() || 0);
            var OrderSubTempId = parseInt($("#TempOrderSubId_" + $('#Col18_' + k).text()).val() || 0);

            //alert(OrderTempId);
            //alert(OrderSubTempId);


            var ProdEditRows = "<tr class='jsgrid-row' id='row_" + ids + "'>" +
                "<td id='edit_" + ids + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + ids + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + ids + ")'  title= Delete ></td>" +
                "<td id='update_" + ids + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + ids + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + ids + ")'></td>" +
                "<td id='td_" + ids + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                + rowslno + "<input type='hidden' id='sl_" + ids + "' value=" + ids + "></td>" +
                "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='OrderId_" + ids + "' value='" +
                OrderTempId + "'><input type='hidden' id='OrderSubId_" + ids + "' value='" +
                OrderSubTempId + "'><input type='hidden' id='productId_" + ids + "' value='" +
               $('#Col18_' + k).text() + "'><input type='text' id='product_" + ids + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
               $('#Col1_' + k).text() + "'></td>" +
               "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:310px;' ><input type='text' class='form-control' style='height:30px;background-color:white' disabled id='productdesc_" + ids + "' value='" +
               $('#Col2_' + k).text() + "'></td>" +
               "<td id='col_3' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' > <select id='locn_" + ids + "' class='form-control' disabled style='height:30px;background-color:white' >" +
               LocationSelect + "</select></td>" +
               "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + ids + "' onchange='CheckFOC(" + ids + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
               UnitSelect + "</select><input type='hidden' id='txtunit_" + ids + "' class='form-control' /></td>" +
               "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + ids + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                $('#Col5_' + k).text() + "' onkeyup='CalcAmount(" + ids + ")' onkeypress='isNumberInt(event,this)' ></td>" +
               "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + ids + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
               $('#Col12_' + k).text() + "' onkeyup='CalcAmount(" + ids + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + ids + "' class='form-control' value='' ></td>" +
               "<td id='col_7' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + ids + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
               parseFloat($('#totdisc').val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + ids + ")' onkeypress='isNumber(event,this)'></td>" +
               "<td id='col_8' class='jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + ids + "' class='form-control' style='height:30px;background-color:white'  value='" +
               parseFloat($('#fctaxable').val()).toFixed(Decimal) + "' disabled></td>" +
               "<td id='col_9' class='jsgrid-cell jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + ids + "' onchange='ChangeTax(" + ids + ",this)' >" +
               TaxSelect + "</select><input type='hidden' id='taxpercentage_" + ids + "' value=" +
               parseFloat($('#Col9_' + k).text()).toFixed(Decimal) + "></td>" +
               "<td id='col_10' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + ids + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
               parseFloat($('#fctax').val()).toFixed(Decimal) + "'></td>" +
               "<td id='col_11' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + ids + "' value=''><input type='text' id='amount_" + ids + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
               parseFloat($('#GrandTotal').val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + ids + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + ids + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + ids + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + ids + "' class='form-control'   disabled value=''></td>" +
               "<td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + ids + "'><input type='text' id='jobcode_" + ids + "' class='form-control' disabled style='height:30px;background-color:white'></td>" +
               "</tr>";
            $('#tblpurchaseinvoice').append(ProdEditRows);

            if ($('#purchasetype').val() == 'Import') {
                $('#tax_' + ids).val($('#ImpTax').val());
                $('#taxpercentage_' + ids).val($('#tax_' + ids).find("option:selected").attr("name"));
            }
            else {
                $('#tax_' + ids).val($('#Col9_' + k).text());
                $('#taxpercentage_' + ids).val($('#tax_' + ids).find("option:selected").attr("name"));
            }


            $('#unit_' + ids).val($('#Col7_' + k).text());
            CalcAmount(ids)
            CalcGrandTotal(ids);
            rowslno++;



        }
    }
    i = Row_no;

}



function datatableWithsearchs(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'Key')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        if (title == 'Order Quantity')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        if (title == 'Received Quantity')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        if (title == 'Difference Quantity')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        if (title == 'Item Code' || title == 'Item Description' || title == 'Model Number' || title == 'Status' || title == 'Order Rate' || title == 'Received Rate' || title == 'Difference Rate') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }
        table = $('#' + tablename).DataTable({

            dom: "<'row'<'col-sm-12'f>>" +
              "<'row'<'col-sm-12'tr>>" +
              "<'row'<'col-sm-1'i>>",
            'bSortable': false,
            "ordering": false,
            'aTargets': [0],
            "columnDefs": [
                    { "width": "1%", "targets": 1 },
                    { "width": "25%", "targets": 2 },
                    { "width": "25%", "targets": 3 },
                    { "width": "15%", "targets": 4 },
                    { "width": "1%", "targets": 5 },
                    { "width": "1%", "targets": 6 },
                    { "width": "1%", "targets": 7 },
                    { "width": "1%", "targets": 8 },
                    { "width": "1%", "targets": 9 },
                    { "width": "1%", "targets": 10 },
                    { "width": "1%", "targets": 11 },

            ],
            "order": [],
            "pageLength": -1,
            orderCellsTop: true,
            buttons: []


        });
        //new $.fn.dataTable.Buttons(table, {
        //    buttons: [
        //        {
        //            //extend: 'colvis',
        //            //columns: ':visible',
        //        }
        //    ]
        //});
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

    } else {
        table = $('#' + tablename).DataTable();

    }
    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(1) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    });

    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}

function disable_datatables(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}

function PendingPurchaseOrder() {
    var PPNo = $('#PPONo').val();
    if (PPNo != 0) {
        var data = {};
        data.OrderNo = PPNo;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderGetandGets",
            data: data,
            success: function (result) {
                PurchaseOrderGets(result.oList);
            }
        });
    }

}