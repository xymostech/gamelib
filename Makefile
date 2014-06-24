.PHONY: help install serve doc-serve doc

help:
	echo "Use one of the following targets: install serve doc-serve doc"

install:
	npm install

serve:
	node server.js

doc-serve:
	./node_modules/.bin/yuidoc --server 9877

doc:
	./node_modules/.bin/yuidoc
