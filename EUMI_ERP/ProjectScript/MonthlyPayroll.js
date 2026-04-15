var ArrayAtt = [];
$(document).ready(function () {
    GetAllDate();
    MonthlyPayroll();
    Defaultfocus();

    $('#btnsubmit').click(function (e) {
        SaveMP();
    });
    $('#btnSalarySave').click(function (e) {
        SaveMPSalary();
    });

    $(document).keydown(function (e) {
        if (e.keyCode == 27) { //ESC       :   Popup Close
            $('#MonthlySalaryDetails').hide();
        }
    });
});

function SaveMP() {
    var oArray = new Array();
    for (var k = 1; k < ($('#Tblreport tr').length) - 1 ; k++) {
        var EmployeeId = $('#EmployeeId' + k).text();
        var EmployeeCode = $('#EmployeeCode' + k).val();
        var EmployeeName = $('#EmployeeName' + k).text();
        var EmpUserId = $('#EmpUserId' + k).val();
        var DesignationId = $('#DesignationId' + k).val();
        var Month = $('#Month option:selected').html();
        var TotalDaysInMonth = parseInt($('#TotalDaysInMonth' + k).text() || 0);
        var TotalWorkingDays = parseInt($('#TotalWorkingDays' + k).text() || 0);
        var WorkedDays = parseInt($('#WorkedDays' + k).val() || 0);
        var LeavesTaken = parseInt($('#LeavesTaken' + k).val() || 0);
        var AllowedLeaves = parseInt($('#AllowedLeaves' + k).val() || 0);
        var TotalDayOff = parseInt($('#TotalDayOff' + k).text() || 0);
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var Day1 = $('#li_1_' + k).text();
        var Day2 = $('#li_2_' + k).text();
        var Day3 = $('#li_3_' + k).text();
        var Day4 = $('#li_4_' + k).text();
        var Day5 = $('#li_5_' + k).text();
        var Day6 = $('#li_6_' + k).text();
        var Day7 = $('#li_7_' + k).text();
        var Day8 = $('#li_8_' + k).text();
        var Day9 = $('#li_9_' + k).text();
        var Day10 = $('#li_10_' + k).text();
        var Day11 = $('#li_11_' + k).text();
        var Day12 = $('#li_12_' + k).text();
        var Day13 = $('#li_13_' + k).text();
        var Day14 = $('#li_14_' + k).text();
        var Day15 = $('#li_15_' + k).text();
        var Day16 = $('#li_16_' + k).text();
        var Day17 = $('#li_17_' + k).text();
        var Day18 = $('#li_18_' + k).text();
        var Day19 = $('#li_19_' + k).text();
        var Day20 = $('#li_20_' + k).text();
        var Day21 = $('#li_21_' + k).text();
        var Day22 = $('#li_22_' + k).text();
        var Day23 = $('#li_23_' + k).text();
        var Day24 = $('#li_24_' + k).text();
        var Day25 = $('#li_25_' + k).text();
        var Day26 = $('#li_26_' + k).text();
        var Day27 = $('#li_27_' + k).text();
        var Day28 = $('#li_28_' + k).text();
        var Day29 = $('#li_29_' + k).text();
        var Day30 = $('#li_30_' + k).text();
        var Day31 = $('#li_31_' + k).text();

        if (typeof (EmployeeCode != undefined)) {
            oArray.push({
                'EmployeeId': EmployeeId,
                'EmployeeCode': EmployeeCode,
                'EmployeeName': EmployeeName,
                'EmpUserId': EmpUserId,
                'DesignationId': DesignationId,
                'Month': Month,
                'TotalDaysInMonth': TotalDaysInMonth,
                'TotalWorkingDays': TotalWorkingDays,
                'WorkedDays': WorkedDays,
                'LeavesTaken': LeavesTaken,
                'AllowedLeaves': AllowedLeaves,
                'TotalDayOff': TotalDayOff,
                'DeptId': DeptId,
                'UserId': UserId,

                'Day1': Day1,
                'Day2': Day2,
                'Day3': Day3,
                'Day4': Day4,
                'Day5': Day5,
                'Day6': Day6,
                'Day7': Day7,
                'Day8': Day8,
                'Day9': Day9,
                'Day10': Day10,
                'Day11': Day11,
                'Day12': Day12,
                'Day13': Day13,
                'Day14': Day14,
                'Day15': Day15,
                'Day16': Day16,
                'Day17': Day17,
                'Day18': Day18,
                'Day19': Day19,
                'Day20': Day20,
                'Day21': Day21,
                'Day22': Day22,
                'Day23': Day23,
                'Day24': Day24,
                'Day25': Day25,
                'Day26': Day26,
                'Day27': Day27,
                'Day28': Day28,
                'Day29': Day29,
                'Day30': Day30,
                'Day31': Day31,
            })
        }

    }
    if (oArray != "") {
        var data = { 'ReportModel': oArray };
        $.ajax({
            type: "POST",
            url: "../../PayRoll_LeaveApply/MonthlyPayrollInsert",
            data: data,
            success: function (result) {

                var status = result.oList[0].Status;

                $('#btnsubmit').prop("disabled", false);
                Showalerts(status);

            }
        });
    }
}


