var LCount = 0; var ACount = 0; var RCount=0;

$(document).ready(function () {
    Defaultfocus();
    LoadDate();
    IDLoad();


    $('#allinvestigation :checkbox').change(function () {
        alert('changed');
    });
   



    $("#btnsubmit").click(function (e) {
        SaveAndUpdateConfirm(1);
    });

    $("#btnprint").click(function (e) {
        if (($("#PatientId").val() || 0) != 0)
        {

          //  alert(DischargePrintType)
            if (DischargePrintType == 'DEFAULT')
            { PrintthisDischargeSummary(0); }
            else if (DischargePrintType == 'DEFAULTNEW') {
              PrintthisDischargeSummaryNew(0);
            }
        }
        else { warningshow('Please Select Patient', 'RegNo'); }
    });

    $("#btndelete").click(function (e) {
        $('#Confirmflag').val('DeleteDis');
        $('#confirmmessage').text('Do You Want To Delete This Discharge Summary?')
        $('#confirm').show();
        $('#confirmOk').focus();
    });


    $('.patdeys').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('.patdeys:visible');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('input.patdeys').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('input.patdeys:visible');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#DischargeDate,#Reasons').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#PresentComplaints').focus().select();
        }
    });
    $('input.advc:not(.atcm)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('input.advc');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#Days0').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnaddadv').focus();
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

});//Document Close

function IDLoad() {
    var data = {};
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMSSerialNoGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#DischargeNo").val(result.oList[0].DischargeNo);
            }
        }
    });
}

function LoadDate()
{
    $('#DischargeDate,#AfterDate,#SummaryDate').daterangepicker({
        startDate: CurDate,
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    }).val(CurDate);

    $('#SurgeryDate').daterangepicker({
        startDate: CurDate,
        minDate: CurDate, //minDate,
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    }).val('');
}

function Defaultfocus() {
    $("#RegNo").focus().select();
}

//Get Patient Details
function GetPatient(Id) {
    var data = {};                                     
    data.PatientId = Id;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_PatientSearchGet",
        data: data,
        success: function (result) {

            console.log(result.oList)
           
                GetPatientDataa(result.oList, 1);
           
        }
    });
}

function GetPatientDataa(result, Flag) {
   
    if (result.length > 0) {

        var age = AgeCalculation(result[0].DOB);

        var CurrentAge = '';
        if (age.years < 10) {
            if (age.years > 1) yearString = " Years";
            else yearString = " Year";
            if (age.months > 1) monthString = " Months";
            else monthString = " Month";
            if (age.days > 1) dayString = " Days";
            else dayString = " Day";

            if (age.years > 0) { CurrentAge = CurrentAge + age.years + yearString; } if (CurrentAge != '' && (age.months > 0 || age.days > 0)) { CurrentAge = CurrentAge + ', ' }
            if (age.months > 0) { CurrentAge = CurrentAge + age.months + monthString; } if (CurrentAge != '' && age.months > 0 && age.days > 0) { CurrentAge = CurrentAge + ', ' }
            if (age.days > 0) { CurrentAge = CurrentAge + age.days + dayString; }

        }
        else {
            CurrentAge = age.years + ' Years';
        }
        $("#PatAge").text(', ' + CurrentAge);
        $("#PatGender").text(result[0].Gender);
        $("#PatDOB").text(result[0].DOB);
        $("#PatBloodGrp").text(', ' + result[0].BloodGroup);
        $("#PatOccuPation").text(result[0].Occupation);
        $("#PatLastVisit").text(result[0].LastVisit);
        $("#PatDOR").text(result[0].RegDate);
        $("#PatHealthCard").text(result[0].HealthCard);
        $("#PatAadhar").text(result[0].AadharNo);
        $("#PatAdd1").text(result[0].Add1);
        $("#PatAdd2").text(result[0].Add2);
        $("#PatAdd3").text(result[0].Add3);
        $("#PatNumber").text(result[0].Contact);



       // var Ext = (result[0].Status).split('.').pop();
       // CheckImgValid('myImg', result[0].PatientId, Ext);
    }
}

function CheckImgValid(Id, RegId, Ext) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/PatientImage/" + RegId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/PatientImage/" + RegId + "." + Ext + "?" + d.getSeconds());
        }
    });
}

function ShowMoreDetails(flg) {
    var $t = $('#MoreDets');
    if (flg == 0) {
        if ($t.is(':visible')) {
            $t.slideUp();
            $('#Treatment').focus();
        } else {
            $t.slideDown();
            $('#RS').focus();
        }
    }
    else { $t.slideUp(); }
}

function PrintIPStatement() {
    if ($("#PatientId").val() == 0) {
        warningshow('Select IP', 'RegNo');
    }
    else {

    }
}

//-------------------------------Investigation

function ngOnDestroy(flg) {
   
    if (flg == 0) {
       $("#myModalnew").modal("hide");
        $("#myModal").modal("show");
        $("#myModal").appendTo("body");
    }
    else if (flg == 1)
    { $("#myModal,#myModalnew").modal("hide"); }
    else if (flg == 2) {
        $("#myModal").modal("hide");
        $("#myModalnew").modal("show");
        $("#myModalnew").appendTo("body");
    }
}

