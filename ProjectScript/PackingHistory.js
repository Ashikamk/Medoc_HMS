var rowcount; var i = 0; var editflag = 0; var issueqty = 0; var FullScan = 0; var CopyFlag = 0;
$(document).ready(function () {

    if (getQueryString('DelNo') != null) {
        
        var data = {};
        data.DeliveryOrderNo = getQueryString('DelNo');
        data.BillSeriesId = getQueryString('billseriesId');
        data.BillSlNo = getQueryString('invno');
        data.DeptId = getQueryString('salesdept');
        data.PHDeptId = getQueryString('dept');;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/PackingHistoryCopyGets",
            data: data,
            success: function (result) {
                Copy();
                DelPackingGets(result.oList);
                getdiffrence();
                if (Flag == 1) {
                    printthisoutbill();
                }
            }
        })

    }
    else {

    }


    serialnoload();
    $('#txtBillSlNocopy').focus();
    $('#txtBillSlNocopy').css("background-color", '#58dbe4');
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

    var data = {};
    data.DriverId = 0;
    $.ajax({
        type: "POST",
        url: "../inventory/DriverGetandGets",
        data: data,
        success: function (result) {
            DriverLoad(result.oList);
        }
    });

    var flg = 0;
    $('#btnsubmit').click(function (e) {
        var rowCount = document.getElementById('PackingList').rows.length;
       
        for (var k = 1; k <= rowCount; k++) {

            if ($('#scanqty' + k).text() == 0 && flg != 1) {

                flg = 0;
            }
            else if (($('#scanqty' + k).text() != 0)) {

                flg = 1;

            }
        }
       
        if (rowCount == 0) {
            warningshow('Please Scan The BillCode', 'txtBillSlNocopy');
            return false;
        }
        //else if ($('#txtdriver').val() == '0') {
        //    warningshow('Please Select Driver', 'txtdriver');
        //    return false;
        //}
        else if (flg == 0) {
            ScanItem();
        }
        else
        {
            $('#txtpassword').val('');
            $('#PasswordDiv').show();
            $('#txtpassword').focus();
        }      
    });
    formrefresh(0);
    $("#txtpassword").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnotpsave').focus();
        }

    });
    $('#btnok').click(function () {
        printthisoutbill();
        alertpopupprefresh();
        formrefresh(0);
      
    });
    $('#btncnclalrt').click(function () {
        alertpopupprefresh();
        formrefresh(0);
    });
});

//bill no load
function Billseriesload(result) {
    $("#txtBillseriesId").empty();
    for (var i = 0; i < result.length; i++) {
        $("#txtBillseriesId").append("<option value='" + result[i].id + "' name='" + result[i].CurrentNo + "'>" + result[i].BillDescription + "</option>");
    }
    $('#txtBillSlNo').val(result[0].CurrentNo)
    $('#txtBlSlNo').val(result[0].CurrentNo);
}

//table fill
var View = '<i class="ft-x-square   font-medium-3 my-3" title="Clear"></i>';
function PackingGets(result) {
   
    var responseText = "<tbody>";
    var a = 0;
    if (result.length != 0) {
        $('#txtcustomer').val(result[0].CustName);
        $('#txtsalesman').val(result[0].SalesMan);
        $('#txtuser').val(result[0].UserName);
        $('#EnteredBy').val(result[0].EnteredBy);
        if (result[0].DriverName != "")
        { $('#txtdriver').val(result[0].DriverName) }
        else
        {
            $('#txtdriver').val('0');
        }
        for (var l = 0; l < result.length; l++) {
            $('#DepatmentCode').val(result[l].DepartmentCode);
            var slno = parseInt(l + 1);
            if (result[l].LocId == UserLocationId) {
                responseText += '<tr class="mylocationrow" style="background-color:white;width:26px;font-weight:bold;"  id=' + 'row' + slno + ' ondblclick=showdetail(' + slno + ')><td style="width:4%;text-align:center;color:red" id= ' + 'clear' + slno + ' onclick="Clear(' + slno + ')">' + View +
                  '</td><td style="width:4.6%;height:20px;text-align:center;" id= ' + 'sl' + slno + '>' + slno +
                      '</td><td style="width:12%;height:20px;" class="mylocation" id= ' + 'itemcode' + slno + '>' +
                      result[l].ProductCode + '</td><td style="width:26%;height:20px;" id= ' + 'Des' + slno + '>' +
                      result[l].ProductDescr + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                      result[l].ProductId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                       result[l].UnitId +
                       '</td><td style="width:9.5%;height:20px;"  id= ' + 'unit' + slno + '>' +
                       result[l].UnitName +
                       '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                       result[l].LocId + '></td><td style="width:9.5%;height:20px;"  id= ' + 'locn' + slno + '>' +
                       result[l].LocnName +
                       '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                       result[l].IssuedQty +
                       '</td><td style="width:9.5%;height:20px;text-align:center;"   id= ' + 'invoiceqty' + slno + '>' +
                       result[l].ProdQty +
                       '</td><td style="width:9.5%;height:20px;text-align:center;"  id= ' + 'scanqty' + slno + '>' +
                       a +
                       '</td><td style="width:9.5%;height:20px;text-align:center;display:none;"  id= ' + 'hiddenscanqty' + slno + '>' +
                       a +
                       '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;"  id= ' + 'issuedqty' + slno + '>' +
                       result[l].IssuedQty +
                       '</td><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                      a +
                       '</td><td style="width:9.5%;height:20px;text-align:center;" id= ' + 'diff' + slno + '>' + result[l].ProdQty + '</td>' +

                       '<td style="width:4%;height:20px;text-align:center;color:red" id= ' + 'EditrowSc_' + slno + '><a onclick=showdetail(' + slno + ')>' + Editbutton + '<a></td>'+

                       '<td style="height:20px;display:none;" font-weight:bold; id= ' + 'MODELS' + slno + '>'+
                       
                        '<input type="text" id= ' + 'Model1' + slno + ' value= "' + result[l].Model1 + '"/>'+
                        '<input type="text" id= ' + 'Model2' + slno + ' value= "' + result[l].Model2 + '"/>'+
                        '<input type="text" id= ' + 'Model3' + slno + ' value= "' + result[l].Model3 + '"/>'+
                        '<input type="text" id= ' + 'Model4' + slno + ' value= "' + result[l].Model4 + '"/>'+
                        '<input type="text" id= ' + 'Model5' + slno + ' value= "' + result[l].Model5 + '"/>'+
                        '<input type="text" id= ' + 'Model6' + slno + ' value= "' + result[l].Model6 + '"/>'+
                        '<input type="text" id= ' + 'Model7' + slno + ' value= "' + result[l].Model7 + '"/>'+
                        '<input type="text" id= ' + 'Model8' + slno + ' value= "' + result[l].Model8 + '"/>'+
                       
                       '</td>'
                       +'</tr>';
            }
            else {
                responseText += '<tr class="otherlocationrow" style="background-color:#0099cc;width:26px;font-weight:bold;" id=' + 'otherlocrow' + slno + '><td style="width:4%;text-align:center;color:white" id= ' + 'clear' + slno + '>' + View +
                 '</td><td style="width:4.6%;height:20px;text-align:center;color:white" id= ' + 'sl' + slno + '>' + slno +
                     '</td><td style="width:12%;height:20px;color:white" class="otherlocation" id= ' + 'itemcode' + slno + '>' +
                     result[l].ProductCode + '</td><td style="width:26%;height:20px;color:white" id= ' + 'Des' + slno + '>' +
                     result[l].ProductDescr + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                     result[l].ProductId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                      result[l].UnitId +
                      '</td><td style="width:9.5%;height:20px;color:white"  id= ' + 'unit' + slno + '>' +
                      result[l].UnitName +
                      '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                      result[l].LocId + '></td><td style="width:9.5%;height:20px;color:white"  id= ' + 'locn' + slno + '>' +
                      result[l].LocnName +
                      '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                      result[l].IssuedQty +
                      '</td><td style="width:9.5%;height:20px;text-align:center;color:white"   id= ' + 'invoiceqty' + slno + '>' +
                      result[l].ProdQty +
                      '</td><td style="width:9.5%;height:20px;text-align:center;color:white"  id= ' + 'scanqty' + slno + '>' +
                      a +
                      '</td><td style="width:9.5%;height:20px;text-align:center;display:none;color:white"  id= ' + 'hiddenscanqty' + slno + '>' +
                      a +
                      '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;color:white"  id= ' + 'issuedqty' + slno + '>' +
                      result[l].IssuedQty +
                      '</td ><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                     a +
                      '</td><td style="width:9.5%;height:20px;text-align:center;color:white" id= ' + 'diff' + slno + '>' + result[l].ProdQty + '</td>' +
                      '<td style="width:4%;height:20px;text-align:center;color:white" id= ' + 'EditrowSc_' + slno + '><a>' + Editbutton + '<a></td>'+
                       '<td style="height:20px;display:none;" font-weight:bold; id= ' + 'MODELS' + slno + '>' +

                        '<input type="text" id= ' + 'Model1' + slno + ' value= "' + result[l].Model1 + '"/>'+
                        '<input type="text" id= ' + 'Model2' + slno + ' value= "' + result[l].Model2 + '"/>'+
                        '<input type="text" id= ' + 'Model3' + slno + ' value= "' + result[l].Model3 + '"/>'+
                        '<input type="text" id= ' + 'Model4' + slno + ' value= "' + result[l].Model4 + '"/>'+
                        '<input type="text" id= ' + 'Model5' + slno + ' value= "' + result[l].Model5 + '"/>'+
                        '<input type="text" id= ' + 'Model6' + slno + ' value= "' + result[l].Model6 + '"/>'+
                        '<input type="text" id= ' + 'Model7' + slno + ' value= "' + result[l].Model7 + '"/>'+
                        '<input type="text" id= ' + 'Model8' + slno + ' value= "' + result[l].Model8 + '"/>'+

                '</td>'


                      +'</tr>';
            }
        }
        $('#RowGet1').val(result.length);       
    }    
    else {
        var responseText = '<tr style="background-color:white;font-weight:bold;"><td style="width:1000px;text-align:center">No Products <td><tr>';
    }

    $('#PackingList').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });
    $('#btnlist').show();
    if(result[0].Status==2)
    {
        $('#Confirmflag').val('loadprevpurchasedata'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Previous Data Available. Do you want to Load?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }

}



