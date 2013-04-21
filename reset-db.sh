#!/bin/sh

# Reset the site database
echo "db.dropDatabase(); db.aposPages.insert({ slug: '/', _id: '4444444444444', path: 'home', title: 'Home', level: 0, type: 'home' }, { slug: '/trash', _id: 'trash', path: 'home/trash', title: 'Trash', level: 1, trash: true, type: 'trash', rank: 9999 });" | mongo apostrophe-sandbox