function SaveMPSalary() {
    var oArray1 = new Array();

    var Max = $('#tblMSD tr').length - 1;

    for (var k = 1; k < Max ; k++) {
        var EmployeeId = $('#EmpId' + k).text();
        var EmployeeCode = $('#EmpCode' + k).val();
        var EmployeeName = $('#EmpName' + k).text();
        var EmpUserId = $('#EUId' + k).val();
        var Month = $('#Month option:selected').html();
        var BasicSalary = parseFloat($('#BS' + k).text() || 0);
        var WorkingHours = parseInt($('#Workinghrs' + k).text() || 0);
        var Allowance = parseFloat($('#Allowance' + k).text() || 0);
        var Deductions = parseFloat($('#Deductions' + k).text() || 0);
        var OTRate = parseFloat($('#OTRate' + k).text() || 0);
        var OTAmount = parseFloat($('#OT' + k).text() || 0);
        var TotalSalary = parseFloat($('#TotalSalary' + k).text() || 0);
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;

        if (typeof (EmployeeCode != undefined)) {
            oArray1.push({
                'EmployeeId': EmployeeId,
                'EmployeeCode': EmployeeCode,
                'EmployeeName': EmployeeName,
                'EmpUserId': EmpUserId,
                'Month': Month,
                'BasicSalary': BasicSalary,
                'WorkingHours': WorkingHours,
                'Allowance': Allowance,
                'Deductions': Deductions,
                'OTRate': OTRate,
                'OTAmount': OTAmount,
                'TotalSalary': TotalSalary,
                'DeptId': DeptId,
                'UserId': UserId,
            })
        }

    }
    if (oArray1 != "") {
        var data = { 'ReportModel': oArray1 };
        $.ajax({
            type: "POST",
            url: "../PayRoll_LeaveApply/MonthlyPayrollSalaryInsert",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                $('#btnsubmit').prop("disabled", false);
                Showalerts(status);

            }
        });
    }
}
function Defaultfocus() {
    $('#Month').focus();
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
function formrefresh() {
    $('#Month').val('01');
    $('#FromDate').val('');
    $('#ToDate').val('');
    $('#SerialNo').val('');
    GetAllDate();
    MonthlyPayroll();
}

function Showalerts(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    formrefresh();
}

function GetAllDate() {
    //var df = CurDate;
    var df = '01/' + $('#Month').val() + '/2019';
    var AArray = df.split('/')
    var NewDate = AArray[2] + '-' + AArray[1] + '-' + AArray[0];
    $("#NewDate").val(NewDate);

    var date = new Date(NewDate);
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var Frommonthnow = firstDay.getMonth() + 1;
    var Fromdaynow = firstDay.getDate();
    var FromDate = (Fromdaynow < 10 ? '0' : '') + Fromdaynow + '/' + (Frommonthnow < 10 ? '0' : '') + Frommonthnow + '/' + firstDay.getFullYear();

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var Tomonthnow = lastDay.getMonth() + 1;
    var Todaynow = lastDay.getDate();
    var ToDate = (Todaynow < 10 ? '0' : '') + Todaynow + '/' + (Tomonthnow < 10 ? '0' : '') + Tomonthnow + '/' + lastDay.getFullYear();

    $("#FromDate").val(FromDate);
    $("#ToDate").val(ToDate);
}

function MonthlyPayroll() {

    //var data = {};
    //data.FromDate = $("#FromDate").val();
    //data.ToDate = $("#ToDate").val();
    //data.Month = $('#Month').val();
    //data.AllowedLeaves = 2;
    //data.TotalDayOff = '\'Sun\',\'Sat\''; // Adding Holidays;
    //$.ajax({
    //    type: "POST",
    //    url: "../../PayRoll_LeaveApply/MonthlyPayrollGets",
    //    data: data,
    //    success: function (result) {
    //        getDetails(result);
    //    }
    //});

    var data = {};
    data.Month = $('#Month').val();
    data.AllowedLeaves = 2;
    data.HoliDay = '\'Sun\',\'Sat\''; // Adding Holidays;
    $.ajax({
        type: "POST",
        url: "../../PayRoll_LeaveApply/MonthlyPayrollNew",
        data: data,
        success: function (result) {
            getDetails(result);
        }
    });
}


function getDetails(result) {
    ArrayAtt = [];
    disable_datatable('Tblreport', 'buttonPlace');

    var responseText = "<thead><tr><th style=text-align:center>Sl#</th><th>Employee Name</th><th>Emp.ID</th><th>Designation</th><th style=text-align:center>Total Days in a Month</th><th style=text-align:center>Total Working Days</th><th style=text-align:center>Worked Days</th><th style=text-align:center>Leaves Taken</th><th style=text-align:center>Allowed Leaves</th><th style=text-align:center>Total Day Off</th>" +
   "<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th>" +
   "<th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th>";

    if (result[0].Column29 != '' && result[0].Column29 != null) {
        responseText = responseText + '<th>29</th>';
    }
    if (result[0].Column30 != '' && result[0].Column30 != null) {
        responseText = responseText + '<th>30</th>';
    }
    if (result[0].Column31 != '' && result[0].Column31 != null) {
        responseText = responseText + '<th>31</th>';
    }
    responseText = responseText + '</tr>';



    responseText = responseText + "<tr><th>Sl#</th><th>Employee Name</th><th>Emp.ID</th><th>Designation</th><th>Total Days in a Month</th><th>Total Working Days</th><th> </th><th> </th><th> </th><th>Total Day Off</th>" +
      "<th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th>" +
     "<th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th>";

    if (result[0].Column29 != '' && result[0].Column29 != null) {
        responseText = responseText + '<th> </th>';
    }
    if (result[0].Column30 != '' && result[0].Column30 != null) {
        responseText = responseText + '<th> </th>';
    }
    if (result[0].Column31 != '' && result[0].Column31 != null) {
        responseText = responseText + '<th> </th>';
    }
    responseText = responseText + '</tr></thead><tbody>';

    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);
        if (result[l].EmpId == 0) {
            responseText += '<tr style=background-color:#c2d6d6  id=' + 'row' + slno + '>' +
                            '<td style="text-align:center">' + slno + '</td>' +
                            '<td id= ' + 'EmployeeName' + slno + '>' + result[l].EmpName + '<input type=hidden id= ' + 'EmployeeCode' + slno + '   class="form-control"  value=' + result[l].EmpCode + '></td>' +
                            '<td id= ' + 'EmployeeId' + slno + ' style="opacity:0">' + result[l].EmpId + '<input type=hidden id= ' + 'EmpUserId' + slno + '   class="form-control"  value=' + result[l].EmpUserId + '></td>' +
                            '<td id= ' + 'Designation' + slno + '>' + result[l].Designation + '<input type=hidden id= ' + 'DesignationId' + slno + '   class="form-control"  value=' + result[l].DesignationId + '></td>' +
                            '<td id= ' + 'TotalDaysInMonth' + slno + ' style="text-align:center"></td>' +
                            '<td id= ' + 'TotalWorkingDays' + slno + ' style="text-align:center"></td>' +
                            '<td  style="text-align:center"></td>' +
                            '<td style="text-align:center"></td>' +
                            '<td style="text-align:center"></td>' +
                            '<td id= ' + 'TotalDayOff' + slno + ' style="text-align:center"></td>' +
                             '<td ondblclick="ShowPresent(\'' + slno + '\',1)" id="li_1_' + slno + '"  style="font-weight:bold;" class="nospace ' + result[l].Column1 + '">' + result[l].Column1 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',2)" id="li_2_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column2 + '">' + result[l].Column2 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',3)" id="li_3_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column3 + '">' + result[l].Column3 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',4)" id="li_4_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column4 + '">' + result[l].Column4 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',5)" id="li_5_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column5 + '">' + result[l].Column5 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',6)" id="li_6_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column6 + '">' + result[l].Column6 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',7)" id="li_7_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column7 + '">' + result[l].Column7 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',8)" id="li_8_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column8 + '">' + result[l].Column8 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',9)" id="li_9_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column9 + '">' + result[l].Column9 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',10)" id="li_10_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column10 + '">' + result[l].Column10 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',11)" id="li_11_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column11 + '">' + result[l].Column11 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',12)" id="li_12_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column12 + '">' + result[l].Column12 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',13)" id="li_13_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column13 + '">' + result[l].Column13 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',14)" id="li_14_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column14 + '">' + result[l].Column14 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',15)" id="li_15_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column15 + '">' + result[l].Column15 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',16)" id="li_16_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column16 + '">' + result[l].Column16 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',17)" id="li_17_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column17 + '">' + result[l].Column17 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',18)" id="li_18_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column18 + '">' + result[l].Column18 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',19)" id="li_19_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column19 + '">' + result[l].Column19 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',20)" id="li_20_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column20 + '">' + result[l].Column20 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',21)" id="li_21_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column21 + '">' + result[l].Column21 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',22)" id="li_22_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column22 + '">' + result[l].Column22 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',23)" id="li_23_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column23 + '">' + result[l].Column23 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',24)" id="li_24_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column24 + '">' + result[l].Column24 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',25)" id="li_25_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column25 + '">' + result[l].Column25 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',26)" id="li_26_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column26 + '">' + result[l].Column26 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',27)" id="li_27_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column27 + '">' + result[l].Column27 + '</td>' +
                            '<td ondblclick="ShowPresent(\'' + slno + '\',28)" id="li_28_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column28 + '">' + result[l].Column28 + '</td>';

            if (result[l].Column29 != '' && result[l].Column29 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',29)" id="li_29_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column29 + '">' + result[l].Column29 + '</td>';
            }
            if (result[l].Column30 != '' && result[l].Column30 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',30)" id="li_30_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column30 + '">' + result[l].Column30 + '</td>';
            }
            if (result[l].Column31 != '' && result[l].Column31 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',31)" id="li_31_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column31 + '">' + result[l].Column31 + '</td>';
            }
            '</tr>';
        }
        else {
            responseText += '<tr style=background-color:white  id=' + 'row' + slno + '>' +
                                      '<td style="text-align:center">' + slno + '</td>' +
                                      '<td id= ' + 'EmployeeName' + slno + '>' + result[l].EmpName + '<input type=hidden id= ' + 'EmployeeCode' + slno + '   class="form-control"  value=' + result[l].EmpCode + '></td>' +
                                      '<td id= ' + 'EmployeeId' + slno + '>' + result[l].EmpId + '<input type=hidden id= ' + 'EmpUserId' + slno + '   class="form-control"  value=' + result[l].EmpUserId + '></td>' +
                                      '<td id= ' + 'Designation' + slno + '>' + result[l].Designation + '<input type=hidden id= ' + 'DesignationId' + slno + '   class="form-control"  value=' + result[l].DesignationId + '></td>' +
                                      '<td id= ' + 'TotalDaysInMonth' + slno + ' style="text-align:center">' + result[l].TotalDaysInMonth + '</td>' +
                                      '<td id= ' + 'TotalWorkingDays' + slno + ' style="text-align:center">' + result[l].TotalWorkingDays + '</td>' +
                                      '<td  style="text-align:center"><input type=text id= ' + 'WorkedDays' + slno + ' disabled style="width:100px;text-align:center;height:30px;background-color:white;border:none" onkeyup=calculation(' + slno + ')  onkeypress=isNumberInt(event,this) class="form-control"  value=' + result[l].PresentDays + '></td>' +
                                      '<td style="text-align:center"><input type=text id= ' + 'LeavesTaken' + slno + ' disabled style="width:100px;text-align:center;height:30px;background-color:white;border:none"  onkeyup=Leavecalculation(' + slno + ') onkeypress=isNumberInt(event,this) class="form-control"  value=' + result[l].Leaves + '></td>' +
                                      '<td style="text-align:center"><input type=text id= ' + 'AllowedLeaves' + slno + '  style="width:100px;text-align:center;height:30px;"  onkeypress=isNumberInt(event,this) class="form-control"  value=' + result[l].AllowedLeaves + '></td>' +
                                      '<td id= ' + 'TotalDayOff' + slno + ' style="text-align:center">' + result[l].TotalDayOff + '</td>' +
                                       '<td ondblclick="ShowPresent(\'' + slno + '\',1),Attendance()" id="li_1_' + slno + '"  style="font-weight:bold;" class="nospace ' + result[l].Column1 + '">' + result[l].Column1 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',2),Attendance()" id="li_2_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column2 + '">' + result[l].Column2 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',3)" id="li_3_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column3 + '">' + result[l].Column3 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',4)" id="li_4_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column4 + '">' + result[l].Column4 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',5)" id="li_5_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column5 + '">' + result[l].Column5 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',6)" id="li_6_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column6 + '">' + result[l].Column6 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',7)" id="li_7_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column7 + '">' + result[l].Column7 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',8)" id="li_8_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column8 + '">' + result[l].Column8 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',9)" id="li_9_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column9 + '">' + result[l].Column9 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',10)" id="li_10_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column10 + '">' + result[l].Column10 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',11)" id="li_11_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column11 + '">' + result[l].Column11 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',12)" id="li_12_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column12 + '">' + result[l].Column12 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',13)" id="li_13_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column13 + '">' + result[l].Column13 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',14)" id="li_14_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column14 + '">' + result[l].Column14 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',15)" id="li_15_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column15 + '">' + result[l].Column15 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',16)" id="li_16_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column16 + '">' + result[l].Column16 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',17)" id="li_17_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column17 + '">' + result[l].Column17 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',18)" id="li_18_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column18 + '">' + result[l].Column18 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',19)" id="li_19_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column19 + '">' + result[l].Column19 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',20)" id="li_20_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column20 + '">' + result[l].Column20 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',21)" id="li_21_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column21 + '">' + result[l].Column21 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',22)" id="li_22_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column22 + '">' + result[l].Column22 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',23)" id="li_23_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column23 + '">' + result[l].Column23 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',24)" id="li_24_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column24 + '">' + result[l].Column24 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',25)" id="li_25_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column25 + '">' + result[l].Column25 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',26)" id="li_26_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column26 + '">' + result[l].Column26 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',27)" id="li_27_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column27 + '">' + result[l].Column27 + '</td>' +
                                      '<td ondblclick="ShowPresent(\'' + slno + '\',28)" id="li_28_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column28 + '">' + result[l].Column28 + '</td>';

            if (result[l].Column29 != '' && result[l].Column29 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',29)" id="li_29_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column29 + '">' + result[l].Column29 + '</td>';
            }
            if (result[l].Column30 != '' && result[l].Column30 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',30)" id="li_30_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column30 + '">' + result[l].Column30 + '</td>';
            }
            if (result[l].Column31 != '' && result[l].Column31 != null) {
                responseText = responseText + '<td ondblclick="ShowPresent(\'' + slno + '\',31)" id="li_31_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column31 + '">' + result[l].Column31 + '</td>';
            }

            if (result[l].EmpId != 0) {
                ArrayAtt.push('' + slno + '');
                if (result[l].Column31 != '' && result[l].Column31 != null) { ArrayAtt.push(result[0].Column31); }
                else if (result[l].Column30 != '' && result[l].Column30 != null) { ArrayAtt.push(result[0].Column30); }
                else if (result[l].Column29 != '' && result[l].Column29 != null) { ArrayAtt.push(result[0].Column29); }
                else { ArrayAtt.push(result[0].Column28); }

            }
            responseText = responseText + '</tr>';
        }
    }
    $('#Tblreport').html(responseText + '</tbody>');
    var title = "";
    datatableWithsearchs('Tblreport', true, title, 'buttonPlace');

}