function GetLabDetails(Id, Series) {
    var date = new Date();
    var intYear = date.getFullYear() - 100;

    var data = {};
    data.BillNo = Id;
    data.DeptId = ERPDeptId;
    data.BillDate = 'NONE';     //From Date
    data.Hospital = Series;     //To Date
    data.UserId = ERPUserId;
    data.Status = 'LB';
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_BillNumberListView",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetPatientLabDetails(result.oList, 0);
            }
        }
    });
}

//List Bill Tests in Popup
function GetPatientLabDetails(result) {
    disable_datatable('tblViewList');
    $('#tblViewList tr').remove();

    var ProdRow = "<thead><tr><th style='width:5%' class='text-right' ></th>" +
         "<th style='width:8%' class='text-center'>Bill No</th>" +
         "<th style='width:5%' class='text-center'>BillDate</th>" +
         "<th style='width:5%' class='text-center'>OpNo</th>" +
         "<th style='width:5%' class='text-center'>IPNO</th>" +
         "<th style='width:5%' class='text-center'>Doctor</th>" +
         "<th style='width:5%' class='text-right'>TotalAmt</th>" +
         "</tr>" +
         "<tr><th > </th><th>Bill No</th><th>BillDate</th><th>OPNo</th><th>IPNO</th><th>Doctor</th><th></th></tr></thead><tbody>";
    if (result.length != 0) {

        for (var n = 0; n < result.length; n++) {
            var Id = parseInt(n) + 1;
            ProdRow += "<tr id='ChRow" + Id + "'  class='jsgrid-row'>" +
                "<td style='width:3%' class='text-center'>" +
                "<input id='Chkbil" + Id + "' name='Chkbill' type='checkbox' onclick='' style='zoom:1.3' />" +
                "</td>" +
                "<td class='text-center' id='tdBillYear" + Id + "' > " + result[n].BillYear + "-" + result[n].BillNo + "</td>" +
                "<td class='text-center' id='tdBillDate" + Id + "' > " + result[n].BillDate + "</td>" +
                "<td class='text-center' id='tdOpNo" + Id + "'     > " + result[n].OpNo + "</td>" +
                "<td class='text-center' id='tdIpNo" + Id + "'     > " + result[n].IpNo + "</td>" +
                "<td class='text-center' id='tdTestName" + Id + "' > " + result[n].TestName + "</td>" +
                "<td class='text-right'  id='tdNetAmt" + Id + "'   > " + parseFloat(result[n].NetAmt).toFixed(Decimal) + "" +
                "<input type=text style=display:none value=" + result[n].BillMainId + " id='tdbillId" + Id + "' /></td>" +
                "</tr>";

            LCount = Id;
        }
        $('#tblViewList').html(ProdRow + '</tbody>');
        datatableWithsearch('tblViewList', 'Multiple');
        $('#tblViewList').scrollTop(0);

    }
    else {
        $('#tblViewList').html(ProdRow + '</tbody>');
        datatableWithsearch('tblViewList', 'Multiple');
    }
}

//View Selected Bills
function ViewBillDetails() {
    var checkboxes = document.getElementsByName('Chkbill');
    var len = checkboxes.length;
    var flg = 0;
    for (var k = 1; k <= parseInt(LCount) ; k++) {
        var Id = parseInt(k);
        if ($('#Chkbil' + Id).prop('checked') == true) {
            flg++;
        }
    }

    if (flg == 0)
    { warningshow('Please Select Test'); }
    else
    {

        var BillNo = '';
        for (var k = 1; k <= parseInt(LCount) ; k++) {
            var slno = $('.HRow').length + 1;
            var Id = parseInt(k); var Name = $('#Chkbil' + Id).attr('name');
            if ($('#Chkbil' + Id).prop('checked') == true && (Name == 'Chkbill')) {
                if (BillNo == '')
                { BillNo += $('#tdbillId' + Id).val(); }
                else
                { BillNo += ',' + $('#tdbillId' + Id).val(); }
            }
            if (k == parseInt(LCount)) {
                var data = {};
                data.FromDate = BillNo;
                data.DeptId = ERPDeptId;
                data.UserId = ERPUserId;
                data.Status = 'LB';
                $.ajax({
                    type: "POST",
                    url: "../Hospital/HMS_PatientSubTestResultGets",
                    data: data,
                    success: function (result) {
                        if (result.oList.length > 0) {
                            GetPatientSubTestDetails(result.oList, 0);
                        }
                    }
                });
            }
        }

    }
}

