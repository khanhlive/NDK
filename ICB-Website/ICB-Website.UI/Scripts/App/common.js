String.prototype.MilisecondsToShortString = function () {
    var datetime = moment(this.toString());
    if (datetime._isValid == true) {
        return datetime.format('DD/MM/YYYY');
    } else {
        return '';
    }
}
String.prototype.MilisecondsToLongString = function () {
    var datetime = moment(this.toString());
    if (datetime._isValid == true) {
        return datetime.format('DD/MM/YYYY HH:mm:ss');
    } else {
        return '';
    }
}
String.prototype.Moment = function () {
    var datetime = moment(this.toString());
    if (datetime._isValid == true) {
        return datetime;
    } else return undefined;
}
///plugin common


var DataTableLanguage = {
    "sProcessing": "Đang xử lý...",
    "sLengthMenu": "Xem _MENU_ mục",
    "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
    "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
    "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
    "sInfoFiltered": "(được lọc từ _MAX_ mục)",
    "sInfoPostFix": "",
    "sSearch": "Tìm:",
    "sUrl": "",
    "oPaginate": {
        "sFirst": "Đầu",
        "sPrevious": "Trước",
        "sNext": "Tiếp",
        "sLast": "Cuối"
    }
};
////Variable
var ResponseStatus = {

    OK: 0,
    Failed: 3,
    NotFound: 2,
    Existed: 1,
    ModelFailed: 4,
    HasChild: 5
};

$(document).ready(function () {

    //////iCheck
    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal-blue',
        radioClass: 'iradio_minimal-blue',
        increaseArea: '20%' // optional
    });

    ////datetimepicker

    $('input.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY HH:mm:ss'
    });
    $('input.datepicker').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    CKEDITOR.on('dialogDefinition', function (ev) {

        // Take the dialog name and its definition 
        // from the event data.

        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        // Check if the definition is from the 
        // dialog window you are interested in.

        if (dialogName == 'link') {
            dialogDefinition.minWidth = 450;
            console.log(dialogDefinition)
            var info = dialogDefinition.getContents("info");
            info.elements.push({
                type: 'text',
                id: 'name',
                label: 'Tên liên kết',
                'default': '',
                validate: function () {
                    if (!this.getValue()) {
                        alert('Tên liên kết không được để trống.');
                        return false;
                    }
                }, commit: function (data) {
                    data.filename = this.getValue();
                }
            });
            dialogDefinition.onOk = function (a, b) {
                var editor = this.getParentEditor();
                var dialog = this,
                    data = {},
                    link = editor.document.createElement('a');
                this.commitContent(data);
                link.setAttribute('href', data.url.url);
                
                if (data.newPage)
                    link.setAttribute('target', '_blank');
                
                switch (data.style) {
                    case 'b':
                        link.setStyle('font-weight', 'bold');
                        break;
                    case 'u':
                        link.setStyle('text-decoration', 'underline');
                        break;
                    case 'i':
                        link.setStyle('font-style', 'italic');
                        break;
                }

                link.setHtml(data.filename);
                
                editor.insertElement(link);
            };
            // Get a reference to the "Link Info" tab.
            // var infoTab = dialogDefinition.getContents( 'info' );

            // Set the default value for the URL field.
            // var urlField = infoTab.get( 'url' );
            //     urlField['default'] = 'www.example.com';

        }

    });

    ////event for button checkall in table header

    $('table input[name=checkall]').on('ifChanged', function () {
        var table = $(this).closest('table');
        if ($(this).is(':checked')) {
            table.find('tbody input[name=table_records]:not(:checked)').iCheck('check');
            
        } else {
            table.find('tbody input[name=table_records]:checked').iCheck('uncheck');
        }
    });
});
///End Variable
function ShowNotifyError(errmess) {
    $.notify({
        icon: 'glyphicon glyphicon-remove-sign',
        title: "<strong>Lỗi: </strong> ",
        message: errmess
    }, {
        placement: {
            from: "bottom",
            align: "right"
        },
        type: 'danger'
    });
}

function ShowNotifyWarning(warningmess) {

    $.notify({
        icon: 'glyphicon glyphicon-warning-sign',
        title: "<strong>Cảnh báo: </strong> ",
        message: warningmess
    }, {
        placement: {
            from: "bottom",
            align: "right"
        },
        type: 'warning'
    });
}

