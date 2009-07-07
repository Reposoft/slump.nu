/* (c) 2009 Staffan Olsson optime.se */

$().ready(function() {
	$('#selection input').keyup(function() {
		var options = {};
		$('#selection input').each(function() {
			var f = $(this).removeClass('invalid');
			var n = f.attr('name');
			var v = f.val();
			if (!v) f.addClass('invalid');
			options[n] = parseInt(v);
		});
		if (options.to < options.from) $('#selection from, #selection to').addClass('invalid');
		if ($('#selection input.invalid').size() == 0) slump_selection(options);
	} );
	$('#refresh').click(function() {
		slump_run();
	});
	slump_run();
} );

$().ready( function() {
	$('input.result').mouseover( function() {
		this.select();
	} );
} );

function slump_run() {
	$('span.slump_string').each( function() {
		$(this).text(slump_string($(this).attr('title').match(/(\d+)/)[1]));
	} );
	$('span.slump_number').each( function() {
		$(this).text(''+slump_number($(this).attr('title').match(/(\d+)/)[1]));
	} );
	$('input.slump_string').each( function() {
		$(this).val(slump_string($(this).attr('maxlength')));
	} );
	$('input.slump_number').each( function() {
		$(this).val(''+slump_number(Math.pow(10, $(this).attr('maxlength'))));
	} );
	$('#selection input:first').trigger('keyup').trigger('change');
}

function slump_number(below) {
	return Math.floor(Math.random() * below);
}

function slump_string(length) {
	var readable = '23456789abcdefghijkmnpqrstuwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
	var s = '';
	for (i=0; i<length; i++) s += readable.charAt(slump_number(readable.length));
	return s;
}

function slump_selection(options) {
	var defaults = {
		unique: true	
	};
	$.extend(options, defaults);
	var list = $('#selection .result').empty();
	if ((options.to - options.from) < options.hits) {
		$('#selection input').addClass('invalid');
		return;
	}
	var s = [];
	while (s.length < options.hits) {
		var n = slump_number(options.to - options.from + 1) + options.from;
		if (!options.unique || s.indexOf(n) == -1) s.push(n);
	}
	s.sort(function(a,b){return a-b;});
	for (i = 0; i < s.length; i++) {
		var n = s[i];
		$('<li/>').text(n).appendTo(list);
	}
}

if(!Array.indexOf){
    Array.prototype.indexOf = function(obj){
        for(var i=0; i<this.length; i++){
            if(this[i]==obj){
                return i;
            }
        }
        return -1;
    };
}

