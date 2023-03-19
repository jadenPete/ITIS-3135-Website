#!/usr/bin/env python

import jinja2
import os

source_directory = os.path.dirname(os.path.realpath(__file__))
template_directory = os.path.join(source_directory, "templates")

environment = jinja2.Environment(loader=jinja2.FileSystemLoader(template_directory))

for path in environment.list_templates(
	filter_func=lambda path: os.path.basename(path) != "base.html"
):
	with open(path, "w") as file:
		file.write(environment.get_template(path).render())
