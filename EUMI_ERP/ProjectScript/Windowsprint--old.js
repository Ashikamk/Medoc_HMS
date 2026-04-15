


var ComapnydivToPrint = document.getElementById("ComapnyImage");
var ComapnyImgToPrint = document.getElementById("ComapnyImage");
var ComapnydivToPrintLab = document.getElementById("ComapnyImage");

var GasLogo = document.getElementById("ComapnyImageDashbpard"); 

//Flag -Purchase or sales or return
//Rowlen-length of item list
//type-Copy Or Orginal print

//Function to convert amount into currency format
function addCommas(x) {
    var amt = x || 0;
    var parts = amt.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

 





function PrintthisBillWindows(Flag, Rowlen, type) {

   
    
    if (Flag == 'PUR') {
        PrintthisBillPurchase(Rowlen)
    }
    else if (Flag == 'PERFORMA') {
        PrintthisPurchasePerforma(Rowlen)       
    }
    else if (Flag == 'UNLOADPERFORMA') {
        PrintthisUnloadPurchasePerforma(Rowlen)
    }
    else if (Flag == 'PUROrder') {
        PrintthisBillPurchaseOrder(Rowlen)
    }
    else if (Flag == 'SALES') {
        if (type == 'MAIN')
            PrintthisBillSales(Rowlen)
        else if (type == 'COPY')
            PrintthisBillSalesCopy(Rowlen)
        else if (type == 'MAINMOBILE')
            PrintthisBillSalesMobile(Rowlen)
        else if (type == 'COPYMOBILE')
            PrintthisBillSalesMobileCopy(Rowlen)
        else if (type == 'MAINORYX')
            PrintthisBillSalesORYX(Rowlen)
        else if (type == 'COPYORYX')
            PrintthisBillSalesCopyORYX(Rowlen)
        else if (type == 'MAINAUTOMOBILES')
            PrintthisBillSalesAUTOMOBILES(Rowlen)
        else if (type == 'COPYAUTOMOBILES')
            PrintthisBillSalesCOPYAUTOMOBILES(Rowlen)
        else if (type == 'WITHBINAUTOMOBILESCOPY')
            PrintthisBillSalesWITHBINAUTOMOBILES(Rowlen, 1);
        else if (type == 'WITHBINAUTOMOBILESSAVE') 
            PrintthisBillSalesWITHBINAUTOMOBILES(Rowlen, 0);

        else if (type == 'AUTOGLASSSAVE')
            PrintthisBillForAUTOGLASSLazor(Rowlen, 0);
        else if (type == 'AUTOGLASSCOPY')
            PrintthisBillForAUTOGLASSLazor(Rowlen, 1);

        else if (type == 'AUTOPARTSSAVE')
            PrintthisBillForAUTOPARTSLazor(Rowlen, 0);
        else if (type == 'AUTOPARTSCOPY')
            PrintthisBillForAUTOPARTSLazor(Rowlen, 1);
   //----------------------SPARE PARTS
        else if (type == 'WITHBINSPAREPARTSCOPY') 
            PrintthisBillSalesWITHBINSPAREPARTS(Rowlen, 1);
        else if (type == 'WITHBINSPAREPARTSSAVE')
            PrintthisBillSalesWITHBINSPAREPARTS(Rowlen, 0);
        else if (type == 'MAINSPAREPARTS')
            PrintthisBillSalesSPAREPARTS(Rowlen)
        else if (type == 'COPYSPAREPARTS')
            PrintthisBillSalesCOPYSPAREPARTS(Rowlen)

            //-------------------Gas Trading
        else if (type == 'SALESGASSAVE') {
            PrintthisSalesGas(Rowlen, 0)
        }
        else if (type == 'SALESGASCOPY') {
            PrintthisSalesGas(Rowlen, 1)
        }
            //-------------------Rent Car
        else if (type == 'SALESRENTCARSAVE') {
            PrintthisSalesRentCar(Rowlen, 0)
        }
        else if (type == 'SALESRENTCARCOPY') {
            PrintthisSalesRentCar(Rowlen, 1)
        }
        else if (type == 'SALESRENTCARSAVENEW') {
            PrintthisSalesRentCarNew(Rowlen, 0)
        }
        else if (type == 'SALESRENTCARCOPYNEW') { 
            PrintthisSalesRentCarNew(Rowlen, 1)
        }
        
    }
    else if (Flag == 'FAZAL') {
        if (type == 'COPY')
            PrintthisBillForFazalLazor(Rowlen,1)
        else if (type == 'SAVE')
            PrintthisBillForFazalLazor(Rowlen, 0)
}
    else if (Flag == 'QUOTATION') {
        if (type == 'MAIN')
        { PrintthisBillQuotation(Rowlen) }      
        else
        { PrintthisBillQuotationCopy(Rowlen) }
     
    }

    else if (Flag == 'QUOTATIONGAS') {
        if (type == 'MAIN')
        { PrintthisBillQuotationforGas(Rowlen, 1) }
        else
        { PrintthisBillQuotationforGas(Rowlen, 0) }

    }

    else if (Flag == 'SALESORDER') {
        if (type == 'COPYSO')
            PrintthisBillSalesOrder(Rowlen, 1);
        
    }

    else if (Flag == 'SALESRETURN') {
        if (type == 'MAIN')
            PrintthisBillSalesReturn(Rowlen)
        else if (type == 'COPY')
            PrintthisBillSalesReturnCopy(Rowlen)
        else if (type == 'COPYAUTOMOBILES')
            PrintthisBillSalesReturnAutoMobile(Rowlen, 1)
        else if (type == 'MAINAUTOMOBILES')
            PrintthisBillSalesReturnAutoMobile(Rowlen, 0)
        else if (type == 'RETURNAUTOCOPY')
            PrintthisSalesRETURNAUTO(Rowlen, 1);
        else if (type == 'RETURNAUTOMAIN') 
            PrintthisSalesRETURNAUTO(Rowlen, 0);
      
        else if (type == 'DEFAULTMAIN')
            PrintthisBillSalesReturnDefault(Rowlen, 0);
        else if (type == 'DEFAULTCOPY')
            PrintthisBillSalesReturnDefault(Rowlen, 1);

        else if (type == 'DEFAULT_LTR_MAIN')
            PrintthisBillSalesReturnDefaultLetter(Rowlen, 0);
        else if (type == 'DEFAULT_LTR_COPY')
            PrintthisBillSalesReturnDefaultLetter(Rowlen, 1);

        
    }

    else if (Flag == 'VoucherEntry') {
        if (type == 'COPY') 
            PrintthisVoucherEntryCopy(Rowlen)
        else if (type == 'SAVE') 
            PrintthisVoucherEntrysave(Rowlen)

        else if (type == 'DEFAULTCOPY')
            PrintthisVoucherEntryDefault(Rowlen,0)
        else if (type == 'DEFAULTSAVE')
            PrintthisVoucherEntryDefault(Rowlen, 1)
        else if (type == 'LAZORCOPY') {
            PrintthisVoucherEntryLazor(Rowlen, 1)
        }
        else if (type == 'LAZORSAVE') {
            PrintthisVoucherEntryLazor(Rowlen, 0)
        }
    }
 
    else if (Flag == 'LOCATIONTRANSFER') {
        if (type == 'MAIN') {
            PrintthisLocationTransfer(Rowlen,0)
        }
        else if (type == 'COPY') {
            PrintthisLocationTransfer(Rowlen, 1)
        }
    }
    else if (Flag == 'StockTransferOUT') {
        if (type == 'MAIN') {
            PrintthisStockOut(Rowlen)
        }
    }
    else if (Flag == 'StockIN') {
        if (type == 'MAIN') {
            PrintthisStockIN(Rowlen)
        }
    }
    else if (Flag == 'ReceiptEntry') {
        if (type == 'COPY') {
            PrintthisReceiptEntryCopy(Rowlen)
        }
        else if (type == 'DEFAULTCOPY')
        {
            PrintthisReceiptVoucherDefault(Rowlen,1)
        }
        else if (type == 'DEFAULTSAVE')
        {
            PrintthisReceiptVoucherDefault(Rowlen,0)
        }
        else if (type == 'LAZORCOPY') {
            PrintthisReceiptVoucherLazor(Rowlen, 1)
        }
        else if (type == 'LAZORSAVE') {
            PrintthisReceiptVoucherLazor(Rowlen, 0)
        }
    }
    else if (Flag == 'ReceiptEntry1') {
        if (type == 'SAVE') {
            PrintthisReceiptEntrysave(Rowlen)
        }
        
    }
    else if (Flag == 'VCCReceived') {
   if (type == 'LAZORCOPY') {
            PrintthisVCCReceivedLazor(Rowlen, 1)
        }
        else if (type == 'LAZORSAVE') {
            PrintthisVCCReceivedLazor(Rowlen, 0)
        }
    }

    else if (Flag == 'VCCPaid') {
        if (type == 'LAZORCOPY') {
            PrintthisVCCPaidLazor(Rowlen, 1)
        }
        else if (type == 'LAZORSAVE') {
            PrintthisVCCPaidLazor(Rowlen, 0)
        }
    }



    else if (Flag == 'PaymentEntry') {
        if (type == 'COPY') {
            PrintthisPaymentEntryCopy(Rowlen)
        }
        else if (type == 'DEFAULTCOPY') {
            PrintthisPaymentVoucherDefault(Rowlen,1)
        }
        else if (type == 'DEFAULTSAVE') {
            PrintthisPaymentVoucherDefault(Rowlen,0)
        }
        else if (type == 'LAZORCOPY') {
            PrintthisPaymentVoucherLazor(Rowlen, 1)
        }
        else if (type == 'LAZORSAVE') {
            PrintthisPaymentVoucherLazor(Rowlen, 0)
        }
    }
    else if (Flag == 'PaymentEntry1') {
        if (type == 'SAVE') {
            PrintthisPaymentEntrysave(Rowlen)
        }
    }



    else if (Flag == 'PurchaseEnquiry') {
        
        PrintthisPurchaseenquiryCopy(Rowlen)
       
    }
    else if (Flag == 'CONTRACT') {

        if (type == 'CONTRACTRENTCOPY')
            PrintthisContractRENT(Rowlen, 1);

        else if (type == 'CONTRACTSDCOPY')
            PrintthisContractSD(Rowlen, 1);

    }
    else if (Flag == 'BOQ') {
        PrintthisBOQ(Rowlen)
    }
    else if (Flag == 'MaterialIssue') {
        PrintthisMaterialIssue(Rowlen)
    }
    else if (Flag == 'TM') {
        PrintthisTM(Rowlen)
    }

    else if (Flag == 'PurchaseOrder') {
        PrintthisPurchaseOrder(Rowlen)
    }
    else if (Flag == 'MaterialRequestSave') {
        PrintthisMaterialRequest(Rowlen, 0)
    }
    else if (Flag == 'MaterialRequestCopy') {
        PrintthisMaterialRequest(Rowlen, 1)
    }
    else {
        alert('Path:windowsprint.js')
    }



}

function PrintthisBillWindowsNew(Flag, Rowlen, type) 
{
    if (Flag == 'QUOTATION') {
        if (type == 'MAIN')
        { PrintthisBillQuotationNew(Rowlen,1) }  
        else
        { PrintthisBillQuotationNew(Rowlen,0) }
    }
    else if (Flag == 'QUOTATION_LETTER') {
        if (type == 'MAIN')
        { PrintthisBillQuotationNewLetter(Rowlen, 1) }
        else
        { PrintthisBillQuotationNewLetter(Rowlen, 0) }
    }
    else if (Flag == 'SALES') {
        if (type == 'SPAREPARTS')
        { PrintthisBillSalesSPAREPARTSNEW(Rowlen, 1) }
        else
        { PrintthisBillSalesSPAREPARTSNEW(Rowlen, 0) } 

    }
    else if (Flag == 'PackingHistory') {
        PrintthisBillPackingHistory(Rowlen, type) 

    }
}

function PrintthisBillWindowsHMS(Flag, Rowlen, type,Bill)
{
    if (Flag == 'LABBILL') {
       
        if (type == 'COPYHALF')
        { PrintthisBillLab(Rowlen, 0, 1,Bill) }
        else if (type == 'COPYFULL')
        { PrintthisBillLab(Rowlen, 0, 2, Bill) }
        else if (type == 'COPYFULLHEADER')
        { PrintthisBillLab(Rowlen, 0, 3, Bill) }
    }
    else if (Flag == 'SALES') {
        if (type == 'COPY')
        { PrintthisBillHMSSales(Rowlen, 0, 1) }
        else if (type == 'SAVE')
        { PrintthisBillHMSSales(Rowlen, 1, 1) }
    }
    else if (Flag == 'SALESRETURN') {
        if (type == 'COPY')
        { PrintthisBillHMSSalesReturn(Rowlen, 0, 1) }
        //else if (type == 'SAVE')
        //{ PrintthisBillHMSSales(Rowlen, 0, 1) }
    }
}

function PrintthisBillHMSSales1(Rowlen, flg, type)             //type:1 - HALF   ,type:2 - FULL   ---------- Bill : PB,LB,IB   -use Landscape mode
{

   

    var TotPQty = 0; var Rowcount =7;
    var MaxCnt;
    if (type == 1)
        MaxCnt = 47;
   
    var AmountinWords = WordwithDecimal($('#BaseTextTotalProc').text());
    var myWindow = window.open("", "", "width=1500,height=1500");
   
    $(ComapnydivToPrintLab).css('height', 70);

    var SNo = '';
    if (flg == 0)
        SNo = $('#HBillNoCopy').val();
    else if (flg == 1)
        SNo = $('#HBillNoSave').val();
  
    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);   


    $(ComapnydivToPrintLab).css('height', 130); $(ComapnydivToPrintLab).css('width', 700);
    //myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
    //myWindow.document.write('</table>');

    myWindow.document.write('<table width=100% ><tr ><td height=60px></td></tr>');
    myWindow.document.write('</table>');
    myWindow.document.write('<table width=100% ><tr ><td style="font-size:75%;" align="center">GSTIN:32AVDPJ4885C1ZS</td></tr>');
    myWindow.document.write('</table>');



    //myWindow.document.write('<table  width=100% ><tr align=center><td style="font-size: 1.875em;">' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td  align=center style="font-size: 1.375em;">' + window.CompanySettingsArray.Address + '</td></tr><tr><td  align=center style="font-size: 1.375em;" colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr><td  align=center style="font-size: 1.375em;border-bottom:1px solid black">' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    var TypeText = '';
    TypeText += '<td align=right width=10%>Paytype</td><td colspn=2 width=20% >:' + $('#PayType :selected').text() + '</td>';

    myWindow.document.write('<table style="font-size:75%;border-top:1px solid grey;border-left:1px solid black;border-right:1px solid black" width=100% ><tr ><td width=10% align=left >OP#</td><td colspan=4 align=left width=50%>' + $('#HOpNo').val() + '</td><td align=right width=10%>Bill No</td><td  colspn=2 width=20% >:' + SNo + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Patient:</td><td colspan=4 align=left width=50%>' + $('#HPatient').val() + '</td><td align=right width=10%>Date </td><td colspn=2 width=20% >:' + $('#HSalesDate').val() + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Doctor:</td><td colspan=4 align=left width=50%>' + $('#HDoctor :selected').text() + '</td>' + TypeText + '</tr>');
    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    myWindow.document.write('</table>');

    var HeaderRow = '';
    HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center width=3%>Sl#</td><td colspan=7 align=center width=28%>Product</td><td width=5% align=center>Expiry</td><td width=5% align=center>Qty.</td><td align=center width=5%>Rate</td><td align=center width=5%>Amount</td></tr>';

    myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey">' + HeaderRow);
    var slnm = 0;
    for (var i = 0; i <= Rowlen; i++) { 
        var Id = parseInt(i + 1);
        if ($('#Product' + Id).length) {
            slnm++;
            Rowcount += 1;
            myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#tdSl' + Id).text() + '</td><td colspan=7 style="padding-left:5px">' + $('#Product' + Id).val() + '</td><td style="padding-left:5px">' + $('#Expiry' + Id).val() + '</td><td align=center style="padding-left:5px">' + $('#Quantity' + Id).val() + '</td><td style="padding-right:5px" align=right>' + $('#SellPrice' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#Amount' + Id).val() + '</td></tr>');
            if (Rowcount % MaxCnt == 0) {
            Rowcount = 0;
            //myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=170px colspan=13></td></tr>');
            }
        }
    }
    var Prlen = 1;
    try {
        var Prlen = $('#TblProcedure tr:last').attr('id').match(/\d+/)[0];
    }
    catch (err) {
        Prlen = 1;
    }
    for (var i = 1; i <= Prlen; i++) {
        var Id = parseInt(i );
        if ($('#Procedure' + Id).length) {
            slnm++;
            Rowcount += 1;
            //myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + slnm + '</td><td colspan=2 style="padding-left:5px">' + $('#Procedure' + Id).val().substring(0, 20) + '</td><td style="padding-left:5px"> </td><td style="padding-left:5px"> </td><td style="padding-left:5px">' + $('#ProcQty' + Id).val() + '</td><td style="padding-left:5px"> 0 </td><td align=right style="padding-right:5px">' + $('#ProcFee' + Id).val() + '</td><td style="padding-right:5px" align=right>' + $('#ProcFee' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#ProcTaxable' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#ProcTaxamt' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#ProcTot' + Id).val() + '</td></tr>');
            if (Rowcount % MaxCnt == 0) {
                Rowcount = 0;
               // myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=170px colspan=13></td></tr>');
            }
            
        }
    }
    var Cnt = 0; var ccount = Rowcount;
    if (Rowcount >= 37) {Cnt = (MaxCnt - Rowcount) + MaxCnt-15; }
    else { Cnt = parseInt(MaxCnt) - Rowcount-15; }

    for (var a = 1; a <= Cnt ; a++) {
        var RoughRow = '';
        //RoughRow = '<tr class=brtd2 ><td style="border-left:1px solid grey;opacity:0" align=center >' + a + '</td><td colspan=6 style="padding-left:5px"></td><td align=right style="padding-right:5px"></td><td style="padding-left:5px"></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td></tr>';

        myWindow.document.write(RoughRow);
         ccount++;
        if (ccount % MaxCnt == 0) {
            ccount = 0;
            //myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=170px colspan=13></td></tr>');
        }
    }

    var TaxRow = '';
    TaxRow = //'<tr style="border:1px solid white;border-bottom:1px solid grey;border-top:1px solid grey;font-weight:bold"><td colspan=13 style="opacity:0">1</td></tr>' +
        '<tr style="border:1px solid grey!important;font-weight:bold" class="brtd2"><td colspan=4 >TAX GROUP</td><td align=left colspan=2>SubTotal</td><td align=left >Discount</td><td align=left colspan=2>CGST</td><td align=left colspan=2>SGST</td><td align=left colspan=2>Total GST</td></tr>';
    var SGSTAmt = 0, CGSTAmt = 0;
    for (var j = 0; j < TaxRateArray.length; j++)
    {
        var TaxVal = TaxRateArray[j]; var k=parseInt(j)+ 1;
        TaxRow += '<tr style="border:1px solid grey;" class="brtd2 TxRw"><td colspan=4 style="">' + $('#TaxGrpname' + TaxVal).text() + '</td><td align=left colspan=2>' + $('#splittaxable_' + TaxVal).val() + '</td><td align=left >0.00</td><td align=left colspan=2>' + $('#CGST_' + TaxVal).val() + '</td><td align=left colspan=2>' + $('#SGST_' + TaxVal).val() + '</td><td align=left colspan=2>' + $('#splittax_' + TaxVal).val() + '</td></tr>';
        SGSTAmt = parseFloat(SGSTAmt) + parseFloat($('#CGST_' + TaxVal).val());
        CGSTAmt = parseFloat(CGSTAmt) + parseFloat($('#SGST_' + TaxVal).val());
    }
    //TaxRow += '<tr style="border:1px solid grey!important;font-weight:bold" class="brtd2"><td colspan=4 >SUB TOTAL</td><td align=left colspan=2>' + $('#TotalTaxable').val() + '</td><td align=left >0.00</td><td align=left colspan=2>' + parseFloat(CGSTAmt).toFixed(Decimal) + '</td><td align=left colspan=2>' + parseFloat(SGSTAmt).toFixed(Decimal) + '</td><td align=left colspan=2>' + $('#TotlaTax').val() + '</td></tr>';

    //myWindow.document.write(TaxRow);

    myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=9 font-size: 13px;" align=left style="font-weight:bold">' + AmountinWords + '</td><td style="font-family:tahoma;font-size: 13px;border-left:1px solid grey;" align=center colspan=2><b>Total</b></td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right colspan=2><b>' + addCommas(parseFloat($('#BaseTextTotalProc').text()).toFixed(Decimal)) + '</b></td></tr>');
    myWindow.document.write('</table>');
    myWindow.document.write('<table width=70%>');

    var Leftalign = ""
    var Line = "<tr style='background-color: #e6e6e6'><td>Gst %</td><td>TAXABLE</td><td>GST</td><td>CGST</td><td>SGST</td></tr>"
    if ($('#hiddensplittaxable_0').val() != 0)
    {
      Line += '<tr><td>'+$('#TaxGrpname0').text()+'</td><td>'+$('#splittaxable_0').val()+'</td><td>'+$('#splittax_0').val()+'</td><td>'+$('#CGST_0').val()+'</td><td>'+$('#CGST_0').val()+'</td></tr>'
    }
    if ($('#hiddensplittaxable_5').val() != 0)
    {
        Line += '<tr><td>' + $('#TaxGrpname5').text() + '</td><td>' + $('#splittaxable_5').val() + '</td><td>' + $('#splittax_5').val() + '</td><td>' + $('#CGST_5').val() + '</td><td>' + $('#CGST_5').val() + '</td></tr>'
          }
    if ($('#splittaxable_12').val() != 0)
    {
        Line += '<tr><td>' + $('#TaxGrpname12').text() + '</td><td>' + $('#splittaxable_12').val() + '</td><td>' + $('#splittax_12').val() + '</td><td>' + $('#CGST_12').val() + '</td><td>' + $('#CGST_12').val() + '</td></tr>'
    }
    if ($('#splittaxable_18').val() != 0)
    {
        Line += '<tr><td>' + $('#TaxGrpname18').text() + '</td><td>' + $('#splittaxable_18').val() + '</td><td>' + $('#splittax_18').val() + '</td><td>' + $('#CGST_18').val() + '</td><td>' + $('#CGST_18').val() + '</td></tr>'
    }
    if ($('#splittaxable_28').val() != 0)
    {
        Line += '<tr><td>' + $('#TaxGrpname28').text() + '</td><td>' + $('#splittaxable_28').val() + '</td><td>' + $('#splittax_28').val() + '</td><td>' + $('#CGST_28').val() + '</td><td>' + $('#CGST_28').val() + '</td></tr>'
    }

   

    myWindow.document.write(Line)
    myWindow.document.write('</table>');



    myWindow.print();
    myWindow.close();
}

function PrintthisBillHMSSalesReturn(Rowlen, flg, type)             //type:1 - HALF   ,type:2 - FULL   ---------- Bill : PB,LB,IB   -use Landscape mode
{

    var TotPQty = 0; var Rowcount = 7;
    var MaxCnt;
    if (type == 1)
        MaxCnt = 48;

    var AmountinWords = WordwithDecimal($('#BaseTextTotal').text());
    var myWindow = window.open("", "", "width=1500,height=1500");

    $(ComapnydivToPrintLab).css('height', 70);

    var SNo = '';
    if (flg == 0)
        SNo = $('#HBillNoCopy').val();
    else if (flg == 1)
        SNo = $('#HBillNoCopy').val();

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);

    myWindow.document.write('<table width=100% ><tr rowspan=2 ><td width=70% align=left colspan=5 style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td><td align=right  width=15% >Return No: </td><td colspan=2 width=15% >' + SNo + '</td></tr>');
    myWindow.document.write('</table>');

    var TypeText = '';
    TypeText += '<td align=right width=15%>Paytype&#160;&#160;&#160; : </td><td colspn=2 width=15% >' + $('#PayType :selected').text() + '</td>';

    myWindow.document.write('<table width=100% ><tr ><td width=10% align=left >OP#&#160;&#160;&#160; :</td><td colspan=4 align=left width=60%>' + $('#HOpNo').val() + '</td><td align=right width=15%>Date &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td  colspan=2 width=15% >' + $('#HSalesDate').val() + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Patient:</td><td colspan=4 align=left width=60%>' + $('#HPatient').val() + '</td><td align=right width=15%>IP No.&#160;&#160;&#160;&#160;&#160;  : </td><td colspan=2 width=15% >' + $('#IPNumber').val() + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Doctor:</td><td colspan=4 align=left width=60%>' + $('#HDoctor :selected').text() + '</td>' + TypeText + '</tr>');
    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    myWindow.document.write('</table>');

    var HeaderRow = '';
    HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center width=3%>Sl#</td><td align=center width=5%>MFR</td><td colspan=2 align=center width=22%>Product</td><td width=10% align=center>Batch</td><td width=5% align=center>Expiry</td><td width=5% align=center>Qty.</td><td width=5% align=center>Free</td><td align=center width=5%>MRP</td><td align=center width=5%>Rate</td><td align=center width=5%>Taxable</td><td align=center width=5%>Tax</td><td align=center width=5%>Amount</td></tr>';

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey">' + HeaderRow);

    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Product' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#tdSl' + Id).text() + '</td><td style="padding-left:5px">' + $('#Company' + Id).val() + '</td><td colspan=2 style="padding-left:5px">' + $('#Product' + Id).val().substring(0, 20) + '</td><td style="padding-left:5px">' + $('#ProductDesc' + Id).val() + '</td><td style="padding-left:5px">' + $('#Expiry' + Id).val() + '</td><td style="padding-left:5px">' + $('#Quantity' + Id).val() + '</td><td style="padding-left:5px">' + $('#Free' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#PurPrice' + Id).val() + '</td><td style="padding-right:5px" align=right>' + $('#SellPrice' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#TaxableAmt' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#TaxAmt' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#Amount' + Id).val() + '</td></tr>');
            if (Rowcount % MaxCnt == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=170px colspan=13></td></tr>');
            }
        }
    }
    console.log(Rowcount)
    var Cnt = 0; var ccount = Rowcount;
    if (Rowcount >= 37) { Cnt = (MaxCnt - Rowcount) + MaxCnt - 15; }
    else { Cnt = parseInt(MaxCnt) - Rowcount - 15; }

    for (var a = 1; a <= Cnt ; a++) {
        var RoughRow = '';
        RoughRow = '<tr class=brtd2 ><td style="border-left:1px solid grey;opacity:0" align=center >' + a + '</td><td style="padding-left:5px"></td><td colspan=2 style="padding-left:5px"></td><td style="padding-left:5px"></td><td style="padding-left:5px"></td><td align=right style="padding-right:5px"></td><td style="padding-left:5px"></td><td style="padding-right:5px" align=right></td><td style="padding-left:5px"></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td></tr>';

        myWindow.document.write(RoughRow);
        ccount++;
        if (ccount % MaxCnt == 0) {
            ccount = 0;
            myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=170px colspan=13></td></tr>');
        }
    }

    var TaxRow = '';
    TaxRow = //'<tr style="border:1px solid white;border-bottom:1px solid grey;border-top:1px solid grey;font-weight:bold"><td colspan=13 style="opacity:0">1</td></tr>' +
        '<tr style="border:1px solid grey!important;font-weight:bold" class="brtd2"><td colspan=4 >TAX GROUP</td><td align=left colspan=2>SubTotal</td><td align=left >Discount</td><td align=left colspan=2>CGST</td><td align=left colspan=2>SGST</td><td align=left colspan=2>Total GST</td></tr>';
    var SGSTAmt = 0, CGSTAmt = 0;
    for (var j = 0; j < TaxRateArray.length; j++) {
        var TaxVal = TaxRateArray[j]; var k = parseInt(j) + 1;
        TaxRow += '<tr style="border:1px solid grey;" class="brtd2 TxRw"><td colspan=4 style="">' + $('#TaxGrpname' + TaxVal).text() + '</td><td align=left colspan=2>' + $('#splittaxable_' + TaxVal).val() + '</td><td align=left >0.00</td><td align=left colspan=2>' + $('#CGST_' + TaxVal).val() + '</td><td align=left colspan=2>' + $('#SGST_' + TaxVal).val() + '</td><td align=left colspan=2>' + $('#splittax_' + TaxVal).val() + '</td></tr>';
        SGSTAmt = parseFloat(SGSTAmt) + parseFloat($('#CGST_' + TaxVal).val());
        CGSTAmt = parseFloat(CGSTAmt) + parseFloat($('#SGST_' + TaxVal).val());
    }
    TaxRow += '<tr style="border:1px solid grey!important;font-weight:bold" class="brtd2"><td colspan=4 >SUB TOTAL</td><td align=left colspan=2>' + $('#TotalTaxable').val() + '</td><td align=left >0.00</td><td align=left colspan=2>' + parseFloat(CGSTAmt).toFixed(Decimal) + '</td><td align=left colspan=2>' + parseFloat(SGSTAmt).toFixed(Decimal) + '</td><td align=left colspan=2>' + $('#TotlaTax').val() + '</td></tr>';

    myWindow.document.write(TaxRow);

    myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=9 font-size: 13px;" align=left style="font-weight:bold">' + AmountinWords + '</td><td style="font-family:tahoma;font-size: 13px;border-left:1px solid grey;" align=center colspan=2><b>Total</b></td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right colspan=2><b>' + addCommas(parseFloat($('#BaseTextTotal').text()).toFixed(Decimal)) + '</b></td></tr>');
    myWindow.document.write('</table>');

    myWindow.document.write('<table width=100%><tr style="height:15px"><td colspan=13></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('</table>');

    myWindow.print();
}


