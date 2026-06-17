var colorArray = ['#33ccff', '#ff66cc', '#ff9966', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D'];
var BillFlag = 0;
$(document).ready(function () {
    RevisitIDLoad();
    Defaultfocus();
    DoctorLoad();
    ShiftLoad();
    $("#RevisitDate").val(CurDate);
    $("#LabelDate").text(CurDate);


    $("#btnsubmit").click(function (e) {
        $('#btnsubmit').hide();
        SaveandUpdateRevisit(1);
    });


    $("#btnsavesubmit").click(function (e) {
        BillFlag = 1;
        SaveandUpdateRevisit(1);
    });



    $("#btnlist").click(function (e) {
        $("#FromDate,#ToDate").val(CurDate);
        $("#DoctorSearch,#SearchRegNo").val('');
        $("#DoctorSearchId").val(0);
        GetRows(0);
        formrefresh();
    });   
    $("#btnnew").click(function (e) {
        formrefresh();
    });
    $("#btndelete").click(function (e) {
        if (parseInt($("#RevPrimaryId").val() || 0) != 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(0);
            $('#confirmmessage').text('Do you want delete this OP-Visit?');
            
        }
    });
    $("#btnvisiting").click(function (e) {
        if (parseInt($("#PatientId").val() || 0) == 0) {
            warningshow('Please Select Patient', 'RegNumber');
        }
        else {
            GetPreviousVisitingDetails();
        }
    });
    $("#btnprint").click(function (e) {
        PrintRevist();
    });
    $('#DocName').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();            
            $('#VisitingFees').focus();
            $('#VisitingFees').select();
        }
    });
    $('#Shift').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#PatTokenNumber').focus();
            $('#PatTokenNumber').select();
        }
    });
    $('#PatTokenNumber').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }
    });
    $('.enterflow').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });
    $('#DetailsModal').on('shown.bs.modal', function () {
        $('#PatBP').focus().select();
    })

});

function DoctorLoad() {
    var Feeduration = 0;
    var data = {};                                       //dropdownbind
    data.DoctorId = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevistDoctorGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#DocName,#DoctorSearchId").empty()
                $("#DocName,#DoctorSearchId").append("<option value='0' Fee='0'>--Select--</option>");

                for (var i = 0; i < result.oList.length; i++) {
                    Feeduration = parseInt(result.oList[i].Status||0);
                    $("#DocName,#DoctorSearchId").append("<option value='" + result.oList[i].DoctorId + "' Tokenprefix='" + result.oList[i].Add1+"'   Feedur='" + Feeduration + "'   Fee='" + result.oList[i].ConsultFees + "'>" + result.oList[i].DoctorName + "</option>");
                }
         
            }
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
                $("#CurRevId").val(result.oList[0].RevisitId);
                $("#CurRevisitId").text(result.oList[0].RevisitId);
            }
            else {
                $('#confirmff,#keyboardff').show();
               $("#RegNumber").blur();              
            }
        }
    });
}

function TokenNumberLoad() {
    if ($("#DocName").val() != 0) {
        var data = {};
        data.DoctorId = $("#DocName").val();
        data.Shift = $("#Shift").val();
        data.RevisitDate = $("#RevisitDate").val();
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_TokenNumberGets",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    $("#PatTokenNumber").val(result.oList[0].TokenNumber);
                }
               
                if(result.oList[0].TokenNumber=='')
                {
                    $("#PatTokenNumber").val(1)
                }
            }
        });
    }
    else {
        $("#PatTokenNumber").val('');
    }
}

function ChangeFee()
{
    var data = {};
    data.DoctorId = $("#DocName").val();
    data.PatientId = $("#PatientId").val();

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_DoctorFeegets",
        data: data,
        success: function (result) {           
            $("#ConsultationFees").val(result.oList[0].ConsultFees)
            $('#PatLastVisitdayes').text(result.oList[0].FromDate + '-' + result.oList[0].ToDate)
            DDCONFEE = parseFloat(result.oList[0].ConsultFees || 0).toFixed(Decimal)
            amountfillinpopup();
        }
    });

    //debugger;
    //var FeeDuration = parseInt($("#DocName").find("option:selected").attr("feedur") || 0)

    //var D1 = ($('#LabelDate').text().split("/"));
    //var D2 = ($('#PatLastVisit').text().split("/"));

    //const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    //const firstDate = new Date(D1[2], D1[1], D1[0]);
    //const secondDate = new Date(D2[2], D2[1], D2[0]);

    //const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    //$('#PatLastVisitdayes').text(diffDays +' Day(s) Before')
   
    //if (FeeDuration < diffDays) {
    //    $("#ConsultationFees").val(parseFloat($("#DocName").find("option:selected").attr("Fee") || 0).toFixed(Decimal));
    //}
    //else {
    //    $("#ConsultationFees").val(0);
    //    $("#ConsultationFees").val(0);
    //}
}