//List Selected Bills
function GetPatientSubTestDetails(result) {
    disable_datatable('tblSubTest');
    $('#tblSubTest tr').remove();

    var ProdRow = "<thead><tr><th style='width:5%' class='text-right' ><input id='Chkbilrsmain' type='checkbox' onchange='CheckAllBill(0)' style='zoom:1.3' /></th>" +
         "<th style='width:8%' class='text-center'>Bill No</th>" +
         "<th style='width:5%' class='text-center'>TestName</th>" +
         "<th style='width:5%' class='text-center'>SubTest Name</th>" +
         "<th style='width:5%' class='text-center'>Result</th>" +
         "<th style='width:5%' class='text-center'>Normal Value</th>" +
         "<th style='width:5%' class='text-right'>Std Unit</th>" +
         "</tr>" +
         "<tr><th > </th><th>Bill No</th><th>TestName</th><th>SubTest Name</th><th>Result</th><th>Normal Value</th><th>Std Unit</th></tr></thead><tbody>";
    if (result.length != 0) {
        for (var n = 0; n < result.length; n++) {
            var Id = parseInt(n) + 1;
            ProdRow += "<tr id='ChRowrs" + Id + "'  class='jsgrid-row'>" +
                "<td style='width:3%' class='text-center'>" +
                "<input id='Chkbilrs" + Id + "' class='Chkbillrscls' name='Chkbillrs' type='checkbox' onclick='' style='zoom:1.3' />" +
                "</td>" +
                "<td class='text-center' id='ttdBillYear" + Id + "' > " + result[n].BillYear + "-" + result[n].BillNo + "</td>" +
                "<td class='text-center' id='ttdTestName" + Id + "' > " + result[n].TestName + "</td>" +
                "<td class='text-center' id='ttdSubTestName" + Id + "'     > " + result[n].SubTestName + "</td>" +
                "<td class='text-center' id='ttdResult" + Id + "'     > " + result[n].Result + "</td>" +
                "<td class='text-center' id='ttdNormalValue" + Id + "' > " + result[n].NormalValue + "</td>" +
                "<td class='text-center'  id='ttdStdUnit" + Id + "'   > " + result[n].FromDate + "" +
                "<input type=text style=display:none value=" + result[n].TestId + " id='ttdtestmainId" + Id + "' />" +
                "<input type=text style=display:none value=" + result[n].SubTestId + " id='ttdtestsubId" + Id + "' />" +
                "<input type=text style=display:none value=" + result[n].Date + " id='ttDate" + Id + "' /></td>" +
                "</tr>";

            RCount = Id;
        }
        $('#tblSubTest').html(ProdRow + '</tbody>');
        datatableWithsearch('tblSubTest', 'Multiple');
        $('#tblSubTest').scrollTop(0);

    }
    else {
        $('#tblSubTest').html(ProdRow + '</tbody>');
        datatableWithsearch('tblSubTest', 'Multiple');
    }

    ngOnDestroy(2);
}

//Add Selected Tests to Table
function AddBillDetails() {
    var checkboxes = document.getElementsByName('Chkbillrs');
    var len = checkboxes.length;
    var flg = 0;
   
    for (var k = 1; k <= parseInt(RCount) ; k++) {
        var Id = parseInt(k); 
        if ($('#Chkbilrs' + Id).prop('checked') == true) {
            flg++;
        }
    }

    if (flg == 0)
    { warningshow('Please Select Test'); }
    else
    {
        ngOnDestroy(1);
       // $('.RRow').remove();
        var TestId = 0; var SId = 1;
        for (var k = 1; k <= parseInt(RCount) ; k++) {
            var slno = $('.RRow').length + 1;
            var Id = parseInt(k); var Name = $('#Chkbilrs' + Id).attr('name');
            if ($('#Chkbilrs' + Id).prop('checked') == true && (Name == 'Chkbillrs')) {

                if ((TestId == 0) || (TestId != $('#ttdtestmainId' + Id).val())) {
                    TestId = $('#ttdtestmainId' + Id).val();
                    var Row = '<tr class="jsgrid-header-row RRow" style="background-color:#f1f1f1;font-weight:bold">' +
                     '<td class="text-center" style="width: 4%;" > <input checked type="checkbox" id="tstCHECK' + SId + '"></td>' +
                     '<td class="text-center" style="width: 5%;" > ' + slno + '</td>' +
                     '<td class="text-center" style="width: 10%;"> </td>' +
                     '<td class="text-center" style="width: 7%;"> </td>' +
                     '<td class="text-left" style="width: 34%;" id="tstTest' + SId + '">' + $('#ttdTestName' + Id).text() + '</td>' +
                     '<td class="text-center" style="width: 20%;" id="tstSubTest' + SId + '"> </td>' +
                     '<td class="text-center" style="width: 8%;"> </td>' +
                     '<td class="text-center" style="width: 8%;"> </td>' +
                     '<td class="text-right"  style="width: 8%;"></td>' +
                     '</tr>';
                    $('#TblMedicine').append(Row);
                    slno = $('.RRow').length + 1;
                    SId++;
                }

                $('#Chkbilrs' + Id).attr('name', '');
                $('#ChRowrs' + Id).css('display', 'none');
                var ProdRow = '<tr class="jsgrid-header-row RRow">' +
                      '<td class="text-center" style="width: 4%;" > <input checked type="checkbox" id="tstCHECK' + SId + '"></td>' +
                      '<td class="text-center" style="width: 5%;" > ' + slno + '</td>' +
                      '<td class="text-center" style="width: 10%;" id="tstbill' + SId + '"> ' + $('#ttdBillYear' + Id).text() + '</td>' +
                      '<td class="text-center" style="width: 7%;" id="tstdate' + SId + '"> ' + $('#ttDate' + Id).val() + '</td>' +
                      '<td class="text-left" style="width: 34%;" id="tstTest' + SId + '">' + $('#ttdTestName' + Id).text() + '</td>' +
                      '<td class="text-left" style="width: 20%;" id="tstSubTest' + SId + '"> ' + $('#ttdSubTestName' + Id).text() + '</td>' +
                      '<td class="text-center" style="width: 8%;" id="tstResult' + SId + '"> ' + $('#ttdResult' + Id).text() + '</td>' +
                      '<td class="text-center" style="width: 8%;" id="tstNormal' + SId + '"> ' + $('#ttdNormalValue' + Id).text() + '</td>' +
                      '<td class="text-center"  style="width: 8%;padding-left:3px;" id="tstUnit' + SId + '">' + $('#ttdStdUnit' + Id).text() +
                      '<input id="tstTestId' + SId + '" value=' + $('#ttdtestmainId' + Id).val() + ' type="text" style="display:none" />' +
                      '<input id="tstSuTestId' + SId + '" value=' + $('#ttdtestsubId' + Id).val() + ' type="text" style="display:none" /></td>' +
                      '</tr>';
                $('#TblMedicine').append(ProdRow);
                SId++;               
            }
        }
    }
}

