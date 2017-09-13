/// <reference path="danhmuc/danhmuc.js" />
/// <reference path="../_references.js" />
/**
 * Created by khanhnd on 2/7/2017.
 */


function GetProfileInfo() {
    var divProfile = $("#userProfile");
    var username = divProfile.find('#p-username').val();
    var fullname = divProfile.find('#p-username').val();
    var mabv = divProfile.find('#p-mabv').val();
    var macb = divProfile.find('#p-macb').val();
    var makp = divProfile.find('#p-makp').val();
    var capdo = divProfile.find('#p-capdo').val();
    var khokedon = divProfile.find('#p-khokedon').val();
    //var obj = {
    //    username: username,
    //    fullname: fullname,
    //    mabv: mabv,
    //    macb: macb,
    //    makp: makp,
    //    capdo: capdo,
    //    khokedon: khokedon
    //};
    var obj = {
        username: 'khanhnd',
        fullname: 'Nguyễn Đình Khánh',
        mabv: '12001',
        macb: 'khanhnd',
        makp: '45',
        capdo: '9',
        khokedon: 36
    };
    return obj;
}

$(document).ready(function () {

    $('#pagination-demo').twbsTable();


    XP_Binding_TT_ICD();
    $('#btn-xp-test').click(function (e) {
        var regex = new RegExp(/\w{2}-\d-\d{2}-\d{2}-\d{3}-\d{5}/);
        var str = ["TE", 'DN-1-12-23-123-12345', "TA"];
        $.each(str, function (a, b) {
            console.log(regex.test(b));
        });
        console.log($('#txt_xp_sotheBHYT').val());
        console.log(regex.test($('#txt_xp_sotheBHYT').val()));
        
    });
    InitialSitemap();
    ///
    //$('[data-dtTable]').DataTable({
    //    searching:false
    //});
    
    //iCheck for checkbox and radio inputs
    iCheck_Init();

    $('.input-group.date').datepicker({
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        toggleActive: true,
        format:'dd/mm/yyyy'
    });

    $('[data-mask]').inputmask();

    $('[data-select2s]').select2({
        width:"100%"
    });

    $('input.input-id').alphanum({
           // Disallow extra characters
        allowSpace: false,  // Allow the space character
        //allowNewline: false,  // Allow the newline character \n ascii 10
        allow:'-',
       
        //allowCaseless: false,  // Allow characters that do not have both upper & lower variants
        //// eg Arabic or Chinese
        
        allowOtherCharSets: false,  // eg é, Á, Arabic, Chinese etc
        forceUpper: true, // Convert lower case characters to upper case
        
        
    });

    Binding_CustomFilter_DataTable();
});


/////
function iCheck_Init() {
    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue'
    });
    //Red color scheme for iCheck
    $('input[type="checkbox"].minimal-red, input[type="radio"].minimal-red').iCheck({
        checkboxClass: 'icheckbox_minimal-red',
        radioClass: 'iradio_minimal-red'
    });
    //Flat red color scheme for iCheck
    $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green'
    });
}

///Danh mục cán bộ
function DanhMuc_Canbo() {
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
        var canbo_search = $('#canbo-search');
        var ten_ma = canbo_search.find('[name=txtIDName]').val();
        var khoaphong = canbo_search.find('[name=ddlKhoaPhong]').val();
        var chucvu = canbo_search.find('[name=ddlChucvu]').val();
        var flag = false, flag1 = false, flag2 = false;
        var str = ""; str.indexOf()
        if (ten_ma && khoaphong && chucvu) {
            if ((data[1].indexOf(ten_ma, 0) != -1 || data[2].indexOf(ten_ma, 0) != -1)
                && data[3] == khoaphong && data[6] == chucvu
                ) {
                return true;
            }
        } else {
            if (ten_ma) {
                if ((data[1].indexOf(ten_ma, 0) != -1 || data[2].indexOf(ten_ma, 0) != -1)) {
                    flag = true;
                } else {
                    flag = false;
                }

            }
            else flag = true;
            if (khoaphong) {
                if (khoaphong == data[3]) flag1 = true;
            } else flag1 = true;
            if (chucvu) {
                if (chucvu == data[6]) {
                    flag2 = true;
                }
            } else flag2 = true;
            return (flag && flag1 && flag2);
        }

        return false;
    });
    var table = $('#table-danhmuc-canbo').DataTable();
    var hideColumns = $('#table-danhmuc-canbo').data('hidecolumns');
    if (hideColumns) {

        for (var i = 0; i < hideColumns.length; i++) {
            table.column(hideColumns[i]).visible(false);
            //console.log(dtTable.column[3]);
        }
    }
    $.each($('#canbo-search').find('input, select'), function (a, b) {
        $(b).change(function () {
            table.draw();
        });
    })


}

