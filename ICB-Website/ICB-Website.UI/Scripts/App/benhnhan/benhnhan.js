
///Hàm so sánh ngày
///return 1: nếu date1 >=date2
///return -1: nếu date1 <date2
function CompareDate(date1, date2) {
    var result = 1;

    if ((date1 != '' && date2 != '') && (date1 != undefined || date2 != undefined)) {
        var dtNgay1 = moment(date1 + ' 23:59:59', "DD/MM/YYYY HH:mm:ss");
        var dtNgay2 = moment(date2 + ' 00:00:00', "DD/MM/YYYY HH:mm:ss");
        if ((dtNgay1._d.getTime() - dtNgay2._d.getTime()) < 0) {
            result = -1;
        } else {
            result = 1;
        }
    }

    return result;
}

///Hàm Convert ngày sinh
function Convert_Ngaythang(date) {
    var d1 = date;
    var kq = '';
    switch (d1.length) {
        case 10: kq = d1;
            break;
        case 9: var str1 = d1.split('/');
            if (parseInt(str1[0]) < 10) {
                kq += '0' + str1[0] + '/';
            } else kq += str1[0] + '/';
            if (parseInt(str1[1]) < 10) {
                kq += '0' + str1[1] + '/';
            } else kq += str1[1] + '/';
            kq += str1[2];
            break;
        case 8: var str1 = d1.split('/');
            if (parseInt(str1[0]) < 10) {
                kq += '0' + str1[0] + '/';
            } else kq += str1[0] + '/';
            if (parseInt(str1[1]) < 10) {
                kq += '0' + str1[1] + '/';
            } else kq += str1[1] + '/';
            kq += str1[2];
            break;
        case 6: var str1 = d1.split('/');
            kq += '01/01/'
            kq += str1[2];
            break;
        case 4: kq = '01/01/' + d1;
            break;
        case 0:
            break;
        default:

    }
    return kq;
}

///Hàm tính tuổi
function XP_Tinhtuoi(date) {
    var tuoi = 0;
    switch (date.length) {
        case 10:
            var currentDate = new Date();
            var dateTime = moment(date + currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds(), 'DD/MM/YYYY HH:mm:ss');
            var _dc = currentDate.getTime() - dateTime._d.getTime();
            tuoi = (_dc / (365 * 24 * 60 * 60 * 1000));
            break;
        case 4: tuoi = parseInt((new Date().getFullYear()) - parseInt(date));
            break;
    }
    return tuoi < 1 ? 1 : parseInt(tuoi);
}

///////////
$(document).ready(function () {
    //$('#txt_xp_sotheBHYT').inputmask();
    $('#btn-xp-test').click(function () {
        alert($('#txt_xp_sotheBHYT').val().replace(/-/gi, ''));
    });
    $('[data-mask]').inputmask();

    $('#txt_xp_hanbhtu').on(
        {
            'dp.change': function (e) {
                XP_HanBH_Tungay_changed(this);
            },
            'focusout': function () {
                if (true) {

                }
            }
        }
    )
    $('#txt_xp_hanbhden').on('dp.change', function (e) {
        XP_HanBH_Denngay_changed(this);
    })
    $('#txt_xp_ngayhm').on('dp.change', function (e) {
        XP_Baohiem_Hanmuc_changed(this);
    })

    $('#txt_xp_ngaysinh').change(function (e) {
        XP_Ngaysinh_changed(this);
    });

    $('#txt_xp_sotheBHYT').change(function () {
        XP_Sothe_changed(this);
    });
});


///Hàm kiểm tra: form là thêm mới bệnh nhân hay cập nhật bệnh nhân
function XP_IsThemBenhnhan() {
    if ($('.THEMMOI_BENHNHAN').length > 0) {
        return true;
    } else {
        return false;
    }
}

