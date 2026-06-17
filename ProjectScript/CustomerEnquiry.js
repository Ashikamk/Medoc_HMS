
function LocationLoad(result) {
    $("#select_locn").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        //LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
        if (LocArray.includes(result[i].LocationId))
            LocnSelect += "<option value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
        else
            LocnSelect += "<option style='color:#26ACAE' disabled value='" + result[i].LocationId + "'name='" + result[i].LocationName + "'>" + result[i].LocationName + "</option>";
    }
    $("#select_locn").append(LocnSelect);
    $('#select_locn').val(UserLocationId);
}

var LocArray = [];
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

var BaseCurrency;
function CurncyLoad(result, a) {
    $("#select_crncy").empty();
    for (var i = 0; i < result.length; i++) {
        if (result[i].BaseCurrencyId != 0) {
             BaseCurrency = result[i].BaseCurrencyId;
        }
    }
    $("#select_crncy").append("<option value='0'>--Select--</option>");
    document.getElementById("select_crncy").options[0].disabled = true;
    for (var i = 0; i < result.length; i++) {
        $("#select_crncy").append("<option value='" + result[i].Id + "' name='" + result[i].CurrencyRate + "'>" + result[i].CurrencyName + "</option>");
    }
    if (a == 0) {
        $('#select_crncy').val(BaseCurrency);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));

    }
    else {
        $('#select_crncy').val(a);
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    
            for (var m = 1; m <= i; m++) {
                amountcalculation(m);
            }
            CalcGrandTotal(i);
       
    }
}
function UnitLoad(result) {
    $("#select_unit0,#unit_job").empty();
    UnitSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "'name='" + result[i].UnitName + "'>" + result[i].UnitName + "</option>";
    }
    $("#select_unit0,#unit_job").append(UnitSelect);
}
function TaxLoad(result) {
    $("#select_tax0,#tax_job").empty();
    TaxSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        TaxSelect += "<option value='" + result[i].TaxId + "' name='" + result[i].TaxRate + "'>" + result[i].TaxName + "</option>";
    }
    $("#select_tax0,#tax_job").append(TaxSelect);
    $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
    $("#txttaxpercent0").val($("#select_tax0").find("option:selected").attr("name"));
}

var UserSalesmanId = 0;
function SalesmanLoad(result, a) {
    $("#select_salesman").empty();
    $("#select_salesman").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#select_salesman").append("<option value='" + result[i].Id + "'>" + result[i].FirstName + "</option>");
        if (result[i].UserId == ERPUserId)
            UserSalesmanId = result[i].Id;
    }
    if (a == 0) {
        $('#select_salesman').val(UserSalesmanId)
    }
    else {
        $('#select_salesman').val(a);
    }
}          

var DefaultArea = 0;
function AreaLoad(result, a) {
  
    $("#select_place").empty();
    $("#select_place").append("<option value='0'>Place Of Supply</option>");
    for (var i = 0; i < result.length; i++) {
        if (result[i].DefaultArea != 0) {
            DefaultArea = result[i].DefaultArea
        }
        $("#select_place").append("<option value='" + result[i].AreaId + "'>" + result[i].AreaName + "</option>");
    }
    if (a == 0) {
        $('#select_place').val(DefaultArea); 
    }
    else {
        $('#select_place').val(a);
    }
}
function EnqNoload(result) {
    $('#txtEnquiryNo').val(result[0].EnquiryNo);
    $('#txtBlSlNo').val(result[0].EnquiryNo);
    $('#txtEnquiryNocopy').val(result[0].EnquiryNo) 
}
function EnqLoad() {

    var data = {};
    data.id = 0;
    data.DeptId = ERPDeptId; 
    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: data,
        success: function (result) {
            EnqNoload(result.oList); 
        }
    });
}
function crncyload(id) {
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
function placeload(id) {
    var data = {};
    data.AreaId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/AreaGetandGets",
        data: data,
        success: function (result) {
            AreaLoad(result.oList, id);
        }
    });
}
function Salesman(id) {

    var data = {};
    data.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Master/SalesmanGetandGets",
        data: data,
        success: function (result) {
            SalesmanLoad(result.oList, id);
        }
    });

}

var Decimal = Decimal;
var editflag = 0;
var i = 1;

function Selecttrans()
{
    if($('#salestransdiv').is(':visible'))
        TransactionSales();
    else if ($('#purchasetransdiv').is(':visible')) 
        TransactionPurchase();
    else if ($('#alltranstransdiv').is(':visible'))
        TransactionAll(); 
}

function TransactionSales()
{
    
    if ($("#PrdtId0").val() != 0) {
        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;                

        $("#txtquantity0,#txtproduct0").blur();
        var data = {};
        data.ProductId = $("#PrdtId0").val();
        data.DeptId = ERPDeptId;
        data.type = flag;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: '../SalesInvoice/SalesTransGetandGets',
            data: data,
            success: function (result) {
                productpopuprefresh();
                       
                $('#purchasetransdiv').hide();
                $('#salestranspopupdiv').show();
                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Sales Transaction Details');
                $('#salestransdiv').show();
                $('#txtquantity0').focus();
                SalesTransLoad(result);
            }
        });
    }
}

function TransactionPurchase()
{
   
    if ($("#PrdtId0").val() != 0) {
        $('#idforlabeltype').text('All');
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;

        var data = {};
        data.ItemId = $("#PrdtId0").val();
        data.DepartmentId = ERPDeptId;
        data.UserId = ERPUserId;
        data.Type = flag;
        $.ajax({
            type: "POST",
            url: '../Purchase/PurchaseTransactionSearch',
            data: data,
            success: function (result) {

                productpopuprefresh();
                disable_datatable('tblurchasetrans');
                $('#tblurchasetrans tr').remove();

                //  $('#tblurchasetrans tr td').remove();
                $('#salestranspopupdiv').show();
                $('#purchasetransdiv').show();
                $('#salestransdiv').hide();
                var ProductDesc = $('#ProductDesc0').val();
                var product = $('#txtproduct0').val();
                $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - Last Purchase Transaction Details');

                $('#txtquantity0').focus();

                var ProdRow = "<thead><tr><th>Invoice No</th><th>Date</th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency</th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr>" +
                         "<tr><th>Invoice No</th><th>Date </th><th>Supplier</th><th>Supp_No</th><th>Qty.</th><th>Cost</th><th>AvgCost</th><th>Location</th><th>Currency </th><th>Department</th><th>PO_Ref</th><th>OtherCost</th></tr></thead><tbody>";


                if (result.length != 0) {

                    for (var p = 0; p < result.length; p++) {
                        var a = (result[p].Rate + result[p].OtherCost).toFixed(Decimal);
                        var lpotr = '';
                        if (result[p].LPO != '0')
                            lpotr = result[p].LPO;

                        if (result[p].PurchaseType == 'Local' || SuppDetailsRight == 'Yes') {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td style='width:20%' class='text-left'>" + result[p].SupplierName + "</td>" +
                                "<td class='text-left'>" + result[p].AccName + "</td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                        else {
                            ProdRow = ProdRow + "<tr id=" + 'pdctrow' + (p + 1) + ">" +
                                "<td style='width:12%' class='text-left'>Sl No: (" + result[p].SlNo + ") - Inv No: (" + result[p].InvoNo + ")</td>" +
                                "<td class='text-left'>" + result[p].InvoDate + "</td>" +
                                "<td></td>" +
                                "<td></td>" +
                                "<td style='text-align:right'>" + result[p].Quantity + "</td>" +
                                "<td style='text-align:right'>" + a + "</td>" +
                                "<td style='text-align:right'>" + parseFloat(result[p].Cost).toFixed(Decimal) + "</td>" +
                                "<td class='text-left'>" + result[p].Locnname + "</td>" +
                                "<td class='text-left'>" + result[p].CurrencyName + "</td>" +
                                "<td class='text-left'>" + result[p].DeptName + "</td>" +
                                "<td class='text-left'>" + lpotr + "</td>" +
                                 "<td style='text-align:right'>" + parseFloat(result[p].OtherCost).toFixed(Decimal) + "</td>" +
                                "</tr>";
                        }
                    }

                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultipleSalesT');
                    $('#tblurchasetrans').scrollTop(0);

                }
                else {
                    $('#tblurchasetrans').html(ProdRow + '</tbody>');
                    datatableWithsearch('tblurchasetrans', 'MultipleSalesT');
                }



            }
        });
    }
}

