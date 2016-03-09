import $ from 'jquery';

/////////////////////////
// SWAG SIGNUP
/////////////////////////
$( "#loginformA" ).submit(function( event ) {
	console.log('submitting');
  console.log($("#agree").val());
});


/////////////////////////
// MODAL
/////////////////////////
$('.close-modal').click(function () {
	$('#modal').fadeOut(500);
});

/////////////////////////
// ANIMATION
/////////////////////////
const contentTypes = [
	{name:'bottleopener', direction:'UP'},
	{name:'coffeecups', direction: 'UP'},
	{name:'cozies', direction: 'DOWN'},
	{name:'cups', direction: 'UP'},
	{name:'purse', direction: 'DOWN'},
	{name:'rallytowel', direction: 'UP'},
	{name:'stickers', direction: 'DOWN'},
	{name:'sunglasses', direction: 'UP'},
	{name:'sweatshirt', direction: 'UP'},
	{name:'tshirt', direction: 'DOWN'},
	{name:'usb', direction: 'UP'},
	{name:'watch', direction: 'DOWN'},
	{name:'waterbottle', direction: 'DOWN'},
	{name:'wineopener', direction: 'UP'},
];

// takes string 'UP' or 'DOWN'
function setUpOrDown(upOrDown='UP') {
	if (upOrDown === 'UP') {
		$('.up').addClass('show');
		$('.down').removeClass('show');
	} else {
		$('.down').addClass('show');
		$('.up').removeClass('show');
	}
}

if ($('#animation').length !== 0) {
	const typeAmount = contentTypes.length;
	let currContent = 0;

	window.setInterval(() => {
		currContent = currContent === typeAmount - 1 ? 0 : currContent + 1;
		setUpOrDown(contentTypes[currContent].direction);
		$('.content-type').attr('src','/images/' + contentTypes[currContent].name + '.svg');
	}, 2000);
}


/////////////////////////
// SWAG TYPES
/////////////////////////
$('#swag-types li').click(function() {
	$(this).toggleClass('selected');
	var cat = $('#swag-types li.selected').map(function() {
		return $(this).attr('data-type');
	}).get();
	$('#modal .content span').html(`"${cat}"`);
	$('form input').val(cat);
});

$('#swag-types-submit').click(function() {
	$('form').submit();
});


/////////////////////////
// SWAG TICKET RETURN
/////////////////////////
$(function() {
	$('select').hide();
});

$('#ticket-return li').click(function() {
	$('#ticket-return li').removeClass('selected');
	$(this).addClass('selected');
	$('select').hide();
	var clsname = Array.prototype.filter.call(this.classList, function(c) { return c.indexOf('tier') == 0; })[0];
	$('select.' + clsname).show();
});

$('button').click(function (){
	$('#modal').fadeIn(500);
});

$('#swag-ticket-submit').click(function() {
	$('input').val($('select:visible').val());
	$('form').submit();
});
