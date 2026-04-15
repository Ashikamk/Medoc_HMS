var Copyflag = 0; var Editflag = 0; var DeptLoad = ''; var Count = 0; var SlNum = 0; var DeptSelect = ""; var Updateflag = 0;

//Document Ready
$(document).ready(function () {

    $('.form-control').attr('autocomplete', 'off');
    $('.rdonl').attr('readonly', true).css('background-color', 'white');
    $('.disopt').prop('disabled', true);

    Defaultfocus();

    LoadDate(0);
    CommonLoad();
    CalcGrandTotal(1);

    $('.form-control:not(.atcm)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find('.form-control:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#BillNo').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#RegNo').focus().select();
        }
    });
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

    $('#PRate0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {
            e.preventDefault();
            $('#btnadd').focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#PQty0').focus().select();
        }
    });
    $('#PQty0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            e.preventDefault();
            $('#PRate0').focus();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#TestName0').focus().select();
        }
    });
    $('#btnadd').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            e.preventDefault();
            $('#PRate0').focus();
        }
        else if (key == 39) {
            e.preventDefault();
            $('#TestName0').focus().select();
        }
    });

    $("#btnotpcancel").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 39) {
            $("#btnotpsave").focus();
        }
    });

    $("#btnotpsave").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 37) {
            $("#btnotpcancel").focus();
        }
    });
    $("#txtotp").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#otpremarks").focus();
        }
    });
    $("#otpremarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#btnotpsave").focus();
        }
    });

    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1);
    });

   

});

function LoadDate(flg) {
    $('#BillDate').daterangepicker({
        startDate: CurDate,
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    })
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
    CheckEOD();
}

function CheckEOD() {
    if (EODType == 'EOD') {
        $("#BillDate").addClass('disb');
        $("#BillDate").prop('disabled', true);
    }
    else {
        $("#BillDate").removeClass('disb');
        $("#BillDate").prop('disabled', false);
    }
}

function CommonLoad() {
    var data = {};                                       //dropdownbind
    data.DoctorId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevistDoctorGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#Doctor").empty();
                $("#Doctor").append("<option value='0' Fee='0'>Select</option>");
                for (var i = 0; i < result.oList.length; i++) {
                    $("#Doctor").append("<option value='" + result.oList[i].DoctorId + "' Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }
            }
        }
    });

    var data = {};
    data.DepId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/MedDeptGetandGets",
        data: data,
        success: function (result) {
            DeptLoad = '';
            if (result.oList.length > 0) {
                DeptLoad += "<option value='0' Fee='0'>Select</option>";
                for (var i = 0; i < result.oList.length; i++) {
                    DeptLoad += "<option value='" + result.oList[i].DepId + "'>" + result.oList[i].Department + "</option>";
                }
                $("#Department0").empty();
                $("#Department0").append(DeptLoad);
            }
        }
    });

    RevisitIDLoad();

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

function RevisitIDLoad() {
    var data = {};
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMSSerialNoGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#BillNo").val(result.oList[0].PRBillNo);
                //$("#BillNoCopy").text(result.oList[0].PRBillNo); 
            }
            else {
                $('.form-control').blur();
                $('#confirmff,#keyboardff').show();
            }
        }
    });
}

function LoadRegNumber() {

    $("#RegNo").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            ClearData(0, 0);

            var data = {};
            data.PatientName = $("#RegNo").val();
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_IPorPatientSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'GR3',
                            label: item.OPSerName + ' - ' + item.OPNumber,
                            label1: item.PatientName,
                            label2: item.AadharNo,            //IP NUMBER
                            PatientId: item.PatientId,
                            DOB: item.DOB,
                            Contact: item.Contact,
                            OPNumber: item.OPNumber,
                            PatientName: item.PatientName,
                            IpNo: item.AadharNo,
                            IPYear: item.Status,
                            headers: ["RegNo", "Patient", "IP No"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            $('#IpNo').val(ui.item.IpNo);
            $('#IpYear').val(ui.item.IPYear);
            GetLastRevisitDetails(ui.item.PatientId);
         
            $('#TestName0').focus().select();
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#RegNo').val() == '') || (($('#RegSeries').val() || 0) != 0))) {
            $('#TestName0').focus();
        }

    });
}

function GetLastRevisitDetails(PatientId) {
    var data = {};                                       //dropdownbind
    data.PatientId = PatientId;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_LAstRevisitGetsOP",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetPatientData(result.oList, 0);
            }
        }
    });
}