function calculation(RowId) {
    var TotalWorkingDays = $('#TotalWorkingDays' + RowId).text();
    var WorkedDays = $('#WorkedDays' + RowId).val();
    var LeavesTaken = TotalWorkingDays - WorkedDays;
    $('#LeavesTaken' + RowId).val(LeavesTaken);
}

function Leavecalculation(RowId) {
    var TotalWorking = $('#TotalWorkingDays' + RowId).text();
    var Leave = $('#LeavesTaken' + RowId).val();
    var WorkedDays = TotalWorking - Leave;
    $('#WorkedDays' + RowId).val(WorkedDays);
}

//function ShowDetails(EmpName, EmpUserId, EmpId, Srlno) {
//    var data = {};
//    data.Month = $('#Month').val();
//    data.UserId = EmpUserId;
//    data.HoliDay = '\'Sun\',\'Sat\''; // Adding Holidays
//    $.ajax({
//        type: "POST",
//        url: "../../PayRoll_LeaveApply/MonthlyPayrollDetails",
//        data: data,
//        success: function (result) {
//            MPDetailsGets(result, EmpName, EmpId, Srlno);
//        }
//    });
//}

//function MPDetailsGets(result, EmpName, EmpId, Srlno) {
//    ArrayAtt = [];
//    var d = new Date();
//    var CurYear = d.getFullYear();
//    $('#MonthlyPayrollDetails').show();
//    $('#MPSub').show();
//    $('#MRheader').text(EmpName + ' (Emp.ID : ' + EmpId + ')');
//    $('#SerialNo').val(Srlno);
//    $('#Dheader').text($('#Month option:selected').html() + ' - ' + CurYear);
//    disable_datatable('tblMPD');
//    var responseText = "<tbody>";
//    for (var l = 0; l < result.length; l++) {
//        var slno = parseInt(l + 1);
//        responseText += '<tr id=' + "Newrow" + slno + '>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column1 + '\',\'' + slno + '\')" id="li_' + result[0].Column1 + '_' + slno + '"  style="font-weight:bold;" class="nospace ' + result[l].Column1 + '">' + result[l].Column1 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column2 + '\',\'' + slno + '\')" id="li_' + result[0].Column2 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column2 + '">' + result[l].Column2 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column3 + '\',\'' + slno + '\')" id="li_' + result[0].Column3 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column3 + '">' + result[l].Column3 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column4 + '\',\'' + slno + '\')" id="li_' + result[0].Column4 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column4 + '">' + result[l].Column4 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column5 + '\',\'' + slno + '\')" id="li_' + result[0].Column5 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column5 + '">' + result[l].Column5 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column6 + '\',\'' + slno + '\')" id="li_' + result[0].Column6 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column6 + '">' + result[l].Column6 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column7 + '\',\'' + slno + '\')" id="li_' + result[0].Column7 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column7 + '">' + result[l].Column7 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column8 + '\',\'' + slno + '\')" id="li_' + result[0].Column8 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column8 + '">' + result[l].Column8 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column9 + '\',\'' + slno + '\')" id="li_' + result[0].Column9 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column9 + '">' + result[l].Column9 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column10 + '\',\'' + slno + '\')" id="li_' + result[0].Column10 + '_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column10 + '">' + result[l].Column10 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column11 + '\',\'' + slno + '\')" id="li_' + result[0].Column11 + '_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column11 + '">' + result[l].Column11 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column12 + '\',\'' + slno + '\')" id="li_' + result[0].Column12 + '_' + slno + '" style="font-weight:bold;"  class="nospace ' + result[l].Column12 + '">' + result[l].Column12 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column13 + '\',\'' + slno + '\')" id="li_' + result[0].Column13 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column13 + '">' + result[l].Column13 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column14 + '\',\'' + slno + '\')" id="li_' + result[0].Column14 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column14 + '">' + result[l].Column14 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column15 + '\',\'' + slno + '\')" id="li_' + result[0].Column15 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column15 + '">' + result[l].Column15 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column16 + '\',\'' + slno + '\')" id="li_' + result[0].Column16 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column16 + '">' + result[l].Column16 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column17 + '\',\'' + slno + '\')" id="li_' + result[0].Column17 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column17 + '">' + result[l].Column17 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column18 + '\',\'' + slno + '\')" id="li_' + result[0].Column18 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column18 + '">' + result[l].Column18 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column19 + '\',\'' + slno + '\')" id="li_' + result[0].Column19 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column19 + '">' + result[l].Column19 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column20 + '\',\'' + slno + '\')" id="li_' + result[0].Column20 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column20 + '">' + result[l].Column20 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column21 + '\',\'' + slno + '\')" id="li_' + result[0].Column21 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column21 + '">' + result[l].Column21 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column22 + '\',\'' + slno + '\')" id="li_' + result[0].Column22 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column22 + '">' + result[l].Column22 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column23 + '\',\'' + slno + '\')" id="li_' + result[0].Column23 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column23 + '">' + result[l].Column23 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column24 + '\',\'' + slno + '\')" id="li_' + result[0].Column24 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column24 + '">' + result[l].Column24 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column25 + '\',\'' + slno + '\')" id="li_' + result[0].Column25 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column25 + '">' + result[l].Column25 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column26 + '\',\'' + slno + '\')" id="li_' + result[0].Column26 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column26 + '">' + result[l].Column26 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column27 + '\',\'' + slno + '\')" id="li_' + result[0].Column27 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column27 + '">' + result[l].Column27 + '</td>' +
//                    '<td ondblclick="ShowPresent(\'' + result[0].Column28 + '\',\'' + slno + '\')" id="li_' + result[0].Column28 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column28 + '">' + result[l].Column28 + '</td>';

