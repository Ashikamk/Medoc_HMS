var decimal = Decimal;
var RadFlag = 0;

function serialnoload() {
    var srlno = {};
    srlno.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../AccountsErp/VoucherNoGetandGets",
        data: srlno,
        success: function (result) {
            getslno(result.oList);
        }
    });
}

function AccountLoad() {
    $('#PDCAccountId').val(ERPUserId)
    $("#PDCAccount").val($('#UserDetsss').text())

   
}

function getacno(result) {
    for (var k = 0; k < result.length; k++) {
        if (k == 0) {
            $('#PDCAccount').val(result[k].TaxAcc);
            $('#PDCAccountId').val(result[k].TaxAccId);
        }
        else if (k == 1) {
            $('#BankAccount').val(result[k].TaxAcc);
            $('#BankAccountId').val(result[k].TaxAccId);
        }
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
    serialnoload();
    AccountLoad();

    $("#TotalAmount,#TotalAmountAll,#TotalAmountupi").val('0.00');

    $('#TransferDate,#ChequeDtFrom,#ChequeDtTo').daterangepicker({
        minDate: new Date('1/1/2000'),
       // maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });


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
        if ($('#ChequeDtRadio').is(':checked')) {
            $('#ChequeDtFrom').prop('disabled', false);
            $('#ChequeDtTo').prop('disabled', false);
            $('#ChequeNo').attr('disabled', true);
            $("#ChequeNo").val('');
        }
    });

    $('#ChequeNoRadio').click(function () {
        if ($('#ChequeNoRadio').is(':checked')) {
            $('#ChequeNo').attr('disabled', false);
            $('#ChequeDtFrom').prop('disabled', true);
            $('#ChequeDtTo').prop('disabled', true);
            $("#ChequeDtFrom").val(CurDate);
            $("#ChequeDtTo").val(CurDate);
        }
    });

    $("#btnsubmit").click(function (e) {
    SaveAndUpdate()
    });

    GetList();

});

