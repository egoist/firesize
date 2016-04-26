# firesize

Image resize and proxy on the fly.

## API

GET `https://firesize.pixelcat.co`

Query:

|Name|Type|Required|Description|
|---|---|---|---|
|url|string|√|image url|
|origin|boolean|×|output origin image|
|width|number|×|resize to given width|
|height|number|×|resize to given height|

## Example

JPEG resize: https://firesize.pixelcat.co/?url=http://ww4.sinaimg.cn/large/a15b4afegw1f397cnma1xj21gy13mgvd&width=200<br>
Original GIF Proxy: https://firesize.pixelcat.co/?url=http://i.giphy.com/UNpeAPM67tZMA.gif&origin=1<br>
Behind the Wall (NSFW): https://firesize.pixelcat.co/?url=https://pbs.twimg.com/media/Cg7xFYNUkAA0UtI.jpg

## Warning

Public service, do not abuse.

## License

MIT &copy; [EGOIST](https://github.com/egoist)
