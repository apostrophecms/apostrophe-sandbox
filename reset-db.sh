#!/bin/sh

# Reset the site database
echo "db.dropDatabase(); db.aposPages.insert({ slug: '/', _id: '4444444444444', path: 'home', title: 'Home', level: 0, type: 'home' });" | mongo 'apostrophe-sandbox'