function GetPatientData(result) {
    var age = AgeCalculation(result[0].DOB); var yearString = '';
    if (age.years > 1) yearString = age.years + " Years";
    else yearString = age.years + " Year";

    $('#RegNo').val(result[0].OPNumber);
    $('#OpNo').val(result[0].RevisitId);
    $('#Name').val(result[0].PatientName);
    $('#Age').val(yearString);
    $('#Gender,#Genderhid').val(result[0].Flag);
    $('#Doctor').val(result[0].DoctorId);
    $('#RegSeries').val(result[0].OPSerId);

    GetBillDetailsload(result[0].OPNumber, result[0].RevisitId);
}

function ClearData(flg, Id) {
    if (flg == 0) {
        $('.patdet').val('');
        $('#Doctor,#Gender').val(0);
    }
    else if (flg == 1) {
        $('#TestCode' + Id).val(''); $('#TestId' + Id).val(''); $('#PQty' + Id).val(''); $('#PRate' + Id).val('');
        if (Id == 0) {
            $('#TestAmount' + Id).val('');
        }
        else {
            $('#TestAmount' + Id).val('0.00');
        }

    }
}

function LoadTest(Id) {

    $('#TestName' + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            ClearData(1, Id);
            var data = {};
            data.ProcedureName = $('#TestName' + Id).val();
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
                            ProcedureName: item.ProcedureName,
                            headers: ["Procedure Code", "Procedure Name"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#TestCode' + Id).val(ui.item.ProcedureName);
            $('#TestId' + Id).val(ui.item.ProcedureId);
            $('#PQty' + Id).val(1);
            $('#PRate' + Id).val(parseFloat(ui.item.Rate).toFixed(Decimal)).focus().select();
            AmountCalc(Id);
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#TestId' + Id).val() || 0) != 0)) {
            $('#PQty' + Id).focus().select();
        }
        else if ((Id == 0) && ((e.which == 39) || (e.which == 37))) {
            if ((e.which == 37) && ((($('#TestId' + Id).val() || 0) != 0) || ($('#TestName' + Id).val() == ''))) {
                $('#btnadd').focus().select();
            }
            else if ((e.which == 39) && ((($('#TestId' + Id).val() || 0) != 0) || ($('#TestName' + Id).val() == ''))) {
                $('#PQty' + Id).focus().select();
            }
        }
        else if (Id == 0 && e.which == 40 && ($('#TestName' + Id).val() == '')) {
            var Idf = 0;

            try {
                Idf = parseInt($('#TblLabBill tr:first').attr('id').match(/\d+/)[0]);
            }
            catch (err) {

            }
            if (Idf != 0) {
                $('#TestName' + Idf).focus().select();
            }
        }
    });
}


function AddTest() {
    var Amt = parseFloat($('#PRate0').val());
    Amt = isNaN(Amt) ? 0 : Amt;

    if ($.trim($('#TestName0').val()) == '') {
        warningshow('Please Select Procedure', 'TestName0');
    }
    else if (($('#TestId0').val() || 0) == 0) {
        warningshow('Please Select a Valid Procedure', 'TestName0');
    }
    else if (($('#PQty0').val() || 0) == 0) {
        warningshow('Please Select Qty', 'PQty0');
    }
    else if ((Amt || 0) == 0) {
        warningshow('Please enter Procedure Rate', 'PRate0');
    }
    else {
        var TestId = $('#TestId0').val(); var flg = 0; var GridTstId = 0;

        $('.prmkey').each((i, item) => {
            var $item = $(item);
            NextId = parseInt($item.attr('id').match(/\d+/)[0]);
            GridTstId = $('#TestId' + NextId).val();
            if (TestId == GridTstId) {
                flg = 1;
            }
        });

        if (flg == 1) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('duplicate'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Test already added.Do you want to continue?');
        }
        else { AddTestConfirm(); }
    }
}

