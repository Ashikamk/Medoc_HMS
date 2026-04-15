var decimal = Decimal;
var RadFlag = 0;

function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Company/CompanyItemSlNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);
        }
    });
}

function getslno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#PDCNo').val(result[k].DV);
    }
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

$(document).ready(function () {

   
   
    $("#PDCAccount").focus();
    $("#TotalAmount,#TotalAmountAll").val('0.00');
  

    $('#ChequeNo,#ChequeDtFrom,#ChequeDtTo').daterangepicker({
        minDate: new Date('1/1/2022'),
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
        
    GetList()
    $("#TransferDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeDtRadio').focus();
            e.preventDefault();
        }
    });
    $("#ChequeDtRadio").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeDtFrom').focus();
            e.preventDefault();
        }
    });
    $("#ChequeDtFrom").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeDtTo').focus();
            e.preventDefault();
        }
    });
    $("#ChequeDtTo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btngo').focus();
            e.preventDefault();
        }
    });
    $("#ChequeNoRadio").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#ChequeNo').focus();
            e.preventDefault();
        }
    });
    $("#ChequeNo").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#btngo').focus();
            e.preventDefault();
        }
    });   
    $('#ChequeDtRadio').click(function () {
      
    });
    $('#ChequeNoRadio').click(function () {
       
    });

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate()
    });

});


function SaveAndUpdate() {
     if (0 != 0) {
        warningshow('Pending Bills Not Found', 'btngo');
    }
     else {
        
         var Count = parseInt($('#txtRowCount').val())
      
        var oArray = new Array();        
        for (var i = 1; i < Count; i++) {
            if ($("#SlNoCheck" + i).is(":checked")) {                
                var VoucherTypeId = 0;
                var VoucherDate = $('#LayouEOD').text();
                var VoucherNo = 0;
                var VType = 'C';
                var ReferenceNo = $('#VoucherNo' + i).text(); //$('#RefNo' + i).text();
                var ProjectJobId = $('#ProjectJobId' + i).text();
                var CostCenterId = $('#CostCenterId' + i).text();
                var CurrencyId = $('#CurrencyId' + i).text();
                var CurrencyRate = $('#CurrencyRate' + i).text();
                
                var BankId = $('#BankId' + i).text();
                var ChequeDtTo = $('#ChequeNo' + i).text();
                var ChequeDate = $('#ChequeDate' + i).text();
                var BillSerId = 0;                
                var AccountId = $('#AccId' + i).text();
                var AccCode = $('#ChequeNo' + i).text();
                var VDescription = $('#AccDescription' + i).text();
                var Amount = $('#BaseAmount' + i).text();
                DelFlag = 1;
                var UserId = ERPUserId;
                var DeptId = ERPDeptId;
                var VTypePrefix = $('#BankName' + i).text();
                var Advance = "False";
                var AdvanceAmount = $('#cardrAmount' + i).val();
                var FCAmount = $('#cashrAmount' + i).val();
                var TransVoucherNo = 0;
                var PDCAccountId = $('#AccCode' + i).text();
                var PDCStatus = 'C';
                var VoEId = $('#VoEId' + i).text();

                oArray.push({
                    'VoucherTypeId': VoucherTypeId,
                    'VoucherDate': VoucherDate,
                    'VoucherNo': VoucherNo,
                    'VType': VType,
                    'RefNo': ReferenceNo.substring(0, 40),
                    'ProjectJobId': ProjectJobId,
                    'CostCenterId': CostCenterId,
                    'CurrencyId': CurrencyId,
                    'CurrencyRate': CurrencyRate,
                    'FCAmount': FCAmount,
                    'BankId': BankId,
                    'ChequeDtTo': ChequeDtTo,
                    'ChequeDate': ChequeDate,
                    'BillSerId': BillSerId,
                    'AccId': AccountId,
                    'AccCode': AccCode,
                    'Description': VDescription.substring(0, 100),
                    'BaseAmount': Amount,

                    'DelFlag': DelFlag,
                    'UserId': UserId,
                    'DeptId': DeptId,
                    'VoucherTypePrefix': VTypePrefix,
                    'Advance': Advance,
                    'AdvanceAmount': AdvanceAmount,
                    'TransVoucherNo': TransVoucherNo,
                    'PDCAccountId': PDCAccountId,
                    'PDCStatus': PDCStatus,
                    'VEId': VoEId,
                })

              }            
        }
    }
    console.log(oArray)
    if (oArray != "") {        
        var data = { 'PDCReceivedModel': oArray };
        $.ajax(
  {
      type: "POST",
      url: "../AccountsErp/PDCReceivedInsert",
      data: data,
      success: function (result) {
          for (var i = 0; i <= result.oList.length; i++) {
              var status = result.oList[i].Status;
              Showalerts(status);
              formrefresh();
             
          }
      }
  });
    }
}

