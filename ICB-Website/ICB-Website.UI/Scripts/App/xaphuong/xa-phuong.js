///// <reference path="../custom/k_js_custom.js" />
///// <reference path="../custom/k_custom2.js" />
///// <reference path="../custom/k-js-custom-3.js" />
///// <reference path="select2.min.js" />
///// <reference path="../scripts-controllers/benh-nhan.js" />
///// <reference path="../scripts-controllers/ra-vien.js" />
///// <reference path="../moment.js" />
///// <reference path="../custom/number-to-text.js" />


/////plugin custom modal


//$(document).ready(function () {
//    $('button[data-toggle=modalC],a[data-toggle=modalC]').click(function () {

//        var target = $(this).data('target');
//        if (target != null && target != undefined) {
//            $(target).show();
//            $(target).find('.close,[data-dismiss=modalC]').click(function () {
//                $(target).hide();
//            });
//        }
//    });


//});


//////object lưu trữ thông tin bệnh nhân

//var benhnhanOBJ;

//////lưu thông tin tài khoản

//var ACCOUNT = GetProfileInfo();

//$(document).ready(function () {
//    if ($('#page-wrapper').data('id') == 'KHAMBENH') {

//        //Validation_Error();

//        ACCOUNT = GetProfileInfo();

//        //XP_Enabled_or_Disabled_Field_By_Account();

//        XP_Binding_TT_ICD();

//        XP_INIT();

//        XP_Binding_DATA_Form();
//        //var obj = { a: 1, b: 2, c: 3, d: 4 };
//        //console.log("Properties: ");
//        //for (var i in obj) {
//        //    console.log(i);
//        //    console.log(';');
//        //}
//    }
//});

//////binding danh sách bệnh nhân

//function XP_Binding_DS_BenhNhan_Popup(source) {
//    var table = $('#table-danh-sach-benh-nhan');
//    var tbody = table.find('tbody');
//    if (table.hasClass('dataTable')) {
//        tbody.html('').empty();
//        table.DataTable().destroy();
//        table.find('thead tr td').removeAttr('style');
//    }


//    tbody.html('').empty();
//    if (source.length > 0) {
//        $.each(source, function (a, b) {
//            var tr = '<tr id="' + b.MaBNhan + '" data-id="' + b.MaBNhan + '">';
//            tr += '<td>' + (a + 1) + '</td>';
//            tr += '<td>' + (b.MaBNhan) + '</td>';
//            tr += '<td>' + (b.TenBNhan) + '</td>';
//            tr += '<td>' + (b.GTinh == 1 ? "Nam" : "Nữ") + '</td>';
//            tr += '<td>' + (b.TenDTBN) + '</td>';
//            tr += '<td>' + (b.TenKP) + '</td>';
//            tr += '<td class="text-center"><a class="" data-id="' + b.MaBNhan + '" href="javascript:;" onclick="XP_Xoa_benhnhan(' + b.MaBNhan + ');" ><i class="fa fa-2x fa-trash"></i>&nbsp;</a>&nbsp;&nbsp;<a class="" data-id="' + (b.MaBNhan) + '" href="javascript:;" onclick="XP_BenhNhan_Duoc_Chon(' + b.MaBNhan + ');"><i class="fa fa-square-o fa-2x"></i></a></td>';
//            tr += '</tr>';
//            tbody.append(tr);

//        });

//        tbody.find('tr a .fa').hover(function () {
//            $(this).removeClass('fa-square-o');
//            $(this).addClass('fa-check-square-o');
//        }, function () {
//            if ($(this).closest('tr').hasClass('tr-selected')) {

//            } else {
//                $(this).removeClass('fa-check-square-o');
//                $(this).addClass('fa-square-o');
//            }
//        });
//        table.data('source', source);
//        tbody.find('tr:not(.empty) td').click(function () {
//            tbody.find('tr').removeClass('tr-selected');
//            $(this).closest('tr').addClass('tr-selected');
//            tbody.find('tr').find('a .fa').removeClass('fa-check-square-o');
//            tbody.find('tr').find('a .fa').addClass('fa-square-o');
//            $(this).closest('tr').find('a .fa').removeClass('fa-square-o');
//            $(this).closest('tr').find('a .fa').addClass('fa-check-square-o');
//        });
//        table.DataTable({
//            searching: false,
//            lengthChange: false,
//            info: false,
//            sorting: false,
//            language: {
//                paginate: {
//                    first: '«',
//                    previous: 'Back',
//                    next: 'Next',
//                    last: '»'
//                }
//            }
//        });
//    } else {
//        table.data('source', []);
//        tbody.append('<tr class="empty"><td colspan="7">Không có bệnh nhân nào</td></tr>')
//    }




//}


/////hàm lấy thông tin tài khoản


////Danh sách bệnh nhân => được chọn

//function XP_BenhNhan_Duoc_Chon(mabn) {
//    XP_Reset_form_Khambenh($('#form-xp-chandoan'), true);
//    XP_Load_TT_Khambenh_Benhnhan(mabn);

//    var table = $('#table-danh-sach-benh-nhan');
//    if (mabn != null && mabn != undefined && mabn != '') {
//        var source = table.data('source');
//        if (source != null && source != undefined) {

//            var obj;
//            $.each(source, function (a, b) {
//                if (b.MaBNhan == mabn) {
//                    obj = b;
//                    return false;
//                }
//            });
//            benhnhanOBJ.data('shortObj', obj);
//            XP_Binding_TT_BN_Short();
//            $('#modal-xp-ds-benhnhan').modal('hide');
//        } else {
//            show_errmess('Không tìm thấy thông tin bệnh nhân');
//        }

//    } else {
//        console.log('Error: Mã bệnh nhân được chọn không đúng');
//    }
//    $('#pnl-xp-chandoan').hide();
//    XP_Reset_form_Khambenh($('#pnl-xp-chandoan').find('form'), true);
//    XP_Khambenh_reset();
//    //$('#form-xp-chandoan #txt-xp-chandoan-mabnhan').val($('#lbl-xp-mabnhan').text());
//}

//////Binding thông tin bệnh nhân trên header

//function XP_Binding_TT_BN_Short() {
//    var obj = benhnhanOBJ.data('shortObj');
//    var short_info = $('#l-xp-thong-tin-bn');
//    if (obj != null && obj != undefined) {
//        short_info.find('#lbl-xp-mabnhan').text(obj.MaBNhan);
//        short_info.find('#lbl-xp-sothe').text(obj.SThe);
//        short_info.find('#lbl-xp-tenbnhan').text(obj.TenBNhan);
//        short_info.find('#lbl-xp-tuoi').text(obj.Tuoi);
//    } else {
//        short_info.find('#lbl-xp-mabnhan').text("");
//        short_info.find('#lbl-xp-tenbnhan').text('');
//        short_info.find('#lbl-xp-sothe').text('');
//        short_info.find('#lbl-xp-tuoi').text('');
//    }
//}

/////Load thông tin khám bệnh bệnh nhân

//function XP_Load_TT_Khambenh_Benhnhan(mabn) {
//    /////Lấy thông tin chi tiết bệnh nhân

//    XP_Lay_TT_chitiet_benhnhan(mabn);

//    ///lấy danh sách chẩn đoán
//    XP_Lay_DS_chandoan(mabn);


//    ///Lấy danh sách đơn thuốc
//    XP_Lay_DS_donthuoc(mabn);


//    //Lấy danh sách dịch vụ

//    XP_Lay_DS_Dichvu(mabn);

//    ///Lấy danh sách lịch sử khám chữa bệnh





//    ///

//}

/////Lấy danh sách chẩn đoán


//function XP_Lay_DS_chandoan(mabn) {
//    $.ajax({
//        url: '/api/dieutriapi/getdsbnkb/' + mabn,
//        contentType: 'application/json',
//        type: 'get',
//        success: function (d) {
//            //console.log(d);
//            XP_Binding_DS_Chandoan(d);
//        },

//        error: function (error) {
//            console.log(error);
//        }
//    });
//}

/////Lấy danh sách đơnt thuốc

//function XP_Lay_DS_donthuoc(mabn) {
//    $.ajax({
//        url: '/api/dieutriapi/getdsdonthuoc?mabn=' + mabn,
//        type: 'get',
//        contentType: 'json',
//        success: function (d) {
//            console.log(d);
//            XP_Binding_DS_DonThuoc(d);
//        },
//        error: function (err) {

//        }
//    });
//}



/////Lấy danh sách dịch vụ
//function XP_Lay_DS_Dichvu(mabn) {
//    $.ajax({
//        url: '/api/dieutriapi/getdsdichvu?mabn=' + mabn,
//        type: 'get',
//        contentType: 'json',
//        success: function (d) {
//            console.log(d);
//            XP_Binding_DS_Dichvu(d);
//        },
//        error: function (err) {

//        }
//    });
//}


//////lấy thông tin chi tiết bệnh nhân

//function XP_Lay_TT_chitiet_benhnhan(mabn) {
//    mabn = (mabn == null || mabn == undefined) ? 0 : mabn;
//    $.ajax({
//        url: '/xa-phuong/get-detail-benhnhan?id=' + mabn,
//        type: 'get',
//        contentType: 'json',
//        success: function (d) {
//            //debugger
//            console.log(d);
//            benhnhanOBJ.data('detail', d);
//            XP_GetTrangthaiBenhnhan();
//        },

//        error: function (err) {
//            console.log('Error: Lỗi khi lấy thông tin chi tiết bệnh nhân');
//        }
//    });

//    $.ajax({
//        url: '/xa-phuong/get-thong-tin-benh-nhan?id=' + mabn,
//        type: 'get',
//        contentType: 'json',
//        success: function (d) {
//            //debugger
//            benhnhanOBJ.data('DetailBenhnhan', d);
//        },
//        error: function (err) {
//            console.log(err.statusText);
//        }
//    });
//}


/////Binding thông tin mã Icd

//function XP_Get_TT_ICD() {
//    if (localStorage.getItem("DSICD") === null) {
//        $.ajax({
//            url: '/api/dieutriapi/geticd',
//            type: 'get',
//            contentType: 'json',
//            success: function (data) {
//                localStorage.setItem('DSICD', data);
//                var dsicd = JSON.parse(data);
//                //XP_Binding_TT_ICD(dsicd);
//            },
//            error: function (err) {
//                console.log('Error: Không lấy được danh sách ICD');
//            }
//        });


//    } else {
//        var dsicd = JSON.parse(localStorage.getItem('DSICD'));
//        //XP_Binding_TT_ICD(dsicd);
//    }
//}

//function XP_Binding_TT_ICD() {

//    $("#ddl-xp-chandoan-maicd").select2({
//        width: '100%',
//        ajax: {
//            url: '/api/icd10/getselecticdbyicd',
//            //url: "https://api.github.com/search/repositories",
//            dataType: 'json',
//            delay: 250,
//            data: function (params) {
//                return {
//                    q: params.term, // search term
//                    page: params.page
//                };
//            },
//            processResults: function (data, params) {
//                // parse the results into the format expected by Select2
//                // since we are using custom formatting functions we do not need to
//                // alter the remote JSON data, except to indicate that infinite
//                // scrolling can be used

//                params.page = params.page || 1;

//                var obj = {
//                    results: data.items,
//                    pagination: {
//                        more: (params.page * 30) < 100//data.total_count
//                    }
//                };

//                return obj;
//            },
//            cache: true
//        },
//        allowClear: true,
//        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
//        minimumInputLength: 0,
//        templateResult: function (data) {
//            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
//                return 'Đang tìm kiếm ...';
//            }

//            return data.id;//'<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="">' + data.id + '</span>';
//        }, // omitted for brevity, see the source of this page
//        templateSelection: function (data, container) {
//            return data.id;
//        } // omitted for brevity, see the source of this page
//    });
//    $("#ddl-xp-chandoan-maicd2").select2({
//        width: '100%',

//        ajax: {
//            url: '/api/icd10/getselecticdbyicd',
//            //url: "https://api.github.com/search/repositories",
//            dataType: 'json',
//            delay: 250,
//            data: function (params) {
//                return {
//                    q: params.term, // search term
//                    page: params.page
//                };
//            },
//            processResults: function (data, params) {
//                // parse the results into the format expected by Select2
//                // since we are using custom formatting functions we do not need to
//                // alter the remote JSON data, except to indicate that infinite
//                // scrolling can be used

//                params.page = params.page || 1;

//                var obj = {
//                    results: data.items,
//                    pagination: {
//                        more: (params.page * 30) < 100//data.total_count
//                    }
//                };

//                return obj;
//            },
//            cache: true
//        },
//        allowClear: true,
//        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
//        minimumInputLength: 0,
//        templateResult: function (data) {
//            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
//                return 'Đang tìm kiếm ...';
//            }

//            return data.id;//'<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="color:red;">' + data.id + '</span>';
//        }, // omitted for brevity, see the source of this page
//        templateSelection: function (data, container) {

//            return data.id;
//        } // omitted for brevity, see the source of this page
//    });
//    $("#ddl-xp-chandoan-chandoan").select2({
//        width: '100%',
//        ajax: {
//            url: '/api/icd10/getselecticdbyname',
//            //url: "https://api.github.com/search/repositories",
//            dataType: 'json',
//            delay: 250,
//            data: function (params) {
//                return {
//                    q: params.term, // search term
//                    page: params.page
//                };
//            },
//            processResults: function (data, params) {
//                // parse the results into the format expected by Select2
//                // since we are using custom formatting functions we do not need to
//                // alter the remote JSON data, except to indicate that infinite
//                // scrolling can be used

//                params.page = params.page || 1;

//                var obj = {
//                    results: data.items,
//                    pagination: {
//                        more: (params.page * 30) < 100//data.total_count
//                    }
//                };

//                return obj;
//            },
//            cache: true
//        },
//        allowClear: true,
//        escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
//        minimumInputLength: 0,
//        templateResult: function (data) {
//            if (data.id === '' || data.id == null || data.id == undefined) { // adjust for custom placeholder values
//                return 'Đang tìm kiếm ...';
//            }

//            return '<span style="width:38px;display:inline-block;">' + data.id + '</span>' + ' - <span style="">' + data.text + '</span>';
//        }, // omitted for brevity, see the source of this page
//        templateSelection: function (data, container) {
//            return data.text;
//        } // omitted for brevity, see the source of this page
//    });
//    $("#ddl-xp-chandoan-maicd").on("select2:select", function (e) {
//        //$("#ddl-xp-chandoan-chandoan").val($(this).val());
//        //console.log($(this).select2('data'));
//        //$("#ddl-xp-chandoan-chandoan").select2('data', { id: 'A.001', text: 'defaults' });

//        var obj = $(this).select2('data')[0];

//        $('#ddl-xp-chandoan-chandoan')
//            .empty() //empty select
//            .append($("<option/>") //add option tag in select
//                .val(obj.text) //set value for option to post it
//                .text(obj.text)) //set a text for show in select
//            .val(obj.text) //select option of select2
//            .trigger("change"); //apply to select2
//        console.log($('#ddl-xp-chandoan-chandoan').val());
//    });

//    $("#ddl-xp-chandoan-chandoan").on("select2:select", function (e) {
//        //$("#ddl-xp-chandoan-chandoan").val($(this).val());
//        //console.log($(this).select2('data'));
//        //$("#ddl-xp-chandoan-chandoan").select2('data', { id: 'A.001', text: 'defaults' });

//        var obj = $(this).select2('data')[0];

//        $('#ddl-xp-chandoan-maicd')
//            .empty() //empty select
//            .append($("<option/>") //add option tag in select
//                .val(obj.id) //set value for option to post it
//                .text(obj.id)) //set a text for show in select
//            .val(obj.id) //select option of select2
//            .trigger("change"); //apply to select2
//        //console.log($('#ddl-xp-chandoan-chandoan').val());
//    });

//    //var chandoan_icd = $('#form-xp-chandoan #ddl-xp-chandoan-maicd').empty()//.append('');
//    //var chandoan_icd2 = $('#form-xp-chandoan #ddl-xp-chandoan-maicd2').empty()//.append('<option value>Chọn mã ICD 2</option>');
//    //var chandoan_chandoan = $('#form-xp-chandoan #ddl-xp-chandoan-chandoan')//.append('<option value>Chọn chẩn đoán</option>');
//    ///////bindding mã ICD
//    //var html1 = '<option value>Chọn mã ICD</option>';
//    //var html2 = '<option value>Chọn mã ICD2</option>';
//    //var html3 = '<option value>Chọn chẩn đoán</option>';
//    //if (chandoan_chandoan.length > 0) {
//    //    $.each(source, function (index, value) {
//    //        var option = '';
//    //        var option2 = '';
//    //        option += '<option value="' + value.maicd + '">' + value.maicd + '</option>';
//    //        option2 += '<option value="' + value.maicd + '">' + value.tenicd + '</option>';
//    //        html1 += option;
//    //        html2 += option
//    //        html3 += option2;
//    //        //chandoan_chandoan.append(option2);
//    //        //chandoan_icd.append(option);
//    //        //chandoan_icd2.append(option);

//    //    });
//    //}
//    //chandoan_chandoan.html(html3);
//    //chandoan_icd.append(html2);
//    //chandoan_icd2.append(html1);

//}

////hàm kiểm tran thông khám bệnh bệnh nhân

//function XP_CheckKhambenh_benhnhan() {
//    var benhnhan = benhnhanOBJ.data('detail');
//    var status = XP_GetTrangthaiBenhnhan();
//    if (status == 0) {
//        $('#btn-form-xp-save').removeAttr('disabled');
//        $('#btn-form-xp-update').removeAttr('disabled');
//    } else if (status == 1 || status == 2) {
//        $('#btn-form-xp-save').attr({ 'disabled': 'disabled' });
//        $('#btn-form-xp-update').attr({ 'disabled': 'disabled' });
//    } else if (status == -1) {
//        $('#btn-form-xp-save').removeAttr('disabled');
//        $('#btn-form-xp-update').removeAttr('disabled');
//    }
//    else {
//        $('#btn-form-xp-save').removeAttr('disabled');
//        $('#btn-form-xp-update').removeAttr('disabled');
//    }
//}


/////thiết lập khởi tạo page xã phường

//function XP_INIT() {
//    benhnhanOBJ = $('#pnl-benhnhan-data');
//    var form_chan_doan_xp = $('#form-xp-chandoan');

//    $('#navbar-xp-khambenh a[data-toggle=tab]').on("shown.bs.tab", function (e) {
//        var idTarget = $(e.target).attr('href');
//        $('#panel-footer-group-button div[id^=btn-group]').hide();
//        switch (idTarget) {
//            case '#tab-chandoan': $('#panel-footer-group-button #btn-group-chandoan').show();
//                break;
//            case '#tab-kedon': $('#panel-footer-group-button #btn-group-kedon').show();
//                break;
//            case '#tab-dichvu': $('#panel-footer-group-button #btn-group-dichvu').show();
//                break;
//            case '#tab-dienbien': $('#panel-footer-group-button #btn-group-dienbien').show();
//                break;


//        }
//    });

//    $('#btn-search-advanced').click(function () {
//        var form_advanced_search = $('#pnl-advanced-search #f-search-advanced');
//        if (form_advanced_search.valid()) {
//            $.ajax({
//                url: '/xa-phuong/tim-benh-nhan',
//                type: 'POST',
//                contentType: 'application/x-www-form-urlencoded',
//                data: form_advanced_search.serialize(),
//                success: function (d) {
//                    XP_Binding_DS_BenhNhan_Popup(d);
//                    console.log(d.length);
//                },
//                error: function (err) {
//                    console.log(err.statusText);
//                }
//            });
//        } else {
//            console.log('invalid');
//        }

//    });

//    $('#btn-search-advanced-ok').click(function () {
//        var table = $('#table-danh-sach-benh-nhan');
//        var trs = table.find('tr.tr-selected');
//        if (trs.length > 0) {
//            var mabn = trs.first().attr('id');
//            if (mabn != null && mabn != undefined && mabn != '') {
//                XP_BenhNhan_Duoc_Chon(mabn);
//            }
//        }
//    });

//    $('#panel-footer-group-button #btn-form-xp-add').click(function (e) {

//        //var benhnhan = benhnhanOBJ.data('detail');
//        var status = XP_GetTrangthaiBenhnhan();
//        if (status == 0) {

//            var display = $('#pnl-xp-chandoan').css('display');
//            if (display === 'block') {
//                //$('#pnl-xp-chandoan').slideUp(300);
//                //$('#pnl-xp-chandoan #btn-form-xp-save').hide();
//                //$('#pnl-xp-chandoan #btn-form-xp-update').show();
//                XP_Reset_form_Khambenh($('#pnl-xp-chandoan').find('form'), true);
//                XP_Khambenh_reset();
//            } else {
//                $('#pnl-xp-chandoan').slideDown(300);
//                XP_Reset_form_Khambenh($('#pnl-xp-chandoan').find('form'), true);
//                XP_Khambenh_reset();
//                $('#form-xp-chandoan #txt-xp-chandoan-mabnhan').val($('#lbl-xp-mabnhan').text());

//            }
//            XP_Enabled_or_Disabled_Field_By_Account();
//            $('#pnl-xp-chandoan #btn-form-xp-save').removeAttr('disabled').show();
//            $('#pnl-xp-chandoan #btn-form-xp-update').removeAttr('disabled').hide();
//            //$('#pnl-xp-chandoan').find('form').find();
//        } else if (status == 1) {
//            //đã thanh toán
//            show_errmess('Bệnh nhân đã thanh toán, không thể thêm khám bệnh');
//        } else if (status == 2) {
//            //đã ra viện
//            show_errmess('Bệnh nhân đã ra viện, không thể thêm khám bệnh');
//        } else if (status == -1) {
//            //debugger
//            show_errmess('Chưa chọn bệnh nhân');
//        } else {
//            show_errmess('Không rõ lỗi lầm');
//        }

//    });