function TransactionAll()
{
    if ($("#PrdtId0").val() != 0) {
        $('#idforlabeltype').text('Previous'); 
        $("#txtquantity0,#txtproduct0").blur();
        if ($('#status_type').prop("checked"))
            var flag = 1;
        else
            var flag = 0;
                var data = {};
                data.ItemId = $("#TransPrdtId0").val();
                data.DepartmentId = ERPDeptId;
                data.UserId = ERPUserId;
                data.Type = flag;
                $.ajax({
                    type: "POST",
                    url: "../Purchase/TransactionSearch",
                    data: data,
                    success: function (result) {

                        var ProductDesc = $('#ProductDesc0').val();
                        var product = $('#txtproduct0').val();                       

                        disable_datatable('tblalltrans');
                        productpopuprefresh();
                        $('#salestranspopupdiv').show();
                        $('#salestransdiv').hide();
                        $('#alltranstransdiv').show();
                        $('#salesheader').text(ProductDesc + '(' + product + ')' + ' - All Transaction Details');
                        $('#purchasetransdiv').hide();
                      
                        $('#tblalltrans tr').remove();                      

                        var ProdRow = "<thead><tr><th>Bill Number</th><th>Invoice Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Qty.</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr>" +
                            "<tr><th>Bill Number</th><th>Date</th><th>TransType</th><th>Salesman</th><th>Status</th><th>Account Name</th><th>Remarks</th><th>Qty.</th><th>Balance</th><th>Cost</th><th>Price</th><th>Location</th><th>Dept</th><th>Job Code</th></tr></thead><tbody>";

                     
                        if (result.length != 0) {

                            var BalQty = parseInt(result[0].OpeningQty);

                            for (var n = 0; n < result.length; n++) {
                                if (result[n].Status == 'IN') {
                                    BalQty += parseInt(result[n].Quantity)
                                }
                                else {
                                    BalQty = BalQty - parseInt(result[n].Quantity)
                                }
                               
                                ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
                               "<td class='text-left'  style='width:1%'> " + result[n].BillNo + "</td>" +
                                 "<td class='text-left' style='width:1%'>" + result[n].InvoDate + " </td>" +
                               "<td class='text-left' style='width:1%'>" + result[n].TransType + "  </td>" +
                              "<td class='text-left' style='width:3%'>" + result[n].Salesman + " </td>" +
                                "<td class='text-left' style='width:1%'>" + result[n].Status + "  </td>" +
                              "<td class='text-left' style='width:6%'>" + result[n].AccountName + " </td>" +
                                "<td class='text-left' style='width:6%'>" + result[n].Remarks + " </td>" +
                              "<td class='text-left' style='width:1%'>" + result[n].Quantity + " </td>" +
                              "<td class='text-left' style='width:1%'>" + BalQty + "  </td>" +
                              "<td class='text-right' style='width:3%'>" + parseFloat(result[n].Cost || 0).toFixed(Decimal) + "   </td>" +
                              "<td class='text-right' style='width:3%'>" + parseFloat(result[n].TransPrice || 0).toFixed(Decimal) + " </td>" +
                               "<td class='text-left' style='width:5%'>" + result[n].Locnname + " </td>" +
                                "<td class='text-left' style='width:1%'>" + result[n].DeptName + "  </td>" +
                                "<td class='text-left' style='width:6%'>" + result[n].JobCode + "  </td>" + "</tr>";
                            }
                            $('#tblalltrans').html(ProdRow + '</tbody>');
                            datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                            $('#alltranstransdiv').scrollTop(0);

                        }
                        else {
                            $('#tblalltrans').html(ProdRow + '</tbody>');
                            datatableWithsearch('tblalltrans', 'MultipleAllTransaction');
                        }
                    }
                });

            }
}

$(document).keydown(function (e) {
    

    var x = event.keyCode;
    if ((x > 111 && x < 124)) {                  //Functional Keys default function block  



        if ((x == 118)) {                     // F7 - Pop Up to Show Sales Transaction Details of Selected Product 
            salestranspopuprefresh();
            $('#status_type').prop("checked",false) 
            TransactionSales();

        }
      
        else if ((x == 119)) {                         // F8 - Pop Up to Show Purchase Transaction Details of Selected Product 
            salestranspopuprefresh();
            $("#txtquantity0,#txtproduct0").blur();
            $('#status_type').prop("checked", false)
            TransactionPurchase();           
        }
        else if ((x == 120)) {  // F9 :   All Transaction details Popup      
            salestranspopuprefresh();
            $('#status_type').prop("checked", false)
            TransactionAll();
        }



        event.cancelBubble = true;
        event.returnValue = false;
        event.keyCode = false;
        return false;

    }



   else if ((e.altKey && e.keyCode == 83) && (!$("#salestranspopupdiv").is(":visible"))) {    
        if (copyflag != 1)
        savecustomerenquiry(); 
    }
    else if ((e.altKey && e.keyCode == 67) && (!$("#salestranspopupdiv").is(":visible"))) {   //Alt+C 
        if (copyflag != 1)
            GetRows(0);
    }
    else if ((e.altKey && e.keyCode == 78) && (!$("#salestranspopupdiv").is(":visible"))) {  //Alt+N
        formrefreshconfirm();
    }

    else if (e.keyCode == 27) { //escape
        if (copyflag != 1)
        {
            productpopuprefresh();
            popuprefresh();
            jobpopuprefresh();
            salestranspopuprefresh();
        }
       
    }

    //else if (e.altKey && e.keyCode == 49) { //alt+1 
  

    //}
    //else if (e.altKey && e.keyCode == 51) { //alt+3  
       
    //}
    //else if ((e.altKey && e.keyCode == 52) ) {                      //Alt+4    :   All Transaction details Popup      
                  
    //}

})

