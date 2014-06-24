.PHONY: help install serve doc

help:
	echo "Use one of the following targets: install serve doc"

install:
	npm install

serve:
	node server.js

doc:
	./node_modules/.bin/yuidoc --outdir static/doc .
