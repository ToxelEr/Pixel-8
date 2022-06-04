# Pixel-8
a fantasy console for making , tiny games or art
![Pixel-8](/img/pixel8.png "pixel-8")

# Specifications
| ‌ | ‌ |
| - | - |
| Display        | 64x64 |
| Cart           | unlimited |
| Sound          | Not Supported |
| Code           | JavaScript |
| Sprites        | 64 8x8 sprites |

# Api
### Canvas
* boot(width,height);

### Colors
* RGB to color
  * rgbc(r,g,b);

* RGB ro palette index
  * rgbi(palette,r,g,b);

### Sprites
* load cartridge sprite sheet
  * sprite('cartridge')

* draw a 8x8 tile
  * spr(x,y,i,j);

* draw a custom part
  * sspr(x,y,w,h,x1,y1,w1,h1);

### Console
* help();
* open('cart');
* editor();

### Drawing
* set color of a pixel
  * pset(x,y,color);

* get color of a pixel
  * pget(x,y);

* drawing filled shapes
  * rectfill(x,y,sizex,sizey,color);
  * circfill(x,y,size,color);
  * line(x,y,x1,y1,color,width);
  * trifill(x,y,x1,y1,x2,y2,color);

* clear screen
  * cls(color);

### Math
* rnd(x);
* flr(x);

### Buttons
used with function!
* btn_up();
* btn_down();
* btn_left();
* btn_right();
* btn_x();
* btn_o();

## Getting Started

### PC Users
* 1 - Download Source Code and extract
* 2 - Open Player.html using your browser

### Phone Users
* 1 - Install a html , js editor
* 2 - Download Source Code and extract
* 3 - Open Player.html using html editor
* 4 - run it

#### Type help() for help
#### Type run('cart-name') in console to run a cartridge from carts folder
#### Type editor() in console to open live viewer and editor

## Creating New Project
* 1 - Copy empty folder in carts folder 
* 2 - Raname it 
* 3 - Edit main.js or sprite.png