function datatableWithsearch(tablename, Type) {
    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Select' || title == 'Details') {
                $(this).html('<input type="text" class="form-control"  style="width:30px;display:none"  placeholder="' + title + '"/>')
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
                { "width": "10%", "targets": 2 }
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

//Pop Up for Sales Transactions
function SalesTransLoad(result) {
    disable_datatable('tblsalestrans');
    $('#tblsalestrans tr').remove();
    var ProdRow = "<thead><tr><th>SalesInvoice</th><th>Date</th><th style='width:25%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr>" +
                               "<tr><th>SalesInvoice</th><th>Date</th><th style='width:25%'>AccountName</th><th style='width:6%'>Qty.</th><th>Price</th><th>Location</th><th style='width:20%'>SalesMan</th><th>Department</th></tr></thead><tbody>";


    if (result.length != 0) {

        for (var n = 0; n < result.length; n++) {

            ProdRow += "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
               "<td class='text-left'> " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
               "<td class='text-left'>" + result[n].InvDate + "                                   </td>" +
               "<td style='width:25%' class='text-left'>" + result[n].CustName + "                                   </td>" +
               //"<td style='width:15%' class='text-left'>" + result[n].CustAddress + "                                   </td>" +
               "<td style='width:6%' class='text-right'>" + result[n].ProdQty + "                                   </td>" +
               "<td class='text-right'>" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
               "<td class='text-left'>" + result[n].Location + " </td>" +
               "<td class='text-left' style='width:20%'>" + result[n].SalesMan + " </td>" +
               //"<td style='width:7%' class='text-left'>" + result[n].LPONumber + "                                   </td>" +
               "<td class='text-left'>" + result[n].DepartmentName + "                                   </td>" +
                "</tr>";
        }
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
        $('#tblsalestrans').scrollTop(0);
    }
    else {
        $('#tblsalestrans').html(ProdRow + '</tbody>');
        datatableWithsearch('tblsalestrans', 'MultipleSalesT');
    }

    //for (var n = 0; n < result.length; n++) {

    //    var ProdRow = "<tr class='jsgrid-row' id=" + 'pdctrow' + (n + 1) + ">" +
    //    "<td > " + result[n].BillDescription + " - " + result[n].BillSlNo + "</td>" +
    //    "<td >" + result[n].InvDate + "                                   </td>" +
    //    "<td >" + result[n].CustName + "                                   </td>" +
    //    "<td >" + result[n].ProdQty + "                                   </td>" +
    //    "<td >" + parseFloat(result[n].ProdRate || 0).toFixed(Decimal) + " </td>" +
    //    "<td >" + result[n].UnitName + "                                   </td>" +

    //    "</tr>";

    //    $('#tblsalestrans').append(ProdRow);

    //}
}

//Close Transaction Popup
function salestranspopuprefresh() {
   
    $('#tblsalestrans tr td').remove();
    $('#tblurchasetrans tr td').remove();
    $('#tblalltrans tr td').remove();
    $('#salestranspopupdiv').hide();
    $('#salestransdiv').hide();
    $('#alltranstransdiv').hide();   
    $('#purchasetransdiv').hide();
    $('#salesheader').text('Transaction Details');

    if( $('#salestransdiv').is(':visible')) 
    $('#txtquantity0').focus();
   
}


//Save Customer Enquiry
function savecustomerenquiry() {
    var r = parseFloat($('#txtcrncyrate').val());
    $("#txtcrncyrate").val(isNaN(r) ? 0 : r);
    var rowcount = CountRows();
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (copyflag == 1) {
        return false;
    }  
    else if ($.trim($("#txtcustomer").val()) == '') {
        warningshow('Please Select Customer', 'txtcustomer');
    }
    else if ($('#select_locn').val() == 0) {
        warningshow('Please Select Location', 'select_locn');
    }
    else if ($('#select_salesman').val() == 0) {
        warningshow('Please Select Sales Man', 'select_salesman');
    }
    else if ($('#select_place').val() == 0) {
        warningshow('Please Select Place', 'select_place');
    }
    else if ($('#select_crncy').val() == 0 || $('#select_crncy').val() == null) {
        warningshow('Please Select Currency', 'select_crncy');
    }
    else if ($.trim($('#txtcrncyrate').val()) == '' || $.trim($('#txtcrncyrate').val()) == 0) {
        warningshow('Enter Currency Rate', 'txtcrncyrate');
        $('#txtcrncyrate').select();
    }
    else if (rowcount == 0) {
        warningshow('No Products Added!', 'txtproduct0');
    }
    else {
        $('#btnsubmit').prop('disabled', true);
        var gamt = $('#FcGrandTotal').val();
        var gntamt = Math.round(gamt);
        var roundgndtotal = 0;
        if (gamt > gntamt) {
            roundgndtotal = $('#FcGrandTotal').val() - gntamt;
        }
        else {
            roundgndtotal = gntamt - $('#FcGrandTotal').val();
        }
        $('#roundgndtotal').val(roundgndtotal.toFixed(Decimal));

        var fgamt = $('#GrandTotal').val();
        var fcgntamt = Math.round(fgamt);
        var roundfcgndtotal = 0;
        if (fgamt > fcgntamt) {
            roundfcgndtotal = $('#GrandTotal').val() - fcgntamt;
        }
        else {
            roundfcgndtotal = fcgntamt - $('#GrandTotal').val();
        }
        $('#roundfcgndtotal').val(roundfcgndtotal.toFixed(Decimal));


        var oArray = new Array();
        for (var k = 1; k <= i - 1; k++) {

            var ProductId = $('#PrdtId' + k).val();
            var ProductCode = $('#txtproduct' + k).val();
            var ProductDescr = $('#ProductDesc' + k).val();
            var EnquiryNo = $('#txtEnquiryNo').val();
            var UnitId = $('#select_unit' + k).val();
            var UnitName = $('#select_unit' + k).find("option:selected").attr("name");
            var ProdQty = $('#txtquantity' + k).val();
            var ProdRate = $('#txtfcrate' + k).val();
            var FcProdRate = $('#txtrate' + k).val();
            var ProdDisc = $('#txtfcdiscount' + k).val();
            var FcProdDisc = $('#txtdiscount' + k).val();
            var TaxableAmount = $('#txtfctaxableamnt' + k).val();
            var FCTaxableAmount = $('#txttaxableamnt' + k).val();
            var TaxId = $('#select_tax' + k).val();
            var TaxPercent = $('#txttaxpercent' + k).val();
            var TaxAmount = $('#txtfctaxamnt' + k).val();
            var FCTaxAmount = $('#txttaxamnt' + k).val();
            var Amount = $('#txtfcamnt' + k).val();
            var FCAmount = $('#txtamnt' + k).val();
            var CustId = $('#txtCustId').val();
            var CustName = $('#txtcustomer').val();
            var CustAddress = $('#txtaddress').val();
            var InvDate = $('#txtivdate').val();
            var SalesManId = $('#select_salesman').val();
            var AreaId = $('#select_place').val();
            var CurrencyId = $('#select_crncy').val();
            var CurrencyRate = $('#txtcrncyrate').val();
            var GrandTotal = $('#FcGrandTotal').val();
            var RoundGrandTotal = $('#roundgndtotal').val();
            var FCGrandTotal = $('#GrandTotal').val();
            var RoundFCGrandTotal = $('#roundfcgndtotal').val();
            var TotalDiscount = $('#FcTotalDiscount').val();
            var FCTotalDiscount = $('#TotalDiscount').val();
            var TotalTaxable = $('#FcTotalTaxable').val();
            var FCTotTaxable = $('#TotalTaxable').val();
            var TotalTax = $('#FcTotalTax').val();
            var FCTotTax = $('#TotalTax').val();
            var Remarks = $('#txtmsg').val();
            var DeptId = ERPDeptId;
            var UserId = ERPUserId; 
            var DelFlag = 1;
            var PhoneNumber = $('#txtphone').val();
            var DocNumber = $('#txtdocumentno').val();
            var Subject = $('#txtsubject').val();
            var Location=$('#select_locn').val();
            if (ProductCode != undefined) {

                oArray.push({
                    'ProductId': ProductId,
                    'ProductCode': ProductCode,
                    'ProductDescr': ProductDescr,
                    'EnquiryNo': EnquiryNo,
                    'UnitId': UnitId,
                    'UnitName': UnitName,
                    'ProdQty': ProdQty,
                    'ProdRate': ProdRate,
                    'FcProdRate': FcProdRate,
                    'ProdDisc': ProdDisc,
                    'FcProdDisc': FcProdDisc,
                    'TaxableAmount': TaxableAmount,
                    'FCTaxableAmount': FCTaxableAmount,
                    'TaxId': TaxId,
                    'TaxPercent': TaxPercent,
                    'TaxAmount': TaxAmount,
                    'FCTaxAmount': FCTaxAmount,
                    'Amount': Amount,
                    'FCAmount': FCAmount,
                    'CustId': CustId,
                    'CustName': CustName,
                    'CustAddress': CustAddress,
                    'InvDate': InvDate,
                    'SalesManId': SalesManId,
                    'AreaId': AreaId,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'GrandTotal': GrandTotal,
                    'RoundGrandTotal': RoundGrandTotal,
                    'FCGrandTotal': FCGrandTotal,
                    'RoundFCGrandTotal': RoundFCGrandTotal,
                    'TotalDiscount': TotalDiscount,
                    'FCTotalDiscount': FCTotalDiscount,
                    'TotalTaxable': TotalTaxable,
                    'FCTotTaxable': FCTotTaxable,
                    'TotalTax': TotalTax,
                    'FCTotTax': FCTotTax,
                    'Remarks': Remarks,
                    'DeptId': DeptId,
                    'UserId': UserId,
                    'PhoneNumber': PhoneNumber ,
                    'DocNumber':   DocNumber   ,
                    'Subject':     Subject     , 
                    'DelFlag': DelFlag,
                    'Location': Location
                })
            }

        }
        if (oArray != "") {

            var data = { 'CustomerEnquiryModel': oArray }; 
            $.ajax(
        {

            type: "POST",
            url: "../SalesInvoice/CustomerEnquiryInsertandUpdate", 
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    var enquiryno = result.oList[i].EnquiryNo;
                    Showalerts(status, enquiryno);
                    Tbldelete();
                    $('#btnsubmit').prop('disabled', false);
                }
            }
        });
        }
    }
}
function deptloadView() {
    var data = {};
    data.DepartmentId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            $("#DepartmentCode").val(result.oList[0].DepartmentCode);
        }
    });

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

