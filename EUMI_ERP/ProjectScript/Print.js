//function princasheetnew() {

//    var myWindow = window.open("", "", "width=900,height=1100");

//    var patName = $("#PatientName").val();
//    var patOP = $("#RevisitId").val();
//    var patAge = $("#PatientAge").text();
//    var patGender = $("#PatientGender").text();
//    var patContact = $("#ContactNo").val();
//    var caseDate = $("#CaseDate").val();

//    var doctor = $("#Vistdr_1").val();
//    var regNo = $("#UserRegNo").text();
//    var speciality = $("#UserSpeciality").text();

//    var complaint = $('#Complaint').val();
//    var diagnosis = $('#ICDDetails').val();


//    var ageFormatted = patAge
//        .replace(/(\d+)\s*Yrs?/i, '$1y')
//        .replace(/(\d+)\s*Mths?/i, '$1m')
//        .replace(/\s*\d+\s*Days?/i, '')
//        .trim();


//    var caseDateFormatted = caseDate ? caseDate.replace(/\//g, '-') : '';

//    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");
//    $(ComapnydivToPrintLab).css('height', 100);
//    $(ComapnydivToPrintLab).css('width', 700);
//    var headerHtml = '<table width="100%"><tr><td width="100%" align="center" style="color:#008000;font-weight:bold;">'
//        + ComapnydivToPrintLab.outerHTML
//        + '</td></tr></table>';

//    var patientSummaryHtml =
//        '<table width="100%"><tr><td style="font-family:tahoma;font-size:13px;font-weight:normal;" align="center">PATIENT SUMMARY</td></tr></table>' +
//        '<div style="border:1px solid black;border-top:1px solid black;border-radius:10px">' +
//        '<table style="" width="90%"><tr>' +
//        '<td width="60%"><table style="font-family:tahoma;font-size:13px;font-weight:normal;">' +
//        '<tr><td>MR-No#</td><td> : </td><td>' + $("#PRegNo").val() + '</td></tr>' +
//        '<tr><td>Name</td><td> : </td><td>' + $("#PatientName").val() + '</td></tr>' +
//        '<tr><td>Doctor</td><td> : </td><td>' + $("#Vistdr_1").val() + '</td></tr>' +
//        '</table></td>' +
//        '<td width="40%" align="right"><table style="font-family:tahoma;font-size:13px;font-weight:normal;">' +
//        '<tr><td>OP-No#</td><td> : </td><td>' + $("#PatientOP").text() + '</td></tr>' +
//        '<tr><td>Age &amp; Sex</td><td> : </td><td>' + ageFormatted.replace(/#.*/g, '').trim() + ', ' + $("#PatientGender").text() + '</td></tr>' +
//        '<tr><td>Date</td><td> : </td><td>' + $("#CaseDate").val() + '</td></tr>' +
//        '</table></td>' +
//        '</tr></table></div>';

//    myWindow.document.open();
//    myWindow.document.write(`
//<html>
//<head>
//    <style>
//        * { box-sizing: border-box; margin: 0; padding: 0; }
//        body {
//            font-family: Arial, sans-serif;
//            font-size: 12px;
//            background: #fff;
//            color: #000;
//        }
//        .page {
//            width: 850px;
//            min-height: 1050px;
//            margin: 0 auto;
//            padding: 24px 36px 100px 36px;
//            position: relative;
//        }
//        .divider-thick { border: none; border-top: 2.5px solid #000; margin: 7px 0 2px 0; }
//        .divider-thin  { border: none; border-top: 1px solid #000; margin: 0 0 6px 0; }
//        .divider-mid   { border: none; border-top: 1px solid #000; margin: 4px 0 8px 0; }
//        .section { margin-top: 10px; margin-bottom: 4px; }
//        .section-title {
//            font-weight: bold;
//            font-size: 13.5px;
//            margin-bottom: 3px;
//        }
//        .section-content { font-size: 12.5px; margin-left: 6px; }
//        .rx {
//            font-family: 'Times New Roman', Times, serif;
//            font-size: 42px;
//            font-style: italic;
//            margin: 14px 0 6px 0;
//            line-height: 1;
//        }
//        .med-table {
//            width: 100%;
//            border-collapse: collapse;
//            font-size: 12.5px;
//            margin-top: 4px;
//        }
//        .med-table th {
//            background-color: #cfcfcf;
//            font-weight: bold;
//            padding: 8px 10px;
//            text-align: left;
//        }
//        .med-table td {
//            padding: 8px 10px;
//            border-bottom: 1px solid #ddd;
//            vertical-align: top;
//        }
//        .med-table tr:last-child td { border-bottom: none; }
//        .med-brand   { font-weight: bold; }
//        .med-generic { font-size: 11px; color: #333; margin-top: 2px; }
//        .no-med      { font-style: italic; color: #666; }
//        .footer {
//            position: absolute;
//            bottom: 200px;
//            right: 36px;
//            text-align: right;
//            line-height: 1.7;
//            font-size: 16px;
//            font-family: Arial, sans-serif;
//            letter-spacing: 0.5px;
//        }
//        .footer-doctor {
//            font-weight: bold;
//            font-size: 20px;
//            font-family: Arial, sans-serif;
//            letter-spacing: 0.5px;
//        }
//    </style>
//</head>
//<body>
//<div class="page">

