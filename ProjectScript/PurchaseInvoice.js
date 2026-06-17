//Global Variable Declaration

var i = 1; var x = 1; var TId = "";
var TaxSelect = ""; var UnitSelect = ""; var LocationSelect = ""; var CurrencySelect = ""; var MRVNumber = '';
var Decimal = Decimal; var DepId = ERPDeptId; var UId = ERPUserId; var ULocId = UserLocationId;
var locn = ""; var unit = ""; var quantity = ""; var TaxArray = [];
var rate = "";          var disc = "";              var tax = "";
var taxper = "";        var FlagEdit = 0;           var Invoice = 0;
var UnitFlag = 0;       var UFlag = 0;              var ProductFlag = 0;
var Account = "";       var AccType = "";           var CreditAmt = "";
var DebitAmt = "";      var FlagCostEdit = 0;       var OtherCost = [];
var CopyFlag = 0; var ExistFlag = 0;      var NextInvoiceNo = 0;      var OtherCostFlag = 0;
var Z = 0;              var CurrentCurrency = 0;    var PONumber = '';
var jobrowid = ''; var jobrowcode = 0; var X = 0; var boqqty = 0; var boqrate = 0;
var BillDiscountFlag = 0; var EditSplitTaxable = 0; var EditSplitTaxable = 0;
var DefaultSupplier = 0; var DefaultInvo = ''; var DefaultArea = 0; var DefaultTaxArray = [];


//Document.Keydown Function

$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();


    var x = event.keyCode;
    if ((x > 111 && x < 124)) {
        if (x == 118)  {                                                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            LastSalesTransactions();
        }
        else if (x == 119)  {                                               // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
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
        HidePerforma();
        HideMRV();
        $('#purchaseViewForm').hide();
    }
        //Product Secondary Popup
    else if (e.altKey && e.keyCode == 51) {             //Alt+3    :   Last Purchase details Popup       

        //LastPurchaseTransactions();
    }

    else if (e.altKey && e.keyCode == 49) {             //Alt+1    :   Last Sales details Popup       


        //LastSalesTransactions();
       
    }
    else if (e.altKey && e.keyCode == 52) {         //Alt+4    :   All Transaction details Popup      
        //lastalltrans();
    }
        
    else if ((e.altKey) && e.keyCode == 80) {
        PrevItemsExistorNot();
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

    if (usermenu1.indexOf("M292") != -1) { $("#URight").val("YES"); } else { $("#URight").val("NO"); }

    if ((usermenu1.indexOf("M224") != -1)) {
        $("#upload,#btnexcel").show();
        $("#fileUpload").show();
       
    }

    //Page Load Functions
    Serialnoload();
    GetCurrency(0);
    GetArea(0);
    GetLocation(0);
    
    GetUnit();
    GetTax();
    Terms(0);
    Defaultfocus();
    LoadProduct();
    

    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
    });

    //display Item data list based on PO NO in 2nd Popup

    $("#btnview").click(function (e) {
  
        var table = $("#tbl_POList").DataTable();
        for (var h = 1; h <= 5; h++) {
            table.column(h).search('').draw();
        }

        PONumber = '';
        var row = $('#RowGet').val();
        var CurrencyFlag=0;


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
            warningshow('Select PO with Same Curency');
        }
        else {

            for (m = 1; m <= row; m++) {
                if ($("#SlNoCheck" + m).is(":checked")) {

                    if (PONumber == '') {
                        PONumber += $('#OrderNo' + m).text();
                    }
                    else {
                        PONumber += ',' + $('#OrderNo' + m).text();
                    }

                }
            }
            var data = {};
            data.PONumber = PONumber;
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseOrderGetProduct",
                data: data,
                success: function (result) {
                    if (PONumber != 0)
                        ShowItemGet(result.oList);

                }
            });
        }
        
    });

    //Adding datas in grid in main form from PO list
    $("#btnaddtogrid").click(function (e) {

        if ($('#location').val() == 0)
            var LocationSeleted = ULocId;
        else
            var LocationSeleted = $('#location').val();

        $('.distxtbox').val('0.00');
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
        GetCurrency(CurrentCurrency)
        BillDiscountFlag = 0;
        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckgrid" + m).is(":checked")) {
                
                var productIdgrid = $('#ProductIdgrid' + m).val();
                var Product = $('#Product' + m).text();
                var Des = $('#Des' + m).text();
                var locnid = $('#locnid' + m).val();
                var unitIdgrid = $('#UnitIdgrid' + m).val();
                var unit = $('#UnitName' + m).text();               
                var qty = parseInt($('#qty_' + m).val()||0);
                var rate = parseFloat($('#rte_' + m).val()||0).toFixed(Decimal);
                var discount = parseFloat( $('#dis_' + m).val()||0).toFixed(Decimal);
                var taxid = $('#taxidview' + m).val();
                var taxrate = $('#taxrate' + m).val()||0;
                var taxableamt = parseFloat($('#taxableamt' + m).val()||0).toFixed(Decimal) ;
                var taxamt = parseFloat($('#taxamt_' + m).val()||0).toFixed(Decimal);
                var total = parseFloat($('#total_' + m).val()||0).toFixed(Decimal);
                var Orderid = $('#orderno' + m).val();
                var POSlno = $('#POSlNo' + m).val();
                var LiJobid = $('#LiJobno_' + m).val();
                var Lijobcode = $('#LiJobcode_' + m).val();

                var MainProjectJobId = $('#MainProjectJobId_' + m).val();
                var MainProjectJobCode = $('#MainProjectJobCode_' + m).val();

                $('#jobid').val(MainProjectJobId);
                $('#jobcode').val(MainProjectJobCode);

                $('#iconForm').hide();
                var no = $('#tblpurchaseinvoice tr').length + 1;
                var slno = parseInt(i);

                P[m] = Orderid;
                P.forEach(function (value) {
                    if (PO.indexOf(value) == -1) PO.push(value);
                });

                var ProdEditRow = "<tr class='jsgrid-row' id='row_" + slno + "' onfocusin='Editrow(" + slno + ")' onfocusout='UpdateRow(" + slno + ")'>" +               //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>
                    "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + slno + ")'  title= Delete ></td>" +
                    //"<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + slno + ")'></td>" +
                    "<td id='td_" + slno + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"+ no + "<input type='hidden' id='sl_" + slno + "' value=" + slno + "></td>" +
                    "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + slno + "' value='" + Orderid + "'><input type='hidden' id='OrderSubId_" + slno + "' value='" + POSlno + "'><input type='hidden' id='productId_" + slno + "' value='" + productIdgrid + "'><input type='text' id='product_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" + Product + "'></td>" +
                    "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" + Des + "'></td>" +                   
                    "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + slno + "' onchange='CheckFOC(" + slno + ",this)' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + slno + ") onfocusout=focusoutgrid('u'," + slno + ") onfocusin=focusingrid('u'," + slno + ")>" + UnitSelect + "</select><input type='hidden' id='txtunit_" + slno + "' class='form-control' /></td>" +
                    "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='demoqty_" + slno + "' value='" + qty + "'><input type='text' id='quantity_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" + qty + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + slno + ") onfocusout=focusoutgrid('q'," + slno + ") onfocusin=focusingrid('q'," + slno + ")></td>" +
                    "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + slno + "' class='form-control' disabled style='height:30px;background-color:white'  value='" + rate + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + slno + ") onfocusout=focusoutgrid('r'," + slno + ") onfocusin=focusingrid('r'," + slno + ")><input type='hidden' id='baserate_" + slno + "' class='form-control' value='' ></td>" +
                    "<td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + slno + "' class='form-control' disabled style='height:30px;background-color:white'  value='" + discount + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + slno + ") onfocusout=focusoutgrid('d'," + slno + ") onfocusin=focusingrid('d'," + slno + ")></td>" +
                    "<td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + slno + "' class='form-control' style='height:30px;background-color:white'  value='" + taxableamt + "' disabled></td>" +
                    "<td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + slno + "' onchange='ChangeTax(" + slno + ",this)' onkeydown=Focusnextgrid(event,'t'," + slno + ") onfocusout=focusoutgrid('t'," + slno + ") onfocusin=focusingrid('t'," + slno + ")>" + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + slno + "' value=" + taxrate + "></td>" +
                    "<td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + slno + "' class='form-control' style='height:30px;background-color:white' disabled value='" +taxamt + "'></td>" +
                    "<td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' ><input type='hidden' id='txtsubtotal_" + slno + "' value=''><input type='text' id='amount_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +total + "'><input type='hidden' id='baseamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + slno + "' class='form-control'   disabled value=''></td>" +
                    "<td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + slno + ") onfocusout=focusoutgrid('l'," + slno + ") onfocusin=focusingrid('l'," + slno + ")>" + LocationSelect + "</select></td>" +
                    "<td id='col_13' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:250px;'><input type='hidden' id='jobcodeid_" + slno + "' value='" + LiJobid + "'><input type='text' id='jobcode_" + slno + "' value='" + Lijobcode + "' class='form-control' style='height:30px;background-color:white'  disabled onkeydown=Focusnextgrid(event,'j'," + slno + ") onfocusout=focusoutgrid('j'," + slno + ") onfocusin=focusingrid('j'," + slno + ")></td>" +
                    "<td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td>" +
                    "</tr>";

                $('#tblpurchaseinvoice').append(ProdEditRow);
                $('#unit_' + slno).val(unitIdgrid);
                
                $('#locn_' + slno).prop('disabled', false);
                $('#unit_' + slno).prop('disabled', false);
                $('#quantity_' + slno).prop('disabled', false);
                $('#txtrate_' + slno).prop('disabled', false);
                $('#discount_' + slno).prop('disabled', false);
                $('#tax_' + slno).prop('disabled', false);
                $('#jobcode_' + slno).prop('disabled', false);

                if (locnid != 0)
                    $('#locn_' + slno).val(locnid);
                else
                    $('#locn_' + slno).val(LocationSeleted);

                $('#tax_' + slno).val(taxid);
                i++;
                 
                var item = $("#taxpercentage_" + slno).val();
                if (TaxArray.indexOf(item) == -1) {
                    TaxArray.push(item);
                }
              
                //if (parseFloat($('#discount_' + slno).val()) > 0 || TaxArray.length > 1) {
                if (parseFloat($('#discount_' + slno).val()) > 0) {
                    $('#disc').prop("disabled", true);
                    $('#disc').val('0.00');
                    BillDiscountFlag = 1;
                }
                TaxSplit(slno)
            }

        }
        if ($('#location').val() == 0)
            $('#location').val(LocationSeleted);
        CalcAmt();
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = parseInt($('#tblpurchaseinvoice tr').length) + 1;

        $('#lpo').val(PO)
        $('#PONo').val(PO)
        CurrentCurrency = 0;
        HidePO();
        TemporarySavePurchase();
    });




    $('#purchaseinvdate').val(CurDate);

    $("#location").change(function (e) {
        $('#locn_0,#locn_job').val($('#location').val());
        var selectedValue = $(this).val();
    });

    $("#currency").change(function () {
        var selectedValue = $(this).val();
        $("#rate").val(parseFloat($(this).find("option:selected").attr("name")).toFixed(Decimal))
        $('#disc,#Discountpercent').val('0.00');
        CalcAmt();
        CalcGrandTotal(i);
        CalcDiscountSplitTax1();
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
            //$('#tour1').show();
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
                $('#paytype').focus();
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
    $("#paytype").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#terms').focus();
        }
    });
    $("#purchaseinvdate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#shipdate').focus();
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
            $('#purchaseinvdate').focus();
        }

    });
    $("#placeofsupply").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#jobcode').focus();
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
            else if( $("#jobcode").val()!='') {
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
            $("#SupInvoTotal").select();
        }

    });
    $('#currency').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#placeofsupply").focus();
        }

    }); 
    $('#rate').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#placeofsupply").focus();
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
                $('#ProductLength').val('')
                ClearProductDetails();
                ProductPopuprefresh();
            }
        }

    });
    $("#locn_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $('#unit_0').focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#product_0').focus();
            $('#product_0').select();
        }

    });
    $("#unit_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $('#quantity_0').focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#locn_0').focus();
        }

    });
   
    $('#quantity_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $("#txtrate_0").focus();
            $("#txtrate_0").select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#unit_0').focus();
        }

    });

    $('#txtrate_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $("#discount_0").focus();
            $("#discount_0").select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#quantity_0').focus();
            $('#quantity_0').select();
        }

    });
    $('#discount_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $("#tax_0").focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#txtrate_0').focus();
            $('#txtrate_0').select();
        }

    });
    $('#tax_0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $("#btnadd").focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#discount_0').focus();
            $('#discount_0').select();
        }

    });
    $('#btnadd').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            e.preventDefault();
            $("#product_0").focus();
            $('#product_0').select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#tax_0').focus();
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

      if (getQueryString('slno') != null) {
          NextInvoiceNo = parseInt($('#purchaseinvoiceno').val() || 0);
          var data = {};
          data.SlNo = getQueryString('slno');
          data.DepartmentId = ERPDeptId;
          $.ajax({
              type: "POST",
              url: "../Purchase/PurchaseInvoiceGetandGets",
              data: data,
              success: function (result) {
                  CopyFlag = 1;
                  $('.form-control').prop('disabled', true);
                  $('#copypurchaseinvo').prop("disabled", true);
                  $('.jsgrid-button').prop('disabled', true);
                  $('#btnsubmit').prop("disabled", true);
                  $('#btnlist').prop("disabled", true);
                  $('#btnadd').prop("disabled", true);
                  $('#btncrncysave,#btncrncyclear').prop("disabled", true);
                  $('#btnaddcost').prop("disabled", true);
                  $('#purchaseinv').hide();
                  $('#copypurchase').show();
                  PurchaseGets(result.oList);
              }

          });
      }
    else {
        Defaultfocus();
        Serialnoload();
    }


      if (getQueryString('AccId') != null) {
          var AccDesc = '';
          AccDesc = getQueryString('AccDesc').split('%20').join(' ');
          
          var data = {};
          data.CustId = getQueryString('CustId');
          data.cstyp = getQueryString('CustType');
          $.ajax({
              type: "POST",
              url: '../Master/CustomerOrSupplierSearch',
              data: data,
              success: function (result) {
                  $('#suppliername').val(AccDesc);
                  $("#supplierId").val(getQueryString('CustId'));
                  $('#product_0').focus();
                  SearchSupplierInvoice();
                  GetCurrency(ui.item.CurncyId)
                  $('#terms').val(ui.item.CustTermsId);
                  if (ui.item.AreaId != 0) {
                      $('#placeofsupply').val(ui.item.AreaId);
                  } else {
                      $('#placeofsupply').val(DefaultArea);
                  }
                  var terms = $($('#terms')).find("option:selected").attr("name");
                  getdate(terms);

              }
          });
      }



});