////Binding thông tin siteMap
function InitialSitemap() {
    var NAV = $('ul.sidebar-menu');
    var navActiveID = NAV.data('nav');
    var aActive = NAV.find('a[data-nav=' + navActiveID + ']');
    if (aActive.length > 0) {
        $.each(NAV.find('li'), function (a, b) {
            if ($(b).has('a[data-nav=' + navActiveID + ']').length>0) {
                $(b).addClass('active');
            } else {
                $(b).removeClass('active');
            }
        })
    }
}

///binding thông tin ICD
function XP_Binding_TT_ICD() {

    $("#ddl-xp-chandoan-maicd").select2({
        width: '100%',
        ajax: {
            url: '/api/icd10/getselecticdbyicd',
            //url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used

                params.page = params.page || 1;

                var obj = {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < 100//data.total_count
                    }
                };

                return obj;
            },
            cache: true
        },
        allowClear: true,
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 0,
        templateResult: function (data) {
            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
                return 'Đang tìm kiếm ...';
            }

            return data.id;//'<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="">' + data.id + '</span>';
        }, // omitted for brevity, see the source of this page
        templateSelection: function (data, container) {
            return data.id;
        } // omitted for brevity, see the source of this page
    });
    $("#ddl-xp-chandoan-maicd2").select2({
        width: '100%',

        ajax: {
            url: '/api/icd10/getselecticdbyicd',
            //url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used

                params.page = params.page || 1;

                var obj = {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < 100//data.total_count
                    }
                };

                return obj;
            },
            cache: true
        },
        allowClear: true,
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 0,
        templateResult: function (data) {
            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
                return 'Đang tìm kiếm ...';
            }

            return data.id;//'<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="color:red;">' + data.id + '</span>';
        }, // omitted for brevity, see the source of this page
        templateSelection: function (data, container) {

            return data.id;
        } // omitted for brevity, see the source of this page
    });
    $("#ddl-xp-chandoan-chandoan").select2({
        width: '100%',
        ajax: {
            url: '/api/icd10/getselecticdbyname',
            //url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                // parse the results into the format expected by Select2
                // since we are using custom formatting functions we do not need to
                // alter the remote JSON data, except to indicate that infinite
                // scrolling can be used

                params.page = params.page || 1;

                var obj = {
                    results: data.items,
                    pagination: {
                        more: (params.page * 30) < 100//data.total_count
                    }
                };

                return obj;
            },
            cache: true
        },
        allowClear: true,
        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
        minimumInputLength: 0,
        templateResult: function (data) {
            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
                return 'Đang tìm kiếm ...';
            }

            return '<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="">' + data.text + '</span>';
        }, // omitted for brevity, see the source of this page
        templateSelection: function (data, container) {
            return data.text;
        } // omitted for brevity, see the source of this page
    });
    $("#ddl-xp-chandoan-maicd").on("select2:select", function (e) {
        //$("#ddl-xp-chandoan-chandoan").val($(this).val());
        //console.log($(this).select2('data'));
        //$("#ddl-xp-chandoan-chandoan").select2('data', { id: 'A.001', text: 'defaults' });

        var obj = $(this).select2('data')[0];

        $('#ddl-xp-chandoan-chandoan')
            .empty() //empty select
            .append($("<option/>") //add option tag in select
                .val(obj.text) //set value for option to post it
                .text(obj.text)) //set a text for show in select
            .val(obj.text) //select option of select2
            .trigger("change"); //apply to select2
        console.log($('#ddl-xp-chandoan-chandoan').val());
    });

    $("#ddl-xp-chandoan-chandoan").on("select2:select", function (e) {

        var obj = $(this).select2('data')[0];

        $('#ddl-xp-chandoan-maicd')
            .empty() //empty select
            .append($("<option/>") //add option tag in select
                .val(obj.id) //set value for option to post it
                .text(obj.id)) //set a text for show in select
            .val(obj.id) //select option of select2
            .trigger("change"); //apply to select2
    });
    

}

