$(document).ready(function () {
    if ($('[data-controller=account]').length > 0) {
        ACCOUNT_INIT_TABLE_ALLACCOUNT();
        ACCOUNT_ADD_INITFORM();
        $('#btn-update-account-submit').click(function (e) {
            $('#frm-update-account').data('formValidation').validate();
            if ($('#frm-update-account').data('formValidation').isValid()) {
                ACCOUNT_UPDATE_ACCOUNT();
            }

        });

        $('#btn-add-account-submit').click(function (e) {
            $('#frm-add-account').data('formValidation').validate();
            if ($('#frm-add-account').data('formValidation').isValid()) {
                ACCOUNT_ADD_ACCOUNT();
            }

            return false;
        });
    }

    if ($('[data-controller=customer]').length > 0) {
        CUSTOMER_INIT_TABLE();
        CUSTOMER_INIT_FORMVALIDATION();
        $('#btn-customer-browser').click(function () {
            var ckfinder = new CKFinder();
            ckfinder.selectActionFunction = function (url, a, b) {
                console.log(url);
                console.log(b);
                console.log(a);
                var decodedUri = decodeURIComponent(url);
                $("#img-customer-thumbnail").attr('src', decodedUri);
                $("#frm-add-customer [name=Thumbnail]").attr({ 'value': decodedUri });
                $("#frm-add-customer").formValidation('revalidateField', 'Thumbnail');
                $("#image-url").text(decodedUri);
                $("#images-url").text(decodedUri);
            }
            ckfinder.popup();
        });

        $('#btn-add-customer-submit').click(function () {
            $('#frm-add-customer').data('formValidation').validate();
            if ($('#frm-add-customer').data('formValidation').isValid()) {
                CUSTOMER_ADD();
            }
        });
        
        $('#btn-update-customer-submit').click(function (e) {
            $('#frm-update-customer').data('formValidation').validate();
            if ($('#frm-update-customer').data('formValidation').isValid()) {
                CUSTOMER_UPDATE();
            }
        });
    }
});