function DelPackingGets(result) {

    var responseText = "";
    var a = 0;
    if (result.length != 0) {
        $("#BillType").val(0);
        $("#BillType").prop("disabled", true);
        $('#fromlocid,#tolocid,#ltdeptid').val(0);
        $('#txtfromloc,#txttoloc,#txtloctrcopy').val('');
        $(".showhenloctr").hide();
        $(".showhensales").show();
        $('#txtBillSlNocopy').val(result[0].BillSlNo);
        $('#txtcustomer').val(result[0].CustName);
        $('#txtsalesman').val(result[0].SalesMan);
        $('#txtuser').val(result[0].UserName);
        if (result[0].DriverName != "")
        { $('#txtdriver').val(result[0].DriverName) }
        else
        {
            $('#txtdriver').val('0');
        }
        for (var l = 0; l < result.length; l++) {
            $('#DepatmentCode').val(result[l].DepartmentCode);
            var slno = parseInt(l + 1);
            responseText += '<tr style="background-color:white;width:26px;font-weight:bold"  id=' + 'row' + slno + '><td style="width:4%;text-align:center;color:red" id= ' + 'clear' + slno + '>' + View +
              '</td><td style="width:4.6%;height:20px;text-align:center;" id= ' + 'sl' + slno + '>' + slno +
                  '</td><td style="width:12%;height:20px;" id= ' + 'itemcode' + slno + '>' +
                  result[l].ProductCode + '</td><td style="width:26%;height:20px;" id= ' + 'Des' + slno + '>' +
                  result[l].ProductDescr + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                  result[l].ProductId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                   result[l].UnitId +
                   '</td><td style="width:9.5%;height:20px;"  id= ' + 'unit' + slno + '>' +
                   result[l].UnitName +
                   '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                   result[l].LocId + '></td><td style="width:9.5%;height:20px;"  id= ' + 'locn' + slno + '>' +
                   result[l].LocnName +
                   '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"   id= ' + 'invoiceqty' + slno + '>' +
                   result[l].ProdQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;;font-weight:bold;"  id= ' + 'scanqty' + slno + '>' +
                  result[l].ScannedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;"  id= ' + 'issuedqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td ><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                  a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;" id= ' + 'diff' + slno + '>' + result[l].ProdQty + '</td>' +
                   '<td style="width:4%;height:20px;text-align:center;color:red" id= ' + 'EditrowSc_' + slno + '><a>' + Editbutton + '<a></td>' +
                   '</tr>';
        }
        $('#RowGet1').val(result.length);
    }
    else {
        var responseText = '<tr><td style="width:1000px;text-align:center">No Products <td><tr>';
    }
    $('#PackingList').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });
    $('#btnlist').show();

}

