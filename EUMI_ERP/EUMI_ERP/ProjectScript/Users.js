
var DeptLength = 0;
var Locationlength = 0;
var divisonlength = 0;

var Exdeptid = 0;
var Exlocid = 0;
var Exdivison=0


function DepartmentLoad(result) {
    $("#DepartmentName").empty();
    $("#DepartmentName").append("<option value='0'>--Select--</option>");
    DeptLength = result.length;
    $('#totdept').val(DeptLength);  
    for (var i = 0; i < result.length; i++) {
        $("#DepartmentName").append("<option value='" + result[i].DepartmentId + "'>" + result[i].DepartmentName + "</option>");
        var id = result[i].DepartmentId;
        $("#deptcheck").append("<li class=list-group-item><span class=badge badge-primary mr-2><input id='" + "sel_dept" + i + "' value='" + result[i].DepartmentId + "' type=hidden /><input id='" + "chkdepartment" + id + "' type=checkbox /></span>" + result[i].DepartmentName + "</li>");
    }
}

function LocationLoad(result) {
    $("#LocationName").empty();
    $("#LocationName").append("<option value='0'>--Select--</option>");
    Locationlength = result.length;
    $('#totloc').val(Locationlength);
    for (var i = 0; i < result.length; i++) {
        $("#LocationName").append("<option value='" + result[i].LocationId + "'>" + result[i].LocationName + "</option>");
        var id = result[i].LocationId;
        $("#loccheck").append("<li class=list-group-item><span class=badge badge-primary mr-2><input type=hidden id='" + "selloc" + i + "' value='" + result[i].LocationId + "'/><input type=checkbox id='" + "chklocation" + id + "' /></span>" + result[i].LocationName + "</li>");

    }
}


function DivisionLoad(result) {
    $("#divisonId").empty();
    $("#divisonId").append("<option value='0'>--Select--</option>");
    divisonlength = result.length;
    $('#totdiv').val(divisonlength);
    for (var i = 0; i < result.length; i++) {
        $("#divisonId").append("<option value='" + result[i].EmployeeDivisionId + "'>" + result[i].EmployeeDivisionName + "</option>");
        var id = result[i].EmployeeDivisionId;
        $("#divcheck").append("<li class=list-group-item><span class=badge badge-primary mr-2><input type=hidden id='" + "seldiv_" + i + "' value='" + result[i].EmployeeDivisionId + "'  /><input type=checkbox id='" + "chkdivision_" + id + "' /></span>" + result[i].EmployeeDivisionName + "</li>");

    }
   
}

 function defaultlocationselect()
{
     if (Exlocid != 0) {
         document.getElementById("chklocation" + Exlocid).checked = false;
         document.getElementById("chklocation" + Exlocid).disabled = false;
     }
     var Id = $('#LocationName').val();
     document.getElementById("chklocation" + Id).checked = true;
     document.getElementById("chklocation" + Id).disabled = true;
     Exlocid = Id;
    
 }


 function defaultdeptchange() {
     
     if (Exdeptid != 0) {
         document.getElementById("chkdepartment" + Exdeptid).checked = false;
         document.getElementById("chkdepartment" + Exdeptid).disabled = false;
     }
     var Id = $('#DepartmentName').val();
    
         document.getElementById("chkdepartment" + Id).checked = true;
         document.getElementById("chkdepartment" + Id).disabled = true;       
    
     Exdeptid = Id;      
 }


 function defaultdivisionchange()
 {
     if (Exdivison != 0) {
         document.getElementById("chkdivision_" + Exdivison).checked = false;
         document.getElementById("chkdivision_" + Exdivison).disabled = false;
     }
     var Id = $('#divisonId').val();
     document.getElementById("chkdivision_" + Id).checked = true;
     document.getElementById("chkdivision_" + Id).disabled = true;

     Exdivison = Id;
 }







