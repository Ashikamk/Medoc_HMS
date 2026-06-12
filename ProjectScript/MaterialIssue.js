var i = 1;
var FlagEdit = 0;

function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            $('#MINo').val(result.oList[0].MIssue);
        }
    });
}
function GetDepartment() {
    var data = {};
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/UserDepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad(result.oList);


        }
    });
}

var DeptArray = [];

function DepartmentLoad(result) {
    for (var i = 0; i < result.length; i++) {
        DeptArray.push(result[i].DepartmentId);
    }
}
function CustPrdctLoad(result) {

    if ($("#ProductId_0").val() != 0) {

        for (var n = 0; n < result.length; n++) {

            var custstat;
            if (result[n].LastSellingPrice == 0) {
                custstat = "LSP";
            }
            else {
                custstat = "LSP";
            }
            $('#productpdiv,#Infospopup').slideDown();

            $('#prodheader').text('Location Stock Details');
            $('#productdiv').show();

            var strr = result[n].Locationstock;
            var strr1 = strr.replace(/&/gi, "&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");
            var strr2 = strr1.replace(/#/gi, "&emsp;");

            var ProdRow = "<tr class='jsgrid-row' id='pdctrow'>" +
               "<td style='border:none;font-weight:500;color:yellow' class='text-left'><b>" + $("#Description_0").val() + "</b></td>" +
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
}
//Popup Refresh for Default Popup

function ProductPopuprefresh() {
    $('#productpdiv').hide();
    $('#prodheader').text('');
    $('#productdiv').hide();
    $("#tblproductdetails tr").remove();
}


//Check Qty>Stock Qty
function checkqty(id) {
    if (($('#Quantity_' + id).attr('name') == 'prdaddqty') && (Negativebill == 'NO')) {
        var pflg = 0;
        var pdtsumqty = 0;
        var pdtsumqty1 = 0;
        for (var p = 1; p <= i; p++) {
            if (($('#ProductId_' + p).val() == $("#ProductId_" + id).val()) && ($('#Location_' + p).val() == $("#Location_" + id).val()) && ($('#Quantity_' + p).attr('name') == 'prdaddqty')) {
                pflg = 1;
            }
        }
        if (pflg == 0)               //If Product is not in the grid qty must be less than stockqty
        {
            if (($('#ProductId_' + id).val() != 0) && (parseInt($('#Quantity_' + id).val()) > parseInt($('#Stock_' + id).val()))) {
                warningshow('Not Enough Stock!Available stock is ' + $('#Stock_' + id).val());
                $('#Quantity_' + id).val('');
                $('#Quantity_' + id).focus();
                return false;
            }
        }
       
        else                         //else qty must be less than stockqty-(totprodqty of grid)
        {
            for (var g = 1; g <= i; g++) {
                if (g == id)                      //During Edit, add qty of rows except editing row
                    continue;
                else {
                    if (($('#ProductId_' + g).val() == $("#ProductId_" + id).val()) && ($('#Location_' + g).val() == $("#Location_" + id).val()) && ($('#Quantity_' + g).attr('name') == 'prdaddqty')) {
                        pdtsumqty = parseInt(pdtsumqty) + parseInt($("#Quantity_" + g).val());
                        pdtsumqty1 = parseInt(pdtsumqty);
                    }
                }
            }
            if ($("#Quantity_" + id).val() > (parseInt($('#Stock_' + id).val()) - pdtsumqty1)) {
                warningshow('Available Quantity is ' + (parseInt($('#Stock_' + id).val()) - pdtsumqty1), 'Quantity_' + id);
                $('#Quantity_' + id).val('');
                $('#Quantity_' + id).focus();
                return false;
            }
        }
    }


}


var LocArray = [];
function LocnLoad(id) {
    var data = {};
    data.LocationId = 0;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data,
        success: function (result) {
            LocationLoad(result.oList, id);
        }
    });

}
var LocnSelect = '';
function LocationLoad(result, a) {
    $("#Location_0").empty();
    LocnSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        if (LocArray.includes(result[i].LocationId))
            LocnSelect += "<option value='" + result[i].LocationId + "' name='" + result[i].LocationCode + "'>" + result[i].LocationCode + "</option>";
        else
            LocnSelect += "<option style='color:#26ACAE' disabled value='" + result[i].LocationId + "' name='" + result[i].LocationCode + "'>" + result[i].LocationCode + "</option>";
    }
    $("#Location_0").append(LocnSelect);
    $('#Location_0').val(UserLocationId);

}

function UnitLoad(result) {
    $("#Unit_0,#JobUnit").empty();
    UnitSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        UnitSelect += "<option value='" + result[i].UnitId + "' name='" + result[i].UnitName + "'> " + result[i].UnitName + "</option>";
    }
    $("#Unit_0,#JobUnit").append(UnitSelect);
}





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

function CountRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("tblMaterialIssue");
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


function productadd() {
    ProductPopuprefresh();
    var rowcount = CountRows();
    var ProductFlag = 0;
    for (p = 1; p <= i; p++) {
        if ($('#ProductId_' + p).val() == $("#ProductId_0").val()) {
            ProductFlag = 1;
        }
    }
    if (rowcount == 0) {
        i = 1;
    }

    if ($.trim($("#Product_0").val()) == '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if ($('#ProductId_0').val() == 0) {
        warningshow('Please Enter a Valid Product', 'ProductId_0');
        return false;
    }
    else if ($('#Unit_0').val() == 0) {
        warningshow('Please Select Unit', 'Unit_0');
    }

    else if ($("#Quantity_0").val() == '') {
        warningshow('Please Enter Quantity', 'Quantity_0');
    }

    else if ($("#Quantity_0").val() == 0) {
        warningshow('Quantity cannot be zero', 'Quantity_0');
    }
    else if ((parseFloat($("#Rate_0").val() || 0) > parseFloat($("#BOQAmt_0").val() || 0) || parseFloat($("#Quantity_0").val() || 0) > parseFloat($("#Boq_0").val() || 0)) && $('#BOQ').val() == 'YES' && $("#BOQConfirmFlag").val() != 'YES') {
        CheckBOQ(0);
        return false;
    }
    else {

        var slno = $('#tblMaterialIssue tr').length + 1;
        var id = parseInt(i);



        var ProdRow = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + $("#ProductId_0").val() + "'><input type='text' style='height:30px;background-color:white;text-align:center' class='form-control text-center' disabled id='Product_" + id + "' value='" + $("#Product_0").val() + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px;text-align:center'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;text-align:center' id='Description_" + id + "' value='" + $("#Description_0").val() + "' ></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Location_" + id + "' style='height:30px;background-color:white' class='form-control'  onchange=autoLocationqtycheck("+ id +")>" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' >" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' class='form-control text-center' name=prdaddqty id='Quantity_" + id + "' value=" + parseInt($('#Quantity_0').val()) + " style='height:30px;background-color:white' onkeyup='checkqty(" + id + "),totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' class='form-control text-center' id= 'Rate_" + id + "' value=" + parseFloat($('#Rate_0').val() || 0).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' class='form-control text-center' disabled id= 'Stock_" + id + "' value=" + parseInt($('#Stock_0').val() || 0) + " style='height:30px;background-color:white' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + $('#TotalAmount_0').val() + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='CostCodeId_" + id + "' value='" + $("#CostCodeId_0").val() + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' id='CostCode_" + id + "' value='" + $("#CostCode_0").val() + "'>" +
                        "<input type='hidden' id='boq_" + id + "' value='" + parseInt($("#Boq_0").val() || 0) + "' >" +
                        "<input type='hidden' id='BOQAmt_" + id + "' value='" + parseFloat($("#BOQAmt_0").val() || 0).toFixed(Decimal) + "' /></td>" +

                       "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
                       "</tr>";

        $('#tblMaterialIssue').append(ProdRow);
        $('#Location_' + id).val($('#Location_0').val());
        $('#Unit_' + id).val($('#Unit_0').val());
        LoadCostCode(id);
        i++;
        clearrow();
        fnGrandTotal(i);
        totalamount(i);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        fccalculation();
    }
}


