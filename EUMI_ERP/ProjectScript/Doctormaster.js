$(document).ready(function () {
    Defaultfocus();
    $('#txt_docname').focus();
    $('.form-control').attr('autocomplete', 'off');
    $("#btnsubmitdoc").click(function (e) {
        SaveAndUpdate(1)


    });
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
    $("#btndeleteshift").click(function (e) {
        $('#confirmmessageshift').text('Do You Want To Delete This Record?')
        $('#confirmshift').show();
        $('#confirmOkshift').focus();
        $('#Confirmflagshift').val('delete');
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
    $('.frsdwn').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsdwn:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        }
    });
    $('#txt_doclang').keydown(function (e) {
       
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#CELL2").click();
            $('#txt_docfee').focus().select();
        }
    });
    $('#txtacheive').keydown(function (e) {

        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            $('#User').focus().select();
        }
    });
    $('#txt_docawards').keydown(function (e) {
       
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $("#tab2").click();
            $('#txtcn1').focus().select();
        } 
    });
    $(document).keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 27) {
            e.preventDefault();
            ngOnDestroy();
        }

    });
    $('.frsup').keydown(function (e) {

   
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
         
            e.preventDefault();
            var inputs = $(this).closest('form').find('.frsup:enabled');
            inputs.eq(inputs.index(this) + 1).focus().select();
        } 
    });



});//Document Close

function ShowDept(result) {

    $("#txt_docdeptname").empty();
    $("#txt_docdeptname").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#txt_docdeptname").append("<option value='" + result[i].DepId + "'  >" + result[i].Department + "</option>");
    }
}



function Defaultfocus() {
    $('#txt_docname').focus();
}

function SaveAndUpdate(Flag) {
   
    var fname = '';
    var fi = document.getElementById('selectedImage');

    for (var i = 0; i <= fi.files.length - 1; i++) {
        if (fname == '')
        { fname = fi.files.item(i).name; }
        else { fname = fname + ',' + fi.files.item(i).name; }
    }

    if ((fname == '') && (($('#DoctorId').val()) > 0)) {
        fname = $('#ImgName').val();
    }
  
    if ($('#txt_docname').val() == "") {
        $("#tab1").click();
        warningshow('Please Enter Name', 'txt_docname');
    }
    //else if (($('#txt_docdeptname').val() || 0) == 0) {
    //    $("#tab1").click();
    //    warningshow('Please Enter Department', 'txt_docdeptname');
    //}
    else if ($('#txt_docadd1').val() == "") {
        $("#tab1").click();
        warningshow('Please Enter Address', 'txt_docadd1');
    }
    //else if (txt_docmob.value.length <= 9 || txt_docmob.value.length >= 15) {
    //    $("#tab1").click();
    //    warningshow('Please Enter a Valid Number', 'txt_docmob');
    //}

    else if ($('#txt_docmob').val() == "") {
        $("#tab1").click();
        warningshow('Please Enter Mobile number', 'txt_docmob');
    }
    //else if ($('#txt_docmob').val() == $('#txt_docphn').val()) {
    //    $("#tab1").click();
    //    warningshow('Mobile Number and Phone Number cannot be same', 'txt_docmob');
    //}
   
    //else if ($('#txtcn1').val() == "") {
    //    $("#tab2").click();
    //    warningshow('Please Enter Qualification', 'txtcn1');
    //}


    //else if ($('#txt_docemail').val() == "") {
    //    $("#tab1").click();
    //    warningshow('Please Enter Email', 'txt_docemail');
    //}
    //else if ($('#txt_docspl').val() == "") {
    //    $("#tab1").click();
    //    warningshow('Please Enter Specialization', 'txt_docspl');
    //}
    //else if (Validateemail() == false) {
    //    return Validateemail();
    //}
    else {
        $('#btnsubmitdoc').prop('disabled', true);
        var s;
        var data = {};   //array
        if ($('#select_prop').prop("checked")==true)
             s = 1;
        else
             s = 0;

        data.Active = s;
        data.Name = $.trim($('#txt_docname').val());
        data.Email = $('#txt_docemail').val();
        data.Department = $('#txt_docdeptname').val();
        data.MobileNumber = $.trim($('#txt_docmob').val());
        data.PhoneNumber = $.trim($('#txt_docphn').val());
        data.Consultancy = $('#txt_docfee').val();
        data.Experience = $('#txt_docexp').val();
        data.Specialization = $('#txt_docspl').val();
        data.Address1 = $('#txt_docadd1').val();
        data.Address2 = $('#txt_docadd2').val();
        data.DoctorsId = $('#DoctorsId').val();
        data.Gender = $('#txt_docgender').val();
        data.selectedImage = fname;
        data.Designation = $('#txt_docdesignation').val();
        data.Training = 1;//$('#txt_doctraining').val();
        data.Acheivement = $('#txtacheive').val();
        data.Certification = $('#txt_docawards').val();
        data.Language = $('#txt_doclang').val();
        data.Qualification = $('#txtcn1').val();
        data.Qualification1 = $('#Subdoc_1').val();
        data.Qualification2 = $('#Subdoc_2').val();
        data.Qualification3 = $('#Subdoc_3').val();
        data.Qualification4 = $('#Subdoc_4').val();
        data.Doctor_UserId = parseInt($('#UserId').val()||0);
        data.DelFlag = Flag;
        console.log(data)
        $.ajax({
            type: "POST",
            url: "../Master/DoctorInsertandUpdate",
            data: data,
            success: function (result) {
             
                 var DoctorId = result.oList[0].DoctorsId;
                    var statusdoc = result.oList[0].Statusdoc;
                    $('#btnsubmitdoc').prop('disabled', false);
                    Showalertsdoc(statusdoc);
          
                    if (statusdoc == 1 || statusdoc == 2) {
                        fnImageSave(fname, DoctorId, statusdoc);
                    }
            }
       
                
          
        });
     
       
    }
   

}

