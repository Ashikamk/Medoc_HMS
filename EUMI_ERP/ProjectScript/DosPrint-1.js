function withDecimal1(n) {
    var nums = n.toString().split('.')
    var whole = convertNumberToWords(nums[0])
    if (nums.length == 2 && (parseInt(nums[1])!=0)) {
        var fraction = convertNumberToWords(nums[1])
        return whole + 'and ' + fraction + 'Paisa Only';
    } else {
        return whole + 'Only';
    }
}

function PrintthisBillSalesCopy(Rowlen) {

    $('#DosPrint').html('');
    var Line = "";
    var Currency = $('#select_crncy option:selected').html()

    var AmountinWords = Currency + " " + convertNumberToWords($('#GrandTotal').val())
    var terms = ''

    var Space = '                                                                                            ';
    var Leftalign = '';
    var Break = '------------------------------------------------------------------------------'

    if ($('#txtmsg').val() == '') {
        terms = ($('#txtmsg').val() + Space).substring(0, 24)
    }
    else {
        terms = Space.substring(0, 24)
    }


    Line = "<tr><th></th></tr>";
    //Line += '<tr><td>' + String.fromCharCode(18) + "E" + '</td></tr>'; compressed font 
    //Line += '<tr><td>'+String.fromCharCode(15) + "E" +'</td></tr>';
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Customer Details:-" + Space).substring(0, 30) + String.fromCharCode(27) + "E" + '    TAX INVOICE         ' + String.fromCharCode(27) + "F" + 'Invoice No:' + $('#txtBillSlNocopy').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ($('#txtcustomer').val() + Space).substring(0, 30) + String.fromCharCode(27) + "E" + 'TRN:100375634100003     ' + String.fromCharCode(27) + "F" + 'Date      :' + $('#txtivdate').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ($("#PhoneNo").val() + Space).substring(0, 30) + terms + 'S.Man     :' + $('#select_salesman option:selected').html().substring(0,12) + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  ChasisNo   Vechile Name                  Stock No Qty  Price    Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Adv = 0; var RowCo = Rowlen;

    for (var i = 1; i < Rowlen; i++) {
        var Id = parseInt(i);


        var ItemCode = $('#txtproduct' + Id).val(); var ItemName = $('#ProductDesc' + Id).val() + Space; var StockNo = $('#LotNo' + Id).val() + Space; var Qty = $('#txtquantity' + Id).val() + Space; var Unitprice = $('#txtrate' + Id).val() + Space; var Amount = $('#txtamnt' + Id).val() + Space;
        if (ItemCode != undefined) {
            var str = '', item = '';
            str = $('#txtproduct' + Id).val();
            item = str.substring(str.length - 6, str.length);
            ItemCode = item + Space;
            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + ItemCode.substring(0, 10) + ItemName.substring(0, 29) + " " + StockNo.substring(0, 10) + Qty.substring(0, 4) + Unitprice.substring(0, 9) + Amount.substring(0, 10) + '</td></tr>';
            }
            else {
                Line += '<tr><td>' + Leftalign + '</td><td>' + ' ' + i + '   ' + ItemCode.substring(0, 10) + ItemName.substring(0, 29) + " " + StockNo.substring(0, 10) + Qty.substring(0, 4) + Unitprice.substring(0, 9) + Amount.substring(0, 10) + '</td></tr>';
            }

            if (i == 7 || i == 13) {
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'


                Line += '<tr><td>' + Leftalign + '</td><td>' + ("Customer Details:-" + Space).substring(0, 30) + String.fromCharCode(27) + "E" + '    TAX INVOICE         ' + String.fromCharCode(27) + "F" + 'Invoice No  :' + $('#txtivdate').val() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + ($('#txtcustomer').val() + Space).substring(0, 30) + String.fromCharCode(27) + "E" + 'TRN:100375634100003     ' + String.fromCharCode(27) + "F" + 'Date        :' + $('#txtivdate').val() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + ($("#PhoneNo").val() + Space).substring(0, 30) + terms + 'S.Man     :' + $('#select_salesman option:selected').html() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  ChasisNo   Vechile Name                  Stock No Qty  Price    Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
                RowCo = Rowlen - 7
            }



        }
        Adv += parseFloat($('#txtAdvance' + i).val() || 0)
    }

    for (var i = 0; i < 8 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    Adv = Adv.toFixed(2)
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Leftalign = '                                                   ';
    var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
    var Dis = parseFloat($('#TotalDiscount').text() || 0);
    gndtotal = (gndtotal - Dis - Adv).toFixed(2)


    var TotalLine1 = String.fromCharCode(27) + "E" + ' Total      :' + (Leftalign + $('#GrandTotal').val()).substr((Leftalign + $('#GrandTotal').val()).length - 10);
    var TotalLine2 = 'DISCOUNT   :' + (Leftalign + $('#TotalDiscount').val()).substr((Leftalign + $('#TotalDiscount').val()).length - 10) + '';
    var TotalLine3 = 'TAMOUNT    :' + (Leftalign + $('#TotalTaxable').val()).substr((Leftalign + $('#TotalTaxable').val()).length - 10) + '';
    var TotalLine4 = 'VAT 5%     :' + (Leftalign + $('#TotalTax').val()).substr((Leftalign + $('#TotalTax').val()).length - 10) + '';
    var TotalLine5 = 'ADVANCE    :' + (Leftalign + Adv).substr((Leftalign + Adv).length - 10) + '';
    var TotalLine6 = 'BALANCE ' + Currency.substr(0, 3) + ':' + (Leftalign + gndtotal).substr((Leftalign + gndtotal).length - 10) + '' + String.fromCharCode(27) + "E";
    var Spliter = '----------------------'

    Line += '<tr><td>' + (AmountinWords + ' Only' + Leftalign).substr(0, Leftalign.length - 1) + '</td><td>' + TotalLine1 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine2 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine3 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine4 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine5 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine6 + '</td></tr>'

    $('#DosPrint').append(Line);
    PrintDosPrint();

}
function PrintthisBillForFazal(Rowlen, flg) {

    var BillNo = '';
    if (flg == 'copy')
        BillNo = $('#txtBillSlNocopy').val();
    else if (flg == 'save')
        BillNo = $('#savedbillno').val(); 

    $('#DosPrintFazal').html('');
    var Line = "";
    var Currency = $('#select_crncy option:selected').html()
    var bal = 'Party TRN : '+$('#txtlpono').val();
   
  
    
    var AmountinWords = '    ' + convertNumberToWords($('#GrandTotal').val())
   
    var sspace = '               ';
    var Space = '                                                                                            ';
    var Leftalign = '';

    var spacebal = Space ;
    var strbal = spacebal.substring(spacebal.length - 27, spacebal.length);

    Line = "<tr><th></th></tr>";

    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 18) + String.fromCharCode(27) + "E"  +($('#txtcustomer').val() + Space).substring(0, 82) + String.fromCharCode(27) + "F"  + '</td><td>' + String.fromCharCode(27) + "E" + BillNo + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 11) + ($('#txtaddress').val() + Space).substring(0, 88) + '</td><td>' + String.fromCharCode(27) + "E" + $('#txtivdate').val() + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 1) + ('Chassis#  : ' + $('#ChassisNo').val() + Space).substring(0, 30) + '</td></tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 1) + ('Party TRN : ' + $('#txtlpono').val() + Space).substring(0, 30) + '</td></tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 50) + 'BAL : ' + ($('#OutStanding').text() + Space).substring(0, 70) + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr>' + Space + '</tr>'
  
    var RowCo = Rowlen;
   
    for (var i = 1; i < Rowlen; i++) {
        var Id = parseInt(i);


        var ItemCode = $('#txtproduct' + Id).val(); var ItemName = $('#ProductDesc' + Id).val(); var Location = $('#select_location' + Id + ' option:selected').html(); var Qty = $('#txtquantity' + Id).val(); var unit = $('#select_unit' + Id + ' option:selected').html() + '  '; var Unitprice = $('#txtrate' + Id).val(); var Amount =$('#txtamnt' + Id).val();
        if (ItemCode != undefined) {
            var spaceunit = Space + Unitprice;
            var strunit = spaceunit.substring(spaceunit.length - 22, spaceunit.length);

            var spaceamt = Space + Amount;
            var stramt = spaceamt.substring(spaceamt.length - 18, spaceamt.length);

            var str = '', item = '';
            str = $('#txtproduct' + Id).val();
            item = str.substring(str.length - 6, str.length);
          
            if (i > 9) {
               
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + (Id + Space).substring(0, 9) + '</td><td>' + (ItemCode + Space).substring(0, 21) + '</td><td>' + (ItemName + Space).substring(0, 50) + '</td><td text-align="center">' + (Qty + sspace).substring(0, 5) + '</td><td align="right">' + strunit + '</td><td align="right">' + stramt + '</td></tr>';
            }
            else {
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + (Id + Space).substring(0, 9) + '</td><td>' + (ItemCode + Space).substring(0, 21) + '</td><td>' + (ItemName + Space).substring(0, 50) + '</td><td text-align="center">' + (Qty + sspace).substring(0, 5) + '</td><td align="right">' + strunit + '</td><td align="right">' + stramt + '</td></tr>';
            }
            if (i % 28 == 0 && Rowlen > i+1) {

                for (var d = 0; d < 28; d++) {
                    Line += '<tr><td>.</td></tr>';
                }
                Line += '<tr>' + Space + '</tr>'
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 18)  +String.fromCharCode(27) + "E" + ($('#txtcustomer').val() + Space).substring(0, 82) + String.fromCharCode(27) + "F" + '</td><td>' + String.fromCharCode(27) + "E" + BillNo + String.fromCharCode(27) + "F" + '</td></tr>'
                Line += '<tr>' + Space + '</tr>'
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 11) + ($('#txtaddress').val() + Space).substring(0, 88) + '</td><td>' + String.fromCharCode(27) + "E" + $('#txtivdate').val() + String.fromCharCode(27) + "F" + '</td></tr>'
                Line += '<tr>' + Space + '</tr>'
                Line += '<tr>' + Space + '</tr>'
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 1) + ('Chassis#  : ' + $('#ChassisNo').val() + Space).substring(0, 30) + '</td></tr>'
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 1) + ('Party TRN : ' + $('#txtlpono').val() + Space).substring(0, 30) + '</td></tr>'
                Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space).substring(0, 50) + 'BAL : ' + ($('#OutStanding').text() + Space).substring(0, 70) + '</td></tr>'
                Line += '<tr>' + Space + '</tr>'
                Line += '<tr>' + Space + '</tr>'
             
                RowCo = Rowlen - 28

            }


        }
      
    }
   
    for (var i = 0; i < 31-RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    
   
    var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
    var Dis = parseFloat($('#TotalDiscount').text() || 0);
  
    var TotalLine5 = ($('#TotalTaxable').val()).substring(0, 22) ;
    var TotalLine4 = ($('#TotalTax').val()).substring(0, 22);
    var TotalLine1 = String.fromCharCode(27) + "E" + ($('#gndtotal').text()).substring(0, 22) + String.fromCharCode(27) + "F";

    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space + Space).substring(0, 110) + TotalLine5 + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 7) + '</td><td>' + (Space + Space).substring(0, 110) + TotalLine4 + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr><td>' + (Leftalign).substring(0, 12) + '</td><td>' + (AmountinWords+ ' Only' +Space).substring(0, 110)+  TotalLine1 + '</td></tr>'
    Line += '<tr>' + Space + '</tr>'
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'


    
    $('#DosPrintFazal').append(Line);
    PrintDosPrintFazal();

}

