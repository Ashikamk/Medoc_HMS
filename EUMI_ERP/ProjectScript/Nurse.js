$(document).ready(function () {
    Defaultfocus();
    LoadDepartment();
    $("#selectedImage").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    $("#QuaAdd").click(function (e) {
        QualificationAdd();
    });
    $('#NuUser').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13)
        {
            $("#base-tab2").click();
            $("#NuQualification1").focus().select();
        }
    });
    $('#NuAddress3').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $("#base-tab1").click();
            $("#NuDept").focus().select();
        }
    });
    $('.enterflow').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13 && $(this).attr("id") != 'NuUser' && $(this).attr("id") != 'NuQualification1' && $(this).attr("id") != 'NuAddress3') {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled,select:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }

    });
    $('#QuaAdd').focus(function (e) {
        $("#QuaAdd").removeClass('btn-outline-primary');
        $("#QuaAdd").addClass('btn-primary');
    });
    $('#QuaAdd').focusout(function (e) {
        $("#QuaAdd").removeClass('btn-primary');
        $("#QuaAdd").addClass('btn-outline-primary');
    });

    $("#btnnew").click(function (e) {
        formrefresh(0);
    });
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1);
    });
    $("#btnlist").click(function (e) {
        formrefresh(1);
        GetRows(0);
    });
    $("#btndelete").click(function (e) {
        SaveAndUpdate(0);
    });
});

function LoadDepartment(){
    var data = {};
    data.Id = 0;
    $.ajax({

        type: "POST",
        url: "../Master/MedDeptGetandGets",
        data: data,
        success: function (result) {
            ShowDept(result.oList);
        }

    });
}

function ShowDept(result) {

    $("#NuDept").empty();
    $("#NuDept").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#NuDept").append("<option value='" + result[i].DepId + "'  >" + result[i].Department + "</option>");
    }
}

function SaveAndUpdate(Flag) {

    if(Flag==0)
    {
        $('#confirm').show();
        $('#confirmOk').focus();
        $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(Flag);
        $('#confirmmessage').text('Do you want to Delete this Nurse?');
    }
    else if ($.trim($('#NuName').val()) == "") {
        warningshow('Please Enter Nurse Name', 'NuName');
        return false;
    }
    else if ($('#NuGender').val() == "" || $('#NuGender').val() == 0 || $('#NuGender').val() == undefined || $('#NuGender').val() == null) {
        warningshow('Please Select Gender', 'NuGender');
        return false;
    }
    else if ($.trim($('#NuMobile').val()) == "") {
        warningshow('Please Enter Mobile Number', 'NuMobile');
        return false;
    }
    else if ($.trim($('#NuAddress1').val()) == "") {
        warningshow('Please Enter Address', 'NuAddress1');
        return false;
    }
    else if ($('#NuDept').val() == "" || $('#NuDept').val() == 0 || $('#NuDept').val() == undefined || $('#NuDept').val() == null) {
        $("#base-tab1").click();
        warningshow('Please Select Department', 'NuDept');
        return false;
    }
    else if ($.trim($('#NuSpecialization').val()) == "") {
        $("#base-tab1").click();
        warningshow('Please Enter Specialization', 'NuSpecialization');
        return false;
    }
    else if ($.trim($('#NuQualification1').val()) == "") {
        $("#base-tab2").click();
        warningshow('Please Enter Qualification', 'NuQualification1');
        return false;
    }
    else {
        if (parseInt($("#NurseId").val() || 0) == 0) {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Save'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to Save this Nurse?');
        }
        else {
            $('#confirm').show();
            $('#confirmOk').focus();
            $('#Confirmflag').val('Update'); $('#ConfirmRowId').val(Flag);
            $('#confirmmessage').text('Do you want to Modify this Nurse?');
        }
    }
}