function CheckAllBill(flg)
{
    if(flg==0)
    {
        var sts = $('#Chkbilrsmain').prop('checked');
        $('input[name="Chkbillrs"]').prop('checked', sts);
       
    }
}

//Save Discharge Tests
function SaveandUpdateTest(status1, DischargeId,DischargeNo) {
    var oArray = new Array();

    for (var k = 1; k <= $('.RRow').length ; k++) {

        var TestId = $('#tstTestId' + k).val();
        var TestName = $.trim($('#tstTest' + k).text());
        var Rate = $('#PatientId').val();               //PatientId
        var SpRate      = $('#OPVisitId').val();             //OP NO
        var VSpRate     = $('#IP_Number').val();            //IP NO
        var OutsideRate = 0;
        var MedDept = DischargeNo;
        var SubDivision = DischargeId;
        var SubTestId = $("#tstSuTestId" + k).val();
        var SubDiv = $.trim($('#tstbill' + k).text());
        var StdUnit = $.trim($('#tstUnit' + k).text());
        var NormalValue = $.trim($('#tstdate' + k).text());
        var MinValue = $.trim($('#tstNormal' + k).text());
        var MaxValue = $.trim($('#tstResult' + k).text());
        var Notes = $("#tstSubTest" + k).text();
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = status1;
        var EXRate = 0;
        var Status = '';

        if (TestId != undefined && TestId != 'undefined' && Notes!='') {
            oArray.push({
                'TestId': TestId,
                'TestName': TestName,
                'Rate': Rate,
                'SpRate': SpRate,
                'VSpRate': VSpRate,
                'OutsideRate': OutsideRate,
                'MedDept': MedDept,
                'SubDivision': SubDivision,
                'SubTestId': SubTestId,
                'SubDiv': SubDiv,
                'StdUnit': StdUnit,
                'NormalValue': NormalValue,
                'MinValue': MinValue,
                'MaxValue': MaxValue,
                'Notes': Notes,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
                'EXRate': EXRate,
                'Status': Status
            })
        }
    }
    if (oArray != "") {
        var data = { 'HMSTest': oArray };
        $.ajax({
            type: "POST",
            url: "../Hospital/Hms_DischargeSummaryTestsInsertandUpdate",
            data: data,
            success: function (result) {
                Showalerts(status1, DischargeNo);
            }
        });
    }
    else {
        Showalerts(status1, DischargeNo);
   }
}

function GetDischargeTest(Id,DeptId) {
    var data = {};                                    
    data.TestId = Id;
    data.DeptId = DeptId;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_DischargeSummaryTestsGetandGets",
        data: data,
        success: function (result) {            
                GetTestList(result.oList);            
        }
    });
}

function GetTestList(result) {
        var TestId = 0; var SId = 1;
        for (var k = 0; k < result.length ; k++) {
            var slno = $('.RRow').length + 1;
            var Id = parseInt(k);          
            if ((TestId == 0) || (TestId != result[k].TestId)) {
                TestId = result[k].TestId;
                var Row = '<tr class="jsgrid-header-row RRow" style="background-color:#f1f1f1;font-weight:bold">' +
                     '<td class="text-center" style="width: 4%;" > <input type="checkbox" checked id="tstCHECK' + SId + '"></td>' +
                     '<td class="text-center" style="width: 5%;" > ' + slno + '</td>' +
                     '<td class="text-center" style="width: 10%;"> </td>' +
                     '<td class="text-center" style="width: 7%;"> </td>' +
                     '<td class="text-left" style="width: 30%;" id="tstTest' + SId + '">' + result[k].TestName + '</td>' +
                     '<td class="text-center" style="width: 20%;" id="tstSubTest' + SId + '"> </td>' +
                     '<td class="text-center" style="width: 8%;"> </td>' +
                     '<td class="text-center" style="width: 8%;"> </td>' +
                     '<td class="text-right"  style="width: 8%;"></td>' +
                     '</tr>';
                    $('#TblMedicine').append(Row);
                    slno = $('.RRow').length + 1;
                    SId++;
                }              
            var ProdRow = '<tr class="jsgrid-header-row RRow">' +
                   '<td class="text-center" style="width: 4%;" > <input checked type="checkbox" id="tstCHECK' + SId + '"></td>' +
                      '<td class="text-center" style="width: 5%;" > ' + slno + '</td>' +
                      '<td class="text-center" style="width: 10%;" id="tstbill' + SId + '"> ' + result[k].SubDiv + '</td>' +
                      '<td class="text-center" style="width: 7%;" id="tstdate' + SId + '"> ' + result[k].NormalValue + '</td>' +
                      '<td class="text-left" style="width: 30%;" id="tstTest' + SId + '">' + result[k].TestName + '</td>' +
                      '<td class="text-left" style="width: 20%;" id="tstSubTest' + SId + '"> ' + result[k].Notes + '</td>' +
                      '<td class="text-center" style="width: 8%;" id="tstResult' + SId + '"> ' + result[k].dcresult + '</td>' +
                      '<td class="text-center" style="width: 8%;" id="tstNormal' + SId + '"> ' + result[k].dcnormal + '</td>' +
                      '<td class="text-center"  style="width: 8%;padding-left:3px;" id="tstUnit' + SId + '">' + result[k].StdUnit +
                      '<input id="tstTestId' + SId + '" value=' + result[k].TestId + ' type="text" style="display:none" />' +
                      '<input id="tstSuTestId' + SId + '" value=' + result[k].SubTestId + ' type="text" style="display:none" /></td>' +
                      '</tr>';
                $('#TblMedicine').append(ProdRow);
                SId++;          
        }
}

