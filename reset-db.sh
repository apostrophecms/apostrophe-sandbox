#!/bin/sh

# Reset the site database 
echo "db.dropDatabase(); db.aposPages.insert({ slug: '/', path: 'home', title: 'Home', level: 0, type: 'home' });" | mongo apostrophe-sandbox