function CheckBOQ(Row) {
    ProductPopuprefresh();

    var Allow = '';

    if ($("#URight").val() == 'YES') {
        ShowMIConfirm(0);
        var Allow = ' Continue?';
    }
    else {
        ShowMIConfirm(1);

    }

    $('#MIConfirmflag').val('ConfirmBOQ'); $('#MIConfirmRowId').val(Row);
    $('#MIconfirmmessage').text('Quantity OR Price Is Greater Than BOQ!..' + Allow);
}

function ShowMIConfirm(Flag) {
    $('#confirm').hide();
    $('#MIconfirm').show();
    if (Flag == 1) {
        $('#MIconfirmOk').hide();
        $('#MIconfirmCancel').show();
        $('#MIconfirmCancel').focus();
    }
    else if (Flag == 2) {
        $('#MIconfirmCancel').hide();
        $('#MIconfirmOk').show();
        $('#MIconfirmOk').focus();
    }
    else {
        $('#MIconfirmCancel').show();
        $('#MIconfirmOk').show();
        $('#MIconfirmOk').focus();
    }


}
function MIConfirmboxResult(Result, status, rowid) {
    $('#confirm').hide();
    if (Result == 'true' && status == 'ConfirmBOQ') {
        CheckBOQConfirm(rowid);
    }
    else if (Result == 'true' && status == 'PROAL') {
        $("#Product_0").focus();
    }
    $("#EstConfirmFlag").val("NO");
    $('#MIconfirm').fadeOut();

}
function CheckBOQConfirm(Row) {
    $("#BOQConfirmFlag").val("YES");
    productadd();
}
function MRProductAdd() {
    var row = 1;

    $('#JobCode').val($('#Job').val());
    $('#JobCodeId').val($('#JobId').val());
    if ($('#tblMR tr:last').attr('id') != undefined) {
        row = $('#tblMR tr:last').attr('id').match(/\d+/)[0];
    }
    for (m = 1; m <= row; m++) {
        if ($("#SlNoCheckSImainItem" + m).is(":checked")) {
           
                var ProductId = $('#ItemId' + m).val();
                var Productcode = $('#Productcode' + m).text();
                var ProductDescr = $('#Des' + m).text();
                var unitIdgrid = $('#UnitIdgrid' + m).val();
                var qty = parseInt($('#qty_' + m).val() || 0);
                var rate = parseFloat($('#rte_' + m).val() || 0).toFixed(Decimal);
                var total = parseFloat($('#total_' + m).val() || 0).toFixed(Decimal);
                
                var rowcount = CountRows();
                if (rowcount == 0) {
                    i = 1;
                }
                var slno = rowcount + 1;
                var id = parseInt(i);

                var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                             "<td id=" + 'td' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + slno + "</td>" +
                             "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input type='text' id=" + 'ProductId_' + id + " style='display:none' value='" + ProductId + "' /><input type='text' style='height:30px;background-color:white;text-align:center' disabled='' class='form-control' id=" + 'Product_' + id + " value='" + Productcode + "'></td>" +
                             "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center'><input disabled='' class='form-control' type='text' style='height:30px;background-color:white;text-align:center' id=" + 'Description_' + id + " value='" + ProductDescr + "'></td>" +
                              "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Location_" + id + "' style='height:30px;background-color:white' class='form-control' >" + LocnSelect + "</select></td>" +
                             "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id=" + 'Unit_' + id + " style='background-color:white;height:30px' class='form-control'>" + UnitSelect + "</select></td>" +
                             "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' name=prdaddqty  class='form-control text-center' id=" + 'Quantity_' + id + " value=" + qty + " style='background-color:white;height:30px'  onkeypress='isNumberInt(event,this)' onkeyup='checkqty(" + id + "),totalamount(" + id + ")'></td>" +
                             "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'> <input type='text'  class='form-control text-center' id=" + 'Rate_' + id + " value=" + rate + " style='background-color:white;height:30px'  onkeypress='isNumber(event,this)' onkeyup='totalamount(" + id + ")'></td>" +
                             "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Stock_" + id + "' value=" + parseInt($('#Stock_0').val() || 0) + " style='height:30px;background-color:white' onkeypress='isNumber(event,this)'></td>" +
                             "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' style='background-color:white;height:30px' disabled='' id=" + 'TotalAmount_' + id + " value=" + total + "></td>" +
                             "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='CostCodeId_" + id + "' value='" + $("#CostCodeId_0").val() + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' id='CostCode_" + id + "' value='" + $("#CostCode_0").val() + "'></td>" +

                              "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
                              "</tr>";

                $('#tblMaterialIssue').append(ProdRow1);
                }
               i++;
                $('#Unit_' + id).val(unitIdgrid);
                $('#Location_' + id).val($('#Location_0').val());

                
                fnGrandTotal(i);
                fccalculation();
              
                
                CloseMRApprove();
                CloseMR();
            }    
}

function CloseMR() {
    $('#MaterialRequestPopup').hide();
    $('#MRSub').hide();
    $('#FromDate').val(CurDate);
    $('#ToDate').val(CurDate);
}
function CloseMRApprove() {
   
    $('#MaterialApprovalPopup').hide();
    $('#MRApprove').hide();
}

//acccount number load
function AccountLoad(flag) {
    var accno = {};
    accno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MaterialIssueAccountGet",
        data: accno,
        success: function (result) {
            getacno(result.oList);
        }
    });
}

function getacno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#CreditAccountId').val(result[k].CreditAccId);
        $('#CreditAccountCode').val(result[k].CreditAccount);
        $('#CreditAccount').val(result[k].CreditAccountDesc);
        $('#DebitAccountId').val(result[k].DebitAccId);
        $('#DebitAccountCode').val(result[k].DebitAccount);
        $('#DebitAccount').val(result[k].DebitAccountDesc);
    }
}


function GetRows() {
    if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else {
        $('#MINo').prop("disabled", false);
        $('#MINo').focus();
        $('#MINo').select();

        $('#FCGT').text('FCGT');
        $("#FCGT").css("opacity", '0');
    }
}

function checkDebitAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#DebitAccountId').val(0);
        $('#DebitAccountCode').val('');
    }
}

function checkCreditAccounttextempty(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode != 13 && charCode != 9) {
        $('#CreditAccountId').val(0);
        $('#CreditAccountCode').val('');
    }
}
function hidepopup(flg) {
    if (flg == 0)                 //Show Popup
    {
        if ($('#toggle').prop("checked") == false)
            $('#toggle').click();
    }
    else if (flg == 1)           //Hide Popup 
    {
        ProductPopuprefresh();
    }
}

function Transfer() {
    TransferALL();
}

