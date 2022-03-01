import processing.core.*; 
import processing.xml.*; 

import java.applet.*; 
import java.awt.Dimension; 
import java.awt.Frame; 
import java.awt.event.MouseEvent; 
import java.awt.event.KeyEvent; 
import java.awt.event.FocusEvent; 
import java.awt.Image; 
import java.io.*; 
import java.net.*; 
import java.text.*; 
import java.util.*; 
import java.util.zip.*; 
import java.util.regex.*; 

public class Bubbles extends PApplet {

Bubble[] myBubbles = new Bubble[20];

public void setup() {
  size(800,600);
  for (int i = 0; i < myBubbles.length; i++) {
    myBubbles[i] = new Bubble(PApplet.parseInt(random(800)),PApplet.parseInt(random(600)),PApplet.parseInt(random(50,150)));
  }
  smooth();
}

public void draw() {
  background(255,255,255);
  for (int i = 0; i < myBubbles.length; i++) {
    myBubbles[i].update();
  }
}

public void mousePressed() {
  float mag = 0;
  for (int i = 0; i < myBubbles.length; i++) {
    mag = sqrt(sq(mouseX - myBubbles[i].x) + sq(mouseY - myBubbles[i].y));
    if (mag < myBubbles[i].rad/2) {
      myBubbles[i].y = -500;
    }
  }
}

class Bubble {
  int x, y, rad;
  float r,g,b;
  
  Bubble (int initX, int initY, int initR) {
    x = initX;
    y = initY;
    rad = initR;
    r = random(255);
    g = random(255);
    b = random(255);
  }
  
  public void drawBubble() {
    noStroke();
    fill(r,g,b,200);
    ellipse(x,y,rad,rad);
    fill(255,255,255,255);
    ellipseMode(CENTER);
    ellipse(x-rad/4,y-rad/4,rad/8,rad/8);
  }
  
  public void update() {
    if (y < -200) {
      y = 800;
      x = PApplet.parseInt(random(800));
      rad = PApplet.parseInt(random(50,150));
      r = random(255);
      g = random(255);
      b = random(255);
    }
    else {
      y -= 10 - rad/20;
    }
    drawBubble();
  }
}

  static public void main(String args[]) {
    PApplet.main(new String[] { "--bgcolor=#ECE9D8", "Bubbles" });
  }
}