//////thay đổi hiển thị trường dữ liệu theo: Hình thức khám
function XP_DisplayUI_ByDTuong(ele) {
    var dtbn = $(ele).val();
    if (dtbn) {
        var arrDTBN = dtbn.split(';');
        if (arrDTBN[1] == 0) {
            Init_HinhThucKham_ByDTuong('cbcs');
            //$('.object').removeAttr('hidden');
            $('.object').attr('hidden', 'hidden');
            $('.object-capcuu').removeClass('hidden-object');
        }
        else if (arrDTBN[1] == 1) {
            GetBVien_ByStatus();
            Init_HinhThucKham_ByDTuong('bhyt');
            //$('.object').attr('hidden', 'hidden');
            $('.object').removeAttr('hidden');
            $('.object-capcuu').removeClass('hidden-object');
        }
        else if (arrDTBN[1] == 2) {
            $('.object').attr('hidden', 'hidden');
            if (arrDTBN[2] == 'Khám tuyển') {
                Init_HinhThucKham_ByDTuong('ksk');
                $('.object-capcuu').addClass('hidden-object');
                $('.object-trieuchung').attr('hidden', 'hidden');
            }
            $('.object-htkham').removeAttr('hidden');
        }

        if (arrDTBN[3] == 'Nợ thẻ') {
            //$('.object').addClass('hidden-object');
            $('.object-nothe').removeClass('hidden-object');
        }
        else {
            $('.object-nothe').addClass('hidden-object');
        }
    }
}

///thay đổi trường dữ liệu theo: Hình thức khám
function XP_Init_HinhThucKham_ByDTuong(hinhthuckham) {

    if (hinhthuckham == 'dichvu') {
        $.ajax({
            type: 'GET',
            url: '/api/homeapi?hinhthuckham=bhyt',
            success: function (data) {
                var html;
                $.each(data, function (index, value) {
                    html += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });
                $('#cmb_xp_hinhthuckham').html(html.replace('undefined', ''));

                if ($('#txt_xp_noitru').val() === undefined)
                    $('#cmb_xp_hinhthuckham').val(0);
                else
                    $('#cmb_xp_hinhthuckham').val($('#txt_xp_noitru').val());
            }
        });

        if ($('#txt_xp_sotheBHYT').val()) {
            $('#txt_xp_sotheBHYT').val('blank');
            $('#txt_xp_madkkcb').val('blank');
            $('#txt_xp_hanbhtu').val('01/01/' + new Date().getFullYear());
            $('#txt_xp_hanbhden').val('31/12/' + new Date().getFullYear());
            $('#txt_xp_idperson').val(0);
            $('#txt_xp_madkkcb').val(0);
            $('#txt_xp_tenbv').val('blank');
        }
    }
    else if (hinhthuckham == 'ksk') {
        $.ajax({
            type: 'GET',
            url: '/api/homeapi?hinhthuckham=ksk',
            success: function (data) {
                var html;
                $.each(data, function (index, value) {
                    html += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });
                $('#cmb_xp_hinhthuckham').html(html.replace('undefined', ''));
                if ($('#txt_noitru').val() === undefined)
                    $('#cmb_xp_hinhthuckham').val(0);
                else
                    $('#cmb_xp_hinhthuckham').val($('#txt_noitru').val());
            }
        });

        if ($('#txt_xp_sotheBHYT').val()) {
            $('#txt_xp_sotheBHYT').val('blank');
            $('#txt_xp_madkkcb').val('blank');
            $('#txt_xp_hanbhtu').val('01/01/' + new Date().getFullYear());
            $('#txt_xp_hanbhden').val('31/12/' + new Date().getFullYear());
            $('#txt_xp_idperson').val(0);
            $('#txt_xp_madkkcb').val(0);
            $('#txt_xp_tenbv').val('blank');
        }
    }
    else if (hinhthuckham == 'bhyt' || hinhthuckham == 'cbcs') {
        $.ajax({
            type: 'GET',
            url: '/api/homeapi?hinhthuckham=bhyt',
            success: function (data) {
                var html;
                $.each(data, function (index, value) {
                    html += '<option value="' + value.Value + '">' + value.Text + '</option>';
                });
                $('#cmb_hinhthuckham').html(html.replace('undefined', ''));
                if ($('#txt_xp_noitru').val() === undefined)
                    $('#cmb_xp_hinhthuckham').val(0);
                else
                    $('#cmb_xp_hinhthuckham').val($('#txt_xp_noitru').val());
            }
        });

        if ($('#txt_xp_sotheBHYT').val()) {
            $('#txt_xp_sotheBHYT').val('blank');
            $('#txt_xp_madkkcb').val('blank');
            $('#txt_xp_hanbhtu').val('01/01/' + new Date().getFullYear());
            $('#txt_xp_hanbhden').val('31/12/' + new Date().getFullYear());
            $('#txt_xp_idperson').val(0);
            $('#txt_xp_madkkcb').val(0);
            $('#txt_xp_tenbv').val('blank');
        }
    }
}

