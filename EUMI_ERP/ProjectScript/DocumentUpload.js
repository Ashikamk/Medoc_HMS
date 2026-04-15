$(document).ready(function () {
    formrefresh();
    var objUrlParams = new URLSearchParams(window.location.search);
    debugger;
    $('#RegNumber').val(objUrlParams.get('mrno'));
    $('#PatientId').val(objUrlParams.get('pid'));
    $('#PatName').val(objUrlParams.get('pname'));

    


    
    ShowTypeList(0);
    $("#btnsubmit").click(function (e) {
        SaveAndUpdate(0, 1)
    });






});

function ShowTypeList(Id) {
    var data = {};
    data.DocumentType = 0;
    $.ajax({
        type: "POST",
        url: "../Master/UploadTypeGetandGets",
        data: data,
        success: function (result) {
            ShowUploadTypeList(result.oList, Id);
        }
    });
}

function ShowUploadTypeList(result, a) {
    $("#DocumentType").empty();
   // $("#DocumentType").append("<option value='0'>--Select--</option>");
    for (var i = 0; i < result.length; i++) {
        $("#DocumentType").append("<option value='" + result[i].DocTypeId + "'>" + result[i].DocumentType + "</option>");
        $('#DocumentTypeid').val(result[i].DocumentType)
    }
    
}

var status = "";
function Defaultfocus() {
    var objUrlParams = new URLSearchParams(window.location.search);
    if (objUrlParams.get('mrno') != null) {
        $('#referce').focus();
    }
    else {
        $('#PatName').focus();
    }
}

 

function SaveAndUpdate(DocumentIds,Flag) {
    if (($('#ReferenceNo').val() == "") && Flag == 1) {
        warningshow('Please Enter Reference Number', 'ReferenceNo');
    }
    else if (($('#referce').val() == "") && Flag == 1) {
        warningshow('Please Enter Reference Number', 'referce');
    }
    else if (($('#DocumentType').val() == 0) && Flag == 1) {
        warningshow('Select Document Type', 'DocumentType');
    }
    else {
        var fname = '';
       
        // GET THE FILE INPUT.
        var fi = document.getElementById('files');
    
        // VALIDATE OR CHECK IF ANY FILE IS SELECTED.
        if (1 == 1) {
            // RUN A LOOP TO CHECK EACH SELECTED FILE.
            for (var i = 0; i <= fi.files.length - 1; i++) {
                //var fname = fi.files.item(i).name;
                if (fname == '') {
                    fname += fi.files.item(i).name;
                }
                else {
                    fname += ',' + fi.files.item(i).name;
                }
            }
            
           // var pane = $('#PatientId').val();
                var pid = $('#PatientId').val();
                var data = {};   //array
                data.DocumentId = DocumentIds;
                data.ReferenceNo = $('#referce').val() + '###' + pid;
                data.Remarks = $('#Remarks').val() + '###' + $('#Referenceurl').val() + '###' + $('#upladdate').val();
                data.DocumentType = $('#DocumentType').val();
                data.Filename = fname;
                data.DelFlag = Flag;
             
                $.ajax({
                    type: "POST",
                    url: "../Master/DocumentUploadInsertandUpdate",
                    data: data,
                    success: function (result) {
                        var status = result.oList[0].Status;
                        var CurrentDocID = result.oList[0].DocumentId;
                        if (status == 1) {
                            DocumentUpload(CurrentDocID, status);
                        }
                       
                        else {
                            Showalerts(status);
                            closelist();
                           
                        }
                    }
                });

           
        
        }
        else {
            warningshow('Please Upload Document', 'files');
        }
        }

}

function DocumentUpload(CurrentDocID, status) {
    console.log(CurrentDocID)
    var totalFiles = document.getElementById("files").files.length;

    if (totalFiles <= 25) {

        var data = {};
        data.DocumentId = CurrentDocID;
        $.ajax({
            type: "POST",
            url: "../Master/RemoveExistingUploadDocumentFolder",
            data: data,
            success: function (result) {
                var DocumentId = CurrentDocID;
                for (var i = 0; i < totalFiles; i++) {
                    var formData = new FormData();
                    var imageName = DocumentId + '-' + i;
                    var browsedFile = document.getElementById("files").files[i];
                    var ImageId = DocumentId;
                    //alert(browsedFile)
                    if (browsedFile.type.match('image/*|application/pdf|application/vnd.ms-excel')) {
                        formData.append("FileUpload", browsedFile);
                        formData.append("ImageName", imageName);
                        formData.append("UniqueId", ImageId);
                        console.log('formData--' + formData)
                        $.ajax({
                            type: "POST",
                            url: '/Master/UploadDocuments',
                            data: formData,
                            dataType: "html",
                            contentType: false,
                            processData: false,
                            success: function (result) {
                               
                            }
                        });
                       
                    }
                  
                }
                Showalerts(status);
                closelist();
                
            }
        });
    }


    else {
        warningshow("Limit Exceeded(Maximum 25 Images)");
    }
}