function AddTestConfirm() {
    var Amt = parseFloat($('#PRate0').val());
    Amt = isNaN(Amt) ? 0 : Amt;

    if ($('.TsRw').length == 0) { Count = 0; }

    Count++; SlNum = $('.TsRw').length + 1;

    var id = parseInt(Count);
    var slno = parseInt(SlNum);

    var ProdRow1 = "<tr id=" + 'Row' + id + " class='jsgrid-row TsRw' onclick='EditRow(" + id + ")' onfocusout=updaterow(" + id + ")>" +
        "<td class='jsgrid-cell jsgrid-control-field jsgrid-align-center' style='width:5%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
        "<td class='jsgrid-cell' style='width:5%;text-align:center' id='slrow" + id + "'>" + slno + "</td>" +
        "<td class='jsgrid-cell jsgrid-align-left' style='width:20%'><input type='text' id='TestName" + id + "' value='" + $('#TestName0').val() + "' onfocus='LoadTest(" + id + ")' class='form-control TestName' style='height:30px' ></td>" +
        "<td class='jsgrid-cell jsgrid-align-left' style='width:30%'><input type='text' readonly id='TestCode" + id + "' value='" + $('#TestCode0').val() + "' class='form-control' style='height:30px;background-color:white' ></td>" +

        "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' readonly id='Testdate" + id + "' value='" + $('#BillDate').val() + "' class='form-control' style='height:30px;background-color:white' ></td>" +


        "<td class='jsgrid-cell jsgrid-align-center' style='width:5%'><input id='PQty" + id + "' class='form-control text-center PQty cmdts' value='" + $('#PQty0').val() + "' style='height:30px' onkeydown=FocusManual('PQty','TestName'," + id + ",event) onkeyup=AmountCalc(" + id + ") onkeypress=isNumberInt(event,this)></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:12%'><input id='PRate" + id + "' value=" + parseFloat(Amt).toFixed(Decimal) + " class='form-control text-center PRate cmdts' style='height:30px' onkeyup=AmountCalc(" + id + ") onkeypress=isNumber(event,this) onkeydown=FocusManual('PRate','TestName'," + id + ",event)></td>" +
        "<td class='jsgrid-cell jsgrid-align-center' style='width:12%'><input type='text' readonly id='TestAmount" + id + "'  value='" + $('#TestAmount0').val() + "'  onkeydown=FocusManual('TestAmount','TestName'," + id + ",event)   class='form-control text-center TestAmount cmdts' style='height:30px;background-color:white' onkeypress='isNumber(event,this)'></td>" +
        "<td style=display:none><input type='text' id='TestId" + id + "' value=" + $('#TestId0').val() + " class='form-control prmkey'></td>" +
        "</tr>";
    $('#TblLabBill').append(ProdRow1);
    $('.jsgrid-cell> input,.jsgrid-cell >select').css('border', 'none').css('border', 'none');
    $('#Department' + id).val($('#Department0').val());
    ClearData(1, 0);
    $('#TestName0').val('').focus();
    CalcGrandTotal(1);
    CalcGrandTotal(0)
    $('#proddiv').animate({ scrollTop: 5000 }, 900);
}

function AmountCalc(id) {
    var Qty = $('#PQty' + id).val(); var Rate = $('#PRate' + id).val(); var Tot = 0;
    Qty = isNaN(Qty) ? 0 : Qty;
    Rate = isNaN(Rate) ? 0 : Rate;
    Tot = Qty * Rate;
    $('#TestAmount' + id).val(parseFloat(Tot || 0).toFixed(Decimal));
}

function CalcGrandTotal(flg) { // flg-0 : Disc%    ,flg-2 : DiscAmt    ,flg-1 : Other

    var TotalAmount = 0;
    var DiscountPer = SchemeDis;
    var DiscountAmt = 0;
    var NetAmt = 0;

    $('.totlbl').text('0.00');

    for (var i = 1; i <= Count; i++) {
        if ($('#TestName' + i).val() != undefined) {
            TotalAmount = parseFloat(TotalAmount) + parseFloat($('#TestAmount' + i).val() || 0);
        }
    }

    if (flg == 0) {
        DiscountPer = parseFloat($('#DiscPercent').val());
        DiscountPer = isNaN(DiscountPer) ? 0 : DiscountPer;
        DiscountAmt = (parseFloat(TotalAmount) * parseFloat(DiscountPer)) / 100;
        $('#DiscAmt').val(parseFloat(DiscountAmt).toFixed(Decimal));
    }
    else if (flg == 2) {
        DiscountAmt = parseFloat($('#DiscAmt').val());
        DiscountAmt = isNaN(DiscountAmt) ? 0 : DiscountAmt;
        DiscountPer = (parseFloat(DiscountAmt) * 100) / parseFloat(TotalAmount);
        $('#DiscPercent').val(parseFloat(DiscountPer).toFixed(Decimal));
    }

    NetAmt = parseFloat(TotalAmount) - parseFloat(DiscountAmt);

    $('#TotalAmt').text(TotalAmount.toFixed(Decimal));
    $('#NetAmt,#GrandTotal').text(NetAmt.toFixed(Decimal));

    if (flg == 1) { $('#DiscPercent').val(parseFloat(DiscountPer).toFixed(Decimal)); $('#DiscAmt').val(parseFloat(DiscountAmt).toFixed(Decimal)); }              //Function Call not from Discount input

}