function TransferALL() {
    var data = {};
    data.FromDate = $('#FromDate').val();
    data.ToDate = $('#ToDate').val();
    data.MRNo = 0;
    data.Approved = 0;
    $.ajax({
        type: "POST",
        url: '../ProjectandJob/MRApprovalAutocomplete',
        data: data,
        success: function (result) {
            MRTrnasferAllGets(result.oList);
        }
    });

}

function MRTrnasferAllGets(result) {
    
    $('#MaterialRequestPopup').show();
    $('#MRSub').show();
    disable_datatable('tblMRApproval');
    var responseText = "<thead><tr><th>Sl#</th><th>MR No.</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Requested By</th><th>Approved By</th><th>Issue Status</th></tr>" +
                              "<tr><th>Sl#</th><th>MR No.</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Requested By</th><th>Approved By</th><th>Issue Status</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        if (result[l].IssueStatus == 'APPROVED') var rowclass = 'badge-success';
        else if (result[l].IssueStatus == 'PENDING') var rowclass = 'badge-danger';
        responseText += '<tr id=' + "row" + slno + ' ondblclick=TransferMR(' + result[l].MRNo + ',"' + result[l].IssueStatus + '")>' +
                    '<td style="width:90px;">' + slno + '</td>' +
                    '<td id=' + 'MRNoPopup' + slno + '>' + result[l].MRNo + '</td>' +
                    '<td id=' + 'Date' + slno + '>' + result[l].MRDate + ' </td>' +
                    '<td id=' + 'JobCode' + slno + '>' + result[l].JobCode + '</td>' +
                    '<td id=' + 'JobDescription' + slno + '>' + result[l].JobDescription + '</td>' +
                    '<td id=' + 'Requested' + slno + '>' + result[l].Requested + '</td>' +
                    '<td id=' + 'Approved' + slno + '>' + result[l].Approved + '</td>' +
                    '<td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '">' + result[l].IssueStatus + '</span></div></td></tr>';
                    }

    $('#tblMRApproval').html(responseText + '</tbody>');
    datatableWithsearch('tblMRApproval', 'Single');

}
function TransferMR(MRNo,IssueStatus) {
   
    var data = {};
    data.MRNo = MRNo;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../MaterialRequest/MaterialRequestGetandGets",
        data: data,
        success: function (result) {
            MRGets(result.oList, IssueStatus);
            $('#MRNoMain').val(MRNo);
        }
    });
}

function MRGets(result,IssueStatus) {
  
    if (IssueStatus == 'APPROVED') {
        $('#MaterialApprovalPopup').show();
        $('#MRApprove').show();
        disable_datatable('tblMR');
        $('#tblMR tr').remove();

        $('#Job').val(result[0].JobCode);
        $('#JobId').val(result[0].JobNo);

        var responseText = "<thead><tr><th style='width:90px;'>"+
        '<input type="checkbox" style="zoom:1.5;" checked id= "SlNoCheckSImainItem0" "custom-control-input cz-bg-image-display" onchange="selectallprdtsImain()">&nbsp;&nbsp;&nbsp;Select</th>'+
        '<th>MR No.</th>'+
        '<th style="display:none"></th>'+
        '<th>Product Code</th>'+
        '<th>Description</th>'+
        '<th>Unit</th>'+
        '<th>Quantity</th>'+
        '<th>Rate</th>'+
        '<th>Amount</th></tr>' +

        "<tr><th style='width:90px;'>Select</th>"+
        '<th>MR No.</th>'+
        '<th style="display:none"></th>'+
        '<th>Product Code</th>'+
        '<th>Description</th>'+
        '<th>Unit</th>'+
        '<th>Quantity</th>'+
        '<th>Rate</th>'+
        '<th>Amount</th></tr></thead><tbody>';
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(i);
            responseText += '<tr id=' + "row" + slno + '>'+
            '<td style="width:90px;"><input name="checkitemsimain" type="checkbox" style="zoom:1.5;" checked  id= ' + 'SlNoCheckSImainItem' + slno + ' ></td>' +
           '<td id=' + 'billnoRow' + slno + '>' + result[l].MRNo + '<input type="hidden" id=' + 'MRNo' + slno + '></td>' +
            '<td style=display:none;><input type="text" id=' + 'ItemId' + slno + ' value= ' + result[l].ItemId + '>' + result[l].ItemId + '</td>' +
            '<td id=' + 'Productcode' + slno + '>' + result[l].ItemCode + '</td>' +           
            '<td id=' + 'Des' + slno + '>' + result[l].ItemDescription + '</td>' +
            '<td id=' + 'UnitName' + slno + '>' + result[l].Unit + '<input type="text" style="display:none;" id=' + 'UnitIdgrid' + slno + ' value= ' + result[l].UnitId + '></td>' +
            '<td id=' + 'qty' + slno + '>' + parseInt(result[l].Quantity) + '<input type="hidden" id="qty_' + slno + '" value=' + result[l].Quantity + '></td>' +
            '<td id=' + 'rate' + slno + ' align=right>' + parseFloat(result[l].Price).toFixed(Decimal) + '<input type="hidden" id="rte_' + slno + '" value=' + result[l].Price + '></td>' +
            '<td id=' + 'total' + slno + ' align=right>' + parseFloat(result[l].Amount).toFixed(Decimal) + '<input type="hidden" id="total_' + slno + '" value=' + result[l].Amount + '></td></tr>';
            
            i++;
        }
        $('#tblMR').html(responseText + '</tbody>');
        datatableWithsearch('tblMR', 'Single');
    }
    else if (IssueStatus == 'PENDING') {
        
        $('#MaterialRequestPopup').hide();
        $('#PendingPopup').show();
        $('#Pending').show();
        if((usermenu1.indexOf("M290") != -1))
        {
            $('#btnApprove').show();
        }
        
    }

   

}