function ConfirmboxResult(Result, status, rowid) {   
    if (Result == 'true' && status == 'loadprevpurchasedata') {
        CheckPrevoiusItems();      
    }
    else if (Result == 'true' && status == 'createnew') {
        formrefresh(0);
    }
    else if (Result == 'true' && status == 'ChnageBillType') {
        formrefresh(1);
        if ($("#BillType").val() == 0) {
            $(".showhenloctr").hide();
            $(".showhensales").show();
            $("#txtBillSlNocopy").focus();
        }
        else if ($("#BillType").val() == 1) {
            $(".showhensales").hide();
            $(".showhenloctr").show();
            $("#txtloctrcopy").focus();
        }
    }
    else if (Result == 'false' && status == 'ChnageBillType') {

        if ($("#BillType").val() == 0) {
            $("#BillType").val(1);
        }
        else if ($("#BillType").val() == 1) {
            $("#BillType").val(0);
        }
        
    }
    $('#confirm').fadeOut();
}
function CheckPrevoiusItems()
{
    var BillId = $('#txtBillseriesId').val();
    var BillNo = $('#txtBillSlNocopy').val();
    var data = {};
    data.BillSeriesId = BillId;
    data.BillSlNo = BillNo;
    data.LocationId = UserLocationId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../inventory/PreviousPackingDeatilsshow",
        data: data,
        success: function (result) {
            PreviousPackingDeatilsshow(result.oList);
        }
    })
    
}
function DriverLoad(result) {
    $("txtdriver").empty();
    DriverSelect = "<option value=0>-Select-</option>";
    for (var i = 0; i < result.length; i++) {
        DriverSelect += "<option value='" + result[i].DriverId + "' name=" + result[i].DriverName + ">" + result[i].DriverName + "</option>"
    }
    $("#txtdriver").append(DriverSelect);
}

function PreviousPackingDeatilsshow(result)
{
    var responseText = "";
    var a = 0;
    if (result.length != 0) {
        $('#txtcustomer').val(result[0].CustName);
        $('#txtsalesman').val(result[0].SalesMan);
        $('#txtuser').val(result[0].UserName);
        if (result[0].DriverName != "")
        { $('#txtdriver').val(result[0].DriverName) }
        else
        {
            $('#txtdriver').val('0');
        }
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            responseText += '<tr style="background-color:white;width:26px;font-weight:bold"  id=' + 'row' + slno + ' ondblclick=showdetail(' + slno + ')><td style="width:4%;text-align:center;color:red" id= ' + 'clear' + slno + ' onclick="Clear(' + slno + ')">' + View +
              '</td><td style="width:4.6%;height:20px;text-align:center;" id= ' + 'sl' + slno + '>' + slno +
                  '</td><td style="width:12%;height:20px;" id= ' + 'itemcode' + slno + '>' +
                  result[l].ItemCode + '</td><td style="width:26%;height:20px;" id= ' + 'Des' + slno + '>' +
                  result[l].ItemDescription + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                  result[l].ItemId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                   result[l].UnitId +
                   '</td><td style="width:9.5%;height:20px;"  id= ' + 'unit' + slno + '>' +
                   result[l].UnitName +
                   '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                   result[l].LocId + '></td><td style="width:9.5%;height:20px;"  id= ' + 'locn' + slno + '>' +
                   result[l].LocationName +
                   '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                   a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"   id= ' + 'invoiceqty' + slno + '>' +
                   result[l].InvoiceQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"  id= ' + 'scanqty' + slno + '>' +
                   result[l].ScannedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;display:none;"  id= ' + 'hiddenscanqty' + slno + '>' +
                   a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;"  id= ' + 'issuedqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td ><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                    result[l].Flag +
                   '</td><td style="width:9.5%;height:20px;text-align:center;" id= ' + 'diff' + slno + '>' + result[l].Diffrence + '</td>' +
                   '<td style="width:4%;height:20px;text-align:center;color:red" id= ' + 'EditrowSc_' + slno + '><a onclick=showdetail(' + slno + ')>' + Editbutton + '<a></td>' +
                   '</tr>';
        }
        $('#RowGet1').val(result.length);
    }
    else {
        var responseText = '<tr><td style="width:1000px;text-align:center">No Products <td><tr>';
    }
    $('#PackingList').html(responseText + '</tbody>');
    for (var l = 1; l <= result.length; l++) {
        if($('#flag' +l).text()=='2')
        {
            $('#row' + l).css("background-color", "#ba68c8");
            fillwhite(l);
        }       
        else if (($('#flag' + l).text() == '1') && ($('#diff' + l).text() == '0')) {
            $('#row' + l).css("background-color", "#00897b");
            fillwhite(l);
        }
        else if (($('#flag' + l).text() == '1') && ($('#diff' + l).text() > '0')) {
            $('#row' + l).css("background-color", "#d50000");
            fillwhite(l);
        }
    }
    diff();
    $('#div1').animate({ scrollTop: 0 });
    $('#btnlist').show();
}
function fillwhite(i)
{
    $('#clear' + i + ',#EditrowSc_' + i).css("color", 'white');
    $('#itemcode' + i).css("color", 'white');
    $('#Des' + i).css("color", 'white');
    $('#unit' + i).css("color", 'white');
    $('#locn' + i).css("color", 'white');
    $('#invoiceqty' + i).css("color", 'white');
    $('#scanqty' + i).css("color", 'white');
    $('#issuedqty' + i).css("color", 'white');
    $('#diff' + i).css("color", 'white');
    $('#sl' + i).css("color", 'white');
}
//serial no load
function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../../Common/SlNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);
        }
    });
}
function getslno(result) {
    $('#txtslno').val(result[0].Pack_No);
}

//checking item
function checkitem(e)
{
    rowcount = $('#PackingList tr').length;

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;    
    var prevId = $('#rowid').val();
    var NoItem = 0;
    // Full Scan Completed
    if (FullScan != 1) {
        ifopopup();
    }
        //else
    else {
        for (i = 1; i <= rowcount; i++) {

            if ($('#itemcode' + i).attr("class") != 'otherlocation') {

                var ItemScancode = ($.trim($('#txtscancode').val())).toLowerCase();
                var ItemCodeGrid = $.trim($('#itemcode' + i).text().toLowerCase());

                ItemScancode = ItemScancode.replace(/ /g, ""); ItemCodeGrid = ItemCodeGrid.replace(/ /g, "");

                var ModelGrid1 = $('#Model1' + i).val().toLowerCase();
                var ModelGrid2 = $('#Model2' + i).val().toLowerCase();
                var ModelGrid3 = $('#Model3' + i).val().toLowerCase();
                var ModelGrid4 = $('#Model4' + i).val().toLowerCase();
                var ModelGrid5 = $('#Model5' + i).val().toLowerCase();
                var ModelGrid6 = $('#Model6' + i).val().toLowerCase();
                var ModelGrid7 = $('#Model7' + i).val().toLowerCase();
                var ModelGrid8 = $('#Model8' + i).val().toLowerCase();

                ModelGrid1 = ModelGrid1.replace(/ /g, ""); ModelGrid2 = ModelGrid2.replace(/ /g, ""); ModelGrid3 = ModelGrid3.replace(/ /g, "");
                ModelGrid4 = ModelGrid4.replace(/ /g, ""); ModelGrid5 = ModelGrid5.replace(/ /g, ""); ModelGrid6 = ModelGrid6.replace(/ /g, "");
                ModelGrid7 = ModelGrid7.replace(/ /g, ""); ModelGrid8 = ModelGrid8.replace(/ /g, "");

                if (
                    (
                       ItemCodeGrid == ItemScancode
                    || ModelGrid1 == ItemScancode
                    || ModelGrid2 == ItemScancode
                    || ModelGrid3 == ItemScancode
                    || ModelGrid4 == ItemScancode
                    || ModelGrid5 == ItemScancode
                    || ModelGrid6 == ItemScancode
                    || ModelGrid7 == ItemScancode
                    || ModelGrid8 == ItemScancode
                    )
                    && ($('#diff' + i).text() > '0')) // if entered first time
                {
                    NoItem = 1;
                    $('#row' + i).css("background-color", '#00bcd4');
                    fillwhite(i);
                    $('#rowid').val(i);
                    $('#txtqty').val(1);
                    $("#txtscancode").focus();
                    addrow(i);
                    messageshow('SCANNED SUCCESSFULLY');
                    $('#txtqty').val('');
                    $('#txtscancode').val('');
                    return false;
                }
                else if (
                     (
                       ItemCodeGrid == ItemScancode
                    || ModelGrid1 == ItemScancode
                    || ModelGrid2 == ItemScancode
                    || ModelGrid3 == ItemScancode
                    || ModelGrid4 == ItemScancode
                    || ModelGrid5 == ItemScancode
                    || ModelGrid6 == ItemScancode
                    || ModelGrid7 == ItemScancode
                    || ModelGrid8 == ItemScancode
                    )
                    && $('#flag' + i).text() == 1 && ($('#diff' + i).text() == '0')) {  //alreary scanned if diffrence is zero
                    rowCancel(i);
                    NoItem = 1;
                    return false;

                }
                else if (
                     (
                       ItemCodeGrid == ItemScancode
                    || ModelGrid1 == ItemScancode
                    || ModelGrid2 == ItemScancode
                    || ModelGrid3 == ItemScancode
                    || ModelGrid4 == ItemScancode
                    || ModelGrid5 == ItemScancode
                    || ModelGrid6 == ItemScancode
                    || ModelGrid7 == ItemScancode
                    || ModelGrid8 == ItemScancode
                    )                   
                    && $('#flag' + i).text() == 2)    //already delivered
                {
                    showdeliver();
                    NoItem = 1;
                    return false;
                }

            }
            if (rowcount == i) {
                $('#txtscancode').val('')

                if (NoItem == 0) {
                    //for notscanning
                    notinshow('NO ITEM FOUND');
                    return false;
                }
            }

        }
    }
    
}



