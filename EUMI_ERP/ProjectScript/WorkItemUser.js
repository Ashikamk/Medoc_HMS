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
            $('#Title').focus();
        }

    });
    $("#Title").keydown(function (e) {
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
            $('#Time').focus();
        }

    });
    $("#Time").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#Status').focus();
        }

    });
    $("#Status").keydown(function (e) {
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



function SaveAndUpdate() {
    if ($('#Department').val() == "") {
        warningshow('Please Select Department', 'Department');
    }
    else if ($('#Division').val() == "") {
        warningshow('Please Select Division', 'Division');
    }
    else if ($('#User').val() != "" && $('#UserId').val() == 0) {
        warningshow('Please Enter Valid User', 'User');
    }
    else if ($.trim($('#Title').val()) == '') {
        warningshow('Please Enter Title', 'Title');
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
    else if ($('#Time').val() == "") {
        warningshow('Please Select Turn Around Time', 'Time');
    }
    else if ($('#Status').val() == "") {
        warningshow('Please Select Status', 'Status');
    }
    else if ($.trim($('#Remarksdisplay').val()) == '' && $('#Status').val()=='On Hold') {
        warningshow('Please Enter Reason For Hold', 'Remarksdisplay');
    }
    else {
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
        $.ajax({
            type: "POST",
            url: "../WorkItemUser/WorkItemInsertandUpdate",
            data: data,
            success: function (result) {
                for (var i = 0; i <= result.cList.length; i++) {
                    var status = result.cList[i].Status;
                    Showalerts(status);
                    $('#popupdiv').hide();
                }

            }
        });
    }
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
            $('#Status').prop("disabled", false);
            $('#btnassign').prop("disabled", false);
            $('#btncancel').show();
            $('#btntransfer').show();
        }
        if (result[0].DepartmentId == ERPDeptId && result[0].AssignedTo == 0 && CurrentDiv!=-1) {
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
        } else if (result[0].WorkStatus == 'On Hold') {
            $('#panel1').show();
        }

        $('#Division').val(result[i].DivisionId);
       // WorkTaskTime();
        $('#Department').val(result[i].DepartmentId);
        $('#WorkItemId').val(result[i].WorkItemId);
        $('#UserId').val(result[i].AssignedTo);
        $('#User').val(result[i].AssignedToUser);
        $('#Title').val(result[i].Title);
        $('#Description').val(result[i].Description);
        $('#RefId').val(result[i].RefId);
        $('#RefType').val(result[i].RefType);
        $('#Status').val(result[i].WorkStatus);       
        $('#Remarksdisplay').val(result[i].Remarks);
        $('#reasondisplay').text('Reason For ' + result[i].WorkStatus + ':');
        $('#Department').focus();
        $('#Time').val(result[i].TurnAroundTimes);
        $('#btnassign').html('Save');
        
    }
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
                for (var i = 0; i <= result.cList.length; i++) {
                    var status = result.cList[i].Status;
                    Showalerts(status);
                    $('#popupdiv').hide();
                }

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
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                    $('#popupdiv').hide();
                }

            }
        });
    }

}




function formrefresh() {
    $('#defaulttable').show();
    $('#toyoudiv,#byyoudiv,#todivdiv').hide();
    disable_datatable('listitems');
    $('#listitems tbody tr').remove();
    $('.form-control').val('');
    GetDepartment();
    GetDivision();
    GetList();
    $('#Status').val('Not Started');
    $('#UserId').val(0);
    $('#WorkItemId').val(0);
    $('.disa').prop("disabled", false);
    $('#btnassign').prop("disabled", false);
    $('#btnassign').show();
    $('#btnassignme').hide();
    $('#btncancel').hide();
    $('#btntransfer').hide();
    $('#ReasonDiv').hide();
    $('#TransferDiv').hide();
    $('#panel1').hide();
    $('#Status').val('Created');
    $('#btnassign').html('Create');
    Defaultfocus();
}