//-------------------------------End Investigation

//--------------------------Advice

function CloseAdvice(flg) {
    if (flg == 9) {
        casesheetdetailsget($('#IP_Number').val(), $('#IP_Year').val(), $('#RegNoSave').val())
        $("#Divcomanddiagnosis").modal("show");
        $("#Divcomanddiagnosis").appendTo("body");
        
    }
    else if (flg == 0) {
        $("#DivAdvice").modal("show");
        $("#DivAdvice").appendTo("body");
        window.setTimeout(function () {
            $('#Medicine0').focus();
        }, 200);
    }

    else if (flg == -1)
    { $("#Divcomanddiagnosis").modal("hide"); }
    else if (flg == 1)
    { $("#DivAdvice").modal("hide"); }
    else if (flg == 2) {
        $('.advc').val('');
        $('#Medicine0').focus();
    }
    else if (flg == 3) {
        $('.advc').val('');
        $('.MRow').remove();
        $('#Medicine0').focus();
    }
}

function AddAdvice() {
    if ($.trim($('#Medicine0').val()) == '')
    { warningshow('Please Select Medicine', 'Medicine0'); }
    //else if (($('#MedicineId0').val() || 0) == 0)
    //{ warningshow('Please Select a valid Medicine', 'Medicine0'); }
    //else if ($.trim($('#Daily0').val() || 0) == 0)
    //{ warningshow('Please Select Daily', 'Daily0'); }
    //else if ($.trim($('#Dosage0').val() || 0) == 0)
    //{ warningshow('Please Select Dosage', 'Dosage0'); }
    //else if ($.trim($('#Days0').val() || 0) == 0)
    //{ warningshow('Please Select Days', 'Days0'); }
    else
    {
        ACount++;
        var Id = parseInt(ACount);
        var slno = parseInt($('.MRow').length) + 1;
        var ProdRow = '<tr class="jsgrid-header-row MRow" height=30px; id="tdMRow' + Id + '">' +
                      '<th class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;"><i class="icon-trash"></i></th>' +
                      '<th class="jsgrid-align-right jsgrid-header-sortable" style="width: 8%;"  id="tdslno' + Id + '"> ' + slno + '  </th>' +
                      '<th class="jsgrid-align-right jsgrid-header-sortable" style="width: 47%;" id="Medicine' + Id + '"> ' + $('#Medicine0').val() + '  </th>' +
                      '<th class="jsgrid-align-right jsgrid-header-sortable" style="width: 10%;" id="Daily' + Id + '"> ' + $('#Daily0').val() + '  </th>' +
                      '<th class="jsgrid-align-right jsgrid-header-sortable" style="width: 10%;" id="Dosage' + Id + '"> ' + $('#Dosage0').val() + '  </th>' +
                      '<th class="jsgrid-align-right jsgrid-header-sortable" style="width: 10%;" id="Days' + Id + '"> ' + $('#Days0').val() + '  </th>' +
                      '</tr>';
        $('#tblAdvice').append(ProdRow);
        CloseAdvice(2);        
    }
}

function AddAdvicetoTable() {

    if (parseInt($('.MRow').length) == 0)
    { warningshow('Please Select Medicines', 'Medicine0'); }
    else
    {
        var ProdRow = ''; 
        for (var k = 1; k <= parseInt(ACount) ; k++) {
            var Id = parseInt(k); var Coma = ''; if ($('#DischargeAdvice').text() != '') { Coma = ' , </br>'; }
            if ($('#Medicine' + Id).length != 0) {
                if (ProdRow != '') { Coma = ' ,</br>'; }

                var medname = $('#Medicine' + Id).text();
                var Dosage = $('#Dosage' + Id).text();
                var Daily = $('#Daily' + Id).text();
                var Days = $('#Days' + Id).text();
                var Notes = '';
                if (Daily == 0) { Daily = '' } else if (Daily == 1) { Daily = Daily + '  Time' } else { Daily = Daily + '  Times' }
                if (Dosage == 0) { Dosage = '' } else { Dosage = Dosage + ' Daily ' }
                if (Days == 0) { Days = '' } else if (Days == 1) { Days = '  X' + Days + ' Day' } else { Days = ' X' + Days + ' Days' }

                ProdRow += medname + '   ' + Dosage + Daily + Days + ',<br>';
            }
        }
        $('#DischargeAdvice').append(ProdRow);
        CloseAdvice(1);
        CloseAdvice(3);
    }
}

