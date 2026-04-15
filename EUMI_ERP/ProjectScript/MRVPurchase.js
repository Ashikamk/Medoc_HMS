//Global Variable Declaration

var i = 1; var x = 1; var TId = "";
var TaxSelect = ""; var UnitSelect = ""; var LocationSelect = ""; var CurrencySelect = "";
var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId; var ULocId = UserLocationId;
var locn = ""; var unit = ""; var quantity = "";
var rate = ""; var disc = ""; var tax = "";
var taxper = ""; var FlagEdit = 0; var Invoice = 0;
var UnitFlag = 0; var UFlag = 0; var ProductFlag = 0;
var Account = ""; var AccType = ""; var CreditAmt = "";
var DebitAmt = ""; var FlagCostEdit = 0; var OtherCost = [];
var CopyFlag = 0; var NextInvoiceNo = 0; var OtherCostFlag = 0;
var Z = 0; var CurrentCurrency = 0; var MRVNumber = '';
var jobrowid = ''; var jobrowcode = 0; var X = 0;
var TaxArray = []; var BillDiscountFlag = 0;
//Document.Keydown Function

$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();


    var x = event.keyCode;
    if ((x > 111 && x < 124)) {
        if (x == 118) {                                                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            LastSalesTransactions();
        }
        else if (x == 119) {                                               // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            LastPurchaseTransactions();
        }
        else if (x == 120) {                                                // F9 :   All Transaction details Popup      
            lastalltrans();
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
            warningshow('Create New Invoice To Save');
        }
    }
    else if (e.altKey && e.keyCode == 67) {             //Alt+L     :   Copy
        if (CopyFlag == 0) {
            GetRows();
        }
    }
    else if (e.altKey && e.keyCode == 78) {             //Alt+C     :   New
        createnew();
    }
    else if (e.altKey && e.keyCode == 79) {             //Alt+O     :   Other Cost Popup
        Addpopupwindow(6);
        ProductPopuprefresh();
    }
    else if (e.keyCode == 27) {                         //ESC       :   Popup Close
        CloseOtherCost();
        popuprefresh();
        jobpopuprefresh(1);
        ClosePurTransPopup();
        ProductPopuprefresh();
        HidePO();
    }
        //Product Secondary Popup
    else if (e.altKey && e.keyCode == 51) {             //Alt+3     :   Last Purchase details Popup       

        //LastSalesTransactions();
    }

    else if (e.altKey && e.keyCode == 49) {             //Alt+1     :   Last Sales details Popup       
        //LastSalesTransactions();
    }
    else if (e.altKey && e.keyCode == 52) {         //Alt+4    :   All Transaction details Popup      
        //lastalltrans();
    }

});


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

//Document Ready Function

$(document).ready(function () {

    //Page Load Functions
    Serialnoload();
    GetCurrency(0);
    GetArea(0);
    GetLocation(0);
   
    GetUnit();
    GetTax();
    Terms(0);
    //Defaultfocus();
    LoadProduct();





    $('#purchaseinvdate').val(CurDate);

    $("#location").change(function (e) {
        $('#locn_0,#locn_job').val($('#location').val());
        var selectedValue = $(this).val();
    });

    $("#currency").change(function () {
        var selectedValue = $(this).val();
        $("#rate").val($(this).find("option:selected").attr("name"))
        CalcAmt();
        CalcGrandTotal(i);
    });
    $("#CostCurrency").change(function () {
        var selectedValue = $(this).val();
        $("#CostCurrRate").val($(this).find("option:selected").attr("name"));
        CalcFCCost();
    });

    $("#unit_0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit_0").val($(this).find("option:selected").attr("unitname"))
        if ($(this).find("option:selected").attr("unitname") == 'FOC') {
            UnitFlag = 1;
            $('#txtrate_0').val(0);
            $('#discount_0').val(0);
            CalcAmount(0);
        }
        else {
            UnitFlag = 0;
        }
    });

    $("#tax_job").change(function () {
        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"))
        var x = $('#taxpercentage_job').val();
        CalcJobAmount()
    });

    //Focus next element inside the form (text box)
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
           // $('#tour1').show();
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
            } else {
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
                $('#product_0').focus();
            }
            else if ($('#jobid').val() == 0 && $("#jobcode").val() == '') {
                e.preventDefault();
                $('#product_0').focus();
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
            $("#SupInvoTotal").focus();
        }

    });
    $('#currency').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });
    $('#rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#jobcode").focus();
        }

    });

    $('#SupInvoTotal').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#currency").focus();
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
            else if ($('#productId_0').val() == 0 && ($.trim($('#product_0').val())).toUpperCase() == 'JOB') {
                Addpopupwindow(5);
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

    $("#productjob").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();

            $('#unit_job').focus();

        }

    });
    $("#unit_job").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#quantity_job').focus();
        }

    });

    $('#quantity_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#txtrate_job").focus();
        }

    });

    $('#txtrate_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#discount_job").focus();
        }

    });
    $('#discount_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tax_job").focus();
        }

    });
    $('#tax_job').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#btnjobsave").focus();
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
        else {
            $('#accid').val(0);
        }

    });

    $('#accountdescription').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#costamount").focus();
            $("#costamount").select();
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



function SavePurchase() {
    CalcInvoice();

    for (var s = 1; s < x; s++) {
        if ($('#costsl_' + s).val() == 0) {
            OtherCostFlag = 1;
            break;
        }
        else {
            OtherCostFlag = 0;
            continue;
        }
    }

    var RateFlag = 0;
    $(".CheckRateZero").each(function () {
        var a = parseFloat($(this).val()).toFixed(Decimal);
        if (a == 0) {
            RateFlag = 1;
            return false;
        }

    });

    var r = parseFloat($('#rate').val());
    $("#rate").val(isNaN(r) ? 0 : r);

    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if (parseFloat($('#GrandTotal').val()) <= 0 && $('#disc').val() != '') {
        warningshow('GrandTotal Cannot Negative or Zero', 'disc');
    }
    else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
        warningshow('Please Enter Invoice Number', 'purchaseinvoiceno1');
    }
    else if ($('#supplierId').val() == 0) {
        warningshow('Please Select Supplier', 'suppliername');
    }
    else if ($('#paytype').val() == 0) {
        warningshow('Please Select Pay Type', 'paytype');
    }
    else if ($('#purchaseinvdate').val() == '') {
        warningshow('Please Select Invoice Date', 'purchaseinvdate');
    }
    else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
        warningshow('Please Select Terms', 'terms');
    }
    else if ($('#location').val() == 0) {
        warningshow('Please Select Location', 'location');
    }
    else if ($('#placeofsupply').val() == 0) {
        warningshow('Please Select Place of Supply', 'placeofsupply');
    }
    else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
        $('#SupInvoTotal').select();
        warningshow('Enter Invoice Amount', 'SupInvoTotal');
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
    else if (OtherCostFlag == 1) {
        warningshow('Other Cost Not Saved', 'btnothercost');
    }
    else if (RateFlag == 1) {
        warningshow('Rate Must Be Greater Than Zero for all Items');
    }
    else {

        $('#Confirmflag').val('puchasesave'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save the Purchase Bill?')
        $('#confirm').show();
        $('#confirmOk').focus();

    }
}

