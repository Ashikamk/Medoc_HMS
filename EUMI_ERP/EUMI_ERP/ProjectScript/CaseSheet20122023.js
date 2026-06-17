var InvCount = 0; var MedCount = 1; var GroupSelect = "";

$(document).keydown(function (e) {
    //$('#Warningpopup').fadeOut();
    var X = e.keyCode;
    
   if (X == 27) {                         //ESC       :   Popup Close
       ngOnDestroy();
       PopUpClose(1);
       ngOnAllergy();
       ClosePrevVisit();
   }

   else if ((X >= 112) && (X <= 118)) {
       if (X == 112) {              //F1
           // $('#tab1').click();
           $('#btntsubmit').click();           
       }
       else if (X == 119) {        //F2
           $('#tab1').click();
       }
       else if (X == 113) {        //F2
           $('#tab2').click();
       }
       else if (X == 114) {        //F3
           $('#tab3').click();
       }
       else if (X == 115) {        //F4
           //$('#tab4').click();
           SaveAndUpdateConfirm(1);
       }
       else if (X == 117) {        //F6
           Showpopup(1);
       }
       else if (X == 118) {        //F7
           $('#tab4').click();
          
       }

       e.cancelBubble = true;
       e.returnValue = false;
       e.keyCode = false;
       return false;
   }
});

$(document).ready(function () {
    Defaultfocus();

    LoadDate();
    IDLoad();
    GroupPageLoad();
    DeclareDate('VaccDate_1');
    DeclareDate('VacNextDate_1');
    DeclareDate('PVaccDate_1');
    DeclareDate('PVacNextDate_1');

    $("#btnsubmit").click(function (e) {
        SaveAndUpdateConfirm(1);
    });
    $("#btntsubmit").click(function (e) {
       
        $('#SendSMS').prop('checked', false);
        SaveAndUpdateConfirm(1);
    });
    
    $('.invdt:not(.atfd)').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('.invdt:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('.patdeys').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            var inputs = $(this).closest('body').find('.patdeys:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#ICDDetails').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });

    $('#PRegNo').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            //do something   
        }
    });
      
    $("#btndelete").click(function (e) {
        $('#Confirmflag').val('DeleteCase');
        $('#confirmmessage').text('Do You Want To Delete This Record?')
        $('#confirm').show();
        $('#confirmOk').focus();
    });

    if (window.File && window.FileList && window.FileReader) {

        $("#selectedImage").on("change", function (e) {
            ScratchImgArray = [];
            var files = e.target.files,
              filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {
                var f = files[i];
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {
                    var file = e.target;
                    ScratchImgArray.push(e.target.result);
                    $('#myImg').attr('src', ScratchImgArray[0]);
                    CurImg = 0;
                });
                fileReader.readAsDataURL(f);
            }
        });
    } else {
        alert("Your browser doesn't support to File API")
    }

    $('.nav-link').click(function (e) {
        var id = $(this).attr('id');
        if (id == 'tab1') {
            window.setTimeout(function () { $('#Complaint').focus().select(); });
        }
        if (id == 'tab6') {
            window.setTimeout(function () { $('#Vaccine_1').focus().select(); });
        }
        else if (id == 'tab2')
        {
            window.setTimeout(function () {
                var Id = $('#TblMedicine tr:first-child').attr('id').match(/\d+/)[0];
                $('#Medicine' + Id).focus().select();
            });
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
    $("#btncnclsave").focus(function (e) {
        $("#btncnclsave").removeClass("btn btn-outline-warning");
        $("#btncnclsave").addClass("btn btn-warning white");
    });

    $("#btncnclsave").focusout(function (e) {
        $("#btncnclsave").removeClass("btn btn-warning white");
        $("#btncnclsave").addClass("btn btn-outline-warning");
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
    MedicineFocus();

});

function IDLoad() {
    var data = {};
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMSSerialNoGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                //$("#CaseSheetNo").val(0); 
            }
        }
    });
}

function ICDGet()
{
    $("#ICD").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $("#ICDId").val(0);
            $("#ICDDetails").val('');
            var data = {};
            data.Advice = $("#ICD").val();
            data.DelFlag = 1;
            data.Status = '';
            $.ajax({
                url: '../Hospital/HMS_ICDGetandGets',  //Search
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: '2',
                            label: item.Advice ,
                            label1: item.Diagnosis,
                            label2: item.AadharNo,            //IP NUMBER
                            PatientId: item.PatientId,
                            Advice: item.Advice,
                            Diagnosis: item.Diagnosis,
                            headers: ["Code", "Description"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
            $("#ICDId").val(ui.item.PatientId);
            $('#ICDDetails').val(ui.item.Diagnosis);
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#ICD').val() == '') || (($('#ICDId').val() || 0) != 0))) {
            $('#ICDDetails').focus().select();
        }
    });
}

function LoadDate() {
    $('#CaseDate,#PDOB,#NextDate').daterangepicker({
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);
    CheckEOD();
}

function GroupPageLoad() {
    var data1 = {};
    data1.DepId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/MedDeptGetandGets",
        data: data1,
        success: function (result) {
            GroupLoad(result.oList);
        }
    });
}

function GroupLoad(result) {
    GroupSelect = "";
   // GroupSelect = "<option value='0'>-Select-</option>";
    for (var i = 0; i < result.length; i++) {

        GroupSelect = GroupSelect + "<option value='" + result[i].DepId + "'>" + result[i].Department + "</option>";
    }
    $("#VaccCompany_1,#PVaccCompany_1").append(GroupSelect);
}

function CheckEOD() {
    if (EODType == 'EOD') {
        $("#CaseDate").addClass('bgcolrwht');
        $("#CaseDate").prop('disabled', true);
    }
    else {
        $("#CaseDate").removeClass('bgcolrwht');
        $("#CaseDate").prop('disabled', false);
    }
}

function Defaultfocus() {
    $('#Complaint').focus();
}

function FunctionConfirm(flg)
{
    if (($('#PatientName').val() == '') || (($('#CaseSheetId').val()||0)!=0))
    {
        formrefresh(0);
    }
    else if (($('#PatientName').val() != '') || (($('#CaseSheetId').val() || 0) == 0))
    {
    $('#Confirmflag').val(flg);
    var msg = '';
    if (flg == 'Clear')
        msg = 'Data Will be Lost!Do You Want To Continue?';
    $('#confirmmessage').text(msg);
    $('#confirm').show();
    $('#confirmOk').focus();
    }
}

function formrefresh(Id) {

    $('.form-control,#CaseDate,#selectedImage').val('');
    $("#GridPopUp1,#IMMGridLength").val(1);
    $('#btndelete').hide();
    $('#AlleryInfoPopUp').fadeOut("slow")
    ClearData(0);
    ClearData(1);
    Defaultfocus();
    LoadDate();
    IDLoad();

    RowRemove(0);
    RowRemove(1);
    RowRemove(2);

    CheckEOD();
    $('#CaseSheetNo').val(0);
    $("#ModeSpan").text("Mode : New");
    $('#SendSMS').prop('checked', true);
   
}

//Remove Table Rows
function RowRemove(flg) {

    if (flg == 0) {                                        //Remove Medicine Tbl Rows
        $('.Mrow:not(.fxrow)').remove();
        MedCount = 1;
        if (!$('#MdRow1').hasClass('NtAd')) {
            $('#MdRow1').addClass("NtAd");
        }
    }
    else if (flg == 1)                                    //Remove Investigation Tbl Rows
    {
        InvCount = 0;
        $('.InvRow').remove();
    }
    else if (flg == 2)                                    //Remove immunization Tbl Rows
    {
        $("#IMMGridLength").val(1);
        $('.IMRow').remove();
        $("#VaccineId_1,#VaccCompany_1,#VaccStatus_1").val(0);
    }
}

function ClearData(flg) {
    if (flg == 0) {                                //Clear before register no autocomplate
        $('.ptdet').text('');
        $('.ptsv').val('');
        $('.TRow').remove();
        $('.VRow').remove();
        $('#AlleryInfoPopUp').fadeOut("slow")
        $("#Complaint,#Diagnosis,#Advice,#Allergies,#Details,#Notes,#ICD,#ICDDetails,#Medicine1,#Daily1,#Dosage1,#Days1").val('');
        $("#Vaccine_1,#VaccDate_1,#VacNextDate_1").val('');
        $("#MedicineId1,#VaccineId_1,#VaccCompany_1,#VaccStatus_1").val(0);
        RowRemove(0);
        RowRemove(1);
        RowRemove(2);
        $('#CaseSheetNo').val(0);
        $("#ModeSpan").text("Mode : New");
    }
    else if (flg == 1) {                          //Clear after adding investigation
        $('.invdt').val('');
    }
}

function SaveAndUpdateConfirm(flag) {

    if ($.trim($('#Complaint').val()) == '') {
        warningshow('Please Enter Case Sheet Data', 'Complaint');
    }
    else {


        if (parseInt($('#CaseSheetNo').val()) == 0) {

            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('SaveCase'); $('#ConfirmRowId').val(1);
            $('#confirmmessage').text('Do You Want to Save this Casesheet?');

        }
        else {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('UpdateCase'); $('#ConfirmRowId').val(1);
            $('#confirmmessage').text('Do You Want to Update this Casesheet?');
        }
    }
}

function CheckEditInvoce() {
    if ($.trim($('#otp').val()) == '') {
        warningshow('Enter OTP', 'otp');
    }
    else if ($.trim($('#otpremarks').val()) == '') {
        warningshow('Enter Remarks', 'otpremarks');
    }
    else {
        var Operation = 'Casesheet Update';

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
                    OTPCheck(status)
                }
            }
        });
    }
}

function OTPCheck(status) {
    if (status == 1) {        
        SaveAndUpdate(1);
    }
    else {
        warningshow('Invalid OTP', 'otp');
        $("#otp").select();
    }
}

function SaveAndUpdate(flag) {
    $('#OTPDiv').hide();
    var fl;

    console.log(flag)
    if (flag == 0 )
    { fl = 0;}
    else { fl = 1; }

    if (flag !=2) {
         $('#btnsubmit').prop('disabled', true);
    }

    var flSendSMS = ''; var flSpecialFees = '';
    if ($('#SendSMS').prop('checked') == true) { flSendSMS = 'YES' }
    if ($('#SpecialFees').prop('checked') == true) { flSpecialFees = 'YES' }

        var data = {};   //array
        data.CaseSheetId = $('#CaseSheetId').val();
        data.CaseSheetNo = $('#CaseSheetNo').val();
        data.RegSeries = $('#RegSeries').val();
        data.PRegNo = $('#PRegNo').val();
        data.RevisitId = $('#RevisitId').val();
        data.PatientIP = 0;
        data.IPYear = 0;
        data.Complaint = $('#Complaint').val();
        data.Diagnosis = $('#Diagnosis').val();
        data.Advice = $('#Advice').val();
        data.Allergies = $('#Allergies').val();
        data.Details = $('#Details').val();
        data.Notes = $('#Notes').val();
        data.ICD = $('#ICD').val() + '$$' + $('#txtremarks').val();
        data.ICDDetails = $('#ICDDetails').val();
        data.CaseDate = $('#CaseDate').val();
        data.UserId = ERPUserId;
        data.DeptId = ERPDeptId;
        data.DelFlag = fl;
        data.Status = 'OP';
        data.SendSMS = flSendSMS;
        data.SpecialFees = flSpecialFees;
        data.Nextreview = $('#NextDate').val();
        console.log('AA'+flag)
        if (flag == 2)                                                   //Temporary Save
        {
            $.ajax({
            type: "POST",
            url: "../Hospital/HMS_TemporaryCaseSheetInsert",
            data: data,
            success: function (result) {
                formrefresh();
                console.log('TEMPSAVE' + flag)
            }
        });
        }
        else                                                             //Save,Update,Delete
        {
            $("#LoadingSmall").show();
             $.ajax({
                type: "POST",
                url: "../Hospital/HMS_CaseSheetInsertandUpdate",
                data: data,
                success: function (result) {
                    var status = result.oList[0].Status;
                    var CaseSheetId = result.oList[0].CaseSheetNo;                   
                    $('#btnsubmit').prop('disabled', false);
                    console.log('SAVE' + status)
                   
                    
                    if ((status == 1) || (status == 2)) {
                        
                        SubDetailsSave(status,CaseSheetId, RegSeries, PRegNo,RevisitId);
                        
                    }
                    else {
                        $("#LoadingSmall").hide();
                        Showalerts(status, CaseSheetId);
                    }
                    sentmessagetovist();
                }
            });
        }
}





function sentmessagetovist() {
    var SMS = document.getElementById('SendSMS').checked;
    if (SMS == true) {
        var nxtreview = $('#NextReview').val();
        var dateObj = new Date(Date.now() + 86400000 * nxtreview);
        var month = parseInt(1 + dateObj.getUTCMonth());
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = day + "/" + month + "/" + year;

        var Admit = document.getElementById('ipselect').checked;
        var Name = $('#PatientName').val();
        if (nxtreview != '') {
            var MSG = 'DEAR ' + Name + ',THANK YOU FOR VISITING PONNAMBALAM CHILD CARE, YOUR NEXT VISIT SCHEDULED ON ' + newdate + '  . WISH YOU A SPEEDY RECOVERY. FOR EMERGENCY CALL 8281887777';
        }
        else {
            if (Admit == true) {
                var MSG = 'DEAR ' + Name + ',YOU ARE ADMITTED IN THE HOSPITAL FOR YOUR BETTER HEALTH. WISH YOU A SPEEDY RECOVERY.';
            }
            else {
                var MSG = 'DEAR ' + Name + ',THANK YOU FOR VISITING PONNAMBALAM CHILD CARE. WISH YOU A SPEEDY RECOVERY. FOR EMERGENCY CALL 8281887777';
            }
        }
        var Uid = "";
        var Password = '';
        var SenderId = '';
        var Route = '';

        var Phoneno = $('#ContactNo').val();
        var PHLen = Phoneno.length;
        var No = '0';
        if (PHLen == 10) {
            No = Phoneno;
        }
        else
        {
            No = 0;
        }

       

        if (No != 0) {

            ////var URL = "http://167.114.117.218/rest/services/sendSMS/sendGroupSms?AUTH_KEY=3338609fea54c41113a3162d56ec69&message=" + MSG + "&senderId=PONHOS&routeId=1&mobileNos=" + No + "&smsContentType=english"
            ////var data = {};   //array
            ////data.URL = URL;
            ////$.ajax(
            ////{
            ////    type: "POST",
            ////    url: "../Hospital/SendVisitSms",
            ////    data: data,
            ////    success: function (result) { }
            ////});
        }

    }
}






























