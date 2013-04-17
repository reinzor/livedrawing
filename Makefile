#
# JS COMPILE
#
bootstrap-js: public/js/bootstrap.min.tmp.js public/js/bootstrap.js

public/js/bootstrap.min.tmp.js public/js/bootstrap.js: public/js/*.js
	cat public/js/bootstrap-transition.js public/js/bootstrap-alert.js public/js/bootstrap-button.js public/js/bootstrap-carousel.js public/js/bootstrap-collapse.js public/js/bootstrap-dropdown.js public/js/bootstrap-modal.js public/js/bootstrap-tooltip.js public/js/bootstrap-popover.js public/js/bootstrap-scrollspy.js public/js/bootstrap-tab.js public/js/bootstrap-typeahead.js public/js/bootstrap-affix.js > public/js/bootstrap.js
	./node_modules/.bin/uglifyjs --stats public/js/bootstrap.js > public/js/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" > public/js/copyright.js
	cat public/js/copyright.js public/js/bootstrap.min.tmp.js > public/js/bootstrap.min.js
	rm public/js/copyright.js public/js/bootstrap.min.tmp.js

#
# CLEANS THE ROOT DIRECTORY OF PRIOR BUILDS
#

clean:
	rm -fv public/js/bootstrap.js public/js/bootstrap.min.js

.PHONY: bootstrap-js