## Writing markdown

### How to add author to quote

Just add a `<cite></cite>` tag below your quote. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#thestandardloremipsumpassageusedsincethe1500s)

```markdown
> Our destiny offers not the cup of despair, but the chalice of opportunity. So let us seize it, not in fear, but in gladness.
> 
> <cite>——R.M. Nixon</cite>
```

![quot with cite](../screenshot/quote-with-cite.jpg)

### How to add image with caption

Wrap your image with a `<figure></figure>` tag, and place your caption in a `<figcaption></figcaption>` tag. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#section11032ofdefinibusbonorumetmalorumwrittenbyciceroin45bc)

```markdown
<figure>
![](/content/images/2016/05/sgblr5yvxim-jason-chen.jpg)
<figcaption>This is figcaption. A beautiful picture.</figcaption>
</figure>
```

![image with caption](../screenshot/image-with-caption.jpg)

### How to add image with alignment

Add a hash that contain alignment in your image's url. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#section11032ofdefinibusbonorumetmalorumwrittenbyciceroin45bc)

```markdown
![](/content/images/2016/05/untitled-9.gif#right)
![](/content/images/2016/05/untitled-9.gif#left)
```

![image-with-alignment](../screenshot/image-with-alignment.jpg)

### How to add image with caption and with alignment

Simply add a class `left` or `right` to your `<figure></figure>` tag. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#section11033ofdefinibusbonorumetmalorumwrittenbyciceroin45bc)

```markdown
<figure class="left">
![](/content/images/2016/05/sgblr5yvxim-jason-chen.jpg)
<figcaption>hello world!</figcaption>
</figure>
```

![figure-with-alignment](../screenshot/figure-with-alignment.jpg)

### How to add fullscreen image

Wrap your image with an element that has a `large` class. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/)

```markdown
<div class="large">
![](/content/images/2016/05/DSC01093.JPG)
</div>
```

### How to add fullscreen image with caption

Give your `<figure></figure>` a `large` class. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#1914translationbyhrackham)

```markdown
<figure class="large">
![](/content/images/2016/05/DSC01135-1.jpg)
<figcaption>wow so handsome</figcaption>
</figure>
```

### How to add image gallery(album)

Place your images within an element that has a `album` class. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#imagegallery)

```markdown
<div class="album">
![](/content/images/2016/05/Screenshot_2016-04-09-19-16-28.png)
![](/content/images/2016/05/Screenshot_2016-04-02-00-48-25.png)
![](/content/images/2016/05/Screenshot_2016-04-01-12-03-36.png)
![](/content/images/2016/05/Screenshot_2016-04-01-12-01-33.png)
![](/content/images/2016/05/Screenshot_2016-03-24-12-13-58.png)
![](/content/images/2016/05/Screenshot_2016-03-17-22-50-05.png)
![](/content/images/2016/05/Screenshot_2016-03-17-21-27-58.png)
![](/content/images/2016/05/Screenshot_2016-03-17-17-16-07.png)
![](/content/images/2016/05/Screenshot_2016-02-22-23-54-43.png)
![](/content/images/2016/05/Screenshot_2015-12-24-09-24-12.png)
</div>
```

![image album](../screenshot/image-album.jpg)

### How to add image gallery(album) with caption

Just like image gallery, place your `<figure></figure>` tags instead of images in an element that has a `album` class. 

Demo: [Post page demostration](https://blog.serenader.me/ghost-theme-demostration-decent-2/#imagegallerywithcaption)

```markdown
<div class="album">
<figure>
![](/content/images/2016/05/abta_gq74fs-matthew-wiebe.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/ocjujqqvczc-brandon-day.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/sgblr5yvxim-jason-chen-1.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/vbk7wuwczxk-maher-aridi.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/zfnk_btlapo-ismael-nieto.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/3wbxamuj7sg-roksolana-zasiadko.jpg)
<figcaption>wow so handsome</figcaption>
</figure>

<figure>
![](/content/images/2016/05/fo5dtm6id1y-mr-cup-fabien-barral.jpg)
<figcaption>wow so handsome</figcaption>
</figure>
</div>
```

![image with caption gallery](../screenshot/image-with-caption-album.jpg)