//Save Sub Details after Main Details
function SubDetailsSave(status, CaseSheetId)
{
    console.log("SUB SAVE")
    var oArray = new Array();
    for (var k = 1; k <= MedCount; k++) {

        var RegSeries = $("#RegSeries").val();
        var PRegNo = $("#PRegNo").val();
        var RevisitId = $("#RevisitId").val();
        var PatientIP=0;
        var IPYear=0;
        var MedicineId =parseInt( $('#MedicineId' + k).val()||0);
        var Medicine = $('#Medicine' + k).val();
        var Daily = $('#Daily' + k).val();
        var Dosage = $('#Dosage' + k).val();
        var Days = $('#Days' + k).val();

        var MedNotes = $('#mednote' + k).val();


        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var DelFlag = 0;
        var Type = 0;
        if (Medicine != '') {
            oArray.push({
                'RegSeries': RegSeries,
                'PRegNo': PRegNo,
                'RevisitId': RevisitId,
                'PatientIP': PatientIP,
                'IPYear': IPYear,
                'MedicineId': MedicineId,
                'Medicine': Medicine,
                'Daily': Daily,
                'Dosage': Dosage,
                'Days': Days,
                'UserId': UserId,
                'DeptId': DeptId,
                'DelFlag': DelFlag,
                'Type': Type,
                'Mednotes': MedNotes,
            })
        }
    }

    for (var k = 1; k <= InvCount; k++) {

        var RegSeries = $("#RegSeries").val();
        var PRegNo = $("#PRegNo").val();
        var RevisitId = $("#RevisitId").val();
        var PatientIP = 0;
        var IPYear = 0;
        var InvstgtId = $('#InvstgtId' + k).val();
        var InvstgtName = $('#InvstgtName' + k).val();
        var InvstgtResult = $('#InvstgtResult' + k).val();
        var InvstgtNormal = $('#InvstgtNormal' + k).val();
        var selectedDocs = fname;                //selectedDocs
        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var DelFlag = 0;
        var Type = 1;
        if (InvstgtId != '' && InvstgtId != 0 && InvstgtId != undefined) {

            var fname = '';
            var fi = document.getElementById('selectedDocs' + k);

            for (var i = 0; i <= fi.files.length - 1; i++) {
                if (fname == '')
                { fname = fi.files.item(i).name; }
                else { fname = fname + ',' + fi.files.item(i).name; }
            }

            oArray.push({
                'RegSeries': RegSeries,
                'PRegNo': PRegNo,
                'RevisitId': RevisitId,
                'PatientIP': 0,
                'IPYear': 0,
                'MedicineId': InvstgtId,
                'Medicine': InvstgtName,
                'Daily': InvstgtResult,
                'Dosage': InvstgtNormal,
                'Days': selectedDocs, 
                'UserId': UserId,
                'DeptId': DeptId,
                'DelFlag': DelFlag,
                'Type': Type,
                'Mednotes':'',
            })
        }
    }

    if (oArray == "") {
        oArray.push({
            'RegSeries': $("#RegSeries").val(),
            'PRegNo': $("#PRegNo").val(),
            'RevisitId': $("#RevisitId").val(),
            'PatientIP': 0,
            'IPYear': 0,
            'MedicineId': 0,
            'Medicine': '',
            'Daily': 0,
            'Dosage': 0,
            'Days': 0,
            'UserId': UserId,
            'DeptId': DeptId,
            'DelFlag': 0,
            'Type': Type,
            'Mednotes':'',
        })
    }
    
    if (oArray != "")
    {
        var data = { 'CaseSheet': oArray };
        $.ajax(
        {
            type: "POST",
            url: "../Hospital/HMS_CaseSheetSubDetailsInsert",
            data: data,
            success: function (result) {
                ImmunizationUpdate(status,CaseSheetId);
                Showalerts(status, CaseSheetId);
            }
        });
    }
    else {
        ImmunizationUpdate(status,CaseSheetId);
        Showalerts(status, CaseSheetId);
    }
}

function GetRows(CaseSheetId, Status,Flag) {
    
    var data = {};
    data.CaseSheetId = CaseSheetId;
    data.DelFlag = 0;
    data.Status = Status; 
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_CaseSheetGetandGets",
        data: data,
        success: function (result) {
            debugger;
            if (Status != 'TEMP')
            {
                if (Flag != 2) {//List OR Copy
                    $('#CaseSheetId').val(CaseSheetId);
                    if (CaseSheetId == 0)
                        ShowCaseSheetlist(result);
                    else
                        ShowCaseSheetGet(result, Flag);
                }
                else {
                    //POPUP
                    PrevVisitDetails(result, Flag);
                }
            }
            else if (Status == 'TEMP')                             //Call Tempdata of Patient
            {
                ShowCaseSheetTemp(result)
            }
        }
    });
}

function ShowCaseSheetTemp(result)
{

    debugger;
    if (result.length > 0) {
        $('#Complaint').val(result[0].Complaint);
        $('#Diagnosis').val(result[0].Diagnosis);
        $('#Advice').val(result[0].Advice);
        $('#Allergies').val(result[0].Allergies);
        $('#Details').val(result[0].Details);
        $('#Notes').val(result[0].Notes);
        $('#ICD').val(result[0].ICD);
        $('#ICDDetails').val(result[0].ICDDetails);
        $('#CaseDate').val(result[0].CaseDate);
    }
    else {
      

    }
    GethealthDetails($('#RevisitId').val(), $('#PatientId').val());
    Getpatientdocumnet($('#RevisitId').val(), $('#PatientId').val());
}



function Getpatientdocumnet(RVId, PID) {
    var data = {};
    data.InsuranceCompanyId = PID;
    $.ajax({
        type: "POST",
        url: "../Master/InsuranceCompanyGetandGets",
        data: data,
        success: function (result) {
            ShowInsuranceCompanylist(result.oList);
        }
    });

}

function addotherfiles() {
    window.open('../Master/DocumentUploads?pid=' + $('#PatientId').val() + '&pname=' + $('#PatientName').val() + '&mrno=' + $('#PRegNo').val());
}

function ShowInsuranceCompanylist(result) {
   // disable_datatable('Tblxray');
    var responseText = "";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        var R1 = (result[i].Benefits).split("###");
        responseText += '<tr  style="pointer:cursor;height:40px"><td style="width: 8%;" align=center>' + slno + '</td><td  style="width: 10%;">' + R1[5] + '</td><td  style="width:38%;">  <a  target="_blank" href="' + R1[1] + '"><img href="' + R1[1] + '">' + result[i].InsuranceCompanyCode + '</a></td><td style="width: 30%;">' + R1[0] + '</td></tr>';
    }
    $('#Tblxray').html(responseText + '</tbody>');
    // $('#tblinsuranceCompany').DataTable();
    //datatableWithsearch1('Tblxray');
}





function ShowCaseSheetlist(result) {
    $('#AlleryInfoPopUp').fadeOut("slow");
        disable_datatable('tblCaseSheet');
        $('#Entry').hide();
        $('#listing').show();
        var responseText = "<thead><tr><th align=center>Sl#</th><th>Reg#</th><th>OPVisit#</th><th>Name</th><th>Gender</th><th>Complaint</th><th>Diagnosis</th><th>Advice</th><th align=center>Edit</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            var slno = parseInt(i + 1);
            responseText += '<tr>' +
                '<td align=center>' + slno + '</td>' +
                '<td>' + result[i].Medicine + '-' + result[i].PRegNo + '</td>' +
                '<td>' + result[i].RevisitId + '</td>' +
                '<td>' + result[i].PName + '</td>' +          
                '<td>' + result[i].PGender + '</td>' +
                '<td>' + result[i].Complaint + '</td>' +
                '<td>' + result[i].Diagnosis + '</td>' +
                '<td>' + result[i].Advice + '</td>' +
                '<td align=center><a onclick=GetRows(' + result[i].CaseSheetNo + ',"CASE",0)>' + Editbutton + '</a></td>' +
                '</tr>';
        }
        $('#tblCaseSheet').html(responseText + '</tbody><tfoot><tr><th align=center> </th><th> </th><th> </th><th>Name</th><th>Gender</th><th>Complaint</th><th>Diagnosis</th><th>Advice</th><th> </th></tr></tfoot>');
        datatableWithsearch1('tblCaseSheet');
      }

function ShowCaseSheetGet(result, Flag) {
    $("#ModeSpan").text("Mode : Modify");
    $("#EditFlag").val(result[0].DelFlag);
    $('#CaseSheetNo').val(result[0].CaseSheetNo);
    $('#RegSeries').val(result[0].RegSeries);
    $('#PRegNo').val(result[0].PRegNo);
    $('#RevisitId').val(result[0].RevisitId);
    $('#PatientOP').text(result[0].RevisitId);
    $('#PatientId').val(result[0].PatientId);
    $('#Complaint').val(result[0].Complaint);
    $('#Diagnosis').val(result[0].Diagnosis);
    $('#Advice').val(result[0].Advice);
    $('#Allergies').val(result[0].Allergies);
    $('#Details').val(result[0].Details);
    $('#Notes').val(result[0].Notes);

    var ICD = result[0].ICD;
    var ind = ICD.indexOf("$$");

    $('#ICD').val(ICD.substring(0, ind));
    $('#txtremarks').val(ICD.substring(ind+2,1000));



    $('#ICDId').val(result[0].ICDId);
    $('#ICDDetails').val(result[0].ICDDetails);
    $('#CaseDate').val(result[0].CaseDate);

    GetAllergyDetails(result[0].RegSeries, result[0].PRegNo, 0);
    
    if (result[0].SendSMS == 'YES') { $('#SendSMS').prop('checked', true) } else {
        // $('#SendSMS').prop('checked', false)
        $('#SendSMS').prop('checked', true);
    }
    if (result[0].SpecialFees == 'YES') { $('#SpecialFees').prop('checked', true) } else { $('#SpecialFees').prop('checked', false) }

    if (Flag != 1) { // IF not Called from GetLastRevisitDetails function
        GetLastRevisitDetails(result[0].PatientId, $('#RevisitId').val());
    }
    GetImmunizationDetails(result[0].RevisitId, 0, 1);
    GetMedicine(result[0].RevisitId, 0);
    GetInvestigation(result[0].RevisitId);

    
   
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



//-------------------------------------Patient Details
function LoadRegNumber() {

    $("#PRegNo").autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {

            ClearData(0);

            var data = {};
            data.PatientName = $("#PRegNo").val();
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
                            OPSerId: item.OPSerId,
                            Father:item.ShiftName,
                            FOccup: item.TokenNumber,
                            Mother: item.SpecialFees,
                            MOccup: item.SendSMS,
                            headers: ["RegNo", "Patient", "IP No"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,

        select: function (event, ui) {
           
            GetLastRevisitDetails(ui.item.PatientId);
            GetAllergyDetails(ui.item.OPSerId, ui.item.OPNumber, 0);


            $('#FatherName').val(ui.item.Father);
            $('#FtOccupation').val(ui.item.FOccup)
            $('#MotherName').val(ui.item.Mother)
            $('#MtOccupation').val(ui.item.MOccup)
        },
    }).on('keydown', function (e) {
        if ((e.which == 13) && (($('#PRegNo').val() == '') || (($('#RegSeries').val() || 0) != 0))) {
            e.preventDefault();
            $('#Complaint').focus().select();
        }
    });

}


function PaientinfoUpdate()
{

     var data = {};     
     data.RegSeries = $("#RegSeries").val();
     data.RegNo = $("#PRegNo").val();
     data.MobileNo = $('#ContactNo').val();
     data.Address1 = $('#Address').val();
     data.Birthweight = $('#PatientBirthWeight').val();
     data.Currentweight = $('#PatientWeight').val();
     data.PName = $('#PatientName').val();
     data.Fathersname = $('#FatherName').val();
     data.Mothersname = $('#MotherName').val();
     data.FatherOccupation = $('#FtOccupation').val();
     data.MotherOccupation = $('#MtOccupation').val();
     data.PDOB = $('#PatientDOB').val();

    $.ajax({
        type: "POST",
        url: "../Master/HMS_RegistrationInsertandUpdatefromcasesheet",
        data: data,
        success: function (result) {
            warningshow('Data Updated', '');
        }

    });

}


function allergycheck() {
    var len = ($('#Complaint').val()).length
    if (len < 5) {
        var data = {};
        data.RegSeries = 1;
        data.PRegNo = $('#PRegNo').val();
        data.PatientId = 0;
        data.DeptId = ERPDeptId;
        data.UserId = ERPUserId;
        $.ajax({
            type: "POST",
            url: "../Hospital/HMS_AllergyList",
            data: data,
            success: function (result) {
                GetAllergy(result.oList, 0);
            }
        });
    }
}




function GetAllergyDetails(RegSerId, RegNo, Flag) {
  
    var data = {};
    data.RegSeries = RegSerId;
    data.PRegNo = RegNo;
    data.PatientId = 0;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_AllergyList",
        data: data,
        success: function (result) {           
            GetAllergy(result.oList,Flag);      
        }
    });
}

function GetAllergy(result, Flag) {
    $("#AlleryInfoPopUp").fadeOut("slow");
    $("#presremarks").fadeOut("slow");

   
    
    $("#tbl_Allergy tr").remove();
    $("#tbl_remarksnote tr").remove();

    debugger;
    var slno = 0; var slno1=0
    var responseText = "";var remarks=''
    for (var i = 0; i < result.length; i++) {

        if (result[i].Allergies != '') {
            $("#AlleryInfoPopUp").fadeIn("slow");
            var slno = parseInt(slno + 1);
            responseText += '<tr class="font-weight-bold">' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' + slno + '</td>' +
                '<td class="jsgrid-cell p-1" width="60%">' + result[i].Allergies + '</td>' +
                '<td class="jsgrid-cell p-1" width="30%">' + result[i].Complaint + '</td>' +
                '<td class="jsgrid-cell p-1" align=center width="5%"  onclick=DeActivateAllergy(' + result[i].CaseSheetNo + ')><a><i class="icon-trash danger"></i></a></td>' +
                '</tr>';
        }
        if (result[i].Details != '') {
            $("#presremarks").fadeIn("slow");
            var slno1 = parseInt(slno1 + 1);
            remarks += '<tr class="font-weight-bold">' +
                '<td class="jsgrid-cell p-1" align=center width="5%">' + slno1 + '</td>' +
                '<td class="jsgrid-cell p-1" width="95%">' + result[i].Details + '</td>' +
               
               // '<td class="jsgrid-cell p-1" align=center width="5%"  onclick=DeActivateAllergy(' + result[i].CaseSheetNo + ')><a><i class="icon-trash danger"></i></a></td>' +
                '</tr>';
        }
    }
    $('#tbl_Allergy').html(responseText);
    $('#tbl_remarksnote').html(remarks);

    
    
}

