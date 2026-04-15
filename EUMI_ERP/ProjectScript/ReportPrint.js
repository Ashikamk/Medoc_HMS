//05/02/2019

//Flag -Purchase or sales or return
//Rowlen-length of item list
var ComapnydivToPrint = document.getElementById("ComapnyImage");

function addCommas(x) {
    var amt = x || 0;
    var parts = amt.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function PrintthisReportWindows(Flag, Rowlen, Type) {
    if (Flag == 'PURCHASEREPORT') {
        PrintthisPurchaseReport(Rowlen)
    }
    else if (Flag == 'ACCOUNTSREPORT') {
        PrintthisAccountsReport(Rowlen)
    }
    else if (Flag == 'RegistrationREPORT') {
        PrintthisRegistrationReport(Rowlen)
    }
    else if (Flag == 'RevisitREPORT') {
        PrintthisRegistrationReport(Rowlen)
    }
    else if (Flag == 'LABBillREPORT') {
        PrintthisLabBillReport(Rowlen)
    }
    else if (Flag == 'PROCEDUREBillREPORT') {
        PrintthisProcedureBillReport(Rowlen)
    }
    else if (Flag == 'IPBillREPORT') {
        PrintthisLabBillReport(Rowlen)
    }
    else if (Flag == 'LABITEMREPORT') {
        PrintthisLabItemReport(Rowlen)
    }
    else if (Flag == 'ACCOUNTSREPORTNew') {
        PrintthisAccountStatementNew(Rowlen)
    }
    else if (Flag == 'OUTSTANDINGREPORT') {
        PrintthisOutstandingReportSP(Rowlen)
    }
    else if (Flag == 'OUTSTANDINGREPORTNew') {
        PrintthisOutstandingStatementNew(Rowlen)
    }
    else if (Flag == 'OUTSTANDINGREPORTUsedCars') {
        PrintthisOutstandingReportUsedcars(Rowlen)
    }
    else if (Flag == 'AgeingAccountStatement') {
        PrintthisAgeingAccountStatement(Rowlen)
    }
    else if (Flag == 'OUTSTANDINGREPORTSummary') {
        PrintthisOutstandingReportSUMMARY(Rowlen)
    }
    else if (Flag == 'OUTSTANDINGREPORTSummaryNew') {
        PrintthisOutstandingReportSUMMARYNew(Rowlen)
    }
    else if (Flag == 'STOCKDETAILEDREPORT') {
        PrintthisStockDetailedReport(Rowlen)
    }
    else if (Flag == 'DailyTransaction') {
        PrintthisDailyTransactionReport(Rowlen)
    }
    else if (Flag == 'CASHPAYMENTRECEIPT') {
        PrintthisCashPaymentReceiptReport(Rowlen)
    }
    else if (Flag == 'LocationTransferMAIN') {
        PrintthisLocationTransferMAINReport(Rowlen)
    }
    else if (Flag == 'ContainerReport') {
        PrintthisContainerReport(Rowlen)
    }
    else if (Flag == 'LocationTransferUsedCars') {
        PrintthisLocationTransferUsedCarsReport(Rowlen)
    }

    else if (Flag == 'SALESREPORT') {
        PrintthisSalesReport(Rowlen)
    }

    else if (Flag == 'ITEMWISEREPORT') {
        PrintthisItemwiseReport(Rowlen)
    }
    else if (Flag == 'VOCHERWISEACCOUNTSREPORT') {
        PrintthisVocherwiseReportNew(Rowlen)
    }
    else if (Flag == 'ACCOUNTSREPORT2') {
        AccountStatementreport(Rowlen)
    }
    else if (Flag == 'PurchaseAnalysis') {
        PurchaseAnalysisreport(Rowlen)
    }
    else if (Flag == 'Suplierwisereport') {
        Suplierwisepurchase(Rowlen)
    }
    else if (Flag == 'TRIALBALNCE') {
        PrintthisTrialBalance(Rowlen, Type)
    }
    else if (Flag == 'PROFITANDLOSS') {
        PrintthisProfitandLoss(Rowlen, Type)
    }
    else if (Flag == 'BALANCESHEET') {
        PrintthisBalanceSheet(Rowlen, Type)
    }

    else if (Flag == 'LANDLORD') {
        PrintthisLandLord(Rowlen)
    }
    else if (Flag == 'TENANTDETAILSWITHPDC') {
        PrintthisTenantDetailswithPDC(Rowlen)
    }
    else if (Flag == 'Flat') {
        PrintthisFlats(Rowlen)
    }
    else if (Flag == 'TenantVilla') {
        PrintthisTenantVilla(Rowlen)
    }
    else if (Flag == 'PDCLIST') {
        PrintthisPDCList(Rowlen)
    }

    else if (Flag == 'VacantFlat') {
        PrintthisVacantFlatLossAnalysis(Rowlen)
    }
    else if (Flag == 'LEASECONTRACTDETAILS') {
        PrintthisLeaseContractDetails(Rowlen)
    }
    else if (Flag == 'DEFERREDINCOMESTATEMNT') {
        PrintthisDeferredIncomeStmnt(Rowlen)
    }
    else if (Flag == 'GRATUITYREPORT') {
        PrintthisGratuityReport(Rowlen)
    }
    else {
        alert('Path:reportprint.js')
    }

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
    mywindow.document.write('<tr><td width="70%"  colspan="3" >Bank Details    :</td><td colspan="2"></td><td align="right"></td><td align="right">' + Rate.toFixed(2) + '</td></tr>');
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

function PrintthisRegistrationReport(Rowlen) {
   
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center class=brtd1 width=10%><b>Reg. No</b></td><td align=center class=brtd1 width=8% style="padding-left:5px"><b>Date</b></td><td align=center class=brtd1 width=20%><b>Patient</b></td><td align=center class=brtd1 width=20%><b>Doctor</b></td><td align=center class=brtd1 width=5%><b>Age</b></td><td align=right class=brtd1 width=10%><b>Reg Fee</b></td><td align=right class=brtd1 width=10% style="padding-left:5px"><b>Consult Fee</b></td><td align=right class=brtd1 width=10%><b>Other Fee</b></td></tr>');
  
    for (var i = 1; i <= Rowlen; i++) {

    
        if ($('#Col4_' + i).text() == 'Total') {
            // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
            myWindow.document.write('<tr  style="background-color:#cfd8dc;border:2px solid black"><td class=brtd1></td><td align=center style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td  class=brtd1 align=center>' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px"><b>' + $('#Col4_' + i).text() + '</b></td><td    align=left class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=right class=brtd1><b>' + $('#Col7_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col8_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col9_' + i).text() + '</b></td></tr>');
        }

        else {
            myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td align=center style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td class=brtd1 align=center>' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td   align=leftr class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col7_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col9_' + i).text() + '</td></tr>');

        }
      

    }
    //myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();

}
function PrintthisRevisitReport(Rowlen) {
   
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center class=brtd1 width=10%><b>Revisit No</b></td><td align=center class=brtd1 width=10% style="padding-left:5px"><b>Date</b></td><td align=center class=brtd1 width=30%><b>Patient</b></td><td align=center class=brtd1 width=30%><b>Doctor</b></td><td align=center class=brtd1 width=5%><b>Age</b></td><td align=right class=brtd1 width=5%><b>Reg Fee</b></td><td align=right class=brtd1 width=5% style="padding-left:5px"><b>Consult Fee</b></td><td align=right class=brtd1 width=5%><b>Other Fee</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {


        if ($('#Col4_' + i).text() == 'Total') {
            // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
            myWindow.document.write('<tr  style="background-color:#cfd8dc;border:2px solid black"><td class=brtd1></td><td align=center style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=center class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=center class=brtd1 style="padding-left:5px"><b>' + $('#Col4_' + i).text() + '</b></td><td  align=center class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=right class=brtd1><b>' + $('#Col7_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col8_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col9_' + i).text() + '</b></td></tr>');
        }

        else {
            myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td align=center style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=center class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=center class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col7_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col9_' + i).text() + '</td></tr>');

        }


    }
    //myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();

}
function PrintthisLabItemReport(Rowlen) {
  
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center class=brtd1 width=10%><b>Bill No.</b></td><td align=center class=brtd1 width=10%><b>Date</b></td><td align=center class=brtd1 width=40%><b>Name</b></td><td align=right class=brtd1 width=10% style="padding-left:5px"><b>Rate</b></td><td align=right class=brtd1 width=10%><b>Outside Rate</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
       
            if ($('#Col4_' + i).text() == 'Total') {
                // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<b ><tr  style="background-color:#cfd8dc;border:2px solid black;font-weight:bold"><td class=brtd1></td><td align= center style="padding-left:5px" class=brtd1><b>' + $('#Col2_' + i).text() + '</td><td align=center class=brtd1>' + $('#Col3_' + i).text() + '</td><td align= center class=brtd1 style="padding-left:5px"><b>' + $('#Col4_' + i).text() + '</b></td><td  align=right class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col6_' + i).text() + '</b></td></tr></b>');
            }

            else {
                myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td align=center style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=center class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=center class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align= right class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col6_' + i).text() + '</td></tr>');

            }
     
    }
    //myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();
 
}

function PrintthisLabBillReport(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center  class=brtd1 width=8%><b>Bill No</b></td><td align=center  class=brtd1 width=7% style="padding-left:5px"><b>Reg No</b></td><td align=center  class=brtd1 width=7%><b>IP No</b></td><td align=center  class=brtd1 width=10%><b>Bill Date</b></td><td align=center  class=brtd1 width=15%><b>Patient</b></td><td align=center  class=brtd1 width=15%><b>Doctor</b></td><td align=center  class=brtd1 width=8%><b>Type</b></td><td align=right class=brtd1 width=6%><b>Discount</b></td><td align=right class=brtd1 width=11% style="padding-left:5px"><b>Lab Amount</b></td><td align=right class=brtd1 width=12%><b>Total Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {

        if ($('#Col3_' + i).text() == 'Total') {
            // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
            myWindow.document.write('<b><tr  style="background-color:#cfd8dc;border:2px solid black;font-weight:bold"><td align=center  class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1><b>' + $('#Col3_' + i).text() + '</b></td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1><b>' + $('#Col9_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col10_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col11_' + i).text() + '</b></td></tr></b>');
        }

        else {
            myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col9_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col10_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col11_' + i).text() + '</td></tr>');

        }

        //else
        //{
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
    //myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();

}
function PrintthisProcedureBillReport(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center  class=brtd1 width=8%><b>Bill No</b></td><td align=center  class=brtd1 width=7% style="padding-left:5px"><b>Reg No</b></td><td align=center  class=brtd1 width=7%><b>IP No</b></td><td align=center  class=brtd1 width=10%><b>Bill Date</b></td><td align=center  class=brtd1 width=15%><b>Patient</b></td><td align=center  class=brtd1 width=15%><b>Doctor</b></td><td align=center  class=brtd1 width=8%><b>Type</b></td><td align=right class=brtd1 width=6%><b>Discount</b></td><td align=right class=brtd1 width=11% style="padding-left:5px"><b>Lab Amount</b></td><td align=right class=brtd1 width=12%><b>Total Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
       

        if ($('#Col3_' + i).text() == 'Total') {
            // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
            myWindow.document.write('<b><tr  style="background-color:#cfd8dc;border:2px solid black;font-weight:bold"><td align=center  class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1><b>' + $('#Col3_' + i).text() + '</b></td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1><b>' + $('#Col9_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col10_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col11_' + i).text() + '</b></td></tr></b>');
        }

        else {
            myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col9_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col10_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col11_' + i).text() + '</td></tr>');

        }

        //else
        //{
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
   // myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();

}
function PrintthisIPBillReport(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center  class=brtd1 width=8%><b>Bill No</b></td><td align=center  class=brtd1 width=7% style="padding-left:5px"><b>Reg No</b></td><td align=center  class=brtd1 width=7%><b>IP No</b></td><td align=center  class=brtd1 width=10%><b>Bill Date</b></td><td align=center  class=brtd1 width=15%><b>Patient</b></td><td align=center  class=brtd1 width=15%><b>Doctor</b></td><td align=center  class=brtd1 width=8%><b>Type</b></td><td align=right class=brtd1 width=6%><b>Discount</b></td><td align=right class=brtd1 width=11% style="padding-left:5px"><b>Lab Amount</b></td><td align=right class=brtd1 width=12%><b>Total Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {

        if ($('#Col3_' + i).text() == 'Total') {
            // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
            myWindow.document.write('<b><tr  style="background-color:#cfd8dc;border:2px solid black;font-weight:bold"><td align=center  class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1><b>' + $('#Col3_' + i).text() + '</b></td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1><b>' + $('#Col9_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col10_' + i).text() + '</b></td><td  align=right class=brtd1><b>' + $('#Col11_' + i).text() + '</b></td></tr></b>');
        }

        else {
            myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td  align=center  class=brtd1 >' + $('#Col5_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col6_' + i).text() + '</td><td align=center  class=brtd1>' + $('#Col7_' + i).text() + '</td><td align=center  style="padding-left:5px" class=brtd1>' + $('#Col2_' + i).text() + '</td><td align=left class=brtd1>' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td  align=center  class=brtd1>' + $('#Col8_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col9_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col10_' + i).text() + '</td><td  align=right class=brtd1>' + $('#Col11_' + i).text() + '</td></tr>');

        }

        //else
        //{
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
   // myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();

}

function PrintthisPurchaseReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;font-size:18px}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    //myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    //myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');


    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"><tr style="border:1px solid black;"><td align=center  class=brtd1 width=2%><b>Sl#</b></td><td align=center class=brtd1 width=2%><b>Inv.#</b></td><td align=left class=brtd1 width=2% style="padding-left:5px"><b>Sup.Inv.#</b></td><td align=center class=brtd1 width=6%><b>Date</b></td><td align=left class=brtd1 width=40% style="padding-left:5px"><b>Supplier Name</b></td><td align=right style="padding=right:5px" class=brtd1 width=10%><b>Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#Col1_' + i).text() == '') {
                // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border:1px solid black"><td class=brtd1></td><td align=left class=brtd1>' + $('#Col1_' + i).text() + '</td><td align=left class=brtd1>' + $('#Col1x_' + i).text() + '</td><td  align=left class=brtd1 style="padding-left:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td align=left class=brtd1 style="padding=left:10px"><b>' + $('#Col5_' + i).text() + '</b></td><td align=right style="padding=right:5px" class=brtd1><b>' + $('#Col15_' + i).text() + '</b></td></tr>');
            }

            else {
                myWindow.document.write('<tr><td align=center class=brtd1>' + i + '</td><td align=center class=brtd1>' + $('#Col1_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col1x_' + i).text() + '</td><td  align=center class=brtd1 >' + $('#Col3_' + i).text() + '</td><td align=left class=brtd1 style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td align=right style="padding-right:5px" class=brtd1>' + $('#Col15_' + i).text() + '</td></tr>');

            }
        }
        //else
        //{
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
    myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=9></td></tr></tfoot>')
    myWindow.print();
}

function PrintthisItemwiseReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css"> </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');
    // myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');
    myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}


    myWindow.document.write('<table bordercolor="1 px solid black" frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;"><tr style="border-bottom:1px solid black"><td class=brtd1 align=center><b>Sl#</b></td><td class=brtd1 align=center width=10px><b>Type</b></td><td class=brtd1 align=center width=60px><b>Bill#</b></td><td class=brtd1 align=center width=10px><b>Date</b></td><td class=brtd1 align=center width=10px><b>Account#</b></td><td class=brtd1 align=left width=100px  style="padding-left:5px"><b>Customer</b></td><td class=brtd1 align=left width=100px style="padding-left:5px"><b>Item Code</b></td><td class=brtd1 align=left width=150px style="padding-left:5px"><b>Item Name</b></td><td class=brtd1 align=center width=10px><b>Qty.</b></td><td class=brtd1 align=right width=10px><b>Rate</b></td><td class=brtd1 align=right width=10px><b>Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#Col3_' + i).text() == 'Grand Total') {
                // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border:1px solid black"><td style="display:none">' + i + '</td><td class=brtd1></td><td class=brtd1  align=left>' + $('#Col1_' + i).text() + '</td><td class=brtd1></td><td class=brtd1 align=left><b>' + $('#Col3_' + i).text() + '</b></td><td class=brtd1 align=left>' + $('#Col4_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd1 align=center><b>' + $('#Col8_' + i).text() + '</b></td><td class=brtd1 align=right>' + $('#Col10_' + i).text() + '</td><td class=brtd1 align=right><b>' + $('#Col9_' + i).text() + '</b></td></tr>');
            }

            else {
                myWindow.document.write('<tr><td class=brtd1 align=center>' + i + '</td><td class=brtd1  align=center>' + $('#Col1_' + i).text() + '</td><td class=brtd1 align=center>' + $('#Col2x_' + i).text() + '</td><td class=brtd1 align=left>' + $('#Col3_' + i).text() + '</td><td class=brtd1 align=left>' + $('#Col4_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd1 align=center>' + $('#Col8_' + i).text() + '</td><td class=brtd1 align=right>' + $('#Col10_' + i).text() + '</td><td class=brtd1 align=right>' + $('#Col9_' + i).text() + '</td></tr>');

            }
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
    myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();
}




function PrintthisSalesReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css"> </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;} .brtr{border:1px solid black;font-weight:bold}  </style>');
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');

    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');


    myWindow.document.write('<table bordercolor="1 px solid black" frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;" ><tr style="border-bottom:1px solid black"><td class=brtd1 align=center><b>Sl#</b></td><td class=brtd1 align=center  width=10px><b>Type</b></td><td class=brtd1 align=left width=10px><b>Dept.code</b></td><td class=brtd1 align=center width=60px><b>Bill#</b></td><td class=brtd1 align=center width=10px><b>Date</b></td><td class=brtd1 align=center width=60px><b>Account#</b></td><td class=brtd1 align=left style="padding-left:5px" width=200px><b>Patient</b></td><td class=brtd1 align=center width=200px><b>Doctor</b></td><td class=brtd1 align=right width=10px><b>Total Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#Col3_' + i).text() == 'Grand Total') {
                // myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border:1px solid black"><td style="display:none;padding-left:2px">' + i + '</td><td class=brtd1></td><td class=brtd1  align=center style="padding-left:2px">' + $('#Col9_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col7x_' + i).text() + '</td><td class=brtd1></td><td class=brtd1 align=center style="padding-left:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td class=brtd1 align=center style="padding-left:1px;padding-right:2px">' + $('#Col8x_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd1 align=right><b>' + $('#Col6_' + i).text() + '</b></td></tr>');
            }

            else {
                myWindow.document.write('<tr><td class=brtd1 border-left align=center style="padding-left:2px">' + i + '</td><td class=brtd1 border-left align=center  style="padding-left:2px">' + $('#Col9_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col7x_' + i).text() + '</td><td class=brtd1 align=center style="padding-left:1px;padding-right:2px">' + $('#Col2x_' + i).text() + '</td><td class=brtd1 align=center style="padding-left:2px;padding-right:2px">' + $('#Col3_' + i).text() + '</td><td class=brtd1 align=center style="padding-left:1px;padding-right:2px">' + $('#Col8x_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td class=brtd1 align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd1 align=right>' + $('#Col6_' + i).text() + '</td></tr>');

            }
        }
        //else {
        //    myWindow.document.write('<tr><td class=brtd1 height="30px"  colspan=11></td></tr>');
        //}
    }
    myWindow.document.write('<tfoot style="border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();
}
function PrintthisVocherwiseReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");

    var type = $('#VoucherType').find("option:selected").html();
    var vouchertype = {}, Currenttype = '';

    if ($('#VoucherType').val() != 0) {
        vouchertype = type.split('-');
        Currenttype = vouchertype[1];

    }
    else {
        Currenttype = 'All Vouchers';
    }

    myWindow.document.write('<table width=94%<tr><td><h4 align=center><u>' + Currenttype + '</u></h4></td></tr>')
    myWindow.document.write('<table style="font-size:75%;" width=98%<tr><td align=center>FromDate : ' + $('#DateFrom').val() + ' , ToDate : ' + $('#DateTo').val() + '</td></tr>')


    myWindow.document.write('<table style="border-collapse:collapse;font-size:75%;margin-top:10px;border-top:1px solid black;border-bottom:1px solid black"  width=100%><tr style="border-bottom:1px solid black;"><td align=left><b>Account#</b></td><td align=left><b>Accoun Head</b></td><td align=left><b>Description</b></td><td align=left><b>Ref</b></td><td align=left><b>Debit</b></td><td align=right><b>credit</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {

        if ($('#ResultLength').val()) {
            var cr = '', dr = '';
            if ($('#Col7_' + i).text() == 'Grand Total') {
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid black;"><td  align=left>' + $('#Col1_' + i).text() + '</td><td align=left>' + $('#Col2_' + i).text() + '</td><td align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left>' + $('#Col4_' + i).text() + '</td><td align=left>' + $('#Col5_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td></tr>');
            }
            else {
                if ($('#Coltype_' + i).text() == 'Credit')
                    cr = $('#Col5_' + i).text();
                else if ($('#Coltype_' + i).text() == 'Debit')
                    dr = $('#Col5_' + i).text();
                myWindow.document.write('<tr><td  align=left>' + $('#Col1_' + i).text() + '</td><td align=left>' + $('#Col2_' + i).text() + '</td><td align=left>' + $('#Col3_' + i).text() + '</td><td align=left>' + $('#Col4_' + i).text() + '</td><td align=left>' + dr + '</td><td align=right>' + cr + '</td></tr><tr><td colspan=11></td></tr>');

            }
        }

    }
    myWindow.print();
}