//Edit Button Click
function EditRow(id) {
    //  Editflag = 1;         
}

//Update Function
function updaterow(id) {
    Editflag = id;

    var Amt = parseFloat($('#PRate' + id).val());
    Amt = isNaN(Amt) ? 0 : Amt;
    if ($.trim($('#TestName' + id).val()) == '') {
        warningshow('Please Select Procedure', 'TestName' + id); return false;
    }
    else if (($('#TestId' + id).val() || 0) == 0) {
        warningshow('Please Select a Valid Procedure', 'TestName' + id); return false;
    }
    else if (($('#PQty' + id).val() || 0) == 0) {
        warningshow('Please Select Qty', 'PQty' + id); return false;
    }
    else if ((Amt || 0) == 0) {
        warningshow('Please enter Procedure Rate', 'PRate' + id); return false;
    }
    else {
        AmountCalc(id);
        $('#TestAmount' + id).val(parseFloat($('#TestAmount' + id).val()).toFixed(Decimal));
        $('#PRate' + id).val(parseFloat(Amt).toFixed(Decimal));
        CalcGrandTotal(1);
        Editflag = 0;
        return true;
    }
}

//Delete The Selected Row in The Product Grid
function rowdelete(RowId) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want to Delete this Record?');
}

//Delete rows
function rowdeleteconfirm(RowId) {
    var slno = 1;
    $('#Row' + RowId).remove();
    for (var j = 1; j <= i - 1; j++) {
        if ($('#TestName' + j).val() != undefined) {
            $('#slrow' + j).text(slno);
            slno++;
        }
    }
    CalcGrandTotal(1);
    $('#TestName0').focus();
}

