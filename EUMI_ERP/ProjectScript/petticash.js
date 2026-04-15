//VType - Credit:C/Debit:D
var decimal = Decimal;
var editflag = 0;
var Dept = ERPDeptId
var UserId = ERPUserId
serialnoload();






    function VoucherTypeLoad(result) {
  
        $("#VoucherType").empty();
        VoucherType = "<option value='0'>Select</option>";
        for (var i = 0; i < 5; i++) {
            VoucherType += "<option value='" + result[i].VoucherTypeId + "'name=" + result[i].Description + ">" + result[i].Description + "</option>";
        }
        VoucherType += "<option value='" + result[5].VoucherTypeId + "'name=" + result[5].Description + ">" + result[5].Description + "</option>";
        VoucherType += "<option value='" + result[10].VoucherTypeId + "'name=" + result[10].Description + ">" + result[10].Description + "</option>";
        VoucherType += "<option value='" + result[11].VoucherTypeId + "'name=" + result[11].Description + ">" + result[11].Description + "</option>";
        VoucherType += "<option value='" + result[12].VoucherTypeId + "'name=" + result[12].Description + ">" + result[12].Description + "</option>";
        $("#VoucherType").append(VoucherType);
    }

    var bankcodecheck;
    var pdcrcodecheck;
    var pdcicodecheck;

    function AccountCheck(result) {




        bankcodecheck = result[1].AccountTypeId;

        pdcicodecheck = result[2].AccountTypeId;


    }
    function AccountCheck1(result) {





        pdcrcodecheck = result[2].AccountTypeId;

    }
    function ProjectJobLoad(result) {
        $("#JobCode").empty();
        JobCode = "<option value='0'>Select</option>";
        for (var i = 0; i < result.length; i++) {
            JobCode += "<option value='" + result[i].ProjectJobId + "'name=" + result[i].JobCode + ">" + result[i].JobCode + "</option>";
        }
        $("#JobCode").append(JobCode);
    }
    function CostCenterLoad(result) {
        $("#CostCenterName").empty();
        CostCenterName = "<option value='0'>Select</option>";
        for (var i = 0; i < result.length; i++) {
            CostCenterName += "<option  value='" + result[i].CostCenterId + "' name='" + result[i].CostCenterName + "'>" + result[i].CostCenterName + "</option>";
        }
        $("#CostCenterName").append(CostCenterName);
    }

    var BaseCurrency = 0;
    function CurrencyLoad(result) {
        $("#Currency").empty();
        CurrencySelect = "<option value=0>Select</option>";
        for (var i = 0; i < result.length; i++) {
            if (result[i].BaseCurrencyId != 0) {
                BaseCurrency = result[i].BaseCurrencyId;
            }
            CurrencySelect += "<option  name='" + result[i].CurrencyRate + "' value='" + result[i].Id + "'>" + result[i].CurrencyName + "</option>"
        }
        $("#Currency").append(CurrencySelect);
        $('#Currency').val(BaseCurrency);
        $("#Rate").val($("#Currency").find("option:selected").attr("name"));
    }
    function BankLoad(result) {
        $("#Bank").empty();
        Bank = "<option value='0'>Select</option>";
        for (var i = 0; i < result.length; i++) {
            Bank += "<option value='" + result[i].BankId + "'name=" + result[i].BankName + "'>" + result[i].BankName + "</option>";
        }
        $("#Bank").append(Bank);
    }

    function CustEmpty() {
        $('#supplierId0').val('');

        $(document).keydown(function (e) {
            if (e.altKey && e.keyCode == 65) {                        //Alt+A        
                $('#Employee').prop('disabled', false);
                $('#Employee').focus();

            }
        });
    }
    function EmpEmpty() {
        $('#EmployeeId0').val('');
    }

    function CurrencyChange(Id) {
        $('#Rate').val($('#' + Id).find("option:selected").attr("name"));
        var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
        $('#FCAmount').val(fcamt.toFixed(decimal));
        $('#AmountFC').val(fcamt.toFixed(decimal));
    }

    function CurrencyChangeGrid(Id) {
        var fcamt = 0;
        $('#Rate' + Id).val($('#CurrencyId' + Id).find("option:selected").attr("name"));
        var fcamt = parseFloat($('#Amount' + Id).val() || 0) / parseFloat($('#Rate' + Id).val() || 0);
        $('#FCAmount' + Id).val(fcamt.toFixed(decimal));
    }

    function CalcFCAmount() {
        var fcamt = parseFloat($('#Amount').val() || 0) / parseFloat($('#Rate').val() || 0);
        fcamt = isNaN(fcamt) ? 0 : fcamt;
        $('#FCAmount').val(fcamt.toFixed(decimal));
        $('#AmountFC').val(fcamt.toFixed(decimal));
    }

    function CalAmount() {
        var fc = parseFloat($("#FCAmount").val() || 0) * parseFloat($("#Rate").val() || 0);
        fc = isNaN(fc) ? 0 : fc;
        $("#AmountCon").val(fc.toFixed(decimal));
        $("#AmountFC").val($("#FCAmount").val());
    }

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


    function getslno(result) {
 
        $('#VoucherNo').val(result[0].PettyCashPrint);
      
    }

    function VoucherNoGets(result) {
        $('#Del').hide();
        GridRemove();
        if (result.length == 0) {
            warningshow('Invalid Voucher No');
            $('#TransferVoucherNo').val('');
            $('#VType').prop('disabled', false);
            $('#AccountName').prop('disabled', false);
            $('#AccountNamebtn').prop('disabled', false);
            $('#VoucherEntryDescription').prop('disabled', false);
            $('#Amount').prop('disabled', false);
            $('#TaxNo').prop('disabled', false);
            $('#btnadd').prop('disabled', false);
            $('#JobandFC').prop('disabled', false);
            $('#InvoiceSettlement').prop('disabled', false);
            $('#TransferVoucherNo').focus();
        }
        else {

            for (var n = 0; n < result.length; n++) {
                var slno = parseInt(n + 1);

                if (result[n].VType == 'D') {
                    var VoType = 'Debit';
                }
                else {
                    var VoType = 'Credit';
                }

                var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + slno + "</td><td class= jsgrid-cell  style= width:50px;text-align:center;display:none >" + result[n].BillSerNo + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:150px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VType' + slno + " value=" + VoType + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' hidden id=" + 'AccountId' + slno + " value=" + result[n].AccountName + ">" + result[n].AccountName + " </td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + "'" + result[n].VoucherEntryDescription + "'" + "></td><td class= jsgrid-cell id=" + 'InvoDate' + slno + "  style= width:50px;text-align:center >" + result[n].InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[n].Amount + " onkeyup='EditGirdAmount()'></td>    </tr>";

               // var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + slno + "</td>      <td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VType' + slno + " value=" + "'" + result[n].VoType + "'" + "></td>             <td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' hidden id=" + 'AccountId' + slno + " value=" + result[n].AccountName + ">" + result[n].AccountName + " </td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + "'" + result[n].VoucherEntryDescription + "'" + "></td><td class= jsgrid-cell id=" + 'InvoDate' + slno + "  style= width:50px;text-align:center >" + result[n].InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[n].Amount + " onkeyup='EditGirdAmount()'></td>    </tr>";

                $('#tblvoucherentry').append(VoucherRow);

                $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
            }
        }
        var deb = 0;
        var cre = 0;
        var diff = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
    }

    var rowchk = 0;
    var chek = 0;
    var ppoo = 0;
    var salaryflag = 0;
    $(document).ready(function () {
  
        $('#TransferSalary').val(CurDate);
        var chek = 0;
        var rowchk = 0;
        // var salaryflag = 0;
        //  var ppoo = 0;
        $("#VoucherNo").keydown(function (e) {

            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#VType').prop('disabled', true);
                $('#AccountName').prop('disabled', true);
                $('#AccountNamebtn').prop('disabled', true);
                $('#VoucherEntryDescription').prop('disabled', true);
                $('#Amount').prop('disabled', true);
                $('#TaxNo').prop('disabled', true);
                $('#btnadd').prop('disabled', true);
                $('#JobandFC').prop('disabled', true);
                $('#InvoiceSettlement').prop('disabled', true);
                $('#thJobCode,#thCostCode').hide();
                $('#empname').hide();
                $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc').hide();
                e.preventDefault();
                var VoucherNo = $('#VoucherNo').val();
                var VoucherTypeId = 4;
                var srlno = {};
                srlno.DeptId = VoucherNo;
                srlno.VType = VoucherTypeId;
                $.ajax({
                    type: "POST",
                    url: "../AccountsErp/VoucherEntryGetandGetss",
                    data: srlno,
                    success: function (result) {
                        VoucherNoGets(result.oList);
                        serialnoload();
                        $('#btnsubmit').focus();
                    }
                });
            }

        });


        $('#hiddenrow').val('');
        $('#proddiv').animate({ scrollTop: 5000 }, 900);
        var data1 = {};
        data1.VoucherTypeId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/VoucherTypeGetandGets",
            data: data1,
            success: function (result) {
                VoucherTypeLoad(result.oList);
            }
        });

        serialnoload();
        $('#Credittxt').val('0.00');
        $('#Debittxt').val('0.00');
        $('#Differencetxt').val('0.00');
        $('#Acbal').val("0.00");
        Defaultfocus();


        $('#btnadd').click(function () {
            VoucherEntryAdd();
        });
        var data2 = {};
        data2.AccountTypeId = 0;
        data2.DeptId = ERPDeptId;
        data2.flag = 2;
        $.ajax({
            type: "POST",
            url: "../Master/AccountTypeGetandGets",
            data: data2,
            success: function (result) {
                AccountCheck(result.oList);
            }
        });
        var data0 = {};
        data0.AccountTypeId = 0;
        data0.DeptId = ERPDeptId;
        data0.flag = 1;
        $.ajax({
            type: "POST",
            url: "../Master/AccountTypeGetandGets",
            data: data0,
            success: function (result) {
                AccountCheck1(result.oList);
            }
        });
        var data3 = {};
        data3.Id = 0;
        $.ajax({
            type: "POST",
            url: "../Master/CurrencyGetandGets",
            data: data3,
            success: function (result) {
                CurrencyLoad(result.oList);
            }
        });

        var data4 = {};
        data4.ProjectJobId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/ProjectJobGetandGets",
            data: data4,
            success: function (result) {
                ProjectJobLoad(result.oList);

            }
        });

        var data5 = {};
        data5.CostCenterId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/CostCenterGetandGets",
            data: data5,
            success: function (result) {
                CostCenterLoad(result.oList);

            }
        });

        var data6 = {};
        data6.BankId = 0;
        $.ajax({
            type: "POST",
            url: "../Master/BankGetandGets",
            data: data6,
            success: function (result) {
                BankLoad(result.oList);

            }
        });


        if (getQueryString('vno') != null) {
            $('#TransferVoucherNo').val(getQueryString('vno'))
            var vno = {};
            vno.VoucherNo = getQueryString('vno');

            $.ajax({
                type: "POST",
                url: "../AccountsErp/TVoucherNoGetandGets",
                data: vno,
                success: function (result) {
                    VoucherNoGets(result.oList);
                }
            });
        }
        else {
            Defaultfocus();
            serialnoload();
        }




        $("#VoucherType").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {

                $('#VoucherDate').focus();
                e.preventDefault();
            }
        });
        //$("#Employee").keydown(function (e) {
        //    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        //    if (key == 13) {
        //        $('#VType').focus();
        //        e.preventDefault();
        //    }
        //});
        $("#VoucherDate").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {

                if (ppoo == 1) {
                    $('#Amount').focus();
                }
                else {
                    $('#VType').focus();
                }

                e.preventDefault();
            }
        });

        $("#VType").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {

                $('#AccountName').focus();
                e.preventDefault();
            }
        });
        $("#AccountName").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#VoucherEntryDescription').focus();
                e.preventDefault();
            }
        });
        $("#VoucherEntryDescription").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#Amount').focus();
                e.preventDefault();
            }
        });
        $("#Amount").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#btnadd').focus();
                e.preventDefault();
            }
        });
        $("#TaxNo").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#JobandFC').focus();
                e.preventDefault();
            }
        });
        $("#JobandFC").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                $('#btnadd').focus();
                e.preventDefault();
            }
        });
        $("#InvoiceSettlement").keydown(function (e) {
            $('#btnadd').focus();
        });

        $('#VoucherDate,#TransferSalary,#ChequeDate').daterangepicker({
            minDate: new Date('1/1/2000'),

            //maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
            singleDatePicker: true,
            showDropdowns: true,
            locale: {
                format: 'DD/MM/YYYY'
            }

        });
    });

    $(document).keydown(function (e) {
        if (e.altKey && e.keyCode == 83) {                        //Alt+S        
            $("#btnsubmit").click();
        }
        else if (e.altKey && e.keyCode == 82) {                 //Alt+R        
            window.open('../AccountsReport/AccountsReport')
        }
        else if (e.altKey && e.keyCode == 67) {                  //Alt+C
            formrefresh();
        }
        else if (e.keyCode == 27) {                           //esc
            $('#Popup').hide();
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
    function Defaultfocus() {
        $('#VType').focus();
    }

    function Expandtbl() {
        if ($('#Bank').is(":visible"))
            $("#tblvoucherentry").width("100%");
        else
            $("#tblvoucherentry").width("2500px");
    }


    function formrefresh() {
        if (editflag != 0) {
            warningshow('Please cancel Edit Mode');
            return false;
        }
        else {
            $('#btnsubmit').prop('disabled', false);
            serialnoload();
            $('#TransferVoucherNo').prop('disabled', false);
            salaryflag = 0;
            ppoo = 0;
            $('#Employee').val('');
            $('#EmpCode').val('');
            $('#EmployeeId0').val('');
            $("#btnsubmit").prop('disabled', false);
            $("#btnlist").prop('disabled', false);          
            $('#Employee').prop('disabled', true);
            $('#TransferVoucherNo').val('');
            $('#VoucherDate').val(CurDate);
            $('#TransferSalary').val(CurDate);

            $('#VoucherType').val('0');
            $('#VType').val('Debit');
            $('#AccountName').val('');
            $('#supplierId0').val('');
            $('#VoucherEntryDescription').val('');
            $('#TaxNo').val('');
            $('#Amount').val('');
            $('#ReferenceNo').val('');
            $('#JobCode').val('0');
            $('#CostCenterName').val('0');
            $('#Currency').val(BaseCurrency);
            $("#Rate").val($("#Currency").find("option:selected").attr("name"));
            $('#FCAmount').val('');
            $('#trxtype').val(0);
            $('#ChequeNo').val('');
            $('#ChequeDate').val('');
            $('#Bank').val('0');
            $('#PDCAccount').val('');
            $('#VoucherEntryId').val(0);
            $('#hiddenrow').val('');
            $('#btndelete').hide();                     
            $('#btnprint').hide();
            $('#VoucherType').focus();
            for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
                $('#row' + k).remove();
            }
            $('#slnotxt').val('1');
            $('#thJobCode,#thCostCode').hide();
            $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc').hide();
            $('#empname').hide();
            $('#Credittxt').val('0.00');
            $('#Debittxt').val('0.00');
            $('#Differencetxt').val('0.00');
            $('#Acbal').val("0.00");
            $("#tblvoucherentry").width("100%");
            $('#VType').prop('disabled', false);
            $('#AccountName').prop('disabled', false);
            $('#AccountNamebtn').prop('disabled', false);
            $('#VoucherEntryDescription').prop('disabled', false);
            $('#VoucherEntryDescription').prop('disabled', false);
            $('#Amount').prop('disabled', false);
            $('#btnadd').prop('disabled', false);
            $('#JobandFC').prop('disabled', false);
            $('#InvoiceSettlement').prop('disabled', false);
            $('#VoucherNo,#VoucherDate').prop("disabled", true);
            $('#Del').show();
            Defaultfocus();
           
        }
    }










    function GetRows() {

                $('#grid-row-label').show();
                $('#customView').show();
                $('#purchaseinvoiceno').show();
                $('#btnlist').prop("disabled", true);
                $('#VoucherNo').prop("disabled", false);
               
                $('#VoucherDate').prop("disabled", true);
                $('#Credittxt').prop("disabled", true);
                $('#Debittxt').prop("disabled", true);
                $('#VType').prop("disabled", true);
                $('#AccountName').prop("disabled", true);
                $('#AccountNamebtn').prop("disabled", true);
                $('#VoucherEntryDescription').prop("disabled", true);
                $('#Amount').prop("disabled", true);
                $('#btnadd').prop("disabled", true);
                $('#btnprint').show();
                $('#btnsubmit').prop("disabled", true);
                $('#Differencetxt').val();
                $('#VoucherNo').focus();
                $('#VoucherNo').select();


    }


   









    function Clear() {        
        if ($('#slnotxt').val() < 2) {
            formrefresh();
        }
        else {
            var result = confirm("Do you want to Continue?")
            if (result == true)
                formrefresh();
        }
    }

    function gridrefresh() {
        $('#AccountName').val('');
        $('#supplierId0').val('');
        $('#VoucherEntryDescription').val('');
        $('#TaxNo').val('');
        $('#Amount').val('');
        $('#ReferenceNo').val('');
        $('#JobCode').val('0');
        $('#CostCenterName').val('0');
        $('#Currency').val(BaseCurrency);
        $("#Rate").val($("#Currency").find("option:selected").attr("name"));
        $('#FCAmount').val('');
        $('#trxtype').val(0)
        $('#ChequeNo').val('');
        $('#ChequeDate').val('');
        $('#Bank').val('0');
        $('#Acbal').val('0.00');
        $('#PDCAccount').val('');
        if ($('#VType').val() == 'Debit') {
            $('#VType').val('Credit');
        }
        else {
            $('#VType').val('Debit');
        }
        $('#VType').focus();
    }

    function GridRemove() {
        for (var k = 1; k < ($('#slnotxt').val()) ; k++) {
            $('#row' + k).remove();
        }
    }

    function Editrow(RowId) {

        editflag = editflag + 1;
        $('#row' + RowId).children('td,th').css('background-color', 'rgb(232,226,226)');
        $('#edit_' + RowId).hide();
        $('#update_' + RowId).show();
        vtype = $('#VType' + RowId).val();
        ved = $('#VoucherEntryDescription' + RowId).val();
        amt = $('#Amount' + RowId).val();
        pjid = $('#ProjectJobId' + RowId).val();
        ccid = $('#CostCenterId' + RowId).val();
        cid = $('#CurrencyId' + RowId).val();
        rt = $('#Rate' + RowId).val();
        fca = $('#FCAmount' + RowId).val();
        trx = $('#trxtype' + RowId).val();
        bid = $('#BankId' + RowId).val();
        cno = $('#ChequeNo' + RowId).val();
        cdt = $('#ChequeDate' + RowId).val();

        // $('#VType' + RowId).prop('disabled', false);
        $('#VoucherEntryDescription' + RowId).prop('disabled', false);
        // $('#Amount' + RowId).prop('disabled', false);
        $('#TaxNo' + RowId).prop('disabled', false);
        $('#ProjectJobId' + RowId).prop('disabled', false);
        $('#CostCenterId' + RowId).prop('disabled', false);
        $('#CurrencyId' + RowId).prop('disabled', false);
        $('#Rate' + RowId).prop('disabled', false);
        $('#FCAmount' + RowId).prop('disabled', false);
        $('#trxtype' + RowId).prop('disabled', false);
        $('#BankId' + RowId).prop('disabled', false);
        $('#ChequeNo' + RowId).prop('disabled', false);
        $('#ChequeDate' + RowId).prop('disabled', false);
    }


    function CancelEditRow(RowId) {

        editflag = editflag - 1;
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        $('#VType' + RowId).val(vtype);
        $('#VoucherEntryDescription' + RowId).val(ved);
        $('#Amount' + RowId).val(amt);
        $('#ProjectJobId' + RowId).val(pjid);
        $('#CostCenterId' + RowId).val(ccid);
        $('#CurrencyId' + RowId).val(cid);
        $('#Rate' + RowId).val(rt);
        $('#FCAmount' + RowId).val(fca);
        $('#trxtype' + RowId).val(trx)
        $('#BankId' + RowId).val(bid);
        $('#ChequeNo' + RowId).val(cno);
        $('#ChequeDate' + RowId).val(cdt);
        $('#VType' + RowId).prop('disabled', true);
        $('#AccountId' + RowId).prop('disabled', true);
        $('#VoucherEntryDescription' + RowId).prop('disabled', true);
        $('#Amount' + RowId).prop('disabled', true);
        $('#TaxNo' + RowId).prop('disabled', true);
        $('#ProjectJobId' + RowId).prop('disabled', true);
        $('#CostCenterId' + RowId).prop('disabled', true);
        $('#CurrencyId' + RowId).prop('disabled', true);
        $('#Rate' + RowId).prop('disabled', true);
        $('#FCAmount' + RowId).prop('disabled', true);
        $('#trxtype' + RowId).prop('disabled', true);
        $('#BankId' + RowId).prop('disabled', true);
        $('#ChequeNo' + RowId).prop('disabled', true);
        $('#ChequeDate' + RowId).prop('disabled', true);
        $('#edit_' + RowId).show();
        $('#update_' + RowId).hide();
    }

    function UpdateRow(RowId) {
        editflag = editflag - 1;
        $('#row' + RowId).children('td,th').css('background-color', 'white');
        if ($('#Amount' + RowId).val() == "") {
            warningshow('Please enter amount', 'Amount' + RowId);
            return false
        }

        else {
            $('#update_' + RowId).hide();
            $('#edit_' + RowId).show();
            $('#VType' + RowId).prop('disabled', true);
            $('#VoucherEntryDescription' + RowId).prop('disabled', true);
            $('#Amount' + RowId).prop('disabled', true);
            $('#ProjectJobId' + RowId).prop('disabled', true);
            $('#CostCenterId' + RowId).prop('disabled', true);
            $('#CurrencyId' + RowId).prop('disabled', true);
            $('#Rate' + RowId).prop('disabled', true);
            $('#FCAmount' + RowId).prop('disabled', true);
            $('#BankId' + RowId).prop('disabled', true);
            $('#ChequeNo' + RowId).prop('disabled', true);
            $('#ChequeDate' + RowId).prop('disabled', true);
        }
    }

    function rowdelete(RowId) {
        var sllno = 1;
        var h = $('#hiddenrow').val();



        var Res = confirm("Do You Want Delete this record?")
        if (Res == true) {
            var amt = $('#Amount' + RowId).val();
            if ($('#VType' + RowId).val() == 'Debit') {
                var deb = 0;
                deb = parseFloat($('#Debittxt').val()) - amt;
                $('#Debittxt').val(deb.toFixed(decimal));
                var diff = 0;
                diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
                $('#Differencetxt').val(diff.toFixed(decimal));
            }
            else {
                var cre = 0;
                cre = parseFloat($('#Credittxt').val()) - amt;
                $('#Credittxt').val(cre.toFixed(decimal));
                var diff = 0;
                diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
                $('#Differencetxt').val(diff.toFixed(decimal));
            }
            $('#row' + RowId).remove();
            for (var j = 1; j <= h - 1; j++) {
                if ($('#AccountId' + j).val() != undefined) {
                    $('#td' + j).text(sllno);
                    sllno++;
                }
            }
        }

        var rowCount = document.getElementById('tblvoucherentry').rows.length;

        if (rowCount == 1) {
            gridrefresh();
        }
    }

    function VoucherEntryAdd() {
        var amto = parseFloat($('#Amount').val() || 0);
        // balload();


        var slno = parseInt($('#slnotxt').val())
        if ($.trim($('#AccountName').val()) == "") {
            warningshow('Please Select Account', 'AccountName');
            return false;
        }
        if ($('#supplierId0').val() == "") {
            warningshow('Please Select A Vaild Account', 'AccountName');
            return false;
        }
        if ($.trim($('#Amount').val()) == "") {
            warningshow('Please enter Amount', 'Amount');
            return false;
        }
        if ($('#VType').val() == 'Credit' && amto > balo && $('#supplierId0').val() == bankcodecheck) {


            warningshow('Not Enough Balance In Bank Account', 'btnadd');
            return false;


        }
        if (($('#supplierId0').val() == bankcodecheck || $('#supplierId0').val() == pdcrcodecheck || $('#supplierId0').val() == pdcicodecheck) && chek == 0) {
            Addpopupwindow(2);
            return false;
        }
        var no = $('#tblvoucherentry tr').length;
        var amt = 0;
        amt = parseFloat($("#Amount").val());

        if (($('#thJobCode').is(":hidden") && $('#thFC').is(":hidden")) || rowchk == 0) {
            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "> </td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit >Credit</option><option value=Debit>Debit</option></select> </td><td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id="+'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + ($.trim($("#AccountName").val())) + "> <input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + parseFloat(amt).toFixed(decimal) + " onkeyup='EditGirdAmount()'></td> </tr>";

        }
        else if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible") && rowchk == 1) {
            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td><td  class= 'jsgrid-cell jsgrid-align-center'  style= 'width: 35px;display:none'><input type='hidden' id=" + 'Emp' + slno + "  value=" + $("#EmployeeId0").val() + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + ($.trim($("#AccountName").val())) + "> <input type='text' style='display:none;border:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + $("#VoucherEntryDescription").val() + "'></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + $("#VoucherDate").val() + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + parseFloat(amt).toFixed(decimal) + " onkeyup='EditGirdAmount()'></td>    <td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " >" + CostCenterName + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> <select id=" + 'CurrencyId' + slno + " class='form-control' disabled=disabled style='height:35px;background-color:white' onchange='CurrencyChangeGrid(" + slno + ")'> " + CurrencySelect + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'Rate' + slno + " value= " + ($.trim($("#Rate").val())) + " ></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' onkeyup=CalculateAmountRow() class='form-control' disabled style='height:35px;background-color:white' id=" + 'FCAmount' + slno + " value= " + ($.trim($("#AmountFC").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select class='form-control'  disabled style='height:35px;background-color:white' id=" + 'trxtype' + slno + " ><option value=0>-Select-</option><option value=1>CHQ</option><option value=2>NEFT</option><option value=3>RTGS</option><option value=4>IMPS</option><option value=5>ATM</option><option value=6>Others</option></select></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'BankId' + slno + " > " + Bank + "</select></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + " value= " + ($.trim($("#ChequeNo").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value= " + ($.trim($("#ChequeDate").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " value= " + ($.trim($("#PDCAccount").val())) + " ></td></tr>";

        }
        $('#tblvoucherentry').append(VoucherRow);


   
        //var a = $('#TotalCredit').val();
        //var b = $('#TotalDebit').val();
        //if (type = 'Credit') {
        //    a = a + amt;
        //    $('#TotalCredit').val(a);
        //}
        //else if (type = 'Debit') {
        //    b = b + amt;
        //    $('#TotalDebit').val(b);
        //}
    

        $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
        $('#trxtype' + slno).val($('#trxtype').val());
        $('#VType' + slno).val($("#VType").val());
        $('#AccountId' + slno).val($('#AccountName').val());
        $('#ProjectJobId' + slno).val($('#JobCode').val());
        $('#CostCenterId' + slno).val($('#CostCenterName').val());
        $('#CurrencyId' + slno).val($('#Currency').val());
        if ($('#Currency').val() == 0) {
            $('#CurrencyId' + slno).val(1);
            $('#Rate' + slno).val('1');
            $('#FCAmount' + slno).val($('#Amount').val());
        }
        $('#BankId' + slno).val($('#Bank').val());
        var i = $('#slnotxt').val();
        $('#hiddenrow').val(i);
        var deb = 0;
        var cre = 0;
        var diff = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
        var desc = $('#VoucherEntryDescription').val();
        var amt = $('#Amount').val();
        var txno = $('#TaxNo').val();
        gridrefresh();
        var ddif = $('#Differencetxt').val();
        if (ddif == 0) {
            $('#VoucherEntryDescription').val('');
            $('#Amount').val('');
            $('#TaxNo').val('');
        }
        else {
            $('#VoucherEntryDescription').val(desc);
            $('#Amount').val(amt);
            $('#TaxNo').val(txno);
        }


    }

    function CalcDebit() {
        var DebitTotal = 0;
        var CreditTotal = 0;
        var Difference = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                var DebitTotal = parseFloat($('#Debittxt').val());
                DebitTotal = parseFloat(DebitTotal) + parseFloat($('#Amount' + j).val() || 0);
                $('#Debittxt').val(DebitTotal.toFixed(decimal));
            }
            else if ($('#VType' + j).val() == 'Credit') {
                var CreditTotal = parseFloat($('#Credittxt').val());
                CreditTotal = parseFloat(CreditTotal) + parseFloat($('#Amount' + j).val() || 0);
                $('#Credittxt').val(CreditTotal.toFixed(decimal));
            }
            Difference = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
            $('#Differencetxt').val(Difference.toFixed(decimal));
        }
    }

    function CalculateFCAmount() {
        if ($("#Rate").val() > 0) {
            var fc = 0;
            var rt = $("#Rate").val();
            rt = isNaN(rt) ? 0 : rt;
            fc = $("#Amount").val() / rt;
            fc = isNaN(fc) ? 0 : fc;
            $("#FCAmount").val(fc.toFixed(decimal));
        }
        else if ($("#Rate").val() == 0) {
            $("#FCAmount").val(0);
        }
        else {
            $("#FCAmount").val(0);
        }
    }

    function Showalerts(Status) {
        if (Status == 1) {
            formrefresh();
            swal('Data Saved Successfully', "", "success");
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

    function GetList(Id) {
        warningshow('Please use the individual form for settlement');
        // $('#Popup1').show();

        //var AccountId = $('#supplierId0').val();
        //var data = {};
        //data.AccountId = AccountId;
        //$.ajax({
        //    type: "POST",
        //    url: "../../AccountsErp/VoucherEntryGetandGets",
        //    data: data,
        //    success: function (result) {
        //        if (AccountId != 0)
        //            ShowInvList(result.oList);
        //    }
        //});    
    }
    //var l = 0;
    //function ShowInvList(result) {
    //    var sum = 0;
    //    $('#BaseAmount').val($('#Amount').val());
    //    $('#RowGet').val = '';
    //    $('#modelheader').text('Pending Invoice');
    //    $('#add').hide();
    //    $('#View').show();
    //    $('#iconForm').show(); 
    //    var responseText = "<thead><tr><th class='custom-control custom-checkbox' ><input type='checkbox' onchange='SelectAll()' id= 'SlNoHeadCheck' 'custom-control-input cz-bg-image-display'>&nbsp;All</th><th>Slno</th><th style='display:none'>BillNo</th><th>InvNo</th><th>Account Name</th><th>Inv Date</th><th>Amount</th></tr></thead><tbody>";
    //    for (var l = 0; l < result.length; l++) {
    //        var slno = parseInt(l + 1);
    //        responseText += '<tr><td class="custom-control custom-checkbox" ><input type="checkbox" id= ' + 'SlNoCheck' + slno + ' onclick="SumChange(' + slno + ')" "custom-control-input cz-bg-image-display"></td><td>' + slno + '</td><td style="display:none" id=' + 'BillSerNo' + slno + '>' + result[l].BillSerNo + '</td><td id=' + 'InvoNo' + slno + '>' + result[l].InvoNo + '</td><td id=' + 'AccountName' + slno + '>' + result[l].AccountName + '</td><td id=' + 'InvoDate' + slno + '>' + result[l].InvoDate + '</td><td id=' + 'PAmount' + slno + '>' + result[l].Amount + '</td></tr>';        
    //    }
    //    $('#PendingInvoicelist').html(responseText + '</tbody>');
    //    $('#RowGet').val(result.length);    
    //    $('#btnview').focus();
    //    $('#txtRowCount').val(slno);
    //    $('#Sum').val(sum.toFixed(decimal));
    //}


    function SumChange(Id) {

        var sumchange = 0;
        var bala = 0;
        if ($("#SlNoCheck" + Id).is(":checked")) {
            if (parseFloat($('#BaseAmount').val() || 0) >= parseFloat($('#PAmount' + Id).text()) || 0) {
                sumchange = parseFloat($('#Sum').val()) + parseFloat($('#PAmount' + Id).text() || 0);
                bala = $('#BaseAmount').val() - $('#PAmount' + Id).text();
                $('#BaseAmount').val(bala.toFixed(decimal));
                $('#Sum').val(parseFloat(sumchange.toFixed(decimal)));
            }
            else {
                document.getElementById("SlNoCheck" + Id).checked = false;
                warningshow('Amount Exceeded');
            }
        }
        else {
            bala = parseFloat($('#BaseAmount').val() || 0) + parseFloat($('#PAmount' + Id).text() || 0);
            $('#BaseAmount').val(bala.toFixed(decimal));
            sumchange = parseFloat($('#Sum').val()) - parseFloat($('#PAmount' + Id).text() || 0);
            $('#Sum').val(parseFloat(sumchange.toFixed(decimal)));
        }
    }

    function Addpopupwindow(Id) {
        if ($.trim($('#AccountName').val()) == "") {
            warningshow('Please Select Account', 'AccountName');
            return false;
        }
        if ($.trim($('#supplierId0').val()) == 0) {
            warningshow('Please Select a Valid Account', 'AccountName');
            return false;
        }
        if ($.trim($('#Amount').val()) == 0) {
            warningshow('Please Add Amount', 'Amount');
            return false;
        }
        else {
            $('#PendingInv').hide();
            $('#JobAndFC').hide();
            $('#Popup').show();

            if (Id == 1) {
                $('#MyHeader').text('Pending Invoice');
                $('#PendingInv').show();
            }
            else if (Id == 2) {
                $('#MyHeader').text('Job & FC');
                $('#JobAndFC').show();
                $('#JobCode').focus();
                $('#AmountCon').val($('#Amount').val());
                $('#Rate').val($('#Currency').find("option:selected").attr("name"));
                $('#trxtype').val(0);

                $('#PDCAccount').val('');
                $('#ChequeDate').val(CurDate);
                $("#JobCode").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#CostCenterName').focus();
                        e.preventDefault();
                    }
                });
                $("#CostCenterName").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#PDCAccount').focus();
                        e.preventDefault();
                    }
                });
                $("#PDCAccount").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#Currency').focus();
                        e.preventDefault();
                    }
                });
                $("#Currency").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#Rate').focus();
                        e.preventDefault();
                    }
                });
                $("#Rate").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#FCAmount').focus();
                        e.preventDefault();
                    }
                });
                $("#FCAmount").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#trxtype').focus();
                        e.preventDefault();
                    }
                });
                $("#trxtype").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#Bank').focus();
                        e.preventDefault();
                    }
                });
                $("#Bank").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#ChequeNo').focus();
                        e.preventDefault();
                    }
                });
                $("#ChequeNo").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#ChequeDate').focus();
                        e.preventDefault();
                    }
                });
                $("#ChequeDate").keydown(function (e) {
                    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
                    if (key == 13) {
                        $('#btnaddtogrid').focus();
                        e.preventDefault();
                    }
                });
            }
        }
        CalcFCAmount();
    }

    function GetJob() {
        if ($('#PDCAccountId').val() == '' && $('#PDCAccount').val() != '') {
            warningshow('Please Select A Valid Account', 'PDCAccount');
            return false;
        }
        else if ($('#Rate').val() == '' || $('#Rate').val() == 0) {
            warningshow('Please enter Rate', 'Rate');
            return false;
        }
        else if ($('#FCAmount').val() == '' || $('#FCAmount').val() == 0) {
            warningshow('Please enter FCAmount', 'FCAmount');
            return false;
        }
        else {
            $('#tdJobCode,#thJobCode').show();
            $('#tdCostCode,#thCostCode').show();
            $("#tblvoucherentry").width("100%");
            $('#thFC,#thFCAmount,#typetrx,#thBank,#thPDCAc,#tdFC').show();
            $('#Amount').val($('#AmountCon').val());
            $('#FCAmount').val('');
            chek = 1;
            rowchk = 1;
            VoucherEntryAdd();
            chek = 0;
            rowchk = 0;
            $('#Popup').hide();
        }
    }

    //Pending Invoice
    function AddtoGrid() {

        if ($.trim($('#AccountName').val()) == "") {
            warningshow('Please Select Account', 'AccountName');
            return false;
        }
        else if ($.trim($('#supplierId0').val()) == 0) {
            warningshow('Please Select Account', 'AccountName');
            return false;
        }
        else {
            var row = $('#RowGet').val();
            var slno = parseInt($('#slnotxt').val())
            var VType = $('#VType :selected').text();
            var VoucherEntryDescription = $('#VoucherEntryDescription').val();


            for (var m = 1; m <= row; m++) {

                if ($("#SlNoCheck" + m).is(":checked")) {
                    if ($('#BillSerNo' + m).text() == 0) {
                        var BillSerNo = 0;
                    }
                    else {
                        var BillSerNo = $('#BillSerNo' + m).text();
                    }
                    var InvoNo = $('#InvoNo' + m).text();
                    var AccountName = $('#AccountName' + m).text();
                    var InvoDate = $('#InvoDate' + m).text();
                    var Amount = $('#PAmount' + m).text();
                    $('#Popup').hide();
                    var slno = parseInt($('#slnotxt').val());

                    var no = $('#tblvoucherentry tr').length;
                    if ($('#thJobCode').is(":hidden") && $('#thFC').is(":hidden")) {
                        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= jsgrid-cell  style= width:50px;text-align:center;display:none value='0'>" + BillSerNo + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:150px'> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + AccountName + "> <input type='text' style='display:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + VoucherEntryDescription + "></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + InvoNo + "></td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";

                    }
                    else if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible")) {
                        var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= jsgrid-cell  style= width:50px;text-align:center;display:none value='0'>" + BillSerNo + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:150px'> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option>Credit</option><option>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'AccountId' + slno + " value=" + AccountName + "> <input type='text' style='display:none' value=" + $("#supplierId0").val() + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + $("#AccCode").val() + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value=" + VoucherEntryDescription + "></td><td class= jsgrid-cell  style= width:50px;text-align:center >" + InvoDate + "</td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + Amount + " onkeyup='EditGirdAmount()'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:300px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'ReferenceNo' + slno + " value=" + InvoNo + "></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white'  id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " >" + CostCenterName + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width: 35px;'> <select id=" + 'CurrencyId' + slno + " class='form-control' disabled=disabled style='height:35px;background-color:white' > " + CurrencySelect + "</select></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'Rate' + slno + " value= " + ($.trim($("#Rate").val())) + " ></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' onkeyup=CalculateAmountRow() class='form-control' disabled style='height:35px;background-color:white' id=" + 'FCAmount' + slno + " value= " + ($.trim($("#AmountFC").val())) + " ></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'BankId' + slno + " > " + Bank + "</select></td><td  class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeNo' + slno + " value= " + ($.trim($("#ChequeNo").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ChequeDate' + slno + " value= " + ($.trim($("#ChequeDate").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <input type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'PDCAccount' + slno + " value= " + ($.trim($("#PDCAccount").val())) + " ></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='display:none;width: 35px;' > <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'ProjectJobId' + slno + " > " + JobCode + "</select></td><td style='display:none' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style= width: 35px;> <select type='text' class='form-control' disabled style='height:35px;background-color:white' id=" + 'CostCenterId' + slno + " > " + CostCenterName + "</select></td><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:100px'><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:100px;display:none'><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td></tr>";

                    }
                    $('#tblvoucherentry').append(VoucherRow);
                    $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));
                    $('#VType' + slno).val($("#VType option:selected").text());
                    $('#ProjectJobId' + slno).val($('#JobCode').val());
                    $('#CostCenterId' + slno).val($('#CostCenterName').val());
                    $('#CurrencyId' + slno).val($('#Currency').val());
                    $('#trxtype' + slno).val($('#trxtype').val());
                    if ($('#Currency').val() == 0) {
                        $('#CurrencyId' + slno).val(1);
                        $('#Rate' + slno).val('1');
                        $('#FCAmount' + slno).val($('#Amount').val());
                    }
                    $('#BankId' + slno).val($('#Bank').val());
                }
            }
            $('#hiddenrow').val(parseInt($('#slnotxt').val()));
            if ($('#VType :selected').text() == 'Debit') {
                var sm = $('#Sum').val();
                var deb = 0;
                deb = parseFloat($('#Debittxt').val()) + parseFloat(sm);
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                var sm = $('#Sum').val();
                var cre = 0;
                cre = parseFloat($('#Credittxt').val()) + parseFloat(sm);
                $('#Credittxt').val(cre.toFixed(decimal))
            }
            var diff = 0;
            diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
            $('#Differencetxt').val(diff.toFixed(decimal));
            gridrefresh();
        }
    }


    function SelectAll() {
        var sm = 0;
        var row = $('#RowGet').val();
        var flag = $("#SlNoHeadCheck").is(":checked");
        for (var i = 1; i <= row; i++) {
            document.getElementById("SlNoCheck" + i).checked = flag;
            sm = sm + parseFloat($('#PAmount' + i).text());
            $('#Sum').val(sm.toFixed(decimal));
            if ($('#Sum').val() > $('#BaseAmount').val()) {
                document.getElementById("SlNoCheck" + i).checked = false;
                warningshow('Amount Exceeded');
            }
        }
        if (flag == false) {
            $('#Sum').val(0);
        }
    }

    function EditGirdAmount() {
        var count = $('#slnotxt').val();
        var deb = 0;
        var cre = 0;
        var diff = 0;
        var fc = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
                fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
                $('#FCAmount' + j).val(fc.toFixed(decimal));
            }
            else {
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
                fc = parseFloat($('#Amount' + j).val() || 0) / parseFloat($('#Rate' + j).val() || 0)
                $('#FCAmount' + j).val(fc.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
    }

    function CalculateAmountRow() {
        var count = $('#slnotxt').val();
        var deb = 0;
        var cre = 0;
        var diff = 0;
        var amt = 0;
        for (var j = 1; j < $('#slnotxt').val() ; j++) {
            if ($('#VType' + j).val() == 'Debit') {
                amt = parseFloat($('#FCAmount' + j).val() || 0) * parseFloat($('#Rate' + j).val() || 0)
                $('#Amount' + j).val(amt.toFixed(decimal));
                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                amt = parseFloat($('#FCAmount' + j).val() || 0) * parseFloat($('#Rate' + j).val() || 0)
                $('#Amount' + j).val(amt.toFixed(decimal));
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
    }
    var balo = 0;

    function balload() {
        var BankAccount = $('#AccCode').val();

        var data = {};
        data.BankAccount = BankAccount;

        $.ajax({
            type: "POST",
            url: "../../AccountsErp/BankbalGetandGets",
            data: data,
            success: function (result) {



                balo = 0;

                balo = result.oList[0].bal;
                balo1 = result.oList[0].bal;

                if (balo < 0) {
                    balo = balo * -1;
                    $('#Acbal1').val(balo.toFixed(decimal) + ' CR');
                }
                else {
                    $('#Acbal1').val(balo.toFixed(decimal) + ' DR');
                }



                $('#Acbal').val(balo1.toFixed(decimal));

                $('#Popup1').show();
                $('#btnclose').focus();





            }
        });
    }
    $("#Transfersal").click(function (e) {

        var TransferDate = $('#TransferSalary').val();
        var DeptId = ERPDeptId;
        var srlno = {};
        srlno.DeptId = DeptId;
        srlno.TransferDate = TransferDate;
        $.ajax({
            type: "POST",
            url: "../AccountsErp/SalaryGetandGets",
            data: srlno,
            success: function (result) {

                if ((result.oList.length) > 0) {
                    SalaryGets(result.oList);
                    $('#btnsubmit').focus();
                }
                else {
                    warningshow(' No Pending PayRolls For This Month ', '');
                }


            }
        });

    });

    function SalaryGets(result) {
        // alert(salaryflag)
        $('#VType').prop('disabled', true);
        $('#AccountName').prop('disabled', true);
        $('#AccountNamebtn').prop('disabled', true);
        $('#VoucherEntryDescription').prop('disabled', true);
        $('#Amount').prop('disabled', true);
        $('#TaxNo').prop('disabled', true);
        $('#btnadd').prop('disabled', true);
        $('#JobandFC').prop('disabled', true);
        $('#InvoiceSettlement').prop('disabled', true);
        $('#TransferVoucherNo').prop('disabled', true);
        salaryflag = 1;

        GridRemove();
        gridrefresh();

        $('#empname').show();
        // $('#emp').show();

        $('#tdJobCode,#thJobCode').hide();
        $('#tdCostCode,#thCostCode').hide();
        $("#tblvoucherentry").width("100%");
        $('#thFC,#thFCAmount,#thBank,#thPDCAc,#tdFC,#typetrx').hide();
        $('#Amount').val($('#AmountCon').val());
        $('#FCAmount').val('');




        for (var l = 0; l < result.length; l++) {

            var Dt = result[l].VoucherDate;
            someDate = new Date(Dt.slice(6, 10) + '-' + Dt.slice(3, 5) + '-' + Dt.slice(0, 2));

            var month = new Array();
            month[0] = "JANUARY";
            month[1] = "FEBRUARY";
            month[2] = "MARCH";
            month[3] = "APRIL";
            month[4] = "MAY";
            month[5] = "JUNE";
            month[6] = "JULY";
            month[7] = "AUGUST";
            month[8] = "SEPTEMBER";
            month[9] = "OCTOBER";
            month[10] = "NOVEMBER";
            month[11] = "DECEMBER";

            var d = someDate;
            var month1 = month[d.getMonth()];


            var no = $('#tblvoucherentry tr').length;
            var amt = 0;
            amt = parseFloat($("#Amount").val());

            var slno = parseInt($('#slnotxt').val())


            //  if ($('#thJobCode').is(":visible") && $('#thFC').is(":visible")) {


            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td><td class= 'jsgrid-cell jsgrid-align-center'  style= display:none; width: 35px;><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Emp' + slno + " value=" + result[l].empId + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].EmpName + "'" + " id=" + 'EmpName' + slno + "/></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].AccountName + "'" + " id=" + 'AccountId' + slno + "/> <input type='text' style='display:none;border:none' value=" + result[l].AccountId + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + result[l].AccCode + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + result[l].VoucherEntryDescription + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + result[l].VoucherDate + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[l].Amount + " onkeyup='EditGirdAmount()'></td>   </tr>";




            // }
            $('#tblvoucherentry').append(VoucherRow);
            $('#TaxNo' + slno).val('0');
            $('#ReferenceNo' + slno).val('0');


            if (result[l].VType == 'D') {
                $('#VType' + slno).val('Debit');
                $('#VoucherEntryDescription' + slno).val((result[l].EmpName) + 'SALARY PAID MONTH OF ' + month1);
            }
            else {
                $('#VType' + slno).val('Credit');

                //  var fag = 1;
                $('#VoucherEntryDescription' + slno).val('ADVANCE PAID BY ' + (result[l].EmpName));
                $('#ReferenceNo' + slno).val(result[l].empId);
            }


            //  $('#ProjectJobId' + slno).val(result[l].ProjectJobId);

            //  $('#CostCenterId' + slno).val(result[l].CostCenterId);
            //   $('#CurrencyId' + slno).val(result[l].CurrencyId);

            //  if ($('#Currency').val() == 0) {
            //    $('#CurrencyId' + slno).val(1);
            //    $('#Rate' + slno).val('1');
            //    $('#FCAmount' + slno).val($('#Amount').val());
            //}

            //$('#BankId' + slno).val(result[l].BankId);
            //$('#trxtype' + slno).val(result[l].TrxType);
            //////////////
            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));

            var no = $('#tblvoucherentry tr').length;
            var amt = 0;
            amt = parseFloat($("#Amount").val());

            var slno = parseInt($('#slnotxt').val())
            //////////////
            var VoucherRow = "<tr id=" + 'row' + slno + " class= jsgrid-row ><td id='edit_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;' ><input class='jsgrid-button jsgrid-edit-button' type='button' title='Edit' onclick='Editrow(" + slno + ")'><input class='jsgrid-button jsgrid-delete-button'  type= button onclick='rowdelete(" + slno + ")'  title= Delete ></td><td id='update_" + slno + "' class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:50px;display:none' ><input class='jsgrid-button jsgrid-update-button' type='button' title='Update' onclick='UpdateRow(" + slno + ")'><input class='jsgrid-button jsgrid-cancel-edit-button' onclick='CancelEditRow(" + slno + ")' type='button' title='Cancel edit'></td><td id=" + 'td' + slno + " class= jsgrid-cell  style= width:50px;text-align:center >" + no + "</td><td class= 'jsgrid-cell jsgrid-align-center' style='width:50px;display:none' value='0' id=" + 'BillSerNo' + slno + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style= width: 35px;> <select id=" + 'VType' + slno + " class='form-control' disabled style='height:35px;background-color:white' ><option value=Credit>Credit</option><option value=Debit>Debit</option></select></td><td  class= 'jsgrid-cell jsgrid-align-center'  style= display:none; width: 35px;><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Emp' + slno + " value=" + result[l].empId + "></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].EmpName + "'" + " id=" + 'EmpName' + slno + "/></td><td class= 'jsgrid-cell jsgrid-align-center'  style='width:300px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' value=" + "'" + result[l].PayName + "'" + " id=" + 'AccountId' + slno + "/> <input type='text' style='display:none;border:none' value=" + result[l].PayId + " id=" + 'supplierId' + slno + " /><input type='text' style='display:none;border:none' value=" + result[l].Payable + " id=" + 'AccCode' + slno + " /></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:400px'> <input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'VoucherEntryDescription' + slno + " value='" + result[l].VoucherEntryDescription + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'InvoDate' + slno + " value='" + result[l].VoucherDate + "'></td><td class= 'jsgrid-cell jsgrid-control-field jsgrid-align-center'  style='width:200px'><input type='text' class='form-control' disabled style='height:35px;background-color:white;border:none' id=" + 'Amount' + slno + " value=" + result[l].Amount + " onkeyup='EditGirdAmount()'></td>  </tr>";

            $('#tblvoucherentry').append(VoucherRow);

            $('#TaxNo' + slno).val('0');
            $('#ReferenceNo' + slno).val('0');

            if (result[l].VType == 'D') {
                // $('#VType' + slno).val('Debit');
                $('#VoucherEntryDescription' + slno).val((result[l].EmpName) + 'SALARY PAID MONTH OF ' + month1);
            }
            else {
                //  $('#VType' + slno).val('Credit');
                //  var fag = 1;
                $('#VType' + slno).val('Debit');
                $('#VoucherEntryDescription' + slno).val('ADVANCE PAID BY' + (result[l].EmpName));
                $('#InvoDate' + slno).val($('#VoucherDate').val());
                // $('#ReferenceNo' + slno).val(result[l].empId);

            }


            // $('#VoucherEntryDescription' + slno).val('Salary Paid');

            $('#slnotxt').val(parseInt(+$('#slnotxt').val() + 1));


        }
        var i = $('#slnotxt').val();
        $('#hiddenrow').val(i);
        var deb = 0;
        var cre = 0;
        var diff = 0;

        for (var j = 1; j < $('#slnotxt').val() ; j++) {


            var s = $('#VType' + j).val()




            if ($('#VType' + j).val() == 'Debit') {

                deb = deb + parseFloat($('#Amount' + j).val() || 0)
                $('#Debittxt').val(deb.toFixed(decimal));
            }
            else {
                cre = cre + parseFloat($('#Amount' + j).val() || 0)
                $('#Credittxt').val(cre.toFixed(decimal));
            }
        }
        diff = parseFloat($('#Credittxt').val()) - parseFloat($('#Debittxt').val());
        $('#Differencetxt').val(diff.toFixed(decimal));
        gridrefresh();


    }




    function button() {

      
            $('#btnsubmit').prop('disabled', true);

            //   alert("hai")
            if ($('#VoucherType').val() == 0) {
                //  alert(salaryflag)

                warningshow('Please Select Voucher Type', 'VoucherType');
                return false;
            }

            else if ($.trim($('#slnotxt').val()) == "1") {
                warningshow('Please add Voucher Details', 'btnadd');
                return false;
            }
            else if (editflag != 0) {
                warningshow('Please cancel Edit Mode');
                return false;
            }
            else if ($('#Differencetxt').val() != 0) {
                warningshow('Debit & Credit are not tally');
                return false;
            }
            else {

                $("#btnsubmit").prop('disabled', 'disabled');

                var Count = parseInt($('#slnotxt').val());
                var oArray = new Array();
                for (var i = 1; i < Count; i++) {

                    var VoucherTypeId = 4;
                    if (salaryflag == 1) {
                        var VoucherDate = $('#InvoDate' + i).val();

                    }
                    else {
                        var VoucherDate = $('#VoucherDate').val();

                    }
                    /////////
                    var VoucherNo = $('#VoucherNo').val();

                    var TransferVoucherNo = $('#TransferVoucherNo').val();
                    if ($('#VType' + i).val() == 'Debit') {
                        var VType = 'D';
                    }
                    else {
                        var VType = 'C';
                    }


                    var empId = 0;
                    var ReferenceNo = 0;






                    var AccountId = $('#supplierId' + i).val();
                    var AccCode = $('#AccCode' + i).val();
                    if ($('#BillSerNo' + i).text() == 0) {
                        var BillSerId = 0;
                    }
                    else {
                        var BillSerId = $('#BillSerNo' + i).text();
                    }
                    var VoucherEntryDescription = $('#VoucherEntryDescription' + i).val();
                    var TaxNo = $('#TaxNo' + i).val();
                    var TrxType = $('#trxtype' + i).val();
                    var Amount = $('#Amount' + i).val();

                    var ProjectJobId = $('#ProjectJobId' + i).val();
                    var CostCenterId = $('#CostCenterId' + i).val();
                    var CurrId = $('#CurrencyId' + i).val();
                    if (typeof CurrId == "undefined" || CurrId == 0) {
                        var CurrencyId = 1;
                        var CurrencyRate = 1.000;
                        var FCAmount = $('#Amount' + i).val();
                        var ChequeDate = 0;
                        var ChequeNo = 0;
                        var BankId = 0;
                        var PDCAccount = 0;
                        var PDCStatus = 0;
                    }
                    else {
                        var CurrencyId = $('#CurrencyId' + i).val();
                        var CurrencyRate = $('#Rate' + i).val();
                        var FCAmount = $('#FCAmount' + i).val();
                        if ($('#ChequeDate' + i).val() == "") {
                            var ChequeDate = 0;
                        }
                        else {
                            var ChequeDate = $('#ChequeDate' + i).val();;
                        }
                        var ChequeNo = $('#ChequeNo' + i).val();
                        var BankId = $('#BankId' + i).val();
                        var PDCAccount = $('#PDCAccount' + i).val();
                        if ($('#PDCAccount' + i).val() == "") {
                            var PDCStatus = 0;
                        }
                        else {
                            var PDCStatus = 'O';
                        }
                    }
                    DelFlag = 1;
                    var UserId = ERPUserId;
                    var DeptId = ERPDeptId;

                    var VoucherTypePrefix = "PC";

                    var Advance = 'False';
                    var AdvanceAmount = 0.000;

                    if (!(typeof ReferenceNo == "undefined")) {
                        oArray.push({
                            'VoucherTypeId': VoucherTypeId,
                            'VoucherNo': VoucherNo,
                            'TransferVoucherNo': TransferVoucherNo,
                            'VoucherTypeId': VoucherTypeId,
                            'VoucherDate': VoucherDate,
                            'BillSerId': BillSerId,
                            'VType': VType,
                            'AccountId': AccountId,
                            'AccCode': AccCode,
                            'VoucherEntryDescription': VoucherEntryDescription,

                            'Amount': Amount,
                            'ReferenceNo': ReferenceNo,
                            'ProjectJobId': ProjectJobId,
                            'CostCenterId': CostCenterId,
                            'CurrencyId': CurrencyId,
                            'CurrencyRate': CurrencyRate,
                            'BankId': BankId,
                            'ChequeNo': ChequeNo,
                            'ChequeDate': ChequeDate,
                            'PDCAccount': PDCAccount,
                            'PDCStatus': PDCStatus,
                            'FCAmount': FCAmount,
                            'DelFlag': DelFlag,
                            'UserId': UserId,
                            'DeptId': DeptId,
                            'VoucherTypePrefix': VoucherTypePrefix,
                            'Advance': Advance,
                            'AdvanceAmount': AdvanceAmount,
                            'TaxNo': TaxNo,
                            'TrxType': TrxType,
                            'empId': empId,

                        })
                    }
                }
            }

            if (oArray != "") {
                var data = { 'VoucherEntryModel': oArray };
                $.ajax(

          {

              type: "POST",
              url: "../AccountsErp/pettycashinsert",

              data: data,
              success: function (result) {
                  for (var i = 0; i <= result.oList.length; i++) {
                      var status = result.oList[i].Status;
                      Showalerts(status);
                      formrefresh();
                      gridrefresh();
                      serialnoload();

                  }
              }
          });
            }
        
    }