function selectallprdtsImain() {
    var rowCount = (($('#tblMR tr:last').attr('id').match(/\d+/)[0]) || 1);
    var flag = $("#SlNoCheckSImainItem0").is(":checked")
    for (var h = 1; h <= rowCount + 1; h++) {
        if (document.getElementById("SlNoCheckSImainItem" + h) != null) {
            document.getElementById("SlNoCheckSImainItem" + h).checked = flag;
        }
    }
}
$(document).ready(function () {
    if (usermenu1.indexOf("M292") != -1) { $("#URight").val("YES"); } else { $("#URight").val("NO"); }
    Defaultfocus();
    serialnoload();
    AccountLoad(1);
    GetDepartment();
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
                    LocnLoad(0);
            }
        }
    });

    $("#Unit_0").change(function () {
        $('#textUnit').val($(this).find("option:selected").attr("name"));
    });
 
    $("#Product_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $("#ProductId_0").val() != 0) {
            e.preventDefault();
            $('#Quantity_0').focus();
        }
        else if (key == 13 && $.trim($('#Product_0').val()).toUpperCase() == 'JOB') {
            Prodpopshow(1);
        }
        
        if (key == 08 || key == 46) {
            $('#ProductLength').val('')
            ProductPopuprefresh();
        }
       
    });

    $("#Quantity_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Rate_0').focus();
        }

    });
    $("#Rate_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Stock_0').focus();
        }

    });
    $("#Stock_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#CostCode_0').focus();
        }

    });
    $("#CostCode_0").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnadd').focus();
        }

    });


    $("#JobCode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Comments').focus();
        }

    });


    $('#Comments').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Product_0').focus();
            e.preventDefault();
        }
    });

    $('#Unit_0').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#Quantity_0').focus();
            e.preventDefault();
        }
    });
    $("#btnNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnYes").focus();
        }
    });
    $("#btnYes").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnNo").focus();
        }
    });

    $("#MIconfirmCancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#MIconfirmOk").focus();
        }
    });
    $("#MIconfirmOk").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#MIconfirmCancel").focus();
        }
    });
    $(document).keydown(function (e) {
        if (e.keyCode == 27) { //ESC       :   Popup Close
            ProductPopuprefresh();
            $('#PendingPopup').hide();
            CloseMRApprove();
            CloseMR();
            $('#MIViewForm').hide();
        }
    });
    $("#btnNo").focus(function (e) {
        $("#btnNo").removeClass("btn btn-outline-primary");
        $("#btnNo").addClass("btn btn-primary");
    });
    $("#btnNo").focusout(function () {
        $("#btnNo").removeClass("btn btn-primary");
        $("#btnNo").addClass("btn btn-outline-primary");
    });

    $("#btnYes").focus(function (e) {
        $("#btnYes").removeClass("btn btn-outline-primary");
        $("#btnYes").addClass("btn btn-primary");
    });
    $("#btnYes").focusout(function () {
        $("#btnYes").removeClass("btn btn-primary");
        $("#btnYes").addClass("btn btn-outline-primary");
    });


    $("#btnokalert").focus(function (e) {
        $("#btnokalert").removeClass("btn btn-outline-primary");
        $("#btnokalert").addClass("btn btn-primary");
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

    $("#MIconfirmCancel").focus(function (e) {
        $("#MIconfirmCancel").removeClass("btn btn-outline-primary");
        $("#MIconfirmCancel").addClass("btn btn-primary");
    });
    $("#MIconfirmCancel").focusout(function (e) {
        $("#MIconfirmCancel").removeClass("btn btn-primary");
        $("#MIconfirmCancel").addClass("btn btn-outline-primary");
    });
    $("#MIconfirmOk").focus(function (e) {
        $("#MIconfirmOk").removeClass("btn btn-outline-primary");
        $("#MIconfirmOk").addClass("btn btn-primary");
    });
    $("#MIconfirmOk").focusout(function (e) {
        $("#MIconfirmOk").removeClass("btn btn-primary");
        $("#MIconfirmOk").addClass("btn btn-outline-primary");
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
    $('#btnok').click(function () {
        alertpopuprefresh();
        PrintthisBill();
        formrefresh();
    });
    $('#btncnclalrt').click(function () {
        alertpopuprefresh();
        formrefresh();
    });



    var data2 = {};
    data2.UnitId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UnitGetandGets",
        data: data2,
        success: function (result) {
            UnitLoad(result.oList);
        }
    });


});//Document Close

function alertpopuprefresh() {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#alertdiv1').hide();
}

