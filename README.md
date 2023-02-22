# MultiSelectField

A drag & drop sortable select field for managing many-to-many relations.

Inspired by https://github.com/kinglozzer/silverstripe-multiselectfield which breaks in SilverStripe `4.12+`

![field](images/field.png)

## Installation:

### Composer:

```bash
$ composer require arillo/silverstripe-multiselectfield
```

### Download:

Simply clone or download this repository and put it in a folder called 'multiselectfield' in your SilverStripe installation folder, then run `dev/build`.

### Example:

The field currently only supports many-to-many relations. The constructor requires an argument for a field to sort on, which you need to define in your `$many_many_extraFields`.

The following is an example of how to use `MultiSelectField` in a simple many-to-many relationship with a "Sort" extra field:

```php
use Arillo\MultiSelectField\MultiSelectField;

class Department extends DataObject
{
    private static $db = [
        'Name' => 'Varchar',
    ];

    private static $many_many = [
        'StaffMembers' => 'StaffMember',
    ];

    private static $many_many_extraFields = [
        'StaffMembers' => [
            'Sort' => 'Int',
        ],
    ];

    /**
     * @return FieldList
     */
    public function getCMSFields()
    {
        $fields = parent::getCMSFields();

        $staffField = MultiSelectField::create(
            'StaffMembers',
            'Staff members',
            $this,
            'Sort'
        );
        $fields->addFieldToTab('Root.Main', $staffField);

        return $fields;
    }
}
```

```php
class StaffMember extends DataObject
{
    private static $db = [
        'Name' => 'Varchar',
    ];

    private static $many_many = [
        'Departments' => 'Department',
    ];
}
```
