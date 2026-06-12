$(document).ready(function () {
    Defaultfocus();
    MedicalDepartmentLoad();

    $('#myModal').on('shown.bs.modal', function () {
        $('#NormalValue_0').focus();
    })

    $("#btnsubmit").click(function (e) {
        SaveandUpdateTest(1);
    });
    $("#btnlist").click(function (e) {
        GetRows(0);
        formrefresh();
    });
    $("#btnnew").click(function (e) {
        formrefresh();
    });
    $("#btndelete").click(function (e) {
        SaveandUpdateTest(0);
    });


    $('#MedDept').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#SubDivision').focus();
        }
    });
    $('#SubDivision').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            if ($.trim($("#TestName").val()) == '') {
                warningshow('Enter Test Name', 'TestName');
            }
            else if (parseFloat($("#Rate").val() || 0) == 0) {
                warningshow('Enter Rate', 'Rate');
            }
            else if (parseInt($("#MedDept").val() || 0) == 0) {
                warningshow('Select Department', 'MedDept');
            }
           else if ($("#SubDivision").val() == 'NO') {
                $('#SubDiv_1').prop("disabled", true);
                $('#SubDiv_1').val($("#TestName").val());
                $("#StdUnit_1").focus();
                $('#StdUnit_1').select();
            }
            else if ($("#SubDivision").val() == 'YES') {
                $('#SubDiv_1').prop("disabled", false);
                $('#SubDiv_1').focus();
                $('#SubDiv_1').select();
            }
            else {
                warningshow('Select Sub Division', 'SubDivision');
            }
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
});

function CheckTestType() {
    if ($("#SubDivision").val() == 'NO') {
        $('#SubDiv_1').prop("disabled", true);
        $('#SubDiv_1').val($("#TestName").val())
    }
}

function MedicalDepartmentLoad() {
    var data = {};                                       //dropdownbind
    data.DepId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/MedDeptGetandGets",
        data: data,
        success: function (result) {
            if (result.oList.length > 0) {
                $("#MedDept").empty();
                $("#MedDept").append("<option value='0'>--Select--</option>");
                for (var i = 0; i < result.oList.length; i++) {
                    $("#MedDept").append("<option value='" + result.oList[i].DepId + "'>" + result.oList[i].Department + "</option>");
                }
            }
        }
    });
}

function NextGrid(Pos, Id, e) {

    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    if ($.trim($("#TestName").val()) == '') {
        warningshow('Enter Test Name', 'TestName');
    }
    else if (parseFloat($("#Rate").val() || 0) == 0) {
        warningshow('Enter Rate', 'Rate');
    }
    else if (parseInt($("#MedDept").val() || 0) == 0) {
        warningshow('Select Department', 'MedDept');
    }
    else if (parseInt($("#SubDivision").val() || 0) == 0) {
        warningshow('Select Sub Division', 'SubDivision');
    }
    else {

        if (key == 13 || key == 39) {
            e.preventDefault();
            if (Pos == 'SubDiv_') {
                $("#StdUnit_" + Id).focus();
                $("#StdUnit_" + Id).select();
            }
            else if (Pos == 'StdUnit_') {
                $("#NormalValue_" + Id).focus();
                $("#NormalValue_" + Id).select();
            }
            else if (Pos == 'NormalValue_') {
                $("#MinVal_" + Id).focus();
                $("#MinVal_" + Id).select();
            }
            else if (Pos == 'MinVal_') {
                $("#MaxVal_" + Id).focus();
                $("#MaxVal_" + Id).select();
            }
            else if (Pos == 'MaxVal_' && key!=39) {
                if ($.trim($('#SubDiv_' + Id).val()) == '') {
                    warningshow('Enter Sub Division Name', 'SubDiv_'+Id);
                }
                //else if ($.trim($('#StdUnit_'+ Id).val()) == '') {
                //    warningshow('Enter Standard Unit', 'StdUnit_' + Id);
                //}
                //else if ($.trim($('#NormalValue_' + Id).val()) == '') {
                //    warningshow('Enter Normal Value', 'NormalValue_' + Id);
                //}
                else {
                    CheckTypeTest(Id);
                }

            }
        }
        else if (key == 40) {            // Down Arrow
            e.preventDefault();
            $('.GridText').each((i, item) => {
                var $item = $(item);
                var NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId > Id) {
                    $('#' + Pos + NextId).focus().select();
                    return false;
                }
            });
        }
        else if (key == 38) {            // Up Arrow
            e.preventDefault();
            $($('.GridText').get().reverse()).each((i, item) => {
                var $item = $(item);
                var NextId = parseInt($item.attr('id').match(/\d+/)[0]);
                if (NextId < Id) {
                    $('#' + Pos + NextId).focus().select();
                    return false;
                }
            });
        }
        else if (key == 37) {            // Left Arrow
            e.preventDefault();
            if (Pos == 'StdUnit_') {
                $("#SubDiv_" + Id).focus();
                $("#SubDiv_" + Id).select();
            }
            else if (Pos == 'NormalValue_') {
                $("#StdUnit_" + Id).focus();
                $("#StdUnit_" + Id).select();
            }
            else if (Pos == 'MinVal_') {
                $("#NormalValue_" + Id).focus();
                $("#NormalValue_" + Id).select();
            }
            else if (Pos == 'MaxVal_') {
                $("#MinVal_" + Id).focus();
                $("#MinVal_" + Id).select();
            }
        }
    }
}

