from panda3d.core import NodePath, GeomNode, GeomVertexData, Geom, GeomVertexWriter, GeomTriangles, GeomVertexFormat, LVector3
from direct.showbase.ShowBase import ShowBase
import random
import math

class PaddyPlant(NodePath):
    def __init__(self):
        super().__init__('paddy_plant')
        
        # Generate stems
        for _ in range(random.randint(3, 5)):
            stem = self.create_stem()
            stem.setHpr(random.uniform(-10, 10), random.uniform(-10, 10), 0)
            stem.reparentTo(self)

        # Generate leaves
        for _ in range(random.randint(4, 6)):
            leaf = self.create_leaf()
            leaf.setPos(0, random.uniform(0.2, 0.5), random.uniform(0.1, 0.3))
            leaf.setHpr(random.uniform(0, 360), random.uniform(-30, 30), 0)
            leaf.reparentTo(self)

        # Generate grain heads
        for _ in range(random.randint(1, 3)):
            grain = self.create_grain()
            grain.setPos(0, 0, random.uniform(0.5, 0.7))
            grain.reparentTo(self)

    def create_stem(self):
        stem = loader.loadModel("models/misc/cylinder")
        stem.setScale(0.02, 0.02, random.uniform(0.4, 0.7))
        stem.setColor(0.4, 0.8, 0.4, 1)  # Greenish color for the stem
        return stem

    def create_leaf(self):
        leaf = loader.loadModel("models/misc/sphere")
        leaf.setScale(0.03, random.uniform(0.1, 0.3), 0.02)
        leaf.setColor(0.3, 0.6, 0.3, 1)
        return leaf

    def create_grain(self):
        grain = loader.loadModel("models/misc/sphere")
        grain.setScale(0.02, 0.02, 0.02)
        grain.setColor(0.9, 0.8, 0.4, 1)  # Yellowish color for grains
        return grain

class MyApp(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)

        # Disable the default mouse control
        self.disableMouse()

        # Generate multiple paddy plants in a field
        for _ in range(10):
            paddy_plant = PaddyPlant()
            paddy_plant.reparentTo(self.render)
            paddy_plant.setPos(random.uniform(-5, 5), random.uniform(-5, 5), 0)

        # Add lighting
        self.setup_lighting()

    def setup_lighting(self):
        from panda3d.core import AmbientLight, DirectionalLight

        ambient_light = AmbientLight("ambient_light")
        ambient_light.setColor((0.3, 0.3, 0.3, 1))
        self.render.setLight(self.render.attachNewNode(ambient_light))

        directional_light = DirectionalLight("directional_light")
        directional_light.setDirection(LVector3(-1, -1, -1))
        directional_light.setColor((0.7, 0.7, 0.7, 1))
        self.render.setLight(self.render.attachNewNode(directional_light))

app = MyApp()
app.run()
