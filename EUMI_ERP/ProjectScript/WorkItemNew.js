var DivArray = [];
$(document).keydown(function (e) {
    $('#Warningpopup').fadeOut();


    if (e.keyCode == 27) {                         //ESC       :   Popup Close
        $('#TimeDiv').hide();
        CloseAssign();
    }


})
$(document).ready(function () {

    DivArray = localStorage.getItem('tttt');
    $('#DueDate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear()+1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $('#DueDateFU').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });
    $("#Department").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Division').focus();
        }

    });
    $("#Division").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#User').focus();
        }

    });
    $("#User").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($("#Division").val() == 0)
                $('#Customer').focus();
            else
            $('#Title').focus();
        }

    });
    $("#Title,#Customer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Description').focus();
        }

    });
    $("#Description").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#RefType').focus();
        }

    });
    $("#RefType").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#RefId').focus();
        }

    });
    $("#RefId").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($("#Division").val() == 0)
                $('#DueDate').focus();
            else                
                $('#Time').focus();
        }

    });
    $("#Time,#DueDate").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Status').focus();
        }

    });
    $("#StoreKeeper").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Driver').focus();
        }

    });
    $("#Status,#Driver").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#NewRemarks').focus();
        }

    });
    $("#NewRemarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnassign').focus();
        }

    });
    $("#rsntransfer").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#transuser').focus();
        }

    });
    $("#transuser").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btntras').focus();
        }

    });
    $("#Remarks").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncnclsave').focus();
        }

    });
    $("#Division2").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#NewTime').focus();
        }

    });
    $("#NewTime").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#NewTimeHr').focus();
        }

    });
    $("#NewTimeHr").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#NewTimeMin').focus();
        }

    });
    $("#NewTimeMin").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btntimesave').focus();
        }

    });
});

function Defaultfocus() {
    $('#Department').focus();
}
function SaveAndUpdateFU() {
    var Followup = 0;
    if ($('#DivisionFU').val() == 0) {
        $('#Title').val($('#CustomerFU').val());
        Followup = 1;
    }


    if ($('#DepartmentFU').val() == "") {
        warningshow('Please Select Department', 'DepartmentFU');
    }
    else if ($('#DivisionFU').val() == "") {
        warningshow('Please Select Division', 'DivisionFU');
    }
    else if ($('#UserFU').val() != "" && $('#UserIdFU').val() == 0) {
        warningshow('Please Enter Valid User', 'UserFU');
    }
    
    else if (parseInt($('#CustIdFU').val() || 0) == 0 && Followup == 1) {
        warningshow('Please Enter Title', 'CustomerFU');
    }
    else if ($.trim($('#DescriptionFU').val()) == '') {
        warningshow('Please Enter Description', 'DescriptionFU');
    }
    else if ($.trim($('#RefTypeFU').val()) == '') {
        warningshow('Please Enter Reference Type', 'RefTypeFU');
    }
    else if ($.trim($('#RefIdFU').val()) == '') {
        warningshow('Please Enter Reference Id', 'RefIdFU');
    }
   
    else if ($('#StatusFU').val() == "") {
        warningshow('Please Select Status', 'StatusDU');
    }
    
    else {
        $("#btnassignFU").prop("disabled", true);
        var data = {};
        data.WorkItemId = $('#WorkItemId').val();
        data.DepartmentId = $('#DepartmentFU').val();
        data.DivisionId = $('#DivisionFU').val();
        data.AssignedTo = $('#UserIdFU').val();
        data.Title = $('#Title').val();
        data.Description = $('#DescriptionFU').val();
        data.RefType = $('#RefTypeFU').val();
        data.RefId = $('#RefIdFU').val();
        data.TurnAroundTimes = $('#Time').val();
        data.WorkStatus = $('#StatusFU').val();
        data.UserId = ERPUserId;
        data.Flag = 1;
        data.Remarks = $('#Remarksdisplay').val();
        data.NewWorkRemarks = $('#NewRemarksFU').val();
        data.BillSlNo = $('#BillSerId').val();
        data.BillNo = $('#BillNo').val();
        data.Driver = $('#DriverId').val();
        data.IPUserId = $('#IPUserId').val();
        data.Reference = $('#ReferenceNo').val();
        data.StoreKeeperId = $('#StoreKeeperId').val();
        data.CustId = $('#CustIdFU').val();
        data.DueDate = $('#DueDateFU').val();
        data.Followup = Followup
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/WorkItemInsertandUpdate",
            data: data,
            success: function (result) {

                var status = result.cList[0].Status;
                Showalerts(status);
                $('#popupdivFollowup').hide();
                $("#btnassignFU").prop("disabled", false);


            }
        });
    }
}


