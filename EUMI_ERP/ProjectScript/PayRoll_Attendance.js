$(document).ready(function () { 
    var data4 = {};
    data4.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeDivisionGetandGets",
        data4: data4,
        success: function (result) {
            LocationLoad(result.oList);
        }

    });
    var data4 = {};
    data4.DeptId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data4: data4,
        success: function (result) {
            DepartmentLoad(result.oList);
        }
    });
    $('#txtdate').daterangepicker({
        minDate: minDate,
        maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        singleDatePicker: true,
        showDropdowns: true,
        locale: {
            format: 'DD/MM/YYYY'
        }
    });

    var LocId = 0;
    var deptId = 0;
    var date = $('#txtdate').val();
    var data = {};
    data.LocId = LocId;
    data.DeptId = deptId;
    data.AtendanceDate = date;
    $.ajax({
        type: "POST",
        url: "../../PayRoll_Attendance/AttendanceEmployeeSearch",
        data: data,
        success: function (result) {           
            ShowEmployeeList(result);
            $('#RowGet').val = '';
        }
    });
   
    $("#btnsubmit1").click(function (e) {
        SaveAndUpdate(1)
    });
    $("#btnfinalsubmit").click(function (e) {
        SaveAndUpdate(2)
    });   
    function SaveAndUpdate(Flag) {
        $('.search').val('');
        $('.search').keydown();
        $('.search').keypress();
        $('.search').keyup();
        $('.search').blur();
        var c = $('#RowGet').val();
        $('#btnsubmit1').prop("disabled", true);
        var oArray = new Array();
        for (var k = 1; k <= c; k++) {
            var Location = $('#Location').val();
            var Dept = $('#txtdept').val();
            var AtendanceDate = $('#txtdate').val();
            var EmpId = $('#empId' + k).val();
            var EmpCode = $('#empcode' + k).text();
            var EmpName = $('#empName' + k).text();
            var InTime = $('#intime' + k).val();
            var OutTime = $('#outtime' + k).val();
            var WorkingHrs = ($('#WorkingHrs' + k).text()).replace(":", ".");
            var flag = $('#flag' + k).text();
            var UId = ERPUserId;
            var DeptId = ERPDeptId;
            var SaveFlag = Flag;
            var Type = $('#txttype' + k).val();
            var DivisionId = $('#Division').val();
            debugger;
            if (InTime != '') {
                if (EmpName != undefined) {
                    oArray.push({
                        'Location': Location,
                        'Dept': Dept,
                        'AtendanceDate': AtendanceDate,
                        'EmpId': EmpId,
                        'EmpCode': EmpCode,
                        'EmpName': EmpName,
                        'InTime': InTime,
                        'OutTime': OutTime,
                        'WorkingHrs': WorkingHrs,
                        'flag': flag,
                        'UId': UId,
                        'DeptId': DeptId,
                        'SaveFlag': SaveFlag,
                        'Type': Type,
                        'DivisionId': DivisionId
                    })
                }
            }
        }
        if (oArray != "") {
            var data = { 'PayRollAttendanceEntry': oArray };
            $.ajax({
                type: "POST",
                url: "../../PayRoll_Attendance/AttendanceEntryInsert",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        $('#btnsubmit1').prop("disabled", false);
                        if (status != 0) {
                            Showalerts1(status);
                            GetList();
                            // formrefresh();
                        }
                    }
                }
            });
        }
    }
});


var LeaveType =  "<option value='L'>Leave</option><option value='F'>Full Day</option><option value='H'>Half Day</option><option value='PH'>Holy Day</option>";

function LocationLoad(result) {
    $("#Location").empty();
    var LocationSelect = "<option value=0>-All-</option>";
    for (var i = 0; i < result.length; i++) {
        LocationSelect += "<option value='" + result[i].EmployeeDivisionId + "'>" + result[i].EmployeeDivisionName + "</option>";
    }
    $("#Division").append(LocationSelect);
}


function DepartmentLoad(result) {
    $("#txtdept").empty();
    var DeptSelect = "<option value=0>---------All------</option>";
    for (var i = 0; i < result.length; i++) {
        DeptSelect += "<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>";
    }
    $("#txtdept").append(DeptSelect);
}

