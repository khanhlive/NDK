$(document).ready(function () {
    ThongtinBVien();
    if ($('#wrapper').data('id') == 'home') {
        Tintuc_Sukien();
        Hoatdong();
        Suckhoe_Doisong();
        Thuvienanh();
    }
});



function Tintuc_Sukien() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/tintuc?phanloai=1&pagesize=5',
        success: function (data) {
            var html='';
            var html1='';
            var html2='';

            html1 += '<div class="col-md-5 form-group">';
            html1 += '<img class="img-responsive" src="' + data[0].tintuc_image + '" />';
            html1 += '<div class="title-tintuc"><a href="/tintuc/detail/' + data[0].tintuc_id + '">' + data[0].tintuc_tieude + '</a></div>';
            html1 += '<div class="text-content" style="text-align: justify;">';
            html1 += data[0].tintuc_motangan + '<br />';
            html1 += '    <a href="/tintuc/detail/' + data[0].tintuc_id + '">Xem thêm...</a>';
            html1 += '</div>';
            html1 += '</div>';

            html2 += '<div class="col-md-7 form-group">';
            for (var i = 1; i < data.length; i++) {
                html2 += '<div class="row form-group">';
                html2 += '    <div class="col-md-4">';
                html2 += '        <img class="img-responsive" src="' + data[i].tintuc_image + '" />';
                html2 += '    </div>';
                html2 += '    <div class="col-md-8">';
                html2 += '        <a href="/tintuc/detail/' + data[i].tintuc_id + '">' + data[i].tintuc_tieude + '</a>';
                html2 += '    </div>';
                html2 += '</div>   ';
            }
            html2 += '</div>';

            html = html1.replace('undefined', '') + html2.replace('undefined', '');
            $('#tintuc-sukien').html(html.replace('undefined', ''));
        }
    });
}

function Hoatdong() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/tintuc?phanloai=2&pagesize=5',
        success: function (data) {      
            var html;
            var html1;
            var html2;

            html1 += '<div class="col-md-5 form-group">';
            html1 += '<img class="img-responsive" src="' + data[0].tintuc_image + '" />';
            html1 += '<div class="title-tintuc"><a href="/tintuc/detail/' + data[0].tintuc_id + '">' + data[0].tintuc_tieude + '</a></div>';
            html1 += '<div class="text-content" style="text-align: justify;">';
            html1 += data[0].tintuc_motangan + '<br />';
            html1 += '    <a href="/tintuc/detail/' + data[0].tintuc_id + '">Xem thêm...</a>';
            html1 += '</div>';
            html1 += '</div>';

            html2 += '<div class="col-md-7 form-group">';
            for (var i = 1; i < data.length; i++) {
                html2 += '<div class="row form-group">';
                html2 += '    <div class="col-md-4">';
                html2 += '        <img class="img-responsive" src="' + data[i].tintuc_image + '" />';
                html2 += '    </div>';
                html2 += '    <div class="col-md-8">';
                html2 += '        <a href="/tintuc/detail/' + data[i].tintuc_id + '">' + data[i].tintuc_tieude + '</a>';
                html2 += '    </div>';
                html2 += '</div>   ';
            }
            html2 += '</div>';

            html = html1.replace('undefined', '') + html2.replace('undefined', '');
            $('#hoatdong-list').html(html.replace('undefined', ''));
        }
    });
}

function Suckhoe_Doisong() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/tintuc?phanloai=3&pagesize=5',
        success: function (data) {
            var html;
            var html1;
            var html2;

            html1 += '<div class="col-md-5 form-group">';
            html1 += '<img class="img-responsive" src="' + data[0].tintuc_image + '" />';
            html1 += '<div class="title-tintuc"><a href="/tintuc/detail/' + data[0].tintuc_id + '">' + data[0].tintuc_tieude + '</a></div>';
            html1 += '<div class="text-content" style="text-align: justify;">';
            html1 += data[0].tintuc_motangan + '<br />';
            html1 += '    <a href="/tintuc/detail/' + data[0].tintuc_id + '">Xem thêm...</a>';
            html1 += '</div>';
            html1 += '</div>';

            html2 += '<div class="col-md-7 form-group">';
            for (var i = 1; i < data.length; i++) {
                html2 += '<div class="row form-group">';
                html2 += '    <div class="col-md-4">';
                html2 += '        <img class="img-responsive" src="' + data[i].tintuc_image + '" />';
                html2 += '    </div>';
                html2 += '    <div class="col-md-8">';
                html2 += '        <a href="/tintuc/detail/' + data[i].tintuc_id + '">' + data[i].tintuc_tieude + '</a>';
                html2 += '    </div>';
                html2 += '</div>   ';
            }
            html2 += '</div>';

            html = html1.replace('undefined', '') + html2.replace('undefined', '');
            $('#thongtinyhoc').html(html.replace('undefined', ''));
        }
    });
}