//--------------------------End Advice


//--------------------------SAVE

function SaveAndUpdateConfirm(flag) {

    if ($.trim($('#RegNo').val()) == '') {
        warningshow('Please select Patient', 'RegNo');
    }
    else if (($('#PatientId').val()||0) == 0) {
        warningshow('Please select a valid Patient', 'RegNo');
    }
    else {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('SaveCase'); $('#ConfirmRowId').val(flag);
        $('#confirmmessage').text('Do You Want to Continue?');
    }
}

function SaveAndUpdate(flag) {
    var St = 0;
    St = ($('.RRow').length||0);
    $('#btnsubmit').prop('disabled', true);
    var data = {};   //array
    data.DischargeId = $('#DischargeId').val()||0;
    data.DischargeNo = $('#DischargeNo').val()||0;
    data.RegNo = $('#RegNoSave').val();
    data.RegSeries = $('#RegSeries').val();
    data.PatientId = $('#PatientId').val();
    data.IP_Number = $('#IP_Number').val();
    data.IP_Year = $('#IP_Year').val();
    data.PName = $('#PName').val();
    data.OPVisitId = $('#OPVisitId').val();
    data.AdmittedDate = $('#AdmittedDate').val();
    data.DischargeDate = $('#DischargeDate').val();
    data.Reasons = $('#Reasons').val();
    data.Diagnosis = $('#Diagnosis').val();
    data.PresentComplaints = $('#PresentComplaints').val();
    data.PastHistory = $('#PastHistory').val();
    data.FamilyHistory = $('#FamilyHistory').val();
    data.DevelopHistory = $('#DevelopHistory').val();
    data.Immunization = $('#Immunization').val();
    data.Examination = $('#Examination').val();
    data.GenExamination = $('#GenExamination').val();
    data.Course = $('#Course').val();
    data.Treatment = $('#Treatment').val();
    data.DischargeAdvice = $('#DischargeAdvice').text();
    data.RS = $('#RS').val();
    data.GIT = $('#GIT').val();
    data.CNS = $('#CNS').val();
    data.Height = $('#Height').val();
    data.Weight = $('#Weight').val();
    data.CVS = $('#CVS').val();
    data.AfterDays = $('#AfterDays').val();
    data.SummaryDate = $('#SummaryDate').val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    data.DelFlag = flag;
    data.Status = St;
    data.SurgeryDate = $('#SurgeryDate').val();
    data.Variable1 = '';
    data.Variable2 = '';
    data.Variable3 = '';
    data.Variable4 = '';

    console.log(data)
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_DischargeSummaryInsertandUpdate",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            var DischargeId = result.oList[0].DischargeId;
            var DischargeNo = result.oList[0].DischargeNo;
            $('#btnsubmit').prop('disabled', false);
            if ($('.RRow').length >= 1 && (status == 1 || status==2))
            {
                SaveandUpdateTest(status, DischargeId,DischargeNo);
            }
            else
            {
                Showalerts(status,DischargeNo); 
            }
        }
    });   
}

//--------------------------END SAVE

//--------------------------LIST

function GetRows(DischargeId) {

    formrefresh(0);

    var data = {};
    data.DischargeId = DischargeId;
    data.DeptId = ERPDeptId;
    data.Status = '';
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_DischargeSummaryGetandGets",
        data: data,
        success: function (result) {
            if (DischargeId == 0)
            { ShowDischargelist(result); }
            else
            { ShowDischargeGet(result); }
        }
    });
}

function ShowDischargelist(result) {
    disable_datatable('tblDischarge');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th align=center>Sl#</th><th>DischargeNo</th><th>IPNumber</th><th>Name</th><th>AdmittedDate</th><th>DischargeDate</th><th>Complaint</th><th>Diagnosis</th><th>PastHistory</th><th align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].DischargeNo + '</td>' +
            '<td>' + result[i].IP_Number + '</td>' +
            '<td>' + result[i].PName + '</td>' +
            '<td>' + result[i].AdmittedDate + '</td>' +
            '<td>' + result[i].DischargeDate + '</td>' +
            '<td>' + result[i].PresentComplaints + '</td>' +
            '<td>' + result[i].Diagnosis + '</td>' +
            '<td>' + result[i].PastHistory + '</td>' +
            '<td align=center><a onclick=GetRows(' + result[i].DischargeId + ')>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tblDischarge').html(responseText + '</tbody><tfoot><tr><th align=center> </th><th>DischargeNo</th><th>IPNumber</th><th>Name</th><th>AdmittedDate</th><th>DischargeDate</th><th>Complaint</th><th>Diagnosis</th><th>PastHistory</th><th align=center> </th></tr></tfoot>');
    datatableWithsearch1('tblDischarge');
}

