/* (c) 2009 Staffan Olsson optime.se */

$().ready( function() {
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
	$('#selection input').change(function() {
		var options = {};
		$('#selection input').each(function() {
			var f = $(this).removeClass('invalid');
			var v = f.val();
			if (!v) f.addClass('invalid');
			options[f.attr('name')] = parseInt(v);
		});
		if (options.to < options.from) $('#selection from, #selection to').addClass('invalid');
		if ($('#selection input.invalid').size() == 0) slump_selection(options);
	} );
	$('#selection input:first').trigger('keyup').trigger('change');
} );

$().ready( function() {
	$('input.result').mouseover( function() {
		this.select();
	} );
} );

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
	s.sort();
	for (i in s) {
		var n = s[i];
		$('<li/>').text(n).appendTo(list);
	}
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