//Document Ready
$(document).ready(function () {
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
    $('#txt_code,#txt_cname,#txt_rate,#txtname,#select_areagroup,#txtcode,#txtdescription,#code,#txt_fname,#txt_lname,#txt_amount,#txt_address1,#txt_address2,#txt_address3,#txtdesc').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });
    $('#DateFrom,#DateTo').daterangepicker({
        startDate: CurDate,
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    })

    $('#txt_remark,#txtdescription,#txt_contactnumber,#txtterms').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });

    deptloadView();
    $("#btnadd").focus(function (e) {
        $("#btnadd").removeClass("btn btn-outline-primary");
        $("#btnadd").addClass("btn btn-primary");
    });

    $("#btnadd").focusout(function () {
        $("#btnadd").removeClass("btn btn-primary");
        $("#btnadd").addClass("btn btn-outline-primary");
    });


    $('.form-control').attr('autocomplete', 'off');
    $('#txtcustomer').focus();
    crncyload(0);
    placeload(0);
    Salesman(0);
  
    EnqLoad();
  
    $("#flip1").click(function () {
        $("#panel1").slideToggle(1);
        $('#txtmsg').focus();
    });



    $("#btnsubmit").click(function (e) {
        savecustomerenquiry(); 
    });

    
    $('#txtphone,#txtcrncyrate,#txtivdate,#txtdocumentno,#txtsubject,#select_locn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 1).focus();
        }

    });
    $('#select_crncy,#select_salesman').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:visible');
            inputs.eq(inputs.index(this) + 2).focus();
        }

    });
    $('#select_place').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#txtproduct0').focus();
        }

    });
   
  

    $("#tax_job").change(function () {

        var selectedValue = $(this).val();
        $("#taxpercentage_job").val($("#tax_job").find("option:selected").attr("name"));
        var x = $('#taxpercentage_job').val();
        CalcJobAmount();
    });


    $("#txtproduct0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($('#PrdtId0').val() != 0) {

                $('#txtquantity0').focus();
            }
           
            else if ($('#PrdtId0').val() == 0 && ($.trim($('#txtproduct0').val()) == 'job' || $.trim($('#txtproduct0').val()) == 'JOB')) {
                    addpopupjob(1);
                clearrow();
                $('#productjob').focus();
            }
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


    var input = document.getElementById("btnpdct");
    input.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            $('#txtquantity0').focus();
        }
    });

  

    $("#select_crncy").change(function () {

        var selectedValue = $(this).val();
        $("#txtcrncyrate").val($(this).find("option:selected").attr("name"))
        for (j = 0; j <= i; j++) {
            amountcalculation(j);
        }
        CalcGrandTotal(i);
    });

    $("#select_unit0").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        $('#txtquantity0').focus();
        if ($(this).find("option:selected").attr("name") == 'FOC') {
            foc = 1;
            $('#txtrate0').val(0);
            amountcalculation(0);
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }

    });
    $("#unit_job").change(function () {
        var selectedValue = $(this).val();
        $("#txtunit").val($(this).find("option:selected").attr("name"))
        if ($(this).find("option:selected").attr("name") == 'FOC') {

            foc = 1;
            $('#txtrate_job').val(0);
            CalcJobAmount();
        }
        if ($(this).find("option:selected").attr("name") != 'FOC') {
            foc = 0;
        }
    });

 
    $('#select_salesman').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_place').focus();
            e.preventDefault();
        }
    });
    $('#select_place').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#select_crncy').focus();
            e.preventDefault();
        }
    });

   
 
    $('#select_unit0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
    $('#select_tax0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btnadd').focus();
            e.preventDefault();
        }
    });

    $('#txtcustomer').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#txtCustId').val() != 0) {
                $('#txtphone').focus(); 
            }
            else {
                $('#txtproduct0').focus();
            }
            e.preventDefault();
        }
    });
    $('#txtproduct0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $('#PrdtId0').val() != 0) {
            $('#txtquantity0').focus();
            e.preventDefault();
        }
    });
  
    $('#txtEnquiryNocopy').keyup(function (e) {
        e.preventDefault();
        //$('#tour1').fadeOut();
        $('#Warningpopup').fadeOut();
        var entrkey = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        if (entrkey == 8) {
            Tbldelete();
            copyrefresh();
        }


    });



   
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


});


var copyflag = 0;

function formrefreshconfirm() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        var rowcount = CountRows();
        if (rowcount > 0 && copyflag == 0) { 
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        }     
        else
        {
            formrefresh();
        }
    }
}

//Popup Refresh
function popuprefresh() {
    $('#popupdiv').hide();
    $('#txt_code').val('');
    $('#txt_cname').val('');
    $('#txt_rate').val('');
    $('#txt_remark').val('');
    $('#CrncyId').val(0);

    $('#txtname').val('');
    $('#select_areagroup').val('0');
    $('#txtcode').val('');
    $('#txtdescription').val('');
    $('#AreaId').val(0);


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
    $('#TermsId').val(0);
}

