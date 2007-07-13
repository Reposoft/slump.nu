

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
} );

$().ready( function() {
	$('input.result').mouseover( function() {
		this.select();
	} );
} );

function slump_number(below) {
	return Math.floor(Math.random() * below);
};

function slump_string(length) {
	var readable = '23456789abcdefghijkmnpqrstuwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
	var s = '';
	for (i=0; i<length; i++) s += readable.charAt(slump_number(readable.length));
	return s;
};