function SaveAndUpdate() {
    var Followup = 0;
    if ($('#Division').val() == 0)
    {
        $('#Title').val($('#Customer').val());
        Followup = 1;
    }
    if ($('#DivisionFU').val() == 0) {
        $('#Title').val($('#Customer').val());
        Followup = 1;
    }
    

    if ($('#Department').val() == "") {
        warningshow('Please Select Department', 'Department');
    }
    else if ($('#Division').val() == "") {
        warningshow('Please Select Division', 'Division');
    }
    else if ($('#User').val() != "" && $('#UserId').val() == 0) {
        warningshow('Please Enter Valid User', 'User');
    }
    else if ($.trim($('#Title').val()) == '' && Followup==0) {
        warningshow('Please Enter Title', 'Title');
    }
    else if (parseInt($('#CustId').val()||0) == 0 && Followup == 1) {
        warningshow('Please Enter Title', 'Customer');
    }
    else if ($.trim($('#Description').val()) == '') {
        warningshow('Please Enter Description', 'Description');
    }
    else if ($.trim($('#RefType').val()) == '') {
        warningshow('Please Enter Reference Type', 'RefType');
    }
    else if ($.trim($('#RefId').val()) == '') {
        warningshow('Please Enter Reference Id', 'RefId');
    }
    else if ($('#Time').val() == "" && Followup == 0) {
        warningshow('Please Select Turn Around Time', 'Time');
    }
    else if ($('#Status').val() == "") {
        warningshow('Please Select Status', 'Status');
    }
    else if ($.trim($('#Remarksdisplay').val()) == '' && $('#Status').val() == 'On Hold') {
        warningshow('Please Enter Reason For Hold', 'Remarksdisplay');
    }
    else {
        $("#btnassign").prop("disabled", true);
        var data = {};
        data.WorkItemId = $('#WorkItemId').val();
        data.DepartmentId = $('#Department').val();
        data.DivisionId = $('#Division').val();
        data.AssignedTo = $('#UserId').val();
        data.Title = $('#Title').val();
        data.Description = $('#Description').val();
        data.RefType = $('#RefType').val();
        data.RefId = $('#RefId').val();
        data.TurnAroundTimes = $('#Time').val();
        data.WorkStatus = $('#Status').val();
        data.UserId = ERPUserId;
        data.Flag = 1;
        data.Remarks = $('#Remarksdisplay').val();
        data.NewWorkRemarks = $('#NewRemarks').val();
        data.BillSlNo = $('#BillSerId').val();
        data.BillNo = $('#BillNo').val();
        data.Driver = $('#DriverId').val();
        data.IPUserId = $('#IPUserId').val();
        data.Reference = $('#ReferenceNo').val();
        data.StoreKeeperId = $('#StoreKeeperId').val();
        data.CustId = $('#CustId').val();
        data.DueDate = $('#DueDate').val();
        data.Followup = Followup
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/WorkItemInsertandUpdate",
            data: data,
            success: function (result) {

                var status = result.cList[0].Status;
                Showalerts(status);
                $('#popupdiv').hide();
                $("#btnassign").prop("disabled", false);


            }
        });
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

function GetItem(WorkItemId) {

    var data = {};
    data.WorkItemId = WorkItemId;
    $.ajax({
        type: "POST",
        url: "../WorkItemUser/WorkItemGetandGets",
        data: data,
        success: function (result) {
            GetworkItem(result);

        }
    });


}