function addrow(a) {
    if ($('#txtqty').val() != '') {       
        var hqty = $('#diff' + a).text();

        if (Number(hqty) < Number($('#txtqty').val())) {
            warningshow('Available Quantity is ' + $('#diff' + a).text());
            $('#txtqty').val('');
        }

        var ItemScancode = ($.trim($('#txtscancode').val())).toLowerCase();
        var ItemCodeGrid = $.trim($('#itemcode' + a).text().toLowerCase());

        ItemScancode = ItemScancode.replace(/ /g, ""); ItemCodeGrid = ItemCodeGrid.replace(/ /g, "");

        var ModelGrid1 = $('#Model1' + i).val().toLowerCase();
        var ModelGrid2 = $('#Model2' + i).val().toLowerCase();
        var ModelGrid3 = $('#Model3' + i).val().toLowerCase();
        var ModelGrid4 = $('#Model4' + i).val().toLowerCase();
        var ModelGrid5 = $('#Model5' + i).val().toLowerCase();
        var ModelGrid6 = $('#Model6' + i).val().toLowerCase();
        var ModelGrid7 = $('#Model7' + i).val().toLowerCase();
        var ModelGrid8 = $('#Model8' + i).val().toLowerCase();

        ModelGrid1 = ModelGrid1.replace(/ /g, ""); ModelGrid2 = ModelGrid2.replace(/ /g, ""); ModelGrid3 = ModelGrid3.replace(/ /g, "");
        ModelGrid4 = ModelGrid4.replace(/ /g, ""); ModelGrid5 = ModelGrid5.replace(/ /g, ""); ModelGrid6 = ModelGrid6.replace(/ /g, "");
        ModelGrid7 = ModelGrid7.replace(/ /g, ""); ModelGrid8 = ModelGrid8.replace(/ /g, "");

        if (
            (
                       ItemCodeGrid == ItemScancode
                    || ModelGrid1 == ItemScancode
                    || ModelGrid2 == ItemScancode
                    || ModelGrid3 == ItemScancode
                    || ModelGrid4 == ItemScancode
                    || ModelGrid5 == ItemScancode
                    || ModelGrid6 == ItemScancode
                    || ModelGrid7 == ItemScancode
                    || ModelGrid8 == ItemScancode
                    )
            
            && ($('#flag' + a).text() != 2)) {     //calculate diffrence
                
                var quantity = $('#issuedqty' + a).text();
                var enterqty = $('#txtqty').val()
                var qty = Number(quantity) + Number(enterqty);
                $('#issuedqty' + a).text(qty);                
                var scanqty = $('#scanqty' + a).text();
                var sqty = Number(scanqty) + Number(enterqty);
                $('#scanqty' + a).text(sqty);              
                $('#row' + a).css("background-color", '#d50000');
                fillwhite(a);
            }
            finddiff(a);
        
    }    
}
function showdeliver()
{
    $('#tblAlert tr').remove();
    $('#alertpopup').show();
    $('#alertdiv').show();
    $('#lbl1').text('');
        $('#lbl1').text('Already Delivered')
        window.setTimeout(function () {
            $('#btntermssave').click();
        }, 2000);
        //$('#btntermssave').focus();
    }

function ScanItem() {
    $('#tblAlert tr').remove();
    $('#alertpopup').show();
    $('#alertdiv').show();
    $('#lbl1').text('');
    $('#lbl1').text('Scan the Item');
    window.setTimeout(function () {
        $('#btntermssave').click();
    }, 2000);
    //$('#btntermssave').focus();

}

function rowCancel(RowId) {    
    $('#tblAlert tr').remove();
    $('#alertpopup').show();
    $('#alertdiv').show();
    $('#lbl1').text('');
    $('#lbl1').text('Already Scanned');
    window.setTimeout(function () {
        $('#btntermssave').click();
    }, 2000);
    //$('#btntermssave').focus();
}
//clear button if not already stored in db as diffrence 0
function Clear(a)
{
    if ($('#flag' + a).text() != 2)
    {
        
            $('#issuedqty' + a).text($('#hidenqty' + a).text());
            $('#scanqty' + a).text($('#hiddenscanqty' + a).text());
            finddiffrence(a);
            $('#flag' + a).text(0);
            $('#row' + a).css("background-color", 'white');
            $('#row' + a).css("color", '#212529');
            $('#clear' + a + ',#EditrowSc_' + a).css("color", 'red');
            $('#itemcode' + a).css("color", 'black');
            $('#Des' + a).css("color", 'black');
            $('#unit' + a).css("color", 'black');
            $('#locn' + a).css("color", 'black');
            $('#invoiceqty' + a).css("color", 'black');
            $('#scanqty' + a).css("color", 'black');
            $('#issuedqty' + a).css("color", 'black');
            $('#diff' + a).css("color", 'black');
            $('#sl' + a).css("color", 'black');            
               
    }
    TemporarySavePackingHistory();
}




