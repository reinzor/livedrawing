CLOSURE=compiler

#
# JS COMPILE
#
qr.js: qrcapacitytable.js qrcode.js qrcode-draw.js
	${CLOSURE} --compilation_level ADVANCED_OPTIMIZATIONS --js qrcapacitytable.js --js qrcode.js --js qrcode-draw.js --js_output_file qr.js

pretty: qr.js
	${CLOSURE} --compilation_level ADVANCED_OPTIMIZATIONS --formatting PRETTY_PRINT --js qrcapacitytable.js --js qrcode.js --js qrcode-draw.js --js_output_file qr.js

clean:
	rm -fv qr.js

.PHONY: pretty clean