//Product PopUp Refresh
function productpopuprefresh() {
    $('#productpopupdiv').hide();
    $('#pdctrow').remove();
    $('#pdctrow1').remove();
    $('#custlsp').hide();
}

//Form Refresh
function formrefresh() {
    if (editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        $('#copybill').hide();
        $('#bill').show();

        $('#btnlist').prop('disabled', false);
        $('#btntrnsfr').css("height", '100%');

        $('#btnsubmit').prop("disabled", false);
        $('#btnlist').prop("disabled", false);
        $('#txtEnquiryNo').prop("disabled", true);
        $('#btnadd').prop("disabled", false);
        $('#txtcustomer').prop("disabled", false);
        $('#txtivdate').val(CurDate);
        $('#txttaxpercent0').val('');
        $('#txtmsg').val('');
        $('#txtEnquiryNo').val('');
        $('#txtcustomer').val('');
        $('#txtCustId').val(0);
        $('#txtsubject').val(''); 
        $('#txtaddress').val('');
        $('#select_salesman').val(UserSalesmanId);
        $('#select_place').val(0);
        $('#txtproduct0').val('');
        $('#btndelete').hide();
        $('#select_unit0').val(0);
        $('#txtquantity0').val('');
        $('#txtstocktotloseqty0').val(0);
        $('#txtrate0').val('');
        $('#txtdiscount0').val('');
        $('#select_tax0').val(0);
        $('#txtamnt0').val('');
        $('#txtdocumentno').val('');
        $('#txtphone').val('');
        $('#roundgndtotal').val(0);
        $('#roundfcgndtotal').val(0);
      
        $('#TransPrdtId0').val(0);
        $('#codelength').val(''); 

        $('#TotalDiscount').val('0.00');
        $('#TotalTaxable').val('0.00');
        $('#TotalTax').val('0.00');
        $('#GrandTotal').val('0.00');
        $('#disc').val('0.00');
        $('#gndtotal').text('0.00');
        $('#fc').text('fc');
        $("#fc").css("opacity", '0');       
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();
        $('#PriceGroupId').val(0);
        GrandTotal = 0;
        EnqLoad();
        copyflag = 0;
        foc = 0;
        qtyflag = 0;

        $('#txtduedate').css("background-color", 'white');
        //$('#txttaxpercent0').css("background-color", 'white');
        //$('#txtamnt0').css("background-color", 'white');
        $('.form-control').prop("disabled", false); 
        $('#btncrncy,#btnsales,#btnsply,#btnpdct,#btncst').prop("disabled", false);
        $('#txtEnquiryNo').prop("disabled", true);
        $('#txtduedate').prop("disabled", true);
        $('#txttaxpercent0').prop("disabled", true);
        $('#txtamnt0').prop("disabled", true);

        $('.jsgrid').prop("disabled", false);
     //   $('#tour1').fadeOut();

        productpopuprefresh();
        jobpopuprefresh();
        salestranspopuprefresh();
        Tbldelete();
        copyrefresh();

        $("#panel1").hide();
        $('#custlsp').hide();
        $('#select_crncy').val(BaseCurrency); 
        $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
        Defaultfocus();
        $('#editheader').show();
     
        $('#select_locn').val(UserLocationId);
        $('#select_place').val(DefaultArea);
        $('#TotalDiscount,#TotalTaxable,#TotalTax').prop("disabled", true);
        eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
        $('#AvgCost0').val(0);

        $('#btnsubmit').show();
        $('#btnlist').show(); 
    }

}

function Defaultfocus() {
    $('#txtcustomer').focus();
}

var GrandTotal;