function createnew() {    
    var rowcount = document.getElementById('PackingList').rows.length;
        if (rowcount > 0) {
            $('#Confirmflag').val('createnew'), $('#ConfirmRowId').val(1)
            $('#confirmmessage').text('Data Will Be Lost.Do you want to Continue?');
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#btnsubmit').prop('disabled', false);
            $('#txtscancode').prop('disabled', false);
            $('#txtqty').prop('disabled', false);
            $('#txtdriver').prop('disabled', false);
            $('#txtBillSlNocopy').prop('disabled', false);
        }
        else {
            formrefresh(0);
            $('#btnsubmit').prop('disabled', false);
            $('#txtscancode').prop('disabled', false);
            $('#txtqty').prop('disabled', false);
            $('#txtdriver').prop('disabled', false);
            $('#txtBillSlNocopy').prop('disabled', false);
        }
    }

function Copy()
{
    CopyFlag = 1;
    $('#txtslno').prop('disabled', false);
    $('#txtslno').focus();
    $('#txtslno').select();
    $('#btnsubmit').prop('disabled', true);
    $('#txtscancode').prop('disabled', true);
    $('#txtqty').prop('disabled', true);
    $('#txtdriver').prop('disabled', true);
    $('#txtBillSlNocopy').prop('disabled', true);
}



function checkqty(e)
{
    if($('#txtqty').val()!='')
    {
        var a = nocheck;
        var d = $('#issuedqty' + a).text() - $('#scanqty' + a).text();
        var fd = $('#invoiceqty' + a).text() - d;
        var hqty = $('#diff' + a).text();       
        if ($('#txtqty').val()>fd)
        {           
            warningshow('Available Quantity is ' + fd);
            $('#txtqty').val('');

        }
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            if ($('#txtqty').val() != "" && $('#txtqty').val() != '0') {
                if ($.trim($('#itemcode' + a).text()) == $.trim($('#txtscancode').val()) && $('#flag' + a).text() != 2) {     //calculate diffrence
                    
                    var scanqty = $('#scanqty' + a).text();
                    var quantity = $('#issuedqty' + a).text();                   
                    var enterqty = $('#txtqty').val()
                    var qty = (Number(quantity) - Number(scanqty)) + Number(enterqty);
                    $('#issuedqty' + a).text(qty);
                    var sqty = Number(enterqty);
                    $('#scanqty' + a).text(sqty);
                    $('#row' + a).css("background-color", '#d50000');
                    fillwhite(a);
                    $('#txtscancode').focus();
                }
                finddiff(a);
            }
            else {
                warningshow('Please Enter Quantity', 'txtqty');
            }
        }              
    }
    
}
function finddiffrence(a)
{
            var diffrence = $('#invoiceqty' + a).text() - $('#issuedqty' + a).text()
    if (diffrence > 0) { $('#diff' + a).css("color", "#d50000"); }   
            else if (diffrence == 0) { $('#diff' + a).css("color", "white");}
            $('#diff' + a).text(diffrence);            
            $('#flag' + a).text(1);             
}


function checkslno(e)
{
    //var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    //if (key != 13) {
    //    $('#txtcustomer').val('');
    //    $('#txtsalesman').val('');
    //    $('#txtcustomer').val('');
    //    $("#PackingList tr").remove();
    //    $('#txtdriver').val('0');
    //}
}

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    else {
        return true;
    }
}

function getdiffrence()
{
    FullScan = 0;
    var rowCount = document.getElementById('PackingList').rows.length;
    for (var k = 1; k < rowCount + 1; k++) {
        var diffrence = $('#invoiceqty' + k).text() - $('#issuedqty' + k).text()
        if (diffrence == 0) {           
            $('#row' + k).css("background-color", "#ba68c8"); $('#flag' + k).text(2);
            fillwhite(k);
        }
        else {
            FullScan = 1;
            $('#row' + k).css("background-color", "white")
        }
        $('#diff' + k).text(diffrence);
    }
    if (FullScan != 1 && CopyFlag!=1) {
        ifopopup();
    }
    else if (CopyFlag==0) {
        $('#btnsubmit').prop('disabled', false);
    }
       
}

function ifopopup() {
    $('#infomessage').text('SCANNING COMPLETED BY ' + $('#EnteredBy').val())
    $('#Infospopup').show();
    $('#btnsubmit').prop('disabled', true);
    window.setTimeout(function () {
        $('#Infospopup').hide();
    }, 2000);
    $('#txtBillSlNocopy').focus();
}
function diff() {
    var rowCount = document.getElementById('PackingList').rows.length;
    for (var k = 1; k < rowCount + 1; k++) {
        var diffrence = $('#invoiceqty' + k).text() - $('#issuedqty' + k).text();
        $('#diff' + k).text(diffrence);
    }
}
var nocheck = 0;
function showdetail(slno)
{
    if ($('#flag' + slno).text() != 2) {
        $('#txtscancode').val($('#itemcode' + slno).text());
        $('#txtqty').val($('#scanqty' + slno).text());
        $('#txtqty').select();
        nocheck = slno;
    }
}

function finddiff(a) {
    var diffrence = $('#invoiceqty' + a).text() - $('#issuedqty' + a).text()
    if (diffrence > 0) { $('#diff' + a).css("color", "white"); }
    else if (diffrence == 0) { $('#diff' + a).css("color", "white"); }
    $('#diff' + a).text(diffrence);
    $('#flag' + a).text(1);
    $('#txtqty').val('');
    $('#txtscancode').val('');
    if ($('#diff' + a).text() == '0') {
        $('#row' + a).css("background-color", '#00897b');
    }
    TemporarySavePackingHistory();
}

