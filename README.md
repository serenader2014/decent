# decent

A Ghost blog theme, modified from [Casper](https://github.com/TryGhost/Casper). The main design is inspired by [Aquila](https://github.com/lxndio/Aquila).

Demo: [my blog](https://blog.serenader.me)

## Features

- Minimalist design, less is more.
- Code highlighting.
- Responsive deign.
- Optional Google Analytics and Duoshuo comment service is provided.
- All Optional services can be configured in the Ghost admin page, you don't have to manually modify the code.

## Screenshot

### Home page

![home page](screenshot/homepage.png)

### Post page

![post page](screenshot/post.png)

### Author page

![author page](screenshot/author.png)

### Tag page

![tag page](screenshot/tag.png)

## Installation

1. Clone this project to the Ghost's theme folder: `content/themes`
2. Restart Ghost: `pm2 restart ghost` (assume you're using pm2)
3. In the Ghost admin page, navigate to `General` section, change the theme to `decent`
4. In the Ghost admin page, navigate to `Code Injection` section, add some configurations, for example, add Google Analytics service or Duoshuo comment service.
5. Everything is done. Just visit your blog's home page to enjoy the theme.

## Configuration

In the Ghost admin page, navigate to the `Code Injection` section, create a script tag, and create a global object named `decentThemeConfig`. This object is needed as the third party serivce's configuration will define in this object.

```html
<script>
    var decentThemeConfig = {};
</script>
```

### Google Analytics service configuration

Add a `ga` key to the `decentThemeConfig` object, and set its value to your Google Analytics track id.

```html
<script>
    var decentThemeConfig = {
        ga: 'YOUR TRACK ID'
    };
</script>
```

### Duoshuo comment service configuration

Add a `duoshuo` key to the `decentThemeConfig` object, and set its value to your Duoshuo service's short name.

```html
<script>
    var decentThemeConfig = {
        duoshuo: 'YOUR DUOSHUO SHORT NAME'
    };
</script>
```

### How to enable syntax highlighting

[decent](https://github.com/serenader2014/decent) use [Prism.js](http://prismjs.com/index.html) to support the syntax highlighting, it's easy to work with Ghost.

In your markdown content, you just need to specify your code block's language, like this:


    ```html
    <script>
        var decentThemeConfig = {
            ga: 'YOUR TRACK ID'
        };
    </script>
    ```

    ```javascript
    Array.prototype.uniq = function () {
        var map = {};
        return this.filter(function (item) {
            if (map[item]) {
                return false;
            } else {
                map[item] = true;
                return true;
            }
        });
    };
    ```

And it's done! 

Notice: In order to decrease the size of the `bundle.min.js` to make the blog load faster, I just include very little languages that support syntax highlighting, they are:

- Markup
- CSS
- C-like
- JavaScript

If you want to add more language support, follow these instructions:

1. Go to [Prism.js download page](http://prismjs.com/download.html), and select the language that you want to enable, and click download, then place the file in `Ghost/content/themes/decent/assets/js`.
2. Delete the old `bundle.min.js`.
3. Install [UglifyJS 2](https://github.com/mishoo/UglifyJS2): `npm i -g uglify-js`.
4. Excute the command in `Ghost/content/themes/decent/assets/js` folder: `uglifyjs jquery-1.12.0.min.js jquery.fitvids.js prism.js index.js -o bundle.min.js`, just be care of the order of the file, jQuery must be in the first order, or you may get the error: `jQuery is not defined`.
5. It's done! Restart your Ghost and see the result.

## License

MIT
