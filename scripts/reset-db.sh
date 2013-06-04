#!/bin/sh

# Reset the site database
echo "db.dropDatabase(); db.aposPages.insert([{ slug: '/', _id: '4444444444444', path: 'home', title: 'Home', level: 0, type: 'home' }, { slug: '/search', _id: 'search', orphan: true, path: 'home/search', title: 'Search', level: 1, type: 'search', rank: 9998 }, { slug: '/trash', _id: 'trash', path: 'home/trash', title: 'Trash', level: 1, trash: true, type: 'trash', rank: 9999 }]);" | mongo apostrophe-sandbox
