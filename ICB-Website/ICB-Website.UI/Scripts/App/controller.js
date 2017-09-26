$(document).ready(function () {
    ACCOUNT_INIT_TABLE_ALLACCOUNT();
});

var ACCOUNTController = {
    dom: $('#ACCOUNT_ALLACCOUNT'),
    mainTable: null,
    options: [
        {
            text: '<i class="fa fa-plus"></i>&nbsp;Thêm mới',
            action: function () {
                $('#modal-account').modal({ backdrop: 'static', keyboard: false, show: true });
            }
        },
        {
            text: '<i class="fa fa-edit"></i>&nbsp;Sửa',
            action: function () {
                $('#modal-account').modal("show");
            }
        },
        {
            text: '<i class="fa fa-trash"></i>&nbsp;Xóa',
            action: function () {

            }
        },
        {
            text: '<i class="fa fa-refresh"></i>&nbsp;Làm mới',
            action: function () {
                ACCOUNT_RELOAD_ALLACCOUNT();
            },
            className:'btn-account-refresh'
        }
    ]
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
                    '<span class="state icheckbox_flat-green ' + (b.IsActive ? 'checked' : '') + '"></span>',
                    '<span class="state icheckbox_flat-green ' + (b.IsLocked ? 'checked' : '') + '"></span>'
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
                html += '<td> <span class="state icheckbox_flat-green ' + (b.IsActive ? 'checked' : '') + '"></span></td>';
                html += '<td><span class="state icheckbox_flat-green ' + (b.IsLocked ? 'checked' : '') + '"></span></td>';
                html += '</tr>';
            });
            ACCOUNTController.dom.find('tbody').empty();
            ACCOUNTController.dom.find('tbody').html(html);
            APPLICATION.INIT_CHECKBOX(ACCOUNTController.dom.find('tbody'));
            ACCOUNTController.mainTable = ACCOUNTController.mainTable = APPLICATION.CreateDataTable(ACCOUNTController.dom, ACCOUNTController.options, true);
        }
        
        
        
    });
}