function Thuvienanh() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/tintuc?phanloai=2&pagesize=5',
        success: function (data) {
            var html;
            for (var i = 0; i < data.length - 2; i++) {
                html += '<div class="col-md-4">';
                html += '      <img class="img-responsive" src="' + data[i].tintuc_image + '" />';
                html += '       <div class="title-tintuc"><a href="/tintuc/detail/' + data[i].tintuc_id + '">' + data[i].tintuc_tieude + '</a></div>';
                html += '</div>';
            }
            if (html==undefined)
                $('#thuvienanh').html('');
            else
                $('#thuvienanh').html(html);
        }
    });
}

function ThongtinBVien() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/thongtinbenhvien',
        success: function (data) {
            var arr = data.benhvien_tenbenhvien.trim().split(' ');
            var html_logo;
            html_logo += '<img class="img-responsive" src="' + data.benhvien_logo + '" style="height: 110px; margin: 3px;" />';
            $('.bv-logo').html(html_logo.replace('undefined', ''));

            var html_name;
            html_name += '<h3 style="font-weight: bold; color: #ff0000;">' + arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[3] + ' ' + '</h3>';
            if (arr.length < 8) {
                html_name += '<h3 style="font-weight: bold; color: #ff0000; margin-top: -5px; ">' + arr[4] + ' ' + arr[5] + ' ' + arr[6] + ' ' + '</h3>';
            } else {
                html_name += '<h3 style="font-weight: bold; color: #ff0000; margin-top: -5px; ">' + arr[4] + ' ' + arr[5] + ' ' + arr[6] + ' ' + arr[7] + ' ' + '</h3>';
            }

            $('.bv-name').html(html_name.replace('undefined', ''));

            var html_logo_footer;
            html_logo_footer += '<a href="#">';
            html_logo_footer += '<img class="img-responsive" src="' + data.benhvien_logo + '" style="height: 100px; vertical-align: central; margin: 0px auto;" />';
            html_logo_footer += '</a>';
            $('.bv-logo-footer').html(html_logo_footer.replace('undefined', ''));

            $('#bv-slogan').text(data.benhvien_slogan);

            $('.bv-capcuu').html(data.benhvien_capcuu);
            $('.bv-hotline').html(data.benhvien_hotline);

            var html_footer;
            html_footer += '<h4><b>' + data.benhvien_tenbenhvien + '</b></h4>';
            html_footer += '<div>' + data.benhvien_diachi + '</div>';
            html_footer += '<div>Tel: ' + data.benhvien_dienthoai + '. Fax: ' + data.benhvien_fax + '</div>';
            html_footer += '<div>Email: ' + data.benhvien_email + '</div>';
            $('.bv-footer').html(html_footer.replace('undefined', ''));

            var html_lenhe;
            html_lenhe += '<li>Địa chỉ: ' + data.benhvien_diachi + '</li>';
            html_lenhe += '    <li>Điện thoại: ' + data.benhvien_dienthoai + '</li>';
            html_lenhe += '    <li>Email: ' + data.benhvien_email + '</li>';
            $('.bv-lienhe').html(html_lenhe.replace('undefined', ''));
        }
    });
}

function RightContent_ThuVienAnh() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/tintuc?phanloai=7&pagesize=5',
        success: function (data) {
            var html1;
            html1 += '<img class="img-responsive" style="width: 100%"  src="' + data[0].tintuc_image + '" />';
            $('#thuvienanh-rightcontent').html(html1.replace('undefined', ''));
        }
    });
}


function Danhmuc_Phacdodieutri() {
    $.ajax({
        type: 'GET',
        url: '/api/benhvienapi/danhmuc_phacdodieutri',
        success: function (data) {
            var html;
            $.each(data, function (index, value) {
                html += '<li><a href="/yhoc/phacdodieutri/' + value.chuyenkhoa_id + '">' + value.chuyenkhoa_name + '</a></li>';
            });

            $('#category-phacdodieutri-nav').html(html.replace('undefined', ''));
        }
    });
}

$(document).ready(function () {
    ThongtinBVien();
    RightContent_ThuVienAnh();
    Danhmuc_Phacdodieutri();
    //Suckhoe();

    if ($('.pagename').data('page') == 'hoidap') {
        $('.btn-view-result').click(function () {
            $.ajax({
                type: 'GET',
                url: '/api/benhvienapi/viewhoidap?id=' + $('.btn-view-result').data('id'),
                success: function (data) {
                    var html;
                    html += '<ul class="group-hoidap">';
                    html += '    <li>';
                    html += '        <img class="img-responsive" src="' + data.member_images + '" style="height: 55px; width: 55px" />';
                    html += '    </li>';
                    html += '    <li style="vertical-align: top;">';
                    html += '        <div>';
                    html += '            <div style="font-weight: bold; margin-top: 6px;"> BS.' + data.member_name + '</div>';
                    html += '            <div style="font-size: 12px;">' + data.member_ngaytraloi + '</div>';
                    html += '        </div>';
                    html += '    </li>';
                    html += '</ul>';
                    html += '<div style="margin-bottom: 5px;">';
                    html += '        <p>Chào bạn</p>';
                    html += '        <p>' + data.homthu_bacsi_giaidap + '</p>';
                    html += '</div>';

                    $('#popupview-centent').html(html.replace('undefined', ''));
                }
            });

            $('#popupView').modal('show');
        });


        $('.btn-view-detail').click(function () {
        });
    }
});