//    <!-- HEADER -->
//    ${headerHtml}

//    <!-- PATIENT SUMMARY -->
//    ${patientSummaryHtml}

//    <hr class="divider-mid" style="margin-top:10px;margin-bottom:10px;">

//    ${complaint ? `
//    <div class="section">
//        <div class="section-title" style="font-size:18px;font-weight:bold;letter-spacing:0.5px;margin-bottom:20px;font-family:'Times New Roman',Times,serif;">Chief complaints</div>
//        <div class="section-content" style="margin-bottom:20px;">${complaint}</div>
//    </div>` : ''}

//    ${diagnosis ? `
//    <div class="section">
//        <div class="section-title" style="font-size:18px;font-weight:bold;letter-spacing:0.5px;margin-bottom:20px;font-family:'Times New Roman',Times,serif;">Diagnosis</div>
//        <div class="section-content" style="margin-bottom:20px;">${diagnosis}</div>
//    </div>` : ''}

//    <div class="rx">&#x211E;</div>

//    <table class="med-table">
//        <thead>
//            <tr style="font-size:16px;font-family:'Times New Roman',Times,serif;">
//                <th style="width:50%">Medicine Name</th>
//                <th style="width:15%">Duration</th>
//                <th style="width:15%">Dosages</th>
//                <th style="width:20%">Instruction</th>
//            </tr>
//        </thead>
//        <tbody id="med-body"></tbody>
//    </table>

//    <div class="footer">
//        <div>Electronically Signed by:</div>
//        <div class="footer-doctor">${doctor}</div>
//        ${regNo ? `<div>(Reg No.: ${regNo})</div>` : ''}
//        ${speciality ? `<div>${speciality}</div>` : ''}
//    </div>

//</div>
//</body>
//</html>`);

//    myWindow.document.close();


//    var hasMedicine = false;
//    var rows = '';

//    for (var i = 1; i <= (typeof MedCount !== 'undefined' ? MedCount : 0); i++) {
//        var medName = $('#Medicine' + i).val();
//        var generic = $('#Generic' + i).val() || '';

//        if (medName && $.trim(medName) !== '') {
//            hasMedicine = true;
//            rows += `
//        <tr>
//            <td>
//                <div class="med-brand">${medName}</div>
//                <div class="med-generic">${generic}</div>
//            </td>
//            <td>${$('#Days' + i).val()} day(s)</td>
//            <td>${$('#Dosage' + i).val()}</td>
//            <td>${$('#mednote' + i).val()}</td>
//        </tr>`;
//        }
//    }

//    if (!hasMedicine) {
//        rows = `<tr><td colspan="4" class="no-med">No medicines prescribed</td></tr>`;
//    }

//    myWindow.document.getElementById('med-body').innerHTML = rows;

//    myWindow.focus();
//    setTimeout(function () { myWindow.print(); }, 700);
//}


// =========================================================================
// princasheetnew() — redesigned to match the reference prescription pad
// (rounded gold patient-info card with icons + S.No / Drug / Dose / Route /
// M-A-E-N / Duration table).
//
// DATA-MAPPING NOTES (please check these against your real field meanings
// before going live — they're my best guess based on the existing labels
// in CaseSheet.cshtml):
//   - "Dose"      <- #Daily{i}   (was labelled "NO's" in the entry grid)
//   - "Route"     <- #mednote{i} (was labelled "Notes" in the entry grid)
//   - M / A / E / N <- parsed from #Dosage{i} (was labelled "Frequency",
//                     and stores values like "1-1-1-1" or "0-1-0")
//   - "Duration"  <- #Days{i}
// If your "Frequency" field doesn't actually store a dash-separated
// Morning-Afternoon-Evening-Night pattern, tweak parseFrequency() below.
// =========================================================================