///thay đổi tỉ lệ theo mức hưởng
function XP_BindingTile_ByMucHuong(mamuc) {
    $.ajax({
        type: 'POST',
        url: '/api/mucthanhtoanapi?mamuc=' + mamuc,
        data: { mamuc: mamuc },
        success: function (data) {
            $('#txt_xp_tyle').val(data);
        }
    });
}

///mức hưởng changed
function XP_Muchuong_changed(ele) {
    var value = $(ele).val();
    XP_BindingTile_ByMucHuong(value)
}


///mã khám chữa bệnh changed
function XP_MaKCB_Changed(ele) {
    $('#txt_kcb').val('');
    var ma_kcb = $('#txt_xp_madkkcb').val();
    if (Inputmask.isValid(ma_kcb, { 'mask': '99999' })) {
        XP_CheckNoiNgoaiTinh($('#txt_xp_sotheBHYT').val());

        $.ajax({
            type: 'GET',
            url: '/benhvien/getBenhvienById?mabv=' + ma_kcb,
            success: function (data) {

                if (data) {

                    if (data.success) {
                        XP_Check_DungTraiTuyen(data.data);
                        $('#txt_xp_tenbv').val(data.data.tenbv);
                        $('#txt_xp_madkkcb').data('valid', true);
                    } else {
                        show_warning('Mã ĐK KCB: "' + ma_kcb + '" chưa có trong danh mục');
                        $('#txt_xp_tenbv').val('');
                        $('#txt_xp_madkkcb').data('valid', false);
                    }

                }
            }
        });
    } else {
        $('#txt_xp_tenbv').val(''); $('#txt_xp_madkkcb').data('valid', false);
    }

}


///kiểm tra đúng tuyến, trái tuyến
function XP_Check_DungTraiTuyen(benhvien) {
    var mabv = GetProfileInfo().mabv;
    var hangbv = $('#txt-hang-bv').val();
    if ($('#ckb_capcuu').is(':checked'))
        $('#cmb_xp_tuyen').val(1);
    else {
        if (hangbv.toLowerCase() == 'd') {
            //tuyến xã
            if (benhvien.mabv.trim() == mabv) {
                $('#cmb_xp_tuyen').val(1);
            } else {
                $('#cmb_xp_tuyen').val(2);
            }
        } else if (hangbv.toLowerCase() == 'c') {
            if (benhvien.tuyenbv.trim().toLowerCase() == 'c') {
                //mã cơ sở là tuyến c
                if (benhvien.mabv.trim() == mabv) {
                    $('#cmb_xp_tuyen').val(1);
                } else {
                    $('#cmb_xp_tuyen').val(2);
                }
            } else if (benhvien.tuyenbv.trim().toLowerCase() == 'd') {
                //mã cơ sở là tuyến d
                if (benhvien.macq.trim() == mabv) {
                    $('#cmb_xp_tuyen').val(1);
                } else {
                    $('#cmb_xp_tuyen').val(2);
                }
            }
        } else {
            //bệnh viện tuyến huyện
            if (benhvien.macq.trim() == mabv) {
                $('#cmb_xp_tuyen').val(1);
            } else {
                $('#cmb_xp_tuyen').val(2);
            }
        }
    }
}


///Hàm kiểm tra nội ngoại tỉnh
function XP_CheckNoiNgoaiTinh(sothe) {
    var matinh = sothe.substring(5, 7);
    var mabv = GetProfileInfo().mabv;
    var makcb = $('#txt_xp_madkkcb').val();
    if (parseInt(matinh) == parseInt(mabv.toString().trim().substring(0, 2))) {
        if (makcb != '' && makcb != ' ') {
            if (makcb == mabv) {
                $('#cmb_noingoaitinh').val(1);
            }
            else
                $('#cmb_noingoaitinh').val(2);
        }
        else {
            if ($('#txt_xp_madkkcb').val() == mabv) {
                //console.log('txt_madkkcb = ' + $('#txt_madkkcb').val());
                $('#cmb_noingoaitinh').val(1);
            }
            else
                $('#cmb_noingoaitinh').val(2);
        }
    }
    else
        $('#cmb_noingoaitinh').val(3);
}