function CheckType() {
    if ($("#SubDivision").val() == 'NO') {
        $('#SubDiv_1').prop("disabled", true);
        $('#SubDiv_1').val($("#TestName").val())
    }
    else if ($("#SubDivision").val() == 'YES') {
        $('#SubDiv_1').prop("disabled", false);
    }
}

function Defaultfocus() {
    $("#TestName").focus();
}

function CheckTypeTest(Id) {
    if ($("#SubDivision").val() == 'YES') {
        if ($.trim($("#TestName").val()) == '') {
            warningshow('Enter Test Name', 'TestName');
        }
        else if (parseFloat($("#Rate").val() || 0) == 0) {
            warningshow('Enter Rate', 'Rate');
        }
        else if (parseInt($("#MedDept").val() || 0) == 0) {
            warningshow('Select Department', 'MedDept');
        }
        else if (parseInt($("#SubDivision").val() || 0) == 0) {
            warningshow('Select Sub Division', 'SubDivision');
        }
        else {
            var NextId;

            try { NextId = ($('#row_' + Id).closest('tr').next('tr').attr('id')).match(/\d+/)[0]; }
            catch (err) { AddToGrid(); return false;}


            if ($('#SubDiv_' + NextId).length) {
                $("#SubDiv_" + NextId).focus();
            }
            else{
            AddToGrid();
            }
        }
    }
}

function AddToGrid() {
    var no = $('#tbl_testsub tr').length + 1;
    if ($('#tbl_testsub tr').length == 1) {
        $("#GridLength").val(1)
    }
    var id = parseInt($("#GridLength").val()) + 1;
    var ProdEditRow = "<tr class='jsgrid-row addedtr' id='row_" + id + "' >" +
        "<td id='edit_" + id + "' class= 'jsgrid-cell p-1 GridBRow  jsgrid-control-field jsgrid-align-center'  style='width:4%;' >" +
        "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete >" +
        "</td>" +
        "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:6%;text-align:center' >" + no +
        "<input type='hidden' id='SubTestId_" + id + "' value='0' />" +
        "</td>" +
        "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:22%;' >" +
        "<input type='text' class='form-control GridText' id='SubDiv_" + id + "' onkeydown=NextGrid(\'SubDiv_\',\'" + id + "\',event) />" +
        "</td>" +
        "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:20%;display:none;' >" +
        "<input type='text' class='form-control demed GridText' value='" + $("#MedDept").find("option:selected").text() + "' id='Department_" + id + "' disabled style='background-color:white;' />" +
        "</td>" +
        "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
        "<input type='text' class='form-control GridText' id='StdUnit_" + id + "' onkeydown=NextGrid(\'StdUnit_\',\'" + id + "\',event) />" +
        "</td>" +
         "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:26%;' >" +
        "<input type='text' class='form-control GridText' id='NormalValue_" + id + "' ondblclick=ShowModal(\'" + id + "\') onkeydown=NextGrid(\'NormalValue_\',\'" + id + "\',event) />" +
        "</td>" +
         "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
        "<input type='text' class='form-control GridText' id='MinVal_" + id + "' onkeydown=NextGrid(\'MinVal_\',\'" + id + "\',event) onkeypress='isNumber_Arrow(event,this)' />" +
        "</td>" +
         "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
        "<input type='text' class='form-control GridText' id='MaxVal_" + id + "' onkeydown=NextGrid(\'MaxVal_\',\'" + id + "\',event) onkeypress='isNumber_Arrow(event,this)' />" +
        "</td>" +
        "</tr>";
    $('#tbl_testsub').append(ProdEditRow);
    $("#GridLength").val(Number($("#GridLength").val()) + Number(1));
    $("#SubDiv_" + id).focus();
}