function OKSaveAndUpdate(Flag) {

    var data = {};
    data.NurseId = parseInt($("#NurseId").val()||0);
    data.NuName = $.trim($("#NuName").val());
    data.NuDept = parseInt($("#NuDept").val()||0);
    data.NuUserId = parseInt($("#NuUserId").val()||0);
    data.NuGender = parseInt($("#NuGender").val());
    data.NuMobile = $.trim($("#NuMobile").val());
    data.NuPhone = $.trim($("#NuPhone").val());
    data.NuEmail = $.trim($("#NuEmail").val());
    data.NuLanguage = $.trim($("#NuLanguage").val());
    data.NuAddress1 = $.trim($("#NuAddress1").val());
    data.NuAddress2 = $.trim($("#NuAddress2").val());
    data.NuAddress3 = $.trim($("#NuAddress3").val());
    data.NuSpecialization = $.trim($("#NuSpecialization").val());
    data.NuExperience = $.trim($("#NuExperience").val());
    data.NuDesignation = $.trim($("#NuDesignation").val());
    data.NuTraining = $.trim($("#NuTraining").val());
    data.NuCertification = $.trim($("#NuCertification").val());
    data.NuAcheivement = $.trim($("#NuAcheivement").val());
    data.NuQualification1 = $.trim($("#NuQualification1").val());
    data.NuQualification2 = $.trim($("#NuQualification2").val());
    data.NuQualification3 = $.trim($("#NuQualification3").val());
    data.NuQualification4 = $.trim($("#NuQualification4").val());
    data.NuQualification5 = $.trim($("#NuQualification5").val());
    data.NuImgName = $.trim($("#selectedImage").val());
    data.DelFlag = Flag;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_NurseInsertAndUpdate",
        data: data,
        success: function (result) {

            if (result.oList.length > 0) {
                var status = result.oList[0].Status;
                var NurseId = result.oList[0].NurseId;
                Showalerts(status);
                if (document.getElementById('selectedImage').files.length > 0 && Flag != 0) {
                    formrefresh(1);
                    CreateFolder(NurseId);
                }
                else {
                    formrefresh(0);
                }
            }
            else {
                alert("Error")
            }
        }
    });

}

function CreateFolder(NurseId) {
    var data = {};
    data.NurseId = NurseId;
    $.ajax({
        type: "POST",
        url: "../Revisit/NurseFolderCreate",
        data: data,
        success: function (result) {
            FileUploadFolder(NurseId);
        }
    });
}


function FileUploadFolder(NurseId) {
    // Folder Save
    var formData = new FormData();
    var browsedFile = document.getElementById("selectedImage").files[0];
    var Extension = $("#selectedImage").get(0).files[0].name.split('.').pop();
    var NurseId = NurseId;

    formData.append("FileUpload", browsedFile);
    formData.append("NurseId", NurseId);
    formData.append("Extension", Extension);

    $.ajax({
        type: "POST",
        url: '/Revisit/NurseFileUpload',
        data: formData,
        dataType: "html",
        contentType: false,
        processData: false,
        success: function (result) {            
            $("#selectedImage").val('');
            $('#myImg').attr('src', "../app-assets/img/portrait/medium/avatar-m-100.jpg");
            
        }
    });
}

function GetRows(NurseId) {
    var data = {};
    data.NurseId = NurseId;
    $.ajax({
        type: "POST",
        url: "../Revisit/HMS_NurseGetandGets",
        data: data,
        success: function (result) {

            if (NurseId == 0) {
                GetList(result);
            }
            else {
                GetNurse(result);
            }
        }
    });

}

function GetNurse(result) {
    if (result.length > 0) {
        $("#Entry,#btndelete").show();
        $("#Listing").hide();

        for (var i = 0; i < result.length; i++) {
            $("#NurseId").val(result[i].NurseId)
            $("#NuName").val(result[i].NuName)
            $("#NuDept").val(result[i].NuDept)
            $("#NuUserId").val(result[i].NuUserId)
            $("#NuGender").val(result[i].NuGender)
            $("#NuMobile").val(result[i].NuMobile)
            $("#NuPhone").val(result[i].NuPhone)
            $("#NuEmail").val(result[i].NuEmail)
            $("#NuLanguage").val(result[i].NuLanguage);
            $("#NuAddress1").val(result[i].NuAddress1);
            $("#NuAddress2").val(result[i].NuAddress2);
            $("#NuAddress3").val(result[i].NuAddress3);
            $("#NuSpecialization").val(result[i].NuSpecialization);
            $("#NuExperience").val(result[i].NuExperience);
            $("#NuDesignation").val(result[i].NuDesignation);
            $("#NuTraining").val(result[i].NuTraining);
            $("#NuCertification").val(result[i].NuCertification);
            $("#NuAcheivement").val(result[i].NuAcheivement);
            $("#NuQualification1").val(result[i].NuQualification1);
            $("#NuQualification2").val(result[i].NuQualification2);
            $("#NuQualification3").val(result[i].NuQualification3);
            $("#NuQualification4").val(result[i].NuQualification4);
            $("#NuQualification5").val(result[i].NuQualification5);
            $("#NuUser").val(result[i].Variable2);
        }

        for (var i = 2; i <= 5; i++) {
            if ($("#NuQualification" + i).val() != '') {
                $("#NuQualification" + i).show();
            }
        }

        var Ext = (result[0].NuImgName).split('.').pop();
        CheckImgValid('myImg', result[0].NurseId, Ext);

        Defaultfocus();
    }
}

function CheckImgValid(Id, NurseId, Ext) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/Nurse/" + NurseId + "/" + NurseId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/portrait/medium/avatar-m-100.jpg");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/Nurse/" + NurseId + "/" + NurseId + "." + Ext + "?" + d.getSeconds());
        }
    });
}

