/* global wp */
window.wp = window.wp || {};

(function($) {
	wp.trac_security = {
		badwords : [
			'sql', 'trojan', 'rce', 'permissions', 'exploit', 'exploits', 'csrf', 'xss', 'sqli',
			'scripting', 'vulnerability', 'vulnerabilities', 'capability', 'capabilities', 'intrusion',
			'intrusions', 'cve', 'disclosure', 'hash', 'security', 'leakage', 'privilege', 'privileges',
			'compromise', 'escalation', 'injection', 'forgery', 'password', 'passwords'
		],

		intersect : function(a, b) {
			return $.grep(a, function(i) {
				return $.inArray(i, b) > -1;
			});
		},

		has_overlap : function(str, arr){
			var words = str.toLowerCase().replace(/[^a-z|\s]/g, '').split(' '),
				overlap = this.intersect( words, arr);

			return ( overlap.length !== 0 );
		}
	};

	function show_box(){
		// We have a potential problem here
		$('input[name="submit"]').prop('disabled', true);
		if ( $('#sec_question').length !== 0){
			// We've already created the checkbox
			$('#sec_question').show();
		} else {
			// We need to add the checkbox
			$('.buttons').before('<p id="sec_question"><label><input type="checkbox" name="sec_question" id="idontcare" />' +
				'&nbsp;I am not reporting a security issue</label></p>');
		}
	}

	function hide_box(){
		$('input[name="submit"]').prop('disabled', false);
		$('#sec_question').hide();
	}

	jQuery('#field-summary, #field-description, #field-keywords').on('keyup', function(){
		var entry = $(this).val();
		
		if ( wp.trac_security.has_overlap( entry, wp.trac_security.badwords ) ) {
			show_box();
		} else {
			hide_box();
		}
	});


	jQuery('#propertyform').on('change', '#idontcare', function(){
		if ( $(this).is(':checked') ) {
			$('input[name="submit"]').prop('disabled', false);
		} else {
			$('input[name="submit"]').prop('disabled', true);
		}
	});
	
}(jQuery));