//Print for Account Statement
function PrintthisAccountsReport(Rowlen) {

    var printline = 6
    $(ComapnydivToPrintLab).css('height', 100); $(ComapnydivToPrintLab).css('width', 700);
    console.log(Rowlen)
    if ($('#btndetail').prop("checked"))                     //Print Detaild
    {

        var myWindow = window.open("", "", "width=1500,height=1500");


        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');

        if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
            myWindow.document.write('<tr><td><div style="position:absolute; left:450px;">To,</div></td></tr>');
            printline += 1;

        }


        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td><td><div style="position:absolute; left:480px;">' + $('#Address1').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td><td><div style="position:absolute; left:480px;">' + $('#Address2').val() + '</div></td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td><td><div style="position:absolute; left:480px;">' + $('#Address3').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td><td><div style="position:absolute; left:480px;">' + $('#Address4').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'ACCOUNT STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');


        myWindow.document.write('<table class="abcd"  frame="box" style="font-size:70%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center width="1%" class=brtd><b>Sl#</b></td><td class=brtd align=left width="6%" style="padding-left:5px"><b>Voucher#</b></td><td class=brtd align=center width="8%"><b>Date</b></td><td class=brtd align=center width="6%"><b>Account#</b></td><td class=brtd align=left style="padding-left:5px" width="24%"><b>Description</b></td><td class=brtd width="4%" style="padding-left:5px"><b>Invoice#</b></td><td class=brtd align=right width="8%" style="padding-right:5px"><b>Debit</b></td><td class=brtd align=right width="8%" style="padding-right:5px"><b>Credit</b></td><td class=brtd align=right width="12%" style="padding-right:5px"><b>Balance</b></td></tr>');
        var sl = 0; tot = 0;
        var Rowcount = 0;
        for (var i = 1; i <= Rowlen; i++) {
            if ($('#ResultLength').val()) {

                if ($('#AccountCodeId').val() == 0) {
                    if ($('#Col4_' + i).text().length == 4) {
                        myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col4_' + i).text() + '- ' + $('#Col5_' + i).text() + '</b></td></tr>');

                        printline += 1;
                    }

                    else if ($('#Col4_' + i).text() != '' && $('#Col1_' + i).text() == '') {
                        myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10  class=brtd align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col5_' + i).text() + '</b></td></tr>');


                        printline += 1;
                    }
                    else if ($('#Col5_' + i).text() == 'TOTAL') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left></td><td  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col1_' + i).text() + '</td><td align=center><b>' + $('#Col4_' + i).text() + '</b></td><td align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col6_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
                        printline += 1;
                    }
                    else if ($('#Col5_' + i).text() == 'OPENING') {
                        myWindow.document.write('<tr><td align=left  class=brtd></td><td  class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center  class=brtd>' + $('#Col1_' + i).text() + '</td><td align=center class=brtd>' + $('#Col4_' + i).text() + '</td><td align=left style="padding-left:5px" class=brtd>' + $('#Col5_' + i).text() + '</td><td align=left style="padding-left:5px" class=brtd>' + $('#Colref_' + i).text() + '</td><td align=right style="padding-right:5px" class=brtd>' + $('#Col7_' + i).text() + '</td><td align=right style="padding-right:5px" class=brtd>' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                    }
                    else if ($('#Col5_' + i).text() == 'GRAND TOTAL') {
                        myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                        myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid gray;border-bottom:1px solid gray;"><td align=left></td><td  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col1_' + i).text() + '</td><td align=center><b>' + $('#Col4_' + i).text() + '</b></td><td align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col6_' + i).text() + '</b></td><td align=right class=brtd style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
                        printline += 1;
                    }

                    else if ($('#Col1_' + i).text() == '' && $('#Col5_' + i).text() != 'TOTAL' && $('#Col5_' + i).text() != 'GRAND TOTAL') {
                        myWindow.document.write('<tr style="display:none"><td class=brtd align=left></td><td class=brtd></td><td class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd  align=center>' + $('#Col1_' + i).text() + '</td><td  class=brtd align=center>' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd  align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                    }
                    else {
                        sl++;
                        myWindow.document.write('<tr><td class=brtd align=center>' + sl + '</td><td class=brtd  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd align=center>' + $('#Col1_' + i).text() + '</td><td  class=brtd align=center>' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text().substring(0, 60) + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                        myWindow.document.write('<tr height=10px><td class=brtd align=center></td><td class=brtd  align=left style="padding-left:5px"></td><td class=brtd align=center></td><td  class=brtd align=center></td><td class=brtd align=left style="padding-left:5px"></td><td class=brtd align=left style="padding-left:5px"></td><td class=brtd align=right style="padding-right:5px"></td><td class=brtd align=right style="padding-right:5px"></td><td class=brtd align=right style="padding-right:5px"></td></tr>');

                    }

                    Rowcount += 1;
                }
                else {
                    if ($('#Col5_' + i).text() == 'TOTAL') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left></td><td  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col1_' + i).text() + '</td><td  align=center><b>' + $('#Col4_' + i).text() + '</b></td><td align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col6_' + i).text() + '</b></td><td align=right style="padding-right:5px"  class=brtd><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
                        printline += 1;
                    }
                    else if ($('#Col5_' + i).text() == 'OPENING') {
                        myWindow.document.write('<tr><td align=left class=brtd></td><td  class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center class=brtd>' + $('#Col1_' + i).text() + '</td><td align=center class=brtd>' + $('#Col4_' + i).text() + '</td><td align=left class=brtd style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                    }
                    else if ($('#Col5_' + i).text() == 'GRAND TOTAL') {
                        myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                        myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid gray;border-bottom:1px solid gray;"><td align=left></td><td  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col1_' + i).text() + '</td><td align=center><b>' + $('#Col4_' + i).text() + '</b></td><td align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col6_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
                        printline += 1;
                    }

                    else if ($('#Col1_' + i).text() == '' && $('#Col5_' + i).text() != 'TOTAL' && $('#Col5_' + i).text() != 'GRAND TOTAL') {
                        myWindow.document.write('<tr style="display:none"><td class=brtd align=left></td><td class=brtd></td><td class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd  align=center>' + $('#Col1_' + i).text() + '</td><td  class=brtd align=center>' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd  align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                    }
                    else {
                        sl++;
                        myWindow.document.write('<tr><td class=brtd align=center>' + sl + '</td><td class=brtd  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd align=center>' + $('#Col1_' + i).text() + '</td><td  class=brtd align=center>' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text().substring(0, 60) + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Colref_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');
                        printline += 1;
                        myWindow.document.write('<tr height=10px><td class=brtd align=center></td><td class=brtd  align=left style="padding-left:5px"></td><td class=brtd align=center></td><td  class=brtd align=center></td><td class=brtd align=left style="padding-left:5px"></td><td class=brtd align=left style="padding-left:5px"></td><td class=brtd align=right style="padding-right:5px"></td><td class=brtd align=right style="padding-right:5px"></td><td class=brtd align=right style="padding-right:5px"></td></tr>');

                    }

                    Rowcount += 1;
                }

                //if (printline % 53 == 0) {
                //    myWindow.document.write('<tr style=""><td colspan=20 style="border-bottom:1px solid black;border-top: 1px solid black;border-left:1px solid white;border-right:1px solid white;" height=135px></td><tr>');

                //}
            }
        }
        //for (var a = 1; a <= 30 - Rowcount; a++) {

        //    myWindow.document.write('<tr><td style="border-left: 0.2px #000000 solid;border-right: 0.2px #000000 solid;font-weight: normal;"  align=center width=59px>&#160;&#160;hjghjghjghjghjghjghghghghjgjhghghghghghghghghghgh</td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" width=103px colspan=2></td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" width=350px colspan=8></td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" align=center width=50px></td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" width=62px align=center></td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" width=80px align=right colspan=2></td><td style="border-right: 0.2px #000000 solid;font-weight: normal;" width=97px align=right colspan=2></td><tr>');

        //}
        myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
        myWindow.print();

    }
    else                         //Print Summary
    {


        var myWindow = window.open("", "", "width=1500,height=1500");

        myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid gray;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}


        myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid gray;} .brtr{border:1px solid gray;font-weight:bold}  </style>');

        myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td><td rowsspan=8 align=right></td></tr> ');

        if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
            myWindow.document.write('<tr><td><div style="position:absolute; left:450px;">To,</div></td></tr>');
        }
        myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
        myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td><td><div style="position:absolute; left:480px;">' + $('#Address1').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td><td><div style="position:absolute; left:480px;">' + $('#Address2').val() + '</div></td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td><td><div style="position:absolute; left:480px;">' + $('#Address3').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td><td><div style="position:absolute; left:480px;">' + $('#Address4').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');

        myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'ACCOUNT STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');

        var sp = ' ';

        myWindow.document.write('<table frame="box" style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td class=brtd1 align=center width="1%"><b>Sl#</b></td><td class=brtd1 align=center width="1%"><b>Code</b></td><td colspan=2 class=brtd1 align=left width="34%" style="padding-left:5px"><b>Account Name</b></td><td class=brtd1 align=right width="4%" style="padding-right:5px"><b>Debit</b></td><td class=brtd1 align=right width="4%" style="padding-right:5px"><b >Credit</b></td></tr>');
        var sl = 0;
        for (var i = 0; i <= Rowlen; i++) {
            if ($('#ResultLength').val() && $('#Colsl_' + i).text() != '') {
                if ($('#Col3_' + i).text() == '' && $('#Colc_' + i).text() == '') {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;"><td style="display:none;">' + i + '</td><td ></td><td align=center><b>' + $('#Col1_' + i).text() + '</b></td><td style="padding: 0 5px;" align=left colspan=2 ><b>' + $('#Col2_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td  align=right style="padding-right:5px"  class=brtd1><b>' + $('#Colc_' + i).text() + '</b>' + sp + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'Total') {
                    myWindow.document.write('<tr class=brtr style="border-top:1px solid gray;"><td style="display:none;">' + i + '</td><td class=brtd1></td><td class=brtd1 align=center><b>' + $('#Col1_' + i).text() + '</b></td><td class=brtd1 style="padding: 0 5px;" align=left colspan=2 >Closing Balance</td><td class=brtd1 align=right style="padding-right:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td align=right class=brtd1 style="padding-right:5px"><b>' + $('#Colc_' + i).text() + '</b>' + sp + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'GRAND TOTAL') {
                    myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                    myWindow.document.write('<tr   style="background-color:#cfd8dc;border-top:1px solid gray;"><td></td><td align=center><b>' + $('#Col1_' + i).text() + '</b></td><td style="padding: 0 5px;" colspan=2  align=left><b>' + $('#Col2_' + i).text() + '</b></td><td align=right style="padding-right:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td class=brtd1 align=right style="padding-right:5px"><b>' + $('#Colc_' + i).text() + '</b>' + sp + '</td></tr>');
                }
                else {
                    sl++;
                    myWindow.document.write('<tr><td class=brtd1 align=center>' + sl + '</td><td  class=brtd1  align=center >' + $('#Col1_' + i).text() + '</td><td class=brtd1 style="padding: 0 5px;" align=left colspan=2 >' + $('#Col2_' + i).text() + '</td><td class=brtd1 align=right style="padding-right:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd1  align=right style="padding-right:5px">' + $('#Colc_' + i).text() + '</td></tr>');
                }
            }
        }
        myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')

        myWindow.print();

    }

}

function PrintthisOutstandingReportUsedcars(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');

    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></tr> ');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<tr><td><div style="position:absolute; left:450px;">To,</div></td></tr>');
    }

    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td><td><div style="position:absolute; left:480px;">' + $('#Address1').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td><td><div style="position:absolute; left:480px;">' + $('#Address2').val() + '</div></td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td><td><div style="position:absolute; left:480px;">' + $('#Address3').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td><td><div style="position:absolute; left:480px;">' + $('#Address4').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'OUTSTANDING STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');


    myWindow.document.write('<table bordercolor="1 px solid black" frame="box"   style="font-size:75%;margin-top:10px;border-collapse:collapse;border-spacing: 0px;border-color:1px solid black;"  width=100%><tr><td align=left width=2% style="border-right: solid 1px black;"><b>Sl#</b></td><td align=left width=3% style="border-right: solid 1px black;"><b>&nbsp;Voucher#</b></td><td align=center width=10% style="border-right: solid 1px black;"><b>Date</b></td><td align=center width=10% style="border-right: solid 1px black;"><b>Code</b></td><td align=left width=30% style="border-right: solid 1px black;"><b>&nbsp;Description</b></td><td align=right width=13% style="border-right: solid 1px black;"><b>Invoice Amount&nbsp;</b></td><td align=right width=13% style="border-right: solid 1px black;"><b>Pending Amount&nbsp;</b></td><td align=right width=13% style="border-right: solid 1px black;"><b>Balance&nbsp;</b></td></tr>');

    var con = 1;

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {


            if ($('#Col4_' + i).text() == 'Total') {
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid black;"><td align=left style="border-right: solid 1px black;"></td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;"></td><td align=left style="border-right: solid 1px black;"><b>&nbsp;' + $('#Col4_' + i).text() + '</b></td><td  align=right style="border-right: solid 1px black;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col5_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col6_' + i).text() + '&nbsp;</b></td></tr>');

            }
            else if ($('#Col4_' + i).text() == 'Opening') {
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid black;"><td align=left style="border-right: solid 1px black;"></td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col3_' + i).text() + '</td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col4_' + i).text() + '</td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px black;">' + $('#Col5_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px black;">' + $('#Col6_' + i).text() + '&nbsp;</td></tr>');

            }
            else if ($('#Col1_' + i).text() == '' && $('#Col4_' + i).text() != 'Grand Total') {

                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid black;margin-top:20px;"><td align=left style="border-right: solid 1px black;"></td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;"><b>' + $('#Col3_' + i).text() + '</b></td><td align=left style="border-right: solid 1px black;"><b>&nbsp;' + $('#Col4_' + i).text() + '</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px black;"><b>' + $('#Col5_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col6_' + i).text() + '&nbsp;</b></td></tr>');


            }
            else if ($('#Col4_' + i).text() == 'Grand Total') {

                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-bottom:1px solid black;"><td align=left style="border-right: solid 1px black;"></td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col3_' + i).text() + '</td><td align=left style="border-right: solid 1px black;"><b>&nbsp;' + $('#Col4_' + i).text() + '</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px black;"><b>' + $('#Col5_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px black;"><b>' + $('#Col6_' + i).text() + '&nbsp;</b></td></tr>');
            }

            else {
                myWindow.document.write('<tr><td align=left style="border-right: solid 1px black;">' + con + '</td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px black;">' + $('#Col3_' + i).text() + '</td><td align=left style="border-right: solid 1px black;">&nbsp;' + $('#Col4_' + i).text().substring(0, 60) + '</td><td align=right style="border-right: solid 1px black;">' + $('#Col7_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px black;">' + $('#Col5_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px black;">' + $('#Col6_' + i).text() + '&nbsp;</td></tr>');
                con++;
            }

        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }
    }


    if ($('#AccountCodeId').val() != 0) {
        myWindow.document.write('<table bordercolor="1 px solid black" frame="box"   style="font-size:75%;margin-top:75px;border-collapse:collapse;border-spacing: 0px;border-color:1px solid black;"  width=100% height=80px><tr align=center><td align=center><b>30 Days</b></td><td align=center><b>60 Days</b></td><td align=center><b>90 Days</b></td><td align=center><b>120 Days</b></td><td align=center><b>Above 120 Days</b></td></tr>');
    }

    for (var i = 0; i < Rowlen; i++) {
        if ($('#ColD1_' + i).text() != '') {

            myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid black;"><td align=center>' + $('#ColD1_' + i).text() + '</td><td  align=center>' + $('#ColD2_' + i).text() + '</td><td  align=center>' + $('#ColD3_' + i).text() + '</td><td align=center>' + $('#ColD4_' + i).text() + '</td><td  align=center>' + $('#ColD5_' + i).text() + '</td></tr>');
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }


    myWindow.document.write('</table>');

    myWindow.print();
}



function PrintthisAgeingAccountStatement(Rowlen) {


    var slno = 1;
    var myWindow = window.open("", "", "width=1500,height=1500");


    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=100% ><table style="font-size:85%;" width=100%><tr align=center><td>');

    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left height=170px><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left  height=170px><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td style=color:#5c3158>' + $('#Address1').val() + '</td></tr><tr><td class=blclr>' + $('#Address2').val() + '</td></tr><tr><td class=blclr>' + $('#Address3').val() + '</td></tr><tr><td class=blclr>' + $('#Address4').val() + '</td></tr><tr><td class=blclr style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');
    }
    else {
        myWindow.document.write('<table width=100%; style=text-align:left><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    }
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');
    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>AGEING ACCOUNT  STATEMENT</td></tr></table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>' + $('#header2').text() + '</td></tr></table>');
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');

   
        if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
            myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Voucher#</td><td>Date</td><td>Description</td><td align=right>Org.Amount</td><td align=right>App.Amount</td><td align=right>Balance</td></tr>');
        }
        else {
            myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Voucher#</td><td>Date</td><td>Account#</td><td>Description</td><td align=right>Org.Amount</td><td align=right>App.Amount</td><td align=right>Balance</td></tr>');

        }
   
  
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
                if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {

                    if ($('#Col4_' + i).text() == 'Total') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text() == 'Opening') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text().length == 4) {
                        myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col1_' + i).text() == '' && $('#Col4_' + i).text() != 'Total' && $('#Col4_' + i).text() != 'GrandTotal') {
                        myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text() == 'GrandTotal') {
                        myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }

                    else {
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text().substring(0, 60) + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                        slno++;
                    }
                }

                else {
                    if ($('#Col4_' + i).text() == 'Total') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text() == 'GrandTotal') {
                        myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text() != 'Opening' && $('#Col1_' + i).text() == '') {
                        myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10  class=brtd align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col3_' + i).text() + '</b></td></tr>');
                    }
                    else if ($('#Col4_' + i).text() != '' && $('#Col1_' + i).text() == '') {
                        myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td colspan=10  class=brtd align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col3_' + i).text() + '</b></td></tr>');
                    }
                    else if ($('#Col4_' + i).text() == 'Opening') {
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }

                    else if ($('#Col4_' + i).text().length == 8 && $('#Col10_' + i).text() == '') {
                        myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col1_' + i).text() == '' && $('#Col4_' + i).text() != 'Total' && $('#Col4_' + i).text() != 'GrandTotal') {
                        myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                    }
                   

                    else {

                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text().substring(0, 60) + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                        slno++;
                    }

                }
            
      
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



