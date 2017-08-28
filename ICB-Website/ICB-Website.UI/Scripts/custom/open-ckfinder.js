$(document).ready(function () {
    var url = $(".image").val();
    $(".img-thumbnail").attr('src', url);
});


$("#browser").click(function () {
    var ckfinder = new CKFinder();
    ckfinder.selectActionFunction = function (url) {
        var decodedUri = decodeURIComponent(url);
        $(".img-thumbnail").attr('src', decodedUri);
        $(".image").val(decodedUri);
        $("#image-url").text(decodedUri);
        $("#images-url").text(decodedUri);
    }
    ckfinder.popup();
});

$("#browsers").click(function () {
    var ckfinder = new CKFinder();
    ckfinder.selectActionFunction = function (url) {
        $("#image-url").text(url);
        $("#images-url").text(url);
    }
    ckfinder.popup();
});

//var ckeditor = CKEDITOR.replace('news_content', {
//    customConfig: '/Plugins/ckeditor/config.js'
//});