function GetworkItem(result) {
    $("#Time").empty();
    var CurrentDiv = DivArray.indexOf(result[0].DivisionId);
    for (var i = 0; i < result.length; i++) {

        if (result[i].Flag >= 60) {
            Min = parseInt(result[i].Flag);
            realmin = Min % 60;
            Hr = Math.floor(Min / 60);
            $("#Time").append("<option value='" + result[i].Flag + "'>" + result[i].TurnAroundTimesName + " - " + Hr + " HR(s) " + realmin + " Min(s)</option>");
        }
        else {
            Hr = 0;
            realmin = parseInt(result[i].Flag)
            $("#Time").append("<option value='" + result[i].Flag + "'>" + result[i].TurnAroundTimesName + " - " + Hr + " HR(s) " + realmin + " Min(s)</option>");
        }
        if (result[0].AssignedBy != ERPUserId) {
            $('.disa').prop("disabled", true);
            $('#btnassign').prop("disabled", true);
        }
        else {
            $('#btncancel').show();
            $('#btntransfer').show();
            $('#Department').prop("disabled", true);
            $('#Division').prop("disabled", true);
        }
        if (result[0].AssignedTo == ERPUserId) {
            $('#Status,#NewRemarks').prop("disabled", false);
            $('#btnassign').prop("disabled", false);
            $('#btncancel').show();
            $('#btntransfer').show();
        }
        if (result[0].DepartmentId == ERPDeptId && result[0].AssignedTo == 0 && CurrentDiv != -1) {
            $('#btnassignme').show();
        }
        if (result[0].WorkStatus == 'Canceled' || result[0].WorkStatus == 'Completed' || result[0].WorkStatus == 'Reassign') {
            $('.disa').prop("disabled", true);
            $('#btnassign').hide();
            $('#btncancel').hide();
            $('#btntransfer').hide();
            $('#btnassignme').hide();
            $('#panel1').show();
        }
        if (result[0].WorkStatus == 'Completed') {
            $('#panel1').hide();
            $('#panel3').hide();
            $('#panel2').show();
            $("#CNWR").show();
        }
        else if (result[0].WorkStatus == 'On Hold') {
            $('#panel1').show();
        }
        else if (result[0].WorkStatus == 'On The Way') {
            $('#panel2').show();
        }
        else if (result[0].WorkStatus == 'In Progress') {
            $('#panel3').show();
        }
        $('#Division').val(result[i].DivisionId);
        // WorkTaskTime();
        $('#Department').val(result[i].DepartmentId);
        $('#WorkItemId').val(result[i].WorkItemId);
        $('#UserId').val(result[i].AssignedTo);
        $('#User').val(result[i].AssignedToUser);
        $('#Title,#Customer').val(result[i].Title);
        $('#Description').val(result[i].Description);
        $('#RefId').val(result[i].RefId);
        $('#RefType').val(result[i].RefType);
        $('#Status').val(result[i].WorkStatus);
        $('#Remarksdisplay').val(result[i].Remarks);
        $('#NewRemarks').val(result[i].NewWorkRemarks);
        $('#BillSerId').val(result[i].BillSlNo);
        $('#BillNo').val(result[i].BillNo);
        $('#DriverId').val(result[i].Driver);
        $('#IPUserId').val(result[i].IPUserId);
        $('#ReferenceNo').val(result[i].Reference);
        $('#Driver').val(result[i].DriverName);
        $('#IPUser').val(result[i].IPUser);
        $('#StoreKeeper').val(result[i].StoreKeeper);
        $('#StoreKeeperId').val(parseInt(result[i].StoreKeeperId||0));
        $('#reasondisplay').text('Reason For ' + result[i].WorkStatus + ':');
        $('#Department').focus();
        $('#Time').val(result[i].TurnAroundTimes);

        $('#CustId').val(result[i].CustId);
        $('#DueDate').val(result[i].DueDate);

        $('#btnassign').html('Save');

    }
    OpenFollowup()
    $('#popupdiv').show();
}


function CancelWork() {

    if ($('#WorkItemId').val() == 0) {
        warningshow('Work Item Not Selected');
    }
    else if ($.trim($('#Remarks').val()) == '') {
        warningshow('Enter the Reason for Cancel', 'Remarks');
    }
    else {
        $('#btncnclsave').prop("disabled", true);
        var data = {};
        data.WorkItemId = $('#WorkItemId').val();
        data.Remarks = $('#Remarks').val();
        data.UserId = ERPUserId;
        data.Flag = 0;
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/WorkItemInsertandUpdate",
            data: data,
            success: function (result) {

                    var status = result.cList[0].Status;
                    Showalerts(status);
                    $('#popupdiv').hide();
                    $('#btncnclsave').prop("disabled", true);
                

            }
        });
    }

}