///Binding filter for DataTable
function Binding_CustomFilter_DataTable() {
    var NAV = $('ul.sidebar-menu');
    
    ////danh mục cán bộ
    switch (NAV.data('nav')) {
        case 'canbo': DanhMuc_Canbo();
            break;
        default: $.each($('[data-dtTable]'), function (a, b) {
            CreateDataTable(b);
        });
            

    }
    
}

///
function AjaxSearch_Completed(element) {
    iCheck_Init();
    CreateDataTable(element);

}

function CreateDataTable(table) {
    var dtTable;
    if ($.fn.dataTable.fnIsDataTable(table)) {
        dtTable = table;
    } else {
        var search = $(table).data('dtsearch');
        var searchching=search?search?true:false:false;
        dtTable = $(table).DataTable({ searching: searchching });
        DANHMUC_Tables.main = dtTable;
        var hideColumns = $(table).data('hidecolumns');
        if (hideColumns) {

            for (var i = 0; i < hideColumns.length; i++) {
                dtTable.column(hideColumns[i]).visible(false);
                //console.log(dtTable.column[3]);
            }
        }
    }
    return dtTable;
}

function DanhMuc_Canbo_delete(id) {
    var table = $('#table-danhmuc-canbo');
    var tr1 = table.find('tr#' + id);
    
    var name = tr1.data('name');
    ShowPopupDelete('Xóa cán bộ', 'Bạn có muốn xóa cán bộ: '+name+' không?', function () {
        
        $.ajax({
            url: '/canbo/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Xóa thành công cán bộ: ' + name);
                    table.DataTable().row(tr1).remove().draw();
                } else {
                    if (d.maKQ==1) {
                        show_errmess('Không có cán bộ nào có mã là: ' + id);
                    } else if(d.maKQ==2) {
                        show_errmess('Không xóa được cán bộ: ' + name);
                    } else {
                        show_errmess('Chưa rõ nguyên nhân'); console.log(d);
                    }
                }
            },
            error: function (error) {
                show_errmess('Có lỗi xảy ra: ' + error.responseText);
            }
        })
    });
}

function DanhMuc_Benhvien_delete(id) {
    var table = $('#table-danhmuc-benhvien');
    var tr1 = table.find('tr#' + id);

    var name = tr1.data('name');
    ShowPopupDelete('Xóa bệnh viện', 'Bạn có muốn xóa bệnh viện: ' + name + ' không?', function () {

        $.ajax({
            url: '/benhvien/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Xóa thành công bệnh viện: ' + name);
                    table.DataTable().row(tr1).remove().draw();
                } else {
                    if (d.maKQ == 1) {
                        show_errmess('Không có bệnh viện nào có mã là: ' + id);
                    } else if (d.maKQ == 2) {
                        show_errmess('Không xóa được bệnh viện: ' + name);
                    } else {
                        show_errmess('Chưa rõ nguyên nhân'); console.log(d);
                    }
                }
            },
            error: function (error) {
                show_errmess('Có lỗi xảy ra: ' + error.responseText);
            }
        })
    });
}


function ShowPopupDelete(title, message, callback) {
    var modalDelete = $('#modal-confirm-delete');
    modalDelete.find('.modal-title').text(title);
    modalDelete.find('.modal-body p').text(message);
    modalDelete.modal('show').one('click', "#btn-confirm-ok", callback);
}

///Xóa bệnh nhân
function DanhMuc_BenhNhan_delete(id) {
    var table = $('#table-danhmuc-benhnhan');
    var tr1 = table.find('tr#' + id);

    var name = tr1.data('name');
    ShowPopupDelete('Xóa bệnh nhân', 'Bạn có muốn xóa bệnh nhân: ' + name + ' không?', function () {

        Call_Ajax('/benhnhan/delete/' + id, 'application/json', 'delete', null, function (d) {
            if (d.success) {
                show_alert('Bệnh nhân: ' + name+' đã được xóa thành công.');
                table.DataTable().row(tr1).remove().draw();
            } else {
                if (d.maKQ == 0) {
                    show_errmess('Không xóa được bệnh nhân: ' + name);
                } else if (d.maKQ == 2) {
                    Show_message_trangthai_benhnhan(d.data,name);
                } else {
                    show_errmess('Chưa rõ nguyên nhân'); console.log(d);
                }
            }
        });
    });
}