//alertwarning

function ShowNotifySuccess(mess) {

    $.notify({
        icon: 'glyphicon glyphicon-ok-sign',
        title: "<strong>Thành công:</strong> ",
        message: mess
    }, {
        placement: {
            from: "bottom",
            align: "right"
        },
        type: 'success'
    });
}

////message

function MESSAGEBOX(message, title, callback) {
    
    var html = '<div class="modal fade">';
    html += '<div class="modal-dialog" role= "document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    html += '       <span aria-hidden="true">&times;</span>';
    html += '  </button>';
    html += '   <h4 class="modal-title">' + (title ? title : 'Thông báo') + '</h4>';
    html += ' </div>';
    html += '<div class="modal-body">';
    html += '    <p>' + (message) + '</p>';
    html += ' </div>';
    html += '  <div class="modal-footer">';
    html += '     <button type="button" class="btn btn-primary" data-dismiss="modal">Xác nhận</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div >';
    html += ' </div >';
    var divModal = $('#modal-messagebox');
    divModal.find('.modal').modal('hide');
    divModal.empty;
    divModal.html(html);
    divModal.find('.modal').on('shown.bs.modal', function (e) {
        $(this).find('button[data-dismiss]').focus();
    });
    divModal.find('.modal').on('hidden.bs.modal', function (e) {
        divModal.empty();
    });
    divModal.find('.modal button').on('click', function (e) {
        if (callback) {
            callback(e);
        }
    });
    divModal.find('.modal').modal('show');
}

function CONFIRMBOX(message, title, successCallback,cancelCallback) {
    var html = '<div class="modal fade">';
    html += '<div class="modal-dialog" role= "document">';
    html += '<div class="modal-content">';
    html += '<div class="modal-header">';
    html += '    <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    html += '       <span aria-hidden="true">&times;</span>';
    html += '  </button>';
    html += '   <h4 class="modal-title">' + (title ? title : 'Thông báo') + '</h4>';
    html += ' </div>';
    html += '<div class="modal-body">';
    html += '    <p>' + (message) + '</p>';
    html += ' </div>';
    html += '  <div class="modal-footer">';
    html += '<button type="button" class="btn btn-primary" id="btn-ok">Xác nhận</button>';
    html += '     <button type="button" class="btn btn-secondary" id="btn-cancel" data-dismiss="modal">Đóng</button>';
    html += '    </div>';
    html += '  </div>';
    html += '</div >';
    html += ' </div >';
    var divModal = $('#modal-confirmbox');
    divModal.find('.modal').modal('hide');
    divModal.empty;
    divModal.html(html);
    divModal.find('.modal').on('shown.bs.modal', function (e) {
        divModal.find('.modal #btn-ok').focus();
    });
    divModal.find('.modal').on('hidden.bs.modal', function (e) {
        divModal.empty();
    });
    divModal.find('.modal #btn-ok').on('click', function (e) {
        divModal.find('.modal').modal('hide');
        if (successCallback) {
            successCallback(e);
        }
    });
    divModal.find('.modal #btn-cancel').on('click', function (e) {
        if (cancelCallback) {
            cancelCallback(e);
        }
    });
    divModal.find('.modal').modal('show');
}
///end message

$(function () {
    //$('.select2').select2();
    $('[data-mask]').inputmask();
    $('[data-mask-regex]').inputmask('Regex');

    /////initial sitemap

})

///



function Show_message_KQ_Traloi(status,text) {
    switch (status) {
        case 0: ShowNotifySuccess(text);
            break;
        case 1: ShowNotifyError(text);
            break;
        case 2: ShowNotifyWarning(text);
            break;
        default:

    }
}