function PrintthisBillLab1(Rowlen, flg, type, Bill)             //type:1 - HALF   ,type:2 - FULL   ---------- Bill : PB,LB,IB
{

    var TotPQty = 0; var Rowcount = 7;
    var MaxCnt;
    if (type == 1)
        MaxCnt = 25;
    else
        MaxCnt = 47;

    if (flg == 0)
        SNo = $('#BillNoCopy').val();
    else if (flg == 1)
        SNo = $('#BillNoCopy').val();

    var AmountinWords = WordwithDecimal($('#GrandTotal').text());
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);

    myWindow.document.write('<table width=100%  ><tr><td>  <table width=100% >    <tr align=left><td><B>' + window.CompanySettingsArray.CompanyName + '<B></td></tr><tr><td>' + window.CompanySettingsArray.Address + '</td></tr><tr><td>' + window.CompanySettingsArray.PhoneNo + '</td></tr>         </table</td></tr></table><hr>');

    myWindow.document.write('<table width=100% ><tr ><td >OP#:</td><td>' + $('#OpNo').val() + '</td><td>Bill No  </td><td>:' + SNo + '</td></tr>');
   
    myWindow.document.write('<tr ><td>Patient:</td><td >' + $('#Name').val() + '</td><td>Date&#160;&#160; &#160;</td><td>:' + $('#BillDate').val() + '</td></tr>');


    myWindow.document.write('<tr ><td>Doctor:</td><td >' + $('#Doctor :selected').text() + '</td></tr>');
   
    myWindow.document.write('</table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td width="5%" align=center>Sl#</td><td  align=center width=30%>TestName</td><td width=10% align=right>Amount</td></tr>');

    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#TestName' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#slrow' + Id).text() + '</td><td style="padding-left:5px">' + $('#TestName' + Id).val() + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#TestAmount' + Id).val()) + '</td></tr>'); 
    }

        if (Rowcount % MaxCnt == 0) {
            Rowcount = 0;
            myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center></td><td style="padding-left:5px">&#160;</td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>');
        }

        var norow = Rowcount;
        if (((MaxCnt - 10) - Rowcount) >= 0) {
            for (var a = 1; a <= (MaxCnt - 10) - Rowcount; a++) {
                myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center></td><td style="padding-left:5px">&#160;</td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>');

            }
        }
    }


    myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=2 font-size: 13px;"  style="font-weight:bold">AMOUNT IN WORDS:' + AmountinWords + '</td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#GrandTotal').text()).toFixed(Decimal)) + '</b></td></tr>');
    myWindow.document.write('</table>');

   // myWindow.document.write('<table width="100%><tr><td></td></tr><tr><td></td><td>Signature Of Lab Tech</td></tr></table>');
    myWindow.print();
    myWindow.close();
}





function PrintthisBillLab(Rowlen, flg, type,Bill)             //type:1 - HALF   ,type:2 - FULL   ---------- Bill : PB,LB,IB
{

    var TotPQty = 0; var Rowcount = 7;
    var MaxCnt;
    if (type == 1)
        MaxCnt = 20;
    else
        MaxCnt = 47;

    var AmountinWords = WordwithDecimal($('#GrandTotal').text());
    var myWindow = window.open("", "", "width=1500,height=1500");
    var Trnvalue = '';
    if ($('#txtlpono').val() == 0) {
        Trnvalue = '';
    }
    else {
        Trnvalue = $('#txtlpono').val();
    }
    if (type != 3)
    { $(ComapnydivToPrintLab).css('height', 130); $(ComapnydivToPrintLab).css('width', 700); }
    else  if (type == 3) 
    {
        $(ComapnydivToPrintLab).css('height', 'auto');
        $(ComapnydivToPrintLab).css('max-height', '200px');
        $(ComapnydivToPrintLab).css('width','100%');
    }
    
    var SNo = '';
    if (flg == 0)
        SNo = $('#BillNoCopy').val();
    else if (flg == 1)
        SNo = $('#BillNoCopy').val();
    var Age = $('#Age').val() + '/' + $('#Gender :selected').text();
    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG3);

    myWindow.document.write('<table width=100% ><tr ><td height=75px></td></tr>');
    myWindow.document.write('</table>');

    if (type != 3) {
       // myWindow.document.write('<table width=100% ><tr ><td width=100% align=center  style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
        //myWindow.document.write('</table>');
    }
    else if (type==3)
    {
    //myWindow.document.write('<table width=100% ><tr ><td width=100% align=left colspan=6 style=color:#008000;font-weight:bold>' + (ComapnydivToPrintLab.outerHTML) + '</td></tr>');
    //myWindow.document.write('</table>');
    myWindow.document.write('<table width=100% ><tr ><td align=right  width=80% >Bill No &#160;&#160;: </td><td colspn=2 width=20%  >' + SNo + '</td></tr>');
    myWindow.document.write('</table>');

}
    if (Bill == 'LB'){
    var billhead="Lab Bill"}
    else if (Bill == 'PB'){
    var billhead="Observation & Procedure Bill"}
else
{
var billhead="IP BILL"
}

    myWindow.document.write('<table width=100% ><tr ><td style="font-size:120%" align=center><b>' + billhead + '</b></td></tr>');
    myWindow.document.write('</table>');
    var TypeText = '';
    if (Bill == 'LB' || Bill == 'PB')
    { TypeText += '<td align=right width=10%>BillNo</td><td colspn=2 width=20% >:' + SNo + '</td>'; }
    else
    { TypeText += '<td align=right width=10%>Admit&#160;&#160;&#160; : </td><td colspn=2 width=20% >' + $('#AdmitDate').val() + '</td>'; }

    myWindow.document.write('<table style="font-size:70%;border-top:1px solid grey;border-left:1px solid grey;border-right:1px solid grey" width=100% ><tr ><td width=10% align=left >OP#&#160;&#160; :</td><td colspan=4 align=left width=40%>' + $('#OpNo').val() + '</td><td align=right width=10%>Date  </td><td  colspn=2 width=20% >:' + $('#BillDate').val() + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Patient:</td><td colspan=4 align=left width=40%>' + $('#Name').val() + '</td><td align=right width=10%>Age/Sex</td><td colspn=2 width=20% >:' + Age + '</td></tr>');
    myWindow.document.write('<tr ><td width=10% align=left >Doctor:</td><td colspan=4 align=left width=40%>' + $('#Doctor :selected').text() + '</td>' + TypeText + '</tr>');
    myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    myWindow.document.write('</table>');

    var HeaderRow = '';
    if (Bill == 'LB')
    { HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td align=center width=10% colspan=2>Department</td><td colspan=3 align=center width=30%>TestName</td><td align=center>Speicmen</td><td align=right>DueDate</td><td align=right>Amount</td></tr>';}
    else
    { HeaderRow = '<tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td colspan=5 align=center width=50%>Description</td><td align=center >Qty</td><td align=right >Rate</td><td align=right>Amount</td></tr>'; }

    myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey">' + HeaderRow);

        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#TestName' + Id).length) {
                Rowcount += 1;
                if (Bill == 'LB')
                { myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#slrow' + Id).text() + '</td><td style="padding-left:5px" colspan=2>' + $('#Department' + Id + ' :selected').text() + '</td><td style="padding-left:5px"  colspan=3>' + $('#TestName' + Id).val() + '</td><td align=center></td><td align=right style="padding-right:5px"></td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#TestAmount' + Id).val()) + '</td></tr>'); }
                else
                { myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#slrow' + Id).text() + '</td><td style="padding-left:5px"  colspan=5>' + $('#TestCode' + Id).val() + '</td><td style="padding-left:5px" align=left>' + $('#PQty' + Id).val() + '</td><td style="padding-right:5px" align=right>' + $('#PRate' + Id).val() + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#TestAmount' + Id).val()) + '</td></tr>'); }

                if (Rowcount % MaxCnt == 0) {
                    //Rowcount = 0;
                    //myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=180px colspan=8></td></tr>');
                }
            }
        }

        var RoughRow = '';
        if (Bill == 'LB')
        {
           // RoughRow += '<tr class=brtd2><td style="border-left:1px solid grey;" align=center>&#160;</td><td style="padding-left:5px" colspan=2></td><td style="padding-left:5px" colspan=3></td><td align=center></td><td align=right style="padding-right:5px"></td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>';
        }
        else
        {
           // RoughRow += '<tr class=brtd2><td style="border-left:1px solid grey;" align=center>&#160;</td><td style="padding-left:5px" colspan=5></td><td style="padding-left:5px" ></td><td style="padding-left:5px" ></td><td align=right style="border-right:1px solid grey;padding-right:5px"></td></tr>';
        }

        var norow = Rowcount;
        if (((MaxCnt - 10) - Rowcount) >= 0)
        {
            for (var a = 1; a <= (MaxCnt - 10) - Rowcount; a++) {
               // myWindow.document.write(RoughRow);
            }
        }
        else
        {
            norow = 10;
            for (var a = 1; a <= (MaxCnt) - norow; a++) {
                //myWindow.document.write(RoughRow);
                Rowcount++;
                if (Rowcount % MaxCnt == 0) {
                    Rowcount = 0;
                   // myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=180px colspan=8></td></tr>');
                }
            }
        }
        if (parseFloat($('#DiscAmt').val() || 0) != 0) {

            myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=7 font-size: 13px;" align=center style="font-weight:bold"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;font-weight:bold" align=center >Sub Total</td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;font-weight:bold"  align=right >' + addCommas(parseFloat($('#TotalAmt').text()).toFixed(Decimal)) + '</td></tr>');
            myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=7 font-size: 13px;" align=center style="font-weight:bold"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;font-weight:bold" align=center >Discount ' + parseFloat($('#DiscPercent').val() || 0) + '%</td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;font-weight:bold"  align=right >' + addCommas(parseFloat($('#DiscAmt').val()).toFixed(Decimal)) + '</td></tr>');
        }

        myWindow.document.write('<tr style="border:1px solid grey;" class=violetbg><td colspan=7 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + '</td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;font-weight:bold" align=center >Total</td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;font-weight:bold"  align=right >' + addCommas(parseFloat($('#GrandTotal').text()).toFixed(Decimal)) + '</td></tr>');
        myWindow.document.write('</table>');

        //myWindow.document.write('<table><tr style="border:none"><td height=15px colspan=8></td></tr></table>');
        //myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center >Sample Collected By</td><td align=center>Sample Received in the lab by</td><td colspan=2 align=center >Sample Tested By</td><td align=center>Telephoned</td><td align=right>Result Sent/Signed</td><td align=right>Cashier</td></tr>');
        //myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid grey;height:50px"><td ></td><td align=center> </td><td colspan=2 align=center ></td><td align=center></td><td align=right></td><td align=right></td></tr>');
        //myWindow.document.write('</table>');
   
        //myWindow.document.write('<table width=100%><tr style="height:15px"><td colspan=8></td></tr>');
        //myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
        //myWindow.document.write('</table>');

        myWindow.print();
        myWindow.close();
}

//USEDCARS
function PrintthisVCCPaidLazor(Rowlen, flg) {

    var vouchernorv = '';
    if (flg == 0) {
        vouchernorv = $('#VoucherNoMain').val();
    }
    else {
        vouchernorv = $('#vccnoid').val();
    }
    var myWindow = window.open("", "", "width=1500,height=1500");
    var incr = 2;
    var descr = '';
    for (var d = 0; d < incr; d++) {
        if (d == 1) {
            myWindow.document.write('<br><br><br><br>')
        }

        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');


        myWindow.document.write('<table width=100%<tr><td align=right ><b>Date :</b>' + "  " + CurDate + '</td></tr></table>')

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>Deposit Paid</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + vouchernorv + '</b></td></tr>');



        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;height:30px"><td align=center style="display:none" class=brtd><b>Sl#</b></td><td align=center style="display:none" class=brtd><b>Date</b></td><td align=left style="display:none" class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td style="display:none" align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td style="display:none" align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Total</b></td></tr>');

        if (Rowlen != 0) {
           
                descr = 'Deposit Received  Against :' + $('#chassisnoid').val() + ' - ' + $('#desc1').val();
               
           

        }





        myWindow.document.write('<tr style="height:80px"><td align=center style="display:none"  class=brtd></td><td style="display:none" align=center class=brtd>' + $('#InvoDate').val() + '</td><td  align=left style="display:none" class=brtd style="padding-left:5px">' + $('#AccountId').val() + '</td><td  align=left class=brtd style="padding-left:5px">' + descr + '</td><td align=left style="display:none" class=brtd style="padding-left:5px">' + $('#TaxNo').val() + '</td><td align=right style="display:none" class=brtd style="padding-right:5px"></td><td align=right class=brtd style="padding-right:5px">' + parseFloat($('#amountid').val() || 0).toFixed(Decimal) + '</td></tr>');

        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')

    }
    myWindow.print();




}



//USEDCARS
function PrintthisVCCReceivedLazor(Rowlen, flg) {

    var vouchernorv = '';
    if (flg == 0) {
        vouchernorv = $('#VoucherNoMain').val();
    }
    else {
        vouchernorv = $('#vccnoid').val();
    }
    var myWindow = window.open("", "", "width=1500,height=1500");
    var incr = 2;
    var descr = '';
    for (var d = 0; d < incr; d++) {
        if (d == 1) {
            myWindow.document.write('<br><br><br><br>')
        }

        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');


        myWindow.document.write('<table width=100%<tr><td align=right ><b>Date :</b>' + "  " + CurDate + '</td></tr></table>')

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>Deposit Received</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + vouchernorv + '</b></td></tr>');



        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;height:30px"><td align=center style="display:none" class=brtd><b>Sl#</b></td><td align=center style="display:none" class=brtd><b>Date</b></td><td align=left style="display:none" class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td style="display:none" align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td style="display:none" align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Total</b></td></tr>');

        if (Rowlen != 0) {
               
                    descr = 'Deposit Received  Against :' + $('#chassisnoid').val() + ' - ' + $('#txtdesc1').val();
                   
               
            
        }





        myWindow.document.write('<tr style="height:80px"><td align=center style="display:none"  class=brtd></td><td style="display:none" align=center class=brtd>' + $('#InvoDate').val() + '</td><td  align=left style="display:none" class=brtd style="padding-left:5px">' + $('#AccountId').val() + '</td><td  align=left class=brtd style="padding-left:5px">' + descr + '</td><td align=left style="display:none" class=brtd style="padding-left:5px">' + $('#TaxNo').val() + '</td><td align=right style="display:none" class=brtd style="padding-right:5px"></td><td align=right class=brtd style="padding-right:5px">' + parseFloat($('#amountid').val() || 0).toFixed(Decimal) + '</td></tr>');

        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')

    }
    myWindow.print();




}







//USEDCARS
function PrintthisVoucherEntryLazor(Rowlen, flg) {
    var vouchernoev = '';
    if (flg == 0) {
        vouchernoev = $('#vouchersaveno').val();
    }
    else {
        vouchernoev = $('#VoucherNo').val();
    }
    var myWindow = window.open("", "", "width=1500,height=1500");
    var incr = 2;
    var descr = '';
    for (var d = 0; d < incr; d++) {
        if (d == 1) {
            myWindow.document.write('<br><br><br><br>')
        }
   
        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');


        myWindow.document.write('<table width=100%<tr><td align=right ><b>Date :</b>' + "  " + CurDate + '</td></tr></table>')

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + $('#VoucherType option:selected').html() + '</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + vouchernoev + '</b></td></tr>');



        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;height:30px"><td align=center style="display:none" class=brtd><b>Sl#</b></td><td align=center style="display:none" class=brtd><b>Date</b></td><td align=left style="display:none" class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td style="display:none" align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td style="display:none" align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Total</b></td></tr>');

        for (var i = 1; i <= Rowlen; i++) {

            descr = $('#VoucherEntryDescription' + i).val();
           
            if (descr != '') {
                break;
            }

        }
       
        myWindow.document.write('<tr style="height:80px"><td align=center style="display:none"  class=brtd></td><td style="display:none" align=center class=brtd>' + $('#InvoDate').val() + '</td><td  align=left style="display:none" class=brtd style="padding-left:5px">' + $('#AccountId').val() + '</td><td  align=left class=brtd style="padding-left:5px">' + descr + '</td><td align=left style="display:none" class=brtd style="padding-left:5px">' + $('#TaxNo').val() + '</td><td align=right style="display:none" class=brtd style="padding-right:5px"></td><td align=right class=brtd style="padding-right:5px">' + parseFloat($('#Credittxt').val() || 0).toFixed(Decimal)  + '</td></tr>');

        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')
       
    }
        myWindow.print();

    

}


//USEDCARS
function PrintthisReceiptVoucherLazor(Rowlen, flg) {
   
    var vouchernorv = '';
    if (flg == 0) {
        vouchernorv = $('#VoucherNoMain').val();
    }
    else {
        vouchernorv = $('#VoucherNo').val();
    }
    var myWindow = window.open("", "", "width=1500,height=1500");
    var incr = 2;
    var descr = '';
    for (var d = 0; d < incr; d++) {
        if (d == 1) {
            myWindow.document.write('<br><br><br><br>')
        }
   
        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');


        myWindow.document.write('<table width=100%<tr><td align=right ><b>Date :</b>' + "  " + CurDate + '</td></tr></table>')

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>RV - Receipt Voucher</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + vouchernorv + '</b></td></tr>');



        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;height:30px"><td align=center style="display:none" class=brtd><b>Sl#</b></td><td align=center style="display:none" class=brtd><b>Date</b></td><td align=left style="display:none" class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td style="display:none" align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td style="display:none" align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Total</b></td></tr>');
        var PendingIn = $('#PendingIn tr').length
        var AdvAmnt = $('#AmountAcc1').text();
        if ($('#Advance').prop("checked")) {
            descr = 'Advance Received';
        }
        else if (Rowlen != 0) {
            if ((AdvAmnt != '') && (AdvAmnt != 0) && (AdvAmnt != undefined)) {
            descr = 'Settled Against Invoice No:'+" " + $('#VoucherNoMain').val();
         }
         else
            {
             for (var i = 1; i <= Rowlen; i++) {

                 if ($('#SlNoCheck' + i).prop("checked")) {
                     descr = $('#VEDescription' + i).text();
                 }
                 if (descr != '') {
                     break;
                 }

             }
         }           
        }
        


        
      
        myWindow.document.write('<tr style="height:80px"><td align=center style="display:none"  class=brtd></td><td style="display:none" align=center class=brtd>' + $('#InvoDate').val() + '</td><td  align=left style="display:none" class=brtd style="padding-left:5px">' + $('#AccountId').val() + '</td><td  align=left class=brtd style="padding-left:5px">' + descr + '</td><td align=left style="display:none" class=brtd style="padding-left:5px">' + $('#TaxNo').val() + '</td><td align=right style="display:none" class=brtd style="padding-right:5px"></td><td align=right class=brtd style="padding-right:5px">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')
       
    }
    myWindow.print();
   

    

}
//USEDCARS
function PrintthisPaymentVoucherLazor(Rowlen, flg) {
    var vouchernopv = '';
    if (flg == 0) {
        vouchernopv= $('#VoucherNoMain').val();
    }
    else {
        vouchernopv = $('#VoucherNo').val();
    }
    var myWindow = window.open("", "", "width=1500,height=1500");
    var incr = 2;
    var descr='';
    for (var d = 0; d < incr; d++) {
        if (d == 1) {
            myWindow.document.write('<br><br><br><br>')
        }

        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');


        myWindow.document.write('<table width=100%<tr><td align=right ><b>Date :</b>' + "  " + CurDate + '</td></tr></table>')

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>PV - Payment Voucher</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + vouchernopv + '</b></td></tr>');



        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;height:30px"><td align=center style="display:none" class=brtd><b>Sl#</b></td><td align=center style="display:none" class=brtd><b>Date</b></td><td align=left style="display:none" class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td style="display:none" align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td style="display:none" align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Total</b></td></tr>');
        var PendingIn = $('#PendingIn tr').length
        var AdvAmntPM = $('#AmountAcc1').text();
        if ($('#Advance').prop("checked")) {
            descr = 'Advance Received';
        }
        //else if (Rowlen != 0) {
            if ((AdvAmntPM != '') && (AdvAmntPM != 0) && (AdvAmntPM != undefined)) {
                descr = 'Setteled Against Invoice No:' + " " + $('#VoucherNoMain').val();
            }
            else {
                for (var i = 1; i <= Rowlen; i++) {

                    if ($('#SlNoCheck' + i).prop("checked")) {
                        descr = $('#VEDescription' + i).text();
                    }
                    if (descr != '') {
                        break;
                    }

                }
            }
        //}




        
        myWindow.document.write('<tr style="height:80px"><td align=center style="display:none"  class=brtd></td><td style="display:none" align=center class=brtd>' + $('#InvoDate').val() + '</td><td  align=left style="display:none" class=brtd style="padding-left:5px">' + $('#AccountId').val() + '</td><td  align=left class=brtd style="padding-left:5px">' + descr + '</td><td align=left style="display:none" class=brtd style="padding-left:5px">' + $('#TaxNo').val() + '</td><td align=right style="display:none" class=brtd style="padding-right:5px"></td><td align=right class=brtd style="padding-right:5px">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')

    }
    myWindow.print();



}


//BillPrintNew()

function BillPrintNew() {

    var BillNo = 35002;
    var Billseries = 'EIS';
    var BillDate = '29/11/2018';
    var Payterms = 'CASH';
    var adviser = '-';
    var Description = 'INVENTORY AND BILLING SOFTWARE(WEB) ';
    var Name = 'Viswam Digital Press Pvt. Ltd.';
    var Address1 = 'Capitol Centre, Mahathma Gandhi Rd, Statue,';
    var Address2 = 'Palayam, Thiruvananthapuram,'
    var Address3 = 'Kerala 695001';
    var Phone1 = '070124 98673';
    var Phone2 = '';
    var GstNo = '32AAECV8078N1ZP';
    var Rate = 45000.00;
    var DisPers = 0;
    var DisAmount = 0.00;
    var CGST = 4050.00;
    var SGST = 4050.00;
    var IGST = 0.00;
    var NETAMOUNT = 53100.00;
    var Words = 'Fifty Three Thousand and One Hundred ';
    //var Words = $('#words').val();
    var mywindow = window.open('', 'Medicine Advice', 'height=1500,width=1500');
    mywindow.document.write('<html><body height="200px">');
    mywindow.document.write('<style type="text/css">   #printbdy{ border-collapse: collapse;} #printbdy td {border:1px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    mywindow.document.write('<div id="printpart">');
    mywindow.document.write('<table width="100%"><tr><td><table style="font-weight:bold"><tr><td>Eumi It Solutions Private Limited</td></tr><tr><td>743/20 & 21, Kandathil Building, H.S. Junction ,</td></tr><tr><td> Parakode, Adoor, Pathanamthitta,</td></tr><tr><td> Kerala 691554</td></tr></table></td></tr></table></hr>');
    mywindow.document.write('<table width="100%"><tr><td  valign="top" align="center">GST INVOICE</td></tr></table>');
    mywindow.document.write(' <table width="100%" id="printbdy">');
    mywindow.document.write('<tr><td colspan="5"><table><tr><td style="border:none">Billed To :</td><td style="border:none">' + Name + '</td></tr><tr><td style="border:none"></td><td style="border:none">' + Address1 + '</td></tr><tr><td style="border:none"></td><td style="border:none">GST NO :' + GstNo + '</td></tr></table></td><td colspan="3"><table style="border:none"><tr><td style="border:none">Bill No</td><td style="border:none">:' + BillNo + '</td></tr><tr><td style="border:none">Bill Date</td><td style="border:none">:' + BillDate + '</td></tr><tr><td style="border:none">Pay Terms</td><td style="border:none">:' + Payterms + '</td></tr><td style="border:none">Advicer</td><td style="border:none">:' + adviser + '</td></tr></table></td></tr>');
    mywindow.document.write('<tr><td align="center"  width="10%">Slno</td><td colspan="3">Particulors</td><td align="center"  width="10%">Qty</td><td align="center"  width="15%">Rate</td><td align="center"  width="15%">Amount</td></tr>');
    mywindow.document.write('<tr><td  height="400px" align="center" valign="top">1</td><td valign="top" colspan="3">' + Description + '</td><td valign="top" align="center">1</td><td valign="top" align="right">' + Rate.toFixed(2) + '</td><td valign="top" align="right">' + Rate.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td width="50%"  colspan="3" >Bank Details    :</td><td colspan="2"></td><td align="right"></td><td align="right">' + Rate.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td rowspan="5" colspan="3" ><table width="100%"><tr ><td style="border:none">Name</td><td style="border:none">:&#160;Eumi It Solutions Private Limited,</td></tr><tr><td style="border:none">Bank</td><td style="border:none">:&#160;Indian Bank</td></tr><tr><td style="border:none">&#160;</td><td style="border:none">&#160;&#160;Pattazhy,VadakkekKara(2104)</td></tr><tr><td style="border:none">Account No</td><td style="border:none">:&#160;6688221785</td></tr><tr><td style="border:none">IFSC Code</td><td style="border:none">:&#160;IDIB000P185</td></tr></table></td>');
    mywindow.document.write('<td colspan="2" width="10%" align="right">Less discount&#160;&#160;</td><td align="right">' + DisPers + '%</td><td align="right">' + DisAmount.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td colspan="2" align="right">CGST&#160;&#160;</td><td align="right">9%</td><td align="right">' + CGST.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td colspan="2" align="right">SGST&#160;&#160;</td><td align="right">9%</td><td align="right">' + SGST.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td colspan="2" align="right">IGST&#160;&#160;</td><td align="right">18%</td><td align="right">' + IGST.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td colspan="2" align="right">BILL AMOUNT&#160;&#160;</td><td align="right"></td><td align="right">' + NETAMOUNT.toFixed(2) + '</td></tr>');
    mywindow.document.write('<tr><td  colspan="7" >Rupees ' + Words + '   Only</td></tr>');
    mywindow.document.write('</table>');
    mywindow.document.write('<table width=100%><tr><td height=30px></td></tr><tr><td width=60%>Customer Signature</td><td align=center>For Eumi It Solutions Private Limited </td></tr> <tr><td></td></tr><tr><td></td><td align="center">Authority Signature</td></tr></table>');
    mywindow.document.write('<table><tr><td height=20px></td></tr><tr><td>Amount received_______________Only.</td></tr></table>');
    mywindow.document.write('</div>');
    mywindow.document.write('</body></html>');
    mywindow.print();
    mywindow.close();
}

//Old Print Function For AutoMobilesSave
function PrintthisBillSalesAUTOMOBILESOld(Rowlen) {
    //alert('save')

    var BILL = '<tr><th>hh</th></tr><tr><td colspan="8">hello test print</td></tr >';

    $('#Dhinesh1').append(BILL);



    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.5px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');




    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=140px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>TAX INVOICE</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + (divToPrint.outerHTML)
        + '</td><td align=right width=18% colspan=2><b>INV NO :</b></td><td width=18% colspan=3><b>' + $('#txtBillSlNocopy').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>INV NO :</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>LPO NO :</b></td><td colspan=3></td><tr>')


    myWindow.document.write('<tr><td height=45px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td  align=center width=47px>' + Id + '</td><td width=90px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td width=340px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=60px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=100px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
        }


    }


    for (var a = 1; a <= 30 - Rowlen; a++) {
        myWindow.document.write('<tr><td height=20px colspan=17></td></tr>');
    }
    myWindow.document.write('</table></td></tr>');


    myWindow.document.write('<tr><td colspan=11></td><td align=right colspan=4><b> Total Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td colspan=11>AED  ' + AmountinWords + ' Only' + '</td><td align=right colspan=4><b> TAX Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td colspan=11></td><td align=right colspan=4><b> TAX Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');



    myWindow.print();
    myWindow.close()
}

//Old Print Function For AutoMobilesCopy
function PrintthisBillSalesCOPYAUTOMOBILESold(Rowlen) {
    //alert('copy')

    var BILL = '<tr><th>hh</th></tr><tr><td colspan="8">hello test print</td></tr >';

    $('#Dhinesh1').append(BILL);



    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.5px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');




    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=140px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>TAX INVOICE</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + (divToPrint.outerHTML) 
        + '</td><td align=right width=18% colspan=2><b>INV NO :</b></td><td width=18% colspan=3><b>' + $('#txtBillSlNocopy').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>INV NO :</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>LPO NO :</b></td><td colspan=3></td><tr>')


    myWindow.document.write('<tr><td height=45px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td  align=center width=47px>' + Id + '</td><td width=90px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td width=340px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=60px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=100px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
        }


    }


    for (var a = 1; a <= 30 - Rowlen; a++) {
        myWindow.document.write('<tr><td height=20px colspan=17></td></tr>');
    }
    myWindow.document.write('</table></td></tr>');


    myWindow.document.write('<tr><td colspan=11></td><td align=right colspan=4><b> Total Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td colspan=11>AED  ' + AmountinWords + ' Only' + '</td><td align=right colspan=4><b> TAX Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td colspan=11></td><td align=right colspan=4><b> TAX Amount</b></td><td  align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');


    myWindow.print();
    myWindow.close()
}


