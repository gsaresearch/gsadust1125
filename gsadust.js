let conStart = 10;
let conRange = 65;
let mode = 1;

function setup()
{
  let botton1, button2;
  button1 = createButton('pm2.5');
  button1.position(10, 100);
  button1.mouseClicked(button1clicked);
  button2 = createButton('pm10');
  button2.position(10, 130);
  button2.mouseClicked(button2clicked);
}
function button1clicked()
  {
    mode = 1;
  };
function button2clicked()
  {
    mode = 2;
  };

let table = function(p)
{
  let mode = 1;
  let f, r;

  p.preload = function()
  {
    table1 = p.loadTable('1125_pm2.5.csv');
    table2 = p.loadTable('1125_pm10.csv');
  };

  p.setup = function() 
  {
    p.createCanvas(430, 700);
    p.frameRate(10);
  };

  p.draw = function() 
  {
    p.background(0);
    p.noFill();
    p.stroke(255);
    p.textSize(12);

    for(f = 10; f <= 310; f = f+100)
    {
      p.rect(f, 10, 100, 20);
    }
    p.text('time', 15, 25);
    p.text('concentration', 115, 25);
    p.text('latitude', 215, 25);
    p.text('longitude', 315, 25);

    if(mode === 1)
    {
      for(f = 1; f < table1.getRowCount(); f++)
      {
        row = table1.getRow(f); 
        for(r = 10; r <= 310; r = r+100)
        {
          p.rect(r, 10+ 20*f, 100, 20);
        }
        p.text(row.getString(0), 15, 25+ 20*f);
        p.text(row.getString(1), 115, 25+ 20*f);
        p.text(row.getString(2), 215, 25+ 20*f);
        p.text(row.getString(3), 315, 25+ 20*f);
      }
    }
    else
    {
      for(f = 1; f < table2.getRowCount(); f++)
      {
        row = table2.getRow(f); 
        for(r = 10; r <= 310; r = r+100)
        {
          p.rect(r, 10+ 20*f, 100, 20);
        }
        p.text(row.getString(0), 15, 25+ 20*f);
        p.text(row.getString(1), 115, 25+ 20*f);
        p.text(row.getString(2), 215, 25+ 20*f);
        p.text(row.getString(3), 315, 25+ 20*f);
      }
    }
  };

let graph = function(p)
{
  let valueX = 0;
  let valueZ = 0;
  let value1;
  let value2;
  let value3;
  let value4;
  
  p.preload = function()
  {
    table1 = p.loadTable('1125_pm2.5.csv');
    table2 = p.loadTable('1125_pm10.csv');
    map = p.loadImage('GSA.png');
  };
  
  p.setup = function()
  {
    p.createCanvas(700, 700, p.P2D);
  };
  
  p.draw = function()
  {
    p.background(0);
    p.image(map, 100, 100, 500, 500);

    let row;
    if(mode === 1)
    {
      for(let l = 1; l < table1.getRowCount(); l++)
      {
          row = table1.getRow(l);
          concentration = row.getString(1);
          latitude = -(row.getString(2)-35.22697222)*145945.6304*5/3 +600;
          longitude = (row.getString(3)-126.8471111)*118680.2753*5/3 +100;
          p.colorMode(p.HSB);
          p.fill(255 -(concentration-conStart)*255/conRange, 255, 255);
          p.circle(longitude, latitude, 20);   
      }
    }
    if(mode === 2)
    {
      for(let l = 1; l < table2.getRowCount(); l++)
      {
          row = table2.getRow(l);
          concentration = row.getString(1);
          latitude = -(row.getString(2)-35.22697222)*145945.6304*5/3 +600;
          longitude = (row.getString(3)-126.8471111)*118680.2753*5/3 +100;
          p.colorMode(p.HSB);
          p.fill(255 -(concentration-conStart)*255/conRange, 255, 255);
          p.circle(longitude, latitude, 20);
      }
    }
  };
  
  p.keyTyped = function()
  {
    if(p.key === '1')
    {
      mode = 1;
    }
    if(p.key === '2')
    {
      mode = 2;
    }
  };
};
let showgraph = new p5(graph);

let info = function(i)
{
  i.setup = function()
  {
    i.createCanvas(250, 700);
    i.background(0);
    
    i.textSize(20);
    i.fill(255);
    i.text('Color - Concentration', 10, 30);
    i.text('(㎍/㎥)', 130, 70);
    i.text('10', 10, 85);
    i.text('37.5', 10, 325);
    i.text('65', 10, 585);
    
    i.noStroke();
    i.colorMode(i.HSB);
    let f, r;
    for(f = conStart; f < conStart+conRange; f += 0.01)
    {
      i.stroke(255 -(f-conStart)*255/conRange, 255, 255);
      i.line(50, (f-conStart)*500/conRange +80, 150, (f-conStart)*500/conRange +80);
    }
    
  };
  
};
let showinfo = new p5(info);