//Calculate Grand Total
function CalcGrandTotal(Id) {
    var TotalTaxable = 0;
    var TotalDiscount = 0;
    var TotalTax = 0;
    GrandTotal = 0;
    $('#GrandTotal').val('');
    $('#TotalDiscount').val('');
    $('#TotalTax').val('');
    $('#TotalTaxable').val('');
    for (var i = 1; i <= Id; i++) {
        GrandTotal = GrandTotal + parseFloat($('#txtamnt' + i).val() || 0);
        TotalDiscount = TotalDiscount + parseFloat($('#txtdiscount' + i).val() || 0);
        TotalTax = TotalTax + parseFloat($('#txttaxamnt' + i).val() || 0);
        TotalTaxable = TotalTaxable + parseFloat($('#txttaxableamnt' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));
    $('#TotalDiscount').val(TotalDiscount.toFixed(Decimal));
    $('#TotalTax').val(TotalTax.toFixed(Decimal));
    $('#TotalTaxable').val(TotalTaxable.toFixed(Decimal));
    $('#gndtotal').text(GrandTotal.toFixed(Decimal));

    fccalculation(Id);

}

//Calculate FC of Product Row
function fccalculation(id) {
    var fc = parseFloat($('#txtcrncyrate').val()).toFixed(Decimal);
    fc = isNaN(fc) ? 0 : fc;


    var fcgrandtotal = 0;
    var fctotdisc = 0;
    var fctottaxable = 0;
    var fctottax = 0;

    fcgrandtotal = parseFloat($('#GrandTotal').val() || 0) * fc;
    var rowcount = CountRows();
    if (fcgrandtotal > 0 && rowcount > 0) {       
        if (fc != 1) {
            $("#fc").css("opacity", '100');
        }
        else {
            $("#fc").css("opacity", '0');
        }
        $('#gndtotal').text(fcgrandtotal.toFixed(Decimal));

        $("#fc").text('FC : ' + GrandTotal.toFixed(Decimal));
    }
    else {
        $("#fc").css("opacity", '0');
    }


    fctotdisc = parseFloat($('#TotalDiscount').val()) * fc;
    fctottaxable = parseFloat($('#TotalTaxable').val()) * fc;
    fctottax = parseFloat($('#TotalTax').val()) * fc;

    $('#FcTotalDiscount').val(fctotdisc.toFixed(Decimal));
    $('#FcTotalTaxable').val(fctottaxable.toFixed(Decimal));
    $('#FcTotalTax').val(fctottax.toFixed(Decimal));
    $('#FcGrandTotal').val(fcgrandtotal.toFixed(Decimal));


}

//Calculate Product Row Amount
function amountcalculation(id) {
    var fc = $('#txtcrncyrate').val();
    var fcprodrate = 0;
    var fcproddisc = 0;
    var fctaxable = 0;
    var fctax = 0;
    var fcamnt = 0;

    var quantity = $('#txtquantity' + id).val() || 0;
    var rate = parseFloat($('#txtrate' + id).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    var amount = parseFloat(quantity * rate);
    var discount = parseFloat($('#txtdiscount' + id).val() || 0);
    discount = isNaN(discount) ? 0 : discount;
    var taxableamount = parseFloat(amount - discount);
    var taxrate = parseFloat($('#txttaxpercent' + id).val() || 0);
    var taxamount = (taxableamount * taxrate) / 100; 
    var totalamount = parseFloat(taxableamount.toFixed(Decimal)) + parseFloat(taxamount.toFixed(Decimal));
    $('#txtamnt' + id).val(totalamount.toFixed(Decimal));
    $('#txttaxableamnt' + id).val(taxableamount.toFixed(Decimal));
    $('#txttaxamnt' + id).val((taxamount).toFixed(Decimal));

    fcprodrate = parseFloat($('#txtrate' + id).val() || 0) * fc;
    fcproddisc = parseFloat($('#txtdiscount' + id).val() || 0) * fc;
    fctaxable = parseFloat($('#txttaxableamnt' + id).val() || 0) * fc;
    fctax = parseFloat($('#txttaxamnt' + id).val() || 0) * fc;
    fcamnt = parseFloat($('#txtamnt' + id).val() || 0) * fc;

    $('#txtfcrate' + id).val(fcprodrate.toFixed(Decimal));
    $('#txtfcdiscount' + id).val(fcproddisc.toFixed(Decimal));
    $('#txtfctaxableamnt' + id).val(fctaxable.toFixed(Decimal));
    $('#txtfctaxamnt' + id).val(fctax.toFixed(Decimal));
    $('#txtfcamnt' + id).val(fcamnt.toFixed(Decimal));
    if (id != 0) {
        CalcGrandTotal(i);
    }

}


//Clear Product Row
function clearrow() {
    $('#TransPrdtId0').val(0);
   
    $('#codelength').val('');
    $('#PrdtId0').val('');
    $('#txtproduct0').val('');
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_unit0').val(0);
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txttaxpercent0').val('');
    $('#txtproduct0').focus();
    $('#AvgCost0').val(0);
}



var qtyflag = 0;
var foc = 0;

//Add Product Details To Grid
function productadd() {
   
    var a = parseFloat($('#txtdiscount0').val());
    var c = parseFloat($('#txtrate0').val());
    $("#txtdiscount0").val(isNaN(a) ? 0 : a);
    $('#txtrate0').val(isNaN(c) ? 0 : c);

    var rowcount = CountRows();
    var ProductFlag = 0;
    for (p = 1; p <= i; p++) {
        if (($('#PrdtId' + p).val() == $("#PrdtId0").val())) {
            ProductFlag = 1;
        }
    }

    if ($.trim($("#txtproduct0").val()) == '') {
        warningshow('Please Enter The Product', 'txtproduct0');
    }
    else if ($("#PrdtId0").val() == 0) {
        warningshow('Please Enter a Valid Product', 'txtproduct0');
        $('#txtproduct0').select();
    }
    else if ($("#select_unit0").val() == 0 || $("#select_unit0").val()=='') { 
        warningshow('Please Select The Unit', 'select_unit0');
        $('#select_unit0').select();
    }
    else if ($("#txtquantity0").val() == '' || $("#txtquantity0").val() == 0) {
        warningshow('Please Enter The Quantity', 'txtquantity0');
        $('#txtquantity0').select();
    }
    else if ($("#txtrate0").val() == '') {
        warningshow('Please Enter The Rate', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ((BelowCost == 'NO') && (parseFloat($("#txtrate0").val()) < parseFloat($('#AvgCost0').val()))) { 
        warningshow('Rate must be greater than ' + $('#AvgCost0').val(), 'txtrate0');
        $('#txtrate0').select();
        return false;
    }
    else if (foc == 0 && ($("#txtamnt0").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate0');
        $('#txtrate0').select();
    }
    else if ($("#txtamnt0").val() < 0) {

        warningshow('Amount cant be Negative', 'txtrate0');
        $('#txtrate0').select(); 
    }
    else if ($("#select_tax0").val() == 0) {
        warningshow('Plaease select Tax', 'select_tax0');

    }
    else {
        if (rowcount == 0) {
            i = 1;
        }
        if (ProductFlag == 1) {            
            var Res = confirm('Product Already Added! Do You Want to Continue');
            if (Res == false) {
                clearrow();
                return false;
            }          
        }
        $('#Warningpopup').fadeOut();
        amountcalculation(0);
        var slno = rowcount + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + slno + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='" + $("#PrdtId0").val() + "' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#txtproduct0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='" + $("#ProductDesc0").val() + "'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#txtquantity0').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumberInt(event,this)'><input type='text' class='form-control text-center' id=" + 'txtstocktotloseqty' + id + " value=" + parseInt($('#txtstocktotloseqty0').val()) + " style='display:none'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' disabled='' class='form-control text-center' id=" + 'AvgCost' + id + " value=" + parseFloat($('#AvgCost0').val()).toFixed(Decimal) + " style='background-color:white;height:30px;display:none'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#txtfcrate0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate0').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#txtfcdiscount0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#txtdiscount0').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#txtfctaxableamnt0').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxableamnt0').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#txttaxpercent0').val() + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#txtfctaxamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttaxamnt0').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#txtfcamnt0').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#txtamnt0').val() + "></td>" +
            "</tr>";
        $('#tblsalesinvoice').append(ProdRow1);
        $('#select_unit' + id).val($('#select_unit0').val());
        $('#select_tax' + id).val($('#select_tax0').val());
        i++;
        clearrow();
        productpopuprefresh();
        CalcGrandTotal(i);
        fccalculation(i);
        salestranspopuprefresh();
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}


//Clear Job Fields
function jobpopuprefresh() {

    $('#jobpopupdiv').hide();
    $('#product_0').val('');
    $('#productId_job').val(0);
    $('#productjob').val('');
    $('#unit_job').val(0);
    $('#txtrate_job').val('');
    $('#tax_job').val(0);
    $('#taxpercentage_job').val('');
    $('#quantity_job').val('');
    $('#discount_job').val('');
    $('#amount_job').val('');
}


//Add Job Details To Product Grid
function JobAdd() {

    var a = parseFloat($('#discount_job').val());
    var b = parseFloat($('#txtsubtotal_job').val());

    var rowcount = CountRows();
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
    else if ($.trim($('#txtrate_job').val()) == '') {
        warningshow('Please Enter Rate', 'txtrate_job');
        return false;
    }
    else if ($('#discount_job').val() > 100) {
        warningshow('Discount Limit Exceeded', 'discount_job');
        return false;
    }
    else if (a > b) {
        warningshow('Amount Cannot be Negative', 'txtrate_job'); 
        return false;
    }
    else if (foc == 0 && ($("#amount_job").val() == 0)) {

        warningshow('Amount cant be 0', 'txtrate_job');
    }
    else if ($('#tax_job').val() == 0) {
        warningshow('Please select Tax', 'tax_job');
        return false;
    }
    else {
        var no = $('#tblsalesinvoice tr').length + 1;
        var id = parseInt(i);
      

        var prodjob = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
            "<td id= 'col13_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:15px'><input class='jsgrid-button jsgrid-edit-button jsgrid-align-center' id='btnroedit' type='button' onclick='EditRow(" + id + ")' title='Edit'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' id='btnrodelt' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
            "<td id= 'col14_" + id + "'  class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width:15px'><input class='jsgrid-button jsgrid-update-button' id='Update' type='button' onclick='updaterow(" + id + ")' title='Update'><input class='jsgrid-button jsgrid-cancel-edit-button' type='button' id='canceledit' onclick='editcancel(" + id + ")' title='Cancel edit'></td>" +
            "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:15px;text-align:center'>" + no + "</td>" +
            "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'PrdtId' + id + " style='display:none' value='0' /><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'txtproduct' + id + " value='" + $("#productjob").val() + "'></td>" +
             "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' style='height:30px;background-color:white' disabled='' class='form-control text-left' id=" + 'ProductDesc' + id + " value='JOB'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select disabled='' id=" + 'select_unit' + id + " style='background-color:white;height:30px' class='form-control' onchange='changeunit(" + id + ",this)'>" + UnitSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><input type='text' disabled='' class='form-control text-center' id=" + 'txtquantity' + id + " value=" + parseInt($('#quantity_job').val()) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'> <input type='text' id=" + 'txtfcrate' + id + " value=" + parseFloat($('#fcamount_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' id=" + 'txtrate' + id + " value=" + parseFloat($('#txtrate_job').val()).toFixed(Decimal) + " style='background-color:white;height:30px' onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcdiscount' + id + " value=" + parseFloat($('#fctxtdisc_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' id=" + 'txtdiscount' + id + " class='form-control text-center' style='background-color:white;height:30px' value=" + parseFloat($('#discount_job').val() || 0).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input type='text' id=" + 'txtfctaxableamnt' + id + " value=" + parseFloat($('#fctxttaxable_job').val()).toFixed(Decimal) + "  style='display:none'><input type='text' disabled='' class='form-control text-center' style='background-color:white;height:30px' id=" + 'txttaxableamnt' + id + " value=" + parseFloat($('#txttaxable_job').val()).toFixed(Decimal) + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-align-center' style='width:30px'><select style='background-color:white;height:30px' disabled='' id=" + 'select_tax' + id + " class='form-control' onchange='ChangeTax(" + id + ",this)'>" + TaxSelect + "</select></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input typ='text' disabled='' style='background-color:white;height:30px' class='form-control text-center' id=" + 'txttaxpercent' + id + " value=" + $('#taxpercentage_job').val()  + " onkeyup='amountcalculation(" + id + ")'></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfctaxamnt' + id + " value=" + parseFloat($('#fctxttax_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' style='background-color:white;height:30px' class='form-control text-center'  id=" + 'txttaxamnt' + id + " value=" + parseFloat($('#txttax_job').val()).toFixed(Decimal) + " disabled=''></td>" +
            "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:30px'><input type='text' id=" + 'txtfcamnt' + id + " value=" + parseFloat($('#fctxtsubtotal_job').val()).toFixed(Decimal) + "  style='display:none'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'txtamnt' + id + " value=" + $('#amount_job').val() + "></td>" +
            "</tr>";

        $('#tblsalesinvoice').append(prodjob);
        $('#select_unit' + id).val($('#unit_job').val());
        $('#select_tax' + id).val($('#tax_job').val());
        $('#txtunit_' + id).val($('#txtunit_job').val());

        i++;
        clearrow();
        jobpopuprefresh();
        $('#product_0').val('');
        CalcGrandTotal(i);
    }
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}


//Calculate Total Amount Of Job
function CalcJobAmount() {
    var fc = $('#txtcrncyrate').val();
    var fcjobprodrate = 0;
    var fcjobproddisc = 0;
    var fcjobtaxable = 0;
    var fcjobtax = 0;
    var fcjobamnt = 0;


    var jbquantity = parseFloat($('#quantity_job').val() || 0);
    var jbrate = parseFloat($('#txtrate_job').val() || 0);
    jbrate = isNaN(jbrate) ? 0 : jbrate;
    var jbdiscount = parseFloat($('#discount_job').val() || 0);
    jbdiscount = isNaN(jbdiscount) ? 0 : jbdiscount;
    var jbtaxpercentage = parseFloat($("#taxpercentage_job").val() || 0);
    var jbtamount = parseFloat(jbquantity * jbrate)
    var jbtaxableamount = parseFloat(jbtamount - jbdiscount)
    var jbtaxamount = parseFloat(jbtaxableamount * (jbtaxpercentage / 100));
    var jbtotalamount = parseFloat(jbtaxableamount.toFixed(Decimal)) + parseFloat(jbtaxamount.toFixed(Decimal));

    $("#amount_job").val(jbtotalamount.toFixed(Decimal));
    $("#txttaxable_job").val(jbtaxableamount.toFixed(Decimal));
    $("#txttax_job").val(jbtaxamount.toFixed(Decimal));
    $("#txtsubtotal_job").val(jbtamount.toFixed(Decimal));

    fcjobprodrate = parseFloat($('#txtrate_job').val() || 0) * fc;
    fcjobproddisc = parseFloat($('#discount_job').val() || 0) * fc;
    fcjobtaxable = parseFloat(jbtamount - jbdiscount) * fc;
    fcjobtax = parseFloat(jbtaxableamount * (jbtaxpercentage / 100)) * fc;
    fcjobamnt = parseFloat(jbtaxableamount + jbtaxamount) * fc;

    $("#fcamount_job").val(fcjobprodrate.toFixed(Decimal));
    $("#fctxttaxable_job").val(fcjobtaxable.toFixed(Decimal));
    $("#fctxttax_job").val(fcjobtax.toFixed(Decimal));
    $("#fctxtsubtotal_job").val(fcjobamnt.toFixed(Decimal));
    $("#fctxtdisc_job").val(fcjobproddisc.toFixed(Decimal));

}


//Count Rows Of Sales Table
function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblsalesinvoice");
    var rows = table.getElementsByTagName("tr")
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }
    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    return rowCount;
}

//Tax Dropdown Change
function ChangeTax(TId, selectObject) {
    var value = selectObject.value;
    $("#txttaxpercent" + TId).val($(selectObject).find("option:selected").attr("name"))
    amountcalculation(TId);
}

//Unit Dropdown Change
function changeunit(TId, selectObject) {
    var value = selectObject.value;
    var unitsname = $(selectObject).find("option:selected").attr("name");
    if (unitsname == 'FOC') {
        foc = 1;
        $('#txtrate' + TId).val(0);
        amountcalculation(TId);
    }
    else {
        foc = 0;
    }
}

var eunit = ''; var eqnty = ''; var erate = ''; var edis = ''; var etaxable = ''; var etax = ''; var etaxperc = ''; var etaxamnt = ''; var eamnt = ''; 
//Edit Row Against an Id
function EditRow(id) {
    if (editflag == 0) {
    editflag = editflag + 1;
    $('#row' + id).children('td,th').css('background-color', 'rgb(232,226,226)');
    eunit = $('#select_unit' + id).val();
    eqnty = $('#txtquantity' + id).val();
    erate = $('#txtrate' + id).val();
    edis = $('#txtdiscount' + id).val();
    etaxable = $('#txttaxableamnt' + id).val(); 
    etax = $('#select_tax' + id).val();
    etaxperc = $('#txttaxpercent' + id).val();
    etaxamnt = $('#txttaxamnt' + id).val();
    eamnt = $('#txtamnt' + id).val(); 
    $('#col13_' + id).hide();
    $('#col14_' + id).show();
    $('#editheader').hide();
    $('#editcancelheader').show();
    $('#select_unit' + id).prop('disabled', false);
    $('#txtquantity' + id).prop('disabled', false);
    $('#txtrate' + id).prop('disabled', false);
    $('#txtdiscount' + id).prop('disabled', false);
    $('#select_tax' + id).prop('disabled', false);
    $('#select_unit' + id).focus();
    CalcGrandTotal(i);
    }
    else {
        warningshow('Update Edit Mode Row First');
    }
}

//Cancel Edit
function editcancel(id) {
    editflag--;

    $('#row' + id).children('td,th').css('background-color', 'white');
    $('#col14_' + id).hide();
    $('#col13_' + id).show();
    $('#editcancelheader').hide();
    $('#editheader').show();
    $('#select_unit' + id).val(eunit);
    $('#txtquantity' + id).val(eqnty);
    $('#txtrate' + id).val(erate);
    $('#txtdiscount' + id).val(edis);
    $('#txttaxableamnt' + id).val(etaxable);
    $('#select_tax' + id).val(etax);
    $('#txttaxpercent' + id).val(etaxperc);
    $('#txttaxamnt' + id).val(etaxamnt);
    $('#txtamnt' + id).val(eamnt); 

    $('#txtproduct' + id).prop('disabled', true);
    $('#select_unit' + id).prop('disabled', true);
    $('#txtquantity' + id).prop('disabled', true);
    $('#txtrate' + id).prop('disabled', true);
    $('#txtdiscount' + id).prop('disabled', true);
    $('#select_tax' + id).prop('disabled', true);

    $('#txtproduct0').focus();
    CalcGrandTotal(i);
    $('#Warningpopup').fadeOut();
    eunit = ''; eqnty = ''; erate = ''; edis = ''; etaxable = ''; etax = ''; etaxperc = ''; etaxamnt = ''; eamnt = '';
}

//Update Product Row
function updaterow(id) {
    var a = parseFloat($('#txtdiscount' + id).val());
    var c = parseFloat($('#txtrate' + id).val());
    $("#txtdiscount" + id).val(isNaN(a) ? 0 : a);
    $('#txtrate' + id).val(isNaN(c) ? 0 : c);
 if (($('#txtquantity' + id).val() == '')) {
        warningshow('Please Enter Quantity', 'txtquantity' + id);
        $('#txtquantity' + id).select();
        return false;
    }
else if (($('#txtquantity' + id).val()==0)) 
    {
        warningshow('Quantity can not be Zero', 'txtquantity' + id); 
        $('#txtquantity' + id).select();
        return false;
    }   

else if (($('#txtrate' + id).val() == '')) {
        warningshow('Please Enter the Rate', 'txtrate' + id);
        return false;
    }
   
else if ((BelowCost == 'NO') && ($('#PrdtId' + id).val() != 0) && ($('#AvgCost' + id).val() != 0) && (parseFloat($('#txtrate' + id).val()) < parseFloat($('#AvgCost' + id).val()))) {
        warningshow('Rate must be greater than ' + $('#AvgCost' + id).val());       
        $('#txtrate' + id).select();
        return false;
    }
  else  if ($("#txtamnt" + id).val() < 0) {
      warningshow('Amount Cant be negative', 'txtrate' + id);
      $('#txtrate' + id).select();
    }
    else if (foc == 0 && ($("#txtamnt" + id).val() == 0)) {
        warningshow('Amount Cant be Zero', 'txtrate' + id);
        $('#txtrate' + id).select();
    }
    else if ($("#select_tax" + id).val() == 0) {
        warningshow('Please Select Tax', 'select_tax' + id);
        return false;
    }
    else {

        $('#row' + id).children('td,th').css('background-color', 'white');
        editflag--;
        var ratenum = parseFloat($("#txtrate" + id).val() || 0);
        $("#txtrate" + id).val(ratenum.toFixed(Decimal));
        var disnum = parseFloat($("#txtdiscount" + id).val() || 0);
        $("#txtdiscount" + id).val(disnum.toFixed(Decimal));

        $('#col14_' + id).hide();
        $('#col13_' + id).show();
        $('#editcancelheader').hide();
        $('#editheader').show();

        $('#txtproduct' + id).prop('disabled', true);
        $('#select_unit' + id).prop('disabled', true);
        $('#txtquantity' + id).prop('disabled', true);
        $('#txtrate' + id).prop('disabled', true);
        $('#txtdiscount' + id).prop('disabled', true);
        $('#select_tax' + id).prop('disabled', true);

        $('#txtproduct0').focus();
        CalcGrandTotal(i);
        $('#Warningpopup').fadeOut();
         eunit = ''; eqnty = '';  erate = '';  edis = ''; etaxable = '';  etax = '';  etaxperc = '';  etaxamnt = '';  eamnt = '';
    }
}

//Clear Product Grid
function Tbldelete() {
    $('#tblsalesinvoice tr').remove();
    i = 1;
    $('#txtproduct0').focus();
}

//Clear Fields Before Copy
function copyrefresh() {
    $('#txtcustomer').val('');
    $('#txtaddress').val('');
    $('#select_salesman').val(UserSalesmanId);
    $('#select_locn').val(0);
    $('#select_place').val(0);
    $('#select_crncy').val(BaseCurrency);
    $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
    $('#txtproduct0').val('');
    $('#btndelete').hide();
    $('#select_unit0').val(0);
    $('#txtquantity0').val('');
    $('#txtstocktotloseqty0').val(0);
    $('#txtrate0').val('');
    $('#txtdiscount0').val('');
    $('#select_tax0').val(0);
    $('#txtamnt0').val('');
    $('#txtphone').val('');
    $('#txtsubject').val('');
    $('#txtdocumentno').val('');
    $('#PriceGroupId').val(0);

    $('#TotalDiscount').val('0.00');
    $('#TotalTaxable').val('0.00');
    $('#TotalTax').val('0.00');
    $('#GrandTotal').val('0.00');
    $('#disc').val('0.00');
    $('#gndtotal').text('0.00');
    $('#fc').text('fc');
    $("#fc").css("opacity", '0');
}


//calling confirm box for Delete Grid Rows
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}

//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid); 
    }
    else if (Result == 'true' && status == 'refresh')
    {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') { 
        SalesCopy(flg); 
    }
    $('#confirm').fadeOut();

}

//Delete rows
function rowdeleteconfirm(RowId) 
{
    var slno = 1;
    var rowslno = parseInt(slno);
        $('#row' + RowId).remove();
        for (var j = 1; j <= i - 1; j++) {
            if ($('#txtproduct' + j).val() != undefined) {
                $('#td' + j).text(slno);
                slno++;
            }
        }
    $('#txtproduct0').focus();
    CalcGrandTotal(i);
} 

//Clear Customer Details on keyup
function checkcustomerempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode    
    if (charCode == 13) {

    }
    else {
        if ($('#txtCustId').val() != 0)
        {
            $('#txtCustId').val(0);
            $('#txtaddress').val('');
            $('#select_salesman').val(UserSalesmanId);
            $('#select_crncy').val(BaseCurrency);
            $('#PriceGroupId').val(0);
            $('#txtphone').val('');
            $('#txtcrncyrate').val($('#select_crncy').find("option:selected").attr("name"));
            for (j = 0; j <= i; j++) {
                amountcalculation(j);
            }
            CalcGrandTotal(i);
            $('#select_place').val(0);
        }      
    }
}


//If value of ProductId is empty
function checkpdcttextempty(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode != 13) {
        var a = ($('#txtproduct0').val()).length;
        if ($('#codelength').val() != a) {

            $('#TransPrdtId0').val(0);
            $('#PrdtId0').val(0);
            $('#select_unit0').val(0);
            $('#select_tax0').val(0);
            $('#txttaxpercent0').val('');
            $('#txtrate0').val('');
            $('#txtquantity0').val('');
            $('#txtstocktotloseqty0').val('');
            $('#txtamnt0').val('');
            $('#LPCost').val(0);
            $('#AvgCost0').val(0);
            $('#Sumtotqty').val(0);
            productpopuprefresh();
            qtyflag = 0;
        }

    }
}


//----------Common Functions-----------
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

function Showalerts(Status,enquiryno) {
    if (Status == 1) {
        formrefresh();
        swal('Enquiry No - ' + enquiryno, "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('Data Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}

function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