function Showremarks() {

    if (!($('#remarksModal').is(':visible'))) {
        $("#remarksModal").modal("show");
        $("#remarksModal").appendTo("body");
    }
}

function ngOnremarks() {
    $("#remarksModal").modal("hide");
}



function ShowAllergy() {

    if (!($('#AllergyModal').is(':visible'))) {
        $("#AllergyModal").modal("show");
        $("#AllergyModal").appendTo("body");
    }
}

function ngOnAllergy() {
    $("#AllergyModal").modal("hide");
}

function DeActivateAllergy(CaseSheetNo) {
    ngOnAllergy();
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val("AllergyRemove"); $('#ConfirmRowId').val(CaseSheetNo);
    $('#confirmmessage').text("Do you want to remove this Allergy Details?");
}

function OKDeActivateAllergy(CaseSheetNo) {
    var data = {};
    data.CaseSheetNo = CaseSheetNo;
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_AllergyDeActivate",
        data: data,
        success: function (result) {
            var status = result.oList[0].Status;
            Showalerts(status, 0);

            var RegSeries = $('#RegSeries').val();
            var PRegNo = $('#PRegNo').val();
            var PatientId = $('#PatientId').val();
            GetAllergyDetails(RegSeries, PRegNo, 1);
        }
    });
}

function GetLastRevisitDetails(PatientId,RevisitId) {
    var data = {};                                       //dropdownbind
    data.PatientId = PatientId;
    data.DeptId = RevisitId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_LAstRevisitGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetPatientData(result.oList, 0);

                var OPCaseSheet = parseInt(result.oList[0].OPCaseSheet || 0);
                if (OPCaseSheet != 0) {

                    if (($('#CaseSheetId').val() || 0) == 0)
                    GetRows(OPCaseSheet, "CASE", 1);
                    
                }
            }
        }
    });
}





function GetPatientData(result) {
    var age = AgeCalculation(result[0].DOB);
    console.log(age)

    if (age.years > 1) yearString1 = " Yrs ";
    else yearString1 = " Yrs";
    if (age.months > 1) monthString1 = " Mths ";
    else monthString1 = " Mth ";
    if (age.days > 1) dayString1 = " Days";
    else dayString1 = " Day";
    var yearString="";

    if (age.years > 0) { yearString+=age.years + yearString1 }
    if (age.months > 0) { yearString+=age.months + monthString1 }
    if (age.days > 0) { yearString+=age.days + dayString1 }
        

    $('#PRegNo').val(result[0].OPNumber);
    if (($('#CaseSheetId').val() || 0) == 0)
    {
        $('#PatientOP').text(result[0].RevisitId);
        $('#RevisitId').val(result[0].RevisitId);
    }
    
    $('#PatientName').val(result[0].PatientName);
    $('#PatientAge').text(yearString);
    $('#PatientGender').text(result[0].Gender);
    $('#PatientDOB').val(result[0].DOB);
    $('#RegSeries').val(result[0].OPSerId);

    $('#BloodGroup').text(result[0].BloodGroup);
    $('#PatientWeight').val(result[0].Weight);
    $('#PatientBirthWeight').val(result[0].LastVisit);
    $('#ContactNo').val(result[0].Contact);
    $('#Email').val(result[0].FromDate);
    $('#LastVisit').text(result[0].Add2);
    $('#Address').val(result[0].Add1);

    $('#DPatientDOB').text(result[0].DOB);
    $('#DPatientBirthWeight').text(result[0].LastVisit);
    $('#DPatientWeight').text(result[0].Weight);
    $('#DContactNo').text(result[0].Contact);
    $('#DEmail').text(result[0].FromDate);
    $('#DFatherName').text(result[0].Fname);
    $('#DFtOccupation').text(result[0].Foccupation);
    $('#DMotherName').text(result[0].Moccupation);
    
    $('#addressd').text(result[0].Add1);
    $('#FatherName').val(result[0].Fname);
    $('#FtOccupation').val(result[0].Foccupation)
    $('#MotherName').val(result[0].Mname)
    $('#MtOccupation').text(result[0].Moccupation)    
    $('#PatientId').val(result[0].PatientId);

    GetTest(result[0].OPNumber, result[0].OPSerId);
    GetVisit(result[0].OPNumber, result[0].OPSerId);

    if (($('#CaseSheetId').val() || 0) == 0)
     
   
    GetRows(result[0].RevisitId, "TEMP", 1);
}
//-------------------------------------End Patient Details





//-------------------------------------Test Details
function GetTest(PatientId,Series) {
    var data = {};
    data.BillNo = PatientId;
    data.DeptId = ERPDeptId;
    data.BillDate = 'NONE';     //From Date
    data.Hospital = Series;     //Bill Series
    data.UserId = ERPUserId;
    data.Status = 'LB';
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_BillNumberListView",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetTestData(result.oList);
            }
        }
    });
}

function GetTestData(result) {
    $('.TRow').remove();
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        var Test = '<tr class="jsgrid-header-row TRow" style="pointer:cursor" onclick="GetDetailedTests(' + result[i].BillMainId + ')">' + 
                    //'<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;"><i class="icon-trash"></i></td>' +
                    '<td class="jsgrid-align-center" style="width: 8%;">' + slno + '</td>' +
                    '<td class="" style="width: 10%;"><input type=text readonly class="form-control invdt tstcl" style="background-color:white;border:none" value="' + result[i].BillYear + "-" + result[i].BillNo + '" ></td>' +
                    '<td class="" style="width: 10%;"><input type=text readonly class="form-control invdt tstcl" style="background-color:white;border:none" value="' + result[i].BillDate + '" ></td>' +
                    '<td class="" style="width: 10%;"><input type=text readonly class="form-control invdt tstcl" style="background-color:white;border:none" value="' + result[i].OpNo + '" ></td>' +
                    '<td class="" style="width: 10%;"><input type=text readonly class="form-control invdt tstcl" style="background-color:white;border:none" value="' + result[i].IpNo + '" ></td>' +
                    '<td class="" style="width: 37%;"><input type=text readonly class="form-control invdt tstcl" style="background-color:white;border:none" value="' + result[i].TestName + '" ></td>' +
                    '</tr>';
        $('#TblTestResults').append(Test);
        $('.tstcl[readonly]').css('cursor', 'pointer')       
        slno++;
    }
}

//Detailed Test
function GetDetailedTests(BillNo)
{
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
                GetPatientSubTestDetails(result.oList);
            }
        }
    });
}

function GetPatientSubTestDetails(result) {
    $("#myModalnew").modal("show");
    $("#myModalnew").appendTo("body");
    $('.ChRowr,.RRow').remove();
    
    var TestId = 0;
    for (var n = 0; n < result.length; n++) {
        var Id = parseInt(n);         
        if ((TestId == 0) || (result[n].TestId != TestId)) { 
            TestId = result[n].TestId;
            var Row = "<tr id='ChRowrs" + Id + "'  class='jsgrid-row RRow' style=background-color:#f1f1f1;font-weight:bold>" +
               "<td  style='width:8%'  class='text-center' id='ttdBillYear" + Id + "' >" + result[n].BillYear + "-" + result[n].BillNo + " </td>" +
               "<td style='width:19%'  class='text-center' id='ttdTestName" + Id + "' > " + result[n].TestName + "</td>" +
               "<td style='width:17%' class='text-center' id='ttdSubTestName" + Id + "'     > </td>" +
               "<td style='width:8%' class='text-center' id='ttdResult" + Id + "'     > </td>" +
               "<td style='width:15%' class='text-center' id='ttdNormalValue" + Id + "' ></td>" +
               "<td style='width:9%' class='text-center'  id='ttdStdUnit" + Id + "'   >" +
               "</td>" +
               "</tr>";
               
            $('#tblSubTest').append(Row);
            }
        var ProdRow = "<tr id='ChRowrs" + Id + "'  class='jsgrid-row ChRowr' style=font-weight:400>" +
               "<td style='width:8%'  class='text-center' id='ttdBillYear" + Id + "' > " + result[n].BillYear + "-" + result[n].BillNo + "</td>" +
               "<td style='width:19%'  class='text-center' id='ttdTestName" + Id + "' > " + result[n].TestName + "</td>" +
               "<td style='width:17%' class='text-center' id='ttdSubTestName" + Id + "'     > " + result[n].SubTestName + "</td>" +
               "<td style='width:8%' class='text-center' id='ttdResult" + Id + "'     > " + result[n].Result + "</td>" +
               "<td style='width:15%' class='text-center' id='ttdNormalValue" + Id + "' > " + result[n].NormalValue + "</td>" +
               "<td style='width:9%' class='text-center'  id='ttdStdUnit" + Id + "'   > " + result[n].FromDate + "" +
               "<input type=text style=display:none value=" + result[n].TestId + " id='ttdtestmainId" + Id + "' /></td>" +
               "</tr>";
            $('#tblSubTest').append(ProdRow);
    }

}
//-------------------------------------End Test Details


//-------------------------------------Visit Details
function GetVisit(PatientId, Series) {
    var data = {};                                       //dropdownbind
    data.PatientId = PatientId;
    data.RevisitId = Series;
    data.Status = '';
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_PatientVisitDetailsGet",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                GetVisitData(result.oList, 0);
            }
        }
    });
}


function CallIPCaseLoad(ipno)
{
    var Regno = $('#PRegNo').val();   
    var url = '../Hospital/DischargeSummarycopy?ip=' + ipno + '&reg=' + Regno
    window.open( url,"_blank");
}

function GetVisitData(result) {
    $('.VRow').remove();
    for (var i = 0; i < result.length; i++) {

    
        var slno = parseInt(i + 1);
        var TDate = ''; var scls = '';
        if (result[i].RevisitDate == CurDate) { TDate = 'CURRENT VISIT'; scls ='danger text-bold-500'}
        else { TDate = result[i].RevisitDate; }
        if (result[i].IPNumber != 0) {
            AAAA = "background-color:red;color:black"

            var Visit = '<tr class="jsgrid-header-row VRow" style=' + AAAA + ' >' +
                       //'<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;"><i class="icon-trash"></i></td>' +
                       '<td onclick=CallIPCaseLoad(' + result[i].IPNumber + ') class="jsgrid-align-center VROWID" style="width: 8%;cursor:pointer"  id="VistTr_' + slno + '">' + slno + '</td>' +
                       '<td onclick=CallIPCaseLoad(' + result[i].IPNumber + ') class="jsgrid-align-center" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control" style="background-color:white;border:none" value="' + result[i].RevisitId + '" ></td>' +
                       '<td onclick=CallIPCaseLoad(' + result[i].IPNumber + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control ' + scls + '" style="background-color:white;border:none" value="' + TDate.substring(0, 10) + '" ></td>' +
                        '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control ' + scls + '" style="background-color:white;border:none" value="' + TDate.substring(11, 25) + '" ></td>' +
                       '<td onclick=CallIPCaseLoad(' + result[i].IPNumber + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control" style="background-color:white;border:none" value="' + result[i].HealthCard + '" ></td>' +
                       '<td onclick=CallIPCaseLoad(' + result[i].IPNumber + ') class="" style="width: 30%;cursor:pointer"><input type=text readonly class="form-control" id="Vistdr_' + slno + '" style="background-color:white;border:none" value="' + result[i].DoctorName + '" ></td>' +
                       '<td class="" style="width: 5%;cursor:pointer" align=center>' +
                       
                       ' </td>' +
                       '</tr>';
        }
        else
        {
            var Visit = '<tr class="jsgrid-header-row VRow"  >' +
                     //'<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;"><i class="icon-trash"></i></td>' +
                     '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="jsgrid-align-center VROWID" style="width: 8%;cursor:pointer"  id="VistTr_' + slno + '">' + slno + '</td>' +
                     '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="jsgrid-align-center" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control" style="background-color:white;border:none" value="' + result[i].RevisitId + '" ></td>' +
                     '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control ' + scls + '" style="background-color:white;border:none" value="' + TDate.substring(0, 10) + '" ></td>' +
                      '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control ' + scls + '" style="background-color:white;border:none" value="' + TDate.substring(11,25 ) + '" ></td>' +
                    '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="" style="width: 15%;cursor:pointer"><input type=text readonly class="form-control" style="background-color:white;border:none" value="' + result[i].HealthCard + '" ></td>' +
                '<td onclick=CallCaseLoad(' + result[i].DoctorId + ',2,' + slno + ') class="" style="width: 30%;cursor:pointer"><input type=text readonly class="form-control" id="Vistdr_' + slno + '"  style="background-color:white;border:none" value="' + result[i].DoctorName + '" ></td>' +
                     '<td class="" style="width: 5%;cursor:pointer" align=center>' +
                     '<a onclick=ConfirmEdit(' + result[i].DoctorId + ',0,0) ><i class="ft-edit font-medium-5"></i></a>' +
                     ' </td>' +
                     '</tr>';
        }
        $('#TblVisiting').append(Visit);
        slno++;
        $('.VRow').css('cursor', 'pointer');
    }
}

function ConfirmEdit(Id,type,fl)
{
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('CaseEdit'); $('#ConfirmRowId').val(Id);
    $('#confirmmessage').text('Do you want to Edit selected Case Sheet?');
}


//-------------------------------------End Visit Details


//-------------------------------------Prev Visit PopUp

function CallCaseLoad(CaseId, Flag, Id) {


    var condr = $('#Vistdr_' + Id).val();
    $('#consdoctor').text(condr)

    if (Id != 0) {
        $(".VROWID").removeClass('bg-info');
        $("#VistTr_" + Id).addClass('bg-info');
    }

    $(".Pnull").val('');
    $(".Pzero").val(0);

    if (CaseId != 0) {
        GetRows(CaseId, "CASE", Flag);
        $("#PrevCaseSheetId").val(CaseId);
    }
    else {
        warningshow("Casesheet Not Available", "")
    }
}