function Reassign() {
    if ($('#WorkItemId').val() == 0) {
        warningshow('Work Item Not Selected');
    }
    else if ($.trim($('#rsntransfer').val()) == '') {
        warningshow('Enter the Reason for Transfer', 'rsntransfer');
    }
    else if ($('#transuser').val() != '' && $('#transuserId').val() == 0) {
        warningshow('Enter Valid User', 'transuser');
    }
    else {
        $('#btntras').prop("disabled", true);
        var data = {};
        data.WorkItemId = $('#WorkItemId').val();
        data.Remarks = $('#rsntransfer').val();
        data.UserId = ERPUserId;
        data.AssignedTo = $('#transuserId').val();
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/WorkItemTransfer",
            data: data,
            success: function (result) {

                    var status = result.oList[0].Status;
                    Showalerts(status);
                    $('#popupdiv').hide();
                    $('#btntras').prop("disabled", false);
                

            }
        });
    }

}




function formrefresh(Flag) {
    $('#defaulttable').show();
    $('#DateFrom').val(CurDate);
    $('#DateTo').val(CurDate);
    $('#chkstatus').val('All');
   
    var FromDate = $("#DateFrom").val();
    var DateTo = $("#DateTo").val();
    var chkstatus = $("#chkstatus").val();
    
    $('.form-control').val('');

    $("#DateFrom").val(FromDate);
    $("#DateTo").val(DateTo);
    $("#chkstatus").val(chkstatus);

    $('#Status').val('Not Started');
    $('#UserId,#CustId').val(0);
    $('#WorkItemId').val(0);
    $('.disa').prop("disabled", false);
    $('#btnassign,#btncnclsave,#btntras,#CNWR,#btncancel,#btntransfer,#btnassignme,#btnclose').prop("disabled", false);
    $('#btnassign').show();
    $('#btnassignme').hide();
    $('#btncancel').hide();
    $('#btntransfer').hide();
    $('#ReasonDiv').hide();
    $('#TransferDiv').hide();
    $('#panel1').hide();
    $('#panel3').hide();
    $('#Status').val('Created');
    $('#btnassign').html('Create');
    $("#BillSerId").val(0);
    $("#BillNo,#DriverId,#IPUserId,#ReferenceNo,#StoreKeeperId").val(0);
    $("#Driver,#StoreKeeper").val('');
    $("#IPUser").val('');
    $("select[name*='listitems_length']").val(10);
    $("#CNWR").hide();
    GetDepartment();
    GetDivision();
    $('#DivisionFU').val('0');
    if (Flag != 1) {

        disable_datatable('listitems');
        $('#listitems tbody tr').remove();
        GetList(0);
        WorkItemNotifyVar = 0;
        $("#Type").val(0);
        Defaultfocus();
    }
}

function checkuser() {
    var a = ($('#User').val()).length;
    if ($('#UserLength').val() != a) {
        $('#UserId').val(0);
    }

    var b = ($('#UserFU').val()).length;
    if ($('#UserLengthFU').val() != b) {
        $('#UserIdFU').val(0);
    }
}

function checktransuser() {
    var a = ($('#transuser').val()).length;
    if ($('#transuserLength').val() != a) {
        $('#transuserId').val(0);
    }

}

function CloseAssign() {
    $('#popupdiv').hide();
    formrefresh(1);
}
function CreateNew() {
    $("#DueDate").val(CurDate);
    $('#popupdiv').show();
    $('#Department').focus();
    $('#panel1,#panel2,#panel3').hide()
}

function SaveandUpdateDivision(Flag) {
    if ($('#Division1').val() != 0 && $.trim($('#NewDivName').val()) == '' && Flag == 1) {
        warningshow('Please Enter Division Name', 'NewDivName');
    }
    else {
        var data = {};
        data.DivisionId = $('#Division1').val();
        data.DivisionName = $('#NewDivName').val();
        data.Status = Flag;
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/DivisionInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }

            }
        });
    }
}