function ShowDischargeGet(result) { 
    if (result.length > 0) {

       

        $('#DischargeId').val(result[0].DischargeId);
        $('#DischargeNo').val(result[0].DischargeNo);
        $('#RegNo,#RegNoSave').val(result[0].RegNo);
        $('#RegSeries').val(result[0].RegSeries);
        $('#PatientId').val(result[0].PatientId);
        $('#IP_Number').val(result[0].IP_Number);
        $('#IP_Year').val(result[0].IP_Year);
        $('#PName').val(result[0].PName);
        $('#OPVisitId').val(result[0].OPVisitId);
        $('#AdmittedDate').val(result[0].AdmittedDate);
        $('#DischargeDate').val(result[0].DischargeDate);
        $('#Reasons').val(result[0].Reasons);
        $('#Diagnosis').val(result[0].Diagnosis);
        $('#PresentComplaints').val(result[0].PresentComplaints);
        $('#PastHistory').val(result[0].PastHistory);
        $('#FamilyHistory').val(result[0].FamilyHistory);
        $('#DevelopHistory').val(result[0].DevelopHistory);
        $('#Immunization').val(result[0].Immunization);
        $('#Examination').val(result[0].Examination);
        $('#GenExamination').val(result[0].GenExamination);
        $('#Course').val(result[0].Course);
        $('#Treatment').val(result[0].Treatment);

        var Advice = (result[0].DischargeAdvice).replace(/,/g, ' , </br>');
        $('#DischargeAdvice').append(Advice);
        $('#RS').val(result[0].RS);
        $('#GIT').val(result[0].GIT);
        $('#CNS').val(result[0].CNS);
        $('#Height').val(result[0].Height);
        $('#Weight').val(result[0].Weight);
        $('#CVS').val(result[0].CVS);
        $('#AfterDays').val(result[0].AfterDays);
        $('#SummaryDate').val(result[0].SummaryDate);
        $('#SurgeryDate').val(result[0].SurgeryDate);
        $("#SIP_Number").val(result[0].IP_Year + '/' + result[0].IP_Number);

        GetPatient(result[0].PatientId);
        GetLabDetails(result[0].RegNo, result[0].RegSeries);
        GetNextReviewDate(0);
        closelist(0);
        $('#btndelete').show();

        GetDischargeTest(result[0].DischargeNo, result[0].DeptId);
        DocGet(result[0].IP_Number,result[0].IP_Year);
    }
}

var Medlen = 0; var leninves = 0;
function casesheetdetailsget(IP_Number,IP_Year,Regno)
{

    Medlen = 0; leninves = 0; leninves=0, lenpc=0
    var data = {};
    data.IPYear = IP_Year;
    data.IPNumber = IP_Number;
    data.RegNo = Regno
   
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPDetailsgets",
        data: data,
        success: function (result) {
            Showdetails(result);           
        }
    });

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPmedicineDetailsgets",
        data: data,
        success: function (result) {
            Showdetailsmedicine(result);
        }
    });


}


function Showdetailsmedicine(result)
{   
    var responseText1 = "<thead><tr><th></th><th>Medicine Advices</th></tr></thead><tbody>";
    var responseText2 = "<thead><tr><th></th><th>Investigations</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        if (result[i].Fstatus == 'ME') {
            Medlen += 1
            responseText1 += '<tr><td align=center width="20px"><input id="medchk' + Medlen + '" type="checkbox"></td><td id="selectmedicine' + Medlen + '">' + result[i].medicine + '</td></tr>'
            
        }
        else {
            leninves += 1;
            responseText2 += '<tr><td align=center width="20px"><input id="invchk' + leninves + '" type="checkbox"></td><td id="selectinvest' + leninves + '">' + result[i].medicine + '</td></tr>'
        }
    }
    $('#tblexmedicines').html(responseText1);
    $('#tblexinvestigations').html(responseText2);
}

function MedicineAdvices(medicine)
{
    $('#Treatment').val($('#Treatment').val()+','+medicine);
}


function Addadviceanddetails() {
    var a = ''; var b = ''; var c = '';var e=''
    for (var i = 1; i <= Medlen; i++) {
        if ($("#medchk" + i).is(":checked")) {
                a += $('#selectmedicine' + i).text() + ','            
        }
    }

   // console.log('DC' + lendc)
   // console.log('PC' + lenpc)

    for (var i = 1; i <= lendc; i++) {
        if ($("#invchk" + i).is(":checked")) {
            b += $('#diag' + i).text() + ','
        }
    }
    console.log(leninves);
    for (var i = 1; i <= leninves; i++) {
        if ($("#invchk" + i).is(":checked")) {
            e += $('#selectinvest' + i).text() + ','
        }
    }

    
    

    for (var i = 1; i <= lenpc; i++) {
        if ($("#chkpc" + i).is(":checked")) {
            c += $('#com' + i).text() + ','
        }
    }
    
    $('#Immunization').val(e);
    $('#PresentComplaints').val(c);
    $('#Diagnosis').val(b);
    $('#Treatment').val(a);
    CloseAdvice(-1);
}




var lendc = 0;
var lenpc = 0;


function Showdetails(result) {
    var responseText1 = "<thead><tr><th></th><th>Complaints</th></tr></thead><tbody>";
    var responseText2 = "<thead><tr><th></yh><th>Diagnosis</th></tr></thead><tbody>";

    for (var i = 0; i < result.length; i++) {

        if (result[i].PC != '') {
            lenpc += 1;
            responseText1 += '<tr><td align=center width="20px"><input id="chkpc' + lenpc + '" type="checkbox"></td><td id=com' + lenpc + ' >' + result[i].PC + '</td></tr>'
        }
        if (result[i].Dg != '') {
            lendc += 1;
            responseText2 += '<tr><td align=center width="20px"><input id="chkdg' + lendc + '" type="checkbox"></td><td id=diag' + lendc + ' >' + result[i].Dg + '</td></tr>'
        }
    }

    $('#tbldignosis').html(responseText1);
    $('#tblcomplaints').html(responseText2);
}