function GetList(result) {
    $("#Entry").hide();
    $("#Listing").show();

    disable_datatable('tbl_Nurse');
    var responseText = "<thead><tr>" +
        "<th style='align=center'>Sl#</th>" +
        "<th>Name</th>" +
        "<th>Gender</th>" +
        "<th>Mobile</th>" +
        "<th>Address</th>" +
        "<th>Department</th>" +
        "<th>Specialization</th>" +
        "<th>Experience</th>" +
        "<th>Qualification</th>" +
        "<th >Edit</th>" +
        "</tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {

        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].NuName + '</td>' +
            '<td>' + result[i].Variable3 + '</td>' +
            '<td>' + result[i].NuMobile + '</td>' +
            '<td>' + result[i].NuAddress1 + '</td>' +
            '<td>' + result[i].Variable1 + '</td>' +
            '<td>' + result[i].NuSpecialization + '</td>' +
            '<td>' + result[i].NuExperience + '</td>' +
            '<td>' + result[i].NuQualification1 + '</td>' +
            '<td onclick="GetRows(' + result[i].NurseId + ')" align=center><a>' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tbl_Nurse').html(responseText + "</tbody><tfoot><tr>" +
        "<th> </th>" +
        "<th>Name</th>" +
        "<th>Gender</th>" +
        "<th>Mobile</th>" +
        "<th>Address</th>" +
        "<th>Department</th>" +
        "<th>Specialization</th>" +
        "<th>Experience</th>" +
        "<th>Qualification</th>" +
        "<th> </th>" +
        "</tr></tfoot>");
    var title='Nurse Info'
    datatableWithsearch('tbl_Nurse',true,title,'itemListButtonPlace');
}

function Showalerts(Status) {
    if (Status == 1) {
        swal('Data Saved Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 2) {
        swal('Data Updated Successfully', "", "success");
        $('.swal-button swal-button--confirm').focus();

    }
    else if (Status == 3) {
        swal('Data Deleted Successfully', "", "error");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}

function formrefresh(Flag) {
    $('.denull').val('');
    $('.dezero').val(0);
    $('#NuGender').val(2);

    $("#NuQualification2,#NuQualification3,#NuQualification4,#NuQualification5,#btndelete").hide();


    if (Flag == 0) {
        $('#selectedImage').val('');
        $('#myImg').attr('src', "../app-assets/img/portrait/medium/avatar-m-100.jpg");
        $("#Entry").show();
        $("#Listing").hide();
    }
    $("#base-tab1").click();
    Defaultfocus();
}

function ConfirmboxResult(Result, status, rowid) {

    if (Result == 'true' && status == 'Save') {
        OKSaveAndUpdate(rowid);
    }
    else if (Result == 'true' && status == 'Update') {
        OKSaveAndUpdate(rowid);
    }
    else if (Result == 'true' && status == 'Delete') {
        OKSaveAndUpdate(rowid);
    }

    $('#confirm').fadeOut();

}

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
}

function validate(file) {
    var ext = file.split(".");
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ["jpg", "jpeg", "png", "bmp", "gif", "jfif", "tiff"];

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        warningshow("Wrong extension type.");
        $("#selectedImage").val("");
    }
}

function Validateemail() {
    var email = $('#NuEmail').val();
    if (email != '') {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) {
            warningshow('Please Enter a valid Email', 'NuEmail');
            return (false);
        }
        else
            return true;
    }
    else
        return true;
}

function QualificationAdd() {
    if (!($('#NuQualification2').is(':visible'))) {
        $("#NuQualification2").slideDown();
        return true;
    }
    else if (!($('#NuQualification3').is(':visible'))) {
        $("#NuQualification3").slideDown();
        return true;
    }
    else if (!($('#NuQualification4').is(':visible'))) {
        $("#NuQualification4").slideDown();
        return true;
    }
    else if (!($('#NuQualification5').is(':visible'))) {
        $("#NuQualification5").slideDown();
        return true;
    }
    else {
        return false;
    }
}

function Defaultfocus() {
    $("#NuName").focus().select();
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
            buttons: [],
             "columnDefs": [
                                    { "width": "2%", "targets": 0 },
                                    { "width": "17%", "targets": 1 },
                                    { "width": "5%", "targets": 2 },
                                    { "width": "7%", "targets": 3 },
                                    { "width": "16%", "targets": 4 },
                                    { "width": "15%", "targets": 5 },
                                    { "width": "12%", "targets": 6 },
                                    { "width": "12%", "targets": 7 },
                                    { "width": "12%", "targets": 8 },
                                    { "width": "2%", "targets": 9 },
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
        table = $('#' + tablename).DataTable({
           
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