function SaveNewTime() {
    if ($('#Division2').val() == 0) {
        warningshow('Please Enter Division Name', 'Division2');
    }
    else if ($.trim($('#NewTime').val()) == '') {
        warningshow('Please Enter Time Name', 'NewTime');
    }
    else if ($.trim($('#NewTimeHr').val()) == '') {
        warningshow('Please Enter Hour(s)', 'NewTimeHr');
    }
    else if ($('#NewTimeMin').val() == "") {
        warningshow('Please Select Min(s)', 'NewTimeMin');
    }
    else {
        var Hour = parseInt($('#NewTimeHr').val() || 0);
        var Min = parseInt($('#NewTimeMin').val())
        var NewMin = Hour * 60;
        NewMin = parseInt(NewMin + Min);

        var data = {};
        data.DivisionId = $('#Division2').val();
        data.TurnAroundTimesName = $('#NewTime').val();
        data.TurnAroundTimes = NewMin;
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/DivisionTimeInsertandUpdate",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;
                Showalerts(status);


            }
        });
    }
}

function AssignMe() {
    $('#UserId').val(ERPUserId);
    $('#User').val(window.LoggedInUserArray[3]);
    $('#btnassignme').hide();
    $('#btnassign').prop("disabled", false);
    $('#Status').prop("disabled", false);
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

function checkhold(Flag) {

    if ($('#Status').val() == 'On Hold') {
        //$('#panel1').show();
        $('#panel1').delay(100).slideDown(400);
        $('#reasondisplay').text('Reason For Hold:');
        if (Flag == 0) {
            $('#Remarksdisplay').prop("disabled", false);
        }
        $('#Remarksdisplay').focus();
        if ($("#DriverId").val() == 0) {
            $('#panel2').delay(100).slideUp(400);
        }
        if ($("#IPUserId").val() == 0) {
            $('#panel3').delay(100).slideUp(400);
        }
    }
    else if ($('#Status').val() == 'On The Way' && $('#Division').val() != 0) {
        $('#panel1').delay(100).slideUp(400);
        $('#panel3').delay(100).slideUp(400);
        $('#panel2').delay(100).slideDown(400);
        if (Flag == 0) {
            $("#Driver").prop("disabled", false);
        }
    }
    else if ($('#Status').val() == 'In Progress' && $('#Division').val() != 0) {
        $('#panel1').delay(100).slideUp(400);
        $('#panel2').delay(100).slideUp(400);
        $('#panel3').delay(100).slideDown(400);
        if (Flag == 0) {
            $("#IPUser").prop("disabled", false);
        }
    }

    else {
        //$('#panel1').hide();
        $('#panel1').delay(100).slideUp(400);
        if ($("#DriverId").val() == 0) {
            $('#panel2').delay(100).slideUp(400);
        }
        if ($("#IPUserId").val() == 0) {
            $('#panel3').delay(100).slideUp(400);
        }
    }
}

function GetSalesInvoceWorkItem(seriesid, serialno, deptid, salesbillno, desc) {
    $('#Department').val(deptid);
    $('#Title').val('Sales Invoice : ' + salesbillno);
    $('#RefType').val('INVOICE');
    $('#RefId').val(serialno);

    $("#BillSerId").val(seriesid);
    $("#BillNo").val(serialno);
    $("#Description").val(salesbillno+desc);

}

function GetDepartment() {
    var data = {};
    data.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data,
        success: function (result) {
            DepartmentLoad(result.oList);


        }
    });
}


function GetDivision() {

    var data1 = {};
    $.ajax({
        type: "POST",
        url: "../WorkItemUser/WorkDivisionGetandGets",
        data: data1,
        success: function (result) {
            DivisionLoad(result.oList);
           
        }
    });
}

function DepartmentLoad(result) {
    $("#Department,#DepartmentFU").empty();
    for (var i = 0; i < result.length; i++) {
        $("#Department,#DepartmentFU").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
    }
    $('#Department,#DepartmentFU').val(ERPDeptId);
}

function DivisionLoad(result) {
    $("#Division,#Division1,#Division2").empty();

    
    $("#Division1,#Division2").append("<option value='0'>--Select Division--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#Division,#Division1,#Division2").append("<option value='" + result[i].DivisionId + "'>" + result[i].DivisionName + "</option>");
    }
    $("#Division").append("<option value='0'>FOLLOW-UP</option>");
    WorkTaskTime();
}