function formrefresh() {
    
    $('#myImg').attr('src', "../app-assets/img/elements/03.png");
    $('#DocumentId').val('');
    $('#ReferenceNo').val('');

    $('#Referenceurl').val('');
    $('#referce').val('');

    $('#PatName').val('');
    $('#RegNumber').val('');
    

    

    $('#Remarks').val('');
    $('#DocumentType').val('1');
    $('#files').val('');
    $('#btndelete').hide();
    Defaultfocus();
}
//$(function () {
//    $(":file").change(function () {
//        if (this.files && this.files[0]) {
//            var reader = new FileReader();
//            reader.onload = imageIsLoaded;
//            reader.readAsDataURL(this.files[0]);
//        }
//    });
//});
function search() {
    if ($('#txtbox').val()=='') {
        GetRows(0);
    }
    else {
        GetRows(1);
    }
}
function closelist() {
    $('#Entry').show();
    $('#listing').hide();
    formrefresh();
}

function imageIsLoaded(e) {
    $('#myImg').attr('src', "../app-assets/img/elements/03.png");
}
   
function GetRows(DocumentId) {
    //$('#DocumentId').val(DocumentId)
    var data = {};
    data.DocumentId = DocumentId;
    data.Condition = $.trim($('#txtbox').val());
    $.ajax({
        type: "POST",
        url: "../Master/DocumentUploadGetandGets",
        data: data,
        success: function (result) {
            if (DocumentId == 0) {
                ShowDocumentlist(result.oList);
}
            else if (DocumentId == 1) {
                //var SearchId = result.oList[0].DocumentId;
                ShowDocumentlist(result.oList);

            }
            else {
                ShowDocumentGet(result.oList);
            }

        }
    });

}

function ShowDocumentlist(result) {
    disable_datatable('tblcategory');
    $('#txtbox').focus();
    $('#Entry').hide();
    $('#listing').show();
    var pdetails=""
    var responseText = "<thead><tr><th width=1% ;align=center>Sl#</th> <th>MR No#</th><th>Paient</th> <th>Reference#</th><th>Document Type</th><th>File Link</th><th>Remarks</th><th>File Name</th><th width=3% align=center>Delete</th></tr></thead><tbody>";
    for (var i = 0; i < result.length; i++) {
        var slnos = parseInt(i + 1);
        var CurrentDocId = result[i].DocumentId;
        var filenamenew = new Array();
        filenamenew = (result[i].Filename).split(',')
      
        pdetails = (result[i].Remarks).split('###');
        var slno = 0;
        var Finalvalue = "";
       
        var finalresult = new Array();
        for (var j = 0; j < filenamenew.length; j++)
        {
            //console.log('CurrentDocId' + CurrentDocId)
            var extension = (filenamenew[j]).split('.').pop().toLowerCase();
            Finalvalue = CurrentDocId + '-' + slno + '.' + extension;
            slno++;
            finalresult.push(Finalvalue);
        }
        //console.log('finalresult')
        console.log(pdetails)
        var newrow = "";
        for (k = 0; k < finalresult.length; k++) {
            newrow += '<a style="text-decoration:underline;color:blue" onclick=ViewDocuments(' + CurrentDocId + ',"' + finalresult[k] + '")>' + filenamenew[k] + '</a></br>'
        }

        responseText += '<tr><td align=center>' + slnos + '</td> <td>' + pdetails[2] + '</td> <td>' + pdetails[4] + ' / ' + pdetails[3] + '</td> <td>' + result[i].ReferenceNo + '</td><td>' + result[i].DocumentType + '</td><td><a  target="_blank" href="' + pdetails[1] + '">'+ pdetails[1] +'</a></td>  <td>' + pdetails[0] + '</td><td>' + newrow + '</td><td align=center><a  onclick="confirmdelete(' + CurrentDocId + ',0)"><i  class="icon-trash"></i></a></td></tr>';
    }
    $('#tblcategory').html(responseText + '</tbody><tfoot><tr><th align=center>Sl#</th><th></th><th></th><th>Reference#</th><td></th><th>Document Type</th>  <th>Remarks</th><th>FileName</th><th>Delete</th></tr></tfoot>');
    datatableWithsearch1('tblcategory');
}

function confirmdelete(RowId,flag){
    $('#confirmmessage').text('Do You Want To Delete This Record?')
    $('#confirm').show();
    $('#Confirmflag').val('Delete'); $('#ConfirmRowId').val(RowId);
    $('#confirmOk').focus();
}

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true' && status == 'Delete') { 
        SaveAndUpdate(rowid, 0);
    }
    
        $('#confirm').fadeOut(); 

}

function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'View' && title != 'Select' && title != 'Sl#' && title !='Delete') {
            $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
        }
        if (title == 'Reference#' || title == 'Document Type' || title == 'Remarks' || title == 'File Name') {
            $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        }




    });

    table = $('#' + tablename).DataTable({
        
        dom: "<'row'<'col-sm-1'l><'col-sm-11'>>" +
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
                    exportOptions: { columns: [0, 1, 2, 3, 4] }
                },
                {
                    extend: 'pdfHtml5',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3, 4] }
                },
                {
                    extend: 'print',
                    title: title,
                    messageTop: 'MEDOC HMS',
                    exportOptions: { columns: [0, 1, 2, 3,4] }
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


 
function ViewDocuments(DocumentId, CntFile) {  
    var flname = '../ProjectImages/DocumentUploads/' + DocumentId + '/' + CntFile;
    console.log(flname)
    window.open(flname);
}
 