function SaveAndUpdate(Flag) {
    rowCount = $('#PackingList tr').length;
    $('#PasswordDiv').hide();
        $('#btnsubmit').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k < rowCount + 1; k++) {
            var ItemId = $('#ProductId' + k).val();
            var ItemLocationId = $('#LocId' + k).val();
            var ItemDescription = $('#Des' + k).text();
            var UnitId = $('#unitId' + k).text();
            var ItemCode = $('#itemcode' + k).text();
            var Location = UserLocationId;
            var InvoiceQty = $('#invoiceqty' + k).text();
            var ScannedQty = $('#scanqty'+ k).text();
            var IssuedQty = $('#issuedqty' + k).text();
            var Diffrence = $('#diff' + k).text();
            var DeliveryNo = $('#txtslno').val();

            if ($('#BillType').val()==0) {
            var BillSeriesId = $('#txtBillseriesId').val();
            var BillSlNo = $('#txtBillSlNocopy').val();
            }
            
            else{
            var BillSeriesId = 0;
            var BillSlNo = $('#txtloctrcopy').val();
            }


           
            var UserId = erpUId;
            var DeptId = ERPDeptId;
            var CustName = $('#txtcustomer').val();
            var SalesMan = $('#txtsalesman').val();
            var UserName = $('#txtuser').val();
            var DriverName = $('#txtdriver').val();
            var TempUser = ERPUserId;
            var Flag = $('#flag' + k).text();

            var FromLocId = $('#fromlocid').val();
            var ToLocId = $('#tolocid').val();
            var LTDeptId = $('#ltdeptid').val();
            var TypeFlag = $('#BillType').val();
            var Variable1 = '';
            var Variable2 = '';
            

            if (ItemCode != undefined) {
                oArray.push({
                    'ItemId': ItemId,
                    'ItemLocationId': ItemLocationId,
                    'ItemDescription': ItemDescription,
                    'UnitId': UnitId,
                    'ItemCode': ItemCode,
                    'Location': Location,
                    'InvoiceQty': InvoiceQty,
                    'ScannedQty': ScannedQty,
                    'IssuedQty': IssuedQty,
                    'Diffrence': Diffrence,
                    'DeliveryNo': DeliveryNo,
                    'BillSeriesId': BillSeriesId,
                    'BillSlNo': BillSlNo,
                    'UserId': UserId,
                    'DeptId': DeptId,
                    'CustName': CustName,
                    'SalesMan': SalesMan,
                    'UserName': UserName,
                    'DriverName': DriverName,
                    'TempUser':TempUser,
                    'Flag': Flag,
                    'FromLocId': FromLocId,
                    'ToLocId': ToLocId,
                    'LTDeptId': LTDeptId,
                    'TypeFlag': TypeFlag,
                    'Variable1': Variable1,
                    'Variable2': Variable2,
                    
                })
            }
        }
        if (oArray != "") {

            var data = { 'PackingHistoryModel': oArray };
            $.ajax({
                type: "POST",
                url: "../../inventory/PackingHistoryInsert",
                data: data,
                success: function (result) {
                    for (var i = 0; i < result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        var Number = result.oList[i].DeliveryNo;
                        $('#btnsubmit').prop("disabled", false);
                        Showalerts(status, Number);                       
                    }
                }
            });
        }   
}
function Showalerts(Status, Number) {  
    $('#alertpopup1').show();
    $('#alertdiv1').show();
    $('#savealert').text('');
    $('#savealert').append('Saved Successfully!<br>Do you want to print this bill?');
    $('#btnok').focus();
}

function formrefresh(Flag)
{

    serialnoload();
    $('#txtBillSlNocopy,#DepatmentCode').val('');
    $('#fromlocid,#tolocid,#ltdeptid').val(0);
    $('#txtfromloc,#txttoloc,#txtloctrcopy').val('');
    if (Flag != 1) {
        $(".showhenloctr").hide();
        $(".showhensales").show();
        $('#BillType').val(0);
    }
    $('#txtcustomer').val('');
    $('#txtsalesman').val('');
    $('#txtdriver').val('0');
    $('#txtuser').val('');
    $('#txtscancode').val('');
    $('#txtqty').val('');
    $("#PackingList tr").remove();
    $('#btnlist').hide();
    $('#btnsubmit').prop('disabled', false);
    $('#txtscancode').prop('disabled', false);
    $('#txtqty').prop('disabled', false);
    $('#txtdriver').prop('disabled', false);
    $('#txtBillSlNocopy,#txtloctrcopy,#BillType').prop('disabled', false);
    $('#txtBillSlNocopy').focus();
    $('#txtBillSlNocopy').css("background-color", '#58dbe4');
    FullScan = 0;
    CopyFlag = 0;
    $('#EnteredBy').val('');
   
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
function alertpopuprefresh(e) {
    $('#alertpopup').hide();
    $('#alertdiv').hide();
    $('#txtscancode').val('');
    $('#txtscancode').focus();
}

function alertpopupprefresh() {
    $('#alertpopup1').hide();
    $('#alertdiv1').hide();
}



function passwordcheck() {
   
        var data = {};   //array      
        data.Password = $('#txtpassword').val();
        $.ajax({
            type: "POST",
            url: "../Login/PasswordCheck",
            data: data,
            success: function (result) {
                if (result.oList.length != '') {                   
                    GetUserDetails(result.oList);                    
                }               
            }
        });
     
}
var erpUId = "";
var pflag = 0;
function GetUserDetails(result)
{
    erpUId = "";
    if (result[0].flag==1)
    {
        erpUId = result[0].UserLoginId;
        $('#txtuser').val(result[0].UserName)
        SaveAndUpdate(1);       

    }
    else
    {
        warningshow('Invalid Password', 'txtpassword');
        $('#txtpassword').select();
    }
}

function messageshow(message) {
    $('#tctmessage').text(message);
    $('#Succsesspopup').show();
    window.setTimeout(function () {
        $('#Succsesspopup').hide();
    }, 2000);
}

function closemessage() {
    $('#Succsesspopup,#Existspopup,#Infospopup').fadeOut();
    
}

function notinshow(message) {
    $('#txtmessage').text(message);
    $('#Existspopup').show();
    window.setTimeout(function () {
        $('#Existspopup').hide();
    }, 3000);
}

function TemporarySavePackingHistory() {
    rowCount = $('#PackingList tr').length;
    $('#PasswordDiv').hide();
    var oArray = new Array();
    for (var k = 1; k < rowCount + 1; k++) {
        var ItemId = $('#ProductId' + k).val();
        var ItemLocationId = $('#LocId' + k).val();
        var ItemDescription = $('#Des' + k).text();
        var UnitId = $('#unitId' + k).text();
        var ItemCode = $('#itemcode' + k).text();
        var Location = UserLocationId;
        var InvoiceQty = $('#invoiceqty' + k).text();
        var ScannedQty = $('#scanqty' + k).text();
        var IssuedQty = $('#issuedqty' + k).text();
        var Diffrence = $('#diff' + k).text();
        var DeliveryNo = $('#txtslno').val();
        var BillSeriesId = $('#txtBillseriesId').val();
        var BillSlNo = $('#txtBillSlNocopy').val();
        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var CustName = $('#txtcustomer').val();
        var SalesMan = $('#txtsalesman').val();
        var UserName = $('#txtuser').val();
        var DriverName = $('#txtdriver').val();
        var TempUser = '';
        var Flag = $('#flag' + k).text();

        var FromLocId = $('#fromlocid').val();
        var ToLocId = $('#tolocid').val();
        var LTDeptId = $('#ltdeptid').val();
        var TypeFlag = $('#BillType').val();
        var Variable1 = '';
        var Variable2 = '';

        if (ItemCode != undefined) {
            oArray.push({
                'ItemId': ItemId,
                'ItemLocationId': ItemLocationId,
                'ItemDescription': ItemDescription,
                'UnitId': UnitId,
                'ItemCode': ItemCode,
                'Location': Location,
                'InvoiceQty': InvoiceQty,
                'ScannedQty': ScannedQty,
                'IssuedQty': IssuedQty,
                'Diffrence': Diffrence,
                'DeliveryNo': DeliveryNo,
                'BillSeriesId': BillSeriesId,
                'BillSlNo': BillSlNo,
                'UserId': UserId,
                'DeptId': DeptId,
                'CustName': CustName,
                'SalesMan': SalesMan,
                'UserName': UserName,
                'DriverName': DriverName,
                'TempUser': TempUser,
                'Flag': Flag,
                'FromLocId': FromLocId,
                'ToLocId': ToLocId,
                'LTDeptId': LTDeptId,
                'TypeFlag': TypeFlag,
                'Variable1': Variable1,
                'Variable2': Variable2,
            })
        }
    }
    if (oArray != "") {

        var data = { 'PackingHistoryModel': oArray };
        $.ajax({
            type: "POST",
            url: "../../inventory/PackingHistoryTemporarySave",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                //    //var status = result.oList[i].Status;
                //    //var Number = result.oList[i].DeliveryNo;                   
                //   // Showalerts(status, Number);
                }
            }
        });
    }

}