//    $('#pnl-xp-chandoan').closest('.panel').find('.panel-heading').click(function (e) {
//        var display = $('#pnl-xp-chandoan').css('display');
//        var idkb = $('#txt-xp-chandoan-idkb-d').val();
//        if (display === 'block') {
//            $('#pnl-xp-chandoan').slideUp(300);
//        } else {
//            $('#pnl-xp-chandoan').slideDown(300);
//            $('#pnl-xp-chandoan #btn-form-xp-save').show();
//            $('#pnl-xp-chandoan #btn-form-xp-update').hide();
//        }
//        if (idkb != null && idkb != undefined && idkb != '' && idkb != '0') {
//            $('#pnl-xp-chandoan #btn-form-xp-save').hide();
//            $('#pnl-xp-chandoan #btn-form-xp-update').show();
//        } else {
//            XP_Reset_form_Khambenh($('#pnl-xp-chandoan').find('form'), true);
//            $('#pnl-xp-chandoan #btn-form-xp-save').show();
//            $('#pnl-xp-chandoan #btn-form-xp-update').hide();
//        }
//    });

//    $(document).mousedown(function (e) {
//        var table = $('#tbl-xp-ds-don-thuoc-ct');
//        var ss = $(e.toElement).closest(table).length;
//        if (!$(e.toElement).closest(table).length) {
//            ClearRowEdit();
//        } else {
//            //console.log('click');
//        }
//        var table1 = $('#tbl-xp-ds-dich-vu');
//        var ss1 = $(e.toElement).closest(table1).length;
//        if (!$(e.toElement).closest(table1).length) {
//            ClearRowEdit_Dichvu();
//        } else {
//            //console.log('click');
//        }
//    });

//    $('#btn-form-xp-kedon-add').click(function () {
//        var status = XP_GetTrangthaiBenhnhan();
//        var benhnhan = benhnhanOBJ.data('detail');
//        if (status == 0) {

//            var donthuoc = $('#form-xp-don-thuoc').data('source');
//            if (donthuoc != null || donthuoc != undefined) {
//                show_errmess('Bệnh nhân "' + benhnhan.benhnhan.TenBNhan + '" đã có đơn thuốc, không thêm được đơn thuốc mới.');

//            } else {
//                $('#tbl-xp-ds-don-thuoc-ct tbody tr.empty').remove();
//                var newrows = $('#tbl-xp-ds-don-thuoc-ct tbody tr.newrow');
//                if (newrows.length <= 0) {
//                    var table = $('#tbl-xp-ds-don-thuoc-ct tbody tr.template').clone(true);
//                    table.removeClass('template');
//                    table.addClass('newrow');
//                    table.find('input,select').val('');
//                    $('#tbl-xp-ds-don-thuoc-ct tbody').append(table);
//                }
//                var form_kedon = $('#form-xp-don-thuoc');
//                XP_Reset_form_Khambenh(form_kedon, true);
//                form_kedon.find('#ddl-xp-kho-xuat').val(GetProfileInfo().khokedon);
//                //form_kedon.find('#DSDonthuocct').val('');
//                //form_kedon.find('#IDDon').val('');
//                //form_kedon.find('#MaKP').val('');
//                //form_kedon.find('#MaCB').val('');
//                //form_kedon.find('#NgayKeStr').val('');
//                //form_kedon.find('#Status').val('');
//                //form_kedon.find('#PLDV').val('');
//                //form_kedon.find('#KieuDon').val('');
//                //form_kedon.find('#LoaiDuoc').val('');
//                //form_kedon.find('#SoPL').val('');
//                //form_kedon.find('#MaBNhan').val('');
//            }
//        } else if (status == 1) {
//            //đã thanh toán
//            show_errmess('Bệnh nhân đã thanh toán, không thể thêm thuốc');
//        } else if (status == 2) {
//            //đã ra viện
//            show_errmess('Bệnh nhân đã ra viện, không thể thêm thuốc');
//        } else if (status == -1) {
//            //debugger
//            show_errmess('Chưa chọn bệnh nhân');
//        } else {
//            show_errmess('Không rõ lỗi lầm');
//        }

//    });

//    $('#btn-xp-kedon-themthuoc').click(function () {

//        var status = XP_GetTrangthaiBenhnhan();
//        if (status == 0) {

//            var danhsachkhambenh = $('#table-xp-ds-khambenh').data('source');
//            if (danhsachkhambenh == null || danhsachkhambenh == undefined) {
//                //debugger
//                show_errmess('Chưa chọn bệnh nhân');
//            } else {
//                if (danhsachkhambenh.length > 0) {
//                    var khoxuat = $('#ddl-xp-kho-xuat').val();
//                    if (khoxuat == null || khoxuat == undefined || khoxuat == '') {
//                        $('#ddl-xp-kho-xuat').val(GetProfileInfo().khokedon);
//                    }
//                    var tbodys = $('#tbl-xp-ds-don-thuoc-ct tbody');
//                    tbodys.find('tr.invalid').remove();
//                    var tr = $('#tbl-xp-ds-don-thuoc-ct tbody tr.template').clone(true);
//                    //table.find('input,select').val('');
//                    tr.removeClass('template');
//                    tr.addClass('newrow');
//                    //table.removeClass('even').removeClass('odd');
//                    $('#tbl-xp-ds-don-thuoc-ct tbody tr.empty').remove();
//                    $('#tbl-xp-ds-don-thuoc-ct tbody').append(tr);
//                    var trnext = $('#tbl-xp-ds-don-thuoc-ct tbody tr.newrow');
//                    trnext.find('td:nth-child(2)').trigger('dblclick');

//                }
//                else {
//                    show_errmess('Bệnh nhân chưa có khám bệnh, thêm khám bệnh cho bệnh nhân trước');
//                }
//            }




//        } else if (status == 1) {
//            //đã thanh toán
//            show_errmess('Bệnh nhân đã thanh toán, không thể thêm thuốc');
//        } else if (status == 2) {
//            //đã ra viện
//            show_errmess('Bệnh nhân đã ra viện, không thể thêm thuốc');
//        } else if (status == -1) {
//            //debugger
//            show_errmess('Chưa chọn bệnh nhân');
//        } else {
//            show_errmess('Không rõ lỗi lầm');
//        }


//    });

//    $('#btn-xp-xoa-donthuoc').click(function () {
//        //xóa đơn thuốc

//    });

//    $('#btn-xp-dichvu-save').click(function () {
//        var benhnhan = benhnhanOBJ.data('detail');
//        var obj = XP_Get_JsonData_Dichvu();
//        if (obj.length > 0 && benhnhan != null && benhnhan != undefined) {

//            var flag = XP_GetTrangthaiBenhnhan();

//            if (flag == 0) {
//                $.ajax({
//                    url: '/dieutri/update-danh-sach-dich-vu?dsdv=' + JSON.stringify(obj),
//                    type: 'POST',
//                    contentType: 'json',
//                    success: function (d) {
//                        //console.log(d);

//                        if (d.success) {

//                            if (d.msg == '' || d.msg == undefined || d.msg == null) {
//                                show_alert('Cập nhật dịch vụ thành công');
//                            } else {
//                                if (d.msg.indexOf('6') != -1) {
//                                    show_errmess('Bệnh nhân "' + benhnhan.benhnhan.TenBNhan + '" đã thanh toán, không thêm được dịch vụ');
//                                } else if (d.msg.indexOf('5') != -1) {
//                                    show_errmess('Bệnh nhân "' + benhnhan.benhnhan.TenBNhan + '" đã ra viện, không thêm được dịch vụ');
//                                } else {
//                                    if (d.data != null && d.data != undefined) {
//                                        if (d.data.error != '' && d.data.error != null && d.data.error != undefined) {
//                                            var dichvuErrors = $.map(obj, function (a, b) {
//                                                if (d.data.error.indexOf(a.MaDV) != -1) {
//                                                    return a;
//                                                }
//                                            });
//                                            var str = '';
//                                            $.each(dichvuErrors, function (a, b) {
//                                                str += b.MaDV + ': ' + b.TenDV + '\r\n';
//                                            });
//                                            alert('Danh sách dịch vụ không lưu được: ' + str);

//                                        }
//                                    }
//                                }
//                            }




//                            XP_Load_TT_Khambenh_Benhnhan($('#lbl-xp-mabnhan').text());
//                        } else {
//                            show_errmess("Cập nhật dịch vụ thất bại");
//                        }
//                    },
//                    error: function (err) {
//                        console.log(err.statusText);
//                    }
//                });
//            } else if (flag == 1) {
//                //đã thanh toán
//                show_errmess('Bệnh nhân đã thanh toán, không thể thêm dịch vụ');
//            } else if (flag == 2) {
//                //đã ra viện
//                show_errmess('Bệnh nhân đã ra viện, không thể thêm dịch vụ');
//            } else if (flag == -1) {
//                //debugger
//                show_errmess('Chưa chọn bệnh nhân');
//            } else {
//                show_errmess('Không rõ lỗi lầm');
//            }

//        } else {

//        }
//    });

//    $('#btn-xp-kedon-save').click(function () {
//        var statusBenhnhan = XP_GetTrangthaiBenhnhan();
//        if (statusBenhnhan == 0) {
//            var danhsachkhambenh = $('#table-xp-ds-khambenh').data('source');
//            if (danhsachkhambenh != null && danhsachkhambenh != undefined) {
//                if (danhsachkhambenh.length > 0) {
//                    var obj = XP_Get_JsonData(true);


//                    var form_kedon = $('#form-xp-don-thuoc');
//                    form_kedon.find('#DSDonthuocct').val(JSON.stringify(obj));
//                    var iddon = form_kedon.find('#IDDon').val();
//                    var url = '';

//                    if (iddon == null || iddon == undefined || iddon == '' || iddon == 0) {
//                        //thêm mới
//                        form_kedon.find('#IDDon').val('0');
//                        var makp = ACCOUNT.makp;;
//                        makp = ACCOUNT.capdo == '9' ? danhsachkhambenh[0].MaKP : makp;
//                        form_kedon.find('#MaKP').val(makp);
//                        form_kedon.find('#MaCB').val(ACCOUNT.macb);
//                        form_kedon.find('#NgayKeStr').val(getCurrentDateTime());
//                        form_kedon.find('#Status').val('0');
//                        form_kedon.find('#PLDV').val('1');
//                        form_kedon.find('#KieuDon').val('0');
//                        form_kedon.find('#LoaiDuoc').val(0);
//                        form_kedon.find('#SoPL').val(0);
//                        form_kedon.find('#MaBNhan').val($('#lbl-xp-mabnhan').text());
//                        url = '/dieutri/insertkedon';
//                    } else {

//                        //cập nhật đơn thuốc
//                        url = '/dieutri/updatekedon';
//                    }
//                    if (true) {
//                        $.ajax({
//                            url: url,
//                            type: 'post',
//                            contentType: 'application/x-www-form-urlencoded',
//                            data: form_kedon.serialize(),
//                            success: function (response) {

//                                var data = JSON.parse(response);
//                                if (data.success) {
//                                    show_alert(data.msg);
//                                    XP_Load_TT_Khambenh_Benhnhan($('#lbl-xp-mabnhan').text());
//                                } else {
//                                    show_errmess(data.msg);
//                                }
//                                if (data.data.error != '' && data.data.error != null && data.data.error != undefined) {
//                                    alert('Thuốc không được lưu: \n' + data.data.error);
//                                }
//                            },
//                            error: function (request, status, error) {
//                                show_errmess(error);
//                            }

//                        });
//                    } else {
//                        show_errmess('Thông tin chưa chính xác, kiểm tra lại thông tin.');
//                    }
//                } else {
//                    show_errmess('Bệnh nhân chưa có khám bệnh, thêm chẩn đoán trước');
//                }
//            } else {
//                //debugger
//                show_errmess('Chưa chọn bệnh nhân');
//            }
//        } else if (statusBenhnhan == 1) {
//            //đã thanh toán
//            show_errmess('Bệnh nhân đã thanh toán, không thể thêm đơn thuốc');
//        } else if (statusBenhnhan == 2) {
//            //đã ra viện
//            show_errmess('Bệnh nhân đã ra viện, không thể thêm đơn thuốc');
//        } else if (statusBenhnhan == -1) {
//            //debugger
//            show_errmess('Chưa chọn bệnh nhân');
//        } else {
//            show_errmess('Không rõ lỗi lầm');
//        }




//    });

//    $('#btn-form-xp-dichvu-add').click(function (e) {

//        var status = XP_GetTrangthaiBenhnhan();
//        if (status == 0) {
//            var table = $('#tbl-xp-ds-dich-vu tbody tr.template').clone(true);
//            //table.find('input,select').val('');
//            table.removeClass('template');
//            table.addClass('newrow');
//            //table.removeClass('even').removeClass('odd');
//            $('#tbl-xp-ds-dich-vu tbody tr.empty').remove();
//            $('#tbl-xp-ds-dich-vu tbody').append(table);
//            var trnext = $('#tbl-xp-ds-dich-vu tbody tr.newrow');
//            trnext.find('td:nth-child(2)').trigger('dblclick');
//        } else if (status == 1) {
//            show_errmess('Bệnh nhân đã thanh toán, không thể thêm dịch vụ');
//        } else if (status == 2) {
//            show_errmess('Bệnh nhân đã ra viện, không thể thêm dịch vụ');
//        } else if (status == -1) {
//            show_errmess('Chưa có bệnh nhân nào được chọn');
//        }


//    });

//    $('#btn-view-popup-chiphi').click(function (e) {
//        var mabn = $('#lbl-xp-mabnhan').text();
//        var benhnhan = benhnhanOBJ.data('detail');
//        if (mabn != null && mabn != undefined && mabn != '') {
//            $('#modal-popup-chiphi').modal('show');
//            XP_Binding_Duyet_thanhtoan(mabn);
//            ////init thông tin thanh toán
//            $('#form-chiphi-thanhtoan #txt-xp-chiphi-ngaytt').val(getCurrentDateTime());
//            $('#form-xp-duyetthanhtoan #txt-ngay-thuchi').val(getCurrentDateTime());


//            if (benhnhan != null && benhnhan != undefined) {
//                if (benhnhan.vienphi != null && benhnhan.vienphi != undefined) {
//                    //đã thanh toán
//                    XP_chiphi_enable_form(true);

//                } else {
//                    XP_chiphi_enable_form(false);
//                    XP_Reset_Button_Duyetthanhtoan(false);
//                }
//            } else {
//                XP_chiphi_enable_form(false);
//                XP_Reset_Button_Duyetthanhtoan(false);
//            }
//            XP_LayDanhsach_Chiphi_Benhnhan(mabn, XP_Binding_DS_chiphi);
//        } else {
//            XP_Reset_Button_Duyetthanhtoan(false);
//            //debugger
//            show_warning('Chưa chọn bệnh nhân');
//        }
//    });

//    $('#ddl-xp-kho-xuat').on({
//        'focus': function (e) {
//            $(this).data('oldvalue', $(this).val());
//        },
//        'change': function (e) {
//            var oldvalue = $(this).data('oldvalue');
//            var trs = $('#tbl-xp-ds-don-thuoc-ct tbody').find('tr:not(.template,.empty,.invalid,.newrow)');
//            if (trs.length > 0) {
//                show_errmess('Đơn đã có thuốc, không được thay đổi đơn thuốc');
//                $(this).val(oldvalue);
//            }
//        }
//    });

//    $('#form-xp-them-benhnhan').submit(function (e) {
//        var flag = false;
//        var arrDTBN = $('#cmb_doituong').val().split(';');
//        if (arrDTBN[1] == 1) {
//            if (Validation_HSBN() == true) {
//                if ($(this).valid()) {
//                    flag = true;

//                } else {
//                    flag = false;
//                    show_errmess('Thông tin bệnh nhân không chính xác, kiểm tra lại thông tin');
//                }
//            }
//            else {
//                flag = false;
//                Display_ErrorMessage();
//            }
//        }
//        else {
//            flag = true;
//        }
//        if (flag) {
//            var insert = true;
//            var url = '/khambenhxaphuong/InsertBenhnhan';
//            var mabnhan = $('#form-xp-them-benhnhan #txt-xp-mabnhan').val();
//            if (mabnhan == null || mabnhan == undefined || mabnhan == '') {
//                url = '/khambenhxaphuong/InsertBenhnhan';
//            } else {
//                url = '/khambenhxaphuong/Updatepatient';
//                insert = false;
//            }
//            $.ajax({
//                url: url,
//                type: "POST",
//                contentType: 'application/x-www-form-urlencoded',
//                data: $(this).serialize(),
//                success: function (d) {
//                    if (d.success) {
//                        if (insert) {
//                            show_alert('Thêm bệnh nhân thành công');
//                        } else {
//                            show_alert('Cập nhật bệnh nhân thành công');
//                        }
//                        $('#modal-xp-them-benhnhan').modal('hide');
//                        XP_Reset_form_Khambenh($('#form-xp-chandoan'), true);
//                        var obj = [];
//                        if (d.data != null) {
//                            obj.push(d.data);
//                        }
//                        $('#table-danh-sach-benh-nhan').data('source', obj);
//                        XP_BenhNhan_Duoc_Chon(d.data.MaBNhan);
//                        //console.log(d.data);
//                    } else {
//                        switch (d.msg) {
//                            case '1': show_errmess('Không thêm được thông tin bệnh nhân, kiểm tra lại thông tin nhập liệu');
//                                break;
//                            case '-1': show_errmess('Thông tin bệnh nhân không chính xác, kiểm tra lại');
//                                break;
//                            default: show_errmess('Lỗi chưa rõ nguyên nhân');

//                        }
//                    }
//                },
//                error: function (err) {
//                    console.log(err.statusText);
//                    console.log($('#form-xp-them-benhnhan').serialize());
//                }
//            });
//        }


//        return false;
//    });

//    $('#form-xp-them-benhnhan #btn-xp-submit').click(function (e) {
//        var macs = $('#form-xp-them-benhnhan #txt_madkkcb').val();
//        if ($('#form-xp-them-benhnhan #txt_madkkcb').data('valid')) {
//            var IsInsert = $('#form-xp-them-benhnhan #txt-xp-mabnhan').is(':disabled');
//            if (IsInsert) {
//                $('#form-xp-them-benhnhan').submit();
//            } else {

//                var benhnhan = benhnhanOBJ.data('detail');
//                if (benhnhan != null && benhnhan != undefined) {
//                    if (benhnhan.vienphi != null && benhnhan.vienphi != undefined) {
//                        show_warning('Bệnh nhân đã thanh toán, không được sửa thông tin bệnh nhân.');
//                    } else {
//                        if (benhnhan.ravien != null && benhnhan.ravien != undefined) {
//                            show_warning('Bệnh nhân đã ra viện, bạn vẫn muốn thay đổi thông tin bệnh nhân');
//                        } else {
//                            $('#form-xp-them-benhnhan').submit();
//                        }
//                    }
//                } else {
//                    //debugger
//                    show_warning('Chưa chọn bệnh nhân');
//                }
//            }
//        } else {
//            $('#form-xp-them-benhnhan #txt_madkkcb').focus();
//            $('#form-xp-them-benhnhan #txt_madkkcb').closest('div').find('span.error-messages').removeClass('field-validation-valid').addClass('input-validation-error');
//            $('#form-xp-them-benhnhan #txt_madkkcb').closest('div').find('span.error-messages').text('Mã CS KCB không có trong danh mục');
//        }



//    });

//    ///change phương án
//    $('#ddl-xp-chandoan-phuongan').on({
//        'focus': function () {
//            $(this).data('old', $(this).val());
//        },
//        'change': function () {
//            //XP_Check_Chuyenvien_Da(-1);
//            var idkb = form_chan_doan_xp.find('#txt-xp-chandoan-idkb-d').val();
//            if (idkb != null && idkb != undefined && idkb != '') {
//                var old = $(this).data('old');
//                var bnkbs = $('#table-xp-ds-khambenh').data('source');
//                var bnkb = {};
//                $.each(bnkbs, function (a, b) {
//                    if (b.IDKB == idkb) {
//                        bnkb = b;
//                        return false;
//                    }
//                });
//                if (bnkbs.length > 0) {
//                    if (bnkb.IDKB == bnkbs[0].IDKB) {
//                        if (bnkb.PhuongAn == 0) {
//                            var newv = $(this).val();
//                            if (newv == 1) {
//                                show_warning('Không được sửa phương án này');
//                                $(this).val(0);
//                                $(this).data('old', 0);
//                            } else {
//                                form_chan_doan_xp.find('#btn-form-xp-update').removeAttr('disabled').show();
//                            }
//                        }



//                    } else {
//                        show_errmess('Không được sửa khám bệnh này')
//                    }



//                } else {
//                    show_errmess('Bệnh nhân không có khám bệnh')
//                }


//            }
//        }
//    });

//    $('#txt-xp-ngay-kedon').on({
//        'focus': function (e) {
//            $(this).data('old', $(this).val());
//        },
//        'blur': function (e) {
//            var bnkbs = $('#table-xp-ds-khambenh').data('source');
//            if (bnkbs != null && bnkbs != undefined) {
//                if (bnkbs.length > 0) {
//                    var bnkb = bnkbs[0];
//                    var ngaykhams = moment(bnkb.NgayKham, "DD/MM/YYYY HH:mm:ss");
//                    var ngaykes = moment($(this).val(), "DD/MM/YYYY HH:mm:ss");
//                    var da = new Date();
//                    var d = ngaykes._d.getTime() - ngaykhams._d.getTime();
//                    if (d < 0) {
//                        show_warning('Ngày kê phải lớn hơn ngày khám bệnh');
//                        $(this).val($(this).data('old'));
//                    } else {

//                    }
//                }
//            }
//        }
//    });


//    $('#btn-xp-chiphi-duyet-thanhtoan').click(function (e) {
//        $('#modal-popup-chiphi').modal('hide');
//    });

//    $('#btn-xp-close-popup').click(function (e) {
//        $('#modal-popup-chiphi').modal('show');
//    });


//    $('#navbar-xp-khambenh a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//        $('#form-chiphi-thanhtoan #txt-xp-chiphi-ngaytt').val(getCurrentDateTime());
//        $('#form-xp-duyetthanhtoan #txt-ngay-thuchi').val(getCurrentDateTime());
//    });
//}

/////hàm reset form khám bệnh

