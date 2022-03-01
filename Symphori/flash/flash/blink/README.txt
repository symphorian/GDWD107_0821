blink 2D Game Engine for Flash

Thanks for playing with the alpha version for blink! While messing
around with the engine, please realize that nothing is set in stone
yet, so I'd really appreciate your feedback regarding just about
anything: things you'd like added, things you'd like removed or
changed, bugs you found, or even grammatical errors in here.

My email address is ryanreid2011@u.northwestern.edu.  Thanks!

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

blink's current instruction manual can be found below, and you may 
or may not want to read these instructions before playing with blink,
depending on whether you are a manual reading person or not.  =P

--------------------------------------------------------------------

TABLE OF CONTENTS

How to Design a Level (Basic)............................. 1)
  Setting the Level Size.................................. 1.a)
  Tiling the Level........................................ 1.b)
  Exporting the Level..................................... 1.c)
  Testing the Level....................................... 1.d)


How to Design a Level (Advanced).......................... 2)
  Using the "Level of Depth" Tab.......................... 2.a)
    Layer Buttons......................................... 2.a.i)
    Visibility Buttons.................................... 2.a.ii)
    Lock Buttons.......................................... 2.a.iii)

  Using the Toolbar....................................... 2.b)
    Paint Tool............................................ 2.b.i)
    Grab Tool............................................. 2.b.ii)
    Layer Shift Tool...................................... 2.b.iii)
    Zoom In Tool.......................................... 2.b.iv)
    Zoom Out Tool......................................... 2.b.v)
    Block Selection Tool.................................. 2.b.vi)
    Block Move Tool....................................... 2.b.vii)
    Block Rotate Tool..................................... 2.b.viii)

  Using the "Imported Img Assets" Tab..................... 2.c)
    Including External Images............................. 2.c.i)
    Using Imported External Images........................ 2.c.ii)

Features in the Works (coming soon)....................... 3)

Conclusion................................................ 4)

--------------------------------------------------------------------

1) HOW TO DESIGN A LEVEL (BASIC):

To design a level, open up the blink_LevelEditor.swf file.  This
will open up the level editor.


1.a) Setting the level size

First, you need to select how big you want the level to be by
setting the fields next to W and H. (Don't mess with the block
width and height, as I haven't really added the code to allow
different block sizes besides 200x200) Then click CREATE GRID.

This will create a blank grid as a template for the level.


1.b) Tiling the level

Click the "Block Type Legend" tab.  This will pull down the
available tiles you have to work with in designing the level.
Click on a block type to select it.

I've only included a basic set of tiles, but ideally you'd be
able to create your own (see section ___ for info on importing
your own graphics)

To color blocks, simply click on a block, or click and drag.
The blocks will change to the color you selected. Note that
the actual block tiles are more detailed than simple colors,
as you will see when you test out the level.


1.c) Exporting the level

Unfortunately, because Flash is not allowed to write to files,
you have to do a bit of manual copy-and-pasting, but not too
much.

Click on the "Exported Level Code" tab, and you will see the 
scripts needed to create the level.  Click on the text, hit
Ctrl-A to select all of it, then hit Ctrl-C to copy it.

Open up the LevelTest.txt file, and paste your code inside of 
it and save it. (If there is already code inside, make sure to
get rid of it if you don't need it anymore)


1.d) Testing the level

To test the level, simply open up the blink_LevelTester.swf file.
If you correctly exported the level code, you should be able to 
test out the level you created.

The character will move toward the mouse, and will jump when you 
click.


---------------------------------------------------------------------

2) HOW TO DESIGN A LEVEL (ADVANCED):

Although the basic steps from the previous section will allow you 
to create a basic level, to allow the user more freedom, a more 
extensive toolbar was added, as well as the "Level of Depth" and 
the "Imported Img Assets" tabs.


*********************************************************************

2.a) Using the "Level of Depth" tab

The "Level of Depth" tab allows you to add depth to your level,
surprisingly enough.  In addition to the layer the character
interacts with, you can add an additional 10 layers of depth.

To open up this part of the Level Editor, click on the tab 
labeled "Level of Depth".


2.a.i) Layer Buttons

The Layer Buttons are labeled from -1 to 9, with the smallest
number indicating the closest layer to the player and the largest
number indicating the farthest layer from the player.  Layer 0 is
marked with a little stick figure to indicate the layer that the
player's character moves on.

By clicking a layer, you can either activate or deactivate it.

- Activating a layer will cause a new, empty grid to be drawn at
the depth the layer exists at.  

- Deactivating a layer will cause the layer to be completely 
erased, so be careful when clicking the Layer Buttons!


2.a.ii) Visibility Buttons

The Visibility Buttons are the buttons under each Layer Button
with an eye inside of it.  These buttons allow you to make their
respective layers invisible or visible, without modifying the 
layers contents.  

When the eye is slightly transparent, the layer will be invisible; 
when the eye is solid, the layer will be visible.


2.a.iii) Lock Buttons

The Lock Buttons are the buttons under each Layer Button with a 
padlock inside of it.  These buttons allow you to lock a layer,
meaning the unused blocks in that layer will become hidden, and
you cannot interact with the blocks on that layer.

