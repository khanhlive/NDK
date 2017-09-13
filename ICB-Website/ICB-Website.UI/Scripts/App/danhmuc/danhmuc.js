/// <reference path="../../_references.js" />
///danh mục nghề nghiệp
var DANHMUC_Tables = {
    main: null,
    extra1: null,
    extra2: null,
    extra3: null
};
$('section[class=content][data-form=NGHENGHIEP]').ready(function () {
    var form_capnhat_nghenghiep = $('#form-capnhat-nghenghiep');
    var form_themmoi_nghenghiep = $('#form-themmoi-nghenghiep');
    var modal_add = form_themmoi_nghenghiep.closest('.modal');
    var modal_edit = form_capnhat_nghenghiep.closest('.modal');
    var table_Nghenghiep = $('#table-danhmuc-nghenghiep');
    modal_add.on({
        'show.bs.modal': function (e) {
            
            setTimeout(function () {
                form_themmoi_nghenghiep.find('input:not(:hidden)').val('');
                form_themmoi_nghenghiep.find('#MaNN').focus();
            }, 200);
            form_themmoi_nghenghiep.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });
    modal_edit.on({
        'show.bs.modal': function (e) {
            
            
            setTimeout(function () {
                //form_capnhat_nghenghiep.find('input:not([name=__RequestVerificationToken])').val('');
                form_capnhat_nghenghiep.find('#MaNN:not(:hidden)').focus();
            }, 200);
            form_capnhat_nghenghiep.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });
    $('#MaNN').keyup(function (e) {
        var validate = $(this).closest('div').find('span[data-valmsg-for]');
        validate.removeClass('field-validation-valid');
        validate.addClass('field-validation-error');
        validate.html('<span id="MaNN-error" class="text-danger">Mã NN đã tồn tại</span>')
    });

    form_themmoi_nghenghiep.find('#btn-ok').click(function (e) {
        if (form_themmoi_nghenghiep.valid()) {
            var mann = form_themmoi_nghenghiep.find('#MaNN').val();
            var tennn = form_themmoi_nghenghiep.find('#TenNN').val();
            var tenct = form_themmoi_nghenghiep.find('#TenCT').val();
            var request = form_themmoi_nghenghiep.find('[name=__RequestVerificationToken]').val();
            Call_Ajax('/nghenghiep/create', "application/json", "POST", JSON.stringify({ MaNN: mann, TenNN: tennn, TenCT: tenct  }), function (d) {
                if (d.success) {
                    show_alert("Nghề nghiệp: \"" + tennn + "\" đã được thêm thành công.");
                    var length = $('#table-danhmuc-nghenghiep').DataTable().data().length + 1;
                    modal_add.modal('hide');
                    $('#table-danhmuc-nghenghiep').DataTable().row.add([length, d.data.MaNN, d.data.TenNN, d.data.TenCT,
                        '<span><a href="javascript:;" onclick="DM_NGHENGHIEP_Edit(this);" data-target="#modal-danhmuc-nghenghiep-edit" data-toggle="modal" data-id="' + d.data.MaNN + '" title="Sửa" class="btn-sm btn-info"><i class="fa fa-edit"></i></a></span><span><a href="javascript:DanhMuc_NgheNghiep_delete(\'' + d.data.MaNN + '\');" title="Xóa" class="btn-sm btn-danger"><i class="fa fa-trash"></i></a></span>'

                    ]).draw(false);
                    setTimeout(function () {
                        var tr = $('#table-danhmuc-nghenghiep').DataTable().row(length - 1).nodes().to$();
                        tr.find('td:last-child').addClass("text-center").addClass("function").css({ width: '100px' });
                        tr.attr({ 'id': d.data.MaNN });
                        tr.attr({ 'data-id': d.data.MaNN });
                        tr.attr({ 'data-name': d.data.TenNN });
                    }, 0);
                } else {
                    switch (d.maKQ) {
                        case -1: show_errmess("Thông tin nhập vào không chính xác");
                            break;
                        case 3: show_errmess("Mã NN: \"" + mann + "\" đã tồn tại, thử với mã khác");
                            break;
                        case 2: show_errmess("Không thêm được thông tin, thử lại sau");
                            break;
                        default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                    }
                }

            }, { __RequestVerificationToken: request });
            
        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });

    form_capnhat_nghenghiep.find('#btn-update-ok').click(function (e) {
        if (form_capnhat_nghenghiep.valid()) {
            var mann = form_capnhat_nghenghiep.find('#MaNN:hidden').val();
            var tennn = form_capnhat_nghenghiep.find('#TenNN').val();
            var tenct = form_capnhat_nghenghiep.find('#TenCT').val();
            var request = form_capnhat_nghenghiep.find('[name=__RequestVerificationToken]').val();
            if (mann) {
                Call_Ajax('/nghenghiep/edit', "application/json", "POST", JSON.stringify({ MaNN: mann, TenNN: tennn, TenCT: tenct }), function (d) {
                    if (d.success) {
                        show_alert("Nghề nghiệp: \"" + tennn + "\" đã được cập nhật thành công.");
                        
                        modal_edit.modal('hide');
                        //DANHMUC_Tables.main.row.add([length, d.data.MaNN, d.data.TenNN, d.data.TenCT,
                        //    '<span><a href="javascript:;" onclick="DM_NGHENGHIEP_Edit(this);" data-target="#modal-danhmuc-nghenghiep-edit" data-toggle="modal" data-id="' + d.data.MaNN + '" title="Sửa" class="btn-sm btn-info"><i class="fa fa-edit"></i></a></span><span><a href="javascript:DanhMuc_NgheNghiep_delete(\'' + d.data.MaNN + '\');" title="Xóa" class="btn-sm btn-danger"><i class="fa fa-trash"></i></a></span>'

                        //]).draw(false);
                        var rowIndex = DANHMUC_Tables.main.row('#' + mann + '').index();
                        
                        table_Nghenghiep.dataTable().fnUpdate(d.data.MaNN, rowIndex, 1);
                        table_Nghenghiep.dataTable().fnUpdate(d.data.TenNN, rowIndex, 2);
                        table_Nghenghiep.dataTable().fnUpdate(d.data.TenCT, rowIndex, 3);
                        //setTimeout(function () {
                        //    var tr = DANHMUC_Tables.main.row(length - 1).nodes().to$();
                        //    tr.find('td:last-child').addClass("text-center").addClass("function").css({ width: '100px' });

                        //    tr.attr({ 'data-id': d.data.MaNN });
                        //    tr.attr({ 'data-name': d.data.TenNN });
                        //}, 0);
                    } else {
                        switch (d.maKQ) {
                            case -1: show_errmess("Thông tin nhập vào không chính xác");
                                break;
                            case ResponseStatus.NotExist: show_errmess("Mã NN: \"" + mann + "\" không tồn tại, kiểm tra lại thông tin");
                                break;
                            case 2: show_errmess("Không thêm được thông tin, thử lại sau");
                                break;
                            default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                        }
                    }

                }, { __RequestVerificationToken: request });
            }
        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });
    
});

function DM_NGHENGHIEP_Edit(ele) {
    var id = $(ele).data('id');
    if (id) {
        Call_Ajax('/nghenghiep/get-nghe-nghiep/' + id, "application/json", "GET", null, function (d) {
            setTimeout(function (e) {
                if (d) {
                    $('#form-capnhat-nghenghiep').find('#MaNN').val(d.MaNN);
                    $('#form-capnhat-nghenghiep').find('#TenNN').val(d.TenNN);
                    $('#form-capnhat-nghenghiep').find('#TenCT').val(d.TenCT);
                } else {
                    $('#form-capnhat-nghenghiep').find('#MaNN').val('');
                    $('#form-capnhat-nghenghiep').find('#TenNN').val('');
                    $('#form-capnhat-nghenghiep').find('#TenCT').val('');
                    show_warning('Thông tin nghề nghiệp không được tải về');
                }
            },200)
        }, null);
    }
}

function DanhMuc_NgheNghiep_delete(id) {


    var table = $('#table-danhmuc-nghenghiep');
    var tr1 = table.find('tr[data-id=' + id+']');

    var name = tr1.data('name');
    ShowPopupDelete('Xóa nghề nghiệp', 'Bạn có muốn xóa nghề nghiệp: ' + name + ' không?', function () {

        $.ajax({
            url: '/nghenghiep/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Xóa thành công nghề nghiệp: ' + name);
                    table.DataTable().row(tr1).remove().draw();
                    var ds = DANHMUC_Tables.main;
                    debugger;
                } else {
                    if (d.maKQ == ResponseStatus.NotExist) {
                        show_errmess('Không có nghề nghiệp nào có mã là: ' + id);
                    } else if (d.maKQ == ResponseStatus.NotSaved) {
                        show_errmess('Không xóa được nghề nghiệp: ' + name);
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


///danh mục khoa phòng

$('section[class=content][data-form=KHOAPHONG]').ready(function () {

    
});


function DanhMuc_KhoaPhong_delete(id) {


    var table = $('#table-danhmuc-khoaphong');
    var tr1 = table.find('tr[data-id=' + id + ']');

    var name = tr1.data('name');
    ShowPopupDelete('Xóa khoa|phòng', 'Bạn có muốn xóa khoa|phòng: ' + name + ' không?', function () {

        $.ajax({
            url: '/khoaphong/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Khoa|phòng: "' + name+'" đã được xóa.');
                    table.DataTable().row(tr1).remove().draw();
                    var ds = DANHMUC_Tables.main;
                    debugger;
                } else {
                    if (d.maKQ == ResponseStatus.NotExist) {
                        show_errmess('Không có khoa|phòng nào có mã là: ' + id);
                    } else if (d.maKQ == ResponseStatus.NotSaved) {
                        show_errmess('Không xóa được khoa|phòng: ' + name);
                    } else if (d.maKQ == ResponseStatus.Used) {
                        show_errmess('Khoa| phòng: ' + name+' đã được sử dụng, không được xóa');
                    }  else {
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


///////danh sách dân tộc

$('section[class=content][data-form=DANTOC]').ready(function () {
    var form_capnhat_dantoc = $('#form-capnhat-dantoc');
    var form_themmoi_dantoc = $('#form-themmoi-dantoc');
    var modal_add = form_themmoi_dantoc.closest('.modal');
    var modal_edit = form_capnhat_dantoc.closest('.modal');
    var table_Dantoc = $('#table-danhmuc-dantoc');
    modal_add.on({
        'show.bs.modal': function (e) {

            setTimeout(function () {
                form_themmoi_dantoc.find('input:not(:hidden)').val('');
                form_themmoi_dantoc.find('#MaNN').focus();
            }, 200);
            form_themmoi_dantoc.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });

    form_themmoi_dantoc.find('#btn-ok').click(function (e) {
        if (form_themmoi_dantoc.valid()) {
            var MaDT = form_themmoi_dantoc.find('#MaDT').val();
            var TenDT = form_themmoi_dantoc.find('#TenDT').val();
            var Status = form_themmoi_dantoc.find('#Status').is(':checked');
            var request = form_themmoi_dantoc.find('[name=__RequestVerificationToken]').val();
            Call_Ajax('/dantoc/create', "application/json", "POST", JSON.stringify({ MaDT: MaDT, TenDT: TenDT, Status: Status }), function (d) {
                if (d.success) {
                    show_alert("Dân tộc: \"" + TenDT + "\" đã được thêm thành công.");
                    var length = $('#table-danhmuc-dantoc').DataTable().data().length + 1;
                    modal_add.modal('hide');
                    $('#table-danhmuc-dantoc').DataTable().row.add([length, d.data.MaDT, d.data.TenDT, '<input type="checkbox" class="minimal" ' + (d.data.Status == 1 ?'checked="checked"':'') + ' name="hoatDong">',
                        '<span><a href="javascript:;" onclick="DM_DANTOC_Edit(this);" data-target="#modal-danhmuc-dantoc-edit" data-toggle="modal" data-id="' + d.data.MaDT + '" title="Sửa" class="btn-sm btn-info"><i class="fa fa-edit"></i></a></span><span><a href="javascript:DanhMuc_Dantoc_delete(\'' + d.data.MaDT + '\');" title="Xóa" class="btn-sm btn-danger"><i class="fa fa-trash"></i></a></span>'

                    ]).draw(false);
                    setTimeout(function () {
                        var tr = $('#table-danhmuc-dantoc').DataTable().row(length - 1).nodes().to$();
                        tr.find('td:last-child').addClass("text-center").addClass("function").css({ width: '100px' });
                        tr.attr({ 'id': d.data.MaDT });
                        tr.attr({ 'data-id': d.data.MaDT });
                        tr.attr({ 'data-name': d.data.TenDT });
                        tr.find('input[type="checkbox"].minimal').closest('td').addClass('text-center');
                        tr.find('input[type="checkbox"].minimal').iCheck({
                            checkboxClass: 'icheckbox_minimal-blue',
                            radioClass: 'iradio_minimal-blue'
                        });
                    }, 0);
                } else {
                    switch (d.maKQ) {
                        case -1: show_errmess("Thông tin nhập vào không chính xác");
                            break;
                        case 3: show_errmess("Mã dân tộc: \"" + mann + "\" đã tồn tại, thử với mã khác");
                            break;
                        case 2: show_errmess("Không thêm được thông tin, thử lại sau");
                            break;
                        default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                    }
                }

            }, { __RequestVerificationToken: request });

        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });

    modal_edit.on({
        'show.bs.modal': function (e) {


            setTimeout(function () {
                //form_capnhat_dantoc.find('input:not([name=__RequestVerificationToken])').val('');
                form_capnhat_dantoc.find('#MaDT:not(:hidden)').focus();
            }, 200);
            form_capnhat_dantoc.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });



    form_capnhat_dantoc.find('#btn-update-ok').click(function (e) {
        if (form_capnhat_dantoc.valid()) {
            var MaDT = form_capnhat_dantoc.find('#MaDT:hidden').val();
            var TenDT = form_capnhat_dantoc.find('#TenDT').val();
            var Status = form_capnhat_dantoc.find('#Status').is(':checked');
            var request = form_capnhat_dantoc.find('[name=__RequestVerificationToken]').val();
            if (MaDT) {
                Call_Ajax('/dantoc/edit/' + MaDT, "application/json", "PUT", JSON.stringify({ MaDT: MaDT, TenDT: TenDT, Status: Status }), function (d) {
                    if (d.success) {
                        show_alert("Dân tộc: \"" + TenDT + "\" đã được cập nhật thành công.");

                        modal_edit.modal('hide');
                        
                        var rowIndex = DANHMUC_Tables.main.row('#' + MaDT + '').index();

                        table_Dantoc.dataTable().fnUpdate(d.data.MaDT, rowIndex, 1);
                        table_Dantoc.dataTable().fnUpdate(d.data.TenDT, rowIndex, 2);
                        if (d.data.Status == 1) {

                            DANHMUC_Tables.main.row('#' + MaDT + '').nodes().to$().find('input:checkbox').iCheck('check');
                        } else {
                            DANHMUC_Tables.main.row('#' + MaDT + '').nodes().to$().find('input:checkbox').iCheck('uncheck');
                        }
                    } else {
                        switch (d.maKQ) {
                            case -1: show_errmess("Thông tin nhập vào không chính xác");
                                break;
                            case ResponseStatus.NotExist: show_errmess("Mã dân tộc: \"" + MaDT + "\" không tồn tại, kiểm tra lại thông tin");
                                break;
                            case 2: show_errmess("Không cập nhật được thông tin, thử lại sau");
                                break;
                            default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                        }
                    }

                }, { __RequestVerificationToken: request });
            }
        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });

});

function DM_DANTOC_Edit(ele) {
    var id = $(ele).data('id');
    if (id) {
        Call_Ajax('/dantoc/get-dan-toc/' + id, "application/json", "GET", null, function (d) {
            setTimeout(function (e) {
                if (d) {
                    $('#form-capnhat-dantoc').find('#MaDT').val(d.MaDT);
                    $('#form-capnhat-dantoc').find('#TenDT').val(d.TenDT);
                    //$('#form-capnhat-dantoc').find('#Status').click();
                    if (d.Status == 1) {
                        if (!$('#form-capnhat-dantoc').find('#Status').is(':checked')) {
                            $('#form-capnhat-dantoc').find('#Status').iCheck('check');
                        }
                    } else {
                        if ($('#form-capnhat-dantoc').find('#Status').is(':checked')) {
                            $('#form-capnhat-dantoc').find('#Status').iCheck('uncheck');
                        }
                    }
                } else {
                    $('#form-capnhat-dantoc').find('#MaDT').val('');
                    $('#form-capnhat-dantoc').find('#TenDT').val('');
                    //$('#form-capnhat-dantoc').find('#Status').val('');
                    show_warning('Thông tin dân tộc không được tải về');
                }
            }, 200)
        }, null);
    }
}

function DanhMuc_Dantoc_delete(id) {


    var table = $('#table-danhmuc-dantoc');
    var tr1 = table.find('tr[data-id=' + id + ']');

    var name = tr1.data('name');
    ShowPopupDelete('Xóa dân tộc', 'Bạn có muốn xóa dân tộc: ' + name + ' không?', function () {

        $.ajax({
            url: '/dantoc/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Dân tộc: "' + name + '" đã được xóa.');
                    table.DataTable().row(tr1).remove().draw();
                    var ds = DANHMUC_Tables.main;
                    
                } else {
                    if (d.maKQ == ResponseStatus.NotExist) {
                        show_errmess('Không có dân tộc nào có mã là: ' + id);
                    } else if (d.maKQ == ResponseStatus.NotSaved) {
                        show_errmess('Không xóa được dân tộc: ' + name);
                    } else if (d.maKQ == ResponseStatus.Used) {
                        show_errmess('Dân tộc: ' + name + ' đã được sử dụng, không được xóa');
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



///////danh mục đối tượng bệnh nhân

$('section[class=content][data-form=DANTOC]').ready(function () {

    var form_capnhat_dtbn = $('#form-capnhat-dtbn');
    var form_themmoi_dtbn = $('#form-themmoi-dtbn');
    var modal_add = form_themmoi_dtbn.closest('.modal');
    var modal_edit = form_capnhat_dtbn.closest('.modal');
    var table_DTBN = $('#table-danhmuc-dtbn');

    modal_add.on({
        'show.bs.modal': function (e) {

            setTimeout(function () {
                form_themmoi_dtbn.find('input:not(:hidden)').val('');
                form_themmoi_dtbn.find('#IDDTBN').focus();
            }, 200);
            form_themmoi_dtbn.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });

    form_themmoi_dtbn.find('#btn-ok').click(function (e) {
        if (form_themmoi_dtbn.valid()) {
            var IDDTBN = form_themmoi_dtbn.find('#IDDTBN').val();
            var DTBN1 = form_themmoi_dtbn.find('#DTBN1').val();
            var MoTa = form_themmoi_dtbn.find('#MoTa').val();
            var HTTT = form_themmoi_dtbn.find('#HTTT').val();
            var Status = form_themmoi_dtbn.find('#Status').is(':checked');
            var request = form_themmoi_dtbn.find('[name=__RequestVerificationToken]').val();
            Call_Ajax('/doituongbenhnhan/create', "application/json", "POST", JSON.stringify({ IDDTBN: IDDTBN, DTBN1: DTBN1, MoTa: MoTa, HTTT: HTTT, Status: Status }), function (d) {
                if (d.success) {
                    show_alert("Đối tượng bệnh nhân: \"" + DTBN1 + "\" đã được thêm thành công.");
                    var length = $('#table-danhmuc-dtbn').DataTable().data().length + 1;
                    modal_add.modal('hide');
                    $('#table-danhmuc-dtbn').DataTable().row.add([length, d.data.IDDTBN, d.data.DTBN1, d.data.MoTa, d.data.HTTT, '<input type="checkbox" class="minimal" ' + (d.data.Status == 1 ? 'checked="checked"' : '') + ' name="hoatDong">',
                        '<span><a href="javascript:;" onclick="DM_DTBN_Edit(this);" data-target="#modal-danhmuc-dtbn-edit" data-toggle="modal" data-id="' + d.data.IDDTBN + '" title="Sửa" class="btn-sm btn-info"><i class="fa fa-edit"></i></a></span><span><a href="javascript:DanhMuc_DTBN_delete(\'' + d.data.IDDTBN + '\');" title="Xóa" class="btn-sm btn-danger"><i class="fa fa-trash"></i></a></span>'

                    ]).draw(false);
                    setTimeout(function () {
                        var tr = $('#table-danhmuc-dtbn').DataTable().row(length - 1).nodes().to$();
                        tr.find('td:last-child').addClass("text-center").addClass("function").css({ width: '100px' });
                        tr.attr({ 'id': d.data.IDDTBN });
                        tr.attr({ 'data-id': d.data.IDDTBN });
                        tr.attr({ 'data-name': d.data.DTBN1 });
                        tr.find('input[type="checkbox"].minimal').closest('td').addClass('text-center');
                        tr.find('input[type="checkbox"].minimal').iCheck({
                            checkboxClass: 'icheckbox_minimal-blue',
                            radioClass: 'iradio_minimal-blue'
                        });
                    }, 0);
                } else {
                    switch (d.maKQ) {
                        case -1: show_errmess("Thông tin nhập vào không chính xác");
                            break;
                        case 3: show_errmess("Mã đối tượng: \"" + IDDTBN + "\" đã tồn tại, thử với mã khác");
                            break;
                        case 2: show_errmess("Không thêm được thông tin, thử lại sau");
                            break;
                        default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                    }
                }

            }, { __RequestVerificationToken: request });

        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });


    modal_edit.on({
        'show.bs.modal': function (e) {
            
            setTimeout(function () {
                //form_capnhat_dtbn.find('input:not([name=__RequestVerificationToken])').val('');
                form_capnhat_dtbn.find('#IDDTBN:not(:hidden)').focus();
            }, 200);
            form_capnhat_dtbn.find('span[data-valmsg-for]').each(function (a, b) {
                $(b).removeClass('field-validation-error');
                $(b).addClass('field-validation-valid');
                $(b).html('');
            });
        }
    });



    form_capnhat_dtbn.find('#btn-update-ok').click(function (e) {
        if (form_capnhat_dtbn.valid()) {
            var IDDTBN = form_capnhat_dtbn.find('#IDDTBN:hidden').val();
            var DTBN1 = form_capnhat_dtbn.find('#DTBN1').val();
            var MoTa = form_capnhat_dtbn.find('#MoTa').val();
            var HTTT = form_capnhat_dtbn.find('#HTTT').val();
            var Status = form_capnhat_dtbn.find('#Status').is(':checked');
            var request = form_capnhat_dtbn.find('[name=__RequestVerificationToken]').val();
            if (IDDTBN) {
                Call_Ajax('/doituongbenhnhan/edit/' + IDDTBN, "application/json", "PUT", JSON.stringify({ IDDTBN: IDDTBN, DTBN1: DTBN1, MoTa: MoTa, HTTT: HTTT, Status: Status }), function (d) {
                    if (d.success) {
                        show_alert("Đối tượng bệnh nhân: \"" + DTBN1 + "\" đã được cập nhật thành công.");

                        modal_edit.modal('hide');

                        var rowIndex = DANHMUC_Tables.main.row('#' + IDDTBN + '').index();

                        table_DTBN.dataTable().fnUpdate(d.data.IDDTBN, rowIndex, 1);
                        table_DTBN.dataTable().fnUpdate(d.data.DTBN1, rowIndex, 2);
                        table_DTBN.dataTable().fnUpdate(d.data.MoTa, rowIndex, 3);
                        table_DTBN.dataTable().fnUpdate(d.data.HTTT, rowIndex, 4);
                        
                        if (d.data.Status == 1) {

                            DANHMUC_Tables.main.row('#' + IDDTBN + '').nodes().to$().find('input:checkbox').iCheck('check');
                        } else {
                            DANHMUC_Tables.main.row('#' + IDDTBN + '').nodes().to$().find('input:checkbox').iCheck('uncheck');
                        }
                    } else {
                        switch (d.maKQ) {
                            case -1: show_errmess("Thông tin nhập vào không chính xác");
                                break;
                            case ResponseStatus.NotExist: show_errmess("Mã dân tộc: \"" + IDDTBN + "\" không tồn tại, kiểm tra lại thông tin");
                                break;
                            case 2: show_errmess("Không cập nhật được thông tin, thử lại sau");
                                break;
                            default: show_warning('Chưa rõ nguyên nhân: ' + JSON.stringify(d));

                        }
                    }

                }, { __RequestVerificationToken: request });
            }
        } else {
            show_errmess("Thông tin nhập chưa chính xác, kiểm tra lại thông tin");
        }
    });

});

function DM_DTBN_Edit(ele) {
    var id = $(ele).data('id');
    if (id) {
        Call_Ajax('/doituongbenhnhan/get-dtbn/' + id, "application/json", "GET", null, function (d) {
            setTimeout(function (e) {
                if (d) {
                    $('#form-capnhat-dtbn').find('#IDDTBN').val(d.IDDTBN);
                    $('#form-capnhat-dtbn').find('#DTBN1').val(d.DTBN1);
                    $('#form-capnhat-dtbn').find('#MoTa').val(d.MoTa);
                    $('#form-capnhat-dtbn').find('#HTTT').val(d.HTTT);
                    //$('#form-capnhat-dantoc').find('#Status').click();
                    if (d.Status == 1) {
                        if (!$('#form-capnhat-dtbn').find('#Status').is(':checked')) {
                            $('#form-capnhat-dtbn').find('#Status').iCheck('check');
                        }
                    } else {
                        if ($('#form-capnhat-dtbn').find('#Status').is(':checked')) {
                            $('#form-capnhat-dtbn').find('#Status').iCheck('uncheck');
                        }
                    }
                } else {
                    $$('#form-capnhat-dtbn').find('#IDDTBN').val('');
                    $('#form-capnhat-dtbn').find('#DTBN1').val('');
                    $('#form-capnhat-dtbn').find('#MoTa').val('');
                    $('#form-capnhat-dtbn').find('#HTTT').val('');
                    //$('#form-capnhat-dantoc').find('#Status').val('');
                    show_warning('Thông tin đối tượng bệnh nhân không được tải về');
                }
            }, 0)
        }, null);
    }
}

function DanhMuc_DTBN_delete(id) {


    var table = $('#table-danhmuc-dtbn');
    var tr1 = table.find('tr[data-id=' + id + ']');

    var name = tr1.data('name');
    ShowPopupDelete('Xóa dân tộc', 'Bạn có muốn xóa đối tượng: ' + name + ' không?', function () {

        $.ajax({
            url: '/doituongbenhnhan/delete/' + id,
            type: 'delete',
            contentType: 'application/json',
            success: function (d) {
                if (d.success) {
                    show_alert('Đối tượng: "' + name + '" đã được xóa.');
                    table.DataTable().row(tr1).remove().draw();
                    var ds = DANHMUC_Tables.main;

                } else {
                    if (d.maKQ == ResponseStatus.NotExist) {
                        show_errmess('Không có đối tượng nào có mã là: ' + id);
                    } else if (d.maKQ == ResponseStatus.NotSaved) {
                        show_errmess('Không xóa được đối tượng: ' + name);
                    } else if (d.maKQ == ResponseStatus.Used) {
                        show_errmess('Đối tượng: ' + name + ' đã được sử dụng, không được xóa');
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
