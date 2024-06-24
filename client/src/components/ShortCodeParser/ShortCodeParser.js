const util = require('util');

const SHORTCODE_ATTRS =
  /(\s+([a-z0-9\-_]+|([a-z0-9\-_]+)\s*=\s*([a-z0-9\-_]+|\d+\.\d+|'[^']*'|"[^"]*")))*/
    .toString()
    .slice(1, -1);
const SHORTCODE_SLASH = /\s*\/?\s*/.toString().slice(1, -1);
const SHORTCODE_OPEN = /\[\s*%s/.toString().slice(1, -1);
const SHORTCODE_RIGHT_BRACKET = '\\]';
const SHORTCODE_CLOSE = /\[\s*\/\s*%s\s*\]/.toString().slice(1, -1);
const SHORTCODE_CONTENT = /(.|\n|)*?/.toString().slice(1, -1);
const SHORTCODE_SPACE = /\s*/.toString().slice(1, -1);

class ShortCodeParser {
  construct() {
    this.shortCodes = {};
  }

  registerShortCode(key, callback) {
    this.shortCodes[key] = callback;
  }

  typecast(val) {
    val = val.trim().replace(/(^['"]|['"]$)/g, '');
    if (/^\d+$/.test(val)) {
      return parseInt(val, 10);
    } else if (/^\d+\.\d+$/.test(val)) {
      return parseFloat(val);
    } else if (/^(true|false)$/.test(val)) {
      return val === 'true';
    } else if (/^undefined$/.test(val)) {
      return undefined;
    } else if (/^null$/i.test(val)) {
      return null;
    } else {
      return val;
    }
  }

  closeTagString(name) {
    return /^[^a-z0-9]/.test(name)
      ? util.format('[%s]?%s', name[0].replace('$', '\\$'), name.slice(1))
      : name;
  }

  parseShortcode(name, buf, inline) {
    let regex;
    let match = null;
    let attr = {};

    if (inline) {
      regex = new RegExp(
        `^${util.format(
          SHORTCODE_OPEN,
          name
        )}${SHORTCODE_ATTRS}${SHORTCODE_SPACE}${SHORTCODE_SLASH}${SHORTCODE_RIGHT_BRACKET}`,
        'i'
      );
    } else {
      regex = new RegExp(
        `^${util.format(
          SHORTCODE_OPEN,
          name
        )}${SHORTCODE_ATTRS}${SHORTCODE_SPACE}${SHORTCODE_RIGHT_BRACKET}`,
        'i'
      );
    }
    match = buf.match(regex);
    while (match !== null) {
      const key = match[3] || match[2];
      const val = match[4] || match[3];
      const pattern = match[1];
      if (pattern) {
        const idx = buf.lastIndexOf(pattern);
        attr[key] = val !== undefined ? this.typecast(val) : true;
        buf = buf.slice(0, idx) + buf.slice(idx + pattern.length);
      } else {
        break;
      }
      match = buf.match(regex);
    }

    attr = Object.keys(attr)
      .reverse()
      .reduce((prev, current) => {
        prev[current] = attr[current];
        return prev;
      }, {});

    buf = buf
      .replace(regex, '')
      .replace(
        new RegExp(util.format(SHORTCODE_CLOSE, this.closeTagString(name))),
        ''
      );

    return {
      attr,
      content: inline ? buf : buf.replace(/(^\n|\n$)/g, ''),
    };
  }

  parse(plainText) {
    for (const name in this.shortCodes) {
      const regex = {
        wrapper: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_RIGHT_BRACKET +
            SHORTCODE_CONTENT +
            util.format(SHORTCODE_CLOSE, this.closeTagString(name)),
          'gi'
        ),
        inline: new RegExp(
          util.format(SHORTCODE_OPEN, name) +
            SHORTCODE_ATTRS +
            SHORTCODE_SLASH +
            SHORTCODE_RIGHT_BRACKET,
          'gi'
        ),
      };

      let matches = plainText.match(regex.wrapper);

      if (matches) {
        for (let m, data, i = 0, len = matches.length; i < len; i++) {
          m = matches[i];
          data = this.parseShortcode(name, m);
          plainText = plainText.replace(
            m,
            this.shortCodes[name].call(null, data.content, data.attr)
          );
        }
      }

      matches = plainText.match(regex.inline);
      if (matches) {
        let m = null;
        m = matches.shift();
        while (m !== undefined) {
          const data = this.parseShortcode(name, m, true);
          plainText = plainText.replace(
            m,
            this.shortCodes[name].call(null, data.content, data.attr)
          );
          m = matches.shift();
        }
      }
    }

    return plainText;
  }
}

ShortCodeParser.prototype.shortCodes = {};

export default ShortCodeParser;