function SaveAndUpdate() {
    var amot = parseFloat($('#TotalAmount').val() || 0);
   
    if (parseInt($('#PDCAccountId').val()||0) == 0) {
        warningshow('Please select User Or Refresh this page', 'PDCAccount');
    }

    else if (parseInt($('#TotalCashcolect').text() || 0) == 0) {
        warningshow('Please select Collected bills', '');
    }
    else if (parseInt($('#TotalCashhand').text() || 0) == 0) {
        warningshow('Please Enter Cash in Hand', '');
    }
    
    else {

        var Cur = ""; var A = ""; var B = ""; var C = "";
        for (var x = 1; x <= 9; x++) {
            debugger;
            A = $('#Denom' + x).text(); B = $('#Qty' + x).val(); C = $('#Total' + x).text()
            if (B != 0) {
                Cur = Cur + A.toString() + ' X ' + B.toString() + ' = ' + C.toString() + ' ,'
            }
        }

        $('#btnsubmit').prop('disabled', true);


        var Count = parseInt($('#txtRowCount').val())
        var oArray = new Array();
        for (var i = 1; i < Count; i++) {
            if ($("#SlNoCheck" + i).is(":checked")) {
                var VoucherTypeId = 0;
                var VoucherDate = $('#TransferDate').val();
                var VoucherNo = 0;
                var VType = 'D';
                var ReferenceNo = $('#RefNo' + i).text();
                var ProjectJobId = $('#ProjectJobId' + i).text();
                var CostCenterId = $('#CostCenterId' + i).text();
                var CurrencyId = $('#CurrencyId' + i).text();
                var CurrencyRate = $('#TotalCashdiff').text();
                var FCAmount = $('#TotalCashhand').text();
                var BankId = $('#BankId' + i).text();
                var ChequeDtTo = $('#ChequeNo' + i).text();//Cheque No
                var ChequeDate = $('#ChequeDate' + i).text();
                var BillSerId =parseInt($('#BaseAmountcrd' + i).text()||0)
                var AccountId = $('#PDCAccountId').val();
                var AccCode = $('#PDCAccount').val();
                var VDescription = Cur;
                var Amount = $('#TotalAmount').val();
                DelFlag = 1;
                var UserId = ERPUserId;
                var DeptId = ERPDeptId;
                var VTypePrefix = "DB";
                var Advance = "False";
                var AdvanceAmount = 0;
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
        var data = { 'PDCIssuedModel': oArray };
        $.ajax(
  {
      type: "POST",
      url: "../AccountsErp/PDCIssuedInsert",
      data: data,
      success: function (result) {
          for (var i = 0; i <= result.oList.length; i++) {
              var status = result.oList[i].Status;
              $('#btncancell').click();
              Showalerts(status);
              formrefresh();
              serialnoload();
              AccountLoad();
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
        swal('Closing No -' + no +'', 'Bill Settled Successfully', "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        GetList();
        swal('Data' , "Deleted Successfully", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }
}

function getslno(result) {
    for (var k = 0; k < result.length; k++) {
        $('#PDCNo').val(result[k].CBNo);
    }
}


function GetList() {
   
    if ($('#ChequeDtRadio').is(':checked')) {
        RadFlag = 1;
        var PDCAccountId = $('#PDCAccount').val();
        var TransferDate = $('#TransferDate').val();
        var ChequeDtFrom = $('#ChequeDtFrom').val();
        var ChequeDtTo = $('#ChequeDtTo').val();
    }
    else if ($('#ChequeNoRadio').is(':checked')) {
        RadFlag = 2;
        var PDCAccountId = $('#PDCAccount').val();
        var TransferDate = $('#TransferDate').val();
        var ChqNo = $('#ChequeNo').val();
    }
    else {
        RadFlag = 0;
        var PDCAccountId = $('#PDCAccount').val();
        var TransferDate = $('#TransferDate').val();
        var ChequeDtFrom = 0;
        var ChequeDtTo = 0;
        var ChqNo = 0;
    }

    var PDCAccountId = $('#PDCAccountId').val();
    var TransferDate = $('#TransferDate').val();
    var ChequeDtFrom = $('#ChequeDtFrom').val();
    var ChequeDtTo = $('#ChequeDtTo').val();


    var data = {};
    data.PDCAccountId = PDCAccountId;
    data.TransferDate = TransferDate;
    data.ChequeDtFrom = ChequeDtFrom;
    data.ChequeDtTo = ChequeDtTo;
    data.ChequeDate = ChqNo; 
    data.RadFlag = RadFlag;
    $.ajax({
        type: "POST",
        url: "../../AccountsErp/PDCIsGetandGets",
        data: data,
        success: function (result) {
            if (PDCAccountId != 0)
                ShowPDCList(result.oList);
        }
    });
}

var l = 0;
function ShowPDCList(result) {
    $('#RowGet').val = '';
    var responseText = "";

    var total = 0; totalupi = 0; totCard = 0;

    for (var l = 0; l < result.length; l++) {

        total = parseFloat(total) + parseFloat(result[l].BaseAmount || 0);

        totalupi = parseFloat(totalupi) + parseFloat(result[l].AccCode || 0);

        totCard = parseFloat(totCard) + parseFloat(result[l].CurrencyRate || 0);

        var Desc = (result[l].Description);
        Desc = Desc.substring(0, 47);

        var Ref = (result[l].RefNo);
        Ref = Ref.substring(0, 10);

        var slno = parseInt(l + 1);
        responseText +=
            '<tr id= ' + 'row' + slno + ' class="jsgrid-header-row">' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%"><input type="checkbox" id= ' + 'SlNoCheck' + slno + ' onclick=SumChange(' + slno + ')></td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:2%">' + slno + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%" id=' + 'ChequeNo' + slno + '>' + result[l].ChequeDtTo + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'ChequeDate' + slno + '>' + result[l].ChequeDate + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%" id=' + 'BankName' + slno + '>' + result[l].BankName + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%" id=' + 'BaseAmount' + slno + '>' + parseFloat(result[l].BaseAmount).toFixed(decimal) + '</td>' +         

        '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'AccCode' + slno + '>' + result[l].AccCode + '</td>' +


        '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%" id=' + 'BaseAmountcrd' + slno + '>' + parseFloat(result[l].CurrencyRate).toFixed(decimal) + '</td>' +

            '<td class= "jsgrid-cell jsgrid-align-center" style="width:7%;display:none" id=' + 'AccId' + slno + '>' + result[l].AccId + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:20%;text-align:left" id=' + 'AccDescription' + slno + '>' + result[l].AccDescription + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:3%" id=' + 'VoucherTypePrefix' + slno + '>' + result[l].VoucherTypePrefix + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:4%" id=' + 'VoucherNo' + slno + '>' + parseFloat(result[l].VoucherNo).toFixed(decimal)  + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'VoucherDate' + slno + '>' + result[l].VoucherDate + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="width:17%;text-align:left" id=' + 'Description' + slno + '>' + result[l].Description + '</td>' +
            '<td class= "recamountcss jsgrid-cell jsgrid-align-center" style="width:5%" id=' + 'RefNo' + slno + '>' + Ref + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'ProjectJobId' + slno + '>' + result[l].ProjectJobId + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CostCenterId' + slno + '>' + result[l].CostCenterId + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyId' + slno + '>' + result[l].CurrencyId + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'CurrencyRate' + slno + '>' + result[l].CurrencyRate + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'FCAmount' + slno + '>' + result[l].FCAmount + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'BankId' + slno + '>' + result[l].BankId + '</td>' +
            '<td class= "jsgrid-cell jsgrid-align-center" style="display:none" id=' + 'VoEId' + slno + '>' + result[l].VEId + '</td>' +

        '<td class="jsgrid-align-center crspnt" style="width:2%" onclick=DeleteRowwww(0,' + result[l].VEId  + ')><i class="icon-trash"></i></td>' +
            '</tr>';
    }
    $('#PDCReceived').append(responseText);
    $('#PDCReceived').html(responseText + '</tbody>');
    $('#RowGet').val(result.length)
    $('#txtRowCount').val(slno + 1);
    $('#TotalAmountAll').val(total.toFixed(decimal));
    $('#TotalAmountupi').val(totalupi.toFixed(decimal));
    $('#TotalAmountcrd').val(totCard.toFixed(decimal));


    
    $('#TotalAmount').val('0.00');
    
    if (typeof slno == "undefined") {
        warningshow('Collection Not Found');
    }
}



var DeleteRowID = 0;
function DeleteRowwww(D,DID) {
    DeleteRowID = DID;
    $('#Confirmflag').val('DeleteBill');
    $('#ConfirmRowId').val(0);
    $('#confirmmessage').text('Do You Want To Delete this Entry?');
    $('#confirm').show();
    $('#confirmOk').focus();
}




function ConfirmboxResult(Result, status, rowid) {
    debugger;

    var data = {};
    data.BillNo = DeleteRowID;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Status = 'CB';
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_Cashpaymentdelete",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            var BillNo = result.oList[0].BillNo;
           
            Showalerts(status, BillNo, 0);
        }
    });
   
    $('#confirm').fadeOut();
}


function formrefresh() {
    AccountLoad();
    $("#PDCAccount").focus();
    $("#TotalAmount,#TotalAmountAll").val('0.00');
    $("#TransferDate").val(CurDate);
    $('#ChequeDtRadio').attr('checked', false);
    $('#ChequeNoRadio').attr('checked', false);
    $("#ChequeDtFrom").val(CurDate);
    $("#ChequeDtTo").val(CurDate);
    $("#ChequeNo").val('');
    for (var k = 1; k < ($('#txtRowCount').val()) ; k++) {
        $('#row' + k).remove();
    }
    $('#txtRowCount').val(0);
    $('#btnsubmit').prop('disabled', false);

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
        total = parseFloat($('#TotalAmount').val() || 0) + parseFloat($('#BaseAmount' + Id).text() || 0);
    }
    else {
        total = parseFloat($('#TotalAmount').val() || 0) - parseFloat($('#BaseAmount' + Id).text() || 0);
    }
    $('#TotalAmount').val(total.toFixed(decimal));
}

function SelectAll() {
    var sm = 0;
    var row = $('#txtRowCount').val();
    var flag = $("#SlNoHeadCheck").is(":checked");
    for (var i = 1; i <= row; i++) {
        document.getElementById("SlNoCheck" + i).checked = flag;
        sm = sm + parseFloat($('#BaseAmount' + i).text());
        $('#TotalAmount').val(sm.toFixed(decimal));
        if (flag == false) {
            $('#TotalAmount').val(0);
        }
    }
}
var bal = 0;

function balload() {
    var BankAccount = $('#BankAccount').val();
    var data = {};
    data.BankAccount = BankAccount;
  
    $.ajax({
        type: "POST",
        url: "../../AccountsErp/BankbalGetandGets",
        data: data,
        success: function (result) {

            
            
            
           
            bal = result.oList[0].bal;
           

           
           
          
                
        }
    });
}