function formrefreshconfirm() {
    if (Editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else {
        var rowcount = $('#TblLabBill tr').length;
        if (rowcount > 0 && Copyflag == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('refresh'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Data will be lost.Do you want to Continue?');
        }
        else {
            formrefresh();
        }
    }
}

//Form Refresh
function formrefresh() {
    $('.rdonl').attr('readonly', true).css('background-color', 'white');
    $('.form-control:not(.avdclr),#BillDate,#btnadd').val('').prop('disabled', false);
    $('select').each((i, item) => {
        var $item = $(item);
        $item.val($item.find('option:first').val());
    });
    Defaultfocus();
    LoadDate(0);
    RevisitIDLoad();
    $('#Cash').prop('checked', true);
    $('.TsRw').remove();
    Count = 0;
    CalcGrandTotal(1);
    $('#BillNo,.btn').show();
    $('#BillNoCopy,#btnprint,#btnedit,#btnupdate,#btndelete,#btnacctran').hide();
    Copyflag = 0;
    CheckEOD();
}

function Defaultfocus() {
    $('#RegNo').focus().select();
}


function FocusManual(Id, Dest, key, e) {
    var SLClass = ''; var NextId = 0;
    if ((Id == 'TestAmount') || (Id == 'PQty') || (Id == 'PRate')) { SLClass = Id; }

    var char = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if ((char == 37 || char == 39)) {
        if (Id == 'PQty') {
            SLClass = 'PQty';
            if (char == 37) {
                e.preventDefault();
                $('#TestName' + key).focus().select();
            }
            else if (char == 39) {
                e.preventDefault();
                $('#PRate' + key).focus().select();
            }
        }
        else if (Id == 'PRate') {
            SLClass = 'PRate';
            if (char == 37) {
                e.preventDefault();
                $('#PQty' + key).focus().select();
            }
            else if (char == 39) {
                e.preventDefault();
                $('#TestName' + key).focus().select();
            }
        }
    }
    else if (char == 40) {            // Down Arrow
        e.preventDefault();
        $('.cmdts.' + SLClass).each((i, item) => {
            var $item = $(item);
            NextId = parseInt($item.attr('id').match(/\d+/)[0]);
            if (NextId > key) {
                $('#' + Id + NextId).focus().select();
                return false;
            }
        });
    }
    else if (char == 38) {            // Up Arrow
        e.preventDefault();
        $($('.cmdts.' + SLClass).get().reverse()).each((i, item) => {
            var $item = $(item);
            NextId = parseInt($item.attr('id').match(/\d+/)[0]);
            if (NextId < key) {
                $('#' + Id + NextId).focus().select();
                return false;
            }
        });
    }
    // else if (char == 13) {
    //    e.preventDefault();
    //    $('#' + Dest + key).focus().select();
    //}
}


function GetRows(flg) {
    if (Editflag != 0) {
        warningshow('Please Update Edit Mode');
    }
    else if (Copyflag == 0) {
        if ($('.TsRw').length > 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            if (flg == 0) { $('#Confirmflag').val('copy'); }
            else if (flg == 1) { $('#Confirmflag').val('view'); }
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
    copyrefresh(flg);

    if (flg == 1) {
        $("#myModal").modal("show");
        $("#myModal").appendTo("body");

        window.setTimeout(function () {
            $("#select_dept").focus();
        }, 200);

        CallViewList();
    }
}



//Clear All Values Before Copy Function
function copyrefresh(flg) {                                //flg:0 - Copy ,flg :1-View  ,flg:2 -New bill copy   ,flg:3 -Edit btn click
    if (flg == 3) {
        $('#BillNo').val($('#BillNoCopy').val());
        $('#BillNo,.btn').show();
        $('#BillNoCopy,#btnprint,#btnedit,#btndelete,#btnsubmit,#btnview,#btnlist,#btnacctran').hide();
        $('.form-control:not(.disb),#BillDate,#btnadd').prop('disabled', false);
        $('select:not(.disb)').prop('disabled', false);
        $('.jsgrid-cell> input,.jsgrid-cell >select').css('background-color', '');
        $('.rdonl').attr('readonly', true).css('background-color', 'white');

        Defaultfocus();

    }
    else if (flg != 2) {
        $('#BillNo,.btn').hide();
        $('.TsRw').remove();
        $('.rdonl').attr('readonly', true).css('background-color', '');
        $('.form-control:not(.disb),#BillDate,#btnadd').prop('disabled', true);

        $('#BillNoCopy,#btnnew,#btnview,#btnadd,#btnsubmitsgo,#confirmCancel,#confirmOk').show();
        $('select:not(.disb)').prop('disabled', true);
        RevisitIDLoad();
        $('#BillNoCopy').val($('#BillNo').val());

        $('.form-control:not(.avdclr)').val('');
        $('select').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });

        LoadDate(0);
        $('#Cash').prop('checked', true);
        Count = 0;
        CalcGrandTotal(1);
        $('#btnotpcancel,#btnotpsave').show();

        if (flg == 0)
            $('#BillNoCopy').focus().select();
    }
    if (flg != 3) { $('.TsRw').remove(); $('#btnedit,#btndelete,#btnacctran').hide(); }
    CheckEOD();
}


function GetBillDetailsload(BillNo, DeptId) {
    debugger;
    var data = {};
    data.BillNo = BillNo;
    data.DeptId = DeptId;
    data.Status = 'PB';
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_BillNumberGetandGetsload",
        data: data,
        success: function (result) {
            BillNumberGets(result.oList);
        }
    });
}