//        if (result[l].Column29 != '' && result[l].Column29 != null) {
//            responseText = responseText + '<td ondblclick="ShowPresent(\'' + result[0].Column29 + '\',\'' + slno + '\')" id="li_' + result[0].Column29 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column29 + '">' + result[l].Column29 + '</td>';
//        }
//        if (result[l].Column30 != '' && result[l].Column30 != null) {
//            responseText = responseText + '<td ondblclick="ShowPresent(\'' + result[0].Column30 + '\',\'' + slno + '\')" id="li_' + result[0].Column30 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column30 + '">' + result[l].Column30 + '</td>';
//        }
//        if (result[l].Column31 != '' && result[l].Column31 != null) {
//            responseText = responseText + '<td ondblclick="ShowPresent(\'' + result[0].Column31 + '\',\'' + slno + '\')" id="li_' + result[0].Column31 + '_' + slno + '"  style="font-weight:bold;"  class="nospace ' + result[l].Column31 + '">' + result[l].Column31 + '</td>';
//        }

//        if (result[l].UserId > 0) {
//            ArrayAtt.push('' + slno + '');
//            if (result[l].Column31 != '' && result[l].Column31 != null) { ArrayAtt.push(result[0].Column31); }
//            else if (result[l].Column30 != '' && result[l].Column30 != null) { ArrayAtt.push(result[0].Column30); }
//            else if (result[l].Column29 != '' && result[l].Column29 != null) { ArrayAtt.push(result[0].Column29); }
//            else { ArrayAtt.push(result[0].Column28); }