function DocGet(IP_Number,IP_Year)
{
    $('#DoctorName').val('');
    var dt = new Date();
    var data = {};
    data.IPYear = IP_Year;
    data.IPNumber = IP_Number;
    data.Date = '';
    data.DDate = '';
    data.DoctorId = 0;
    data.PatientId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_IPRegistrationGets",
        data: data,
        success: function (result) {
            $('#DoctorName').val(result[0].DoctorName);
        }
    });
}

//--------------------------END LIST

//--------------------------OTHERS

function ConfirmboxResult(Result, Status, RowId) {
    if (Result == 'true' && Status == 'SaveCase') {
        SaveAndUpdate(RowId);
    }
    else if (Result == 'true' && Status == 'DeleteDis') {
        SaveAndUpdate(0);
    }
   
    $('#confirm').fadeOut();
}

function formrefresh(Flag) {                           //Flag-0:Formrefresh  ,Flag-1:Clear before autocomplete
    $("#PatientId,#IP_Number,#IP_Year,#RegNoSave,#RegSeries").val(0);
    $("#PName,#SIP_Number,#OPVisitId,#AdmittedDate").val('');
    $('.detextnull,#DischargeAdvice').text('');
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");

    if (Flag==0)
    {
        $("#RegNo,.patdeys,#DischargeId").val('');
       
        Defaultfocus();
        ShowMoreDetails(1);
        $('.HRow,.RRow').remove();
       
        LCount = 0; ACount = 0; RCount = 0;
        CloseAdvice(3)

        disable_datatable('tblViewList');
        $('#tblViewList tr').remove();

        LoadDate();
        IDLoad();
        $('#btndelete').hide();
    }
   
}

//Date Calculation
function GetNextReviewDate(flg) {
    if (flg == 0)
    {
      var terms = ($('#AfterDays').val() || 0); terms = isNaN(terms) ? 0 : terms;
      var startdate = CurDate;
      var newdate = moment(startdate, "DD/MM/YYYY");
      newdate.add(terms, 'days');
      var dd = new Date(newdate).getDate();
      var mm = new Date(newdate).getMonth() + 1;
      var y = new Date(newdate).getFullYear();
      var someFormattedDate = (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + y;
      $('#AfterDate').val(someFormattedDate);
    }
    else if(flg==1)
    {
       var a = moment(CurDate, 'D/M/YYYY');
       var b = moment($('#AfterDate').val(), 'D/M/YYYY');
       var diffDays = b.diff(a, 'days');
         if (diffDays > 0)
         { $('#AfterDays').val(diffDays); }
         else
         { $('#AfterDays').val(''); }
     }
}

function closelist(flg) {
    if (flg == 1)
    {
        formrefresh(0);
    }
    $('#Entry').show();
    $('#listing').hide();
}
//--------------------------END OTHERS

//-------------------------------------------COMMON

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status, CaseSheetId) {
    if (Status == 1) {
        window.setTimeout(function () {
            formrefresh(0);
            swal('Discharge No.' + CaseSheetId + ' Saved Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }, 200);
    }
    else if (Status == 2) {
        window.setTimeout(function () {
            formrefresh(0);
            swal('Discharge No.' + CaseSheetId + ' Updated Successfully', "", "success");
            $('.swal-button swal-button--confirm').focus();
        }, 200);
    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Discharge No.' + CaseSheetId + ' Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh(0);
        swal('Discharge No.' + CaseSheetId + '  Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        swal('Discharge No.' + CaseSheetId + ' already exists', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh(0);
        swal('Discharge No.' + CaseSheetId + ' Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Discharge No.' + CaseSheetId + ' Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
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


function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');

    });


    // AddColumnSelectionButton(tableButtonContainerId, tablename)

    table = $('#' + tablename).DataTable({
        // dom: 'Bfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],

        "columnDefs": [
         { "width": "5%", "targets": 0 },
         { "width": "8%", "targets": 1 },
         { "width": "8%", "targets": 2 },
         { "width": "17%", "targets": 3 },
         { "width": "7%", "targets": 4 },
         { "width": "7%", "targets": 5 },
         { "width": "15%", "targets": 6 },
         { "width": "15%", "targets": 7 },
         { "width": "15%", "targets": 8 },
         { "width": "5%", "targets": 9 },
        ],

    });
    new $.fn.dataTable.Buttons(table, {
        buttons: [
        {
            extend: 'collection',
            text: 'Export',
            className: 'excelexport',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'EUMI ERP',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                }
            ]
        },
        //'colvis'
        ]
    });
    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
    table.columns().every(function () {
        var that = this;
        $('input', this.footer()).on('keyup change', function () {
            if (that.search() !== this.value) {
                that
                    .search(this.value)
                    .draw();

            }
        });
    });
    if (ExcelExport == 0) {
        $('.excelexport').hide();
    }
}

function disable_datatable(tablename) {

    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();

        table.destroy();
        return;
    }
}