function ShiftLoad() {
    var data = {};                                       //dropdownbind
    data.Flag = 0;
    data.DeptId = ERPDeptId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_ShiftGetandGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#Shift").empty()                
                for (var i = 0; i < result.oList.length; i++) {
                    $("#Shift").append("<option value='" + result.oList[i].Flag + "'>" + result.oList[i].Shift + "</option>");
                }
                if (result.oList[0].Status != 0) {
                    $("#PrevShift").val(result.oList[0].Status)
                    $("#Shift").val(result.oList[0].Status);
                }
            }
        }
    });
}

function Defaultfocus() {
    $("#RegNumber").focus();
}

function formrefresh() {
    HealthPop(2);
    SelectPayType();
    $('#btnsavesubmit').show();
    $("#RevisitDate").val(CurDate);
    $("#LabelDate").text(CurDate);
    $(".denull").val('');
    $(".dezero").val(0);
    $(".detextnull").text('');
    if ($("#PrevShift").val() != 0) {
        $("#Shift").val($("#PrevShift").val());
    }
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
    $("#btndelete,#btnprint,#btntoken").hide();
    $("#btnsubmit").removeAttr("disabled");
    //$("#btnsubmit").attr("disabled", true);
    RevisitIDLoad();
    Defaultfocus();
}

function SaveandUpdateRevisit(Flag) {
    if (parseInt($('#PatientId').val()||0) == 0) {
        warningshow('Please Select Patient', 'RegNumber');
        $('#btnsubmit').show();
    }
    else if (parseInt($('#DocName').val() || 0) == 0) {
        warningshow('Please Select Doctor', 'DocName');
        $('#btnsubmit').show();
    }
    else if (parseInt($("#PatTokenNumber").val() || 0) == 0) {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('TokenZero'); $('#ConfirmRowId').val(Flag);
        $('#confirmmessage').text('Do you want save this data without Token number?');
        $('#btnsubmit').show();
    }
    else {
        if (parseInt($("#RevPrimaryId").val() || 0) != 0) {
            if(Flag==1){
                $('#confirm').show();
                $('#confirmOk').focus();
                $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
                $('#confirmmessage').text('Do you want update this OP-Visit?');
                $('#btnsubmit').show();
            }
            else {
                $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
                $('#confirmmessage').text('Do you want delete this OP-Visit?');
                $('#btnsubmit').show();
            }
        }
        else{
        OKSaveandUpdateRevisit(Flag);
        }
    }
}

function OKSaveandUpdateRevisit(Flag) {
    $('#btnsubmit').hide();
    sessionStorage.setItem("BSOP_PI", $("#PatientId").val());
    sessionStorage.setItem("BSOP_IP", 0);
    var data = {};
    data.RevId = $("#RevPrimaryId").val();
    data.RevisitId = $("#CurRevId").val();
    data.OPNumber = $("#RegNumber").val();
    data.PatientId = $("#PatientId").val();
    data.DoctorId = $("#DocName").val();
    data.VisitFees = parseFloat($("#VisitingFees").val() || 0);
    data.ConsultFees = parseFloat($("#ConsultationFees").val() || 0);
    data.OtherFees = parseFloat($("#OtherFees").val() || 0);
    data.Shift = $("#Shift").val();
    data.TokenNumber = parseInt($("#PatTokenNumber").val() || 0);
    data.Type = $('#PayType').val();;
    data.Weight = $("#PatWeight").val();
    data.Height = $("#PatHeight").val();
    data.DelFlag = Flag;
    data.RevisitDate = $("#RevisitDate").val();
    data.UserId = ERPUserId;
    data.DeptId = ERPDeptId;
    data.BP = $("#PatBP").val();
    data.Temperature = $("#PatTemperature").val();
    data.Sugar = $("#PatSugar").val();
    data.Cash = parseFloat($('#revcash').val() || 0);
    data.Upi = parseFloat($('#revupi').val() || 0);
    data.Card = parseFloat($('#revcard').val() || 0);
    $.ajax({
        type: "POST",
        url: "../Revisit/RevisitInsertandUpdate",
        data: data,
        success: function (result) {
          
            if (result.oList.length > 0) {
                var status = result.oList[0].Status;
                var RevisitId = result.oList[0].RevisitId;
                var TokenNumber = result.oList[0].TokenNumber;
               

                var delayInMilliseconds = 1000; //1 second
                setTimeout(function () {
                    $('#btnsubmit').show();
                }, delayInMilliseconds);
                
                $("#PrevShift").val(result.oList[0].Shift);
                if (status == 1 || status == 2) {
                    ShowPrintAlerts(status, RevisitId, TokenNumber);
                }
                else {
                    Showalerts(status, RevisitId, TokenNumber);
                }
            }
            else {
                console.log("Error")
            }
        }
    });
}