function PrintthisBillSalesNew(Rowlen,flg) {

    var BillNo = '';
    if (flg == 'save')
    { BillNo = $('#savedbillno').val(); }
    else
    { BillNo = $('#txtBillSlNocopy').val(); }

    $('#DosPrintNew').html('');
    var Line = "";
    var Rowcount = 0;

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var terms = ''

    var Space = '                                                                                            ';
    var Space1 = '                         ';
    var Leftalign = '';
    var Break = '------------------------------------------------------------------------------'


    Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
    Line += '<tr><td>' + String.fromCharCode(27) + "E" + '</td><td>' + '       ' + (window.CompanySettingsArray.TRNNo + Space).substring(0, 30) + '                           ' + $('#txtlpono').val() + '</td></tr>'
    Line += '<tr><td>.</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '                ' + ($('#txtcustomer').val() + Space).substring(0, 30) + '                  ' + BillNo + '</td></tr>'
    Line += '<tr><td>.</td><tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '          ' + ($("#PhoneNo").val() + Space).substring(0, 30) + '                        ' + $('#txtivdate').val() + '</td></tr>'
    Line += '<tr><td>.</td></tr><tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '         ' + ($("#txtaddress").val() + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    var Adv = 0; var RowCo = Rowlen;

    for (var i = 1; i < Rowlen; i++) {
        var Id = parseInt(i);



        var ItemCode = $('#txtproduct' + Id).val(); var ItemName = $('#ProductDesc' + Id).val() + Space; var Unit = $('#select_unit' + Id + ' option:selected').html() + Space; var Qty = $('#txtquantity' + Id).val() + Space; var Unitprice = Space + $('#txtrate' + Id).val(); var Amount = Space + $('#txtamnt' + Id).val();
        if (ItemCode != undefined) {
            var str = '', item = '';
            str = $('#txtproduct' + Id).val();
            item = str.substring(str.length - 10, str.length);
            ItemCode = item + Space;
            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + ' ' + i + '  ' + ItemCode.substring(0, 10) + ' ' + ItemName.substring(0, 31) + '  ' + Unit.substring(0, 4) + '   ' + Qty.substring(0, 4) + '' + Unitprice.substr(Unitprice.length - 8) + '  ' + Amount.substr(Amount.length - 8) + '</td></tr>';
            }
            else {
                Line += '<tr><td>' + Leftalign + '</td><td>' + '  ' + i + '  ' + ItemCode.substring(0, 10) + ' ' + ItemName.substring(0, 31) + '  ' + Unit.substring(0, 4) + '   ' + Qty.substring(0, 4) + '' + Unitprice.substr(Unitprice.length - 8) + '  ' + Amount.substr(Amount.length - 8) + '</td></tr>';
            }

            if (i%28==0) {
                //Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
                
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
                Line += '<tr><td>' + String.fromCharCode(27) + "E" + '</td><td>' + '       ' + (window.CompanySettingsArray.TRNNo + Space).substring(0, 30) + '                           ' + $('#txtlpono').val() + '</td></tr>'
                Line += '<tr><td>.</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + '                ' + ($('#txtcustomer').val() + Space).substring(0, 30) + '                  ' + BillNo + '</td></tr>'
                Line += '<tr><td>.</td><tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + '          ' + ($("#PhoneNo").val() + Space).substring(0, 30) + '                        ' + $('#txtivdate').val() + '</td></tr>'
                Line += '<tr><td>.</td></tr><tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + '         ' + ($("#txtaddress").val() + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
                RowCo = Rowlen - 32;
            }

        }
        Adv += parseFloat($('#txtAdvance' + i).val() || 0)
    }

    for (var i = 0; i < 32 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }


    //Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Leftalign = '              ';
    var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
    var Dis = parseFloat($('#disc').text() || 0);

    var TotalLine1 = (Leftalign + $('#GrandTotal').val()).substr((Leftalign + $('#GrandTotal').val()).length - 10);
    var TotalLine2 = (Leftalign + $('#TotalTax').val()).substr((Leftalign + $('#TotalTax').val()).length - 10) + '';
    var TotalLine3 = (Leftalign + $('#disc').val()).substr((Leftalign + $('#disc').val()).length - 10) + '';
    var TotalLine4 = (Leftalign + $('#TotalTaxable').val()).substr((Leftalign + $('#TotalTaxable').val()).length - 10) + '';




    Line += '<tr><td>' + String.fromCharCode(27) + "E" + '</td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '                                                     ' + TotalLine4 + '</td></tr>'
    Line += '<tr><td>' + (AmountinWords + 'Only.                                                      ').substring(0, 67) + '</td><td>' + '' + TotalLine2 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '                                                     ' + TotalLine3 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '                                                     ' + TotalLine1 + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td></tr>'; Line += '<tr><td>.</td></tr>'; Line += '<tr><td>.</td></tr>'; Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>'; Line += '<tr><td>.</td></tr>'; Line += '<tr><td>Powered By www.eumierp.com</td></tr>'; Line += '<tr><td>.</td></tr>';
    $('#DosPrintNew').append(Line);
    PrintDosPrintNew();

}



