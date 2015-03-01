# Carousel Lite [![NPM version](https://badge.fury.io/js/carousel-lite.png)](https://www.npmjs.com/package/carousel-lite)

> Touch friendly. Incredibly small. Carousels the native way.

Carousel Lite looks to provide a simple carousel solution. With a very small amount of code, we can hijack the default scroll behavior of an overflowed list (which provides us the added benefit of touch support with no additional JS - see below).

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
When the previous or next button is disabled (the carousel is at the beginning or end of a list, respectively), `carousel-button-disabled` is added to its class list. You can use this to style the buttons appropriately.

When a carousel is registered, the previous button is automatically disabled. The next button is disabled as well if the entirety of list fits within the carousel's clientWidth.

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