function SavePurchaseInvoice() {
    //CalcInvoice();

    var r = parseFloat($('#rate').val()).toFixed(Decimal);
    $("#rate").val(isNaN(r) ? 0 : r);

    var RateFlag = 0;
    $(".CheckRateZero").each(function () {
        var a = parseFloat($(this).val()).toFixed(Decimal);
        if (a == 0) {
            RateFlag = 1;
            return false;
        }

    });

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
     if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
     }
     else if (RateFlag == 1) {
         warningshow('Rate Must Be Greater Than Zero for all Items');
     }
     else if (parseFloat($('#GrandTotal').val()) <= 0 && $('#tottaxable').val() <= 0) {
         warningshow('GrandTotal Cannot Negative or Zero', 'tottaxable');
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
    else if ($.trim($('#rate').val()) == '' || $.trim($('#rate').val()) == 0) {
        $('#rate').select();
        warningshow('Enter Currency Rate', 'rate');
    }
    //else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
    //    $('#SupInvoTotal').select();
    //    warningshow('Enter Invoice Amount', 'SupInvoTotal');
    //}
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
    else if (parseFloat($("#GrandTotal").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES" && $("#jobid").val() != 0) {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountSave'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else if ($('#invdiff').val() != 0) {

        $('#Confirmflag').val('amountdiff'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('GrandTotal and Invoice Total Has Variation! Do You Want to Continue?');
        $('#confirm').show();
        $('#confirmOk').focus();
    }    
    else {
        PurchaseSaveorNotPopup();

    }
}

function PurchaseSaveorNotPopup() {
        $('#Confirmflag').val('puchasesave'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save the Purchase Bill?')
        $('#confirm').show();
        $('#confirmOk').focus();
}

function focustogrid(e) 
{
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0; 
 if (key == 40 && $.trim($("#product_0").val()) == '' && $('#tblpurchaseinvoice tr').length > 0) {
    var row = $('#tblpurchaseinvoice').find(' tbody tr:eq(0)').attr('id').match(/\d+/)[0];
  
    if (row) {
        $('#quantity_' + row).focus();
        $('#quantity_' + row).select();
    }
}

}

function UpdatePurchaseInvoice() {
   
    //CalcInvoice();

    var r = parseFloat($('#rate').val()).toFixed(Decimal);
    $("#rate").val(isNaN(r) ? 0 : r);

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
    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if (parseFloat($('#GrandTotal').val()) <= 0 && $('#disc').val() != '') {
        warningshow('GrandTotal Cannot Negative or Zero', 'disc');
    }
    else if ($('#purchaseinvoiceno1').val() == '') {
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
    //else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
    //    $('#SupInvoTotal').select();
    //    warningshow('Enter Invoice Amount', 'SupInvoTotal');
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
    else if (OtherCostFlag == 1) {
        warningshow('Other Cost Not Saved', 'btnothercost');
    }
    else if (parseFloat($("#GrandTotal").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES" && $("#jobid").val() != 0) {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountCopy'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else if ($('#invdiff').val() != 0) {

        $('#Confirmflag').val('amountdiffcopy'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('GrandTotal and Invoice Total Has Variation! Do You Want to Continue?');
        $('#confirm').show();
        $('#confirmOk').focus();
    }
    else { 
        UpdateorNot();
    }
}

function UpdateorNot() {
        $('#Confirmflag').val('puchaseupdate'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Update the Purchase Bill?')
        $('#confirm').show();
        $('#confirmOk').focus();
}
function OKSavePurchase() {
    //ajax code for insert and update to  controller

    $("#hiddenitemcode").val('');
    var AvgCostItems = [];

    $('#btnsubmit').prop("disabled", true);
    $('#confirmOk').prop("disabled", true);

            var oArray = new Array();
            for (var k = 1; k < i; k++) {

                var PurchaseInvoiceMainId = $('#PurchaseInvoiceMainId').val();
                var SlNo = $('#purchaseinvoiceno').val();
                var InvoNo = $('#purchaseinvoiceno1').val();
                var SupplierId = $('#supplierId').val();
                var PayType = $('#paytype').val();
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
                var OrderId = $('#OrderId_' + k).val();
                var OrderSubId = $('#OrderSubId_' + k).val();
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
                var LPO = $('#PONo').val();
                var PONo = $('#PONo').val();
                var FCRoundOff = $('#invdiff').val();
                var RoundOff = $('#baseinvdiff').val();
                var BaseInvoiceamount = $('#BaseInvoiceamount').val();

                var TaxId1 = $('#mtaxid1').val();
                var Taxable0 = $('#splittaxable_0').val();

                var TaxId2 = $('#mtaxid2').val();
                var Taxable5 = $('#splittaxable_5').val();
                var Tax5 = $('#splittax_5').val();

                var TaxId3 = $('#mtaxid3').val();
                var Taxable12 = $('#splittaxable_12').val();
                var Tax12 = $('#splittax_12').val();

                var TaxId4 = $('#mtaxid4').val();
                var Taxable18 = $('#splittaxable_18').val();
                var Tax18 = $('#splittax_18').val();

                var TaxId5 = $('#mtaxid5').val();
                var Taxable28 = $('#splittaxable_28').val();
                var Tax28 = $('#splittax_28').val();

                var MRVId = parseInt($('#MRVId_' + k).val()||0);
                var MRVSubId = parseInt($('#MRVSubId_' + k).val() || 0);

                var Performa_NO = $('#PerformaId_' + k).val();
                var Performa_SubTbl_Id = $('#PerformaSubId_' + k).val();

                var Variable1 = parseInt($("#jobid").val() ||0);

                if (!(typeof ItemCode == "undefined")) {

                    if (AvgCostItems.indexOf(ItemId) == -1) {
                        AvgCostItems.push(ItemId);
                    }

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
                        'OrderId': OrderId,
                        'DeleteFlag': DeleteFlag,
                        'LPO': LPO,
                        'OrderSubId': OrderSubId,
                        'PONo': PONo,
                        'FCRoundOff': FCRoundOff,
                        'RoundOff': RoundOff,
                        'BaseInvoiceamount': BaseInvoiceamount,

                        'TaxId1': TaxId1,
                        'Taxable0': Taxable0,

                        'TaxId2': TaxId2,
                        'Taxable5': Taxable5,
                        'Tax5': Tax5,

                        'TaxId3': TaxId3,
                        'Taxable12': Taxable12,
                        'Tax12': Tax12,

                        'TaxId4': TaxId4,
                        'Taxable18': Taxable18,
                        'Tax18': Tax18,


                        'TaxId5': TaxId5,
                        'Taxable28': Taxable28,
                        'Tax28': Tax28,

                        'MRVId': MRVId,
                        'MRVSubId': MRVSubId,

                        'Performa_NO': Performa_NO,
                        'Performa_SubTbl_Id': Performa_SubTbl_Id,
                        'Variable1': Variable1
                    })
                }
            }
         
            if (oArray != "") {

                var data = { 'PurchaseInvoiceModel': oArray };
                $.ajax({
                    type: "POST",
                    url: "../Purchase/PurchaseInvoiceInsertandUpdate",
                    data: data,
                    success: function (result) {
                        for (var i = 0; i < result.oList.length; i++) {
                            var status = result.oList[i].Status;
                            var no = result.oList[i].SlNo;
                            var Invodate = result.oList[i].InvoDate;
                            var Jobno = result.oList[i].JobNo;
                            var CurrencyId = result.oList[i].CurrencyId;
                            var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);

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
                                    var JobCode = Jobno;
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
                                            'JobNo': JobCode,
                                            'CurrencyId': CurrencyId,
                                            'CurrencyRate': CurrencyRate,
                                            'UserId': UserId,
                                            'DepartmentId': DepartmentId,
                                            'DeleteFlag': DelFlag
                                        })
                                    }
                                }
                              
                                if (bArray != "") {
                                    var data = { 'PurchaseInvoiceModel': bArray };
                                    $.ajax({
                                        type: "POST",
                                        url: "../Purchase/OtherCostInsertandUpdate",
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

                                $("#hiddenitemcode").val(AvgCostItems);
                                var datac = {};
                                datac.ItemCode = $("#hiddenitemcode").val();
                                datac.DepartmentId = ERPDeptId;
                                datac.UserId = ERPUserId;
                                $.ajax({
                                    type: "POST",
                                    url: "../Purchase/PurchaseAverageCostRefresh",
                                    data: datac,
                                    success: function (result) { }
                                });

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


function checkproduct() {
    var a = ($('#product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#productId_0').val(0);
    }

}
function ReportGetCopy(slno,depid) {

    NextInvoiceNo = parseInt($('#purchaseinvoiceno').val() || 0);
    var data = {};
    data.SlNo = slno;
    data.DepartmentId = depid;
    $.ajax({
        type: "POST",
        url: "../Purchase/PurchaseInvoiceGetandGets",
        data: data,
        success: function (result) {
            CopyFlag = 1;
            $('.form-control').prop('disabled', true);
            $('#copypurchaseinvo').prop("disabled", false);
            $('.jsgrid-button').prop('disabled', true);
            $('#btnsubmit').prop("disabled", true);
            $('#btnlist').prop("disabled", true);
            $('#btnadd').prop("disabled", true);
            $('#btncrncysave,#btncrncyclear').prop("disabled", true);
            $('#btnaddcost').prop("disabled", true);
            $('#purchaseinv').hide();
            $('#copypurchase').show();
            PurchaseGets(result.oList);
        }

    });

}

//On Change of Tax

function ChangeTax(TId, selectObject)
{
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
                $("#purchaseinvoiceno1").blur();
            }
            else {
                getslno(result.oList);
                
            }
            

        }
    });

}

function getslno(result) {
    $('#purchaseinvoiceno').val(result[0].PurSlno);
    $('#ImpTax').val(result[0].ImportPurTax);
    $('#accountdescription').val('Other Cost Against Purchase InvNo: ' + result[0].PurSlno);
    NextInvoiceNo = parseInt(result[0].PurSlno || 0);

}

function CheckPurchaseType() {
    if ($('#purchasetype').val() == 'Import') {
        $('#tax_0').val($('#ImpTax').val());
        $("#taxpercentage_0").val($('#tax_0').find("option:selected").attr("name"));
        if($('#productId_0').val()!=0){
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
            LocationLoad(result.oList,id);


        }
    });

}

function LocationLoad(result,a) {
    $("#location,#locn_0,#locn_job").empty();
    LocationSelect="<option value='0'>-Select-</option>";
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
    UnitSelect ="<option value='0'>-Select-</option>";
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
    var TaxSplit = "";
    var s = 0;
    DefaultTaxArray=[];
    for (var i = 0; i < result.length; i++) {       
        TaxSelect += "<option value='" + result[i].TaxId + "'name='" + result[i].TaxRate + "' title='" + result[i].TaxName + "'>" + result[i].TaxName + "</option>";
        s = i+ 1;
        TaxSplit = "<tr class='jsgrid-row' id='" + result[i].TaxId + "'>" +
        "<td class='text-center' style='width:auto;width:30%;border:1px solid #BABFC7;'><input type='hidden' id='mtaxid" + s + "' value='" + result[i].TaxId + "'><input type='hidden' id='splitaxrate_" + result[i].TaxId + "' value='" + result[i].TaxRate + "'> " + result[i].TaxName + "</td>" +
        "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center distxtbox' id='splittaxable_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittaxable_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "<td class='text-center' style='width:auto;width:40%;border:1px solid #BABFC7;'><input type='text' disabled style='background-color:white;border:none;height:30px' class='form-control text-center distxtbox' id='splittax_" + result[i].TaxRate + "' value='0.00'><input type='hidden' class='distxtbox' id='hiddensplittax_" + result[i].TaxRate + "' value='0.00' /></td>" +
        "</tr>";
        DefaultTaxArray.push(result[i].TaxRate);
        $('#tbltaxsplit').append(TaxSplit);
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
            AreaLoad(result.oList,id);


        }
    });
}

function AreaLoad(result, a) {
    
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
            CurncyLoad(result.oList,id);


        }
    });
}