function PrintthisBillSalesReturnDotMatrix(Rowlen) {
  
    $('#DosPrintSR').html('');
    var Line = "";
    var Currency = $('#select_crncy option:selected').html()
    
    var AmountinWords = Currency + " " + convertNumberToWords($('#GrandTotal').val())
    var terms = ''

    var Space = '                                                                                            ';
    var Leftalign = '';
    var Break = '------------------------------------------------------------------------------'

    if ($('#txtmsg').val() == '') {
        terms = ($('#txtmsg').val() + Space).substring(0, 24)
    }
    else {
        terms = Space.substring(0, 24)
    }

    Line = "<tr><th></th></tr>";
    //Line += '<tr><td>' + String.fromCharCode(18) + "E" + '</td></tr>'; compressed font 
    //Line += '<tr><td>'+String.fromCharCode(15) + "E" +'</td></tr>';
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Customer Details:-" + Space).substring(0, 30) + String.fromCharCode(27) + "E" + '    TAX INVOICE         ' + String.fromCharCode(27) + "F" + 'Invoice No  :' + $('#txtBillSlNocopy').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ($('#txtcustomer').val() + Space).substring(0, 30) + String.fromCharCode(27) + "E" + 'TRN:100375634100003     ' + String.fromCharCode(27) + "F" + 'Date        :' + $('#txtivdate').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ('' + Space).substring(0, 30) + terms + 'S.Man     :' + $('#select_salesman option:selected').html() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + ' No  ChasisNo   Vechile Name                Stock No Qty  Price   Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Adv = 0; var RowCo = Rowlen;
    for (var i = 1; i <= Rowlen; i++) {

        var Id = parseInt(i);


        var ItemCode = $('#txtproduct' + Id).val(); var ItemName = $('#ProductDesc' + Id).val() + Space; var StockNo = '' + Space; var Qty = $('#txtquantity' + Id).val() + Space; var Unitprice = $('#txtrate' + Id).val() + Space; var Amount = $('#txtamnt' + Id).val() + Space;

        if (ItemCode != undefined) {
            var str = '', item = '';
            str = $('#txtproduct' + Id).val();
            item = str.substring(str.length - 6, str.length);
            ItemCode = item + Space;
            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + ' ' + i + '   ' + ItemCode.substring(0, 10) + ItemName.substring(0, 25) + " " + StockNo.substring(0, 10) + Qty.substring(0, 4) + Unitprice.substring(0, 9) + Amount.substring(0, 10) + '</td></tr>';
            }
            else {
                Line += '<tr><td>' + Leftalign + '</td><td>' + '  ' + i + '   ' + ItemCode.substring(0, 10) + ItemName.substring(0, 25) + " " + StockNo.substring(0, 10) + Qty.substring(0, 4) + Unitprice.substring(0, 9) + Amount.substring(0, 10) + '</td></tr>';
            }

            if (i == 7 || i == 13) {
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
                Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'


                Line += '<tr><td>' + Leftalign + '</td><td>' + ("Customer Details:-" + Space).substring(0, 30) + String.fromCharCode(27) + "E" + '    TAX INVOICE         ' + String.fromCharCode(27) + "F" + 'Invoice No  :' + $('#txtivdate').val() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + ($('#txtcustomer').val() + Space).substring(0, 30) + String.fromCharCode(27) + "E" + 'TRN:100375634100003     ' + String.fromCharCode(27) + "F" + 'Date        :' + $('#txtivdate').val() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + ('' + Space).substring(0, 30) + terms + 'S.Man     :' + $('#select_salesman option:selected').html() + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + ' No  ChasisNo   Vechile Name                Stock No Qty  Price   Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
                Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
                RowCo = Rowlen - 7
            }



        }
        Adv += parseFloat($('#txtAdvance' + i).val() || 0)
    }

    for (var i = 0; i < 8 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    Adv = Adv.toFixed(2)
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Leftalign = '                                                   ';
    var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
    var Dis = parseFloat($('#TotalDiscount').text() || 0);
    gndtotal = (gndtotal - Dis - Adv).toFixed(2)


    var TotalLine1 = String.fromCharCode(27) + "E" + ' Total      :' + (Leftalign + $('#GrandTotal').val()).substr((Leftalign + $('#GrandTotal').val()).length - 10);
    var TotalLine2 = 'DISCOUNT   :' + (Leftalign + $('#TotalDiscount').val()).substr((Leftalign + $('#TotalDiscount').val()).length - 10) + '';
    var TotalLine3 = 'TAMOUNT    :' + (Leftalign + $('#TotalTaxable').val()).substr((Leftalign + $('#TotalTaxable').val()).length - 10) + '';
    var TotalLine4 = 'VAT 5%     :' + (Leftalign + $('#TotalTax').val()).substr((Leftalign + $('#TotalTax').val()).length - 10) + '';
    var TotalLine5 = 'ADVANCE    :' + (Leftalign + Adv).substr((Leftalign + Adv).length - 10) + '';
    var TotalLine6 = 'BALANCE ' + Currency.substr(0, 3) + ':' + (Leftalign + gndtotal).substr((Leftalign + gndtotal).length - 10) + '' + String.fromCharCode(27) + "E";
    var Spliter = '----------------------'

    Line += '<tr><td>' + (AmountinWords + ' Only' + Leftalign).substr(0, Leftalign.length - 1) + '</td><td>' + TotalLine1 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine2 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine3 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine4 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine5 + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + TotalLine6 + '</td></tr>'

    $('#DosPrintSR').append(Line);
    PrintDosPrintSR();

}




function PrintthisReceiptVoucher(Rowlen) {
    $('#DosPrintRV').html('');
    var AmountinWords = ' ' + convertNumberToWords($('#Amount').val())

   
    var Space = '                                                                                            ';
    var Space1 = '              '
    var Leftalign = '     ';
    var Line = "<tr><th></th></tr>";
    var Amount = 'Amount :' + parseFloat($('#Amount').val() || 0).toFixed(2) + Space
    var Currency = $('#Currency option:selected').html();
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + '  RECEIPT VOUCHER    ' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + Amount.substring(0, 30) + String.fromCharCode(27) + "F" + Space1 + '    RV No  :' + $('#VoucherNo').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td> ' + Space.substring(0, 45) + '     Date   :' + $('#VoucherDate').val() + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Received with thanks from  ' + $('#AccountName').val() + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of '+Currency +'   ' + AmountinWords + ' Only ' + String.fromCharCode(27) + "F" + '</td></tr>'
    //Line += '<tr><td>.</td><td></td><td></td></tr><tr><td>.</td><td></td><td></td></tr>'   

    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Balance :' + $("#CurrentBalance").val() + ' Only ' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
  
    var len = 0;   
    var InvNo = '';
    for (var j = 1; j <= Rowlen; j++) {        
        if ($('#SlNoCheck' + j).prop("checked")) {
            len = len + 1;            
            Line += '<tr><td>' + Leftalign + '</td><td>' + $('#VEDescription' + j).text() + '</td></tr>'
        }
    }    
    for (var j = 1; j <= 6 - len; j++) {
        Line += '<tr><td>.</td></tr>';
    }

    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintRV').append(Line);
    PrintDosPrintRV(); 
}



function PrintthisPaymentVoucher(Rowlen) {

    $('#DosPrintPV').html('');
    var AmountinWords = '       ' + convertNumberToWords($('#Amount').val())

    var Space = '                                                                                            ';
    var Leftalign = '    ';
    var Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + '  PAYMENT VOUCHER    ' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                     PV No     :' + $('#VoucherNo').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                     Date      :' + $('#VoucherDate').val() + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'PAY TO MR/MRS   ' + ($('#AccountName').val() + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of ' + $('#Currency option:selected').html() + AmountinWords + ' Only' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'

    var len = 0;

    var InvNo = '';
    var InvDate = '';
    var InvAmount = 0;

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#SlNoCheck' + i).prop("checked")) {
            InvAmount = parseInt(InvAmount) + parseInt($('#Amount' + i).text()); 
            console.log(InvAmount)
            len = len + 1;
            InvNo += $('#InvoNo' + i).text() + ',';
            var InvNo = InvNo;
            var InvDate = $('#InvoDate1').text();
           
            var RecAmount = ($('#Amount').val());
        }
    }
    var a = parseFloat(InvAmount).toFixed(Decimal); 

    Line += '<tr><td>' + Leftalign + '</td><td>' + 'Inv.Number     :  ' + InvNo.substring(0, 30) + '                      Inv.Date   : ' + InvDate + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + 'Inv.Amount     :  ' + a + '                   Amount     : ' + String.fromCharCode(27) + "E" + RecAmount + String.fromCharCode(27) + "F" + '</td></tr>'

    Line += '<tr><td>.</td><td></td><td></td></tr>'

    if ($('#AccountType').val() == 2 || $('#AccountType').val() == 3) {
        Line += '<tr><td>' + Leftalign + '</td><td>' + 'Cheque No : ' + ($('#ChequeNo').val()).substring(0, 30) + '       Cheque Date : ' + ($('#ChequeDate').val()) + '      Bank :' + (($('#Bank option:selected').html())) + '</td></tr>'
    }
    else
    {
        Line += '<tr><td>.</td><td></td><td></td></tr>'
    }
    for (var i = 1; i < 7 - len; i++) {
        Line += '<tr><td>.</td></tr>';
    }

    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'
    $('#DosPrintPV').append(Line);
    PrintDosPrintPV();
}



