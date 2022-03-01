Bubble[] myBubbles = new Bubble[20];

void setup() {
  size(800,600);
  for (int i = 0; i < myBubbles.length; i++) {
    myBubbles[i] = new Bubble(int(random(800)),int(random(600)),int(random(50,150)));
  }
  smooth();
}

void draw() {
  background(255,255,255);
  for (int i = 0; i < myBubbles.length; i++) {
    myBubbles[i].update();
  }
}

void mousePressed() {
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
  
  void drawBubble() {
    noStroke();
    fill(r,g,b,200);
    ellipse(x,y,rad,rad);
    fill(255,255,255,255);
    ellipseMode(CENTER);
    ellipse(x-rad/4,y-rad/4,rad/8,rad/8);
  }
  
  void update() {
    if (y < -200) {
      y = 800;
      x = int(random(800));
      rad = int(random(50,150));
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
