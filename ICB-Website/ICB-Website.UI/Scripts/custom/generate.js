$(document).ready(function () {
    var session = '@HttpContext.Current.Session["departFlightID"]';
    $('#area_account').val(session);
});