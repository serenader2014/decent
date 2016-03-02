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

## License

MIT
