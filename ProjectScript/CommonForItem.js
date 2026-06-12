
/*=========================================================================================
    File Name: CommonForItem.js
    Description: Common Functions For Item
    ----------------------------------------------------------------------------------------
    Item Name: Eumi-ERP
    Version: 1.0
    Author: Eumi
    Author URL: eumierp.com
    Date       :23-07-2018
==========================================================================================*/





$(document).keydown(function (e) {


   
    $('#Warningpopup').fadeOut();
    if (e.altKey && e.keyCode == 83) {
        if ($("#btnsubmit").is(":visible")) {
            SaveAndUpdate(1)
        }
    }
    else if (e.altKey && e.keyCode == 76) {
        GetRows(0)
    }
    else if (e.altKey && e.keyCode == 67) {
        thisformrefresh();
    }
    else if (e.altKey && e.keyCode == 88) {
        closetable();
    }
    else if (e.altKey && e.keyCode == 49) {
        $("#tab1").click();
        $("#mod1").focus();
    }
    else if (e.altKey && e.keyCode == 50) {
        $("#tab2").click();
        $("#size").focus();
    }
    else if (e.altKey && e.keyCode == 51) {
        $("#tab3").click();
        $("#btnadd").focus();
    }
    else if (e.altKey && e.keyCode == 52) {
        $("#tab4").click();
        $("#Price_1").focus();
    }
    else if (e.altKey && e.keyCode == 53) {
        $("#tabm").click();
        $("#modelm1").focus();
    }
    else if (e.altKey && e.keyCode == 80) {
        printbarcode();
    }
    else if (e.keyCode == 27) {                             //ESC       :   Close Popup
        formrefresh();
    }

})




$(document).ready(function () {
    var decimail = 2; 

    $('#code,#description,#opqty,#opcost,#mod1,#mod2,#mod3,#maxqty,#minqty,#bin_a,#bin_b,#bin_c,#bin_d,#bin_d,#bin_e,#bin_f,#bin_g,#bin_h,#size,#weight,#length,#width,#thickness,#density,#spec,#groupcode,#groupname,#grp,#sbgroupname,#catcode,#catname,#cat,#sbcatname,#otherdescription,#unitname').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            var inputs = $(this).closest('form').find(':input:enabled');
            inputs.eq(inputs.index(this) + 1).focus();
            inputs.eq(inputs.index(this) + 1).select();
        }

    });
    $('#code').keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#description').focus();
        }

    });
    $("#unitdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnunitsave').focus();
        }

    });
    $("#groupdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btngroupsave').focus();
        }

    });
    $("#sbgroupdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsbgroupsave').focus();
        }

    });
    $("#catdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btncategorysave').focus();
        }

    });
    $("#sbcatdesc").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsbcategorysave').focus();
        }

    });
    $("#unit").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#group').focus();
        }

    });
    $("#group").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#sbgroup').focus();
        }

    });
    $("#sbgroup").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#category').focus();
        }

    });
    $("#category").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#sbcat').focus();
        }

    });
    $("#sbcat").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#opqty').focus();
        }

    });
    $("#vatcode").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#hsncode').focus();
        }

    });
    $("#hsncode,#sellingprice2,#spec").keydown(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            e.preventDefault();
            $('#btnsubmit').focus();
        }

    });

    $('#mrp').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#sprice').focus();
            e.preventDefault();
        }
    });

    $('#sprice').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#sellingprice1').focus();
            e.preventDefault();
        }
    });

    $('#sellingprice1').keypress(function (e) {
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
        if (key == 13) {
            $('#sellingprice2').focus();
            e.preventDefault();
        }
    });

     //Only Allows Numbers With Floating Point

    $('input[name="inputnumberfloat"]').keypress(function (e) {
        $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
        if (e.which != 8 && e.which != 0 && (e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });


    //Only Allows Numbers Without Floating Point

    $('input[name="inputnumberint"]').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            warningshow('Digits Only')
            return false;
        }

    });


});//End Document.ready

function ConfirmboxResult(Result, status, rowid) {
    if (Result == 'true') {
        SaveAndUpdate(0)
    }
    $('#confirm').fadeOut();

}



function datatableWithsearch(tablename) {
    var a = '#' + tablename + ' tfoot th'
    $(a).each(function () {
        var title = $(this).text();
        if (title != 'Edit' && title != 'Slno' && title != 'Credit Limit' && title != 'Due Days' && title != 'O Balance' && title != 'Currency')
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    var table = $('#' + tablename).DataTable();
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





//Numeric Only Text Boxes


function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode != 8 && charCode != 46 && charCode != 13 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        warningshow('Digits Only')
        return false;
    }
    return true;

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
//Show Warnig Popup right top
function warningshow(message, Id) {   
    $('#popupmessage').text(message);
    $('#Warningpopup').show();
    $('#' + Id).focus();
    window.setTimeout(function () {
        $('#Warningpopup').fadeOut();
    }, 3000);
}

//conge Lower Case letter to upper CODE and NAME
function changetoupper(Id) {
    $('#' + Id).val($('#' + Id).val().toUpperCase())
}



//Show Window Alert Insert,update delete  Modify
function Showalerts(Status) {




    if (Status == 1) {
        formrefresh();
        alert('Data Saved Successfully');
        
      
    }
    else if (Status == 2) {
        formrefresh();
        alert('Data Updated Successfully');
       
    }
    else if (Status == 3) {
        formrefresh();
        alert('Data Deleted');       

       
    }
    else {
        swal('Data Already Exists');


    }

}