function OKSavePurchase() {
        CalcInvoice();

        for (var s = 1; s < x; s++) {
            if ($('#costsl_' + s).val() == 0) {
                OtherCostFlag = 1;
                break;
            }
            else {
                OtherCostFlag = 0;
                continue;
            }
        }

        var RateFlag = 0;
        $(".CheckRateZero").each(function () {
            var a = parseFloat($(this).val()).toFixed(Decimal);
            if (a == 0) {
                RateFlag = 1;
                return false;
            }

        });

        var r = parseFloat($('#rate').val());
        $("#rate").val(isNaN(r) ? 0 : r);


        if ($('#tblpurchaseinvoice tr').length == 0) {
            warningshow('No Products Added', 'product_0');
        }
        else if (parseFloat($('#GrandTotal').val()) <= 0 && $('#disc').val() != '') {
            warningshow('GrandTotal Cannot Negative or Zero', 'disc');
        }
        else if ($.trim($('#purchaseinvoiceno1').val()) == '') {
            warningshow('Please Enter Invoice Number', 'purchaseinvoiceno1');
        }
        else if ($('#supplierId').val() == 0) {
            warningshow('Please Select Supplier', 'suppliername');
        }
        else if ($('#paytype').val() == 0) {
            warningshow('Please Select Pay Type', 'paytype');
        }
        else if ($('#purchaseinvdate').val() == '') {
            warningshow('Please Select Invoice Date', 'purchaseinvdate');
        }
        else if ($('#duedate').val() == '' || $('#terms').val() == 0) {
            warningshow('Please Select Terms', 'terms');
        }
        else if ($('#location').val() == 0) {
            warningshow('Please Select Location', 'location');
        }
        else if ($('#placeofsupply').val() == 0) {
            warningshow('Please Select Place of Supply', 'placeofsupply');
        }
        else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
            $('#SupInvoTotal').select();
            warningshow('Enter Invoice Amount', 'SupInvoTotal');
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
        else if (OtherCostFlag == 1) {
            warningshow('Other Cost Not Saved', 'btnothercost');
        }
        else if (RateFlag == 1) {
            warningshow('Rate Must Be Greater Than Zero for all Items');
        }
        else {                   //ajax code for insert and update to  controller
            if ($('#invdiff').val() != 0) {

                var Res = confirm('GrandTotal and Invoice Total Has Variation! Do You Want to Continue');
                if (Res == false) {
                    return false;
                }
            }

            $('#btnsubmit').prop("disabled", true);
            var oArray = new Array();
            for (var k = 1; k < i; k++) {
                var PurchaseInvoiceMainId = $('#PurchaseInvoiceMainId').val();
                var SlNo = $('#purchaseinvoiceno').val();
                var InvoNo = $('#purchaseinvoiceno1').val();
                var SupplierId = $('#supplierId').val();
                var PayType = 2;
                var PurchaseType = $('#purchasetype').val();
                var InvoDate = $('#purchaseinvdate').val();
                var Terms = $('#terms').val();
                var DueDate = $('#duedate').val();
                var LocnId = $('#location').val();
                var PlaceOfSupply = $('#placeofsupply').val();
                var JobNo = $('#jobcodeid_' + k).val();
                var ShipDate = $('#shipdate').val();
                var CurrencyId = $('#currency').val();
                var CurrencyRate = $('#rate').val();
                var InvoiceTotal = $('#SupInvoTotal').val();    //Foreign Currency
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
                var PurchaseInvoiceSubId = $('#PurchaseInvoiceSubId').val();
                var BatchSlno = 0;
                var Batch = '';
                var MRVId = $('#MRVId_' + k).val();
                var MRVSubId = $('#MRVSubId_' + k).val();
                var ItemId = $('#productId_' + k).val();
                var ItemCode = $('#product_' + k).val();
                var ItemDescription = $('#productdesc_' + k).val();
                var LocationId = $('#locn_' + k).val();
                var UnitId = $('#unit_' + k).val();
                var Fraction = 1;
                var Quantity = $('#quantity_' + k).val();
                var Rate = $('#txtrate_' + k).val();
                var BaseRate = $('#baserate_' + k).val();
                var Discount = $('#discount_' + k).val();
                var BaseDiscount = $('#basediscount_' + k).val();
                var TaxId = $('#tax_' + k).val();
                var TaxRate = $('#taxpercentage_' + k).val();
                var TaxableAmount = $('#txttaxable_' + k).val();
                var TaxAmount = $('#txttax_' + k).val();
                var TotalAmount = $('#amount_' + k).val();
                var BaseTaxable = $('#basetaxableamount_' + k).val();
                var BaseTax = $('#basetaxamount_' + k).val();
                var BaseAmount = $('#baseamount_' + k).val();
                var OtherCost = $('#othercost_' + k).val();         //Base Currency
                var BillDiscount = $('#disc').val();                //Foreign Currency
                var BillDisc = $('#basedisc').val();                //Base Currency
                var Remarks = $('#txtnotes').val();
                var DeleteFlag = 1;
                var MRVNo = $('#mrv').val();
                var MRVNumber = $('#MRVNo').val();
                var FCRoundOff = $('#invdiff').val();
                var RoundOff = $('#baseinvdiff').val();
                var BaseInvoiceamount = $('#BaseInvoiceamount').val();

                if (!(typeof ItemCode == "undefined")) {
                    oArray.push({
                        'PurchaseInvoiceMainId': PurchaseInvoiceMainId,
                        'SlNo': SlNo,
                        'InvoNo': InvoNo,
                        'SupplierId': SupplierId,
                        'PayType': PayType,
                        'PurchaseType': PurchaseType,
                        'InvoDate': InvoDate,
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
                        'InvoiceTotal': InvoiceTotal,
                        'FCTaxable': FCTaxable,
                        'FCTax': FCTax,
                        'FCGrandTotal': FCGrandTotal,
                        'BillDiscount': BillDiscount,
                        'BillDisc': BillDisc,
                        'Remarks': Remarks,
                        'DepartmentId': DepartmentId,
                        'UserId': UserId,
                        'PurchaseInvoiceSubId': PurchaseInvoiceSubId,
                        'BatchSlno': BatchSlno,
                        'Batch': Batch,
                        'ItemId': ItemId,
                        'ItemDescription': ItemDescription,
                        'ItemCode': ItemCode,
                        'LocationId': LocationId,
                        'UnitId': UnitId,
                        'Fraction': Fraction,
                        'Quantity': Quantity,
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
                        'OtherCost': OtherCost,
                        'MRVId': MRVId,
                        'DeleteFlag': DeleteFlag,
                        'MRVNo': MRVNo,
                        'MRVSubId': MRVSubId,
                        'MRVNumber': MRVNumber,
                        'FCRoundOff': FCRoundOff,
                        'RoundOff': RoundOff,
                        'BaseInvoiceamount': BaseInvoiceamount
                    })
                }
            }

            if (oArray != "") {

                var data = { 'MRVPurchase': oArray };
                $.ajax({
                    type: "POST",
                    url: "../MRVPurchase/MRVPurchaseInsertandUpdate",
                    data: data,
                    success: function (result) {
                        for (var i = 0; i <= result.oList.length; i++) {
                            var status = result.oList[i].Status;
                            var no = result.oList[i].SlNo;
                            var Invodate = result.oList[i].InvoDate;

                            if (status == 1) {
                                var bArray = new Array();
                                for (var i = 1; i < x; i++) {
                                    var OCId = 0;
                                    var SlNo = no;
                                    var InvoDate = Invodate;

                                    var PayType = $('#acctype_' + i).val();
                                    var AccId = $('#accid_' + i).val();
                                    var Description = $('#accdesc_' + i).val();
                                    var CurrencyId = $('#CostCurr_' + i).val();
                                    var CurrencyRate = $('#CostCurrRate_' + i).val();


                                    if ($('#acctype_' + i).val() == 'C') {
                                        var OCAmount = parseFloat($('#BaseCredit_' + i).val());
                                        var OCFCAmount = parseFloat($('#CreditAmount_' + i).val());
                                    }
                                    else if ($('#acctype_' + i).val() == 'D') {
                                        var OCAmount = parseFloat($('#BaseDebit_' + i).val());
                                        var OCFCAmount = parseFloat($('#DebitAmount_' + i).val());
                                    }
                                    var JobCode = 0;
                                    var UserId = UId;
                                    var DepartmentId = DepId;
                                    var DelFlag = 1;

                                    if (!(typeof AccId == "undefined")) {
                                        bArray.push({
                                            'OCId': OCId,
                                            'SlNo': SlNo,
                                            'InvoDate': Invodate,
                                            'PayType': PayType,
                                            'AccId': AccId,
                                            'Description': Description,
                                            'OCAmount': OCAmount,               //BaseCurrency
                                            'OCFCAmount': OCFCAmount,           //ForeignCurrency
                                            'JobCode': JobCode,
                                            'CurrencyId': CurrencyId,
                                            'CurrencyRate': CurrencyRate,
                                            'UserId': UserId,
                                            'DepartmentId': DepartmentId,
                                            'DeleteFlag': DelFlag
                                        })
                                    }
                                }
                                if (bArray != "") {
                                    var data = { 'MRVPurchase': bArray };
                                    $.ajax({
                                        type: "POST",
                                        url: "../MRVPUrchase/OtherCostInsertandUpdate",
                                        data: data,
                                        success: function (result) {
                                            $('#btnsubmit').prop("disabled", false);
                                            Showalerts(status, no);
                                        }
                                    });
                                }
                                else {
                                    $('#btnsubmit').prop("disabled", false);
                                    Showalerts(status, no);
                                }
                            }
                            else {
                                $('#btnsubmit').prop("disabled", false);
                                Showalerts(status, no);
                            }

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

function checkproduct() {
    var a = ($('#product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#productId_0').val(0);
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

//Serial No Load Function

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

    $('#purchaseinvoiceno').val(result[0].MRVPurSlNo);
    $('#accountdescription').val('Other Cost Against MRV Purchase Number: ' + result[0].MRVPurSlNo);
    $('#ImpTax').val(result[0].ImportPurTax);
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
    $("#location,#locn_0,#locn_job").empty();
    LocationSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].LocationId + "'locname='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";

    }
    $("#location,#locn_0,#locn_job").append(LocationSelect);
    if (a == 0) {
        $('#location,#locn_0,#locn_job').val(ULocId);
    }
    else {
        $('#location').val(a);
    }
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
    $("#unit_0,#unit_job").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'unitname='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#unit_0,#unit_job").append(UnitSelect);
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
    $("#tax_0,#tax_job").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#tax_0,#tax_job").append(TaxSelect);
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
    $("#currency,#CostCurrency").empty();
    var BaseCurrency = 0;

    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
            BaseCurrency = result[i].BaseCurrencyId

        }
        $("#currency,#CostCurrency").append("<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");

        CurrencySelect += "<option value='" + result[i].Id + "'name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>";
    }

    $('#currency,#CostCurrency').val(BaseCurrency);
    $("#rate").val($("#currency").find("option:selected").attr("name"));
    $("#CostCurrRate").val($("#CostCurrency").find("option:selected").attr("name"));
    if (a != 0) {
        $('#currency').val(a);
        $("#rate").val($("#currency").find("option:selected").attr("name"))
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

//Checking Invoice No of Supplier Function

function SearchSupplierInvoice() {
    if ($('#supplierId').val() != 0) {
        var data = {};
        data.InvoNo = $.trim($('#purchaseinvoiceno1').val());
        data.SupplierId = $('#supplierId').val();
        $.ajax({
            type: "POST",
            url: "../Purchase/SupplierInvoiceNoSearch",
            data: data,
            success: function (result) {

                var status = result[0].Flag
                Show(status)
            }
        });
    }
}


function Show(status) {
    if (status == 1) {
        warningshow('Same Invoice Number Already Exists For This Supplier ', 'purchaseinvoiceno1');
        $('.form-control,.jsgrid-button,#btnsubmit,#btnadd,#btnothercost,#btnlist').prop('disabled', true);
        $('#purchaseinvoiceno1').prop("disabled", false);
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno1').focus();
        CopyFlag = 1;
    }
    else if (status == 0) {

        $('.editds,.jsgrid-button,#btnsubmit,#btnadd,#btnothercost,#btnlist').prop('disabled', false);
        $('#purchaseinvoiceno1,#transfer,#mrv,#CostCurrRate,#CostCurrency').prop("disabled", false);
        $('#totdisc,#tottaxable,#tottax,#totcredit,#totdebit,#costdiff').prop("disabled", true);
        if ($('#tblOtherCost tr').length > 0) {
            $('#CostCurrency').prop("disabled", true);
            $('#CostCurrRate').prop("disabled", true);
        }
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno').prop("disabled", true);
        $('#invdiff').prop("disabled", true);
        $('#taxpercentage_0').prop("disabled", true);
        $('#amount_0').prop("disabled", true);
        CopyFlag = 0;
    }
}

//Product Add to Grid Function

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
    else if ($('#locn_0').val() == 0) {
        warningshow('Please Select Location', 'locn_0');
        return false;
    }
    else if ($('#unit_0').val() == 0) {
        warningshow('Please Select Unit', 'unit_0');
        return false;
    }
    else if ($.trim($('#quantity_0').val()) == '' || $.trim($('#quantity_0').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_0');
        return false;
    }
    else if (UnitFlag == 0 && ($.trim($('#txtrate_0').val()) == '' || $.trim($('#txtrate_0').val()) == 0)) {
        warningshow('Please Enter Rate', 'txtrate_0');
        $('#txtrate_0').select();
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
    else if (parseFloat($('#amount_0').val()) <= 0 && UnitFlag == 0) {
        warningshow('Amount Cannot be Zero or Negative', 'txtrate_0');
        $('#txtrate_0').select();
        return false;
    }
    //else if ($('#discount_0').val() > 100) {
    //    warningshow('Discount Limit Exceeded', 'discount_0');
    //    $('#discount_0').select();
    //    return false;
    //}
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'discount_0');
        $('#discount_0').select();
        return false;
    }
    else if ($('#jobcodeid_0').val() == 0 && $('#jobcode_0').val() != '') {
        warningshow('Please Select Valid Job', 'jobcode_0');
        return false;
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
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='MRVId_" + id + "' value='0'><input type='hidden' id='MRVSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
            $("#productId_0").val() + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "'  class='form-control' disabled style='height:30px;background-color:white' value='" +
            $("#productdesc_0").val() + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
            UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            parseInt($("#quantity_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#txtrate_0").val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='" +
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
            parseFloat($("#basediscount_0").val()).toFixed(Decimal) + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
            LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + $("#jobcodeid_0").val() + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#jobcode_0").val() + "'></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_0').val());
        $('#unit_' + id).val($('#unit_0').val());
        $('#txtunit_' + id).val($('#txtunit_0').val());
        $('#locn_' + id).val($('#locn_0').val());
        $('#proddiv').animate({ scrollTop: 5000 }, 900);

        if ($('#tblpurchaseinvoice tr').length == 1) {
            TaxArray = [];
        }
        var item = $("#taxpercentage_" + id).val();
        if (TaxArray.indexOf(item) == -1) {
            TaxArray.push(item);
        }
        if (parseFloat($('#discount_' + id).val()) > 0 || TaxArray.length > 1) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            BillDiscountFlag = 1;
        }

        ClearProductRow();
        ProductPopuprefresh();
        i++;
        CalcOtherCost();
        CalcGrandTotal(id);

        Product = '';
        UnitFlag = 0;
        ProductFlag = 0;

    }
}
// Other Cost FC Calculation

function CalcFCCost() {
    var currate = 0; var FCost = 0; var BaseCost = 0;

    currate = parseFloat($('#CostCurrRate').val() || 0);
    FCost = parseFloat($('#costamount').val() || 0);
    currate = isNaN(currate) ? 0 : currate;
    FCost = isNaN(FCost) ? 0 : FCost;
    BaseCost = parseFloat(currate * FCost);

    $('#BaseCost').val(parseFloat(BaseCost).toFixed(Decimal));

}

function CalcFCCostGrid(RowId) {
    var RowCurrRate = 0;
    var Fcredit = 0; var BCredit = 0;
    var FDebit = 0; var BDebit = 0;

    RowCurrRate = parseFloat($('#CostCurrRate_' + RowId).val() || 0);
    RowCurrRate = isNaN(RowCurrRate) ? 0 : RowCurrRate;

    if ($('#acctype_' + RowId).val() == 'C') {

        Fcredit = parseFloat($('#CreditAmount_' + RowId).val() || 0);
        Fcredit = isNaN(Fcredit) ? 0 : Fcredit;
        BCredit = parseFloat(RowCurrRate * Fcredit);

        $('#BaseCredit_' + RowId).val(parseFloat(BCredit).toFixed(Decimal));
    }
    else if ($('#acctype_' + RowId).val() == 'D') {

        FDebit = parseFloat($('#DebitAmount_' + RowId).val() || 0);
        FDebit = isNaN(FDebit) ? 0 : FDebit;
        BDebit = parseFloat(RowCurrRate * FDebit);

        $('#BaseDebit_' + RowId).val(parseFloat(BDebit).toFixed(Decimal));
    }

    CalcCreditandDebit();
}

//Other Cost Add to Grid Function


function OtherCostAdd() {

    var a = parseFloat($('#CostCurrRate').val());
    var c = parseFloat($('#costamount').val());
    $("#CostCurrRate").val(isNaN(a) ? 0 : a);
    $('#costamount').val(isNaN(c) ? 0 : c);

    if ($.trim($('#account').val()) == "") {
        warningshow('Please Enter Account', 'account');
        return false;
    }
    else if ($.trim($('#accid').val()) == 0) {
        warningshow('Please Enter Valid Account', 'account');
        return false;
    }
    else if ($.trim($('#accid').val()) == 0) {
        warningshow('Please Enter Valid Account', 'account');
        return false;
    }
    else if ($.trim($('#CostCurrRate').val()) == "" || $.trim($('#CostCurrRate').val()) == 0) {
        warningshow('Please Enter CurrencyRate', 'CostCurrRate');
        $('#CostCurrRate').select();
        return false;
    }
    else if (parseFloat($('#costamount').val()) == 0 || parseFloat($('#BaseCost').val() == 0)) {
        warningshow('Please Enter Amount', 'costamount');
        $('#costamount').select();
        return false;
    }
    else {
        if ($('#acctype').val() == 'C') {
            $('#creditamount').val($('#costamount').val())
            $('#BaseCredit').val($('#BaseCost').val())
            $('#debitamount').val(0)
            $('#BaseDebit').val(0)
        }
        else {
            $('#debitamount').val($("#costamount").val())
            $('#BaseDebit').val($('#BaseCost').val())
            $('#creditamount').val(0)
            $('#BaseCredit').val(0)
        }
        var no = $('#tblOtherCost tr').length + 1;
        var tid = parseInt(x)
        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>" + no + "<input type='hidden' id='costsl_" + tid + "' value='0'></td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='accid_" + tid + "' value='"
            + $('#accid').val() + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $('#account').val() + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $('#accountdescription').val() + "'></td><td id='col_10' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><select id='CostCurr_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'>'"
            + CurrencySelect + "'</select></td><td id='col_11' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='CostCurrRate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + parseFloat($('#CostCurrRate').val() || 0) + "'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' onkeyup='CalcFCCostGrid(" + tid + ")' value='"
            + parseFloat($('#creditamount').val() || 0).toFixed(Decimal) + "'><input type='hidden' id='BaseCredit_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' value='"
            + parseFloat($('#BaseCredit').val() || 0).toFixed(Decimal) + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' onkeyup='CalcFCCostGrid(" + tid + ")'  value='"
            + parseFloat($('#debitamount').val() || 0).toFixed(Decimal) + "'><input type='hidden' id='BaseDebit_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)'  value='"
            + parseFloat($('#BaseDebit').val() || 0).toFixed(Decimal) + "'></td><td id='CostEditRow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='CostEditrow(" + tid + ")'><input class='jsgrid-button jsgrid-delete-button'  type='button' onclick='CostDeleterow(" + tid + ")'  title=Delete ></td><td id='CostUpdaterow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='CostUpdaterow(" + tid + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CostCancelEditrow(" + tid + ")'></td></tr>";
        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val($('#acctype').val());
        $('#CostCurr_' + tid).val($('#CostCurrency').val());
        ClearCostRow();
        x++;
        CalcCreditandDebit();
        $('#CostCurrency').prop("disabled", true);
        $('#CostCurrRate').prop("disabled", true);
    }
}

//Clear Other Cost Row Function

function ClearCostRow() {
    if ($('#acctype').val() == 'C') {
        $('#acctype').val('D')
    }
    else {
        $('#acctype').val('C')
    }
    $('#account').val('')
    $('#accid').val(0)
    $('#costamount').val('0.00')
    $('#BaseCost').val(0)
    $('#BaseDebit').val('')
    $('#BaseCredit').val('')
    $('#accountdescription').val('Other Cost Against MRV Purchase Number: ' + $('#purchaseinvoiceno').val())
    $('#debitamount').val('')
    $('#creditamount').val('')
    $('#acctype').focus();
}

//Tally Credit and Debit Function

function CalcCreditandDebit() {
    var TotalCredit = 0;
    var TotalDebit = 0;
    var CreditDebitDiff = 0;

    var BaseTotalCredit = 0;
    var BaseTotalDebit = 0;
    var BaseCreditDebitDiff = 0;
    for (var k = 1; k < x; k++) {
        TotalCredit = TotalCredit + parseFloat($('#CreditAmount_' + k).val() || 0);
        TotalDebit = TotalDebit + parseFloat($('#DebitAmount_' + k).val() || 0);

        BaseTotalCredit = BaseTotalCredit + parseFloat($('#BaseCredit_' + k).val() || 0);
        BaseTotalDebit = BaseTotalDebit + parseFloat($('#BaseDebit_' + k).val() || 0);
    }
    CreditDebitDiff = TotalCredit - TotalDebit;
    BaseCreditDebitDiff = BaseTotalCredit - BaseTotalDebit;

    $('#totcredit').val(TotalCredit.toFixed(Decimal));
    $('#totdebit').val(TotalDebit.toFixed(Decimal));
    $('#costdiff').val(CreditDebitDiff.toFixed(Decimal));

    $('#totbasecredit').val(BaseTotalCredit.toFixed(Decimal));
    $('#totbasedebit').val(BaseTotalDebit.toFixed(Decimal));
    $('#costbasediff').val(BaseCreditDebitDiff.toFixed(Decimal));
}

//Calc Other Cost of Each Item Function

function CalcOtherCost() {
    var quantity = [];
    var rate = [];
    var amt = [];
    var costA = [];
    var costB = [];

    var tamount = 0;
    var totalothercost = 0;
    totalothercost = parseFloat($('#otrcost').val());
    for (var m = 1; m < i; m++) {
        quantity[m] = parseFloat($('#quantity_' + m).val() || 0);
        rate[m] = parseFloat($('#txtrate_' + m).val() || 0);
        tamount = tamount + parseFloat(quantity[m] * rate[m]);
    }
    for (var j = 1; j < i; j++) {
        quantity[j] = parseFloat($('#quantity_' + j).val() || 0);
        rate[j] = parseFloat($('#txtrate_' + j).val() || 0);
        amt[j] = parseFloat(quantity[j] * rate[j]);
        costA[j] = parseFloat(amt[j] / tamount);
        costB[j] = parseFloat(totalothercost * costA[j]);
        OtherCost[j] = parseFloat(costB[j] / quantity[j] || 0);
    }
    for (var f = 1; f < i; f++) {
        $('#othercost_' + f).val(OtherCost[f].toFixed(Decimal))
    }
}

//Close Other Cost Popup Function

function CloseOtherCost() {
    $('#Othercostpopup').hide();
    $('#OtherCostdiv').hide();
}

//SaveOther Cost Popup Function

function SaveOtherCost() {

    if ($('#costdiff').val() != 0 || $('#costbasediff').val() != 0) {
        warningshow('Debit Amount and Credit Amount is not Tally');
        return false;
    }
    else if (FlagCostEdit != 0) {
        warningshow('Edit Mode! Please Update');
        return false;
    }
    else {
        if ($('#totcredit').val() != '') {
            $('#otrcost').val($('#totbasecredit').val());
            CalcOtherCost();
            CloseOtherCost();
            $('.showothercost').show();
            $('#othercosthead').show();
            for (var s = 1; s < x; s++) {
                $('#costsl_' + s).val(1);
            }
        }
        else {
            warningshow('No Values Added');
        }
    }

}

//Edit Other Cost Grid Function

function CostEditrow(RowId) {
    FlagCostEdit = FlagCostEdit + 1;
    $('#costrow_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');
    Account = $('#accdesc_' + RowId).val();
    AccType = $('#acctype_' + RowId).val();
    CreditAmt = $('#CreditAmount_' + RowId).val();
    DebitAmt = $('#DebitAmount_' + RowId).val();

    $('#CostEditRow_' + RowId).hide();
    $('#CostUpdaterow_' + RowId).show();
    $('#accdesc_' + RowId).prop('disabled', false);
    $('#acctype_' + RowId).prop('disabled', false);
    $('#CreditAmount_' + RowId).prop('disabled', false);
    $('#DebitAmount_' + RowId).prop('disabled', false);

    CalcCreditandDebit();
}

//Update Other Cost Grid Function

function CostUpdaterow(RowId) {

    var a = parseFloat($('#DebitAmount_' + RowId).val());
    var b = parseFloat($('#CreditAmount_' + RowId).val());
    a = isNaN(a) ? 0 : a;
    b = isNaN(b) ? 0 : b;

    if ($('#acctype_' + RowId).val() == 'C' && a != 0) {
        warningshow('Debit Amount Should be 0 For Credit', 'DebitAmount_' + RowId);
        $('#DebitAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && b != 0) {
        warningshow('Credit Amount Should be 0 For Debit', 'CreditAmount_' + RowId);
        $('#CreditAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'C' && (b == 0 || $('#CreditAmount_' + RowId).val() == '')) {
        warningshow('Enter Credit Amount', 'CreditAmount_' + RowId);
        $('#CreditAmount_' + RowId).select();
        return false;
    }
    else if ($('#acctype_' + RowId).val() == 'D' && (a == 0 || $('#DebitAmount_' + RowId).val() == '')) {
        warningshow('Enter Debit Amount', 'DebitAmount_' + RowId);
        $('#DebitAmount_' + RowId).select();
        return false;
    }
    else {

        $('#BaseCredit_' + RowId).val(0);
        $('#BaseDebit_' + RowId).val(0);

        $('#CostUpdaterow_' + RowId).hide();
        $('#CostEditRow_' + RowId).show();
        FlagCostEdit = FlagCostEdit - 1;
        $('#costrow_' + RowId).children('td, th').css('background-color', 'white');

        $('#accdesc_' + RowId).prop('disabled', true);
        $('#acctype_' + RowId).prop('disabled', true);
        $('#CreditAmount_' + RowId).prop('disabled', true);
        $('#DebitAmount_' + RowId).prop('disabled', true);


        var creditamt = parseFloat(b);
        $("#CreditAmount_" + RowId).val(creditamt.toFixed(Decimal));
        var debitamt = parseFloat(a);
        $("#DebitAmount_" + RowId).val(debitamt.toFixed(Decimal));

       
        CalcAmt();
        CalcFCCostGrid(RowId);
        Account = ""; AccType = ""; CreditAmt = ""; DebitAmt = "";
    }
}

//Cancel Edit Other Cost Grid Function

function CostCancelEditrow(RowId) {
    FlagCostEdit = FlagCostEdit - 1;
    $('#costrow_' + RowId).children('td, th').css('background-color', 'white');

    $('#accdesc_' + RowId).val(Account);
    $('#acctype_' + RowId).val(AccType);
    $('#CreditAmount_' + RowId).val(CreditAmt);
    $('#DebitAmount_' + RowId).val(DebitAmt);

    CalcCreditandDebit();
    CalcAmt();
    $('#accdesc_' + RowId).prop('disabled', false);
    $('#acctype_' + RowId).prop('disabled', false);
    $('#CreditAmount_' + RowId).prop('disabled', false);
    $('#DebitAmount_' + RowId).prop('disabled', false);
    $('#CostUpdaterow_' + RowId).hide();
    $('#CostEditRow_' + RowId).show();
    Account = ""; AccType = ""; CreditAmt = ""; DebitAmt = "";
}

//Delete Other Cost Grid Function

function CostDeleterow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletecostrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?');

}

function Costdel(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#costrow_' + RowId).remove();

    if ($('#tblOtherCost tr').length == 0) {
        $('#CostCurrency').prop("disabled", false);
        $('#CostCurrRate').prop("disabled", false);
    }
    for (var j = 1; j <= x - 1; j++) {
        if ($('#acc_' + j).val() != undefined) {
            $('#costtd_' + j).text(slno);
            slno++;
        }
    }
    $('#acctype').focus();
    CalcCreditandDebit(i);
}

//Add Job to Grid Function

function JobAdd() {
    var a = parseFloat($('#discount_job').val());
    var b = parseFloat($('#txtsubtotal_job').val());
    var foc = $("#unit_job :selected").text();

    var c = parseFloat($('#txtrate_job').val());
    $("#discount_job").val(isNaN(a) ? 0 : a);
    $('#txtrate_job').val(isNaN(c) ? 0 : c);

    if ($.trim($('#productjob').val()) == "") {
        warningshow('Please Enter Product', 'productjob');
        return false;
    }
    else if ($('#unit_job').val() == 0) {
        warningshow('Please Select Unit', 'unit_job');
        return false;
    }
    else if ($.trim($('#quantity_job').val()) == '' || $.trim($('#quantity_job').val()) == 0) {
        warningshow('Please Enter Quantity', 'quantity_job');
        return false;
    }
    else if ($.trim($('#txtrate_job').val()) == '' || $.trim($('#txtrate_job').val()) == 0) {
        $('#txtrate_job').select();
        warningshow('Please Enter Rate', 'txtrate_job');
        return false;
    }
    else if ($('#tax_job').val() == 0) {
        warningshow('Please Select Tax', 'tax_job');
        return false;
    }
    else if (parseFloat($('#amount_job').val()) <= 0) {
        warningshow('Amount Must Be Greater Than Zero', 'txtrate_job');
        $('#txtrate_job').select();
        return false;
    }
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'discount_job');
        return false;
    }
    else {
        var no = $('#tblpurchaseinvoice tr').length + 1;
        var id = parseInt(i)

        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='0'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#productjob").val() + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value=''></td><td id='col_3' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >"
            + UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" + parseInt($("#quantity_job").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseFloat($("#txtrate_job").val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='"
            + parseFloat($("#baserate_job").val()).toFixed(Decimal) + "' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseInt($("#discount_job").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_7' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='"
            + parseFloat($("#txttaxable_job").val()).toFixed(Decimal) + "' disabled></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >"
            + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value="
            + $("#taxpercentage_job").val() + "></td><td id='col_9' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='"
            + parseFloat($("#txttax_job").val()).toFixed(Decimal) + "'></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='"
            + parseFloat($("#txtsubtotal_job").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
            + parseFloat($("#amount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#baseamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basetaxableamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basetaxamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basediscount_job").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >"
            + LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='jobcodeid_" + id + "' value=''><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value=''></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_job').val());
        $('#unit_' + id).val($('#unit_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        $('#locn_' + id).val($('#locn_job').val());

        jobpopuprefresh(0);
        $('#product_0').val('');
        i++;
        CalcOtherCost();
        CalcGrandTotal(id);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
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
        $('#unit_' + RowId).focus();
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
        NextInvoiceNo = parseInt($('#purchaseinvoiceno').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#jobpopupdiv,#Othercostpopup,#PurchaseTransactionPopup,#productpdiv,#iconForm').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", false);
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();


    } else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    else if (Result == 'true' && status == 'puchasesave') {
        OKSavePurchase();
    }
    else if (Result == 'true' && status == 'mrvpurchasedelete') {
        EditInvoice(1);
    }
    $('#confirm').fadeOut();

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
            Operation = 'Purchase Invoice Edit- OTP';
        else if (Flag == 1)
            Operation = 'Purchase Invoice Delete- OTP';

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
            //edit mrv purchase
        }
        else if (Flag == 1) {
            DeleteThisMRVPurchase();
        }

    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}
function DeleteThisMRVPurchase() {
    $('#OTPDiv').hide();
    //$('#Loading').show();
    var data = {};
    data.SlNo = $('#purchaseinvoiceno').val();
    data.DepartmentId = DepId;
    data.UserId = UId;
    $.ajax({
        type: "POST",
        url: "../MRVPurchase/DeleteMRVPurchase",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var slno = result.oList[0].SlNo;
            //$('#Loading').hide();
            Showalerts(status, slno);

            $.ajax({
                type: "POST",
                url: "../Utilities/StockRefresh",
                success: function (result) { }
            });
            $.ajax({
                type: "POST",
                url: "../Utilities/AverageCostRefresh",
                success: function (result) { }
            });
        }
    });

}
function detl(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    TaxArray = [];
    $('#row_' + RowId).remove();

    if ($('#tblpurchaseinvoice tr').length == 0) {
        BillDiscountFlag = 0;
    }

    for (var j = 1; j <= i - 1; j++) {
        if ($('#product_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;

            if (parseFloat($('#discount_' + j).val()) != 0) {
                BillDiscountFlag = 1;
            }
            else {
                BillDiscountFlag = 0;
            }
            var item = $("#taxpercentage_" + j).val();
            if (TaxArray.indexOf(item) == -1) {
                TaxArray.push(item);
            }
        }
    }

    if (TaxArray.length <= 1 && BillDiscountFlag == 0) {
        $('#disc').prop("disabled", false);
       // $('#disc').val('0.00');
    }

    $('#product_0').focus();
    CalcGrandTotal(i);
    CalcOtherCost();

}
//Update Grid Function

function UpdateRow(RowId) {
    if ($('#unit_' + RowId).find("option:selected").attr("unitname") == 'FOC') {
        UFlag = 1;
    }
    var a = parseFloat($('#discount_' + RowId).val() || 0).toFixed(Decimal);
    var b = parseFloat($('#txtsubtotal_' + RowId).val()).toFixed(Decimal);
    var c = parseInt($('#quantity_' + RowId).val());
    var d = parseInt($('#demoqty_' + RowId).val()||0);

    var e = parseFloat($('#txtrate_' + RowId).val()).toFixed(Decimal);
    $("#discount_" + RowId).val(isNaN(a) ? 0 : a);
    $('#txtrate_' + RowId).val(isNaN(e) ? 0 : e);

    if ($('#locn_' + RowId).val() == 0 && $('#productId_' + RowId).val() != 0) {
        warningshow('Press Select Location', '#locn_' + RowId);
        return false;
    }
    else if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        return false;
    }
    else if ($.trim($('#quantity_' + RowId).val()) == '' || $.trim($('#quantity_' + RowId).val()) == 0) {
        warningshow('Please Select Quantity', 'quantity_' + RowId);
        return false;
    }
    else if (UFlag == 0 && ($.trim($('#txtrate_' + RowId).val()) == '' || $.trim($('#txtrate_' + RowId).val()) == 0)) {
        warningshow('Please Enter Rate', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
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
    else if (parseFloat($('#amount_' + RowId).val()) <= 0 && UFlag == 0) {
        warningshow('Amount Must be Greater Than Zero', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        return false;
    }
    //else if ($('#discount_' + RowId).val() > 100) {
    //    warningshow('Discount Limit Exceeded', 'discount_' + RowId);
    //    $('#discount_' + RowId).select();
    //    return false;
    //}
    else if (parseFloat(a) > parseFloat(b)) {
        warningshow('Amount Cannot be Negative', 'discount_' + RowId);
        $('#discount_' + RowId).select();
        return false;
    }
    else if ($.trim($('#jobcode_' + RowId).val()) != '' && $('#jobcodeid_' + RowId).val() == 0) {
        warningshow('Enter A Valid Job ', 'jobcode_' + RowId);
        return false;
    }
    else if (d != 0 && c > d) {
        warningshow('Purchase Quantity is Greater than MRV Quantity! ', 'quantity_' + RowId);
        return false;
        
    }
    else {
        if ($('#locn_' + RowId).val() != locn) {
            var Res = confirm('Location Changed!..Do You Want to Continue?');
            if (Res == false) {
                return false;
            }
        }
        if ($('#tblpurchaseinvoice tr').length == 1) {
            TaxArray = [];
        }
        TaxArray = [];
        BillDiscountFlag = 0;
        for (var j = 1; j < i; j++) {
            if ($('#product_' + j).val() != undefined) {
                var item = $("#taxpercentage_" + j).val();
                if (TaxArray.indexOf(item) == -1) {
                    TaxArray.push(item);
                }
                if (parseFloat($('#discount_' + j).val()) > 0) {
                    BillDiscountFlag = 1;
                }
            }
        }
        if (BillDiscountFlag == 1 || TaxArray.length > 1) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
        }
        else {
            $('#disc').prop("disabled", false);
           // $('#disc').val('0.00');
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

//Check FOC When Product Add Function

function CheckFOC(rowid, selectedvalue) {

    $("#txtunit_" + rowid).val($(selectedvalue).find("option:selected").attr("unitname"))
    if ($(selectedvalue).find("option:selected").attr("unitname") == 'FOC') {
        UFlag = 1;
        $('#txtrate_' + rowid).val(0);
        $('#discount_' + rowid).val(0);
        CalcAmount(rowid);
    }
    else {
        UFlag = 0;
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
    $('#product_0').focus();
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
    var FCrate = parseFloat($('#rate').val() || 0).toFixed(Decimal);
    FCrate = isNaN(FCrate) ? 0 : FCrate;
    var FCAmount = 0;
    var FCtotdisc = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;
    var InvoiceAmount = 0;
    var InvDiff = 0;
    var BillDisc = 0;
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

    if (parseFloat($('#disc').val()) > 0 && BillDiscountFlag != 1 && TaxArray.length == 1) {
        TotalTaxable = TotalTaxable - parseFloat($('#disc').val()).toFixed(Decimal);
        TotalTax = 0;
        var TaxP = TaxArray[0];
        TotalTax = TotalTaxable * (TaxP / 100);
        TotalTax = parseFloat(TotalTax).toFixed(Decimal);
        GrandTotal = parseFloat(TotalTaxable) + parseFloat(TotalTax);
    }
    FCAmount = GrandTotal * FCrate;
    FCtotdisc = TotalDiscount * FCrate;
    FCtottaxable = TotalTaxable * FCrate;
    FCtottax = TotalTax * FCrate;

    InvoiceAmount = parseFloat($('#SupInvoTotal').val() || 0).toFixed(Decimal);
    var BaseInvoiceamount = InvoiceAmount * FCrate;
    $('#BaseInvoiceamount').val(BaseInvoiceamount.toFixed(Decimal));
    InvDiff = GrandTotal - InvoiceAmount;
    var BaseInvDiff = InvDiff * FCrate;

    BillDisc = parseFloat($('#disc').val() || 0);
    BillDisc = BillDisc * FCrate;
    $('#basedisc').val(BillDisc.toFixed(Decimal));
    $('#invdiff').val(InvDiff.toFixed(Decimal));
    $('#baseinvdiff').val(BaseInvDiff.toFixed(Decimal));
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#totdisc').val(TotalDiscount.toFixed(Decimal));
    $('#tottaxable').val(TotalTaxable.toFixed(Decimal));
    $('#tottax').val(parseFloat(TotalTax).toFixed(Decimal));
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

//Checking Difference Between GrandTotal And Invoice Total Function

function CalcInvoice() {
    Invoice = 0;
    Invoice = parseFloat($('#SupInvoTotal').val() || 0);
    $('#SupInvoTotal').val(Invoice.toFixed(Decimal));
}

//Default Focus Function

function Defaultfocus() {
    $('#purchaseinvoiceno1').focus();
}

//New Button in Form

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

//Form Refresh

function formrefresh(RefreshFlag) {
    TaxArray = [];
    BillDiscountFlag = 0;
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
    $('#location').val(ULocId);
    $('#locn_job').val(ULocId);

    $('#fcamount').val('');
    $('#fctaxable').val('');
    $('#fctax').val('');
    $('#fcdiscount').val('');
    $('#BaseInvoiceamount').val('');
    $('#baseinvdiff').val('');
    $('#rate').val('');
    $('#jobcode').val('');
    $('#jobid').val(0)
    $('#product_0').val('');
    $('#btndelete').hide();
    $('#locn_0').val(ULocId);
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

    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#mrv').val('');
    $('#MRVNo').val('');

    for (var k = 1; k < i; k++) {
        $('#row_' + k).remove();
    }
    for (var k = 1; k < x; k++) {
        $('#costrow_' + k).remove();
    }
    $('#otrcost').val('');

    i = 1; x = 1; OtherCostFlag = 0;

    ClearProductDetails();
    $('#ProductLength').val();
    Defaultfocus();
    $('#purchaseinvoiceno1').focus();
    $('#btnsubmit').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#btncrncysave').prop("disabled", false);
    $('#btnaddcost').prop("disabled", false);
    $('#purchaseinvoiceno').prop("disabled", true);
    $('#invdiff').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#amount_0').prop("disabled", true);
    $('#totdisc,#tottaxable,#tottax,#totcredit,#totdebit,#costdiff').prop("disabled", true);
    $('#Warningpopup').fadeOut();



    //Other Cost POPUP Refresh
    $('#account').val('');
    $('#accid').val(0);
    $('#acctype').val('C');
    $('#costamount').val('0.00')
    $('#creditamount').val('');
    $('#debitamount').val('');
    $('#BaseCost').val('');
    $('#BaseCredit').val('');
    $('#BaseDebit').val('');
    $('#totcredit').val('0.00');
    $('#totdebit').val('0.00');
    $('#costdiff').val('0.00');
    $('#totbasecredit').val('');
    $('#totbasedebit').val('');
    $('#costbasediff').val('');
    $('#CostCurrency').prop("disabled", false);
    $('#CostCurrRate').prop("disabled", false);



    if (RefreshFlag != 1) {
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').show();
        $('#purchaseinv').show();
        $('#copypurchase').hide();
        Serialnoload();
        GetCurrency(0);
        GetArea(0);
        $('#purchaseinvoiceno').val('');
        CopyFlag = 0;
    }
}
//Hide PO details
function HidePO() {
    $('#iconForm').hide()
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#tbl_POList tr td').remove;
    $('#tbl_PO_ListItem').remove;
    MRVNumber = '';
    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('');
    $('#InvoiceFromDate').val(CurDate);
    $('#InvoiceToDate').val(CurDate);

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
    var currencyrate = parseFloat($("#rate").val() || 0).toFixed(Decimal);

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
        CalcOtherCost()

    }
}

//Calculation  Function for Amount Calculation of Job Before Adding to Grid

function CalcJobAmount() {

    var quantity = parseFloat($('#quantity_job').val() || 0);
    var rate = parseFloat($('#txtrate_job').val() || 0);
    var discount = parseFloat($('#discount_job').val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    discount = isNaN(discount) ? 0 : discount;
    var taxpercentage = parseFloat($("#taxpercentage_job").val() || 0);
    var currencyrate = parseFloat($("#rate").val() || 0).toFixed(Decimal);
    var tamount = parseFloat(quantity * rate)
    var taxableamount = parseFloat(tamount - discount)
    var taxamount = parseFloat(taxableamount * (taxpercentage / 100));
    var totalamount = parseFloat(taxableamount + taxamount);

    var atotalamount = totalamount.toFixed(Decimal)
    var baseamount = parseFloat(atotalamount * currencyrate);

    var ataxableamount = taxableamount.toFixed(Decimal)
    var basetaxableamount = parseFloat(ataxableamount * currencyrate);

    var ataxamount = taxamount.toFixed(Decimal)
    var basetaxamount = parseFloat(ataxamount * currencyrate);

    var adiscount = discount.toFixed(Decimal)
    var basediscount = parseFloat(adiscount * currencyrate);

    var arate = rate.toFixed(Decimal)
    var baserate = parseFloat(arate * currencyrate);

    $("#amount_job").val(totalamount.toFixed(Decimal));
    $("#txttaxable_job").val(taxableamount.toFixed(Decimal));
    $("#txttax_job").val(taxamount.toFixed(Decimal));
    $("#txtsubtotal_job").val(tamount.toFixed(Decimal));

    $("#baseamount_job").val(baseamount.toFixed(Decimal));
    $("#basetaxableamount_job").val(basetaxableamount.toFixed(Decimal));
    $("#basetaxamount_job").val(basetaxamount.toFixed(Decimal));
    $("#basediscount_job").val(basediscount.toFixed(Decimal));
    $("#baserate_job").val(baserate.toFixed(Decimal));
}


//Design Change for Copy Function 

function GetRows() {
    CopyFlag = 1;
    var rowCount = document.getElementById('tblpurchaseinvoice').rows.length;
    if (rowCount == 0) {
        NextInvoiceNo = parseInt($('#purchaseinvoiceno').val() || 0);
        formrefresh(1);
        $('#purchaseinv,#popupdiv,#jobpopupdiv,#Othercostpopup,#PurchaseTransactionPopup,#productpdiv,#iconForm').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
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

//Copy Function 

function PurchaseGets(result) {
    closewarning();
    if (result.length > 0) {
        for (var n = 0; n < result.length; n++) {
            $('#purchaseinvoiceno').val(result[n].SlNo);
            $('#copypurchaseinvo').val(result[n].InvoNo);
            $('#purchasetype').val(result[n].PurchaseType);
            $('#suppliername').val(result[n].SupplierName);
            $('#purchaseinvdate').val(result[n].InvoDate);
            $('#terms').val(result[n].Terms);
            $('#duedate').val(result[n].DueDate);
            $('#location').val(result[n].LocnId);
            $('#placeofsupply').val(result[n].PlaceOfSupply);
            $('#jobcode').val(result[n].JobCode);
            $('#shipdate').val(result[n].ShipDate);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(parseFloat(result[n].CurrencyRate));
            $('#disc').val(result[n].BillDiscount.toFixed(Decimal));
            $('#SupInvoTotal').val(result[n].InvoiceTotal.toFixed(Decimal));
            $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
            $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
            $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
            $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
            $('#fcamount').val(parseFloat(result[n].FCGrandTotal).toFixed(Decimal));
            $('#fc').text(result[n].FCGrandTotal.toFixed(Decimal));
            $('#txtnotes').val(result[n].Remarks);
            $('#mrv').val(result[n].MRVNo);
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

            var id = parseInt(n + 1)
            var no = $('#tblpurchaseinvoice tr').length + 1;

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                 + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='MRVId_" + id + "' value='0'><input type='hidden' id='MRVSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
                 result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                 result[n].ItemCode + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "'  class='form-control' disabled style='height:30px;background-color:white' value='" +
                 result[n].ItemDescription + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
                 UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                 parseInt(result[n].Quantity) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                 parseFloat(result[n].Rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                 parseFloat(result[n].Discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                 parseFloat(result[n].TaxableAmount).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                 TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                 parseFloat(result[n].TaxRate) + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                 parseFloat(result[n].TaxAmount).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                 parseFloat(result[n].TotalAmount).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                 LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                 + result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                 + result[n].JobCode + "'></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                 parseFloat(result[n].OtherCost).toFixed(Decimal) + "'></td></tr>";

            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);
        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = result.length + 1;
        OtherCostGets();
        $('#btndelete').show();
    } else {
        CheckeDeleted();
    }
}

function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'MP';
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

                swal('MRV Purchase No-' + slno + ' ', "Cancelled!!!", "error");
                $('.swal-button swal-button--confirm').focus();
            }

        }
    });
}
function OtherCostGets() {
    var data = {};
    data.SlNo = $('#purchaseinvoiceno').val();
    data.DepartmentId = DepId;
    $.ajax({
        type: "POST",
        url: "../MRVPurchase/MRVPurchaseOtherCostGetandGets",
        data: data,
        success: function (result) {
            ShowOtherCost(result.dList);

        }
    });

}

//Copy Other Cost Function

function ShowOtherCost(result) {
    $('#accountdescription').val('')
    var a = 0; var b = 0;
    for (var n = 0; n < result.length; n++) {

        var Credit = 0;
        var Debit = 0;
        var tid = parseInt(n + 1);

        if (result[n].PayType == 'C') {
            Credit = (result[n].OCAmount).toFixed(Decimal);
            a = parseFloat(a + result[n].OCAmount || 0).toFixed(Decimal);
            Debit = '0.00';
        }
        else if (result[n].PayType == 'D') {
            Credit = '0.00';
            Debit = (result[n].OCAmount).toFixed(Decimal);
            b = parseFloat(b + result[n].OCAmount || 0).toFixed(Decimal);
        }

        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>" + tid + "<input type='hidden' id='costsl_" + tid + "' value='0'></td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='accid_" + tid + "' value='" +
            result[n].AccId + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].AccName + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].Description + "'></td></td><td id='col_10' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><select id='CostCurr_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'>'"
            + CurrencySelect + "'</select></td><td id='col_11' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='CostCurrRate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + parseFloat(result[n].CurrencyRate) + "'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' value='" +
            Credit + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)'  value='" +
            Debit + "'></td><td id='CostEditRow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='CostEditrow(" + tid + ")'><input class='jsgrid-button jsgrid-delete-button'  type='button' onclick='CostDeleterow(" + tid + ")'  title=Delete ></td><td id='CostUpdaterow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='CostUpdaterow(" + tid + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CostCancelEditrow(" + tid + ")'></td></tr>";

        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val(result[n].PayType);
        $('#CostCurr_' + tid).val(result[n].CurrencyId);

    }

    $('#totcredit').val(a);
    $('#totdebit').val(b);
    $('.jsgrid-button').prop('disabled', true);
    x = result.length + 1;

}


//Next and Previous of Current Invoice No Copy Function 

function GetBillPrevousornext(Value) {
    //$('#tour1').fadeOut();
    $('#Warningpopup').fadeOut();
    var SlNo = parseInt($('#purchaseinvoiceno').val() || 0);
    SlNo = SlNo + Value;
    if ((SlNo <= 0) || (SlNo >= NextInvoiceNo)) {
        warningshow('Invoice Number Not Valid', 'copypurchaseinvo');
        return false;
    }
    else {
        $('#purchaseinvoiceno').val(SlNo);
        var data = {};
        data.SlNo = $('#purchaseinvoiceno').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/MRVPurchaseGetandGets",
            data: data,
            success: function (result) {
                formrefresh(1);
                PurchaseGets(result.oList);
                $('#btnnew').focus();
                $('.form-control').prop('disabled', true);
                $('#copypurchaseinvo').prop("disabled", false);
                $('.jsgrid-button').prop('disabled', true);
                $('#btnsubmit').prop("disabled", true);
                $('#btnlist').prop("disabled", true);
                $('#btnadd').prop("disabled", true);
                $('#btncrncysave').prop("disabled", true);
                $('#btnaddcost').prop("disabled", true);

            }
        });
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
    else if (Id == 3) {                                             //For Area Popup
         GetAreaGroupselect(0);
        $('#myheader').text('Area');
        $('#areadiv').show();
        $('#txtcode').focus();
    }
    else if (Id == 4) {                                             //For Currency Popup
        $('#myheader').text('Currency');
        $('#currencydiv').show();
        $('#txt_code').focus();

    }
    else if (Id == 5) {                                             //For Job Popup
        $("#jobpopupdiv").css("margin-top", '0px');
        $('#jobpopupdiv').show();
        $('#jobheader').text('');
        $('#Jobdiv').show();
        $('#productjob').focus();

    }
    else if (Id == 6) {                                             //For Other Cost Popup
        $("#Othercostpopup").css("margin-top", '0px');
        $('#Othercostpopup').show();
        $('#OtherCostheader').text('Other Cost');
        $('#OtherCostdiv').show();
        $('#acctype').focus();

    }

}

//For Purchase Transaction Popup

function Addpopupproduct(result) {
    $("#PurchaseTransactionPopup").css("margin-top", '0px');
    $('#PurchaseTransactionPopup').show();
    $('#PurchaseTransactionheader').text('Last Purchase Transactions');
    $('#purchasetransdiv').show();

    for (var p = 0; p < result.length; p++) {

        var ProdRow = "<tr><td >'" + result[p].InvoNo + "'</td><td >'" + result[p].InvoDate + "'</td><td >'" + result[p].SupplierName + "'</td><td >'" + result[p].Quantity + "'</td><td >'" + result[p].Rate + "'</td></tr>";

        $('#tblpurchasetrans').append(ProdRow);

    }

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
    else if (rate==0) {
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

//For Job Popup Refresh

function jobpopuprefresh(Id) {
    $('#jobpopupdiv').hide();
    if (Id != 1) {
        $('#product_0').val('');
    }
    $('#productId_job').val(0);
    $('#productjob').val('');
    $('#unit_job').val(0);
    $('#txtrate_job').val('');
    $('#baserate_job').val('');
    $('#tax_job').val(0);
    $('#taxpercentage_job').val('');
    $('#quantity_job').val('');
    $('#discount_job').val('');
    $('#amount_job').val('');
    $('#baseamount_job').val('');
    $('#basetaxableamount_job').val('');
    $('#basetaxamount_job').val('');
    $('#basediscount_job').val('');
    $('#txttaxable_job').val('');
    $('#txttax_job').val('');
    $('#txtsubtotal_job').val('');
    $('#product_0').focus('');
}

//For Close Purchase Transaction Popup

function ClosePurTransPopup() {
    $('#PurchaseTransactionPopup').hide();
    $('#purchasetrans').hide();
    for (var j = 1; j <= Z; j++) {
        $('#pid_' + j).remove();
    }

}


function GetList(Id) {


    if ($('#supplierId').val() == "0") {
        warningshow('Please Select Supplier', 'suppliername');
        return false;
    }
    else if ($('#transfer').val() == "0") {
        warningshow('Please Select Transfer Type', 'transfer');
        return false;
    }
    else {
        if ($('#transfer').val() == 1) {
            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../MRVPurchase/PendingMRVGets",
                data: data,
                success: function (result) {
                    ShowPOList(result.oList);

                }
            });
        }
    }
}

function SearchInvoiceSup(Flag) {
    if (Flag == 1) {
        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = $('#InvoiceFromDate').val();
        data.ToDate = $('#InvoiceToDate').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/PendingMRVGets",
            data: data,
            success: function (result) {
                ShowPOList(result.oList);

            }
        });

    } else if (Flag == 0) {
        $('#InvoiceFromDate').val(CurDate);
        $('#InvoiceToDate').val(CurDate);

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/PendingMRVGets",
            data: data,
            success: function (result) {
                ShowPOList(result.oList);

            }
        });
    }
}

function ShowPOList(result) {
    disable_datatable('tbl_POList');
    $('#RowGet').val = '';
    $('#myModalLabel17').text('Pending MRV');
    $('#add').hide();
    $('#View').show();
    $('#iconForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheck'  'custom-control-input cz-bg-image-display'  onchange='SelectAllSupp()' >&nbsp;&nbsp;&nbsp;Select</th><th>MRV Num.</th><th>DO Num.</th><th>MRV Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th></tr>" +
        "<tr><th> </th><th>MRVNo</th><th>DONo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr><td style="width:90px;" ><input type="checkbox"  checked  id= ' + 'SlNoCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td><td id=' + 'MRVNo' + slno + '>'
            + result[l].MRVNo + '</td><td>'
            + result[l].DONo + '</td><td>'
            + result[l].MRVDate + '</td><td>'
            + result[l].SupplierName + '</td><td><input type="hidden" id="Curr' + slno + '" value='
            + result[l].CurrencyId + '>'
            + result[l].CurrencyName + '</td><td>'
            + result[l].Remarks + '</td></tr>';
    }
    $('#tbl_POList').html(responseText + '</tbody>');

    datatableWithsearch('tbl_POList', 'Multiple');

    $('#RowGet').val(result.length)
    $('#btnview').focus();

}

function SelectAllSupp() {

    var rowCount = $('#RowGet').val();
    var flag = $("#SlNoHeadCheck").is(":checked")


    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheck" + i) != null) {
            document.getElementById("SlNoCheck" + i).checked = flag;
        }
    }

}

function ViewItemList() {

    var table = $("#tbl_POList").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }
    
    MRVNumber = '';
    var row = $('#RowGet').val();
    var CurrencyFlag = 0;


    for (var n = 1; n <= row; n++) {
        if ($("#SlNoCheck" + n).is(":checked")) {
            CurrentCurrency = $('#Curr' + n).val();
            break;
        }
    }


    for (var d = 1; d <= row; d++) {
        if ($("#SlNoCheck" + d).is(":checked")) {
            if ($('#Curr' + d).val() != CurrentCurrency) {
                CurrencyFlag = 1;
                break;
            }
            else
                continue;
        }
    }

    if (CurrencyFlag == 1) {
        warningshow('Select MRV with Same Curency');
    }
    else {

        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheck" + m).is(":checked")) {

                if (MRVNumber == '') {
                    MRVNumber += $('#MRVNo' + m).text();
                }
                else {
                    MRVNumber += ',' + $('#MRVNo' + m).text();
                }

            }
        }
        var data = {};
        data.MRVNumber = MRVNumber;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/PendingMRVGetProduct",
            data: data,
            success: function (result) {
                if (MRVNumber != 0)
                    ShowItemGet(result.oList);

            }
        });
    }

}