function WorkTaskTime() {
    var data = {};
    data.DivisionId = $('#Division').val();
    $.ajax({
        type: "POST",
        url: "../WorkItemUser/WorkingTaskTimeGetandGets",
        data: data,
        success: function (result) {
            WorkTimeGets(result.bList);


        }
    });
        OpenFollowup()
    
}

function OpenFollowup() {
    if ($('#Division').val() == 0) {
        $(".followuphide").hide();
        $(".followupshow").show();
    }
    else {
        //$(".followuphide").show();
        $(".followupshow").hide();
        $(".followuphidedef").show();
        checkhold(1);
    }
}

function WorkTimeGets(result) {
    $("#Time").empty();
    for (var i = 0; i < result.length; i++) {
        var Hr = 0; var Min = 0; var realmin = 0;

        if (result[i].TurnAroundTimes >= 60) {
            Min = parseInt(result[i].TurnAroundTimes);
            realmin = Min % 60;
            Hr = Math.floor(Min / 60);
            $("#Time").append("<option value='" + result[i].TurnAroundTimes + "'>" + result[i].TurnAroundTimesName + " - " + Hr + " HR(s) " + realmin + " Min(s)</option>");
        }
        else {
            Hr = 0;
            realmin = parseInt(result[i].TurnAroundTimes)
            $("#Time").append("<option value='" + result[i].TurnAroundTimes + "'>" + result[i].TurnAroundTimesName + " - " + Hr + " HR(s) " + realmin + " Min(s)</option>");
        }

    }
}




function GetList(FlagParam) {
    WorkItemNotifyVar = 0;
    if (FlagParam == 0) {
        if (usermenu1.indexOf("M225") != -1) {
            Flag = 0;               //ALL WORK ITEM VIEW RIGHT
        }
        else {
            Flag = 4;               //NOT ALL WORK ITEM VIEW RIGHT
        }
    }
    else if (FlagParam == 2) {
        if (usermenu1.indexOf("M225") != -1) {
            Flag = 2;
        }
        else {
            Flag = 5;
        }
    }
    else if (FlagParam == 6) {
        if ($('#chkstatus').val() == 'All' && usermenu1.indexOf("M225") != -1) {
            Flag = 6;           //ALL WORK ITEM VIEW RIGHT AND ALL STATUS
        }
        else if($('#chkstatus').val() == 'All')
        {
            Flag = 7;           //NOT ALL WORK ITEM VIEW RIGHT AND ALL STATUS
        }
        else if (usermenu1.indexOf("M225") != -1) {
            Flag = 8;           //ALL WORK ITEM VIEW RIGHT AND  STATUS
        }
        else {
            Flag = 9;           //NOT ALL WORK ITEM VIEW RIGHT AND STATUS
        }
    }
    else {
        Flag = FlagParam;
    }

    $('#Loading').show();
    var data = {};
    data.Type = Flag;
    data.UserId = ERPUserId;
    data.DepartmentId = ERPDeptId;
    data.FromDate = $('#DateFrom').val();
    data.ToDate = $('#DateTo').val();
    data.Variable1 = $('#chkstatus').val();
    data.Variable2 = '';

    $.ajax({
        type: "POST",
        url: "../WorkItemUser/WorkItemGetList",
        data: data,
        success: function (result) {
            WorkItemNotifyVar = 0;
            ListWorkItems(result);
        }
    });

}