function CurncyLoad(result,a) {
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
    $("#rate").val(parseFloat($("#currency").find("option:selected").attr("name")).toFixed(Decimal));
    $("#CostCurrRate").val(parseFloat($("#CostCurrency").find("option:selected").attr("name")).toFixed(Decimal));

    if (a != 0) {      
        $('#currency').val(a);
        $("#rate").val(parseFloat($("#currency").find("option:selected").attr("name")).toFixed(Decimal));
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
    if (CopyFlag == 0) {
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
    else {
        if ($('#supplierId').val() != DefaultSupplier || $.trim($('#purchaseinvoiceno1').val()) != DefaultInvo) {
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
    }
}


function Show(status) {
    if (status == 1) {
        warningshow('Same Invoice Number Already Exists For This Supplier ', 'purchaseinvoiceno1');
        $('.form-control,.jsgrid-button,#btnsubmit,#btnsaveedit,#btnadd,#btnothercost,#btnlist').prop('disabled', true);
        $('#purchaseinvoiceno1').prop("disabled", false);
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno1').focus();
        ExistFlag = 1;
    }
    else if (status == 0) {

        $('.editds,.jsgrid-button,#btnsubmit,#btnsaveedit,#btnadd,#btnothercost,#btnlist').prop('disabled', false);
        $('#purchaseinvoiceno1,#transfer,#lpo,#CostCurrRate,#CostCurrency').prop("disabled", false);
        $('#totdisc,#tottaxable,#tottax,#totcredit,#totdebit,#costdiff,#Discountpercent,.distxtbox').prop("disabled", true);
        if ($('#tblOtherCost tr').length > 0) {
            $('#CostCurrency').prop("disabled", true);
            $('#CostCurrRate').prop("disabled", true);
        }
        $('#suppliername').prop("disabled", false);
        $('#purchaseinvoiceno').prop("disabled", true);
        $('#invdiff').prop("disabled", true);
        $('#taxpercentage_0').prop("disabled", true);
        $('#amount_0').prop("disabled", true);
        ExistFlag = 0;
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
    //else if ((parseFloat($("#txtrate_0").val() || 0) > parseFloat($("#BOQAmt_0").val() || 0) || parseInt($("#quantity_0").val() || 0) > parseInt($("#boq_0").val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES' && $("#jobcodeid_0").val() != 0) {
    //    CheckBOQ(0);
    //    return false;
    //}
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
    else if (UnitFlag == 1 &&($.trim($('#txtrate_0').val()) == '' || $('#txtrate_0').val() != 0)) {     
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

         if(ProductFlag==1){
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                ClearProductRow();
                ProductFlag = 0;
                return false;
            }
         }
         CalCDefTaxSplit();
         $('#prodappdiv').empty();
         $('#prodappdiv').append("<input type='text' id='product_0' class='form-control editds ui-autocomplete-input' style='height:65%;margin-left:1px' onkeypress='LoadProduct()' onkeyup='checkproduct()' onkeydown='focustogrid(event)'><div class='input-group-append'><button class='btn btn-outline-primary butndis' id='addproductbtn' type='button' style='height:65%' onclick=window.open('../Master/ItemMaster')>+</button></div>");

         var no = $('#tblpurchaseinvoice tr').length + 1;
        if ($('#tblpurchaseinvoice tr').length == 1) {
            i == 1;
        }
        var id = parseInt(i)
        var ProdEditRow = "<tr onfocusin='Editrow(" + id + ")' onfocusout='UpdateRow(" + id + ")' class='jsgrid-row' id='row_" + id + "' ><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +     //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'><td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>
        "<td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" +
            no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_" + id + "' value='" +
            $("#productId_0").val() + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            Product + "' title=" + Product + "></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#productdesc_0").val() + "' title='" + $("#productdesc_0").val() + "'></td><td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" +
            UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            parseInt($("#quantity_0").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ") ></td><td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#txtrate_0").val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")><input type='hidden' id='baserate_" + id + "' class='form-control' value='" +
            parseFloat($("#baserate_0").val()).toFixed(Decimal) + "' ></td><td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            parseFloat($("#discount_0").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            parseFloat($("#txttaxable_0").val()).toFixed(Decimal) + "' disabled></td><td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
            $("#taxpercentage_0").val() + "></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            parseFloat($("#txttax_0").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='" +
            parseFloat($("#txtsubtotal_0").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            parseFloat($("#amount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value='" + parseFloat($("#baseamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxableamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basetaxamount_0").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value='" +
            parseFloat($("#basediscount_0").val()).toFixed(Decimal) + "'></td><td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" +
            LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value='"
            + $("#jobcodeid_0").val() + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#jobcode_0").val() + "' onkeydown=Focusnextgrid(event,'j'," + id + ") onfocusout=focusoutgrid('j'," + id + ") onfocusin=focusingrid('j'," + id + ")></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=''>" +
            "<input type='hidden' id='boq_" + id + "' value='" + parseInt($("#boq_0").val() || 0) + "' >" +
            "<input type='hidden' id='BOQAmt_" + id + "' value='" + parseFloat($("#BOQAmt_0").val() || 0).toFixed(Decimal) + "' />" +
            "</td></tr>";
        //title='" + $('#tax_0').find("option:selected").attr("title") + "'
        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_0').val());
        $('#unit_' + id).val($('#unit_0').val());
        $('#txtunit_' + id).val($('#txtunit_0').val());
        $('#locn_' + id).val($('#locn_0').val());
        $('#proddiv').animate({ scrollTop: 5000 }, 900);

        $('#locn_' + id).prop('disabled', false);
        $('#unit_' + id).prop('disabled', false);
        $('#quantity_' + id).prop('disabled', false);
        $('#txtrate_' + id).prop('disabled', false);
        $('#discount_' + id).prop('disabled', false);
        $('#tax_' + id).prop('disabled', false);
         $('#jobcode_' + id).prop('disabled', false);

        if ($('#tblpurchaseinvoice tr').length == 1) {
            TaxArray = [];
        }
        var item = $("#taxpercentage_" + id).val();
        if (TaxArray.indexOf(item) == -1) {
            TaxArray.push(item);
        }
        //if (parseFloat($('#discount_'+id).val()) > 0 || TaxArray.length > 1) {
        if (parseFloat($('#discount_' + id).val()) > 0) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
            BillDiscountFlag = 1;
        }

        ClearProductRow();
        ProductPopuprefresh();
        i++;
        CalcOtherCost();
        $('#disc,#Discountpercent').val('0.00');
        CalcGrandTotal(id);

        Product = '';
        UnitFlag = 0;
        ProductFlag = 0;
        TaxSplit(id);
        TemporarySavePurchase();
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

function MRConfirmboxResult(Result, status, rowid) {
    $('#confirm').hide();
    if (Result == 'true' && status == 'ConfirmBOQ') {
        CheckBOQConfirm(rowid,Result);
    }
    if (Result == 'false' && status == 'ConfirmBOQ' && rowid != 0) {
        CancelEdit(rowid);
    }
    else if (Result == 'true' && status == 'PROAL') {
        $("#produt_0").focus();
    }
    $("#EstConfirmFlag").val("NO");
    $('#MRconfirm').fadeOut();

}
function CheckBOQConfirm(Row) {
    $("#BOQConfirmFlag").val("YES");
    if (Row == 0) {
        Productadd();
    }
    else {
        UpdateRow(Row);
    }    
}

function TaxSplit(RowId) {
    
    var TaxId = $('#taxpercentage_' + RowId).val()
    var splittaxable = parseFloat($('#txttaxable_' + RowId).val());
    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val()||0);

    var splittax = parseFloat($('#txttax_' + RowId).val());
    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val()||0);
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable + splittaxable);
    CurrentSplitTax = parseFloat(CurrentSplitTax + splittax);
    //CurrentSplitTax = parseFloat((CurrentSplitTaxable * TaxId) / 100);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    
}

function SplitTaxDelete(TaxId, Taxable, Tax) {

    var CurrentSplitTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val());
    CurrentSplitTaxable = parseFloat(CurrentSplitTaxable - Taxable);

    var CurrentSplitTax = parseFloat($('#hiddensplittax_' + TaxId).val());
    CurrentSplitTax = parseFloat(CurrentSplitTax - Tax);
    //CurrentSplitTax = parseFloat((CurrentSplitTaxable * TaxId) / 100);

    $('#splittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + TaxId).val(CurrentSplitTaxable.toFixed(Decimal));
    $('#splittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
    $('#hiddensplittax_' + TaxId).val(CurrentSplitTax.toFixed(Decimal));
}

function EditSplitTaxUpdate(PrevtaxId, PrevSplitTaxable, PrevSplitTax, RowId) {


    var PrevTaxable = parseFloat($('#hiddensplittaxable_' + PrevtaxId).val());
    PrevTaxable = parseFloat(PrevTaxable - PrevSplitTaxable);
    var PrevTax = parseFloat($('#hiddensplittax_' + PrevtaxId).val());
    PrevTax = parseFloat(PrevTax - PrevSplitTax);
    

    $('#splittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#hiddensplittaxable_' + PrevtaxId).val(PrevTaxable.toFixed(Decimal));
    $('#splittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    $('#hiddensplittax_' + PrevtaxId).val(PrevTax.toFixed(Decimal));
    TaxSplit(RowId);
}




function CalcDiscountSplitTax1() {
    if ($('#tblpurchaseinvoice tr').length > 0) {
        if (parseFloat($('#disc').val() || 0) > 0) {
            var Totalamt = parseFloat($('#HiddenTotal').val() || 0);
            var DisAMt = parseFloat($('#disc').val() || 0);
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
         
            var Dispers = parseFloat((100 * DisAMt) / Totalamt) || 0;
            $('#Discountpercent').val(Dispers.toFixed(Decimal));
            billwisediscount(NetAMT,Dispers);


        }
        else {
            $('#Discountpercent').val('0.00');
            CalcGrandTotal(i);
            CalCDefTaxSplit();

        }
    }
}

function CalcDiscountSplitTaxbyPrecentage() {
    if ($('#tblpurchaseinvoice tr').length > 0) {
        if (parseFloat($('#Discountpercent').val() || 0) > 0) {
            var Totalamt = parseFloat($('#HiddenTotal').val() || 0);
            var DisPercen = parseFloat($('#Discountpercent').val() || 0);
            var DisAMt = parseFloat((Totalamt * DisPercen) / 100) || 0;
            var NetAMT = parseFloat(Totalamt - DisAMt);
            NetAMT = NetAMT.toFixed(Decimal);
         
            $('#disc').val(DisAMt.toFixed(Decimal));
            billwisediscount(NetAMT, DisPercen);


        }
        else {
            $('#disc').val('0.00');
            CalcGrandTotal(i);
            CalCDefTaxSplit();

        }
    }
}

function CalCDefTaxSplit() {
    for (var h = 0; h < $('#tbltaxsplit tr').length - 1; h++) {
        var TaxId = DefaultTaxArray[h];

        var DefSpliTaxable = parseFloat($('#hiddensplittaxable_' + TaxId).val());
        var DefSpliTax = parseFloat($('#hiddensplittax_' + TaxId).val());
        DefSpliTaxable = DefSpliTaxable.toFixed(Decimal);
        DefSpliTax = DefSpliTax.toFixed(Decimal);
        //var Taxamt = parseFloat(DefSpliTaxable * TaxId) / 100;
        //Taxamt = Taxamt.toFixed(Decimal);

        $('#splittaxable_' + TaxId).val(DefSpliTaxable);
        $('#splittax_' + TaxId).val(DefSpliTax);
    }
}

function billwisediscount(TotalTaxable, Dispers) {
    //Dispers = parseFloat(Dispers).toFixed(3);
   
    $('#GrandTotal,#tottaxable,#tottax').val('')
    var FCAmount = 0;
    var FCtottaxable = 0;
    var FCtottax = 0;
    var BillDisc = 0;

        var AMT0 = 0;
        var GST0 = 0;
        var AMT5 = 0;
        var GST5 = 0;
        var AMT12 = 0;
        var GST12 = 0;
        var AMT18 = 0;
        var GST18 = 0;
        var AMT28 = 0;
        var GST28 = 0;

        for (var k = 1; k < i; k++) {
            var Amount = $('#txttaxable_' + k).val();
            var GSTPERS = parseFloat($('#taxpercentage_' + k).val() || 0);

        

            var disamt = parseFloat(Amount - ((Amount * Dispers) / 100));
            disamt = disamt.toFixed(Decimal);
            var TaxAmt = parseFloat(disamt * GSTPERS) / parseFloat(100);

            var GStAmount = TaxAmt.toFixed(Decimal);
            Amount = parseFloat(disamt) || 0;

          
            if (GSTPERS == 0) {
                AMT0 = parseFloat(AMT0) + parseFloat(Amount) || 0
                GST0 = parseFloat(GST0 + GStAmount) || 0
            }
            else if (GSTPERS == 5) {
                AMT5 = parseFloat(AMT5) + parseFloat(Amount) || 0
                GST5 = parseFloat(GST5) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 12) {
                AMT12 = parseFloat(AMT12) + parseFloat(Amount) || 0
                GST12 = parseFloat(GST12) + parseFloat(GStAmount) || 0
            }
            else if (GSTPERS == 18) {
                AMT18 = parseFloat(AMT18) + parseFloat(Amount) || 0
                GST18 = parseFloat(GST18) + parseFloat(GStAmount) || 0
            }
            else {
                AMT28 = parseFloat(AMT28) + parseFloat(Amount) || 0
                GST28 = parseFloat(GST28) + parseFloat(GStAmount) || 0
            }
        }

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

        var GrandTotal = 0; var TotalTax = 0;
        TotalTax = parseFloat(GST0 + GST5 + GST12 + GST18 + GST28).toFixed(Decimal);
        GrandTotal = parseFloat(TotalTaxable) + parseFloat(TotalTax);

        var FCrate = parseFloat($('#rate').val() || 0).toFixed(Decimal);
        FCrate = isNaN(FCrate) ? 0 : FCrate;
        BillDisc = parseFloat($('#disc').val() || 0);

        $('#fcamount').val('')
        $('#fctaxable').val('')
        $('#fctax').val('');

        FCAmount = GrandTotal * FCrate;
        FCtottaxable = TotalTaxable * FCrate;
        FCtottax = TotalTax * FCrate;
        BillDisc = BillDisc * FCrate;
       
        $('#basedisc').val(BillDisc.toFixed(Decimal));
        $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
        $('#tottaxable').val(TotalTaxable);
        $('#tottax').val(parseFloat(TotalTax).toFixed(Decimal));
        $('#fcamount').val(FCAmount.toFixed(Decimal));
        $('#fctaxable').val(FCtottaxable.toFixed(Decimal));
        $('#fctax').val(FCtottax.toFixed(Decimal));
        $('#fc').text(FCAmount.toFixed(Decimal));

        if ($('#rate').val() == 1 || $('#fcamount').val() <= 0) {
            $("#fc").css("opacity", '0');
            $('#gndtotal').text(GrandTotal.toFixed(Decimal));
        }
        else if ($('#rate').val() != 1 && $('#fcamount').val() > 0) {
            $("#fc").css("opacity", '100');
            $('#gndtotal').text('FC : ' + GrandTotal.toFixed(Decimal));
        }



        CalcInvoice();

    }


// Other Cost FC Calculation

function CalcFCCost() {
    var currate = 0; var FCost = 0; var BaseCost = 0;

     currate = parseFloat($('#CostCurrRate').val() || 0).toFixed(Decimal);
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

    RowCurrRate = parseFloat($('#CostCurrRate_' + RowId).val() || 0).toFixed(Decimal);
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
        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>" + no + "</td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='costsl_" + tid + "' value='0'><input type='hidden' id='accid_" + tid + "' value='"
            + $('#accid').val() + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $('#account').val() + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $('#accountdescription').val() + "'></td><td id='col_10' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><select id='CostCurr_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'>'"
            + CurrencySelect + "'</select></td><td id='col_11' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='CostCurrRate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + parseFloat($('#CostCurrRate').val() || 0) + "'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' onkeyup='CalcFCCostGrid("+tid+")' value='"
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
    $('#accountdescription').val('Other Cost Against Purchase InvNo: ' + $('#purchaseinvoiceno').val())
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
        OtherCost[j] = parseFloat(costB[j] / quantity[j]||0);
    }
    for (var f = 1; f < i; f++) {
        $('#othercost_' + f).val(OtherCost[f].toFixed(Decimal))
    }
}

//Close Other Cost Popup Function

function CloseOtherCost()
{
    $('#Othercostpopup').hide();
    $('#OtherCostdiv').hide();
}

//SaveOther Cost Popup Function

function SaveOtherCost() {
    if ($('#costdiff').val() != 0 || $('#costbasediff').val()!=0) {
        warningshow('Debit Amount and Credit Amount is not Tally');
        return false;
    }
    else if (FlagCostEdit!=0) {
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
    $('#costsl_' + RowId).val(0);
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
    $('#otrcost').val(0);
    CalcOtherCost();
}

function ClearOtherCost() {
    if ($('#tblOtherCost tr').length != 0) {
        var Res = confirm('Do you want to Clear Other Cost Details?');
        if (Res == false) {
            return false;
        }
        else {
            FlagCostEdit = 0;
            for (var j = 1; j <= x - 1; j++) {
                $('#costrow_' + j).remove();                
            }
            $('#CostCurrency').prop("disabled", false);
            $('#CostCurrRate').prop("disabled", false);

            CalcCreditandDebit(i);
            $('#otrcost').val(0);
            CalcOtherCost();
            x = 1;
            $('#acctype').focus();
            ClearCostRow();
        }
    }
    else {
        ClearCostRow();
        CloseOtherCost();
    }
}

//Update Other Cost Grid Function

function CostUpdaterow(RowId) {

    var a = parseFloat($('#DebitAmount_' + RowId).val());
    a = isNaN(a) ? 0 : a;
    var b = parseFloat($('#CreditAmount_' + RowId).val());
    b = isNaN(b) ? 0 : b;

    if ($('#acctype_' + RowId).val() == 'C' && a!=0) {
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
    else if ($('#acctype_' + RowId).val() == 'D' && (a == 0 || $('#DebitAmount_' + RowId).val()=='')) {
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
    $('#confirmmessage').text('Do you want Delete this record?')

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
            $('#costsl_' + j).val(0);
            $('#costtd_' + j).text(slno);                         
                slno++;
        }
    }
    $('#acctype').focus();
    CalcCreditandDebit(i);
    $('#otrcost').val(0);
    CalcOtherCost();
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
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if (parseFloat($('#amount_job').val()) <= 0) {
        warningshow('Amount Must Be Greater Than Zero', 'txtrate_job');
        $('#txtrate_job').select();
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'discount_job');
        return false;
    }
    else {
        var no = $('#tblpurchaseinvoice tr').length + 1;
        var id = parseInt(i)

        var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "' onfocusin='Editrow(" + id + ")' onfocusout='UpdateRow(" + id + ")'><td id='edit_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td><td id='td_" + id + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >"       //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'> <td id='update_" + id + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>
            + no + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td><td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + id + "' value='0'><input type='hidden' id='OrderSubId_" + id + "' value='0'><input type='hidden' id='productId_"+id+"' value='0'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + $("#productjob").val() + "'></td><td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value=''></td><td id='col_3' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + id + "' onchange='CheckFOC(" + id + ",this)' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>"
            + UnitSelect + "</select><input type='hidden' id='txtunit_" + id + "' class='form-control' /></td><td id='col_4' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" + parseInt($("#quantity_job").val()) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td><td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseFloat($("#txtrate_job").val()).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")><input type='hidden' id='baserate_" + id + "' class='form-control' value='"
            + parseFloat($("#baserate_job").val()).toFixed(Decimal) + "' ></td><td id='col_6' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='"
            + parseInt($("#discount_job").val() || 0).toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td><td id='col_7' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='"
            + parseFloat($("#txttaxable_job").val()).toFixed(Decimal) + "' disabled></td><td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>"
            + TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value="
            + $("#taxpercentage_job").val() + "></td><td id='col_9' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='"
            + parseFloat($("#txttax_job").val()).toFixed(Decimal) + "'></td><td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' ><input type='hidden' id='txtsubtotal_" + id + "' value='"
            + parseFloat($("#txtsubtotal_job").val()).toFixed(Decimal) + "'><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
            + parseFloat($("#amount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#baseamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basetaxableamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basetaxamount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basetaxamount_job").val()).toFixed(Decimal) + "'><input type='hidden' id='basediscount_" + id + "' class='form-control'  disabled value='"
            + parseFloat($("#basediscount_job").val()).toFixed(Decimal) + "'></td><td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>"
            + LocationSelect + "</select></td><td id='col_13' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:250px;' ><input type='hidden' id='jobcodeid_" + id + "' value=''><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='' onkeydown=Focusnextgrid(event,'j'," + id + ") onfocusout=focusoutgrid('j'," + id + ") onfocusin=focusingrid('j'," + id + ")></td><td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td></tr>";

        $('#tblpurchaseinvoice').append(ProdEditRow);
        $('#tax_' + id).val($('#tax_job').val());
        $('#unit_' + id).val($('#unit_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());
        $('#locn_' + id).val($('#locn_job').val());

        $('#locn_' + id).prop('disabled', false);
        $('#unit_' + id).prop('disabled', false);
        $('#quantity_' + id).prop('disabled', false);
        $('#txtrate_' + id).prop('disabled', false);
        $('#discount_' + id).prop('disabled', false);
        $('#tax_' + id).prop('disabled', false);
        $('#jobcode_' + id).prop('disabled', false);

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
    $('#disc,#Discountpercent').val('0.00');
    CalCDefTaxSplit();
    //if (FlagEdit==0){
    FlagEdit =  1;
    //$('#row_' + RowId).children('td, th').css('background-color', 'rgb(232, 226, 226)');
    locn = $('#locn_' + RowId).val();
    unit = $('#unit_' + RowId).val();
    quantity = $('#quantity_' + RowId).val();
    rate = $('#txtrate_' + RowId).val();
    disc = $('#discount_' + RowId).val();
    tax = $('#tax_' + RowId).val();
    EditSplitTaxable = $('#txttaxable_' + RowId).val();
    EditSplitTax = $('#txttax_' + RowId).val();
    taxper = $('#taxpercentage_' + RowId).val();
    jobrowid = $('#jobcodeid_' + RowId).val();
    jobrowcode = $('#jobcode_' + RowId).val();
    boqqty = $('#boq_' + RowId).val();
    boqrate = $('#BOQAmt_' + RowId).val();
    //$('#edit_' + RowId).hide();
    //$('#update_' + RowId).show();
    //$('#locn_' + RowId).prop('disabled', false);
    //$('#unit_' + RowId).prop('disabled', false);
    //$('#quantity_' + RowId).prop('disabled', false);
    //$('#txtrate_' + RowId).prop('disabled', false);
    //$('#discount_' + RowId).prop('disabled', false);
    //$('#tax_' + RowId).prop('disabled', false);
    //$('#jobcode_' + RowId).prop('disabled', false);
    //$('#unit_' + RowId).focus();
    CalcGrandTotal(i);    
    Fnaddjobautocomplete(RowId) 
//}
//else{
//        warningshow('Update Edit Mode Row First');       
//}
}

//Cancel Edit Grid Function

function CancelEdit(RowId) {
    FlagEdit = 0;
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
    $('#boq_' + RowId).val(boqqty);
    $('#BOQAmt_' + RowId).val(boqrate);
    CalcAmount(RowId);
    CalcGrandTotal(i);
    //$('#locn_' + RowId).prop('disabled', true);
    //$('#unit_' + RowId).prop('disabled', true);
    //$('#quantity_' + RowId).prop('disabled', true);
    //$('#txtrate_' + RowId).prop('disabled', true);
    //$('#discount_' + RowId).prop('disabled', true);
    //$('#tax_' + RowId).prop('disabled', true);
    //$('#jobcode_' + RowId).prop('disabled', true);
    $('#update_' + RowId).hide();
    $('#edit_' + RowId).show();
}

//Delete Grid Function

function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('deletegridrow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')

}
function ConfirmboxResult(Result, status, rowid) {

  
    if (Result == 'true' && status=='deletegridrow') {
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
        $('#purchaseinv,#productpdiv,#Othercostpopup,#popupdiv,#jobpopupdiv,#iconForm,#PurchaseTransactionPopup').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt').prop("disabled", false);

       // $('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave,#btncrncyclear').prop("disabled", true);
        $('#btnaddcost').prop("disabled", true);
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').hide();
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();
        
        
    }
    else if (Result == 'false' && status == 'copy') {
        CopyFlag = 0;
    }
    else if (Result == 'true' && status == 'puchasesave') {

        OKSavePurchase();
    }
    else if (Result == 'false' && status == 'puchasesave') {
        $("#EstConfirmFlag").val('NO')
    }
   
    else if (Result == 'true' && status == 'puchaseupdate') {
        UpdatePurchase();
    }
    else if (Result == 'false' && status == 'puchaseupdate') {
        $("#EstConfirmFlag").val('NO')
    }
    else if (Result == 'true' && status == 'loadprevpurchasedata') {
        CheckPrevoiusItems();
    }
    else if (Result == 'true' && status == 'puchasedelete') {
        EditInvoice(1);
    }
    else if (Result == 'true' && status == 'amountdiff') {

        PurchaseSaveorNotPopup();
        return;
    }
    else if (Result == 'true' && status == 'EstAmountSave') {
        $("#EstConfirmFlag").val("YES");
        SavePurchaseInvoice();
        return;
    }
    else if (Result == 'true' && status == 'amountdiffcopy') {

        UpdateorNot();
        return;
    }
    else if (Result == 'true' && status == 'EstAmountCopy') {
        $("#EstConfirmFlag").val("YES");
        UpdatePurchaseInvoice();
        return;
    }
    $('#confirm').fadeOut();

}
function detl(RowId) {
    CalCDefTaxSplit();
    var slno = 1;
    var rowslno = parseInt(slno);
    TaxArray = [];
    var splittaxable = parseFloat($('#txttaxable_' + RowId).val());
    var splittax = parseFloat($('#txttax_' + RowId).val());
    var splittaxid = $('#taxpercentage_' + RowId).val()
    $('#row_' + RowId).remove();
    if ($('#tblpurchaseinvoice tr').length == 0) {
        BillDiscountFlag = 0;
    }
        for (var j = 1; j <= i; j++) {
            if ($('#product_' + j).val() != undefined) {
                $('#td_'+ j).text(slno);
                slno++;
                if (parseFloat($('#discount_' + j).val()) != 0) {
                    BillDiscountFlag=1;
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

    //if (TaxArray.length <= 1 && BillDiscountFlag == 0) {
        if (BillDiscountFlag == 0) {
            $('#disc').prop("disabled", false);
            //$('#disc').val('0.00');
        }
    $('#product_0').focus();
    CalcGrandTotal(i);
    CalcOtherCost();
    $('#disc,#Discountpercent').val('0.00');
    SplitTaxDelete(splittaxid, splittaxable, splittax);
    TemporarySavePurchase()
}
//Update Grid Function

function UpdateRow(RowId) {
   
    if ($('#unit_' + RowId).find("option:selected").attr("unitname") == 'FOC') {
        UFlag = 1;
    }
    var a = parseFloat($('#discount_' + RowId).val()||0).toFixed(Decimal);
    var b = parseFloat($('#txtsubtotal_' + RowId).val()).toFixed(Decimal);
    var c = parseInt($('#quantity_' + RowId).val());
    var d = parseInt($('#demoqty_' + RowId).val() || 0);
    var e = parseFloat($('#txtrate_' + RowId).val()).toFixed(Decimal);

   


    $("#discount_" + RowId).val(isNaN(a) ? 0 : a);
    $('#txtrate_' + RowId).val(isNaN(e) ? 0 : e);

    if ($('#locn_' + RowId).val() == 0 && $('#productId_' + RowId).val() != 0) {
        warningshow('Press Select Location', '#locn_' + RowId);
        FlagEdit = 1;
        return false;
    }
    else if ($('#unit_' + RowId).val() == 0) {
        warningshow('Please Select Unit', 'unit_' + RowId);
        FlagEdit = 1;
        return false;
    }
    else if ($.trim($('#quantity_' + RowId).val()) == '' || $.trim($('#quantity_' + RowId).val()) == 0) {
        warningshow('Please Select Quantity', 'quantity_' + RowId);
        FlagEdit = 1;
        return false;
    }
    else if (UFlag == 0 && ($.trim($('#txtrate_' + RowId).val()) == '' || $.trim($('#txtrate_'+RowId).val()) == 0)) {
        warningshow('Please Enter Rate', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        FlagEdit = 1;
        return false;
    }
    else if (UFlag == 1 && $('#txtrate_'+RowId).val() != 0) {
        warningshow('Rate Must be 0 for Unit FOC', 'txtrate_' + RowId);
        $('#txtrate_' + RowId).select();
        FlagEdit = 1;
        return false;

    }
    else if ($('#tax_' + RowId).val() == 0) {
        warningshow('Please Select Tax', 'tax_' + RowId);
        FlagEdit = 1;
        return false;
    }
    else if (parseFloat($('#amount_' + RowId).val()) <= 0 && UFlag == 0) {
        warningshow('Amount Must be Greater Than Zero', 'txtrate_'+RowId);
        $('#txtrate_' + RowId).select();
        FlagEdit = 1;
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
        FlagEdit = 1;
        return false;
    }
    else if ($.trim($('#jobcode_' + RowId).val()) != '' && $('#jobcodeid_' + RowId).val() == 0) {
        warningshow('Enter A Valid Job ', 'jobcode_' + RowId);
        FlagEdit = 1;
        return false;
    }
    //else if (($('#productId_' + RowId).val() != 0) && (parseFloat($("#txtrate_" + RowId).val() || 0) > parseFloat($("#BOQAmt_" + RowId).val() || 0) || parseFloat($("#quantity_" + RowId).val() || 0) > parseFloat($("#boq_" + RowId).val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES' && $("#jobcodeid_"+RowId).val() != 0) {
    //    CheckBOQ(RowId)
    //    return false;
    //}
    else {
        if (d != 0 && c > d) {
            var result = confirm("Purchase Quantity is Greater than Order Quantity!.."+"\n"+"Do you want to Continue?")
            if (result == false) {
                return false;
            }
        }
        if ($('#locn_' + RowId).val() != locn) {
            var Res = confirm('Location Changed!..Do You Want to Continue?');
            if (Res == false) {
                $('#locn_' + RowId).val(locn);
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
        if (BillDiscountFlag == 1) {
        //if (BillDiscountFlag ==1 || TaxArray.length > 1) {
            $('#disc').prop("disabled", true);
            $('#disc').val('0.00');
        }
        else {
            $('#disc').prop("disabled", false);
            //$('#disc').val('0.00');
        }
        $('#update_' + RowId).hide();
        $('#edit_' + RowId).show();
        FlagEdit = 0;
        $('#row_' + RowId).children('td, th').css('background-color', 'white');
        var ratenum = parseFloat($("#txtrate_" + RowId).val());
        $("#txtrate_" + RowId).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#discount_" + RowId).val()||0);
        $("#discount_" + RowId).val(disnum.toFixed(Decimal));
        
        //$('#locn_' + RowId).prop('disabled', true);
        //$('#unit_' + RowId).prop('disabled', true);
        //$('#quantity_' + RowId).prop('disabled', true);
        //$('#txtrate_' + RowId).prop('disabled', true);
        //$('#discount_' + RowId).prop('disabled', true);
        //$('#tax_' + RowId).prop('disabled', true);
        //$('#jobcode_' + RowId).prop('disabled', true);


        EditSplitTaxUpdate(taxper, EditSplitTaxable, EditSplitTax, RowId);

        CalcGrandTotal(i);
        $('#disc,#Discountpercent').val('0.00');
        locn = ""; unit = ""; quantity = ""; rate = "";
        disc = ""; tax = "";  taxper = "";
        UFlag = 0;
        TemporarySavePurchase();
        $("#BOQConfirmFlag").val('NO');
    }
}

//Check FOC When Product Add Function

function CheckFOC(rowid,selectedvalue) {

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
    $("#BOQConfirmFlag").val("NO");
    $("#MRconfirmOk").show();
    if ($('#jobid').val() != 0) {
        $('#jobcode_0').val($('#jobcode').val());
        $('#jobcodeid_0').val($('#jobid').val());
    }
    else {
        $('#jobcode_0').val('');
        $('#jobcodeid_0').val(0);
    }
    $("#boq_0").val(0);
    $("#BOQAmt_0").val(0);
    }

//Calculation Of Grand Total (Base and FC) Function

function CalcGrandTotal(Id)
{
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
    $('#HiddenTotal').val(TotalTaxable.toFixed(Decimal))

    FCAmount = GrandTotal * FCrate;
    FCtotdisc = TotalDiscount * FCrate;
    FCtottaxable = TotalTaxable * FCrate;
    FCtottax = TotalTax * FCrate;
    

    BillDisc = parseFloat($('#disc').val() || 0);
    BillDisc = BillDisc * FCrate;
    $('#basedisc').val(BillDisc.toFixed(Decimal));
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

    CalcInvoice();
}

//Checking Difference Between GrandTotal And Invoice Total Function

function CalcInvoice() {

   

    var FCrate = parseFloat($('#rate').val() || 0).toFixed(Decimal);
    FCrate = isNaN(FCrate) ? 0 : FCrate;
    var InvoiceAmount = 0;
    InvoiceAmount = parseFloat($('#SupInvoTotal').val() || 0).toFixed(Decimal);
    var GrandTotal = parseFloat($('#GrandTotal').val() || 0);

    var BaseInvoiceamount = InvoiceAmount * FCrate;
    $('#BaseInvoiceamount').val(BaseInvoiceamount.toFixed(Decimal));
    InvDiff = GrandTotal - InvoiceAmount;
    var BaseInvDiff = InvDiff * FCrate;

    $('#invdiff').val(InvDiff.toFixed(Decimal));
    $('#baseinvdiff').val(BaseInvDiff.toFixed(Decimal));
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
    DefaultArea = 0;
    FlagEdit = 0;
    
    $('#EstAmount').val(0);
    $("#BOQ").val('');
    $('#confirmOk').prop("disabled", false);

    $('#copypurchaseinvo').val('');
    $('#purchaseinvoiceno1').val('');
   // $('#tour1').hide();
    $('#paytype').val(2);
    $('#purchasetype').val('Local');
    $('#transfer').val(0);
    $('#supplierId').val(0);
    $('#suppliername').val('');
    $('#purchaseinvdate').val(CurDate);
    $('#duedate').val(CurDate);
    $('#shipdate').val(CurDate);
    $('#terms').val(0);
    $('#locn_job').val(ULocId);
    $('#fcamount').val('');
    $('#fctaxable').val('');
    $('#fctax').val('');
    $('#fcdiscount').val('');
    $('#rate').val('');
    $('#jobcode').val('');
    $('#jobid').val(0)
    $('#product_0').val('');
    $('#btndelete').hide();
    $('#location').val(ULocId);
    $('#locn_0').val(ULocId);
    $('#unit').val(0);
    $('#quantity').val('');
    $('#txtrate').val('');
    $('#discount').val('');
    $('#SupInvoTotal').val('0.00');
    $('#BaseInvoiceamount').val('');
    $('#tax').val(0);
    $('#taxpercentage').val('');
    $('#txtnotes').val('');
    $("#panel1").hide();
    $('#disc,#Discountpercent').val('0.00');
    $('#basedisc').val('');
    $('#totdisc').val('0.00');
    $('#tottaxable').val('0.00');
    $('#HiddenTotal').val(0);
    $('#tottax').val('0.00');
    $('#GrandTotal').val('');
    $('#invdiff').val('0.00');
    $('#baseinvdiff').val('');
    $('#taxamount').val('');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
    for (var k = 1; k < i; k++) {
        $('#row_' + k).remove();
    }
    for (var k = 1; k < x; k++) {
        $('#costrow_'+ k).remove();
    }
    $('#otrcost').val('');
    $('#totcredit').val('0.00');
    $('#totdebit').val('0.00');
    $('#costdiff').val('0.00');
    $('#totbasecredit').val('');
    $('#totbasedebit').val('');
    $('#costbasediff').val('');
    i = 1;
    x = 1;
    OtherCostFlag = 0;
    $('#ProductLength').val();
    ClearProductDetails()
    Defaultfocus();
    $('#purchaseinvoiceno1').focus();
    $('#btnsubmit,#transfer,#lpo,#fileUpload,#upload,#btnexcel').prop("disabled", false);
    $('#btnlist').prop("disabled", false);
    $('#btnadd').prop("disabled", false);
    $('#btncrncysave,#btncrncyclear').prop("disabled", false);
    $('#btnaddcost').prop("disabled", false);
    $('#Warningpopup').fadeOut();
    $('#purchaseinvoiceno').prop("disabled", true);
    $('#totdisc,#tottaxable,#tottax,#totcredit,#totdebit,#costdiff,#Discountpercent').prop("disabled", true);
    $('#invdiff').prop("disabled", true);
    $('#taxpercentage_0').prop("disabled", true);
    $('#amount_0').prop("disabled", true);
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#lpo').val('');
    $('#PONo').val('');
    $('#account').val('');
    $('#accid').val(0);
    $('#costamount').val('0.00')
    $('#CostCurrency').prop("disabled", false);
    $('#CostCurrRate').prop("disabled", false);
    $('.distxtbox').val("0.00");
    $('.distxtbox').prop("disabled", true);
    $('.editds').prop("disabled", false);
    $('#btnedit,#btndelete').hide();
    $('#btnsaveedit').hide();
    DefaultSupplier = 0;
    DefaultInvo = '';
    if (RefreshFlag != 1) {
        $('.butndis').prop("disabled", false);
        $('#btnsubmit,#btnlist').show();
        $('#btnprint').hide();
        $('#purchaseinv').show();
        $('#copypurchase').hide();
        Serialnoload();
        GetCurrency(0);
        GetArea(0);
        $('#purchaseinvoiceno').val('');
        CopyFlag = 0;       
        $("#btnExporttoExcel").hide();
        if ((usermenu1.indexOf("M224") != -1)) {
            $("#upload,#btnexcel").show();
            $("#fileUpload").show();

        }
    }
}
//Hide PO details
function HidePO() {
    $('#iconForm').hide()
    $('#RowGet').val('');
    $('#RowGet1').val('');
    $('#tbl_POList tr td').remove;
    $('#tbl_PO_ListItem').remove;
    PONumber = '';
    $('#InvoiceFromDate').val(CurDate);
    $('#InvoiceToDate').val(CurDate);
    $('#ProductPopUp1').val('');
    $('#ProductPopUp1Id').val(0);
}
function HidePerforma() {
    $('#PerformaForm').hide()
    $('#RowGetPerforma').val('');
    $('#RowGet1Performa').val('');
    $('#tbl_PerformaList tr td').remove;
    $('#tbl_Performa_ListItem').remove;
    PerformaNumber = '';
    $('#ProductPopUp1PerformaId').val(0);
    $('#ProductPopUp1Performa').val('');
    $('#PerformaFromDate').val(CurDate);
    $('#PerformaToDate').val(CurDate);

}

function HideMRV() {
    $('#MRVForm').hide()
    $('#RowGetMRV').val('');
    $('#RowGet1MRV').val('');
    $('#tbl_MRVList tr td').remove;
    $('#tbl_MRV_ListItem').remove;
    MRVNumber = '';
    $('#ProductPopUp1MRVId').val(0);
    $('#ProductPopUp1MRV').val('');
    $('#MRVFromDate').val(CurDate);
    $('#MRVToDate').val(CurDate);

}
//Clear Product Details Except Product Name

function ClearProductDetails()
{
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
        $("#BOQConfirmFlag").val("NO");
        $("#MRconfirmOk").show();
        if ($('#jobid').val() != 0) {
            $('#jobcode_0').val($('#jobcode').val());
            $('#jobcodeid_0').val($('#jobid').val());
        }
        else {
            $('#jobcode_0').val('');
            $('#jobcodeid_0').val(0);
        }
        $("#boq_0").val(0);
        $("#BOQAmt_0").val(0);
    
}
//Calculation  Function for Both Amount Calculation in Grid and GrandTotal
function ChangeRate() {

    $('#disc,#Discountpercent').val('0.00');
    CalcAmt();
    CalcDiscountSplitTax1();
}

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
    var totalamount = parseFloat(taxableamount.toFixed(Decimal))+ parseFloat(taxamount.toFixed(Decimal));


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
        $('#purchaseinv,#productpdiv,#Othercostpopup,#popupdiv,#jobpopupdiv,#iconForm,#PurchaseTransactionPopup').hide();
        $('#copypurchase').show();
        $('#btnprvs').prop("disabled", false);
        $('#btnnxt,#btnExporttoExcel').prop("disabled", false); 

        //$('#tour1').show();
        $('.form-control').prop('disabled', true);
        $('#copypurchaseinvo').prop("disabled", false);
        $('.jsgrid-button').prop('disabled', true);
        $('#btnsubmit').prop("disabled", true);
        $('#btnlist').prop("disabled", true);
        $('#btnadd').prop("disabled", true);
        $('#btncrncysave,#btncrncyclear').prop("disabled", true);
        $('#btnaddcost,#fileUpload,#upload,#btnexcel').prop("disabled", true);
        $('#copypurchaseinvo').focus();
        $('#copypurchaseinvo').select();
        $('.butndis').prop("disabled", true);
        $('#btnsubmit,#btnlist').hide();
        $('#btnprint').show();
        $("#upload,#btnexcel").hide();
        $("#fileUpload").hide();
        if ((usermenu1.indexOf("M224") != -1)) {
            $("#btnExporttoExcel").show();
        }
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
        if (result[0].EDITFlag == '1') {
           
            $('#btnedit').show();
        } else {
          
            $('#btnedit').hide();
        }
        $('#btndelete').show();

        i = 1; TaxArray = []; BillDiscountFlag = 0;
        for (var n = 0; n < result.length; n++) {
            DefaultInvo = result[n].InvoNo;
            DefaultSupplier = result[n].SupplierId

            $('#BOQ').val(result[n].BOQ);
            $('#EstAmount').val(result[n].EstimateAmount);


            $('#purchaseinvoiceno').val(result[n].SlNo);
            $('#copypurchaseinvo').val(result[n].InvoNo);
            $('#purchaseinvoiceno1').val(result[n].InvoNo);
            $('#paytype').val(result[n].PayType);
            $('#purchasetype').val(result[n].PurchaseType);
            $('#suppliername').val(result[n].SupplierName);
            $('#supplierId').val(result[n].SupplierId);
            $('#purchaseinvdate').val(result[n].InvoDate);
            $('#terms').val(result[n].Terms);
            $('#duedate').val(result[n].DueDate);
            $('#location').val(result[n].LocnId);
            $('#placeofsupply').val(result[n].PlaceOfSupply);
            $('#jobid').val(result[n].MainJobNo);
            $('#jobcode').val(result[n].MainJobCode);
            $('#shipdate').val(result[n].ShipDate);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(parseFloat(result[n].CurrencyRate).toFixed(Decimal));
            $('#disc').val(result[n].BillDiscount.toFixed(Decimal));
            $('#SupInvoTotal').val(result[n].InvoiceTotal.toFixed(Decimal));
            $('#totdisc').val(result[n].TotalDiscount.toFixed(Decimal));
            $('#tottaxable').val(result[n].TotalTaxable.toFixed(Decimal));
            $('#tottax').val(result[n].TotalTax.toFixed(Decimal));
            $('#GrandTotal').val(result[n].GrandTotal.toFixed(Decimal));
            $('#fcamount').val(result[n].FCGrandTotal.toFixed(Decimal));
            //$('#PerformaId_').val(result[n].Performa_NO);
            //$('#PerformaSubId_').val(result[n].Performa_SubTbl_Id);
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

            var id = parseInt(n + 1)

            var ProdEditRow = "<tr onfocusin='Editrow(" + id + ")' onfocusout='UpdateRow(" + id + ")' class='jsgrid-row' id='row_" + id + "' >" +
            "<td id='edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:60px'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +         //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'>
            //"<td id='update_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:60px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +
            "<td id='" + id + "' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:50px'>" +
             id + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +
            "<td id='col_1' class='jsgrid-cell jsgrid-align-left jsgrid-sortable' style='width:300px'><input type='hidden' id='productId_" + id + "' value='" +
             result[n].ItemId + "'><input type='hidden' id='PerformaId_" + id + "' value='" + result[n].Performa_NO + "'><input type='hidden' id='PerformaSubId_" + id + "' value='" + result[n].Performa_SubTbl_Id + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
             result[n].ItemCode + "'></td>" +
            "<td id='col_x' class='jsgrid-cell jsgrid-align-left jsgrid-sortable' style='width:350px'><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].ItemDescription + "'></td>" +
            "<td id='col_3' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" +
            UnitSelect + "</select></td>" +
            "<td id='col_4' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
            "<td id='col_5' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td>" +
            "<td id='col_6' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
            "<td id='col_7' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td>" +
            "<td id='col_8' class='jsgrid-cell jsgrid-align-center' style='width:140px'><select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
            result[n].TaxRate + "></td>" +
            "<td id='col_9' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            result[n].TaxAmount.toFixed(Decimal) + "'></td>" +
            "<td id='col_10' class='jsgrid-cell jsgrid-align-center' style='width:140px'><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            result[n].TotalAmount.toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td>" +
            "<td id='col_2' class='jsgrid-cell jsgrid-align-center' style='width:120px'><select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" +
            LocationSelect + "</select></td>" +
            "<td id='col_13' class='jsgrid-cell jsgrid-align-left' style='width:250px'><input type='hidden' id='jobcodeid_" + id + "' value='"
            + result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'j'," + id + ") onfocusout=focusoutgrid('j'," + id + ") onfocusin=focusingrid('j'," + id + ") value='"
            + result[n].JobCode + "'></td>" +
            "<td id='col_11' class='jsgrid-cell jsgrid-align-center showothercost' style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value=' " +
            (result[n].OtherCost || 0).toFixed(Decimal) + "'></td></tr>";


            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);

            var item = $("#taxpercentage_" + id).val();
            if (TaxArray.indexOf(item) == -1) {
                TaxArray.push(item);
            }
            CalcAmount(id)

            //if (parseFloat($('#discount_' + id).val()) > 0 || TaxArray.length > 1) {
            if (parseFloat($('#discount_' + id).val()) > 0) {
                $('#disc').prop("disabled", true);
                $('#disc').val('0.00');
                BillDiscountFlag = 1;
            }

            TaxSplit(id);

        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = result.length + 1;
        OtherCostGets();
        CalcGrandTotal(i);
        if (parseFloat(result[0].BillDiscount) > 0) {
            CalcDiscountSplitTax1();
        }
    }
    else {
        CheckeDeleted();
    }
}


function CheckeDeleted() {
    var datax = {};
    datax.BillNo = 'PI';
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
            if(status==1)
            {
                //$('#popupmessageInfo').text('Invoice No: ' + slno + ' Cancelled!!!');
                //$('#Infopopup').show();
                //setTimeout(function () { $('#Infopopup').hide(); }, 3000);

                swal('Invoice No-' + slno + ' ', "Cancelled!!!", "error");
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
        url: "../Purchase/PurchaseOtherCostGetandGets",
        data: data,
        success: function (result) {
            ShowOtherCost(result.dList);

        }
    });

}

//Copy Other Cost Function

function ShowOtherCost(result) {
    $('#accountdescription').val('');
    var a = 0; var b = 0;
    if (result.length > 0) { x = 1; }
    for (var n = 0; n < result.length; n++) {

        var Credit = 0;
        var BaseCredit = 0;
        var Debit = 0;
        var BaseDebit = 0;
        //var tid = parseInt(n + 1);
        var tid = parseInt(x)

        if(result[n].PayType=='C'){
            Credit = (result[n].OCAmount).toFixed(Decimal);
            BaseCredit = (result[n].OCFCAmount).toFixed(Decimal);
            a = parseFloat(a + BaseCredit).toFixed(Decimal);
            Debit = '0.00';
            BaseDebit = 0;
        }
        else if (result[n].PayType=='D'){
            Debit = (result[n].OCAmount).toFixed(Decimal);
            BaseDebit = (result[n].OCFCAmount).toFixed(Decimal);
           // b = parseFloat(b + result[n].OCAmount || 0).toFixed(Decimal);
            Credit = '0.00';
            BaseCredit = 0;
        }
        var no = $('#tblOtherCost tr').length + 1;
        var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>" + no + "</td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='costsl_" + tid + "' value='1'><input type='hidden' id='accid_" + tid + "' value='"
            + result[n].AccId + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].AccName + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].Description + "'></td><td id='col_10' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><select id='CostCurr_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'>'"
            + CurrencySelect + "'</select></td><td id='col_11' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='CostCurrRate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + parseFloat(result[n].CurrencyRate) + "'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' onkeyup='CalcFCCostGrid(" + tid + ")' value='"
            + Credit + "'><input type='hidden' id='BaseCredit_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' value='"
            + BaseCredit + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' onkeyup='CalcFCCostGrid(" + tid + ")'  value='"
            + Debit + "'><input type='hidden' id='BaseDebit_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)'  value='"
            + BaseDebit + "'></td><td id='CostEditRow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='CostEditrow(" + tid + ")'><input class='jsgrid-button jsgrid-delete-button'  type='button' onclick='CostDeleterow(" + tid + ")'  title=Delete ></td><td id='CostUpdaterow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='CostUpdaterow(" + tid + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CostCancelEditrow(" + tid + ")'></td></tr>";
        




        //var OtherCostRow = "<tr class='jsgrid-row' id='costrow_" + tid + "'><td id='costtd_" + tid + "' class='jsgrid-cell'  style='width:50px;text-align:center'>" + tid + "<input type='hidden' id='costsl_" + tid + "' value='0'></td><td id='col_1' class='jsgrid-cell jsgrid-align-left'  style='width:200px;' ><input type='hidden' id='accid_" + tid + "' value='"+ 
        //    result[n].AccId + "'><input type='text' id='acc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
        //    result[n].AccName + "'></td><td id='col_2' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:200px;' ><input type='text' id='accdesc_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
        //    result[n].Description + "'></td></td><td id='col_10' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><select id='CostCurr_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'>'"
        //    + CurrencySelect + "'</select></td><td id='col_11' class='jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:100px;' ><input type='text' id='CostCurrRate_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' value='"
        //    + parseFloat(result[n].CurrencyRate) + "'></td><td id='col_3' class='jsgrid-cell'  style='width:100px;' > <select id='acctype_" + tid + "' class='form-control' disabled style='height:30px;background-color:white' ><option value='C'>Credit</option><option value='D'>Debit</option></select><input type='hidden' id='' class='form-control'></td><td id='col_4' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='CreditAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)' value='" +
        //    Credit + "'></td><td id='col_5' class='jsgrid-cell jsgrid-align-center'  style='width:100px;' ><input type='text' id='DebitAmount_" + tid + "' class='form-control' disabled style='height:30px;background-color:white'  onkeypress='isNumber(event,this)'  value='" +
        //    Debit + "'></td><td id='CostEditRow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='CostEditrow(" + tid + ")'><input class='jsgrid-button jsgrid-delete-button'  type='button' onclick='CostDeleterow(" + tid + ")'  title=Delete ></td><td id='CostUpdaterow_" + tid + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='CostUpdaterow(" + tid + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CostCancelEditrow(" + tid + ")'></td></tr>";

        $('#tblOtherCost').append(OtherCostRow);
        $('#acctype_' + tid).val(result[n].PayType);
        $('#CostCurr_' + tid).val(result[n].CurrencyId);
        $('#CostCurrency').val(result[n].CurrencyId);
        $('#CostCurrRate').val(parseFloat(result[n].CurrencyRate))
        x++;
        CalcCreditandDebit();
    }

    //$('#totcredit').val(a);
    //$('#totdebit').val(b);
    $('.jsgrid-button').prop('disabled', true);
    x = result.length + 1;
    $('#otrcost').val(a);
}


//Next and Previous of Current Invoice No Copy Function 

function GetBillPrevousornext(Value) {
    $('#Infopopup').fadeOut();
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
        data.DepartmentId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseInvoiceGetandGets",
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
                $('#btncrncysave,#btncrncyclear').prop("disabled", true);
                $('#btnaddcost').prop("disabled", true);
                //$('#btnedit').show();
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
    else if (Id == 3) {
       GetAreaGroupselect(0);           //For Area Popup
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
    var rate=parseFloat($('#txt_rate').val()).toFixed(Decimal)
    rate=isNaN(rate) ? 0 : rate;
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
                    $('#rate').val(parseFloat(data.CurrencyRate).toFixed(Decimal));
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



//1st Transfer Popup 

function GetList(Id) {


     if ($('#supplierId').val() == "0") {
            warningshow('Please Select Supplier', 'suppliername');
            return false;
        }
     else if ($('#transfer').val() == "0") {
         warningshow('Please Select Transfer Type', 'transfer');
         return false;
     }
     else if ($('#location').val() == "0") {
         warningshow('Please Select Location', 'location');
         return false;
     }
    else {
        if ($('#transfer').val() == 1) {
            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PendingPurchaseOrderGets",
                data: data,
                success: function (result) {
                    ShowPOList(result.oList);

                }
            });
        }
        else if ($('#transfer').val() == 2) {
        
            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PendingPerformaGets",
                data: data,
                success: function (result) {
                    ShowPerformaList(result.oList);

                }
            });
        }
        else if ($('#transfer').val() == 3) {
            var data = {};
            data.SupplierId = $('#supplierId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../MRVPurchase/PendingMRVGets",
                data: data,
                success: function (result) {
                    ShowMRVList(result.oList);

                }
            });
        }
    }
}

function ShowPerformaList(result) {
    disable_datatable('tbl_PerformaList');
    $('#RowGetPerforma').val = '';
    $('#myModalLabel18').text('Pending Purchase Performa');
    $('#addPerforma').hide();
    $('#ViewPerforma').show();
    $('#PerformaForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox' checked id= 'SlNoHeadCheckPerforma' 'custom-control-input cz-bg-image-display' onchange='SelectAllSuppPerforma()'>&nbsp;&nbsp;&nbsp;Select</th><th>Sl#</th><th>Order#</th><th style='text-align:center;'>Order Date</th><th style='width:8%;'>Supplier Code</th><th>Supplier</th><th>Fx.</th><th style='width:8%;'>Remarks</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>SlNo</th><th>OrderNo</th><th>Date</th><th style='width:8%;'>Code</th><th>Supplier</th><th>Currency</th><th style='width:8%;'>Remarks</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        responseText += '<tr id=' + "row" + slno + '><td style="width:90px;" ><input type="checkbox"  checked  id=' + 'SlNoCheckPerforma' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td>' +
             '<td>' + slno + '</td>' +
            '<td id=' + 'Ordercol' + slno + '>' + result[l].PPNo + '<input type="hidden" id="OrderNo' + slno + '" value= ' + result[l].OrderNo + '></td>' +
           '<td style="text-align:center">' + result[l].PPDate + '</td>' +
           '<td style="width:8%;">' + result[l].SupplierCode + '</td>' +
           '<td>' + result[l].SupplierName + '</td>' +
           '<td>' + result[l].CurrencyName + '<input type="hidden" id="Curr1' + slno + '" value=' + result[l].CurrencyId + '></td>' +
           '<td style="width:8%;">' + result[l].Remarks + '</td>' +
           '<td style=text-align:right>' + parseFloat(result[l].BaseAmount || 0).toFixed(Decimal) + '</td>' +
           '</tr>';
    }
    $('#tbl_PerformaList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PerformaList', 'Multiple');
    $('#RowGetPerforma').val(result.length)
    $('#btnview').focus();
}

function ShowMRVList(result) {

        disable_datatable('tbl_MRVList');
        $('#RowGetMRV').val = '';
        $('#myModalLabel18').text('Pending MRV');
        $('#addMRV').hide();
        $('#ViewMRV').show();
        $('#MRVForm').show();
        var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckMRV'  'custom-control-input cz-bg-image-display'  onchange='SelectAllSuppMRV()' >&nbsp;&nbsp;&nbsp;Select</th><th>MRV Num.</th><th>DO Num.</th><th>MRV Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th></tr>" +
            "<tr><th> </th><th>MRVNo</th><th>DONo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Remarks</th></tr></thead><tbody>";
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);

            responseText += '<tr><td style="width:90px;" ><input type="checkbox"  checked  id= ' + 'SlNoCheckMRV' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td><td id=' + 'MRVNo' + slno + '>'
                + result[l].MRVNo + '</td><td>'
                + result[l].DONo + '</td><td>'
                + result[l].MRVDate + '</td><td>'
                + result[l].SupplierName + '</td><td><input type="hidden" id="Curr' + slno + '" value='
                + result[l].CurrencyId + '>'
                + result[l].CurrencyName + '</td><td>'
                + result[l].Remarks + '</td></tr>';
        }
        $('#tbl_MRVList').html(responseText + '</tbody>');

        datatableWithsearch('tbl_MRVList', 'Multiple');

        $('#RowGetMRV').val(result.length)
        $('#btnviewMRV').focus();

    
}
function SelectAllSuppPerforma() {

    var rowCount = $('#RowGetPerforma').val();
    var flag = $("#SlNoHeadCheckPerforma").is(":checked")


    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckPerforma" + i) != null) {
            document.getElementById("SlNoCheckPerforma" + i).checked = flag;
        }
    }

}

