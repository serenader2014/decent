# decent

A Ghost blog theme, modified from [Casper](https://github.com/TryGhost/Casper). The main design is inspired by [Aquila](https://github.com/lxndio/Aquila).

Demo: [my blog](https://blog.serenader.me)

![screenshot](screenshot/homepage.jpg)

## Screenshot

Moved to [docs/screenshot.md](docs/screenshot.md)

## Features

- Ajax powered page loading.
- Minimalist design, less is more.
- Syntax highlighting.
- Responsive deign.
- Quote with author supported.
- Image caption supported.
- Image alignment supported.
- Image gallery supported.
- Google Analytics service.
- Duoshuo comment service.
- Disqus comment service.
- All Optional services can be configured in the Ghost admin page, you don't have to manually modify the code.

## Installation

1. Download this theme from [Github release page](https://github.com/serenader2014/decent/releases), and extract the files to the Ghost's theme folder: `content/themes`.
2. Restart Ghost: `pm2 restart ghost` (assuming you're using pm2)
3. In the Ghost admin page, navigate to `General` section, change the theme to `decent`
4. In the Ghost admin page, navigate to `Code Injection` section, add some configurations, for example, add Google Analytics service or Duoshuo comment service.
5. Everything is done. Just visit your blog's home page to enjoy the theme.

## Writing markdown

This theme support some custom styles, it enable you to write some cool styles in markdown, such as image caption, image alignment and so on. The detailed documentation can be found at [docs/writing-markdown.md](docs/writing-markdown.md).

## Configuration

See [docs/configuration.md](docs/configuration.md).

## Compatibility

decent theme works great with Ghost `>= v0.8 && < v1.0`. The frontend code works great in modern browser.

## Development

- Fork this project, and clone it to Ghost theme's folder.
- Run `npm install` to install dependencies.
- Run `gulp` to start development(make sure your Ghost is running, and you have set decent as your Ghost's theme.)

[Gulp](http://gulpjs.com) will watch your files' changes, and automatically generate the bundle file, like `screen.css` and `bundle.min.js`. So you don't need to build these files by yourself. And when the bundle file changes, the browser will automatically reload itself, to see the latest changes.

## Thanks to

- [Ghost](https://ghost.org)
- [Casper](https://github.com/TryGhost/Casper)
- [Aquila](https://github.com/lxndio/Aquila)
- [Prism.js](http://prismjs.com/index.html)
- [Photoswipe](http://photoswipe.com/)
- [Duoshuo](http://duoshuo.com/)
- [Disqus](https://disqus.com/)
- [Progress.js](https://github.com/serenader2014/progress.js)

## License

MIT