function PrintthisVoucherEntry(Rowlen) {
    $('#DosPrintVE').html('');
    var AmountinWords = '  ' + convertNumberToWords($('#Credittxt').val())

    var Space = '                                                                                            ';
    var Leftalign = '   ';
    var Break = '----------------------------------------------------------------------------------------------------'
    var Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + ($('#VoucherType option:selected').html().substring(4, 30)).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                   VE No     :' + $('#VoucherNo').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                   Date      :' + $('#VoucherDate').val() + '</td></tr>'
    //Line += '<tr><td>' + Leftalign + '</td><td>' + 'Voucher Type  ' + ($('#VoucherType option:selected').html()).substring(0, 30) + '</td></tr>'

    Line += '<tr><td>.</td><td></td><td></td></tr>'




    if ($('#VoucherType').val() != 2) {
        var Prefix = 'PAY TO MR/MRS       '
        if ($('#VType2').val() == 'Debit') {
            var AccountName = $('#AccountId2').val();
        }
        else {
            var AccountName = $('#AccountId1').val();
        }


    }
    else {
        var Prefix = 'Received with thanks from  '
        if ($('#VType2').val() == 'Credit') {
            var AccountName = $('#AccountId2').val();
        }
        else {
            var AccountName = $('#AccountId1').val();
        }


    }

        var Desc = $('#VoucherEntryDescription' + (Rowlen - 1)).val();
        var InvDate = $('#VoucherDate').val();
        var Amount = $('#Credittxt').val();
        var TaxNo = $('#TaxNo' + (Rowlen - 2)).val();
        var RefNo = $('#ReferenceNo' + (Rowlen - 2)).val();

        Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + Prefix + (AccountName + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
        Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of '+ $('#Currency option:selected').html()  +' ' + AmountinWords + ' Only' + String.fromCharCode(27) + "F" + '</td></tr>'
        Line += '<tr><td>.</td><td></td><td></td></tr>'
        Line += '<tr><td>' + (Space).substring(0, 3) +(Desc) + '</td></tr>'


        Line += '<tr><td>.</td><td></td><td></td></tr>'
        Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Amount     :' + Amount + String.fromCharCode(27) + "F" + '            Tax No:  ' + (TaxNo).substring(0, 30) + '                Ref No :' + (RefNo) + '</td></tr>'

    

        Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintVE').append(Line);
    PrintDosPrintVE();
}
function PrintthisPettyCash(Rowlen) {
    console.log(Rowlen)
    $('#DosPrintPC').html('');
    var AmountinWords = '  ' + convertNumberToWords($('#Credittxt').val())
      var Totamnt = 0;
    var Space = '                                                                                            ';
    var Leftalign = '';
    var Break = '----------------------------------------------------------------------------------------------------'
    var Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + ($('#VoucherType option:selected').html())+''+(Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                   VE No     :' + $('#VoucherNo').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                   Date      :' + $('#VoucherDate').val() + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'

    var Prefix = 'PAY TO MR/MRS             : '
  
         var AccountName = $('#BankAccountName').val();
    
         var Desc = $('#VoucherEntryDescription' + (Rowlen - (Rowlen-1))).val();
         var InvDate = $('#VoucherDate').val();
             Totamnt = parseFloat(Totamnt + ($('#Credittxt').val()) || 0);
        
         var Amount = parseFloat(Totamnt||0);
        
    var TaxNo = $('#TaxNo' + (Rowlen - (Rowlen - 1))).val();
    var RefNo = $('#ReferenceNo' + (Rowlen - (Rowlen - 1))).val();

    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'PAY TO MR/MRS     ' + (AccountName + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of Dirhams  ' + AmountinWords + ' Only' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + (Desc) + '</td></tr>'


    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Amount     :' + Amount + String.fromCharCode(27) + "F" + '            Tax No:  ' + (TaxNo).substring(0, 30) + '                Ref No :' + (RefNo) + '</td></tr>'



    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintPC').append(Line);
    PrintDosPrintVC();

}

function PrintthisVoucherEntryModify(Rowlen) {
    $('#DosPrintVEM').html('');
    var AmountinWords = ' ' + convertNumberToWords($('#Credittxt').val())

    var Space = '                                                                                            ';
    var Leftalign = '   ';
    var Break = '----------------------------------------------------------------------------------------------------'
    var Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + ($('#VoucherType option:selected').html().substring(4, 30)).substring(0, 30) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                 VE No     :' + $('#VoucherNo').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + '                 Date      :' + $('#VoucherDate').val() + '</td></tr>'
    //Line += '<tr><td>' + Leftalign + '</td><td>' + 'Voucher Type  ' + ($('#VoucherType option:selected').html()).substring(0, 30) + '</td></tr>'

    Line += '<tr><td>.</td><td></td><td></td></tr>'



    if ($('#VType2').val() == 'Credit') {
        var AccountName = $('#AccountId2').val();
    }
    else {
        var AccountName = $('#AccountId1').val();
    }
    var Description = $('#VoucherEntryDescription' + (Rowlen - 1)).val();
    var InvDate = $('#VoucherDate').val();
    var Amount = $('#Credittxt').val();
    var TaxNo = $('#TaxNo' + (Rowlen - 2)).val();
    var RefNo = $('#ReferenceNo' + (Rowlen - 2)).val();

    if ($('#VoucherType').val() != 2) {
        var Prefix = 'PAY TO MR/MRS             : '
        if ($('#VType2').val() == 'Debit') {
            var AccountName = $('#AccountId2').val();
        }
        else {
            var AccountName = $('#AccountId1').val();
        }


    }
    else {
        var Prefix = 'Received with thanks from : '
        if ($('#VType2').val() == 'Credit') {
            var AccountName = $('#AccountId2').val();
        }
        else {
            var AccountName = $('#AccountId1').val();
        }


    }

    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + Prefix + (AccountName) + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of Dirhams        :' + AmountinWords + ' Only' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'

    Line += '<tr><td>.</td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + (Description) + '</td></tr>'


    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Amount     :' + Amount + String.fromCharCode(27) + "F" + '            Tax No:  ' + (TaxNo).substring(0, 30) + '                Ref No :' + (RefNo) + '</td></tr>'



    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'


    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintVEM').append(Line);
    PrintDosPrintVEM();
}

function PrintDosPrintHospitalSales(Type) {
    var titles = [];
    var data = [];
    $('.dataTablehms th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTablehms tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'printbill' + ".txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    $('#DosPrinthms').html('');
}


function PrintthisBillHospitalSales(Type, Rowlen, Flag) {
    $('#DosPrinthms').html('');
    var Line = "";

    var AmountinWords = withDecimal1($('#BaseTextTotalProc').text())
    var terms = ''

    var Space = '                                                   ';
    var Space1 = '  ';
    var Leftalign = '';
    var Break = '---------------------------------------------------'

    if ($('#Remarks').val() == '') {
        terms = ($('#Remarks').val() + Space).substring(0, 24)
    }
    else {
        terms = Space.substring(0, 24)
    }
    var BillType = (Type + Space).substring(0, 15); var BillNo = '';

    if (Flag == 'COPY')
    { BillNo = $('#HBillNoCopy').val() + Space; }
    else if (Flag == 'SAVE')
    { BillNo = $('#HBillNoSave').val() + Space; }

    var Gend = ($.trim($('#HGender').val()) + '/' + $('#Hage').val() + Space);
    var Doctor = $.trim($('#HDoctor :selected').text()) + Space;
    var Hosp = $.trim(CompanySettingsArray.CompanyName);   //"KINS HOSPITAL"//
    var Address = CompanySettingsArray.Address;    //"KUZHITHURAI"//
    var PhoneNo = CompanySettingsArray.PhoneNo;  //"7540063776" //
    var Fax = CompanySettingsArray.Fax;
    var TRNNo = 'TRN : ' + CompanySettingsArray.TRNNo;
    var Gstno = 'GST : ' + CompanySettingsArray.TRNNo;
    var OPNo = $.trim($('#HOpNo').val()) + Space; var IPNo = $.trim($('#IPNumber').val()) + Space;
    var PH = 'PH : ' + PhoneNo //+ ' , FAX : ' + Fax;
    var GSTR = $.trim(TRNNo) + ' , ' + $.trim(Gstno);

    var Dash = "-----------------------------------------------------";
    var TotColumn = parseInt(Dash.length / 2);

    var Head1Length = parseInt(TotColumn / 2) - parseInt($.trim(Hosp).length / 2);
    var Head2Length = parseInt(TotColumn / 2) - parseInt($.trim(Address).length / 2);
    var Head3Length = parseInt(TotColumn / 2) - parseInt($.trim(PH).length / 2);
    var Head4Length = parseInt(TotColumn / 2) - parseInt($.trim(GSTR).length / 2);

    Hosp = Space.substring(0, Head1Length) + Hosp.trim();
    Address = Space.substring(0, Head2Length) + Address.trim();
    PH = Space.substring(0, Head3Length) + PH.trim();
    GSTR = Space.substring(0, Head4Length) + GSTR.trim();

    var TypeLine = '';
  //TypeLine += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  Description                             Qty     Rate       Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
    TypeLine += '<tr><td>' + Leftalign + '</td><td>Item    Batch MFR   Exp   Qty  Rate    Dis%  Amount</td></tr>'             //'MRP       Taxable      Tax     ':31  chars

    Line = "<tr><th></th></tr>";
    //Line += '<tr><td>.</td></tr>'               //<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>     
    //Line += '<tr><td>.</td></tr><tr><td>.</td></tr>'   //
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 9)  + Hosp  + '       </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 9) +   Address + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 9) + PH + '                               </td></tr>'
  //  Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 15) + GSTR + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    //Line += '<tr><td>' + Leftalign + '</td><td>' + ("        " + Space).substring(0, 23) + ' ' + String.fromCharCode(27) + BillType + String.fromCharCode(27)  + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Reg No :" + $('#HRegNo').val() + Space).substring(0, 23) +    (' Bill No   :' + BillNo + Space).substring(0, 25) + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Patient:" + $('#HPatient').val() + Space).substring(0, 23) +  (' Date      :' + $('#HSalesDate').val() + Space).substring(0, 25) + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Doctor :" + Doctor + Space).substring(0, 23) +                (' Gender/Age:' + Gend + Space).substring(0, 25) + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP#    :" + OPNo).substring(0, 23) +                          (' IP#       :' + IPNo + Space).substring(0, 25) + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += TypeLine;
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Adv = 0; var RowCo = Rowlen //Rowlen;
    var sln = 1;
    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i);
        var Descr = $.trim($('#Product' + Id).val());

          
        if ($.trim($('#Product' + Id).val()) != undefined && $.trim($('#Product' + Id).val()) != 'undefined' && $.trim($('#Product' + Id).val()) != ' ' && $.trim($('#Product' + Id).val()).length > 0) {
            sln++;
            Descr = Descr + Space;

          //  Amnt = Amnt.substring(Amnt.length - 10, Amnt.length)

            var Qty = Space + $('#Quantity' + Id).val(); var Exp = $('#Expiry' + Id).val() + Space;
            var Batch = $('#ProductDesc' + Id).val() + Space; var Mrp = Space + $('#PurPrice' + Id).val() ;
            var Tax = Space + $('#TaxAmt' + Id).val(); var Taxable = Space + $('#TaxableAmt' + Id).val(); 
            var MFRv = $('#Company' + Id).val() + Space;
            var Disco = parseFloat($('#DiscountPerc' + Id).val()); Disco = (' ' + Disco + Space).substring(0, 3);
            //if ((Disco.charAt(Disco.length - 1)) == '.') { Disco = Disco.substring(0, Disco.length - 1); }
            var Rate = $('#SellPrice' + Id).val() + Space;
            Rate = Rate.substring(0, 8)
            //Rate = Rate.substring(Rate.length - 10, Rate.length);
            var Amnt = Space + $('#Amount' + Id).val();
            Amnt = Amnt.substring(Amnt.length - 8, Amnt.length);
           
            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + (Descr + Space).substring(0, 8) + (Batch + Space).substring(0, 6) + (MFRv + Space).substring(0, 3) + " " + Exp.substring(0, 8) + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate + " " + Disco + " " + Amnt + '</td></tr>';    //+ Mrp.substring(Mrp.length - 10, Mrp.length) + " " + Taxable.substring(Taxable.length - 10, Taxable.length) + " " + Tax.substring(Tax.length - 10, Tax.length) + " "
            }
            else {
                //Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Descr.substring(0, 42) + Qty.substring(0, 7) + " " + Rate + " " + TestAmount + '</td></tr>';
                Line += '<tr><td>' + Leftalign + '</td><td>' + (Descr + Space).substring(0, 8) + (Batch + Space).substring(0, 6) + (MFRv + Space).substring(0, 3) + " " + Exp.substring(0, 8) + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate + " " + Disco + " " + Amnt + '</td></tr>';  //+ Mrp.substring(Mrp.length - 10, Mrp.length) + " " + Taxable.substring(Taxable.length - 10, Taxable.length) + " " + Tax.substring(Tax.length - 10, Tax.length) + " "
            }

            //if (i == 7 || i == 13) {
            //    Line = "<tr><th></th></tr>";
            //    Line += '<tr><td>.</td></tr>'
            //    Line += '<tr><td>.</td></tr><tr><td>.</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + ' ' + String.fromCharCode(27) + "E" + String.fromCharCode(14) + Hosp + String.fromCharCode(20) + String.fromCharCode(27) + "F" + '       </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + '    ' + Address + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + PH + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + GSTR + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Reg No :" + $('#HRegNo').val() + Space).substring(0, 20) + '       ' + String.fromCharCode(27) + BillType + '  ' + String.fromCharCode(27) + 'Bill No     :' + BillNo + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Patient:" + $('#HPatient').val() + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Date        :' + $('#HSalesDate').val() + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Doctor :" + Doctor + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Gender/Age  :' + Gend + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP#    :" + OPNo).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'IP#         :' + IPNo + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
            //    Line += TypeLine;
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
            //    RowCo = Rowlen - 7
            //}
        }
    }
    var Prlen=1;
    try {
        var Prlen = $('#TblProcedure tr:last').attr('id').match(/\d+/)[0];
    }
    catch (err) {
        Prlen = 1;
    }
    

    for (var i = 1; i <= Prlen; i++) {
        var Id = parseInt(i);
        var Descr = $.trim($('#Procedure' + Id).val());

        if ($('#PCRow' + Id).length > 0) {
           
            Descr = Descr + Space;

            //  Amnt = Amnt.substring(Amnt.length - 10, Amnt.length)

            var Qty = Space + $('#ProcQty' + Id).val();
            var Rate = $('#ProcFee' + Id).val() + Space; Rate = Rate.substring(0, 8);
            var Exp = "" + Space;
            var Batch = "" + Space; var Mrp = Space + $('#ProcFee' + Id).val();
            var Tax = Space + $('#ProcTaxamt' + Id).val(); var Taxable = Space + $('#ProcTaxable' + Id).val();
            var MFRv = '' + Space; var Disco = (' 0' + Space).substring(0, 3);
            //Rate = Rate.substring(Rate.length - 10, Rate.length);
            var Amnt = Space + $.trim($('#ProcTot' + Id).val());
            Amnt = Amnt.substring(Amnt.length - 8, Amnt.length);

            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + (Descr + Space).substring(0, 8) + (Batch + Space).substring(0, 6) + (MFRv + Space).substring(0, 3) + " " + Exp.substring(0, 8) + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate + " " + Disco + " " + Amnt + '</td></tr>';  //+ Mrp.substring(Mrp.length - 10, Mrp.length) + " " + Taxable.substring(Taxable.length - 10, Taxable.length) + " " + Tax.substring(Tax.length - 10, Tax.length) + " " 
            }
            else {
                //Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Descr.substring(0, 42) + Qty.substring(0, 7) + " " + Rate + " " + TestAmount + '</td></tr>';
                Line += '<tr><td>' + Leftalign + '</td><td>' + (Descr + Space).substring(0, 8) + (Batch + Space).substring(0, 6) + (MFRv + Space).substring(0, 3) + " " + Exp.substring(0, 8) + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate + " " + Disco + " " + Amnt + '</td></tr>';  //+ Mrp.substring(Mrp.length - 10, Mrp.length) + " " + Taxable.substring(Taxable.length - 10, Taxable.length) + " " + Tax.substring(Tax.length - 10, Tax.length) + " "
            }
            sln++;
        }
    }


    for (var i = 0; i < 8 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Spliter = '----------------------'



    var TaxLine = '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'GST                            SubTotal    Discount   CGST    SGST    Tot Tax'
        + String.fromCharCode(27) + "F" + '</td></tr>'


    var SGSTAmt = 0, CGSTAmt = 0;
    for (var j = 0; j < TaxRateArray.length; j++) {
        var TaxVal = TaxRateArray[j]; var k = parseInt(j) + 1;
        
        var Txgrp = $('#TaxGrpname' + TaxVal).text() + Space;
        var splittaxable = Space + $('#splittaxable_' + TaxVal).val();
        var CGST = Space +  $('#CGST_' + TaxVal).val();
        var SGST = Space +  $('#SGST_' + TaxVal).val() ;
        var splittax = Space + $('#splittax_' + TaxVal).val() ;
        var Disc = Space + '0.00' ;
        if ((splittax > 0) || (TaxVal == 0 && splittaxable>0)) {
            TaxLine += '<tr><td>' + Leftalign + '</td><td>' + Txgrp.substring(0, 32) + " " + splittaxable.substring(splittaxable.length - 7, splittaxable.length) + " " + Disc.substring(Disc.length - 11, Disc.length) + " " + CGST.substring(CGST.length - 7, CGST.length) + " " + SGST.substring(SGST.length - 7, SGST.length) + " " + splittax.substring(splittax.length - 11, splittax.length) + '</td></tr>';
        }
        SGSTAmt = parseFloat(SGSTAmt) + parseFloat($('#CGST_' + TaxVal).val());
        CGSTAmt = parseFloat(CGSTAmt) + parseFloat($('#SGST_' + TaxVal).val());
    }

    var subtot = "SUB TOTAL" + Space;
    var TotTaxable = Space + $('#TotalTaxable').val();
    var Tottax = Space + $('#TotlaTax').val();
    SGSTAmt = Space + SGSTAmt;
    CGSTAmt = Space + CGSTAmt ;
    var TotDisc = Space + '0.00' ;

    TaxLine += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'

    TaxLine += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + subtot.substring(0, 30) + " " + TotTaxable.substring(TotTaxable.length - 7, TotTaxable.length) + " " + TotDisc.substring(TotDisc.length - 11, TotDisc.length) + " " + CGSTAmt.substring(CGSTAmt.length - 7, CGSTAmt.length) + " " + SGSTAmt.substring(SGSTAmt.length - 7, SGSTAmt.length) + " " + Tottax.substring(Tottax.length - 11, Tottax.length) + String.fromCharCode(27) + "F" + '</td></tr>';
   
    //Line += TaxLine;




   
        if ($('#hiddensplittaxable_5').val() != 0)
        { Line += '<tr><td>' + Leftalign +  'CGST 2.5%  on ' + $('#hiddensplittaxable_5').val() + '  ' + $('#CGST_5').val() + '   SGST 2.5% on ' + $('#hiddensplittaxable_5').val() + ' ' + $('#CGST_5').val() + '</td></tr>' }
        if ($('#splittaxable_12').val() != 0)
        { Line += '<tr><td>' + 'CGST 6.0%  on ' + $('#hiddensplittaxable_12').val() + '  ' + $('#CGST_12').val() + '   SGST 6.0% on ' + $('#hiddensplittaxable_12').val() + ' ' + $('#CGST_12').val()  + '</td></tr>' }
        if ($('#splittaxable_18').val() != 0)
        { Line += '<tr><td>' + Leftalign +'CGST 9.0%  on ' + $('#hiddensplittaxable_18').val() + '  ' + $('#CGST_18').val() + '   SGST 9.0% on ' + $('#hiddensplittaxable_18').val() + ' ' + $('#CGST_18').val() +  '</td></tr>' }
        if ($('#splittaxable_28').val() != 0)
        { Line += '<tr><td>' + Leftalign + 'CGST14.0%  on ' + $('#hiddensplittaxable_28').val() + '  ' + $('#CGST_28').val() + '   SGST14.0% on ' + $('#hiddensplittaxable_28').val() + ' ' + $('#CGST_28').val() +  '</td></tr>' }
    

   Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'

   
    Leftalign = '                              ';
    var TotalLine1 = ' Total :' + (Leftalign + $('#BaseTextTotalProc').text()).substr((Leftalign + $('#BaseTextTotalProc').text()).length - 10) ;


    Line += '<tr><td>' + (AmountinWords + '' + Leftalign).substr(0, Leftalign.length - 1) + '</td><td>' + TotalLine1 + '</td></tr>'

    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';

    $('#DosPrinthms').append(Line);

    PrintDosPrintHospitalSales(Type);
}