function DelPackingGetsLOC(result) {
    var responseText = "";
    var a = 0;
    if (result.length != 0) {
        $("#BillType").val(1);
        $("#BillType,#txtloctrcopy").prop("disabled", true);
        $(".showhenloctr").show();
        $(".showhensales").hide();
        $('#txtcustomer,#txtsalesman,#txtBillSlNocopy').val('');

        $('#txtfromloc').val(result[0].Location);
        $('#txttoloc').val(result[0].LocnName);
        $('#fromlocid').val(result[0].LocnId);
        $('#tolocid').val(result[0].LocId);
        $('#txtuser').val(result[0].UserName);
        $('#EnteredBy').val(result[0].EnteredBy);
        $("#ltdeptid").val(result[0].DeptId)
        $('#txtloctrcopy').val(result[0].BillSlNo);

        if (result[0].DriverName != "")
        { $('#txtdriver').val(result[0].DriverName) }
        else
        {
            $('#txtdriver').val('0');
        }
        for (var l = 0; l < result.length; l++) {
            $('#DepatmentCode').val(result[l].DepartmentCode);
            var slno = parseInt(l + 1);
            responseText += '<tr style="background-color:white;width:26px;font-weight:bold"  id=' + 'row' + slno + '><td style="width:4%;text-align:center;color:red" id= ' + 'clear' + slno + '>' + View +
              '</td><td style="width:4.6%;height:20px;text-align:center;" id= ' + 'sl' + slno + '>' + slno +
                  '</td><td style="width:12%;height:20px;" id= ' + 'itemcode' + slno + '>' +
                  result[l].ProductCode + '</td><td style="width:26%;height:20px;" id= ' + 'Des' + slno + '>' +
                  result[l].ProductDescr + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                  result[l].ProductId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                   result[l].UnitId +
                   '</td><td style="width:9.5%;height:20px;"  id= ' + 'unit' + slno + '>' +
                   result[l].UnitName +
                   '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                   result[l].LocId + '></td><td style="width:9.5%;height:20px;"  id= ' + 'locn' + slno + '>' +
                   result[l].LocnName +
                   '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"   id= ' + 'invoiceqty' + slno + '>' +
                   result[l].ProdQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;;font-weight:bold;"  id= ' + 'scanqty' + slno + '>' +
                  result[l].ScannedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;"  id= ' + 'issuedqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td ><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                  a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;" id= ' + 'diff' + slno + '>' + result[l].ProdQty + '</td>' +
                   '<td style="width:4%;height:20px;text-align:center;color:red" id= ' + 'EditrowSc_' + slno + '><a>' + Editbutton + '<a></td>' +
                   '</tr>';
        }
        $('#RowGet1').val(result.length);
    }
    else {
        var responseText = '<tr><td style="width:1000px;text-align:center">No Products <td><tr>';
    }
    $('#PackingList').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });
    $('#btnlist').show();

}

function ChangeBillType() {
    var rowcount = document.getElementById('PackingList').rows.length;
    if (rowcount > 0) {
        $('#Confirmflag').val('ChnageBillType'), $('#ConfirmRowId').val(1)
        $('#confirmmessage').text('Data Will Be Lost.Do you want to Continue?');
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#btnsubmit').prop('disabled', false);
        $('#txtscancode').prop('disabled', false);
        $('#txtqty').prop('disabled', false);
        $('#txtdriver').prop('disabled', false);
        $('#txtBillSlNocopy').prop('disabled', false);

    }
    else {
        formrefresh(1);
        $('#btnsubmit').prop('disabled', false);
        $('#txtscancode').prop('disabled', false);
        $('#txtqty').prop('disabled', false);
        $('#txtdriver').prop('disabled', false);
        $('#txtBillSlNocopy').prop('disabled', false);
        if ($("#BillType").val() == 0) {
            $(".showhenloctr").hide();
            $(".showhensales").show();
            $("#txtBillSlNocopy").focus();
        }
        else if ($("#BillType").val() == 1) {
            $(".showhensales").hide();
            $(".showhenloctr").show();
            $("#txtloctrcopy").focus();
        }
    }
}