function checkuser() {
    var a = ($('#User').val()).length;
    if ($('#UserLength').val() != a) {
        $('#UserId').val(0);
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
    formrefresh();
}
function CreateNew() {
    $('#popupdiv').show();
    $('#Department').focus();
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
                for (var i = 0; i <= result.oList.length; i++) {
                    var status = result.oList[i].Status;
                    Showalerts(status);
                }

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

function checkhold() {

    if ($('#Status').val() == 'On Hold') {
        $('#panel1').show();
        $('#reasondisplay').text('Reason For Hold:');
        $('#Remarksdisplay').prop("disabled", false);
        $('#Remarksdisplay').focus();
    }
    else {
        $('#panel1').hide();
    }
}

function GetSalesInvoceWorkItem(seriesid, serialno, deptid) {
    $('#Department').val(deptid);
    $('#Title').val('Sales Invoice-' + serialno);
    $('#RefType').val('INVOICE');
    $('#RefId').val(serialno);

}

function GetSortedWorkitem(Sorttype) {
    if (Sorttype == 0) {
        $('#defaulttable').show();
        $('#popupdiv').hide();

    }
    else if (Sorttype == 1) {
        $('#defaulttable,#byyoudiv,#todivdiv').hide();
        $('#toyoudiv').show();
        disable_datatable('listitemstoyou');

        var table = $("#listitemstoyou").EumiDataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "../WorkItemUser/ListWorkItemsJsonToYou",
                "type": "POST",
                "data": function (data, settings) {
                    var addData = {}
                    addData.AssignedToyou = ERPUserId;
                    data.addData = addData;
                }
            },
            "columns": [
                { data: "slno", title: "Slno", searchable: false, sortable: false },
                { data: "Title", title: "Title" },
                { data: "AssignedOn", title: "Assigned On" },
                { data: "AssignedByUser", title: "Assigned By" },
                { data: "AssignedToUser", title: "Assigned To" },
                { data: "Dept", title: "Department" },
                { data: "Div", title: "Division" },
                { data: "Status", title: "Status" },
                { data: "Reason", title: "Remarks" },
                { data: "WorkItemId", title: "Edit", searchable: false, sortable: false }
            ],
            "createdRow": function (row, data, index) {
                row.getElementsByTagName("td")[9].innerHTML = '<a  onclick="GetItem(' + data.WorkItemId + ');">' + Editbutton + '</a>';

                if (row.getElementsByTagName("td")[7].innerHTML == 'On Hold') {
                    $(row.getElementsByTagName("td")[7]).addClass('deep orange');
                    //$(row).addClass('orange');
                    // $('td', row).css('background-color', 'Orange');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Completed') {
                    $(row.getElementsByTagName("td")[7]).addClass('green');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Canceled') {
                    $(row.getElementsByTagName("td")[7]).addClass('danger');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Created') {
                    $(row.getElementsByTagName("td")[7]).addClass('info');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Started') {
                    $(row.getElementsByTagName("td")[7]).addClass('primary');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Reassign') {
                    $(row.getElementsByTagName("td")[7]).addClass('brown');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'In Progress') {
                    $(row.getElementsByTagName("td")[7]).addClass('blue');
                }

            },
            "order": [[9, 'desc']]
        });
        $('#popupdiv').hide();
    }
    else if (Sorttype == 2) {

        $('#defaulttable,#toyoudiv,#byyoudiv').hide();
        $('#todivdiv').show();
        disable_datatable('listitemstodiv');

        var table = $("#listitemstodiv").EumiDataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "../WorkItemUser/ListWorkItemsJsonToDiv",
                "type": "POST",
                "data": function (data, settings) {
                    var addData = {}
                    addData.divByUser = ERPUserId;
                    addData.dept = ERPDeptId;
                    data.addData = addData;
                }
            },
            "columns": [
                { data: "slno", title: "Slno", searchable: false, sortable: false },
                { data: "Title", title: "Title" },
                { data: "AssignedOn", title: "Assigned On" },
                { data: "AssignedByUser", title: "Assigned By" },
                { data: "AssignedToUser", title: "Assigned To" },
                { data: "Dept", title: "Department" },
                { data: "Div", title: "Division" },
                { data: "Status", title: "Status" },
                { data: "Reason", title: "Remarks" },
                { data: "WorkItemId", title: "Edit", searchable: false, sortable: false }
            ],
            "createdRow": function (row, data, index) {
                row.getElementsByTagName("td")[9].innerHTML = '<a  onclick="GetItem(' + data.WorkItemId + ');">' + Editbutton + '</a>';

                if (row.getElementsByTagName("td")[7].innerHTML == 'On Hold') {
                    $(row.getElementsByTagName("td")[7]).addClass('deep orange');
                    //$(row).addClass('orange');
                    // $('td', row).css('background-color', 'Orange');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Completed') {
                    $(row.getElementsByTagName("td")[7]).addClass('green');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Canceled') {
                    $(row.getElementsByTagName("td")[7]).addClass('danger');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Created') {
                    $(row.getElementsByTagName("td")[7]).addClass('info');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Started') {
                    $(row.getElementsByTagName("td")[7]).addClass('primary');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Reassign') {
                    $(row.getElementsByTagName("td")[7]).addClass('brown');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'In Progress') {
                    $(row.getElementsByTagName("td")[7]).addClass('blue');
                }

            },
            "order": [[9, 'desc']]
        });
        $('#popupdiv').hide();

    }
    else if (Sorttype == 3) {

        $('#defaulttable,#toyoudiv,#todivdiv').hide();
        $('#byyoudiv').show();
        disable_datatable('listitemsbyyou');

        var table = $("#listitemsbyyou").EumiDataTable({
            "processing": true,
            "serverSide": true,
            "ajax": {
                "url": "../WorkItemUser/ListWorkItemsJsonByYou",
                "type": "POST",
                "data": function (data, settings) {
                    var addData = {}
                    addData.AssignedByyou = ERPUserId;
                    data.addData = addData;
                }
            },
            "columns": [
                { data: "slno", title: "Slno", searchable: false, sortable: false },
                { data: "Title", title: "Title" },
                { data: "AssignedOn", title: "Assigned On" },
                { data: "AssignedByUser", title: "Assigned By" },
                { data: "AssignedToUser", title: "Assigned To" },
                { data: "Dept", title: "Department" },
                { data: "Div", title: "Division" },
                { data: "Status", title: "Status" },
                { data: "Reason", title: "Remarks" },
                { data: "WorkItemId", title: "Edit", searchable: false, sortable: false }
            ],
            "createdRow": function (row, data, index) {
                row.getElementsByTagName("td")[9].innerHTML = '<a  onclick="GetItem(' + data.WorkItemId + ');">' + Editbutton + '</a>';

                if (row.getElementsByTagName("td")[7].innerHTML == 'On Hold') {
                    $(row.getElementsByTagName("td")[7]).addClass('deep orange');
                    //$(row).addClass('orange');
                    // $('td', row).css('background-color', 'Orange');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Completed') {
                    $(row.getElementsByTagName("td")[7]).addClass('green');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Canceled') {
                    $(row.getElementsByTagName("td")[7]).addClass('danger');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Created') {
                    $(row.getElementsByTagName("td")[7]).addClass('info');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Started') {
                    $(row.getElementsByTagName("td")[7]).addClass('primary');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'Reassign') {
                    $(row.getElementsByTagName("td")[7]).addClass('brown');
                }
                else if (row.getElementsByTagName("td")[7].innerHTML == 'In Progress') {
                    $(row.getElementsByTagName("td")[7]).addClass('blue');
                }

            },
            "order": [[9, 'desc']]
        });
        $('#popupdiv').hide();
    }


}