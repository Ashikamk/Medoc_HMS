





function GetSalesDetails(bilsrs,billno,dept,UserId,LocId) {
    var data = {};
    data.FromDate = $('#DateFrom').val();
    data.ToDate = $('#DateTo').val();
    data.BillSeriesId = bilsrs;
    data.BillSlNo = billno;
    data.DeptId = dept; 
    data.UserId = UserId;
    data.LocId = LocId;
    $.ajax({
        type: "POST",
        url: "../SalesInvoice/PH_Dashboard",
        data: data,
        success: function (result) {
          
            ShowSalesreport(result);
            deptload();
        }
    });
}
function ShowSalesreport(result) {
  
    disable_datatable('salesdetails');
    var responseText = "<thead><tr><th width='50px'>Serial#</th><th width='100px' style='text-align:left'>Dept Code</th><th width='100px' style='text-align:center'>Bill#</th><th width='100px' style='text-align:center'>Date</th><th style='text-align:center'>Customer</th><th style='text-align:center'>Address</th><th></th></tr>" +
        "<tr><th> </th><th>Dept Code</th><th>Bill#</th><th>Date</th><th>Customer</th><th>Address</th><th> </th></tr></thead><tbody>";
  
    for (var i = 0; i < result.length; i++) {
        if (result[i].Print == '') {
            responseText += '<tr   class="newrow" style=background-color:#ffb3b3><td style="text-align:center">' + (i + 1) + '</td><td style="text-align:left;padding-left:10px">' + result[i].Department + '</td><td style="text-align:left;padding-left:10px">' + result[i].BillDescription + '-' + result[i].BillSlNo + '</td><td  style="text-align:center">' + result[i].InvDate + '</td><td  style="text-align:left;padding-left:30px">' + result[i].CustName + '</td><td style="text-align:left;padding-left:30px">' + result[i].CustAddress + '</td><td><div class="text-center"><button class="btn white btn-round btn-primary btn-xs"  style="font-size:smaller;margin:0" onclick="PrintthisBill(' + result[i].BillSeriesId + "," + result[i].BillSlNo + "," + result[i].DeptId + "," + result[i].LocnId + "," + result[i].UserId + ')" >Print <i class="ft-printer"></i></button></div></td></tr>';
        }
        else
        {
            responseText += '<tr  class="newrow" style=background-color:#e6fff5><td style="text-align:center">' + (i + 1) + '</td><td style="text-align:left;padding-left:10px">' + result[i].Department + '</td><td style="text-align:left;padding-left:10px">' + result[i].BillDescription + '-' + result[i].BillSlNo + '</td><td  style="text-align:center">' + result[i].InvDate + '</td><td style="text-align:left;padding-left:30px">' + result[i].CustName + '</td><td style="text-align:left;padding-left:30px">' + result[i].CustAddress + '</td><td><div class="text-center"><button class="btn white btn-round btn-xs" style="background-color:#999999;font-size:smaller;margin:0"   onclick="PrintthisBill(' + result[i].BillSeriesId + "," + result[i].BillSlNo + "," + result[i].DeptId + "," + result[i].LocnId + "," + result[i].UserId + ')" >Print <i class="ft-printer"></i></button></div></td></tr>';
        }
    }
    
    $('#salesdetails').html(responseText + '</tbody>');

    datatableWithsearch('salesdetails', 'Multiple');
}


function datatableWithsearch(tablename, Type) {

    var a = '#' + tablename + ' tr:eq(1) th'

    $(a).each(function () {
        var title = $(this).text();
        if (title != ' ')
            if (title == 'Currency' || title == 'OrderNo' || title == 'SerialNo' || title == 'InvoiceNo') {
                $(this).html('<input type="text" class="form-control"  style="width:120px"  placeholder="' + title + '"/>')
            }
            else {
                $(this).html('<input type="text" class="form-control" style="text-align:center"  placeholder="' + title + '"/>')
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
            dom: "<'row'<'col-sm-1'l>>" +
                   "<'row'<'col-sm-12'tr>>" +
                   "<'row'<'col-sm-1'i><'col-sm-11'p>>",
            orderCellsTop: true,
          //  "order": true,
           // "pageLength": -1
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


function disable_datatable(tablename) {
    $('#Warningpopup').fadeOut();
    if ($.fn.DataTable.isDataTable('#' + tablename)) {
        var table = $('#' + tablename).DataTable();
        table.destroy();
        return;
    }
}