function ListWorkItems(result) {

    disable_datatableWI('listitems', 'buttonPlace');
    var responseText = "<thead><tr>" +
        "<th>Edit</th>" +
        "<th>Sl#</th>" +
        "<th>Category</th>" +
        "<th>Description</th>" +
        "<th>Date/Time</th>" +
        "<th>Assigned By</th>" +
        "<th>Assigned To</th>" +
        "<th>Driver</th>" +
        "<th>Status</th>" +
        "<th>StoreKeeper</th>" +
        "<th>Location</th>" +
        "<th>Division</th>" +      
        "<th>Reason</th>" +
        "<th>Remarks</th>" +
        "<th>UpdatedOn</th>" + 
        "</tr></thead><tbody>";

    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);


        if (result[i].Status == 'Completed') var rowclass = 'badge-success';
        else if (result[i].Status == 'In Progress') var rowclass = 'badge-info';
        else if (result[i].Status == 'Canceled') var rowclass = 'badge-dark';
        else if (result[i].Status == 'Created') var rowclass = 'badge-light';
        else if (result[i].Status == 'Started') var rowclass = 'badge-secondary';
        else if (result[i].Status == 'On Hold') var rowclass = 'badge-danger';
        else if (result[i].Status == 'Reassign') var rowclass = 'badge-warning';
        else if (result[i].Status == 'Ready To Deliver') var rowclass = 'badge-pink white';
        else if (result[i].Status == 'On The Way') var rowclass = 'badge-primary';
        else if (result[i].Status == 'Delivered With Pending') var rowclass = 'badge-light-blue white';

        if (result[i].ExceededTime <= 0 && result[i].Status != 'Completed' && result[i].Status != 'Canceled' && result[i].Status != 'Reassign') {

            responseText += '<tr ondblclick=GetSalesCopy(' + "'" + result[i].BillSlNo + "'" + ',' + "'" + result[i].BillNo + "'" + ',' + "'" + result[i].BillDeptId + "'" + ')  class="white" style="background-color:' + WorkItemColour + '">' +
                '<td><a  onclick="GetItem(' + result[i].WorkItemId + ');">' + Editbutton + '</a></td>' +
                '<td>' + slno + '</td>' +
                '<td>' + result[i].Title + '</td>' +
                '<td>' + result[i].Description + '</td>' +
                '<td>' + result[i].AssignedOnDate + '</td>' +
                '<td>' + result[i].AssignedByUser + '</td>' +
                '<td>' + result[i].AssignedToUser + '</td>' +
                '<td>' + result[i].DriverName + '</td>' +
                '<td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '">' + result[i].Status + '</span></div></td>' +
                '<td>' + result[i].StoreKeeper + '</td>' +
                '<td>' + result[i].DepartmentName + '</td>' +
                '<td>' + result[i].DivisionName + '</td>' +
                '<td>' + result[i].Remarks + '</td>' +
                '<td>' + result[i].NewWorkRemarks + '</td>' +
                '<td>' + result[i].UpdatedOn + '</td>' +
                '</tr>';

        }
        else {
            responseText += '<tr ondblclick=GetSalesCopy(' + "'" + result[i].BillSlNo + "'" + ',' + "'" + result[i].BillNo + "'" + ',' + "'" + result[i].BillDeptId + "'" + ')>' +
                '<td><a  onclick="GetItem(' + result[i].WorkItemId + ');">' + Editbutton + '</a></td>' +
                '<td>' + slno + '</td>' +
                '<td>' + result[i].Title + '</td>' +
                '<td>' + result[i].Description + '</td>' +
                '<td>' + result[i].AssignedOnDate + '</td>' +
                '<td>' + result[i].AssignedByUser + '</td>' +
                '<td>' + result[i].AssignedToUser + '</td>' +
                '<td>' + result[i].DriverName + '</td>' +
                '<td><div class="text-center" style="width:100%"><span style="width:100%" class="badge ' + rowclass + '">' + result[i].Status + '</span></div></td>' +
                '<td>' + result[i].StoreKeeper + '</td>' +
                '<td>' + result[i].DepartmentName + '</td>' +
                '<td>' + result[i].DivisionName + '</td>' +
                '<td>' + result[i].Remarks + '</td>' +
                '<td>' + result[i].NewWorkRemarks + '</td>' +
                '<td>' + result[i].UpdatedOn + '</td>' +
                '</tr>';
        }
    }
    $('#listitems').html(responseText + '</tbody><tfoot><tr>' +
        '<th> </th>' +
        '<th> </th>' +
        '<th>Category</th>' +
        '<th>Description</th>' +
        '<th>Date/Time</th>' +
        '<th>Assigned By</th>' +
        '<th>Assigned To</th>' +
        '<th>Driver</th>'+
        '<th>Status</th>' +
        '<th>StoreKeeper</th>' +
        '<th>Location</th>' +
        '<th>Division</th>' +
        '<th>Reason</th>' +
        '<th>Remarks</th>' +
        '<th>UpdatedOn</th>' +
        '</tr></tfoot>');


    datatableWithsearchWI('listitems', true, '', 'buttonPlace');
    $('#Loading').hide();
    WorkItemNotifyVar = 0;
}



