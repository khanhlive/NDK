///plugin common
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

///
function Show_message_trangthai_benhnhan(status,name) {
    switch(status){
        case 0: show_warning('Bệnh nhân: '+name+' chưa khám bệnh');
            break;
        case 1: show_warning('Bệnh nhân: ' + name + ' đã có khám bệnh');
            break;
        case 2: show_warning('Bệnh nhân: ' + name + ' đã ra viện');
            break;
        case 3: show_warning('Bệnh nhân: ' + name + ' đã thanh toán');
            break;
        case 4: show_warning('Bệnh nhân: ' + name + ' đã có chỉ định cận lâm sàng');
            break;
        case 5: show_warning('Bệnh nhân: ' + name + ' có chỉ định cận lâm sàng đã thực hiện');
            break;
        case 6: show_warning('Bệnh nhân: ' + name + ' đã có đơn thuốc');
            break;
        case 6: show_warning('Bệnh nhân: ' + name + ' có đơn thuốc đã xuất dược');
            break;
        default:
            show_warning("Chưa rõ thông tin");
    }  
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