function PackingGetsLocTransfer(result) {

    var responseText = "<tbody>";
    var a = 0;
    if (result.length != 0) {
        $('#txtcustomer').val('');
        $('#txtsalesman').val('');
        $('#txtfromloc').val(result[0].LocFrom);
        $('#txttoloc').val(result[0].LocTo);
        $('#fromlocid').val(result[0].FromLocation);
        $('#tolocid').val(result[0].ToLocation);
        $('#txtuser').val(result[0].UserName);
        $('#EnteredBy').val(result[0].EnteredBy);
        $("#ltdeptid").val(result[0].DeptId)

        if (result[0].DriverName != "")
        { $('#txtdriver').val(result[0].DriverName) }
        else
        {
            $('#txtdriver').val('0');
        }
        for (var l = 0; l < result.length; l++) {
            $('#DepatmentCode').val(result[l].DepartmentCode);
            var slno = parseInt(l + 1);

            responseText += '<tr class="mylocationrow" style="background-color:white;width:26px;font-weight:bold;"  id=' + 'row' + slno + ' ondblclick=showdetail(' + slno + ')><td style="width:4%;text-align:center;color:red" id= ' + 'clear' + slno + ' onclick="Clear(' + slno + ')">' + View +
              '</td><td style="width:4.6%;height:20px;text-align:center;" id= ' + 'sl' + slno + '>' + slno +
                  '</td><td style="width:12%;height:20px;" class="mylocation" id= ' + 'itemcode' + slno + '>' +
                  result[l].ProductCode + '</td><td style="width:26%;height:20px;" id= ' + 'Des' + slno + '>' +
                  result[l].ProductDescr + '</td><td style=display:none;><input type="text" id= ' + 'ProductId' + slno + ' value= ' +
                  result[l].ProductId + '></td><td style=display:none; id= ' + 'unitId' + slno + '>' +
                   result[l].UnitId +
                   '</td><td style="width:9.5%;height:20px;"  id= ' + 'unit' + slno + '>' +
                   result[l].UnitName +
                   '</td><td style=display:none;><input type="text" id= ' + 'LocId' + slno + ' value= ' +
                   result[l].ToLocation + '></td><td style="width:9.5%;height:20px;"  id= ' + 'locn' + slno + '>' +
                   result[l].LocTo +
                   '</td><td style="width:9.5%;height:20px;display:none;"   id= ' + 'hidenqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"   id= ' + 'invoiceqty' + slno + '>' +
                   result[l].Quantity +
                   '</td><td style="width:9.5%;height:20px;text-align:center;"  id= ' + 'scanqty' + slno + '>' +
                   a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;display:none;"  id= ' + 'hiddenscanqty' + slno + '>' +
                   a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;font-weight:bold;"  id= ' + 'issuedqty' + slno + '>' +
                   result[l].IssuedQty +
                   '</td><td style="height:20px;display:none;" font-weight:bold; id= ' + 'flag' + slno + '>' +
                  a +
                   '</td><td style="width:9.5%;height:20px;text-align:center;" id= ' + 'diff' + slno + '>' + result[l].ProdQty + '</td>' +
                   '<td style="width:4%;height:20px;text-align:center;color:red" id= ' + 'EditrowSc_' + slno + '><a onclick=showdetail(' + slno + ')>' + Editbutton + '<a></td>'+
                   '<td style="height:20px;display:none;" font-weight:bold; id= ' + 'MODELS' + slno + '>' +

                    '<input type="text" id= ' + 'Model1' + slno + ' value= "' + result[l].Model1 + '"/>' +
                    '<input type="text" id= ' + 'Model2' + slno + ' value= "' + result[l].Model2 + '"/>' +
                    '<input type="text" id= ' + 'Model3' + slno + ' value= "' + result[l].Model3 + '"/>' +
                    '<input type="text" id= ' + 'Model4' + slno + ' value= "' + result[l].Model4 + '"/>' +
                    '<input type="text" id= ' + 'Model5' + slno + ' value= "' + result[l].Model5 + '"/>' +
                    '<input type="text" id= ' + 'Model6' + slno + ' value= "' + result[l].Model6 + '"/>' +
                    '<input type="text" id= ' + 'Model7' + slno + ' value= "' + result[l].Model7 + '"/>' +
                    '<input type="text" id= ' + 'Model8' + slno + ' value= "' + result[l].Model8 + '"/>' +

                   '</td>'
                   + '</tr>';

        }
        $('#RowGet1').val(result.length);
    }
    else {
        var responseText = '<tr style="background-color:white;font-weight:bold;"><td style="width:1000px;text-align:center">No Products <td><tr>';
    }

    $('#PackingList').html(responseText + '</tbody>');
    $('#div1').animate({ scrollTop: 0 });
    $('#btnlist').show();
    if (result[0].Status == 2) {
        $('#Confirmflag').val('loadprevpurchasedata'), $('#ConfirmRowId').val(0)
        $('#confirmmessage').text('Previous Data Available. Do you want to Load?')
        $('#confirm').show();
        $('#confirmOk').focus();
    }

}

function ViewScannedDO() {
    var data = {};
    data.FromDate = $('#ViewFromDate').val();
    data.ToDate = $('#ViewToDate').val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    data.Bin_A = '';
    data.Bin_B = '';
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/PackingHistoryView",
        data: data,
        success: function (result) {
            GetListScanningView(result.oList);
        }
    });
}


function GetListScanningView(result) {
    $('#ViewFromDate,#ViewToDate').prop("disabled", false);
    disable_datatable('tbl_ScanningViewList');
    $('#ScanningView').show();
    var responseText = "<thead><tr><th>Sl#</th><th>DO#</th><th>Type</th><th>Bill#</th><th>Date</th><th>Supplier/Location</th><th>Department</th><th>User</th><th>Print</th></tr>" +
        "<tr><th> </th><th>DO#</th><th>Type</th><th>Bill#</th><th>Date</th><th>Supplier/Location</th><th>Department</th><th>User</th><th> </th></tr></thead><tbody>";

    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        var Type = '';
        if (parseInt(result[l].Status || 0) == 0)
            Type = 'Sales Bill'
        else if (result[l].Status == 1)
            Type = 'Location Transfer'

        responseText += '<tr ondblclick="GetCopyofThisScanning(' + result[l].DeliveryOrderNo + ',' + result[l].BillSeriesId + ',' + result[l].BillSlNo + ',' + result[l].DeptId + ',' + result[l].PHDeptId + ',' + parseInt(result[l].Status || 0) + ',0)"><td style="" align="center">' + slno + '</td><td id=' + 'InvoView_' + slno + '>' +
            result[l].DeliveryOrderNo + '</td><td>' +
            Type + '</td><td>' +
            result[l].BlSlNo + '</td><td>' +
            result[l].InvDate + '</td><td>' +
            result[l].CustName + '</td><td>' +
            result[l].DepartmentCode + '</td><td>' +
            result[l].EnteredBy + '</td>' +
            '<td><button class="btn white btn-round btn-xs" style="background-color:#009DA0;font-size:smaller;margin:0" onclick="GetCopyofThisScanning(' + result[l].DeliveryOrderNo + ',' + result[l].BillSeriesId + ',' + result[l].BillSlNo + ',' + result[l].DeptId + ',' + result[l].PHDeptId + ',' + parseInt(result[l].Status || 0) + ',1)" autocomplete="off">Print <i class="ft-printer"></i></button></td></tr>';
    }
    $('#tbl_ScanningViewList').html(responseText + '</tbody>');
    datatableWithsearch('tbl_ScanningViewList', 'Multiple');
}


function GetCopyofThisScanning(DO, BillSl, BillNo, DeptId, PHDeptId, Type, Flag) {
    Copy();
    $('#ScanningView').hide();
    if (Type != 1) {                    //SALES
        var data = {};
        data.DeliveryOrderNo = DO;
        data.BillSeriesId = BillSl;
        data.BillSlNo = BillNo;
        data.DeptId = DeptId;
        data.PHDeptId = PHDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/PackingHistoryCopyGets",
            data: data,
            success: function (result) {
                DelPackingGets(result.oList);
                getdiffrence();
                if (Flag == 1) {
                    printthisoutbill();
                }
            }
        })
    }
    else {                                      //LOC TRANSFER
        var data = {};
        data.DeliveryOrderNo = DO;
        data.BillSlNo = BillNo;
        data.DeptId = DeptId;
        data.PHDeptId = PHDeptId;
        $.ajax({
            type: "POST",
            url: "../SalesInvoice/PackingHistoryLTCopyGets",
            data: data,
            success: function (result) {
                DelPackingGetsLOC(result.oList);
                getdiffrence();
                if (Flag == 1) {
                    printthisoutbill();
                }
            }
        });
    }
}

function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" class="form-control"  style="width:100%"  placeholder="' + title + '"/>')
    });

    var table = null;

    if (Type == 'Single') {

        table = $('#' + tablename).DataTable({
            dom: 'tipr',
            orderCellsTop: true,
        });

    }
    else if (Type == 'Multiple') {


        table = $('#' + tablename).DataTable({
            dom: 'tir',
            "columnDefs": [
                { "width": "1%", "targets": 0 },
            ],
            orderCellsTop: true,
            "order": [],
            "pageLength": -1,

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


function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}