function BillNumberGets(result) {


    if (result.length > 0) {
        if (result[0].DeptId == ERPDeptId)
            $('#btnedit,#btndelete,#btnacctran,#btnprint').show();

        //if (result[0].PayType == 2) {
        //    $('#Credit').prop("checked", true);
        //}
        //else if (result[0].PayType == 1) {
        //    $('#Cash').prop("checked", true);
        //}

        $('#PayType').val(result[0].PayType)

        $('#BillNoCopy').val(result[0].BillNo).focus().select();
        $('#BillDate').val(result[0].BillDate);
        $('#RegNo').val(result[0].RegNo);
        $('#RegSeries').val(result[0].RegSeries);
        $('#OpNo').val(result[0].OpNo);
        $('#IpNo').val(result[0].IpNo); $('#IpYear').val(result[0].IPYear);
        $('#Name').val(result[0].Name);
        $('#Age').val(result[0].Age);
        $('#Gender,#Genderhid').val(result[0].Gender);
        $('#Doctor').val(result[0].Doctor);
        $('#Hospital').val(result[0].Hospital);
        $('#TotalAmt').text(parseFloat(result[0].TotalAmt).toFixed(Decimal));
        $('#DiscPercent').val(parseFloat(result[0].DiscPercent).toFixed(Decimal));
        $('#DiscAmt').val(parseFloat(result[0].DiscAmt).toFixed(Decimal));
        $('#NetAmt,#GrandTotal').text(parseFloat(result[0].NetAmt).toFixed(Decimal));


        $('#Remarks').val(result[0].Remarks);

        $('#TblLabBill').html('')

        if ($('.TsRw').length == 0) { Count = 0; }

        for (var i = 0; i < result.length; i++) {
            Count++; SlNum = $('.TsRw').length + 1;
            var id = parseInt(Count);
            var slno = parseInt(SlNum);
            var ProdRow1 = "<tr id=" + 'Row' + id + " class='jsgrid-row TsRw' onclick='EditRow(" + id + ")' onfocusout=updaterow(" + id + ")>" +
                "<td class='jsgrid-cell p-1  jsgrid-control-field jsgrid-align-center' style='width:5%'><input class='jsgrid-button jsgrid-delete-button jsgrid-align-center' type='button' onclick='rowdelete(" + id + ")' title='Delete'></td>" +
                "<td class='jsgrid-cell p-1 ' style='width:5%;text-align:center' id='slrow" + id + "'>" + slno + "</td>" +
                "<td class='jsgrid-cell p-1  jsgrid-align-left' style='width:20%'><input type='text' id='TestName" + id + "' value='" + result[i].TestName + "' onfocus='LoadTest(" + id + ")' class='form-control TestName' style='height:30px' ></td>" +
                "<td class='jsgrid-cell jsgrid-align-left' style='width:30%'><input type='text' readonly id='TestCode" + id + "' value='" + result[i].Status + "' class='form-control rdonl' style='height:30px;background-color:white' ></td>" +

                "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' readonly id='Testdate" + id + "' value='" + result[i].Department + "' class='form-control' style='height:30px;background-color:white' ></td>" +



                "<td class='jsgrid-cell jsgrid-align-center' style='width:5%'><input id='PQty" + id + "' class='form-control text-center PQty cmdts' value='" + result[i].PQty + "' style='height:30px' onkeydown=FocusManual('PQty','TestName'," + id + ",event) onkeyup=AmountCalc(" + id + ") onkeypress=isNumberInt(event,this)></td>" +
                "<td class='jsgrid-cell jsgrid-align-center' style='width:12%'><input id='PRate" + id + "' value=" + parseFloat(result[i].PRate).toFixed(Decimal) + " class='form-control text-center PRate cmdts' style='height:30px' onkeyup=AmountCalc(" + id + ") onkeypress=isNumber(event,this) onkeydown=FocusManual('PRate','TestName'," + id + ",event)></td>" +
                "<td class='jsgrid-cell p-1  jsgrid-align-center' style='width:12%'><input type='text' readonly id='TestAmount" + id + "' value=" + parseFloat(result[i].TestAmount).toFixed(Decimal) + " class='form-control text-center TestAmount cmdts rdonl' onkeydown=FocusManual('TestAmount','TestName'," + id + ",event) style='height:30px' onkeypress='isNumber(event,this)'></td>" +
                "<td style=display:none><input type='text' id='TestId" + id + "' value=" + result[i].TestId + " class='form-control prmkey'>" +
                "</td></tr>";
            $('#TblLabBill').append(ProdRow1);
            $('#Department' + id).val(result[i].Department);
            $('#proddiv').animate({ scrollTop: 5000 }, 900);
            $('.jsgrid-cell> input,.jsgrid-cell >select').prop('disabled', false).css('border', 'none').css('background-color', 'white');

        }

    }


}

