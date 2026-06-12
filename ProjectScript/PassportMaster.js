$(document).ready(function () {
        
    CountryGet();
    IDGet();
        

        $('#empcode').focus();

        $("#btnsubmit").click(function (e) {
            SaveAndUpdate(1)
        });

       
        $('#passportnum').keyup(function () {
            this.value = this.value.toUpperCase();
        });

        $("#empcode").keydown(function (e) {
            var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
            if (key == 13) {
                e.preventDefault();
                $('#empname').focus();
            }
            else {
                $('#EmpCodeId').val(0);
                $('#empname').val('')
            }

        });

});

function Defaultfocus() {
    if (Result != 0)
        formrefresh();
}

function CountryGet() {
    var data = {};
    data.CountryId = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetCountry",
        data: data,
        success: function (result) {
            CountryLoad(result.oList);
        }
    });
}


function IDGet() {
    var data1 = {};
    data1.Id = 0;
    $.ajax({
        type: "POST",
        url: "../Common/GetIDType",
        data: data1,
        success: function (result) {
            IDLoad(result.oList);
        }
    });
}

    function CountryLoad(result)
    {
        $("#country").empty();
        $("#country").append("<option value='0'>--Select--</option>");
        for (var i = 0; i < result.length; i++) {

            $("#country").append("<option value='" + result[i].CountryId + "'>" + result[i].CountryName + "</option>");
        }
    }

    function IDLoad(result) {
        $("#type").empty();
        $("#type").append("<option value='0'>SELECT</option>");
        $("#type").append("<option value='-1'>PAY</option>");
        $("#type").append("<option value='1'>RETURN</option>");
        $("#type").append("<option value='2'>SALARY CHANGE</option>");
        //for (var i = 0; i < result.length; i++) {

        //    $("#type").append("<option value='" + result[i].Id + "'>" + result[i].IDType + "</option>");
        //}
    }

    function ClearEmpDetails() {
        $('#EmpCodeId').val(0);
        $('#empname').val('')
    }
    function SaveAndUpdate(Flag) {
         if ($('#EmpCodeId').val() == 0) {
            warningshow('Please Select a valid Employee Code', 'EmpCodeId');
            return false;
        }
        else if ($('#empcode').val() == "") {
            warningshow('Please Select Employee Code', 'empcode');
        }
        else if ($('#empname').val() == "") {
            warningshow('Please Enter Employee Name', 'empname');
        }

        else if ($('#passportnum').val() == "") {
            warningshow('Please Enter Passport Number', 'passportnum');
        }
        else if ($('#country').val() == 0) {
            warningshow('Please Select Country', 'country');
        }
        else if ($('#isson').val() == "") {
            warningshow('Please Enter Issued Date', 'isson');
        }
        else if ($('#expon').val() == "") {
            warningshow('Please Enter Expiry Date', 'expon');
        }
        else if ($('#type').val() == 0) {
            warningshow('Please Select Type', 'type');
        }

            ////Submit Code in else part

        else {
            var data = {};   //array
            data.PassportId = $('#PassportId').val();
            data.EmpId = $('#EmpCodeId').val();
            data.EmpCode = $('#empcode').val();
            data.Name = $('#empname').val();
            data.PassportNo = $('#passportnum').val();
            data.Country = $('#country').val();
            data.PassportIssued = $('#isson').val();
            data.PassportExpiry = $('#expon').val();
            data.Remarks = $('#remark').val();
            data.Type = $('#type').val();
            data.DelFlag = Flag;

            $.ajax({
                type: "POST",
                url: "../Master/PassportInsertandUpdate",
                data: data,
                success: function (result) {                  
                        var status = result.oList[0].Status;
                        var PassportId = result.oList[0].PassportId;
                        
                        Showalertsss(status);
                   
                }
            });
    }
}