function HealthPop(flg)
{
    if (flg == 0) {
        $("#DetailsModal").modal("show");
        $("#DetailsModal").appendTo("body");
    }
    else if (flg == 2) {
        $("#DetailsModal input").val('');
    }
    else if (flg == 3) {
        $("#DetailsModal").modal('hide');
        $('#btnsubmit').click();
    }
}

function GetRows(Flag) {
    
    var data = {};                                       //dropdownbind
    data.RevisitId = Flag;
    data.FromDate = $("#FromDate").val();
    data.ToDate = $("#ToDate").val();
    data.DoctorId = $("#DoctorSearchId").val();
    data.PatientId = 0;
    data.OPNumber = $("#SearchRegNo").val();
    data.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_RevisitGetandGets",
        data: data,
        success: function (result) {
            if (Flag == 0) {
                GetList(result);
            } else {
                GetRevisit(result);
            }
        }
    });
}

function closelist() {
    
    $("#listing").hide();
    $("#Entry").show();
    Defaultfocus();
}

function GetList(result) {
    $("#listing").show();
    $("#Entry").hide();

    disable_datatable('tbl_Revisit');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Date</th>" +
        "<th>Reg No</th>" +
        "<th>OP-VisitId</th>" +
        "<th>Patient</th>" +     
        "<th>Gender</th>" +
        "<th>DOB</th>" +        
        "<th>Contact</th>" +
        "<th>Address</th>" +
        "<th>Doctor</th>" +
        "<th>Token</th>" +
        "<th>Shift</th>" +
        "<th >Edit</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {



        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>'+ result[i].RevisitDate + '</td>' +
            '<td>'+ result[i].OPNumber + '</td>' +
            '<td>' + result[i].RevisitId + '</td>' +
            '<td>' + result[i].PatientName + '</td>' +
            '<td>' + result[i].Gender + '</td>' +
            '<td>'+ result[i].DOB + '</td>' +            
            '<td>'+ result[i].Contact + '</td>' +
            '<td>' + result[i].Add1 + '</td>' +
            '<td>' + result[i].DoctorName + '</td>' +
            '<td align=center style="color:red;font-weight:bold">' + result[i].TokenNumber + '</td>' +
            '<td style="background-color:' + colorArray[result[i].Flag] + '">' + (result[i].ShiftName).substring(0, 4) + '</td>' +
            '<td onclick="GetRows(' + result[i].RevId + ')" align=center><a>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tbl_Revisit').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th>Reg No</th>" +
        "<th>OP-VisitId</th>" +
        "<th>Patient</th>" +
        "<th>Gender</th>" +
        "<th>DOB</th>" +       
        "<th>Contact</th>" +
        "<th>Address</th>" +
        "<th>Doctor</th>" +
        "<th>Token</th>" +
        "<th>Shift</th>" +
        "<th > </th>" +
        "</tr></tfoot>");
    datatableWithsearch('tbl_Revisit');
    $("#popupdiv").hide();
}

