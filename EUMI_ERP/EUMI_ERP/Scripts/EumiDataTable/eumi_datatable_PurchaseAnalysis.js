(function ($) {
    $.fn.EumiDataTable = function (options) {
        var jqtable = this;
        var table = this.on("preXhr.dt.eumiTable", function () {
            $("body").addClass("eumi-loader");
        }).on("draw.dt.eumiTable", function () {
            $("body").removeClass("eumi-loader");
        }).DataTable(options);

        this.filter(".eumi-search-table").find("tfoot tr.eumi-search-row th").each(function () {
            var title = $(this).text();
            if (title == 'Date' ||title ==  'Bill Number') {
                $(this).html('<input type="text"  style="width:80px"  placeholder="' + title + '"/>')
            }
            else if (title == 'Bill Series') {
                $(this).html('<input type="text"  style="width:60px"  placeholder="' + title + '"/>')
            }
            else if (title == 'Item Code' || title == 'Customer') {
                $(this).html('<input type="text"  style="width:180px"  placeholder="' + title + '"/>')
            }
            else if (title == 'Salesman') {
                $(this).html('<input type="text"  style="width:110px"  placeholder="' + title + '"/>')
            }
            else if (title == 'Item Name') {
                $(this).html('<input type="text"  style="width:280px"  placeholder="' + title + '"/>')
            }
            else if (title && !title.match(/^\s+$/)) {
                $(this).html('<input type="text" class="eumi-search-box" placeholder="Search ' + title + '" />');
            }
            
        });

        table.columns().every(function () {
            var that = this;
            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });
        if (ExcelExport == 0) {
            $('.excelexport').hide();
        }
        var jqbarea = $(".eumi-button-area").first();
        var buttonarea = jqbarea.attr("id");
        var jqdiv = $(".eumi-col-show.dropdown-menu").empty();

        // download
        var form = $("<form>").attr("method", "post").attr("action", jqbarea.attr("data-download-url")).attr("target", "_blank")
            .append($("<input>").attr("type", "hidden").attr("name", "jsonStr").val(""))
            .append($("<input>").attr("type", "hidden").attr("name", "type").val(""));
        $("body").find("#" + buttonarea + "_form").remove();
        $("body").append(form.attr("id", buttonarea + "_form"));
        jqbarea.off(".eumidt").on("click.eumidt", "[data-eumi-download]", function (event) {
            form.find('input[name="type"]').val($(this).attr("data-eumi-download"));
            form.find('input[name="jsonStr"]').val(JSON.stringify(table.ajax.params()));
            form.find('input[name="cols"]').remove();

            var max = parseInt($(this).attr("data-eumi-max") || 100, 0);
            if (isNaN(max)) { max = 100; }
            var variable = 0
            jqdiv.find('.eumi-fields.active').each(function () {
                form.append($("<input>").attr("type", "hidden").attr("name", "cols").val($(this).attr("data-eumi-name")));
                variable++;
            });

            if (variable <= max) {
                form.submit();
            }
            else {
                try { alert("Export supported for a max of " + max + " columns"); } catch (ex) { }
            }
            event.preventDefault();
        }).on("click.eumidt", ".eumi-fields[data-eumi-index][data-eumi-name]", function (event) {
            var index = parseInt($(this).attr("data-eumi-index"), 10);
            $(this).toggleClass("active");
            table.columns(index).visible($(this).is(".active"));
            event.preventDefault();
        }).on("click.eumidt", "[data-eumi-clear]", function (event) {
            jqtable.find(".eumi-search-box").val('');
            table.search('').columns().search('').draw();
        });

        // columns
        {
            var cols = table.settings()[0].aoColumns;
            $.each(cols, function (index, ele) {
                if (ele.bVisible) {
                    jqdiv.append($("<a>").attr("href", "#").attr("data-eumi-index", index)
                        .attr("data-eumi-name", ele.data).addClass("dropdown-item active eumi-fields buttons-columnVisibility")
                        .text(ele.title));
                }
            });
        }
    };
}(jQuery));