$(document).keydown(function (e) {
    if (e.altKey && e.keyCode == 83) {                        //Alt+S        
        SaveAndUpdate()
    }
    else if (e.altKey && e.keyCode == 82) {                 //Alt+R        
        window.open('../AccountsReport/AccountsReport')
    }
    else if (e.altKey && e.keyCode == 67) {                  //Alt+C
        formrefresh();
    }
});

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

function Showalerts(Status) {
    var no = $('#PDCNo').val();
    if (Status == 1) {
        formrefresh();
        swal('', 'Cash Updated Successfully', "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
}

function GetList() {

    if ($('#PDCAccount').val() == '') {
        $('#PDCAccountId').val(0)
    }


    if ($('#ChequeDtRadio').is(':checked')) {
        RadFlag = 0;
        var PDCAccountId = $('#PDCAccountId').val();
        var TransferDate = $('#TransferDate').val();
        var ChequeDtFrom = $('#ChequeDtFrom').val();
        var ChequeDtTo = $('#ChequeDtTo').val();
    }
    else if ($('#ChequeNoRadio').is(':checked')) {
       RadFlag = 1;       
        var PDCAccountId = $('#PDCAccountId').val();
        var TransferDate = $('#TransferDate').val();
        var ChequeDtFrom = $('#ChequeDtFrom').val();
        var ChequeDtTo = $('#ChequeDtTo').val();
   }
   else {
       RadFlag = 2;
        var PDCAccountId = $('#PDCAccountId').val();
        var TransferDate = $('#TransferDate').val();
        var ChequeDtFrom = $('#ChequeDtFrom').val();
        var ChequeDtTo = $('#ChequeDtTo').val();
   }
    var data = {};
    data.PDCAccountId = PDCAccountId;
    data.TransferDate = TransferDate;
    data.ChequeDtFrom = ChequeDtFrom;
    data.ChequeDtTo = ChequeDtTo;
    data.ChequeDate = ERPUserId; 
    data.RadFlag = RadFlag;
    $.ajax({
        type: "POST",
        url: "../../AccountsErp/PDCGetandGets",
        data: data,
        success: function (result) {
            ShowPDCList(result.oList);
        }
    });    
}

var l = 0;
function ShowPDCList(result) {
    $('#RowGet').val = '';
    var responseText = "";

    var total = 0; var slno = 0;
     
    for (var l = 0; l < result.length; l++) {
        if ($('#TransferDate').val() == 0) {
            //total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);
            var Desc = (result[l].Description);
            Desc = Desc.substring(0, 50);
            var Ref = (result[l].RefNo);
            Ref = Ref.substring(0, 10);

            if ($("#mybills").prop("checked")) {


                if ($('#UserDetsss').text() == result[l].Description) {

                    slno = parseInt(slno + 1);
                    total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);
                    responseText +=
                        '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row" style="font-width:bold">' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%"><input type="checkbox" data-toggle="tooltip" data-placement="top" data-original-title=' + result[l].BankName + '-' + result[l].VoucherNo + '&#160;&#160;Amount&#160;&#160;:' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '&#160;&#160;MRNO&#160;&#160;:' + result[l].ChequeDtTo + '&#160;&#160;Patient&#160;&#160;:' + result[l].AccDescription + '&#160;&#160;Bill-By-' + result[l].Description + ' id= ' + 'SlNoCheck' + slno + ' onclick=SumChange(' + slno + ')></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%">' + slno + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'BankName' + slno + '>' + result[l].BankName + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherDate' + slno + '>' + result[l].VoucherDate + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%;display:none" id=' + 'VoucherTypePrefix' + slno + '>' + result[l].VoucherTypePrefix + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherNo' + slno + '>' + result[l].VoucherNo + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeNo' + slno + '>' + result[l].ChequeDtTo + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeDate' + slno + '>' + result[l].ChequeDate + '</td>' +
                        '<td class= "jsgrid-cell" style="width:20%" id=' + 'AccDescription' + slno + '>' + result[l].AccDescription + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'BaseAmount' + slno + '>' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" ><input type="text" value=' + result[l].CurrencyId + ' id=' + 'cashrAmount' + slno + ' class="form-control"></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%"><input type="text" value=' + result[l].CurrencyRate + '  id=' + 'cardrAmount' + slno + ' class="form-control" ></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:10%">' + result[l].Description + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%;display:none" id=' + 'AccCode' + slno + '>' + result[l].AccCode + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%;display:none" id=' + 'AccId' + slno + '>' + result[l].AccId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:17%;display:none" id=' + 'Description' + slno + '>' + Desc + '</td>' +
                        '<td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:5%;display:none" id=' + 'RefNo' + slno + '>' + Ref + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'ProjectJobId' + slno + '>' + result[l].ProjectJobId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CostCenterId' + slno + '>' + result[l].CostCenterId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyId' + slno + '>' + result[l].CurrencyId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyRate' + slno + '>' + result[l].CurrencyRate + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'BankId' + slno + '>' + result[l].BankId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'VoEId' + slno + '>' + result[l].VEId + '</td>' +
                        '</tr>';
                }

            }
            else {
                total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);
                slno = parseInt(slno + 1);
                responseText +=
                    '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row" style="font-width:bold">' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%"><input type="checkbox" data-toggle="tooltip" data-placement="top" data-original-title=' + result[l].BankName + '-' + result[l].VoucherNo + '&#160;&#160;Amount&#160;&#160;:' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '&#160;&#160;MRNO&#160;&#160;:' + result[l].ChequeDtTo + '&#160;&#160;Patient&#160;&#160;:' + result[l].AccDescription + '&#160;&#160;Bill-By-' + result[l].Description + ' id= ' + 'SlNoCheck' + slno + ' onclick=SumChange(' + slno + ')></td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%">' + slno + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'BankName' + slno + '>' + result[l].BankName + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherDate' + slno + '>' + result[l].VoucherDate + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherTypePrefix' + slno + '>' + result[l].VoucherTypePrefix + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherNo' + slno + '>' + result[l].VoucherNo + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeNo' + slno + '>' + result[l].ChequeDtTo + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeDate' + slno + '>' + result[l].ChequeDate + '</td>' +
                    '<td class= "jsgrid-cell" style="width:20%" id=' + 'AccDescription' + slno + '>' + result[l].AccDescription + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'BaseAmount' + slno + '>' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" ><input type="text" value=' + result[l].CurrencyId + ' id=' + 'cashrAmount' + slno + ' class="form-control"></td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%"><input type="text" value=' + result[l].CurrencyRate + '  id=' + 'cardrAmount' + slno + ' class="form-control" ></td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:10%">' + result[l].Description + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%;display:none" id=' + 'AccCode' + slno + '>' + result[l].AccCode + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%;display:none" id=' + 'AccId' + slno + '>' + result[l].AccId + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="width:17%;display:none" id=' + 'Description' + slno + '>' + Desc + '</td>' +
                    '<td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:5%;display:none" id=' + 'RefNo' + slno + '>' + Ref + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'ProjectJobId' + slno + '>' + result[l].ProjectJobId + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CostCenterId' + slno + '>' + result[l].CostCenterId + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyId' + slno + '>' + result[l].CurrencyId + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyRate' + slno + '>' + result[l].CurrencyRate + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'BankId' + slno + '>' + result[l].BankId + '</td>' +
                    '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'VoEId' + slno + '>' + result[l].VEId + '</td>' +
                    '</tr>';
            }
        }
        else {

            if (result[l].BankName == $('#TransferDate').val()) {

              
                var Desc = (result[l].Description);
                Desc = Desc.substring(0, 50);
                var Ref = (result[l].RefNo);
                Ref = Ref.substring(0, 10);

                if ($("#mybills").prop("checked")) {
                    if ($('#UserDetsss').text() == result[l].Description) {
                        total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);
                        slno = parseInt(slno + 1);
                        responseText +=
                            '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row" style="font-width:bold">' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%"><input type="checkbox" data-toggle="tooltip" data-placement="top" data-original-title=' + result[l].BankName + '-' + result[l].VoucherNo + '&#160;&#160;Amount&#160;&#160;:' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '&#160;&#160;MRNO&#160;&#160;:' + result[l].ChequeDtTo + '&#160;&#160;Patient&#160;&#160;:' + result[l].AccDescription + '&#160;&#160;Bill-By-' + result[l].Description + ' id= ' + 'SlNoCheck' + slno + ' onclick=SumChange(' + slno + ')></td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%">' + slno + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'BankName' + slno + '>' + result[l].BankName + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherDate' + slno + '>' + result[l].VoucherDate + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherTypePrefix' + slno + '>' + result[l].VoucherTypePrefix + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherNo' + slno + '>' + result[l].VoucherNo + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeNo' + slno + '>' + result[l].ChequeDtTo + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeDate' + slno + '>' + result[l].ChequeDate + '</td>' +
                            '<td class= "jsgrid-cell" style="width:20%" id=' + 'AccDescription' + slno + '>' + result[l].AccDescription + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'BaseAmount' + slno + '>' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" ><input type="text" value=' + result[l].CurrencyId + ' id=' + 'cashrAmount' + slno + ' class="form-control"></td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%"><input type="text" value=' + result[l].CurrencyRate + '  id=' + 'cardrAmount' + slno + ' class="form-control" ></td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:10%">' + result[l].Description + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%;display:none" id=' + 'AccCode' + slno + '>' + result[l].AccCode + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%;display:none" id=' + 'AccId' + slno + '>' + result[l].AccId + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="width:17%;display:none" id=' + 'Description' + slno + '>' + Desc + '</td>' +
                            '<td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:5%;display:none" id=' + 'RefNo' + slno + '>' + Ref + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'ProjectJobId' + slno + '>' + result[l].ProjectJobId + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CostCenterId' + slno + '>' + result[l].CostCenterId + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyId' + slno + '>' + result[l].CurrencyId + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyRate' + slno + '>' + result[l].CurrencyRate + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'BankId' + slno + '>' + result[l].BankId + '</td>' +
                            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'VoEId' + slno + '>' + result[l].VEId + '</td>' +
                            '</tr>';
                    }
                }
                else {
                    total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);
                    slno = parseInt(slno + 1);
                    responseText +=
                        '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row" style="font-width:bold">' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%"><input type="checkbox" data-toggle="tooltip" data-placement="top" data-original-title=' + result[l].BankName + '-' + result[l].VoucherNo + '&#160;&#160;Amount&#160;&#160;:' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '&#160;&#160;MRNO&#160;&#160;:' + result[l].ChequeDtTo + '&#160;&#160;Patient&#160;&#160;:' + result[l].AccDescription + '&#160;&#160;Bill-By-' + result[l].Description + ' id= ' + 'SlNoCheck' + slno + ' onclick=SumChange(' + slno + ')></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%">' + slno + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'BankName' + slno + '>' + result[l].BankName + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherDate' + slno + '>' + result[l].VoucherDate + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherTypePrefix' + slno + '>' + result[l].VoucherTypePrefix + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherNo' + slno + '>' + result[l].VoucherNo + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeNo' + slno + '>' + result[l].ChequeDtTo + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeDate' + slno + '>' + result[l].ChequeDate + '</td>' +
                        '<td class= "jsgrid-cell" style="width:20%" id=' + 'AccDescription' + slno + '>' + result[l].AccDescription + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'BaseAmount' + slno + '>' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" ><input type="text" value=' + result[l].CurrencyId + ' id=' + 'cashrAmount' + slno + ' class="form-control"></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%"><input type="text" value=' + result[l].CurrencyRate + '  id=' + 'cardrAmount' + slno + ' class="form-control" ></td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:10%">' + result[l].Description + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%;display:none" id=' + 'AccCode' + slno + '>' + result[l].AccCode + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%;display:none" id=' + 'AccId' + slno + '>' + result[l].AccId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="width:17%;display:none" id=' + 'Description' + slno + '>' + Desc + '</td>' +
                        '<td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:5%;display:none" id=' + 'RefNo' + slno + '>' + Ref + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'ProjectJobId' + slno + '>' + result[l].ProjectJobId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CostCenterId' + slno + '>' + result[l].CostCenterId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyId' + slno + '>' + result[l].CurrencyId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyRate' + slno + '>' + result[l].CurrencyRate + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'BankId' + slno + '>' + result[l].BankId + '</td>' +
                        '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'VoEId' + slno + '>' + result[l].VEId + '</td>' +
                        '</tr>';

                }
            }




        }
    }
    $('#PDCReceived').append(responseText);
    $('#PDCReceived').html(responseText + '</tbody>');
    $('#RowGet').val(result.length)
    $('#txtRowCount').val(slno + 1);
    $('#TotalAmountAll').val(total.toFixed(decimal));
    $('#TotalAmount').val('0.00');
    if (typeof slno == "undefined") {
        warningshow('Pending Bills Not Found');
    }    
}

