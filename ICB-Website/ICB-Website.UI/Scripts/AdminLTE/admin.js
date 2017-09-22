$(document).ready(function () {
    var controller = $('div[data-controller]').attr('data-controller');
    var sideBar = $('#main-menu');
    sideBar.find('li.active').removeClass('active');
    if (controller) {
       var a = sideBar.find('a[data-nav=' + controller + ']'); AddClassActive(a);
    }
    
});

function AddClassActive(a) {
    var lis = $('#main-menu li').has(a);
    $.each(lis, function (index, element) {
        $(element).addClass('active');
    });
}