//function XP_Khambenh_reset() {
//    var form_khambenh = $('#form-xp-chandoan');
//    form_khambenh.find('input,select').val('');
//    form_khambenh.find('select').trigger('change');
//    form_khambenh.find('#txt-xp-chandoan-mabnhan').val($('#lbl-xp-mabnhan').text());
//    form_khambenh.find('#txt-xp-chandoan-ngaykham').val(getCurrentDateTime());
//    form_khambenh.find('#ddl-xp-chandoan-phuongan').val(4);
//    if (ACCOUNT.capdo == '9') {

//    } else {
//        form_khambenh.find('#ddl-xp-chandoan-kpdieutri').val(ACCOUNT.makp).trigger('change');
//    }
//}


/////hàm check trạng thái bệnh nhân
/////1: đã thanh toán
/////2: đã ra viện
/////0: đang điều trị(chưa thanh toán, chưa ra viện)
/////-1: không rõ bệnh nhân
//function XP_GetTrangthaiBenhnhan() {
//    var benhnhan = benhnhanOBJ.data('detail');

//    if (benhnhan != null && benhnhan != undefined) {

//        if (benhnhan.vienphi != null && benhnhan.vienphi != undefined) {
//            $('#btn-xp-kedon-ketthuc').hide();
//            return 1;
//        } else {
//            if (benhnhan.ravien != null && benhnhan.ravien != undefined) {
//                $('#btn-xp-kedon-ketthuc').hide();
//                return 2;
//            } else {
//                $('#btn-xp-kedon-ketthuc').show();
//                return 0;
//            }
//        }


//    } else {
//        $('#btn-xp-kedon-ketthuc').hide();
//        return -1;
//    }
//}

////Hàm thêm mới thông tin bệnh nhân
//function Show_popup_themmoi_benhnhan() {
//    var modal = $('#modal-xp-them-benhnhan');
//    var form_themmoi_benhnhan = $('#form-xp-them-benhnhan');
//    XP_Reset_form_Khambenh(form_themmoi_benhnhan, false);
//    form_themmoi_benhnhan.find('input.datepicker').val('');
//    form_themmoi_benhnhan.find('#txt-xp-mabnhan').val('');
//    var doituong = form_themmoi_benhnhan.find('#cmb_doituong option:first-child').attr('value');
//    form_themmoi_benhnhan.find('#cmb_doituong').val(doituong).trigger('change');
//    form_themmoi_benhnhan.find('#btn-xp-delete').hide();
//    form_themmoi_benhnhan.find('#txt-xp-mabnhan').attr({ 'disabled': 'disabled' });
//    form_themmoi_benhnhan.find('#btn-xp-submit span').html('&nbsp;&nbsp;&nbsp;&nbsp;Lưu&nbsp;&nbsp;&nbsp;&nbsp;');
//    form_themmoi_benhnhan.find('#txt_sotheBHYT').val('');
//    form_themmoi_benhnhan.find('#txt_tenbv').val('');
//    $('#txt_noitru').val(0);
//    form_themmoi_benhnhan.find('#cmb_kphong').val(ACCOUNT.makp).trigger('change');
//    //XP_Enabled_or_Disabled_Field_By_Account();
//    form_themmoi_benhnhan.find('#txt_makp').val(ACCOUNT.makp);
//}

////hàm hiển thị thông tin bệnh nhân => cập nhật
//function XP_Show_Popup_Update_benhnhan() {

//    var mabn = $('#lbl-xp-mabnhan').text();
//    if (mabn != null && mabn != undefined && mabn != '') {
//        var benhnhanDetail = benhnhanOBJ.data('DetailBenhnhan');
//        var form_benhnhan = $('#form-xp-them-benhnhan');
//        var triggerChange = ['MaCS'];
//        var DS1 = [''];
//        var triggerFocus = ['HanBHTu', 'HanBHDen'];
//        $('#modal-xp-them-benhnhan').modal('show');

//        if (benhnhanDetail != null && benhnhanDetail != undefined) {
//            if (benhnhanDetail.MaBNhan == mabn) {
//                form_benhnhan.find('#txt_noitru').val(benhnhanDetail.NoiTru);
//                for (var p in benhnhanDetail) {
//                    if (DS1.indexOf(p) == -1 && p != 'DTuong') {
//                        form_benhnhan.find('[name=' + p + ']').val(benhnhanDetail['' + p + '']);
//                        if (triggerChange.indexOf(p) != -1) {
//                            form_benhnhan.find('[name=' + p + ']').trigger('change');
//                        } else if (triggerFocus.indexOf(p) != -1) {
//                            var date = benhnhanDetail['' + p + ''];
//                            var str = parseFloat(date.substring(6, date.lastIndexOf(')')));

//                            var d = new Date(str);
//                            var d1 = (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate()) + '/' + ((d.getMonth() + 1) > 10 ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + d.getFullYear();
//                            form_benhnhan.find('[name=' + p + ']').val(d1);
//                            ///form_benhnhan.find('[name=' + p + ']').focus();
//                        }
//                    }
//                }
//                form_benhnhan.find('#btn-xp-delete').attr({ 'onclick': 'XP_Xoa_benhnhan(' + mabn + ');' });
//                form_benhnhan.find('#btn-xp-delete').show();
//                form_benhnhan.find('#lbl_sott').text(benhnhanDetail.SoTT);
//                form_benhnhan.find('#txt-xp-mabnhan').removeAttr('disabled');
//                form_benhnhan.find('#btn-xp-submit span').html('&nbsp;&nbsp;&nbsp;&nbsp;Cập nhật&nbsp;&nbsp;&nbsp;&nbsp;');


//                //form_benhnhan.find('#cmb_hinhthuckham').val(1);

//            }
//        }
//    }

//}

//////hàm xóa bệnh nhân

//function XP_Xoa_benhnhan(id) {
//    if (confirm('Bạn có muốn xóa bệnh nhân có mã là: ' + id + ' không?')) {
//        $.ajax({
//            type: 'POST',
//            url: '/xa-phuong/xoa-benh-nhan?mabn=' + id,

//            async: false,
//            success: function (respond) {
//                //$('#popupConfirm').modal('hide');

//                if (respond.success) {
//                    show_alert('Xóa bệnh nhân thành công');
//                    $('#table-danh-sach-benh-nhan tr#' + id).remove();
//                    var mabn = $('#lbl-xp-mabnhan').text();
//                    if (mabn == id) {
//                        benhnhanOBJ.data('detail', null);
//                        benhnhanOBJ.data('DetailBenhnhan', null);
//                        XP_Lay_DS_chandoan(0);
//                        $('#lbl-xp-mabnhan').text('');
//                        $('#lbl-xp-tenbnhan').text('');
//                        $('#lbl-xp-tuoi').text('');
//                        $('#lbl-xp-sothe').text('');
//                        XP_Lay_DS_Dichvu(0);
//                        XP_Lay_DS_donthuoc(0);
//                    }
//                }
//                else {
//                    switch (respond.msg) {
//                        case '1': show_errmess('Bệnh nhân đã thanh toán, không xóa được bệnh nhân');
//                            break;
//                        case '2': show_errmess('Bệnh nhân đã ra viện, không xóa được bệnh nhân');
//                            break;
//                        case '3': show_errmess('Bệnh nhân đã có đơn thuốc, không xóa được bệnh nhân');
//                            break;
//                        case '4': show_errmess('Bệnh nhân đã khám bệnh, không xóa được bệnh nhân');
//                            break;
//                        case '-1': show_errmess('Không có bệnh nhân này');
//                            break;
//                        case '-2': show_errmess('Không xóa được bệnh nhân');
//                            break;
//                        default: show_errmess('Chưa rõ nguyên nhân');

//                    }
//                }
//            }
//        });
//    }
//}

/////Thiết lập dữ liệu khởi tạo form

//function XP_Binding_DATA_Form() {

//    var Benhnhan = benhnhanOBJ.data('shortObj');
//    if (Benhnhan != null) {
//        if (Benhnhan.MaBNhan != null && Benhnhan.MaBNhan != undefined && Benhnhan.MaBNhan != '') {
//            XP_Load_TT_Khambenh_Benhnhan(Benhnhan.MaBNhan);
//        }
//    }

//    $.ajax({
//        url: '/xaphuong/get-khoa-phong-bac-si',
//        type: 'GET',
//        contentType: 'application/json',
//        success: function (d) {
//            benhnhanOBJ.data("khoaphongbacsi", d);
//            XP_Binding_Khoaphong();
//        },

//        error: function (err) {
//            console.log(err.statusText);
//        }
//    });



//    //$('#ddl-xp-chandoan-maicd').change(function () {
//    //    var value = $(this).val();
//    //    if (value != null && value != undefined && value != '') {
//    //        $('#ddl-xp-chandoan-chandoan').val(value);
//    //    } else {
//    //        $('#ddl-xp-chandoan-chandoan').val('');
//    //    }
//    //});

//    /////form khám bệnh submit()
//    $('#form-xp-chandoan').submit(function () {
//        ///kiểm tra thông tin trước khi thêm thông tin khám bệnh


//        $.ajax({
//            url: '/dieutri/checkkhambenh',
//            type: 'get',
//            contentType: 'application/x-www-form-urlencoded',
//            data: $(this).serialize(),
//            success: function (response) {
//                var d = JSON.parse(response);
//                if (d.success) {
//                    XP_khambenh_submit();
//                } else {

//                    switch (d.msg) {
//                        case '-6': show_warning('Không được sửa khám bệnh này');
//                            break;
//                        case '4': show_warning('Bệnh nhân đã ra viện, không thể thêm hoặc sửa.');
//                            break;
//                        case '2': show_warning('Không thêm được thông tin');
//                            break;
//                        case '3': show_warning('Bệnh nhân đã thanh toán, không thể thêm hoặc sửa.');
//                            break;
//                        case '-1': show_warning('Thông tin nhập không chính xác, kiểm tra lại thông tin.');
//                            break;
//                        case '-2': show_warning('Bệnh nhân đang được điều trị tại phòng khám: ' + d.data.pk1 + ', không thể thêm mới.');
//                            break;
//                        case '-3': show_warning('Bệnh nhân đã được chỉ định điều trị tại: ' + d.data.pk1 + ', bạn không thể thêm điều trị tại: ' + d.data.pk2);
//                            break;
//                        case '-4': show_warning('Ngày khám bệnh phải lớn hơn ngày đăng ký khám chữa bệnh'); $('#txt_chandoan_ngayvao').focus();
//                            break;
//                        case '-5': show_warning('Ngày chuyển khoa| chuyển viện phải lớn hơn ngày đăng ký khám chữa bệnh'); $('#txt_chandoan_ngayvao').focus();
//                            break;
//                        case '5': var str = '';
//                            $.each(d.data.obj, function (a, b) {
//                                str += (a + 1) + '. ' + b.TenBNhan + ' - ' + b.MaBNhan + ';\n';
//                            });
//                            if (confirm('Giường: ' + d.data.giuong + ' đã sử dụng cho bệnh nhân: \n' + str + '\r\nBạn vẫn muốn lưu?')) {
//                                XP_khambenh_submit();
//                            }
//                            break;

//                    }
//                }
//            },
//            error: function (a, b, c) {

//            }
//        });





//        return false;
//    });
//}

//////submit form khám bệnh xã phường
//function XP_submit_form_khambenh() {
//    XP_Chandoan_CheckChandoan();
//}
//////xóa khám bệnh

//function XP_Delete_Khambenh(idkb) {
//    var status = XP_GetTrangthaiBenhnhan();

//    if (status == 0) {

//        ///
//        var danhsachkhambenh = $('#table-xp-ds-khambenh').data('source');
//        var idkbc = danhsachkhambenh[0].IDKB;
//        var mabn = danhsachkhambenh[0].MaBNhan;
//        if (idkb == idkbc) {
//            ///khám bệnh cuối cùng
//            if (confirm('Bạn có muốn xóa thông tin khám bệnh có mã là: ' + idkb + ' không?')) {
//                $.ajax({
//                    url: '/dieutri/deletechandoan?idkb=' + idkb,
//                    type: 'POST',
//                    contentType: 'application/json',
//                    success: function (response) {
//                        var data = JSON.parse(response);

//                        if (data.success) {
//                            XP_Lay_DS_chandoan(mabn);
//                            XP_Lay_TT_chitiet_benhnhan(mabn);
//                            show_alert('Xóa thông tin khám bệnh thành công.');
//                            $('#table-xp-ds-khambenh tbody tr[id=' + idkb + ']').remove();
//                            var d1 = $('#txt-xp-chandoan-idkb-d').val();
//                            if (d1 == idkb) {
//                                XP_Reset_form_Khambenh($('#form-xp-chandoan'), true);
//                            }

//                        } else {
//                            switch (data.msg) {
//                                case '-1': show_errmess('Không có khám bệnh nào có mã là: ' + idkb); break;
//                                case '1': show_errmess('Không xóa được thông tin khám bệnh'); break;
//                                case '2': show_errmess('Bệnh nhân này đã thanh toán, không thể thêm, sửa, xóa thông tin khám bệnh.'); break;
//                                case '3': show_errmess('Bệnh nhân này đã ra viện, không thể thêm, sửa, xóa thông tin khám bệnh.'); break;
//                                case '4': show_errmess('Bệnh nhân đã có phát sinh dịch vụ tại khoa| phòng khám. Không được xóa khám bệnh'); break;
//                                case '5': show_errmess('Khám bệnh này không phải là khám bệnh cuối cùng, không được xóa'); break;
//                                default:

//                            }
//                        }
//                    },
//                    error: function (request, status, error) {
//                        console.log(error);
//                    }

//                });
//            }
//        } else {
//            ///khám bệnh ko phải khám bệnh cuối cùng
//            show_errmess('Bạn không được xóa khám bệnh này');
//        }

//    } else if (status == 1) {
//        //đã thanh toán
//        show_errmess('Bệnh nhân đã thanh toán, không được xóa khám bệnh');
//    } else if (status == 2) {
//        //đã ra viện
//        show_errmess('Bệnh nhân đã ra viện, không được xóa khám bệnh');
//    } else if (status == -1) {
//        //debugger
//        show_errmess('Chưa chọn bệnh nhân');
//    } else {
//        show_errmess('Không rõ lỗi lầm');
//    }
//}


///////thêm khám bệnh xã phường

//var windowvaovien2;
//var XP_windowravien;

//function XP_khambenh_submit() {
//    var benhnhan = benhnhanOBJ.data('detail');
//    var xp_form_khambenh = $('#form-xp-chandoan');
//    if (benhnhan != null && benhnhan != undefined) {

//        if (xp_form_khambenh.valid()) {

//            var idkb = xp_form_khambenh.find('#txt-xp-chandoan-idkb').val();
//            var mabn = parseInt($('#lbl-xp-mabnhan').text());
//            var url = '';
//            var phuongan = xp_form_khambenh.find('#ddl-xp-chandoan-phuongan').val();
//            if (idkb == undefined || idkb == '' || idkb == null) {
//                url = '/dieutri/addchandoan';
//            } else {
//                url = '/dieutri/updatechandoan';
//            }
//            $.ajax({
//                url: url,
//                contentType: 'application/x-www-form-urlencoded',
//                type: 'get',
//                data: xp_form_khambenh.serialize(),
//                success: function (response) {
//                    var data = JSON.parse(response);
//                    if (data.success) {

//                        show_alert('Lưu khám bệnh thành công');
//                        XP_Lay_TT_chitiet_benhnhan(mabn);
//                        XP_Lay_DS_chandoan(mabn);
//                        XP_Lay_DS_Dichvu(mabn);
//                        XP_Lay_DS_donthuoc(mabn);
//                        if (phuongan == '1') {
//                            //vào viện
//                            windowvaovien2 = window.open('/vaovien/Index/' + mabn, '_blank');

//                        } else if (phuongan == '2') {
//                            //chuyển viện
//                            XP_windowravien = window.open('/chuyenvien/Index/' + mabn, '_blank');
//                        } else if (phuongan == '0') {
//                            //về nhà ra viện
//                            var loaikcb = benhnhan.benhnhan.NoiTru == 1 ? 1 : benhnhan.benhnhan.DTNT ? 1 : 0;
//                            if (loaikcb == '0') {

//                            } else {
//                                XP_windowravien = window.open('/ravien/Index/' + mabn, '_blank');
//                            }
//                        }

//                        if (data.data.Congkham != undefined && data.data.Congkham != "" && data.data.Congkham != null) {
//                            if (!data.data.Congkham.success) {
//                                if (data.data.Congkham.msg == '-1') {
//                                    show_warning('Bạn chưa thiết lập dịch vụ công khám trong danh mục');
//                                } else if (data.data.Congkham.msg == '1') {
//                                    show_warning('Không thêm được tiền công khám');
//                                } else if (data.data.Congkham.msg == '2') {

//                                }
//                            }
//                        }
//                        XP_Reset_form_Khambenh($('#form-xp-chandoan'), true);
//                    } else {
//                        switch (data.msg) {
//                            case '4': show_errmess('Bệnh nhân đã ra viện, không thể thêm hoặc sửa.');
//                                break;
//                            case '2': show_errmess('Không thêm được thông tin');
//                                break;
//                            case '3': show_errmess('Bệnh nhân đã thanh toán, không thể thêm hoặc sửa.');
//                                break;
//                            case '-1': show_errmess('Thông tin nhập không chính xác, kiểm tra lại thông tin.');
//                                break;
//                            case '-2': show_errmess('Bệnh nhân đang được điều trị tại phòng khám: ' + data.data.pk1 + ', không thể thêm mới.');
//                                break;
//                            case '-3': show_errmess('Bệnh nhân đã được chỉ định điều trị tại: ' + data.data.pk1 + ', bạn không thể thêm điều trị tại: ' + data.data.pk2);
//                                break;
//                            case '-4': show_errmess('Ngày khám bệnh phải lớn hơn ngày đăng ký khám chữa bệnh'); $('#txt_chandoan_ngayvao').focus();
//                                break;
//                            case '-5': show_errmess('Ngày chuyển khoa| chuyển viện phải lớn hơn ngày đăng ký khám chữa bệnh'); $('#txt_chandoan_ngayvao').focus();
//                                break;
//                            case '-6': show_errmess('Không được sửa khám bệnh này');
//                                break;

//                        }
//                    }
//                },
//                error: function (request, status, error) {
//                    console.log(error);
//                }

//            });
//        }
//    } else {
//        //debugger
//        show_errmess('Chưa chọn bệnh nhân');
//    }
//}

/////binding danh sách khoa phòng

//function XP_Binding_Khoaphong() {
//    var source = benhnhanOBJ.data("khoaphongbacsi");
//    var xp_chandoan_khoaphong = $('#form-xp-chandoan #ddl-xp-chandoan-kpdieutri');
//    xp_chandoan_khoaphong.html('');
//    var xp_chandoan_bacsi = $('#form-xp-chandoan #ddl-xp-chandoan-bacsi');
//    var xp_chandoan_chuyenkhoa = $('#form-xp-chandoan #ddl-xp-chandoan-chuyenkhoa');
//    var xp_chandoan_buong = $('#form-xp-chandoan #ddl-xp-chandoan-buong');
//    var xp_chandoan_giuong = $('#form-xp-chandoan #ddl-xp-chandoan-giuong');
//    var xp_chandoan_khoaphongdt = $('#form-xp-chandoan #ddl-xp-chandoan-khoaphongmoi');
//    xp_chandoan_bacsi.html('');
//    xp_chandoan_buong.html('');
//    xp_chandoan_giuong.html('');

//    var xp_chiphi_khoaphong = $('#form-chiphi-thanhtoan #ddl-xp-chiphi-khoaphong');
//    var xp_chiphi_canbo = $('#form-chiphi-thanhtoan #ddl-xp-chiphi-canbo');
//    xp_chiphi_khoaphong.html('');
//    xp_chiphi_canbo.html('');
//    var danhsachcanbo = [];
//    if (source.length > 0) {
//        $.each(source, function (a, b) {
//            var option = '<option data-ck="' + b.MaCK + '" data-phanloai="' + b.PLoai + '" data-buonggiuong="' + (JSON.stringify(b.BuongGiuong)) + '" value="' + b.MaKP + '">';
//            option += b.TenKP;
//            option += '</option>';
//            xp_chandoan_khoaphong.append(option);
//            if (b.PLoai == "Phòng khám" || b.PLoai == "Lâm sàng") {
//                xp_chandoan_khoaphongdt.append(option);
//            }
//            xp_chiphi_khoaphong.append(option);
//            if (b.canbos.length > 0) {
//                $.each(b.canbos, function (c, d) {
//                    danhsachcanbo.push(d);
//                });
//            }
//        });
//    } else {
//        xp_chandoan_khoaphong.empty();
//    }

//    $.each(danhsachcanbo, function (a, b) {
//        var option = '<option value="' + b.MaCB + '">' + b.TenCB + '</option>';
//        xp_chiphi_canbo.append(option);
//    });

//    xp_chandoan_khoaphong.change(function () {

//        xp_chandoan_bacsi.html('');
//        xp_chandoan_buong.html('');
//        xp_chandoan_giuong.html('');
//        var value = $(this).val();
//        $('#form-xp-chandoan #txt-xp-hidden-makp').val(value);
//        if (value != null && value != undefined && value != '') {
//            var KPhong;
//            $.each(source, function (a, b) {
//                if (b.MaKP == value) {
//                    KPhong = b;
//                    return false;
//                }
//            });

//            if (KPhong != null && KPhong != undefined) {
//                xp_chandoan_chuyenkhoa.val(KPhong.MaCK);
//                var canbos = KPhong.canbos;
//                var BuongGiuong = KPhong.Buongs;
//                //danh sách bác sĩ
//                if (canbos.length > 0) {
//                    $.each(canbos, function (a, b) {
//                        var option = '<option value="' + b.MaCB + '">' + b.TenCB + '</option>';;
//                        xp_chandoan_bacsi.append(option);
//                    });
//                } else {
//                    xp_chandoan_bacsi.empty();
//                }
//                //danh sách buồng giường
//                xp_chandoan_buong.append('<option value>Chọn buồng</option>');
//                $.each(BuongGiuong, function (a, b) {
//                    var option = '<option data-giuong="' + (b.dsgiuong) + '" value="' + b.tenbuong + '">' + b.tenbuong + '</option>';
//                    xp_chandoan_buong.append(option);
//                });
//                xp_chandoan_buong.trigger('change');