function datatableWithsearchWI(tablename, download, title, tableButtonContainerId) {

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
            "columnDefs": [
                    { "width": "2%", "targets": 0 },
                    { "width": "2%", "targets": 1 },
                    { "width": "9%", "targets": 2 },
                    { "width": "14%", "targets": 3 },
                    { "width": "8%", "targets": 4 },
                    { "width": "6%", "targets": 5 },
                    { "width": "6%", "targets": 6 },
                    { "width": "6%", "targets": 7 },
                    { "width": "6%", "targets": 8 },
                    { "width": "6%", "targets": 9 },
                    { "width": "6%", "targets": 10 },
                    { "width": "4%", "targets": 11 },
                    { "width": "8%", "targets": 12 },
                    { "width": "9%", "targets": 13 },
                    { "width": "8%", "targets": 14 },

            ],
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
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: ":visible" }
                    }
                ]
            },
            'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
    } else {
        table = $('#' + tablename).DataTable();
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




function disable_datatableWI(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}

function ReAssignAsNew() {
    $("#ReferenceNo").val($('#WorkItemId').val());
    $('#WorkItemId').val(0);
    $('.disa,#btnassign').prop("disabled", false);
    $("#btnassign").show();
    $("#btnassign").text('Create');
    $("#Status").val('Created');
    $("#NewRemarks,#Remarksdisplay").val('');
    $("#CNWR,#panel2,#panel3").hide();
}

function GetSalesCopy(Billslno, Billno, BillDeptId) {

    if (Billslno != '' && Billno != '' && BillDeptId != '') {
        //SALES INVOICE
        if (usermenu1.indexOf("M54") != -1) {
            sessionStorage.setItem("sales_srswork", Billslno);
            sessionStorage.setItem("sales_slnowork", Billno);
            sessionStorage.setItem("sales_deptidwork", BillDeptId);
            window.open("../inventory/SalesInvoice?from=WorkItem", '_blank');

        }
        else if (usermenu1.indexOf("M173") != -1) {
            sessionStorage.setItem("sales_srswork", Billslno);
            sessionStorage.setItem("sales_slnowork", Billno);
            sessionStorage.setItem("sales_deptidwork", BillDeptId);
            window.open("../SalesInvoice/SalesInvoicePress?from=WorkItem", '_blank');


        }
        else if (usermenu1.indexOf("M162") != -1) {
            sessionStorage.setItem("sales_srswork", Billslno);
            sessionStorage.setItem("sales_slnowork", Billno);
            sessionStorage.setItem("sales_deptidwork", BillDeptId);
            window.open("../SalesInvoice/SalesInvoiceMobile?from=WorkItem", '_blank');


        }
        else if (usermenu1.indexOf("M192") != -1) {
            sessionStorage.setItem("sales_srswork", Billslno);
            sessionStorage.setItem("sales_slnowork", Billno);
            sessionStorage.setItem("sales_deptidwork", BillDeptId);
            window.open("../SalesInvoice/SalesInvoiceUsedCar?from=WorkItem", '_blank');


        }
        else if (usermenu1.indexOf("M227") != -1) {
            sessionStorage.setItem("sales_srswork", Billslno);
            sessionStorage.setItem("sales_slnowork", Billno);
            sessionStorage.setItem("sales_deptidwork", BillDeptId);
            window.open("../inventory/SalesInvoiceNew?from=WorkItem", '_blank');


        }

    }
}


//CHECK FOR NEW WORK IF FOUND LOAD
var pingForNewWork = function () {

    if (WorkItemNotifyVar == 1) {
        GetList($("#Type").val());
        WorkItemNotifyVar = 0;
    }
    loopForeverWork();
};
//CALL AFTER 20 SECONDS FROM LOAD
setTimeout(function () { pingForNewWork(); }, 20000);

// LOOP FOR CONTINUES CHECKING
function loopForeverWork() {
    window.setTimeout(pingForNewWork, 1000);
};