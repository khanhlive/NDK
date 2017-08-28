function DeleteNews(news_id) {
    $('#delete').click(function (id) {
        $.ajax({
            type: 'POST',
            //url: '@Url.Action("delete", "admin/news")',
            url: '/admin/news/delete',
            data: { id: news_id },
            success: function (respond) {
                $('#popupConfirm').modal('hide');

                $('.content-modal').append('Xóa bản ghi thành công !');
                $('#popupAlert').modal('show');

                $('.alert-ok').click(function () {
                    $('#popupAlert').modal('hide');

                    location.reload();
                });
            }
        });
    });
}


function DeleteProducts(product_id) {
    $('#delete').click(function (id) {
        $.ajax({
            type: 'POST',
            //url: '@Url.Action("delete", "admin/news")',
            url: '/admin/products/delete',
            data: { id: product_id },
            success: function (respond) {
                $('#popupConfirm').modal('hide');

                $('.content-modal').append('Xóa bản ghi thành công !');
                $('#popupAlert').modal('show');

                $('.alert-ok').click(function () {
                    $('#popupAlert').modal('hide');

                    location.reload();
                });
            }
        });
    });
}

function DeleteRecruitments(recruitments_id) {
    $('#delete').click(function (id) {
        $.ajax({
            type: 'POST',            
            url: '/admin/recruitments/delete',
            data: { id: recruitments_id },
            success: function (respond) {
                $('#popupConfirm').modal('hide');

                $('.content-modal').append('Xóa bản ghi thành công !');
                $('#popupAlert').modal('show');

                $('.alert-ok').click(function () {
                    $('#popupAlert').modal('hide');

                    location.reload();
                });
            }
        });
    });
}

function DeleteAccount(acc_id) {
    $('#delete').click(function (id) {
        $.ajax({
            type: 'POST',
            url: '/admin/system/delete',
            data: { id: acc_id },
            success: function (respond) {
                $('#popupConfirm').modal('hide');

                $('.content-modal').append('Xóa bản ghi thành công !');
                $('#popupAlert').modal('show');

                $('.alert-ok').click(function () {
                    $('#popupAlert').modal('hide');

                    location.reload();
                });
            }
        });
    });
}