//            }
//        } else {
//            xp_chandoan_bacsi.empty();
//            xp_chandoan_chuyenkhoa.val('');
//            xp_chandoan_buong.empty();
//        }
//    });

//    xp_chandoan_buong.change(function () {
//        var value = $(this).val();
//        var optionSelected = $(this).find('option:selected');
//        if (value != null && value != undefined && value != '') {
//            var giuongs = (optionSelected.data('giuong')).split(',');
//            if (giuongs != null && giuongs != undefined) {
//                xp_chandoan_giuong.html('<option value>Chọn giường</option>');
//                $.each(giuongs, function (a, b) {
//                    var option = '<option value="' + b + '">' + b + '</option>';
//                    xp_chandoan_giuong.append(option);
//                });
//            } else {
//                xp_chandoan_giuong.html('');
//            }
//        } else {
//            xp_chandoan_giuong.html('');
//        }
//    });
//    XP_Enabled_or_Disabled_Field_By_Account();
//}

///////Binding danh sách chẩn đoán
//function XP_Binding_DS_Chandoan(source) {
//    var table = $('#table-xp-ds-khambenh');
//    table.data("source", source);
//    var tbody = table.find('tbody');
//    tbody.html('');
//    if (source.length > 0) {
//        $.each(source, function (a, b) {
//            var tr = '<tr id="' + b.IDKB + '">';
//            tr += '<td>' + b.IDKB + '</td>';
//            tr += '<td>' + b.NgayKham + '</td>';
//            tr += '<td>' + b.TenKP + '</td>';
//            tr += '<td>' + b.ChanDoan + '</td>';
//            tr += '<td><a class="btn-sm btn-danger" onclick="XP_Delete_Khambenh(' + b.IDKB + ');" data-id="' + b.IDKB + '" href="javascript:;"><i class="fa fa-trash"></i>&nbsp;Xóa</a></td>';
//            tr += '</tr>';
//            tbody.append(tr);
//        });
//    } else {
//        tbody.html('<tr><td colspan="5">Bệnh nhân chưa có khám bệnh</td></tr>')
//    }

//    ////add events for table danh sách chẩn đoán
//    tbody.find('tr td:not(:last-child)').click(function (e) {

//        XP_CheckKhambenh_benhnhan();
//        tbody.find('tr').removeClass('tr-selected');
//        $(this).closest('tr').addClass('tr-selected');
//        /////////////////////
//        var form_khambenh = $('#form-xp-chandoan');
//        var idkb = parseInt($(this).closest('tr').attr('id'));
//        var BNKB = {};
//        $.each(source, function (a, b) {
//            if (b.IDKB == idkb) {
//                BNKB = b;
//                return false;
//            }
//        });

//        if (BNKB != null && BNKB != undefined) {
//            form_khambenh.find('#txt-xp-chandoan-idkb-d').val(BNKB.IDKB);
//            form_khambenh.find('#txt-xp-chandoan-idkb').val(BNKB.IDKB);
//            form_khambenh.find('#txt-xp-chandoan-mabnhan').val($('#lbl-xp-mabnhan').text());
//            form_khambenh.find('#txt-xp-chandoan-ngaykham').val(BNKB.NgayKham);
//            form_khambenh.find('#ddl-xp-chandoan-kpdieutri').val(BNKB.MaKP).trigger('change');
//            form_khambenh.find('#txt-xp-hidden-makp').val(BNKB.MaKP);
//            form_khambenh.find('#ddl-xp-chandoan-chuyenkhoa').val(BNKB.MaCK);
//            form_khambenh.find('#ddl-xp-chandoan-chandoan').val(BNKB.MaICD);
//            form_khambenh.find('#ddl-xp-chandoan-maicd').val(BNKB.MaICD).trigger('change:select2');
//            form_khambenh.find('#ddl-xp-chandoan-buong').val(BNKB.Buong).trigger('change');
//            form_khambenh.find('#txt-xp-chandoan-benhkhac').val(BNKB.BenhKhac);
//            form_khambenh.find('#ddl-xp-chandoan-maicd2').val(BNKB.MaICD2);
//            form_khambenh.find('#txt-xp-chandoan-ghichu').val(BNKB.GhiChu == null ? "" : BNKB.GhiChu);
//            form_khambenh.find('#ddl-xp-chandoan-phuongan').val(BNKB.PhuongAn);
//            form_khambenh.find('#txt-xp-chandoan-ngaychuyen').val(BNKB.NgayNghi);
//            form_khambenh.find('#ddl-xp-chandoan-khoaphongmoi').val(BNKB.MaKPdt);
//            form_khambenh.find('#ddl-xp-chandoan-bacsi').val(BNKB.MaCB);
//            form_khambenh.find('#ddl-xp-chandoan-giuong').val(BNKB.Giuong);

//            var obj = { id: BNKB.MaICD, text: BNKB.ChanDoan };

//            $('#ddl-xp-chandoan-maicd')
//                .empty() //empty select
//                .append($("<option/>") //add option tag in select
//                    .val(obj.id) //set value for option to post it
//                    .text(obj.id)) //set a text for show in select
//                .val(obj.id) //select option of select2
//                .trigger("change"); //apply to select2

//            $('#ddl-xp-chandoan-chandoan')
//                .empty() //empty select
//                .append($("<option/>") //add option tag in select
//                    .val(obj.id) //set value for option to post it
//                    .text(obj.text)) //set a text for show in select
//                .val(obj.id) //select option of select2
//                .trigger("change"); //apply to select2

//            XP_Check_Chuyenvien_Da(BNKB.PhuongAn);





//            $('#pnl-xp-chandoan').slideDown(300);

//            var BNKB_First = source[0];
//            if (BNKB_First.IDKB == BNKB.IDKB) {
//                var status = XP_GetTrangthaiBenhnhan();
//                if (status == 0) {
//                    $('#pnl-xp-chandoan #btn-form-xp-save').removeAttr('disabled').hide();
//                    $('#pnl-xp-chandoan #btn-form-xp-update').removeAttr('disabled').show();
//                } else {
//                    $('#pnl-xp-chandoan #btn-form-xp-save').removeAttr('disabled').hide();
//                    $('#pnl-xp-chandoan #btn-form-xp-update').attr({ 'disabled': 'disabled' }).show();
//                }

//            } else {
//                $('#pnl-xp-chandoan #btn-form-xp-save').hide().attr({ 'disabled': 'disabled' });
//                $('#pnl-xp-chandoan #btn-form-xp-update').show().attr({ 'disabled': 'disabled' });
//            }


//        } else {
//            XP_Check_Chuyenvien_Da(-1);
//            XP_Reset_form_Khambenh(form_khambenh, true);
//        }


//    });

//    tbody.find('tr:first-child td:first-child').trigger('click');
//    setTimeout(function () {
//        tbody.find('tr:first-child td:first-child').trigger('click');
//    }, 1000);
//}


//////libraries edit kê đơn thuốc

//var danhsachthuoc_kedon = {
//    makp: 0,
//    dsthuoc: []
//};

//////Binding Template row

//function XP_Binding_Template_Row() {
//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    ///binding row template to add data

//    if (table_body.find('tr.template').length <= 0) {

//        var stt = -1;

//        var tr = '<tr class="template" data-iddon="-1" id="-1">';
//        tr += '<td><span class="element" data-value="' + (stt) + '" data-text="' + (stt) + '" data-edit="false"></span></td>';
//        tr += '<td><span class="element" data-event="EventMaDVChanged" data-value="" data-text=\'\' data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-edit="false" data-type="input"></span></td>';
//        tr += '<td class="text-right"><span class="element" data-value="0" data-text="0" data-edit="false" data-type="input"></span>0</td>';
//        tr += '<td class="text-right"><span class="element" data-event="Validation_luongton" data-value="0" data-text="0" data-type="number"></span>0</td>';
//        tr += '<td class="text-right"><span class="element" data-value="0" data-text="0" data-edit="false" data-type="input"></span>0</td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-type="input"></span></td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-type="input"></span></td>';
//        tr += '<td><span class="element" data-event="XP_Kedon_Tinhthanhtien" data-value="1" data-text="1" data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="0" data-text="0" data-type="select"></span></td>';

//        tr += '<td><a class="text-danger" onclick="XP_Kedon_Delete_dtct(this,-1);" href="javascript:;"><i class="fa fa-trash"></i>&nbsp;</a></td>';
//        tr += '</tr>';

//        table_body.append(tr);
//        XP_addEventToRow(table_body.find('tr.template'));
//    }
//    /////end binding row
//}


//function XP_BindingTable_Kedon() {
//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    ///binding row template to add data

//    XP_Binding_Template_Row();

//    /////end binding row
//    $.each(table_body.find('tr'), function (a, b) {

//        $.each($(b).find('td'), function (c, d) {
//            var control = $(d).find('.element');
//            if (control.length > 0) {
//                var html = '<span class="label-control">' + control.data('text') + '</span>';
//                $(d).html('').append(control).append(html);
//            }
//        });
//        XP_addEventToRow(b);
//    });



//    $('#tbl-xp-ds-don-thuoc-ct tr td').on({
//        'dblclick': function (e) {
//            if ($(this).closest('tr').hasClass('editing')) {

//            } else {
//                ClickRowEvents(this);
//                Initial_RowEdit();
//                $(this).closest('tr').find('td:nth-child(10)').find('select').keydown(function (e) {
//                    if (e.keyCode == 9) {
//                        $('#btn-xp-kedon-themthuoc').trigger('click');

//                    }

//                });
//            }

//        }
//    });
//}

//function ClearRowEdit() {
//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    var trs = table_body.find('.editing');
//    if (trs.length > 0) {
//        $.each(trs, function (a, b) {
//            $(b).removeClass('newrow');

//            $.each($(b).find('td'), function (c, d) {
//                var element = $(d).find('.element');
//                var type = element.attr('data-type');
//                var value = element.attr('data-value');
//                var text = element.attr('data-text');
//                var event = element.attr('data-event');
//                var control = $(d).find('.tbl-cell-demo');
//                var value2 = {};
//                var isEdit = element.attr('data-edit');
//                if (element.length > 0) {
//                    if (isEdit == true || isEdit == undefined || isEdit == null) {
//                        var html = '';
//                        if (type === 'select') {
//                            value2['value'] = control.val();
//                            value2['text'] = control.find('option:selected').text();
//                            html = '<span class="label-control">' + value2.text + '</span>';
//                        } else if (type === 'input' || type === 'number') {
//                            value2['value'] = control.val();
//                            value2['text'] = control.val();
//                            html = '<span class="label-control">' + value2.text + '</span>';
//                        } else {
//                            value2['value'] = value;
//                            value2['text'] = text;
//                            html = '<span class="label-control">' + text + '</span>';
//                        }

//                        $(element).attr('data-value', value2.value).data('value', value2.value);
//                        $(element).attr('data-text', value2.text).data('value', value2.text);
//                        $(element).attr('data-type', type);//.data('value', value2.text);
//                        $(element).attr('data-edit', isEdit);//.data('value', value2.text);
//                        $(element).attr('data-event', event);
//                        $(d).html('').append(element).append(html);
//                    } else {
//                        var html = '';
//                        value2['value'] = value;
//                        value2['text'] = text;
//                        html = '<span class="label-control">' + text + '</span>';
//                        $(d).html('').append(element).append(html);
//                    }
//                }
//            });
//            Validate_Row(b);
//        });
//    }
//    trs.removeClass('editing');
//    trs.addClass('changed');

//}

/////thêm event cho tr in table đơn thuốc
//function XP_addEventToRow(tr) {
//    $(tr).find('td:not(:last-child)').click(function () {
//        $(tr).closest('tbody').find('tr').removeClass('tr-selected');
//        $(tr).not('.template').addClass('tr-selected');
//        var madv = $(tr).find('td:nth-child(2)').find('.element').attr('data-value');
//        var dongia = $(tr).find('td:nth-child(4)').find('.element').attr('data-value');
//        var makho = $('#ddl-xp-kho-xuat').val();
//        if ($(tr).hasClass('editing')) {

//        } else {
//            XP_Get_Luong_ton(madv, makho, dongia, 0, null, null);
//        }
//    });
//}

//function ClickRowEvents(td) {

//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    var status = XP_GetTrangthaiBenhnhan();
//    if (status == 0) {

//        if ($(td).closest('tr').hasClass('editing')) {

//        } else {
//            ClearRowEdit();
//            $(td).closest('tr').addClass('editing');

//            $.each($(td).closest('tr').find('td'), function (c, d) {
//                var control = $(d).find('.element');
//                var value = control.data('value');
//                var text = control.data('text');
//                var type = control.data('type');
//                var isEdit = control.data('edit');
//                var func = control.data('event');

//                if (isEdit == true || isEdit == undefined || isEdit == null) {
//                    if (type === 'select') {
//                        var html = '<select onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo">';
//                        html += '</select>';
//                        $(d).html('').append(control).append(html);
//                        $(d).find('select').val(value);
//                    } else if (type === 'input' || type === 'number') {
//                        var html = '';
//                        if (type === 'number') {
//                            html = '<input type="number" style="text-align:right;" onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo" value="' + value + '"/>';
//                        } else {
//                            html = '<input type="text" onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo" value="' + value + '"/>';
//                        }
//                        $(d).html('').append(control).append(html);
//                        $(d).find('input').val(value);
//                    }
//                }

//            });

//        }
//        $(td).find('select,input').focus().select();
//        //console.log($(td).find('select,input'));

//        $.each($(td).closest('tr').find('td'), function (a, b) {
//            $(b).find('input,select').change(function () {
//                $(b).closest('tr').addClass('changed');
//            });

//        });
//        //console.log(obj);
//    } else {
//        show_warning('Bạn không được sửa đơn thuốc này');
//    }
//}

//function EventMaDVChanged(control) {
//    //console.log($(control).val());
//    var obj = { value: $(control).val(), text: $(control).find('option:selected').text() }
//    var makho = $('#ddl-xp-kho-xuat').val();
//    var benhnhan = benhnhanOBJ.data('detail');
//    if (makho == null || makho == undefined || makho == '') {
//        show_errmess('Bạn chưa chọn kho xuất dược');
//    } else {
//        var valueDV;
//        ////lấy thông tin thuốc
//        $.each(danhsachthuoc_kedon.dsthuoc, function (a, b) {
//            if (b.MaDV == obj.value) {
//                valueDV = b;
//                return false;
//            }
//        });
//        var doituong;
//        doituong = (benhnhan != null && benhnhan != undefined) ? benhnhan.doituongbenhnhan : null;
//        var trongDM = 0;

//        if (valueDV == null || valueDV == undefined) {
//            change_value_target($(control).closest('tr').find('td:nth-child(3)'), { value: '', text: '' });
//            change_value_target($(control).closest('tr').find('td:nth-child(4)'), { value: 0, text: 0 });
//            change_value_target($(control).closest('tr').find('td:nth-child(8)'), { value: '', text: '' });
//            change_value_target($(control).closest('tr').find('td:nth-child(9)'), { value: 0, text: 0 });
//            XP_Get_Luong_ton(0, 0, 0, 0, Validation_luongton, $(control).closest('tr').find('td:nth-child(5)').find('input[type=number]'));
//        } else {
//            XP_Get_Luong_ton(valueDV.MaDV, makho, valueDV.DonGia, 0, Validation_luongton, $(control).closest('tr').find('td:nth-child(5)').find('input[type=number]'));
//            change_value_target($(control).closest('tr').find('td:nth-child(3)'), { value: valueDV.DonVi, text: valueDV.DonVi });
//            change_value_target($(control).closest('tr').find('td:nth-child(4)'), { value: valueDV.DonGia, text: parseFloat(valueDV.DonGia).formatMoney(2, '.', ',') });
//            change_value_target($(control).closest('tr').find('td:nth-child(8)'), { value: valueDV.DuongD, text: valueDV.DuongD });
//            if (doituong.HTTT == 1) {
//                trongDM = valueDV.TrongDM;
//            } else {
//                trongDM = 0;
//            }
//            change_value_target($(control).closest('tr').find('td:nth-child(9)'), { value: trongDM, text: trongDM });

//        }

//        //Validation_luongton($(control).closest('tr').find('td:nth-child(5)').find('input[type=number]'));
//        $('#tbl-xp-ds-don-thuoc-ct tr.editing').find('td:nth-child(5)').find('input').select();
//    }
//}

//function change_value_target(td, obj) {
//    var element = $(td).find('.element');
//    var type = element.attr('data-type');
//    $(td).find('span.label-control').text(obj.text);
//    if (type === 'select') {
//        $(td).find('select').val(obj.value);
//        $(td).find('.element').attr({ 'data-value': obj.value }, { 'data-text': obj.text });
//    } else if (type === 'input') {
//        $(td).find('input').val(obj.text);

//        $(td).find('.element').attr({ 'data-value': obj.value });
//        $(td).find('.element').attr({ 'data-text': obj.text });
//    }
//}

//function Validate_Row(tr) {
//    var madv = $(tr).find('td:nth-child(2)').find('.element').data('value');

//    if (madv == null || madv == undefined || madv == '') {
//        $(tr).addClass('invalid');
//        return false;
//    } else {
//        $(tr).removeClass('invalid');
//        return true;
//    }
//}

//function Validation_luongton(control) {

//    var soluongke = parseFloat($(control).val());
//    var soluongton = parseFloat($('#lbl-so-luong-ton').text());
//    var soluongtontong = parseFloat($('#lbl-so-luong-ton').data('value'));
//    var madv = $(control).closest('tr').find('td:nth-child(2)').find('select').val();
//    var dongia = parseFloat($(control).closest('tr').find('td:nth-child(4)').find('.element').attr('data-value'));

//    var tonconlai = XP_CheckTon_kedon(soluongtontong, soluongke, madv, dongia);

//    if (soluongtontong < 0) {
//        $(control).val(0);
//        show_errmess('Số lượng tồn kho không đủ');
//        XP_Kedon_Tinhthanhtien(control);
//        return false;
//    } else {
//        if (tonconlai < 0) {
//            show_errmess("Số lượng tồn trong kho không đủ");
//            $(control).val(soluongtontong);
//            $('#lbl-so-luong-ton').text(0);
//            XP_Kedon_Tinhthanhtien(control);
//            return true;

//        } else {
//            $('#lbl-so-luong-ton').text(tonconlai);
//            XP_Kedon_Tinhthanhtien(control);
//            return true;
//        }
//    }
//}

////hàm check tồn khi kê đơn

//function XP_CheckTon_kedon(soluongton, soluongke, madv, dongia) {
//    var obj = XP_Get_JsonData(false);
//    var soluong_dake_trongdon = 0;
//    var donthuoc = $('#form-xp-don-thuoc').data('source');
//    var danhsachthuoc_cu = [];
//    if (donthuoc != null && donthuoc != undefined) {
//        danhsachthuoc_cu = donthuoc.dtcts;
//    }
//    var soluong_kedon_doncu = 0;////lấy số lượng thuốc đã được kê của thuốc đã lưu và hiện tại đang đang sửa số lượng trong đơn này

//    var danhsach_dtct_sua = '';
//    $.each(obj, function (a, b) {
//        if (madv == b.MaDV && dongia == b.DonGia) {
//            soluong_dake_trongdon += b.SoLuong;
//            if (b.IDDonct > 0) {
//                danhsach_dtct_sua += b.IDDonct + ';';
//            }
//        }
//    });
//    $.each(danhsachthuoc_cu, function (a, b) {
//        if (danhsach_dtct_sua.indexOf(b.IDDonct) != -1) {
//            if (madv == b.MaDV && dongia == b.DonGia) {
//                soluong_kedon_doncu += b.SoLuong;
//            }
//        }
//    });

//    var tonconlai = soluongton + soluong_kedon_doncu - soluong_dake_trongdon - soluongke;
//    return tonconlai;
//}

//function Initial_RowEdit() {
//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    var tr = table_body.find('.editing');
//    var dichvu = tr.find('td:nth-child(2)').find('select');
//    var elementThuoc = tr.find('td:nth-child(2)').find('.element');
//    var arr = ['1', '2', '3', '4', '5'];
//    dichvu.html('');

//    /////binding danh sách thuốc
//    var makho = $('#ddl-xp-kho-xuat').val();
//    makho = (makho == null || makho == undefined || makho == '') ? -1 : makho;
//    if (makho != -1 && makho == danhsachthuoc_kedon.makp) {
//        if (danhsachthuoc_kedon.dsthuoc.length > 0) {
//            XP_Binding_Thuoc_Kedon(danhsachthuoc_kedon.dsthuoc, dichvu, elementThuoc.attr('data-value'));
//        } else {
//            $.ajax({
//                url: '/api/dieutriapi/getdsduockedon?makp=' + makho,
//                type: 'get',
//                success: function (response) {
//                    danhsachthuoc_kedon.makp = makho;
//                    danhsachthuoc_kedon.dsthuoc = response;
//                    XP_Binding_Thuoc_Kedon(response, dichvu, elementThuoc.attr('data-value'));
//                }

//            });
//        }
//    } else {
//        $.ajax({
//            url: '/api/dieutriapi/getdsduockedon?makp=' + makho,
//            type: 'get',
//            success: function (response) {
//                danhsachthuoc_kedon.makp = makho;
//                danhsachthuoc_kedon.dsthuoc = response;
//                XP_Binding_Thuoc_Kedon(response, dichvu, elementThuoc.attr('data-value'));
//            }

//        });
//    }

//    ///binding trong bảo hiểm
//    var trongbh = tr.find('td:nth-child(9)').find('select');
//    var oldvalue = tr.find('td:nth-child(9)').find('.element').attr('data-value');
//    trongbh.html('');
//    trongbh.append('<option value="0">Ngoài DM</option>');
//    trongbh.append('<option value="1">Trong DM</option>');
//    trongbh.append('<option value="2">Không TT</option>');
//    trongbh.val(oldvalue);

