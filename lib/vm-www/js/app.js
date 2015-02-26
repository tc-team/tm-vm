window.addEventListener('WebComponentsReady', function() {
		
    var t = document.querySelector('template');
    var router = document.querySelector('app-router');

    router.addEventListener('state-change', function(event) {
    	if (!t.isSession && event.detail.path !== '/login') {
          event.preventDefault();
          router.go('/login');
        }
    });
    
    router.addEventListener('before-data-binding', function(event) {  		
  		event.detail.model.isSession = t.isSession;
    });

});