function PrevVisitDetails(result, Flag) {

    if (result.length > 0) {

        var Medicine = result[0].Medicine
        var Medicine = Medicine.split("#%@#").join("\n");

        $('#PPatComplaint').val(result[0].Complaint);
        $('#PDiagnosis').val(result[0].Diagnosis);
        $('#PAdvice').val(result[0].Advice);
        $('#PAllergies').val(result[0].Allergies);
        $('#PDetails').val(result[0].Details);
        $('#PNotes').val(result[0].Notes);
        var index = (result[0].ICD).indexOf("$$");
        var Diagnosis = (result[0].ICD).substring(0, index)
        var Remarks = (result[0].ICD).substring(index + 2, 1000)

        $('#PMedAdvice').val(Diagnosis);

        $('#PRemarks').val(result[0].ICDDetails);



        var Head = '<span class="mx-2">Patient : </span>';
        Head = Head + '<span class="danger mx-2">' + result[0].PName + '</span>';
        Head = Head + '<span class="mx-2">, OP# : </span>';
        Head = Head + '<span class="danger mx-2" id="PrevPatientOP">' + result[0].RevisitId + '</span>';
        Head = Head + '<span class="mx-2">,Date : </span>';
        Head = Head + '<span class="danger mx-2" id="PrevCaseDate">' + result[0].CaseDate + '</span>';
        Head = Head + '<span class="mx-2">,Review: </span>';
        Head = Head + '<span class="danger mx-2" id="Nextreviewdt">' + result[0].Reviewdate + '</span>';

        Head = Head + '<span class="mx-1">Doctor : </span>';
        Head = Head + '<span class="danger mx-2" id="consdoctor">' + result[0].Address3 + '</span>';

        Head = Head + '<span style="display:none" class="danger mx-2" id="PrevCaseSheetNo">' + result[0].CaseSheetNo + '</span>';

        $("#VisitHead").html(Head)

        GetMedicine(result[0].RevisitId, 1);
        GetImmunizationDetails(result[0].RevisitId, 1, 1);
    }
    else {

    }
    ShowPrevVisit();
}