function SaveMI() {
    if ($('#JobCode').val() == "") {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please Select a valid Job Code', 'JobCodeId');
        return false;
    }
    else if ($('#Product_0').val() != '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else if (parseFloat($("#GrandTotal").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES") {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountSave'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else {
        $('#Confirmflag').val('save'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Save the MI?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
}


function ConfirmSaveMI() {

    var oArray = new Array();
    for (var k = 1; k <= i ; k++) {
        var MaterialIssueMainId = $('#MaterialIssueMainId').val();
        var MINo = $('#MINo').val();
        var MIDate = $('#IssueDate').val();
        var JobCodeId = $('#JobCodeId').val();
        var CreditAccount = $('#CreditAccountId').val();
        var DebitAccount = $('#DebitAccountId').val();
        var Remarks = $('#Remarks').val();
        var Comments = $('#Comments').val();
        var GrandTotal = $('#FCGT').text();
        var MRNo = parseInt($('#MRNoMain').val() || 0);

        var MaterialIssueSubId = $('#MaterialIssueSubId').val();
        var ProductId = $('#ProductId_' + k).val();
        var ProductCode = $('#Product_' + k).val();
        var Description = $('#Description_' + k).val();
        var Location = $('#Location_' + k).val();
        var UnitId = $('#Unit_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var Rate = $('#Rate_' + k).val();
        var Stock = $('#Stock_' + k).val();
        var TotalAmount = $('#TotalAmount_' + k).val();
        var CostCodeId = parseInt($('#CostCodeId_' + k).val() || 0);
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;


        if (!(typeof Description == "undefined")) {
            oArray.push({
                'MaterialIssueMainId': MaterialIssueMainId,
                'MINo': MINo,
                'MIDate': MIDate,
                'JobCodeId': JobCodeId,
                'CreditAccount': CreditAccount,
                'DebitAccount': DebitAccount,
                'Remarks': Remarks,
                'Comments': Comments,
                'GrandTotal': GrandTotal,
                'MRNo': MRNo,

                'MaterialIssueSubId': MaterialIssueSubId,
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'Description': Description,
                'Location': Location,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Rate': Rate,
                'Stock': Stock,
                'TotalAmount': TotalAmount,
                'CostCodeId': CostCodeId,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag
            })
        }
    }
    if (oArray != "") {
        var data = { 'BillofQuantityModel': oArray };
        $.ajax(
    {
        type: "POST",
        url: "../ProjectandJob/MaterialIssueInsert",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var MINo = result.oList[i].MINo;
                if (status != 0) {
                    Showalerts(status, MINo);
                }
                else {

                    $('#tblAlert tr').remove();
                    $('#alertpopup').show();
                    $('#alertdiv').show();
                    $('#alertdiv1').hide();
                    var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Not enough quantity on hand!</h2></td></tr>" +
                      "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Location</th></tr>";
                    $('#tblAlert').append(Prod1);
                    $("#btnokalert").focus();
                    for (var i = 0; i <= result.oList.length; i++) {
                        var Prod =
                        "<tr class='jsgrid-row' style='color:#607D8B'>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductCode + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Description + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Location + "</td></tr>";
                        $('#tblAlert').append(Prod);
                    }
                }
            }
        }
    });
    }
    else {
        warningshow('Please Select Product', 'Product_0');
    }

}



function UpdateMI() {
    if ($('#JobCode').val() == "") {
        warningshow('Please Select Job Code', 'JobCode');
    }
    else if ($('#JobCodeId').val() == 0) {
        warningshow('Please Select a valid Job Code', 'JobCodeId');
        return false;
    }
    else if ($('#Product_0').val() != '') {
        warningshow('Please Select Product', 'Product_0');
    }
    else if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else if (parseFloat($("#GrandTotal").val() || 0) > parseFloat($("#EstAmount").val() || 0) && $("#EstConfirmFlag").val() != "YES") {

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('EstAmountCopy'); $('#ConfirmRowId').val(0);
        $('#confirmmessage').text('Greater Than Estimated Amount!.. Do You Want To Continue?')

    }
    else {
        $('#Confirmflag').val('update'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Do you want to Update the MI?')
        $('#confirm').show();
        $('#confirmOk').prop("disabled", false);
        $('#confirmOk').focus();
    }
}

function ConfirmUpdateMI() {

    var oArray = new Array();
    for (var k = 1; k <= i ; k++) {
        var MaterialIssueMainId = $('#MaterialIssueMainId').val();
        var MINo = $('#MINo').val();
        var MIDate = $('#IssueDate').val();
        var JobCodeId = $('#JobCodeId').val();
        var CreditAccount = $('#CreditAccountId').val();
        var DebitAccount = $('#DebitAccountId').val();
        var Remarks = $('#Remarks').val();
        var Comments = $('#Comments').val();
        var GrandTotal = $('#FCGT').text();
        var MRNo = parseInt($('#MRNoMain').val()||0);

        var MaterialIssueSubId = $('#MaterialIssueSubId').val();
        var ProductId = $('#ProductId_' + k).val();
        var ProductCode = $('#Product_' + k).val();
        var Description = $('#Description_' + k).val();
        var Location = $('#Location_' + k).val();
        var UnitId = $('#Unit_' + k).val();
        var Quantity = $('#Quantity_' + k).val();
        var Rate = $('#Rate_' + k).val();
        var Stock = $('#Stock_' + k).val();
        var TotalAmount = $('#TotalAmount_' + k).val();
        var CostCodeId = parseInt($('#CostCodeId_' + k).val() || 0);
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = 1;


        if (!(typeof Description == "undefined")) {
            oArray.push({
                'MaterialIssueMainId': MaterialIssueMainId,
                'MINo': MINo,
                'MIDate': MIDate,
                'JobCodeId': JobCodeId,
                'CreditAccount': CreditAccount,
                'DebitAccount': DebitAccount,
                'Remarks': Remarks,
                'Comments': Comments,
                'GrandTotal': GrandTotal,
                'MRNo': MRNo,

                'MaterialIssueSubId': MaterialIssueSubId,
                'ProductId': ProductId,
                'ProductCode': ProductCode,
                'Description': Description,
                'Location': Location,
                'UnitId': UnitId,
                'Quantity': Quantity,
                'Rate': Rate,
                'Stock': Stock,
                'TotalAmount': TotalAmount,
                'CostCodeId': CostCodeId,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag
            })
        }
    }
    if (oArray != "") {
        var data = { 'BillofQuantityModel': oArray };
        $.ajax(
    {
        type: "POST",
        url: "../ProjectandJob/MaterialIssueUpdate",
        data: data,
        success: function (result) {
            for (var i = 0; i <= result.oList.length; i++) {
                var status = result.oList[i].Status;
                var MINo = result.oList[i].MINo;
                if (status != 0) {
                    Showalerts(status, MINo);
                }
                else {

                    $('#tblAlert tr').remove();
                    $('#alertpopup').show();
                    $('#alertdiv').show();
                    $('#alertdiv1').hide();
                    var Prod1 = "<tr class='jsgrid-row'><td colspan=4><h2 style='color:#FF586B'>Not enough quantity on hand!</h2></td></tr>" +
                      "<tr class='jsgrid-row' style='color:#607D8B'><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>ProductCode</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Description</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Quantity</th><th class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>Location</th></tr>";
                    $('#tblAlert').append(Prod1);
                    $("#btnokalert").focus();
                    for (var i = 0; i <= result.oList.length; i++) {
                        var Prod =
                        "<tr class='jsgrid-row' style='color:#607D8B'>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].ProductCode + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Description + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Quantity + "</td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center'>" + result.oList[i].Location + "</td></tr>";
                        $('#tblAlert').append(Prod);
                    }
                }
            }
        }
    });
    }
    else {
        warningshow('Please Select Product', 'Product_0');
    }
}


function Defaultfocus() {
    $('#JobCode').focus();

}



function PrintthisBill() {
    if ($('#tblMaterialIssue tr').length > 0) {
        PrintthisBillWindows('MaterialIssue', i);
    }
    else {
        warningshow('Please select a MI No. to print', 'MINo');
        $('#MINo').select();
    }

}


function formrefresh() {
    if (FlagEdit != 0) {
        warningshow('Please update Edit Mode');
    }
    else {
        $('#MINo').prop("disabled", true);
        $('#IssueDate').prop("disabled", false);
        $('#JobCode').prop("disabled", false);
        $('#btntransfer').prop("disabled", false);

        $('#CreditAccountCode').prop("disabled", false);
        $('#DebitAccountCode').prop("disabled", false);
        $('#Remarks').prop("disabled", false);
        $('#Comments').prop("disabled", false);
        $('#Product_0').prop("disabled", false);
        $('#btnpdct').prop("disabled", false);
        $('#Location_0').prop("disabled", false);
        $('#Unit_0').prop("disabled", false);
        $('#Quantity_0').prop("disabled", false);
        $('#Rate_0').prop("disabled", false);
        $('#Stock_0').prop("disabled", true);
        $('#TotalAmount_0').prop("disabled", true);
        $('#CostCode_0').prop("disabled", false);
        $('#CreditAccount').css('background-color', 'white');
        $('#DebitAccount').css('background-color', 'white');

        $('#btnadd').prop("disabled", false);
        $('#GrandTotal').prop("disabled", false);
        $('#btnsubmit').prop("disabled", false);
        $('#btncopy').prop("disabled", false);
        $('#btnlist').prop("disabled", false);

        $('#Job').val('');
        $('#JobId').val('');
        $('#MINo').val('');
        $('#IssueDate').val(CurDate);
        $('#JobCode').val('');
        $('#JobCodeId').val(0);
        $('#Comments').val('');
        $('#Remarks').val('');
        $('#MRNoMain').val('');
        $('#Product_0').val('');
        $('#ProductId_0').val('');
        $('#Unit_0').val('0');
        $('#Quantity_0').val('');
        $('#Rate_0').val('');
        $('#Stock_0').val('');
        $('#TotalAmount_0').val('');
        $('#CostCode_0').val('');
        $('#CostCodeId_0').val(0);
        for (var k = 1; k < i; k++) {
            $('#row' + k).remove();
        }
        i = 1;
        clearrow();
        serialnoload();
        AccountLoad(1);
        GetDepartment();
        $('#GrandTotal').val('');
        GrandTotal = 0;
        $('#FCGT').text('FCGT');
        $("#FCGT").css("opacity", '0');
        $('#JobCode').focus();
       

        $('#btnsubmit').show();
        $('#btnlist').show();
        $('#btndelete').hide();
        $('#btnprint').hide();
        $('#btndelete').hide();
        $('#btnedit').hide();
        $('#btnsaveedit').hide();
        $("#EstConfirmFlag").val("NO");
    }
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}

//Show or hide stock popup during stock add,edit,update
function Prodpopshow(flg) {
    if (flg == 1)                       //Job Popup view
    {
        $('#Jobpopup').show();
        $('#JobCodePop').focus().select();
    }
    else if (flg == 2)                       //Job Popup view
    {
        $('#Jobpopup').hide();
        $('#Product_0').focus().select();
    }
    else if (flg == 3)                       //Job Popup view
    {
        JobAdd();
    }
    else if (flg == 5)                       //Job Popup view
    {
        $('.ITMP').val('');
        $('#JobUnit').val(0);
        $('#JobCodePop').focus().select();
    }
}
//Check Product add conditions
function JobAdd() {   //flag:0 - Add 

    if ($.trim($('#JobCodePop').val()) == '') {
        warningshow('Please Enter Job', 'JobCodePop');
        return false;
    }
    else if ($("#JobUnit").val() == 0) {
        warningshow('Please Select Unit', 'JobUnit');
    }
    else if ($("#JobQty").val() == '') {
        warningshow('Please Enter Quantity', 'JobQty');
    }
    else if ($("#JobQty").val() == 0) {
        warningshow('Quantity cannot be zero', 'JobQty');
    }
    else {
        $('#Jobpopup').hide();


        var slno = $('#tblMaterialIssue tr').length + 1;
        var id = parseInt(i);
        var ProdRow1 = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                        "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + slno + "</td>" +
                        "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + $("#ProductId_0").val() + "'><input type='text' style='height:30px;background-color:white;text-align:center' class='form-control text-center' disabled id='Product_" + id + "' value='" + $('#JobCodePop').val() + "'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px;text-align:center'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px;text-align:center' id='Description_" + id + "' value='" + $('#JobDesc').val() + "' ></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Location_" + id + "' style='height:30px;background-color:white' class='form-control' >" + LocnSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' >" + UnitSelect + "</select></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' name=prdaddqty id='Quantity_" + id + "' value=" + parseInt($('#JobQty').val()) + " style='height:30px;background-color:white' onkeyup='checkqty(" + id + "),totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' id= 'Rate_" + id + "' value=" + parseFloat(isNaN($('#JobRate').val()) ? 0 : ($('#JobRate').val() || 0)).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id= 'Stock_" + id + "' value=" + parseInt($('#Stock_0').val() || 0) + " style='height:30px;background-color:white' onkeypress='isNumber(event,this)'></td>" +
                        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + parseFloat($('#JobAmount').val() || 0).toFixed(Decimal) + "></td>" +
                        "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='CostCodeId_" + id + "' value='" + $("#CostCodeId_0").val() + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' id='CostCode_" + id + "' value='" + $("#CostCode_0").val() + "'></td>" +

                       "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
                       "</tr>";


        $('#tblMaterialIssue').append(ProdRow1);
        $('#Unit_' + id).val($('#JobUnit').val());
        $('#CostCode_' + id).val($('#CostCode_0').val());
        if ($('#Location_0').val() > 0)
        { $('#Location_' + id).val($('#Location_0').val()); }
        else
        {
            $('#Location_' + id).val(UserLocationId);
        }
        LoadCostCode(id);

        i++;
        clearrow();
        fnGrandTotal(i);
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        fccalculation();
        $('#Product_0').focus().select();
        $('.ITMP').val('');
        $('#JobUnit').val(0);
        $('#Jobpopup').hide();


    }
}
//Manual Focus Button
function Focusbtn(Dst, e, Id) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 39 && (Id == 'btnaddjob')) {
        e.preventDefault();
        $("#btnclrjob").focus();
    }
    else if (key == 37 && (Id == 'btnclrjob')) {
        e.preventDefault();
        $("#btnaddjob").focus();
    }
}


function MaterialIssueGets(result) {
    for (var n = 0; n < result.length; n++) {
        $('#MINo').val(result[n].MINo);
        $('#IssueDate').val(result[n].MIDate);
        $('#JobCodeId').val(result[n].JobCodeId);
        $('#JobCode').val(result[n].JobCode);
        $('#Description').val(result[n].JobDescription);
        $('#Remarks').val(result[n].Remarks);
        $('#Comments').val(result[n].Comments);

        var id = parseInt(i);
        var ProdRow = "<tr id=" + 'row' + id + " class='jsgrid-row'>" +
                       "<td id=" + 'col' + id + " class='jsgrid-cell' style='width:30px;text-align:center'>" + (n + 1) + "</td>" +
                       "<td class='jsgrid-cell jsgrid-align-right' style='width:75px;text-align:center' ><input type='text' style='display:none'  id='ProductId_" + id + "' value='" + result[n].ProductId + "'><input type='text' style='height:30px;background-color:white;text-align:center' class='form-control text-center' disabled id='Product_" + id + "' value='" + result[n].Product + "'></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:75px;text-align:center'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='Description_" + id + "' value='" + result[n].Description + "' ></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Location_" + id + "' style='height:30px;background-color:white' class='form-control' disabled onchange=autoLocationqtycheck(" + id + ")>" + LocnSelect + "</select></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><select id='Unit_" + id + "' style='height:30px;background-color:white' class='form-control' disabled value='" + result[n].UnitId + "'>" + UnitSelect + "</select></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' name=prdaddqty disabled id='Quantity_" + id + "' value=" + result[n].Quantity + " style='height:30px;background-color:white' onkeyup='checkqty(" + id + "),totalamount(" + id + ")' onkeypress='isNumberInt(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Rate_" + id + "' value=" + parseFloat(result[n].Rate).toFixed(Decimal) + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled id='Stock_" + id + "' value=" + result[n].Stock + " style='height:30px;background-color:white' onkeyup='totalamount(" + id + ")' onkeypress='isNumber(event,this)'></td>" +
                       "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:40px'><input typ='text' class='form-control text-center' disabled style='background-color:white;height:30px' id='TotalAmount_" + id + "' value=" + parseFloat(result[n].TotalAmount).toFixed(Decimal) + "></td>" +
                       "<td class='jsgrid-cell jsgrid-align-center' style='width:40px'><input type='text' style='display:none'  id='CostCodeId_" + id + "' value='" + result[n].CostCodeId + "'><input type='text' style='height:30px;background-color:white' class='form-control text-center' disabled id='CostCode_" + id + "' value='" + result[n].CostCode + "'></td>" +

                      "<td id= 'Edit_" + id + "' class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='background-color:white;width:30px'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' style='height:30px' id='btnrowdel' type='button' disabled onclick='DeleteRow(" + id + ")' title='Delete'></td>" +
                      "</tr>";

        $('#tblMaterialIssue').append(ProdRow);
        $('#Location_' + id).val(result[n].Location);
        $('#Unit_' + id).val(result[n].UnitId);
        i++;

        $('#IssueDate').prop("disabled", true);
        $('#JobCode').prop("disabled", true);
        $('#CreditAccountCode').prop("disabled", true);
        $('#DebitAccountCode').prop("disabled", true);
        $('#CreditAccount').css('background-color', '#ECEFF1');
        $('#DebitAccount').css('background-color', '#ECEFF1');
        $('#btntransfer').prop("disabled", true);
        $('#Remarks').prop("disabled", true);
        $('#Comments').prop("disabled", true);
        $('#Product_0').prop("disabled", true);
        $('#btnpdct').prop("disabled", true);
        $('#Unit_0').prop("disabled", true);
        $('#Quantity_0').prop("disabled", true);
        $('#Rate_0').prop("disabled", true);
        $('#Stock_0').prop("disabled", true);
        $('#TotalAmount_0').prop("disabled", true);
        $('#CostCode_0').prop("disabled", true);

        $('#btnadd').prop("disabled", true);
        $('#GrandTotal').prop("disabled", true);
        $('#FCGT').prop("disabled", true);
    }
}


function totalamount(RowId) {
    var total = 0;
    var MGT = 0;
    var GT = 0;
    var Qty = parseFloat($("#Quantity_" + RowId).val());
    var rate = parseFloat($('#Rate_' + RowId).val() || 0);
    rate = isNaN(rate) ? 0 : rate;
    total = (Qty * rate);

    $("#TotalAmount_" + RowId).val((total || 0).toFixed(Decimal));


    var Quantity = 0; var Rate = 0; var Discnt = 0; var Amount = 0;

    Quantity = $('#JobQty').val() || 0; Quantity = isNaN(Quantity) ? 0 : parseInt(Quantity);
    Price = $('#JobRate').val() || 0; Price = isNaN(Price) ? 0 : parseFloat(Price);

    Amount = (parseInt(Quantity) * parseFloat(Price));

    $('#JobAmount').val(parseFloat(Amount).toFixed(Decimal));

    if (RowId != 0) {
        fnGrandTotal(i);
        fccalculation();
    }
    
}
var GrandTotal;

function fnGrandTotal(RowId) {
    GrandTotal = 0;
    $('#GrandTotal').val('');

    for (var i = 1; i <= RowId; i++) {
        GrandTotal = GrandTotal + parseFloat($('#TotalAmount_' + i).val() || 0);
    }
    $('#GrandTotal').val(GrandTotal.toFixed(Decimal));

}

function fccalculation() {
    var fcamount = GrandTotal;
    if (fcamount >= 0) {
        $("#FCGT").css("opacity", '100');
        $("#FCGT").text(fcamount.toFixed(Decimal));
    }
}



//function EditRow(RowId) {
//    FlagEdit = FlagEdit + 1;
//    $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
//    Unit = $('#Unit_' + RowId).val();
//    Quantity = $('#Quantity_' + RowId).val();
//    Rate = $('#Rate_' + RowId).val();
//    CostCode = $('#CostCode_' + RowId).val();
//    $('#Edit_' + RowId).hide();
//    $('#Update_' + RowId).show();
//    $('#Location_' + RowId).prop('disabled', false);
//    $('#Unit_' + RowId).prop('disabled', false);
//    $('#Quantity_' + RowId).prop('disabled', false);
//    $('#Rate_' + RowId).prop('disabled', false);
//    $('#CostCode_' + RowId).prop('disabled', false);
//    $('#Unit_' + RowId).focus();
//    fnGrandTotal(i);
//    fccalculation();
//    LoadCostCode(RowId);
//}


//function UpdateRow(RowId) {
//    var c = parseFloat($('#Rate_' + RowId).val());
//    $('#Rate_' + RowId).val(isNaN(c) ? 0 : c);

//    if ($("#Quantity_" + RowId).val() == 0) {
//        warningshow('Quantity cannot be zero', 'Quantity_' + RowId);
//    }
//    else if ($("#Unit_" + RowId).val() == 0) {
//        warningshow('Please Select Unit', 'Unit_' + RowId);
//    }
//    else {
//        $('#row' + RowId).children('td,th').css('background-color', 'white');
//        FlagEdit = FlagEdit - 1;
//        $('#Update_' + RowId).hide();
//        $('#Edit_' + RowId).show();
//        $('#Location_' + RowId).prop('disabled', true);
//        $('#Unit_' + RowId).prop('disabled', true);
//        $('#Quantity_' + RowId).prop('disabled', true);
//        $('#Rate_' + RowId).prop('disabled', true);
//        $('#CostCode_' + RowId).prop('disabled', true);
//        $('#Product_0').focus();
//        fnGrandTotal(i);
//        fccalculation();
//    }
//}

//function CancelEdit(RowId) {
//    $('#row' + RowId).children('td,th').css('background-color', 'white');
//    FlagEdit = FlagEdit - 1;
//    $('#Unit_' + RowId).val(Unit);
//    $('#Quantity_' + RowId).val(Quantity);
//    $('#Rate_' + RowId).val(Rate);
//    $('#CostCode_' + RowId).val(CostCode);
//    $('#Location_' + RowId).prop('disabled', true);
//    $('#Unit_' + RowId).prop('disabled', true);
//    $('#Quantity_' + RowId).prop('disabled', true);
//    $('#Rate_' + RowId).prop('disabled', true);
//    $('#CostCode_' + RowId).prop('disabled', true);
//    $('#Update_' + RowId).hide();
//    $('#Edit_' + RowId).show();
//    totalamount(RowId);
//    fnGrandTotal(i);
//    fccalculation();
//}

function DeleteRow(RowId) {
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
    $('#Confirmflag').val('deleterow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')

}

function DeleteMIRow(RowId) {
    var slno = 1;
    var rowslno = parseInt(slno);
    $('#row' + RowId).remove();

    for (var j = 1; j <= i - 1; j++) {

        if ($('#Product_' + j).val() != undefined) {
            $('#col' + j).text(slno);
            slno++;
        }
    }
    $('#Product_0').focus();
    fnGrandTotal(i);
    fccalculation();
}

function formrefreshconfirm() {
    $('#confirmmessage').html('');
    var rowcount = CountRows();
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


function DeleteMI() {
    $('#Confirmflag').val('delete'), $('#ConfirmRowId').val(0)
    $('#confirmmessage').text('Do you want to Delete?')
    $('#confirm').show();
    $('#confirmOk').focus();
}

function EditMI(Flag) {
    $("#btncnclsave").attr("onclick", "CheckEditMI(" + Flag + ")");
    $('#otp,#otpremarks').prop("disabled", false);
    $('#OTPDiv').show();
    $("#otp,#otpremarks").val('');
    $("#otp").focus();
}

function CheckEditMI(Flag) {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = '';
        if (Flag == 0)
            Operation = 'MI Edit- OTP';
        else if (Flag == 1)
            Operation = 'MI Delete- OTP';

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
            ConfirmEditMI();
        }
        else if (Flag == 1) {
            ConfirmDeleteMI();
        }
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}

function ConfirmEditMI() {
    $('#OTPDiv').hide();
    $('#btnedit').hide();
    $('#btndelete').hide();
    $('#btnsaveedit').show();
    $('.editds,#btnadd').prop("disabled", false);
    $('.jsgrid-button').prop('disabled', false);

    $('#CreditAccountCode,#DebitAccountCode').prop("disabled", false);
    $('#Comments,#btntransfer').prop("disabled", false);
    $('#CreditAccount').css('background-color', 'white');
    $('#DebitAccount').css('background-color', 'white');

    for (var id = 1; id <= i; id++) {
        $('#Location_' + id).prop('disabled', false);
        $('#Unit_' + id).prop('disabled', false);
        $('#Quantity_' + id).prop('disabled', false);
        $('#Rate_' + id).prop('disabled', false);
        $('#CostCode_' + id).prop('disabled', false);
    }
}

function ConfirmDeleteMI() {
    $('#OTPDiv').hide();
    var data = {};
    data.MINo = $('#MINo').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MaterialIssueDelete",
        data: data,
        success: function (result) {

            var status = result.oList[0].Status;
            var MINo = result.oList[0].MINo;
            Showalerts(status, MINo);
        }
    });

}