function PrintDosPrintHospitalSalesReturn(Type) {
    var titles = [];
    var data = [];
    $('.dataTablehms th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTablehms tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = Type + ".txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    $('#DosPrinthms').html('');
}


function PrintthisBillHospitalSalesReturn(Type, Rowlen, Flag) {
    $('#DosPrinthms').html('');
    var Line = "";

    var AmountinWords = convertNumberToWords($('#BaseTextTotal').text())
    var terms = ''

    var Space = '                                                                                            ';
    var Leftalign = '';
    var Break = '------------------------------------------------------------------------------'

    if ($('#Remarks').val() == '') {
        terms = ($('#Remarks').val() + Space).substring(0, 24)
    }
    else {
        terms = Space.substring(0, 24)
    }
    var BillType = (Type + Space).substring(0, 15);
    var BillNo = $('#HBillNoCopy').val() + Space;
    var Gend = ($.trim($('#HGender').val()) + '/' + $('#Hage').val() + Space);
    var Doctor = $.trim($('#HDoctor :selected').text()) + Space;
    var Hosp = $.trim(CompanySettingsArray.CompanyName);
    var Address = CompanySettingsArray.Address;
    var PhoneNo = CompanySettingsArray.PhoneNo;
    var Fax = CompanySettingsArray.Fax;
    var TRNNo = 'TRN : ' + CompanySettingsArray.TRNNo;
    var Gstno = 'GST : ' + CompanySettingsArray.TRNNo;
    var OPNo = $.trim($('#HOpNo').val()) + Space; var IPNo = $.trim($('#IPNumber').val()) + Space;
    var PH = 'PH :' + PhoneNo + ' , FAX : ' + Fax;
    var GSTR = $.trim(TRNNo) + ' , ' + $.trim(Gstno);

    var Dash = "-----------------------------------------------------";
    var TotColumn = parseInt(Dash.length / 2);

    var Head1Length = parseInt(TotColumn / 2) - parseInt(Hosp.length / 2);
    var Head2Length = parseInt(TotColumn / 2) - parseInt(Address.length / 2);
    var Head3Length = parseInt(TotColumn / 2) - parseInt(PH.length / 2);
    var Head4Length = parseInt(TotColumn / 2) - parseInt(GSTR.length / 2);

    Hosp = Space.substring(0, Head1Length) + Hosp.trim();
    Address = Space.substring(0, Head2Length) + Address.trim();
    PH = Space.substring(0, Head3Length) + PH.trim();
    GSTR = Space.substring(0, Head4Length) + GSTR.trim();

    var TypeLine = '';
    //TypeLine += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  Description                             Qty     Rate       Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
    TypeLine += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  Item           Batch   Exp     Qty  Rate     MRP    Taxable  Tax  Amount' + String.fromCharCode(27) + "F" + '</td></tr>'


    Line = "<tr><th></th></tr>";
    Line += '<tr><td>.</td></tr>'               //<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>     
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr>'   //
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + ' ' + String.fromCharCode(27) + "E" + String.fromCharCode(14) + Hosp + String.fromCharCode(20) + String.fromCharCode(27) + "F" + '       </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + '    ' + Address + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + PH + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + GSTR + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Reg No :" + $('#HRegNo').val() + Space).substring(0, 20) + '       ' + String.fromCharCode(27) + BillType + '  ' + String.fromCharCode(27) + 'Bill No     :' + BillNo + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Patient:" + $('#HPatient').val() + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Date        :' + $('#HSalesDate').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Doctor :" + Doctor + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Gender/Age  :' + Gend + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP#    :" + OPNo).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'IP#         :' + IPNo + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += TypeLine;
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Adv = 0; var RowCo = Rowlen;

    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i);
        var Descr = $.trim($('#Product' + Id).val());


        if ($.trim($('#Product' + Id).val()) != undefined && $.trim($('#Product' + Id).val()) != 'undefined' && $.trim($('#Product' + Id).val()) != ' ' && $.trim($('#Product' + Id).val()).length > 0) {

            Descr = Descr + Space;

            //  Amnt = Amnt.substring(Amnt.length - 10, Amnt.length)

            var Qty = Space + $('#Quantity' + Id).val(); var Rate = Space + $('#SellPrice' + Id).val(); var Exp = $('#Expiry' + Id).val() + Space;
            var Batch = $('#ProductDesc' + Id).val() + Space; var Mrp = Space + $('#PurPrice' + Id).val();
            var Tax = Space + $('#TaxAmt' + Id).val(); var Taxable = Space + $('#TaxableAmt' + Id).val(); var Amnt = Space + $('#Amount' + Id).val();

            //Rate = Rate.substring(Rate.length - 10, Rate.length);


            if (i > 9) {
                Line += '<tr><td>' + Leftalign + '</td><td>' + '' + (i + Space).substring(0, 2) + '   ' + Descr.substring(0, 15) + " " + Batch.substring(0, 7) + " " + Exp.substring(0, 7) + " " + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate.substring(Rate.length - 7, Rate.length) + " " + Mrp.substring(Mrp.length - 7, Mrp.length) + " " + Taxable.substring(Taxable.length - 7, Taxable.length) + " " + Tax.substring(Tax.length - 7, Tax.length) + " " + Amnt.substring(Amnt.length - 7, Amnt.length) + '</td></tr>';
            }
            else {
                //Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Descr.substring(0, 42) + Qty.substring(0, 7) + " " + Rate + " " + TestAmount + '</td></tr>';
                Line += '<tr><td>' + Leftalign + '</td><td>' + '' + (i + Space).substring(0, 2) + '   ' + Descr.substring(0, 15) + " " + Batch.substring(0, 7) + " " + Exp.substring(0, 7) + " " + Qty.substring(Qty.length - 3, Qty.length) + " " + Rate.substring(Rate.length - 7, Rate.length) + " " + Mrp.substring(Mrp.length - 7, Mrp.length) + " " + Taxable.substring(Taxable.length - 7, Taxable.length) + " " + Tax.substring(Tax.length - 7, Tax.length) + " " + Amnt.substring(Amnt.length - 7, Amnt.length) + '</td></tr>';
            }


            //if (i == 7 || i == 13) {
            //    Line = "<tr><th></th></tr>";
            //    Line += '<tr><td>.</td></tr>'
            //    Line += '<tr><td>.</td></tr><tr><td>.</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + ' ' + String.fromCharCode(27) + "E" + String.fromCharCode(14) + Hosp + String.fromCharCode(20) + String.fromCharCode(27) + "F" + '       </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + '    ' + Address + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + PH + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 17) + GSTR + '                               </td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Reg No :" + $('#HRegNo').val() + Space).substring(0, 20) + '       ' + String.fromCharCode(27) + BillType + '  ' + String.fromCharCode(27) + 'Bill No     :' + BillNo + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Patient:" + $('#HPatient').val() + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Date        :' + $('#HSalesDate').val() + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Doctor :" + Doctor + Space).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'Gender/Age  :' + Gend + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP#    :" + OPNo).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'IP#         :' + IPNo + '</td></tr>'
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
            //    Line += TypeLine;
            //    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'

            //    RowCo = Rowlen - 7
            //}
        }
    }

    for (var i = 0; i < 8 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    var Spliter = '----------------------'



    var TaxLine = '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'GST                          SubTotal    Discount   CGST    SGST    Tot Tax'
        + String.fromCharCode(27) + "F" + '</td></tr>'


    var SGSTAmt = 0, CGSTAmt = 0;
    for (var j = 0; j < TaxRateArray.length; j++) {
        var TaxVal = TaxRateArray[j]; var k = parseInt(j) + 1;

        var Txgrp = $('#TaxGrpname' + TaxVal).text() + Space;
        var splittaxable = $('#splittaxable_' + TaxVal).val() + Space;
        var CGST = $('#CGST_' + TaxVal).val() + Space;
        var SGST = $('#SGST_' + TaxVal).val() + Space;
        var splittax = $('#splittax_' + TaxVal).val() + Space;
        var Disc = '0.00' + Space;
        if ((splittax > 0) || (TaxVal == 0 && splittaxable > 0)) {
            TaxLine += '<tr><td>' + Leftalign + '</td><td>' + Txgrp.substring(0, 30) + " " + splittaxable.substring(0, 11) + " " + Disc.substring(0, 10) + " " + CGST.substring(0, 7) + " " + SGST.substring(0, 7) + " " + splittax.substring(0, 10) + '</td></tr>';
        }
        SGSTAmt = parseFloat(SGSTAmt) + parseFloat($('#CGST_' + TaxVal).val());
        CGSTAmt = parseFloat(CGSTAmt) + parseFloat($('#SGST_' + TaxVal).val());
    }

    var subtot = "SUB TOTAL" + Space;
    var TotTaxable = $('#TotalTaxable').val() + Space;
    var Tottax = $('#TotlaTax').val() + Space;
    SGSTAmt = SGSTAmt + Space;
    CGSTAmt = CGSTAmt + Space;
    var TotDisc = '0.00' + Space;

    TaxLine += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'

    TaxLine += '<tr><td>' + Leftalign + '</td><td>' + subtot.substring(0, 30) + " " + TotTaxable.substring(0, 11) + " " + TotDisc.substring(0, 10) + " " + CGSTAmt.substring(0, 7) + " " + SGSTAmt.substring(0, 7) + " " + Tottax.substring(0, 10) + '</td></tr>';



    Line += TaxLine;

    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'


    Leftalign = '                                                   ';
    var TotalLine1 = String.fromCharCode(27) + "E" + ' Total      :' + (Leftalign + $('#BaseTextTotal').text()).substr((Leftalign + $('#BaseTextTotal').text()).length - 10);


    Line += '<tr><td>' + (AmountinWords + ' Only' + Leftalign).substr(0, Leftalign.length - 1) + '</td><td>' + TotalLine1 + '</td></tr>'

    $('#DosPrinthms').append(Line);

    PrintDosPrintHospitalSalesReturn(Type); 
}