//    ///binding trong bảo hiểm
//    var linhthuoc = tr.find('td:nth-child(10)').find('select');
//    var oldvalue1 = tr.find('td:nth-child(10)').find('.element').attr('data-value');
//    linhthuoc.html('');
//    linhthuoc.append('<option value="-1">Không lĩnh</option>');
//    linhthuoc.append('<option value="0">Lĩnh</option>');
//    linhthuoc.append('<option value="1" disabled>Đã lĩnh</option>');
//    linhthuoc.append('<option value="2" disabled>Đã hủy</option>');
//    linhthuoc.val(oldvalue1);

//}

//function XP_Binding_Thuoc_Kedon(source, control, oldValue) {
//    $(control).html('');
//    $(control).append('<option value>Chọn thuốc</option>');
//    $.each(source, function (a, b) {
//        var option = '<option value=' + b.MaDV + '>';
//        option += b.TenDV;
//        option += '</option>'
//        $(control).append(option);
//    });
//    $(control).val(oldValue);
//    $(control).select2();
//}

//function XP_Kedon_Tinhthanhtien(control) {

//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');
//    var rowEditing = table_body.find('tr.editing');
//    var soluongN = rowEditing.find('td:nth-child(5)').find('input').val();
//    rowEditing.find('td:nth-child(5)').find('.element').attr({ 'data-value': soluongN });
//    rowEditing.find('td:nth-child(5)').find('.element').attr({ 'data-text': soluongN });
//    var dongia = parseFloat(rowEditing.find('td:nth-child(4)').find('.element').attr('data-value'));
//    var soluong = parseFloat(rowEditing.find('td:nth-child(5)').find('.element').attr('data-value'))
//    var thanhtien = 0;
//    if (isNaN(dongia) || isNaN(soluong)) {

//    } else {
//        thanhtien = dongia * soluong;
//    }
//    var elementThanhtien = rowEditing.find('td:nth-child(6)').find('.element');
//    elementThanhtien.attr({ 'data-value': thanhtien });
//    elementThanhtien.attr({ 'data-text': thanhtien.formatMoney(2, '.', ',') });
//    rowEditing.find('td:nth-child(6)').find('.label-control').text(thanhtien.formatMoney(2, '.', ','));

//}


//////////////////////////////////////////////////////////xóa chưa kiểm tra trạng thái của đơn thuốc tại client
//function XP_Kedon_Delete_dtct(element, id) {

//    var benhnhan = benhnhanOBJ.data('detail');

//    var status = XP_GetTrangthaiBenhnhan();
//    if (status == 0) {
//        var tr = $(element).closest('tr');
//        var name = '';
//        if (tr.hasClass('editing')) {
//            name = tr.find('td:nth-child(2)').find('select option:selected').text();
//            var value1 = tr.find('td:nth-child(2)').find('select').val();
//            if (value1 == null || value1 == undefined || value1 == '') {
//                name = '';
//            }
//        } else {
//            name = tr.find('td:nth-child(2)').find('.element').data('text');
//            var value = tr.find('td:nth-child(2)').find('.element').data('value');

//            if (value == null || value == undefined || value == '') {
//                name = '';
//            }
//        }
//        if (confirm("Bạn có muốn xóa thuốc: " + name + ' không?')) {

//            if (id != '-1') {
//                //thuốc đã lưu
//                $.ajax({
//                    url: '/dieutri/deletedtct/' + id,
//                    type: 'POST',
//                    contentType: 'json',
//                    success: function (resp) {
//                        var d = JSON.parse(resp);
//                        if (d.success) {
//                            show_alert('Xóa thành công thuốc: ' + name);
//                            tr.remove();
//                        } else {
//                            switch (d.msg) {
//                                case '-1': show_errmess('Đơn thuốc không có thuốc có mã là: ' + id);
//                                    break;
//                                case '1': show_errmess('Không xóa được thuốc này, thử lại sau.');
//                                    break;
//                                case '-2': show_errmess('Không có đơn thuốc nào được tìm thấy');
//                                    break;
//                                case '-3': show_errmess('Đơn thuốc này đã xuất, bạn không thể sửa hoặc xóa thông tin.');
//                                    break;
//                                case '-4':
//                                    break; show_errmess('Dịch vụ CLS đã được thực hiện, không thể xóa');
//                                default:

//                            }
//                        }
//                    },
//                    error: function (err) {
//                        console.log(err.statusText);
//                    }
//                });
//            } else {
//                //thuốc chưa lưu
//                tr.remove();
//                show_alert('Xóa thành công thuốc: ' + name + '');
//            }
//        }
//    } else if (status == 1) {
//        show_errmess('Bệnh nhân đã thanh toán, không được xóa thuốc');
//    } else if (status == 2) {
//        show_errmess('Bệnh nhân đã ra viện, không được xóa thuốc');
//    } else if (status == -1) {
//        //debugger
//        show_warning('Chưa chọn bệnh nhân');
//    } else {
//        show_warning('Không rõ nguyên nhân, thế méo nào fix được');
//    }


//}

//////get json data value
//function XP_Get_JsonData(getEditing) {
//    var table = $('#tbl-xp-ds-don-thuoc-ct');
//    var table_body = table.find('tbody');

//    var jsondata = [];
//    //var trs = table_body.find('tr:not(.empty,.newrow,.template,.invalid)');
//    var trs;
//    if (getEditing) {
//        trs = table_body.find('tr.changed:not(.invalid)');
//    } else {
//        trs = table_body.find('tr.changed:not(.editing,.invalid)');

//    }
//    $.each(trs, function (a, b) {
//        var obj = {};
//        var rowElement = $(b);
//        obj["IDDonct"] = parseFloat(rowElement.attr('id'));
//        obj["IDDon"] = parseFloat(rowElement.attr('data-iddon'));
//        obj["MaDV"] = parseFloat(rowElement.find('td:nth-child(2)').find('.element').attr('data-value'));
//        obj["DonVi"] = rowElement.find('td:nth-child(3)').find('.element').attr('data-value');
//        obj["DonGia"] = parseFloat(rowElement.find('td:nth-child(4)').find('.element').attr('data-value'));
//        obj["SoLuong"] = parseFloat(rowElement.find('td:nth-child(5)').find('.element').attr('data-value'));
//        obj["ThanhTien"] = parseFloat(rowElement.find('td:nth-child(6)').find('.element').attr('data-value'));
//        obj["SoLan"] = '';
//        obj["GhiChu"] = rowElement.find('td:nth-child(7)').find('.element').attr('data-value');
//        obj["MoiLan"] = '';
//        obj["DviUong"] = '';
//        obj["Luong"] = '';
//        obj["DuongD"] = rowElement.find('td:nth-child(8)').find('.element').attr('data-value');
//        obj["TrongBH"] = rowElement.find('td:nth-child(9)').find('.element').attr('data-value');
//        obj["Status"] = parseFloat(rowElement.find('td:nth-child(10)').find('.element').attr('data-value'));
//        obj["TenDV"] = rowElement.find('td:nth-child(2)').find('.element').attr('data-text');
//        obj["TrongBHText"] = rowElement.find('td:nth-child(9)').find('.element').attr('data-text');
//        obj["StatusText"] = rowElement.find('td:nth-child(10)').find('.element').attr('data-text');
//        jsondata.push(obj);
//    });
//    //console.log(jsondata);
//    return jsondata;
//}


/////// end kê đơn



///////Binding danh sách đơn thuốc

//function XP_Binding_DS_DonThuoc(source) {
//    var table_dtct = $('#tbl-xp-ds-don-thuoc-ct');
//    var tbody_dtct = table_dtct.find('tbody');
//    if (table_dtct.hasClass('dataTable')) {
//        tbody_dtct.html('').empty();
//        table_dtct.DataTable().destroy();
//        table_dtct.find('thead tr td').removeAttr('style');
//    }
//    tbody_dtct.html('');
//    $('#form-xp-don-thuoc').data('source', null);
//    if (source != null && source != undefined) {
//        if (source.length > 0) {
//            var donthuoc_ngoaitru = source[0];
//            $('#form-xp-don-thuoc #ddl-xp-kho-xuat').val(donthuoc_ngoaitru.MaKXuat);
//            $('#form-xp-don-thuoc #txt-xp-loi-dan').val(donthuoc_ngoaitru.GhiChu);
//            var form_kedon = $('#form-xp-don-thuoc');
//            form_kedon.find('#DSDonthuocct').val(JSON.stringify(donthuoc_ngoaitru.dtcts));
//            form_kedon.find('#IDDon').val(donthuoc_ngoaitru.IDDon);
//            form_kedon.find('#MaKP').val(donthuoc_ngoaitru.MaKP);
//            form_kedon.find('#MaCB').val(donthuoc_ngoaitru.MaCB);
//            form_kedon.find('#NgayKeStr').val(donthuoc_ngoaitru.NgayKe);
//            form_kedon.find('#Status').val(donthuoc_ngoaitru.StatusInt);
//            form_kedon.find('#PLDV').val(donthuoc_ngoaitru.PLDV);
//            form_kedon.find('#KieuDon').val(donthuoc_ngoaitru.KieuDon);
//            form_kedon.find('#LoaiDuoc').val(donthuoc_ngoaitru.LoaiDuoc);
//            form_kedon.find('#SoPL').val(donthuoc_ngoaitru.SoPL);
//            form_kedon.find('#MaBNhan').val(donthuoc_ngoaitru.MaBNhan);
//            ///////////
//            $('#form-xp-don-thuoc').data('source', donthuoc_ngoaitru);
//            table_dtct.data('source', donthuoc_ngoaitru.dtcts);
//            $.each(donthuoc_ngoaitru.dtcts, function (a, b) {
//                var tr = '<tr data-iddon="' + b.IDDon + '" id="' + b.IDDonct + '">';
//                var ghichu = '';
//                if (b.GhiChu == null || b.GhiChu == undefined) {
//                    ghichu = ((b.SoLan == null || b.SoLan == '') ? "" : b.SoLan + ';');
//                    ghichu += ((b.MoiLan == null || b.MoiLan == '') ? "" : b.MoiLan + ';');
//                    ghichu += ((b.DviUong == null || b.DviUong == '') ? "" : b.DviUong + ';');
//                    ghichu += ((b.Luong == null || b.Luong == '') ? "" : b.Luong + ';');
//                } else {
//                    ghichu = b.GhiChu;
//                }
//                tr += '<td><span class="element" data-value="' + (a + 1) + '" data-text="' + (a + 1) + '" data-edit="false"></span></td>';
//                tr += '<td><span class="element" data-event="EventMaDVChanged" data-value="' + (b.MaDV) + '" data-text=\'' + (b.TenDV) + '\' data-type="select"></span>' + (b.TenDV) + '</td>';
//                tr += '<td><span class="element" data-value="' + (b.DonVi) + '" data-text="' + (b.DonVi) + '" data-edit="false" data-type="input"></span>' + (b.DonVi) + '</td>';
//                tr += '<td class="text-right"><span class="element" data-value="' + (b.DonGia) + '" data-text="' + (b.DonGia).formatMoney(3, '.', ',') + '" data-edit="false" data-type="input"></span>' + (b.DonGia).formatMoney(3, '.', ',') + '</td>';
//                tr += '<td class="text-right"><span class="element" data-event="Validation_luongton" data-value="' + (b.SoLuong) + '" data-text="' + (b.SoLuong).formatMoney(3, '.', ',') + '" data-type="number"></span>' + (b.SoLuong).formatMoney(3, '.', ',') + '</td>';
//                tr += '<td class="text-right"><span class="element" data-value="' + (b.ThanhTien) + '" data-text="' + (b.ThanhTien).formatMoney(3, '.', ',') + '" data-edit="false" data-type="input"></span>' + (b.ThanhTien).formatMoney(3, '.', ',') + '</td>';
//                tr += '<td><span class="element" data-value="' + (ghichu) + '" data-text="' + (ghichu) + '" data-type="input"></span>' + (ghichu) + '</td>';
//                tr += '<td><span class="element" data-value="' + (b.DuongD == null ? '' : b.DuongD) + '" data-text="' + (b.DuongD == null ? '' : b.DuongD) + '" data-type="input"></span>' + (b.DuongD = null ? '' : b.DuongD) + '</td>';
//                tr += '<td><span class="element" data-event="XP_Kedon_Tinhthanhtien" data-value="' + (b.TrongBH) + '" data-text="' + (b.TrongBHText) + '" data-type="select"></span>' + (b.TrongBHText) + '</td>';
//                tr += '<td><span class="element" data-value="' + (b.Status) + '" data-text="' + (b.StatusText) + '" data-type="select"></span>' + (b.StatusText) + '</td>';

//                tr += '<td><a class="text-danger" onclick="XP_Kedon_Delete_dtct(this,' + b.IDDonct + ');" href="javascript:;"><i class="fa fa-trash"></i>&nbsp;</a></td>';
//                tr += '</tr>';
//                tbody_dtct.append(tr);

//            });
//            XP_BindingTable_Kedon();
//            table_dtct.DataTable({
//                searching: false,
//                lengthChange: false,
//                info: false,
//                sorting: false,
//                language: {
//                    paginate: {
//                        first: '«',
//                        previous: 'Back',
//                        next: 'Next',
//                        last: '»'
//                    }
//                }
//            });


//        } else {

//            XP_Reset_form_Khambenh($('#form-xp-don-thuoc'), true);
//            tbody_dtct.html('<tr class="empty"><td colspan="14">Bệnh nhân chưa có đơn thuốc</td></tr>');
//            XP_Binding_Template_Row();
//            XP_BindingTable_Kedon();
//        }
//    } else {
//        XP_Reset_form_Khambenh($('#form-xp-don-thuoc'), true);
//        tbody_dtct.html('<tr class="empty"><td colspan="14">Bệnh nhân chưa có đơn thuốc</td></tr>');
//        XP_Binding_Template_Row();
//        XP_BindingTable_Kedon();
//    }
//    table_dtct.find('tbody td:nth-child(2)').css({ width: '310px' });
//    table_dtct.find('tbody td:nth-child(3)').css({ width: '80px' });
//    table_dtct.find('tbody td:nth-child(4)').css({ width: '80px' });
//    table_dtct.find('tbody td:nth-child(5)').css({ width: '80px' });
//    table_dtct.find('tbody td:nth-child(6)').css({ width: '100px' });
//    table_dtct.find('tbody td:nth-child(8)').css({ width: '100px' });
//}

///////Binding danh sách dịch vụ

//function XP_Binding_DS_Dichvu(source) {
//    var table_dichvu = $('#tbl-xp-ds-dich-vu');
//    var tbody_dichvu = table_dichvu.find('tbody');
//    if (table_dichvu.hasClass('dataTable')) {
//        tbody_dichvu.html('').empty();
//        table_dichvu.DataTable().destroy();
//        table_dichvu.find('thead tr td').removeAttr('style');
//    }
//    tbody_dichvu.html('').empty();
//    if (source != null && source != undefined) {
//        if (source.dsdichvuct.length > 0) {
//            $.each(source.dsdichvuct, function (a, b) {
//                var tr = '<tr data-iddon="' + b.IDDon + '" id="' + b.IDDonct + '">';
//                tr += '<td><span class="element" data-value="' + (a + 1) + '" data-text="' + (a + 1) + '" data-edit="false"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.NgayNhap) + '" data-text="' + (b.NgayNhap) + '" data-type="date"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.MaKP) + '" data-text="' + (b.TenKP) + '" data-type="select"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.MaDV) + '" data-text="' + (b.TenDV) + '" data-type="select"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.DonVi) + '" data-text="' + (b.DonVi) + '" data-type="input" data-edit="false"></span></td>';
//                tr += '<td class="text-right"><span class="element" data-value="' + (b.DonGia) + '" data-text="' + ConvertToCurrency(b.DonGia) + '" data-type="input" data-edit="false"></span></td>';
//                tr += '<td class="text-right"><span class="element" data-event="XP_Tinhthanhtien_Dichvu(this);" data-value="' + (b.SoLuong) + '" data-text="' + ConvertToCurrency(b.SoLuong) + '" data-type="input"></span></td>';
//                tr += '<td class="text-right"><span class="element" data-value="' + (b.ThanhTien) + '" data-text="' + ConvertToCurrency(b.ThanhTien) + '" data-edit="false"></span></td>';
//                tr += '<td><span class="element" data-event="XP_Tinhthanhtien_Dichvu(this);" data-value="' + (b.TrongBH) + '" data-text="' + (b.TrongBHText) + '" data-type="select"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.MaCB) + '" data-text="' + (b.TenCB) + '" data-type="select"></span></td>';
//                tr += '<td><span class="element" data-value="' + (b.IDKB) + '" data-text="' + (b.IDKB) + '" data-type="input" data-edit="false"></span></td>';
//                tr += '<td><a class="text-danger" onclick="XP_Kedon_Delete_dv(this,' + b.IDDonct + ');" href="javascript:;"><i class="fa fa-trash"></i></a></td>';
//                tr += '</tr>';
//                tbody_dichvu.append(tr);




//                /////////////////////////////////
//                //var tr = '<tr data-iddon="' + b.IDDon + '" id="' + b.IDDonct + '">';
//                //tr += '<td>' + (a + 1) + '</td>';
//                //tr += '<td>' + (b.NgayNhap) + '</td>';
//                //tr += '<td>' + (b.TenKP) + '</td>';
//                //tr += '<td>' + (b.TenDV) + '</td>';
//                //tr += '<td>' + (b.DonVi) + '</td>';
//                //tr += '<td class="text-right">' + (b.DonGia).formatMoney(3, '.', ',') + '</td>';
//                //tr += '<td class="text-right">' + (b.SoLuong).formatMoney(3, '.', ',') + '</td>';
//                //tr += '<td class="text-right">' + (b.ThanhTien).formatMoney(3, '.', ',') + '</td>';
//                //tr += '<td>' + (b.TrongBHText) + '</td>';
//                //tr += '<td>' + (b.TenCB) + '</td>';
//                //tr += '<td>' + (b.IDKB) + '</td>';
//                //tr += '<td><a class="btn-sm btn-danger" href="javascript:;" ><i class="fa fa-trash"></i>&nbsp;Xóa</a></td>';
//                //tr += '</tr>';
//                //tbody_dichvu.append(tr);

//            });
//            //////
//            table_dichvu.data('source', source.dsdichvuct);
//            XP_BindingTable_Dichvu();
//            table_dichvu.DataTable({
//                searching: false,
//                lengthChange: false,
//                info: false,
//                sorting: false,
//                language: {
//                    paginate: {
//                        first: '«',
//                        previous: 'Back',
//                        next: 'Next',
//                        last: '»'
//                    }
//                }
//            });

//        } else {
//            XP_BindingTable_Dichvu();
//            tbody_dichvu.append('<tr class="empty"><td colspan="12">Bệnh nhân chưa có dịch vụ</td></tr>');
//        }

//        $.each(tbody_dichvu.find('tr'), function (a, b) {
//            $(b).find('td:nth-child(1)').css({ 'min-width': '30px' });
//            $(b).find('td:nth-child(2)').css({ 'min-width': '100px' });
//            $(b).find('td:nth-child(3)').css({ 'min-width': '122px' });
//            $(b).find('td:nth-child(4)').css({ 'min-width': '322px' });
//            $(b).find('td:nth-child(5)').css({ 'min-width': '70px' });
//            $(b).find('td:nth-child(6)').css({ 'min-width': '98px' });
//            $(b).find('td:nth-child(7)').css({ 'min-width': '100px' });
//            $(b).find('td:nth-child(8)').css({ 'min-width': '92px' });
//            $(b).find('td:nth-child(9)').css({ 'min-width': '90px' });
//            $(b).find('td:nth-child(10)').css({ 'min-width': '126px' });
//            $(b).find('td:nth-child(11)').css({ 'min-width': '64px' });
//            $(b).find('td:nth-child(11)').css({ 'min-width': '37px' });
//        })

//    } else {
//        XP_BindingTable_Dichvu();
//        tbody_dichvu.append('<tr class="empty"><td colspan="12">Bệnh nhân chưa có dịch vụ</td></tr>');
//    }

//}

///////reset form khám bệnh

//function XP_Reset_form_Khambenh(form, IsHidden) {
//    $.each($(form).find('input:not(:radio),select'), function (a, b) {
//        if (IsHidden) {
//            $(b).val('');

//        } else {
//            if (!$(b).is(':hidden')) {
//                $(b).val('');
//            }
//        }
//        ////
//        if ($(b).hasClass('datepicker')) {
//            $(b).val(getCurrentDate());
//        } else if ($(b).hasClass('datetimepicker')) {
//            $(b).val(getCurrentDateTime());
//        }
//        if ($(b).prop('tagName') === 'SELECT') {
//            if ($(b).hasClass('select2-hidden-accessible')) {
//                ///select2
//                $(b)
//                    .empty() //empty select
//                    .append($("<option/>") //add option tag in select
//                        .val('') //set value for option to post it
//                        .text('')) //set a text for show in select
//                    .val('') //select option of select2
//                    .trigger("change"); //apply to select2
//            }
//        }


//    });
//}


////hàm kết thúc khám bệnh
//function XP_Ketthuc_khambenh() {
//    var obj = benhnhanOBJ.data('detail');
//    if (confirm('Bạn có muốn kết thúc khám bệnh cho bệnh nhân' + ((obj == null || obj == undefined) ? " này" : ': "' + obj.benhnhan.TenBNhan + '"') + ' không?')) {

//        var bnkbs = $('#table-xp-ds-khambenh').data('source');
//        if (bnkbs == null || bnkbs == undefined) {
//            show_errmess('Bệnh nhân chưa có khám bệnh');
//        } else {
//            var status = XP_GetTrangthaiBenhnhan();
//            if (status == 0) {
//                if (obj != null && obj != undefined) {
//                    var mabn = obj.benhnhan.MaBNhan;