////
var APPLICATION = {
    CreateDataTable: function (table, buttons, isHasCheck, initCompleteCallback) {
        var setting = {
            language: DataTableLanguage,
            dom: "Bfrtip",
            "initComplete": function (settings, json) {
                if (initCompleteCallback)
                    initCompleteCallback(setting, json);
                var dataTableWrapper = $(table).closest('.dataTables_wrapper');
                if (dataTableWrapper.length > 0) {
                    dataTableWrapper.find('.dt-buttons .btn').removeClass('btn-default');
                }
                ///
                
                $(table).find('[name=table_records]').unbind('ifChecked').on('ifChecked', function (e) {
                    var multiple = $(table).attr('data-multiple');
                    if (multiple == 'multiple') {
                        $(this).closest('tr').addClass('active');
                    } else {
                        var trs = $(table).find('tbody tr.active');
                        trs.find('[name=table_records]').iCheck('uncheck');
                        trs.removeClass('active');
                        $(this).closest('tr').addClass('active');
                    }
                });
                $(table).find('[name=table_records]').unbind('ifUnchecked').on('ifUnchecked', function (e) {

                    $(this).closest('tr').removeClass('active');
                });
            },
            responsive: true
            
        };
        if (isHasCheck) {
            setting['columnDefs']= [
                { orderable: false, targets: [0] }
            ]
        }
        if (buttons) {
            setting.buttons = buttons;
        } else {
            setting.buttons = [];
        }
        return $(table).DataTable(setting);
    },

    DataTable: {
        AddEventToCheckbox: function (row) {
            $(row).find('[name=table_records]').unbind('ifChecked').on('ifChecked', function (e) {
                var multiple = $(row).closest('table').attr('data-multiple');
                if (multiple == 'multiple') {
                    $(this).closest('tr').addClass('active');
                } else {
                    var trs = $(row).closest('table').find('tbody tr.active');
                    trs.find('[name=table_records]').iCheck('uncheck');
                    trs.removeClass('active');
                    $(this).closest('tr').addClass('active');
                }
            });
            $(row).find('[name=table_records]').unbind('ifUnchecked').on('ifUnchecked', function (e) {

                $(this).closest('tr').removeClass('active');
            });
        }
    },

    Ajax: function (url, contentType, type, data, successCallback, header) {
        $.ajax({
            url: url,
            contentType: contentType,
            headers: header,
            type: type,
            data: data,
            success: successCallback,
            error: function (err) {
                ShowNotifyError(err.responseText);
            }
        });
    },

    GetDisplayRole: function (role) {
        switch (role) {
            case 0:
                return 'Quản trị hệ thống';
            case 1:
                return 'Quản trị';
            case 2:
                return 'Quản lý Website';
            case 3:
                return 'Người viết bài';
            case 4:
                return 'Thành viên';
            case 5:
                return 'Khách vãng lai';
            default:
                return '';
        }
    },

    INIT_CHECKBOX: function (elementContainer) {
        if (elementContainer) {
            var list = $(elementContainer).find('input[type=checkbox],input[type=radio]');
            $.each(list, function (a, b) {
                if ($(b).closest('div[class^=icheckbox]').length > 0 || $(b).closest('div[class^=iradio]').length > 0) {

                } else {
                    $(b).iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue',
                        increaseArea: '20%' // optional
                    });
                }
            });
        } else {
            var list = $('input[type=checkbox],input[type=radio]');
            $.each(list, function (a, b) {
                if ($(b).closest('div[class^=icheckbox]').length > 0 || $(b).closest('div[class^=iradio]').length > 0) {

                } else {
                    $(b).iCheck({
                        checkboxClass: 'icheckbox_minimal-blue',
                        radioClass: 'iradio_minimal-blue',
                        increaseArea: '20%' // optional
                    });
                }
            });
        }
    },

    MESSAGEFOR: function (element,message) {
        if (element) {
            var container = $(element).closest('div');
            if (container.find('span.help-block').length <= 0) {
                container.append('<span class="help-block">' + (message ? message : '') + '</span>');
            } else {
                container.find('span.help-block').text(message);
            }
            container.closest('.form-group').addClass('has-error');
        }
    },

    CLEAN_MESSAGEFOR: function (element) {
        if (element) {
            var container = $(element).closest('div');
            if (container.find('span.help-block').length > 0) {
                container.find('span.help-block').text('');
            }
            container.closest('.form-group').removeClass('has-error');
        }
    },

    ShowLoading: function () {
        $('#pnl-main-loading').show();
    },

    HideLoading: function () {
        $('#pnl-main-loading').hide();
    }
}