function Showalertsss(Status) {
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
    else if (Status == 5) {
        formrefresh();
        swal('Salary Date Updated', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }

    else if (Status == 6) {
        formrefresh();
        swal('Data Transfer', "", "success");
        $('.swal-button swal-button--confirm').focus();
    }
    else {
        swal('Data Already Exists', "", "warning");
        $('.swal-button swal-button--confirm').focus();


    }

}


















    function closetable(value) {
        $('#Entry').show();
        $('#listing').hide();
        if (value == 1)
        formrefresh();
    }

    function formrefresh() {        
        $('#myImg').attr('src', "../app-assets/img/elements/03.png");
        $('#selectedImage').val('');
        $('#empid').val('');
        $('#passportnum').val('');
        $('#country').val('0');
        $('#isson').val('');
        $('#expon').val('');
        $('#remark').val('');
        $('#type').val('0');
        $('#empcode').focus();
        $('#PassportId').val(0);
        $('#btndelete').hide();
        $('#empcode').val('');
        $('#EmpCodeId').val(0);
        $('#empcode').val('');
        $('#empname').val('');
        $('#isson').val(CurDate);
        $('#expon').val(CurDate);
    }

    function GetRows(PassportId) {


        $('#PassportId').val(PassportId)
        var data = {};
        data.PassportId = PassportId;
        $.ajax({
            type: "POST",
            url: "../Master/PassportGetandGets",
            data: data,
            success: function (result) {
                if (PassportId == 0)
                ShowArealist(result.oList);
                else
                    ShowAreaGet(result.oList);

            }
        });
    }

    function ShowArealist(result) {
        var st=""
        disable_datatable('tblPassport');
        $('#Entry').hide();
        $('#listing').show();
        var responseText = "<thead><tr><th width=1%;align=center>Sl#</th><th width=1%;>Employee Code</th><th width=1%;>Employee Name</th><th width=1%;>Type</th><th width=1%;>Amount</th><th width=1%;>Date</th><th width=1%;>Remarks</th><th width=1%;>Edit</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            var slno = parseInt(i + 1);

            if (result[i].Type == 1) {
                st='PAY'
            }
            else if (result[i].Type == 2) {
                st = 'SALARY CHANGE'
            }
            else {
                st = 'RET'


            }
            responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].EmpCode + ' </td><td> ' + result[i].Name + ' </td><td> ' + st + ' </td><td>' + result[i].PassportNo + '</td><td>' + result[i].PassportExpiry + '</td><td>' + result[i].Remarks + '</td><td><a onclick="GetRows(' + result[i].PassportId + ')"><i class="ft-edit"></i></a></td></tr>';
        }
        $('#tblPassport').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Employee Code</th><th>Employee Name</th><th>Type</th><th>Amount</th><th>Date</th><th>Remarks</th><th>Edit</th></tr></tfoot>');
        datatableWithsearch1('tblPassport');
    }

    function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

        var a = '#' + tablename + ' tfoot th'
        $(a).each(function () {
            var title = $(this).text();
            if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
                $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
            if (title == 'Key')
                $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
            if (title == 'Employee Code' || title == 'Employee Name' || title == 'Document'|| title == 'Document#' || title == 'Country' || title == 'Issued On' || title == 'Expiry' || title == 'Remarks')
                $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
           
        });
        

            // AddColumnSelectionButton(tableButtonContainerId, tablename)

            table = $('#' + tablename).DataTable({
                dom: 'Blfrtip',
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
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7,8] }
                        },
                        {
                            extend: 'pdfHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7,8] }
                        },
                        {
                            extend: 'print',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7,8] }
                        }
                    ]
                },
                //'colvis'
                ]
            });
            table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
            $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");
        //$("#" + tableButtonContainerId).off("click.emButtonEvent").on("click.emButtonEvent", "[data-em-col]", function () {
            //    var column = table.column($(this).attr('data-em-col'));
            //    console.log($(this).attr('data-em-col'));
            //    console.log(column);
            //    column.visible($(this).prop("checked"));
            //});
       
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
    function closelist() {
        $('#Entry').show();
        $('#listing').hide();
        formrefresh();
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

    function ShowAreaGet(result) {
        $('.pip').remove();
        
        var formData = new FormData();
        var ImageId = result[0].EmpId;
        formData.append("UniqueId", ImageId);

        $.ajax({
            type: "POST",
            url: '/Master/CheckFolderLengthPassport',
            data: formData,
            dataType: "html",
            contentType: false,
            processData: false,
            success: function (result1) {

                var EmpId = ImageId;
                filesLength = result1;
                for (var i = 0; i < filesLength; i++) {
                    $("<span class=\"pip\">" +
                      "<img class=\"imageThumb\" src=../ProjectImages/Documents/" + EmpId + "/" + EmpId + '-' + i + ".png>" +
                      "<br/><span class=\"remove\">Remove image</span>" +
                      "</span>").insertAfter("#DDh");

                    $(".remove").click(function () {
                        $(this).parent(".pip").remove();
                    });

                }

            }
        });

      
        $.ajax({
            url: "../ProjectImages/Documents/" + result[0].EmpId + ".png",
            type: 'HEAD',
            error: function () {
                $('#myImg').attr('src', "../app-assets/img/elements/03.png");
            },
            success: function () {
                $('#myImg').attr('src', "../ProjectImages/Documents/" + result[0].EmpId + ".png");
            }
        });


        for (var i = 0; i < result.length; i++) {
            $('#PassportId').val(result[i].PassportId);
            $('#empid').val(result[i].EmpId);
            $('#passportnum').val(result[i].PassportNo);
            $('#country').val(result[i].Country);
            $('#isson').val(result[i].PassportIssued);
            $('#expon').val(result[i].PassportExpiry);
            $('#remark').val(result[i].Remarks);
            $('#type').val(result[i].Type);
            $('#empcode').val(result[i].EmpCode);
            $('#empname').val(result[i].Name);
            $('#EmpCodeId').val(result[i].EmpId);
            $('#myImg').attr('src', "../ProjectImages/Documents/" + result[i].PassportId + ".png");
            $('#empcode').focus();
        }
        $('#Entry').show();
        $('#listing').hide();
        $('#btndelete').show();
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
                    url: '/Master/UploaddocumenttImage',
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
        $(":file").change(function () {
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