//                    $.ajax({
//                        url: '/xa-phuong/ket-thuc-kham-benh?mabn=' + mabn,
//                        contentType: 'json',
//                        type: 'POST',
//                        success: function (d) {
//                            if (d.success) {
//                                show_alert('Kết thúc khám bệnh thành công.');
//                                XP_Lay_TT_chitiet_benhnhan(mabn);
//                                XP_Load_TT_Khambenh_Benhnhan(mabn);
//                                $('#btn-xp-kedon-ketthuc').hide();
//                            } else {
//                                switch (d.msg) {
//                                    case '-1': show_warning('Không tìm thấy bệnh nhân');
//                                        break;
//                                    case '1': show_warning('Không lưu được thông tin');
//                                        break;
//                                    case '2': show_warning('Bệnh nhân đã ra viện');
//                                        break;
//                                    case '3': show_warning('Bệnh nhân đã thanh toán');
//                                        break;
//                                    default: show_warning('Không rõ nguyên nhân');

//                                }
//                            }
//                        },
//                        error: function (err) {
//                            console.log(err.statusText);
//                        }
//                    });
//                } else {
//                    //debugger
//                    show_warning('Chưa chọn bệnh nhân');
//                }
//            } else if (status == 1) {
//                show_warning('Bệnh nhân đã thanh toán');
//            } else if (status == 2) {
//                show_warning('Bệnh nhân đã ra viện');
//            }
//        }
//    }
//}

/////////////libraries dịch vụ

//var danhsachdichvu = [];

//var danhsachkhoaphong = [];

//var danhsachbacsi = [];


//function XP_Binding_Template_Row_Dichvu() {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    ///binding row template to add data

//    if (table_body.find('tr.template').length <= 0) {

//        var stt = -1;
//        var tr = '<tr class="template" data-iddon="-1" id="-1">';
//        tr += '<td><span class="element" data-value="-1" data-text="-1" data-edit="false"></span></td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-type="date"></span></td>';
//        tr += '<td><span class="element" data-value="' + (getCurrentDate()) + '" data-text="' + (getCurrentDate()) + '" data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="" data-text="" data-type="input" data-edit="false"></span></td>';
//        tr += '<td class="text-right"><span data-type="input" class="element" data-value="0" data-text="0" data-edit="false"></span></td>';
//        tr += '<td class="text-right"><span class="element" data-event="XP_Tinhthanhtien_Dichvu(this);" data-value="0" data-text="0" data-type="input"></span></td>';
//        tr += '<td class="text-right"><span class="element" data-value="0" data-text="0" data-edit="false"></span></td>';
//        tr += '<td><span class="element" data-event="XP_Tinhthanhtien_Dichvu(this);" data-value="' + (1) + '" data-text="' + (1) + '" data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="' + ('') + '" data-text="' + ('') + '" data-type="select"></span></td>';
//        tr += '<td><span class="element" data-value="' + (0) + '" data-text="' + (0) + '" data-type="input" data-edit="false"></span></td>';
//        tr += '<td><a class="text-danger" onclick="XP_Kedon_Delete_dv(this,-1);" href="javascript:;"><i class="fa fa-trash"></i></a></td>';
//        tr += '</tr>';
//        table_body.append(tr);
//    }
//    /////end binding row
//}

//function XP_BindingTable_Dichvu() {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    ///binding row template to add data

//    XP_Binding_Template_Row_Dichvu();

//    /////end binding row
//    $.each(table_body.find('tr'), function (a, b) {

//        $.each($(b).find('td'), function (c, d) {
//            var control = $(d).find('.element');
//            if (control.length > 0) {
//                var str = '';
//                if ((control.data('text')).length > 40) {
//                    str = (control.data('text')).substr(0, 37) + '...';
//                } else {
//                    str = control.data('text');
//                }
//                var html = '<span class="label-control" title="' + control.data('text') + '">' + str + '</span>';
//                $(d).html('').append(control).append(html);
//            }
//        });

//    });



//    $('#tbl-xp-ds-dich-vu tr td').on({
//        'dblclick': function (e) {
//            if ($(this).closest('tr').hasClass('editing')) {

//            } else {
//                ClickRowEvents_Dichvu(this);
//                Initial_RowEdit_Dichvu();
//                $(this).closest('tr').find('td:nth-child(10)').find('select').keydown(function (e) {
//                    if (e.keyCode == 9) {
//                        $('#btn-form-xp-dichvu-add').trigger('click');

//                    }

//                });
//            }

//        }
//    });
//}

//function ClearRowEdit_Dichvu() {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    var trs = table_body.find('.editing');
//    //trs.addClass('changed');
//    if (trs.length > 0) {
//        $.each(trs, function (a, b) {
//            $(b).removeClass('newrow');
//            $.each($(b).find('td'), function (c, d) {
//                var element = $(d).find('.element');
//                var type = element.attr('data-type');
//                var value = element.attr('data-value');
//                var text = element.attr('data-text');
//                var event = element.attr('data-event');
//                var control = $(d).find('.tbl-cell-demo');
//                var value2 = {};
//                var isEdit = element.attr('data-edit');
//                if (element.length > 0) {
//                    if (isEdit == true || isEdit == undefined || isEdit == null) {
//                        var html = '';
//                        if (type === 'select') {
//                            value2['value'] = control.val();
//                            value2['text'] = control.find('option:selected').text();
//                            var str = '';
//                            if ((value2['text']).length > 40) {
//                                str = (value2['text']).substr(0, 37) + '...';
//                            } else {
//                                str = value2['text'];
//                            }
//                            html = '<span class="label-control">' + str + '</span>';
//                        } else if (type === 'input' || type === 'date' || type === 'datetime') {
//                            value2['value'] = control.val();
//                            value2['text'] = control.val();
//                            var str = '';
//                            if ((value2['text']).length > 40) {
//                                str = (value2['text']).substr(0, 37) + '...';
//                            } else {
//                                str = value2['text'];
//                            }

//                            var innn = parseFloat(str.replace(/,/gi, ''));
//                            if (!isNaN(innn)) {
//                                str = ConvertToCurrency(innn);
//                            }
//                            if (type === 'input') {
//                                html = '<span class="label-control">' + str + '</span>';
//                            } else {
//                                html = '<span class="label-control">' + value2.value + '</span>';
//                            }
//                        } else {
//                            value2['value'] = value;
//                            value2['text'] = text;
//                            var str = '';
//                            if ((value2['text']).length > 40) {
//                                str = (value2['text']).substr(0, 37) + '...';
//                            } else {
//                                str = value2['text'];
//                            }
//                            html = '<span class="label-control">' + str + '</span>';
//                        }

//                        $(element).attr('data-value', value2.value).data('value', value2.value);
//                        $(element).attr('data-text', value2.text).data('value', value2.text);
//                        $(element).attr('data-type', type);//.data('value', value2.text);
//                        $(element).attr('data-edit', isEdit);//.data('value', value2.text);
//                        $(element).attr('data-event', event);
//                        $(d).html('').append(element).append(html);
//                    } else {

//                        var html = '';
//                        value2['value'] = value;
//                        value2['text'] = text;
//                        var str = '';
//                        if ((value2['text']).length > 40) {
//                            str = (value2['text']).substr(0, 37) + '...';
//                        } else {
//                            str = value2['text'];
//                        }
//                        html = '<span class="label-control">' + str + '</span>';
//                        $(d).html('').append(element).append(html);
//                    }
//                }
//            });
//            Validate_Row_Dichvu(b);
//        });
//    }
//    trs.removeClass('editing');
//    trs.addClass('changed');
//}

//function ClickRowEvents_Dichvu(td) {

//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');

//    if ($(td).closest('tr').hasClass('editing')) {

//    } else {
//        ClearRowEdit_Dichvu();
//        $(td).closest('tr').addClass('editing');

//        $.each($(td).closest('tr').find('td'), function (c, d) {
//            var control = $(d).find('.element');
//            var value = control.data('value');
//            var text = control.data('text');
//            var type = control.data('type');
//            var isEdit = control.data('edit');
//            var func = control.data('event');
//            if (isEdit == true || isEdit == undefined || isEdit == null) {
//                if (type === 'select') {
//                    var html = '<select onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo">';
//                    html += '</select>';
//                    $(d).html('').append(control).append(html);
//                    $(d).find('select').val(value);
//                } else if (type === 'input') {
//                    var html = '<input type="text" onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo" value="' + value + '"/>';
//                    $(d).html('').append(control).append(html);
//                    $(d).find('input').val(value);
//                } else if (type === 'date') {
//                    var html = '<input type="text" onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo datepicker" value="' + value + '"/>';
//                    $(d).html('').append(control).append(html);
//                    $(d).find('input').val(value);
//                } else if (type === 'datetime') {
//                    var html = '<input type="text" onchange="' + ((func != null && func != undefined && func != '') ? func + '(this);' : '') + '" class="tbl-cell-demo datetimepicker" value="' + value + '"/>';
//                    $(d).html('').append(control).append(html);
//                    $(d).find('input').val(value);
//                }
//            }

//        });

//    }
//    $(td).closest('tr').find('td').find('input.datepicker,input.datetimepicker').wrap('<div style="position:relative;"></div>');

//    $(td).closest('tr').find('td').find('input.datepicker').datetimepicker({
//        format: 'DD/MM/YYYY',
//    });

//    $(td).closest('tr').find('td').find('input.datetimepicker').datetimepicker({
//        format: 'DD/MM/YYYY HH:mm:ss',
//    });

//    $(td).find('select,input').focus().select();
//    //console.log($(td).find('select,input'));


//    $.each($(td).closest('tr').find('td'), function (a, b) {
//        $(b).find('input,select').change(function () {
//            $(this).closest('tr').addClass('changed');
//        });

//    });


//    //console.log(obj);
//}

//function EventMaDVChanged_Dichvu(control) {
//    console.log($(control).val());
//    var obj = { value: $(control).val(), text: $(control).find('option:selected').text() }
//    var valueDV;
//    var benhnhan = benhnhanOBJ.data('detail');
//    var element_trongdm = $(control).closest('tr').find('td:nth-child(9)').find('select');
//    var trongdm = element_trongdm.val();
//    trongdm = (trongdm == null || trongdm == undefined || trongdm == '') ? 0 : trongdm;
//    var httt;
//    if (benhnhan == null || benhnhan == undefined) {
//        httt = -1;
//    } else {
//        httt = benhnhan.doituongbenhnhan.HTTT;
//    }
//    ////lấy thông tin thuốc
//    $.each(danhsachdichvu, function (a, b) {
//        if (b.MaDV == obj.value) {
//            valueDV = b;
//            return false;
//        }
//    });

//    if (valueDV == null || valueDV == undefined) {
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(5)'), { value: '', text: '' });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(6)'), { value: 0, text: 0 });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(9)'), { value: 1, text: 1 });
//    } else {
//        var trongdmvalue = 0;
//        var dongia = 0;
//        if (httt == '1' || httt == '0') {
//            trongdmvalue = valueDV.TrongDM;
//            if (trongdm == '1') {
//                dongia = valueDV.DonGia2;
//            } else {
//                dongia = valueDV.DonGia;
//            }
//        } else {
//            trongdmvalue = 0;
//            if (trongdm == '1') {
//                dongia = valueDV.DonGia2;
//            } else {
//                dongia = valueDV.DonGia;
//            }
//        }
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(5)'), { value: valueDV.DonVi, text: valueDV.DonVi });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(6)'), { value: dongia, text: parseFloat(dongia).formatMoney(2, '.', ',') });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(9)'), { value: trongdmvalue, text: trongdmvalue });

//    }

//    XP_Tinhthanhtien_Dichvu(null);
//    $('#tbl-xp-ds-dich-vu tr.editing').find('td:nth-child(5)').find('input').select();
//}

//function change_value_target_Dichvu(td, obj) {

//    var element = $(td).find('.element');
//    var type = element.attr('data-type');
//    $(td).find('span.label-control').text(obj.text);
//    if (type === 'select') {
//        $(td).find('select').val(obj.value);
//        $(td).find('.element').attr({ 'data-value': obj.value }, { 'data-text': obj.text });
//    } else if (type === 'input') {
//        $(td).find('input').val(obj.text);

//        $(td).find('.element').attr({ 'data-value': obj.value });
//        $(td).find('.element').attr({ 'data-text': obj.text });
//    }
//}

/////Check validate row nhap dữ liệu
//function Validate_Row_Dichvu(tr) {

//    var checkdate = true,
//        checkmadv = true,
//        checksl = true;
//    /////check ngày nhập
//    var stringNgaynhap = $(tr).find('td:nth-child(2)').find('.element').data('value');
//    var date = moment(stringNgaynhap, "DD-MM-YYYY");
//    if (date._d === 'Invalid Date') {
//        checkdate = false;
//    }
//    var madv = $(tr).find('td:nth-child(4)').find('.element').data('value');
//    if (madv == null || madv == undefined || madv == '' || madv == '0') {
//        checkmadv = false;
//    }
//    //check số lượng
//    var soluong = $(tr).find('td:nth-child(7)').find('.element').data('value');
//    var d_sl = parseFloat(soluong);
//    if (isNaN(d_sl)) {
//        checksl = false;
//    } else {
//        checksl = d_sl > 0;
//    }
//    if (checkdate && checkmadv && checksl) {
//        $(tr).removeClass('invalid');
//        return true;

//    } else {
//        $(tr).addClass('invalid');
//        return false;
//    }

//}

//function Initial_RowEdit_Dichvu() {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    var tr = table_body.find('.editing');
//    var dichvu = tr.find('td:nth-child(4)').find('select');
//    dichvu.attr({ 'onchange': 'EventMaDVChanged_Dichvu(this);' });
//    var elementDichvu = tr.find('td:nth-child(4)').find('.element');
//    dichvu.html('');

//    /////binding danh sách dịch vụ


//    if (danhsachdichvu.length > 0) {
//        XP_Binding_Thuoc_Dichvu(danhsachdichvu, dichvu, elementDichvu.attr('data-value'));
//    } else {
//        $.ajax({
//            url: '/api/dieutriapi/get-danh-sach-dich-vu',
//            type: 'get',
//            success: function (response) {
//                danhsachdichvu = response;
//                console.log(response);
//                XP_Binding_Thuoc_Dichvu(response, dichvu, elementDichvu.attr('data-value'));
//            }

//        });
//    }


//    ///binding trong bảo hiểm
//    var trongbh = tr.find('td:nth-child(9)').find('select');
//    trongbh.attr({ 'onchange': 'XP_TrongDM_Changed_Dichvu(this);' });
//    var oldvalue = tr.find('td:nth-child(9)').find('.element').attr('data-value');
//    trongbh.html('');
//    trongbh.append('<option value="0">Ngoài DM</option>');
//    trongbh.append('<option value="1">Trong DM</option>');
//    trongbh.append('<option value="2">Không TT</option>');
//    trongbh.val(oldvalue);

//    //////////////binding danh sách khoa phòng 

//    var khoaphong = tr.find('td:nth-child(3)').find('select');
//    var oldvalue1 = tr.find('td:nth-child(3)').find('.element').attr('data-value');
//    khoaphong.html('');
//    khoaphong.attr({ 'onchange': 'XP_Dichvu_KP_change(this);' });
//    var obj = benhnhanOBJ.data("khoaphongbacsi");
//    if (obj.length > 0) {
//        danhsachkhoaphong = obj;
//        khoaphong.append('<option value>Chọn khoa phòng</option>');
//        $.each(obj, function (a, b) {
//            var option = '<option value="' + b.MaKP + '">' + b.TenKP + '</option>';
//            khoaphong.append(option);
//        });
//        khoaphong.val(oldvalue1);
//        khoaphong.trigger('change');
//        khoaphong.select2();
//    } else {
//        $.ajax({
//            url: '/xa-phuong/get-khoa-phong-bac-si',
//            type: 'get',
//            contentType: 'json',
//            success: function (d) {
//                danhsachkhoaphong = d;
//                khoaphong.append('<option value>Chọn khoa phòng</option>');
//                $.each(d, function (a, b) {
//                    var option = '<option value="' + b.MaKP + '">' + b.TenKP + '</option>';
//                    khoaphong.append(option);
//                });
//                khoaphong.val(oldvalue1);
//                khoaphong.select2();

//            },
//            error: function (err) {
//                console.log('Error: lấy thông tin khoa phòng dịch vụ lỗi');
//            }
//        });
//    }

//}

//function XP_Dichvu_KP_change(control) {
//    console.log($(control).val());
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    var tr = table_body.find('.editing');
//    var makp = $(control).val();
//    var controlBacsi = tr.find('td:nth-child(10)').find('select');
//    controlBacsi.html('');
//    if (makp == null || makp == undefined || makp == '') {

//    } else {
//        if (danhsachkhoaphong.length > 0) {
//            var kp;
//            $.each(danhsachkhoaphong, function (a, b) {
//                if (b.MaKP == makp) {
//                    kp = b;
//                    return false;
//                }
//            });
//            if (kp != null && kp != undefined) {
//                $.each(kp.canbos, function (a, b) {
//                    var option = '<option value="' + b.MaCB + '">' + b.TenCB + '</option>';
//                    controlBacsi.append(option);
//                });
//            }
//        }
//    }
//}

//function XP_Binding_Thuoc_Dichvu(source, control, oldValue) {
//    $(control).html('');
//    $(control).append('<option value>Chọn dịch vụ</option>');
//    $.each(source, function (a, b) {
//        var option = '<option value=' + b.MaDV + '>';
//        option += b.TenDV;
//        option += '</option>'
//        $(control).append(option);
//    });
//    $(control).val(oldValue);
//    $(control).select2({

//    });
//}

//function XP_Tinhthanhtien_Dichvu(control) {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');
//    var rowEditing = table_body.find('tr.editing');
//    var soluongN = rowEditing.find('td:nth-child(7)').find('input').val();
//    rowEditing.find('td:nth-child(7)').find('.element').attr({ 'data-value': soluongN });
//    rowEditing.find('td:nth-child(7)').find('.element').attr({ 'data-text': soluongN });
//    var dongia = parseFloat(rowEditing.find('td:nth-child(6)').find('.element').attr('data-value'));
//    var soluong = parseFloat(rowEditing.find('td:nth-child(7)').find('.element').attr('data-value'))
//    var thanhtien = 0;
//    if (isNaN(dongia) || isNaN(soluong)) {

//    } else {
//        thanhtien = dongia * soluong;
//    }
//    var elementThanhtien = rowEditing.find('td:nth-child(8)').find('.element');
//    elementThanhtien.attr({ 'data-value': thanhtien });
//    elementThanhtien.attr({ 'data-text': thanhtien.formatMoney(2, '.', ',') });
//    rowEditing.find('td:nth-child(8)').find('.label-control').text(thanhtien.formatMoney(2, '.', ','));
//}

//function XP_TrongDM_Changed_Dichvu(control) {
//    var madv = $(control).closest('tr').find('td:nth-child(4)').find('select').val();
//    var valueDV;
//    var trongdm = $(control).val();
//    $.each(danhsachdichvu, function (a, b) {
//        if (b.MaDV == madv) {
//            valueDV = b;
//            return false;
//        }
//    });

//    if (valueDV == null || valueDV == undefined) {
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(5)'), { value: '', text: '' });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(6)'), { value: 0, text: 0 });
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(9)'), { value: 1, text: 1 });
//    } else {
//        var dongia = 0;
//        dongia = trongdm == '1' ? valueDV.DonGia2 : valueDV.DonGia;
//        change_value_target_Dichvu($(control).closest('tr').find('td:nth-child(6)'), { value: dongia, text: parseFloat(dongia).formatMoney(2, '.', ',') });
//    }
//    XP_Tinhthanhtien_Dichvu();
//}

//function XP_Kedon_Delete_dv(element, id) {
//    var status = XP_GetTrangthaiBenhnhan();
//    if (status == 0) {
//        var tr = $(element).closest('tr');
//        var name = '';
//        if (tr.hasClass('editing')) {
//            name = tr.find('td:nth-child(4)').find('select option:selected').text();
//            var value1 = tr.find('td:nth-child(4)').find('select').val();
//            if (value1 == null || value1 == undefined || value1 == '') {
//                name = '';
//            }
//        } else {
//            name = tr.find('td:nth-child(4)').find('.element').data('text');
//            var value = tr.find('td:nth-child(4)').find('.element').data('value');

//            if (value == null || value == undefined || value == '') {
//                name = '';
//            }
//        }
//        if (confirm("Bạn có muốn xóa dịch vụ: " + name + ' không?')) {

//            if (id != '-1') {
//                //thuốc đã lưu
//                $.ajax({
//                    url: '/dieutri/deletedonthuocct/' + id,
//                    type: 'POST',
//                    contentType: 'json',
//                    success: function (res) {
//                        var d = JSON.parse(res);
//                        if (d.success) {
//                            show_alert('Xóa thành công dịch vụ: ' + name);
//                            tr.remove();
//                        } else {
//                            switch (d.msg) {
//                                case '-1': show_errmess('Đơn thuốc không có thuốc có mã là: ' + id);
//                                    break;
//                                case '1': show_errmess('Không xóa được dịch vụ này, thử lại sau.');
//                                    break;
//                                case '-2': show_errmess('Không có đơn thuốc nào được tìm thấy');
//                                    break;
//                                case '-3': show_errmess('Đơn thuốc này đã xuất, bạn không thể sửa hoặc xóa thông tin.');
//                                    break;
//                                case '-4': show_errmess('Dịch vụ CLS đã được thực hiện, không thể xóa');
//                                    break;
//                                default:

//                            }
//                        }
//                    },
//                    error: function (err) {
//                        console.log(err.statusText);
//                    }
//                });
//            } else {
//                //thuốc chưa lưu
//                tr.remove();
//                show_alert('Xóa thành công thuốc: ' + name + '');
//            }
//        }
//    } else if (status == 1) {
//        show_warning('Bệnh nhân đã thanh toán, không được xóa dịch vụ');
//    } else if (status == 2) {
//        show_warning('Bệnh nhân đã ra viện, không được xóa dịch vụ');
//    } else if (status == -1) {
//        //debugger
//        show_warning('Chưa chọn bệnh nhân');
//    } else {
//        show_warning('Éo biết nguyên nhân gì luôn');
//    }



//}

//////get json data value

//function XP_Get_JsonData_Dichvu() {
//    var table = $('#tbl-xp-ds-dich-vu');
//    var table_body = table.find('tbody');

