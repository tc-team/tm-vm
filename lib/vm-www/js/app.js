function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
      if (window.location.hash === "") {
        window.location.hash = '/';          
      }
      
    } else {
        window.location.hash = '/login';
    }
}

checkCookie();

window.addEventListener("hashchange", checkCookie, false);



window.addEventListener('WebComponentsReady', function() {
		
    var t = document.querySelector('template');
    var router = document.querySelector('app-router');
    
    router.addEventListener('before-data-binding', function(event) {  		
  		event.detail.model.isSession = t.isSession;
    });

});