function SelectAllSuppMRV() {

    var rowCount = $('#RowGetMRV').val();
    var flag = $("#SlNoHeadCheckMRV").is(":checked")


    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckMRV" + i) != null) {
            document.getElementById("SlNoCheckMRV" + i).checked = flag;
        }
    }

}
function SearchPerformaSup(Flag) {
    if (Flag == 1) {
        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = $('#PerformaFromDate').val();
        data.ToDate = $('#PerformaToDate').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPerformaGets",
            data: data,
            success: function (result) {
                ShowPerformaList(result.oList);

            }
        });

    } else if (Flag == 0) {
        $('#PerformaFromDate').val(CurDate);
        $('#PerformaToDate').val(CurDate);

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPerformaGets",
            data: data,
            success: function (result) {
                ShowPerformaList(result.oList);

            }
        });
    }
}

function SearchMRVSup(Flag) {
    if (Flag == 1) {
        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = $('#MRVFromDate').val();
        data.ToDate = $('#MRVToDate').val();
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../MRVPurchase/PendingMRVGets",
            data: data,
            success: function (result) {
                ShowMRVList(result.oList);

            }
        });

    } else if (Flag == 0) {
        $('#MRVFromDate').val(CurDate);
        $('#MRVToDate').val(CurDate);

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
                ShowMRVList(result.oList);

            }
        });
    }
}

