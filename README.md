# Carousel Lite [![NPM version](https://badge.fury.io/js/carousel-lite.png)](https://www.npmjs.com/package/carousel-lite)

> Touch friendly. Incredibly small. Carousels the native way.

## Carousel Markup
Nothing more is needed than a simple list:
```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

## Carousel Styles
```css
ul {
    overflow: hidden;
    white-space: nowrap;
}

li {
    display: inline-block;
}
```

## Next/Previous Markup
The elements that you choose for your next/previous buttons can be anything, but here is an example:

```html
<button class="previous"></button>
<button class="next"></button>
```

## Next/Previous Styles
When a previous/next button is disabled (the carousel is at the beginning or end of a list, respectively), `carousel-button-disabled` is added to its class list. You can use this to style the buttons appropriately.

## Optional Styles
To fall back on native touch scroll interaction for mobile devices, add in a media query like this:

```css
@media (max-width: 640px) {
    button {
        display: none;
    }

    ul {
        overflow: auto;
    }
}

```

## Registering a carousel
```js
carousel.register( args );
```
Must provide the following arguments:

### `carousel`
Selector for carousel ul

### `items`
Selector for li children of the carousel ul

### `next`
Selector for next button

### `previous`
Selector for previous button
