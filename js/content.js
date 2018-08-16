chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(request, sender, sendRequest) {
	var linksArr = [];

	function setFanficMarker(id, checkbox) {
		$.ajax({
		  type: "POST",
		  url: 'https://still-sands-62158.herokuapp.com/api/fanfics',
		  data: { id: id, email: "alexposm@gmail.com"},
		  success: function(request) {
		  	if (request && request.ficbookId) {
		  		checkbox.checked = true;
		  	} else {
		  		checkbox.checked = false;
		  	}
		  	filterByApi();
		  },
		  dataType: 'json',
		});
	}

	function filterByApi () {
		linksArr = [];
		$('.visit-link').each(function( index ) {
			var id = $(this).attr('href').match(/\d+/g)[0];
			linksArr.push(id);
		});

		$.ajax({
		  type: "POST",
		  url: 'https://still-sands-62158.herokuapp.com/api/fanfics/filter',
		  data: { ids: linksArr, email: "alexposm@gmail.com"},
		  success: function(request) {
		  	if (request && request.filteredIds) {
		  		clearListFromApi(request.filteredIds)
		  	}
		  },
		  dataType: 'json',
		});

		
	}

	function clearListFromApi (filteredIds) {
		$('article.block').closest('tr').each(function(index, element) {
			var id = Number($(element).attr('article-id'));
			if (filteredIds.indexOf(id) !== -1) {
				$(element).remove();
			}
		});
	}

	if (request.filter) {
		var filtersArr = request.data;
		var filtersString = '';
		if (filtersArr) {
			for (i = 0; i < filtersArr.length; i++) {
				filtersString += `strong:contains('${filtersArr[i].text}')${(i !== filtersArr.length - 1) ? ',' : ''}`;
			}
			$(filtersString).closest('tr').remove();
		}
		$(filtersString).closest('tr').remove();
		$('.fanfic-block-read').closest('tr').remove();

		$('article.block').each(function(index) {
			var id = $(this).find('.visit-link').attr('href').match(/\d+/g)[0];
			var $checkbox = $('<input style="position: absolute; top:10px; right: 20px; -webkit-transform: scale(2);" type="checkbox" />')
	
			$checkbox.attr('article-id', id);

			$(this).attr('article-id', id);
			$(this).closest('tr').attr('article-id', id);

			$checkbox.change(function() {
				setFanficMarker(id, this);	
			});
			$(this).append($checkbox);
		});

		filterByApi();
	}
}
