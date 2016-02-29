import $ from 'jquery';

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