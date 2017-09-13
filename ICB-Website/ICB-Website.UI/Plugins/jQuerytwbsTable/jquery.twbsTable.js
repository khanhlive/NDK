/// <reference path="../twbsPagination/jquery.twbsPagination.js" />
(function ($) {
	var TwbsTable = function () {
		this.test();
	};

	TwbsTable.prototype = {
		constructor: TwbsTable,

		test: function () {
			console.log(this);
		}
	};
	$.fn.twbsTable = function () {
		$this = $(this);
		//console.log($this.prop('tagName'));
		
		$this.twbsPagination({
			totalPages: 1,
			visiblePages: 5,
			onPageClick: function (event, page) {
				console.log(page);
			}
		});

	}

	
	$.fn.twbsTable.Constructor = TwbsTable;

})(jQuery);