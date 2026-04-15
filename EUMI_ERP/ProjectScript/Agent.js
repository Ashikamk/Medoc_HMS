$(document).ready(function () {
    Defaultfocus();



    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(1)
    });

});//Document Close

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
function Defaultfocus() {
    $('#AgentName').focus();
}


function SaveAndUpdate(Flag) {
    if ($('#AgentName').val() == "") {
        warningshow('Please Enter Name', 'AgentName');
    }
    else {
        var data = {};   //array
        data.AgentId = $('#AgentId').val();;
        data.AgentName = $('#AgentName').val();
        data.Address1 = $('#Address1').val();
        data.Address2 = $('#Address2').val();
        data.Address3 = $('#Address3').val();
        data.PhoneNumber = $('#Phonenumber').val();
        data.DelFlag = Flag;
        $.ajax({
            type: "POST",
            url: "../Realestate/AgentInsertandUpdates",
            data: data,
            success: function (result) {             
                var status = result.oList[0].Status;
                var AgentId = result.oList[0].AgentId;
                    
                    if (status == 1 || status == 2) {
                        SaveImages(AgentId,status);
                    }
                    else {
                        Showalerts(status);
                    }
            }
        });

    }


}


function SaveImages(AgentId,status) {

    var totalFiles = document.getElementById("selectedImage").files.length;
    if (totalFiles > 0) {
        if (totalFiles <= 25) {

            var data = {};
            data.AgentId = AgentId;
            $.ajax({
                type: "POST",
                url: "../Realestate/RemoveExistingAgentImageFolder",
                data: data,
                success: function (result) {

                    for (var i = 0; i < totalFiles; i++) {
                        var formData = new FormData();
                        var imageName = AgentId + '-' + AgentId;
                        var browsedFile = document.getElementById("selectedImage").files[i];
                        var ImageId = AgentId;

                        if (browsedFile.type.match('image.*')) {
                            formData.append("FileUpload", browsedFile);
                            formData.append("ImageName", imageName);
                            formData.append("UniqueId", ImageId);

                            $.ajax({
                                type: "POST",
                                url: '/Realestate/UploadAgentImage',
                                data: formData,
                                dataType: "html",
                                contentType: false,
                                processData: false,
                                success: function (result) {
                                    if (i == totalFiles)
                                    Showalerts(status);
                                }
                            });
                        }

                    }
                }
            });
        }
        else {
            warningshow("Limit Exceeded(Maximum 25 Images)");
        }
    }
    else {
        Showalerts(status);
    }
   
    
}



function formrefresh() {
    $('#myImg').attr('src', "../app-assets/img/portrait/small/avatar-s-1.png");
    $('#selectedImage').val('');
    $('#AgentName,#Address1,#Address2,#Address3,#Phonenumber').val('');
    $('#AgentId').val(0);
    $('#btndelete').hide();
    Defaultfocus();
}

function closetable(value) {
    $('#Entry').show();
    $('#listing').hide();
    if (value == 1)
        formrefresh();
}


function ShowAgentlist(result) {
    disable_datatable('tblagent');
    $('#Entry').hide();
    $('#listing').show();
    var responseText = "<thead><tr><th align=center>Sl#</th><th>Name</th><th>Address</th><th></th><th>Ph#</th><th align=center>Edit</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slno = parseInt(i + 1);
        responseText += '<tr>' +
            '<td align=center>' + slno + '</td>' +
            '<td>' + result[i].AgentName + '</td>' +
            '<td>' + result[i].Address1 + '</td>' +
            '<td>' + result[i].Address2 + '</td>' +
            '<td>' + result[i].PhoneNumber + '</td>' +
            '<td align=center><a onclick="GetRows(' + result[i].AgentId + ')">' + Editbutton + '</a></td>' +
            '</tr>';
    }
    $('#tblagent').html(responseText + '</tbody><tfoot><tr><th> </th><th>Name</th><th>Address</th><th>Address</th><th>Ph#</th><th> </th></tr></tfoot>');
    datatableWithsearch1('tblagent');
}

var oTable = $("#tblagent").dataTable({
    // Your other options here...
    "bAutoWidth": true
});
function ShowAgentGet(result) {
    var d = new Date();
    $.ajax({
        url: "../ProjectImages/Agent/" + result[0].AgentId + "/" + result[0].AgentId + "-" + result[0].AgentId + ".png",
        type: 'HEAD',
        error: function () {
            $('#myImg').attr('src', "../app-assets/img/portrait/small/avatar-s-1.png");
        },
        success: function () {
            $('#myImg').attr('src', "../ProjectImages/Agent/" + result[0].AgentId + "/" + result[0].AgentId + "-" + result[0].AgentId + ".png?" + d.getTime());
        }
    });

    for (var i = 0; i < result.length; i++) {
        $('#AgentId').val(result[i].AgentId);
        $('#AgentName').val(result[i].AgentName);
        $('#Address1').val(result[i].Address1);
        $('#Address2').val(result[i].Address2);
        $('#Address3').val(result[i].Address3);
        $('#Phonenumber').val(result[i].PhoneNumber);

    }
    $('#Entry').show();
    $('#listing').hide();
    $('#btndelete').show();
}



function GetRows(AgentId) {
    $('#AgentId').val(AgentId)
    var data = {};
    data.AgentId = AgentId;
    $.ajax({
        type: "POST",
        url: "../Realestate/AgentGetandGets",
        data: data,
        success: function (result) {
            if (AgentId == 0)
                ShowAgentlist(result.oList);
            else
                ShowAgentGet(result.oList);

        }
    });

}
function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width:100%" />');
        }
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
                        exportOptions: { columns: [0, 1, 2, 3] }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3] }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3] }
                    }
                ]
            },
            //'colvis'
            ]
        });
        table.buttons(0, null).container().appendTo($("#itemListButtonPlace"));
        $("#itemListButtonPlace").find(".buttons-collection").addClass("btn-outline-primary mx-1").css("border-radius", "4px");


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
