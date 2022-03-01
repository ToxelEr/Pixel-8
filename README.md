# Pixel-8
a fantasy console for making , tiny games or art
![Pixel-8](/pixel8.png "pixel-8")

# Specifications
| ‌ | ‌ |
| - | - |
| Display        | 128x128 32 colours  |
| Cartridge Size | 250kb |
| Sound          | Not Supported |
| Code           | JavaScript |
| Sprites        | 128 8x8 sprites |
| Map            | Not Supported |

# Api
### Console
* help();
* open('cart');
* editor();

### Drawing
* pset(x,y,color);
* pget(x,y);
* rectfill(x,y,sizex,sizey,color);
* circfill(x,y,size,color);
* line(x,y,x1,y1,color,width);
* trifill(x,y,x1,y1,x2,y2,color);
* cls(color);

### Math
* rnd(x);
* cos(x);
* sin(x);
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
* 2 - Open Pixel-8.html using your browser

### Phone Users
* 1 - Install a html , js editor like spck editor
* 2 - Download Source Code and extract
* 3 - Open Pixel-8.html using html editor
* 4 - run it

#### Type help() for help
#### Type run('cart-name') in console to run a cartridge from carts folder
#### Type editor() in console to open live viewer and editor

## Creating New Project
* 1 - Copy empty folder in carts folder 
* 2 - Raname it 
* 3 - Edit main.js 