//table based on PO Number
function ShowItemGet(result) {
    disable_datatable('tbl_PO_ListItem');
    $('#myModalLabel17').text('MRV Item List');
    $('#View').hide();
    $('#add').show();
    $('#iconForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckItem' onchange='SelectAllItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>MRVNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>MRVNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if (parseInt(result[l].Quantity) != 0) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckgrid' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
                result[l].MRVNo + '<input type="hidden" id="MRVSlNo' + slno + '" value=' +
                result[l].MRVSubId + '><input type="hidden" id="MRV' + slno + '" value=' +
                result[l].MRVNo + '></td><td id=' + 'Product' + slno + '>' +
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
                result[l].FCTaxable + '></td><td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].FCTax).toFixed(Decimal) + '<input type="hidden" id="taxamt_' + slno + '" value=' +
                result[l].FCTax + '></td><td id=' + 'total' + slno + '>' +
                parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
                result[l].TotalAmount + '><input type="hidden" id="LiJobno_' + slno + '" value=' +
                result[l].JobNo + '><input type="hidden" id="LiJobcode_' + slno + '" value=' +
                result[l].JobCode + '></td></tr>';
        }
    }
    $('#tbl_PO_ListItem').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PO_ListItem', 'Multiple');
    $('#RowGet1').val(result.length)
    $('#btnaddtogrid').focus();
}