//    var jsondata = [];
//    //var trs = table_body.find('tr:not(.empty,.newrow,.template,.invalid)');
//    var trs = table_body.find('tr.changed');

//    $.each(trs, function (a, b) {
//        if (!$(b).hasClass('invalid')) {

//            var obj = {};
//            var rowElement = $(b);
//            obj["IDDonct"] = parseInt(rowElement.attr('id'));
//            obj["IDDon"] = parseInt(rowElement.attr('data-iddon'));
//            obj["MaDV"] = parseInt(rowElement.find('td:nth-child(4)').find('.element').attr('data-value'));
//            obj["DonVi"] = rowElement.find('td:nth-child(5)').find('.element').attr('data-value');
//            obj["DonGia"] = parseFloat(rowElement.find('td:nth-child(6)').find('.element').attr('data-value'));
//            obj["SoLuong"] = parseFloat(rowElement.find('td:nth-child(7)').find('.element').attr('data-value'));
//            obj["ThanhTien"] = parseFloat(rowElement.find('td:nth-child(8)').find('.element').attr('data-value'));
//            obj["SoLan"] = '';
//            obj["GhiChu"] = ''
//            obj["MaBNhan"] = $('#lbl-xp-mabnhan').text();
//            obj["MoiLan"] = '';
//            obj["DviUong"] = '';
//            obj["Luong"] = '';
//            obj["DuongD"] = ''
//            obj["TrongBH"] = parseInt(rowElement.find('td:nth-child(9)').find('.element').attr('data-value'));
//            obj["Status"] = '';
//            obj["MaKP"] = parseInt(rowElement.find('td:nth-child(3)').find('.element').attr('data-value'));
//            obj["NgayNhap"] = rowElement.find('td:nth-child(2)').find('.element').attr('data-value');
//            obj["MaCB"] = rowElement.find('td:nth-child(10)').find('.element').attr('data-value');
//            obj["TenDV"] = rowElement.find('td:nth-child(4)').find('.element').attr('data-text');
//            obj["TrongBHText"] = rowElement.find('td:nth-child(9)').find('.element').attr('data-text');
//            obj["StatusText"] = '';
//            jsondata.push(obj);
//        }
//    });
//    console.log(jsondata);
//    return jsondata;
//}



/////////////end libraries


//function XP_Chandoan_CheckChandoan() {
//    var form_chandoan = $('#form-xp-chandoan');
//    var idkb = form_chandoan.find('#txt-xp-chandoan-idkb').val();
//    var phuongan = form_chandoan.find('#ddl-xp-chandoan-phuongan').val();
//    var maicd = form_chandoan.find('#ddl-xp-chandoan-maicd').val();
//    var benhnhan = benhnhanOBJ.data('detail');
//    var status = XP_GetTrangthaiBenhnhan();
//    if (form_chandoan.valid()) {
//        if (status == 0 || status == 2) {
//            var flag1 = false;
//            if (status == 2 && (idkb != null && idkb != undefined && idkb != '')) {
//                var bnkbs = $('#table-xp-ds-khambenh').data('source');
//                if (bnkbs != null && bnkbs != undefined) {
//                    var bnkb = {};
//                    $.each(bnkbs, function (a, b) {
//                        if (b.IDKB == idkb) {
//                            bnkb = b;
//                            return false;
//                        }
//                    });
//                    var idkbF = bnkbs.length > 0 ? bnkbs[0].IDKB : -1;
//                    if (idkbF == bnkb.IDKB) {
//                        if (bnkb.PhuongAn == 0 && phuongan != '1') {
//                            flag1 = true;
//                        } else {
//                            show_warning('Bệnh nhân đã ra viện, không được sửa khám bệnh này');
//                            flag1 = false;
//                        }
//                    } else {
//                        flag1 = false;
//                        show_warning('Không được sửa khám bệnh này.');
//                    }
//                } else {
//                    flag1 = true;
//                }

//            } else {
//                flag1 = true;
//            }

//            if (flag1) {
//                if (maicd == null || maicd == undefined || maicd == '') {
//                    show_errmess('Bạn chưa chọn mã ICD');
//                    //$('#form-diagnose #ddl_chandoan_maicd').trigger('chosen:activate');
//                } else {
//                    var mabenh = form_chandoan.find('#ddl-xp-chandoan-chandoan').val();
//                    var phuongan = form_chandoan.find('#ddl-xp-chandoan-phuongan').val();
//                    var ngaychuyen = form_chandoan.find('#txt-xp-chandoan-ngaychuyen').val();
//                    var type = form_chandoan.find('#ddl-xp-chandoan-phuongan option:selected').text();
//                    var khoachuyen = form_chandoan.find('#ddl-xp-chandoan-khoaphongmoi').val();
//                    if (mabenh == null || mabenh == undefined || mabenh == '') {
//                        show_errmess('Bạn chưa chọn chẩn đoán');
//                        //$('#form-diagnose #ddl_chandoan_chandoan').trigger('chosen:activate');
//                    } else {
//                        if (phuongan == '2' || phuongan == '3') {
//                            if (ngaychuyen == '' || ngaychuyen == null || ngaychuyen == undefined) {
//                                show_errmess('Thông tin ' + type + ' không chính xác, kiểm tra lại thông tin.');
//                                form_chandoan.find('#txt-xp-chandoan-ngaychuyen').focus();
//                            } else if ((khoachuyen == null || khoachuyen == undefined || khoachuyen == '') && phuongan == '3') {
//                                show_errmess('Thông tin ' + type + ' không chính xác, kiểm tra lại thông tin.');
//                                form_chandoan.find('#ddl-xp-chandoan-khoaphongmoi').focus();
//                            } else {
//                                form_chandoan.submit();
//                            }
//                        } else if (phuongan == '1') {
//                            var khoachuyen = form_chandoan.find('#ddl-xp-chandoan-khoaphongmoi').val();
//                            if (khoachuyen == null || khoachuyen == undefined || khoachuyen == '') {
//                                show_errmess('Bạn chưa chọn khoa| phòng vào viện');
//                                form_chandoan.find('#ddl-xp-chandoan-khoaphongmoi').focus();
//                            } else {
//                                form_chandoan.submit();
//                            }
//                        }
//                        else {
//                            form_chandoan.submit();
//                        }
//                    }
//                }
//            }

//        } else if (status == 1) {
//            //đã thanh toán
//            show_warning('Bệnh nhân đã thanh toán, không được thêm hoặc sửa khám bệnh');
//        } else if (status == -1) {
//            show_warning('Chưa chọn bệnh nhân');
//        } else {
//            show_warning('Không rõ lỗi lầm');
//        }
//    } else {
//        show_warning('Thông tin nhập liệu chưa chính xác');
//    }


//}

//function XP_chiphi_enable_form(isThanhtoan) {

//    if (!isThanhtoan) {
//        $('#btn-xp-chiphi-thanhtoan').show();
//        $('#btn-xp-chiphi-xoathanhtoan').hide();
//    } else {
//        $('#btn-xp-chiphi-thanhtoan').hide();
//        $('#btn-xp-chiphi-xoathanhtoan').show();
//    }
//}



/////lấy danh sách chi phí bệnh nhân
//function XP_LayDanhsach_Chiphi_Benhnhan(mabn, callback) {
//    ///thiết lập layout popup chi phí


//    ////// end

//    $.ajax({
//        url: '/thanhtoan/getdichvuchitiet?mabn=' + mabn,
//        type: 'get',
//        contentType: 'json',
//        success: function (d) {
//            console.log(d);
//            callback(d);
//        },
//        error: function (err) {
//            console.log(err.statusText);
//        }
//    });
//}

//function XP_Binding_DS_chiphi(source) {
//    var table = $('#table-danh-sach-chi-phi');

//    var table_body = table.find('tbody');
//    if (table.hasClass('dataTable')) {
//        table_body.html('');
//        table_body.empty();
//        table.DataTable().destroy();
//    }
//    table_body.html('');
//    if (source != null && source != undefined) {
//        if (source.length > 0) {
//            table.data('source', source);
//            var tongtien = 0;
//            $.each(source, function (a, b) {
//                tongtien += b.ThanhTien;
//                var tr = '<tr>';
//                tr += '<td>' + (a + 1) + '</td>';
//                tr += '<td>' + (b.TenDV) + '</td>';
//                tr += '<td style="width:70px;">' + (b.DonVi) + '</td>';
//                tr += '<td class="text-right">' + ConvertToCurrency(b.DonGia) + '</td>';
//                tr += '<td style="width:70px;" class="text-right">' + ConvertToCurrency(b.SoLuong) + '</td>';
//                tr += '<td class="text-right">' + ConvertToCurrency(b.ThanhTien) + '</td>';
//                tr += '<td>' + (b.TenKP) + '</td>';
//                tr += '<td class="text-right">' + (b.Mien) + '</td>';
//                tr += '<td style="width:80px;">' + (b.TrongBH == 1 ? 'Trong DM' : b.TrongBH == 0 ? 'Ngoài DM' : 'Không TT') + '</td>';
//                tr += '</tr>';
//                table_body.append(tr);
//            });
//            table.find('tfoot').show();
//            table.find('#txt_chiphi_tongtien').text(ConvertToCurrency(tongtien));
//            //table_body.append(trSum);
//            table.DataTable({
//                searching: false,
//                lengthChange: false,
//                info: false,
//                sorting: false,
//                language: {
//                    paginate: {
//                        first: '«',
//                        previous: 'Back',
//                        next: 'Next',
//                        last: '»'
//                    }
//                }
//            });
//        } else {
//            table.find('tfoot').hide();
//            table_body.append('<tr><td colspan="9">Bệnh nhân chưa có dịch vụ</td></tr>');
//        }
//    } else {
//        table.find('tfoot').hide();
//        table_body.append('<tr><td colspan="9">Bệnh nhân chưa có dịch vụ</td></tr>');
//    }
//}

/////chức năng thanh toán clicked

//function XP_thanhtoan_submit() {
//    var benhnhan = benhnhanOBJ.data('detail');
//    if (benhnhan == null || benhnhan == undefined) {
//        //debugger
//        show_errmess('Chưa chọn bệnh nhân');
//    } else {
//        var bnkbs = benhnhan.bnkb;
//        if (bnkbs != null && bnkbs != undefined) {
//            if (bnkbs.length > 0) {
//                if (bnkbs[0].PhuongAn == 0 || bnkbs[0].PhuongAn == 2) {
//                    ///thanh toán hợp lệ
//                    var mabn = benhnhan.benhnhan.MaBNhan;
//                    var ngaytt = $('#txt-xp-chiphi-ngaytt').val();
//                    var makp = ACCOUNT.makp;//$('#ddl-xp-chiphi-khoaphong').val();
//                    var macb = ACCOUNT.macb;// $('#ddl-xp-chiphi-canbo').val();
//                    var obj = { mabn: mabn, ngaytt: ngaytt, makp: makp, macb: macb };
//                    if (makp == null || makp == undefined || makp == '') {
//                        show_errmess('Bạn chưa chọn bộ phận thanh toán');
//                        $('#ddl-xp-chiphi-khoaphong').focus();
//                    } else {
//                        if (macb == null || macb == undefined || macb == '') {
//                            show_errmess('Bạn chưa chọn cán bộ thanh toán');
//                            $('#ddl-xp-chiphi-canbo').focus();
//                        } else {
//                            $.ajax({
//                                url: '/api/thanhtoanapi/checkthanhtoan',
//                                contentType: 'application/json; charset=utf-8',
//                                type: 'get',
//                                data: obj,
//                                success: function (data) {

//                                    var rep = data;

//                                    if (rep.msg == '-1') {
//                                        show_errmess('Bệnh nhân này đã thanh toán. Không thể thanh toán lại.');

//                                    } else {
//                                        if (rep.success) {

//                                            var msg = '';
//                                            var makq = parseInt(rep.msg);
//                                            switch (makq) {
//                                                case 0: msg = 'Thanh toán thành công';
//                                                    XP_chiphi_enable_form(true);
//                                                    XP_Binding_Duyet_thanhtoan(mabn);
//                                                    XP_LayDanhsach_Chiphi_Benhnhan(mabn, XP_Binding_DS_chiphi);
//                                                    XP_Lay_TT_chitiet_benhnhan(mabn);
//                                                    setTimeout(function () {
//                                                        In_bangke_thanhtoan(mabn, 1);
//                                                    }, 1000);
//                                                    show_alert(msg);
//                                                    break;
//                                                case 1: msg = 'Không thêm được thông tin viện phí chi tiết'; show_errmess(msg); break;
//                                                case 2: msg = 'Không thêm được thông tin viện phí'; show_errmess(msg); break;
//                                                case 3: msg = 'Bệnh nhân này không có dịch vụ nào được tìm thấy'; show_errmess(msg); break;
//                                                case 4: msg = 'Bệnh nhân này đã thanh toán. Không thể thanh toán tiếp.'; show_errmess(msg); break;
//                                                default: msg = 'Chưa rõ nguyên nhân lỗi.'; show_errmess(msg); break;
//                                            }


//                                        } else {
//                                            if (rep.msg == '1') {
//                                                if (confirm('Bệnh nhân chưa có tiền ngày giường. Bạn vẫn muốn thanh toán?')) {
//                                                    XP_thanhtoan(obj);
//                                                }

//                                            } else if (rep.msg == '2') {
//                                                show_errmess('Bệnh nhân chưa làm thủ tục ra viện. Không thể thanh toán .');

//                                            } else if (rep.msg == '3') {
//                                                show_errmess('Bệnh nhân chưa có tiền công khám. Không được thanh toán?')
//                                                //if (show_errmess('Bệnh nhân chưa có tiền công khám. Không được thanh toán?')) {
//                                                //    //XP_thanhtoan(obj);
//                                                //}

//                                            } else if (rep.msg == '4') {
//                                                var text = '';
//                                                $.each(rep.data, function (a, b) {
//                                                    text += (a + 1) + '. ' + b.TenDV + '\n';
//                                                });

//                                                if (confirm('Bệnh nhân này có chỉ định cận lâm sàng chưa thực hiện:\r\n' + text + 'Bạn vẫn muốn thanh toán?')) {
//                                                    XP_thanhtoan(obj);
//                                                }
//                                            } else if (rep.msg == '5') {
//                                                show_errmess('Không thêm được thông tin ra viện');
//                                            } else if (rep.msg == '6') {
//                                                show_errmess('Bệnh nhân không có khám bệnh');
//                                            }
//                                            else if (rep.msg == '7') {
//                                                show_errmess('Thông tin cán bộ không hợp lệ');
//                                            } else if (rep.msg == '-5') {
//                                                show_errmess('Ngày thanh toán phải lớn hơn ngày khám chữa bệnh.');
//                                            }
//                                        }
//                                    }
//                                },
//                                error: function (a) {
//                                    console.log('Lỗi: ' + a.statusText);
//                                }
//                            });
//                        }
//                    }
//                } else {
//                    show_warning('Bệnh nhân chưa có khám bệnh ra viện, không được thanh toán.');
//                }
//            } else {
//                show_warning('Bệnh nhân chưa có khám bệnh, không được thanh toán.');
//            }
//        } else {
//            show_warning('Bệnh nhân chưa có khám bệnh, không được thanh toán.');
//        }



//    }
//}


///////hàm thanh toán
//function XP_thanhtoan(data1) {
//    $.ajax({
//        type: 'POST',
//        url: '/thanhtoan/addvienphi',
//        contentType: 'application/json; charset=utf-8',
//        dataType: 'json',
//        data: JSON.stringify(data1),
//        success: function (data) {
//            var popup = $('#popupAlert');
//            var msg = '';
//            if (data.success) {
//                msg = 'Thanh toán thành công';
//                XP_chiphi_enable_form(true);
//                XP_Binding_Duyet_thanhtoan(data1.mabn);
//                //loadVienPhiChitiet(data1.mabn);
//                XP_LayDanhsach_Chiphi_Benhnhan(data1.mabn, XP_Binding_DS_chiphi);
//                //loadDuyetThanhToan(data1.mabn);
//                //getTrangthaiBenhNhan(data1.mabn);
//                XP_Lay_TT_chitiet_benhnhan(data1.mabn);
//                setTimeout(function () {

//                    In_bangke_thanhtoan(data1.mabn, 1);
//                }, 1500);
//                show_alert(msg);
//            } else {
//                switch (data.makq) {
//                    case 1: msg = 'Không thêm được thông tin viện phí chi tiết'; break;
//                    case 2: msg = 'Không thêm được thông tin viện phí'; break;
//                    case 3: msg = 'Bệnh nhân này không có dịch vụ nào được tìm thấy'; break;
//                    case 4: msg = 'Bệnh nhân này đã thanh toán. Không thể thanh toán tiếp.'; break;
//                    case 5: msg = 'Bệnh nhân này chưa làm thủ tục ra viện. Không thể thanh toán.'; break;
//                    case '-5': msg = 'Ngày thanh toán phải lơn hơn ngày khám chữa bệnh'; break;
//                    default: msg = 'Chưa rõ nguyên nhân lỗi.'; break;
//                }
//                show_errmess(msg);
//            }

//            //popup.find('.content-modal').empty().text(msg);
//            //popup.modal('show').one('click', '.alert-ok', function () {
//            //    popup.find('.close').trigger('click');
//            //});
//        },
//        error: function (request, status, error) {

//            console.log(error);
//        }
//    });
//}

/////hàm hủy thanh toán

//function XP_Huythanhtoan() {
//    var benhnhan = benhnhanOBJ.data('detail');
//    if (benhnhan != null && benhnhan != undefined) {

//        if (confirm('Bạn có muốn xóa viện phí của bệnh nhân này không?')) {
//            var mabn = benhnhan.benhnhan.MaBNhan;

//            $.ajax({
//                type: 'POST',
//                url: '/thanhtoan/deletevienphi?mabn=' + mabn,
//                contentType: 'application/json; charset=utf-8',
//                dataType: 'json',
//                success: function (data) {
//                    var msg = '';

//                    if (data.makq == -1) {
//                        show_errmess('Viện phí của bệnh nhân này đã được duyệt, không thể xóa viện phí.');
//                    } else if (data.makq == -2) {

//                        show_errmess('Bệnh nhân chưa thanh toán, không được xóa');

//                    }
//                    else {

//                        if (data.success) {
//                            msg = 'Xóa thành công viện phí.';
//                            XP_chiphi_enable_form(false);
//                            //loadVienPhiChitiet(mabn);
//                            XP_Binding_Duyet_thanhtoan(mabn);
//                            XP_LayDanhsach_Chiphi_Benhnhan(mabn, XP_Binding_DS_chiphi);
//                            //getTrangthaiBenhNhan(mabn);
//                            XP_Load_TT_Khambenh_Benhnhan(mabn);
//                            $('#btn-thanhtoan-submit').show().removeAttr('disabled');
//                            $('#btn-thanhtoan-delete').hide();//.attr({ disabled: 'disabled' });
//                            show_alert(msg);
//                        } else {
//                            switch (data.makq) {
//                                case 1: msg = 'Không xóa được thông tin viện phí'; break;
//                                case 2: msg = 'Không xóa được viện phí chi tiết'; break;
//                                case 3: msg = 'Bệnh nhân này chưa thanh toán. Không thể xóa.'; break;
//                                case 4: msg = 'Bệnh nhân này đã được xuất dược, không thể xóa thanh toán'; break;
//                                default: msg = 'Không xóa được thông tin viện phí. Thử lại sau.'; break;

//                            }
//                            show_errmess(msg);
//                        }

//                    }

//                },
//                error: function (err) {
//                    console.log(err.statusText);
//                }
//            });
//        }
//    } else {
//        //debugger
//        show_errmess('Chưa chọn bệnh nhân');
//    }
//}


/////hàm hủy đơn thuốc
//function XP_Xoa_Donthuoc() {
//    var iddon = $('#form-xp-don-thuoc #IDDon').val();
//    var donthuoc = $('#form-xp-don-thuoc').data('source');
//    if (iddon == null || iddon == undefined || iddon == '') {
//        show_errmess('Không rõ đơn thuốc');
//    } else {
//        var status = XP_GetTrangthaiBenhnhan();
//        if (status == 0) {
//            if (donthuoc.StatusInt == 0 && donthuoc.SoPL <= 0) {
//                $.ajax({
//                    url: '/dieutri/deletekedon/' + iddon,
//                    contentType: 'application/json',
//                    type: 'POST',
//                    success: function (response) {
//                        var data = JSON.parse(response);
//                        if (data.success) {
//                            show_alert(data.msg);
//                            XP_Reset_form_Khambenh($('#form-xp-don-thuoc'), true);
//                            $('#form-xp-don-thuoc').data('source', null);
//                            XP_Binding_DS_DonThuoc([]);

//                        } else {
//                            show_errmess(data.msg);
//                        }
//                    },
//                    error: function (request, status, error) {
//                        console.log(error);
//                    }
//                });
//            } else {
//                show_errmess('Đơn thuốc đã được xuất, không thể xóa đơn thuốc');
//            }
//        } else if (status == 1) {
//            show_errmess('Bệnh nhân đã thanh toán, không được xóa đơn thuốc');
//        } else if (status == 2) {
//            show_errmess('Bệnh nhân đã ra viện, không được xóa đơn thuốc');
//        } else if (status == -1) {
//            //debugger
//            show_errmess('Chưa chọn bệnh nhân');
//        } else {
//            console.log('Chưa rõ nguyên nhân');
//        }
//    }



//}

/////hàm in bảng kê thanh toán
//function XP_BangkeThanhtoan_Changed() {
//    var value = $('#form-chiphi-thanhtoan #ddl-xp-chiphi-bangke').val();
//    var mabn = $('#lbl-xp-mabnhan').text();
//    if (mabn == null || mabn == undefined || mabn == '') {
//        show_errmess('Bạn chưa chọn bệnh nhân');
//    } else {
//        var status = XP_GetTrangthaiBenhnhan();
//        if (status == 1) {
//            if (value == '0') {
//                var window_bangke = window.open('/bao-cao/bang-ke-thanh-toan?mabn=' + mabn + '&maubieu=5', '_blank');
//            } else if (value == '1') {
//                var window_bangke = window.open('/bao-cao/bang-ke-thanh-toan?mabn=' + mabn + '&maubieu=4', '_blank');
//            } else {