function PrintthisBillLabDotmatrix(Rowlen, Type) {

   
    $('#DosPrint').html('');
    var Line = "";

    var AmountinWords =  convertNumberToWords($('#GrandTotal').text())
    var terms = ''

    var Space = '                                                                                            ';
    var Leftalign = '';
    var Break = '--------------------------------------------------------'

    if ($('#txtmsg').val() == '') {
        terms = ($('#txtmsg').val() + Space).substring(0, 24)
    }
    else {
        terms = Space.substring(0, 24)
    }
    var BillType = (Type + Space).substring(0, 15);
    var BillNo = $('#BillNoCopy').val() ;
    var Gend = ($.trim($('#Gender :selected').text()) +'/'+$('#Age').val()+ Space);
    var Doctor = $.trim($('#Doctor :selected').text()) + Space;
    var Hosp = $.trim(CompanySettingsArray.CompanyName) ;
    var Address = CompanySettingsArray.Address;
    var PhoneNo = CompanySettingsArray.PhoneNo;
    var Fax = CompanySettingsArray.Fax;
    var TRNNo = 'GST :' + CompanySettingsArray.TRNNo; 
    var OPNo = $.trim($('#OpNo').val()) + Space; var IPNo = $.trim($('#IpNo').val()) + Space;
    var PH = 'PH :' + PhoneNo + ' , ' + Fax ;

    var Dash = "----------------------------------";
    var TotColumn = parseInt(Dash.length / 2);

    var Head1Length = parseInt(TotColumn / 2) - parseInt(Hosp.length / 2);
    var Head2Length = parseInt(TotColumn / 2) - parseInt(Address.length / 2);
    var Head3Length = parseInt(TotColumn / 2) - parseInt(PH.length / 2);
    var Head4Length = parseInt(TotColumn / 2) - parseInt(TRNNo.length / 2);

    Hosp = Space.substring(0, Head1Length) + Hosp.trim();
    Address = Space.substring(0, Head2Length) + Address.trim();
    PH = Space.substring(0, Head3Length) + PH.trim();
    TRNNo = Space.substring(0, Head4Length) + TRNNo.trim();

    var TypeLine = '';
    if (Type == 'LAB BILL')
    TypeLine+='<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  Department        Test                        Amount' + String.fromCharCode(27) + "F" + '</td></tr>'
    else
    TypeLine+='<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'No  Description        Qty       Rate       Amount' + String.fromCharCode(27) + "F" + '</td></tr>'


    Line = "<tr><th></th></tr>";   
    Line += '<tr><td>.</td></tr>'               //<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>     
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' +'        '+ String.fromCharCode(27) + "E" + String.fromCharCode(14) + Hosp + String.fromCharCode(20) + String.fromCharCode(27) + "F" + '       </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + '        ' + Address + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("  " + Space).substring(0, 15) + PH + '                               </td></tr>'
    //Line += '<tr><td>' + Leftalign + '</td><td>' + ("         " + Space).substring(0, 21) +  TRNNo + '                               </td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>'+"               " +  BillType + '</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP No :" + OPNo + Space).substring(0, 22)                + '       ' + 'Bill No :' + BillNo + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Patient:" + $('#Name').val()  + Space).substring(0, 22)  + '       ' + 'Date    :' + $('#BillDate').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + ("Doctor :" + Doctor            + Space).substring(0, 22) +'</td></tr>'
    //Line += '<tr><td>' + Leftalign + '</td><td>' + ("OP#    :" + OPNo).substring(0, 30) + String.fromCharCode(27) + '              ' + String.fromCharCode(27) + 'IP#         :' + IPNo + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Line += TypeLine;
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'                                                                                             
    var Adv = 0; var RowCo = Rowlen;

    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i);
        var TestName = $.trim($('#TestName' + Id).val());  var TestAmount = Space + $('#TestAmount' + Id).val();
     
        if (TestName != undefined) {
           
            TestName = TestName + Space;
            TestAmount = TestAmount.substring(TestAmount.length - 10, TestAmount.length)

            if (Type == 'LAB BILL') {
                var Department = $.trim($('#Department' + Id + ' :selected').text()) + Space;
                if (i > 9) {
                    Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Department.substring(0, 15) + TestName.substring(0, 27) + " " + TestAmount + '</td></tr>';
                }
                else {
                    Line += '<tr><td>' + Leftalign + '</td><td>' + ' ' + i + '   ' + Department.substring(0, 15) + TestName.substring(0, 27) + " " + TestAmount + '</td></tr>';
                }
            }
            else 
            {
                var Qty = $('#PQty' + Id).val() + Space; var Rate = Space+$('#PRate' + Id).val();
                Rate = Rate.substring(Rate.length - 10, Rate.length);
                var Descr = $.trim($('#TestCode' + Id).val()) + Space;
                if (i > 9) {
                    Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Descr.substring(0, 20) + Qty.substring(0, 5) + "" + Rate + " " + TestAmount + '</td></tr>';
                }
                else {
                    Line += '<tr><td>' + Leftalign + '</td><td>' + '' + i + '   ' + Descr.substring(0, 20) + Qty.substring(0, 5) + "" + Rate + " " + TestAmount + '</td></tr>';
                }
            }

            }
    }

    for (var i = 0; i < 8 - RowCo; i++) {
        Line += '<tr><td>.</td></tr>';
    }
    Line += '<tr><td>' + Leftalign + '</td><td>' + Break + '</td></tr>'
    Leftalign = '                                                   ';
    var TotalLine1 = String.fromCharCode(27) + "E" + ' Total      :' + (Leftalign + $('#GrandTotal').text()).substr((Leftalign + $('#GrandTotal').text()).length - 10);
    var Spliter = '----------------------'

    Line += '<tr><td>'+"                          "+'</td><td>' + TotalLine1 + '</td></tr>'
    Line += '<tr><td>' + (AmountinWords + ' Only' + Leftalign).substr(0, Leftalign.length - 1) +  String.fromCharCode(27) + "F" + '</td><td></td></tr>'

    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';
    Line += '<tr><td>.</td></tr>';

    
    $('#DosPrint').append(Line);
    PrintDosPrintLab(Type);

}