function SelectAllItem() {
    var rowCount = $('#RowGet1').val();
    var flag = $("#SlNoHeadCheckItem").is(":checked")
    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoCheckgrid" + i) != null) {
            document.getElementById("SlNoCheckgrid" + i).checked = flag;
        }
    }

}

function MRVAddToGrid() {
    //Adding datas in grid in main form from PO list

    var table = $("#tbl_PO_ListItem").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    TaxArray = [];
        var P = [];
        var PO = [];
        var row = $('#RowGet1').val();

        i = 1;
        $("#tblpurchaseinvoice tr").remove();
        GetCurrency(CurrentCurrency);
        BillDiscountFlag = 0;
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckgrid" + m).is(":checked")) {

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
                var taxrate = $('#taxrate' + m).val() || 0;
                var taxableamt = parseFloat($('#taxableamt' + m).val() || 0).toFixed(Decimal);
                var taxamt = parseFloat($('#taxamt_' + m).val() || 0).toFixed(Decimal);
                var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                var mrv = $('#MRV' + m).val();
                var mrvsl = $('#MRVSlNo' + m).val();
                var LiJobid = $('#LiJobno_' + m).val();
                var Lijobcode = $('#LiJobcode_' + m).val();
                $('#iconForm').hide();

                P[m] = mrv;
                P.forEach(function (value) {
                    if (PO.indexOf(value) == -1) PO.push(value);
                });


                var no = $('#tblpurchaseinvoice tr').length + 1;
                var id = parseInt(i);

                var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"
                        + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='MRVId_" + id + "' value='" +
                        mrv + "'><input type='hidden' id='MRVSubId_" + id + "' value='" +
                        mrvsl + "'><input type='hidden' id='productId_" + id + "' value='" +
                        productIdgrid + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                        Product + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "'  class='form-control' disabled style='height:30px;background-color:white' value='" +
                        Des + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' >" +
                        UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                        parseInt(qty) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' ><input type='hidden' id='demoqty_" + id + "' value='"
                        + parseInt(qty) + "'></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control CheckRateZero' disabled style='height:30px;background-color:white'  value='" +
                        parseFloat(rate).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                        parseFloat(discount).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)'></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
                        parseFloat(taxableamt).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' >" +
                        TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
                        parseFloat(taxrate) + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                        parseFloat(taxamt).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                        parseFloat(total).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' >" +
                        LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
                        + LiJobid + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
                        + Lijobcode + "'></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td></tr>";


                $('#tblpurchaseinvoice').append(ProdEditRow);
                $('#unit_' + id).val(unitIdgrid);
                $('#locn_' + id).val(locnid);
                $('#tax_' + id).val(taxid);
                i++;
                var item = $("#taxpercentage_" + id).val();
                if (TaxArray.indexOf(item) == -1) {
                    TaxArray.push(item);
                }
                if (parseFloat($('#discount_' + id).val()) > 0 || TaxArray.length > 1) {
                    $('#disc').prop("disabled", true);
                    $('#disc').val('0.00');
                    BillDiscountFlag = 1;
                }
            }

        }
        CalcAmt();
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = parseInt($('#tblpurchaseinvoice tr').length) + 1;

        $('#mrv').val(PO)
        $('#MRVNo').val(PO)
        CurrentCurrency = 0;
        HidePO();


}


