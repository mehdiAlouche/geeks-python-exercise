import math
import turtle

class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must provide either radius or diameter")
    
    @property
    def diameter(self):
        return self.radius * 2
    
    @diameter.setter
    def diameter(self, value):
        self.radius = value / 2
    
    @property
    def area(self):
        return math.pi * self.radius ** 2
    
    def __str__(self):
        return f"Circle(radius={self.radius:.2f}, diameter={self.diameter:.2f}, area={self.area:.2f})"
    
    def __add__(self, other):
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented
    
    def __lt__(self, other):
        return self.radius < other.radius
    
    def __le__(self, other):
        return self.radius <= other.radius
    
    def __eq__(self, other):
        return self.radius == other.radius
    
    def __ne__(self, other):
        return self.radius != other.radius
    
    def __gt__(self, other):
        return self.radius > other.radius
    
    def __ge__(self, other):
        return self.radius >= other.radius

c1 = Circle(radius=3)
c2 = Circle(diameter=10)
c3 = c1 + c2

print(c1)
print(c2)
print(c3)
print(c1 > c2)
print(c1 == c2)

circle_list = [c3, c1, c2]
circle_list.sort()
for c in circle_list:
    print(c)

def draw_circles(circles):
    t = turtle.Turtle()
    t.speed(1)
    start_x = -200
    for c in circles:
        t.penup()
        t.goto(start_x, 0)
        t.pendown()
        t.circle(c.radius * 10)
        start_x += c.diameter * 10 + 20
    turtle.done()

# draw_circles(circle_list)
