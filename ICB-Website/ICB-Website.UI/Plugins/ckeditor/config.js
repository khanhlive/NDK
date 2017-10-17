/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.language = 'vi';
    // config.uiColor = '#AADC6E';
    config.height = 350;
    config.toolbar = 'Full';
    config.filebrowserBrowseUrl = '/Plugins/ckfinder/ckfinder.html';
    config.filebrowserImageBrowseUrl = '/Plugins/ckfinder/ckfinder.html?type=Images';
    config.filebrowserFlashBrowseUrl = '/Plugins/ckfinder/ckfinder.html?type=Flash';
    config.filebrowserUploadUrl = '/Plugins/ckfinder/connector.aspx?command=QuickUpload&type=Files';
    config.filebrowserImageUploadUrl = '/Plugins/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Images';
    config.filebrowserFlashUploadUrl = '/Plugins/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
    config.filebrowserWindowWidth = '1000';
    config.filebrowserWindowHeight = '700';

    //CKFinder.setupCKEditor(null, "/Plugins/ckfinder/");
    //FCKConfig.ProcessHTMLEntities = false;
};