//Numeric Only Text Boxes with Decimal Point

function PisNumber(evt, selectedvalue) {
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

function PisNumberInt(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}

function check() {


    var mobile = document.getElementById('txt_docmob');


    var message = document.getElementById('message');

    var goodColor = "#0C6";
    var badColor = "#1cbcd8";

    if (mobile.value.length <= 9 || mobile.value.length >= 15) {

        mobile.style.backgroundColor = badColor;
        message.style.color = badColor;
        warningshow('Not a Valid Number')

    }
}
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}


function formrefreshdoc(Flag) {
    $('.form-control:not(select)').val('');
    
    $('#txt_docadd1').val('');
    $('#txt_docadd2').val('');
    $('#txt_docadd3').val('');
    $('#txt_docname').val('');
    $('#txt_docdeptname').val('0');
    $('#txt_docphn').val('');
    $('#txt_docmob').val('');
    $('#txt_docemail').val('');
    $('#txt_docval').val(''); 
    $('#txt_docfee').val('');
    $('#txt_docexp').val('');
    $('#txt_docspl').val('');
    $('#txt_docgender').val('1');
    $('#txt_doclang').val('');
    $('#txt_docdesignation').val('');
    $('#txtacheive').val('');
    $('#txt_docawards').val('');
    $('#txtcn1').val('');
    $('#txt_doctraining').val('');
    
    $('#txt_docname').focus();
    $('#DoctorsId').val(0);
    $('#btndelete').hide();
    $('#Warningpopup').fadeOut();
    $('#Subdoc_2').val('');
    $('#Subdoc_3').val('');
    $('#Subdoc_4').val('');
    $('#Subdoc_5').val('');
    $('#Subdoc_1').val('');
    $('#User').val('');
    $('#UserId').val(0);
    $('#select_prop').prop("checked", true);
    $('.swal-button swal-button--confirm').focus();

    if (Flag == 1) {
        $('#selectedImage').val('');
        $('#myImg').attr('src', "../app-assets/img/NoImage.png");
    }

}


function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefreshdoc(1);
}

function ShowTermlist(result) {
    $('#Entry').hide();
    $('#listing').show();
    disable_datatable('tblcustomer');
    var responseText = "<thead><tr><th >Edit</th><th align=center>Sl#</th>" + "<th style='text-align:center;'>Name</th><th style='text-align:center;'>Department</th><th class='text-right' style='text-align:center;' >Mobile Number</th><th  style='text-align:center;' >Phone Number</th><th style='text-align:center;'>Email</th><th  style='text-align:center;' >Experience</th><th >Specialization</th><th  style='text-align:center;'>Address 1</th><th style='text-align:center;'> Address 2</th><th width=100% align=right>  Charges  </th></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td onclick="GetRowss(' + result[i].DoctorsId + ')" align=center bgcolor="#00ffff "><a>' + Editbutton + '</a></td><td align=center>' + slno + '</td><td  align=left>' + result[i].Name + '</td><td align=center>' + result[i].Department + '</td><td align=center>' + result[i].MobileNumber + '</td><td align=center >' + result[i].PhoneNumber + '</td><td align=left>' + result[i].Email + '</td><td align=center>' + result[i].Experience + '</td><td align=center >' + result[i].Specialization + '</td><td align=center>' + result[i].Address1 + '</td><td align=center>' + result[i].Address2 + '</td><td align=right>' + (result[i].Consultancy).toFixed(Decimal) + '</td></tr>';
    }
    $('#tblcustomer').html(responseText + '</tbody> <tfoot> <tr><th> </th><th> </th><th>Name</th><th>Department</th><th>MobileNumber </th><th>PhoneNumber </th><th>Email </th><th> </th><th>Specialization </th><th>Address1 </th><th> Address2</th><th> </th></tr></tfoot>');
    datatableWithsearch3('tblcustomer');
}
function CheckImgValid(Id, DoctorId, Ext) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/DoctorImage/" + DoctorId + "." + Ext + "",
        type: 'HEAD',
        error: function () {
            $('#' + Id).attr('src', "/app-assets/img/NoImage.png");
        },
        success: function () {
            $('#' + Id).attr('src', "../ProjectImages/DoctorImage/" + DoctorId + "." + Ext + "?" + d.getSeconds());
        }
    });
}
function ShowTermGet(result) {
    for (var i = 0; i < result.length; i++) {
        $('#txt_docname').val(result[i].Name);
        $('#txt_docmob').val(result[i].MobileNumber);
        $('#txt_docphn').val(result[i].PhoneNumber);
        $('#txt_docemail').val(result[i].Email);
        $('#txt_docdeptname').val(result[i].Department);
        $('#txt_docfee').val(result[i].Consultancy);
        $('#txt_docexp').val(result[i].Experience);
        $('#txt_docspl').val(result[i].Specialization);
        $('#txt_docadd1').val(result[i].Address1);
        $('#txt_docadd2').val(result[i].Address2);
     
        $('#DoctorsId').val(result[i].DoctorsId);
        $('#txt_docgender').val(result[i].Gender);
        $('#txt_docdesignation').val(result[i].Designation);
        $('#txt_doctraining').val(result[i].Training);
        $('#txtacheive').val(result[i].Acheivement);
        $('#txt_docawards').val(result[i].Certification);
        $('#txtcn1').val(result[i].Qualification); 
        $('#Subdoc_1').val(result[i].Qualification1);
        $('#Subdoc_2').val(result[i].Qualification2);
        $('#Subdoc_3').val(result[i].Qualification3);
        $('#Subdoc_4').val(result[i].Qualification4);
        $('#UserId').val(result[i].Doctor_UserId);
        $('#User').val(result[i].UserName);
        $('#ImgName').val(result[0].selectedImage);
        $('#txt_doclang').val(result[i].Language);
        if (result[i].Active == 0) {
            $('#select_prop').prop("checked", false);
        }
        else {
            $('#select_prop').prop("checked", true);
        }
    }
   
    if (result.length > 0) {
        $('#txt_docdeptname').val(result[0].DeptId);   

    }
    var Ext = (result[0].selectedImage).split('.').pop();
    CheckImgValid('myImg', result[0].DoctorsId, Ext);
    
    

    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
    $('#txt_docname').focus();
}