//            console.log(ArrayAtt);
//        }

//        responseText = responseText + '</tr>';

//    }

//    $('#tblMPD').html(responseText + '</tbody>');
//}

function ShowPresent(slno, No) {
    if ($("#li_" + No + '_' + slno).text() == 'L') {
        $("#li_" + No + '_' + slno).text('P')
        $("#li_" + No + '_' + slno).css('color', 'green');

        var TotalLeaves = Number($("#LeavesTaken" + slno).val()) - Number(1);
        var TotalPresent = Number($("#WorkedDays" + slno).val()) + Number(1);

        $("#LeavesTaken" + slno).val(TotalLeaves);
        $("#WorkedDays" + slno).val(TotalPresent);
        
    }
    else if ($("#li_" + No + '_' + slno).text() == 'P') {
        $("#li_" + No + '_' + slno).text('H')
        $("#li_" + No + '_' + slno).css('color', 'blue');

        var TotalPresent = Number($("#WorkedDays" + slno).val()) - Number(1);
        var TotalHoliday = Number($("#TotalDayOff" + slno).text()) + Number(1);
        var TotalWorkingDays = Number($("#TotalWorkingDays" + slno).text()) - Number(1);

        $("#TotalDayOff" + slno).text(TotalHoliday);
        $("#TotalWorkingDays" + slno).text(TotalWorkingDays);
        $("#WorkedDays" + slno).val(TotalPresent);
    }
    else if ($("#li_" + No + '_' + slno).text() == 'H') {
        $("#li_" + No + '_' + slno).text('L')
        $("#li_" + No + '_' + slno).css('color', 'red');

        
        var TotalHoliday = Number($("#TotalDayOff" + slno).text()) - Number(1);
        var TotalLeaves = Number($("#LeavesTaken" + slno).val()) + Number(1);
        var TotalWorkingDays = Number($("#TotalWorkingDays" + slno).text()) + Number(1);

        $("#TotalDayOff" + slno).text(TotalHoliday);
        $("#LeavesTaken" + slno).val(TotalLeaves);
        $("#TotalWorkingDays" + slno).text(TotalWorkingDays);
    }
   
}