$(document).ready(function () {
    Defaultfocus();
    var data3 = {};
    data3.DepartmentId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/DepartmentGetandGets",
        data: data3,
        success: function (result) {
            DepartmentLoad(result.oList);

        }
    });
    var data1 = {};
    data1.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/LocationGetandGets",
        data: data1,
        success: function (result) {
            LocationLoad(result.oList);

        }
    });


    var data6 = {};
    data6.LocationId = 0;
    $.ajax({
        type: "POST",
        url: "../Master/EmployeeDivisionGetandGets",
        data6: data6,
        success: function (result) {
            DivisionLoad(result.oList);
        }
    });


   

    $('#UserName').bind('keyup', function (e) {
        $(this).val($(this).val().replace(/[^0-9a-zA-Z]/g, ''));
        if (e.which >= 97 && e.which <= 122) {
            var newKey = e.which - 32;
            e.keyCode = newKey;
            e.charCode = newKey;
        }
        $(this).val(($(this).val()));
    });
    
  
  
    $('#DepartmentName').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#LocationName').focus();
            e.preventDefault();
        }
    });

    $("#btnsubmit").click(function (e) {
        if ($('#Email').val() != "") {
            var Email = $('#Email').val();
            var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
            if (!re.test(Email)) {
                warningshow('Invalid Email ID', 'Email')
                return false
            }
        }
      SaveAndUpdate(1)        
    });
    


});




$("#UserName").keypress(function (e) {
    var KeyCode = e.which;
    if (!((KeyCode >= 48 && KeyCode <= 57)
        || (KeyCode >= 65 && KeyCode <= 90)
        || (KeyCode >= 97 && KeyCode <= 122))
    && KeyCode != 8 && KeyCode != 32) {
        //warningshow('Digits Only', 'UserName')
        return false;

    }
});

function Defaultfocus() {
    $('#Name').focus();
}


function SaveAndUpdate(Flag) { 
    if ($('#IsActive').prop("checked"))
        var S = 1;
    else
        var S = 0;
    if ($.trim($('#Name').val()) == "") {
        warningshow('Please Enter Name', 'Name');
    }
    else if ($('#LocationName').val() == 0) {
        warningshow('Please Select Location', 'LocationName');
    }
    else if ($('#DepartmentName').val() == 0) {
        warningshow('Please Select Department', 'DepartmentName');
    }
    else if ($('#divisonId').val() == 0) {
        warningshow('Please Select Division', 'divisonId');
    }

    else if ($.trim($('#UserName').val()) == "") {
        warningshow('Please Enter User Name', 'UserName');
    }
    else if ($.trim($('#Password').val()) == "") {
        warningshow('Please Enter Password', 'Password');
    }
    else if ($('#Password').val().length < 4) {
        warningshow('Minimum 4 Characters', 'Password')
    }
    else if ($.trim($('#ConfirmPassword').val()) == "") {
        warningshow('Please Enter Confirm Password', 'ConfirmPassword');
    }
    else if ($('#UserId').val()==0 && S==0) {
        warningshow('Cannot Deactivate Unsaved User');
    }
    else {

        var data = {};   //array
        data.UserId = $('#UserId').val();
        data.Name = $('#Name').val();
        data.UserName = $('#UserName').val();
        data.Password = $('#Password').val();
        data.Email = $('#Email').val();
        data.LocationId = $('#LocationName').val();
        data.DepartmentId = $('#DepartmentName').val();
        data.DiscountPercent = parseFloat($('#DiscPercent').val() || 0).toFixed(Decimal); 
        data.DelFlag = S;

      
        $.ajax({
            type: "POST",
            url: "../Master/UsersInsertandUpdate",
            data: data,
            success: function (result) {
                var status = result.oList[0].Status;
                var UserId = result.oList[0].UserId;
                
                if (status == 1 || status == 2) {
                    adduserdepartmentDivision(UserId);
                    fnImageSave(UserId);
                    fnImageSave1(UserId);
                    
                }

                Showalerts(status);
            }
        });

    }

}