function ViewPerformaItemList() {
 
    var table = $("#tbl_PerformaList").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    PPNumber = '';
    var row = $('#RowGetPerforma').val();
    var CurrencyFlag = 0;
  

    for (var n = 1; n <= row; n++) {
        if ($("#SlNoCheckPerforma" + n).is(":checked")) {
            CurrentCurrency = $('#Curr1' + n).val();
           
            break;
        }
    }


    for (var d = 1; d <= row; d++) {
        if ($("#SlNoCheckPerforma" + d).is(":checked")) {
            if ($('#Curr1' + d).val() != CurrentCurrency) { 
                CurrencyFlag = 1;
                break;
            }
            else
                continue;
        }
    }

    if (CurrencyFlag == 1) {
        warningshow('Select Purchase Performa with Same Curency');
    }
    else {

        for (m = 1; m <= row; m++) {
            if ($("#SlNoCheckPerforma" + m).is(":checked")) {

                if (PPNumber == '') {
                    PPNumber += $('#Ordercol' + m).text();
                }
                else {
                    PPNumber += ',' + $('#Ordercol' + m).text();
                }

            }
        }
        var data = {};
        data.PPNumber = PPNumber;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PerformaPurchaseGetProduct",
            data: data,
            success: function (result) {
                if (PPNumber != 0)
                    ShowItemGetPerforma(result.oList);

            }
        });
    }

}
function ShowItemGetPerforma(result) {
    disable_datatable('tbl_Performa_ListItem');
    $('#myModalLabel19').text('Performa Item List');
    $('#ViewPerforma').hide();
    $('#addPerforma').show();
    $('#PerformaForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckItemPerforma' onchange='SelectAllItemPerforma()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>Order#</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>No</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if (parseInt(result[l].Quantity) != 0) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckgridPerforma' + slno + ' ></td><td id=' + 'STNoRowPerforma' + slno + '>' +
                result[l].OrderNo + '<input type="hidden" id="PerformaSlNo' + slno + '" value=' +
                result[l].PurchaseOrderSubId + '><input type="hidden" id="Performa' + slno + '" value=' +
                result[l].OrderNo + '></td><td id=' + 'ProductPerforma' + slno + '>' +
                result[l].ItemCode + '<input type="hidden" id= ' + 'ProductIdgridPerforma' + slno + ' value= ' +
                result[l].ItemId + '></td><td id=' + 'DesPerforma' + slno + '>' +
                result[l].ItemDescription + '<input type="text" style="display:none;" id= ' + 'locnidPerforma' + slno + ' value= ' +
                result[l].LocationId + '></td><td id=' + 'UnitNamePerforma' + slno + '>' +
                result[l].UnitName + '<input type="text" style="display:none;" id= ' + 'UnitIdgridPerforma' + slno + ' value= ' +
                result[l].UnitId + '></td><td id=' + 'qty' + slno + '>' +
                parseInt(result[l].Quantity) + '<input type="hidden" id="qtyPerforma_' + slno + '" value=' +
                result[l].Quantity + '></td><td id=' + 'ratePerforma' + slno + '>' +
                parseFloat(result[l].Rate).toFixed(Decimal) + '<input type="hidden" id="rtePerforma_' + slno + '" value=' +
                result[l].Rate + '></td><td id=' + 'discountPerforma' + slno + '>' +
                parseFloat(result[l].FCDiscount).toFixed(Decimal) + '<input type="hidden" id="disPerforma_' + slno + '" value=' +
                result[l].FCDiscount + '><input type="text" style="display:none;" id= ' + 'taxidPerforma' + slno + ' value= ' +
                result[l].TaxId + '><input type="text" style="display:none;" id= ' + 'taxratePerforma' + slno + ' value= ' +
                result[l].TaxRate + '><input type="text" style="display:none;" id= ' + 'taxableamtPerforma' + slno + ' value= ' +
                result[l].FCTaxable + '></td><td id=' + 'taxamtPerforma' + slno + '>' + parseFloat(result[l].FCTax).toFixed(Decimal) + '<input type="hidden" id="taxamtPerforma_' + slno + '" value=' +
                result[l].FCTax + '></td><td id=' + 'totalPerforma' + slno + '>' +
                parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="totalPerforma_' + slno + '" value=' +
                result[l].TotalAmount + '><input type="hidden" id="LiJobnoPerforma_' + slno + '" value=' +
                result[l].JobNo + '><input type="hidden" id="LiJobcodePerforma_' + slno + '" value=' +
                result[l].JobCode + '></td></tr>';
        }
    }
    $('#tbl_Performa_ListItem').html(responseText + '</tbody>');
    datatableWithsearch('tbl_Performa_ListItem', 'Multiple');
    $('#RowGet1Performa').val(result.length)
    $('#btnaddtogridPerforma').focus();
}


