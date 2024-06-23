<?php
/**
 * Created by PhpStorm.
 * User: Nivanka Fonseka
 * Date: 24/09/2017
 * Time: 00:02
 */

namespace LoveDuckie\SilverStripe\Markdown\extensions;

use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Forms\HTMLEditor\HTMLEditorField;

use LoveDuckie\SilverStripe\Markdown\Database\MarkdownText;
use LoveDuckie\SilverStripe\Markdown\Forms\MarkdownEditorField;

class MarkdownDataObjectExtension extends DataExtension
{
    /**
     * @param FieldList $fields
     */
    public function updateCMSFields(FieldList $fields)
    {
        $injectorConfig = Config::inst()->get(Injector::class, 'HTMLText');

        if (!$injectorConfig || !array_key_exists('class', $injectorConfig) || $injectorConfig['class'] !== MarkdownText::class) {
            return false;
        }

        foreach ($fields->dataFields() as $field) {
            if ($field instanceof HTMLEditorField) {
                $name = $field->name;
                $title = $field->title;
                $description = $field->description;
                $attributes = $field->attributes;

                $rows = 30;

                if (array_key_exists('rows', $attributes)) {
                    $rows = $attributes['rows'];
                }

                $markdownField = MarkdownEditorField::create($name, $title)
                    ->setDescription($description)
                    ->setRows($rows);

                $fields->replaceField($name, $markdownField);
            }
        }
    }
}