function SearchInvoiceSub(Flag) {
    if (Flag == 1) {
        if ($('#ProductPopUp1Id').val() != 0) {
            var data = {};
            data.MRVNumber = MRVNumber;
            data.ItemId = $('#ProductPopUp1Id').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../MRVPurchase/PendingMRVGetProduct",
                data: data,
                success: function (result) {
                    if (MRVNumber != 0)
                        ShowItemGet(result.oList);

                }
            });
        }
        else {
            warningshow('Please Enter Valid Product', 'ProductPopUp1');
        }

    } else if (Flag == 0) {

        $('#ProductPopUp1Id').val(0);
        $('#ProductPopUp1').val('')

        var data = {};
        data.MRVNumber = MRVNumber;
        data.ItemId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/PendingMRVGetProduct",
            data: data,
            success: function (result) {
                if (MRVNumber != 0)
                    ShowItemGet(result.oList);

            }
        });

    }
}

function BackMRV() {
    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('')
    $('#myModalLabel17').text('Pending MRV');

    $('#add').hide();
    $('#View').show();

}


//====================================================COMMON====================================================================


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

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}



//Show Window Alert Insert,update delete  Modify
function Showalerts(Status, no) {
    if (Status == 1) {
        formrefresh(0);
        swal('MRV Purchase Invoice No-' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        createnew()
        swal('MRV Purchase No - ' + no + ' Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }

    else if (Status == 5) {
        swal('Invoice No-' + no + ' Already Exist', "for Previous MRV Purchase", "warning");
        $('.swal-button swal-button--confirm').focus();


    }
    else {
        swal('Same Invoice Number Already Exists For This Supplier', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

//Show Window Alert Insert of Popups

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


function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo'|| title=='MRVNo') {
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
        table = $('#' + tablename).DataTable({
            dom: 'tir',
            orderCellsTop: true,
            "order": [],
            "pageLength": -1
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

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                      "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Quantity</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";


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
                        ProdRow = ProdRow + "<tr id='pid_" + Z + "'>" +
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



                }
                $('#tblpurchasetrans').html(ProdRow + "</tbody>");

                $('#alltranscheckboxdiv').show();
                $('#alltranscheckboxdivsales,#alltranscheckboxdivPREV').hide();
                $('#productpdiv').hide();
                $('#productdiv').hide();
                $('#salestrans,#alltrans').hide();
                $("#PurchaseTransactionPopup").css("margin-top", '0px');
                $('#PurchaseTransactionPopup').show();
                $('#PurchaseTransactionheader').text($('#productdesc_0').val() + '(' + $('#product_0').val() + ') : Last Purchase Transactions');
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

    var ProdRow = "<thead><tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                             "<tr class='text-left'><th>SalesInvoice</th><th>Date</th><th style='width:27%'>AccountName</th><th style='width:6%'>Quantity</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


    for (var n = 0; n < result.length; n++) {

        ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                       "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
                       "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
                       "<td class='text-left'>" + result[n].CustName + "                                   </td>" +
                       //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td class='text-right'>" + result[n].ProdQty + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left'>" + result[n].SalesMan + " </td>" +
                       //"<td style='width:15%'>" + result.oList[n].ProductDescr + " </td>" +
                       //"<td class='text-right'>" + parseFloat(result[n].Amount || 0).toFixed(Decimal) + " </td>" +
                       //"<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
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