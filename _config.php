<?php

// You need this file if you don't have anything in the _config folder. If that folder exists
// and is not empty then you can delete this file.

use LoveDuckie\SilverStripe\Markdown\Shortcodes\MarkdownImageShortcodeProvider;
use SilverStripe\Assets\Shortcodes\FileShortcodeProvider;
use SilverStripe\Assets\Shortcodes\ImageShortcodeProvider;
use SilverStripe\View\Parsers\ShortcodeParser;

ShortcodeParser::get('default')
    ->register('image', [ImageShortcodeProvider::class, 'handle_shortcode'])
    ->register('image_link', [MarkdownImageShortcodeProvider::class, 'handle_shortcode'])
    ->register('file_link', [FileShortcodeProvider::class, 'handle_shortcode']);