//////  ACCOUNT //////
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
                var form = $('#frm-update-account');
                var table = $('#ACCOUNT_ALLACCOUNT');
                var tr = table.find('tbody tr.active');
                var data_id = tr.data('id');
                if (data_id) {
                    APPLICATION.ShowLoading();
                    APPLICATION.Ajax('/admin/account/getbyid/' + data_id, 'application/json', 'GET', null, function (d) {
                        
                        form.find('[name=ID]').val(d.ID);
                        form.find('[name=Role]').val(d.Role);
                        form.find('[name=txtFullname]').val(d.Fullname);
                        form.find('[name=txtUsername]').val(d.Username);
                        form.find('[name=txtPassword]').val();
                        form.find('[name=txtRetypePassword]').val('');
                        form.find('[name=txtEmail]').val(d.Email);
                        form.find('[name=txtPhoneNumber]').val(d.PhoneNumber);
                        form.find('[name=ckbIsActive]').iCheck(d.IsActive ? 'check' : 'uncheck');
                        form.find('[name=ckbIsLocked]').iCheck(d.IsLocked ? 'check' : 'uncheck');
                        $('#btn-update-account-delete').attr({ 'data-id': d.ID });
                        $('#modal-account-update').modal({ backdrop: 'static', keyboard: false, show: true });
                        $('#modal-account-update').on('shown.bs.modal', function (e) {
                            
                            form.data('formValidation').resetForm();
                        });
                        APPLICATION.HideLoading();
                    });
                } else {
                    APPLICATION.HideLoading();
                }
            },
            className: 'btn-info'
        },
        {
            text: '<i class="fa fa-trash"></i>&nbsp;&nbsp;Xóa&nbsp;&nbsp;',
            action: function () {
                var table = $('#ACCOUNT_ALLACCOUNT');
                var tr = table.find('tbody tr.active');
                var data_id = tr.data('id');
                ACCOUNT_DELETE_ACCOUNT(data_id);
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
            ACCOUNTController.mainTable.rows().clear().draw();
            $.each(response, function (a, b) {
                var tr = ACCOUNTController.mainTable.row.add([
                    '<input type="checkbox" class="flat" value="' + b.ID + '" name="table_records" />',
                    b.Username,
                    b.Fullname,
                    b.Email,
                    (b.CreateTime).MilisecondsToLongString(),
                    APPLICATION.GetDisplayRole(b.Role),
                    '<span class="icheckbox_minimal-blue ' + (b.IsActive ? 'checked' : '') + '"></span>',
                    '<span class="icheckbox_minimal-blue ' + (b.IsLocked ? 'checked' : '') + '"></span>'
                ]).draw(false);
                tr.nodes().to$().attr({ 'data-id': b.ID });
                
            });
            
            APPLICATION.INIT_CHECKBOX(ACCOUNTController.dom.find('tbody'));
            setTimeout(function () {
                $('div[data-controller=account] .btn-account-refresh i').removeClass('fa-spin');
            }, 1000);
            APPLICATION.DataTable.AddEventToCheckbox($(ACCOUNTController.dom));
        } else {
            ACCOUNTController.mainTable = null;
            var html = '';
            $.each(response, function (a, b) {
                html += '<tr data-id="' + b.ID + '">';
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
    });
}


function ACCOUNT_UPDATE_ACCOUNT() {
    var form = $("#frm-update-account");
    var id = form.find('[name=ID]').val();
    var fullname = form.find('[name=txtFullname]').val();
    var role = form.find('[name=Role]').val();
    var username = form.find('[name=txtUsername]').val();
    var password = form.find('[name=txtPassword]').val();
    var email = form.find('[name=txtEmail]').val();
    var phone = form.find('[name=txtPhoneNumber]').val();
    var isActive = form.find('[name=ckbIsActive]').is(':checked');
    var isLocked = form.find('[name=ckbIsLocked]').is(':checked');
    var Account = {
        ID: id,
        Username: username,
        Password: password,
        Role: role,
        Email: email,
        Fullname: fullname,
        IsActive: isActive,
        IsLocked: isLocked,
        PhoneNumber: phone
    };
    APPLICATION.Ajax('/admin/account/update/'+Account.ID, 'application/json', 'PUT', JSON.stringify(Account), function (d) {
        if (d.Status == ResponseStatus.OK) {
            ACCOUNT_RESETFIELD('add');
            $('#modal-account-update').modal('hide');
            ShowNotifySuccess(d.Message);
            ACCOUNT_RELOAD_ALLACCOUNT();
        } else {
            MESSAGEBOX(d.Message);
        }
    });
}

function ACCOUNT_DELETE_ACCOUNT(id) {
    if (id) {
        CONFIRMBOX('Bạn có muốn xóa tài khoản này không?', 'Xóa tài khoản', function (e) {
            APPLICATION.Ajax('/admin/account/delete/' + id, 'application/json', 'DELETE', null, function (d) {
                if (d.Status == ResponseStatus.OK) {
                    ShowNotifySuccess('Xóa thành công');
                    $('#modal-account-update').modal('hide');
                    ACCOUNT_RELOAD_ALLACCOUNT();
                } else {
                    ShowNotifyError(d.Message);
                }
            });

        });
    }
}

function ACCOUNT_DELETE(element) {
    var id = $(element).data('id');
    if (id) {
        ACCOUNT_DELETE_ACCOUNT(id);
    }
}


////   END ACCOUNT   /////

//// KHACH HANG // /////

var CUSTOMERController = {
    dom: $('#CUSTOMER_ALLCUSTOMER'),
    mainTable: null,
    options: [
        {
            text: '<i class="fa fa-plus"></i>&nbsp;Thêm mới&nbsp;',
            action: function () {
                $('#modal-customer-add').modal({ backdrop: 'static', keyboard: false, show: true });
            },
            className: 'btn-success'

        },
        {
            text: '<i class="fa fa-edit"></i>&nbsp;&nbsp;Sửa&nbsp;&nbsp;',
            action: function () {
                var form = $('#frm-update-customer');
                var table = $('#CUSTOMER_ALLCUSTOMER');
                var tr = table.find('tbody tr.active');
                var data_id = tr.data('id');
                
                if (data_id) {
                    APPLICATION.ShowLoading();
                    APPLICATION.Ajax('/admin/khach-hang/' + data_id, 'application/json', 'GET', null, function (d) {
                        $('#modal-customer-update .lbl-name').text(d.Name);
                        form.find('[name=ID]').val(d.ID);
                        form.find('[name=Name]').val(d.Name);
                        form.find('[name=Title]').val(d.Title);
                        form.find('[name=Address]').val(d.Address);
                        form.find('[name=Website]').val(d.Address);
                        form.find('[name=Status]').val(d.Status);
                        form.find('[name=Email]').val(d.Email);
                        form.find('[name=PhoneNumber]').val(d.PhoneNumber);
                        form.find('[name=Thumbnail]').val(d.Thumbnail);
                        form.find('#img-customer-thumbnail-edit').attr({ 'src': d.Thumbnail });
                        $('#btn-update-customer-delete').attr({ 'data-id': d.ID });
                        $('#modal-customer-update').modal({ backdrop: 'static', keyboard: false, show: true });
                        $('#modal-customer-update').on('shown.bs.modal', function (e) {

                            form.data('formValidation').resetForm();
                        });
                        APPLICATION.HideLoading();
                    });
                } else {
                    APPLICATION.HideLoading();
                }
            },
            className: 'btn-info'
        },
        {
            text: '<i class="fa fa-trash"></i>&nbsp;&nbsp;Xóa&nbsp;&nbsp;',
            action: function () {
                var table = $('#CUSTOMER_ALLCUSTOMER');
                var tr = table.find('tbody tr.active');
                var data_id = tr.data('id');
                CUSTOMER_DELETE(data_id);
            },
            className: 'btn-danger'
        },
        {
            text: '<i class="fa fa-refresh"></i>&nbsp;Làm mới&nbsp;',
            action: function () {
                CUSTOMER_RELOAD_ALLCUSTOMER();
            },
            className: 'btn-account-refresh btn-primary'
        }
    ]
}

function CUSTOMER_INIT_FORMVALIDATION() {
    $('#frm-add-customer,#frm-update-customer').formValidation({
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
            Address: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập địa chỉ khách hàng'
                    }
                }
            },
            Name: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập tên khách hàng'
                    }
                }
            },
            Thumbnail: {
                validators: {
                    notEmpty: {
                        message: 'Chưa chọn ảnh đại diện'
                    }
                }
            },
            Email: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập email'
                    },
                    emailAddress: {
                        message: 'Địa chỉ email không hợp lệ'
                    }
                }
            },
            PhoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'Chưa nhập số điện thoại'
                    },
                    regexp: {
                        regexp: /^[0-9]{10,11}$/,
                        message: 'Số điện thoại không đúng định dạng.'
                    }
                }
            }
        }
    });
}