function PrintthisOutstandingReportSP(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');

    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></tr> ');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<tr><td><div style="position:absolute; left:450px;">To,</div></td></tr>');
    }

    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td><td><div style="position:absolute; left:480px;">' + $('#Address1').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td><td><div style="position:absolute; left:480px;">' + $('#Address2').val() + '</div></td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td><td><div style="position:absolute; left:480px;">' + $('#Address3').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td><td><div style="position:absolute; left:480px;">' + $('#Address4').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'OUTSTANDING STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');

    if ($('#AccountCodeId').val() == 0) {
        myWindow.document.write('<table frame="box"   style="font-size:75%;margin-top:10px;border-collapse:collapse;border-spacing: 0px;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center width=2% style="border-right: solid 1px gray;"><b>Sl#</b></td><td align=left width=10% style="border-right: solid 1px gray;"><b>&nbsp;Voucher#</b></td><td align=center width=10% style="border-right: solid 1px gray;"><b>Date</b></td><td align=center width=10% style="border-right: solid 1px gray;"><b>Code</b></td><td align=left width=23% style="border-right: solid 1px gray;"><b>&nbsp;Description</b></td><td align=left width=10% style="border-right: solid 1px gray;"><b>&nbsp;Invoice#</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Debit&nbsp;</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Credit&nbsp;</b></td><td align=right width=19% style="border-right: solid 1px gray;"><b>Balance&nbsp;</b></td></tr>');
    }
    else {
        myWindow.document.write('<table frame="box"   style="font-size:75%;margin-top:10px;border-collapse:collapse;border-spacing: 0px;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center width=2% style="border-right: solid 1px gray;"><b>Sl#</b></td><td align=center width=5% style="border-right: solid 1px gray;"><b>Date</b></td><td align=left width=5% style="border-right: solid 1px gray;"><b>&nbsp;Invoice#</b></td><td align=left width=45% style="border-right: solid 1px gray;"><b>&nbsp;Description</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Amount&nbsp;</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Balance&nbsp;</b></td></tr>');
    }
    var con = 1;

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#AccountCodeId').val() == 0) {

                if ($('#Col6_' + i).text() == 'Total') {
                    //myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td align=left style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;"><b>&nbsp;' + $('#Col6_' + i).text() + '</b></td><td  align=right style="border-right: solid 1px gray;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');
                    myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left ></td><td align=left >&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center></td><td align=left><b>&nbsp;' + 'TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td  align=right ><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'Opening') {
                    myWindow.document.write('<tr><td align=left style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td align=left></td><td align=left>&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center>' + $('#Col4_' + i).text() + '</td><td align=left><b>&nbsp;' + 'GRAND TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'GrandTotal') {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td colspan=10 align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col6_' + i).text() + '</b></td></tr>');


                }


                else {
                    myWindow.document.write('<tr><td align=center style="border-right: solid 1px gray;">' + con + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text().substring(0, 60) + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;">' + $('#Col7_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');
                    con++;
                    myWindow.document.write('<tr height="10px"><td align=center style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;"></td><td  align=center style="border-right: solid 1px gray;"></td><td  align=center style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;"></td><td  align=left  style="border-right: solid 1px gray;"></td><td align=right style="border-right: solid 1px gray;"></td><td align=right style="border-right: solid 1px gray;"></td><td align=right style="border-right: solid 1px gray;"></td></tr>');

                }

            }
            else {

                if ($('#Col6_' + i).text() == 'Total') {
                    myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left ></td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td align=left><b>&nbsp;' + 'TOTAL' + '</b></td><td  align=right ></td><td align=right><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'Opening') {
                    myWindow.document.write('<tr><td align=left style="border-right: solid 1px gray;"></td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col12_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;border-right:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td></tr>');

                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td align=left></td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td align=left><b>&nbsp;' + 'GRAND TOTAL' + '</b></td><td align=right></td><td align=right><b>' + $('#Col12_' + i).text() + '&nbsp;</b></td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'GrandTotal') {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;display:none"><td colspan=8 align=center><b>&nbsp;' + $('#Col6_' + i).text() + '</b></td></tr>');


                }
                else {
                    myWindow.document.write('<tr><td align=center style="border-right: solid 1px gray;">' + con + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text().substring(0, 60) + '</td><td align=right style="border-right: solid 1px gray;">' + $('#Col12_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');
                    con++;
                    myWindow.document.write('<tr height="10px"><td align=center style="border-right: solid 1px gray;"></td><td  align=center style="border-right: solid 1px gray;"></td><td  align=left  style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;"></td><td align=right style="border-right: solid 1px gray;"></td><td align=right style="border-right: solid 1px gray;"></td></tr>');

                }
            }
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }
    }


    if ($('#AccountCodeId').val() != 0) {
        myWindow.document.write('<table frame="box" style="font-size:75%;margin-top:75px" width=100% height=80px><tr align=center><td align=center><b>30 Days</b></td><td align=center><b>60 Days</b></td><td align=center><b>90 Days</b></td><td align=center><b>120 Days</b></td><td align=center><b>Above 120 Days</b></td></tr><tr><td colspan=6><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
    }

    for (var i = 0; i < Rowlen; i++) {
        if ($('#ColD1_' + i).text() != '') {

            myWindow.document.write('<tr><td align=center>' + $('#ColD1_' + i).text() + '</td><td  align=center>' + $('#ColD2_' + i).text() + '</td><td  align=center>' + $('#ColD3_' + i).text() + '</td><td align=center>' + $('#ColD4_' + i).text() + '</td><td  align=center>' + $('#ColD5_' + i).text() + '</td></tr>');
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }

    myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-top:1px solid white;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')

    myWindow.document.write('</table>');
    myWindow.print();
}

function PrintthisOutstandingReport(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');

    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></tr> ');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<tr><td><div style="position:absolute; left:450px;">To,</div></td></tr>');
    }

    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td><td><div style="position:absolute; left:480px;">' + $('#Address1').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td><td><div style="position:absolute; left:480px;">' + $('#Address2').val() + '</div></td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td><td><div style="position:absolute; left:480px;">' + $('#Address3').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td><td><div style="position:absolute; left:480px;">' + $('#Address4').val() + '</div></td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'OUTSTANDING STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');


    myWindow.document.write('<table frame="box"   style="font-size:75%;margin-top:10px;border-collapse:collapse;border-spacing: 0px;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray"><td align=center width=2% style="border-right: solid 1px gray;"><b>Sl#</b></td><td align=left width=10% style="border-right: solid 1px gray;"><b>&nbsp;Voucher#</b></td><td align=center width=10% style="border-right: solid 1px gray;"><b>Date</b></td><td align=center width=10% style="border-right: solid 1px gray;"><b>Code</b></td><td align=left width=23% style="border-right: solid 1px gray;"><b>&nbsp;Description</b></td><td align=left width=10% style="border-right: solid 1px gray;"><b>&nbsp;Invoice#</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Debit&nbsp;</b></td><td align=right width=10% style="border-right: solid 1px gray;"><b>Credit&nbsp;</b></td><td align=right width=19% style="border-right: solid 1px gray;"><b>Balance&nbsp;</b></td></tr>');

    var con = 1;

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#AccountCodeId').val() == 0) {

                if ($('#Col6_' + i).text() == 'Total') {
                    //myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td align=left style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;"><b>&nbsp;' + $('#Col6_' + i).text() + '</b></td><td  align=right style="border-right: solid 1px gray;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');
                    myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left ></td><td align=left >&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center></td><td align=left><b>&nbsp;' + 'TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td  align=right ><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'Opening') {
                    myWindow.document.write('<tr><td align=left style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td align=left></td><td align=left>&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center>' + $('#Col4_' + i).text() + '</td><td align=left><b>&nbsp;' + 'GRAND TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'GrandTotal') {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td colspan=10 align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col6_' + i).text() + '</b></td></tr>');


                }


                else {
                    myWindow.document.write('<tr><td align=center style="border-right: solid 1px gray;">' + con + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;">' + $('#Col7_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');
                    con++;
                }

            }
            else {
                if ($('#Col6_' + i).text() == 'Total') {
                    myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td align=left ></td><td align=left >&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center></td><td align=left><b>&nbsp;' + 'TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td  align=right ><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'Opening') {
                    myWindow.document.write('<tr><td align=left style="border-right: solid 1px gray;"></td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');

                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;border-right:1px solid white;"><td align=left></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;"><td align=left></td><td align=left>&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center>' + $('#Col1_' + i).text() + '</td><td  align=center>' + $('#Col4_' + i).text() + '</td><td align=left><b>&nbsp;' + 'GRAND TOTAL' + '</b></td><td  align=left>&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right><b>' + $('#Col7_' + i).text() + '&nbsp;</b></td><td  align=right><b>' + $('#Col8_' + i).text() + '&nbsp;</b></td><td align=right><b>' + $('#Col9_' + i).text() + '&nbsp;</b></td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'GrandTotal') {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;margin-top:20px;display:none"><td colspan=8 align=center><b>&nbsp;' + $('#Col6_' + i).text() + '</b></td></tr>');


                }
                else {
                    myWindow.document.write('<tr><td align=center style="border-right: solid 1px gray;">' + con + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td  align=center style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col6_' + i).text() + '</td><td  align=left  style="border-right: solid 1px gray;">&nbsp;' + $('#Col3_' + i).text() + '</td><td align=right style="border-right: solid 1px gray;">' + $('#Col7_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col8_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col9_' + i).text() + '&nbsp;</td></tr>');
                    con++;
                }
            }
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }
    }


    if ($('#AccountCodeId').val() != 0) {
        myWindow.document.write('<table frame="box" style="font-size:75%;margin-top:75px" width=100% height=80px><tr align=center><td align=center><b>30 Days</b></td><td align=center><b>60 Days</b></td><td align=center><b>90 Days</b></td><td align=center><b>120 Days</b></td><td align=center><b>Above 120 Days</b></td></tr><tr><td colspan=6><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
    }

    for (var i = 0; i < Rowlen; i++) {
        if ($('#ColD1_' + i).text() != '') {

            myWindow.document.write('<tr><td align=center>' + $('#ColD1_' + i).text() + '</td><td  align=center>' + $('#ColD2_' + i).text() + '</td><td  align=center>' + $('#ColD3_' + i).text() + '</td><td align=center>' + $('#ColD4_' + i).text() + '</td><td  align=center>' + $('#ColD5_' + i).text() + '</td></tr>');
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }

    myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-top:1px solid white;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')

    myWindow.document.write('</table>');
    myWindow.print();
}

function PrintthisOutstandingReportSUMMARY(Rowlen) {


    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></tr> ');



    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11><b>' + 'OUTSTANDING STATEMENT' + '</b></td></tr><tr align=center><td colspan=11>' + $('#header2').text() + '</td></tr>');


    myWindow.document.write('<table frame="box"   style="font-size:75%;margin-top:10px;border-collapse:collapse;border-color:1px solid gray;"  width=100%><tr style="border-bottom:1px solid gray;"><td align=center width=3% style="border-right: solid 1px gray;"><b>Sl#</b></td><td width=10% align=center style="border-right: solid 1px gray;"><b>Code</b></td><td  align=left style="border-right: solid 1px gray;"><b>&nbsp;Account Name</b></td><td width=15% align=right style="border-right: solid 1px gray;"><b>Debit&nbsp;</b></td><td width=15% align=right style="border-right: solid 1px gray;"><b>Credit&nbsp;</td></tr>');

    var con = 1;

    console.log(Rowlen)

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {



            if ($('#Col5_' + i).text() == '1' && $('#Col2_' + i).text() != 'Balance' && $('#Col2_' + i).text() != 'Total') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;"><td align=left ></td><td  align=center><b>' + $('#Col1_' + i).text() + '</b></td><td align=left><b>&nbsp;' + $('#Col2_' + i).text() + '</b></td><td  align=right><b>' + $('#Col3_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col4_' + i).text() + '&nbsp;</b></td></tr>');

            }

            else if ($('#Col2_' + i).text() == 'Balance') {
                var ABC = '';
                if ($('#Col3_' + i).text() <= 0)
                    ABC = 'Cr'
                else
                    ABC = 'Dr'
                myWindow.document.write('<tr style="background-color:white;border-top:1px solid gray;border-bottom:1px solid gray;height:15px;border-left:1px solid white;"><td></td><td></td><td></td><td></td><td></td><td></td></tr>');

                myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid gray"><td align=left></td><td  align=center><b>' + $('#Col1_' + i).text() + '</b></td><td align=left><b>&nbsp;TOTAL OUTSTANDING BALANCE</b></td><td  align=right><b>' + $('#Col3_' + i).text() + ' ' + ABC + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col4_' + i).text() + '&nbsp;</b></td></tr>');
            }
            else if ($.trim($('#Col2_' + i).text()) == 'Total') {

                myWindow.document.write('<tr style="background-color:#f0f3f4;border-top:1px solid gray"><td align=left></td><td  align=center><b>' + $('#Col1_' + i).text() + '</b></td><td align=left><b>&nbsp;' + 'TOTAL' + '</b></td><td  align=right><b>' + $('#Col3_' + i).text() + '&nbsp;</b></td><td align=right style="border-right: solid 1px gray;"><b>' + $('#Col4_' + i).text() + '&nbsp;</b></td></tr>');
            }
            else {

                myWindow.document.write('<tr><td align=center style="border-right: solid 1px gray;">' + con + '</td><td   align=center style="border-right: solid 1px gray;">' + $('#Col1_' + i).text() + '</td><td align=left style="border-right: solid 1px gray;">&nbsp;' + $('#Col2_' + i).text() + '</td><td  align=right style="border-right: solid 1px gray;">' + $('#Col3_' + i).text() + '&nbsp;</td><td align=right style="border-right: solid 1px gray;">' + $('#Col4_' + i).text() + '&nbsp;</td></tr>');
                con++;
            }

        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
    myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.document.write('</table>');
    myWindow.print();
}



function PrintthisStockDetailedReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd1 {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot { display: table-footer-group;}

    myWindow.document.write('<table width=100% style="font-size:75%;"><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<tr align=center style="border-top:1px solid black;"><td colspan=6 style="font-weight:bold">' + 'STOCK REPORT' + '</td></tr>');

    myWindow.document.write('<tr align=center style="margin-top:10px;"><td colspan=6>' + $('#Loc').text() + $('#Groupparam').text() + $('#SubGroupparam').text() + $('#Catparam').text() + $('#SubCatparam').text() + '</td></tr>');

    myWindow.document.write('<table  bordercolor="1 px solid black" frame="box"  style="font-size:75%;margin-top:10px;border-spacing:0;border-collapse:collapse;"  width=100%><tr  style="border:1px solid black;"><td style="width:40px;" class=brtd1 align=center style=padding=left:10px><b>Sl#</b></td><td align=left class=brtd1 style=padding=left:10px><b>Product</b></td><td align=left class=brtd1 style=padding=left:10px><b>Description</b></td><td align=left class=brtd1 style=padding=left:10px><b>Stock</b></td><td align=right class=brtd1 style=padding=right:10px><b>Avg. Cost</b></td><td align=right class=brtd1 style=padding=right:10px><b>Stock Value</b></td></tr>');



    for (var i = 0; i < Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#Col2_' + i).text() == 'Grand Total') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid black;"><td class=brtd1></td><td align=left class=brtd1 style=padding=left:10px>' + $('#Col1_' + i).text() + '</td><td  align=left class=brtd1 style=padding=left:10px><b>' + $('#Col2_' + i).text() + '</b></td><td  align=left class=brtd1 style=padding=left:10px><b>' + $('#Col3_' + i).text() + '</b></td><td align=right class=brtd1 style=padding=right:10px><b>' + $('#Col4_' + i).text() + '</b></td><td align=right class=brtd1 style=padding=right:10px><b>' + $('#Col5_' + i).text() + '</b></td></tr>');
            }
            else
                myWindow.document.write('<tr><td class=brtd1 align=center style=padding=left:10px>' + (i + 1) + '</td><td align=left class=brtd1 style=padding=left:10px>' + $('#Col1_' + i).text() + '</td><td  align=left class=brtd1 style=padding=left:10px>' + $('#Col2_' + i).text() + '</td><td  align=left class=brtd1 style=padding=left:10px>' + $('#Col3_' + i).text() + '</td><td align=right class=brtd1 style=padding=right:10px>' + $('#Col4_' + i).text() + '</td><td align=right class=brtd1 style=padding=right:10px>' + $('#Col5_' + i).text() + '</td></tr>');


        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }
    }
    myWindow.print();
}

function PrintthisDailyTransactionReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');

    myWindow.document.write('<table frame="box"  style="font-size:75%;margin-top:10px"  width=100%><tr><td align=center>Slno</td><td align=center>VNo</td><td align=center>Date</td><td align=center>Prefix</td><td align=center>Acc_Code</td><td align=center>Acc_Desc</td><td align=center>DR</td><td align=center>CR</td><td align=center>Bal</td></tr><tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#Col4_' + i).text() == '') {
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr  style="background-color:#cfd8dc"><td style="display:none">' + i + '</td><td></td><td align=center>' + $('#Col1_' + i).text() + '</td><td  align=center>' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col3_' + i).text() + '</td><td align=center>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td align=center>' + $('#Col8_' + i).text() + '</td></tr>');
            }

            else {
                myWindow.document.write('<tr><td align=center>' + i + '</td><td align=center>' + $('#Col1_' + i).text() + '</td><td  align=center>' + $('#Col2_' + i).text() + '</td><td align=center>' + $('#Col3_' + i).text() + '</td><td align=center>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td align=center>' + $('#Col8_' + i).text() + '</td></tr>');

            }
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }



    myWindow.document.write('<table frame="box" style="font-size:75%;margin-top:50px" width=50% align=center><tr></tr>');

    for (var i = 0; i < Rowlen; i++) {
        myWindow.document.write('<tr  style="background-color:#cfd8dc"><td align=left>' + $('#ColD4_' + i).text() + '</td><td  align=right>' + $('#ColD3_' + i).text() + '</td></tr>');
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



function PrintthisCashPaymentReceiptReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot    { display: none; }  </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot {table-footer-group;}

    myWindow.document.write('<table style="font-size:85%" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td></td></tr> ');


    myWindow.document.write('<tr><td height="10px"  colspan=11></td></tr>');
    myWindow.document.write('<tr align=left><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=left><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=left><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table  frame="box" class="abcd" bordercolor="1 px solid black"  style="font-size:85%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;" height=40px width=100%><tr  style="border-bottom:1px solid black" align=center><td colspan=11>' + $('#header').text() + '</td></tr>');


    myWindow.document.write('<table frame="box" class="abcd" bordercolor="1 px solid black" style="font-size:80%;margin-top:20px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;"  width=100%><tr style="border:1px solid black"><td align=left width="3%" class=brtd style="padding-left:5px"><b>Sl#</b></td><td align=left width="12%" class=brtd style="padding-left:5px"><b>Date</b></td><td align=left width="2%" class=brtd style="padding-left:5px"><b>Type</b></td><td class=brtd align=left width="6%" style="padding-left:5px"><b>Voucher#</b></td><td class=brtd align=center width="8%" style="padding-left:5px"><b>Account#</b></td><td  class=brtd align=left style="padding-left:5px" width="35%"><b>Description</b></td><td class=brtd align=left  width="2%" style="padding-left:5px"><b>Ref#</b></td><td class=brtd align=right width="10%" style="padding-right:5px"><b>Amount</b></td><td class=brtd align=right width="10%" style="padding-right:5px"><b>FCAmount</b></td></tr>');

    var slno = 0;
    for (var i = 1; i <= Rowlen; i++) {

        if ($('#ResultLength').val()) {

            if ($('#Col2_' + i).text() == 'Currency') {
                myWindow.document.write('<tr style=background-color:#b0bec5><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=left style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-left:5px"></td><td class=brtd align=right style="padding-left:5px"></td></tr>');

            }
            else if ($('#Col5_' + i).text() == 'Cash Receipt' || $('#Col5_' + i).text() == 'Cash Payment') {
                myWindow.document.write('<tr style="background-color:#b0bec5;border:1px solid black"><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td  class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td  class=brtd align=right style="padding-left:5px"></td><td class=brtd align=right style="padding-left:5px"></td></tr>');
            }
            else if ($('#Col2_' + i).text() == 'Voucher Type') {
                myWindow.document.write('<tr style=background-color:#cfd8dc><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td  class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-left:5px"></td><td class=brtd align=right style="padding-left:5px"></td></tr>');
            }
            else if ($('#Col5_' + i).text() == 'Total Cash Received') {
                myWindow.document.write('<tr style="background-color:#cfd8dc"><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td  class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
            }
            else if ($('#Col5_' + i).text() == 'Opening') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid black"><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
            }
            else if ($('#Col5_' + i).text() == 'Total Cash Paid') {
                myWindow.document.write('<tr style="background-color:#cfd8dc"><td class=brtd align=left></td><td  class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
            }
            else if ($('#Col5_' + i).text() == 'Net Cash') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid black"><td class=brtd align=left></td><td align=left  class=brtd style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td  class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col5_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td></tr>');
            }
            else if ($('#Col2_' + i).text() == 'Total') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;border-bottom:1px solid black"><td class=brtd align=left></td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col2_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td  class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col7_' + i).text() + '</b></td><td class=brtd align=right style="padding-right:5px"><b>' + $('#Col8_' + i).text() + '</b></td>');
            }
            else {
                slno++;
                myWindow.document.write('<tr><td class=brtd align=left style="padding-left:5px">' + slno + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=center style="padding-left:3px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td  class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td><td  class=brtd align=right style="padding-right:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=right style="padding-right:5px">' + $('#Col8_' + i).text() + '</td></tr>');

            }
        }
        //else {
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



function PrintthisLocationTransferMAINReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<style type="text/css"> .brtd {border-right:1px solid black;}  </style> <style type="text/css" media="print"> tfoot    { display: none; }  </style> <style type="text/css" media="screen">  tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');    //tfoot {table-footer-group;}

    myWindow.document.write('<table style="font-size:85%;" width=100%><tr>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table  frame="box" class="abcd" bordercolor="1 px solid black"  style="font-size:85%;margin-top:10px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;" height=40px width=100%><tr  style="border-bottom:1px solid black" align=center><td colspan=11>' + $('#header').text() + '</td></tr>');

    myWindow.document.write('<table  frame="box" class="abcd" bordercolor="1 px solid black" style="font-size:80%;margin-top:20px;border-spacing:0;border-collapse:collapse;border-color:1px solid black;" width=100%><tr  style="border-bottom:1px solid black"><td align=left class=brtd style="padding-left:5px" width=2%><b>Sl#</b></td><td class=brtd align=left style="padding-left:5px" width=8%><b>Dept</b></td><td class=brtd align=left style="padding-left:5px" width=10%><b>Date</b><td class=brtd align=left style="padding-left:5px" width=8%><b>Transfer#</b></td><td align=left class=brtd style="padding-left:5px" width=20%><b>Item Code</b></td><td class=brtd align=left style="padding-left:5px" width=30%><b>Item Name</b></td><td class=brtd align=left style="padding-left:5px" width=10%><b>From Loc.</b></td><td class=brtd align=left style="padding-left:5px" width=10%><b>To Loc.</b></td><td class=brtd align=left style="padding-left:5px" width=5%><b>Qty.</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {
            if ($('#Col3_' + i).text() == 'Total') {
                myWindow.document.write('<tr style="background-color:#cfd8dc;border-top:1px solid black"><td class=brtd align=left style="padding-left:5px"></td><td class=brtd align=left style="padding-left:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col8_' + i).text() + '</td><td class=brtd  align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col3_' + i).text() + '</b></td><td class=brtd align=left style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px"><b>' + $('#Col6_' + i).text() + '</b></td></tr>');
            }
            else {
                myWindow.document.write('<tr><td class=brtd align=left style="padding-left:5px">' + i + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col7_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col1_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col8_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col2_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col3_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col4_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col5_' + i).text() + '</td><td class=brtd align=left style="padding-left:5px">' + $('#Col6_' + i).text() + '</td></tr>');
            }
        }


        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }
    }
    myWindow.print();
}




function PrintthisContainerReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png"></td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');

    myWindow.document.write('<table style="font-size:75%;margin-top:10px"  width=100%><tr></tr>');
    var con = 1;
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {


            if ($('#Col3_' + i).text() == '') {
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr><td align=left><b>' + con + '</b></td><td align=left><b>' + $('#Col1_' + i).text() + '</b></td><td  align=left><b>' + $('#Col2_' + i).text() + '</b></td><td align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left>' + $('#Col4_' + i).text() + '</td><td align=left>' + $('#Col5_' + i).text() + '</td><td align=left>' + $('#Col6_' + i).text() + '</td></tr><tr><td colspan=11></td></tr>');
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;border-top: 1px dashed black;margin-top:-8px" width="100.5%" ></td></tr>');
                con++;
            }
            else if ($('#Col2_' + i).text() == 'Make') {
                myWindow.document.write('<tr><td align=left></td><td align=left><b>' + $('#Col1_' + i).text() + '</b></td><td  align=left><b>' + $('#Col2_' + i).text() + '</b></td><td align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left><b>' + $('#Col4_' + i).text() + '</b></td><td align=left><b>' + $('#Col5_' + i).text() + '</b></td><td align=left><b>' + $('#Col6_' + i).text() + '</b></td></tr><tr><td colspan=11></td></tr>');
            }
            else {
                myWindow.document.write('<tr><td align=left></td><td align=left>' + $('#Col1_' + i).text() + '</td><td  align=left>' + $('#Col2_' + i).text() + '</td><td align=left>' + $('#Col3_' + i).text() + '</td><td align=left>' + $('#Col4_' + i).text() + '</td><td align=left>' + $('#Col5_' + i).text() + '</td><td align=left>' + $('#Col6_' + i).text() + '</td></tr><tr><td colspan=11></td></tr>');

            }
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }

    }
    myWindow.print();
}



function PrintthisLocationTransferUsedCarsReport(Rowlen) {
    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2><img src="/app-assets/img/text.png" alt="company logo"></td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table frame="box" style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');

    myWindow.document.write('<table style="font-size:75%;margin-top:10px"  width=100%><tr></tr>');
    var con = 1;
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#Col1_' + i).text() == 'Container No: ') {
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr><td align=left ><b>' + con + '</b></td><td align=left><b>' + $('#Col1_' + i).text() + '</b></td><td align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left><b>' + $('#Col4_' + i).text() + '</b></td><td align=left>' + $('#Col6_' + i).text() + '</td><td align=left>' + $('#Col9_' + i).text() + '</td><td align=left>' + $('#Col7_' + i).text() + '</td><td align=left>' + $('#Col8' + i).text() + '</td><td align=left>' + $('#Col10_' + i).text() + '</td><td align=left>' + $('#Col11_' + i).text() + '</td></tr><tr><td colspan=11></td></tr>');
                myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr><td colspan=11><hr style="border-top: 1px dashed black;margin-top:-8px;margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                con++;
            }
            else if ($('#Col3_' + i).text() == 'Make') {
                myWindow.document.write('<tr><td align=left></td><td align=left><b>' + $('#Col1_' + i).text() + '</b></td><td  align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left><b>' + $('#Col4_' + i).text() + '</b></td><td align=left><b>' + $('#Col6_' + i).text() + '</b></td><td align=left><b>' + $('#Col9_' + i).text() + '</b></td><td align=left><b>' + $('#Col7_' + i).text() + '</b></td><td align=left><b>' + $('#Col8_' + i).text() + '</b></td><td align=left><b>' + $('#Col10_' + i).text() + '</b></td><td align=left><b>' + $('#Col11_' + i).text() + '</b></td></tr><tr><td colspan=11></td></tr>');
            }
            else {
                myWindow.document.write('<tr><td align=left></td><td align=left>' + $('#Col1_' + i).text() + '</td><td  align=left>' + $('#Col3_' + i).text() + '</td><td align=left>' + $('#Col4_' + i).text() + '</td><td align=left>' + $('#Col6_' + i).text() + '</td><td align=left>' + $('#Col9_' + i).text() + '</td><td align=left>' + $('#Col7_' + i).text() + '</td><td align=left>' + $('#Col8_' + i).text() + '</td><td align=left>' + $('#Col10_' + i).text() + '</td><td align=left>' + $('#Col11_' + i).text() + '</td></tr><tr><td colspan=11></td></tr>');

            }
        }
        else {
            myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        }

    }
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



function PurchaseAnalysisreport(Rowlen) {

    var myWindow = window.open("", "", "width=1500,height=1500");
    myWindow.document.write('<table style="font-size:85%;" width=100%><tr><td rowsspan=2>' + (ComapnydivToPrint.outerHTML) + '</td></td></tr> ');
    myWindow.document.write('<tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6> ' + window.CompanySettingsArray.Fax + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr>');
    myWindow.document.write('<table style="font-size:85%;margin-top:10px" height=50px width=100%><tr align=center><td colspan=11>' + $('#header').text() + '</td></tr>');


    myWindow.document.write(' <table border=1  rules=cols style="border:1px solid black;">');

    myWindow.document.write('<tr style="border:1px solid black;"><td align=left>Serial#</td><td align=left>Item Code</td><td align=left>Account#</td><td align=left>Item Name</td><td align=left>Quantity</td><td align=right>Rate</td><td align=right>Amount</td></tr>');
    //myWindow.document.write('<table  frame="box"  style="font-size:75%;margin-top:10px"  width=100%><tr><td align=left><b>Serial#</b></td><td align=left><b>Item code</b></td><td align=left><b>Account#</b></td><td align=left><b>Item Name</b></td><td align=left><b>Quantity</b></td><td align=right><b>Rate</b></td><td align=right><b>Amount</b></td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        //alert(Rowlen)
        if ($('#ResultLength').val()) {
            if ($('#Col1_' + i).text() == '') {
                //myWindow.document.write('<tr><td colspan=11><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
                myWindow.document.write('<tr  style="background-color:#cfd8dc"><td>' + i + '</td><td align=left>' + $('#Col1_' + i).text() + '</td><td  align=left>' + $('#Col2_' + i).text() + '</td><td align=left><b>' + $('#Col3_' + i).text() + '</b></td><td align=left>' + $('#Col6_' + i).text() + '</td><td align=right><b>' + $('#Col7_' + i).text() + '</b></td><td align=right><b>' + $('#Col10_' + i).text() + '</b></td></tr>');
            }

            else {
                myWindow.document.write('<tr><td align=left>' + i + '</td><td align=left>' + $('#Col1_' + i).text() + '</td><td  align=left>' + $('#Col2_' + i).text() + '</td><td align=left>' + $('#Col3_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col10_' + i).text() + '</td></tr>');

            }
        }
        //else
        //{
        //    myWindow.document.write('<tr><td height="30px"  colspan=11></td></tr>');
        //}
    }
    myWindow.document.write('<tfoot style="border:1px solid white;border-bottom:1px solid black;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')
    myWindow.print();
}


//New Print Function for Account Statement New
function PrintthisAccountStatementNew(Rowlen) {

    var slno = 1;
    var myWindow = window.open("", "", "width=1500,height=1500");


    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=100% ><table style="font-size:85%;" width=100%><tr align=center><td>');

    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left height=170px><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left  height=170px><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td style=color:#5c3158>' + $('#Address1').val() + '</td></tr><tr><td class=blclr>' + $('#Address2').val() + '</td></tr><tr><td class=blclr>' + $('#Address3').val() + '</td></tr><tr><td class=blclr>' + $('#Address4').val() + '</td></tr><tr><td class=blclr style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');
    }
    else {
        myWindow.document.write('<table width=100%; style=text-align:left><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    }
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');
    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>ACCOUNT  STATEMENT</td></tr></table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>' + $('#header2').text() + '</td></tr></table>');
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');

    if ($('#btndetail').prop("checked")) {
        if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
            myWindow.document.write('<table style="border-collapse:collapse;font-size:72%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Voucher#</td><td>Date</td><td>Description</td><td align=center>Ref.#</td><td align=right>Debit</td><td align=right>Credit</td><td align=right>Balance</td></tr>');
        }
        else {
            myWindow.document.write('<table style="border-collapse:collapse;font-size:72%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Voucher#</td><td>Date</td><td>Account#</td><td>Description</td><td align=center>Ref.#</td><td align=right>Debit</td><td align=right>Credit</td><td align=right>Balance</td></tr>');

        }
    }
    else {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5%>Sl#</td><td width=8%>Account#</td><td>Account Name</td><td align=right width=15%>Debit</td><td align=right width=15%>Credit</td></tr>');
    }
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#btndetail').prop("checked")) {
                if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {

                    if ($('#Col5_' + i).text() == 'TOTAL') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col5_' + i).text() == 'OPENING') {
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col4_' + i).text().length == 4) {
                        myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col1_' + i).text() == '' && $('#Col5_' + i).text() != 'TOTAL' && $('#Col5_' + i).text() != 'GRAND TOTAL') {
                        myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col5_' + i).text() == 'GRAND TOTAL') {
                        myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }

                    else {

                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col5_' + i).text().substring(0, 60) + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                        slno++;
                    }
                }

                else {
                    if ($('#Col4_' + i).text().length == 4) {
                        myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col4_' + i).text() + '- ' + $('#Col5_' + i).text() + '</b></td></tr>');
                    }
                    else if ($('#Col4_' + i).text() != '' && $('#Col1_' + i).text() == '') {
                        myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td colspan=10  class=brtd align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col5_' + i).text() + '</b></td></tr>');
                    }
                    else if ($('#Col5_' + i).text() == 'TOTAL') {
                        myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col5_' + i).text() == 'OPENING') {
                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }

                    else if ($('#Col4_' + i).text().length == 8 && $('#Col10_' + i).text() == '') {
                        myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col1_' + i).text() == '' && $('#Col5_' + i).text() != 'TOTAL' && $('#Col5_' + i).text() != 'GRAND TOTAL') {
                        myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }
                    else if ($('#Col5_' + i).text() == 'GRAND TOTAL') {
                        myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                    }

                    else {

                        myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text().substring(0, 60) + '</td><td>' + $('#Colref_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
                        slno++;
                    }

                }
            }
            else {
                if ($('#Col1_' + i).text().length == 4) {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col1_' + i).text() + '- ' + $('#Col2_' + i).text() + '</b></td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'GRAND TOTAL') {
                    myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Colc_' + i).text() + '</td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {
                    myWindow.document.write('<tr style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Colc_' + i).text() + '</td></tr>');
                }
                else {
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Colc_' + i).text() + '</td></tr>');
                    slno++;
                }
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}