function formrefresh() {
    $('.addedtr').remove();
    $('.denull,.GridText').val('');
    $('.dezero').val(0);
    $('#btndelete').hide();
    $('#GridLength').val(1);
    $("#SubDiv_1").prop("disabled", false);
}

function SaveandUpdateTest(Flag) {
    if ($.trim($("#TestName").val()) == '') {
        warningshow('Enter Test Name', 'TestName');
    }
    else if (parseFloat($("#Rate").val() || 0) == 0) {
        warningshow('Enter Rate', 'Rate');
    }
    else if (parseInt($("#MedDept").val() || 0) == 0) {
        warningshow('Select Department', 'MedDept');
    }
    else if (parseInt($("#SubDivision").val() || 0) == 0) {
        warningshow('Select Sub Division', 'SubDivision');
    }
    else if ($.trim($('#SubDiv_1').val()) == '') {
        warningshow('Enter Sub Division Name', 'SubDiv_1');
    }
    //else if ($.trim($('#StdUnit_1').val()) == '') {
    //    warningshow('Enter Standard Unit', 'StdUnit_1');
    //}
    //else if ($.trim($('#NormalValue_1').val()) == '') {
    //    warningshow('Enter Normal Value', 'NormalValue_1');
    //}
    else {
        if (parseInt($('#TestId').val() || 0) == 0) {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Save'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to save this Test?');
        }
        else if (Flag == 1) {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to update this Test?');
        }
        else {
            $('#confirm').show();
            $('#confirmOk').prop("disabled", false);
            $('#confirmOk').focus();
            $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to delete this Test?');
        }

    }
}

function OKSaveandUpdateTest(Flag) {
    var oArray = new Array();

    for (var k = 1; k <= $("#GridLength").val() ; k++) {

        var TestId = $('#TestId').val();
        var TestName = $.trim($('#TestName').val());
        var Rate = parseFloat($('#Rate').val() || 0).toFixed(Decimal);
        var SpRate = parseFloat($('#SpRate').val() || 0).toFixed(Decimal);
        var VSpRate = parseFloat($('#VSpRate').val() || 0).toFixed(Decimal);
        var OutsideRate = parseFloat($('#OutsideRate').val() || 0).toFixed(Decimal);
        var MedDept = $('#MedDept').val();
        var SubDivision = $('#SubDivision').val();
        var SubTestId = $("#SubTestId_" + k).val();
        var SubDiv = $.trim($('#SubDiv_' + k).val());
        var StdUnit = $.trim($('#StdUnit_' + k).val());
        var NormalValue = $.trim($('#NormalValue_' + k).val());
        var MinValue = parseFloat($("#MinVal_" + k).val() || 0);
        var MaxValue = parseFloat($("#MaxVal_" + k).val() || 0);
        var Notes = $.trim($("#Notes").val());
        var DeptId = ERPDeptId;
        var UserId = ERPUserId;
        var DelFlag = Flag;
        var EXRate = 0;


        if (!(typeof SubDiv == "undefined") && SubDiv!='') {

            oArray.push({
                'TestId': TestId,
                'TestName': TestName,
                'Rate': Rate,
                'SpRate': SpRate,
                'VSpRate': VSpRate,
                'OutsideRate': OutsideRate,
                'MedDept': MedDept,
                'SubDivision': SubDivision,
                'SubTestId':SubTestId,
                'SubDiv': SubDiv,
                'StdUnit': StdUnit,
                'NormalValue': NormalValue,
                'MinValue': MinValue,
                'MaxValue':MaxValue,
                'Notes':Notes,
                'DeptId': DeptId,
                'UserId': UserId,
                'DelFlag': DelFlag,
                'EXRate': EXRate

            })
        }
    }

    if (oArray != "") {

        var data = { 'HMSTest': oArray };
        $.ajax({
            type: "POST",
            url: "../Revisit/Hms_TestInsertandUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                Showalerts(status);
            }
        });
    }
    else {
        warningshow('Datas are not complete', 'TestName');

    }
}