///Hàm kiểm tra hạn bảo hiểm: Từ ngày
function XP_HanBH_Tungay_changed(ele) {
    var hanBHtu = $(ele).val();
    var ngayHientai = getCurrentDate();
    var hanBHden = $('#txt_xp_hanbhden').val();
    var ngaysinh = $('#txt_xp_ngaysinh').val();
    var elementMessage = $(ele).closest('div').find('p.error-messages');
    var flag = true;
    if (!hanBHtu) {
        hanBHtu = '01/01/' + new Date().getFullYear();
        //hanBHtu.datetimepicker('update','01/01' + new Date().getFullYear());
        $(ele).val('01/01/2017');
        //$(ele).data("DateTimePicker").date(moment('01/01/' + (new Date().getFullYear()) + '00:00:00', 'DD/MM/YYYY HH:mm:ss'));

    }
    if (CompareDate(ngayHientai, hanBHtu) != 1) {
        elementMessage.text('Hạn thẻ BH từ ngày phải <= ngày hiện tại');
        //$(ele).focus();
        flag = false;
    } else {
        if (hanBHden) {
            if (CompareDate(hanBHden, hanBHtu) != 1) {
                elementMessage.text('Hạn thẻ BH từ ngày phải <= ngày hạn BH đến ngày'); flag = false;
            }
        }
        if (ngaysinh) {
            if (CompareDate(hanBHtu, ngaysinh) != 1) {
                elementMessage.text('Hạn thẻ BH từ ngày phải > ngày sinh'); flag = false;
            }
        }
    }
    if (flag) {
        elementMessage.text('');
    }
    //XP_HanBH_Denngay_changed($('#txt_xp_hanbhden'));
    //XP_Baohiem_Hanmuc_changed($('#txt_xp_hanbhtu'));
    //XP_Ngaysinh_changed($('#txt_xp_ngaysinh'));
    //XP_HanBH_Tungay_changed($('#txt_xp_hanbhtu'));
}

///Hàm kiểm tra thông tin ngày hạn bảo hiểm đến ngày
function XP_HanBH_Denngay_changed(ele) {
    var hanBHden = $(ele).val();
    var ngayHientai = getCurrentDate();
    var hanBHtu = $('#txt_xp_hanbhtu').val();
    var ngaysinh = $('#txt_xp_ngaysinh').val();
    var elementMessage = $(ele).closest('div').find('p.error-messages');
    var flag = true;
    if (!hanBHden) {
        hanBHden = '31/12/' + new Date().getFullYear();
        $(ele).val('31/12/2017');
        //hanBHden.datetimepicker('update','30/12/' + new Date().getFullYear());
        // $(ele).data("DateTimePicker").date(moment('31/12/' + (new Date().getFullYear()) + '00:00:00', 'DD/MM/YYYY HH:mm:ss'));
    }
    if (CompareDate(hanBHden, ngayHientai) != 1) {
        elementMessage.text('Thẻ bảo hiểm đã hết hạn');

        flag = false;
    } else {
        if (hanBHtu) {
            if (CompareDate(hanBHden, hanBHtu) != 1) {
                elementMessage.text('Hạn thẻ BH đến ngày phải >= ngày hạn BH từ ngày'); flag = false;
            }
        }
        if (ngaysinh) {
            if (CompareDate(hanBHden, ngaysinh) != 1) {
                elementMessage.text('Hạn thẻ BH đến ngày phải > ngày sinh'); flag = false;
            }
        }
    }
    if (flag) {
        elementMessage.text('');
    }
    //XP_HanBH_Denngay_changed($('#txt_xp_hanbhden'));
    //XP_Baohiem_Hanmuc_changed($('#txt_xp_hanbhtu'));
    //XP_Ngaysinh_changed($('#txt_xp_ngaysinh'));
    //XP_HanBH_Tungay_changed($('#txt_xp_hanbhtu'));


}


///Hàm kiểm tra ngày hạn mức
function XP_Baohiem_Hanmuc_changed(ele) {
    var ngayHanmuc = $(ele).val();
    var hanBHden = $('#txt_xp_hanbhden').val();
    var ngayHientai = getCurrentDate();
    var hanBHtu = $('#txt_xp_hanbhtu').val();
    var ngaysinh = $('#txt_xp_ngaysinh').val();
    var elementMessage = $(ele).closest('div').find('p.error-messages');
    var flag = true;
    if (ngayHanmuc && hanBHden && hanBHtu) {
        if (CompareDate(ngayHanmuc, hanBHtu) == 1 && CompareDate(hanBHden, ngayHanmuc) == 1) {

        } else {
            flag = false;
            elementMessage.text('Ngày hạn mức phải nằm trong thời hạn thẻ Bảo hiểm');
        }
    } else {
        if (!ngayHanmuc) {
            elementMessage.text('Chưa nhập ngày hạn mức thẻ bảo hiểm');
            flag = false;
        }
        if (!hanBHtu) {
            elementMessage.text('Chưa nhập ngày hạn thẻ BH'); flag = false;
        }
        if (!hanBHden) {
            elementMessage.text('Chưa nhập ngày hạn thẻ BH'); flag = false;
        }
    }
    if (flag) {
        elementMessage.text('');
    }
    //XP_HanBH_Denngay_changed($('#txt_xp_hanbhden'));
    //XP_Baohiem_Hanmuc_changed($('#txt_xp_hanbhtu'));
    //XP_Ngaysinh_changed($('#txt_xp_ngaysinh'));
    //XP_HanBH_Tungay_changed($('#txt_xp_hanbhtu'));
}

