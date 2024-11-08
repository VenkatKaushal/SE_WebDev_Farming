from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from panda3d.core import (Point3, Vec3, Vec4, DirectionalLight, AmbientLight,
                         GeomVertexFormat, GeomVertexData, GeomVertexWriter,
                         Geom, GeomTriangles, GeomNode, NodePath, TextNode)
import random
from direct.gui.OnscreenText import OnscreenText
from math import sin

class FarmSimulation(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
        self.disableMouse()
        self.camera.setPos(-10, -20, 15)
        self.camera.lookAt(Point3(0, 0, 0))
        
        self.GRID_SIZE = 10
        self.PLANT_SPACING = 1
        self.growth_time = 0
        self.crops = []
        
        # Define growth stages and colors
        self.growth_stages = {
            'wheat': {
                'stages': ['seedling', 'growing', 'mature'],
                'colors': [(0.2, 0.8, 0.2, 1),
                          (0.4, 0.7, 0.1, 1),
                          (0.9, 0.8, 0.2, 1)]
            },
            'paddy': {
                'stages': ['seedling', 'growing', 'mature'],
                'colors': [(0.3, 0.9, 0.3, 1),
                          (0.2, 0.6, 0.2, 1),
                          (0.8, 0.8, 0.2, 1)]
            }
        }
        
        self.setup_lighting()
        self.create_ground()
        self.plant_crops()
        
        self.taskMgr.add(self.grow_crops, "GrowCropsTask")
        
        # Controls
        self.accept("space", self.harvest_and_replant)
        self.accept("w", lambda: self.camera.setPos(self.camera.getPos() + Vec3(0, 1, 0)))
        self.accept("s", lambda: self.camera.setPos(self.camera.getPos() + Vec3(0, -1, 0)))
        self.accept("a", lambda: self.camera.setPos(self.camera.getPos() + Vec3(-1, 0, 0)))
        self.accept("d", lambda: self.camera.setPos(self.camera.getPos() + Vec3(1, 0, 0)))
        self.accept("arrow_up", lambda: self.camera.setPos(self.camera.getPos() + Vec3(0, 0, 1)))
        self.accept("arrow_down", lambda: self.camera.setPos(self.camera.getPos() + Vec3(0, 0, -1)))
        
        self.add_instructions()

    def create_crop_geometry(self, color):
        format = GeomVertexFormat.getV3n3c4()
        vdata = GeomVertexData('crop', format, Geom.UHStatic)
        
        vertex = GeomVertexWriter(vdata, 'vertex')
        normal = GeomVertexWriter(vdata, 'normal')
        color_writer = GeomVertexWriter(vdata, 'color')
        
        # Create crossed planes
        height = 1.0
        width = 0.2
        
        # First plane
        vertex.addData3(-width, 0, 0)
        vertex.addData3(width, 0, 0)
        vertex.addData3(width, 0, height)
        vertex.addData3(-width, 0, height)
        
        # Second plane
        vertex.addData3(0, -width, 0)
        vertex.addData3(0, width, 0)
        vertex.addData3(0, width, height)
        vertex.addData3(0, -width, height)
        
        # Normals
        for _ in range(4):
            normal.addData3(0, 1, 0)
        for _ in range(4):
            normal.addData3(1, 0, 0)
        
        # Colors
        for _ in range(8):
            color_writer.addData4(*color)
        
        # Create triangles
        tris = GeomTriangles(Geom.UHStatic)
        tris.addVertices(0, 1, 2)
        tris.addVertices(0, 2, 3)
        tris.addVertices(4, 5, 6)
        tris.addVertices(4, 6, 7)
        
        geom = Geom(vdata)
        geom.addPrimitive(tris)
        
        return geom

    def create_crop(self, pos, crop_type='wheat'):
        # Create initial geometry with seedling color
        geom = self.create_crop_geometry(self.growth_stages[crop_type]['colors'][0])
        
        node = GeomNode('crop')
        node.addGeom(geom)
        
        crop_np = self.render.attachNewNode(node)
        crop_np.setPos(*pos)
        crop_np.setScale(1, 1, 0.1)  # Start small
        
        return {
            'node': crop_np,
            'growth': 0.0,
            'type': crop_type,
            'stage': 0
        }

    def create_ground(self):
        format = GeomVertexFormat.getV3n3c4()
        vdata = GeomVertexData('ground', format, Geom.UHStatic)
        
        vertex = GeomVertexWriter(vdata, 'vertex')
        normal = GeomVertexWriter(vdata, 'normal')
        color = GeomVertexWriter(vdata, 'color')
        
        size = self.GRID_SIZE * self.PLANT_SPACING * 1.2
        
        vertex.addData3(-size, -size, 0)
        vertex.addData3(size, -size, 0)
        vertex.addData3(size, size, 0)
        vertex.addData3(-size, size, 0)
        
        for _ in range(4):
            normal.addData3(0, 0, 1)
            color.addData4(0.4, 0.2, 0, 1)
        
        tris = GeomTriangles(Geom.UHStatic)
        tris.addVertices(0, 1, 2)
        tris.addVertices(0, 2, 3)
        
        geom = Geom(vdata)
        geom.addPrimitive(tris)
        
        node = GeomNode('ground')
        node.addGeom(geom)
        
        self.ground = self.render.attachNewNode(node)

    def plant_crops(self):
        for crop in self.crops:
            crop['node'].removeNode()
        self.crops.clear()
        
        for x in range(self.GRID_SIZE):
            for y in range(self.GRID_SIZE):
                crop_type = 'wheat' if (x + y) % 2 == 0 else 'paddy'
                pos = Point3(
                    (x - self.GRID_SIZE/2) * self.PLANT_SPACING,
                    (y - self.GRID_SIZE/2) * self.PLANT_SPACING,
                    0
                )
                self.crops.append(self.create_crop(pos, crop_type))

    def grow_crops(self, task):
        dt = globalClock.getDt()
        self.growth_time += dt
        
        for crop in self.crops:
            # Update growth
            crop['growth'] = min(1.0, crop['growth'] + dt * 0.1)
            
            # Calculate height with random variation
            height = 1.5 * crop['growth'] * (0.9 + 0.2 * random.random())
            
            # Add wavering motion
            wave = 0.05 * sin(self.growth_time * 2 + hash(str(crop['node'].getPos())) % 628 / 100)
            
            # Update transform
            crop['node'].setScale(1, 1, height)
            crop['node'].setP(wave * 45)
            
            # Update color based on growth stage
            new_stage = int(crop['growth'] * 2.99)
            if new_stage != crop['stage']:
                crop['stage'] = new_stage
                # Create new geometry with updated color
                new_geom = self.create_crop_geometry(
                    self.growth_stages[crop['type']]['colors'][new_stage]
                )
                crop['node'].node().removeAllGeoms()
                crop['node'].node().addGeom(new_geom)
        
        return Task.cont

    def setup_lighting(self):
        dlight = DirectionalLight('sun')
        dlight.setColor(Vec4(1.0, 0.95, 0.8, 1))
        dlnp = self.render.attachNewNode(dlight)
        dlnp.setHpr(45, -45, 0)
        self.render.setLight(dlnp)
        
        alight = AmbientLight('ambient')
        alight.setColor(Vec4(0.3, 0.3, 0.3, 1))
        alnp = self.render.attachNewNode(alight)
        self.render.setLight(alnp)

    def add_instructions(self):
        OnscreenText(
            text="Controls:\nWASD - Move Camera\nArrow Up/Down - Adjust Height\nSpace - Harvest and Replant",
            pos=(-0.95, 0.9),
            scale=0.06,
            align=TextNode.ALeft,
            fg=(1, 1, 1, 1),
            shadow=(0, 0, 0, 1),
            parent=self.aspect2d
        )

    def harvest_and_replant(self):
        self.plant_crops()
        self.growth_time = 0

# Create and run the application
app = FarmSimulation()
app.run()