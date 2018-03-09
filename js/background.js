chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab) {
	const msg = {
		init: true,
		txt: '',
	};
	chrome.tabs.sendMessage(tab.id, msg);
}
