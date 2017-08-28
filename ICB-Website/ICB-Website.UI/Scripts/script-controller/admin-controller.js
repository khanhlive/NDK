$(document).ready(function () {
    LoadTTBenhVien();
});

$(document).ajaxError(function (a, b, c) {
    var text = '';
    switch (b.status) {
        case 403: text ="Bạn không có quyền để thực hiện thao tác này."
            break;
        case 401: text = "Bạn chưa đăng nhập hoặc thời gian đăng nhập đã hết hạn, vui lòng đăng nhập lại để thực hiện thao tác này."
            break;
        default:
    }
    $('.modal').modal('hide');
    showpopuperror(text);
})

var APPLICATION = {
    GetToken: function (callback) {
        var username = localStorage.getItem("BVTUKY_USERNAME");
        var password = localStorage.getItem("BVTUKY_PASSWORD");
        var checkToken = false;
        var token = localStorage.getItem('token');
        if (token) {
            var tokenObj = JSON.parse(token);
            if (new Date(tokenObj[".expires"]) > new Date()) {
                checkToken = true;
            }
        }
        if (checkToken) {
            if (callback) {
                callback(JSON.parse(token));
            }
        } else {
            $.ajax({
                url: '/token',
                type: 'POST',
                contentType: 'json',
                data: {
                    username: username,
                    password: password,
                    grant_type: 'password'
                },
                success: function (response) {
                    localStorage.setItem('token', JSON.stringify(response));
                    if (callback) {
                        callback(response);
                    }
                }
            });
        }
    }
}

function Account_Delete(id) {
    $('#delete').click(function () {
        $.ajax({
            type: 'GET',
            url: '/api/benhvienapi/xoataikhoan?id=' + id,
            success: function (respond) {
                if (respond == true) {
                    $('.content-modal').text('Xóa bản ghi thành công !');
                    $('#popupAlert').modal('show');
                    location.reload();
                    $('.alert-ok').click(function () {
                        $('#popupAlert').modal('hide');
                        $('body').css('padding-right', '0px');
                        location.reload();
                    });
                }
                else {
                    $('.error-content-modal').text('Xóa bản ghi không thành công, vui lòng kiểm tra lại...');
                    $('#popupError').modal('show');
                    $('.alert-ok').click(function () {
                        $('#popupError').modal('hide');
                        $('body').css('padding-right', '0px');
                    });
                }
                $('#popupConfirm').modal('hide');
                //location.reload();
            }
        });
    });
}

function Feedback_Delete(id) {
    $('#delete').click(function () {
        $.ajax({
            type: 'GET',
            url: '/api/benhvienapi/xoaphanhoi?id=' + id,
            success: function (respond) {
                if (respond == true) {
                    $('.content-modal').text('Xóa bản ghi thành công !');
                    $('#popupAlert').modal('show');
                    $('.alert-ok').click(function () {
                        $('#popupAlert').modal('hide');
                        $('body').css('padding-right', '0px');
                        location.reload();
                    });
                }
                else {
                    $('.error-content-modal').text('Xóa bản ghi không thành công, vui lòng kiểm tra lại...');
                    $('#popupError').modal('show');
                    $('.alert-ok').click(function () {
                        $('#popupError').modal('hide');
                        $('body').css('padding-right', '0px');
                    });
                }
                $('#popupConfirm').modal('hide');

            }
        });
    });
}

function News_Delete(id) {
    $('#delete').click(function () {
        APPLICATION.GetToken(function (token) {
            $.ajax({
                type: 'GET',
                url: '/api/benhvienapi/xoatintuc?id=' + id,
                headers: {
                    'Authorization': 'Bearer ' + token.access_token + ''
                },
                success: function (respond) {
                    if (respond == true) {
                        $('.content-modal').text('Xóa bản ghi thành công !');
                        $('#popupAlert').modal('show');

                        $('.alert-ok').click(function () {
                            $('#popupAlert').modal('hide');
                            $('body').css('padding-right', '0px');
                            location.reload();
                        });
                    }
                    else {
                        $('.error-content-modal').text('Xóa bản ghi không thành công, vui lòng kiểm tra lại...');
                        $('#popupError').modal('show');
                        $('.alert-ok').click(function () {
                            $('#popupError').modal('hide');
                            $('body').css('padding-right', '0px');
                        });
                    }
                    $('#popupConfirm').modal('hide');
                }
            });

        });
        
    });
}