function formrefresh() {
    
    $("#ChequeNo").val(CurDate);
    $("#PDCAccount").focus();
    $("#TotalAmount,#TotalAmountAll").val('0.00');
    $("#TransferDate").val(0);
   
    $('#mybills').attr('checked', false);
    $('#ChequeNoRadio').attr('checked', false);
    $("#ChequeDtFrom").val(CurDate);
    $("#ChequeDtTo").val(CurDate);
    $("#ChequeNo").val(CurDate);
    for (var k = 1; k < ($('#txtRowCount').val()) ; k++) {
        $('#row' + k).remove();
    }
    $('#txtRowCount').val(0);
    $('#ChequeDtRadio').attr('checked', true);
}

function Clear() {
    if ($('#txtRowCount').val() == 0) {
        formrefresh();
    }
    else {
        var result = confirm("Do you want to Continue?")
        if (result == true)
            formrefresh();
    }
}

function SumChange(Id) {
    var total = 0;
    if ($("#SlNoCheck" + Id).is(":checked")) {
        total = parseFloat($('#TotalAmount').val() || 0) + parseFloat($('#FCAmount' + Id).text() || 0);
        $('#cashrAmount' + Id).val(parseFloat($('#FCAmount' + Id).text() || 0));
        $("#BankName" + Id).css("background-color", "green");
        $("#VoucherNo" + Id).css("background-color", "green");
        $("#ChequeNo" + Id).css("background-color", "green");
        $("#BaseAmount" + Id).css("background-color", "#993399");
    }
    else {
        total = parseFloat($('#TotalAmount').val() || 0) - parseFloat($('#FCAmount' + Id).text() || 0);
        $('#cashrAmount' + Id).val(0);
        $("#BankName" + Id).css("background-color", "white");
        $("#VoucherNo" + Id).css("background-color", "white");
        $("#ChequeNo" + Id).css("background-color", "white");
        $("#BaseAmount" + Id).css("background-color", "white");


    }
    $('#TotalAmount').val(total.toFixed(decimal));
}

function SelectAll() {    
    var sm = 0;
    var row = $('#txtRowCount').val();
    var flag = $("#SlNoHeadCheck").is(":checked");
    for (var i = 1; i <= row; i++) {
        document.getElementById("SlNoCheck" + i).checked = flag;
        sm = sm + parseFloat($('#FCAmount' + i).text());
        $('#TotalAmount').val(sm.toFixed(decimal));
        $('#cashrAmount' + i).val(parseFloat($('#FCAmount' + i).text() || 0));
      
        $("#BankName" + i).css("background-color", "green");
        $("#VoucherNo" + i).css("background-color", "green");
        $("#ChequeNo" + i).css("background-color", "green");
        $("#BaseAmount" + i).css("background-color", "#993399");
        if (flag == false) {
            $('#TotalAmount').val(0);
            $('#cashrAmount' + i).val(0);           
            $("#BankName" + i).css("background-color", "white");
            $("#VoucherNo" + i).css("background-color", "white");
            $("#ChequeNo" + i).css("background-color", "white");
            $("#BaseAmount" + i).css("background-color", "white");
        }
    }        
}