function adduserdepartmentDivision(UId) {
    var oArray = new Array();
  

    for (var A = 0; A < $('#totdept').val() ; A++) {
        var Deptsel = $('#sel_dept' + A).val();
        if (document.getElementById("chkdepartment" + Deptsel).checked) {

            for (var B = 0; B < $('#totdiv').val() ; B++) {
                var Divtsel = $('#seldiv_' + B).val();
               
                if (document.getElementById("chkdivision_" + Divtsel).checked) {

                    for (var C = 0; C < $('#totloc').val() ; C++) {                      
                        var locsel = $('#selloc' + C).val();
                        if (document.getElementById("chklocation" + locsel).checked) {

                            oArray.push({ 'UserId': UId, 'DeptId': $('#sel_dept' + A).val(), 'DivId': $('#seldiv_' + B).val(), 'LocId': $('#selloc' + C).val() })


                        }


                    }
                }
            }

        }
    }

    console.log(oArray)
    var data = { 'ItemMasterModel': oArray };

        $.ajax(
        {
            type: "POST",
            url: "../Master/UserMultiDeptInsert",
            data: data,
            success: function (result) { }
        });
}
      






function formrefresh() {
    $('#myImg').attr('src', '../Content/Image/usericon1.png');
    $('#selectedImage').val('');
    $('#Img').attr('src', '../Content/Image/signature2.jpg');
    $('#img2').val('');
    $('#Name').val('');
    $('#DiscPercent').val(''); 
    $('#UserName').val('');
    $('#UserId').val(0);
    $('#Password').val('');
    $('#ConfirmPassword').val('');
    $('#Email').val('');
    $('#DepartmentName').val('0');
    $('#divisonId').val(0);
    $('#img').val("");
    $('#img2').val("");
    //$('#LocationName').val(null).trigger('change');
    $('#LocationName').val('0');
    $('#btndelete').hide();
    $('#Name').focus();

    for (var A = 0; A < $('#totdept').val() ; A++) {
        var Deptsel = $('#sel_dept' + A).val();
        document.getElementById("chkdepartment" + Deptsel).checked = false;
        document.getElementById("chkdepartment" + Deptsel).disabled = false;
    }
    for (var B = 0; B < $('#totdiv').val() ; B++) {
        var Divtsel = $('#seldiv_' + B).val();
        document.getElementById("chkdivision_" + Divtsel).checked = false;
        document.getElementById("chkdivision_" + Divtsel).disabled = false;
    }

    for (var C = 0; C < $('#totloc').val() ; C++) {
        var locsel = $('#selloc' + C).val();
        document.getElementById("chklocation" + locsel).checked = false;
        document.getElementById("chklocation" + locsel).disabled= false;
    }                 

}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}




function ShowUserslist(result) {
    disable_datatable('tblusers');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th width=1%;align=center;>Sl#</th><th width=40%>User Name</th><th width=20%>Email</th><th width=10%>Department Name</th><th width=15%>Location Name</th><th width=10%>Disc.%</th><th width=3%>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].UserName + '</td><td>' + result[i].Email + '</td><td>' + result[i].DepartmentName + '</td><td>' + result[i].LocationName + '</td><td>' + result[i].DiscountPercent + '</td><td align=center><a onclick="GetRows(' + result[i].UserId + ')">' + Editbutton + '</a></td></tr>';
    }
    $('#tblusers').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>User Name</th><th>Email</th><th>Department Name</th><th>Location Name</th><th>Disc.%</th><th>Edit</th></tr></tfoot>');
    datatableWithsearch1('tblusers');
}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        if (title == 'User Name' || title == 'Email' || title == 'Department Name' || title == 'Location Name' || title == 'Disc.%')
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
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
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
        //    var column = table.column($(this).attr('data-em-col'));
        //    console.log($(this).attr('data-em-col'));
        //    console.log(column);
        //    column.visible($(this).prop("checked"));
        //});
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