function PhacDo_Delete(id) {
    $('#delete').click(function () {
        $.ajax({
            type: 'GET',
            url: '/api/benhvienapi/xoaphacdo?id=' + id,
            success: function (respond) {
                if (respond == true) {
                    $('.content-modal').text('Xóa bản ghi thành công !');
                    $('#popupAlert').modal('show');

                    $('.alert-ok').click(function () {
                        $('#popupAlert').modal('hide');
                        $('body').css('padding-right', '0px');
                        location.reload();
                    });
                }
                else {
                    $('.error-content-modal').text('Xóa bản ghi không thành công, vui lòng kiểm tra lại...');
                    $('#popupError').modal('show');
                    $('.alert-ok').click(function () {
                        $('#popupError').modal('hide');
                        $('body').css('padding-right', '0px');
                    });
                }
                $('#popupConfirm').modal('hide');
            }
        });
    });
}

function News_Approval(id) {

    $('#popupApproval').modal('show').one('click', '#approval', function () {

        APPLICATION.GetToken(function (token) {
            $.ajax({
                type: 'GET',
                url: '/api/benhvienapi/pheduyettintuc?id=' + id,
                headers: {
                    'Authorization': 'Bearer ' + token.access_token+''
                },
                success: function (respond) {
                    if (respond == true) {
                        $('.content-modal').text('Duyệt tin tức thành công !');
                        $('#popupAlert').modal('show');

                        $('.alert-ok').click(function () {
                            $('#popupAlert').modal('hide');
                            $('body').css('padding-right', '0px');
                            location.reload();
                        });
                    }
                    else {
                        $('.error-content-modal').text('Phê duyệt tin tức thất bại, vui lòng kiểm tra lại...');
                        $('#popupError').modal('show');
                        $('.alert-ok').click(function () {
                            $('#popupError').modal('hide');
                            $('body').css('padding-right', '0px');
                        });
                    }
                    $('#popupApproval').modal('hide');
                }
            });
        });
    });
    
}


///Huỷ duyệt tin tức
function HuyDuyet_Tintuc(id) {
    $('#popupCancelApproval').modal('show').one('click', '#CancelApproval', function () {
        APPLICATION.GetToken(function (token) {
            $.ajax({
                type: 'GET',
                url: '/api/benhvienapi/huy-duyet-tin-tuc?id=' + id,
                headers: {
                    'Authorization': 'Bearer ' + token.access_token + ''
                },
                success: function (respond) {
                    if (respond == true) {
                        $('.content-modal').text('Huỷ duyệt tin tức thành công !');
                        $('#popupAlert').modal('show');

                        $('.alert-ok').click(function () {
                            $('#popupAlert').modal('hide');
                            $('body').css('padding-right', '0px');
                            location.reload();
                        });
                    }
                    else {
                        $('.error-content-modal').text('Huỷ duyệt tin tức thất bại, vui lòng kiểm tra lại...');
                        $('#popupError').modal('show');
                        $('.alert-ok').click(function () {
                            $('#popupError').modal('hide');
                            $('body').css('padding-right', '0px');
                        });
                    }
                    $('#popupCancelApproval').modal('hide');
                }
            });
        });
        

    });
}


function LoadTTBenhVien() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/thongtinbenhvien',
        success: function (data) {            
            $('#admin-bv-name').html(data.benhvien_tenbenhvien.trim().replace('undefined', ''));
        }
    });
}

//Phu-controller
function showpopuperror(messege) {
    $('#popupConfirm').modal('hide');
    $('.error-content-modal').text(messege);
    $('#popupError').modal('show');
    $('.alert-ok').click(function () {
        $('#popupError').modal('hide');
        $('body').css('padding-right', '0px');
    });
}

function showpopupsuccess(messege) {
    $('#popupConfirm').modal('hide');

    $('.content-modal').text(messege);
    $('#popupAlert').modal('show');
    $('.alert-ok').click(function () {
        $('#popupAlert').modal('hide');
        $('body').css('padding-right', '0px');
        location.reload();
    });
}

function openpopuptraloithu(cauhoi, idhomthu, cautraloi) {
    $('#ReplyModal').modal('show');
    $('#NoiDungCauHoi').text(cauhoi);
    $('#idhomthu').text(idhomthu);
    if (cautraloi != null)
        $('#txtNoidungTraLoi').text(cautraloi);
}

function openpopupdetailthu(cauhoi) {
    $('#detailpop').modal('show');
    $('#NoiDungCauHoi2').text(cauhoi);

}