function SaveAndUpdate(flg) {

    if (($("#RegSeries").val() || 0) == 0) {
        $("#RegSeries").val(10053)
    }
    if (($("#BillNo").val() || 0) == 0) {
        warningshow('Please select BillNo Number', 'BillNo');
    }
    else if ($.trim($("#RegNo").val()) == '') {
        warningshow('Please select Register Number', 'RegNo');
    }
    else if (($("#RegSeries").val() || 0) == 0) {
        warningshow('Please select a valid Register Number', 'RegNo');
    }
    else if (($("#Doctor").val() || 0) == 0) {
        warningshow('Please select Doctor', 'Doctor');
    }
    else if ($('.TsRw').length == 0) {
        warningshow('Please Add Procedures', 'TestName0');
    }
    else if ($('.TsRw').length == 0) {
        warningshow('Amount must be greater than 0', 'TestName0');
    }
    else if (Editflag != 0) {
        updaterow(Editflag);
    }
    else {

        if (flg == 1) { $('#Confirmflag').val('Save'); }
        else { $('#Confirmflag').val('Update'); }

        var Msg = 'Do You Want To ' + $('#Confirmflag').val() + '?';

        $('#confirm').show();
        $('#confirmOk').focus();
        $('#ConfirmRowId').val(flg);
        $('#confirmmessage').text(Msg);

    }
}

function SaveAndUpdateConfirm(flg) {
    $('#btnsubmit').prop('disabled', true);
    var pt = 1;
   
    var oArray = new Array();
    for (var k = 1; k <= Count; k++) {

        var BillMainId = 0;
        var BillNo = 0;
        var BillYear = 0;                  //IPYEAR
        var BillDate = $('#BillDate').val();
        var PayType = $('#PayType').val();
        var RegNo = $('#RegNo').val();
        var RegSeries = $('#RegSeries').val();
        var OpNo = $('#OpNo').val();
        var IpNo = $('#IpNo').val();
        var Name = $('#Name').val();
        var Age = $('#Age').val();
        var Gender = $('#Genderhid').val();
        var Doctor = $('#Doctor').val();
        var Hospital = $('#Hospital').val();
        var TotalAmt = $('#TotalAmt').text();
        var DiscPercent = $('#DiscPercent').val();
        var DiscAmt = $('#DiscAmt').val();
        var NetAmt = $('#NetAmt').text();
        var TestId = $('#TestId' + k).val();
        var Department = $('#Testdate' + k).val();
        var PQty = $('#PQty' + k).val();
        var PRate = $('#PRate' + k).val();
        var TestAmount = $('#TestAmount' + k).val();
        var RateType = $('#Remarks').val();
        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var DelFlag = 1;
        var Type = 1;

        if (TestId != undefined) {
            oArray.push({
                'BillMainId': BillMainId,
                'BillNo': 0,
                'BillYear': 0,
                'BillDate': BillDate,
                'PayType': $('#PayType').val(),
                'RegNo': RegNo,
                'RegSeries': RegSeries,
                'OpNo': OpNo,
                'IpNo': IpNo,
                'Name': Name,
                'Age': Age,
                'Gender': Gender,
                'Doctor': Doctor,
                'Hospital': Hospital,
                'TotalAmt': TotalAmt,
                'DiscPercent': DiscPercent,
                'DiscAmt': DiscAmt,
                'NetAmt': NetAmt,
                'TestId': TestId,
                'Department': Department,
                'PQty': PQty,
                'PRate': PRate,
                'TestAmount': TestAmount,
                'Remarks': RateType,
                'UserId': UserId,
                'DeptId': DeptId,
                'DelFlag': DelFlag,
                'Type': Type,                           // LAB  - 0 , PROCEDURE - 1 
            })
        }
        //console.log(oArray)

    }
    if (oArray != "") {
        var data = { 'LabBill': oArray };
        if (flg == 1) {
            $.ajax(
                {
                    type: "POST",
                    url: "../Revisit/HMS_BillInsertforpharma",
                    data: data,
                    success: function (result) {
                        var status = result.oList[0].Status;
                        var BillNo = result.oList[0].BillNo;
                        var BillYear = result.oList[0].BillYear;
                        $('#BillNoCopy').val(BillNo)

                        Showalerts(status, BillNo, BillYear);
                        $('#btnsubmit').prop('disabled', false);
                    }
                });
        }
        else if (flg == 2) {
            $.ajax(
                {
                    type: "POST",
                    url: "../Revisit/HMS_BillUpdate",
                    data: data,
                    success: function (result) {
                        var status = result.oList[0].Status;
                        var BillNo = result.oList[0].BillNo;
                        var BillYear = result.oList[0].BillYear;
                        Showalerts(status, BillNo, BillYear);
                        $('#btnsubmit').prop('disabled', false);
                    }
                });
        }
    }
}

function ngOnDestroy() {
    $("#myModal").modal("hide");
}

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
    Updateflag = 1; CopyFlag = 0;
    copyrefresh(3);
}

