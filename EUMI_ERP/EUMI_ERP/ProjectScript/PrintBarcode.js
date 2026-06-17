

function PrintBarcodes() {


    var TotalItems = $('#tblbarcodeprint tbody tr').length;
    $('#tblbarcodeprintconfirm').html('');
    var txt = "<tr><th></th></tr>";
    for (var n = 1; n <= TotalItems; n++) {

        console.log($('#checkboxbarcode_' + n).prop("checked"))


        if ($('#checkboxbarcode_' + n).prop("checked")) {
            var Code = $('#productbarcode_' + n).text();
            var Description = $('#productdescbarcode_' + n).text();
            var quantityvalue = $('#barcodequantity_' + n).val();

            for (var j = 0; j < quantityvalue ; j++) {

                
                txt += '<tr><td>CT~~CD,~CC^~CT~</td></tr>';
                txt += '<tr><td>^XA~TA000~JSN^LT0^MNW^MTD^PON^PMN^LH0,0^JMA^PR4,4~SD15^JUS^LRN^CI0^XZ</td></tr>';
                txt += '<tr><td>^XA</td></tr>';
                txt += '<tr><td>^MMT</td></tr>';
                txt += '<tr><td>^PW812</td></tr>';
                txt += '<tr><td>^LL0508</td></tr>';
                txt += '<tr><td>^LS0</td></tr>';
                txt += '<tr><td>^FO320,256^GFA,01536,01536,00024,:Z64:</td></tr>';
                txt += '<tr><td>eJxjYBgFo2DgAfsHCM3DDmT/ATIS6o9/qGdg4IeJMzEwMP8AMg7Y9//4D+QLQMRlQOrBrAIWmYMNDDwSH/oMD+48eILtEQcTQ5uaRYMCDwdQXKb477nyj98//2H/LsPGeKz+74EEGZvjQPMfc/SlKbcpW/AlW/D/6Cue0fC//8c/Bgb547L3/D/zf5eQKTbg/9hTLNnwX/4j0F0STByz+j/zf5LgUFbgYexIkmw4IAE0HugOmetn2HnYDGSKC2SYZdKNGQ/IJB5gYLBgsnjcl8SXZsCT/ICDWeKZMUODRTJQvQHzh+/sx9mPf5A/eED+85/jxoz/BYqBvjBgfPCYuYm5eYN0Y4P8xxltSoz/DYxRQorxAPYQ5G/AIU5ulIyCEQAA715fmQ==:419B</td></tr>';
                txt += '<tr><td>^BY2,3,155^FT103,240^BCN,,Y,N</td></tr>';
                txt += '<tr><td>^FD>:' + Code + '^FS</td></tr>';
                txt += '<tr><td>^FT105,72^A0N,25,21^FH\^FD' + Description + '^FS</td></tr>';
                txt += '<tr><td>^PQ1,0,1,Y^XZ</td></tr>';
                txt += '<tr></tr>'

                
            }

        }
    }
    $('#tblbarcodeprintconfirm').append(txt);
    PrintBarcode();
}


function PrintBarcode() {
    var titles = [];
    var data = [];
    $('.dataTableA th').each(function () {
        titles.push($(this).text());
    });
    $('.dataTableA tr').each(function () {
        data.push($(this).text());
    });
    var CSVString = prepCSVRow(titles, titles.length, '');
    CSVString = prepCSVRow(data, titles.length, CSVString);
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", CSVString]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "eumi_barcode.txt";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

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