//New Print Function For AutoMobilesSave
function PrintthisBillSalesAUTOMOBILES(Rowlen) {
    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#savedbillno').val());

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)


    //var Adrs = $.trim($('#txtaddress').val());

    //Adrs = Adrs.substring(0, 40);
    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,55}/g);
    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0]; 
        adrlen = Adrs.length;
    }

    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();



    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>TAX INVOICE</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + Cust + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Addres + ' </b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')
    //myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
    if (adrlen == 1 || adrlen == 0) {

        myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
    }

    else if (adrlen > 1) {

        myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[1] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')
        // for (var p = 1; p < Adrs.length; p++) {
        //     myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[p] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')

        //}        
        myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' +
        '</td><td align=right width=18% colspan=2><b>LPO NO &#160;:</b></td><td width=18% colspan=3><b></td><tr>')
    }

    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + Id + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=97px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {

            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');

            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
             + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b></b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN# : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + ' Only' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
} 

//New Print Function For AutoMobilesCopy 
function PrintthisBillSalesCOPYAUTOMOBILES(Rowlen) {
    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var Adrs = '';
     Adrs = ($.trim($('#txtaddress').val())).match(/.{1,55}/g);  

    //Adrs = Adrs.substring(0, 40);
  
    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();

    var Addres = ''; var adrlen = 0;  
    if (Adrs != null)
    {
        Addres = Adrs[0];
        adrlen=Adrs.length;
    }
   
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>TAX INVOICE</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + Cust + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Addres + ' </b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')

    if (adrlen == 1 || adrlen == 0) {
       
        myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN# : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
    }
  
    else if (adrlen > 1) 
   {
      
        myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[1] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>') 
       // for (var p = 1; p < Adrs.length; p++) {
       //     myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[p] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')

       //}        
        myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' + 
        '</td><td align=right width=18% colspan=2><b>LPO NO &#160;:</b></td><td width=18% colspan=3><b></td><tr>')
    }
    
       
   

    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + Id + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=97px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {

            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');

            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
             + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b></b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN# : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + ' Only' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
}

//Print Function For AutoMobiles With Bin During Copy fl:1,Save-fl:0
function PrintthisBillSalesWITHBINAUTOMOBILES(Rowlen,fl) { 
    var Rowcount = 0; gridtotal = 0;
   
    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var billnum = '';
    if (fl == 0)
        billnum = $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val();
    else if (fl == 1)
        billnum = $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val();

    //var Adrs = $.trim($('#txtaddress').val());
   
    //Adrs = Adrs.substring(0, 40);
    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,54}/g);
    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0];
        adrlen = Adrs.length;
    }

    var Cust = $.trim($('#txtcustomer').val()); 
   
    Cust = Cust.substring(0, 30);  

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();


    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>TAX INVOICE</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + Cust + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + billnum  + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Addres + ' </b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')
    //myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>') 
    if (adrlen == 1 || adrlen == 0) { 
       
        myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN# : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')  
    }
  
    else if (adrlen > 1) 
   {
      
        myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[1] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>') 
       // for (var p = 1; p < Adrs.length; p++) {
       //     myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[p] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')

       //}        
        myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' + 
        '</td><td align=right width=18% colspan=2><b>LPO NO &#160;:</b></td><td width=18% colspan=3><b></td><tr>')
    }


    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            var bin='';
            if ($('#Bin' + Id).text() != '')           
                bin = $('#Bin' + Id).text();
            var loc = ''
            if (($('#select_location' + Id + ' option:selected').html() != undefined) && ($('#select_location' + Id + ' option:selected').html() != ''))
                loc = $('#select_location' + Id + ' option:selected').html();
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + Id + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td  width=400px colspan=8>' + $('#ProductDesc' + Id).val() + ' </td> <td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + bin + '</td><td width=97px align=right colspan=2>' + loc + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {

            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');

            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
             + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + billnum + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b></b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN# : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=15><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td align=right colspan=2><b>Total Products :  ' + $('#TotalProducts').val() + ' </b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b></b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b></b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b></b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b></b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b></b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
}



//---------------------------------------------Spareparts
//Print Function For SPAREPARTS With Bin During Copy fl:1,Save-fl:0 
function PrintthisBillSalesWITHBINSPAREPARTS(Rowlen, fl) { 
    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var billnum = '';
    if (fl == 0)
        billnum = $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val();
    else if (fl == 1)
        billnum = $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val();

    //var Adrs = $.trim($('#txtaddress').val());

    //Adrs = Adrs.substring(0, 40);
    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,54}/g);
    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0];
        adrlen = Adrs.length;
    }

    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();


    var AmountinWords = WordwithDecimal($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
 
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ><b>' + Cust + '</b></td><td align=center colspan=4><b>TAX INVOICE</b></td><td width=18% align=right colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + billnum + '</b></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b> TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td width=18% colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')


    var grdetails = '';
    if ($('#PhoneNo').val() != '' && $('#txtaddress').val() != '')
        grdetails = '' + $('#txtaddress').val() + ', PH - ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() != '' && $('#txtaddress').val() == '')
        grdetails = 'Ph : ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() == '' && $('#txtaddress').val() != '')
        grdetails = $('#txtaddress').val();

    if ($('#txtlgrgname').val() != '')
        myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')

    if (grdetails!='')
        myWindow.document.write('<tr><td></td><td colspan=12 ><b>' + grdetails + ' </b></td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=12 >.</td><tr>')

    myWindow.document.write('<tr><td></td><td colspan=12 ></td><tr>')


    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            var bin = '';
            if ($('#Bin' + Id).text() != '')
                bin = $('#Bin' + Id).text();
            var loc = ''
            if (($('#select_location' + Id + ' option:selected').html() != undefined) && ($('#select_location' + Id + ' option:selected').html() != ''))
                loc = $('#select_location' + Id + ' option:selected').html();
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + $('#td' + Id).text() + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td  width=400px colspan=8>' + $('#ProductDesc' + Id).val().substring(0, 47) + ' </td> <td align=center width=50px>' + loc + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + bin + '</td><td width=97px align=right colspan=2>' + $('#select_unit' + Id + ' option:selected').html() + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {
            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');
            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center colspan=4> <b>TAX INVOICE</b> </br>' +
                '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')

            if ($('#txtlgrgname').val() != '')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
            myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            if (grdetails != '')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + grdetails + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
                myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            myWindow.document.write('<tr><td></td><td colspan=7 ></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>') 

            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=15><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td align=right colspan=2><b>Total Products :  ' + $('#TotalProducts').val() + ' </b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b></b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b></b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b></b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b></b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b></b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
}

//New Print Function For SPAREPARTS
function PrintthisBillSalesSPAREPARTS(Rowlen) {

    //JsBarcode("#barcode1", $('#savedbillno').val());

    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,55}/g);

    //Adrs = Adrs.substring(0, 40);

    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();

    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0];
        adrlen = Adrs.length;
    }

    var AmountinWords = WordwithDecimal($('#GrandTotal').val());
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');

    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ><b>' + Cust + '</b></td><td align=center colspan=4><b>TAX INVOICE</b></td><td width=18% align=right colspan=2><b>INV NO &#160; &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val() + '</b></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b> TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160; &#160;:</b></td><td width=18% colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')


    var grdetails = '';
    if ($('#PhoneNo').val() != '' && $('#txtaddress').val() != '')
        grdetails = '' + $('#txtaddress').val() + ', PH - ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() != '' && $('#txtaddress').val() == '')
        grdetails = 'Ph : ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() == '' && $('#txtaddress').val() != '')
        grdetails = $('#txtaddress').val();

    var ChassisNo = '';
    var CHtext = '';
    if ($('#ChassisNo').val() != '') {
        CHtext = 'Chassis#  &#160;:';
        ChassisNo = $('#ChassisNo').val()
    }
    else {
        CHtext = '';
        ChassisNo = '';
    }


    if ($('#txtlgrgname').val() != '')
        myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b>' + CHtext + '</b></td><td colspan=3>' + ChassisNo + '</td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b>' + CHtext + '</b></td><td colspan=3>' + ChassisNo + '</td><tr>')

    if (grdetails!='')
        myWindow.document.write('<tr><td></td><td colspan=12 ><b>' + grdetails + ' </b></td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=12 >.</td><tr>')




    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + $('#td' + Id).text() + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val().substring(0, 14) + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val().substring(0, 47) + '</td><td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + parseFloat($('#txtrate' + Id).val()).toFixed(Decimal) + '</td><td width=97px align=right colspan=2>' + parseFloat($('#txttaxableamnt' + Id).val()).toFixed(Decimal) + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {

            myWindow.document.write('<tr><td height=350px colspan=17></td></tr>');
            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center colspan=4> <b>TAX INVOICE</b> </br>' +
                '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#savedbillno').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')
            if ($('#txtlgrgname').val() != '')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
            myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            if (grdetails != '') 
               myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + grdetails + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
                myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            myWindow.document.write('<tr><td></td><td colspan=7 ></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + '' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    myWindow.print();
    myWindow.close()
} 


//New Print Function For SPAREPARTS 
function PrintthisBillSalesCOPYSPAREPARTS(Rowlen) {
    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,55}/g);

    //Adrs = Adrs.substring(0, 40);

    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();

    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0];
        adrlen = Adrs.length;
    }

    var AmountinWords = WordwithDecimal($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ><b>' + Cust + '</b></td><td align=center colspan=4><b>TAX INVOICE</b></td><td width=18% align=right colspan=2><b>INV NO &#160; &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val() + '</b></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b> TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160; &#160;:</b></td><td width=18% colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')
  

    var grdetails = '';
    if ($('#PhoneNo').val() != '' && $('#txtaddress').val() != '')
        grdetails = '' + $('#txtaddress').val() + ', PH - ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() != '' && $('#txtaddress').val() == '')
        grdetails = 'Ph : ' + $('#PhoneNo').val() + '';
    else if ($('#PhoneNo').val() == '' && $('#txtaddress').val() != '')
        grdetails = $('#txtaddress').val();


    var ChassisNo = '';
    var CHtext = '';
    if ($('#ChassisNo').val() != '') {
        CHtext = 'Chassis#  &#160;:';
        ChassisNo = $('#ChassisNo').val()
    }
    else {
        CHtext = '';
        ChassisNo = '';
    }


    if ($('#txtlgrgname').val() != '')
        myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b>' + CHtext + '</b></td><td colspan=3>' + ChassisNo + '</td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b>' + CHtext + '</b></td><td colspan=3>' + ChassisNo + '</td><tr>')

    if (grdetails!='')
        myWindow.document.write('<tr><td></td><td colspan=12 ><b>' + grdetails + ' </b></td><tr>')
    else
        myWindow.document.write('<tr><td></td><td colspan=12 >.</td><tr>')

    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + $('#td' + Id).text() + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val().substring(0, 14) + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val().substring(0, 47) + '</td><td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + parseFloat($('#txtrate' + Id).val()).toFixed(Decimal) + '</td><td width=97px align=right colspan=2>' + parseFloat($('#txttaxableamnt' + Id).val()).toFixed(Decimal) + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
        }

        if (Rowcount % 34 == 0) {
            myWindow.document.write('<tr><td height=350px colspan=17></td></tr>');
            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center colspan=4> <b>TAX INVOICE</b> </br>' + 
                '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + $('#SalesDepartment').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + ' : ' + $('#CurrentTimeSales').val() + '</td><tr>')

            if ($('#txtlgrgname').val() != '')
                myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + $('#txtlgrgname').val() + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
                myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            if (grdetails != '')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>' + grdetails + ' </b></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')
            else
                myWindow.document.write('<tr><td></td><td colspan=7 >.</td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            myWindow.document.write('<tr><td></td><td colspan=7 ></td><td align=right colspan=2><b> &#160;</b></td><td colspan=3></td><tr>')

            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(Decimal) + '</b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(Decimal) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + '' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(Decimal) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(Decimal) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(Decimal) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
}

//---------------------------------------------End Spareparts

//---------------------------------------------Sales Order
function PrintthisBillSalesOrder(Rowlen)
{
   
    var Rowcount = 0; gridtotal = 0;

    //JsBarcode("#barcode1", $('#txtBillSlNocopy').val())

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var Adrs = '';
    Adrs = ($.trim($('#txtaddress').val())).match(/.{1,55}/g);

    //Adrs = Adrs.substring(0, 40);

    var Cust = $.trim($('#txtcustomer').val());

    Cust = Cust.substring(0, 30);

    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();

    var Addres = ''; var adrlen = 0;
    if (Adrs != null) {
        Addres = Adrs[0];
        adrlen = Adrs.length;
    }

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>SALES ORDER</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + Cust + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>ORDER# &#160;:</b></td><td width=18% colspan=3><b>' + $('#DepartmentCode').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Addres + ' </b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')

    //if (adrlen == 1 || adrlen == 0) {

    //    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
    //}

    //else
        if (adrlen > 1) {
        myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs[1] + ' </b></td><td align=right colspan=2><b></b></td><td colspan=3></td><tr>')           
        //myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>TRN : ' + TRN + ' </b></td><td width=20% align=center rowspan=5 colspan=4>' +
        //'</td><td align=right width=18% colspan=2><b>LPO NO &#160;:</b></td><td width=18% colspan=3><b></td><tr>')
        }

        var TotalPdQt=0;
    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + Id + '</td><td width=153px colspan=3>' + $('#txtproduct' + Id).val() + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=97px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
            TotalPdQt = parseInt(TotalPdQt) + parseInt($('#txtquantity' + Id).val());
        }

        if (Rowcount % 34 == 0) {

            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');

            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
             + '</td><td align=right width=18% colspan=2><b>ORDER# &#160;:</b></td><td width=18% colspan=3><b>' + $('#DepartmentCode').val() + ' - ' + $('#txtBillSlNocopy').val() + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>#9</b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + TotalPdQt + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + ' Only' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#UserDetsss').text() + '</td></tr>'); 

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
}
//---------------------------------End Sales Order

//Print Sales Save - Local 
function PrintthisBillSales(Rowlen) {
   
    console.log(Rowlen) 
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#savedbillno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>   <tr><td>' + $('#txtaddress').val() + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr>  <tr><td>-</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr> <tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    var slno = 1;
    for (var i = 0; i <= Rowlen; i++) {
       
        var Id = parseInt(i + 1);
       
        if ($('#txtproduct' + Id).length) {
        myWindow.document.write('<tr><td>' + slno + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
        slno++;
        }
       
    }
  myWindow.document.write('<tr><td height="40px"  colspan=8></td></tr>'); 
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

//Print Sales Save - Mobile
function PrintthisBillSalesMobile(Rowlen) {
    console.log(Rowlen)
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#savedbillno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>   <tr><td>' + $('#txtaddress').val() + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr>  <tr><td>-</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr> <tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td></td><td>الرمز / الوصف</td><td>وحدة</td><td>كمية</td><td align=center>معدل</td><td align=right>ضريبة %</td><td align=right>قيمة الضريبة</td><td align=right>كمية</td></tr><tr><td colspan=8><hr></td></tr>');
    var slno =1;
    for (var i = 0; i <= Rowlen; i++) {
      
        var Id = parseInt(i + 1);
        var sr = "";
        if ($('#Otherdescription' + Id).val() != undefined)
            sr = $('#Otherdescription' + Id).val(); 
        if ($('#txtproduct' + Id).length) { 
            myWindow.document.write('<tr><td>' + slno + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + ' ' + sr + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
            slno++;
        }
       
    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

        var a = parseInt(j + 1);

        var k = DefaultTaxArray[j];

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

//Print Sales Save - ORYX 
function PrintthisBillSalesORYX(Rowlen) { 

    console.log(Rowlen)
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/oryx.png" alt="company logo" height="80" width="130"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#savedbillno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<tr><td colspan=8>Prepared By</td>   <td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td><td align=right>Salesman : ' + $('#select_salesman option:selected').html() + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td><td align=right>Bill To : </td>  <tr><td colspan=8></td> <td align=right>' + $('#txtcustomer').val() + '</td></tr>   <tr> <td colspan=8>' + $('#select_place option:selected').html() + '</td><td align=right>' + $('#Trnno').val() + '</td></tr>  <tr> <td colspan=8></td><td align=right>' + $('#txtaddress').val() + '</td></tr> <tr><td ></td></tr>');

    myWindow.document.write('<table width=100%><tr><td colspan=9><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    var slno = 1;
    for (var i = 0; i <= Rowlen; i++) {

        var Id = parseInt(i + 1);

        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + slno + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
            slno++;
        }

    }
    myWindow.document.write('<tr><td height="40px"  colspan=8></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Bill Discount  :  </td><td align=right><b>' + $('#disc').val() + '</b></td></tr>'); 
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

        var a = parseInt(j + 1);

        var k = DefaultTaxArray[j];

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }
    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 ></td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    //myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr> <td align=left>Business Hours: 9:00 am to 8:30 pm(Sunday Open)</td></tr>');
    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr> <td align=left>Website: www.oryxfurniture.com</td></tr>');
    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr><td align=left>Email: oryxfurnitures@gmail.com</td></tr>');
    myWindow.document.write('<tr><td height=60px align=left>Thank you for being our valued Customers!</td></tr>');


    myWindow.print();
}


//Print Sales Copy - Local
function PrintthisBillSalesCopy(Rowlen) {

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#txtBillSlNocopy').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>   <tr><td>' + $('#txtaddress').val() + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr>  <tr><td>-</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr> <tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

//Print Sales Copy - Mobile
function PrintthisBillSalesMobileCopy(Rowlen) {

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#txtBillSlNocopy').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>   <tr><td>' + $('#txtaddress').val() + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr>  <tr><td>-</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr> <tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td></td><td>الرمز / الوصف</td><td>وحدة</td><td>كمية</td><td align=center>معدل</td><td align=right>ضريبة %</td><td align=right>قيمة الضريبة</td><td align=right>كمية</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        var sr = "";
        if ($('#Otherdescription' + Id).val() != undefined)
            sr = $('#Otherdescription' + Id).val();

        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + sr + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

        var a = parseInt(j + 1);

        var k = DefaultTaxArray[j];

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}  


//Print Sales Copy - ORYX 
function PrintthisBillSalesCopyORYX(Rowlen) { 

    console.log(Rowlen)

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/oryx.png" alt="company logo" height="80" width="130"></td><td align=right><h2>Sales Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#txtBillseriesId option:selected').html() + ' - ' + $('#txtBillSlNocopy').val() + '</h3></td></tr>      ');

    myWindow.document.write('<tr><td colspan=8>Prepared By</td>   <td align=right>Invoice Date : ' + $('#txtivdate').val() + '</td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td><td align=right>Terms : ' + $('#select_payterms option:selected').html() + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td><td align=right>Salesman : ' + $('#select_salesman option:selected').html() + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td><td align=right>Due Date : ' + $('#txtduedate').val() + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td><td align=right>Bill To : </td>  <tr><td colspan=8></td> <td align=right>' + $('#txtcustomer').val() + '</td></tr>   <tr> <td colspan=8>' + $('#select_place option:selected').html() + '</td><td align=right>' + $('#Trnno').val() + '</td></tr>  <tr> <td colspan=8></td><td align=right>' + $('#txtaddress').val() + '</td></tr> <tr><td ></td></tr>');

    myWindow.document.write('<table width=100%><tr><td colspan=9><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Bill Discount  :  </td><td align=right><b>' + $('#disc').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

        var a = parseInt(j + 1);

        var k = DefaultTaxArray[j];

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 ></td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    //myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');


    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr> <td align=left>Business Hours: 9:00 am to 8:30 pm(Sunday Open)</td></tr>');
    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr> <td align=left>Website: www.oryxfurniture.com</td></tr>');
    myWindow.document.write('<tr><td colspan=8 align=left></td></tr><tr><td align=left>Email: oryxfurnitures@gmail.com</td></tr>');
    myWindow.document.write('<tr><td height=60px align=left>Thank you for being our valued Customers!</td></tr>');


    myWindow.print();
}


function PrintthisBillQuotation(Rowlen) {
    console.log(Rowlen)
    var gridtotal = 0; var TotPQty = 0;
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Quotation Entry</h2></td></tr> <tr><td></td><td align=right><h3>Quotation No - ' + $('#savedQuotation').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right colspan=2>Quotation Date : ' + $('#QtnDate').val() + '</td> <td></td></tr><tr><td>' + $('#txtaddress').val() + '</td></tr><tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=3><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            //myWindow.document.write('<tr><td>' +  $('#td' + Id).text() + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');

            myWindow.document.write('<tr><td>' + $('#td' + Id).text() + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b> - ' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');


            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
            TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
        }
        //else {
        //    myWindow.document.write('<tr><td height="10px"  colspan=7></td></tr>');
        //}

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

    myWindow.document.write('<tr><td style="font-family:tahoma; font-size: 10px;" align=right colspan=5><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right><b>' + parseFloat(gridtotal).toFixed(2) + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td></tr>');

    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td></tr>');


    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

function PrintthisBillQuotationCopy(Rowlen) {
    console.log(Rowlen)
    var gridtotal = 0; var TotPQty = 0;
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Quotation Entry</h2></td></tr> <tr><td></td><td align=right><h3>Quotation No - ' + $('#txtQuotationNocopy').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right colspan=2>Quotation Date : ' + $('#QtnDate').val() + '</td> <td></td></tr><tr><td>' + $('#txtaddress').val() + '</td></tr><tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=3><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            //myWindow.document.write('<tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');

            myWindow.document.write('<tr><tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b> - ' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');


            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
            TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }
    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

  
      myWindow.document.write('<tr><td style="font-family:tahoma; font-size: 10px;" align=right colspan=5><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right><b>' + parseFloat(gridtotal).toFixed(2) + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td></tr>');

    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=7 style="font-family:tahoma; font-size: 10px;" align=right><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td></tr>');



    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

//New Print Function for Quotation Entry New
function PrintthisBillQuotationNew(Rowlen,Flag)
{
    var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
    var AmountinWords = WordwithDecimal($('#GrandTotal').val()); 
    var myWindow = window.open("", "", "width=1500,height=1500");

    var QtnNo = '';
    if (Flag == 0)      //Copy
    { QtnNo = $('#txtQuotationNocopy').val(); }
    else
    { QtnNo = $('#savedQuotation').val(); }

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    //myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=30%>QUOTATION</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Quote No.</td><td style="" class=rowbd>' + QtnNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#QtnDate').val() + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');
                                                                             
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100% frame="box"><tr>');
    myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td class=blclr>Phone : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    //myWindow.document.write('<table frame="box" style="margin-top:10px;background-color:#E8EAF6;color:#00838F" height=50px width=100%><tr align=center><td colspan=12>PROJECT DESCRIPTION : [ERP Software For Gas Business Management System which includes Sales,Purchase,Inventory,Job Management and Financial Modules] </td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);      
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
                if (Rowcount % 44 == 0) {           //Border bottom gery for last table row in the page           
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);                   
                }
                else {                             //Border bottom lightgery for other tbl rows in the page            
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);                 
                }
                if (Rowcount % 44 == 0)
                {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=255px colspan=8></td></tr>');
                }
            }
    }
    for (var a = 1; a <= 44 - Rowcount; a++) {
        myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    }
    myWindow.document.write('</table>');
    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
    myWindow.document.write('<td width=100%>');
    myWindow.document.write('<table width=100%>');
    myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Quotation Validity : ' + $('#txtdays').val() + '</td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
    //myWindow.document.write('<tr><td colspan=8 align=center></td></tr>');
    myWindow.document.write('</table>');
    myWindow.document.write('</td></tr></table>');

    myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

    myWindow.print();
}


//New Print Function for Quotation Entry New
function PrintthisBillQuotationNewLetter(Rowlen, Flag) {
    var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
    var AmountinWords = WordwithDecimal($('#GrandTotal').val());
    var myWindow = window.open("", "", "width=1500,height=1500");

    var QtnNo = '';
    if (Flag == 0)      //Copy
    { QtnNo = $('#txtQuotationNocopy').val(); }
    else
    { QtnNo = $('#savedQuotation').val(); }

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    //myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=30%>QUOTATION</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Quote No.</td><td style="" class=rowbd>' + QtnNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#QtnDate').val() + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100% frame="box"><tr>');
    myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td class=blclr>Phone : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    //myWindow.document.write('<table frame="box" style="margin-top:10px;background-color:#E8EAF6;color:#00838F" height=50px width=100%><tr align=center><td colspan=12>PROJECT DESCRIPTION : [ERP Software For Gas Business Management System which includes Sales,Purchase,Inventory,Job Management and Financial Modules] </td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            if (Rowcount % 40 == 0) {           //Border bottom gery for last table row in the page           
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
            }
            else {                             //Border bottom lightgery for other tbl rows in the page            
                myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
            }
            if (Rowcount % 40 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=8></td></tr>');
            }
        }
    }
    for (var a = 1; a <= 40 - Rowcount; a++) {
        myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
    }
    myWindow.document.write('</table>');
    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
    myWindow.document.write('<td width=100%>');
    myWindow.document.write('<table width=100%>');
    myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Quotation Validity : ' + $('#txtdays').val() + '</td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
    myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
    //myWindow.document.write('<tr><td colspan=8 align=center></td></tr>');
    myWindow.document.write('</table>');
    myWindow.document.write('</td></tr></table>');

    myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

    myWindow.print();
}

// Print Function For Sales Return - Local Save
function PrintthisBillSalesReturn(Rowlen) {
    console.log(Rowlen)
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Return</h2></td></tr> <tr><td></td><td align=right><h3>Return No - ' + $('#txtBillSlNoSave').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right colspan=2>Return Date : ' + $('#txtivdate').val() + '</td> <td></td></tr><tr><td>' + $('#txtaddress').val() + '</td></tr><tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=3><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
     var slno =1;
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
       
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + slno + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
            slno++;
        }
      
    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

        var k = DefaultTaxArray[j];
        var a = parseInt(k); //parseInt(j + 1); 
        console.log('a : ' + a)
        console.log('k : ' + k)
        console.log('splittaxable : ' + $('#splittaxable_' + k).val())

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }


    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

// Print Function For Sales Return - Local Copy
function PrintthisBillSalesReturnCopy(Rowlen) {
    console.log(Rowlen)
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Sales Return</h2></td></tr> <tr><td></td><td align=right><h3>Return No - ' + $('#txtBillSlNocopy').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#txtcustomer').val() + '</td><td align=right colspan=2>Return Date : ' + $('#txtivdate').val() + '</td> <td></td></tr><tr><td>' + $('#txtaddress').val() + '</td></tr><tr><td>' + $('#select_place option:selected').html() + '</td><td></td></tr><tr><td colspan=3><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code/Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Tax%</td><td align=right>Tax Amount</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td><b>' + $('#txtproduct' + Id).val() + '</b></td></tr><tr><td></td><td>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + $('#txtrate' + Id).val() + '</td>   <td align=center>' + $('#txttaxpercent' + Id).val() + '</td>  <td align=right>' + $('#txttaxamnt' + Id).val() + '</td>         <td align=right>' + $('#txtamnt' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    for (var j = 0; j < DefaultTaxArray.length; j++) {

       

        var k = DefaultTaxArray[j];
        var a = parseInt(k); //parseInt(j + 1); 

        console.log('a : ' + a)
        console.log('k : ' + k)
        console.log('splittaxable : ' + $('#splittaxable_' + k).val())

        if (k == 0 && ($('#splittaxable_0').val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
        }

        if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
            myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
        }
    }


    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');

    myWindow.print();
}

//New Print Function For Sales Return AutoMobilesCopy & Save (flag-0 : save, flag-1 : Copy) 
function PrintthisBillSalesReturnAutoMobile(Rowlen,flag) {
    var Rowcount = 0; gridtotal = 0;
    var BillSlNo;
    if (flag == 1)
    {
        JsBarcode("#barcode1", $('#txtBillSlNocopy').val());
        BillSlNo = $("#DepartmentCode").val()+' - '+ $('#txtBillSlNocopy').val();
    }
    
    else if (flag == 0)
    {
        JsBarcode("#barcode1", $('#txtBillSlNoSave').val());
        BillSlNo = $("#DepartmentCode").val() + ' - ' + $('#txtBillSlNoSave').val(); 
    } 
    
    console.log('BillSlNo:' + BillSlNo)
    console.log('flag:' + flag) 
   

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    //alert(divToPrint.outerHTML)

    var TotQty = 0;
    var TRN = '';
    if ($('#Trnno').val() != '' && $('#Trnno').val() != 0)
        TRN = $('#Trnno').val();

    var Adrs = $.trim($('#txtaddress').val());
    Adrs = Adrs.substring(0, 25);


    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
    myWindow.document.write('<table width="100%" class="printbdy">');
    myWindow.document.write('<tr><td height=105px colspan=17></td></tr>');
    myWindow.document.write('<tr><td width=3px></td><td colspan=7 ></td><td align=center colspan=4><b>SALES RETURN</b></td><td colspan=2></td><td colspan=3></td><tr>')

    myWindow.document.write('<tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + BillSlNo + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b> ' + Adrs + ' </b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
    myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN : ' + TRN + ' </b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')

    
    myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr><td colspan=17><table class=printbdy>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td  align=center width=59px>&#160;&#160;' + Id + '</td><td width=103px colspan=2>' + $('#txtproduct' + Id).val() + '</td><td width=350px colspan=8>' + $('#ProductDesc' + Id).val() + '</td><td align=center width=50px>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td width=62px align=center>' + $('#txtquantity' + Id).val() + '</td><td width=80px align=right colspan=2>' + $('#txtrate' + Id).val() + '</td><td width=97px align=right colspan=2>' + $('#txttaxableamnt' + Id).val() + '</td><tr>');
            gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
            TotQty += parseFloat($('#txtquantity' + Id).val() || 0); 
        }

        if (Rowcount % 34 == 0) { 

            myWindow.document.write('<tr><td height=400px colspan=17></td></tr>');

            myWindow.document.write('<tr><td colspan=17><table class="printbdy" width=100%><tr><td></td><td width=40% colspan=7 ><b>' + $('#txtcustomer').val() + '</b></td><td width=20% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
             + '</td><td align=right width=18% colspan=2><b>INV NO &#160;:</b></td><td width=18% colspan=3><b>' + BillSlNo + '</td><tr>');
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>#9</b></td><td align=right colspan=2><b>Date &#160;&#160;&#160;&#160;&#160;:</b></td><td colspan=3>' + $('#txtivdate').val() + '</td><tr>')
            myWindow.document.write('<tr><td></td><td colspan=7 ><b>TRN#</b></td><td align=right colspan=2><b>LPO NO &#160;:</b></td><td colspan=3></td><tr>')
            myWindow.document.write('<tr><td height=50px colspan=17></td></tr><tr></table></td></tr>');
            Rowcount = 0;
        }
    }


    for (var a = 1; a <= 34 - Rowcount; a++) {

        myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
    }
    myWindow.document.write('</table></td></tr>');

    myWindow.document.write('<tr><td height=10px></td></tr>');
    myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + TotQty + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
   // myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + ' Only' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

    myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



    myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
    myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

    myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

    // myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');
    // myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    myWindow.print();
    myWindow.close()
} 


