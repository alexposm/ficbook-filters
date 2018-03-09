var filters = filters || [];
$(document).ready(function() {
	for (i = 0; i < filters.length; i++) {
		var checkbox = `<input type="checkbox" id="${filters[i].value}" name="${filters[i].value}" value="${filters[i].text}" checked="true">`;
		var label = `<label for="${filters[i].value}" class="no-select">${filters[i].text}</label>`;
		var element = `<div class="filter-item">${checkbox}${label}</div>`;
		$('.filters-container').append(element);
	}
	$('#ficbookFilterBtn').on("click", function() {
		var values = []
		$('.filter-item>input[type=checkbox]').map(function() {
			if ($(this).is(':checked')) {
				values.push({ text: this.value, value: this.name });
			}
		});
		const msg = {
	  		filter: true,
			data: values,
		};
		const query = { active: true, currentWindow: true };
		chrome.tabs.query(query, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, msg);
			window.close();
		});
	});
});
