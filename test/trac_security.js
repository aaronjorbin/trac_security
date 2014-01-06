/* global jQuery, wp */

jQuery( function() {
	module( 'trac_security' );

	test( 'basic' , function(){
		equal( wp.trac_security.has_overlap('this string has words', ['string'] ) , true, 'strings that contain words we are looking for return true');
		equal( wp.trac_security.has_overlap('this string does not have words', ['foo'] ) , false, 'strings that do not contain words we are looking for return false');

	});


	test( 'quoted words', function(){
		equal( wp.trac_security.has_overlap('this "word" is in quotes', ['word'] ) , true, 'string in double quotes returns true');
	});


});