function SaveTraLoi() {
    var idhomthu = $('#idhomthu').text();
    var cautraloi = $('#txtNoidungTraLoi').val();
    var phanloai = $('#ddldanglenweb').val();
    $.ajax({
        type: 'post',
        url: '/admin/emails/update_cautraloi',
        data: { cautraloi: cautraloi, idhomthu: idhomthu, phanloai: phanloai },
        success: function (data) {
            if (data != null) {
                if (data.rowExcute > 0) {
                    $('#ReplyModal').modal('hide')
                    showpopupsuccess(data.messenge);
                } else {
                    $('#ReplyModal').modal('hide')
                    showpopuperror(data.messenge);
                }
            } else {
                $('#ReplyModal').modal('hide')
                showpopuperror("Xóa thất bại! Không thể xóa bản ghi này!");
            }
        },
        error: function (err) {
            $('#ReplyModal').modal('hide')
            showpopuperror("Lỗi không gọi được service");
            console.log("Lỗi gọi hàm xóa hòm thư" + err);
        }
    });
}

function traloihomthu(idhomthu) {
    $.ajax({
        type: 'get',
        url: '/admin/emails/getCauhoi?idhomthu=' + idhomthu,
        success: function (data) {
            if (data != null) {
                if (data.rowExcute > 0) {
                    // gan cau hoi len the div casu hoi = daata.mess
                    var cautraloi = null;
                    if (data.other != null) {
                        cautraloi = data.other;
                    }
                    openpopuptraloithu(data.messenge, idhomthu, data.other);

                } else {
                    $('#ReplyModal').modal('hide')
                    showpopuperror(data.messenge);
                }
            } else {
                $('#ReplyModal').modal('hide')
                //$("#popupConfirm").hide();
                showpopuperror("Đã sảy ra lỗi!");
            }
        },
        error: function (err) {
            $('#ReplyModal').modal('hide')
            showpopuperror("Lỗi không gọi được service");
            console.log("Lỗi gọi hàm get hòm thư" + err);
        }
    });


}

function DeleteHomThu(idhomthu) {
    $("#delete").click(function () {
        $.ajax({
            type: 'post',
            url: '/admin/emails/DeleteHomThu',
            data: { idhomthu: idhomthu },
            success: function (data) {
                if (data != null) {
                    if (data.rowExcute > 0) {
                        $('#popupConfirm').modal('hide')
                        //$("#popupConfirm").hide();
                        showpopupsuccess(data.messenge);
                    } else {
                        $('#popupConfirm').modal('hide')
                        //$("#popupConfirm").hide();
                        showpopuperror(data.messenge);
                    }
                } else {
                    $('#popupConfirm').modal('hide')
                    //$("#popupConfirm").hide();
                    showpopuperror("Xóa thất bại! Không thể xóa bản ghi này!");
                }
            },
            error: function (err) {
                $('#popupConfirm').modal('hide')

                //$("#popupConfirm").hide();
                showpopuperror("Lỗi không gọi được service");
                console.log("Lỗi gọi hàm xóa hòm thư" + err);
            }
        });
    });


}

function detailhomthu(idhomthu, ploai) {
    $.ajax({
        type: 'get',
        url: '/admin/emails/getCauhoi?idhomthu=' + idhomthu,
        success: function (data) {
            if (data != null) {
                if (data.rowExcute > 0) {
                    if (ploai == 1) {
                        openpopupdetailthu(data.messenge);
                        $('#lblcauhoi').text('Câu hỏi')
                    } else {
                        openpopupdetailthu(data.other);

                        $('#lblcauhoi').text('Câu trả lời')

                    }
                } else {
                    $('#ReplyModal').modal('hide')
                    showpopuperror(data.messenge);
                }
            } else {
                $('#ReplyModal').modal('hide')
                showpopuperror("Đã sảy ra lỗi!");
            }
        },
        error: function (err) {
            $('#ReplyModal').modal('hide')
            showpopuperror("Lỗi không gọi được service");
            console.log("Lỗi gọi hàm get hòm thư" + err);
        }
    });
}

function restorehomthu(idhomthu) {

    $.ajax({
        type: 'post',
        url: '/admin/emails/restorehomthu',
        data: { idhomthu: idhomthu },
        success: function (data) {
            if (data != null) {
                if (data.rowExcute > 0) {
                    showpopupsuccess(data.messenge);
                    //location.reload();
                } else {
                    showpopuperror(data.messenge);
                }
            } else {
                showpopuperror("Khôi phục thất bại! Không thể khôi phục bản ghi này!");
            }
        },
        error: function (err) {
            showpopuperror("Lỗi không gọi được service");
        }
    });
}