function ViewMRVItemList() {

    var table = $("#tbl_MRVList").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    MRVNumber = '';
    var row = $('#RowGetMRV').val();
    var CurrencyFlag = 0;


    for (var n = 1; n <= row; n++) {
        if ($("#SlNoCheckMRV" + n).is(":checked")) {
            CurrentCurrency = $('#Curr' + n).val();
            break;
        }
    }


    for (var d = 1; d <= row; d++) {
        if ($("#SlNoCheckMRV" + d).is(":checked")) {
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
            if ($("#SlNoCheckMRV" + m).is(":checked")) {

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
                    ShowItemGetMRV(result.oList);

            }
        });
    }

}
function ShowItemGetMRV(result) {
    disable_datatable('tbl_MRV_ListItem');
    $('#myModalLabel18').text('MRV Item List');
    $('#ViewMRV').hide();
    $('#addMRV').show();
    $('#MRVForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckItemMRV' onchange='SelectAllItemMRV()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>MRVNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>MRVNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if (parseInt(result[l].Quantity) != 0) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckgridMRV' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
                result[l].MRVNo + '<input type="hidden" id="MRVSlNo' + slno + '" value=' +
                result[l].MRVSubId + '><input type="hidden" id="MRV' + slno + '" value=' +
                result[l].MRVNo + '></td><td id=' + 'ProductMRV' + slno + '>' +
                result[l].ItemCode + '<input type="hidden" id= ' + 'ProductIdgridMRV' + slno + ' value= ' +
                result[l].ItemId + '></td><td id=' + 'DesMRV' + slno + '>' +
                result[l].ItemDescription + '<input type="text" style="display:none;" id= ' + 'locnidMRV' + slno + ' value= ' +
                result[l].LocationId + '></td><td id=' + 'UnitNameMRV' + slno + '>' +
                result[l].UnitName + '<input type="text" style="display:none;" id= ' + 'UnitIdgridMRV' + slno + ' value= ' +
                result[l].UnitId + '></td><td id=' + 'qty' + slno + '>' +
                parseInt(result[l].Quantity) + '<input type="hidden" id="qtyMRV_' + slno + '" value=' +
                result[l].Quantity + '></td><td id=' + 'rateMRV' + slno + '>' +
                parseFloat(result[l].Rate).toFixed(Decimal) + '<input type="hidden" id="rteMRV_' + slno + '" value=' +
                result[l].Rate + '></td><td id=' + 'discountMRV' + slno + '>' +
                parseFloat(result[l].FCDiscount).toFixed(Decimal) + '<input type="hidden" id="disMRV_' + slno + '" value=' +
                result[l].FCDiscount + '><input type="text" style="display:none;" id= ' + 'taxidMRV' + slno + ' value= ' +
                result[l].TaxId + '><input type="text" style="display:none;" id= ' + 'taxrateMRV' + slno + ' value= ' +
                result[l].TaxRate + '><input type="text" style="display:none;" id= ' + 'taxableamtMRV' + slno + ' value= ' +
                result[l].FCTaxable + '></td><td id=' + 'taxamtMRV' + slno + '>' + parseFloat(result[l].FCTax).toFixed(Decimal) + '<input type="hidden" id="taxamtMRV_' + slno + '" value=' +
                result[l].FCTax + '></td><td id=' + 'totalMRV' + slno + '>' +
                parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="totalMRV_' + slno + '" value=' +
                result[l].TotalAmount + '><input type="hidden" id="LiJobnoMRV_' + slno + '" value=' +
                result[l].JobNo + '><input type="hidden" id="LiJobcodeMRV_' + slno + '" value=' +
                result[l].JobCode + '></td></tr>';
        }
    }
    $('#tbl_MRV_ListItem').html(responseText + '</tbody>');
    datatableWithsearch('tbl_MRV_ListItem', 'Multiple');
    $('#RowGet1MRV').val(result.length)
    $('#btnaddtogridMRV').focus();
}
function BackPerforma() {
    $('#ProductPopUp1PerformaId').val(0);
    $('#ProductPopUp1Performa').val('')
    $('#myModalLabel19').text('Pending Performa');

    $('#addPerforma').hide();
    $('#ViewPerforma').show();

}

function BackMRV() {
    $('#ProductPopUp1MRVId').val(0);
    $('#ProductPopUp1MRV').val('')
    $('#myModalLabel18').text('Pending MRV');

    $('#addMRV').hide();
    $('#ViewMRV').show();

}
function SelectAllItemPerforma() {
    var rowCount = $('#RowGet1Performa').val();
    var flag = $("#SlNoHeadCheckItemPerforma").is(":checked")
    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoCheckgridPerforma" + i) != null) {
            document.getElementById("SlNoCheckgridPerforma" + i).checked = flag;
        }
    }

}

function SelectAllItemMRV() {
    var rowCount = $('#RowGet1MRV').val();
    var flag = $("#SlNoHeadCheckItemMRV").is(":checked")
    for (var i = 1; i <= rowCount + 1; i++) {
        if (document.getElementById("SlNoCheckgridMRV" + i) != null) {
            document.getElementById("SlNoCheckgridMRV" + i).checked = flag;
        }
    }

}
function SearchPerformaSub(Flag) {
    if (Flag == 1) {
        if ($('#ProductPopUp1PerformaId').val() != 0) {
            var data = {};
            data.PPNumber = PPNumber;
            data.ItemId = $('#ProductPopUp1PerformaId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PerformaPurchaseGetProduct",
                data: data,
                success: function (result) {
                    if (PPNumber != 0)
                        ShowItemGetPerforma(result.oList);

                }
            });
        }
        else {
            warningshow('Please Enter Valid Product', 'ProductPopUp1');
        }

    } else if (Flag == 0) {

        $('#ProductPopUp1PerformaId').val(0);
        $('#ProductPopUp1Performa').val('')

        var data = {};
        data.PPNumber = PPNumber;
        data.ItemId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PerformaPurchaseGetProduct",
            data: data,
            success: function (result) {
                if (PPNumber != 0)
                    ShowItemGetPerforma(result.oList);

            }
        });

    }
}

function SearchMRVSub(Flag) {
    if (Flag == 1) {
        if ($('#ProductPopUp1MRVId').val() != 0) {
            var data = {};
            data.MRVNumber = MRVNumber;
            data.ItemId = $('#ProductPopUp1MRVId').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../MRVPurchase/PendingMRVGetProduct",
                data: data,
                success: function (result) {
                    if (MRVNumber != 0)
                        ShowItemGetMRV(result.oList);

                }
            });
        }
        else {
            warningshow('Please Enter Valid Product', 'ProductPopUp1');
        }

    } else if (Flag == 0) {

        $('#ProductPopUp1MRVId').val(0);
        $('#ProductPopUp1MRV').val('')

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
                    ShowItemGetMRV(result.oList);

            }
        });

    }
}


function PerformaAddToGrid() {
    if ($('#location').val() == 0)
        var LocationSeleted = ULocId;
    else
        var LocationSeleted = $('#location').val();
    $('.distxtbox').val('0.00');
    var table = $("#tbl_Performa_ListItem").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    TaxArray = [];
    var MRV = [];
    var MRVN = [];
    var row = $('#RowGet1Performa').val();

    i = 1;
    $("#tblpurchaseinvoice tr").remove();
    GetCurrency(CurrentCurrency);
    BillDiscountFlag = 0;
    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckgridPerforma" + m).is(":checked")) {

            var productIdgrid = $('#ProductIdgridPerforma' + m).val();
            var Product = $('#ProductPerforma' + m).text();
            var Des = $('#DesPerforma' + m).text();
            var locnid = $('#locnidPerforma'+m).val();
            var unitIdgrid = $('#UnitIdgridPerforma' + m).val();
          
            var unit = $('#UnitNamePerforma' + m).text();
            var qty = parseInt($('#qtyPerforma_' + m).val() || 0);
            var rate = parseFloat($('#rtePerforma_' + m).val() || 0).toFixed(Decimal);
            var discount = parseFloat($('#disPerforma_' + m).val() || 0).toFixed(Decimal);
            var taxid = $('#taxidPerforma' + m).val();
            var taxrate = $('#taxratePerforma' + m).val() || 0;
            var taxableamt = parseFloat($('#taxableamtPerforma' + m).val() || 0).toFixed(Decimal);
            var taxamt = parseFloat($('#taxamtPerforma_' + m).val() || 0).toFixed(Decimal);
            var total = parseFloat($('#totalPerforma_' + m).val() || 0).toFixed(Decimal);
            var mrv = $('#Performa' + m).val();
            var mrvsl = $('#PerformaSlNo' + m).val();
            var LiJobid = $('#LiJobnoPerforma_' + m).val();
            var Lijobcode = $('#LiJobcodePerforma_' + m).val();
            //$('#currency').val($('#Curr' + m).val());
           // $('#rate').val($('#currrate' + m).val());
            $('#PerformaForm').hide();

            MRV[m] = mrv;
            MRV.forEach(function (value) {
                if (MRVN.indexOf(value) == -1) MRVN.push(value);
            });


            var no = $('#tblpurchaseinvoice tr').length + 1;
            var slno = parseInt(i);
            


            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + slno + "' onfocusin='Editrow(" + slno + ")' onfocusout='UpdateRow(" + slno + ")'>" +
                "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + slno + ")'  title= Delete ></td>" +     //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>
                //"<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + slno + ")'></td>" +
                "<td id='td_" + slno + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" + no + "<input type='hidden' id='sl_" + slno + "' value=" + slno + "></td>" +
                "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderIds_" + slno + "' value='0'><input type='hidden' id='OrderSubId_" + slno + "' value='0'><input type='hidden' id='PerformaId_" + slno + "' value='" +
                    mrv + "'><input type='hidden' id='PerformaSubId_" + slno + "' value='" +
                    mrvsl + "'><input type='hidden' id='productId_" + slno + "' value='" +
                    productIdgrid + "'><input type='text' id='product_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                    Product + "'></td>" +
                "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                Des + "'></td>" +
                "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + slno + "' onchange='CheckFOC(" + slno + ",this)' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + slno + ") onfocusout=focusoutgrid('u'," + slno + ") onfocusin=focusingrid('u'," + slno + ")>" +
                UnitSelect + "</select><input type='hidden' id='txtunit_" + slno + "' class='form-control' /></td>" +
                "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='demoqty_" + slno + "' value='" + qty + "'><input type='text' id='quantity_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                qty + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + slno + ") onfocusout=focusoutgrid('q'," + slno + ") onfocusin=focusingrid('q'," + slno + ")></td>" +
                "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + slno + "' class='form-control CheckRateZero' disabled style='height:30px;background-color:white'  value='" +
                rate + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + slno + ") onfocusout=focusoutgrid('r'," + slno + ") onfocusin=focusingrid('r'," + slno + ")><input type='hidden' id='baserate_" + slno + "' class='form-control' value='' ></td>" +
                "<td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + slno + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                discount + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + slno + ") onfocusout=focusoutgrid('d'," + slno + ") onfocusin=focusingrid('d'," + slno + ")></td>" +
                "<td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + slno + "' class='form-control' style='height:30px;background-color:white'  value='" +
                taxableamt + "' disabled></td>" +
                "<td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + slno + "' onchange='ChangeTax(" + slno + ",this)' onkeydown=Focusnextgrid(event,'t'," + slno + ") onfocusout=focusoutgrid('t'," + slno + ") onfocusin=focusingrid('t'," + slno + ")>" +
                TaxSelect + "</select><input type='hidden' id='taxpercentage_" + slno + "' value=" +
                taxrate + "></td>" +
                "<td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + slno + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                taxamt + "'></td>" +
                "<td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' ><input type='hidden' id='txtsubtotal_" + slno + "' value=''><input type='text' id='amount_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                total + "'><input type='hidden' id='baseamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + slno + "' class='form-control'   disabled value=''></td>" +
                "<td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + slno + ") onfocusout=focusoutgrid('l'," + slno + ") onfocusin=focusingrid('l'," + slno + ")>" +
                LocationSelect + "</select></td>" +
                "<td id='col_13' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:250px;'><input type='hidden' id='jobcodeid_" + slno + "' value='" +
                LiJobid + "'><input type='text' id='jobcode_" + slno + "' value='" +
                Lijobcode + "' class='form-control' style='height:30px;background-color:white'  disabled onkeydown=Focusnextgrid(event,'j'," + slno + ") onfocusout=focusoutgrid('j'," + slno + ") onfocusin=focusingrid('j'," + slno + ")></td>" +
                "<td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td>" +
                "</tr>";


            $('#tblpurchaseinvoice').append(ProdEditRow);
           
            $('#unit_' + slno).val(unitIdgrid);
            $('#tax_' + slno).val(taxid);           
            $('#locn_' + slno).prop('disabled', false);
            $('#unit_' + slno).prop('disabled', false);
            $('#quantity_' + slno).prop('disabled', false);
            $('#txtrate_' + slno).prop('disabled', false);
            $('#discount_' + slno).prop('disabled', false);
            $('#tax_' + slno).prop('disabled', false);
            $('#jobcode_' + slno).prop('disabled', false);
            if (locnid != 0)
                $('#locn_' + slno).val(locnid);
            else
                $('#locn_' + slno).val(LocationSeleted);
            i++;

            var item = $("#taxpercentage_" + slno).val();
            if (TaxArray.indexOf(item) == -1) {
                TaxArray.push(item);
            }
            if (parseFloat($('#discount_' + slno).val()) > 0) {
                $('#disc').prop("disabled", true);
                $('#disc').val('0.00');
                BillDiscountFlag = 1;
            }
            TaxSplit(slno)
        }

    }
    CalcAmt();
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt($('#tblpurchaseinvoice tr').length) + 1;

    $('#lpo').val(MRVN)
    $('#PONo').val(MRVN)

    CurrentCurrency = 0;
    HidePerforma();
    TemporarySavePurchase();

}

function MRVAddToGrid()
{
    $('.distxtbox').val('0.00');
    var table = $("#tbl_MRV_ListItem").DataTable();
    for (var h = 1; h <= 9; h++) {
        table.column(h).search('').draw();
    }

    TaxArray = [];
    var MRV = [];
    var MRVN = [];
    var row = $('#RowGet1MRV').val();

    i = 1;
    $("#tblpurchaseinvoice tr").remove();
    GetCurrency(CurrentCurrency);
    BillDiscountFlag = 0;
    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckgridMRV" + m).is(":checked")) {

            var productIdgrid = $('#ProductIdgridMRV' + m).val();
            var Product = $('#ProductMRV' + m).text();
            var Des = $('#DesMRV' + m).text();
            var locnid = $('#locnidMRV' + m).val();
            var unitIdgrid = $('#UnitIdgridMRV' + m).val();
            var unit = $('#UnitNameMRV' + m).text();
            var qty = parseInt($('#qtyMRV_' + m).val() || 0);
            var rate = parseFloat($('#rteMRV_' + m).val() || 0).toFixed(Decimal);
            var discount = parseFloat($('#disMRV_' + m).val() || 0).toFixed(Decimal);
            var taxid = $('#taxidMRV' + m).val();
            var taxrate = $('#taxrateMRV' + m).val() || 0;
            var taxableamt = parseFloat($('#taxableamtMRV' + m).val() || 0).toFixed(Decimal);
            var taxamt = parseFloat($('#taxamtMRV_' + m).val() || 0).toFixed(Decimal);
            var total = parseFloat($('#totalMRV_' + m).val() || 0).toFixed(Decimal);
            var mrv = $('#MRV' + m).val();
            var mrvsl = $('#MRVSlNo' + m).val();
            var LiJobid = $('#LiJobnoMRV_' + m).val();
            var Lijobcode = $('#LiJobcodeMRV_' + m).val();
            $('#MRVForm').hide();

            MRV[m] = mrv;
            MRV.forEach(function (value) {
                if (MRVN.indexOf(value) == -1) MRVN.push(value);
            });


            var no = $('#tblpurchaseinvoice tr').length + 1;
            var slno = parseInt(i);



            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + slno + "' onfocusin='Editrow(" + slno + ")' onfocusout='UpdateRow(" + slno + ")'>" +
                "<td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;' ><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + slno + ")'  title= Delete ></td>" +     //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'>
                //"<td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:60px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + slno + ")'></td>" +
                "<td id='td_" + slno + "' class='jsgrid-cell'  style= 'width:50px;text-align:center' >" + no + "<input type='hidden' id='sl_" + slno + "' value=" + slno + "></td>" +
                "<td id='col_2' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:300px;' ><input type='hidden' id='OrderId_" + slno + "' value='0'><input type='hidden' id='OrderSubId_" + slno + "' value='0'><input type='hidden' id='MRVId_" + slno + "' value='" +
                    mrv + "'><input type='hidden' id='MRVSubId_" + slno + "' value='" +
                    mrvsl + "'><input type='hidden' id='productId_" + slno + "' value='" +
                    productIdgrid + "'><input type='text' id='product_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                    Product + "'></td>" +
                "<td id='col_x' class= 'jsgrid-cell jsgrid-align-left'  style= 'width:350px;' ><input type='text' id='productdesc_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                Des + "'></td>" +
                "<td id='col_4' class='jsgrid-cell'  style='width:120px;' > <select id='unit_" + slno + "' onchange='CheckFOC(" + slno + ",this)' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + slno + ") onfocusout=focusoutgrid('u'," + slno + ") onfocusin=focusingrid('u'," + slno + ")>" +
                UnitSelect + "</select><input type='hidden' id='txtunit_" + slno + "' class='form-control' /></td>" +
                "<td id='col_5' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='hidden' id='demoqty_" + slno + "' value='" + qty + "'><input type='text' id='quantity_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
                qty + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + slno + ") onfocusout=focusoutgrid('q'," + slno + ") onfocusin=focusingrid('q'," + slno + ")></td>" +
                "<td id='col_6' class= 'jsgrid-cell jsgrid-align-center'  style='width:120px;' ><input type='text' id='txtrate_" + slno + "' class='form-control CheckRateZero' disabled style='height:30px;background-color:white'  value='" +
                rate + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + slno + ") onfocusout=focusoutgrid('r'," + slno + ") onfocusin=focusingrid('r'," + slno + ")><input type='hidden' id='baserate_" + slno + "' class='form-control' value='' ></td>" +
                "<td id='col_7' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='discount_" + slno + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
                discount + "' onkeyup='CalcAmount(" + slno + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + slno + ") onfocusout=focusoutgrid('d'," + slno + ") onfocusin=focusingrid('d'," + slno + ")></td>" +
                "<td id='col_8' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttaxable_" + slno + "' class='form-control' style='height:30px;background-color:white'  value='" +
                taxableamt + "' disabled></td>" +
                "<td id='col_9' class='jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' > <select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + slno + "' onchange='ChangeTax(" + slno + ",this)' onkeydown=Focusnextgrid(event,'t'," + slno + ") onfocusout=focusoutgrid('t'," + slno + ") onfocusin=focusingrid('t'," + slno + ")>" +
                TaxSelect + "</select><input type='hidden' id='taxpercentage_" + slno + "' value=" +
                taxrate + "></td>" +
                "<td id='col_10' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' ><input type='text' id='txttax_" + slno + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
                taxamt + "'></td>" +
                "<td id='col_11' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:140px;' ><input type='hidden' id='txtsubtotal_" + slno + "' value=''><input type='text' id='amount_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
                total + "'><input type='hidden' id='baseamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + slno + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + slno + "' class='form-control'   disabled value=''></td>" +
                "<td id='col_3' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:120px;' > <select id='locn_" + slno + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + slno + ") onfocusout=focusoutgrid('l'," + slno + ") onfocusin=focusingrid('l'," + slno + ")>" +
                LocationSelect + "</select></td>" +
                "<td id='col_13' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-left'  style='width:250px;'><input type='hidden' id='jobcodeid_" + slno + "' value='" +
                LiJobid + "'><input type='text' id='jobcode_" + slno + "' value='" +
                Lijobcode + "' class='form-control' style='height:30px;background-color:white'  disabled onkeydown=Focusnextgrid(event,'j'," + slno + ") onfocusout=focusoutgrid('j'," + slno + ") onfocusin=focusingrid('j'," + slno + ")></td>" +
                "<td id='col_12' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center showothercost'  style='width:120px;'><input type='text' id='othercost_" + slno + "' class='form-control' style='height:30px;background-color:white'  disabled value=''></td>" +
                "</tr>";


            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#unit_' + slno).val(unitIdgrid);
            $('#locn_' + slno).val(locnid);
            $('#tax_' + slno).val(taxid);

            $('#locn_' + slno).prop('disabled', false);
            $('#unit_' + slno).prop('disabled', false);
            $('#quantity_' + slno).prop('disabled', false);
            $('#txtrate_' + slno).prop('disabled', false);
            $('#discount_' + slno).prop('disabled', false);
            $('#tax_' + slno).prop('disabled', false);
            $('#jobcode_' + slno).prop('disabled', false); 

            i++;

            var item = $("#taxpercentage_" + slno).val();
            if (TaxArray.indexOf(item) == -1) {
                TaxArray.push(item);
            }
            if (parseFloat($('#discount_' + slno).val()) > 0) {
                $('#disc').prop("disabled", true);
                $('#disc').val('0.00');
                BillDiscountFlag = 1;
            }
            TaxSplit(slno)
        }

    }
    CalcAmt();
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
    i = parseInt($('#tblpurchaseinvoice tr').length) + 1;

    $('#lpo').val(MRVN)
    $('#PONo').val(MRVN)
    CurrentCurrency = 0;
    HideMRV();
    TemporarySavePurchase();  
   
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
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                ShowPOList(result.oList);

            }
        });
    }
    else if (Flag == 0) {
        $('#InvoiceFromDate').val(CurDate);
        $('#InvoiceToDate').val(CurDate);

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.FromDate = '';
        data.ToDate = '';
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PendingPurchaseOrderGets",
            data: data,
            success: function (result) {
                ShowPOList(result.oList);

            }
        });
    }
}