//NEW PRINT FUCTION FOR SALES RETURN
function PrintthisSalesRETURNAUTO(Rowlen,flag) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var TotQty = 0;
    var total = 0;
    var RBillNo = '';
    var Rowcount = 0;

    //var address = ($('#txtaddress').val()).substr(0, 60);

    if (flag == 0)
        RBillNo = $('#txtBillSlNoSave').val(); 
    else if (flag == 1)
        RBillNo = $('#txtBillSlNocopy').val(); 

    myWindow.document.write('<table width=100%><tr><td align=center><h3>SALES RETURN</h3></td></tr>');


    myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px;table-layout:fixed" width=100%><tr><td align=left colspan=6>'
       + $('#txtcustomer').val() + '</td><td >Sales Ret No </td><td align=left colspan=2 > : ' + RBillNo + '</td></tr><tr><td colspan=6></td ><td>Ret Date </td><td colspan=2> : '
       + $('#txtivdate').val() + '</td></tr><tr><td colspan=6></td><td>Invoice No. </td><td colspan=2> : ' + $('#select_transfer').val() + ' </td></tr><tr><td colspan=6>'
       + ($('#txtaddress').val()).substr(0, 60) + '</td><td> Salesman </td><td colspan=2> : ' + ($('#select_salesman').find("option:selected").text()).substr(0, 25) + '</td></tr><tr><td align=left colspan=3>phone : '
       + window.CompanySettingsArray.PhoneNo + '</td><td colspan=3>Fax : ' + window.CompanySettingsArray.Fax + '</td><td>LPO </td><td colspan=2> : ' + $('#txtlpono').val() + '</td></tr>');


    //myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px" width=100%><tr><td align=left colspan=6>' + $('#txtcustomer').val() + '</td><td  align=left style="padding-left:12%">Sales Ret No </td><td  align=left > : </td><td align=left style="padding-left:1%">' + RBillNo + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Ret Date </td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#txtivdate').val() + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Invoice No.</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_transfer').val() + '</td></tr><tr><td align=left colspan=6>' + $('#txtaddress').val() + '</td><td  align=left style="padding-left:12%">Salesman</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_salesman').find("option:selected").text() + '</td></tr><tr><td align=left colspan=3>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td><td align=left colspan=3>Fax : ' + window.CompanySettingsArray.Fax + '</td><td  align=left style="padding-left:12%">LPO </td><td  align=left > : </td><td></td></tr>');


    myWindow.document.write('<table width=100%> <tr><td align=center></td></tr><tr><td align=center></td></tr>');
    myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;"width=100%>');

    myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px">Sl#</td><td style="padding-left:5px">Code</td><td style="padding-left:5px">Description</td><td style="padding-left:5px">Unit</td><td align=center>Qty</td><td align=right style="padding-right:5px">Rate</td><td align=right style="padding-right:5px">Total</td></tr>');
    var slno = 1;
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);

        if ($('#txtproduct' + Id).length) {
            Rowcount += 1;
            myWindow.document.write('<tr><td style="padding-left:5px">' + slno + '</td><td style="padding-left:5px">' + $('#txtproduct' + Id).val() + '</td><td style="padding-left:5px">' + $('#ProductDesc' + Id).val() + '</td><td style="padding-left:5px">' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtrate' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtamnt' + Id).val() + '</td></tr>');
            slno++;
            TotQty += parseFloat($('#txtquantity' + Id).val() || 0);
            total += parseFloat($('#txtamnt' + Id).val() || 0)
        }

    }
     for (var a = 1; a <= 33 - Rowcount; a++) {
         //myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
         myWindow.document.write('<tr style="opacity:0"><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td align=center>1</td><td align=right style="padding-right:5px">1</td><td align=right style="padding-right:5px">1</td></tr>');

    }

     myWindow.document.write('<tr style="border-top:1px solid black;"><td colspan=4 style="border-right:1px solid white;">Total  :  ' + AmountinWords + ' Only' + '</td><td align=center style="border-right:1px solid white;" >' + TotQty + ' </td><td style="border-right:1px solid white;" align=right>Total</td><td align=right style="">' + total.toFixed(2) + '</td></tr><tr style="border-right:1px solid black;"><td style="border-right:1px solid white;"></td><td style="border-right:1px solid white;"colspan=3></td><td align=center style="border-right:1px solid white;" ></td><td style="border-right:1px solid white;" align=right>Disc.</td><td align=right style="">' + parseFloat($('#disc').val()).toFixed(Decimal) + '</td></tr><tr ><td style="border-right-style:none;border-left-style:none;"></td><td style="border-right-style:none;border-left-style:none;" colspan=3></td><td align=center style="border-right-style:none;border-left-style:none;" ></td><td style="border-right-style:none;border-left-style:none;" align=right>RoundOff</td><td align=right style="border-left-style:none;">' + parseFloat($('#TotRoundOff').val()).toFixed(Decimal) + '</td></tr><tr ><td style="border-right-style:none;border-left-style:none;"></td><td style="border-right-style:none;border-left-style:none;" colspan=3></td><td align=center style="border-right-style:none;border-left-style:none;" ></td><td style="border-right-style:none;border-left-style:none;" align=right>NetTotal</td><td align=right style="border-left-style:none;">' + parseFloat($('#GrandTotal').val()).toFixed(Decimal) + '</td></tr>');
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var today1 = new Date();
    var time = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
    myWindow.document.write('<table width=100%><tr></tr><tr></tr><tr></tr><tr></tr>');
   
    myWindow.document.write('<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr><td>Received By.</td></tr><tr><td align=right>Time:  ' + time + '</td></tr><tr><td align=right>Date: ' + date + ' </td></tr>');


    myWindow.print();
}


function PrintthisBillPurchase(Rowlen) {

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Purchase Invoice</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#purchaseinvoiceno').val() + ' - ' + $('#copypurchaseinvo').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#suppliername').val() + '</td><td align=right>Invoice Date : ' + $('#purchaseinvdate').val() + '</td></tr>   <tr><td></td><td align=right></td></tr>  <tr><td ></td><td align=right></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code</td><td>Description</td><td align=right>Unit</td><td align=center>Qty</td><td align=right>Rate</td><td align=right>Tax</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#product_' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td>' + $('#productdesc_' + Id).val() + '</td><td align=right>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + $('#txtrate_' + Id).val() + '</td>   <td align=right>' + $('#txttax_' + Id).val() + '</td>           <td align=right>' + $('#amount_' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');


    //myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');
    myWindow.print();
}
//Performa Copy Print
function PrintthisPurchasePerforma(Rowlen) {

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Purchase Performa</h2></td></tr> <tr><td></td><td align=right><h3>No : ' + $('#purchaseinvoiceno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>To</td><td></td></tr>  <tr><td>' + $('#suppliername').val() + '</td><td align=right>Date : ' + $('#purchaseinvdate').val() + '</td></tr>   <tr><td></td><td align=right></td></tr>  <tr><td ></td><td align=right></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code</td><td>Description</td><td align=right>Unit</td><td align=center>Qty</td><td align=right>Rate</td><td align=right>Tax</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#product_' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td>' + $('#productdesc_' + Id).val() + '</td><td align=right>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + $('#txtrate_' + Id).val() + '</td>   <td align=right>' + $('#txttax_' + Id).val() + '</td>           <td align=right>' + $('#amount_' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');


    //myWindow.document.write('<tr><td colspan=8><hr></td></tr>');

    //myWindow.document.write('<table style="border-collapse: collapse;" width="100%"><tr><td style="border:1px solid black" rowspan=2 align=center>Taxable value</td><td style="border:1px solid black" colspan=2 align=center>Centeral Tax</td><td style="border:1px solid black" colspan=2  align=center>State Tax</td><td style="border:1px solid black" rowspan=2 align=center>Total Tax Amount</td></tr>');

    //myWindow.document.write('<tr><td align=center style="border:1px solid black" >Rate</td><td align=center style="border:1px solid black">Amount</td><td align=center style="border:1px solid black">Rate</td><td align=center style="border:1px solid black">Amount</td></tr>');

    //for (var j = 0; j < DefaultTaxArray.length; j++) {

    //    var a = parseInt(j + 1);

    //    var k = DefaultTaxArray[j];

    //    if (k == 0 && ($('#splittaxable_0').val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=center>0.00</td><td style="border:1px solid black" align=right>0.00</td><td style="border:1px solid black" align=right>0.00</td></tr>');
    //    }

    //    if (k != 0 && ($('#splittaxable_' + k).val() > 0)) {
    //        myWindow.document.write('<tr><td style="border:1px solid black" align=right>' + $('#splittaxable_' + k).val() + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=center>' + ($('#splitaxrate_' + a).val() / 2) + "%" + '</td><td style="border:1px solid black" align=right>' + ($('#splittax_' + k).val() / 2).toFixed(2) + '</td><td style="border:1px solid black" align=right>' + $('#splittax_' + k).val() + '</td></tr>');
    //    }
    //}

    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');
    myWindow.print();
}


function PrintthisUnloadPurchasePerforma(Rowlen) {
    var bin = '';
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=1>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Purchase Performa</h2></td></tr> <tr><td></td><td align=right><h4>No : ' + $('#purchaseinvoiceno').val() + '</h4></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>To</td><td></td></tr>  <tr><td>' + $('#suppliername').val() + '</td><td align=right>Date : ' + $('#purchaseinvdate').val() + '</td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code</td><td>Description</td><td align=center>Qty</td><td>Bin</td><td align=center>Location</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);

        if ($('#Bin' + Id).val() != '')
            bin = $('#Bin' + Id).val();

        if ($('#product_' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td>' + $('#productdesc_' + Id).val() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td>' + bin + '</td><td align=center> </td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
  
    myWindow.print();
}


function PrintthisBillPurchaseOrder(Rowlen) {

    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=right><h2>Purchase Order</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#purchaseOrderno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%>Bill To</td><td></td></tr>  <tr><td>' + $('#suppliername').val() + '</td><td align=right>Order Date : ' + $('#Orderdate').val() + '</td></tr>   <tr><td></td><td align=right></td></tr>  <tr><td ></td><td align=right></td></tr><tr><td colspan=2><hr></td></tr></table>')
    myWindow.document.write('<table width=100%><tr><td>#</td><td>Code</td><td>Description</td><td align=right>Unit</td><td align=center>Qty</td><td align=right>Rate</td><td align=right>Tax</td><td align=right>Amount</td></tr><tr><td colspan=8><hr></td></tr>');
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#product_' + Id).length) {
            myWindow.document.write('<tr><td>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td>' + $('#productdesc_' + Id).val() + '</td><td align=right>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + $('#txtrate_' + Id).val() + '</td>   <td align=right>' + $('#txttax_' + Id).val() + '</td>           <td align=right>' + $('#amount_' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=7></td></tr>');
        }

    }
    myWindow.document.write('<tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr>');


    myWindow.document.write('<tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr>');
    myWindow.document.write('<tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr>');
    myWindow.print();
}



function PrintthisLocationTransfer(Rowlen,flg) {

    var divToPrint = document.getElementById("barcode1");
    divToPrint.style.width = "auto";
    divToPrint.style.height = "55px";

    var bin = '';
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css">   .tdright{ border-right:1px solid black;} </style>');
    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2></td></tr> ');
    
    var LTNo = '';
    if (flg == 0) {
        LTNo = $('#TRNoCopy').val();
    }
    else if (flg == 1) {
        LTNo = $('#TRNo').val();
    }
   // alert('LTNo' + LTNo)
    if ($('#Comments').val() != '') {
        var str1 = $('#Comments').val(),
    index = 0,
    res = [];
        while ((index = str1.indexOf(' ', index + 1)) > 0) {
            res.push(index);
        }
      
        var str = $('#Comments').val();
            //.split(" ").join("");

       

       
        //var b = " "; 
       
        //for (var m = 0; m < res.length; m++)
        //{
        //    var position = res[m];
        //    console.log('position ')
        //    console.log(position)
        //    str = [str.slice(0, position), b, str.slice(position)].join('');
        //}
        // console.log('str ')
        //console.log(str)
       
        myWindow.document.write
      ('<tr align=center><td colspan=17 width=90%>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
       '<tr align=center><td colspan=17 width=90%>LOCATION TRANSFER</td></tr>' +

    
      
'<table width="100%" id="dio" style="table-layout:fixed">' +
    '<tr><td colspan="8"></td><td rowspan="4" colspan="3">' + divToPrint.outerHTML + '</td>' +
    '<td colspan="3">Department </td><td colspan="3">: ' + $('#Deptcode').val() + '</td></tr>' +
    '<tr><td rowspan="3" colspan="11">' + $('#Comments').val() + '</td>'+
    '<td colspan="3">User </td><td colspan="3">: ' + $('#User').val() + '</td></tr> ' +
    '<tr><td colspan="3">Transfer Number </td><td colspan="3">: ' + LTNo + '</td></tr>' +
    '<tr><td colspan="3">Date </td><td colspan="3">: ' + $('#TRDate').val() + '</td></tr>' +
'</table>')

    }
    else
    {
        myWindow.document.write
       ('<tr align=center><td colspan=17 width=90%>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
        '<tr align=center><td colspan=17 width=90%>LOCATION TRANSFER</td></tr>' +
        '<tr><td></td>' +
        '<td width=33% colspan=7 ></td><td width=27% align=center rowspan=5 colspan=4>' + divToPrint.outerHTML
        + '</td>' +
        '<td align=right width=18% colspan=2></td>' +
        '<td width=18% colspan=3> </td><tr>' +
        '<tr align=right>' +
        '<td colspan=17><div style="">Department : ' + $('#Deptcode').val() + '</div></td></tr>' +
        '<tr align=right>' +
         '<td colspan=17><div style="">User : ' + $('#User').val() + '</div></td></tr>' +
         '<tr align=right>' +
         '<td colspan=17><div style="">Transfer Number : ' + LTNo + '</div></td></tr>' +
         '<tr align=right>' +
         '<td colspan=17><div style="">Date : ' + $('#TRDate').val() + '</div></td></tr>')

    }
  


    myWindow.document.write('<table bordercolor="1 px solid black"  frame="box"  style="font-size:85%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;margin-left:2.5%" width=97%><tr style="border:1px solid black;"><td class=tdright align=center width="5%">Sl#</td><td align=left width="17%" class=tdright style="padding-left:5px">Item Code</td><td align=left width="40%" class=tdright style="padding-left:5px">Item Name</td><td align=center width="10%" class=tdright>Bin</td><td align=left width="15%" class=tdright style="padding-left:5px">From Loc.</td><td align=left width="15%" class=tdright style="padding-left:5px">ToLoc.</td><td align=center width="15%" class=tdright>Qty.</td></tr>');
    var qty = 0;
    var pdt = 0;
    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i);

        if ($('#Bin' + Id).val() != '') {
            bin = $('#Bin' + Id).val();
        }
        else
        {
            bin = '';
        }
        
        if ($('#txtprd' + Id).length) {
            pdt++;
            qty = qty + parseFloat($('#txtqnty' + Id).val()); 
            myWindow.document.write('<tr><td align=center width="5%" class=tdright>' + $('#td' + Id).text() + '</td><td class=tdright align=left width="17%" style="padding-left:5px">' + $('#txtprd' + Id).val() + '</td><td class=tdright align=left  width="40%" style="padding-left:5px">' + $('#txtdesc' + Id).val() + '</td><td class=tdright align=center  width="10%">' + bin + '</td><td class=tdright align=left  width="15%" style="padding-left:5px">' + ($('#Location option:selected').html()) + '</td><td class=tdright align=left  width="15%" style="padding-left:5px">' + ($('#ToLocation option:selected').html()) + '</td><td class=tdright align=center  width="15%">' + $('#txtqnty' + Id).val() + '</td></tr>');
        }

    }
 
    myWindow.document.write('</table>');
    myWindow.document.write('<table style="font-size:85%" width=100%>');
    myWindow.document.write('<tr><td height="10px"  colspan=12></td></tr>');
    myWindow.document.write('<tr><td colspan=12 align=right> Total Products : ' + pdt + ' &nbsp;&nbsp;&nbsp; Total Quantity : ' + qty + '</td></tr>');
    myWindow.document.write('</table>');
   
    myWindow.print();
}

function PrintthisStockOut(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td></td></tr> ');

    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

    myWindow.document.write('<tr align=right><td colspan=6><b>Department  : ' + window.LoggedInUserArray[4] + '</b></td></tr>');
    myWindow.document.write('<tr align=right><td colspan=6><b>Stock Out # : ' + $("#STONo").val() + '</b></td></tr>');

    myWindow.document.write('<tr align=right><td colspan=6><b>Date : ' + $('#STODate').val() + '</b></td></tr>');



    myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px" width=100%><tr><td align=left width="5%">Slno</td><td align=left width="20%">Item Code</td><td align=left width="20%">Item Name</td><td align=left width="15%">From Loc</td><td align=left width="15%">To Loc</td><td align=center width="5%">Qty</td><td align=right width="10%">Price</td><td align=right width="10%">Total</td></tr><tr><td colspan=11><hr></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        console.log(i)
        var Id = parseInt(i);

        if ($('#txtprd' + Id).length) {

            myWindow.document.write('<tr><td align=left width="5%">' + Id + '</td><td align=left width="20%">' + $('#txtprd' + Id).val() + '</td><td  align=left  width="20%">' + $('#txtdesc' + Id).val() + '</td><td  align=left  width="15%">' + ($('#Location option:selected').html()) + '</td><td align=left  width="15%">' + ($('#ToLocation option:selected').html()) + '</td><td align=center  width="5%">' + $('#txtqnty' + Id).val() + '</td><td align=right  width="10%">' + $('#rate' + Id).val() + '</td><td align=right  width="10%">' + $('#tamnt' + Id).val() + '</td></tr>');
        }
        else {
            myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        }
    }
    myWindow.document.write('</table>');
    myWindow.print();
}
function PrintthisStockIN(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td></td></tr> ');

    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

    myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px" width=100%><tr><td align=left width="5%">Slno</td><td align=left width="10%">Date</td><td align=left width="20%">Item Code</td><td align=left width="20%">Item Name</td><td align=left width="15%">Transfer From</td><td align=left width="15%">Transfer To</td><td align=center width="5%">Qty</td><td align=right width="10%">Price</td><td align=right width="10%">Total</td></tr><tr><td colspan=11><hr></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        console.log(i)
        var Id = parseInt(i);

        if ($('#txtprd' + Id).length) {

            myWindow.document.write('<tr><td align=left width="5%">' + Id + '</td><td align=left width="10%">' + $('#STIDate').val() + '</td><td align=left width="20%">' + $('#txtprd' + Id).val() + '</td><td  align=left  width="20%">' + $('#txtdesc' + Id).val() + '</td><td  align=left  width="15%">' + ($('#ToLocationIn option:selected').html()) + '</td><td align=left  width="15%">' + ($('#LocationIn option:selected').html()) + '</td><td align=center  width="5%">' + $('#txtqnty' + Id).val() + '</td><td align=right  width="10%">' + $('#rate' + Id).val() + '</td><td align=right  width="10%">' + $('#tamnt' + Id).val() + '</td></tr>');
        }

        else {
            myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        }

    }
    myWindow.document.write('</table>');
    myWindow.print();
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

function withDecimal(n) {
    var nums = n.toString().split('.')
    var whole = convertNumberToWords(nums[0])
    if (nums.length == 2) {
        var fraction = convertNumberToWords(nums[1])
        return whole + 'and ' + fraction + ' Fils Only';
    } else {
        return whole;
    }
}

var ONE_THOUSAND = Math.pow(10, 3);
var ONE_MILLION = Math.pow(10, 6);
var ONE_BILLION = Math.pow(10, 9);
var ONE_TRILLION = Math.pow(10, 12);
var ONE_QUADRILLION = Math.pow(10, 15);
var ONE_QUINTILLION = Math.pow(10, 18);

function integerToWord(integer) {
    var prefix = '';
    var suffix = '';

    if (!integer) { return "Zero"; }

    if (integer < 0) {
        prefix = "negative";
        suffix = integerToWord(-1 * integer);
        return prefix + " " + suffix;
    }
    if (integer <= 90) {
        switch (integer) {
            case integer < 0:
                prefix = "negative";
                suffix = integerToWord(-1 * integer);
                return prefix + " " + suffix;
            case 1: return "One";
            case 2: return "Two";
            case 3: return "Three";
            case 4: return "Four";
            case 5: return "Five";
            case 6: return "Six";
            case 7: return "Seven";
            case 8: return "Eight";
            case 9: return "Nine";
            case 10: return "Ten";
            case 11: return "Eleven";
            case 12: return "Twelve";
            case 13: return "Thirteen";
            case 14: return "Fourteen";
            case 15: return "Fifteen";
            case 16: return "Sixteen";
            case 17: return "Seventeen";
            case 18: return "Eighteen";
            case 19: return "Nineteen";
            case 20: return "Twenty";
            case 30: return "Thirty";
            case 40: return "Forty";
            case 50: return "Fifty";
            case 60: return "Sixty";
            case 70: return "Seventy";
            case 80: return "Eighty";
            case 90: return "Ninety"; 
            default: break;
        }
    }

    if (integer < 100) {
        prefix = integerToWord(integer - integer % 10);
        suffix = integerToWord(integer % 10);
        return prefix + "" + suffix;
    }

    if (integer < ONE_THOUSAND) {
        prefix = integerToWord(parseInt(Math.floor(integer / 100), 10)) + " hundred ";
        if (integer % 100) { suffix = "and " + integerToWord(integer % 100); }
        return prefix + suffix;
    }

    if (integer < ONE_MILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_THOUSAND), 10)) + " thousand ";
        if (integer % ONE_THOUSAND) { suffix = integerToWord(integer % ONE_THOUSAND); }
    }
    else if (integer < ONE_BILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_MILLION), 10)) + " million ";
        if (integer % ONE_MILLION) { suffix = integerToWord(integer % ONE_MILLION); }
    }
    else if (integer < ONE_TRILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_BILLION), 10)) + " billion ";
        if (integer % ONE_BILLION) { suffix = integerToWord(integer % ONE_BILLION); }
    }
    else if (integer < ONE_QUADRILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_TRILLION), 10)) + " trillion ";
        if (integer % ONE_TRILLION) { suffix = integerToWord(integer % ONE_TRILLION); }
    }
    else if (integer < ONE_QUINTILLION) {
        prefix = integerToWord(parseInt(Math.floor(integer / ONE_QUADRILLION), 10)) + " quadrillion ";
        if (integer % ONE_QUADRILLION) { suffix = integerToWord(integer % ONE_QUADRILLION); }
    } else {
        return '';
    }
    return prefix + "" + suffix;
}

function floatToWord(value) {
    var decimalValue = (value % 1);
    var integer = value - decimalValue;
    decimalValue = Math.round(decimalValue * 100);
    var decimalText = (!decimalValue ? '' :
      decimalValue < 10 ? "and ' " + integerToWord(decimalValue) :
      decimalValue % 10 === 0 ? 'and ' + integerToWord(decimalValue / 10) :
      'and ' + integerToWord(decimalValue)) + ' Fils Only';
    return (
      integer && !decimalValue ? integerToWord(integer) :
      integer && decimalValue ? [integerToWord(integer), decimalText].join(' ') :
      !integer && decimalValue ? decimalText :
      integerToWord(0)
    );
}

function WordwithDecimal(n) { 
    var nums = n.toString().split('.')
    var whole = floatToWord(nums[0])
    if ((nums.length == 2) && (nums[1]>0)) {
        var fraction = floatToWord(nums[1])
        return whole + ' and' + fraction + ' Ps Only';
    } else {
        return whole + ' Only'; 
    }
}