function AddMedicineListPrev(result)      //flg-0 : Add Medicine during List
{
    $(".PrevMRow").remove();
    for (var i = 0; i < result.length; i++) {
        if (i == 0) {
            $('#PMedicineId_1').val(result[0].MedicineId);
            $('#PMedicine_1').val(result[0].Medicine);
            $('#PDaily_1').val(result[0].Daily);
            $('#PDosage_1').val(result[0].Dosage);
            $('#pmednote1').val(result[0].Mednotes);            
            $('#PDays_1').val(result[0].Days);

        }
        else {
            var Id = i + 1;
            var MedRow =
            '<tr  class="jsgrid-header-row PrevMRow" id="PMdRow_' + Id + '">' +
            '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 3%;"><input class="jsgrid-button jsgrid-delete-button" type="button"  onclick="DeletePrevMedicine(' + Id + ')" title="Delete" autocomplete="off"></td>' +
            '<td class="jsgrid-align-center" style="width: 5%;" id="PMslno_' + Id + '">' + Id + '</td>' +
            '<td class="" style="width: 30%;">' +
            '<input type="text" class="form-control mdclass brdles" name="medname" id="PMedicine_' + Id + '"  value="' + result[i].Medicine + '" onfocus="LoadMedicinePrev(' + Id + ')" onfocusout=UpdatePrevMedicineRow(' + Id + ',0)  />' +
            '<input type="text" style="display:none" class="form-control" id="PMedicineId_' + Id + '"  value=' + result[i].MedicineId + ' />' +
            '</td>' +
            '<td class="" style="width: 20%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Mednotes + '"  id="pmednote' + Id + '"  onkeydown="FocusNext(event, \'\', \'PDaily_\', \'PDosage_\', ' + Id + ',\'PMdRow_\')" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Daily + '" onfocusout=UpdatePrevMedicineRow(' + Id + ',1) id="PDaily_' + Id + '"  onkeydown="FocusNext(event, \'\', \'PDaily_\', \'PDosage_\', ' + Id + ',\'PMdRow_\')" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Dosage + '" onfocusout=UpdatePrevMedicineRow(' + Id + ',2) id="PDosage_' + Id + '"  onkeydown="FocusNext(event, \'PDaily_\', \'PDosage_\', \'PDays_\', ' + Id + ',\'PMdRow_\')"  /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Days + '" onfocusout=UpdatePrevMedicineRow(' + Id + ',3) id="PDays_' + Id + '" onkeydown="AddPrevMedicineRowConfirm(event,' + Id + ')"  /></td>' +
            '</tr>';
            $('#TblMedicinePrev').append(MedRow);

            $('#PMedicine_' + Id).focus();
            $('.brdles').css('border', 'none');
            $("#GridPopUp1").val(result.length);
        }
    }
}

function AddPrevMedicineRowConfirm(e, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    var Rid; var Pid;

    try { Rid = ($('#PMdRow_' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Rid = Id; }

    try { Pid = ($('#PMdRow_' + Id).closest('tr').prev('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Pid = Id; }


    if ($.trim($('#PMedicine_' + Id).val()) == '') {
        warningshow('Please Select Medicine', 'PMedicine_' + Id);
    }
    //else if ((($('#PMedicineId_' + Id).val() || 0) == 0)) {
    //    warningshow('Please Select Medicine', 'PMedicineId_' + Id);
    //}
    else if ($.trim($('#PDaily_' + Id).val()) == '') {
        warningshow('Please Select Daily', 'PDaily_' + Id);
    }
    else if ($.trim($('#PDosage_' + Id).val()) == '') {
        warningshow('Please Select Dosage', 'PDosage_' + Id);
    }
    else if ($.trim($('#PDays_' + Id).val()) == '' && (key == 13 || key == 40)) {
        warningshow('Please Select Days', 'PDays_' + Id);
    }
    else {
               
        if (key == 13 && Rid != Id) {
            e.preventDefault();
            $('#PMedicine_' + Rid).focus().select();
        }
        else if (key == 40 && Rid != Id) {
            e.preventDefault();
            $('#PDays_' + Rid).focus().select();
        }
        else if (key == 38 && Pid != Id) {
            e.preventDefault();
            $('#PDays_' + Pid).focus().select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#PDosage_' + Id).focus().select();
        }
        else if (key == 13) {
            e.preventDefault();
            AddPrevMedicineRow(0);
        }
    }
}

function AddPrevMedicineRow(flg)      //flg-0 : Add Medicine
{
    if (flg == 0) {

        var Id = parseInt($("#GridPopUp1").val()) + 1;
        var Slno = $('#TblMedicinePrev tr').length + 1;


        var MedRow =
            '<tr  class="jsgrid-header-row PrevMRow" id="PMdRow_' + Id + '">' +
            '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;"><input class="jsgrid-button jsgrid-delete-button" type="button"  onclick="DeletePrevMedicine(' + Id + ')" title="Delete" autocomplete="off"></td>' +
            '<td class="jsgrid-align-center" style="width: 8%;" id="PMslno_' + Id + '">' + Slno + '</td>' +
            '<td class="" style="width: 47%;">' +
            '<input type="text" class="form-control mdclass brdles" name="medname" id="PMedicine_' + Id + '"  value="" onfocus="LoadMedicinePrev(' + Id + ')" onfocusout=UpdatePrevMedicineRow(' + Id + ',0) />' +
            '<input type="text" style="display:none" class="form-control" id="PMedicineId_' + Id + '"  value="0" />' +
            '</td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="" onfocusout=UpdatePrevMedicineRow(' + Id + ',1) id="PDaily_' + Id + '" onkeydown="FocusNext(event, \'\', \'PDaily_\', \'PDosage_\', ' + Id + ',\'PMdRow_\')" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="" onfocusout=UpdatePrevMedicineRow(' + Id + ',2) id="PDosage_' + Id + '"  onkeydown="FocusNext(event, \'PDaily_\', \'PDosage_\', \'PDays_\', ' + Id + ',\'PMdRow_\')" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="" onfocusout=UpdatePrevMedicineRow(' + Id + ',3) id="PDays_' + Id + '" onkeydown=AddPrevMedicineRowConfirm(event,' + Id + ')  onkeydown="FocusNext(event, \'PDosage_\', \'PDays_\', \'\', ' + Id + ',\'PMdRow_\')" /></td>' +
            '</tr>';
        $('#TblMedicinePrev').append(MedRow);

        $('#PMedicine_' + Id).focus();
        $('.brdles').css('border', 'none');
        $("#GridPopUp1").val(Id);
    }
}

function FocusNext(e, P_Col, C_Col, N_Col, RowId, TR, Flag) {


    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    if (Flag == 1) {
        if (key == 13  && N_Col != '') {              // Right Arrow and Left Arrow
            e.preventDefault();
            $("#" + N_Col + RowId).focus().select();
        }
    }
    else {
        if ((key == 13 || key == 39) && N_Col != '') {              // Right Arrow and Left Arrow
            e.preventDefault();

            $("#" + N_Col + RowId).focus().select();
        }
        else if (key == 37 && P_Col != '') {              // Right Arrow and Left Arrow
            e.preventDefault();

            $("#" + P_Col + RowId).focus().select();
        }

        else if (key == 40 && RowId != 0 && C_Col != '')          // Down Arrow
        {
            e.preventDefault();
            var Rid;

            try { Rid = ($('#' + TR + RowId).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
            catch (err) { Rid = RowId; }

            $("#" + C_Col + Rid).focus().select();

        }
        else if (key == 38 && RowId != 0 && C_Col != '') {           // Up Arrow
            e.preventDefault();
            var Rid;

            try { Rid = ($('#' + TR + RowId).closest('tr').prev('tr').attr('id')).match(/\d+/)[0]; }
            catch (err) { Rid = RowId; }

            $("#" + C_Col + Rid).focus().select();

        }
    }
}

function DeletePrevMedicine(Id) {

    $("#PMdRow_" + Id).remove();
    var Count = $("#GridPopUp1").val();
    var Slno = 1;

    for (var i = 1; i <= Count; i++) {

        if ($("#PMedicine_" + i).val() != undefined && $("#PMedicine_" + i).val() != '' && $("#PMedicine_" + i).val() != null) {
            $("#PMslno_" + i).text(Slno);
            Slno++;
        }
    }
}

function UpdatePrevMedicineRow(Id, flg) {
    if ($.trim($('#PMedicine_' + Id).val()) != '') {
        if (flg == 0) {
            if (($('#PMedicineId_' + Id).val() || 0) == 0) {
               // warningshow('Please Select a valid Medicine', 'PMedicineId_' + Id);
               // return false;
            }
            else { return true; }
        }
        else if (flg == 1) {
            if ($.trim($('#PDaily_' + Id).val()) == '') {
                warningshow('Please Select Daily', 'PDaily_' + Id);
                return false;
            }
            else {
                return true;
            }
        }
        else if (flg == 2) {
            if ($.trim($('#PDosage_' + Id).val()) == '') {
                warningshow('Please Select Dosage', 'PDosage_' + Id);
                return false;
            }
            else {
                return true;
            }
        }
        else if (flg == 3) {
            if ($.trim($('#PDays_' + Id).val()) == '') {
                warningshow('Please Select Days', 'PDays_' + Id);
                return false;
            }
            else {
                return true;
            }
        }
    }
}

function ShowPrevVisit() {
    if (!($('#PreVisiting').is(':visible'))) {
        $("#baseIcon-tab1").click();
        $("#PreVisiting").modal("show");
        $("#PreVisiting").appendTo("body");
    }
}

function ClosePrevVisit() {
    $(".VROWID").removeClass('bg-info');
    $('#PreVisiting').modal('hide')
}

function PevMedicineUpdate() {

    var Count = $("#GridPopUp1").val();

    var oArray = new Array();
    for (var k = 1; k <= Count; k++) {
        var RegSeries   = $("#RegSeries").val();
        var PRegNo      = $("#PRegNo").val();
        var RevisitId   = $("#PrevPatientOP").text();
        var PatientIP   = 0;
        var IPYear      = 0;
        var MedicineId  = $('#PMedicineId_' + k).val();
        var Medicine    = $('#PMedicine_' + k).val();
        var Daily       = $('#PDaily_' + k).val();
        var Dosage      = $('#PDosage_' + k).val();
        var Days        = $('#PDays_' + k).val();
        var UserId      = ERPUserId;
        var DeptId      = ERPDeptId;
        var DelFlag     = 0;
        var Type        = 0;
        if (MedicineId != '' && MedicineId != 0 && MedicineId != undefined) {
            oArray.push({
                'RegSeries' : RegSeries,
                'PRegNo'    : PRegNo,
                'RevisitId' : RevisitId,
                'PatientIP' : PatientIP,
                'IPYear'    : IPYear,
                'MedicineId': MedicineId,
                'Medicine'  : Medicine,
                'Daily'     : Daily,
                'Dosage'    : Dosage,
                'Days'      : Days,
                'UserId'    : UserId,
                'DeptId'    : DeptId,
                'DelFlag'   : DelFlag,
                'Type'      : 0,
            })
        }
    }

    if (oArray == "") {

        oArray.push({
            'RegSeries' : $("#RegSeries").val(),
            'PRegNo'    : $("#PRegNo").val(),
            'RevisitId' : $("#PrevPatientOP").text(),
            'PatientIP' : 0,
            'IPYear'    : 0,
            'MedicineId': 0,
            'Medicine'  : '',
            'Daily'     : 0,
            'Dosage'    : 0,
            'Days'      : 0,
            'UserId'    : UserId,
            'DeptId'    : DeptId,
            'DelFlag'   : DelFlag,
            'Type'      : Type,
        });
    }

        var data = { 'CaseSheet': oArray };
        $.ajax(
        {
            type: "POST",
            url: "../Hospital/HMS_CaseSheetMedicineUpdate",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    var status = result.oList[0].Status;

                    var CaseSheetId = $("#PrevCaseSheetNo").text();

                    Showalerts(status, CaseSheetId);
                    $(".Pnull").val('');
                    $(".Pzero").val(0);
                                  
                    var MainOP = $("#RevisitId").val();
                    var PrevOP = $("#PrevPatientOP").text();
                    GetRows(CaseSheetId, "CASE", 2);
                    
                    if (MainOP == PrevOP) {
                        GetMedicine(MainOP, 0);
                        
                    }
                }
            }
        });
}


function LoadPrevImmunizationDetails(result, ImFlag) {
    $("#PVaccine_1,#PVaccDate_1,#PVacNextDate_1").val(''); $("#PVaccineId_1,#PVaccCompany_1,#PVaccStatus_1").val(0);
    $(".PIMRow").remove();
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {

            if (i == 0) {
                $("#PVaccineId_1").val(result[i].VaccineId);
                $("#PVaccine_1").val(result[i].VaccineName);
                $('#PVaccDate_1').val(result[i].GivenDate);
                $('#PVacNextDate_1').val(result[i].NextDate);
                $("#PVaccCompany_1").val(result[i].BrandId);
                $("#PVaccStatus_1").val(result[i].VaccineStatus)

            }
            else {

                var Id = parseInt($("#PrevIMMGridLength").val()) + 1;
                var Slno = $('#Prev_TblImmunization tr').length + 1;


                var MedRow =
                    '<tr class="jsgrid-header-row PIMRow" id="PIMTr_' + Id + '">' +
                    '<td class="jsgrid-control-field jsgrid-align-center" style="width: 5%;" onclick="PrevDeleteImmune(' + Id + ')" ><i class="icon-trash"></i></td>' +
                    '<td class="jsgrid-align-center" style="width: 8%;" id="PIMSlno_' + Id + '">' + Slno + '</td>' +
                    '<td class="" style="width: 38%;">' +
                    '<input type="text" class="form-control brdles PIMisa"  id="PVaccine_' + Id + '" onfocus="LoadVaccine(\'PVaccine_' + Id + '\', \'PVaccineId_' + Id + '\', \'VaccStatus_' + Id + '\')" value="' + result[i].VaccineName + '" />' +
                    '<input type="hidden" value="' + result[i].VaccineId + '" id="PVaccineId_' + Id + '" />' +
                     '</td>' +
                    '<td class="" style="width: 18%;">' +
                    '<select type="text" class="form-control brdles PIMisa" id="PVaccCompany_' + Id + '"  onkeydown="FocusNext(event, \'\', \'PVaccCompany_\', \'PVaccDate_\', \'' + Id + '\', \'PIMTr_\',1)">' + GroupSelect + '</select>' +
                    '</td>' +
                    '<td class="" style="width: 12%;">' +
                    '<input type="text" class="form-control brdles dedate PIMisa" id="PVaccDate_' + Id + '"  onkeydown="FocusNext(event, \'PVaccCompany_\', \'PVaccDate_\', \'PVacNextDate_\', \'' + Id + '\', \'PIMTr_\',1)" />' +
                    '</td>' +
                    '<td class="" style="width: 12%;">' +
                    '<input type="text" class="form-control brdles dedate PIMisa" id="PVacNextDate_' + Id + '"  onkeydown="FocusNext(event, \'PVaccDate_\', \'PVacNextDate_\', \'PVaccStatus_\', \'' + Id + '\', \'PIMTr_\',1)" />' +
                    '</td>' +
                    '<td class="" style="width: 7%;">' +
                    //'<select type="text" class="form-control brdles PIMisa" id="PVaccStatus_' + Id + '" onkeypress="PrevAddIMRow(event,' + Id + ')">' +
                    //'<option value="0" >&#10006;</option>' +
                    //'<option value="1" >&#10004;</option>' +
                    //'</select>' +


                    '<button type="button" id="PVaccStatus_' + Id + '" onclick="PrevAddIMRow(event,' + Id + ')"  class="btn btn-outline-success btn-min-width mr-0 mb-0 btn-sm p-1 font-small-3" autocomplete="off"> ADD </button>'+


                    '</td>' +
                    '</tr>';
                $('#Prev_TblImmunization').append(MedRow);

                DeclareDate('PVaccDate_' + Id + '')
                DeclareDate('PVacNextDate_' + Id + '');

                $('#PVaccDate_' + Id).val(result[i].GivenDate);
                $('#PVacNextDate_' + Id).val(result[i].NextDate);
                $("#PVaccCompany_" + Id).val(result[i].BrandId);
                $("#PVaccStatus_" + Id).val(result[i].VaccineStatus)

                $('.brdles').css('border', 'none');
                $("#PrevIMMGridLength").val(Id);



            }


        }
    }
    if (ImFlag == 0) {
        $(".PIMisa").prop("disabled", true);
        $("#AllR").prop("checked", true);
        $("#btnimmunesave").hide();
    }
    else {
        $(".PIMisa").prop("disabled", false);
        $("#OPVisitR").prop("checked", true);
        $("#btnimmunesave").show();
    }
}

function PrevAddIMRow(e, Id) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    var Rid; var Pid;

    try { Rid = ($('#PIMTr_' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Rid = Id; }

    try { Pid = ($('#PIMTr_' + Id).closest('tr').previous('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Pid = Id; }

    if ($.trim($('#PVaccine_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Medicine', 'PVaccine_' + Id);
        return false;
    }
    else if ((($('#PVaccineId_' + Id).val() || 0) == 0)) {
        e.preventDefault();
        warningshow('Please Select Medicine', 'PVaccineId_' + Id);
        return false;
    }
    else if ((($('#PVaccCompany_' + Id).val() || 0) == 0)) {
        e.preventDefault();
        warningshow('Please Select Company', 'PVaccCompany_' + Id);
        return false;
    }
    else if ($.trim($('#PVaccDate_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Date', 'PVaccDate_' + Id);
        return false;
    }
    else if ($.trim($('#PVacNextDate_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Next Date', 'PVacNextDate_' + Id);
        return false;
    }
    else {

        if (key == 13 && Rid != Id) {
            e.preventDefault();
            $('#PVaccine_' + Rid).focus().select();
        }
        else if (key == 40 && Rid != Id) {
            e.preventDefault();
            $('#PVaccStatus_' + Rid).focus().select();
        }
        else if (key == 38 && Pid != Id) {
            e.preventDefault();
            $('#PVaccStatus_' + Pid).focus().select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#PVacNextDate_' + Id).focus().select();
        }
        else if (key == 13) {
            e.preventDefault();
            OKPrevAddIMRow(0);
        }
    }
}

function OKPrevAddIMRow(flg)      //flg-0 : Add Medicine
{
    if (flg == 0) {

        var Id = parseInt($("#PrevIMMGridLength").val()) + 1;
        var Slno = $('#Prev_TblImmunization tr').length + 1;


        var MedRow =
            '<tr class="jsgrid-header-row PIMRow" id="PIMTr_' + Id + '">' +
            '<td class="jsgrid-control-field jsgrid-align-center" style="width: 5%;" onclick="PrevDeleteImmune(' + Id + ')" ><i class="icon-trash"></i></td>' +
            '<td class="jsgrid-align-center" style="width: 8%;" id="PIMSlno_' + Id + '">' + Slno + '</td>' +
            '<td class="" style="width: 38%;">' +
            '<input type="text" class="form-control brdles"  id="PVaccine_' + Id + '" onfocus="LoadVaccine(\'PVaccine_' + Id + '\', \'PVaccineId_' + Id + '\', \'PVaccStatus_' + Id + '\')" />' +
            '<input type="hidden" value="0" id="PVaccineId_' + Id + '" />' +
             '</td>' +
            '<td class="" style="width: 18%;">' +
            '<select type="text" class="form-control brdles" id="PVaccCompany_' + Id + '"  onkeydown="FocusNext(event, \'\', \'PVaccCompany_\', \'PVaccDate_\', \'' + Id + '\', \'PIMTr_\',1)">' + GroupSelect + '</select>' +
            '</td>' +
            '<td class="" style="width: 12%;">' +
            '<input type="text" class="form-control brdles dedate" id="PVaccDate_' + Id + '"  onkeydown="FocusNext(event, \'PVaccCompany_\', \'PVaccDate_\', \'PVacNextDate_\', \'' + Id + '\', \'PIMTr_\',1)" />' +
            '</td>' +
            '<td class="" style="width: 12%;">' +
            '<input type="text" class="form-control brdles dedate" id="PVacNextDate_' + Id + '"  onkeydown="FocusNext(event, \'PVaccDate_\', \'PVacNextDate_\', \'PVaccStatus_\', \'' + Id + '\', \'PIMTr_\',1)" />' +
            '</td>' +
            '<td class="" style="width: 7%;">' +
            '<select type="text" class="form-control brdles" id="PVaccStatus_' + Id + '" onkeypress="PrevAddIMRow(event,' + Id + ')">' +
            '<option value="0" >&#10006;</option>' +
            '<option value="1" >&#10004;</option>' +
            '</select>' +
            '</td>' +
            '</tr>';
        $('#Prev_TblImmunization').append(MedRow);

        DeclareDate('PVaccDate_' + Id + '')
        DeclareDate('PVacNextDate_' + Id + '');

        $('#PVaccine_' + Id).focus();
        $('.brdles').css('border', 'none');
        $("#PrevIMMGridLength").val(Id);
    }
}

function PrevDeleteImmune(Id) {
    $("#PIMTr_" + Id).remove();
    var Count = $("#PrevIMMGridLength").val();
    var Slno = 1;

    for (var i = 1; i <= Count; i++) {
        if ($("#PVaccine_" + i).val() != undefined) {
            $("#PIMSlno_" + i).text(Slno);
            Slno++;
        }
    }
}

function PrevImmunizationUpdate() {

    var Count = $("#PrevIMMGridLength").val();

    var oArray = new Array();
    for (var k = 1; k <= Count; k++) {
        var VacId = 0;
        var OPVisit = $("#PrevPatientOP").text();
        var IPNumber = 0;
        var IPYear = 0;
        var PRegSer = $("#RegSeries").val();
        var PRegNo = $("#PRegNo").val();
        var VaccineId = $("#PVaccineId_" + k).val();
        var VaccineName = $("#PVaccine_" + k).val();
        var BrandId = $("#PVaccCompany_" + k).val();
        var GivenDate = $("#PVaccDate_" + k).val();
        var NextDate = $("#PVacNextDate_" + k).val();
        var VaccineStatus = $("#PVaccStatus_" + k).val();
        var VaccineDosage = '';
        var DelFlag = 1;
        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var Daily = '';
        var Days = '';
        var Flag = 0;
        var IType = 'OP';


        if (VaccineId != '' && VaccineId != 0 && VaccineId != undefined) {
            oArray.push({
                'VacId': VacId,
                'OPVisit': OPVisit,
                'IPNumber': IPNumber,
                'IPYear': IPYear,
                'PRegSer': PRegSer,
                'PRegNo': PRegNo,
                'VaccineId': VaccineId,
                'VaccineName': VaccineName,
                'BrandId': BrandId,
                'GivenDate': GivenDate,
                'NextDate': NextDate,
                'VaccineStatus': VaccineStatus,
                'VaccineDosage': VaccineDosage,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'Daily': Daily,
                'Days': Days,
                'Flag': Flag,
                'IType': IType,
            })
        }
    }

    if (oArray == "") {

        oArray.push({
            'VacId': 0,
            'OPVisit': OPVisit,
            'IPNumber': 0,
            'IPYear': 0,
            'PRegSer': PRegSer,
            'PRegNo': PRegNo,
            'VaccineId': 0,
            'VaccineName': '',
            'BrandId': 0,
            'GivenDate': '',
            'NextDate': '',
            'VaccineStatus': '',
            'VaccineDosage': '',
            'DelFlag': 1,
            'UserId': ERPUserId,
            'DeptId': ERPDeptId,
            'Daily': '',
            'Days': '',
            'Flag': 0,
            'IType': 'OP',
        });
    }

    var data = { 'VaccineModal': oArray };
    $.ajax(
    {
        type: "POST",
        url: "../Hospital/HMS_ImmunizationUpdate",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                var status = result.oList[0].Status;
                Showalerts(status);

                var MainOP = $("#PatientOP").text();
                var PrevOP = $("#PrevPatientOP").text();

                if (MainOP == PrevOP) {
                    
                    GetImmunizationDetails(MainOP, 0, 1);
                }
                
            }
        }
    });

}
//-----------------------------------------------------


//IMMUNIZATION----------------------------------------

function AddIMRow(e, Id) {

    

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

    var Rid;var Pid;

    try { Rid = ($('#IMTr_' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Rid = Id; }

    try { Pid = ($('#IMTr_' + Id).closest('tr').previous('tr').attr('id')).match(/\d+/)[0]; }
    catch (err) { Pid = Id; }

    if ($.trim($('#Vaccine_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Medicine', 'Vaccine_' + Id);
        return false;
    }
    else if ((($('#VaccineId_' + Id).val() || 0) == 0)) {
        e.preventDefault();
        warningshow('Please Select Test', 'VaccineId_' + Id);
        return false;
    }
    //else if ((($('#VaccCompany_' + Id).val() || 0) == 0)) {
    //    e.preventDefault();
    //    warningshow('Please Select Company', 'VaccCompany_' + Id);
    //    return false;
    //}
    else if ($.trim($('#VaccDate_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Date', 'VaccDate_' + Id);
        return false;
    }
    else if ($.trim($('#VacNextDate_' + Id).val()) == '') {
        e.preventDefault();
        warningshow('Please Select Next Date', 'VacNextDate_' + Id);
        return false;
    }
    else {

        e.preventDefault();
        OKAddIMRow(0);
        if (key == 13 && Rid != Id) {
            e.preventDefault();
            $('#Vaccine_' + Rid).focus().select();
        }
        else if (key == 40 && Rid != Id) {
            e.preventDefault();
            $('#VaccStatus_' + Rid).focus().select();
        }
        else if (key == 38 && Pid != Id) {
            e.preventDefault();
            $('#VaccStatus_' + Pid).focus().select();
        }
        else if (key == 37) {
            e.preventDefault();
            $('#VacNextDate_' + Id).focus().select();
        }
        else if (key == 13) {
            //e.preventDefault();
            //OKAddIMRow(0);
        }
    }
}

function OKAddIMRow(flg)      //flg-0 : Add Medicine
{

   
    if (flg == 0) {

        var Id = parseInt($("#IMMGridLength").val()) + 1;
        var Slno = $('#TblImmunization tr').length + 1;


        var MedRow =
            '<tr class="jsgrid-header-row IMRow" id="IMTr_' + Id + '">' +
            '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;" onclick="DeleteImmune(' + Id + ')" ><i class="icon-trash"></i></td>' +
            '<td class="jsgrid-align-center" style="width: 8%;" id="IMSlno_' + Id + '">' + Slno + '</td>' +
            '<td class="" style="width: 38%;">' +
            '<input type="text" class="form-control brdles"  id="Vaccine_' + Id + '" onfocus="LoadVaccine(\'Vaccine_' + Id + '\', \'VaccineId_' + Id + '\', \'VaccStatus_' + Id + '\')" />' +
            '<input type="hidden" value="0" id="VaccineId_' + Id + '" />' +
             '</td>' +
            '<td class="" style="width: 18%;display:none">' +
            '<select type="text" style="dispalay:none" class="form-control brdles" id="VaccCompany_' + Id + '"  onkeydown="FocusNext(event, \'\', \'VaccCompany_\', \'VaccDate_\', \'' + Id + '\', \'IMTr_\',1)">' + GroupSelect + '</select>' +
            '</td>' +
            '<td class="" style="width: 12%;display:none">' +
            '<input style="dispalay:none" type="text" class="form-control brdles dedate" id="VaccDate_' + Id + '"  onkeydown="FocusNext(event, \'VaccCompany_\', \'VaccDate_\', \'VacNextDate_\', \'' + Id + '\', \'IMTr_\',1)" />' +
            '</td>' +
            '<td class="" style="width: 12%;display:none">' +
            '<input style="dispalay:none" type="text" class="form-control brdles dedate" id="VacNextDate_' + Id + '"  onkeydown="FocusNext(event, \'VaccDate_\', \'VacNextDate_\', \'VaccStatus_\', \'' + Id + '\', \'IMTr_\',1)" />' +
            '</td>' +
            '<td class="" align=center style="width: 4%;">' +
            //'<select type="text" class="form-control brdles" readonly id="VaccStatus_' + Id + '" onkeypress="AddIMRow(event,' + Id + ')">' +
            //'<option value="0" >ADD</option>' +
            
            //'</select>' +
            '<button type="button" id="VaccStatus_' + Id + '" onclick="AddIMRow(event,' + Id + ')"  class="btn btn-outline-success btn-min-width mr-0 mb-0 btn-sm p-1 font-small-3" autocomplete="off"> &#160;&#160;&#160;&#160; ADD &#160;&#160;&#160;&#160; </button>' +

            '</td>' +
            '</tr>';
        $('#TblImmunization').append(MedRow);

        DeclareDate('VaccDate_' + Id + '')
        DeclareDate('VacNextDate_' + Id + '');

        $('#Vaccine_' + Id).focus();
        $('.brdles').css('border', 'none');
        $("#IMMGridLength").val(Id);
    }
}

function DeclareDate(Id) {
    $('#'+Id).daterangepicker({
        maxDate: new Date(new Date().getFullYear() + 10, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: { format: 'DD/MM/YYYY' },
    }).val(CurDate);
}


function DeleteImmune(Id) {
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val('ImmuneDelete'); $('#ConfirmRowId').val(Id);
    $('#confirmmessage').text('Do you want to delete this Entry?');
}

function OKDeleteImmune(Id) {
    $("#IMTr_" + Id).remove();
    var Count = $("#IMMGridLength").val();
    var Slno = 1;
    
    for (var i = 1; i <= Count; i++) {
        if ($("#Vaccine_" + i).val() != undefined) {
            $("#IMSlno_" + i).text(Slno);
            Slno++;
        }
    }
}

function ImmunizationUpdate(status, CaseSheetId) {

    var Count = $("#IMMGridLength").val();

    var oArray = new Array();
    for (var k = 1; k <= Count; k++) {
        var VacId = 0;
        var OPVisit = $("#PatientOP").text();
        var IPNumber = 0;
        var IPYear=0;
        var PRegSer = $("#RegSeries").val();
        var PRegNo = $("#PRegNo").val();
        var VaccineId = $("#VaccineId_" + k).val();
        var VaccineName = $("#Vaccine_" + k).val();
        var BrandId = $("#VaccCompany_" + k).val();
        var GivenDate = $("#VaccDate_" + k).val();
        var NextDate = $("#VacNextDate_" + k).val();
        var VaccineStatus = $("#VaccStatus_" + k).val();
        var VaccineDosage = '';
        var DelFlag = 1;
        var UserId = ERPUserId;
        var DeptId = ERPDeptId;
        var Daily = '';
        var Days = '';
        var Flag = 0;
        var IType = 'OP';


        if (VaccineId != '' && VaccineId != 0 && VaccineId != undefined) {
            oArray.push({
                'VacId': VacId,
                'OPVisit' : OPVisit,
                'IPNumber':IPNumber ,
                'IPYear': IPYear,
                'PRegSer': PRegSer,
                'PRegNo': PRegNo,
                'VaccineId': VaccineId,
                'VaccineName': VaccineName,
                'BrandId': BrandId,
                'GivenDate': GivenDate,
                'NextDate': NextDate,
                'VaccineStatus': VaccineStatus,
                'VaccineDosage': VaccineDosage,
                'DelFlag': DelFlag,
                'UserId': UserId,
                'DeptId': DeptId,
                'Daily': Daily,
                'Days': Days,
                'Flag': Flag,
                'IType': IType,
            })
        }
    }

    if (oArray == "") {

        oArray.push({
            'VacId': 0,
            'OPVisit': OPVisit,
            'IPNumber': 0,
            'IPYear': 0,
            'PRegSer': PRegSer,
            'PRegNo': PRegNo,
            'VaccineId' : 0,
            'VaccineName' : '',
            'BrandId' : 0,
            'GivenDate' : '',
            'NextDate' : '',
            'VaccineStatus' : '',
            'VaccineDosage' : '',
            'DelFlag' : 1,
            'UserId' : ERPUserId,
            'DeptId' : ERPDeptId,
            'Daily' : '',
            'Days' : '',
            'Flag': 0,
            'IType':'OP',
        });
    }

    var data = { 'VaccineModal': oArray };
    $.ajax(
    {
        type: "POST",
        url: "../Hospital/HMS_ImmunizationUpdate",
        data: data,
        success: function (result) {
            $("#LoadingSmall").hide();
            Showalerts(status, CaseSheetId);
        }
    });

}

function GetPrevGetImmunizationDetails() {

    var OPVisit = $("#PrevPatientOP").text();

    if ($("#OPVisitR").prop("checked") == true) {
        GetImmunizationDetails(OPVisit, 1, 1);
    }
    else {
        GetImmunizationDetails(OPVisit, 1, 0);
    }
}

function GetImmunizationDetails(OPVisit, Type, Flag) {

    var ImFlag = 1;
    if (Flag == 0) { ImFlag = 0;}
    var data = {};
    data.OPVisit = OPVisit;
    data.IPNumber = 0;
    data.IPYear = 0;
    data.PRegSer = $("#RegSeries").val();
    data.PRegNo = $("#PRegNo").val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;
    data.Flag = ImFlag;

    $.ajax(
    {
        type: "POST",
        url: "../Hospital/HMS_ImmunizationGets",
        data: data,
        success: function (result) {
            if (Type == 0) {
                RowRemove(2);
                LoadImmunizationDetails(result.oList);
            }
            else if (Type == 1) {
                LoadPrevImmunizationDetails(result.oList,ImFlag);
            }
        }
    });
}

function LoadImmunizationDetails(result) {
    if (result.length > 0) {
        for (var i = 0; i < result.length; i++) {

            if (i == 0) {
                $("#VaccineId_1").val(result[i].VaccineId);
                $("#Vaccine_1").val(result[i].VaccineName);
                $('#VaccDate_1').val(result[i].GivenDate);
                $('#VacNextDate_1').val(result[i].NextDate);
                $("#VaccCompany_1").val(result[i].BrandId);
                $("#VaccStatus_1").val(result[i].VaccineStatus)

            }
            else {

                var Id = parseInt($("#IMMGridLength").val()) + 1;
                var Slno = $('#TblImmunization tr').length + 1;


                var MedRow =
                    '<tr class="jsgrid-header-row IMRow" id="IMTr_' + Id + '">' +
                    '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 5%;" onclick="DeleteImmune(' + Id + ')" ><i class="icon-trash"></i></td>' +
                    '<td class="jsgrid-align-center" style="width: 8%;" id="IMSlno_' + Id + '">' + Slno + '</td>' +
                    '<td class="" style="width: 38%;">' +
                    '<input type="text" class="form-control brdles"  id="Vaccine_' + Id + '" onfocus="LoadVaccine(\'Vaccine_' + Id + '\', \'VaccineId_' + Id + '\', \'VaccStatus_' + Id + '\')" value="' + result[i].VaccineName + '" />' +
                    '<input type="hidden" value="' + result[i].VaccineId + '" id="VaccineId_' + Id + '" />' +
                     '</td>' +
                    '<td class="" style="width: 18%;display:none">' +
                    '<select type="text" class="form-control brdles" id="VaccCompany_' + Id + '"  onkeydown="FocusNext(event, \'\', \'VaccCompany_\', \'VaccDate_\', \'' + Id + '\', \'IMTr_\',1)">' + GroupSelect + '</select>' +
                    '</td>' +
                    '<td class="" style="width: 12%;display:none">' +
                    '<input type="text" class="form-control brdles dedate" id="VaccDate_' + Id + '"  onkeydown="FocusNext(event, \'VaccCompany_\', \'VaccDate_\', \'VacNextDate_\', \'' + Id + '\', \'IMTr_\',1)" />' +
                    '</td>' +
                    '<td class="" style="width: 12%;display:none">' +
                    '<input type="text" class="form-control brdles dedate" id="VacNextDate_' + Id + '"  onkeydown="FocusNext(event, \'VaccDate_\', \'VacNextDate_\', \'VaccStatus_\', \'' + Id + '\', \'IMTr_\',1)" />' +
                    '</td>' +
                    '<td class="" style="width: 7%;dispaly:none1">' +
                    '<select type="text" class="form-control brdles" id="VaccStatus_' + Id + '" onkeypress="AddIMRow(event,' + Id + ')">' +
                    '<option value="0" >ADD</option>' +
                   
                    '</select>' +
                    '</td>' +
                    '</tr>';
                $('#TblImmunization').append(MedRow);

                DeclareDate('VaccDate_' + Id + '')
                DeclareDate('VacNextDate_' + Id + '');

                $('#VaccDate_' + Id).val(result[i].GivenDate);
                $('#VacNextDate_' + Id).val(result[i].NextDate);
                $("#VaccCompany_" + Id).val(result[i].BrandId);
                $("#VaccStatus_" + Id).val(result[i].VaccineStatus)

                $('.brdles').css('border', 'none');
                $("#IMMGridLength").val(Id);
            }
        }
    }
}



//----------------------------------------------------


//-------------------------------------Add Other Investigation
function LoadTest(Id) {

    $('#InvstgtName' + Id).autocomplete({
        delay: 0,
        minLength: 0,
        source: function (request, response) {
            $('#InvstgtId' + Id).val('');
            var data = {};
            data.TestName = $('#InvstgtName' + Id).val();
            data.DeptId = ERPDeptId;
            $.ajax({
                url: '../Revisit/HMS_TestSearch',
                type: "POST",
                data: data,
                dataType: "json",
                success: function (data) {
                    response($.map(data, function (item) {
                        return ({
                            ColCount: 'TWOLab',
                            label: item.TestName,
                            label1: item.MedDeptName,
                            TestId: item.TestId,
                            Rate: item.Rate,
                            SpRate: item.SpRate,
                            VSpRate: item.VSpRate,
                            OutsideRate: item.OutsideRate,
                            MedDept: item.MedDept,
                            headers: ["Test", "DeptName"]
                        })
                    }));
                }
            })
        },
        autoFocus: true,
        select: function (event, ui) {
            $('#InvstgtId' + Id).val(ui.item.TestId);
            $('#InvstgtResult' + Id).focus();
        },
    }).on('keydown', function (e) {
        if (Id != 0)
        {
            if ((e.which == 13) && ($('#InvstgtId' + Id).val() || 0) != 0) {
                $('#InvstgtResult' + Id).focus().select();
        }
        }
    });
}

function Showpopup(flg)
{
    if (flg == 0)
    {
        $("#myModal").modal("show");
        $("#myModal").appendTo("body");

        window.setTimeout(function () {
            $("#InvstgtName0").focus();
        }, 200);
    }
    else if(flg==1)
    {
        if ($.trim($('#PatientName').val()) == '') {
            warningshow('Please Select Patient', 'PRegNo');
        }
        else if ($.trim($('#Medicine1').val()) == '') {
            warningshow('Please Select Medicine', 'Medicine1');
        }
        //else if ((($('#MedicineId1').val() || 0) == 0)) {
        //    warningshow('Please Select Medicine', 'Medicine1');
        //}
        else if ($.trim($('#Daily1').val()) == '') {
            warningshow('Please Select Daily', 'Daily1');
        }
        else if ($.trim($('#Dosage1').val()) == '') {
            warningshow('Please Select Dosage', 'Dosage1');
        }
        else if ($.trim($('#Days1').val()) == '') {
            warningshow('Please Select Days', 'Days1');
        }
        else {
            $("#ConfmSts").val("PRINTDESC");
            $("#ConfirmPrint").modal("show");
            $("#ConfirmPrint").appendTo("body");
            $("#ConfmFlag").val(0);
            window.setTimeout(function () {
                $("#NextReview").focus();
            }, 200);
        }
    }
}

function POPUPMedicinePrint() {

        $("#ConfmSts").val("PRINTDESC");
        $("#ConfirmPrint").modal("show");
        $("#ConfirmPrint").appendTo("body");
        $("#ConfmFlag").val(1);
        window.setTimeout(function () {
            $("#NextReview").focus();
        }, 200);
    
}

function ngOnDestroy() {
    $("#myModal").modal("hide");
}

function AddInvestigation()
{
    if ($.trim($('#InvstgtName0').val()) == '')
    {
        warningshow('Please Enter Test', 'InvstgtName0');
    }
    else if ($.trim($('#InvstgtResult0').val()) == '') {
        warningshow('Please Enter Result', 'InvstgtResult0');
    }
    else if ($.trim($('#InvstgtNormal0').val()) == '') {
        warningshow('Please Enter Normal Value', 'InvstgtNormal0');
    }
    else
    {
        InvCount++;
        var id = parseInt(InvCount); var slno = $('.InvRow').length + 1;
        var ProdRow1 = "<tr id='IvRow" + id + "' class='jsgrid-row InvRow' onfocusout=UpdateTestRow(" + id + ")>" +
               "<td class='jsgrid-control-field jsgrid-align-center' style='width: 5%;'><i class='icon-trash' onclick=DelTableRowConfirm(1," + id + ")></i></td>" +
               "<td class='jsgrid-cell' style='width:8%;text-align:center' id='slrow" + id + "'>" + slno + "</td>" +
               "<td class='jsgrid-cell jsgrid-align-left' style='width:47%'><input type='text' id='InvstgtName" + id + "' value='" + $('#InvstgtName0').val() + "' onfocus=LoadTest(" + id + ") class='form-control brdles Tstclass' style='height:40px' ></td>" +
               "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' id='InvstgtResult" + id + "' value='" + $('#InvstgtResult0').val() + "' name='InvstgtResult' class='form-control brdles Tstclass' style='height:40px' ></td>" +
               "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' id='InvstgtNormal" + id + "' value='" + $('#InvstgtNormal0').val() + "' name='InvstgtNormal' class='form-control brdles Tstclass' style='height:40px' ></td>" +
                "<td class='jsgrid-cell jsgrid-align-left' style='width:20%'><input type='file' id='selectedDocs" + id + "'  style='width: 220px;height:40px;margin-bottom: 0rem;' onchange='validate(this.value," + id + ")' class='btn btn-outline-info' ></td>" +
               "<td style=display:none><input type='text'  id='InvstgtId" + id + "' value=" + $('#InvstgtId0').val() + " class='form-control'>" +
               "</td></tr>";
        $('#TblOtherInvest').append(ProdRow1);
        $('.brdles').css('border', 'none');
        ngOnDestroy();
        ClearData(1);
        $('#InvstgtName' + id).focus();
        TestFocus();
    }
}

function validate(file, id) {
    var ext = file.split(".");
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ["jpg", "jpeg", "png", "bmp", "gif", "txt", "xlsx", "pdf"];

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        warningshow("Wrong extension type.");
        $("#selectedDocs" + id).val("");
    }
}

function UpdateTestRow(Id, flg) {
    if ($.trim($('#InvstgtName' + Id).val()) != '') {
     
            if ($.trim($('#InvstgtResult' + Id).val()) == '') {
            warningshow('Please Select Result', 'InvstgtResult' + Id);
                return false;
            }
            else if ($.trim($('#InvstgtNormal' + Id).val()) == '') {
                warningshow('Please Select Normal', 'InvstgtNormal' + Id);
                return false;
            }
            else {
                return true;
            }       
    }
    else {
        warningshow('Please Select Test', 'InvstgtName' + Id);
        return true;
    }
}

function TestFocus()
{
    $('.Tstclass').keydown(function (e) {
        var NextId = '';
        var Name = $(this).attr('name');
        var Id = $(this).attr('id').match(/\d+/)[0];
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 || key == 39) {                                                        //Enter
            if (Name == 'InvstgtResult') { $('#InvstgtNormal' + Id).focus(); }
            else if (Name == 'InvstgtNormal') { $('#InvstgtName' + Id).focus(); }
        }
        else if (key == 37) {                                                   //Left
            if (Name == 'InvstgtResult') { $('#InvstgtName' + Id).focus().select(); }
            else if (Name == 'InvstgtNormal') { $('#InvstgtResult' + Id).focus(); }
        }
        else if (key == 40) {                                                   //Down
            $('input[name="' + Name + '"]').each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId > Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
        else if (key == 38) {                                                   //Up
            $($('input[name="' + Name + '"]').get().reverse()).each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId < Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
    });

}

function GetInvestigation(RevisitId) {
    var data = {};
    data.RegSeries = $('#RegSeries').val();
    data.PRegNo = $('#PRegNo').val();
    data.RevisitId = RevisitId;
    data.DelFlag = 1;
    data.Status = 'OP';
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_CaseSheetInvestigationGets",
        data: data,
        success: function (result) {
            AddInvestigationList(result.oList)
        }
    });
}

function AddInvestigationList(result)
{
for (var i = 0; i < result.length;i++)
{
    InvCount++;
    var id = parseInt(InvCount); var slno = $('.InvRow').length + 1;
    var ProdRow1 = "<tr id='IvRow" + id + "' class='jsgrid-row InvRow' onfocusout=UpdateTestRow(" + id + ")>" +
           "<td class='jsgrid-control-field jsgrid-align-center' style='width: 5%;'><i class='icon-trash' onclick=DelTableRowConfirm(1," + id + ")></i></td>" +
           "<td class='jsgrid-cell' style='width:8%;text-align:center' id='slrow" + id + "'>" + slno + "</td>" +
           "<td class='jsgrid-cell jsgrid-align-left' style='width:47%'><input type='text' id='InvstgtName" + id + "'   value='" + result[i].Medicine + "' onfocus=LoadTest(" + id + ") class='form-control brdles Tstclass' style='height:40px' ></td>" +
           "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' id='InvstgtResult" + id + "' value='" + result[i].Daily + "' name='InvstgtResult' class='form-control brdles Tstclass' style='height:40px' ></td>" +
           "<td class='jsgrid-cell jsgrid-align-left' style='width:10%'><input type='text' id='InvstgtNormal" + id + "' value='" + result[i].Dosage + "' name='InvstgtNormal' class='form-control brdles Tstclass' style='height:40px' ></td>" +
            "<td class='jsgrid-cell jsgrid-align-left' style='width:20%'><input type='file' id='selectedDocs" + id + "'  style='width: 220px;height:40px;margin-bottom: 0rem;' onchange='validate(this.value," + id + ")' class='btn btn-outline-info' ></td>" +
           "<td style=display:none><input type='text'  id='InvstgtId" + id + "' value=" + result[i].MedicineId + " class='form-control'>" +      //result[i].Days  - Selecteddocs
           "</td></tr>";
    $('#TblOtherInvest').append(ProdRow1);
    $('.brdles').css('border', 'none');
    $('#InvstgtName' + id).focus();
    TestFocus();
}
}

//-------------------------------------End Other Investigation


//-------------------------------------Medicine
function MedicineFocus() {
    $('.mdclass').keydown(function (e) {
        var NextId = '';
        var Name = $(this).attr('name');
        var Id = $(this).attr('id').match(/\d+/)[0];
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {                                                        //Enter
            if (Name == 'Notes') { $('#Daily' + Id).focus().select(); }
            else if (Name == 'Daily') { $('#Dosage' + Id).focus().select(); }

            else if (Name == 'medname') { $('#mednote' + Id).focus(); }
            else if (Name == 'Dosage') { $('#Days' + Id).focus().select(); }
            else if ((Name == 'Days') && (!$('#MdRow' + Id).hasClass('NtAd')))
            {
                NextId = $(this).closest('tr').next().attr('id').match(/\d+/)[0];
                $('#Medicine'+ NextId).focus().select();
            }
        }
        else if (key == 39) {                                                   //Right   
            
            if (Name == 'Notes') { $('#Daily' + Id).focus(); }
            if (Name == 'Daily') { $('#Dosage' + Id).focus(); }
            else if (Name == 'Dosage') { $('#Days' + Id).focus(); }
            else if (Name == 'Days') { $('#Medicine' + Id).focus().select(); }
        }
        else if (key == 37) {                                                   //Left
            if (Name == 'Notes') { $('#Medicine' + Id).focus().select(); }
            if (Name == 'Daily') { $('#mednote' + Id).focus().select(); }
            else if (Name == 'Dosage') { $('#Daily' + Id).focus(); }
            else if (Name == 'Days') { $('#Dosage' + Id).focus(); }
        }
        else if (key == 40) {                                                   //Down
            $('input[name="' + Name + '"]').each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId > Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
        else if (key == 38) {                                                   //Up
            $($('input[name="' + Name + '"]').get().reverse()).each((i, item) => {
                var $item = $(item);
                NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId < Id) {
                    $('#' + Name + NextId).focus().select();
                    return false;
                }
            });
        }
    });
}

function AddMedicineRowConfirm(e, Id) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13 && ($('#MdRow' + Id).hasClass('NtAd'))) {
        if ($.trim($('#Medicine' + Id).val() ) =='' ) {
            warningshow('Please Select Medicine', 'Medicine' + Id);
        }
        //else if ((($('#MedicineId' + Id).val() || 0)==0)) {
        //    warningshow('Please Select Medicine', 'Medicine'+Id);
        //}
        else if ($.trim($('#Daily' + Id).val()) == '') {
            warningshow('Please Select Daily', 'Daily' + Id);
        }
        else if ($.trim($('#Dosage' + Id).val()) =='') {
            warningshow('Please Select Dosage', 'Dosage' + Id);
        }
        else if ($.trim($('#Days' + Id).val()) == '') {
            $('#Days' + Id).val(0)
           // warningshow('Please Select Days', 'Days' + Id);
        }
        else
        {
         e.preventDefault();
         AddMedicineRow(0);
         $('#MdRow' + Id).removeClass('NtAd');
        }
   }
}

function AddMedicineRow(flg)      //flg-0 : Add Medicine
{
    if (flg == 0) {
        var Id = parseInt(MedCount) + 1; var SlNo = $('.Mrow').length + 1;
        var MedRow =
        '<tr  class="jsgrid-header-row Mrow NtAd" id="MdRow' + Id + '">' +
        '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 3%;" onclick="DelTableRowConfirm(0,' + Id + ')"><i class="icon-trash"></i></td>' +
        '<td class="jsgrid-align-center" style="width: 4%;" id="Mslno' + Id + '">' + SlNo + '</td>' +
        '<td class="" style="width: 30%;">' +
        '<input type="text" class="form-control mdclass brdles" name="medname" id="Medicine' + Id + '" onfocus="LoadMedicine(' + Id + ')" onfocusout=UpdateMedicineRow(' + Id + ',0) />' +
        '<input type="text" style="display:none" class="form-control" id="MedicineId' + Id + '" />' +
        '</td>' +
        '<td class="" style="width: 20%;"><input type="text" class="form-control mdclass brdles"  onfocus="mednoteload3(' + Id + ')"  name="Notes" id="mednote' + Id + '" /></td>' +
        '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles"  onfocus="mednoteload1(' + Id + ')" onfocusout=UpdateMedicineRow(' + Id + ',1) name="Daily" id="Daily' + Id + '" /></td>' +
        '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" onfocus="mednoteload(' + Id + ')" onfocusout=UpdateMedicineRow(' + Id + ',2) name="Dosage" id="Dosage' + Id + '" /></td>' +
        '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" onfocusout=UpdateMedicineRow(' + Id + ',3) name="Days" id="Days' + Id + '" onkeydown=AddMedicineRowConfirm(event,' + Id + ') /></td>' +
        '</tr>';
        $('#TblMedicine').append(MedRow);
        MedCount++;
        $('#Medicine' + Id).focus();
        MedicineFocus();
        $('.brdles').css('border', 'none');
    }
}

Getdosages()
function Getdosages() {    
    var data = {};
    data.DosageId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DosageGetandGets",
        data: data,
        success: function (result) {            
                Loaddosagelist(result.oList);           
        }
    });
}

//const Dosages = [];
//function Loaddosagelist(result) {
//   for (var i = 0; i < result.length; i++) {
//       Dosages.push(result[i].DosageName);
//      }
   
//}

var Dosages = ["AF", "BF"];



function mednoteload3(ID) {
    
    $(function () {
        $("#mednote" + ID).autocomplete({
            source: Dosages, delay: 0, autoFocus: true,
            focus: function (event, ui) { },
            select: function (event, ui) { }
        }).on('keydown', function (e) {

        }).autocomplete("instance")._renderItem = function (ul, item) { return $("<li>").append("<div>" + item.label + "</div>").appendTo(ul); };
    })
}


function mednoteload1(ID) {

    var availableTags = ["Before Food", "After Food", "STAT",'SOS'];
    $(function () {
        $("#Daily" + ID).autocomplete({
            source: availableTags, delay: 0, autoFocus: true,
            focus: function (event, ui) { },
            select: function (event, ui) { }
        }).on('keydown', function (e) {

        }).autocomplete("instance")._renderItem = function (ul, item) { return $("<li>").append("<div>" + item.label + "</div>").appendTo(ul); };
    })
}

function mednoteload(ID)
{
   

 var availableTags = ["1-0-0","0-1-0","0-0-1","1-0-1","1-1-1","1-1-1-1","1/2-0-0","0-1/2-0","0-0-1/2","1/2-0-1/2","1/2-1/2-1/2","1/2-1/2-1/2-1/2","SOS","STAT"];
    $(function () {
        $("#Dosage" + ID).autocomplete({
            source: availableTags, delay: 0, autoFocus: false,
            focus: function (event, ui) {  },
            select: function (event, ui) {  }
        }).on('keydown', function (e) {
            
        }).autocomplete("instance")._renderItem = function (ul, item) { return $("<li>").append("<div>" + item.label + "</div>").appendTo(ul); };
    })
}



function UpdateMedicineRow(Id,flg)
{
    if ($.trim($('#Medicine' + Id).val()) != '') {
        if (flg == 0)
        {
            if (($('#MedicineId' + Id).val() || 0) == 0) {
               // warningshow('Please Select a valid Medicine', 'Medicine' + Id);
               // return false;
            }
            else { return true; }
        }
       else if(flg==1)
       {
        if ($.trim($('#Daily' + Id).val()) == '') {
            //warningshow('Please Select Daily', 'Daily' + Id);
            //return false;
            $('#Daily' + Id).val(0)
        }       
        else {
            return true;
        }
       }
       else if (flg == 2) {
            if ($.trim($('#Dosage' + Id).val()) == '') {
               //warningshow('Please Select Dosage', 'Dosage' + Id);
                //return false;
                $('#Dosage' + Id).val(0)
           }           
           else {
               return true;
           }
       }
       else if (flg == 3) {
            if ($.trim($('#Days' + Id).val()) == '') {
                //warningshow('Please Select Days', 'Days' + Id);
                //return false;
                $('#Days' + Id).val(0)
            }
            else {
                return true;
            }
        }
    }
}

function Imuunizationhistory()
{
    var data = {};
    data.RegSeries = $('#RegSeries').val();
    data.PRegNo = $('#PRegNo').val();
    data.RevisitId = RevisitId;
    data.DelFlag = 1;
    data.Status = 'OP';
    $.ajax({
        type: "POST",
        url: "../Hospital/ImmunizationStatusGet",
        data: data,
        success: function (result) {           
        }
    });

}


function GetMedicine(RevisitId,Flag)
{
    var data = {};
    data.RegSeries =  $('#RegSeries').val();
    data.PRegNo = $('#PRegNo').val();
    data.RevisitId = RevisitId;
    data.DelFlag = 1;
    data.Status = 'OP';
    $.ajax({
        type: "POST",
        url: "../Hospital/HMS_CaseSheetMedicineGets",
        data: data,
        success: function (result) {
            if (Flag != 1) {
                AddMedicineList(result.oList)
            }
            else {
                AddMedicineListPrev(result.oList)
            }
        }
    });
}

function AddMedicineList(result)      //flg-0 : Add Medicine during List
{
    RowRemove(0);  

    for (var i = 0; i < result.length;i++)
    {
        
        if (i == 0)
        {
            $('#MedicineId1').val(result[0].MedicineId);
            $('#Medicine1').val(result[0].Medicine);
            $('#Daily1').val(result[0].Daily);
            $('#Dosage1').val(result[0].Dosage);
            $('#Days1').val(result[0].Days);
            $('#mednote1').val(result[0].Mednotes);
            if (result.length>2)
            $('#MdRow1').removeClass("NtAd");
        }
        else
        {
            var Id = parseInt(MedCount) + 1; var SlNo = $('.Mrow').length + 1;
            var MedRow =
            '<tr  class="jsgrid-header-row Mrow" id="MdRow' + Id + '">' +
            '<td class="jsgrid-control-field jsgrid-align-center" id="editheader" style="width: 3%;" onclick="DelTableRowConfirm(0,' + Id + ')"><i class="icon-trash"></i></td>' +
            '<td class="jsgrid-align-center" style="width: 5%;" id="Mslno' + Id + '">' + SlNo + '</td>' +
            '<td class="" style="width: 30%;">' +
            '<input type="text" class="form-control mdclass brdles" name="medname" id="Medicine' + Id + '"  value="' + result[i].Medicine + '" onfocus="LoadMedicine(' + Id + ')" onfocusout=UpdateMedicineRow(' + Id + ',0) />' +
            '<input type="text" style="display:none" class="form-control" id="MedicineId' + Id + '"  value=' + result[i].MedicineId + ' />' +
            '</td>' +

             '<td class="" style="width: 20%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Mednotes + '"  name="Notes" id="mednote' + Id + '" /></td>' +

            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Daily + '" onfocusout=UpdateMedicineRow(' + Id + ',1)  name="Daily" id="Daily' + Id + '" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Dosage + '" onfocusout=UpdateMedicineRow(' + Id + ',2)  name="Dosage" id="Dosage' + Id + '" /></td>' +
            '<td class="" style="width: 10%;"><input type="text" class="form-control mdclass brdles" value="' + result[i].Days + '" onfocusout=UpdateMedicineRow(' + Id + ',3)  name="Days" id="Days' + Id + '" onkeydown=AddMedicineRowConfirm(event,' + Id + ') /></td>' +
            '</tr>';
            $('#TblMedicine').append(MedRow);
            MedCount++;
            $('#Medicine' + Id).focus();
            MedicineFocus();
            $('.brdles').css('border', 'none');

            if (i == (result.length - 1))
            { $('#MdRow' + Id).addClass("NtAd"); }
        }
    }
}


//-------------------------------------End Medicine

function fnImageSave(imageName, RegId, sts) {

    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = RegId;
    if ((imageName != "" && totalFiles != 0)) {
        var Exten = $("#selectedImage").get(0).files[0].name.split('.').pop();
        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", RegId);
            formData.append("Exten", Exten);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadPatientImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                }
            });
        }
    }
    else {
        return;
    }

}

function DelTableRowConfirm(flg, Id) {
    var Msg = ''; var ConFlg;
    if (flg == 0)                                           //Medicine Row Delete
    {
        Msg += 'Do you want to Delete this Medicine?';
        ConFlg = 'DeleteMed';
    }
    else if (flg == 1)                                      //Test Row Delete
    {
        Msg += 'Do you want to Delete this Test?';
        ConFlg = 'DeleteTest';
    }
    $('#confirm').show();
    $('#confirmOk').focus();
    $('#Confirmflag').val(ConFlg); $('#ConfirmRowId').val(Id);
    $('#confirmmessage').text(Msg);
}

function DelTableRow(flg, RowId) {
    if (flg == 0)                              //Medicine Row Delete
    {
        var Slno = 1;
        $('#MdRow' + RowId).remove();
        for (var j = 1; j <= MedCount; j++) {
            if ($('#Medicine' + j).length != 0) {
                $('#Mslno' + j).text(Slno);
                Slno++;
            }
        }
        var NextId = 1;
        try {
            NextId = $('#TblMedicine tr:last-child').attr('id').match(/\d+/)[0];
        }
        catch (err) {
        }
        $('#MdRow' + NextId).addClass('NtAd');
        $('#Days' + NextId).focus().select();
    }
   else if (flg == 1)                              //Test Row Delete
    {
        var Slno = 1;
        $('#IvRow' + RowId).remove();
        for (var j = 1; j <= InvCount; j++) {
            if ($('#InvstgtName' + j).length != 0) {
                $('#slrow' + j).text(Slno);
                Slno++;
            }
        }
        var NextId = 1;
        try {
            NextId = $('#TblOtherInvest tr:last-child').attr('id').match(/\d+/)[0];
            $('#InvstgtName' + NextId).focus().select();
        }
        catch (err) {
        }
    }
}

function ConfirmboxResult(Result, Status, RowId) {
    if (Result == 'true' && Status == 'DeleteMed') {
        DelTableRow(0, RowId);
    }
    else if (Result == 'true' && Status == 'DeleteTest') {
        DelTableRow(1, RowId);
    }

    else if (Result == 'true' && Status == 'Gowork') {
        window.location = '../Revisit/OPWorkSheet_D'
    }
    else if (Result == 'true' && Status == 'SaveCase') {
        SaveAndUpdate(1);
    }
    else if (Result == 'true' && Status == 'UpdateCase' && parseInt($("#EditFlag").val() || 0) == 0) {
        SaveAndUpdate(1);
    }
    else if (Result == 'true' && Status == 'UpdateCase') {
        $("#btncnclsave").attr("onclick", "CheckEditInvoce()");
        $('#otp,#otpremarks').prop("disabled", false);
        $('#OTPDiv').show();
        $("#otp,#otpremarks").val('');
        $("#otp").focus();
    }
    else if (Result == 'true' && Status == 'Clear') {
        if (($.trim($('#PRegNo').val()) != '') && ($.trim($('#RegSeries').val() || 0) != 0) && (($.trim($('#Complaint').val()) != '')
            || (($.trim($('#Diagnosis').val()) != '')) || (($.trim($('#Advice').val()) != '')) || (($.trim($('#Allergies').val()) != ''))
            || (($.trim($('#Details').val()) != '')) || (($.trim($('#Notes').val()) != ''))
            )) {
            SaveAndUpdate(2);
        }
        else {
            formrefresh();
        }

    }
    else if (Result == 'true' && Status == 'DeleteCase') {
        SaveAndUpdate(0);
    }
    else if (Result == 'true' && Status == 'PRINTDESC') {
        PrintthisDescriptionConfirm(RowId);
    }
    else if (Result == 'true' && Status == 'AllergyRemove') {
        OKDeActivateAllergy(RowId);

    }
    else if (Result == 'false' && Status == 'AllergyRemove') {
        ShowAllergy();
    }
    else if (Result == 'true' && Status == 'ImmuneDelete') {
        OKDeleteImmune(RowId);
    }
    else if (Result == 'true' && Status == 'CaseEdit')
    {
        CallCaseLoad(RowId, 0, 0);
    }
    
    $('#confirm').fadeOut();
}


////----------HealthDetails

function GethealthDetails(RevisitId, PatientId) {
    var data = {};
    data.RevisitId = RevisitId;
    data.PatientId = PatientId;
    data.DoctorId = ERPUserId

    $.ajax({
        type: "POST",
        url: "../Revisit/RevisitPatientHealthDetailsGetandGets",
        data: data,
        success: function (result) {           
            ShowhealthdetailsGet(result);
        }
    });
}

function ShowhealthdetailsGet(result) {
    if (result[0].Abdominal == '') {
        var AA = ('## ## ##').split("##");
    }
    else {
        var AA = (result[0].Abdominal).split("##");
    }


    

    if ($('#Details').val() == '') {
        $('#Details').val('Weight : ' + result[0].Weight + '\n' + 'Height : ' + result[0].Height + '\n' + 'BP : ' + result[0].BP + '\n' + 'Temperature : ' + result[0].Temperature + '\n' + 'Sugar : ' + result[0].Sugar + '\n' + 'BMI : ' + result[0].BMI + '\n' + 'Chest Circumference : ' + result[0].ChestCircumference + '\n' + 'Head Circumference : ' + result[0].HeadCircumference + '\n' + 'Abdominal : ' + AA[0] + '\n' + 'SPO2 : ' + AA[1] + '\n' + 'Pulse Rate : ' + AA[2]);
    }
    if ($('#Allergies').val() == '') {
        $('#Allergies').val(result[0].Allergy);

    }
}


//---------------------------------------------------------------COMMON FUNCTIONS
function PrintthisDescriptionConfirm(Flag)
{
    var Type = 'HEADERPRINT';                               // HEADERPRINT : With Header    ,   NONHEADERPRINT : Without Header
    $("#ConfirmPrint").modal("hide");
    PrintTableInsert(Flag,Type);
    PopUpClose(0);
}

function PrintTableInsert(Flag, Type) {

    $("#tbl_PrintTable tr").remove();
    var Id = 0;

    if (Flag == 0)  //From Main Medicine Table
    {

        $("#PrintPRegNo").val($("#PRegNo").val());
        $("#PrintCaseDate").val($("#CaseDate").val());
        $("#PrintComplaint").val($("#Diagnosis").val());
        $("#PrintPatientName").val($("#PatientName").val());
        $("#PrintPatientOP").val($("#PatientOP").text());
        $("#PrintPatientAge").val($("#PatientAge").text());
        $("#PrintPatientGender").val($("#PatientGender").text());
        $("#PrintPatientWeight").val($("#PatientWeight").text());

        for (var i = 0; i <= MedCount; i++) {
            if ($('#Medicine' + i).length && $.trim($('#Medicine' + i).val()) != '') {
                Id++;
                var ResText = '<tr>' +
                    '<td>' + Id + '</td>' +
                    '<td><input type="text" id="PrintMedicine_' + Id + '" value="' + $('#Medicine' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDosage_' + Id + '" value="' + $('#Dosage' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDaily_' + Id + '" value="' + $('#Daily' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDays_' + Id + '" value="' + $('#Days' + i).val() + '" /></td>' +
                    '</tr>';
                $("#tbl_PrintTable").append(ResText);
            }
        }

        CmnPrintFunction('OPCaseSheet', Id, Type, 0);
    }
    else {  //From PopUp Medicine Table


        $("#PrintPRegNo").val($("#PRegNo").val());
        $("#PrintCaseDate").val($("#PrevCaseDate").text());
        $("#PrintComplaint").val($("#PDiagnosis").val());
        $("#PrintPatientName").val($("#PatientName").val());
        $("#PrintPatientOP").val($("#PrevPatientOP").text());
        $("#PrintPatientAge").val($("#PatientAge").text());
        $("#PrintPatientGender").val($("#PatientGender").text());
        $("#PrintPatientWeight").val($("#PatientWeight").text());

        var Count = $("#GridPopUp1").val();

        for (var i = 0; i <= Count; i++) {
            if ($('#PMedicine_' + i).length && $.trim($('#PMedicine_' + i).val()) != '') {
                Id++;
                var ResText = '<tr>' +
                    '<td>' + Id + '</td>' +
                    '<td><input type="text" id="PrintMedicine_' + Id + '" value="' + $('#PMedicine_' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDosage_' + Id + '" value="' + $('#PDosage_' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDaily_' + Id + '" value="' + $('#PDaily_' + i).val() + '" /></td>' +
                    '<td><input type="text" id="PrintDays_' + Id + '" value="' + $('#PDays_' + i).val() + '" /></td>' +
                    '</tr>';
                $("#tbl_PrintTable").append(ResText);
            }
        }

        CmnPrintFunction('OPCaseSheet', Id, Type, 0);
    }

}

//Date Calculation
function GetNextReviewDate() {
    var terms = ($('#NextReview').val() || 0); terms = isNaN(terms) ? 0 : terms;
    var startdate = $('#CaseDate').val();
    var newdate = moment(startdate, "DD/MM/YYYY");
    newdate.add(terms, 'days'); 
    var dd = new Date(newdate).getDate();
    var mm = new Date(newdate).getMonth() + 1;
    var y = new Date(newdate).getFullYear();
    var someFormattedDate = (dd < 10 ? '0' : '') + dd + '/' + (mm < 10 ? '0' : '') + mm + '/' + y;
    $('#NextDate').val(someFormattedDate);
}

function PopUpClose(Flag) {
    if (Flag == 0)
    {
       // $('#NextReview').val('');
        GetNextReviewDate();
    }
    else if (Flag == 1)
    { $('#myModalnew').modal("hide"); } 
}

function FocusManual(Id, Dest, e,key) {

    var char = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key==0 && char == 13) {
        e.preventDefault();
        $('#' + Dest).focus();
    }
    else if (key != 0 && char == key) {
        e.preventDefault();
        $('#' + Dest).focus();
    }
}




//Show Window Alert Insert,update delete  Modify
function Showalerts(Status,CaseSheetId) {
    if (Status == 1) {
        window.setTimeout(function () {
            formrefresh(1);
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Gowork'); $('#ConfirmRowId').val(1);
            $('#confirmmessage').text('Do You Want to Go Work Sheet?');
        }, 500);
    }
    else if (Status == 2) {
        window.setTimeout(function () {
            formrefresh(1);
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Gowork'); $('#ConfirmRowId').val(1);
            $('#confirmmessage').text('Do You Want to Go Work Sheet?');
        }, 500);
    }
    else if (Status == 3) {
        formrefresh(0);
        swal('Casesheet Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {
        formrefresh(0);
        swal('Casesheet  Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 5) {
        swal('Casesheet already exists', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh(0);
        swal('Casesheet  Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 7) {
        swal('Allergy Record Removed', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 8) {
        swal('Medicine Advice Updated', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 9) {
        swal('Immunization Details Updated', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Casesheet Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();
    }

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
         { "width": "15%", "targets": 3 },
         { "width": "5%", "targets": 4 },
         { "width": "15%", "targets": 5 },
         { "width": "15%", "targets": 6 },
         { "width": "15%", "targets": 7 },
         { "width": "5%", "targets": 8 },
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

function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}

//Show Warnig Popup right top
function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus().select();
    window.setTimeout(function () {
        $('#Warningpopup').hide();
    }, 3000);
}

function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh(0);
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

function Validateemail() {
    var email = $('#EmailId').val();
    if (email != '') {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //var address = document.getElementById[email].value;
        if (reg.test(email) == false) {
            warningshow('Please Enter a valid Email', 'EmailId');
            return (false);
        }
        else
            return true;
    }
    else
        return true;

}