function GetRows(Flag) {
    var data = {};                                       //dropdownbind
    data.TestId = Flag;
    data.DeptId = ERPDeptId;

    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_TestGetandGets",
        data: data,
        success: function (result) {
            if (Flag == 0) {
                GetList(result.oList);
            } else {
                GetTest(result.oList);
            }
        }
    });
}

function GetList(result) {
    $("#listing").show();
    $("#Entry").hide();

    disable_datatable('tbl_Test');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Test Name</th>" +
        "<th>Rate</th>" +
        "<th>Special Rate</th>" +
        "<th>Special Rate-1</th>" +
        "<th>Outside Rate</th>" +
        "<th>Department</th>" +
        "<th>Sub Division</th>" +
        "<th>Edit</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {



        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].TestName + '</td>' +
            '<td align="right">' + parseFloat(result[i].Rate||0).toFixed(Decimal) + '</td>' +
            '<td align="right">' + parseFloat(result[i].SpRate||0).toFixed(Decimal) + '</td>' +
            '<td align="right">' + parseFloat(result[i].VSpRate||0).toFixed(Decimal) + '</td>' +
            '<td align="right">' + parseFloat(result[i].OutsideRate || 0).toFixed(Decimal) + '</td>' +
            '<td>' + result[i].MedDeptName + '</td>' +
            '<td>' + result[i].SubDivision + '</td>' +
            '<td onclick="GetRows(' + result[i].TestId + ')" align=center><a>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tbl_Test').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th>Test Name</th>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th> </th>" +
        "<th>Department</th>" +
        "<th>SubDiv</th>" +
        "<th> </th>" +
        "</tr></tfoot>");
    datatableWithsearch('tbl_Test');
    $("#popupdiv").hide();
}
function GetTest(result) {
    $("#listing").hide();
    $("#Entry,#btndelete").show();
    if (result.length > 0) {
        $('#TestId').val(result[0].TestId);
        $('#TestName').val(result[0].TestName);
        $('#Rate').val(parseFloat(result[0].Rate || 0).toFixed(Decimal));
        $('#SpRate').val(parseFloat(result[0].SpRate || 0).toFixed(Decimal));
        $('#VSpRate').val(parseFloat(result[0].VSpRate || 0).toFixed(Decimal));
        $('#OutsideRate').val(parseFloat(result[0].OutsideRate || 0).toFixed(Decimal));
        $('#MedDept').val(result[0].MedDept);
        $('#SubDivision').val(result[0].SubDivision);
        $('#SubDiv_1').val(result[0].SubDiv);
        $('#Department_1').val($("#MedDept").find("option:selected").text());
        $('#StdUnit_1').val(result[0].StdUnit);
        $('#NormalValue_1').val(result[0].NormalValue);
        $("#SubTestId_1").val(result[0].SubTestId);
        $('#MinVal_1').val(result[0].MinValue);
        $("#MaxVal_1").val(result[0].MaxValue);
        $("#Notes").val(result[0].Notes);

        for (var i = 1; i < result.length; i++) {
            var id = i + 1;
            var ProdEditRow = "<tr class='jsgrid-row addedtr' id='row_" + id + "' >" +
                "<td id='edit_" + id + "' class= 'jsgrid-cell p-1 GridBRow  jsgrid-control-field jsgrid-align-center'  style='width:4%;' >" +
                "<input class='jsgrid-button jsgrid-delete-button'  type= button onclick='DeleteRow(" + id + ")'  title= Delete >" +
                "</td>" +
                "<td id='td_" + id + "' class='jsgrid-cell p-1 GridBRow'  style= 'width:6%;text-align:center' >" + id +
                "<input type='hidden' id='SubTestId_"+id+"' value='"+result[i].SubTestId+"' />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:22%;' >" +
                "<input type='text' class='form-control GridText' id='SubDiv_" + id + "' value='" + result[i].SubDiv + "' onkeydown=NextGrid(\'SubDiv_\',\'" + id + "\',event) />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:20%;display:none;' >" +
                "<input type='text' class='form-control demed GridText' value='" + $("#MedDept").find("option:selected").text() + "' id='Department_" + id + "' disabled style='background-color:white;' />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
                "<input type='text' class='form-control GridText' id='StdUnit_" + id + "' value='" + result[i].StdUnit + "' onkeydown=NextGrid(\'StdUnit_\',\'" + id + "\',event) />" +
                "</td>" +
                 "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:26%;' >" +
                "<input type='text' class='form-control GridText' id='NormalValue_" + id + "' ondblclick=ShowModal(\'" + id + "\') value='" + result[i].NormalValue + "' onkeydown=NextGrid(\'NormalValue_\',\'" + id + "\',event) />" +
                "</td>" +
                "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
                "<input type='text' class='form-control GridText' id='MinVal_" + id + "' value='" + result[i].MinValue + "' onkeydown=NextGrid(\'MinVal_\',\'" + id + "\',event)  onkeypress='isNumber_Arrow(event,this)' />" +
                "</td>" +
                 "<td class='jsgrid-cell p-1 GridBRow'  style= 'width:13%;' >" +
                "<input type='text' class='form-control GridText' id='MaxVal_" + id + "' value='" + result[i].MaxValue + "' onkeydown=NextGrid(\'MaxVal_\',\'" + id + "\',event)  onkeypress='isNumber_Arrow(event,this)' />" +
                "</td>" +
                "</tr>";
            $('#tbl_testsub').append(ProdEditRow);
            
        }
        if ($('#SubDivision').val() == 'NO') { $("#SubDiv_1").prop("disabled", true); }
        $("#GridLength").val(result.length);

        $("#TestName").focus();
    }
}

