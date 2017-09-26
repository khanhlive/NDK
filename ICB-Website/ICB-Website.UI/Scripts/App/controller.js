$(document).ready(function () {
    if ($('[data-controller=account]').length > 0) {
        ACCOUNT_INIT_TABLE_ALLACCOUNT();
        ACCOUNT_ADD_INITFORM();
    }
    
});

var ACCOUNTController = {
    dom: $('#ACCOUNT_ALLACCOUNT'),
    mainTable: null,
    options: [
        {
            text: '<i class="fa fa-plus"></i>&nbsp;Thêm mới&nbsp;',
            action: function () {
                $('#modal-account-add').modal({ backdrop: 'static', keyboard: false, show: true });
            },
            className:'btn-success'
            
        },
        {
            text: '<i class="fa fa-edit"></i>&nbsp;&nbsp;Sửa&nbsp;&nbsp;',
            action: function () {
                $('#modal-account-update').modal({ backdrop: 'static', keyboard: false, show: true });
            },
            className: 'btn-info'
        },
        {
            text: '<i class="fa fa-trash"></i>&nbsp;&nbsp;Xóa&nbsp;&nbsp;',
            action: function () {

            },
            className: 'btn-danger'
        },
        {
            text: '<i class="fa fa-refresh"></i>&nbsp;Làm mới&nbsp;',
            action: function () {
                ACCOUNT_RELOAD_ALLACCOUNT();
            },
            className:'btn-account-refresh btn-primary'
        }
    ]
}

function ACCOUNT_RESETFIELD(type) {
    if (type=='add') {
        var form = $("#frm-add-account");
        form.find('[name=Role]').val('');
        form.find('[name=txtFullname]').val('');
        form.find('[name=txtUsername]').val('');
        form.find('[name=txtPassword]').val('');
        form.find('[name=txtRetypePassword]').val('');
        form.find('[name=txtEmail]').val('');
        form.find('[name=txtPhoneNumber]').val('');
        form.find('[name=ckbIsActive]').iCheck('uncheck');
        form.find('[name=ckbIsLocked]').iCheck('uncheck');
        form.data('formValidation').resetForm();
    }
}

function ACCOUNT_INIT_TABLE_ALLACCOUNT() {
    ACCOUNTController.mainTable = APPLICATION.CreateDataTable(ACCOUNTController.dom, ACCOUNTController.options, true);
}

function ACCOUNT_RELOAD_ALLACCOUNT() {
    $('div[data-controller=account] .btn-account-refresh i').addClass('fa-spin');
    APPLICATION.Ajax('/admin/account/GetAllAccount', 'application/json', 'GET', null, function (response) {
        if (ACCOUNTController.mainTable) {
            ACCOUNTController.mainTable.clear().draw();
            $.each(response, function (a, b) {
                ACCOUNTController.mainTable.row.add([
                    '<input type="checkbox" class="flat" value="' + b.ID + '" name="table_records" />',
                    b.Username,
                    b.Fullname,
                    b.Email,
                    (b.CreateTime).MilisecondsToLongString(),
                    APPLICATION.GetDisplayRole(b.Role),
                    '<span class="icheckbox_minimal-blue ' + (b.IsActive ? 'checked' : '') + '"></span>',
                    '<span class="icheckbox_minimal-blue ' + (b.IsLocked ? 'checked' : '') + '"></span>'
                ]).draw(false);
            });
            APPLICATION.INIT_CHECKBOX(ACCOUNTController.dom.find('tbody'));
            setTimeout(function () {
                $('div[data-controller=account] .btn-account-refresh i').removeClass('fa-spin');
            }, 1000);
            
        } else {
            ACCOUNTController.mainTable = null;
            var html = '';
            $.each(response, function (a, b) {
                html += '<tr>';
                html += '<td><input type="checkbox" class="flat" value="' + b.ID + '" name="table_records" /></td>';
                html += '<td>' + b.Username + '</td>';
                html += '<td>' + b.Fullname + '</td>';
                html += '<td>' + b.Email + '</td>';
                html += '<td>' + (b.CreateTime).MilisecondsToLongString() + '</td>';
                html += '<td>' + APPLICATION.GetDisplayRole(b.Role) + '</td>';
                html += '<td><span class="icheckbox_minimal-blue ' + (b.IsActive ? 'checked' : '') + '"></span></td>';
                html += '<td><span class="icheckbox_minimal-blue ' + (b.IsLocked ? 'checked' : '') + '"></span></td>';
                html += '</tr>';
            });
            ACCOUNTController.dom.find('tbody').empty();
            ACCOUNTController.dom.find('tbody').html(html);
            APPLICATION.INIT_CHECKBOX(ACCOUNTController.dom.find('tbody'));
            ACCOUNTController.mainTable = ACCOUNTController.mainTable = APPLICATION.CreateDataTable(ACCOUNTController.dom, ACCOUNTController.options, true);
        }
        
        
        
    });
}