//function Attendance() {
//    var cnt1 = 0, cnt2 = 0, cnt3 = 0;

//    var slno = ArrayAtt[0];
//    var Max = ArrayAtt[1];
//    for (var i = 1; i <= Max; i++) {

//        if ($("#li_" + i + "_" + slno).text() == 'L') cnt1++;
//        else if ($("#li_" + i + "_" + slno).text() == 'P') cnt2++;
//        else if ($("#li_" + i + "_" + slno).text() == 'H') cnt3++;


//    }
//    alert(cnt1)
//    alert(cnt2)
//    alert(cnt3)
//    var TDM = $('#TotalDaysInMonth' + slno).text();
//    $('#LeavesTaken' + slno).val(cnt1);
//    $('#WorkedDays' + slno).val(cnt2);
//    $('#TotalDayOff' + slno).text(cnt3);
//    var TWD = TDM - cnt3;
//    $('#TotalWorkingDays' + slno).text(TWD);
//    calculation(slno);
//    Leavecalculation(slno);


//}

function ShowSalaryDetails() {
    var data = {};
    $.ajax({
        type: "POST",
        url: "../../PayRoll_LeaveApply/MonthlyPayrollSalaryGets",
        data: data,
        success: function (result) {
            MSDetailsGets(result);
        }
    });
}

