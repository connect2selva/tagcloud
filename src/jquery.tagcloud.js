(function($) {

	$.fn.tagcloud = function(options) {
		if(options.source == null || options.source == undefined){
			options.source=options;
		}
		
		var opts = $.extend({}, $.fn.tagcloud.defaults, options);
		var container = this;
		var source = $.isFunction(opts.source)?opts.source():opts.source;
		var maxVal = 0;
		var r = 0;
		if(opts.colors){
			var colorCount = opts.colors.length;
			if(colorCount>0 && colorCount<100){
				r = 100/colorCount;
			}
		}
		
		this.addClass("tagcloud");
		$.each(source, function(idx, obj) {
			if($.isNumeric(obj.weight) && Number(obj.weight)>maxVal){
				maxVal = Number(obj.weight);
			}
		});
		
		$.each(source, function(idx, obj) {
			
			var span = $(document.createElement("span"));
			var per = (obj.weight/maxVal)*100;
			var color = getColor(per,r);
			var css = {};
			css["font-size"] = (((obj.weight/maxVal)*100) * opts.weightage) + "%"; 
			if(color){
				css["color"] = color;
			}
			if(opts.handlers){
				$.each(opts.handlers,function(key, value){
					span.bind(key,value);
				});
			}
			
			if(obj.link != undefined){
				var link = $(document.createElement("a"));
				link.attr("href", obj.link);
				link.text(obj.name);
				
				$.each(css,function(key, value){
					link.css(key,value);	
				});
				
				span.append(link);
			}else{
				span.text(obj.name);
				$.each(css,function(key, value){
					span.css(key,value);	
				});
			}
			
			
			container.append(span);
			span.after(" ");
		});
		
		function getColor(per,r){
			var range = 0;
			var colors = opts.colors;
			if(colors && r && per){
				for(var i=0;i<colors.length;i++){
					if(per>range && per<=(range+r)){
						return colors[i];
					}else{
						range += r;
					}
				}
			}
		}
		
		return this;
	};

	
	$.fn.tagcloud.defaults = {
			weightage:5
	};

}(jQuery));