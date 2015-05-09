(function($) {

	$.fn.tagcloud = function(options) {
		if(options.source == null || options.source == undefined){
			options.source=options;
		}
		
		var opts = $.extend({}, $.fn.tagcloud.defaults, options);
		var container = this;
		var source = opts.source;
		this.addClass("tagcloud");
		$.each(source, function(idx, obj) {
			var span = $(document.createElement("span"));
			span.text(obj.name);
			span.css("font-size", (obj.weight * opts.weightage) + "%");
			container.append(span);
			span.after(" ");
		});
		return this;
	};

	
	$.fn.tagcloud.defaults = {
			weightage:2
	};

}(jQuery));