function CUSTOMER_INIT_TABLE() {
    CUSTOMERController.mainTable = APPLICATION.CreateDataTable(CUSTOMERController.dom, CUSTOMERController.options, true);
}

function CUSTOMER_RESETFIELD() {

    var form = $("#frm-add-customer");
    form.find('[name=Name]').val('');
    form.find('[name=Title]').val('');
    form.find('[name=Address]').val('');
    form.find('[name=Website]').val('');
    form.find('[name=Status]').val('');
    form.find('[name=Email]').val('');
    form.find('[name=PhoneNumber]').val('');
    form.find('[name=Thumbnail]').val('');
    form.data('formValidation').resetForm();

}

function CUSTOMER_ADD() {
    var form = $("#frm-add-customer");
    
    var name = form.find('[name=Name]').val();
    var title = form.find('[name=Title]').val();
    var address = form.find('[name=Address]').val();
    var website = form.find('[name=Website]').val();
    var email = form.find('[name=Email]').val();
    var phone = form.find('[name=PhoneNumber]').val();
    var status = form.find('[name=Status]').val();
    var thumbnail = form.find('[name=Thumbnail]').val();
    var Customer = {
        Name: name,
        Title: title,
        Address: address,
        Email: email,
        Website: website,
        Status: status,
        PhoneNumber: phone,
        Thumbnail: thumbnail
        
    };
    APPLICATION.Ajax('/admin/customer/insert', 'application/json', 'POST', JSON.stringify(Customer), function (d) {
        if (d.Status == ResponseStatus.OK) {
            CUSTOMER_RESETFIELD();
            $('#modal-customer-add').modal('hide');
            ShowNotifySuccess(d.Message);
            CUSTOMER_RELOAD_ALLCUSTOMER();
        } else {
            MESSAGEBOX(d.Message);
        }
    });
}