function GetRevisit(result) {
    $('#btnsavesubmit').hide();
    $("#listing").hide();
    $("#Entry,#btndelete,#btnprint,#btntoken").show();
    if (result.length > 0) {
        $("#RevPrimaryId").val(result[0].RevId);
        $("#CurRevId").val(result[0].RevisitId);
        $("#CurRevisitId").text(result[0].RevisitId);
        $("#RegNumber").val(result[0].OPNumber);
        $("#PatientId").val(result[0].PatientId);
        $("#PatName").val(result[0].PatientName);
        $("#DocName").val(result[0].DoctorId);
        $("#VisitingFees").val(result[0].VisitFees);
        $("#ConsultationFees").val(result[0].ConsultFees);
        $("#OtherFees").val(result[0].OtherFees);
        $("#Shift").val(result[0].Shift);
        $("#PatTokenNumber").val(result[0].TokenNumber);
        $("#RevisitDate").val(result[0].RevisitDate);
        $("#LabelDate").text(CurDate);

        $("#PatWeight").val(result[0].Weight);
        $("#PatHeight").val(result[0].Height);
        $("#PatBP").val(result[0].BP);
        $("#PatTemperature").val(result[0].Temperature);
        $("#PatSugar").val(result[0].Sugar);
        debugger;
        var Am = parseFloat(result[0].VisitFees || 0) + parseFloat(result[0].ConsultFees || 0) + parseFloat(result[0].OtherFees || 0)

        DDCONFEE = parseFloat(result[0].ConsultFees || 0)
        DDREGFEE = parseFloat(result[0].VisitFees || 0);

        $('#revtotal').val(Am.toFixed(2))

        $('#revcash').val(result[0].Cash);
        $('#revupi').val(result[0].Upi);
        $('#revcard').val(result[0].Card);

        $('#PayType').val(result[0].Type)
        

        var data = {};                                       //dropdownbind
        data.PatientId = result[0].PatientId;
        data.DeptId = ERPDeptId;
        $.ajax({
            type: "POST",
            url: "../Revisit/HMS_PatientSearchGet",
            data: data,
            success: function (result) {
                if (result.oList.length > 0) {
                    GetPatientData(result.oList,0);
                }
            }
        });
        $("#DocName").focus();
    }
}

function Filter() {

    $("#FromDate,#ToDate").val(CurDate);
    $("#DoctorSearch,#SearchRegNo").val('');
    $("#DoctorSearchId").val(0);
    $("#popupdiv").show();
}

function GetPreviousVisitingDetails() {
    var data = {};
    data.PatientId = $("#PatientId").val();
    data.DeptId = ERPDeptId;
    data.UserId = ERPUserId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMSPreVisitDetailGets",
        data: data,
        success: function (result) {
            $("#PatientNameMo").text($("#PatName").val());
            $("#myModal").modal("show");
            $("#myModal").appendTo("body");
            GetPreVisitList(result.oList);
        }
    });
}
function GetPreVisitList(result) {

    $("#PatientNameMo").text(result.length+' Visits')

    disable_datatable('tbl_PreRevisit');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>OP-Visit ID</th>" +
        "<th>Date</th>" +
        "<th>Consultant</th>" +
        //"<th>Visiting Fee</th>" +
        "<th>User</th>" +
        //"<th>Other Fee</th>" +
        "<th>Con Fee</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {



        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].RevisitId + '</td>' +
            '<td>' + result[i].RevisitDate + '</td>' +
            '<td>' + result[i].DoctorName + '</td>' +
            //'<td align="right">' + parseFloat(result[i].VisitFees || 0).toFixed(Decimal) + '</td>' +
           
            //'<td align="right">' + parseFloat(result[i].OtherFees || 0).toFixed(Decimal) + '</td>' +
            '<td>' + result[i].Status + '</td>' +
            '<td align="right">' + parseFloat(result[i].ConsultFees || 0).toFixed(Decimal) + '</td>' +
            '</tr>';
    }
    $('#tbl_PreRevisit').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th>Date</th>" +
        "<th>Consultant</th>" +
        "<th>User </th>" +
        //"<th> </th>" +
        //"<th> </th>" +
        "<th></th>" +
        "</tr></tfoot>");
    datatableWithsearch('tbl_PreRevisit');
    $("#popupdiv").hide();
}
function ngOnDestroy() {
    $("#myModal").modal("hide");
    $("body>#EditModal").remove();
}

function ClearPatData() {
    $('.detextnull').text('');
    $('#PatName').val('');
    $('#PatientId').val(0);
    $('#myImg').attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
}