function closelist() {

    $("#listing").hide();
    $("#Entry").show();
    Defaultfocus();
}

function DeleteRow(RowId){
    $('#confirm').show();
    $('#confirmOk').prop("disabled", false);
    $('#confirmOk').focus();
    $('#Confirmflag').val('DeleteRow'); $('#ConfirmRowId').val(RowId);
    $('#confirmmessage').text('Do you want Delete this record?')
}
function OkDeleteRow(RowId) {
    $('#row_' + RowId).remove();
    var slno = 1;
    for (var j = 1; j <= $("#GridLength").val(); j++) {
        if ($('#SubDiv_' + j).val() != undefined) {
            $('#td_' + j).text(slno);
            slno++;           
        }
    }
}

function ngOnDestroy(Flag) {
    if (Flag == 1) {
        var Id = $("#CrntNormalId").val();
        $("#NormalValue_" + Id).val($("#NormalValue_0").val());
    }
    $("#myModal").modal("hide");
    $("body>#EditModal").remove();
    $("#NormalValue_" + Id).focus();
}

function ShowModal(Id) {
    $("#NormalValue_0").val($("#NormalValue_" + Id).val());
    $("#NormalValue_" + Id).blur()
    $("#CrntNormalId").val(Id);
    $("#myModal").modal("show");
    $("#myModal").appendTo("body");
}

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'DeleteRow') {
        OkDeleteRow(rowid)
    }
    else if (Result == 'true' && status == 'Save') {
        OKSaveandUpdateTest(rowid)
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveandUpdateTest(rowid)
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveandUpdateTest(rowid)
    }
    $('#confirm').fadeOut();
}
//Show Window Alert Insert,update delete  Modify
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
    else if (Status == 4) {
        formrefresh();
        swal('Cannot Deleted', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

function ChangeMedDept() {
    $('.demed').val($("#MedDept").find("option:selected").text());
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

function isNumber(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}

function isNumber_Arrow(evt, selectedvalue) {
    //var charCode = (evt.which) ? evt.which : event.keyCode
    //$(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    //if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
    //    evt.preventDefault();
    //    warningshow('Digits Only')
    //    return false;
    //}
    //return true;


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


function disable_datatable(tablename, tableButtonContainerId) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        if (tableButtonContainerId) { $("#" + tableButtonContainerId).empty(); }
        return;
    }
}


function datatableWithsearch(tablename, download, title, tableButtonContainerId) {

    $('#' + tablename).DataTable({
        "pageLength": 3000,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                title: 'Lab Test List',
                messageTop: '',
                exportOptions: {
                    columns: [0, ':visible']
                }
            },
             {
                 extend: 'print',
                 title: 'Lab Test List',
                 messageTop: '',
                 
             },

            {
                extend: 'excelHtml5',
                title: 'Lab Test List',
                messageTop: '',
                exportOptions: {
                    columns: [0, ':visible']
                }
               
            },

            {
                extend: 'pdfHtml5',
                title: 'Lab Test List',
                messageTop: '',
                exportOptions: {
                    columns: [0, ':visible']
                }
               
            }
        ]
    });
}