//            }
//            $('#form-chiphi-thanhtoan #ddl-xp-chiphi-bangke').val('');
//        } else {
//            show_errmess('Bệnh nhân "' + $('#lbl-xp-tenbnhan').text() + '" chưa thanh toán.');
//        }


//    }

//}

/////hàm in đơn thuốc

//function XP_In_donthuoc() {
//    var donthuoc = $('#form-xp-don-thuoc').data('source');

//    if (donthuoc != null && donthuoc != undefined) {
//        if (donthuoc.IDDon > 0) {
//            var windowdonthuoc = window.open('/bao-cao/bieu-mau-don-thuoc?iddon=' + donthuoc.IDDon + '&mabn=' + donthuoc.MaBNhan, '_blank');
//        } else {
//            show_errmess('Bạn chưa chọn đơn thuốc');
//        }
//    } else {
//        show_errmess('Bạn chưa chọn đơn thuốc');
//    }


//}

///// hàm in phiếu khám chữa bệnh

//function XP_In_Phieu_KCB() {

//}

//////hàm kiểm tra lượng tồn

//function XP_Get_Luong_ton(madv, makho, dongia, soluongke, callback, control) {
//    var lbl_soluongton = $('#lbl-so-luong-ton');
//    if (madv != null && madv != undefined && madv != '') {

//        $.ajax({
//            url: '/api/nhapduocapi/getsoluongton?madv=' + madv + '&makho=' + makho + '&dongia=' + dongia + '&soluongke=0',
//            type: 'get',
//            success: function (response) {
//                if (response.status) {
//                    var soluongton = XP_CheckTon_kedon(response.slTon, soluongke, madv, dongia);
//                    lbl_soluongton.text(soluongton);
//                    lbl_soluongton.data('value', response.slTon);
//                } else {
//                    lbl_soluongton.text(0);
//                    lbl_soluongton.data('value', 0);
//                }
//                if (callback != null && callback != undefined) {

//                    callback(control);
//                }
//            }
//        });
//    }
//}




/////////////////////////////////duyệt thanh toán

//function XP_Binding_Duyet_thanhtoan(mabn) {
//    //var benhnhan = benhnhanOBJ.data('detail');
//    var benhnhan = {
//        vienphi: {}
//    }
//    if (benhnhan != null && benhnhan != undefined) {
//        if (benhnhan.vienphi != null && benhnhan.vienphi != undefined) {

//            if (mabn != null && mabn != undefined) {
//                $.ajax({
//                    url: '/api/thanhtoanapi/check?id=' + mabn,
//                    type: 'get',
//                    contentType: 'json',
//                    success: function (d) {
//                        if (d.success) {
//                            console.log(d);
//                            XP_Binding_Chitiet_Duyetthanhtoan(d.data);


//                        } else {
//                            XP_Binding_Chitiet_Duyetthanhtoan(null);
//                        }
//                    },

//                    error: function (err) {
//                        console.log(err.statusText);
//                    }
//                });
//            }
//        } else {
//            XP_Layso_Hoadon(mabn);
//            show_warning('Bệnh nhân chưa thanh toán, không thể duyệt thanh toán');
//        }
//    }
//}

//function XP_Binding_Chitiet_Duyetthanhtoan(data) {
//    debugger
//    if (data != null && data != undefined) {
//        XP_Reset_Button_Duyetthanhtoan(data.isduyet);
//        var form_duyetthanhtoan = $('#form-xp-duyetthanhtoan');
//        var table_xp_duyet = $('#tbl-xp-duyet-chiphi');
//        form_duyetthanhtoan.data('data', data);
//        if (data.isduyet) {
//            ///đã duyệt
//            form_duyetthanhtoan.find('#txt-id').val(data.duyetobj.IDTamUng);
//            form_duyetthanhtoan.find('#txt-ngay-thuchi').val(data.duyetobj.NgayThu);
//            form_duyetthanhtoan.find('#txt-quyen').val(data.duyetobj.QuyenHD);
//            form_duyetthanhtoan.find('#txt-so-hd').val(data.duyetobj.SoHD);
//            form_duyetthanhtoan.find('#ddl-bo-phan').val(data.duyetobj.MaKP);
//            form_duyetthanhtoan.find('#ddl-can-bo').val(data.duyetobj.MaCB);
//            form_duyetthanhtoan.find('#txt-noi-dung').val(data.duyetobj.LyDo);
//            form_duyetthanhtoan.find('#txt-so-tien-cl').val(ConvertToCurrency(data.duyetobj.TienChenh));
//            form_duyetthanhtoan.find('#txt-so-tien-cl-chu').val(DocTienBangChu(data.duyetobj.TienChenh));
//            form_duyetthanhtoan.find('#txt-so-tien').val(ConvertToCurrency(data.duyetobj.SoTien));
//            form_duyetthanhtoan.find('#txt-so-to').val(data.duyetobj.SoTo);
//            form_duyetthanhtoan.find('#txt-ket-luan').val((data.duyetobj.KetLuan == null || data.duyetobj.KetLuan == undefined || data.duyetobj.KetLuan == '') ? "" : data.duyetobj.KetLuan);
//            form_duyetthanhtoan.find('#txt-so-tien-chu').val(DocTienBangChu(data.duyetobj.SoTien));
//            if (data.isthuchi) {
//                ///thu tiền
//                form_duyetthanhtoan.find('[name=thuChi][value=1]').trigger('click');

//            } else {
//                ///trả lại tiền
//                form_duyetthanhtoan.find('[name=thuChi][value=0]').trigger('click');

//            }
//            Bing_chiphichitiet_benhnhan(data);

//        } else {
//            ////chưa chuyệt
//            var mabn = $('#lbl-xp-mabnhan').text();

//            Bing_chiphichitiet_benhnhan(data);
//            XP_Layso_Hoadon(mabn);
//            XP_Reset_form_Khambenh(form_duyetthanhtoan, true);
//            if (data.isthuchi) {
//                ///thu tiền
//                form_duyetthanhtoan.find('[name=thuChi][value=1]').trigger('click');

//            } else {
//                ///trả lại tiền
//                form_duyetthanhtoan.find('[name=thuChi][value=0]').trigger('click');

//            }

//        }



//    } else {
//        //null
//        XP_Reset_Button_Duyetthanhtoan(false);
//        XP_Reset_form_Khambenh($('#form-xp-duyetthanhtoan'), true);
//        var table_xp_duyet = $('#tbl-xp-duyet-chiphi');
//        table_xp_duyet.find("input[id$=-n]").val(0);
//        table_xp_duyet.find("input[id$=-t]").val(DocTienBangChu(0));

//    }
//}

//function Bing_chiphichitiet_benhnhan(obj) {
//    var table_xp_duyet = $('#tbl-xp-duyet-chiphi');
//    if (obj == null || obj == undefined || obj == '') {
//        table_xp_duyet.find("input[id$=-n]").val(0);
//        table_xp_duyet.find("input[id$=-t]").val(DocTienBangChu(0));
//    } else {
//        table_xp_duyet.find('#txt-cp-dieutri-n').val(ConvertToCurrency(obj.cpdieutri));
//        table_xp_duyet.find('#txt-cp-dieutri-t').val(DocTienBangChu(obj.cpdieutri));
//        table_xp_duyet.find('#txt-cp-thanhtoan-n').val(ConvertToCurrency(obj.cpthanhtoan));
//        table_xp_duyet.find('#txt-cp-thanhtoan-t').val(DocTienBangChu(obj.cpthanhtoan));
//        table_xp_duyet.find('#txt-cp-dathanhtoan-n').val(ConvertToCurrency(0));
//        table_xp_duyet.find('#txt-cp-dathanhtoan-t').val(DocTienBangChu(0));
//        table_xp_duyet.find('#txt-cp-tamthu-n').val(ConvertToCurrency(obj.cptamthu));
//        table_xp_duyet.find('#txt-cp-tamthu-t').val(DocTienBangChu(obj.cptamthu));
//        table_xp_duyet.find('#txt-cp-tralai-n').val(ConvertToCurrency(obj.cptralai));
//        table_xp_duyet.find('#txt-cp-tralai-t').val(DocTienBangChu(obj.cptralai));
//        table_xp_duyet.find('#txt-cp-thuthem-n').val(ConvertToCurrency(obj.cpthuthem));
//        table_xp_duyet.find('#txt-cp-thuthem-t').val(DocTienBangChu(obj.cpthuthem));
//    }
//}

//function XP_Duyetthanhtoan_submit() {
//    var obj = $('#form-xp-duyetthanhtoan').data('data');
//    var form_duyetthanhtoan = $('#form-xp-duyetthanhtoan');
//    var benhnhan = benhnhanOBJ.data('detail');
//    if (obj != null && obj != undefined) {
//        if (obj.isduyet) {
//            show_errmess('Bệnh nhân đã duyệt thanh toán')
//        } else {
//            if (XP_Duyetthanhtoan_validation()) {

//                var noitru = benhnhan.benhnhan.NoiTru;
//                //var thanhtoan = 
//                var ravien = benhnhan.ravien;
//                var flag = true;
//                if (noitru == '1') {
//                    if (ravien != null && ravien != undefined) {
//                        flag = true;
//                    } else {
//                        flag = false;
//                        show_errmess('Bệnh nhân chưa ra viện, không thể thanh toán');
//                    }
//                } else {
//                    flag = true;
//                }

//                if (flag) {
//                    var ngaythuchi = $('#txt-ngay-thuchi').val();
//                    var quyen = $('#txt-quyen').val();
//                    var sohd = $('#txt-dtt-sohd').val();
//                    var khoaphong = $('#ddl-bo-phan').val();
//                    var canbo = $('#ddl-can-bo').val();
//                    var phanloai = $('#form-xp-duyetthanhtoan').find("[name=thuChi][value=1]").is(':checked') ? 1 : 0;
//                    var noidung = $('#txt-noi-dung').val();
//                    var mabn = benhnhan.benhnhan.MaBNhan;
//                    var bl = confirm('Bệnh nhân có mang biên lai thu tiền???');
//                    var isbienlai = 1;
//                    if (bl) {
//                        isbienlai = 1;
//                    }
//                    else {
//                        isbienlai = 0;
//                    }
//                    var data = { ngaythuchi: ngaythuchi, quyen: quyen, sohd: sohd, phanloai: phanloai, khoaphong: khoaphong, canbo: canbo, noidung: noidung, mabn: mabn, bienlai: isbienlai, soto: -1, sotien: -1, ketluan: -1 };
//                    $.ajax({
//                        url: '/thanhtoan/addduyetthanhtoan',
//                        type: 'get',
//                        contentType: 'application/json',
//                        data: data,
//                        success: function (d) {
//                            if (d.success) {
//                                show_alert('Duyệt thanh toán thành công');
//                                XP_Lay_TT_chitiet_benhnhan(mabn);
//                                XP_LayDanhsach_Chiphi_Benhnhan(mabn);
//                                XP_Binding_Duyet_thanhtoan(mabn);
//                                XP_Reset_Button_Duyetthanhtoan(true);
//                                //BindingTamung(data.mabn);
//                                form_duyetthanhtoan.find('#txt-id').val(d.data.id);
//                                form_duyetthanhtoan.find('#txt-ngay-thuchi').val(d.data.ngaythuchi);
//                                form_duyetthanhtoan.find('#txt-quyen').val(d.data.quyen);
//                                form_duyetthanhtoan.find('#txt-so-hd').val(d.data.sohd);

//                                form_duyetthanhtoan.find('#ddl-bo-phan').val(d.data.khoaphong);
//                                form_duyetthanhtoan.find('#ddl-can-bo').val(d.data.canbo);
//                                orm_duyetthanhtoan.find('#txt-noi-dung').val(d.data.noidung);
//                                form_duyetthanhtoan.find('#txt-so-tien-cl').val(ConvertToCurrency(d.data.sotiencl));
//                                form_duyetthanhtoan.find('#txt-so-tien').val(ConvertToCurrency(d.data.sotien));
//                                form_duyetthanhtoan.find('#txt-so-to').val(d.data.soto);
//                                form_duyetthanhtoan.find('#txt-ket-luan').val(d.data.ketluan);
//                                form_duyetthanhtoan.find('#txt-so-tien-cl-chu').val(DocTienBangChu(d.data.sotiencl));
//                                form_duyetthanhtoan.find('#txt-so-tien-chu').val(DocTienBangChu(d.data.sotien));


//                                if (d.data.phanloai == 1) {
//                                    form_duyetthanhtoan.find('[name=thuChi][value=1]').trigger('click');
//                                } else {
//                                    form_duyetthanhtoan.find('[name=thuChi][value=0]').trigger('click');
//                                }
//                                $('#btn-xp-duyet-submit').hide();
//                                $('#btn-xp-huy-duyet-submit').show();
//                                //$('#modal-popup-kham-suc-khoe').modal('hide');


//                            } else {
//                                XP_Reset_Button_Duyetthanhtoan(false);
//                                if (d.msg == '1') {
//                                    show_errmess('Không duyệt được thanh toán của bệnh nhân này, thử lại sau.');
//                                } else if (d.msg == '2') {
//                                    show_errmess('Bệnh nhân này đã được duyệt');
//                                } else if (d.msg == '-1') {
//                                    show_errmess('Bệnh nhân chưa làm thủ tục thanh toán, không thể duyệt');
//                                }
//                            }
//                        },
//                        error: function (a, b, c) {
//                            alert(c);
//                        }
//                    });
//                }
//            }
//        }
//    } else {
//        show_errmess('Bệnh nhân chưa thanh toán, không thể duyệt');
//    }

//}

//function XP_Duyetthanhtoan_validation() {
//    var obj = $('#form-xp-duyetthanhtoan').data('data');
//    if (obj != null && obj != undefined) {
//        var ngaytt = moment(obj.NgayTT, "DD/MM/YYYY HH:mm:ss");
//        var ngaythu = $('#txt-ngay-thuchi').val();
//        var dtNgaythu = moment(ngaythu, "DD/MM/YYYY HH:mm:ss");
//        var quyen = $('#txt-quyen').val();
//        var sohd = $('#txt-so-hd').val();
//        var bophan = $('#ddl-bo-phan').val();
//        var canbo = $('#ddl-can-bo').val();

//        if (ngaythu == null || ngaythu == undefined || ngaythu == '') {
//            if (dtNgaythu === 'Invalid Date') {
//                $('#txt-ngay-thuchi').focus();
//                show_warning('Ngày thu không đúng định dạng'); return false;
//            }
//            if (ngaytt === 'Invalid Date') {
//                show_warning('Ngày thanh toán không chính xác'); return false;
//            }
//            var d = dtNgaythu._d.getTime() - ngaytt._d.getTime();
//            if (d < 0) {
//                show_warning('Ngày thu| chi phải lớn hơn ngày thanh toán'); return false;
//            }
//        }
//        if (quyen == null || quyen == undefined || quyen == '') {
//            $('#txt-quyen').focus();
//            show_warning('Chưa nhập quyển hóa đơn');
//            return false;
//        }
//        if (sohd == null || sohd == undefined || sohd == '') {
//            $('#txt-so-hd').focus();
//            show_warning('Chưa nhập số hóa đơn');
//            return false;
//        }
//        if (bophan == null || bophan == undefined || bophan == '') {
//            $('#ddl-bo-phan').focus();
//            show_warning('Chưa chọn khoa phòng thanh toán');
//            return false;
//        }
//        if (canbo == null || canbo == undefined || canbo == '') {
//            $('#ddl-can-bo').focus();
//            show_warning('Chưa nhập cán bộ thanh toán');
//            return false;
//        }
//        return true;
//    }
//    else {
//        return false;
//    }
//}

//function XP_Reset_Button_Duyetthanhtoan(isDuyet) {
//    if (isDuyet) {
//        $('#btn-xp-duyet-submit').hide();
//        $('#btn-xp-huy-duyet-submit').show();
//    } else {
//        $('#btn-xp-duyet-submit').show();
//        $('#btn-xp-huy-duyet-submit').hide();
//    }
//}

/////hàm xóa duyệt thanh toán
//function XP_XoaDuyet_thanhtoan() {
//    var form_duyetthanhtoan = $('#form-xp-duyetthanhtoan');
//    var duyetthanhtoan = form_duyetthanhtoan.data('data');
//    if (duyetthanhtoan == null || duyetthanhtoan == undefined) {
//        //debugger
//        show_errmess('Chưa chọn bệnh nhân');
//    } else {
//        if (duyetthanhtoan.obj != null && duyetthanhtoan.obj != undefined) {
//            if (duyetthanhtoan.isduyet) {
//                var tenbn = benhnhanOBJ.data('detail').benhnhan.TenBNhan;
//                var mabn = benhnhanOBJ.data('detail').benhnhan.MaBNhan;
//                if (confirm('Có có muốn hủy duyệt thanh toán của bệnh nhân: ' + tenbn + ' không?')) {
//                    $.ajax({

//                        url: '/thanhtoan/deleteduyetthanhtoan/' + mabn,
//                        type: 'POST',
//                        contentType: 'json',
//                        success: function (data) {
//                            if (data.success) {
//                                show_alert('Xóa thành công.');
//                                XP_Reset_form_Khambenh(form_duyetthanhtoan, true);
//                                XP_Layso_Hoadon(mabn);
//                                XP_Binding_Duyet_thanhtoan(mabn);
//                                XP_Reset_Button_Duyetthanhtoan(false);
//                            } else {
//                                if (data.msg == '1') {
//                                    show_errmess('Không xóa được duyệt thanh toán của bệnh nhân này, thử lại sau.');
//                                } else {
//                                    show_errmess('Bệnh nhân này chưa có duyệt thanh toán, không thể xóa.');
//                                }
//                            }
//                        },
//                        error: function (a, b, c) {
//                            alert(c);
//                        }
//                    });
//                }
//            } else {
//                show_errmess('Bệnh nhân chưa duyệt thanh toán, không thể xóa');
//            }
//        } else {
//            show_errmess('Bệnh nhân chưa thanh toán');
//        }
//    }
//}

/////hàm lấy thông tin quyển hóa đơn và số hóa đơn
//function XP_Layso_Hoadon(mabn) {
//    var form_1 = $('#form-xp-duyetthanhtoan');
//    if (mabn != null && mabn != undefined) {
//        $.ajax({
//            url: '/api/thanhtoanapi/getduyet?id=' + mabn,
//            type: 'get',
//            contentType: 'json',
//            success: function (d) {
//                if (d.success) {
//                    form_1.find('#txt-quyen').val(d.data.quyen);
//                    form_1.find('#txt-so-hd').val(d.data.sohd);
//                } else {
//                    form_1.find('#txt-quyen').val('');
//                    form_1.find('#txt-so-hd').val('');
//                }
//            },
//            error: function (err) {
//                console.log(err.statusText);
//            }
//        });
//    }
//}


//////enabled or disabled field by account
//function XP_Enabled_or_Disabled_Field_By_Account() {
//    if (ACCOUNT != null && ACCOUNT != undefined) {
//        /////form chẩn đoán
//        $('#form-xp-chandoan #ddl-xp-chandoan-kpdieutri').val(ACCOUNT.makp).trigger('change');
//        $('#f-search-advanced #ddl-khoa-phong').val(ACCOUNT.makp);
//        $('#form-chiphi-thanhtoan #ddl-xp-chiphi-khoaphong').val(ACCOUNT.makp);
//        $('#form-chiphi-thanhtoan #ddl-xp-chiphi-canbo').val(ACCOUNT.macb);
//        $('#form-xp-them-benhnhan #cmb_kphong').val(ACCOUNT.makp);
//        if (ACCOUNT.capdo == '9') {
//            $('#form-xp-them-benhnhan #cmb_kphong').removeAttr('disabled');
//            $('#form-xp-chandoan #ddl-xp-chandoan-kpdieutri').removeAttr('disabled');
//            $('#f-search-advanced #ddl-khoa-phong').removeAttr('disabled');
//            $('#form-chiphi-thanhtoan #ddl-xp-chiphi-khoaphong').removeAttr('disabled');
//            $('#form-chiphi-thanhtoan #ddl-xp-chiphi-canbo').removeAttr('disabled');
//        } else {
//            $('#form-chiphi-thanhtoan #ddl-xp-chiphi-canbo').attr({ 'disabled': 'disabled' });
//            $('#form-xp-them-benhnhan #cmb_kphong').attr({ 'disabled': 'disabled' });
//            $('#form-chiphi-thanhtoan #ddl-xp-chiphi-khoaphong').attr({ 'disabled': 'disabled' });
//            $('#f-search-advanced #ddl-khoa-phong').attr({ 'disabled': 'disabled' });
//            $('#form-xp-chandoan #ddl-xp-chandoan-kpdieutri').attr({ 'disabled': 'disabled' });
//        }
//    }
//}

//function XP_ThemBenhnhan_makp_changed(element) {
//    $('#form-xp-them-benhnhan #txt-makp-hidden').val($(element).val());
//}

//function XP_Check_Chuyenvien_Da(phuongan) {
//    var mabn = $('#lbl-xp-mabnhan').text();
//    if (phuongan == '2') {
//        //

//        $('#link-chuyenvien-info').show();
//        $('#link-chuyenvien-info a').attr({ 'href': '/chuyenvien/Index/' + mabn, 'target': '_blank' });
//    } else {
//        $('#link-chuyenvien-info').hide();
//    }
//}

//function XP_Button_Ravien_Clicked(mabn) {
//    XP_windowravien = window.open('/chuyenvien/Index/' + mabn, '_blank');
//}

//function XP_Reload_Chuyenvien(mabn) {

//    $.ajax({
//        url: '/api/dieutriapi/reload-ravien?mabn=' + mabn,
//        type: 'GET',
//        contentType: 'json',
//        success: function (d) {
//            Chuyenvien_Callback(null, mabn);
//        },
//        error: function (err) {

//        }
//    });

//}

//////hàm reload khám bệnh, thông tin bệnh nhân
//function Chuyenvien_Callback(isRavien, mabn) {
//    XP_Load_TT_Khambenh_Benhnhan(mabn);
//}