function princasheetnew() {

    var myWindow = window.open("", "", "width=900,height=1100");

    var patName = $("#PatientName").val();
    var patOP = $("#RevisitId").val();
    var patAge = $("#PatientAge").text();
    var patGender = $("#PatientGender").text();
    var patContact = $("#ContactNo").val();
    var caseDate = $("#CaseDate").val();

    var doctor = $("#Vistdr_1").val();
    var regNo = $("#UserRegNo").text();
    var speciality = $("#UserSpeciality").text();

    var complaint = $('#Complaint').val();
    var diagnosis = $('#ICDDetails').val();

    // FORMAT AGE
    var ageFormatted = patAge
        .replace(/(\d+)\s*Yrs?/i, '$1y')
        .replace(/(\d+)\s*Mths?/i, '$1m')
        .replace(/\s*\d+\s*Days?/i, '')
        .trim();

    // FORMAT DATE
    var caseDateFormatted = caseDate ? caseDate.replace(/\//g, '-') : '';

    // HEADER using ComapnyImage
    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");
    $(ComapnydivToPrintLab).css('height', 100);
    $(ComapnydivToPrintLab).css('width', 700);
    var headerHtml = '<table width="100%"><tr><td width="100%" align="center" style="color:#008000;font-weight:bold;">'
        + ComapnydivToPrintLab.outerHTML
        + '</td></tr></table>';

    // PATIENT SUMMARY box
    var patientSummaryHtml =
        '<table width="100%"><tr><td style="font-family:tahoma;font-size:13px;font-weight:normal;" align="center">PATIENT SUMMARY</td></tr></table>' +
        '<div style="border:1px solid black;border-top:1px solid black;border-radius:10px">' +
        '<table style="" width="90%"><tr>' +
        '<td width="60%"><table style="font-family:tahoma;font-size:13px;font-weight:normal;">' +
        '<tr><td>MR-No#</td><td> : </td><td>' + $("#PRegNo").val() + '</td></tr>' +
        '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
        '<tr><td>Doctor</td><td> : </td><td>' + $("#Vistdr_1").val() + '</td></tr>' +
        '</table></td>' +
        '<td width="40%" align="right"><table style="font-family:tahoma;font-size:13px;font-weight:normal;">' +
        '<tr><td>OP-No#</td><td> : </td><td>' + $("#PatientOP").text() + '</td></tr>' +
        '<tr><td>Age &amp; Sex</td><td> : </td><td>' + ageFormatted.replace(/#.*/g, '').trim() + ', ' + $("#PatientGender").text() + '</td></tr>' +
        '<tr><td>Date</td><td> : </td><td>' + $("#CaseDate").val() + '</td></tr>' +
        '</table></td>' +
        '</tr></table></div>';

    myWindow.document.open();
    myWindow.document.write(`
<html>
<head>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            background: #fff;
            color: #000;
        }
        .page {
            width: 850px;
            min-height: 1050px;
            margin: 0 auto;
            padding: 24px 36px 100px 36px;
            position: relative;
        }
        .divider-thick { border: none; border-top: 2.5px solid #000; margin: 7px 0 2px 0; }
        .divider-thin  { border: none; border-top: 1px solid #000; margin: 0 0 6px 0; }
        .divider-mid   { border: none; border-top: 1px solid #000; margin: 4px 0 8px 0; }
        .section { margin-top: 10px; margin-bottom: 4px; }
        .section-title {
            font-weight: bold;
            font-size: 13.5px;
            margin-bottom: 3px;
        }
        .section-content { font-size: 12.5px; margin-left: 6px; }
        .rx {
            font-family: 'Times New Roman', Times, serif;
            font-size: 42px;
            font-style: italic;
            margin: 14px 0 6px 0;
            line-height: 1;
        }
        .med-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12.5px;
            margin-top: 4px;
        }
        .med-table th {
            background-color: #cfcfcf;
            font-weight: bold;
            padding: 8px 10px;
            text-align: left;
        }
        .med-table td {
            padding: 8px 10px;
            border-bottom: 1px solid #ddd;
            vertical-align: top;
        }
        .med-table tr:last-child td { border-bottom: none; }
        .med-brand   { font-weight: bold; }
        .med-generic { font-size: 11px; color: #333; margin-top: 2px; }
        .no-med      { font-style: italic; color: #666; }
        .footer {
            position: absolute;
            bottom: 200px;
            right: 36px;
            text-align: right;
            line-height: 1.7;
            font-size: 16px;
            font-family: Arial, sans-serif;
            letter-spacing: 0.5px;
        }
        .footer-doctor {
            font-weight: bold;
            font-size: 20px;
            font-family: Arial, sans-serif;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
<div class="page">
 
    <!-- HEADER -->
    ${headerHtml}
 
    <!-- PATIENT SUMMARY -->
    ${patientSummaryHtml}
 
    <hr class="divider-mid" style="margin-top:10px;margin-bottom:10px;">
 
    ${complaint ? `
    <div class="section">
        <div class="section-title" style="font-size:18px;font-weight:bold;letter-spacing:0.5px;margin-bottom:20px;font-family:'Times New Roman',Times,serif;">Chief complaints</div>
        <div class="section-content" style="margin-bottom:20px;">${complaint}</div>
    </div>` : ''}
 
    ${diagnosis ? `
    <div class="section">
        <div class="section-title" style="font-size:18px;font-weight:bold;letter-spacing:0.5px;margin-bottom:20px;font-family:'Times New Roman',Times,serif;">Diagnosis</div>
        <div class="section-content" style="margin-bottom:20px;">${diagnosis}</div>
    </div>` : ''}
 
    <div class="rx">&#x211E;</div>
 
    <table class="med-table">
        <thead>
            <tr style="font-size:16px;font-family:'Times New Roman',Times,serif;">
                <th style="width:50%">Medicine Name</th>
                <th style="width:15%">Duration</th>
                <th style="width:15%">Dosages</th>
                <th style="width:20%">Instruction</th>
            </tr>
        </thead>
        <tbody id="med-body"></tbody>
    </table>
 
    <div class="footer">
        <div>Electronically Signed by:</div>
        <div class="footer-doctor">${doctor}</div>
        ${regNo ? `<div>(Reg No.: ${regNo})</div>` : ''}
        ${speciality ? `<div>${speciality}</div>` : ''}
    </div>
 
</div>
</body>
</html>`);

    myWindow.document.close();

    // BUILD MEDICINE ROWS
    var hasMedicine = false;
    var rows = '';

    for (var i = 1; i <= (typeof MedCount !== 'undefined' ? MedCount : 0); i++) {
        var medName = $('#Medicine' + i).val();
        var generic = $('#Generic' + i).val() || '';

        if (medName && $.trim(medName) !== '') {
            hasMedicine = true;
            rows += `
        <tr>
            <td>
                <div class="med-brand">${medName}</div>
                <div class="med-generic">${generic}</div>
            </td>
            <td>${$('#Days' + i).val()} day(s)</td>
            <td>${$('#Dosage' + i).val()}</td>
            <td>${$('#mednote' + i).val()}</td>
        </tr>`;
        }
    }

    if (!hasMedicine) {
        rows = `<tr><td colspan="4" class="no-med">No medicines prescribed</td></tr>`;
    }

    myWindow.document.getElementById('med-body').innerHTML = rows;

    myWindow.focus();
    setTimeout(function () { myWindow.print(); }, 700);
}