function PrintthisReceiptEntryCopy(Rowlen) {
    var InvNo = '';
    var InvoDate = '';
    var Rcamount = 0, RcamountAAA = 0;
  
    var AmountinWords = convertNumberToWords($('#FCAmount').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
    myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
    myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
    myWindow.document.write('<tr><td align=right></td></tr></table>')

    myWindow.document.write('<table width=100%><tr><td><h4 align=center><u>RECEIPT VOUCHER</u></h4></td></tr></table>')
    myWindow.document.write('<table width=100%<tr><td>RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM:</td><td align=right>RV No: ' + $('#VoucherNo').val() + '</td></tr></table>')

    myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')

    for (var i = 1; i < Rowlen; i++) {
        if ($('#SlNoCheck' + i).prop("checked")) {



            if ($('#InvoNo' + i).text()) {
                if (InvNo == '') {
                    InvNo = InvNo + $('#InvoNo' + i).text();
                }
                else
                    InvNo = InvNo + ',' + $('#InvoNo' + i).text();

            }

            InvoDate += $('#InvoDate' + i).text();
            Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
            RcamountAAA = Rcamount.toLocaleString('en');
           

        }
    }
    myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>' + $('#VEDescription' + Rowlen).text() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
    myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
    myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    if (($('#ChequeNo').val() != 0)) {
        myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
    }

    myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')

    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table><tr><td>Amount in words Dirhams:' + AmountinWords + ' Only' + '</td></tr></table>')
    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')


    myWindow.print();
}

function PrintthisReceiptEntrysave(Rowlen) {
    var InvNo = '';
    var InvoDate = '';
    var Rcamount = 0, RcamountAAA = 0;
    var AmountinWords = convertNumberToWords($('#FCAmount').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
    myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
    myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
    myWindow.document.write('<tr><td align=right></td></tr></table>')

    myWindow.document.write('<table width=100%><tr><td><h4 align=center><u>RECEIPT VOUCHER</u></h4></td></tr></table>')
    myWindow.document.write('<table width=100%<tr><td>RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM:</td><td align=right>RV No: ' + $('#VoucherNoMain').val() + '</td></tr></table>')

    myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')
    
    var AdvanceCheck = 0;
    if ($('#Advance').prop('checked'))
    AdvanceCheck = 1;
   
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#SlNoCheck' + i).prop("checked")) {            
            if ($('#InvoNo' + i).text()) {
                if (InvNo == '') {
                    InvNo = InvNo + $('#InvoNo' + i).text();
                }
                else
                    InvNo = InvNo + ',' + $('#InvoNo' + i).text();

            }
            InvoDate += $('#InvoDate' + i).text();
            Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
            RcamountAAA = Rcamount.toLocaleString('en');

           
        }      
    }
    if (AdvanceCheck == 0) {
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>Settled Against InvNo:' + InvNo + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    }
    else if (AdvanceCheck == 1) {
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>Advance Received From :'+ $('#AccountName').val() +'</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Advance Received: </td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    }
    

    if ($('#AccountType').val() != 1) {
        
        myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
    }

    myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')

    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table><tr><td>Amount in words ' + $('#Currency option:selected').text() + ':' + AmountinWords + ' Only' + '</td></tr></table>')
    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')


    myWindow.print();
}


function PrintthisPaymentEntryCopy(Rowlen) {
    var InvNo = '';
    var InvoDate = '';
    var Rcamount = 0, RcamountAAA = 0;
    var AmountinWords = convertNumberToWords($('#FCAmount').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
    myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
    myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
    myWindow.document.write('<tr><td align=right></td></tr></table>')

    myWindow.document.write('<table width=100%><tr><td><h4 align=center><u>PAYMENT VOUCHER</u></h4></td></tr></table>')
    myWindow.document.write('<table width=100%<tr><td>PAY TO:</td><td align=right>PV No: ' + $('#VoucherNo').val() + '</td></tr></table>')

    myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')

    for (var i = 1; i < Rowlen; i++) {
        if ($('#SlNoCheck' + i).prop("checked")) {



            if ($('#InvoNo' + i).text()) {
                if (InvNo == '') {
                    InvNo = InvNo + $('#InvoNo' + i).text();
                }
                else
                    InvNo = InvNo + ',' + $('#InvoNo' + i).text();

            }

            InvoDate += $('#InvoDate' + i).text();
            Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
            RcamountAAA = Rcamount.toLocaleString('en');


        }
    }
    myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>' + $('#VEDescription' + Rowlen).text() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
    myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
    myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    if (($('#ChequeNo').val() != 0)) {
        myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
    }

    myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')

    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table><tr><td>Amount in words Dirhams:' + AmountinWords + ' Only' + '</td></tr></table>')
    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')


    myWindow.print();
}
function PrintthisPaymentEntrysave(Rowlen) {

   
    var InvNo = '';
    var InvoDate = '';
    var Rcamount = 0, RcamountAAA = 0;
    var AmountinWords = convertNumberToWords($('#FCAmount').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
    myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
    myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
    myWindow.document.write('<tr><td align=right></td></tr></table>')

    myWindow.document.write('<table width=100%><tr><td><h4 align=center><u>PAYMENT VOUCHER</u></h4></td></tr></table>')
    myWindow.document.write('<table width=100%<tr><td>PAY TO:</td><td align=right>PV No: ' + $('#VoucherNoMain').val() + '</td></tr></table>')

    myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')
   
    var AdvanceCheck = 0;
    if ($('#Advance').prop('checked'))
        AdvanceCheck = 1;

    for (var i = 1; i <= Rowlen; i++) {
       
        

        if ($('#SlNoCheck' + i).prop("checked")) {
           
            if ($('#InvoNo' + i).text()) {
                if (InvNo == '') {
                    InvNo = InvNo + $('#InvoNo' + i).text();
                }
                else
                    InvNo = InvNo + ',' + $('#InvoNo' + i).text();

            }
           
            InvoDate += $('#InvoDate' + i).text();
            Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
            RcamountAAA = Rcamount.toLocaleString('en');


        }
    }
    if (AdvanceCheck == 0) {
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>Settled Against InvNo:' + InvNo + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    }
    else if (AdvanceCheck == 1) {
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>Advance Received From :' + $('#AccountName').val() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Advance Received: </td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr>');

    }


    if ($('#AccountType').val() != 1) {

        myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
    }

    myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#FCAmount').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')

    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table><tr><td>Amount in words ' + $('#Currency option:selected').text() + ':' + AmountinWords + ' Only' + '</td></tr></table>')
    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')


    myWindow.print();
}


function PrintthisPurchaseenquiryCopy(Rowlen)
{
    
    var AmountinWords = convertNumberToWords($('#GrandTotal').val())
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td><td align=right><h2>Purchase Enquiry</h2></td></tr> <tr><td></td><td align=right><h3># ' + $('#Enquiryno').val() + '</h3></td></tr>      ');
    myWindow.document.write('<table width=100%><tr><td width=50%> To</td><td></td></tr>  <tr><td>' + $('#suppliername').val() + '</td><td align=right>Enquiry Date : ' + $('#enquirydate').val() + '</td></tr></table>')
    myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;" width=100%>');
    myWindow.document.write('<tr style="border:1px solid black;" width=100%><td width=3% align=center>#</td><td>Code</td><td>Description</td><td>Unit</td><td>Qty</td><td align=right>Rate</td><td align=right>Tax</td><td align=right>Amount</td></tr><tr><td colspan=8></td></tr>');
    var slno = 1;
    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        
        if ($('#product_' + Id).val() != undefined) {
            myWindow.document.write('<tr><td width=4% align=center>' + slno + '</td><td>' + $('#product_' + Id).val() + '</td><td>' + $('#productdesc_' + Id).val() + '</td><td>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + $('#txtrate_' + Id).val() + '</td>   <td align=right>' + $('#txttax_' + Id).val() + '</td>           <td align=right>' + $('#amount_' + Id).val() + '</td></tr>');
            slno++;
        }

    }
    
    myWindow.document.write('<tr><td colspan=8></td></tr></table>');
    myWindow.document.write('<table width=100%><tr><td colspan=7>Total  :  ' + AmountinWords + ' Only' + '</td><td align=right><b>' + $('#GrandTotal').val() + '</b></td></tr></table>');


    myWindow.document.write('<table width=100%><tr><td colspan=8></td></tr</table>');


    myWindow.document.write('<table width=100%><tr><td colspan=8 height=100px></td></tr><tr><td colspan=4 >Prepared By</td> <td colspan=4 align=right>Approved By</td></tr><tr><td colspan=8><hr></td></tr></table>');
    myWindow.document.write('<table width=100%><tr><td colspan=8>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td colspan=8>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.Email + '</td></tr><tr><td colspan=8>' + window.CompanySettingsArray.TRNNo + '</td></tr></table>');
    myWindow.print();
    
}






//-----------------------------------------------------------------VOUCHER ENTRY PRINT FOR SAVE------------------------------------------------------------------------------------------------------------------------



function PrintthisVoucherEntrysave(Rowlen) {

    ////var ReferenceNo = '';
    //var InvoDate = '';
    //var amount = 0;
    //var type = $('#VoucherType').find("option:selected").html();                                  //heading and voucher no heading split
    //var vouchertype = {}, Currenttype = '', Curtype = '';

    //if ($('#VoucherType').val() != 0) {
    //    vouchertype = type.split('-');
    //    Currenttype = vouchertype[1];
    //    Curtype = vouchertype[0];

    //}
    //var AmountinWords = convertNumberToWords($('#Credittxt').val())
    //var myWindow = window.open("", "", "width=1500,height=1500");
    //myWindow.document.write('<table width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
    //myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
    //myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
    //myWindow.document.write('<tr><td align=right></td></tr></table>')
    //myWindow.document.write('<table  width=100%><tr><td><h4 align=center><u>' + Currenttype  + '</u></h4></td></tr></table>');
    
    //myWindow.document.write('<table width=100%<tr><td>RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM:</td><td align=right> '+ Curtype  +'NO : ' + $('#VoucherNo').val() + '</td></tr></table>')

    //myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountId1').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')
    //for (var i = 1; i < Rowlen; i++) {
    //    //ReferenceNo += $('#ReferenceNo' + i).val()+',';
    //    InvoDate += $('#InvoDate' + i).text();
        
    //        amount = parseFloat(amount + $('#Credittxt' + i).val() || 0).toFixed(Decimal);
    //}
    //myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center> Description:' + $('#VoucherEntryDescription1').val() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
    //    myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
    //    myWindow.document.write('<tr><td style="border-left:1px solid black">ReferenceNo: ' + $('#ReferenceNo1').val() + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#Credittxt').val() || 0).toFixed(Decimal) + '</td></tr>');
    //    myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#Credittxt').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')


    //    myWindow.document.write('<br><br><br><br>')
    //    myWindow.document.write('<table><tr><td>Amount in words ' + $('#Currency option:selected').text() + ':' + AmountinWords + ' Only' + '</td></tr></table>')
    //    myWindow.document.write('<br><br><br><br>')
    //    myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')
    //    myWindow.print();





    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + $('#VoucherType option:selected').html() + '</b></td></tr>');
    myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + $('#VoucherNoPrint').val() + '</b></td></tr>');

    myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center class=brtd><b>Sl#</b></td><td align=center class=brtd><b>Date</b></td><td align=left class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Debit</b></td></tr>');

    for (var i = 0; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#AccountId' + Id).length) {
            var DR = '0.00';
            var CR = '0.00';
            if ($('#VType' + Id).val() == 'Debit')
                DR = $('#Amount' + Id).val();
            else if ($('#VType' + Id).val() == 'Credit')
                CR = $('#Amount' + Id).val();
            myWindow.document.write('<tr><td align=center class=brtd>' + Id + '</td><td align=center class=brtd>' + $('#InvoDate' + Id).val() + '</td><td  align=left class=brtd style="padding-left:5px">' + $('#AccountId' + Id).val() + '</td><td  align=left class=brtd style="padding-left:5px">' + $('#VoucherEntryDescription' + Id).val() + '</td><td align=left class=brtd style="padding-left:5px">' + $('#TaxNo' + Id).val() + '</td><td align=right class=brtd style="padding-right:5px">' + CR + '</td><td align=right class=brtd style="padding-right:5px">' + DR + '</td></tr>');
        }

    }
    myWindow.document.write('</table>');

    myWindow.document.write('<br><br><br><br>')
    myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')

    myWindow.print();
}





//-------------------------------------------------------------VOUCHER ENTRY PRINT FOR COPY------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    function PrintthisVoucherEntryCopy(Rowlen) {

        ////var ReferenceNo = '';
        //var InvoDate = '';
        //var amount = 0;
        //var type = $('#VoucherType').find("option:selected").html();          //heading and voucher no heading split
        //var vouchertype = {}, Currenttype = '', Curtype = '';

        //if ($('#VoucherType').val() != 0) {             
        //    vouchertype = type.split('-');
        //    Currenttype = vouchertype[1];
        //    Curtype = vouchertype[0];

        //}
        //var AmountinWords = convertNumberToWords($('#Credittxt').val())
        //var myWindow = window.open("", "", "width=1500,height=1500");
        //myWindow.document.write('<table width=100%><tr><td rowsspan=2>'+ (ComapnydivToPrint.outerHTML) +'</td><td align=left>' + window.CompanySettingsArray.CompanyName + '</td></table>')
        //myWindow.document.write('<table width=100%><tr><td align=right>PhNo:' + window.CompanySettingsArray.PhoneNo + '</td></tr>')
        //myWindow.document.write('<tr><td align=right>Fax :' + window.CompanySettingsArray.Fax + '</td></tr> <tr>')
        //myWindow.document.write('<tr><td align=right></td></tr></table>')
        //myWindow.document.write('<table  width=100%><tr><td><h4 align=center><u>' + Currenttype + '</u></h4></td></tr></table>');
      
        //myWindow.document.write('<table width=100%<tr><td>RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM:</td><td align=right> ' + Curtype + 'NO : ' + $('#VoucherNo').val() + '</td></tr></table>')

        //myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountId1').val() + '</td><td align=right >Date:' + $('#VoucherDate').val() + '</td></tr></table>')
        //for (var i = 1; i < Rowlen; i++) {
        //    //ReferenceNo += $('#ReferenceNo' + i).val()+',';
        //    InvoDate += $('#InvoDate' + i).text();

        //    amount = parseFloat(amount + $('#Credittxt' + i).val() || 0).toFixed(Decimal);
        //}
        //myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr><td style="border:1px solid black;" rowspan=2 colspan=2 align=center> Description:' + $('#VoucherEntryDescription1').val() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        //myWindow.document.write('<tr><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        //myWindow.document.write('<tr><td style="border-left:1px solid black">ReferenceNo: ' + $('#ReferenceNo1').val() + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + parseFloat($('#Credittxt').val() || 0).toFixed(Decimal) + '</td></tr>');
        //myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + parseFloat($('#Credittxt').val() || 0).toFixed(Decimal) + '</td></tr></tfoot></table>')


        //myWindow.document.write('<br><br><br><br>')
        //myWindow.document.write('<table><tr><td>Amount in words ' + $('#Currency option:selected').text() + ':' + AmountinWords + ' Only' + '</td></tr></table>')
        //myWindow.document.write('<br><br><br><br>')
        //myWindow.document.write('<table width=100%><tr><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')
        //myWindow.print();








   
        var myWindow = window.open("", "", "width=1500,height=1500");
        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}
        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6>Fax:' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + $('#VoucherType option:selected').html() + '</b></td></tr>');
        myWindow.document.write('<tr align=center><td colspan=6><b>Voucher Number: ' + $('#VoucherNoPrint').val() + '</b></td></tr>');

        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center class=brtd><b>Sl#</b></td><td align=center class=brtd><b>Date</b></td><td align=left class=brtd style="padding-left:5px"><b>Account</b></td><td align=left class=brtd style="padding-left:5px"><b>Voucher Description</b></td><td align=left class=brtd style="padding-left:5px"><b>Tax#</b></td><td align=right class=brtd style="padding-right:5px"><b>Credit</b></td><td align=right class=brtd style="padding-right:5px"><b>Debit</b></td></tr>');

        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#AccountId' + Id).length) {
                var DR = '0.00';
                var CR = '0.00';
                if ($('#VType' + Id).val() == 'Debit')
                    DR = $('#Amount' + Id).val();
                else if ($('#VType' + Id).val() == 'Credit')
                    CR = $('#Amount' + Id).val();
                myWindow.document.write('<tr><td align=center class=brtd>' + Id + '</td><td align=center class=brtd>' + $('#InvoDate' + Id).val() + '</td><td  align=left class=brtd style="padding-left:5px">' + $('#AccountId' + Id).val() + '</td><td  align=left class=brtd style="padding-left:5px">' + $('#VoucherEntryDescription' + Id).val() + '</td><td align=left class=brtd style="padding-left:5px">' + $('#TaxNo' + Id).val() + '</td><td align=right class=brtd style="padding-right:5px">' + CR + '</td><td align=right class=brtd style="padding-right:5px">' + DR + '</td></tr>');
            }

        }
        myWindow.document.write('</table>');


        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100% style="font-size:85%"><tr style="text-align:center"><td style="text-decoration:overline;width:25%"  >Prepared by</td><td style="text-decoration:overline;width:25%">Accountant</td><td style="text-decoration:overline;width:25%">Approved By</td><td style="text-decoration:overline;width:25%">Received By</td></table>')

        myWindow.print();


    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------->>>>>>> .r3899
    ////New Print Function for Sales Invoice New
    function PrintthisBillSalesSPAREPARTSNEW(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val())
        var myWindow = window.open("", "", "width=1500,height=1500");

     

        var SalesNo = '';
        if (Flag == 1)      //Copy
        { SalesNo = $('#txtBillSlNocopy').val(); }
        else
        { SalesNo = $('#savedbillno').val(); } 

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES INVOICE</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SalesNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');
                                                                             
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100% frame="box"><tr>');
    myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
    myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td class=blclr>Phone : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr></table>');
    myWindow.document.write('</td></tr></table></td></tr></table>');
   
        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty.</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                myWindow.document.write('<tr class=brtd2><td>' + Id + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right>' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                if (Rowcount % 44 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid black"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 44 - Rowcount; a++) {
            myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr><td colspan=8 align=center></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }



    ////New Print Function for Sales Return New
    function PrintthisBillSalesReturnDefault(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val())
        var myWindow = window.open("", "", "width=1500,height=1500");

        var SRNo = '';
        if (Flag == 1)      //Copy
        { SRNo = $('#txtBillSlNocopy').val(); }
        else
        { SRNo = $('#txtBillSlNoSave').val(); } 

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        if ($('#select_transfer').val() != '') {
            Rowcount += 1;
            myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
            myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
            myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES RETURN</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
            myWindow.document.write('</td></tr></table></td>');
            myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
            myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SRNo + ' </b></td></tr><tr class=rowbd><td class=rowbd><b>SI#</td><td style="" class=rowbd>' + $('#select_transfer').val() + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
            myWindow.document.write('</td></tr></table></td></tr></table>');
        }
        else
        {
            myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
            myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
            myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES RETURN</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
            myWindow.document.write('</td></tr></table></td>');
            myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
            myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SRNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
            myWindow.document.write('</td></tr></table></td></tr></table>');
        }
        myWindow.document.write('<table width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td height=30px class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td height=30px class=blclr>Phone : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty.</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                myWindow.document.write('<tr class=brtd2><td>' + Id + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right>' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                if (Rowcount % 44 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid black"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 44 - Rowcount; a++) {
            myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }


    ////New Print Function for Sales Return New
    function PrintthisBillSalesReturnDefaultLetter(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val())
        var myWindow = window.open("", "", "width=1500,height=1500");

        var SRNo = '';
        if (Flag == 1)      //Copy
        { SRNo = $('#txtBillSlNocopy').val(); }
        else
        { SRNo = $('#txtBillSlNoSave').val(); }

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        if ($('#select_transfer').val() != '') {
            Rowcount += 1;
            myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
            myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
            myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES RETURN</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
            myWindow.document.write('</td></tr></table></td>');
            myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
            myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SRNo + ' </b></td></tr><tr class=rowbd><td class=rowbd><b>SI#</td><td style="" class=rowbd>' + $('#select_transfer').val() + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
            myWindow.document.write('</td></tr></table></td></tr></table>');
        }
        else {
            myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
            myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
            myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES RETURN</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=50%> </td></tr></table>');
            myWindow.document.write('</td></tr></table></td>');
            myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
            myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SRNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
            myWindow.document.write('</td></tr></table></td></tr></table>');
        }
        myWindow.document.write('<table width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td height=30px class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td height=30px class=blclr>Phone : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty.</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                myWindow.document.write('<tr class=brtd2><td>' + Id + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right>' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                if (Rowcount % 45 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid black"><td height=120px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 40 - Rowcount; a++) {
            myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
        myWindow.close()
    }


    ////New Print Function for Voucher Entry/Voucher Entry Modify
    function PrintthisVoucherEntryDefault(Rowlen, Flag) {
        var myWindow = window.open("", "", "width=1500,height=1500");

        var VNo = '';
        if (Flag == 0)      //Copy
        { VNo = $('#TransferVoucherNoCopy').val(); }
        else
        { VNo = $('#TransferVoucherNo').val(); }

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style>');
        myWindow.document.write(PrintBG);

        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');
        myWindow.document.write('</table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + $('#VoucherType option:selected').html() + '</td></tr><tr><td class=blclr>Voucher# : ' + $('#VoucherNoPrint').val() + '</td></tr><tr><td class=blclr>Date : ' + $('#VoucherDate').val() + '</td></tr><tr><td class=blclr style="opacity:0">Email : </td></tr><tr><td class=blclr style="opacity:0">Website : </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');

        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr class=violetbg><td>SL#</td><td>Date</td><td width=25%>Account</td><td>Voucher Description</td><td align=right>Credit</td><td align=right>Debit</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#AccountId' + Id).length) {
                var DR = '0.00';
                var CR = '0.00';
                if ($('#VType' + Id).val() == 'Debit')
                    DR = parseFloat($('#Amount' + Id).val()).toFixed(Decimal);
                else if ($('#VType' + Id).val() == 'Credit')
                    CR = parseFloat($('#Amount' + Id).val()).toFixed(Decimal);

                myWindow.document.write('<tr class=brtd2><td>' + Id + '</td><td>' + $('#InvoDate' + Id).val() + '</td><td width=25%>' + $('#AccountId' + Id).val() + '</td><td>' + $('#VoucherEntryDescription' + Id).val() + '</td><td align=right>' + addCommas(CR) + '</td><td align=right>' + addCommas(DR) + '</td></tr>');

            }
        }

        myWindow.document.write('</table>');

        myWindow.document.write('<br><br><br><br>')
        myWindow.document.write('<table width=100%><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')


        myWindow.print();
    }


    ////New Print Function for RV
    function PrintthisReceiptVoucherDefault(Rowlen,flg) {
        var Rowcount = 14;
        var InvNo = '';
        var InvoDate = '';
        var Rcamount = 0, RcamountAAA = 0;
        var AmountinWords = convertNumberToWords($('#FCAmount').val())

        var RVNo = '';
        if (flg == 0) {
            RVNo = $('#VoucherNoMain').val();
        }
        else if (flg == 1) {
            RVNo = $('#VoucherNo').val();
        }



        var myWindow = window.open("", "", "width=1500,height=1500");

      
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG);

        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');
        myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" class=txbld>RECEIPT VOUCHER</td></tr></table>');
        myWindow.document.write('</table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + $('#AccountName').val() + '</td></tr><tr><td class=blclr>Voucher# : ' + RVNo + '</td></tr><tr><td class=blclr>Date : ' + $('#VoucherDate').val() + '</td></tr><tr><td class=blclr  style="opacity:0">DEMO</td></tr><tr><td class=blclr style="opacity:0">Website : </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');

        //myWindow.document.write('<table width=100%<tr><td>RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM:</td><td align=right></td></tr></table>')

        //myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right ></td></tr></table>')

        for (var i = 1; i < Rowlen; i++) {
            if ($('#SlNoCheck' + i).prop("checked")) {



                if ($('#InvoNo' + i).text()) {
                    if (InvNo == '') {
                        InvNo = InvNo + $('#InvoNo' + i).text();
                    }
                    else
                        InvNo = InvNo + ',' + $('#InvoNo' + i).text();

                }

                InvoDate += $('#InvoDate' + i).text();
                Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
                RcamountAAA = Rcamount.toLocaleString('en');


            }
        }
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr class=violetbg><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>' + $('#VEDescription' + Rowlen).text() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr class=violetbg><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + addCommas(parseFloat($('#FCAmount').val() || 0).toFixed(Decimal)) + '</td></tr>');

        if (($('#ChequeNo').val() != 0)) {
            myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
        }

        myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + addCommas(parseFloat($('#FCAmount').val() || 0).toFixed(Decimal)) + '</td></tr></tfoot></table>')

        myWindow.document.write('</table>');

        myWindow.document.write('<br><br>')
        myWindow.document.write('<table><tr><td>Amount in words (AED) :' + AmountinWords + ' Only' + '</td></tr></table>')
        myWindow.document.write('<br><br><br><br>')

        myWindow.document.write('<table width=100%><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')

        myWindow.print();
    }
    

    ////New Print Function for PV
    function PrintthisPaymentVoucherDefault(Rowlen,flg) {
        var Rowcount = 14;
        var InvNo = '';
        var InvoDate = '';
        var Rcamount = 0, RcamountAAA = 0;
        var AmountinWords = convertNumberToWords($('#FCAmount').val())


        var PVNo = '';
        if (flg == 0) {
            PVNo = $('#VoucherNoMain').val();
        }
        else if (flg == 1) {
            PVNo = $('#VoucherNo').val();
        }


        var myWindow = window.open("", "", "width=1500,height=1500");


        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG);

        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');
        myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" class=txbld>PAYMENT VOUCHER</td></tr></table>');
        myWindow.document.write('</table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + $('#AccountName').val() + '</td></tr><tr><td class=blclr>Voucher# : ' + PVNo + '</td></tr><tr><td class=blclr>Date : ' + $('#VoucherDate').val() + '</td></tr><tr><td class=blclr style="opacity:0">Email : </td></tr><tr><td class=blclr style="opacity:0">Website : </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=20px width=100%><tr><td colspan=12></td></tr> </table>');


        //myWindow.document.write('<table width=100%<tr><td>PAY TO :</td><td align=right></td></tr></table>')

        //myWindow.document.write('<table width=100%<tr><td>M/S:&nbsp;&nbsp;&nbsp;' + $('#AccountName').val() + '</td><td align=right ></td></tr></table>')

        for (var i = 1; i < Rowlen; i++) {
            if ($('#SlNoCheck' + i).prop("checked")) {



                if ($('#InvoNo' + i).text()) {
                    if (InvNo == '') {
                        InvNo = InvNo + $('#InvoNo' + i).text();
                    }
                    else
                        InvNo = InvNo + ',' + $('#InvoNo' + i).text();

                }

                InvoDate += $('#InvoDate' + i).text();
                Rcamount = parseFloat(Rcamount + $('#FCRecAmount' + i).val() || 0).toFixed(Decimal);
                RcamountAAA = Rcamount.toLocaleString('en');


            }
        }
        myWindow.document.write('<table style="border-collapse: collapse;border-color:1px solid black" width="100%"><tr class=violetbg><td style="border:1px solid black;" rowspan=2 colspan=2 align=center>' + $('#VEDescription' + Rowlen).text() + '</td><td style="border:1px solid black" align=center>Amount</td></tr>');
        myWindow.document.write('<tr class=violetbg><td align=center style="border:1px solid black" >' + $('#Currency option:selected').text() + '</td></tr>');
        myWindow.document.write('<tr><td style="border-left:1px solid black">Invoice No.: ' + InvNo + '</td><td style="border-right:1px solid black" align:right</td><td align=right style="border-right:1px solid black">' + addCommas(parseFloat($('#FCAmount').val() || 0).toFixed(Decimal)) + '</td></tr>');

        if (($('#ChequeNo').val() != 0)) {
            myWindow.document.write('<tr><td style="border-left:1px solid black">Cheque No.: ' + $('#ChequeNo').val() + '</td><td style="border-right:1px solid black">Dated: ' + $('#ChequeDate').val() + '</td><td style="border-right:1px solid black" align=right></td></tr>');
        }

        myWindow.document.write('<tfoot><tr  style="border:1px solid black;"><td align="right" colspan=2 style="border-right:1px solid black;">Total</td><td style="border-right:1px solid black" align=right>' + addCommas(parseFloat($('#FCAmount').val() || 0).toFixed(Decimal)) + '</td></tr></tfoot></table>')

        myWindow.document.write('</table>');

        myWindow.document.write('<br><br>')
        myWindow.document.write('<table><tr><td>Amount in words (AED) :' + AmountinWords + ' Only' + '</td></tr></table>')
        myWindow.document.write('<br><br><br><br>')

        myWindow.document.write('<table width=100%><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Prepared by</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Accountant</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline">Approved By</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td style="text-decoration:overline; align=right">Received By</td></table>')

        myWindow.print();
    }


    //NEW PRINT FUCTION FOR CONTRACT
    function PrintthisContractRENT(Rowlen, flag) {

        var myWindow = window.open("", "", "width=1500,height=1500");
        var AmountinWords = convertNumberToWords($('#TotalChqAmt').text())
        var TotQty = 0;
        var total = 0;
        var CNo = '';
        var Rowcount = 0;

        if (flag == 0)
            CNo = $('#ContractNo').val();
        else if (flag == 1)
            CNo = $('#ContractNoCopy').val();

        myWindow.document.write('<table width=100%><tr>' +
            '<td>' + (ComapnydivToPrint.outerHTML) + '</td>' +
            '<td style="font-size:120%;"><b>RENT RECEIPT</b></td>' +
            '</tr>');

        myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=20px colspan=11></td></tr>');

        myWindow.document.write('<table width=100% ><tr>' +
            '<td  width=30%><table width=100% frame="box"><tr>' +
            '<td style="border:none;"><table  style="font-size:85%;"><tr align=center><td colspan=3 height=50px>' +
            '<table width=100%; style=text-align:left height=50px><tr align=center><td align=center><b>CONTRACT PERIOD</b></td></tr><tr><td align=left>FROM : ' + $('#FromPeriod').val() + '</td></tr><tr><td align=left>TO :     ' + $('#ToPeriod').val() + '</td></tr></table>' +
            '</td></tr></table></td>' +
            '</tr></table></td>' +

            '<td width=45%></td>' +

            '<td  width=25%><table width=100%  align=right><tr>' +
            '<td style="border:none;"><table  style="font-size:85%;"><tr align=right><td colspan=3 height=50px>' +
            '<table width=100%; style=text-align:left height=50px><tr><td  align=right>DATE : ' + $('#ContDate').val() + '</td></tr><tr><td  align=right>CONTRACT No. : <b>' + $('#ContractNoCopy').val() + '</b></td></tr></table>' +
            '</td></tr></table></td>' +
            '</tr></table></td>' +
            '</tr></table>');

        myWindow.document.write('<table width=100%> <tr><td align=center></td></tr><tr><td align=center></td></tr>');
        myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;"width=100%>');




        myWindow.document.write('<tr style="border-top:1px solid black;font-size:100%">' +
            '<td colspan=5 style="border-right:1px solid white;padding:5px">RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM : </td>' +
            '<td style="border-right:1px solid white;" align=right></td>' +
            '<td align=right style=""></td></tr>' +

            '<tr style="font-size:100%;height=10%">' +
            '<td colspan=3 style="border-right:1px solid white;padding:5px">&#160;&#160;&#160;&#160;MR/MS : <b>' + $('#Tenant').val() + '</b></td>' +
            '<td colspan=3 style="border-right:1px solid white;" align=center>PO BOX : ' + $('#TenantPOBOXNo').val() + '</td>' +
            '<td colspan=3 style="">EMIR : ' + $('#TenantEMRID').val() + '</td></tr>' +
            '<tr></tr>' +

             '<tr style="font-size:100%;">' +
            '<td colspan=3 style="border-right:1px solid white;padding:5px">&#160;&#160;&#160;&#160;MOBILE : </td>' +
            '<td colspan=3 style="border-right:1px solid white;" align=center>TEL No. : ' + $('#TenantPhone').val() + '</td>' +
            '<td colspan=3 style="">FAX : </td></tr>');
        myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px" align=center>Sl#</td><td style="padding-left:5px" align=center>AMOUNT</td><td style="padding-left:5px" align=center>CHEQUE NO/CASH</td><td style="padding-left:5px" align=center>DATE</td><td align=center>BANK</td><td align=center style="padding-right:5px">BRANCH</td><td align=center style="padding-right:5px">PARTICULARS</td></tr>');
        var slno = 1;
        for (var i = 0; i < Rowlen; i++) {
            var Id = parseInt(i + 1);

            if ($('#TblContract tr').length) {
                if ($('#RentType' + Id + ' option:selected').html() == ' Rent') {
                    Rowcount += 1;
                    TotQty++;
                    myWindow.document.write('<tr><td style="padding-left:5px">' + slno + '</td><td style="padding-left:5px" align=right>' + addCommas($('#Amount' + Id).val()) + '</td><td style="padding-left:5px" align=center>' + $('#ChequeNo' + Id).val() + '</td><td style="padding-left:5px" align=center>' + $('#ChequeDate' + Id).val() + '</td><td align=center>' + $('#ContBank' + Id + ' option:selected').html() + '</td><td align=center style="padding-right:5px">' + $('#ContBranch' + Id).val() + '</td><td align=center style="padding-right:5px">' + $('#RentType' + Id + ' option:selected').html() + '</td></tr>');
                    total += parseFloat($('#Amount' + Id).val() || 0);
                    slno++;
                }
            }
        }

        for (var a = 1; a <= 15 - Rowcount; a++) {
            myWindow.document.write('<tr style="opacity:0"><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td align=center>1</td><td align=right style="padding-right:5px">1</td><td align=right style="padding-right:5px">1</td></tr>');
        }


        var TotalinWords = convertNumberToWords(total);

        myWindow.document.write('<tr style="border-top:1px solid black;font-size:100%">' +
            '<td colspan=5 style="border-right:1px solid white;padding:5px">TOTAL AMOUNT : AED ' + TotalinWords + ' ONLY</td>' +
            '<td style="border-right:1px solid white;" align=right></td>' +
            '<td align=right style=""></td></tr>' +

            '<tr style="font-size:100%;height=10%">' +
            '<td colspan=3 style="border-right:1px solid white;padding:10px">DHS : <b><span style="border:1px solid gray;padding:5px;">&#160;&#160;&#160;&#160;&#160;&#160;' + addCommas((total).toFixed(Decimal)) + '</span></b></td>' +
            '<td colspan=3 style="border-right:1px solid white;" align=center></td>' +
            '<td colspan=3 style=""></td></tr>');

        myWindow.document.write('<table width=100%><tr></tr><tr></tr><tr></tr><tr></tr>');
        myWindow.document.write('<table width=100%><tr><td colspan=6 align=left style="padding:5px">I/WE&#160;&#160;&#160;&#160;' + $('#Tenant').val() + ' </td><td colspan=6 align=right>Cheque Collected by :....................... </td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">OF&#160;&#160;&#160;&#160;</td><td colspan=6 align=center>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Signature  </td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">Hereby agree upon as under : &#160;&#160;&#160;&#160;</td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">RENT PER YEAR DHS : ' + addCommas((total).toFixed(Decimal)) + '</td><td colspan=6 align=right>To be Paid by : ' + TotQty + '</td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">FOR FLAT NO : ' + $('#FlatNo').val() + '</td><td colspan=6 align=right>LOCATED IN  : ' + $('#Premise').val() + '</td></tr>');


        myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=40px colspan=11></td></tr>');

        myWindow.document.write('<table width=100% ><tr style="text-align:center"><td style="text-decoration:overline;width:25%">ACCOUNTANT</td><td style="text-decoration:overline;width:25%"></td><td style="text-decoration:overline;width:25%"></td><td style="text-decoration:overline;width:25%">TENANT</td></table>')

        myWindow.print();
    }

    //NEW PRINT FUCTION FOR CONTRACT
    function PrintthisContractSD(Rowlen, flag) {

        var myWindow = window.open("", "", "width=1500,height=1500");
        var AmountinWords = convertNumberToWords($('#TotalChqAmt').text())
        var TotQty = 0;
        var total = 0;
        var CNo = '';
        var Rowcount = 0;

        if (flag == 0)
            CNo = $('#ContractNo').val();
        else if (flag == 1)
            CNo = $('#ContractNoCopy').val();

        myWindow.document.write('<table width=100%><tr>' +
            '<td>' + (ComapnydivToPrint.outerHTML) + '</td>' +
            '<td style="font-size:120%;"><b>SECURITY DEPOSIT RECEIPT</b></td></tr>');

        myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=10px colspan=11></td></tr>');


        myWindow.document.write('<table width=100% ><tr>' +
                   '<td  width=30%></td>' +

                   '<td width=45%></td>' +

                   '<td  width=25%><table width=100%  align=right><tr>' +
                   '<td style="border:none;"><table  style="font-size:85%;"><tr align=right><td colspan=3 height=50px>' +
                   '<table width=100%; style=text-align:left height=50px><tr><td  align=right>DATE : ' + $('#ContDate').val() + '</td></tr></table>' +
                   '</td></tr></table></td>' +
                   '</tr></table></td>' +
                   '</tr></table>');



        myWindow.document.write('<table width=100%> <tr><td align=center></td></tr><tr><td align=center></td></tr>');
        myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;"width=100%>');




        myWindow.document.write('<tr style="border-top:1px solid black;font-size:100%">' +
            '<td colspan=5 style="border-right:1px solid white;padding:5px;font-size:90%;">RECEIVED WITH THANKS THE FOLLOWING AMOUNT FROM : </td>' +
            '<td style="border-right:1px solid white;" align=right></td>' +
            '<td align=right style=""></td></tr>' +

            '<tr style="font-size:100%;height=10%">' +
            '<td colspan=3 style="border-right:1px solid white;padding:5px">&#160;&#160;&#160;&#160;MR/MS : <b>' + $('#Tenant').val() + '</b></td>' +
            '<td colspan=3 style="border-right:1px solid white;" align=center>PO BOX : ' + $('#TenantPOBOXNo').val() + '</td>' +
            '<td colspan=3 style="">EMIR : ' + $('#TenantEMRID').val() + '</td></tr>' +
            '<tr></tr>' +

             '<tr style="font-size:100%;">' +
            '<td colspan=3 style="border-right:1px solid white;padding:5px">&#160;&#160;&#160;&#160;MOBILE : </td>' +
            '<td colspan=3 style="border-right:1px solid white;" align=center>TEL No. : ' + $('#TenantPhone').val() + '</td>' +
            '<td colspan=3 style="">FAX : </td></tr>');

        myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px" align=center>Sl#</td><td style="padding-left:5px" align=center>AMOUNT</td><td style="padding-left:5px" align=center>CHEQUE NO/CASH</td><td style="padding-left:5px" align=center>DATE</td><td align=center>BANK</td><td align=center style="padding-right:5px">BRANCH</td><td align=center style="padding-right:5px">PARTICULARS</td></tr>');
        var slno = 1;
        for (var i = 0; i < Rowlen; i++) {
            var Id = parseInt(i + 1);

            if ($('#TblContract tr').length) {
                if ($('#RentType' + Id + ' option:selected').html() == 'SD') {
                    Rowcount += 1;
                    TotQty++;
                    myWindow.document.write('<tr><td style="padding-left:5px" align=center>' + slno + '</td><td style="padding-left:5px" align=right>' + addCommas($('#Amount' + Id).val()) + '</td><td style="padding-left:5px" align=center>' + $('#ChequeNo' + Id).val() + '</td><td style="padding-left:5px" align=center>' + $('#ChequeDate' + Id).val() + '</td><td align=center>' + $('#ContBank' + Id + ' option:selected').html() + '</td><td align=center style="padding-right:5px">' + $('#ContBranch' + Id).val() + '</td><td align=center style="padding-right:5px">' + $('#RentType' + Id + ' option:selected').html() + '</td></tr>');
                    total += parseFloat($('#Amount' + Id).val() || 0);
                    slno++;
                }
            }
        }
        for (var a = 1; a <= 15 - Rowcount; a++) {
            myWindow.document.write('<tr style="opacity:0"><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td align=center>1</td><td align=right style="padding-right:5px">1</td><td align=right style="padding-right:5px">1</td></tr>');

        }


        var TotalinWords = convertNumberToWords(total);
        myWindow.document.write('<tr style="border-top:1px solid black;font-size:100%">' +
                  '<td colspan=5 style="border-right:1px solid white;padding:5px">TOTAL AMOUNT : AED ' + TotalinWords + ' ONLY</td>' +
                  '<td style="border-right:1px solid white;" align=right></td>' +
                  '<td align=right style=""></td></tr>' +

                  '<tr style="font-size:100%;height=10%">' +
                  '<td colspan=3 style="border-right:1px solid white;padding:10px">DHS : <b><span style="border:1px solid gray;padding:5px;">&#160;&#160;&#160;&#160;&#160;&#160;' + addCommas((total).toFixed(Decimal)) + '</span></b></td>' +
                  '<td colspan=3 style="border-right:1px solid white;" align=center></td>' +
                  '<td colspan=3 style=""></td></tr>');

        myWindow.document.write('<table width=100%><tr></tr><tr></tr><tr></tr><tr></tr>');
        myWindow.document.write('<table width=100%><tr><td colspan=6 align=left>I/WE&#160;&#160;&#160;&#160;' + $('#Tenant').val() + ' </td><td colspan=6 align=right>Cheque Collected by :....................... </td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">OF&#160;&#160;&#160;&#160;</td><td colspan=6 align=center>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;Signature  </td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">Hereby agree upon as under : &#160;&#160;&#160;&#160;</td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">RENT PER YEAR DHS : ' + addCommas((total).toFixed(Decimal)) + '</td><td colspan=6 align=right>To be Paid by :' + TotQty + '</td></tr>' +
            '<tr><td colspan=6 align=left style="padding:5px">FOR FLAT NO :' + $('#FlatNo').val() + '</td><td colspan=6 align=right>LOCATED IN  :' + $('#Premise').val() + '</td></tr>');



        myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=40px colspan=11></td></tr>');

        myWindow.document.write('<table width=100% ><tr style="text-align:center"><td style="text-decoration:overline;width:25%">ACCOUNTANT</td><td style="text-decoration:overline;width:25%"></td><td style="text-decoration:overline;width:25%"></td><td style="text-decoration:overline;width:25%">TENANT</td></table>')


        myWindow.print();
    }

    //New Print Function for BOQ
    function PrintthisBOQ(Rowlen) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#FCGT').text());
        var myWindow = window.open("", "", "width=1500,height=1500");
       
        var Eng = '';
        if ($('#UserName').val()!=0)
        {
            Eng = $('#UserName option:selected').html();
        }
        else
        {
            Eng = '';
        }

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        
        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
        myWindow.document.write('<td><table style="font-size:85%;" width=100%><tr align=center><td>');
        myWindow.document.write('<table width=100%; style="text-align:center;"><tr style=text-align:center><td style="" class=txbld>PROJECT ESTIMATION - BOQ</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>BOQ# :' + $('#BOQNo').val() + '</td></tr><tr><td class=blclr>Date : ' + $('#BOQDate').val() + '</td></tr><tr><td class=blclr>Ref. : ' + $('#LPO').val() + '</td></tr><tr><td class=blclr>Prepared By :' + Eng + ' </td></tr><tr><td class=blclr>Job Code :' + $('#JobCode').val() + ' </td></tr><tr><td class=blclr>Job Description :' + $('#Description').val() + ' </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td align=center>Sl#</td><td align=center>Code</td><td colspan=2 align=center>Description</td><td align=center>Unit</td><td align=center>Qty</td><td align=center>Rate</td><td align=center>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#Product_' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 43 == 0) {           //Border bottom gery for last table row in the page 
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + $('#col' + Id).text() + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#Description_' + Id).val() + '</td><td>' + $('#Unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#Rate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#TotalAmount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#TotalAmount_' + Id).val() || 0);
                    TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + $('#col' + Id).text() + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#Description_' + Id).val() + '</td><td>' + $('#Unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#Rate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#TotalAmount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#TotalAmount_' + Id).val() || 0);
                   TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                if (Rowcount % 43 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 43 - Rowcount; a++) {
            myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right></td><td style="font-family:tahoma; font-size: 10px;" align=right ></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:50%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#FCGT').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }

    
    function PrintthisMaterialIssue(Rowlen) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#FCGT').text());
        var myWindow = window.open("", "", "width=1500,height=1500");

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        myWindow.document.write('<table width=100% ><tr>');
        myWindow.document.write('<td><table style="font-size:85%;" width=100%><tr align=center><td>');
        myWindow.document.write('<table width=100%; style="text-align:center;"><tr style=text-align:left><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td><td style="" class=txbld style=text-align:center>MATERIAL  ISSUE</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>MI# :' + $('#MINo').val() + '</td></tr><tr><td class=blclr>Date : ' + $('#IssueDate').val() + '</td></tr><tr><td class=blclr>Job Code :' + $('#JobCode').val() + ' </td></tr><tr><td style="opacity:0">Demo</td></tr><tr><td style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td align=center>Code</td><td colspan=2 align=center>Description</td><td align=center>Unit</td><td align=center>Qty</td><td align=center>Rate</td><td align=center>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#Product_' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 43 == 0) {           //Border bottom gery for last table row in the page   
                    myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#col' + Id).text() + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#Description_' + Id).val() + '</td><td align=center>' + $('#Unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#Rate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#TotalAmount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#TotalAmount_' + Id).val() || 0);
                    TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page    
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + $('#col' + Id).text() + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#Description_' + Id).val() + '</td><td align=center>' + $('#Unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#Rate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#TotalAmount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#TotalAmount_' + Id).val() || 0);
                    TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                if (Rowcount % 43 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 43 - Rowcount; a++) {
            myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
        }
       // myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty:  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right></td><td style="font-family:tahoma; font-size: 10px;" align=right ></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:66%; font-size: 13px;">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;width:15.5%" align=center ><b>GRAND TOTAL</b></td><td style="font-family:tahoma; font-size: 10px"  align=right ><b>' + addCommas(parseFloat($('#FCGT').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');

        //myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        //myWindow.document.write('<td width=100%>');
        //myWindow.document.write('<table width=100%>');
        //myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty:  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right></td><td style="font-family:tahoma; font-size: 10px;" align=right ></td></tr>');
        //myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:66%; font-size: 13px;">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;width:15.5%" align=center ><b>GRAND TOTAL</b></td><td style="font-family:tahoma; font-size: 10px"  align=right ><b>' + addCommas(parseFloat($('#FCGT').text()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('</table>');
        //myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }


    //New Print Function for TM
    function PrintthisTM(Rowlen) {
        var TotPQty = 0; var Rowcount = 14;
        var myWindow = window.open("", "", "width=1500,height=1500");

      if ($('#typeIssue').prop("checked")) {
          var Caption = 'TOOLS'+''+' ISSUE';
      }
     else {
          var Caption = 'TOOLS' + '' + ' RETURN';
      }

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
        myWindow.document.write('<td><table style="font-size:85%;" width=100%><tr align=center><td>');
        myWindow.document.write('<table width=100%; style="text-align:center;"><tr style=text-align:center><td style="" class=txbld>'+ Caption +'</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr><tr><td style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>TM# :' + $('#VocNo').val() + '</td></tr><tr><td class=blclr>Date : ' + $('#Date').val() + '</td></tr><tr></tr><tr><td class=blclr>Issued By :' + $('#IssuedBy').val() + ' </td></tr><tr><tr><td class=blclr>Custodian :' + $('#CustodianName').val() + ' </td></tr><tr><td class=blclr>Job Code :' + $('#JobCode').val() + ' </td></tr><tr><td class=blclr>Job Description :' + $('#JobcodeDesc').val() + ' </td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td align=center>Sl#</td><td align=center>Code</td><td colspan=2 align=center>Description</td><td align=center>Pcs</td><td align=center>Serial#</td><td align=center>Qty.</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#Product_' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 43 == 0) {           //Border bottom gery for last table row in the page           
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + Id + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc_' + Id).val() + '</td><td align=center>' + $('#Pcs_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#Serial_' + Id).val() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td></tr>');
                    TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page            
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + Id + '</td><td>' + $('#Product_' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc_' + Id).val() + '</td><td align=center>' + $('#Pcs_' + Id + ' option:selected').html()+ '</td><td align=center>' + $('#Serial_' + Id).val() + '</td><td align=center>' + $('#Quantity_' + Id).val() + '</td></tr>');
                    TotPQty += parseInt($('#Quantity_' + Id).val() || 0);
                }
                if (Rowcount % 43 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 43 - Rowcount; a++) {
            //alert(a)
            myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr class=violetbg style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td style="font-family:tahoma; font-size: 10px;" align=center colspan=><b>Total Qty :  ' + TotPQty + '  </b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }
    
    function PrintthisPurchaseOrder(Rowlen) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#gndtotal').text());
        var myWindow = window.open("", "", "width=1500,height=1500");

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F}  .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        myWindow.document.write('<table width=100% ><tr>');
        myWindow.document.write('<td><table style="font-size:85%;" width=100%><tr align=center><td>');
        myWindow.document.write('<table width=100%; style="text-align:center;"><tr style=text-align:left><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td><td style="" class=txbld style=text-align:center>PURCHASE  ORDER</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>PO# :' + $('#CopyOrderno').val() + '</td></tr><tr><td class=blclr>Date : ' + $('#Orderdate').val() + '</td></tr><tr><td class=blclr>Supplier :' + $('#suppliername').val() + ' </td></tr><tr><td style="opacity:0">Demo</td></tr><tr><td style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td align=center>Code</td><td colspan=2 align=center>Description</td><td align=center>Unit</td><td align=center>Qty</td><td align=center>Rate</td><td align=center>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#product_' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 42 == 0) {           //Border bottom gery for last table row in the page   
                    myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td colspan=2>' + $('#productdesc_' + Id).val() + '</td><td align=center>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#amount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#amount_' + Id).val() || 0);
                    TotPQty += parseInt($('#quantity_' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page    
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + Id + '</td><td>' + $('#product_' + Id).val() + '</td><td colspan=2>' + $('#productdesc_' + Id).val() + '</td><td align=center>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#amount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#amount_' + Id).val() || 0);
                    TotPQty += parseInt($('#quantity_' + Id).val() || 0);
                }
                if (Rowcount % 42 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 42 - Rowcount; a++) {
            myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey">&#160;</td><td style="border-left:1px solid grey">&#160;</td></tr>');
        }
        myWindow.document.write('<tr style="border-top:1px solid grey;font-size:110%;height: 30px;"><td align=left colspan=7><b>Total</b></td><td style="border-left:1px solid grey;" align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-weight:bold;font-size:110%;height: 30px;"><td align=left colspan=8>AED ' + AmountinWords + '</td></tr>');
        myWindow.document.write('</table>');


        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right style="font-family:tahoma; font-size: 10px;">Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr>'+
            '<tr style="height:10px"><td colspan=8></td></tr><tr><td colspan=5 style="font-family:tahoma; font-size: 10px;">Printed By ' + $('#User').val() + '</td><td colspan=6 style="font-family:tahoma; font-size: 10px;" align=right>Printed at ' + $('#DepartmentName').val() + ' , Using EUMIERP</td></tr>' +
            '<tr><td colspan=3 style="font-family:tahoma; font-size: 10px;">Printed On ' + $('#dttime').text() + '</td></tr></table>');
        myWindow.print();
    }



    function PrintthisMaterialRequest(Rowlen,flg) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#TotalAmountLabel').text());
        var myWindow = window.open("", "", "width=1500,height=1500");

        var MRNo = '';
        if (flg == 0)
            MRNo = $('#MRNo').val();
        else if (flg == 1)
            MRNo = $('#CopyMRNo').val();

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        myWindow.document.write('<table width=100% ><tr>');
        myWindow.document.write('<td><table style="font-size:85%;" width=100%><tr align=center><td>');
        myWindow.document.write('<table width=100%; style="text-align:center;"><tr style=text-align:left><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td><td style="" class=txbld style=text-align:center>MATERIAL  REQUEST</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td>COMPANY DETAILS</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td>OTHER DETAILS</td></tr><tr><td height=45px style=color:#5c3158>MR# :' + MRNo + '</td></tr><tr><td class=blclr>Date : ' + $('#MRDate').val() + '</td></tr><tr><td class=blclr>Job Code :' + $('#JobCode').val() + ' </td></tr><tr><td style="opacity:0">Demo</td></tr><tr><td style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');


        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td align=center>Code</td><td colspan=2 align=center>Description</td><td align=center>Unit</td><td align=center>Qty</td><td align=center>Rate</td><td align=center>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#product_' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 43 == 0) {           //Border bottom gery for last table row in the page   
                    myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#td_' + Id).text() + '</td><td>' + $('#product_' + Id).val() + '</td><td colspan=2>' + $('#productdesc_' + Id).val() + '</td><td align=center>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#price_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#amount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#amount_' + Id).val() || 0);
                    TotPQty += parseInt($('#quantity_' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page    
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + $('#td_' + Id).text() + '</td><td>' + $('#product_' + Id).val() + '</td><td colspan=2>' + $('#productdesc_' + Id).val() + '</td><td align=center>' + $('#unit_' + Id + ' option:selected').html() + '</td><td align=center>' + $('#quantity_' + Id).val() + '</td><td align=right>' + addCommas($('#price_' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#amount_' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#amount_' + Id).val() || 0);
                    TotPQty += parseInt($('#quantity_' + Id).val() || 0);
                }
                if (Rowcount % 43 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 43 - Rowcount; a++) {
            myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
        }
        //myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma;height:8px; font-size: 10px;"><td style="font-family:tahoma; font-size: 12px;" align=left colspan=8><b>Total Qty:  ' + TotPQty + '  </b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:66%; font-size: 13px;">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;width:15.5%" align=center ><b>GRAND TOTAL</b></td><td style="font-family:tahoma; font-size: 10px"  align=right ><b>' + addCommas(parseFloat($('#TotalAmountLabel').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');


        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }






    function PrintthisSalesGas(Rowlen, flg) {
      
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 16; var MaxCnt = 44;

        var AmountinWords = WordwithDecimal($('#gndtotal').text());
        var myWindow = window.open("", "", "width=1500,height=1500");
        var Trnvalue = '';
        if($('#txtlpono').val()==0){
            Trnvalue = '';
        }
        else {
            Trnvalue = $('#txtlpono').val();
        }
      
        var SNo = '';
        if (flg == 0)
            SNo = $('#savedbillno').val(); 
        else if (flg == 1)
            SNo = $('#txtBillSlNocopy').val();
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2 td{border-right:1px solid grey;} .brtd3 td{border-bottom:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        myWindow.document.write('<table width=100% ><tr rowspan=2  style="text-align:center;"><td  colspan=8 style=color:#008000;font-weight:bold>' + (GasLogo.outerHTML) + '</td></tr><tr>');
        myWindow.document.write('<td  colspan=8></td></tr></table>');
        myWindow.document.write('<table width=100%;"><tr><td style="text-align:center" class=txbld width=50%>TAX INVOICE</td></tr></table>');
        myWindow.document.write('<table width=100%;"><tr><td style="text-align:center">TRN :' +window.CompanySettingsArray.TRNNo + '</td></tr></table>');
        myWindow.document.write('<td  colspan=8></td></tr></table>');
     
        myWindow.document.write('<table width=100% frame="box" style="border:none;"><tr>');
        myWindow.document.write('<td width=80% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6>');
        myWindow.document.write('<table width=100% style=text-align:left><tr><td>BILL TO</td></tr><tr><td >' + $('#txtcustomer').val() + '</td></tr><tr><td >' + $('#txtaddress').val() + '</td></tr><tr><td>TEL :' + $('#PhoneNo').val() + '</td></tr><tr><td >TRN : ' + Trnvalue + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=20% style="border:none;"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6>');
        myWindow.document.write('<table width=100% style=text-align:left height=140px><tr><td>INV# :' + SNo + ' </td></tr><tr><td>DATE :' + $('#txtivdate').val() + '  </td></tr><tr><td ></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
       
       // myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');


        if (($('#delvno1').val() != undefined) && ($('#delvno1').val() != 0)) {
            //alert(($('#delvno1').val() != undefined) && ($('#delvno1').val() != 0))
            myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center>Sl#</td><td align=center width=10%>Date</td><td align=center>DO#</td><td colspan=2 align=center width=30%>Product</td><td align=center>Qty</td><td align=right>Price</td><td align=right>Amount</td></tr>');
            for (var i = 0; i <= Rowlen; i++) {
                var Id = parseInt(i + 1);
                if ($('#txtproduct' + Id).length) {
                    Rowcount += 1;
                    if (Rowcount % MaxCnt == 0) {           //Border bottom gery for last table row in the page   
                        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center>' + $('#td' + Id).text() + '</td><td style="padding-left:5px">' + $('#DelvDate' + Id).val() + '</td><td style="padding-left:5px" align=center>' + $('#DelvLponum' + Id).val() + '</td><td style="padding-left:5px"  colspan=2>' + $('#txtproduct' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#txtfcamnt' + Id).val()) + '</td></tr>');
                        gridtotal += parseFloat($('#txtfcamnt' + Id).val() || 0);
                    }
                    else {                             //Border bottom lightgery for other tbl rows in the page    
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + $('#td' + Id).text() + '</td><td style="padding-left:5px">' + $('#DelvDate' + Id).val() + '</td><td style="padding-left:5px" align=center>' + $('#DelvLponum' + Id).val() + '</td><td style="padding-left:5px"  colspan=2>' + $('#txtproduct' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#txtfcamnt' + Id).val()) + '</td></tr>');
                        gridtotal += parseFloat($('#txtfcamnt' + Id).val() || 0);
                    }
                    if (Rowcount % MaxCnt == 0) {
                        Rowcount = 0;
                        myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=300px colspan=8></td></tr>');
                    }
                }
            }
            if (($('#typecredit').prop("checked")) && ($('#CmpnyBankAcnt').val() != '') && ($('#CmpnyBankAcnt').val() != 1) && ($('#CmpnyBankAcnt').val() != undefined)) {
                for (var a = 1; a <= (parseInt(MaxCnt)) - (parseInt(Rowcount) + 10) ; a++) {
                    myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td  colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
                }
            }
            else {
                for (var a = 1; a <= MaxCnt - Rowcount; a++) {
                    myWindow.document.write('<tr><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td  colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
                }
            }

            myWindow.document.write('<tr style="border-top:1px solid grey;"><td colspan=6 font-size: 13px;"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>Sub Total</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('<tr><td colspan=6 font-size: 13px;"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>VAT 5%</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('<tr class=violetbg><td colspan=6 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + '</td><td style="font-family:tahoma;font-size: 13px;border-left:1px solid grey;" align=center ><b>Total</b></td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('</table>');
        }
        else {
            myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg style="border-bottom:1px solid grey"><td align=center width=7  %>Sl#</td><td align=center>Product</td><td colspan=2 align=center>Description</td><td align=center>Qty</td><td align=right>Price</td><td align=right>Amount</td></tr>');
            for (var i = 0; i <= Rowlen; i++) {
                var Id = parseInt(i + 1);
                if ($('#txtproduct' + Id).length) {
                    Rowcount += 1;
                    if (Rowcount % MaxCnt == 0) {           //Border bottom gery for last table row in the page   
                        myWindow.document.write('<tr class=brtd2 ><td style="border-left:1px solid grey;" align=center width=7%>' + $('#td' + Id).text() + '</td><td align=left style="padding-left:5px">' + $('#txtproduct' + Id).val() + '</td><td align=left  colspan=2 style="padding-left:5px">' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#txtfcamnt' + Id).val()) + '</td></tr>');
                        gridtotal += parseFloat($('#txtfcamnt' + Id).val() || 0);
                    }
                    else {                             //Border bottom lightgery for other tbl rows in the page    
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center width=7%>' + $('#td' + Id).text() + '</td><td align=left style="padding-left:5px">' + $('#txtproduct' + Id).val() + '</td><td align=left  colspan=2 style="padding-left:5px">' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;padding-right:5px">' + addCommas($('#txtfcamnt' + Id).val()) + '</td></tr>');
                        gridtotal += parseFloat($('#txtfcamnt' + Id).val() || 0);
                    }
                    if (Rowcount % MaxCnt == 0) {
                        Rowcount = 0;
                        myWindow.document.write('<tr style="border:1px solid black;border-left:1px solid white;border-right:1px solid white;"><td height=300px colspan=7></td></tr>');
                    }
                }
            }
            if (($('#typecredit').prop("checked")) && ($('#CmpnyBankAcnt').val() != '') && ($('#CmpnyBankAcnt').val() != 1) && ($('#CmpnyBankAcnt').val() != undefined)) {
                for (var a = 1; a <= (parseInt(MaxCnt)) - (parseInt(Rowcount) + 10) ; a++) {
                    myWindow.document.write('<tr><td style="border-left:1px solid grey;" width=7%>&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td  colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
                }
            }
            else {
                for (var a = 1; a <= MaxCnt - Rowcount; a++) {
                    myWindow.document.write('<tr><td style="border-left:1px solid grey;" width=7%>&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td  colspan=2 style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td><td style="border-left:1px solid grey;">&#160;</td></tr>');
                }

            }
            myWindow.document.write('<tr style="border-top:1px solid grey;"><td colspan=5 font-size: 13px;"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>Sub Total</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('<tr><td colspan=5 font-size: 13px;"></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>VAT 5%</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('<tr class=violetbg><td colspan=5 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + '</td><td style="font-family:tahoma;font-size: 13px;border-left:1px solid grey;" align=center ><b>Total</b></td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(Decimal)) + '</b></td></tr>');
            myWindow.document.write('</table>');
        }
        console.log((($('#typecredit').prop("checked")) && ($('#CmpnyBankAcnt').val() != '') && ($('#CmpnyBankAcnt').val() != 1) && ($('#CmpnyBankAcnt').val() != undefined)))
        if (($('#typecredit').prop("checked")) && ($('#CmpnyBankAcnt').val() != '') && ($('#CmpnyBankAcnt').val() != 1)&& ($('#CmpnyBankAcnt').val() != undefined)) {
            myWindow.document.write('<table width=100%><tr style="height:10px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">Balance as per as on : ' + $('#OutStanding').text() + ' </td></tr>' +
                                                      '<tr style="height:10px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">Bank Details :- </td></tr>' +
                                                      '<tr style="height:6px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">AL NOKHATHA GAS TRADING & DISTRIBUTION LLC</td></tr>' +
                                                      '<tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">BANK NAME : '+$('#CmpnyBank').val()+'</td></tr>' +
                                                      '<tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">ACCOUNT# :  '+$('#CmpnyAcnt').val()+'</td></tr>' +
                                                      '<tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">IBAN# : '+$('#CmpnyIban').val()+'</td></tr>' +
                                                      '<tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">SWIFT CODE : '+$('#CmpnySwiftCode').val()+'</td></tr>' +
                                                      '</table>');

        }
        myWindow.document.write('<table width=100%><tr style="height:15px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">Receivers Name : </td><td style="width:30%;border-bottom:1px dotted black"></td><td colspan=2 align=right style="font-family:tahoma; font-size: 12px;">For AL Nokhatha Gas Trd & Dist. L.L.C</td></tr>' +
            '<tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 12px;">Receivers Sign : </td><td style="width:30%;border-bottom:1px dotted black"></td></tr></table>');

        myWindow.print();
    }

    //New Print Function for Rent Car
    function PrintthisSalesRentCar(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 14;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val());
        var myWindow = window.open("", "", "width=1500,height=1500");

        var SNo = '';
        if (Flag == 0)      //Copy
        { SNo = $('#savedbillno').val(); }
        else
        { SNo = $('#txtBillSlNocopy').val(); }

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
        myWindow.document.write('<td width=75% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
        myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:left><td style="" class=txbld width=50%>SALES INVOICE</td><td width=50%> </td></tr><tr style=text-align:left><td  width=30%></td><td width=70%> </td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
        myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Bill#</td><td style="" class=rowbd>' + SNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#txtivdate').val() + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>SERVICE PROVIDER</td></tr><tr><td height=45px style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100% style=text-align:left><tr class=violetbg style=text-align:center><td class=brtd1>BILL TO</td></tr><tr><td height=45px style=color:#5c3158>' + $('#txtcustomer').val() + '</td></tr><tr><td class=blclr>Address : ' + $('#txtaddress').val() + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr><tr><td class=blclr>Email : ' + $('#Email').val() + '</td></tr><tr><td class=blclr>Phone# : ' + $('#PhoneNo').val() + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td align=center>Sl#</td><td colspan=3 width=50%>Description</td><td align=center>Days</td><td align=right>Rate</td><td align=right>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#ProductDesc' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 44 == 0) {           //Border bottom gery for last table row in the page           
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + $('#td' + Id).text() + '</td><td colspan=3>' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page            
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + $('#td' + Id).text() + '</td><td colspan=3>' + $('#ProductDesc' + Id).val() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                if (Rowcount % 44 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 44 - Rowcount; a++) {
            myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;">Powered By <span style="color:blue;">www.eumierp.com</span></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }


   //New Print Function for Packing History
    function PrintthisBillPackingHistory(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 10;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val());      
        var myWindow = window.open("", "", "width=1500,height=1500");

        var SalesbilnumArray = []; var Salesbilnum = '';
        var NetWt = 0; var GrWt = 0; var Qty = 0; var Measure = 0;


        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                if (SalesbilnumArray.indexOf($('#bilnum' + Id).val()) == -1)
                { SalesbilnumArray.push($('#bilnum' + Id).val()); if (Salesbilnum == '') { Salesbilnum += $('#bilnum' + Id).val() } else { Salesbilnum += ', ' + $('#bilnum' + Id).val() } }
                NetWt = parseFloat(NetWt) + parseFloat($('#NetWt' + Id).val());
                GrWt = parseFloat(GrWt) + parseFloat($('#GrossWt' + Id).val());
                Qty = parseFloat(Qty) + parseFloat($('#txtquantity' + Id).val());
                Measure = parseFloat(Measure) + parseFloat($('#MeasureQty' + Id).val());
            }
        }

        var CartinWords = WordwithDecimal(TotalCartonsArray.length);
        CartinWords = CartinWords.replace('Only', ' ');

        var QtnNo = '';
        //if (Flag == 0)      //Copy
        //{ QtnNo = $('#txtQuotationNocopy').val(); }
        //else
            if (Flag == 1)
            { QtnNo = $('#txtBillSlNocopy').val(); }

          //  ComapnyImgToPrint.removeAttribute('id')
            $(ComapnyImgToPrint).attr("id", "PackingListLogo");
            $(ComapnyImgToPrint).attr("width", "200");
            $(ComapnyImgToPrint).attr("height", "100px");

        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td,.brtd3 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        myWindow.document.write('<table width=100% style=""><tr style=""><td width=10%; style="valign:top">' + (ComapnyImgToPrint.outerHTML) + '</td>');
        myWindow.document.write('<td width=90%; style="">');
        myWindow.document.write('<table width=100%; style="text-align:right"><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table>');




        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=100px>');
        myWindow.document.write('<table width=100%; style=text-align:left><tr class=violetbg style=text-align:center>');

        myWindow.document.write('<td class=brtd1>FOR ACCOUNT AND RISK OF</td></tr><tr><td style=color:#5c3158>' + ($('#txtcustomer').val()).substring(0, 30) + '</td></tr><tr><td class=blclr>' + ($('#txtaddress').val()).substring(0, 30) + '</td></tr><tr><td class=blclr>TRN# : ' + $('#txtlpono').val() + '</td></tr></table>');     //<tr><td class=blclr>Email : </td></tr><tr><td class=blclr>Website : </td></tr>


        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=100px>');
        myWindow.document.write('<table width=100% style=text-align:left>');

        myWindow.document.write('<tr><td class="brtd1" style=color:#5c3158 align=right>Sales Invoice No : </td><td class="brtd1" style=color:#5c3158 align=left>' + Salesbilnum + '</td></tr><tr><td style=color:#5c3158 align=right>Packing No &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td style=color:#5c3158 align=left>' + $('#txtBillSlNocopy').val() + '</td></tr><tr><td style=color:#5c3158 align=right>Date &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: </td><td style=color:#5c3158 align=left>' + $('#txtivdate').val() + '</td></tr><tr><td></td></tr><tr><td class=blclr></td></tr><tr><td class=blclr></td></tr></table>');

        myWindow.document.write('</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td  width=10%>C/N NO</td><td width=15%>Code</td><td width=36%>Description</td><td width=7%>Qty</td><td width=8%>Unit</td><td align=center width=8%>N.Wt.</td><td align=right width=8%>G.Wt.</td><td align=right width=8%>MEAS</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 44 == 0) {           //Border bottom gery for last table row in the page           
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + $('#Cart' + Id).val() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td >' + ($('#ProductDesc' + Id).val()).substring(0, 30) + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=right>' + ($('#NetWt' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + ($('#GrossWt' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + ($('#MeasureQty' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page            
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + $('#Cart' + Id).val() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td >' + ($('#ProductDesc' + Id).val()).substring(0, 30) + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=right>' + ($('#NetWt' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + ($('#GrossWt' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + ($('#MeasureQty' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                if (Rowcount % 44 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=8></td></tr>');
                }
            }
        }
        for (var a = 1; a <= 47 - Rowcount; a++) {           
           // myWindow.document.write('<tr><td  colspan=8>&#160;</td></tr>');
            myWindow.document.write('<tr class=brtd3><td style="border-left:1px solid grey;">&#160;&#160;&#160;</td><td>&#160;&#160;&#160;</td><td >&#160;&#160;&#160;</td><td align=center> &#160;&#160;&#160;</td><td>&#160;&#160;&#160;</td><td align=right>&#160;&#160;&#160;</td><td align=right style="border-right:1px solid grey;">&#160;&#160;&#160;</td><td align=right style="border-right:1px solid grey;">&#160;&#160;&#160;</td></tr>');

        }
        myWindow.document.write('<tr class=brtd3 style="border-bottom:solid 1 px red;border:1px solid grey;"><td >' + TotalCartonsArray.length + ' CTNS</td><td></td><td ></td><td align=center>' + Qty + '</td><td></td><td align=right>' + NetWt + '</td><td align=right >' + GrWt + '</td><td align=right >' + Measure + '</td></tr>');

        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');

        //myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1><b>TOTAL  &#160;&#160;&#160;&#160;&#160;:&#160;&#160;&#160;&#160;&#160; ' + TotalCartonsArray.length + ' CARTONS</b></td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Quotation Validity : ' + $('#txtdays').val() + '</td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=8 style="width:100%">Total  :  ' + CartinWords + ' CTNS</td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:8px"><td colspan=8></td></tr><tr ><td colspan=3 style="font-family:tahoma; font-size: 10px;"></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr> </table>');

        myWindow.print();
    }

//    function PrintthisBillForFazalLazor(Rowlen, flag)
//    {
//        var BillNo = '';
//        if (flag == 1)
//            BillNo = $('#txtBillSlNocopy').val();
//        else if (flag == 0)
//            BillNo = $('#savedbillno').val();

//        var Currency = $('#select_crncy option:selected').html()
//        var bal = 'Party TRN : ' + $('#txtlpono').val();

//        //var AmountinWords = '    ' + convertNumberToWords($('#gndtotal').text())

//        var AmountinWords = '    ' + WordwithDecimal($('#GrandTotal').val());

//        var myWindow = window.open("", "", "width=1500,height=1500");


//        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td,.brtd3 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
//        myWindow.document.write(PrintBG2);



//        var sspace = '               ';
//        var Space = '                                                                                            ';
//        var Leftalign = '';
//        var Paytype = 'CASH';
//        var spacebal = Space;
//        var strbal = spacebal.substring(spacebal.length - 27, spacebal.length);
//        var CustName = $('#txtlgrgname').val();
//        if (CustName == '') { var CustName = $('#txtcustomer').val() }
//        var PayType = $('#select_payterms').val();       
//        if (PayType == 1) { PayType = 'CASH' } else { PayType='CREDIT' }

 

//        myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
//        myWindow.document.write('<table width="100%" class="printbdy">');
//        myWindow.document.write('<tr><td height=112px colspan=17></td></tr>');


//        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=center><b>' + PayType + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b></b></td><tr>')
//         myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=left><b>' + CustName + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b>' + BillNo + '</b></td><tr>')
//         myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#txtaddress').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4>' + $('#txtivdate').val() + '</td><tr>')
//         myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#PhoneNo').val() + ',' + $('#CustPhnNew').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
//         if ($('#ChassisNo').val() != '') {
//             myWindow.document.write('<tr><td width=3%></td><td>Chassis# :</td><td colspan=6 width=100% align=left>' + $('#ChassisNo').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>');
//         }else{
//             myWindow.document.write('<tr><td>&#160;</td></tr>');
//         }
//         if ($('#txtlpono').val() != '') {
//             myWindow.document.write('<tr><td width=3%></td><td>Party TRN :</td><td colspan=6 width=100% align=left>' + $('#txtlpono').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>')
//         } else {
//             myWindow.document.write('<tr><td>&#160;</td></tr>');
//         }
//         if ($('#OutStanding').text() != '') {
//         myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=center >BAL :' + $('#OutStanding').text() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
//         } else {
//             myWindow.document.write('<tr><td>&#160;</td></tr>');
//         }
//         if ($('#txtmsg').val() != '') {
//             myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=10  width=100% align=left >' + $('#txtmsg').val() + '</td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
//         } else {
//             myWindow.document.write('<tr><td>&#160;</td></tr>');
//         }
         

//        myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr>');
//        myWindow.document.write('<tr><td>&#160;</td></tr></table>');
//        myWindow.document.write('<table width="100%" class="printbdy">');
//        var RowCo = Rowlen; var gridtotal = 0;

//        for (var i = 1; i < Rowlen; i++) {
//            var Id = parseInt(i);

//            var Unit = $("#select_unit"+Id +" option:selected").text();
//            var ItemCode = $('#txtproduct' + Id).val().substring(0, 15); var ItemName = $('#ProductDesc' + Id).val().substring(0, 38); var Location = $('#select_location' + Id + ' option:selected').html(); var Qty = $('#txtquantity' + Id).val(); var unit = $('#select_unit' + Id + ' option:selected').html() + '  '; var Unitprice =parseFloat( $('#txtrate' + Id).val()||0).toFixed(2); var Amount = $('#txtamnt' + Id).val();
//            if (ItemCode != undefined) {

//                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)
               
//                if (i > 9) {

//                    myWindow.document.write('<tr><td width=3%></td><td width=5%>' + i + '</td><td align=left width=17%>' + ItemCode + '</td><td  width=37%>' + ItemName + '</td><td text-align="center"  width=8%>' + Qty +'  '+Unit+ '</td><td align="right"  width=12%>' + Unitprice + '</td><td align="right"  width=15%>' + Amount + '</td></tr>');
//                }
//                else {
//                    myWindow.document.write('<tr><td width=3%></td><td width=5%>' + i + '</td><td align=left width=17%>' + ItemCode + '</td><td  width=37%>' + ItemName + '</td><td text-align="center"  width=8%>' + Qty + '  ' + Unit + '</td><td align="right"  width=12%>' + Unitprice + '</td><td align="right"  width=15%>' + Amount + '</td></tr>');
//                }
//                if (i % 28 == 0 && Rowlen > i + 1) {

//                    for (var d = 0; d < 22; d++) {
//                        myWindow.document.write('<tr><td>&#160;</td></tr>');
//                    }

//                    myWindow.document.write('<tr><td colspan=17><table width="100%" class="printbdy">');
                   

                    
//                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=center><b>' + PayType + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b></b></td><tr>')
//                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=left><b>' + CustName + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b>' + BillNo + '</b></td><tr>')
//                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#txtaddress').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4>' + $('#txtivdate').val() + '</td><tr>')
//                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#PhoneNo').val() + ',' + $('#CustPhnNew').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
//                    if ($('#ChassisNo').val() != '') {
//                        myWindow.document.write('<tr><td width=3%></td><td>Chassis# :</td><td colspan=6 width=100% align=left>' + $('#ChassisNo').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>');
//                    } else {
//                        myWindow.document.write('<tr><td>&#160;</td></tr>');
//                    }
//                    if ($('#txtlpono').val() != '') {
//                        myWindow.document.write('<tr><td width=3%></td><td>Party TRN :</td><td colspan=6 width=100% align=left>' + $('#txtlpono').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>')
//                    } else {
//                        myWindow.document.write('<tr><td>&#160;</td></tr>');
//                    }
//                    if ($('#OutStanding').text() != '') {
//                        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=center >BAL :' + $('#OutStanding').text() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
//                    } else {
//                        myWindow.document.write('<tr><td>&#160;</td></tr>');
//                    }
//                    myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr></table></td></tr>');
//                    RowCo = Rowlen - 29

//                }


//            }

//        }

//        for (var i = 0; i < 29 - RowCo; i++) {
//            myWindow.document.write('<tr><td>&#160;</td></tr>');
//        }


//        var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
//        var Dis = parseFloat($('#TotalDiscount').text() || 0);

//        var TotalLine5 = $('#TotalTaxable').val();
//        var TotalLine4 = $('#TotalTax').val();
//        var TotalLine1 = $('#gndtotal').text();
        
//        //myWindow.document.write('</table><table><tr><td width=3%></td><td width=100%></td><td colspan=6  align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=right colspan=4>' + TotalLine5 + '</td><tr>');

//        //if (Dis != 0) {
//        //    myWindow.document.write('</table><table><tr><td width=3%>Dis :</td><td>' + Dis + '</td></tr>');
//        //}
//        //else
//        //{
//        //    myWindow.document.write('<tr><td>&#160;</td></tr>');
//        //}        
//        //myWindow.document.write('<tr><td width=3%></td><td width=100%></td><td colspan=6 align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=right colspan=4>' + TotalLine4 + '</td><tr>');
//        ////myWindow.document.write('<tr><td>&#160;</td></tr>');
//        //myWindow.document.write('<tr><td width=3%></td><td class=printbdy width=100%>' + AmountinWords + ' Only' + '</td><td colspan=6  align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=rignt colspan=4><b>' + TotalLine1 + '</b></td><tr>');
//        //myWindow.document.write('<tr><td>&#160;</td></tr>');
//        //myWindow.document.write('<tr><td></td><td colspan=3 class=printbdy >&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' + $("#select_salesman option:selected").text() + '</td></tr>');
//        ////myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr></table>');

//        myWindow.document.write('<tr><td colspan=17><table width=100%>');
//        myWindow.document.write('<tr><td align=right colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
//        myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

//        myWindow.document.write('<tr><td colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;AED  ' + AmountinWords + '' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

//        myWindow.document.write('<tr><td align=right colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



//        myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



//        myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
//        myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

//        myWindow.document.write('<tr><td align=center colspan=17>' + $('#select_salesman option:selected').html() + '</td></tr>');

//        myWindow.document.write('<table></td></tr>');




//        myWindow.print();
//        myWindow.close();
//}


    function PrintthisBillForFazalLazor(Rowlen, flag) {
        var BillNo = '';
        if (flag == 1)
            BillNo = $('#txtBillSlNocopy').val();
        else if (flag == 0)
            BillNo = $('#savedbillno').val();

        var Currency = $('#select_crncy option:selected').html()
        var bal = 'Party TRN : ' + $('#txtlpono').val();

        //var AmountinWords = '    ' + convertNumberToWords($('#gndtotal').text())

        var AmountinWords = '    ' + WordwithDecimal($('#GrandTotal').val());

        var myWindow = window.open("", "", "width=1500,height=1500");


        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td,.brtd3 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);


        var Page = 0;
        var sspace = '               ';
        var Space = '                                                                                            ';
        var Leftalign = '';
        var Paytype = 'CASH';
        var spacebal = Space;
        var strbal = spacebal.substring(spacebal.length - 27, spacebal.length);
        var CustName = $('#txtlgrgname').val();
        if (CustName == '') { var CustName = $('#txtcustomer').val() }
        var PayType = $('#select_payterms').val();
        if (PayType == 1) { PayType = 'CASH' } else { PayType = 'CREDIT' }



        myWindow.document.write('<style type="text/css"> @page { margin-left:0cm;}  .printbdy{ border-collapse: collapse;font-family:tahoma; font-size: 12px;} .printbdy td {border:0.0px solid black;}.tbl1{ }#header, #nav, .noprint{display: none;}.print{ page-break-after: always;} </style>');
        myWindow.document.write('<table width="100%" class="printbdy">');
        myWindow.document.write('<tr><td height=117px colspan=17></td></tr>');


        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=center><b>' + PayType + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b></b></td><tr>')
        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=left><b>' + CustName + '</b></td><td width=25% colspan=1></td><td width="40%" align=center colspan=8><b>' + $('#UserDetsss1').text() + '-' + BillNo + '</b></td><td width=18% colspan=1><b></b></td><tr>')
        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#txtaddress').val() + '</td><td width=25% colspan=1></td><td width="35%"  align=center colspan=7><b>' + $('#txtivdate').val() + '</b></td><td > : </td><td width=23%><b>' + $('#CurrentTimeSales').val() + '</b></td><tr>')
        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#PhoneNo').val() + ',' + $('#CustPhnNew').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
        if ($('#ChassisNo').val() != '') {
            myWindow.document.write('<tr><td width=3%></td><td>Chassis# :</td><td colspan=6 width=100% align=left>' + $('#ChassisNo').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>');
        } else {
            myWindow.document.write('<tr><td>&#160;</td></tr>');
        }
        if ($('#txtlpono').val() != '') {
            myWindow.document.write('<tr><td width=3%></td><td>Party TRN :</td><td colspan=6 width=100% align=left>' + $('#txtlpono').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>')
        } else {
            myWindow.document.write('<tr><td>&#160;</td></tr>');
        }
        if ($('#OutStanding').text() != '') {
            myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=center >BAL :' + $('#OutStanding').text() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
        } else {
            myWindow.document.write('<tr><td>&#160;</td></tr>');
        }
        if ($('#txtmsg').val() != '') {
            myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=10  width=100% align=left >' + $('#txtmsg').val() + '</td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
        } else {
            myWindow.document.write('<tr><td>&#160;</td></tr>');
        }


        myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr>');
        myWindow.document.write('<tr><td>&#160;</td></tr></table>');
        myWindow.document.write('<table width="100%" class="printbdy">');
        var RowCo = Rowlen; var gridtotal = 0;
        var slnotxt = 0;
        for (var i = 1; i < Rowlen; i++) {
            var Id = parseInt(i);

            var ItemCodeText = $('#txtproduct' + Id).val();

            if (ItemCodeText != undefined) {
                slnotxt++;

            var Unit = $("#select_unit" + Id + " option:selected").text();
            var ItemCode = $('#txtproduct' + Id).val().substring(0, 15); var ItemName = $('#ProductDesc' + Id).val().substring(0, 38); var Location = $('#select_location' + Id + ' option:selected').html(); var Qty = $('#txtquantity' + Id).val(); var unit = $('#select_unit' + Id + ' option:selected').html() + '  '; var Unitprice = parseFloat($('#txtrate' + Id).val() || 0).toFixed(2); var Amount = $('#txtamnt' + Id).val();
            

                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0)

                if (i > 9) {

                    myWindow.document.write('<tr><td width=3%></td><td width=5%>' + slnotxt + '</td><td align=left width=17%>' + ItemCode + '</td><td  width=37%>' + ItemName + '</td><td align="right"  width=8%>' + Qty + '  ' + Unit + '</td><td align="right"  width=12%>' + Unitprice + '</td><td align="right"  width=15%>' + Amount + '</td></tr>');
                }
                else {
                    myWindow.document.write('<tr><td width=3%></td><td width=5%>' + slnotxt + '</td><td align=left width=17%>' + ItemCode + '</td><td  width=37%>' + ItemName + '</td><td align="right"  width=8%>' + Qty + '  ' + Unit + '</td><td align="right"  width=12%>' + Unitprice + '</td><td align="right"  width=15%>' + Amount + '</td></tr>');
                }
                if (i % 28 == 0 && Rowlen > i + 1) {
                    Page++;
                    for (var d = 0; d < 23; d++) {
                        myWindow.document.write('<tr><td>&#160;</td></tr>');
                    }

                    myWindow.document.write('<tr><td colspan=17><table width="100%" class="printbdy">');



                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=center><b>' + PayType + '</b></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4><b></b></td><tr>')
                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6 width=100% align=left><b>' + CustName + '</b></td><td width=25% colspan=1></td><td width="40%" align=center colspan=8><b>' + $('#UserDetsss1').text() + '-' + BillNo + '</b></td><td width=18% colspan=1><b></b></td><tr>')
                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#txtaddress').val() + '</td><td width=25% colspan=1></td><td width="35%"  align=center colspan=7><b>' + $('#txtivdate').val() + '</b></td><td ><b> : </b></td><td width=23% ><b>' + $('#CurrentTimeSales').val() + '</b></td><tr>')
                    myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=left>' + $('#PhoneNo').val() + ',' + $('#CustPhnNew').val() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
                    if ($('#ChassisNo').val() != '') {
                        myWindow.document.write('<tr><td width=3%></td><td>Chassis# :</td><td colspan=6 width=100% align=left>' + $('#ChassisNo').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>');
                    } else {
                        myWindow.document.write('<tr><td>&#160;</td></tr>');
                    }
                    if ($('#txtlpono').val() != '') {
                        myWindow.document.write('<tr><td width=3%></td><td>Party TRN :</td><td colspan=6 width=100% align=left>' + $('#txtlpono').val() + '</td><td width=25% rowspan=5 colspan=4></td><td align=right width=25% colspan=2></td><td width=18% colspan=4></td><tr>')
                    } else {
                        myWindow.document.write('<tr><td>&#160;</td></tr>');
                    }
                    if ($('#OutStanding').text() != '') {
                        myWindow.document.write('<tr><td width=3%></td><td width=15%></td><td colspan=6  width=100% align=center >BAL :' + $('#OutStanding').text() + '</td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% colspan=4></td><tr>')
                    } else {
                        myWindow.document.write('<tr><td>&#160;</td></tr>');
                    }
                    myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr></table></td></tr>');
                    RowCo = Rowlen - 28

                }


            }

        }
        RowCo = Rowlen - (Page * 28);

        for (var i = 0; i < 28 - RowCo; i++) {
           myWindow.document.write('<tr><td>&#160;</td></tr>');
           
        }


        var gndtotal = parseFloat($('#GrandTotal').val() || 0).toFixed(20);
        var Dis = parseFloat($('#TotalDiscount').text() || 0);

        var TotalLine5 = $('#TotalTaxable').val();
        var TotalLine4 = $('#TotalTax').val();
        var TotalLine1 = $('#gndtotal').text();

        //myWindow.document.write('</table><table><tr><td width=3%></td><td width=100%></td><td colspan=6  align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=right colspan=4>' + TotalLine5 + '</td><tr>');

        //if (Dis != 0) {
        //    myWindow.document.write('</table><table><tr><td width=3%>Dis :</td><td>' + Dis + '</td></tr>');
        //}
        //else
        //{
        //    myWindow.document.write('<tr><td>&#160;</td></tr>');
        //}        
        //myWindow.document.write('<tr><td width=3%></td><td width=100%></td><td colspan=6 align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=right colspan=4>' + TotalLine4 + '</td><tr>');
        ////myWindow.document.write('<tr><td>&#160;</td></tr>');
        //myWindow.document.write('<tr><td width=3%></td><td class=printbdy width=100%>' + AmountinWords + ' Only' + '</td><td colspan=6  align=left></td><td width=25% colspan=4></td><td width=25% align=right colspan=2></td><td width=18% class=printbdy align=rignt colspan=4><b>' + TotalLine1 + '</b></td><tr>');
        //myWindow.document.write('<tr><td>&#160;</td></tr>');
        //myWindow.document.write('<tr><td></td><td colspan=3 class=printbdy >&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' + $("#select_salesman option:selected").text() + '</td></tr>');
        ////myWindow.document.write('<tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr><tr><td>&#160;</td></tr></table>');


        myWindow.document.write('<tr><td colspan=17><table width=100%>');
        myWindow.document.write('<tr><td align=right style="font-family:tahoma; font-size: 12px;" colspan=13><b>Total Qty :  ' + $('#TotalPdtQty').val() + ' </b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + gridtotal.toFixed(2) + '</b></td><tr>');
        myWindow.document.write('<tr><td align=right colspan=13></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>DISCOUNT&#160;&#160;&#160;&#160;</b></td><td  align=right style="font-family:tahoma; font-size: 10px;" colspan=2><b>' + parseFloat($('#disc').val()).toFixed(2) + '</b></td><tr>');

        myWindow.document.write('<tr><td style="font-family:tahoma; font-size: 12px;" colspan=13>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;    ' + AmountinWords + '' + '</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right colspan=2><b>' + parseFloat($('#TotalTaxable').val()).toFixed(2) + '</b></td><tr>');

        myWindow.document.write('<tr><td align=right style="font-family:tahoma; font-size: 12px;" colspan=13>Round Off  ( ' + $('#TotRoundOff').val() + '   )</td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b> TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right colspan=2><b>' + parseFloat($('#TotalTax').val()).toFixed(2) + '</b></td><tr>');



        myWindow.document.write('<tr><td colspan=13></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 12px;" align=right colspan=2><b>' + parseFloat($('#gndtotal').text()).toFixed(2) + '</b></td><tr>');



        myWindow.document.write('<tr><td align=center height=26px; colspan=17></td></tr>');
        myWindow.document.write('<tr><td align=center colspan=17>' + $('#dttime').text() + '</td></tr>');

        myWindow.document.write('<tr><td style="font-family:tahoma; font-size: 12px;"  align=left colspan=17>&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;' + $('#select_salesman option:selected').html() + '</td></tr>');

        myWindow.document.write('<table></td></tr>');




        myWindow.print();
        myWindow.close();
    }



    //New Print Function for Quotation Entry gas
    function PrintthisBillQuotationforGas(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 13;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val());
        var myWindow = window.open("", "", "width=1500,height=1500");

        var QtnNo = '';
        if (Flag == 0)      //Copy
        { QtnNo = $('#txtQuotationNocopy').val(); }
        else
        { QtnNo = $('#savedQuotation').val(); }

        myWindow.document.write('<style type="text/css">.emptbg td{border-right:1px solid grey;} .brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

        //myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr>');

        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (GasLogo.outerHTML) + '</td></tr></table>');


        myWindow.document.write('<table width=100%; style="text-align:center"><tr style=text-align:center><td style="" class=txbld width=100%><u>QUOTATION</u></td></tr></table>');

        //myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table width=100% ><tr>');

        myWindow.document.write('<td width=70% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
        myWindow.document.write('<table width=100% style=text-align:left><tr style=text-align:left><td >TO,</td></tr><tr><td >' + $('#txtcustomer').val() + '</td></tr><tr><td>Tel No &#160;&#160;&#160;&#160;: ' + $('#txtaddress').val() + '</td></tr><tr><td >Email Id &#160;: </td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');

        myWindow.document.write('<td width=30% style="border:none;"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 >');
        myWindow.document.write('<table width=100% style="text-align:center;border-collapse:collapse;background-color:#E8EAF6;border:1px solid lightgrey" ><tr class=rowbd><td class=rowbd><b>Quote No.</td><td style="" class=rowbd>' + QtnNo + ' </b></td></tr><tr class=rowbd><td class=rowbd > <b>Date &#160;&#160;  </td><td class=rowbd style=""> </b>' + $('#QtnDate').val() + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('</tr></table>');

        //myWindow.document.write('<table frame="box" style="margin-top:10px;background-color:#E8EAF6;color:#00838F" height=50px width=100%><tr align=center><td colspan=12>PROJECT DESCRIPTION : [ERP Software For Gas Business Management System which includes Sales,Purchase,Inventory,Job Management and Financial Modules] </td></tr></table>');
        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>SL#</td><td>Code</td><td colspan=2>Description</td><td>Unit</td><td>Qty</td><td align=center>Rate</td><td align=right>Amount</td></tr>');
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                if (Rowcount % 42 == 0) {           //Border bottom gery for last table row in the page           
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                else {                             //Border bottom lightgery for other tbl rows in the page            
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + $('#td' + Id).text() + '</td><td>' + $('#txtproduct' + Id).val() + '</td><td colspan=2>' + $('#ProductDesc' + Id).val() + '</td><td>' + $('#select_unit' + Id + ' option:selected').html() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right>' + addCommas($('#txtrate' + Id).val()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#txtamnt' + Id).val()) + '</td></tr>');
                    gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                    TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                }
                if (Rowcount % 42 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=300px colspan=8></td></tr>');
                }
            }
        }

        //if (Rowcount > 40)
        //{ Rowcount = Rowcount - 40; }
        console.log(Rowcount)
        for (var a = 1; a <= 37 - Rowcount; a++) {
            myWindow.document.write('<tr class=emptbg><td>&#160;</td><td></td><td colspan=2></td><td></td><td></td><td align=center></td><td align=right></td></tr>');   //<tr><td  colspan=8>&#160;</td></tr>
        }
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        myWindow.document.write('<td width=100%>');
        myWindow.document.write('<table width=100%>');
        myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4><b>Total Qty :  ' + TotPQty + '  </b></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Quotation Validity : ' + $('#txtdays').val() + '</td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        myWindow.document.write('<tr class=violetbg><td colspan=7 style="width:90%">Total  :  ' + AmountinWords + '</td><td style="font-family:tahoma; font-size: 12px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr><td colspan=8 align=center></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<table width=100%><tr style="height:50px;"><td colspan=8></td></tr><tr ><td style="font-family:tahoma; font-size: 10px;">Receiver Name :</td><td colspan=2 style="font-family:tahoma; font-size: 10px;border-bottom:1px solid black;width:30%;"></td><td colspan=2 align=right >Authorized Signature :</td><td colspan=3 style="width:30%;border-bottom:1px solid black"></td></tr>');
        myWindow.document.write('<td style="font-family:tahoma; font-size: 10px;"><div style=margin-top:10px>Receiver Sign :</div></td><td colspan=2 style="font-family:tahoma; font-size: 10px;border-bottom:1px solid black;width:30%;"></td><td colspan=2 align=right ></td><td colspan=3 style=""></td></tr> </table>');
        myWindow.print();
    }





    //New Print Function for Rent Car
    function PrintthisSalesRentCarNew(Rowlen, Flag) {
        var gridtotal = 0; var TotPQty = 0; var Rowcount = 16;
        var AmountinWords = WordwithDecimal($('#GrandTotal').val());
        var myWindow = window.open("", "", "width=1500,height=1500");

        var SNo = '';
        if (Flag == 0)      //Copy
        { SNo = $('#savedbillno').val(); }
        else
        { SNo = $('#txtBillSlNocopy').val(); }



        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);



        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');

        var Vehicle = ''; var VehicleCode = ''; var NumDays = 0;
        for (var i = 0; i <= Rowlen; i++) {
            var Id = parseInt(i + 1);
            if ($('#ProductDesc' + Id).length) {
                Vehicle = $('#ProductDesc' + Id).val();
                VehicleCode = $('#txtproduct' + Id).val();
                gridtotal += parseFloat($('#txttaxableamnt' + Id).val() || 0);
                TotPQty += parseInt($('#txtquantity' + Id).val() || 0);
                NumDays = $('#txtquantity' + Id).val();
            }
        }
        myWindow.document.write('<table width=100% ><tr> <td width=50%>');
        myWindow.document.write('<table width=100% ><tr style=text-align:left><td style="" class=txbld>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
            '<tr style=text-align:left><td style="">Issue Date:' + $('#txtivdate').val() + '</td></tr>' +
            '<tr style=text-align:left><td style="">Invoice#:' + SNo + '</td></tr>' +
            '<tr style=text-align:left><td style="">Invoice Date#:' + $('#txtivdate').val() + '</td></tr>' +
            '<tr style=text-align:left><td style="">Due Date#:' + $('#txtduedate').val() + '</td></tr>' +
            '<tr style=text-align:left><td style="">Currency#:' + $('#select_crncy :selected').text() + '</td></tr>' +
            '<tr style=text-align:left><td style="">Number of Days#:' + NumDays + '</td></tr>' +
            '<tr style=text-align:left><td style="">Order#:</td></tr>' +
            '<tr style=text-align:left><td style=""></td></tr></table></td>' +

            '<td width=50%><table width=100% ><tr><td>' +
            '<table width=100%; style="text-align:left ;border: 1px solid grey"><tr class= style=text-align:center><td class=brtd1>Invoice To</td></tr><tr><td height=15px>' + $('#txtcustomer').val() + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Nationality : </td></tr><tr><td class=blclr>Mobile : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>' +
            '</td></tr></table></td></tr></table>');

        myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td colspan=3 width=50%>Description</td><td align=center >Discount</td><td align=center>Amount</td><td align=center>Total</td><td align=center>Balance</td></tr>');
        myWindow.document.write('<tr style=" border: 1px solid black;"><td colspan=3 width=50% >Rental Fees</td><td align=center style=" border: 1px solid black;"> ' + $('#TotalDiscount').val() + ' </td><td align=right style= "border:1px solid black;"> ' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr>');
        myWindow.document.write('<tr style=" border: 1px solid black;"><td colspan=3 width=50%>Vehicle ' + VehicleCode + ',' + Vehicle + '</td><td align=center  style= "border:1px solid black;"> ' + $('#TotalDiscount').val() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr></table>');


        for (var a = 1; a <= 16; a++) {
            myWindow.document.write('<table width=100%><tr><td  colspan=8>&#160;</td></tr>');
        }
        myWindow.document.write('<table height=10px width=100% style=""><tr><td colspan=8></td></tr> </table>');
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr  style= "border:1px solid black;"><td colspan=3 width=50% class=violetbg>Invoice Amount</td><td align=center  style= "border:1px solid black;"> ' + $('#TotalDiscount').val() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr>');
        myWindow.document.write('<tr  style=" border: 1px solid black;"><td colspan=3 width=50% >Paid Amount</td><td align=center   style= "border:1px solid black;"> ' + $('#TotalDiscount').val() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr>');
        myWindow.document.write('<tr  style=" border: 1px solid black;"><td colspan=3 width=50% class=violetbg>Remaining Amount</td><td align=center   style= "border:1px solid black;"> ' + $('#TotalDiscount').val() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr>');
        myWindow.document.write('<tr  style=" border: 1px solid black;"><td colspan=3 width=50%>Security Deposit</td><td align=center   style= "border:1px solid black;"> ' + $('#TotalDiscount').val() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">' + $('#gndtotal').text() + '</td><td align=right  style= "border:1px solid black;">0.00</td></tr></table>');
        myWindow.document.write('</table>');
        //myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100%><tr>');
        //myWindow.document.write('<td width=100%>');
        //myWindow.document.write('<table width=100%>');
        //myWindow.document.write('<tr style="border-top:1px solid grey;font-family:tahoma; font-size: 10px;"><td align=left colspan=1>Place  &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;: ' + $('#select_place option:selected').html() + '</td><td style="font-family:tahoma; font-size: 10px;" align=center colspan=4></td><td colspan=2 style="font-family:tahoma; font-size: 10px;" align=right><b>SUB TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;" align=right ><b>' + addCommas(parseFloat(gridtotal).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr style="font-family:tahoma; font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAXABLE AMOUNT &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr style="font-family:tahoma;font-size: 10px;"><td align=left colspan=1></td><td colspan=6  align=right><b>TAX @ 5% &#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('<tr class=violetbg><td colspan=5 style="width:75%">Total  :  ' + AmountinWords + '</td><td colspan=2 style="font-family:tahoma;font-size: 10px;" align=right ><b>GRAND TOTAL&#160;&#160;&#160;&#160;</b></td><td style="font-family:tahoma; font-size: 10px;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(2)) + '</b></td></tr>');
        //myWindow.document.write('</table>');
        //myWindow.document.write('</td></tr></table>');

        myWindow.document.write('<hr  style="border-top: 1px solid black;margin-top:30px">');
        myWindow.document.write('<table style="font-size:80%;"  width=100%><tr><td colspan=8 ><div style="height:30px;margin-top:20px" class=txbld>Receiver Signature</div></td><td colspan=8><div  style="height:30px;margin-top:40px" class=txbld>Manager Signature</div></td><td colspan=8><div style="height:30px;margin-top:40px" class=txbld>Accountant Signature</div></td></tr> <tr><td colspan=8><div style="height:40px;border: 1px solid black;text-align:center;"><div style="margin-top:15px;color:black">_____________________________</div></div></td><td colspan=8 ><div style="height:40px ;border: 1px solid black; text-align:center;"><div style = "margin-top:15px;color:blade">_____________________________</div></div></td><td colspan=8 ><div style="height:40px; border: 1px solid black; text-align:center;"><div style="margin-top:15px;color:black">_____________________________</div></div></td></tr></table>');


        myWindow.print();
    }


    //NEW PRINT FUCTION FOR AUTOGLASS
    function PrintthisBillForAUTOGLASSLazor(Rowlen, flag) {
        var myWindow = window.open("", "", "width=1500,height=1500");
        var AmountinWords = convertNumberToWords($('#GrandTotal').val())
        var TotQty = 0;
        var total = 0;
        var RBillNo = '';
        var Rowcount = 12;
        var PayType = '';
        if ($('#typecash').prop("checked")) {
            PayType = 'Cash';
        }
        else if ($('#typecredit').prop("checked")) {
            PayType = 'Credit';
        }

        //var address = ($('#txtaddress').val()).substr(0, 60);

        if (flag == 0)
            RBillNo = $('#savedbillno').val();
        else if (flag == 1)
            RBillNo = $('#txtBillSlNocopy').val();

        myWindow.document.write('<table width=100%><tr><td align=center><h3>' + window.CompanySettingsArray.CompanyName + '</h3></td></tr>' +
            '<tr style=text-align:center><td style="">' + $('#txtaddress').val() + '</td></tr>' +
            '<tr style=text-align:center><td style="">' + $('#CustPhnNew').val() + '</td></tr>' +
            '<tr style=text-align:center><td style="">TRN NO:' + $('#txtlpono').val() + '</td></tr>' + '</td></tr></table></td></tr></table>');


        myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px;table-layout:fixed;border-collapse:collapse;" width=100%><tr><td align=left colspan=6 style=" border-right: 1px solid black ;" >'
           + $('#txtcustomer').val() + '</td><td >Invoice No: </td><td align=left colspan=2  > : ' + RBillNo + '</td></tr><tr><td colspan=6 style=" border-right: 1px solid black ;"></td ><td>Invoice Date </td><td colspan=2> : '
           + $('#txtivdate').val() + '</td></tr><tr><td colspan=6 style=" border-right: 1px solid black ;"></td><td style="width:30";>Terms Of Payment </td><td colspan=2> ' + PayType + '</td></tr><tr><td colspan=6 style=" border-right: 1px solid black ;">'
           + ($('#txtaddress').val()).substr(0, 60) + '</td><td> Due Date </td><td colspan=2> : ' + $('#txtduedate').val() + '</td></tr><tr><td align=left colspan=3>phone : '
           + window.CompanySettingsArray.PhoneNo + '</td><td colspan=3 style=" border-right: 1px solid black ;" >TRN :' + $('#txtlpono').val() + '</td><td colspan=3 style=" border-right: 1px solid black ;" >SEE REFERENCE :' + $('#txtlgrgname').val() + '</td></tr>');


        //myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px" width=100%><tr><td align=left colspan=6>' + $('#txtcustomer').val() + '</td><td  align=left style="padding-left:12%">Sales Ret No </td><td  align=left > : </td><td align=left style="padding-left:1%">' + RBillNo + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Ret Date </td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#txtivdate').val() + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Invoice No.</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_transfer').val() + '</td></tr><tr><td align=left colspan=6>' + $('#txtaddress').val() + '</td><td  align=left style="padding-left:12%">Salesman</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_salesman').find("option:selected").text() + '</td></tr><tr><td align=left colspan=3>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td><td align=left colspan=3>Fax : ' + window.CompanySettingsArray.Fax + '</td><td  align=left style="padding-left:12%">LPO </td><td  align=left > : </td><td></td></tr>');


        myWindow.document.write('<table width=100%> <tr><td align=center></td></tr><tr><td align=center></td></tr>');
        myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;"width=100%>');

        myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px">Sl#</td><td style="padding-left:5px">Code</td><td colspan=4 style="padding-left:5px">Description</td><td style="padding-left:5px">Location</td><td align=center>Qty</td><td align=right style="padding-right:5px">Price</td><td align=right style="padding-right:5px">AMOUNT</td></tr>');
        var slno = 1;
        for (var i = 0; i <= Rowlen ; i++) {
            var Id = parseInt(i + 1);

            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px">' + slno + '</td><td style="padding-left:5px">' + ($('#txtproduct' + Id).val()).substring(0, 13) + '</td><td colspan=4 style="padding-left:5px">' + ($('#ProductDesc' + Id).val()).substring(0, 24) + '</td><td style="padding-left:5px">' + $('#select_location' + Id + ' :selected').text() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtrate' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtamnt' + Id).val() + '</td></tr>');
                slno++;
                TotQty += parseFloat($('#txtquantity' + Id).val() || 0);
                total += parseFloat($('#txtamnt' + Id).val() || 0)
            }
            if (Rowcount % 38 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=10></td></tr>');
            }
        }
        for (var a = 1; a <= 38 - Rowcount; a++) {
            //myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
            // myWindow.document.write('<tr style="opacity:0"><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td  style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td align=center>1</td><td align=right style="padding-right:5px">1</td></tr>');
            myWindow.document.write('<tr ><td style="padding-left:5px">&#160;</td><td style="padding-left:5px"></td><td colspan=4 style="padding-left:5px"></td><td style="padding-left:5px"></td><td align=center></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td></tr>');

        }





        myWindow.document.write('<tr style="border-right:1px solid black;"><td style="border-right:1px solid white;"></td><td style="border-right:1px solid white;"colspan=3><tr style="border-top:1px solid black;"><td colspan=4 style="border-right:1px solid white;"></td><td align=center style="border-right:1px solid white;" > </td><td colspan=4 style="border-right:1px solid white;" align=right>Total value of goods excluding tax</td><td align=right style="">' + $('#TotalTaxable').val() + '</td></tr><tr style="border-top:1px solid black;"><td colspan=4 style="border-right:1px solid white;"></td><td align=center style="border-right:1px solid white;" > </td><td colspan=4 style="border-right:1px solid white;" align=right>Total Quantity</td><td align=right style="">' + $('#TotalPdtQty').val() + '</td></tr><tr style="border-top:1px solid black;"><td colspan=4 style="border-right:1px solid white;"></td><td align=center style="border-right:1px solid white;" > </td><td colspan=4 style="border-right:1px solid white;" align=right>Total Value</td><td align=right style="">' + $('#gndtotal').text() + '</td></tr><tr style="border-top:1px solid black;"><td colspan=4 style="border-right:1px solid white;"></td><td align=center style="border-right:1px solid white;" > </td><td colspan=4 style="border-right:1px solid white;" align=right>Cash Received</td><td align=right style="">' + $('#gndtotal').text() + '</td></tr>');
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var today1 = new Date();
        var time = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
        myWindow.document.write('<table width=100%><tr></tr><tr></tr><tr></tr><tr></tr>');

        myWindow.document.write('<tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr><td>Received By.</td></tr><tr><td align=right>Time:  ' + time + '</td></tr><tr><td align=right>Date: ' + date + ' </td></tr>');


        myWindow.print();
    }



    //NEW PRINT FUCTION FOR AUTOPARTS
    function PrintthisBillForAUTOPARTSLazor(Rowlen, flag) {
        var myWindow = window.open("", "", "width=1500,height=1500");
        var AmountinWords = convertNumberToWords($('#GrandTotal').val())
        var TotQty = 0;
        var total = 0;
        var RBillNo = '';
        var Rowcount = 12;
        var PayType = '';
        if ($('#typecash').prop("checked")) {
            PayType = 'Cash';
        }
        else if ($('#typecredit').prop("checked")) {
            PayType = 'Credit';
        }
        var divToPrint = document.getElementById("barcode1");



        //var address = ($('#txtaddress').val()).substr(0, 60);

        if (flag == 0)
            RBillNo = $('#savedbillno').val();
        else if (flag == 1)
            RBillNo = $('#txtBillSlNocopy').val();



        //myWindow.document.write('<table  frame="box"  style="font-size:85%;margin-top:10px" width=100%><tr><td align=left colspan=6>' + $('#txtcustomer').val() + '</td><td  align=left style="padding-left:12%">Sales Ret No </td><td  align=left > : </td><td align=left style="padding-left:1%">' + RBillNo + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Ret Date </td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#txtivdate').val() + '</td></tr><tr><td align=left colspan=6></td><td  align=left style="padding-left:12%">Invoice No.</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_transfer').val() + '</td></tr><tr><td align=left colspan=6>' + $('#txtaddress').val() + '</td><td  align=left style="padding-left:12%">Salesman</td><td  align=left > : </td><td align=left style="padding-left:1%">' + $('#select_salesman').find("option:selected").text() + '</td></tr><tr><td align=left colspan=3>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td><td align=left colspan=3>Fax : ' + window.CompanySettingsArray.Fax + '</td><td  align=left style="padding-left:12%">LPO </td><td  align=left > : </td><td></td></tr>');
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);
        myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align="right"  >' + (ComapnydivToPrint.outerHTML) + '</td></tr>');

        myWindow.document.write('<table width=100% ><tr> <td width=50%>');
        myWindow.document.write('<table width=100% ><tr style=text-align:left><td style="" class=txbld>' + window.CompanySettingsArray.CompanyName + '</td></tr>' +
            '<tr style=text-align:left><td style="">Mobile:' + window.CompanySettingsArray.PhoneNo + '</td></tr>' +
            '<tr style=text-align:left><td style="">TRN:' + window.CompanySettingsArray.TRNNo + '</td></tr>' +
            '<tr style=text-align:left><td style="">Fax:' + window.CompanySettingsArray.Fax + '</td></tr>' +
            '<tr class= style=text-align:center><td class=brtd1>Recieved with thanks from ' + $('#txtcustomer').val() + '</td></tr>' +
            '<tr style=text-align:left><td style="">Mobile:' + $('#CustPhnNew').val() + '</td></tr>' +
            '<tr style=text-align:left><td style="">TRN:' + $('#txtlpono').val() + '</td></tr>' +
            '</table></td>' +

            '<td width=50%><table width=100% ><tr><td>' +
            '<table width=100%; style="text-align:right ;"><tr class= style=text-align:right><td class=txbld>Sales Invoice</td></tr><tr><td class=brtd1>Remittance details</td></tr><tr><td class=brtd1>Bill No:' + RBillNo + '</td></tr><tr><td class=brtd1>Date:' + $('#txtivdate').val() + '</td></tr><tr><td class=class=brtd1>Pay Type :' + PayType + '</td></tr><tr><td class=brtd1>Amount : ' + $('#gndtotal').text() + '</td></tr></table>' +
            '</td></tr></table></td></tr></table>');



        myWindow.document.write(' <table border-collapse:collapse; border=1 rules=cols style="border:1px solid black;"width=100%>');

        myWindow.document.write('<tr style="border:1px solid black;background-color:#D3D3D3"><td   style="padding-left:5px">Sl#</td><td style="padding-left:5px;margin:20px">Code</td><td colspan=4 style="padding-left:5px;margin:20px">Description</td><td style="padding-left:5px;margin:20px">Location</td><td align=center style="margin:20px">Qty</td><td align=right style="padding-right:5px;margin:20px">Price</td><td align=right style="padding-right:5px;padding:20px">AMOUNT</td></tr>');


        var slno = 1;
        for (var i = 0; i <= Rowlen ; i++) {
            var Id = parseInt(i + 1);

            if ($('#txtproduct' + Id).length) {
                Rowcount += 1;
                myWindow.document.write('<tr style="border:1px solid black;"><td style="padding-left:5px">' + slno + '</td><td style="padding-left:5px">' + ($('#txtproduct' + Id).val()).substring(0, 13) + '</td><td colspan=4 style="padding-left:5px">' + ($('#ProductDesc' + Id).val()).substring(0, 24) + '</td><td style="padding-left:5px">' + $('#select_location' + Id + ' :selected').text() + '</td><td align=center>' + $('#txtquantity' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtrate' + Id).val() + '</td><td align=right style="padding-right:5px">' + $('#txtamnt' + Id).val() + '</td></tr>');
                slno++;
                TotQty += parseFloat($('#txtquantity' + Id).val() || 0);
                total += parseFloat($('#txtamnt' + Id).val() || 0)
            }
            if (Rowcount % 38 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=250px colspan=10></td></tr>');
            }
        }
        for (var a = 1; a <= 38 - Rowcount; a++) {
            //myWindow.document.write('<tr><td  colspan=17>&#160;</td></tr>');
            // myWindow.document.write('<tr style="opacity:0"><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td  style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td style="padding-left:5px">1</td><td align=center>1</td><td align=right style="padding-right:5px">1</td></tr>');
            myWindow.document.write('<tr ><td style="padding-left:5px">&#160;</td><td style="padding-left:5px"></td><td colspan=4 style="padding-left:5px"></td><td style="padding-left:5px"></td><td align=center></td><td align=right style="padding-right:5px"></td><td align=right style="padding-right:5px"></td></tr>');


        }
        myWindow.document.write('<tr style="border-top:1px solid grey;"><td colspan=6 font-size: 13px;"></td><td></td><td></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>Sub Total</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
        myWindow.document.write('<tr><td colspan=6 font-size: 13px;"></td><td></td><td></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>VAT 5%</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTax').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
        myWindow.document.write('<tr><td colspan=6 font-size: 13px;"></td><td></td><td></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>Discount</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalDiscount').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
        myWindow.document.write('<tr><td colspan=6 font-size: 13px;"></td><td></td><td></td><td style="font-family:tahoma;font-size: 10px;border-left:1px solid grey;" align=center ><b>Taxable Amount</b></td><td style="font-family:tahoma; font-size: 10px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#TotalTaxable').val() || 0).toFixed(Decimal)) + '</b></td></tr>');
        myWindow.document.write('<tr style="border:1px solid black;" class=><td colspan=6 font-size: 13px;" align=center style="font-weight:bold">' + AmountinWords + '</td><td></td><td></td><td style="font-family:tahoma;font-size: 13px;border-left:1px solid grey;" align=center ><b>Total</b></td><td style="font-family:tahoma; font-size: 13px;border-left:1px solid grey;"  align=right ><b>' + addCommas(parseFloat($('#gndtotal').text()).toFixed(Decimal)) + '</b></td></tr>');
        myWindow.document.write('</table>');
        myWindow.document.write('<table style="font-size:80%;"  width=100%><tr><td colspan=8 ><div style="height:30px;margin-top:20px" class=txbld>Receiver Signature</div></td><td colspan=8><div  style="height:30px;margin-top:40px" class=txbld>Manager Signature</div></td><td colspan=8><div style="height:30px;margin-top:40px" class=txbld>Accountant Signature</div></td></tr> <tr><td colspan=8><div style="height:40px;border: 1px solid black;text-align:center;"><div style="margin-top:15px;color:black">_____________________________</div></div></td><td colspan=8 ><div style="height:40px ;border: 1px solid black; text-align:center;"><div style = "margin-top:15px;color:blade">_____________________________</div></div></td><td colspan=8 ><div style="height:40px; border: 1px solid black; text-align:center;"><div style="margin-top:15px;color:black">_____________________________</div></div></td></tr></table>');


        myWindow.print();
    }