module.exports = {
  sanitizeHtml: {
    allowedClasses: {
      '*': ['sb-richText-p', 'sb-richText-h1', 'sb-richText-h3']
    },
    allowedAttributes: {
      '*': ['style', 'href', 'target']
    },
    allowedTags: [ 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul',
    'ol', 'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br',
    'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre' ],
  }
}