function GetList() {
    var data = {};
    data.FromDate = $('#ViewFromDate').val();
    data.ToDate = $('#ViewToDate').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MIList",
        data: data,
        success: function (result) {
            GetListView(result.oList);
        }
    });
}

function GetListView(result) {
    $('#ViewFromDate,#ViewToDate').prop("disabled", false);

    disable_datatable('tbl_ViewList');

    $('#MIViewForm').show();
    var responseText = "<thead><tr><th>Sl#</th><th>MI#</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Credit Account</th><th>Debit Account</th><th>Remarks</th><th>Comments</th></tr>" +
                              "<tr><th> </th><th>MI#</th><th>Date</th><th>Job Code</th><th>Job Description</th><th>Credit Account</th><th>Debit Account</th><th>Remarks</th><th>Comments</th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        responseText += '<tr ondblclick="GetCopyofThis(' + result[l].MINo + ')">' +
        '<td style="" align="center">' + slno + '</td>' +
        '<td>' + result[l].MINo + '</td>' +
        '<td>' + result[l].MIDate + '</td>' +
        '<td>' + result[l].JobCode + '</td>' +
        '<td>' + result[l].JobDescription + '</td>' +
        '<td>' + result[l].CreditAccount + '</td>' +
        '<td>' + result[l].DebitAccount + '</td>' +
        '<td>' + result[l].Remarks + '</td>' +
        '<td>' + result[l].Comments + '</td>' +
        '</tr>';
    }
    $('#tbl_ViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_ViewList', 'Multiple');

}