///Hàm kiểm tra ngày sinh
function XP_Ngaysinh_changed(ele) {
    var ngayHientai = getCurrentDate();
    var ngaysinh = $(ele).val();
    var elementMessage = $(ele).closest('div').find('p.error-messages');
    var flag = true;
    var arr = ['99/99/9999', '9/9/9999', '9/99/9999', '99/9/9999', '9999'];
    var f1 = false;
    $.each(arr, function (a, b) {
        if (Inputmask.isValid(ngaysinh, { 'mask': b })) {
            f1 = true;
            return false;
        }
    })

    console.log(f1);
    if (f1) {
        switch (ngaysinh.length) {
            case 10:
            case 9:
            case 8:
                ngaysinh = Convert_Ngaythang(ngaysinh);
                if (CompareDate(ngayHientai, ngaysinh) != 1) {
                    elementMessage.text('Ngày sinh phải <= ngày hiện tại');
                    flag = false;
                }
                break;
            case 4:
                if (parseInt(ngayHientai.substr(6, 4)) < parseInt(ngaysinh)) {
                    elementMessage.text('Ngày sinh phải <= ngày hiện tại');
                    flag = false;
                }
                break;
            default: elementMessage.text('Bó tay');
                flag = false;

        }

    } else {
        $('#txt_xp_tuoi').val('');
        elementMessage.text('Ngày sinh phải đúng định dạng');
        flag = false;
    }
    if (flag) {
        elementMessage.text('');
        $('#txt_xp_tuoi').val(XP_Tinhtuoi(ngaysinh));
    } else {
        $('#txt_xp_tuoi').val('');
    }
}

///Hàm kiểm tra số thẻ
function XP_Sothe_changed(ele) {
    var sothe = $(ele).val();
    var flag = true;
    var elementMessage = $(ele).closest('div').find('p.error-messages');
    var sq = new RegExp(/\w{2}-\d{1}-\d{2}-\d{2}-\d{3}-\d{5}/);
    if (sq.test(sothe)) {
        var str1 = sothe.split('-');
        var mh = parseFloat(str1[1]); ///lấy mức hưởng
        if (!isNaN(mh) && mh >= 1 && mh <= 4) {

            var doituong = $('#cmb_xp_doituong').val();
            var sothe = $('#txt_xp_sotheBHYT').val();
            GetBN_BySThe(sothe, doituong);
            $('#txt_xp_dtbn').val(doituong);

            $('#cmb_xp_doituong').val(doituong);
            $('#txt_xp_sotheBHYT').val(sothe.toUpperCase());

            XP_Check_MucTT_MaDTuong(sothe);
        } else {
            show_warning('Mức hưởng không đúng');
            $(this).focus();
        }

    } else {
        elementMessage.text('Số thẻ bảo hiểm y tế không chính xác');
        flag = false;
    }
}

///Hàm lấy mức thanh toán bằng mã thẻ
function XP_Check_MucTT_MaDTuong(sothe) {
    $.ajax({
        type: 'GET',
        url: '/api/danhmucapi/check_muctt?sothe=' + sothe.replace(/-/gi, ''),
        success: function (data) {
            //console.log('muctt=' + data);
            if (parseInt(data) > 1) {

                $.ajax({
                    type: 'GET',
                    url: '/api/danhmucapi/check_madtuong?sothe=' + sothe,
                    success: function (data) {
                        //console.log('madtuong=' + data);

                        if (parseInt(data) < 0) {
                            show_errmess('Mã đối tượng và mức hưởng không hợp lệ.');

                        }
                        else {
                            show_errmess('Mức hưởng không hợp lệ.');

                        }
                    }
                });
            }
            else {
                $.ajax({
                    type: 'GET',
                    url: '/api/danhmucapi/check_madtuong?sothe=' + sothe,
                    success: function (data) {
                        if (parseInt(data) < 0) {
                            show_errmess('Mã đối tượng không hợp lệ.');

                        }
                    }
                });
            }

        }
    });
}

