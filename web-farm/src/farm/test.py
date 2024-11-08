from panda3d.core import Texture
from direct.showbase.ShowBase import ShowBase

class MyApp(ShowBase):
    def __init__(self): 
        ShowBase.__init__(self)

        # Load the model
        self.model = self.loader.loadModel("wheat1.fbx")
        self.model.reparentTo(self.render)

        # Load the texture
        texture = self.loader.loadTexture("texture.png")
        self.model.setTexture(texture, 1)  # Apply the texture to the model

        # Adjust scale and position if needed
        self.model.setScale(0.2)
        self.model.setPos(0, 5, 0)

app = MyApp()
app.run()