function ACCOUNT_ADD_ACCOUNT() {
    var form = $("#frm-add-account");
    var fullname = form.find('[name=txtFullname]').val();
    var role = form.find('[name=Role]').val();
    var username = form.find('[name=txtUsername]').val();
    var password = form.find('[name=txtPassword]').val();
    var email = form.find('[name=txtEmail]').val();
    var phone = form.find('[name=txtPhoneNumber]').val();
    var isActive = form.find('[name=ckbIsActive]').is(':checked');
    var isLocked = form.find('[name=ckbIsLocked]').is(':checked');
    var Account = {
        Username: username,
        Password: password,
        Role: role,
        Email: email,
        Fullname: fullname,
        IsActive: isActive,
        IsLocked: isLocked,
        PhoneNumber: phone
    };
    APPLICATION.Ajax('/admin/account/insert', 'application/json', 'POST', JSON.stringify(Account), function (d) {
        if (d.Status == ResponseStatus.OK) {
            ACCOUNT_RESETFIELD('add');
            $('#modal-account-add').modal('hide');
            ShowNotifySuccess(d.Message);
            ACCOUNT_RELOAD_ALLACCOUNT();
        } else {
            MESSAGEBOX(d.Message);
        }
    });
}

function ACCOUNT_ADD_INITFORM() {
    $('#frm-add-account').formValidation({
        //err: {
        //    container:'popover'
        //},
        message: 'This value is not valid',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Role: {
                validators: {
                    notEmpty: {
                        message: 'Chưa chọn quyền tài khoản'
                    }
                }
            },
            txtFullname: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập họ tên'
                    }
                }
            },
            txtUsername: {
                message: 'Tên đăng nhập không hợp lệ',
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập tên đăng nhập'
                    },
                    stringLength: {
                        min: 6,
                        max: 30,
                        message: 'Tên đăng nhập từ 6-50 ký tự'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'Tên đăng nhập chỉ gồm: chữ cái, chữ số, dấu chấm, gạch dưới.'
                    }
                }
            },
            txtEmail: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập email'
                    },
                    emailAddress: {
                        message: 'Địa chỉ email không hợp lệ'
                    }
                }
            },
            txtPassword: {
                validators: {
                    stringLength: {
                        min: 6,
                        max: 100,
                        message: 'Mật khẩu quá ngắn'
                    },
                    notEmpty: {
                        message: 'Chưa nhập mật khẩu'
                    },
                    different: {
                        field: 'username',
                        message: 'Mật khẩu không được giống với tên đăng nhập'
                    },
                    //identical: {
                    //    field: 'txtRetypePassword',
                    //    message: 'Mật khẩu không trùng khớp'
                    //}
                }
            },
            txtRetypePassword: {
                validators: {
                    identical: {
                        field: 'txtPassword',
                        message: 'Mật khẩu không trùng khớp'
                    }
                }
            },
            txtPhoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập số điện thoại'
                    }
                }
            }
        }
    }).on('err.form.fv', function (e) {
        // The e parameter is same as one
        // in the prevalidate.form.fv event above

        // Do something ...
    })
        .on('success.form.fv', function (e) {
            // The e parameter is same as one
            // in the prevalidate.form.fv event above
            ACCOUNT_ADD_ACCOUNT();
            // Do something ...
        });
}