function SearchInvoiceSub(Flag) {
    if (Flag == 1) {
        if ($('#ProductPopUp1Id').val() != 0) {


            var data = {};
            data.PONumber = PONumber;
            data.ItemId = $('#ProductPopUp1Id').val();
            data.DepartmentId = DepId;
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseOrderGetProduct",
                data: data,
                success: function (result) {
                    if (PONumber != 0)
                        ShowItemGet(result.oList);

                }
            });

        }
        else {
            warningshow('Please Select Valid Product', 'ProductPopUp1');
        }
    }
    else if (Flag == 0) {

        $('#ProductPopUp1Id').val(0);
        $('#ProductPopUp1').val('');

        var data = {};
        data.PONumber = PONumber;
        data.ItemId = 0;
        data.DepartmentId = DepId;
        $.ajax({
            type: "POST",
            url: "../Purchase/PurchaseOrderGetProduct",
            data: data,
            success: function (result) {
                if (PONumber != 0)
                    ShowItemGet(result.oList);

            }
        });
    }
}

function BackInvoice() {
    $('#ProductPopUp1Id').val(0);
    $('#ProductPopUp1').val('');

    $('#myModalLabel17').text('Purchase Orders');
    $('#add').hide();
    $('#View').show();

}

function ShowPOList(result) {
    disable_datatable('tbl_POList');
    $('#RowGet').val = '';
    $('#myModalLabel17').text('Purchase Orders');
    $('#add').hide();
    $('#View').show();
    $('#iconForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheck'  'custom-control-input cz-bg-image-display'  onchange='SelectAllSupp()' >&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Order Date</th><th>Supplier</th><th>Currency</th><th>Document Reference</th></tr>" +
        "<tr><th> </th><th>OrderNo</th><th>Date</th><th>Supplier</th><th>Currency</th><th>Reference</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr><td style="width:90px;" ><input type="checkbox"  checked  id= ' + 'SlNoCheck' + slno + '  "custom-control-input cz-bg-image-display" style="align:center"></td><td id=' + 'OrderNo' + slno + '>' +
            result[l].OrderNo + '</td><td>' +
            result[l].OrderDate + '</td><td>' +
            result[l].SupplierName + '</td><td><input type="hidden" id="Curr' + slno + '" value=' +
            result[l].CurrencyId + '>' +
            result[l].CurrencyName + '</td><td>' +
            result[l].DocRef + '</td></tr>';
    }
    $('#tbl_POList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_POList', 'Multiple');

    $('#RowGet').val(result.length);
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


//table based on PO Number
function ShowItemGet(result) {
    disable_datatable('tbl_PO_ListItem');
    $('#myModalLabel17').text('PO Item List');
    $('#View').hide();
    $('#add').show();
    $('#iconForm').show();
    var responseText = "<thead><tr><th style='width:90px;'> <input type='checkbox'  checked  id= 'SlNoHeadCheckItem' onchange='SelectAllItem()' 'custom-control-input cz-bg-image-display'>&nbsp;&nbsp;&nbsp;Select</th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amount</th><th>Amount</th></tr>" +
        "<tr><th> </th><th>OrderNo</th><th>Product</th><th>Description</th><th>Unit</th><th>Quantity</th><th>Rate</th><th>Discount</th><th>Tax Amt.</th><th>Amount</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        if (parseInt(result[l].Quantity) != 0) {
            var slno = parseInt(l + 1);
            responseText += '<tr><td style="width:90px;"><input type="checkbox"  checked  id= ' + 'SlNoCheckgrid' + slno + ' ></td><td id=' + 'STNoRow' + slno + '>' +
                result[l].OrderNo + '<input type="hidden" id="POSlNo' + slno + '" value=' +
                result[l].PurchaseOrderSubId + '><input type="hidden" id="orderno' + slno + '" value=' +
                result[l].OrderNo + '></td><td id=' + 'Product' + slno + '>' +
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
                result[l].FCDiscount + '><input type="text" style="display:none;" id= ' + 'taxidview' + slno + ' value= ' +
                result[l].TaxId + '><input type="text" style="display:none;" id= ' + 'taxrate' + slno + ' value= ' +
                result[l].TaxRate + '><input type="text" style="display:none;" id= ' + 'taxableamt' + slno + ' value= ' +
                result[l].FCTaxable + '></td><td id=' + 'taxamt' + slno + '>' + parseFloat(result[l].FCTax).toFixed(Decimal) + '</td><input type="hidden" id="taxamt_' + slno + '" value=' +
                result[l].FCTax + '><td id=' + 'total' + slno + '>' +
                parseFloat(result[l].TotalAmount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' +
                result[l].TotalAmount + '><input type="hidden" id="LiJobno_' + slno + '" value=' +
                result[l].JobNo + '><input type="hidden" id="LiJobcode_' + slno + '" value=' +
                result[l].JobCode + '><input type="hidden" id="MainProjectJobId_' + slno + '" value=' +
                result[l].MainJobNo + '><input type="hidden" id="MainProjectJobCode_' + slno + '" value=' +
                result[l].MainJobCode + '></td></tr>';
        }
    }
    $('#tbl_PO_ListItem').html(responseText + '</tbody>');
    datatableWithsearch('tbl_PO_ListItem', 'Multiple');
    $('#RowGet1').val(result.length)
    $('#btnaddtogrid').focus();
}


//selecting checkbox in PO Item List
function SelectAllItem() {
    var rowCount = $('#RowGet1').val();
    var flag = $("#SlNoHeadCheckItem").is(":checked")
    for (var i = 1; i <= rowCount; i++) {
        if (document.getElementById("SlNoCheckgrid" + i) != null) {
            document.getElementById("SlNoCheckgrid" + i).checked = flag;
        }
    }

}

//====================================================COMMON====================================================================


//Numeric Only Text Boxes with Decimal Point

function isNumber(evt,selectedvalue) {
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
        swal('Invoice No-' + no + ' ', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh(0);
        swal('Invoice No-' + no + ' ', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Invoice No-' + no + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();


    }
    else if (Status == 5) {
        swal('Invoice No-' + no + ' Already Exist', "for Previous Purchase", "warning");
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
            if (title == 'Date' || title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo') {
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


function EditInvoice(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditInvoce(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();
   
}

function CheckEditInvoce(Flag) {
    if ($.trim($('#otp').val() )== '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'Purchase Invoice Edit- OTP , Bill No : ' + $("#purchaseinvoiceno").val() + ' , ' + $("#purchasetype").val() + ' Purchase';
        else if (Flag == 1)
            Operation = 'Purchase Invoice Delete- OTP , Bill No : ' + $("#purchaseinvoiceno").val() + ' , ' + $("#purchasetype").val() + ' Purchase';

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
                    OTPCheck(status,Flag)
                }
            }
        });
    }
}

function OTPCheck(status,Flag) {
    if (status == 1) {
        if (Flag == 0)
        {
            OKEditInvoce();
        }
        else if (Flag == 1) {
           DeleteThisPurchase();
        }
        
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();      
    }
}

function OKEditInvoce() {
    $('#OTPDiv').hide();
    $('#btnedit').hide();
    $('#btnprint').hide();
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
    if ((usermenu1.indexOf("M224") != -1)) {
        $("#upload,#btnexcel").show();
        $("#fileUpload").show();
    }
    if ($('#tblOtherCost tr').length == 0) {
        $('#CostCurrency,#CostCurrRate').prop("disabled", false);
    }
    if (BillDiscountFlag == 1) {
        $('#disc').prop("disabled", true);
        $('#disc').val('0.00');
    }
    for (var id = 1; id <= i; id++) { 
        $('#unit_' + id).prop('disabled', false);
        $('#quantity_' + id).prop('disabled', false);
        $('#txtrate_' + id).prop('disabled', false);
        $('#discount_' + id).prop('disabled', false);
        $('#tax_' + id).prop('disabled', false);
        $('#locn_' + id).prop('disabled', false);
        $('#jobcode_' + id).prop('disabled', false);     
    }
}

function UpdatePurchase() {
    //CalcInvoice();

    var r = parseFloat($('#rate').val()).toFixed(Decimal);
    $("#rate").val(isNaN(r) ? 0 : r);

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
    if ($('#tblpurchaseinvoice tr').length == 0) {
        warningshow('No Products Added', 'product_0');
    }
    else if (parseFloat($('#GrandTotal').val()) <= 0 && $('#disc').val() != '') {
        warningshow('GrandTotal Cannot Negative or Zero', 'disc');
    }
    else if ($('#purchaseinvoiceno1').val() == '') {
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
    //else if ($.trim($('#SupInvoTotal').val()) == '' || $('#SupInvoTotal').val() == 0) {
    //    $('#SupInvoTotal').select();
    //    warningshow('Enter Invoice Amount', 'SupInvoTotal');
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
    else if (OtherCostFlag == 1) {
        warningshow('Other Cost Not Saved', 'btnothercost');
    }
    else {                    //ajax code for insert and update to  controller
        //if ($('#invdiff').val() != 0) {
        //    var Res = confirm('GrandTotal and Invoice Total Has Variation! Do You Want to Continue');
        //    if (Res == false) {
        //        return false;
        //    }
        //}
        $("#hiddenitemcode").val('');
        var AvgCostItems = [];

        $('#btnsaveedit').prop("disabled", true);
        $('#confirmOk').prop("disabled", true);

        var oArray = new Array();
        for (var k = 1; k < i; k++) {

            var PurchaseInvoiceMainId = $('#purchaseinvoiceno').val();
            var SlNo = $('#purchaseinvoiceno').val();
            var InvoNo = $('#purchaseinvoiceno1').val();
            var SupplierId = $('#supplierId').val();
            var PayType = $('#paytype').val();
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
            var OrderId = $('#OrderId_' + k).val();
            var OrderSubId = $('#OrderSubId_' + k).val();
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
            var LPO = $('#lpo').val();
            var PONo = $('#PONo').val();
            var FCRoundOff = $('#invdiff').val();
            var RoundOff = $('#baseinvdiff').val();
            var BaseInvoiceamount = $('#BaseInvoiceamount').val();

            var TaxId1 = $('#mtaxid1').val();
            var Taxable0 = $('#splittaxable_0').val();

            var TaxId2 = $('#mtaxid2').val();
            var Taxable5 = $('#splittaxable_5').val();
            var Tax5 = $('#splittax_5').val();

            var TaxId3 = $('#mtaxid3').val();
            var Taxable12 = $('#splittaxable_12').val();
            var Tax12 = $('#splittax_12').val();

            var TaxId4 = $('#mtaxid4').val();
            var Taxable18 = $('#splittaxable_18').val();
            var Tax18 = $('#splittax_18').val();

            var TaxId5 = $('#mtaxid5').val();
            var Taxable28 = $('#splittaxable_28').val();
            var Tax28 = $('#splittax_28').val();

            var MRVId = parseInt($('#MRVId_' + k).val() || 0);
            var MRVSubId = parseInt($('#MRVSubId_' + k).val() || 0);
          
            var Performa_NO = $('#PerformaId_' + k).val();
            var Performa_SubTbl_Id = $('#PerformaSubId_' + k).val();

            var Variable1 = parseInt($("#jobid").val() || 0);

            if (!(typeof ItemCode == "undefined")) {

                if (AvgCostItems.indexOf(ItemId) == -1) {
                    AvgCostItems.push(ItemId);
                }

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
                    'OrderId': OrderId,
                    'DeleteFlag': DeleteFlag,
                    'LPO': LPO,
                    'OrderSubId': OrderSubId,
                    'PONo': PONo,
                    'FCRoundOff': FCRoundOff,
                    'RoundOff': RoundOff,
                    'BaseInvoiceamount': BaseInvoiceamount,

                    'TaxId1': TaxId1,
                    'Taxable0': Taxable0,

                    'TaxId2': TaxId2,
                    'Taxable5': Taxable5,
                    'Tax5': Tax5,

                    'TaxId3': TaxId3,
                    'Taxable12': Taxable12,
                    'Tax12': Tax12,

                    'TaxId4': TaxId4,
                    'Taxable18': Taxable18,
                    'Tax18': Tax18,


                    'TaxId5': TaxId5,
                    'Taxable28': Taxable28,
                    'Tax28': Tax28,

                    'MRVId': MRVId,
                    'MRVSubId': MRVSubId,
                    'Performa_NO': Performa_NO,
                    'Performa_SubTbl_Id': Performa_SubTbl_Id,
                    'Variable1': Variable1


                })
            }
        }
      

        if (oArray != "") {

            var data = { 'PurchaseInvoiceModel': oArray };
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseInvoiceUpdate",
                data: data,
                success: function (result) {
                  
                    for (var i = 0; i <result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var no = result.oList[i].SlNo;
                        var Invodate = result.oList[i].InvoDate;
                        var Jobno = result.oList[i].JobNo;
                        var CurrencyId = result.oList[i].CurrencyId;
                        var CurrencyRate = parseFloat(result.oList[i].CurrencyRate);

                        if (status == 2) {

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
                                var JobCode = Jobno;
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
                                        'JobNo': JobCode,
                                        'CurrencyId': CurrencyId,
                                        'CurrencyRate': CurrencyRate,
                                        'UserId': UserId,
                                        'DepartmentId': DepartmentId,
                                        'DeleteFlag': DelFlag
                                    })
                                }
                            }
                            if (bArray != "") {
                                var data = { 'PurchaseInvoiceModel': bArray };
                                $.ajax({
                                    type: "POST",
                                    url: "../Purchase/OtherCostInsertandUpdate",
                                    data: data,
                                    success: function (result) {
                                        $('#btnsaveedit').prop("disabled", false);
                                        Showalerts(status, no);
                                    }
                                });
                            }
                            else {
                                $('#btnsaveedit').prop("disabled", false);
                                Showalerts(status, no);
                            }


                            $("#hiddenitemcode").val(AvgCostItems);
                            var datac = {};
                            datac.ItemCode = $("#hiddenitemcode").val();
                            datac.DepartmentId = ERPDeptId;
                            datac.UserId = ERPUserId;
                            $.ajax({
                                type: "POST",
                                url: "../Purchase/PurchaseAverageCostRefresh",
                                data: datac,
                                success: function (result) { }
                            });
                        }
                        else {
                            $('#btnsaveedit').prop("disabled", false);
                            Showalerts(status, no);
                        }

                    }
                }
            });
        }
        else {
            warningshow('No Products Added', 'product_0');
            $('#btnsaveedit').prop("disabled", false);
        }

    }

}