///Hàm lấy thông tin bệnh nhân theo số thẻ
function XP_GetBN_BySThe(sothe, doituong) {
    $.ajax({
        type: 'GET',
        url: '/api/homeapi/check_sthe_bhyt?sthe=' + sothe,
        success: function (datas) {
            AllowWrite();
            if (datas == 1) {
                //var arrDTBN = doituong.split(';');
                $.ajax({
                    type: 'POST',
                    url: '/api/homeapi/post_getbhyt?sothebhyt=' + sothe + '&iddtbn=' + doituong,
                    data: { sothebhyt: sothe, iddtbn: doituong },
                    async: true,
                    success: function (data) {
                        $('#txt_xp_madkkcb').val(data.MaCS).trigger('change');
                        $('#txt_xp_tenbv').val(data.TenBenhVien);
                        $('#txt_xp_idperson').val(data.IDPerson);
                        $('#txt_xp_mabv').val(data.MaBV);
                        $('#txt_xp_hanbhtu').val(data.BHYT_TuNgay);
                        $('#txt_xp_hanbhden').val(data.BHYT_DenNgay);
                        $('#txt_xp_diachi').val(data.DChi);
                        $('#txt_xp_tenbn').val(data.TenBNhan);
                        var ngaysinh = (data.NgaySinh == null || data.NgaySinh == undefined) ? "" : data.NgaySinh.replace(' ', '');
                        $('#txt_xp_ngaysinh').val(ngaysinh);
                        //console.log('11:28 - 15/11/2016: ngaysinh = ' + data.NgaySinh.replace(' ', ''));
                        $('#txt_xp_kcb').val(data.MaKCB);

                        var ngayhm = '';
                        if (data.BHYT_NgayHM != '' && data.BHYT_NgayHM != undefined)
                            ngayhm = data.BHYT_NgayHM.replace('01/01/' + new Date().getFullYear(), '');

                        $('#txt_bhyt_ngayhm').val(ngayhm);
                        $('#txt_xp_ngayhm').val(ngayhm);
                        AutoFill_Information();

                        $('#cmb_xp_doituong').val(doituong);
                        $('#cmb_xp_muchuong').val(data.MucHuong);
                        console.log();
                        GetMucTT_ByMucHuong(data.MucHuong);

                        $('#cmb_xp_khuvuc').val(data.KhuVuc);
                        $('#txt_xp_kvuc').val(data.KhuVuc);
                        //debugger


                        $('#cmb_xp_noingoaitinh').val(data.NoiTinh);
                        $('#cmb_xp_hinhthuckham').val(data.NoiTru);
                        $('.cmb_xp_gioitinh').val(data.GTinh);

                    }
                });
            }
            else {
                Reset_DataInput();
                var muchuong = $('#txt_sotheBHYT').val().trim().substring(3, 2);
                $('#cmb_muchuong').val(muchuong);
                BindingTile_ByMucHuong(muchuong);
                CheckNoiNgoaiTinh(sothe);
            }
        }
    });
}

function AllowWrite() {
    $('#txt_xp_madkkcb').removeAttr('readonly');
    $('#txt_xp_tenbv').removeAttr('readonly');
    $('#txt_xp_idperson').removeAttr('readonly');
    $('#txt_xp_mabv').removeAttr('readonly');
    $('#txt_xp_hanbhtu').removeAttr('readonly');
    $('#txt_xp_hanbhden').removeAttr('readonly');
    $('#txt_xp_diachi').removeAttr('readonly');
    $('#txt_xp_ngayhm').removeAttr('readonly');
    $('#txt_xp_tenbn').removeAttr('readonly');
    $('#txt_xp_ngaysinh').removeAttr('readonly');

    $('#cmb_xp_muchuong').removeAttr('disabled');
    $('#cmb_xp_khuvuc').removeAttr('disabled');
    $('#cmb_xp_tuyen').removeAttr('readonly');
    $('#cmb_xp_noingoaitinh').removeAttr('disabled');
    $('#cmb_xp_hinhthuckham').removeAttr('disabled');
    $('#cmb_xp_doituong').removeAttr('disabled');
    $('.cmb_gioitinh').removeAttr('disabled');
}