function PrintDosPrintLab(Type) {

    var titles = [];
    var data = [];
    $('.dataTableprint th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableprint tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'printbill' + ".txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    //$('#DosPrint').html('');
}


function convertNumberToWords(amount) {
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}






function prepCSVRow(arr, columnCount, initial) {
    var row = ''; // this will hold data
    var delimeter = ''; // data slice separator, in excel it's `;`, in usual CSv it's `,`
    var newLine = '\r\n'; // newline separator for CSV row
    function splitArray(_arr, _count) {
        var splitted = [];
        var result = [];
        _arr.forEach(function (item, idx) {
            if ((idx + 1) % _count === 0) {
                splitted.push(item);
                result.push(splitted);
                splitted = [];
            } else {
                splitted.push(item);
            }
        });
        return result;
    }
    var plainArr = splitArray(arr, columnCount);
    plainArr.forEach(function (arrItem) {
        arrItem.forEach(function (item, idx) {
            row += item + ((idx + 1) === arrItem.length ? '' : delimeter);
        });
        row += newLine;
    });
    return initial + row;
}


function PrintDosPrintFazal() {

    var titles = [];
    var data = [];
    $('.dataTableFazal th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableFazal tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    $('#DosPrintFazal').html('');
}


function PrintDosPrint() {

    var titles = [];
    var data = [];
    $('.dataTable th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTable tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    $('#DosPrint').html('');
}

function PrintDosPrintNew() {

    var titles = [];
    var data = [];
    $('.dataTableNew th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableNew tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    $('#DosPrintNew').html('');
}


function PrintDosPrintSR() {

    var titles = [];
    var data = [];
    $('.dataTableSR th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableSR tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}


function PrintDosPrintRV() {

    var titles = [];
    var data = [];

    $('.dataTableRV th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableRV tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function PrintDosPrintPV() {

    var titles = [];
    var data = [];

    $('.dataTablePV th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTablePV tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}
function PrintDosPrintVC() {

    var titles = [];
    var data = [];

    $('.dataTableVC th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableVC tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}



function PrintDosPrintVE() {

    var titles = [];
    var data = [];

    $('.dataTableVE th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableVE tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function PrintDosPrintVEM() {

    var titles = [];
    var data = [];

    $('.dataTableVEM th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableVEM tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_sales.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

}

function PrintVCCSave(Rowlen) {
    $('#DosPrintRV').html('');
    var AmountinWords = '  ' + convertNumberToWords($('#amountid').val())

    var Space = '                                                                                            ';
    var Space1 = '              '
    var Leftalign = '';
    var Line = "<tr><th></th></tr>";
    var Cash = 'Cash';
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + '  RECEIPT VOUCHER    ' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Space1 + Space1 + Space1 + '   RV No     :' + $('#vccnoid').val()  + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Amount:  ' + ($('#amountid').val() + Space).substring(0, 30) + String.fromCharCode(27) + "F" + '   Date     :' + $('#date').val() + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Received with thanks from  ' + $('#txtcustomer').val() + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of ' + $('#select_crncy option:selected').html() + ' ' + AmountinWords + 'Only' + String.fromCharCode(27) + "F" + '</td></tr>'

    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Cash + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'

    var Invo = $('#txtinvono1').val() + Space1; 
    var chasisnumber = $('#chassisnoid').val();
    var Desc = 'Deposit Received  Against :' + chasisnumber+' - ' + $('#prodesc1').val();

        
    Line += '<tr><td>.</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Desc + '</td></tr>'       
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintRV').append(Line);
    PrintDosPrintRV();
}



function PrintVCCPaymentSave(Rowlen) {
    $('#DosPrintPV').html('');
    var AmountinWords = ' ' + convertNumberToWords($('#amountid').val())

    var Space = '                                                                                            ';
    var Space1 = '              '
    var Leftalign = '';
    var Line = "<tr><th></th></tr>";
    var Cash = 'Cash';
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    Line += '<tr><td>' + Leftalign + '</td><td>' + (Space).substring(0, 30) + String.fromCharCode(27) + "E" + '  Payment Voucher  ' + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Space1 + Space1 + Space1 + ' PV No     :' + $('#vccnoid').val() + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Amount:  ' + ($('#amountid').val() + Space).substring(0, 30) + String.fromCharCode(27) + "F" + ' Date       :' + $('#date').val() + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'Pay To  MR/MRS   ' + $('#txtcustomer').val() + String.fromCharCode(27) + "F" + '</td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + String.fromCharCode(27) + "E" + 'The Sum of ' + $('#select_crncy option:selected').html() + ' ' + AmountinWords + 'Only' + String.fromCharCode(27) + "F" + '</td></tr>'

    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + Cash + '</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'


    var Invo = $('#txtinvono1').val() + Space1; var chasisnumber = $('#chassisnoid').val();
    var Desc = 'Deposit Received  Against :' + chasisnumber + ' - ' + $('#prodesc1').val();


    Line += '<tr><td>.</td></tr>'
    Line += '<tr><td>.</td><td></td><td></td></tr>'
    Line += '<tr><td>' + Leftalign + '</td><td>' + 'Description        :  ' + Desc + '</td></tr>'
    Line += '<tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr><tr><td>.</td></tr>'

    $('#DosPrintPV').append(Line);
    PrintDosPrintPV();
}