function Validateemail() {
    var email = $('#txt_docemail').val();
    if (email != '') {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        //var address = document.getElementById[email].value;
        if (reg.test(email) == false) {
            warningshow('Please Enter a valid Email', 'txt_docemail');
            return (false);
        }
        else
            return true;
    }
    else
        return true;

}

//Get List and Single Row from table

function GetRowss(DoctorsId) {

    $('#DoctorsId').val(DoctorsId)
    var data = {};
    data.DoctorsId = DoctorsId;
    $.ajax({
        type: "POST",
        url: "../Master/DoctorGetandGets",
        data: data,
        success: function (result) {
            if (DoctorsId == 0)
                ShowTermlist(result.oList);
            else
                ShowTermGet(result.oList);

        }
    });

}

function datatableWithsearch3(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
    

    });


    table = $('#' + tablename).DataTable({
        dom: 'Blfrtip',
        dom: "<'row'<'col-sm-1'l><'col-sm-11'f>>" +
                    "<'row'<'col-sm-12'tr>>" +
                    "<'row'<'col-sm-1'i><'col-sm-11'p>>",
        buttons: [],

    });
    new $.fn.dataTable.Buttons(table, {
        buttons: [
        {
            extend: 'collection',
            text: 'Export',
            buttons: [
                {
                    extend: 'excelHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12] }
                }
            ]
        },
        //'colvis'
        ],
        "columnDefs": [
                 
                 
                 
                 
                 

        ],
    });

    table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
    $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");


    //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
    //    var column = table.column($(this).attr('data-em-col'));
    //    console.log($(this).attr('data-em-col'));
    //    console.log(column);
    //    column.visible($(this).prop("checked"));
    //});
    //} else {
    //    table = $('#' + tablename).DataTable();
    //}
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
}

$(function () {
    $("#selectedImage").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });

});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
}




function fnImageSave(imageName, DoctorId, sts) {

    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = DoctorId;
    if ((imageName != "" && totalFiles != 0)) {
        var Exten = $("#selectedImage").get(0).files[0].name.split('.').pop();
        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", DoctorId);
            formData.append("Exten", Exten);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadDoctorImage',
                data: formData,
                dataType: "html",
                contentType: false,
                processData: false,
                success: function (result) {

                    $('#selectedImage').val('');
                    $('#myImg').attr('src', "../app-assets/img/NoImage.png");

                }
            });
        }
    }
    else {
        $('#selectedImage').val('');
        $('#myImg').attr('src', "../app-assets/img/NoImage.png");
        return;
    }

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


function ClearData(flg) {
    if (flg == 0) {
        $('.form-control:not(.notclr),#RegDate').val('');
        $('select').each((i, item) => {
            var $item = $(item);
            $item.val($item.find('option:first').val());
        });
        if (CountryId > 0)
            $("#Country").val(CountryId);

        $('#btnRevisit').hide();
    }

}
function closelist() {
    $('#txt_docname').focus();
    $('#Entry').show();
    $('#listing').hide();
    formrefreshdoc();
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





