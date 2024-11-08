from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from panda3d.core import Point3, Vec3, DirectionalLight, AmbientLight, Vec4, TextNode
from direct.gui.OnscreenText import OnscreenText

class RotatableObject(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)

        # Disable the default mouse control
        self.disableMouse()
        
        try:
            # Try to load a basic model that comes with Panda3D
            self.model = self.loader.loadModel("11557_Stalks of Corn_V2_L2.obj")
            if self.model is None:
                raise Exception("Could not load teapot model")
        except:
            print("Could not load teapot, using box instead")
            self.model = self.loader.loadModel("models/box")
            
        self.model.reparentTo(self.render)
        self.model.setPos(0, 0, 0)
        
        # Set up lighting
        self.setup_lighting()
        
        # Set up camera
        self.camera.setPos(0, -10, 0)
        self.camera.lookAt(Point3(0, 0, 0))
        
        # Initialize rotation values
        self.heading = 0
        self.pitch = 0
        self.last_mouse = None
        self.is_dragging = False
        
        # Set up mouse controls
        self.accept("mouse1", self.start_drag)
        self.accept("mouse1-up", self.stop_drag)
        self.taskMgr.add(self.mouse_task, "MouseTask")
        
        # Set up keyboard controls
        self.accept("arrow_left", self.rotate_left)
        self.accept("arrow_right", self.rotate_right)
        self.accept("arrow_up", self.rotate_up)
        self.accept("arrow_down", self.rotate_down)
        
        # Add instructions
        self.add_instructions()

    def setup_lighting(self):
        # Add directional light
        dlight = DirectionalLight('dlight')
        dlight.setColor(Vec4(0.8, 0.8, 0.8, 1))
        dlnp = self.render.attachNewNode(dlight)
        dlnp.setHpr(45, -45, 0)
        self.render.setLight(dlnp)
        
        # Add ambient light
        alight = AmbientLight('alight')
        alight.setColor(Vec4(0.2, 0.2, 0.2, 1))
        alnp = self.render.attachNewNode(alight)
        self.render.setLight(alnp)

    def add_instructions(self):
        # Create the text using OnscreenText
        self.instructions = OnscreenText(
            text="Controls:\n- Mouse drag: Rotate freely\n- Arrow keys: Rotate object",
            pos=(-0.95, 0.9),  # Position on screen
            scale=0.07,
            align=TextNode.ALeft,  # Left alignment
            fg=(1, 1, 1, 1),  # White text
            shadow=(0, 0, 0, 1),  # Black shadow
            parent=self.aspect2d
        )

    def start_drag(self):
        self.is_dragging = True
        
    def stop_drag(self):
        self.is_dragging = False
        self.last_mouse = None

    def mouse_task(self, task):
        if self.is_dragging:
            if self.mouseWatcherNode.hasMouse():
                mouse_pos = self.mouseWatcherNode.getMouse()
                
                if self.last_mouse is not None:
                    # Calculate mouse movement
                    dx = mouse_pos.getX() - self.last_mouse.getX()
                    dy = mouse_pos.getY() - self.last_mouse.getY()
                    
                    # Update rotation
                    self.heading -= dx * 50
                    self.pitch += dy * 50
                    
                    # Apply rotation
                    self.model.setHpr(self.heading, self.pitch, 0)
                
                self.last_mouse = mouse_pos
            
        return Task.cont

    def rotate_left(self):
        self.heading += 5
        self.model.setH(self.heading)
        
    def rotate_right(self):
        self.heading -= 5
        self.model.setH(self.heading)
        
    def rotate_up(self):
        self.pitch += 5
        self.model.setP(self.pitch)
        
    def rotate_down(self):
        self.pitch -= 5
        self.model.setP(self.pitch)

# Create and run the application
app = RotatableObject()
app.run()