function GetCopyofThis(MINo) {
    var data = {};
    data.MINo = MINo;
   
    $.ajax({
        type: "POST",
        url: "../ProjectandJob/MaterialIssueGetandGets",
        data: data,
        success: function (result) {
            $('#MIViewForm').hide();
            $('#tblMaterialIssue tr').remove();
            //MaterialIssueGets(result.oList);
            //$('#MINo').prop("disabled", false);
            //$('#btnsubmit').hide();
            //$('#btnlist').hide();
            //$('#btnprint').show();
            //$('#btndelete').show();
            //$('#btnedit').show();

            //fnGrandTotal(i);
            //fccalculation();
            if (result.oList.length > 0) {
                if (DeptArray.includes(result.oList[0].DeptId)) {
                    if (result.oList[0].DeptId == ERPDeptId) {
                        $('#btnedit').show();
                        $("#btndelete").show();
                    }
                    else {
                        $('#btnedit').hide();
                        $("#btndelete").hide();
                    }
                    MaterialIssueGets(result.oList);;
                    $('#MINo').prop("disabled", false);
                    $('#btnsubmit').hide();
                    $('#btnlist').hide();
                    $('#btnprint').show();
                    //$('#btndelete').show();
                    //$('#btnedit').show();

                    fnGrandTotal(i);
                    fccalculation();
                }

                else {
                    $('#btnedit').hide();
                    $("#btndelete").hide();
                    $('#btndept').prop('disabled', false);
                    $('#deptmsg').text('')
                    $('#deptmsg').append('Bill NO : ' + result.oList[0].MINo + ' is From </br> Department - ' + result.oList[0].Department);
                    $('#deptdiv').show();
                    $('#btndept').focus();
                }
            }
        }
    });
}