//New Print Function for Outstanding Statement New
function PrintthisOutstandingStatementNew(Rowlen) {

    var slno = 1;
    var myWindow = window.open("", "", "width=1500,height=1500");


    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=100% ><table style="font-size:85%;" width=100%><tr align=center><td>');

    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left height=170px><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left  height=170px><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td style=color:#5c3158>' + $('#Address1').val() + '</td></tr><tr><td class=blclr>' + $('#Address2').val() + '</td></tr><tr><td class=blclr>' + $('#Address3').val() + '</td></tr><tr><td class=blclr>' + $('#Address4').val() + '</td></tr><tr><td class=blclr style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');
    }
    else {
        myWindow.document.write('<table width=100%; style=text-align:left><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    }
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');
    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>OUTSTSANDING  STATEMENT</td></tr></table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>' + $('#header2').text() + '</td></tr></table>');
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Date</td><td align=center>Ref.#</td><td>Description</td><td align=right>Amount</td><td align=right>Balance</td></tr>');
    }
    else {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td>Voucher#</td><td>Date</td><td>Account#</td><td>Description</td><td align=center>Ref.#</td><td align=right>Debit</td><td align=right>Credit</td><td align=right>Balance</td></tr>');

    }
    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {


            if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {

                if ($('#Col6_' + i).text() == 'Total') {
                    myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col6_' + i).text() == 'OPENING') {
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }

                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'TOTAL' && $('#Col6_' + i).text() != 'GRAND TOTAL') {
                    myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }


                else {

                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col6_' + i).text().substring(0, 60) + '</td><td>' + $('#Col12_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                    slno++;
                }
            }

            else {
                if ($('#Col4_' + i).text().length == 4) {
                    myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col4_' + i).text() + '- ' + $('#Col6_' + i).text() + '</b></td></tr>');
                }
                else if ($('#Col4_' + i).text() != '' && $('#Col1_' + i).text() == '') {
                    myWindow.document.write('<tr  style="background-color:#f0f3f4;border-top:1px solid gray;"><td colspan=10  class=brtd align=center><b>&nbsp;' + $('#Col4_' + i).text() + ' - ' + $('#Col6_' + i).text() + '</b></td></tr>');
                }
                else if ($('#Col6_' + i).text() == 'Total') {
                    myWindow.document.write('<tr style="background-color:#f0f3f4" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col6_' + i).text() == 'Opening') {
                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col6_' + i).text().length == 4) {
                    myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col4_' + i).text().length == 8 && $('#Col5_' + i).text().length == '') {
                    myWindow.document.write('<tr style="background-color:#cfd8dc" class=brtd2><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col6_' + i).text() == 'GrandTotal') {
                    myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }
                else if ($('#Col1_' + i).text() == '' && $('#Col6_' + i).text() != 'TOTAL' && $('#Col6_' + i).text() != 'GRAND TOTAL') {
                    myWindow.document.write('<tr class=brtd2 style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                }


                else {

                    myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col6_' + i).text().substring(0, 60) + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
                    slno++;
                }

            }
        }
    }

    if ($('#AccountCodeId').val() != 0) {
        myWindow.document.write('<table frame="box" style="font-size:75%;margin-top:75px" width=100% height=80px><tr align=center><td align=center><b>30 Days</b></td><td align=center><b>60 Days</b></td><td align=center><b>90 Days</b></td><td align=center><b>120 Days</b></td><td align=center><b>Above 120 Days</b></td></tr><tr><td colspan=6><hr style="margin-left:-3px;margin-right:0px;" width="100.5%"></td></tr>');
    }

    for (var i = 0; i < Rowlen; i++) {
        if ($('#ColD1_' + i).text() != '') {

            myWindow.document.write('<tr><td align=center>' + $('#ColD1_' + i).text() + '</td><td  align=center>' + $('#ColD2_' + i).text() + '</td><td  align=center>' + $('#ColD3_' + i).text() + '</td><td align=center>' + $('#ColD4_' + i).text() + '</td><td  align=center>' + $('#ColD5_' + i).text() + '</td></tr>');
        }
    }

    myWindow.document.write('<tfoot style="border-bottom:1px solid gray;border-top:1px solid white;border-collapse: collapse;"><tr ><td colspan=11></td></tr></tfoot>')

    myWindow.document.write('</table>');

    myWindow.print();
}



function PrintthisOutstandingReportSUMMARYNew(Rowlen) {

    var slno = 1;
    var myWindow = window.open("", "", "width=1500,height=1500");


    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=100% ><table style="font-size:85%;" width=100%><tr align=center><td>');

    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('</td></tr></table></td></tr></table>');

    if ($('#AccountCodeId').val() != 0 && $('#Address1').val() != 0) {
        myWindow.document.write('<table width=100% frame="box"><tr>');
        myWindow.document.write('<td width=50% style="border:none;border-right:1px solid grey"><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left height=170px><tr class=violetbg style=text-align:center><td class=brtd1>COMPANY DETAILS</td></tr><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');
        myWindow.document.write('</td></tr></table></td>');
        myWindow.document.write('<td width=50% ><table  style="font-size:85%;" width=100%><tr align=center><td colspan=6 height=170px>');
        myWindow.document.write('<table width=100%; style=text-align:left height=170px><tr class=violetbg style=text-align:center><td class=brtd1>OTHER DETAILS</td></tr><tr><td style=color:#5c3158>' + $('#Address1').val() + '</td></tr><tr><td class=blclr>' + $('#Address2').val() + '</td></tr><tr><td class=blclr>' + $('#Address3').val() + '</td></tr><tr><td class=blclr>' + $('#Address4').val() + '</td></tr><tr><td class=blclr style="opacity:0">Demo</td></tr></table>');
        myWindow.document.write('</td></tr></table></td></tr></table>');
    }
    else {
        myWindow.document.write('<table width=100%; style=text-align:left><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    }
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');
    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>OUTSTANDING  STATEMENT</td></tr></table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>' + $('#header2').text() + '</td></tr></table>');
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');


    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey">' +
             '<tr class=violetbg><td align=center width=5%>Sl#</td><td align=center width=10%>Account#</td><td align=center>Account Name</td><td align=center width=15%>Debit</td><td align=center width=15%>Credit</td></tr>')


    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#Col1_' + i).text().length == 4) {
                myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col1_' + i).text() + '- ' + $('#Col2_' + i).text() + '</b></td></tr>');
            }
            else if ($('#Col2_' + i).text() == 'GRAND TOTAL') {
                myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td></tr>');
            }
            else if ($('#Col2_' + i).text() == 'Balance') {
                myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td></tr>');
            }
            else if ($('#Col2_' + i).text() == 'Total') {
                myWindow.document.write('<tr style="background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td></tr>');
            }
            else if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {
                myWindow.document.write('<tr style="display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td></tr>');
            }
            else {
                myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td align=right>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td></tr>');
                slno++;
            }



        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}

function PrintthisVocherwiseReportNew(Rowlen) {

    var slno = 1;
    var type = $('#VoucherType').find("option:selected").html();
    var vouchertype = {}, Currenttype = '';

    if ($('#VoucherType').val() != 0) {
        vouchertype = type.split('-');
        Currenttype = vouchertype[1];

    }
    else {
        Currenttype = '';
    }


    var myWindow = window.open("", "", "width=1500,height=1500");


    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8>' + (ComapnydivToPrint.outerHTML) + '</td></tr><tr>');
    myWindow.document.write('<td width=100% ><table style="font-size:85%;" width=100%><tr align=center><td>');
    myWindow.document.write('</td></tr></table></td>');
    myWindow.document.write('<td width=25% ><table  style="font-size:85%;" width=100%><tr align="center"><td colspan=6>');
    myWindow.document.write('</td></tr></table></td></tr></table>');


    myWindow.document.write('<table width=100%; style=text-align:left><tr><td style=color:#5c3158>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr><td class=blclr>' + window.CompanySettingsArray.Address + '</td></tr><tr><td class=blclr>Fax : ' + window.CompanySettingsArray.Fax + '</td></tr><tr><td class=blclr>Email : ' + window.CompanySettingsArray.Email + '</td></tr><tr><td class=blclr>Phone : ' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');
    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>VOUCHERWISE  REPORT</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');

    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;><b>' + Currenttype + '</b></td></tr></table>');

    myWindow.document.write('<table width=100%; style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>' + $('#header2').text() + '</td></tr></table>');
    myWindow.document.write('<table height=10px width=100%><tr><td colspan=11></td></tr> </table>');


    myWindow.document.write('<table style="border-collapse:collapse;font-size:70%;" frame="box" width=100% bordercolor="grey">' +
             '<tr class=violetbg><td align=center>Sl#</td><td align=center>Account#</td><td align=center width=25%>Account Name</td><td align=center>Description</td><td align=center>Ref.#</td><td align=center>Debit</td><td align=center>Credit</td></tr>')


    for (var i = 1; i <= Rowlen; i++) {
        if ($('#ResultLength').val()) {

            if ($('#Col7_' + i).text() == 'Grand Total') {
                myWindow.document.write('<tr class=violetbg><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td align=center>GRAND TOTAL</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
            }

            else {
                myWindow.document.write('<tr class=brtd2><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=right>' + $('#Col6_' + i).text() + '</td></tr>');
                slno++;
            }



        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}

//New Print Function for Trial Balnce
function PrintthisTrialBalance(Rowlen, Type) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");



    if (Type == 'ASON' || Type == 'SUMMERY') {
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);
    }
    else if (Type == 'WITHOP') {
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG);
    }
    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>TRIAL BALANCE</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');
    if (Type == 'ASON' || Type == 'SUMMERY') {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5%>Sl#</td><td width=9%>Account#</td><td colspan=2>Account Name</td><td align=right width=15%>Debit</td><td align=right width=15%>Credit</td></tr>');
    }
    else if (Type == 'WITHOP') {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:76%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td>Sl#</td><td width=8%>Account#</td><td colspan=2>Account Name</td><td align=right>Op.Debit</td><td align=right>Op.Credit</td><td align=right>Debit</td><td align=right>Credit</td><td align=right>Balance</td></tr>');
    }
    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {

            if (Type == 'ASON') {
                if ($('#Col2_' + i).text() == 'TOTAL') {
                    slno++;
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col1_' + i).text().length == 4) {

                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td><b>' + $('#Col1_' + i).text() + '</b></td><td colspan=2><b>' + $('#Col2_' + i).text() + '</b></td><td align=right></td><td align=right style="border-right:1px solid grey;"></td></tr>');
                }
                else if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td></tr>');
                }
                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 45 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=180px colspan=6></td></tr>');
                }
            }
            else if (Type == 'SUMMERY') {

                if ($('#Col2_' + Id).text() == 'TOTAL') {
                    slno++;
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + Id).text() + '</td><td colspan=2>' + $('#Col2_' + Id).text() + '</td><td align=right>' + addCommas($('#Col3_' + Id).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + Id).text()) + '</td></tr>');
                }
                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + i + '</td><td>' + $('#Col1_' + Id).text() + '</td><td colspan=2>' + $('#Col2_' + Id).text() + '</td><td align=right>' + addCommas($('#Col3_' + Id).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + Id).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 49 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=6></td></tr>');
                }

            }
            else if (Type == 'WITHOP') {
                if ($('#Col2_' + i).text() == 'TOTAL') {
                    slno++;
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col5_' + i).text()) + '</td><td align=right>' + addCommas($('#Col6_' + i).text()) + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td><td align=right>' + addCommas($('#Col7_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col1_' + i).text().length == 4 && $('#Col2_' + i).text() != '') {

                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td><b>' + $('#Col1_' + i).text() + '</b></td><td colspan=2><b>' + $('#Col2_' + i).text() + '</b></td><td align=right></td><td align=right></td><td align=right></td><td align=right style="border-right:1px solid grey;"></td><td align=right></td></tr>');
                }
                else if ($('#Col1_' + i).text().length == 4 && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td></td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col5_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col6_' + i).text()) + '</b></td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col7_' + i).text()) + '</b></td></tr>');
                }
                else if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col5_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col6_' + i).text()) + '</b></td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col7_' + i).text()) + '</b></td></tr>');
                }
                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col5_' + i).text()) + '</td><td align=right>' + addCommas($('#Col6_' + i).text()) + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td><td align=right>' + addCommas($('#Col7_' + i).text()) + '</td></tr>');
                }
                //Rowcount++;
                //if (Rowcount % 45 == 0) {
                //    Rowcount = 0;
                //    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=9></td></tr>');
                //}
            }


        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}


//New Print Function for Profit and Loss
function PrintthisProfitandLoss(Rowlen, Type) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>PROFIT  AND  LOSS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    if (Type == 'WITHOUTOP')
        {
    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5%>Sl#</td><td width=9%>Account#</td><td colspan=2>Account Name</td><td align=right width=15%>Debit</td><td align=right width=15%>Credit</td></tr>');
    }
    else
    {
        myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5%>Sl#</td><td width=9%>Account#</td><td colspan=2>Account Name</td><td align=right width=15%>Income</td><td align=right width=15%>Expenses</td></tr>');
    }


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            if (Type == 'ASON') {
                if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'TOTAL') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'NET PROFIT') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'STOCK') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }

                else if ($('#Col1_' + i).text().length == 4) {

                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td><b>' + $('#Col1_' + i).text() + '</b></td><td colspan=2><b>' + $('#Col2_' + i).text() + '</b></td><td align=right></td><td align=right style="border-right:1px solid grey;"></td></tr>');
                }

                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 45 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=180px colspan=6></td></tr>');
                }
            }
            else
            {
                if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey;display:none"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'TOTAL') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'NET PROFIT') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'STOCK') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }

                else if ($('#Col1_' + i).text().length == 4) {

                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td><b>' + $('#Col1_' + i).text() + '</b></td><td colspan=2><b>' + $('#Col2_' + i).text() + '</b></td><td align=right></td><td align=right style="border-right:1px solid grey;"></td></tr>');
                }

                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 49 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=6></td></tr>');
                }
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