function GetList() {
    var LocId = $('#Division').val();
    var deptId = $('#txtdept').val();
    var date = $('#txtdate').val();
        var data = {};
        data.LocId = LocId;
        data.DeptId = deptId;
        data.AtendanceDate = date;
        $.ajax({
            type: "POST",
            url: "../../PayRoll_Attendance/AttendanceEmployeeSearch",
            data: data,
            success: function (result) {
                disable_datatable('AttendanceList');
               
                $("#AttendanceList tr").remove();
                ShowEmployeeList(result);
                $('#RowGet').val = '';
            }
        });
    }

function ShowEmployeeList(result) {

    
    document.getElementById("Holidaycheck").checked = false;
    $('#btnsubmit1').prop('disabled', false);
    $('#btnfinalsubmit').prop('disabled', false);
    $('#Holidaycheck').prop('disabled', false);
    //copyrefresh();
    disable_datatable('AttendanceList');
    //$('#AttendanceList').DataTable();
    var responseText = "";   
        var responseText = "<thead ><tr style='background-color:#ebebe0;overflow-y:hidden'> <th style='width:4%;text-align:center;'>SlNo</th>" +
                       "<th style='width:6%;'>Date</th>" +
                        "<th style='width:6%;'>EmpCode</th>" +
                        "<th style='width:7%;display:none;'></th>" +
                        "<th style='width:18%;'>EmpName</th>" +
                        "<th style='width:3%;text-align:center' id='TI'>Time In </th>" +
                        "<th style='width:3%;text-align:center'>Time Out</th>" +
                        "<th style='width:7%;margin-left:4%;text-align:center'>Working Hrs</th>" +
                        "<th style='width:7%;display:none;'> </th>" +
                        "<th style='width:7%;display:none;'></th>" +
                        "<th style='width:7%;text-align:center;'>Status</th>" +
                         "<th style='width:7%;text-align:center;'>Type</th></tr>" +
                        "<tr ><th style='width:4.6%;' class='search'>SlNo</th><th class='search'>Date</th><th class='search' >EmpCode</th><th class='search' style='display:none;'></th><th class='search'>EmpName</th><th class='search'>Time In </th><th class='search'>Time Out</th><th class='search'>Working Hrs</th><th style='display:none;' class='search'> </th><th style='display:none;' class='search'></th><th class='search'>Status</th><th class='search'>Type</th></tr>" +
                        "</thead><tbody>";
        if (result.length != 0) {
        for (var l = 0; l < result.length; l++) {
            var slno = parseInt(l + 1);
            //var responseText =  "<tr><th style='width:4.6%;'>SlNo</th><th>Date</th><th>EmpCode</th><th style='display:none;'></th><th>EmpName</th><th>Time In </th><th>Time Out</th><th>Working Hours</th><th style='display:none;'> </th><th style='display:none;'></th><th>Status</th></tr>"                                                                                                                                                                       

            if (result[l].SaveFlag == 1 || result[l].SaveFlag == 0) {
                if (result[l].flag == 1 || result[l].flag == 2) {
                    responseText = responseText + '<tr ><td style="width:4%;text-align:center;">' + slno + '</td>' +
                        '<td style="width:6%;">1' + $('#txtdate').val() + '</td>' +
                        '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                        '<td style=width:7%;display:none;><input type="text" style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                        '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                        '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;align:center;height:33px;"  onblur="a(' + slno + ',event)"   onkeyup="checkme(' + slno + ',event)"   autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                        '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;"      onkeyup="timediff(' + slno + ',event)"   onblur="timediffblur(' + slno + ',event)"  class="form-control" value= ' + result[l].OutTime + '></td>' +
                        '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                        '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                        '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                        '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                        '<td style="width:7%;" id=' + 'type' + slno + ' >  <select   id= ' + 'txttype' + slno + ' class="form-control" style="width:140px;height:33px;"><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td></tr>';
                    //  console.log(responseText)
                    //$('#AttendanceList').append(responseText);
                    $('#txttype' + slno).val(result[l].Type);
                }
                else {

                    if (result[l].LeaveFrom == 0) {
                        if (parseInt(result[l].WorkingHrs|0) == '0')
                        responseText = responseText + '<tr ><td style="width:4%;text-align:center;">' + slno + '</td>' +
                                         '<td style="width:6%;">2' + $('#txtdate').val() + '</td>' +
                                         '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                                         '<td style=width:7%;display:none;><input type="text"  style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                                         '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                                         '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;text-align:center;height:33px;"  onblur="a(' + slno + ',event)"    onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                                         '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;"      onkeyup="timediff(' + slno + ',event)" onblur="timediffblur(' + slno + ',event)"  class="form-control" autocomplete="off"   value= ' + result[l].OutTime + '></td>' +
                                         '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                                         '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                                         '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                                         '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                                          '<td style="width:7%;" id=' + 'type' + slno + '><select id= ' + 'txttype' + slno + '  class="form-control" style="width:140px;height:33px;" ><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td>' + '</tr>';
                        //$('#AttendanceList').append(responseText);
                        else
                            responseText = responseText + '<tr ><td style="width:4%;text-align:center;">' + slno + '</td>' +
                                '<td style="width:6%;">2' + $('#txtdate').val() + '</td>' +
                                '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                                '<td style=width:7%;display:none;><input type="text"  style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                                '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                                '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + ' disabled  style="width:165px;text-align:center;height:33px;"  onblur="a(' + slno + ',event)"    onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                                '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + ' disabled  style="width:165px;text-align:center;height:33px;"      onkeyup="timediff(' + slno + ',event)" onblur="timediffblur(' + slno + ',event)"  class="form-control" autocomplete="off"   value= ' + result[l].OutTime + '></td>' +
                                '<td style="width:7%;text-align:center" disabled  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                                '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                                '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                                '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                                '<td style="width:7%;" id=' + 'type' + slno + '><select id= ' + 'txttype' + slno + '  class="form-control" style="width:140px;height:33px;" ><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td>' + '</tr>';

                    }

                    else if (result[l].LeaveFrom != 0) {
                        responseText = responseText + '<tr style="background-color:#F8BBB0;"><td style="width:4%;text-align:center;">' + slno + '</td>' +
                                          '<td style="width:6%;">3' + $('#txtdate').val() + '</td>' +
                                          '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                                          '<td style=width:7%;display:none;><input type="text"  style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                                          '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                                          '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;text-align:center;height:33px;"  onblur="a(' + slno + ',event)"    onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                                          '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;"      onkeyup="timediff(' + slno + ',event)" onblur="timediffblur(' + slno + ',event)"  class="form-control" autocomplete="off"   value= ' + result[l].OutTime + '></td>' +
                                          '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                                          '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                                          '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                                          '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                                           '<td style="width:7%;" id=' + 'type' + slno + '><select id= ' + 'txttype' + slno + '  class="form-control" style="width:140px;height:33px;" ><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td>' + '</tr>';
                        //$('#AttendanceList').append(responseText);
                    }
                }

            }

            else if (result[l].SaveFlag == 2) {
                $('#btnsubmit1').prop('disabled', true);
                $('#btnfinalsubmit').prop('disabled', true);
                $('#intime' + slno).prop('disabled', true);
                $('#outtime' + slno).prop('disabled', true);
                $('#Holidaycheck').prop('disabled', true);
                if (result[l].flag == 1 || result[l].flag == 2) {
                        responseText = responseText + '<tr ><td style="width:4%;text-align:center;">' + slno + '</td>' +
                            '<td style="width:6%;">4' + $('#txtdate').val() + '</td>' +
                            '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                            '<td style=width:7%;display:none;><input type="text" style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                            '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                            '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;align:center;height:33px;" disabled=disabled   onblur="a(' + slno + ',event)"  onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                            '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;" disabled=disabled     onkeyup="timediff(' + slno + ',event)"  class="form-control" value= ' + result[l].OutTime + '></td>' +
                            '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                            '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                            '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                            '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                            '<td style="width:7%;" id=' + 'type' + slno + ' >  <select   id= ' + 'txttype' + slno + ' class="form-control" style="width:140px;height:33px;" disabled  ><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td></tr>';
                        //  console.log(responseText)
                        //$('#AttendanceList').append(responseText);
                        $('#txttype' + slno).val(result[l].Type);
                    }
                else {
                    if (result[l].LeaveFrom == 0) {
                        responseText = responseText + '<tr ><td style="width:4%;text-align:center;">' + slno + '</td>' +
                          '<td style="width:6%;">5' + $('#txtdate').val() + '</td>' +
                          '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                          '<td style=width:7%;display:none;><input type="text" style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                          '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                          '<td style="width:3%;" id=' + 'intimetd' + slno + '><input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;text-align:center;height:33px;" disabled=disabled   onblur="a(' + slno + ',event)"  onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                          '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;" disabled=disabled     onkeyup="timediff(' + slno + ',event)"  class="form-control" autocomplete="off"   value= ' + result[l].OutTime + '></td>' +
                          '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                          '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                          '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                          '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                           '<td style="width:7%;" id=' + 'type' + slno + '><select id= ' + 'txttype' + slno + '  class="form-control" style="width:140px;height:33px;" disabled><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td>' + '</tr>';
                        //$('#AttendanceList').append(responseText);
                    }
                    else if (result[l].LeaveFrom != 0) {
                        responseText = responseText + '<tr style="background-color:#F8BBB0;"><td style="width:4%;text-align:center;">' + slno + '</td>' +
                                                 '<td style="width:6%;">6' + $('#txtdate').val() + '</td>' +
                                                 '<td style="width:6%;" id= ' + 'empcode' + slno + '>' + result[l].EmpCode + '</td>' +
                                                 '<td style=width:7%;display:none;><input type="text" style="width:95px;" id= ' + 'empId' + slno + ' value= ' + result[l].EmpId + '></td>' +
                                                 '<td style="width:18%;" id= ' + 'empName' + slno + '>' + result[l].EmpName + '</td>' +
                                                 '<td style="width:3%;" id=' + 'intimetd' + slno + '><input  type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'intime' + slno + '  style="width:165px;text-align:center;height:33px;" disabled=disabled   onblur="a(' + slno + ',event)"  onkeyup="checkme(' + slno + ',event)" autocomplete="off" class="form-control" value= ' + result[l].InTime + '></td>' +
                                                 '<td style="width:3%;" id=' + 'outtimetd' + slno + '> <input type=text data-time-format="H:i" data-step="1" data-min-time="00:00" data-max-time="24:00" data-show-2400="true" id= ' + 'outtime' + slno + '  style="width:165px;text-align:center;height:33px;" disabled=disabled     onkeyup="timediff(' + slno + ',event)"  class="form-control" autocomplete="off"   value= ' + result[l].OutTime + '></td>' +
                                                 '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '>' + result[l].WorkingHrs + '</td>' +
                                                 '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '>' + result[l].flag + '</td>' +
                                                 '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Present   class="badge badge-default round  btn-success" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Present</button></td>' +
                                                 '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                                                  '<td style="width:7%;" id=' + 'type' + slno + '><select id= ' + 'txttype' + slno + '  class="form-control" style="width:140px;height:33px;" disabled><option value="L">Leave</option><option value="F">Full Day</option><option value="H">Half Day</option><option value="PH">Holiday</option></select></td>' + '</tr>';
                        //$('#AttendanceList').append(responseText);
                    }

                      
                    }
                    
            }
        }
    }
    else {
        responseText + '<tr ><td style="width:;text-align:center;"></td>' +
                              '<td style=";"></td>' +
                              '<td style="width:6%;"></td>' +
                              '<td style=width:7%;display:none;></td>' +
                              '<td style="width:18%;" id= ' + 'empName' + slno + '></td>' +
                              '<td style="width:3%;" id=' + 'intimetd' + slno + '></td>' +
                              '<td style="width:3%;" id=' + 'outtimetd' + slno + '></td>' +
                              '<td style="width:7%;text-align:center"  id= ' + 'WorkingHrs' + slno + '></td>' +
                              '<td style="width:7%;display:none;" id= ' + 'flag' + slno + '></td>' +
                              '<td id=' + 'Absent' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;display:none;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button"  title= Absent   class="badge badge-default round  btn-warning" id="delete" style="font-weight:normal;color:white;border:none;" disabled >Absent</button></td>' +
                              '<td id=' + 'Present' + slno + '  class= "jsgrid-cell jsgrid-control-field jsgrid-align-left"  style="width:7%;"></td>' +
                              '<td style="width:7%;" id=' + 'type' + slno + ' >  </td></tr>';
        //  console.log(responseText)
    }


    $('#AttendanceList').html(responseText + '</tbody>')
    $('#intime1').focus();
    for (var l = 0; l < result.length; l++) {
        var slno = parseInt(l + 1);

        $('#intime' + slno).timepicker();
        $('#outtime' + slno).timepicker();

        if (result[l].flag == 1 || result[l].flag == 2) {
            $('#txttype' + slno).val(result[l].Type);
            touchflag = 1;

        }
        if (result[l].flag == 0 && result[l].Type == 'PH' && result[l].SaveFlag == 1 ) {
            $('#txttype' + slno).val(result[l].Type);
            document.getElementById("Holidaycheck").checked = true;
            $('#txttype' + slno).prop('disabled', false)                 
        }
      else if (result[l].flag == 0  && result[l].Type == 'PH' && result[l].SaveFlag == 2) {
            $('#txttype' + slno).val(result[l].Type);
            document.getElementById("Holidaycheck").checked = true;
            $('#txttype' + slno).prop('disabled', true)
      }       
    }
    
    datatablesearch('AttendanceList', 'Multiple');
    $('#RowGet').val(result.length);
    $('#div1').animate({ scrollTop: 0 });
}
var touchflag = 0;
function selectallholiday() {
    var rowCount = $('#AttendanceList tr').length;
    if ($("#Holidaycheck").is(":checked")) {
        for (var n = 1; n <= rowCount + 1; n++) {            
            $('#txttype' + n).val("PH");
            $('#txttype' + n).prop('disabled', false);            
            if ($('#intime' + n).val() == '') {
                $('#flag' + n).text('0');
            }
            else  {
                $('#flag' + n).text('2');
                $('#txttype' + n).val("F");
            }
        }
    }
    else {
        for (var n = 1; n <= rowCount + 1; n++) {
            $('#txttype' + n).val("L");
            $('#txttype' + n).prop('disabled', false);
        }
    }
}
function datatablesearch(tablename, Type) {
  
    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'SlNO' || title == 'Date' || title == 'EmpCode' || title == 'EmpName' || title == 'Time Out' || title == 'Working Hours' || title == 'Status' || title == 'Type') {
                $(this).html('<input type="text" class="form-control search"  style="width:120px"  placeholder="' + title + '"/>')
            }
        if ( title == 'Time In' ) {
            $(this).html('<input type="text" class="form-control search"  style="width:100px"  placeholder="' + title + '"/>')
        }
            else {
                $(this).html('<input type="text" class="form-control search" style="font-weight:100"   placeholder="' + title + '"/>')
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
            //"order": false,
            "pageLength": -1
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



var Id;
function checkme(slno,e)
{   
   // $('#intime'+slno).timepicker('setTime', new Date());
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    touchflag = 0;
    if (key == 13) {
        Id = slno;
    
        if (document.getElementById('Holidaycheck').checked) {
            if ($('#intime' + Id).val() != '') {
                $('#Absent' + Id).hide();
                $('#Present' + Id).show();
                $('#flag' + Id).text('2');
                $('#txttype' + Id).val("F");
            }
        }
        else {
            if ($('#intime' + Id).val() != '') {
                $('#Absent' + Id).hide();
                $('#Present' + Id).show();
                $('#flag' + Id).text('1');
                $('#txttype' + Id).val("F");
            }
        }
        if ($('#intime' + Id).val() == '') {
            $('#Absent' + Id).show();
            $('#Present' + Id).hide();
            $('#flag' + Id).text('0');
        }
        var nextId = Id + 1;
        $('#intime' + nextId).focus();
    }
    else if (key == 8) {                
        $('#WorkingHrs' + slno).text(0);
        if($('#intime' +slno).val() == '' )
        {
            $('#Absent' + slno).show();
            $('#Present' + slno).hide();
            $('#txttype' + slno).val("L");
            $('#flag' + slno).text('0');
            
        }      
    }
}




function Showalerts1(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
}


function timediff(slno, e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (key == 13) {
        if ($('#outtime' + slno).val() != '')
        {
            $("#txttype" + slno).attr("disabled", false);
        }
        
        if ($('#intime' + slno).val() == '' && $('#outtime' + slno).val() != '') {
            warningshow('Please Enter In Time', '#intime' + slno);
        }
        else {
           
                var startTime = $('#intime' + slno).val();
                var endTime = $('#outtime' + slno).val();

                if (startTime != '' && endTime != '')
                {
                    var startTimeArray = startTime.split(":");
                    var startInputHrs = parseInt(startTimeArray[0]);
                    var startInputMins = parseInt(startTimeArray[1]);

                    var endTimeArray = endTime.split(":");
                    var endInputHrs = parseInt(endTimeArray[0]);
                    var endInputMins = parseInt(endTimeArray[1]);
                 
                    var startMin = startInputHrs * 60 + startInputMins;
                    var endMin = endInputHrs * 60 + endInputMins;
                    var result;

                    if (endMin < startMin) {
                        var minutesPerDay = 24 * 60;
                        result = minutesPerDay - startMin;  // Minutes till midnight
                        result += endMin; // Minutes in the next day

                    } else {
                        result = endMin - startMin;
                    }
                    var minutesElapsed = result % 60;
                   
                    var hoursElapsed = (result - minutesElapsed) / 60;
                    var r
                    if (minutesElapsed > 0 && minutesElapsed < 10) {
                       
                        var ext = '0' + minutesElapsed
                  
                        r = hoursElapsed + ':' + ext
                      

                    }
                    else if(minutesElapsed>10)
                    {
                        r = hoursElapsed + ':' + minutesElapsed
                

                    }
                    else  {
                        r = hoursElapsed
                    }

                
              
                    $('#WorkingHrs'+slno).text(r);

                 
                }
              
            }
           
        


     
        var nextId = slno + 1;
        $('#outtime' + nextId).focus();        
    }
    else if(key==8)
    {
        $('#WorkingHrs' + slno).text(0);
        $("#txttype" + slno).attr("disabled", false);
    }
}
var diffkey = 0;

function warningshow(message, Id) {
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}



function timediffblur(slno, e) {
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if (diffkey != 1) {
        if ($('#outtime' + slno).val() != '') {
            $("#txttype" + slno).attr("disabled", false);


            if ($('#intime' + slno).val() == '' && $('#outtime' + slno).val() != '') {
                warningshow('Please Enter In Time', '#intime' + slno);
            }
            else {

                var startTime = $('#intime' + slno).val();
                var endTime = $('#outtime' + slno).val();

                if (startTime != '' && endTime != '') {
                    var startTimeArray = startTime.split(":");
                    var startInputHrs = parseInt(startTimeArray[0]);
                    var startInputMins = parseInt(startTimeArray[1]);

                    var endTimeArray = endTime.split(":");
                    var endInputHrs = parseInt(endTimeArray[0]);
                    var endInputMins = parseInt(endTimeArray[1]);

                    var startMin = startInputHrs * 60 + startInputMins;
                    var endMin = endInputHrs * 60 + endInputMins;

                    var result;

                    if (endMin < startMin) {
                        var minutesPerDay = 24 * 60;
                        result = minutesPerDay - startMin;  // Minutes till midnight
                        result += endMin; // Minutes in the next day
                    } else {
                        result = endMin - startMin;
                    }
                    var minutesElapsed = result % 60;
                    var hoursElapsed = (result - minutesElapsed) / 60;
                    var r
                    if (minutesElapsed > 0 && minutesElapsed < 10) {

                        var ext = '0' + minutesElapsed

                        r = hoursElapsed + ':' + ext


                    }
                    else if (minutesElapsed > 10) {
                        r = hoursElapsed + ':' + minutesElapsed


                    }
                    else {
                        r = hoursElapsed
                    }
                    $('#WorkingHrs' + slno).text(r)
                }

            }
        }
        else if (key == 8) {
            $('#WorkingHrs' + slno).text(0);
            $("#txttype" + slno).attr("disabled", false);
        }

    }

}
var enterflag = 0;
function a(slno, e) {

    Id = slno;
    if (enterflag != 1 && touchflag == 0) {
        if (document.getElementById('Holidaycheck').checked ) {
            if ($('#intime' + Id).val() != '') {
                $('#Absent' + Id).hide();
                $('#Present' + Id).show();
                $('#flag' + Id).text('2');
                $('#txttype' + Id).val("F");
            }
        }
        else {

            if ($('#intime' + Id).val() != '') {
                $('#Absent' + Id).hide();
                $('#Present' + Id).show();
                $('#flag' + Id).text('1');
                $('#txttype' + Id).val("F");
            }
        }
        
        if ($('#intime' + Id).val() == '') {
            $('#Absent' + Id).show();
            $('#Present' + Id).hide();
            $('#flag' + Id).text('0');
        }

    }    
}
//function isNumbercheck(evt, selectedvalue) {
//    var charCode = (evt.which) ? evt.which : event.keyCode
//    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
//    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
//        evt.preventDefault();
//        warningshow('Digits Only')
//        return false;
//    }
//    return true;
//}
//$('#setTimeButton').on('click', function () {
//    $('#setTimeExample').timepicker('setTime', new Date());
//});








function disable_datatable(tablename) {
   
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}


//------flag------//
//present-----1
//Absent------0
//public holiday work-2 -f
//2-h
//---saveflag--//
//final save-2
//save-1