When the lock is slightly transparent, the layer will be unlocked;
when the lock is solid, the layer will be locked.


********************************************************************

2.b) Using the Toolbar

The Toolbar can be found in the lower right corner of the Level
Editor.  There are 7 tools here, or 8 if you include the default
tool.


2.b.i) Paint Tool

This is the default tool when no other tools are selected. With 
the Paint Tool, you can paint Blocks with whatever Block Type you
have currently selected.  

You can paint 1 block at a time, or you can click and drag over 
several blocks to paint them all. 

By clicking on a Block already colored with the currently selected
Block Type, you can clear a Block so that it returns to its
colorless state.


2.b.ii) Grab Tool

The Grab Tool is the first tool from the left on the Toolbar; it 
contains a hand. You can activate the Grab Tool by clicking on its
button; doing so will cause the pointer to become the hand inside
the Grab Tool. You can deactivate the tool by clicking on the tool's
empty button; doing so will restore the cursor to its original icon.

The Grab Tool will allow you to grab the work area of the Level 
Editor and pull it around as you wish.  This is useful if you
have zoomed in and want to view another area without zooming out.

To use the Grab Tool after you've activated it, click anywhere
within the work area and simply drag it around until it is positioned 
the way you want it to be.

This tool does not affect the exported level code; it only applies a
superficial transformation to the work area.


2.b.iii) Layer Shift Tool

The Layer Shift Tool is found to the right of the Grab Tool.  You 
can activate the Layer Shift Tool by clicking on its button; doing
so will cause the pointer to become the button's icon. You can 
deactivate the tool by clicking on the tool's empty button; doing 
so will restore the cursor to its original icon.

The Layer Shift Tool is used for testing out how the different layers
of depth will appear as you move around the level.  Once activated,
an outline representing the stage's viewing window will appear over 
the work area. What you see through the stage outline represents
what you would see if the character were in that part of the level.

Using the Layer Shift Tool is similar to using the Grab Tool; just 
click and drag anywhere in the work area to see a fair approximation
of how the level will look as you move around it.

Also like the Grab Tool, the changes made by this tool are purely
superficial; it will not affect the exported level code at all.


2.b.iv) Zoom In Tool

The Zoom In Tool is the 3rd tool from the left with the magnifying
glass with the plus sign inside.  You can activate the Zoom In Tool
by clicking on it; doing so will cause the cursor to become the icon
within the button.  You can deactivate the tool by clicking on the tool's
empty button; doing so will restore the cursor to its original icon.

The Zoom In Tool is used, as you would probably expect, to zoom in on
a particular region in the work area.  Once the tool is activated, you
can click anywhere in the work area to magnify the blocks near where
you clicked.  This is useful if you created a large level and want to
work on a specific region in more detail.

This tool does not affect the exported level code; it only applies a
superficial transformation to the work area.


2.b.v) Zoom Out Tool

The Zoom In Tool is the 4th tool from the left with the magnifying
glass with the minus sign inside.  You can activate the Zoom Out Tool
by clicking on it; doing so will cause the cursor to become the icon
within the button.  You can deactivate the tool by clicking on the tool's
empty button; doing so will restore the cursor to its original icon.

The Zoom Out Tool is used, as you would probably expect, to zoom out 
from a particular region in the work area.  Once the tool is activated, 
you can click anywhere in the work area to demagnify the blocks near where
you clicked.  This is useful if you created a large level and zoomed in to
work on a specific region in more detail, but now you want to step back
and view the level as a whole. There is a limit to how far you can zoom out.

This tool does not affect the exported level code; it only applies a
superficial transformation to the work area.


2.b.vi) Block Selection Tool

The Block Selection Tool is the 3rd from the right in the Toolbar, with an
arrow over a block found inside. You can activate the Block Selection Tool
by clicking on it; doing so will cause the cursor to become the icon found
within the tool's button. You can deactivate the tool by clicking on the
tool's empty button; doing so will restore the cursor to its original icon.

The Block Selection Tool is used to select multiple blocks at once, in order
to apply changes to all of them at once. Selected Blocks are outlined in 
white. The Block Selection Tool is similar to the Paint Tool; you can select 
one Block at a time or click and drag to select multiple Blocks. Blocks will 
stay selected even if you deactivate the Block Selection Tool.

Likewise, you have two options to deselect blocks: You can click on a 
selected Block to deselect it, or you can click an empty space in the work
area to deselect all currently selected Blocks.

Selecting Blocks does not change the exported level code, at least on its
own; however, changes made to selected Blocks will modify the exported
level code.


2.b.vii) Block Move Tool

The Block Move Tool is the 2nd tool from the right in the Toolbar, with a 
hand over a block found inside. You can activate the Block Move Tool by
clicking on it; doing so will cause the cursor to become the icon found
within the tool's button. You can deactivate the tool by clicking on the
tool's empty button; doing so will restore the cursor to its original icon.

The Block Move Tool is used to move Blocks from their original position to 
somewhere else in the work area. Once the tool is activated you can move 
individual Blocks, a selected group of Blocks, or an imported image (see
Section 2.c) by clicking on them and dragging them to the desired position.