function PrescriptionOnlyPrint() {

    var myWindow = window.open("", "", "width=900,height=1100");

    var patName = $("#PatientName").val();
    var patAge = $("#PatientAge").text();
    var patGender = $("#PatientGender").text();
    var caseDate = $("#CaseDate").val();
    var opNo = $("#PatientOP").text();

    var doctor = $("#Vistdr_1").val();
    var regNo = $("#UserRegNo").text();
    var speciality = $("#UserSpeciality").text();

    var diagnosis = $('#ICDDetails').val() || '';

    function esc(v) { return (v == null) ? '' : String(v); }
    function parseFrequency(str) {
        var parts = (str || '').split('-').map(function (p) { return p.trim(); });
        var cell = { M: '', A: '', E: '', N: '' };
        function v(x) { return (x && x !== '0') ? x : ''; }
        if (parts.length >= 4) {
            cell.M = v(parts[0]); cell.A = v(parts[1]); cell.E = v(parts[2]); cell.N = v(parts[3]);
        } else if (parts.length === 3) {
            cell.M = v(parts[0]); cell.A = v(parts[1]); cell.N = v(parts[2]);
        } else if (parts.length === 2) {
            cell.M = v(parts[0]); cell.N = v(parts[1]);
        } else if (parts.length === 1) {
            cell.M = v(parts[0]);
        }
        return cell;
    }

    var ComapnydivToPrintLab = document.getElementById("ComapnyImage");
    $(ComapnydivToPrintLab).css('height', 90);
    $(ComapnydivToPrintLab).css('width', 600);
    var headerHtml = '<table width="100%"><tr><td width="100%" align="center">' +
        ComapnydivToPrintLab.outerHTML + '</td></tr></table>';

    myWindow.document.open();
    myWindow.document.write(`
<html>
<head>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            background: #fff;
            color: #1a1a1a;
        }
        .page {
            width: 850px;
            min-height: 1050px;
            margin: 0 auto;
            padding: 20px 36px 100px 36px;
            position: relative;
        }

        /* ---------- PATIENT INFO CARD ---------- */
        .patient-card {
            border: 3px solid #1a1a1a;
            border-radius: 18px;
            padding: 16px 24px;
            margin-top: 14px;
            background: #ffffff;
        }
        .patient-row {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .patient-row:last-child { margin-bottom: 0; }
        .field {
            display: flex;
            align-items: center;
            margin-right: 34px;
        }
        .field:last-child { margin-right: 0; }
        .field .icon {
            width: 26px;
            height: 26px;
            min-width: 26px;
            border-radius: 50%;
            background: #1a1a1a;
            color: #fff;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            margin-right: 8px;
        }
        .field .lbl {
            font-weight: bold;
            font-size: 13px;
            white-space: nowrap;
            margin-right: 6px;
        }
        .field .val {
            font-size: 13px;
            border-bottom: 1px solid #c9c9c9;
            min-width: 140px;
            padding-bottom: 1px;
        }
        .field.wide .val { min-width: 420px; }

        /* ---------- Rx MARK ---------- */
        .rx {
            font-family: 'Times New Roman', Times, serif;
            font-size: 40px;
            font-style: italic;
            margin: 18px 0 8px 0;
            line-height: 1;
            color: #1a1a1a;
        }

        /* ---------- MEDICINE TABLE ---------- */
        .med-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12.5px;
        }
        .med-table th {
            background-color: #ffffff;
            color: #1a1a1a;
            font-weight: bold;
            padding: 10px 6px;
            text-align: center;
            border: 1px solid #1a1a1a;
        }
        .med-table td {
            padding: 8px 6px;
            border: 1px solid #c9c9c9;
            text-align: center;
            vertical-align: middle;
        }
        .med-table tr:nth-child(even) td { background-color: #f2f2f2; }
        .med-table td.sno {
            background-color: inherit;
            color: #1a1a1a;
            font-weight: bold;
            width: 5%;
        }
        .med-table td.drugname { text-align: left; width: 26%; }
        .med-brand   { font-weight: bold; }
        .med-generic { font-size: 11px; color: #555; margin-top: 2px; }
        .no-med      { font-style: italic; color: #666; }
        .timecol { width: 6%; }

        /* ---------- FOOTER ---------- */
        .footer {
            position: absolute;
            bottom: 200px;
            right: 36px;
            text-align: right;
            line-height: 1.7;
            font-size: 16px;
            letter-spacing: 0.5px;
        }
        .footer-doctor {
            font-weight: bold;
            font-size: 20px;
            letter-spacing: 0.5px;
        }
    </style>
</head>
<body>
<div class="page">

    <!-- CLINIC HEADER -->
    ${headerHtml}

    <!-- PATIENT INFO CARD (matches reference template) -->
    <div class="patient-card">
        <div class="patient-row">
            <div class="field">
                <span class="icon">&#128100;</span>
                <span class="lbl">NAME :</span>
                <span class="val">${esc(patName)}</span>
            </div>
            <div class="field">
                <span class="icon">&#127874;</span>
                <span class="lbl">AGE :</span>
                <span class="val" style="min-width:60px">${esc(patAge)}</span>
            </div>
            <div class="field">
                <span class="icon">&#9893;</span>
                <span class="lbl">SEX :</span>
                <span class="val" style="min-width:60px">${esc(patGender)}</span>
            </div>
        </div>
        <div class="patient-row">
            <div class="field wide">
                <span class="icon">&#128203;</span>
                <span class="lbl">OP/IP No. :</span>
                <span class="val">${esc(opNo)}</span>
            </div>
        </div>
        <div class="patient-row">
            <div class="field">
                <span class="icon">&#128197;</span>
                <span class="lbl">DATE :</span>
                <span class="val">${esc(caseDate)}</span>
            </div>
            <div class="field wide">
                <span class="icon">&#128221;</span>
                <span class="lbl">DIAGNOSIS :</span>
                <span class="val">${esc(diagnosis)}</span>
            </div>
        </div>
    </div>

    <div class="rx"></div>

    <table class="med-table">
        <thead>
            <tr>
                <th>S.NO</th>
                <th>NAME OF THE DRUG</th>
                <th>DOSE</th>
                <th>ROUTE</th>
                <th class="timecol">M</th>
                <th class="timecol">A</th>
                <th class="timecol">E</th>
                <th class="timecol">N</th>
                <th>DURATION<br>(In Days)</th>
            </tr>
        </thead>
        <tbody id="med-body"></tbody>
    </table>

    <div class="footer">
        <div>Electronically Signed by:</div>
        <div class="footer-doctor">${esc(doctor)}</div>
        ${regNo ? `<div>(Reg No.: ${esc(regNo)})</div>` : ''}
        ${speciality ? `<div>${esc(speciality)}</div>` : ''}
    </div>

</div>
</body>
</html>`);

    myWindow.document.close();

    var hasMedicine = false;
    var rows = '';

    for (var i = 1; i <= (typeof MedCount !== 'undefined' ? MedCount : 0); i++) {
        var medName = $('#Medicine' + i).val();

        if (medName && $.trim(medName) !== '') {
            hasMedicine = true;

            var dose = $('#Daily' + i).val() || '';
            var route = $('#mednote' + i).val() || '';
            var freq = parseFrequency($('#Dosage' + i).val());
            var days = $('#Days' + i).val() || '';

            rows += `
        <tr>
            <td class="sno">${i}</td>
            <td class="drugname">
                <div class="med-brand">${esc(medName)}</div>
            </td>
            <td>${esc(dose)}</td>
            <td>${esc(route)}</td>
            <td>${esc(freq.M)}</td>
            <td>${esc(freq.A)}</td>
            <td>${esc(freq.E)}</td>
            <td>${esc(freq.N)}</td>
            <td>${esc(days)}</td>
        </tr>`;
        }
    }

    if (!hasMedicine) {
        rows = `<tr><td colspan="9" class="no-med">No medicines prescribed</td></tr>`;
    }

    myWindow.document.getElementById('med-body').innerHTML = rows;

    myWindow.focus();
    setTimeout(function () { myWindow.print(); }, 700);
}