// Confirm box
function ConfirmboxResult(Result, status, rowid) {
    $('#confirmOk').prop('disabled', true);
    if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'deleterow') {
        DeleteMIRow(rowid)
    }

    else if (Result == 'true' && status == 'delete') {
        EditMI(1);
    }

    else if (Result == 'true' && status == 'save') {
        $('#confirmOk').prop("disabled", true);
        ConfirmSaveMI();
    }
    else if (Result == 'true' && status == 'update') {
        $('#confirmOk').prop("disabled", true);
        ConfirmUpdateMI();
    }
    else if (Result == 'true' && status == 'EstAmountSave') {
        $("#EstConfirmFlag").val("YES");
        SaveMI();
        return;
    }
    else if (Result == 'true' && status == 'EstAmountCopy') {
        $("#EstConfirmFlag").val("YES");
        UpdateMI();
        return;
    }

    $("#EstConfirmFlag").val("NO");
    $('#confirm').fadeOut();

    window.setTimeout(function () {
        $('#confirmOk').prop('disabled', false);
    }, 2000);
}

function clearrow() {
    $('#Product_0').val('');
    $('#Description_0').val('');
    $('#textUnit').val('');
    $('#Unit_0').val(0);
    $('#Quantity_0').val('');
    $('#Rate_0').val('');
    $('#Stock_0').val('');
    $('#CostCode_0').val('');
    $('#CostCodeId_0').val(0);
    $('#TotalAmount_0').val('');
    $('#ProductId_0').val(0);
    $('#Product_0').focus();
    $('#Location_0').val(UserLocationId);
    $("#BOQConfirmFlag").val("NO");
    $('#Boqno_0').val(0);
    $('#Boqsubid_0').val(0);
    $('#BOQAmt_0').val(0);
    $('#Boq_0').val(0);
    $("#MIconfirmOk").show();
}

function checkpdcttextempty() {
    var a = ($('#Product_0').val()).length;
    if ($('#ProductLength').val() != a) {
        $('#ProductId_0').val(0);
    }
}
function checkjobcodeempty() {
    var b = ($('#JobCode').val()).length;
    if ($('#JobCodeLength').val() != b) {
        $('#JobCodeId').val(0);
    }
}


function fousnextbutton(e, id) {
    var x = e.which || e.keyCode;
    if (x == 13) {
        $(id).focus();
    }
}


$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();
    if (e.altKey && e.keyCode == 83) {
        SaveAndUpdate(1)
    }
    else if (e.altKey && e.keyCode == 76) {
        GetRows(0)
    }
    else if (e.altKey && e.keyCode == 67) {
        formrefresh();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable();
    }

})

//Remove Datatable If alredy data table Created
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
        $('#Warningpopup').fadeOut();
    }, 3000);
}


function Showalerts(Status, MINo) {
    $('#savealert').html('');
    $('#alertpopup').hide();
    $('#alertdiv1').hide();
    $('#alertdiv').hide();
    if (Status == 1) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>MI Number : ' + MINo + '</b><br> Saved Successfully!<br>Do you want to print this MI?');
        $('#btnok').focus();
    }
    else if (Status == 2) {
        $('#alertpopup').show();
        $('#alertdiv1').show();
        $('#alertdiv').hide();
        $('#savealert').append('<b>MI Number : ' + MINo + '</b><br> Updated Successfully!<br>Do you want to print this MI?');
        $('#btnok').focus();
    }

    else if (Status == 3) {
        swal('MI Number : ' + MINo + ' ', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
    }
    else if (Status == 4) {
        swal('MI Number : ' + MINo, "Cancelled", "success");
        $('.swal-button swal-button--confirm').focus();
        formrefresh();
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

    if (Type == 'Multiple') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                { "width": "5%", "targets": 0 },
                                { "width": "5%", "targets": 1 },
                                { "width": "10%", "targets": 2 },
                                { "width": "15%", "targets": 3 },
                                { "width": "30%", "targets": 4 },
                                { "width": "15%", "targets": 5 },
                                { "width": "15%", "targets": 6 },
                                { "width": "20%", "targets": 7 },
                                { "width": "20%", "targets": 8 },
            ],
        });

    }
    else if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
            "columnDefs": [
                                { "width": "5%", "targets": 0 },
                                { "width": "8%", "targets": 1 },
                                { "width": "10%", "targets": 2 },
                                { "width": "15%", "targets": 3 },
                                { "width": "30%", "targets": 4 },
                                { "width": "15%", "targets": 5 },
                                { "width": "15%", "targets": 6 },
                                { "width": "20%", "targets": 7 },
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


//Function Call to Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking
function autoLocationqtycheck(id) {
    $('#Quantity_' + id).val('');
   // document.getElementById("autoSlNoHeadCheckgrid" + id).checked = false;

    var data = {};
    data.ProductId = $('#ProductId_' + id).val();
    data.LocnId = $('#Location_' + id).val();
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/GetQuantitybyLocation",
        data: data,
        success: function (result) {
            autoqtyload(result.oList, id)
        }
    });
}

//Load Stock Qty When Location Change in Multiple Product Selection List for Qty Checking 
function autoqtyload(result, id) {
    if (result.length == 'undefined') {
        $('#Stock_' + id).val(0);
        $('#Quantity_0').val(1);
        $('#Quantity_0').select();
    }
    else {
        for (var j = 0; j < result.length; j++)
            $('#Stock_' + id).val(result[j].stocktotloseqty);
        $('#Quantity_0').val(1);
        $('#Quantity_0').select();
    }
}
