(function inviteLikers() {
    var total = 1;
    var pages = 1;
	var count = 0;

    function random(min, max) {
        return Number(Math.floor(Math.random() * ((max * 1000) - (min * 1000) + 1)) + (min * 1000));
    }
	
	function showProgress(name) {
		count++;
		console.log(count + ' - ' + name + ' obdržel(a) pozvánku k označení stránky jako To se mi líbí.');
	}
    
    function inviteList() {
        var il = document.querySelectorAll('a[ajaxify^="/pages/post_like_invite/send/"]');
    
        if(il.length > 0) {
            for(var i = 0; i < il.length; i++) {
                var el = il[i];
                setTimeout(function(el) { showProgress(el.closest('li').querySelectorAll('a')[1].innerText); el.click(); }, total * random(1, 3), el);
                total++;
        
                if(total > 100) { console.log('Byl dosažen limit 100 pozvánek. Po jejich odeslání opakujte úlohu s odstupem několika hodin.'); break; }
            }
    
            console.log('Bude odesláno ' + (total - 1) + ' z ' + il.length + ' pozvánek. Muže to trvat až ' + ((total - 1) * 3) + ' vteřin.');
        } else {
            console.log('V seznamu nejsou lidé k odeslání pozvánky.');
        }
    }
    
    function loadMore() {
        var ll = document.querySelectorAll('a[href^="/ufi/reaction/profile/browser/fetch/?limit="]');
    
        if(ll.length > 0) {
            ll[0].click(); pages++;
            console.log('Načítám stránku #' + pages + '.');
            setTimeout(function() { loadMore(); }, random(3, 5));
        } else {
            inviteList();
        }
    }
    
    console.log('Skript byl spuštěn.');
    loadMore();
})();
