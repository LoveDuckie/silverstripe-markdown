<?php
namespace LoveDuckie\SilverStripe\Markdown\extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

class MarkdownFieldExtension extends Extension
{
    public function init()
    {
        Requirements::javascript('silverstripers/markdown:client/dist/bundle.min.js');
        Requirements::css('silverstripers/markdown:client/dist/bundle.min.css');
    }
}
