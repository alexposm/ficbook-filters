chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request, sender, sendRequest) {
	if (request.filter) {
		var filtersArr = request.data;
		var filtersString = '';
		if (filtersArr) {
			for (i = 0; i < filtersArr.length; i++) {	
				filtersString += `strong:contains('${filtersArr[i].text}')${(i !== filtersArr.length - 1) ? ',' : ''}`;
			}
			$(filtersString).closest('tr').remove();
		}
	}
}