There is a restriction on the Block Move Tool: You cannot move a Block
outside of the dimensions you specified when you created the level. The 
only exception is with imported images: only their centers are restricted
to the original dimensions of the level; the reason for this is to allow
more freedom to the user, so that they could potentially import images
larger than the original dimensions of the level. However, it is not
recommended to import excessively large images.

This tool DOES modify the exported level code when you move Blocks around.


2.b.viii) Block Rotate Tool

The Block Rotate Tool is the tool found on the right end of the Toolbar,
with a curved arrow inside it. You can activate the Block Rotate Tool by
clicking on it; doing so will cause the cursor to become the icon found
within the tool's button. You can deactivate the tool by clicking on the 
tool's empty button; doing so will restore the cursor to its original icon.

The Block Rotate Tool is used to rotate Blocks around their centers. Once 
activated, you can rotate individual Blocks, a group of selected Blocks, or 
an imported image (see section 2.c) by clicking on them and rotating them to 
the desired orientation.

A word of caution if you are rotating Blocks found on the layer that the 
player's character interacts with: it is very difficult to get individual
Blocks to align once rotated.  So, if you intend to create an incline for
the player's character to walk up, it is recommended to select a group of
Blocks using the Block Move Tool and rotate the group, instead of rotating
blocks individually to form the hill (plus it save you a lot of time).

This tool DOES Modify the exported level code when you rotate blocks.


**************************************************************************

2.c) Using the "Imported Img Assets" tab

The Imported Image Assets tab is where users find the external images they
wish to include in the game.  


2.c.i) Including external images the in "Imported Img Assets" tab

Including external images is a bit of a hassle, but once done, it does not
need to be done again.

First, open up the ImageAssets.txt file.  If you want to include an image 
in your level, it must be found here. One image should be included per line,
and should include the following arguments:

IMAGE URL: the url that the image is found at. local urls are fine.

CENTER COORDINATES: the center of the bounding box for this object, if the 
upper left corner of the image is (0,0).  Note that this does not have to
be the actual center of the object (see example below)

BOUNDING WIDTH AND HEIGHT: the width and height (in pixels) of the bounding
box with the CENTER COORDINATES above as the center.  Note that this does
not have to be the actual width and height of the object.


Example 1: Normal image inclusion

Suppose you have an image with dimensions 200x200 pixels and url grass.jpg.
To include this image such that the player's character will interact with
this image's bounding box exactly as it looks, the line would be:

grass.jpg 100 100 200 200


Example 2: Image with smaller bounding box inclusion

Suppose you have the same image, but when the player's character is on top
of the image, you want the character's feet to appear to sink into it a 
little bit (in other words, you want bounding box to be a little smaller
so that the character doesn't actually collide with the object until it
is a certain distance into the object, say 50 pixels). To create such an
object, you would insert something like this:

grass.jpg 100 125 200 150

So the bounding box for grass.jpg is centered at (100,125), and the bounding
box extends 100 pixels to the left (to 0) and right (to 200), and also 75 
pixels up (to 50) and down (to 200).

Example 1                        Example 2
+--------+                       +--------+                 bounding box
|        |  bounding box         |________|  _              does not match
|        |  matches image        |        |  |              original image
|        |                       |        |  |  bounding  
|        |                       |        |  |  box
+--------+                       +--------+  -         



2.c.ii) Using imported external images in the Level Editor

Assuming you correctly formatted the ImageAssets.txt file, when you open up
the blink_LevelEditor.swf file, you should be able to click the "Imported
Img Assets" tab, and see thumbnails of your images there, along with the 
original size of the image and the size of the bounding box. (If not, check
the ImageAssets.txt file again and make sure each line follows the format as
explained in section 2.c.i: IMAGE_URL CENTER_X CENTER_Y BOUND_W BOUND_H )

To use an imported image, just click on it, and, after a brief delay, it 
will appear in the upper right corner of the top-most active layer. You can
now interact with it just like a normal Block: you can select it, you can 
move it, and you can rotate it.

Note that the image will appear in the top-most active layer at the actual
size of the image. Since raster graphics can become distorted when resized,
the blink Level Editor assume that you have already cropped the image to 
the size you want it to be. Also realize that rotating a raster graphic 
may cause similar distortions.  If you want an image to be rotated, it may
be wiser to modify it before importing it. (Helpful tip: bmp files can
include alpha (transparency) values, so if you want to rotate an image and
not see a bunch of white space, that may be one route you can take)


--------------------------------------------------------------------------

3) Features in the Works

This section will fill up as I get feedback. I have features that I myself
want to implement, but before putting them up, I want to see if other
people also want those type of features, or if I'm way off the mark.

--------------------------------------------------------------------------

4) Conclusion

That's it for now, but there should be a lot of modifications and additions
coming soon depending on the feedback that I get.  If you want to test out
future versions of the blink Game Engine, shoot me an email at:

ryanreid2011@u.northwestern.edu

and I'll make sure you get any updates I make.  Thanks for your help!