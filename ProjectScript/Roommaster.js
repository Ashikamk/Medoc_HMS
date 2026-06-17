    $(document).ready(function () {
        Defaultfocus();
        $('.form-control').attr('autocomplete', 'off');
        $("#btnsubmit").click(function (e) {
            SaveAndUpdate(1)
        });


    });//Document Close

    function Defaultfocus() {
        $('#txtcode').focus();
    }
    
    function SaveAndUpdate(Flag) {

        if ($('#txtcode').val() == "") {
            warningshow('Please Enter Code', 'txtcode');
        }

        else if ($('#txtname').val() == "") {
            warningshow('Please Enter Name', 'txtname');
        }

        else {
            $('#btnsubmit').prop('disabled', true);
            var data = {};   //array
            data.RoomId = $('#RoomId').val();
            data.RoomCode = $.trim($('#txtcode').val());
            data.RoomName = $.trim($('#txtname').val());
            data.Rate = $('#txtrate').val();
            data.Remarks = $.trim($('#txtremarks').val());
            data.Flag = $.trim($('#txtflag').val());
      
            data.DelFlag = Flag;

            $.ajax({
                type: "POST",
                url: "../Master/RoomInsertandUpdate",
                data: data,
                success: function (result) {
                    for (var i = 0; i <= result.oList.length; i++) {
                        var status = result.oList[i].Status;
                        $('#btnsubmit').prop('disabled', false);
                        Showalerts(status);
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

    function changetoupper(Id) {
        $('#' + Id).val($('#' + Id).val().toUpperCase())
    }


    function formrefresh() {
        $('#txtrate').val('');
        $('#txtname').val('');
        $('#txtcode').val('');
        $('#txtflag').val('');
        $('#txtremarks').val('');
        $('#txtcode').focus();
        $('#RoomId').val(0);
        $('#btndelete').hide();
        $('#Warningpopup').fadeOut();
        $('.swal-button swal-button--confirm').focus();

    }

    function closetable(value) {
        $('#Entry').show();
        $('#listing').hide();
        if (value == 1)
            formrefresh();
    }

    function ShowTermlist(result) {
        $('#Entry').hide();
        $('#listing').show();
        disable_datatable('tblRoom');
        var responseText = "<thead><tr><th width=1% align=center >Sl#</th><th  width=10%>Code</th><th>Name</th><th>Status</th><th  width=30%>Remarks</th><th class='text-right'>Rate</th><th>Edit</th></tr></thead><tbody>";
        for (var i = 0; i < result.length; i++) {
            var slno = parseInt(i + 1);
            responseText += '<tr><td align=center>' + slno + '</td><td>' + result[i].RoomCode + '</td><td>' + result[i].RoomName + '</td><td>' + result[i].Flag + '</td><td>' + result[i].Remarks + '</td><td align=right>' + (result[i].Rate).toFixed(Decimal) + '</td><td onclick="GetRows(' + result[i].RoomId + ')" align=center width=10px bgcolor="#00ffff "><a>' + Editbutton + '</a></td></tr>';
        }
        $('#tblRoom').html(responseText + '</tbody> <tfoot> <tr><th> </th><th>Code</th><th>Name</th><th>Status</th><th>Remarks</th><th> </th><th> </th></tr></tfoot>');
        datatableWithsearch1('tblRoom');
    }

    function ShowTermGet(result) {
        for (var i = 0; i < result.length; i++) {
       
            $('#txtcode').val(result[i].RoomCode);
            $('#txtname').val(result[i].RoomName);
       
            $('#txtflag').val(result[i].Flag);
            $('#txtremarks').val(result[i].Remarks);
            $('#txtrate').val(result[i].Rate);
      

        }
        $('#Entry').show();
        $('#listing').hide();
        $('#btndelete').show();
        $('#txtname').focus();
    }



    //Get List and Single Row from table

    function GetRows(RoomId) {

        $('#RoomId').val(RoomId)
        var data = {};
        data.RoomId = RoomId;
        $.ajax({
            type: "POST",
            url: "../Master/RoomGetandGets",
            data: data,
            success: function (result) {
                if (RoomId == 0)
                    ShowTermlist(result);
                else
                    ShowTermGet(result);

            }
        });

    }

    function datatableWithsearch1(tablename, download, title, tableButtonContainerId) {

        var a = '#' + tablename + ' tfoot th'
        $(a).each(function () {
            var title = $(this).text();
            if (title != ' ')
                $(this).html('<input type="text" placeholder="Search ' + title + '" style:"width:100%" />');
       
        });
        //var table = null;
        //if (download) {
        //    if (!title || !tableButtonContainerId) { console.log("download table need title and button container"); }

        // AddColumnSelectionButton(tableButtonContainerId, tablename)

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
                        exportOptions: { columns: [0, 1, 2,3,4,5] }
                    },
                    {
                        extend: 'pdfHtml5',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
                    },
                    {
                        extend: 'print',
                        title: title,
                        messageTop: 'MEDOC HMS',
                        exportOptions: { columns: [0, 1, 2, 3, 4, 5] }
                    }
                ]
            },
            //'colvis'
            ],
            "columnDefs": [
                      { "width": "0%", "targets": 0 },
                      { "width": "10%", "targets": 1 },
                      { "width": "30%", "targets": 2 },
                      { "width": "20%", "targets": 3 },
                        { "width": "20%", "targets": 4 },
                         { "width": "10%", "targets": 5 },

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



