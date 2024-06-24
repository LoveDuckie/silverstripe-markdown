<?php
namespace LoveDuckie\SilverStripe\Markdown\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class MarkdownFieldExtension extends Extension
{
    public function init()
    {
        Requirements::javascript('loveduckie/silverstripe-markdown:client/dist/bundle.min.js');
        Requirements::css('loveduckie/silverstripe-markdown:client/dist/bundle.min.css');
    }
}