function ShowUsersGet(result) {
    //$.ajax({
    //    url: "../ProjectImages/User/Image/" + result[0].UserId + ".png",
    //    type: 'HEAD',
    //    error: function () {
    //        $('#myImg').attr('src', "../app-assets/img/portrait/small/avatar-s-1.png");
    //    },
    //    success: function () {
    //        $('#myImg').attr('src', "../ProjectImages/User/Image/" + result[0].UserId + ".png");
    //    }
    //});
    $.ajax({
        url: "../ProjectImages/User/Signature/" + result[0].UserId + ".jpg",
        type: 'HEAD',
        error: function () {
            $('#Img').attr('src', "../Content/Image/signature2.jpg");
        },
        success: function () {
            $('#Img').attr('src', "../ProjectImages/User/Signature/" + result[0].UserId + ".jpg");
        }
    });

    for (var i = 0; i < result.length; i++) {
        if (document.getElementById("chkdepartment" + result[i].DepartmentId) != null) {
            if (document.getElementById("chkdepartment" + result[i].DepartmentId) != undefined) {
                $('#DepartmentName').val(result[i].DefaultDep);
                document.getElementById("chkdepartment" + result[i].DepartmentId).checked = true;
            }
        }
        if (document.getElementById("chklocation" + result[i].LocationId) != null) {
            if (document.getElementById("chklocation" + result[i].LocationId) != undefined) {
                $('#LocationName').val(result[i].DefaultLoc);
                document.getElementById("chklocation" + result[i].LocationId).checked = true;
            }
        }
        if (document.getElementById("chkdivision_" + result[i].DivId) != null) {
            if (document.getElementById("chkdivision_" + result[i].DivId) != undefined) {
                $('#divisonId').val(result[i].DivId);
                document.getElementById("chkdivision_" + result[i].DivId).checked = true;
            }
    }
    }
    $('#UserId').val(result[0].UserId);
    $('#Name').val(result[0].Name);
    $('#UserName').val(result[0].UserName);
    $('#Password').val(result[0].Password);
    $('#ConfirmPassword').val(result[0].Password);
    $('#Email').val(result[0].Email);
    $('#DiscPercent').val(result[0].DiscountPercent || 0); 
    $('#myImg').attr('src', "../ProjectImages/User/Image/" + result[0].UserId + ".png");
    
    

    var Id1 = $('#DepartmentName').val();
    document.getElementById("chkdepartment" + Id1).disabled = true;
    Exdeptid = Id1;

    var Id2 = $('#LocationName').val();
    document.getElementById("chklocation" + Id2).disabled = true;
    Exlocid = Id2;

    var Id3 = $('#divisonId').val();
    document.getElementById("chkdivision_" + Id3).disabled = true;
    Exdivison = Id3;



    $('#UserName').focus();
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}


function GetRows(UserId) {
    $('#UserId').val(UserId)
    var data = {};
    data.UserId = UserId;
    $.ajax({
        type: "POST",
        url: "../Master/UsersGetandGets",
        data: data,
        success: function (result) {
            formrefresh();
            if (UserId == 0)
                ShowUserslist(result.oList);
            else
                ShowUsersGet(result.oList);

        }
    });

}

function fnImageSave(imageName) {

    var formData = new FormData();
    var totalFiles = document.getElementById("selectedImage").files.length;
    var browsedFile = document.getElementById("selectedImage").files[0];
    var ImageId = "0";
    if ((imageName != "" && totalFiles != 0)) {

        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadUserImage',
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



function fnImageSave1(imageName) {

    var formData = new FormData();
    var totalFiles = document.getElementById("img2").files.length;
    var browsedFile = document.getElementById("img2").files[0];
    var ImageId = "0";
    if ((imageName != "" && totalFiles != 0)) {

        if (browsedFile.type.match('image.*')) {
            formData.append("FileUpload", browsedFile);
            formData.append("ImageName", imageName);
            formData.append("UniqueId", ImageId);
            $.ajax({
                type: "POST",
                url: '/Master/UploadUserSignature',
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


$(function () {
    $("#img2").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded1;
            reader.readAsDataURL(this.files[0]);
        }
    });
});



function imageIsLoaded1(e) {
    $('#Img').attr('src', e.target.result);
}


function isNumbercheck(evt, selectedvalue) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    $(selectedvalue).val($(selectedvalue).val().replace(/[^0-9\.]/g, ''));
    if (charCode != 8 && (charCode != 46 || $(selectedvalue).val().indexOf('.') != -1) && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

}