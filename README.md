# Client Side Table Pagination

### What is this?
Client Side Table Pagination is a JQuery plugin that provides an easy-to-use, simple method to paginate your HTML table. This plugin included some customizable features like pagination color, pagination style, table fade in duration and jump page.
#### :link: Demo: [Usage Examples](https://wxtan2.github.io/Client-Side-Table-Pagination)

## Quick Start
Add JQuery and table pagination into your project:

```html
<head>
    <script src="jquery.min.js"></script>
    <script src="table-pagination.js"></script>
</head>
```
### CDN
or load the required scripts via CDN:

```html
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/wxtan2/Client-Side-Table-Pagination/table-pagination.js"></script>
</head>
```

### Example Usage
Add an id to the table you wish to paginate:

```html
<table id="tableTest">
    <!-- Your Table Content Here -->
</table>
```

### Plugin Initialization
Add the following to the page head or at the end of the body section of your page:

```html
<script>
    $('#tableTest').createTablePagination();
</script>
```

You may also add optional parameters:

```html
<script>
    $('#tableTest').createTablePagination({
        rowPerPage: 20,
        paginationColor: '#6f7ad7',
        fontColor: '#555555',
        paginationStyle: 'borderless',
        transitionDuration: 300,
        jumpPage: true
    });
</script>
```
## Parameter

- `rowPerPage` _number_ | Default value: 10. - the number of row to display in each page of table
- `paginationColor` _string_ | Default value: '#6f7ad7'. - the display color of paigination active
- `fontColor` _string_ | Default value: '#555555'. - the display color of paigination font and border
- `paginationStyle` _string_ | Default value: 'borderless'. - set to 'bordered' to add the border styling to the pagination
- `transitionDuration` _number_ | Default value: 200. - the fade in time (in milliseconds) when next page appear
- `jumpPage` _boolean_ | Default value: false. - set to true to enable the jump page function
