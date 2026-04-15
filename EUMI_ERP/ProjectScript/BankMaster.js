
$(document).ready(function () {
    Defaultfocus();

      

        $("#btnsubmit").click(function (e) {
            if ($('#email').val() != "") {
                var Email = $('#email').val();
                var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
                if (!re.test(Email)) {
                    warningshow('Invalid Email ID', 'email')
                    return false
                }
            }
            SaveAndUpdate(1)
        });

     

        $("#phn").keypress(function (e) {

            if (e.which != 8 && e.which != 0 && e.which != 40 && e.which != 41 && e.which != 45 && e.which != 32 && e.which != 43 && e.which != 44 && (e.which < 48 || e.which > 57)) {
                warningshow('Digits Only', 'phn')
                return false;
            }

        });
        
    });


function Defaultfocus() {
    $('#bcode').focus();

}
function CodeName() {
    if ($('#BankId').val() == 0) {
        $('#bname').val($('#bcode').val())
    }
}

    function SaveAndUpdate(Flag) {   

        if ($('#bcode').val() == "") {
            warningshow('Please Enter Code', 'bcode');
        }
        else if ($('#bname').val() == "") {
            warningshow('Please Enter Name', 'bname');
        }
        
            ////Submit Code in else part

        else {
            var data = {};   //array
            data.BankId = $('#BankId').val();;
            data.BankCode = $('#bcode').val();
            data.BankName = $('#bname').val();
            data.ZipCode = $('#zcode').val();
            data.Branch = $('#branch').val();
            data.Address1 = $('#add1').val();
            data.Address2 = $('#add2').val();
            data.Address3 = $('#add3').val();
            data.PhoneNo = $('#phn').val();
            data.Email = $('#email').val();
            data.DelFlag = Flag;
            //ajax code for insert and update to master controller

            $.ajax({
                type: "POST",
                url: "../Master/BankInsertandUpdate",
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


    function closetable(value) {
        $('#Entry').show();
        $('#listing').hide();
        if (value == 1)
            formrefresh();
    }

    function newform() {
        $('#Entry').show();
        $('#listing').hide();
        formrefresh();
    }


    function formrefresh() {
        $('#bcode').val('');
        $('#bname').val('');
        $('#zcode').val('');
        $('#branch').val('');
        $('#add1').val('');
        $('#add2').val('');
        $('#add3').val('');
        $('#phn').val('');
        $('#email').val('');
        $('#bcode').focus();
        $('#BankId').val(0);
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();
        
    }


    function GetRows(BankId) {
        $('#BankId').val(BankId)
        var data = {};
        data.BankId = BankId;
        $.ajax({
            type: "POST",
            url: "../Master/BankGetandGets",
            data: data,
            success: function (result) {
                if (BankId== 0)
                    ShowArealist(result.oList);
                else
                    ShowAreaGet(result.oList);

            }
        });

    }


    function ShowArealist(result) {
        disable_datatable('tblBank');
        $('#Entry').hide();
        $('#listing').show();
        $('#btnnew').show();
        var responseText = "<thead><tr><th width=15px;align=center>Sl#</th><th width=1%>Code</th><th width=1%>Name</th><th width=1%>Branch</th><th width=1%>ZIP Code</th><th>Address</th><th width=1%>Phone#</th><th width=1%>Email</th><th width=15px>Edit</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            var slno = parseInt(i + 1);
            responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].BankCode + '</td><td>' + result[i].BankName + '</td><td>' + result[i].Branch + '</td><td>' + result[i].ZipCode + '</td><td>' + result[i].Address1 + '<br>' + result[i].Address2 + '<br>' + result[i].Address3 + '</td><td>' + result[i].PhoneNo + '</td><td>' + result[i].Email + '</td><td><a onclick="GetRows(' + result[i].BankId + ')">' + Editbutton + '</a></td></tr>';
        }
        $('#tblBank').html(responseText + '</tbody><tfoot><tr><th>Sl#</th><th>Code</th><th>Name</th><th>Branch</th><th>ZIP Code</th><th>Address</th><th>Phone#</th><th>Email</th><th>Edit</th></tr></tfoot>');
        datatableWithsearch1('tblBank');    
    }
    function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

        var a = '#' + tablename + ' tfoot th'
        $(a).each(function () {
            var title = $(this).text();
            if (title != 'Edit' && title != 'Select' && title != 'Sl#' && title != 'Serial#' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != ' ')
                $(this).html('<input type="text" placeholder="Search ' + title + '" style="width=100%" />');
            if (title == 'Code' || title == 'Name' || title == 'Branch' || title == 'ZIP Code' || title == 'Address' || title == 'Phone#' || title == 'Email' )
                $(this).html('<input type="text" placeholder="' + title + '" style="width:100%" />');
        });
       

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
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                        },
                        {
                            extend: 'pdfHtml5',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
                        },
                        {
                            extend: 'print',
                            title: title,
                            messageTop: 'MEDOC HMS',
                            exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] }
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
        if (ExcelExport == 0) {
            $('.excelexport').hide();
        }
    }
    function closelist() {
        $('#Entry').show();
        $('#listing').hide();
        formrefresh();
    }

    function ShowAreaGet(result) {
        for (var i = 0; i < result.length; i++) {
            $('#bcode').val(result[i].BankCode);
            $('#bname').val(result[i].BankName);
            $('#zcode').val(result[i].ZipCode);
            $('#branch').val(result[i].Branch);
            $('#add1').val(result[i].Address1);
            $('#add2').val(result[i].Address2);
            $('#add3').val(result[i].Address3);
            $('#phn').val(result[i].PhoneNo);
            $('#email').val(result[i].Email);
            $('#bcode').focus();
        }
        $('#Entry').show();
        $('#listing').hide();
        $('#btndelete').show();
    }