function TemporarySavePurchase() {

        var oArray = new Array();
        for (var k = 1; k < i; k++) {

            var PurchaseInvoiceMainId = $('#PurchaseInvoiceMainId').val();
            var SlNo = $('#purchaseinvoiceno').val();
            var InvoNo = $('#purchaseinvoiceno1').val();
            var SupplierId = $('#supplierId').val();
            var PayType = $('#paytype').val();
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
            var OrderId = $('#OrderId_' + k).val();
            var OrderSubId = $('#OrderSubId_' + k).val();
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
            var LPO = $('#lpo').val();
            var PONo = $('#PONo').val();
            var FCRoundOff = $('#invdiff').val();
            var RoundOff = $('#baseinvdiff').val();
            var BaseInvoiceamount = $('#BaseInvoiceamount').val();

            var TaxId1 = $('#mtaxid1').val();
            var Taxable0 = $('#splittaxable_0').val();

            var TaxId2 = $('#mtaxid2').val();
            var Taxable5 = $('#splittaxable_5').val();
            var Tax5 = $('#splittax_5').val();

            var TaxId3 = $('#mtaxid3').val();
            var Taxable12 = $('#splittaxable_12').val();
            var Tax12 = $('#splittax_12').val();

            var TaxId4 = $('#mtaxid4').val();
            var Taxable18 = $('#splittaxable_18').val();
            var Tax18 = $('#splittax_18').val();

            var TaxId5 = $('#mtaxid5').val();
            var Taxable28 = $('#splittaxable_28').val();
            var Tax28 = $('#splittax_28').val();

            var MRVId = parseInt($('#MRVId_' + k).val() || 0);
            var MRVSubId = parseInt($('#MRVSubId_' + k).val() || 0);

            var Performa_NO = $('#PerformaId_' + k).val();
            var Performa_SubTbl_Id = $('#PerformaSubId_' + k).val();

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
                    'OrderId': OrderId,
                    'DeleteFlag': DeleteFlag,
                    'LPO': LPO,
                    'OrderSubId': OrderSubId,
                    'PONo': PONo,
                    'FCRoundOff': FCRoundOff,
                    'RoundOff': RoundOff,
                    'BaseInvoiceamount': BaseInvoiceamount,

                    'TaxId1': TaxId1,
                    'Taxable0': Taxable0,

                    'TaxId2': TaxId2,
                    'Taxable5': Taxable5,
                    'Tax5': Tax5,

                    'TaxId3': TaxId3,
                    'Taxable12': Taxable12,
                    'Tax12': Tax12,

                    'TaxId4': TaxId4,
                    'Taxable18': Taxable18,
                    'Tax18': Tax18,


                    'TaxId5': TaxId5,
                    'Taxable28': Taxable28,
                    'Tax28': Tax28,

                    'MRVId': MRVId,
                    'MRVSubId': MRVSubId,
                    'Performa_NO': Performa_NO,
                    'Performa_SubTbl_Id': Performa_SubTbl_Id
                })
            }
        }

        if (oArray != "") {

            var data = { 'PurchaseInvoiceModel': oArray };
            $.ajax({
                type: "POST",
                url: "../Purchase/PurchaseItemTemporarySave",
                data: data,
                success: function (result) { }
            })
        };
    
}


function PrevItemsExistorNot() {

    var data = {};
    data.SupplierId = $('#supplierId').val();
    data.UserId = UId;
    data.DepartmentId = DepId

    $.ajax({
        type: "POST",
        url: "../Purchase/PrevItemsExistorNotPurchase",
        data: data,
        success: function (result) {

            if (result.oList[0].Status == 1) {
                $('#Confirmflag').val('loadprevpurchasedata'), $('#ConfirmRowId').val(0)
                $('#confirmmessage').text('Previous Data Available. Do you want to Load?')
                $('#confirm').show();
                $('#confirmOk').focus();                
            }
        }
    });
}

function CheckPrevoiusItems() {

        var data = {};
        data.SupplierId = $('#supplierId').val();
        data.UserId = UId;
        data.DepartmentId = DepId

        $.ajax({
            type: "POST",
            url: "../Purchase/PrevoiusUnsavedProductofSupplier",
            data: data,
            success: function (result) {
                if (result.length > 0) {
                        FillPrevoiusUnsavedProduct(result);
                }
                
            }
        });

    
}


function FillPrevoiusUnsavedProduct(result) {
    if (result.length > 0) {
        $('.distxtbox').val(0);
        i = 1; TaxArray = []; BillDiscountFlag = 0;
        $('#tblpurchaseinvoice tr').remove();
        for (var n = 0; n < result.length; n++) {

            $('#purchaseinvoiceno1').val(result[n].InvoNo);
            $('#currency').val(result[n].CurrencyId);
            $('#rate').val(parseFloat(result[n].CurrencyRate).toFixed(Decimal));
            $('#supplierId').val(result[n].SupplierId);
            $('#suppliername').val(result[n].SupplierName);



            var id = parseInt(n + 1)

            var ProdEditRow = "<tr class='jsgrid-row' id='row_" + id + "' onfocusin='Editrow(" + id + ")' onfocusout='UpdateRow(" + id + ")'>" +
            "<td id='edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:60px'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete ></td>" +       //<input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + id + ")'>
            "<td id='update_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:60px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + id + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' title='Cancel edit' onclick='CancelEdit(" + id + ")'></td>" +
            "<td id='td_" + id + "' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:50px'>" +
             id + "<input type='hidden' id='sl_" + id + "' value=" + id + "></td>" +
            "<td id='col_1' class='jsgrid-cell jsgrid-align-left jsgrid-sortable' style='width:300px'><input type='hidden' id='productId_" + id + "' value='" +
             result[n].ItemId + "'><input type='text' id='product_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
             result[n].ItemCode + "'></td>" +
            "<td id='col_x' class='jsgrid-cell jsgrid-align-left jsgrid-sortable' style='width:350px'><input type='text' id='productdesc_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].ItemDescription + "'></td>" +
            "<td id='col_3' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><select id='unit_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'u'," + id + ") onfocusout=focusoutgrid('u'," + id + ") onfocusin=focusingrid('u'," + id + ")>" +
            UnitSelect + "</select></td>" +
            "<td id='col_4' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><input type='text' id='quantity_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='" +
            result[n].Quantity + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumberInt(event,this)' onkeydown=Focusnextgrid(event,'q'," + id + ") onfocusout=focusoutgrid('q'," + id + ") onfocusin=focusingrid('q'," + id + ")></td>" +
            "<td id='col_5' class='jsgrid-cell jsgrid-align-center jsgrid-sortable' style='width:120px'><input type='text' id='txtrate_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Rate.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'r'," + id + ") onfocusout=focusoutgrid('r'," + id + ") onfocusin=focusingrid('r'," + id + ")><input type='hidden' id='baserate_" + id + "' class='form-control' value='' ></td>" +
            "<td id='col_6' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='discount_" + id + "' class='form-control' disabled style='height:30px;background-color:white'  value='" +
            result[n].Discount.toFixed(Decimal) + "' onkeyup='CalcAmount(" + id + ")' onkeypress='isNumber(event,this)' onkeydown=Focusnextgrid(event,'d'," + id + ") onfocusout=focusoutgrid('d'," + id + ") onfocusin=focusingrid('d'," + id + ")></td>" +
            "<td id='col_7' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='txttaxable_" + id + "' class='form-control' style='height:30px;background-color:white'  value='" +
            result[n].TaxableAmount.toFixed(Decimal) + "' disabled></td>" +
            "<td id='col_8' class='jsgrid-cell jsgrid-align-center' style='width:140px'><select  class='form-control' disabled style='height:30px;background-color:white' id='tax_" + id + "' onchange='ChangeTax(" + id + ",this)' onkeydown=Focusnextgrid(event,'t'," + id + ") onfocusout=focusoutgrid('t'," + id + ") onfocusin=focusingrid('t'," + id + ")>" +
            TaxSelect + "</select><input type='hidden' id='taxpercentage_" + id + "' value=" +
            result[n].TaxRate + "></td>" +
            "<td id='col_9' class='jsgrid-cell jsgrid-align-center' style='width:120px'><input type='text' id='txttax_" + id + "' class='form-control' style='height:30px;background-color:white' disabled value='" +
            result[n].TaxAmount.toFixed(Decimal) + "'></td>" +
            "<td id='col_10' class='jsgrid-cell jsgrid-align-center' style='width:140px'><input type='hidden' id='txtsubtotal_" + id + "' value=''><input type='text' id='amount_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='" +
            result[n].TotalAmount.toFixed(Decimal) + "'><input type='hidden' id='baseamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxableamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basetaxamount_" + id + "' class='form-control'   disabled value=''><input type='hidden' id='basediscount_" + id + "' class='form-control'   disabled value=''></td>" +
            "<td id='col_2' class='jsgrid-cell jsgrid-align-center' style='width:120px'><select id='locn_" + id + "' class='form-control' disabled style='height:30px;background-color:white' onkeydown=Focusnextgrid(event,'l'," + id + ") onfocusout=focusoutgrid('l'," + id + ") onfocusin=focusingrid('l'," + id + ")>" +
            LocationSelect + "</select></td>" +
            "<td id='col_13' class='jsgrid-cell jsgrid-align-left' style='width:250px'><input type='hidden' id='jobcodeid_" + id + "' value='"
            + result[n].JobNo + "'><input type='text' id='jobcode_" + id + "' class='form-control' disabled style='height:30px;background-color:white' value='"
            + result[n].JobCode + "' onkeydown=Focusnextgrid(event,'j'," + id + ") onfocusout=focusoutgrid('j'," + id + ") onfocusin=focusingrid('j'," + id + ")></td>" +
            "<td id='col_11' class='jsgrid-cell jsgrid-align-center showothercost' style='width:120px;'><input type='text' id='othercost_" + id + "' class='form-control' style='height:30px;background-color:white'  disabled value='"
            + parseFloat(0).toFixed(Decimal) + "'><input type='hidden' id='OrderId_" + id + "' value='"
            + parseInt(result[n].OrderId || 0) + "'/><input type='hidden' id='OrderSubId_" + id + "' value='"
            + parseInt(result[n].OrderSubId || 0) + "'/><input type='hidden' id='MRVId_" + id + "' value='"
            + parseInt(result[n].MRVId || 0) + "'/><input type='hidden' id='MRVSubId_" + id + "' value='"
            + parseInt(result[n].MRVSubId || 0) + "'/><input type='hidden' id='PerformaId_" + id + "' value='"
            + parseInt(result[n].Performa_NO || 0) + "'/><input type='hidden' id='PerformaSubId_" + id + "' value='"
            + parseInt(result[n].Performa_SubTbl_Id || 0) + "'/></td></tr>";


            $('#tblpurchaseinvoice').append(ProdEditRow);
            $('#tax_' + id).val(result[n].TaxId);
            $('#unit_' + id).val(result[n].UnitId);
            $('#locn_' + id).val(result[n].LocationId);

            $('#locn_' + id).prop('disabled', false);
            $('#unit_' + id).prop('disabled', false);
            $('#quantity_' + id).prop('disabled', false);
            $('#txtrate_' + id).prop('disabled', false);
            $('#discount_' + id).prop('disabled', false);
            $('#tax_' + id).prop('disabled', false);
            $('#jobcode_' + id).prop('disabled', false);

            var item = $("#taxpercentage_" + id).val();
            if (TaxArray.indexOf(item) == -1) {
                TaxArray.push(item);
            }
            CalcAmount(id)

            //if (parseFloat($('#discount_' + id).val()) > 0 || TaxArray.length > 1) {
            if (parseFloat($('#discount_' + id).val()) > 0) {
                $('#disc').prop("disabled", true);
                $('#disc').val('0.00');
                BillDiscountFlag = 1;
            }

            TaxSplit(id);

        }
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        i = result.length + 1;

        CalcGrandTotal(i);
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
                    var lpotr='';
                    if (result[p].LPO != '0')
                        lpotr = result[p].LPO;

                    if (result[p].PurchaseType == 'Local' || SuppDetailsRight=='Yes') {
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
                    else  {
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
                       "<td style='' class='text-left'>" + result[n].CustName + "                                   </td>" +
                       //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
                       "<td style='' class='text-right'>" + result[n].ProdQty + "                                   </td>" +
                       "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
                       "<td class='text-left'>" + result[n].Location + " </td>" +
                       "<td class='text-left' style=''>" + result[n].SalesMan + " </td>" +
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
                datatableWithsearch('tblalltrans', 'Single');

            }
        }

    });
}


//-------------------------------------------------------------------------Direct Edit In Product Grid-----------------------------------

//Changing background color when focus is out of grid textbox
function focusoutgrid(col, Id) {

    if (col == 'q')
    { $('#quantity_' + Id).css("background-color", 'white'); }
    else if (col == 'r')
    { $('#txtrate_' + Id).css("background-color", 'white'); }
    else if (col == 'd')
    { $('#discount_' + Id).css("background-color", 'white'); }
    else if (col == 't')
    { $('#tax_' + Id).css("background-color", 'white'); }
    else if (col == 'l')
    { $('#locn_' + Id).css("background-color", 'white'); }
    else if (col == 'u')
    { $('#unit_' + Id).css("background-color", 'white'); }
    else if (col == 'j')
    { $('#jobcode_' + Id).css("background-color", 'white'); }
}

//Changing background color when focus in(grid textbox)
function focusingrid(col, Id) {

    if (col == 'q')
    { $('#quantity_' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'r')
    { $('#txtrate_' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'd')
    { $('#discount_' + Id).css("background-color", '#58dbe4'); }
    else if (col == 't')
    { $('#tax_' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'l')
    { $('#locn_' + Id).css("background-color", '#58dbe4'); } 
    else if (col == 'u')
    { $('#unit_' + Id).css("background-color", '#58dbe4'); }
    else if (col == 'j')
    { $('#jobcode_' + Id).css("background-color", '#58dbe4'); }
}



//Focus to next text box in ProductGrid
function Focusnextgrid(e, col, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (key == 39) {              // Right Arrow

        if (col == 'u') {
            e.preventDefault();
            $('#quantity_' + Id).focus();
            $('#quantity_' + Id).select();
        }
        else if (col == 'q') {
            e.preventDefault();
            $('#txtrate_' + Id).focus();
            $('#txtrate_' + Id).select();
        }
        else if (col == 'r') {
            e.preventDefault();
            $('#discount_' + Id).focus();
            $('#discount_' + Id).select();
        }
        else if (col == 'd') {
            e.preventDefault();
            $('#tax_' + Id).focus();
        }
        else if (col == 't') {
            e.preventDefault();
            $('#locn_' + Id).focus();
        }      
        else if (col == 'l') {
            e.preventDefault();
            $('#jobcode_' + Id).focus();
            $('#jobcode_' + Id).select();
        }      
        else if (col == 'j' && ($('#jobcode_' + Id).val() == '' )) {
            e.preventDefault();
            $('#unit_' + Id).focus();        
        }
    }
    else if (key == 37) {              // Left Arrow

        if (col == 'u') {
            e.preventDefault();
            $('#jobcode_' + Id).focus();
            $('#jobcode_' + Id).select();
        }
        else if (col == 'j' && ($('#jobcode_' + Id).val() == '' )) {
            e.preventDefault();
            $('#locn_' + Id).focus();
        }
        else if (col == 'l') {
            e.preventDefault();
            $('#tax_' + Id).focus();
        }
        else if (col == 't') {
            e.preventDefault();
            $('#discount_' + Id).focus();
            $('#discount_' + Id).select();
        }
        else if (col == 'd') {
            e.preventDefault();
            $('#txtrate_' + Id).focus();
            $('#txtrate_' + Id).select();
        }
        else if (col == 'r') {
            e.preventDefault();
            $('#quantity_' + Id).focus();
            $('#quantity_' + Id).select();
        }                    
        else if (col == 'q') {
            e.preventDefault();
            $('#unit_' + Id).focus();
        }       
    }

    else if (key == 40 && Id != 0)          // Down Arrow
    {
        e.preventDefault();
        var Rid;

        try {

            Rid = ($('#row_' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; 
        }
        catch (err) {
            Rid = Id;
        }
        if (col == 'q') {
            $('#quantity_' + Rid).focus();
            $('#quantity_' + Rid).select(); 
        }
        else if (col == 'u') {
            $('#unit_' + Rid).focus();            
        }
        else if (col == 'r') {
            $('#txtrate_' + Rid).focus();
            $('#txtrate_' + Rid).select();
        }
        else if (col == 'd') {
            $('#discount_' + Rid).focus();
            $('#discount_' + Rid).select();
        }
        else if (col == 't') {
            $('#tax_' + Rid).focus();
            
        }
        else if (col == 'l') {
            $('#locn_' + Rid).focus();           
        }
        else if (col == 'j' && ($('#jobcode_' + Id).val() == '' )) {
            $('#jobcode_' + Rid).focus();
            $('#jobcode_' + Rid).select();
        }
        
    }
    else if (key == 38 && Id != 0) {           // Up Arrow
        e.preventDefault();
        var Rid;

        try {

            Rid = ($('#row_' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0];
        }
        catch (err) {
            Rid = Id;
        }
       
        if (col == 'q') {
            $('#quantity_' + Rid).focus();
            $('#quantity_' + Rid).select();
        }
        else if (col == 'u') {
            $('#unit_' + Rid).focus();
        }
        else if (col == 'r') {
            $('#txtrate_' + Rid).focus();
            $('#txtrate_' + Rid).select();
        }
        else if (col == 'd') {
            $('#discount_' + Rid).focus();
            $('#discount_' + Rid).select();
        }
        else if (col == 't') {
            $('#tax_' + Rid).focus();

        }
        else if (col == 'l') {
            $('#locn_' + Rid).focus();
        }
        else if (col == 'j' && ($('#jobcode_' + Id).val() == '' )) {
            $('#jobcode_' + Rid).focus();
            $('#jobcode_' + Rid).select();
        }

    }
}

//-------------------------------------------------------------------------End Direct Edit In Product Grid-----------------------------------

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
    $('#savedbillno').val('');
}