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
    FormInValid: -1,
    OK: 0,
    NotExist: 1,
    NotSaved: 2,
    Existed: 3,
    Used: 4
};

///End Variable
function show_errmess(errmess) {
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

function show_warning(warningmess) {

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

function show_alert(mess) {

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

$(function () {
    //$('.select2').select2();
    $('[data-mask]').inputmask();
    $('[data-mask-regex]').inputmask('Regex');

    /////initial sitemap

})

///
function Call_Ajax(url,contentType,type,data,successCallback,header) {
    $.ajax({
        url: url,
        contentType: contentType,
        headers:header,
        type: type,
        data: data,
        success: successCallback,
        error: function (err) {
            show_errmess(err.responseText);
        }
    });
}


function Show_message_KQ_Traloi(status,text) {
    switch (status) {
        case 0: show_alert(text);
            break;
        case 1: show_errmess(text);
            break;
        case 2: show_errmess(text);
            break;
        default:

    }
}