function MSDetailsGets(result) {

    $('#MonthlySalaryDetails').show();
    $('#MSSub').show();

    disable_datatable('tblMSD', 'buttonPlace');
    var responseText = "<thead><tr><th style=text-align:center>Sl#</th><th>Employee Name</th><th>Emp.ID</th><th style=text-align:right>Basic Sal.</th><th style=text-align:center>Working Hrs.</th><th style=text-align:right>Allowance</th>" +
                                  "<th style=text-align:right>Deductions</th><th style=text-align:right>OT Rate</th><th style=text-align:right>OT Amount</th><th style=text-align:right>Total Sal.</th><th style=display:none>Leave</th><th style=display:none>Daysinamonth</th></tr>" +
                              "<tr><th>Sl#</th><th>Employee Name</th><th>Emp.ID</th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th> </th><th style=display:none> </th><th style=display:none> </th></tr></thead><tbody>";
    for (var l = 0; l < result.length; l++) {

        var slno = parseInt(l + 1);
        var Ded = result[l].Deductions;
        var OTRate = result[l].OTRate;
        var WH = result[l].Workinghrs;
        var AL = result[l].Allowance;
        var Abs = $("#LeavesTaken" + slno).val();
        var BS = parseFloat(result[l].BasicSalary).toFixed(Decimal);
        var Sal = BS / parseFloat($("#TotalDaysInMonth" + slno).text()).toFixed(Decimal);
        var NewDed = parseFloat(Sal).toFixed(Decimal) * parseFloat(Abs).toFixed(Decimal);
        var OTCal = parseFloat(Sal / WH).toFixed(Decimal);
        var OT = parseFloat(OTCal).toFixed(Decimal) * parseFloat(OTRate).toFixed(Decimal);
        var TS = parseFloat(BS) + parseFloat(AL) + parseFloat(OT);
        var FTS = parseFloat(TS).toFixed(Decimal) - parseFloat(NewDed).toFixed(Decimal);

        responseText += '<tr style=background-color:white  id=' + 'Srow' + slno + '>' +
                        '<td style="text-align:center">' + slno + '</td>' +
                        '<td id= ' + 'EmpName' + slno + '>' + result[l].EmpName + '<input type=hidden id= ' + 'EmpCode' + slno + '   class="form-control"  value=' + result[l].EmpCode + '></td>' +
                        '<td id= ' + 'EmpId' + slno + '>' + result[l].EmpId + '<input type=hidden id= ' + 'EUId' + slno + '   class="form-control"  value=' + result[l].EmpUserId + '></td>' +
                        '<td id= ' + 'BS' + slno + ' style=text-align:right>' + parseFloat(result[l].BasicSalary).toFixed(Decimal) + '</td>' +
                        '<td id= ' + 'Workinghrs' + slno + ' style=text-align:center>' + result[l].Workinghrs + '</td>' +
                        '<td id= ' + 'Allowance' + slno + ' style=text-align:right>' + parseFloat(result[l].Allowance).toFixed(Decimal) + '</td>' +
                        '<td id= ' + 'Deductions' + slno + ' style=text-align:right>' + parseFloat(NewDed||0).toFixed(Decimal) + '</td>' +
                        '<td id= ' + 'OTRate' + slno + ' style=text-align:right>' + parseFloat(result[l].OTRate).toFixed(Decimal) + '</td>' +
                        '<td id= ' + 'OT' + slno + ' style=text-align:right>' + parseFloat(OT||0).toFixed(Decimal) + '</td>' +
                        '<td id= ' + 'TotalSalary' + slno + ' style=text-align:right>' + parseFloat(FTS||0).toFixed(Decimal) + '</td>' +
                        '<td style=display:none id="Leaves' + slno + '">' + $("#LeavesTaken" + slno).val() + '</td>' +
                        '<td style=display:none id="DaysMonth' + slno + '">' + $("#TotalDaysInMonth" + slno).text() + '</td>' +
                        '</tr>';
    }
    $('#tblMSD').html(responseText + '</tbody>');
    var title = "";
    datatableWithsearchNS('tblMSD', true, title, 'buttonPlace');
}