//Delete 
function DeleteLabBill(Flag) {      //Flag=0:Delete Contract  

    $('#Loadingsave').show();
    $('#btndelete').prop('disabled', true);
    var data = {};
    data.BillNo = $('#BillNoCopy').val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Status = 'PB';
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_LabBillDelete",
        data: data,
        success: function (result) {
            $('#btndelete').prop('disabled', false);
            $('#Loadingsave').hide();
            var status = result.oList[0].Status;
            var BillNo = result.oList[0].BillNo;
            var BillYear = result.oList[0].BillYear;
            Showalerts(status, BillNo, BillYear);
        }
    });
}

var LabBillType = LabBillPrintType;        //HALFSIZE    , FULLSIZE  ,DOTMATRIXLAB
function PrintthisBill(flg) {
    if (flg == 1) {
        if (LabBillType == 'HALFSIZE') {
            PrintthisBillWindowsHMS('LABBILL', Count, 'COPYHALF', 'PB');
        }
        else if (LabBillType == 'FULLSIZE') {
            PrintthisBillWindowsHMS('LABBILL', Count, 'COPYFULL', 'PB');
        }
        else if (LabBillType == 'FULLSIZEHEADER') {
            PrintthisBillWindowsHMS('LABBILL', Count, 'COPYFULLHEADER', 'PB');
        }
        else if (LabBillType == 'DOTMATRIXLAB') {
            PrintthisBillLabDotmatrix(Count, 'PROCEDURE BILL');
        }
    }
}

//Delete Grid Rows Confirm box
function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'delete') {
        rowdeleteconfirm(rowid);
    }
    else if (Result == 'true' && status == 'refresh') {
        formrefresh();
    }
    else if (Result == 'true' && status == 'copy') {
        BillCopy(rowid);
    }
    else if (Result == 'true' && status == 'view') {
        BillCopy(rowid);
    }
    else if (Result == 'true' && status == 'Save') {
        SaveAndUpdateConfirm(rowid);
    }
    else if (Result == 'true' && status == 'Update') {
        SaveAndUpdateConfirm(rowid);
    }
    else if (Result == 'true' && status == 'duplicate') {
        AddTestConfirm();
    }
    else if (Result == 'true' && status == 'DeleteBill') {
        DeleteLabBill(rowid);
    }
    else if (Result == 'false' && status == 'duplicate') {
        $('#TestName0').focus();
    }
    else if (Result == 'false' && status == 'DeleteBill') {
        $('#BillNoCopy').focus();
    }
    else if (Result == 'false' && status == 'delete') {
        Defaultfocus();
    }
    $('#confirm').fadeOut();




}

//--------------Common Functions-------------
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
function isNumberIntnew(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.\-]/g, ''));
    if ((charCode != 8 && charCode != 13) && (charCode != 45 || ($(selectedvalue).val().indexOf('-') != -1)) && ((charCode < 48 || charCode > 57))) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;
}


function AskPrintSales(msg) {
    $('#SaveText').text('');
    $('#SaveText').text(msg);
    $("#SavedAlert").modal("show");
    $("#SavedAlert").appendTo("body");
    $('#SavedAlert').on('shown.bs.modal', function () {
        $('#btnSavedOk').focus();
    })
}

function SavePrintConfirm() {
    $("#SavedAlert").modal("hide");
    PrintthisBill(1);
    formrefresh(0);
}



function Showalerts(Status, BillNo, BillYear) {
    if (Status == 1) {
        formrefresh();
        swal("Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

       // AskPrintSales('BillNo - ' + BillNo + ' Saved Successfully.Do you want to Print?');
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
    else if (Status == 4) {
        formrefresh();
        swal('Bill No ' + BillNo, " does nor exists", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        formrefresh();
        swal('Bill No ' + BillNo, "Deleted Successfully", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Bill No ' + BillNo, "Already Exists", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

}
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
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




function GetTrans() {
    if (Copyflag == 1) {
        $("#CmnVoucherNo").val($("#BillNoCopy").val());
        $("#CmnPref0").val("PB");
        $("#CmnPref1").val("");
        $("#CmnPref2").val("");
        $("#CmnPref3").val("");
        $("#CmnDeptId").val(ERPDeptId);
        $("#CmnUserId").val(ERPUserId);
        $("#CmnCondition").val("");
        CmnAccTransGet();
    }
}