function GetPatientData(result, Flag) {

    if (result.length > 0) {

        var age = AgeCalculation(result[0].DOB);

        var CurrentAge = '';
        if (age.years < 10){
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

        $("#PatientId").val(result[0].PatientId);
        $("#RegNumber").val(result[0].OPNumber);
        $("#PatName").val(result[0].PatientName);
        $("#PatAge").text(CurrentAge);
        $("#PatGender").text(result[0].Gender);
        $("#PatDOB").text(result[0].DOB);
        $("#PatBloodGrp").text(result[0].BloodGroup);
        $("#PatOccuPation").text(result[0].Occupation);
        $("#PatLastVisit").text(result[0].LastVisit);
        $("#PatDOR").text(result[0].RegDate);
        $("#PatHealthCard").text(result[0].HealthCard);
        $("#PatAadhar").text(result[0].AadharNo);
        $("#PatAdd1").text(result[0].Add1);
        $("#PatAdd2").text(result[0].Add2);
        $("#PatAdd3").text(result[0].Add3);
        $("#PatNumber").text(result[0].Contact);
        
        $("#RegSeries").val(result[0].OPSerName);
        $("#RegSeriesId").val(result[0].OPSerId);
        if (Flag == 1) {//insert mode
            var exists = false;
            $('#DocName option').each(function () {
                if (this.value == result[0].DoctorId) {
                    exists = true;
                    $('#DocName').val(result[0].DoctorId);
                    TokenNumberLoad();
                    ChangeFee();
                    return false;
                }
            });
        }

        var Ext = (result[0].Status).split('.').pop();
        CheckImgValid('myImg', result[0].PatientId, Ext);
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

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'TokenZero') {
        OKSaveandUpdateRevisit(rowid);
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveandUpdateRevisit(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateRevisit(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateRevisit(0);
    }
    $('#confirm').fadeOut();

}


function ShowPrintAlerts(Status, RevisitId, TokenNumber) {
    if (Status == 1) {
        window.setTimeout(function () {
            swal({
                title: 'Visit ID: ' + RevisitId + ', Token: ' + TokenNumber + ' Saved Successfully',
                //text: "Saved Successfully",
                text: "Do you want to Print?",
                icon: 'success',
                buttons: {
                    cancel: "Cancel",
                    defeat: "Print",
                    //Other: "Go to Bill",
                },
            })
                .then((value) => {
                    switch (value) {

                        case "defeat":
                            PrintRevisttype();
                            window.setTimeout(function () { formrefresh(); }, 300);
                            break;

                        case "Other":
                            window.open('../Revisit/ProcedureBill?flag=reg', '_blank');
                            formrefresh();
                            break;

                        default:
                            formrefresh();
                            break;
                    }
                });
        }, 200);
    }
    else if (Status == 2) {
        window.setTimeout(function () {
            swal({
                title: 'Visit ID: ' + RevisitId + ', Token: ' + TokenNumber + ' Updated Successfully',
                text: "Do you want to Print?",
                icon: 'success',
                buttons: {
                    cancel: "Cancel",
                    defeat: "Print",
                },
            })
                .then((value) => {
                    switch (value) {

                        case "defeat":
                            PrintRevisttype();
                            window.setTimeout(function () { formrefresh(); }, 300);
                            break;

                        default:
                            formrefresh();
                            break;
                    }
                });
        }, 200);
    }

    if (BillFlag == 1) {
        window.open('../Revisit/ProcedureBill?flag=reg', '_blank');
        BillFlag = 0;
        $('.swal-button--cancel').click();
    }

}


function PrintRevisttype() {
    if (TOKENPRINTSTSTUS == 0) {
        TokenPrint();
    }
    else {
        PrintRevist();
    }
}

function PrintRevist() {
    var Rowlen = 0; var Rowcount = 10; var TotalAmount = 0;

    var TotalAmount = parseFloat($("#VisitingFees").val() || 0) + parseFloat($("#ConsultationFees").val() || 0) + parseFloat($("#OtherFees").val() || 0)

    var AmountinWords = convertNumberToWords(TotalAmount);
    var myWindow = window.open("", "", "width=1500,height=1500");

   
    var Age = $('#PatAge').text() + '/' + $('#PatGender').text();
    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);

    $(ComapnydivToPrintLab).css('height', 80); $(ComapnydivToPrintLab).css('width', 300);
    myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
    myWindow.document.write('</table>');

    var TypeText = '';


    myWindow.document.write('<table width=100% ><tr ><td width=10% align=left >OP#&#160;&#160; :</td><td colspan=4 align=left width=60%>' + $('#RegNumber').val() + '</td><td align=right width=10%>Date &#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspn=2 width=20% >' + $('#RevisitDate').val() + '-' + $('#RevisitTime').text()  + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Patient:</td><td colspan=4 align=left width=60%>' + $('#PatName').val() + '</td><td align=right width=10%>Age/Sex : </td><td colspn=2 width=20% >' + Age + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Doctor:</td><td colspan=4 align=left width=60%>' + $('#DocName :selected').text() + '</td>' + TypeText + '</tr>');
    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    myWindow.document.write('</table>');

    var HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center style="width:5%">Sl#</td><td align=center width=75%>Description</td><td align=right style="width:20%">Amount</td></tr>';


    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey">' + HeaderRow);

    if (parseFloat($("#VisitingFees").val() || 0) > 0) {
        Rowlen++
        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Visiting Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#VisitingFees").val() || 0).toFixed(Decimal)) + '</td></tr>');
    }
    if (parseFloat($("#ConsultationFees").val() || 0) > 0) {
        Rowlen++
        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Consultation Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#ConsultationFees").val() || 0).toFixed(Decimal)) + '</td></tr>');
    }
    if (parseFloat($("#OtherFees").val() || 0) > 0) {
        Rowlen++
        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Rowlen + '</td><td style="padding-left:5px">Other Fees</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas(parseFloat($("#OtherFees").val() || 0).toFixed(Decimal)) + '</td></tr>');
    }

    var RoughRow = '<tr class=brtd2><td style="border-left:1px solid grey;" align=center>&#160;</td><td style="padding-left:5px"></td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>';



    for (var i = 1; i < Rowcount - Rowlen; i++) {
        myWindow.document.write(RoughRow);
    }


    myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=2 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + ' Only' + '</td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat(TotalAmount).toFixed(Decimal)) + '</b></td></tr>');
    myWindow.document.write('</table>');

    myWindow.document.write('<table><tr style="border:none"><td height=15px colspan=8></td></tr></table>');

    //myWindow.document.write('<table width=100%>');
    //myWindow.document.write('<tr><td>' + window.CompanySettingsArray.CompanyName + '</td><td rowspan="5" align=right style="vertical-align: bottom;">Cashier</td></tr>');
    //myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Address + '</td></tr>');
    //myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Fax + '</td></tr>');
    //myWindow.document.write('<tr><td>' + window.CompanySettingsArray.Email + '</td></tr>');
    //myWindow.document.write('<tr><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');



    //myWindow.document.write('</table>');

    myWindow.print();

}

//Show Window Alert Insert,update delete  Modify
function Showalerts(Status, RevisitId,TokenNumber) {
    if (Status == 1) {
        formrefresh();
        swal('Visit ID: ' + RevisitId + ', Token: ' + TokenNumber + '', "Saved Successfully", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        formrefresh();
        swal('Visit ID: ' + RevisitId + ', Token: ' + TokenNumber + '', "Updated Successfully", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        formrefresh();
        swal('Visit ID: ' + RevisitId + '', "Deleted", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 4) {

        swal('Previous IP of this Patient is not Discharged', "IP# : " + RevisitId, "warning");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "*Change Token Number*", "warning");
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
        $('#Warningpopup').hide();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}

function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

        table = $('#' + tablename).DataTable({
            // dom: 'Bfrtip',
            dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",            
            buttons: []

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
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'EUMI ERP',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'EUMI ERP',
                        exportOptions: { columns: ":visible" }
                    }
                ]
            },
            'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

    } else if(tablename=='tbl_Revisit'){
        table = $('#' + tablename).DataTable({
            "columnDefs": [
                                    { "width": "1%", "targets": 0 },
                                    { "width": "2%", "targets": 1 },
                                    { "width": "2%", "targets": 2 },
                                    { "width": "2%", "targets": 3 },
                                    { "width": "10%", "targets": 4 },
                                    { "width": "1%", "targets": 5 },
                                    { "width": "2%", "targets": 6 },
                                    { "width": "4%", "targets": 7 },
                                    { "width": "5%", "targets": 8 },
                                    { "width": "10%", "targets": 9 },
                                    { "width": "2%", "targets": 10 },
                                    { "width": "2%", "targets": 11 },
                                    { "width": "2%", "targets": 12 },
            ],
        });
    }
    else if (tablename == 'tbl_PreRevisit') {
        table = $('#' + tablename).DataTable({
            "columnDefs": [
                                    
                                    { "width": "10%", "targets": 2 },
                                    { "width": "60%", "targets": 3 },
                                    
            ],
        });
    }
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