function datatableWithsearchs(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();

        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'O Balance' && title != ' ') {
            $(this).html('<input type="text" class="form-control" placeholder=" ' + title + '" style="width=100%" />');
        }
        if (title == 'Employee Name') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:300px" />');
        }
        if (title == 'Designation') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:200px" />');
        }
        if (title == 'Emp.ID') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Total Days in a Month') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100px" />');
        }
        if (title == 'Total Working Days') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:120px" />');
        }
        if (title == 'Worked Days') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Leaves Taken') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Allowed Leaves') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100%" />');
        }
        if (title == 'Total Day Off') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:100px" />');
        }
    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) {
            //console.log("download table need title and button container");
        }
        table = $('#' + tablename).DataTable({

            dom: "<'row'>" +
              "<'row'<'col-sm-12'tr>>" +
              "<'row'<'col-sm-1'i>>",
            'bSortable': false,
            "ordering": false,
            'aTargets': [0],

            "order": [],
            "pageLength": -1,
            buttons: []


        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'colvis',
                    columns: ':visible',
                }
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

    } else {
        table = $('#' + tablename).DataTable();

    }
    table.columns().every(function (index) {
        $('#' + tablename + ' thead tr:eq(1) th:eq(' + index + ') input').on('keyup change', function () {
            table.column($(this).parent().index() + ':visible')
                .search(this.value)
                .draw();
        });
    });


}


function datatableWithsearchNS(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();

        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'O Balance' && title != ' ') {
            $(this).html('<input type="text" class="form-control" placeholder=" ' + title + '" style="width=100%" />');
        }
        if (title == 'Employee Name') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:500px" />');
        }

        if (title == 'Emp.ID') {
            $(this).html('<input type="text" class="form-control" placeholder="' + title + '" style="width:80px" />');
        }

    });
    var table = null;
    if (download) {
        if (!title || !tableButtonContainerId) {
            //console.log("download table need title and button container");
        }
        table = $('#' + tablename).DataTable({

            dom: "<'row'>" +
              "<'row'<'col-sm-12'tr>>" +
              "<'row'<'col-sm-1'i>>",
            'bSortable': false,
            "ordering": false,
            'aTargets': [0],

            "order": [],
            "pageLength": -1,
            buttons: []


        });
        new $.fn.dataTable.Buttons(table, {
            buttons: [
                {
                    extend: 'colvis',
                    columns: ':visible',
                }
            ]
        });
        table.buttons(0, null).container().appendTo($("#" + tableButtonContainerId));
        $("#" + tableButtonContainerId).find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");

    } else {
        table = $('#' + tablename).DataTable();

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


function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}