function CUSTOMER_RELOAD_ALLCUSTOMER() {
    $('div[data-controller=customer] .btn-account-refresh i').addClass('fa-spin');
    APPLICATION.Ajax('/admin/customer/getall', 'application/json', 'GET', null, function (response) {
        if (CUSTOMERController.mainTable) {
            CUSTOMERController.mainTable.rows().clear().draw();
            $.each(response, function (a, b) {
                var tr = CUSTOMERController.mainTable.row.add([
                    '<input type="checkbox" class="flat" value="' + b.ID + '" name="table_records" />',
                    b.Name,
                    b.Email,
                    b.PhoneNumber,
                    (b.Address),
                    '<img class="img-thumbnail" width="70" height="50" alt="' + (b.Thumbnail) + '" title="' + (b.Title) + '" src="' + (b.Thumbnail)+'" />',
                    '<span class="icheckbox_minimal-blue ' + (b.Status ? 'checked' : '') + '"></span>'
                    
                ]).draw(false);
                tr.nodes().to$().attr({ 'data-id': b.ID });

            });

            APPLICATION.INIT_CHECKBOX(CUSTOMERController.dom.find('tbody'));
            setTimeout(function () {
                $('div[data-controller=customer] .btn-account-refresh i').removeClass('fa-spin');
            }, 1000);
            APPLICATION.DataTable.AddEventToCheckbox($(CUSTOMERController.dom));
        } else {
            CUSTOMERController.mainTable = null;
            var html = '';
            $.each(response, function (a, b) {
                html += '<tr data-id="' + b.ID + '">';
                html += '<td><input type="checkbox" class="flat" value="' + b.ID + '" name="table_records" /></td>';
                html += '<td>' + b.Name + '</td>';
                html += '<td>' + b.Email + '</td>';
                html += '<td>' + b.PhoneNumber + '</td>';
                html += '<td>' + (b.Address) + '</td>';
                html += '<td> < img class="img-thumbnail" width= "70" height= "50" alt= "' + (b.Thumbnail) + '" title= "' + (b.Title) + '" src= "' + (b.Thumbnail)+'" /></td>';
                html += '<td><span class="icheckbox_minimal-blue ' + (b.Status ? 'checked' : '') + '"></span></td>';
                html += '</tr>';
            });
            CUSTOMERController.dom.find('tbody').empty();
            CUSTOMERController.dom.find('tbody').html(html);
            APPLICATION.INIT_CHECKBOX(CUSTOMERController.dom.find('tbody'));
            CUSTOMERController.mainTable = CUSTOMERController.mainTable = APPLICATION.CreateDataTable(CUSTOMERController.dom, CUSTOMERController.options, true);
        }



    });
}

function CUSTOMER_UPDATE() {
    var form = $("#frm-update-customer");
    var id = form.find('[name=ID]').val();
    var name = form.find('[name=Name]').val();
    var title = form.find('[name=Title]').val();
    var address = form.find('[name=Address]').val();
    var website = form.find('[name=Website]').val();
    var email = form.find('[name=Email]').val();
    var phone = form.find('[name=PhoneNumber]').val();
    var status = form.find('[name=Status]').val();
    var thumbnail = form.find('[name=Thumbnail]').val();
    var Customer = {
        Name: name,
        Title: title,
        Address: address,
        Email: email,
        Website: website,
        Status: status,
        PhoneNumber: phone,
        Thumbnail: thumbnail,
        ID: id
    };

    APPLICATION.Ajax('/admin/customer/update/' + Customer.ID, 'application/json', 'PUT', JSON.stringify(Customer), function (d) {
        if (d.Status == ResponseStatus.OK) {
            CUSTOMER_RESETFIELD();
            $('#modal-customer-update').modal('hide');
            ShowNotifySuccess('Cập nhật thành công');
            CUSTOMER_RELOAD_ALLCUSTOMER();
        } else {
            MESSAGEBOX(d.Message);
        }
    });
}

function CUSTOMER_DELETE(id) {
    if (id) {
        CONFIRMBOX('Bạn có muốn xóa khách hàng này không?', 'Xóa khách hàng', function (e) {
            APPLICATION.Ajax('/admin/customer/delete/' + id, 'application/json', 'DELETE', null, function (d) {
                if (d.Status == ResponseStatus.OK) {
                    ShowNotifySuccess('Xóa thành công');
                    $('#modal-customer-update').modal('hide');
                    CUSTOMER_RELOAD_ALLCUSTOMER();
                } else {
                    ShowNotifyError(d.Message);
                }
            });

        });
    }
}

function CUSTOMER_DELETE_CUSTOMER(element) {
    var id = $(element).data('id');
    if (id) {
        CUSTOMER_DELETE(id);
    }
}

//// END KHACH HANG  //////