//New Print Function for Balance Sheet
function PrintthisBalanceSheet(Rowlen, Type) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);


    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>BALANCE  SHEET</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5%>Sl#</td><td width=9%>Account#</td><td colspan=2>Account Name</td><td align=right width=15%>Liabilities</td><td align=right width=15%>Assets</td></tr>');

    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {

            if (Type == 'ASON' || Type == 'WITHOP')
            {
                if ($('#Col1_' + i).text() == '' && $('#Col2_' + i).text() == '') {

                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right><b>' + addCommas($('#Col3_' + i).text()) + '</b></td><td align=right style="border-right:1px solid grey;"><b>' + addCommas($('#Col4_' + i).text()) + '</b></td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'Trial Balance Difference') {
                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc;font-weight:bold"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'TOTAL') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'P/L RESULT') {
                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc;font-weight:bold"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'STOCK') {
                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc;font-weight:bold"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col1_' + i).text().length == 4) {

                    myWindow.document.write('<tr class=brtd2 style="border-bottom:1px solid grey;background-color:#cfd8dc"><td style="border-left:1px solid grey;"></td><td><b>' + $('#Col1_' + i).text() + '</b></td><td colspan=2><b>' + $('#Col2_' + i).text() + '</b></td><td align=right></td><td align=right style="border-right:1px solid grey;"></td></tr>');
                }
                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 45 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=180px colspan=6></td></tr>');
                }
            }
            else
            {
                if ($('#Col2_' + i).text() == 'Trial Balance Difference') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'TOTAL') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else if ($('#Col2_' + i).text() == 'P/L RESULT') {
                    myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                else {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td align=right>' + addCommas($('#Col3_' + i).text()) + '</td><td align=right style="border-right:1px solid grey;">' + addCommas($('#Col4_' + i).text()) + '</td></tr>');
                }
                Rowcount++;

                if (Rowcount % 49 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=6></td></tr>');
                }
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}


//New Print Function for Landlord
function PrintthisLandLord(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");
  
        myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
        myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>LANDLORD  INFORMATIONS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5% align=center>Sl#</td><td align=center>Landlord Name</td><td colspan=2 align=center>Address</td><td width=10% align=center>Nationality</td><td align=center>PO</td><td width=10% align=center>Telephone#</td><td align=center>Mob#</td><td align=center>Fax</td></tr>');

    
    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
                    slno++;
                    myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td></tr>');
               
                Rowcount++;

                if (Rowcount % 49 == 0) {
                    Rowcount = 0;
                    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=11></td></tr>');
                }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}

//New Print Function for Tenant Details with PDC
function PrintthisTenantDetailswithPDC(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>TENANT  DETAILS  WITH  PDC</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=3% align=center>Sl#</td><td align=center>Cont.#</td><td align=center width=15%>Tenant</td><td align=center>Premise</td><td align=center>Flat#</td><td align=center>Rent</td><td align=center width=7%>From</td><td align=center width=7%>To</td><td align=center>Period</td><td align=center>Cheque#</td><td align=center>Date</td><td align=center>Amount</td><td align=center>Bank</td><td align=center width=15%>Remarks</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            if ($('#Col2_' + i).text()=='Total')
            {
                myWindow.document.write('<tr class=violetbg  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td>' + $('#Col8_' + i).text() + '</td><td>' + $('#Col9_' + i).text() + '</td><td>' + $('#Col10_' + i).text() + '</td><td align=right>' + $('#Col11_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td>' + $('#Col13_' + i).text() + '</td></tr>');
            }
            else
            {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td>' + $('#Col8_' + i).text() + '</td><td>' + $('#Col9_' + i).text() + '</td><td>' + $('#Col10_' + i).text() + '</td><td align=right>' + $('#Col11_' + i).text() + '</td><td>' + $('#Col12_' + i).text() + '</td><td>' + $('#Col13_' + i).text() + '</td></tr>');
            }
           // Rowcount++;

            //if (Rowcount % 49 == 0) {
            //    Rowcount = 0;
            //    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=12></td></tr>');
            //}
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



//New Print Function for TenantVilla
function PrintthisTenantVilla(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>TENANT DETAILS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header1').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5% align=center>Sl#</td><td>Tenant Name</td><td colspan=2>Premise</td><td>Flat#</td><td>Nationality</td><td>PO_Box</td><td>Address</td><td>Telephone#</td><td>Mob#</td><td>Email</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;text-align:center">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td>' + $('#Col8_' + i).text() + '</td><td>' + $('#Col9_' + i).text() + '</td></tr>');

            Rowcount++;

            if (Rowcount % 49 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=6></td></tr>');
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}

//New Print Function for Flats
function PrintthisFlats(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>FLAT DETAILS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header1').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5% align=center>Sl#</td><td>Flat#</td><td colspan=2>Building</td><td>DEWA#</td><td>Type</td><td>Status</td><td>Tenant</td><td>Period</td><td>Start Date</td><td>Exp. Date</td><th>Rent</th><th>Sec Deposit</th></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;text-align:center">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td colspan=2>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td style="text-align:center">' + $('#Col8_' + i).text() + '</td><td style="text-align:center">' + $('#Col9_' + i).text() + '</td><td style="text-align:right">' + $('#Col10_' + i).text() + '</td><td style="text-align:right">' + $('#Col11_' + i).text() + '</td></tr>');

            Rowcount++;

            if (Rowcount % 49 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=6></td></tr>');
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}


//New Print Function for vacant loss analysis
function PrintthisVacantFlatLossAnalysis(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>VACANT LOSS ANALYSIS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5% align=center>Sl#</td><td align=center>Flat</td><td align=center>DEWA#</td><td align=center>Type</td><td align=center>Rent</td><td align=center width=8%>Vacant Days</td><td align=center width=5%>Vacant On</td><td align=center>Amount</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            //
            if ($('#Type_' + i).val() == '2') {
                myWindow.document.write('<tr class=violetbg  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td  align="right">' + $('#Col7_' + i).text() + '</td></tr>');
            }
            else if ($('#Type_' + i).val() == '1') {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey;background-color:#cfd8dc;font-weight:bold"><td style="border-right:none"></td><td colspan="7" >' + $('#Col1_' + i).text() + '</td></tr>');
            }
            else {
                slno++;
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td  align="right">' + $('#Col4_' + i).text() + '</td><td align="center">' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td  align="right">' + $('#Col7_' + i).text() + '</td></tr>');
                
            }

            Rowcount++;

            if (Rowcount % 49 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=11></td></tr>');
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}


//New Print Function for PDC List
function PrintthisPDCList(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG2);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>PDC  LIST</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=5% align=center>Sl#</td><td align=center>Cheque#</td><td align=center width:2%>Date</td><td align=center>Bank</td><td align=center>Contract#</td><td align=center>Tenant</td><td align=center>Building</td><td align=center>Flat#</td><td align=center>Amount</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            if ($('#Type_' + i).val() == '1')
            {
                myWindow.document.write('<tr class=violetbg  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
            }
            else
            {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;">' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td align=center>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td>' + $('#Col4_' + i).text() + '</td><td>' + $('#Col5_' + i).text() + '</td><td>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td align=right>' + $('#Col8_' + i).text() + '</td></tr>');
            }

            Rowcount++;

            if (Rowcount % 49 == 0) {
                Rowcount = 0;
                myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=11></td></tr>');
            }
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}

//New Print Function for Lease Contract Details
function PrintthisLeaseContractDetails(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>LEASE  CONTRACT  DETAILS</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=3% align=center>Sl#</td><td align=center width=15%>Tenant</td><td align=center>Premise</td><td align=center>Flat#</td><td align=center>Rent</td><td align=center width=8%>From</td><td align=center width=8%>To</td><td align=center>Period</td><td align=center width=8%>Installments</td><td align=center>Collected</td><td align=center>PDC</td><td align=center>Amount</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            if ($('#Col2_' + i).text() == 'Total')
            {
                myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td>' + $('#Col10_' + i).text() + '</td><td align=right>' + $('#Col11_' + i).text() + '</td></tr>');
            }
            else
            {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td>' + $('#Col7_' + i).text() + '</td><td>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td><td>' + $('#Col10_' + i).text() + '</td><td align=right>' + $('#Col11_' + i).text() + '</td></tr>');
            }
           
           // Rowcount++;

            //if (Rowcount % 49 == 0) {
            //    Rowcount = 0;
            //    myWindow.document.write('<tr style="border:1px solid white;border-bottom:1px solid grey"><td height=150px colspan=11></td></tr>');
            //}
        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}



//New Print Function for Deferred Income Stmnt
function PrintthisDeferredIncomeStmnt(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>DEFERRED  INCOME  STATEMENT</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td width=3% align=center>Sl#</td><td align=center width=15%>Flat#</td><td align=center>DEWA#</td><td align=center>Type</td><td align=center>Rent</td><td align=center width=8%>Days</td><td align=center width=8%>Expiry On</td><td align=center>Income</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#Tblreport tr').length) {
            slno++;
            if ($('#Col1_' + i).text() == '' && $('#Col3_' + i).text() != 'Total')
            {
                myWindow.document.write('<tr class=brtd2 style="background-color:#cfd8dc;border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td><b>' + $('#Col3_' + i).text() + '</b></td><td align=right>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td></tr>');
               // myWindow.document.write('<tr  style="background-color:#cfd8dc;border-top:1px solid gray;"><td colspan=10 class=brtd align=center><b>&nbsp;' + '<b>&nbsp;' + $('#Col3_' + i).text() + '</b></td></tr>');
            }
           else if ($('#Col3_' + i).text() == 'Total') {
                myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td></tr>');
            }
            else {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=right>' + $('#Col4_' + i).text() + '</td><td align=center>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=right>' + $('#Col7_' + i).text() + '</td></tr>');
            }

        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}


function PrintthisGratuityReport(Rowlen) {
    var slno = 0; var Rowcount = 8;
    var myWindow = window.open("", "", "width=1500,height=1500");

    myWindow.document.write('<style type="text/css">.brdrgh{border-right:1px solid grey;} .blclr{color:#00838F} .brtd2{border-bottom:1px solid lightgrey;} .brtd2 td{border-right:1px solid grey;} .txbld{font-weight:bold;font-size:20} .txbld1{font-size:15}  </style> <style type="text/css" media="print"> tfoot{display:table-footer-group;} </style> <style type="text/css" media="screen"> tfoot{ position: relative; display: block;} tr { page-break-inside: avoid }</style>');
    myWindow.document.write(PrintBG);

    myWindow.document.write('<table width=100% ><tr><td rowsspan=2 colspan=8 align=center>' + (ComapnydivToPrint.outerHTML) + '</td></tr></table>');
    myWindow.document.write('<table width=100% ><tr align=center><td colspan=6>' + window.CompanySettingsArray.CompanyName + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Address + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.Email + '</td></tr><tr align=center><td colspan=6>' + window.CompanySettingsArray.PhoneNo + '</td></tr></table>');

    myWindow.document.write('<table width=100%; class=violetbg style="text-align:left;"><tr   style=text-align:center><td style=border-right:1px solid #5c3158;>Gratuity Report</td></tr></table>');
    myWindow.document.write('<table height=5px width=100%><tr><td colspan=8></td></tr> </table>');
    myWindow.document.write('<table width=100%; style="text-align:left;"><tr style=text-align:center><td style="" width=30%>' + $('#header2').text() + '</td></tr></table>');

    myWindow.document.write('<table height=10px width=100%><tr><td colspan=8></td></tr> </table>');

    myWindow.document.write('<table style="border-collapse:collapse;font-size:80%;" frame="box" width=100% bordercolor="grey"><tr class=violetbg><td align=center>Sl#</td><td>Employee Name</td><td align=center>Emp.ID</td><td align=center>Designation</td><td align=center>Date of Join</td><td align=right>Basic Salary</td><td align=center>Years</td><td align=center>Days</td><td align=center>Eligible Days</td><td align=right>Gratuity</td></tr>');


    for (var i = 1; i <= Rowlen; i++) {
        var Id = parseInt(i + 1);
        if ($('#ResultLength').val()) {
            slno++;
            if ($('#Col3_' + i).text() == 'Total') {
                myWindow.document.write('<tr class=violetbg style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;"></td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=center>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td align=center>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
            }
            else {
                myWindow.document.write('<tr class=brtd2  style="border-bottom:1px solid grey"><td style="border-left:1px solid grey;" align=center>' + slno + '</td><td>' + $('#Col1_' + i).text() + '</td><td>' + $('#Col2_' + i).text() + '</td><td>' + $('#Col3_' + i).text() + '</td><td align=center>' + $('#Col4_' + i).text() + '</td><td align=right>' + $('#Col5_' + i).text() + '</td><td align=center>' + $('#Col6_' + i).text() + '</td><td align=center>' + $('#Col7_' + i).text() + '</td><td align=center>' + $('#Col8_' + i).text() + '</td><td align=right>' + $('#Col9_' + i).text() + '</td></tr>');
            }

        }
    }

    myWindow.document.write('</table>');

    myWindow.print();
}