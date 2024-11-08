from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from panda3d.core import NodePath, Point3, Filename, LoaderOptions
from panda3d.core import Material, AmbientLight, DirectionalLight
from panda3d.core import VBase4, BoundingBox, Point3D, TransformState
import math
import random

class SunflowerGrowthSimulation(ShowBase):
    def __init__(self, model_path, max_size=(0.2, 0.2, 0.3)):
        ShowBase.__init__(self)
        
        # Size constraints
        self.max_size = max_size
        self.base_scale = 0.01
        
        # Configure model loading
        self.model_path = Filename.fromOsSpecific(model_path)
        self.loader_options = LoaderOptions()
        self.loader_options.setFlags(LoaderOptions.LFSearch)
        
        # Growth parameters with shape modifications
        self.growth_stages = {
            'seedling': {
                'scale': self.base_scale,
                'duration': 5,
                'color': VBase4(0.2, 0.8, 0.2, 1.0),
                'stem_stretch': 0.5,
                'leaf_spread': 0.3,
                'flower_scale': 0.0
            },
            'vegetative': {
                'scale': self.base_scale * 2,
                'duration': 10,
                'color': VBase4(0.1, 0.7, 0.1, 1.0),
                'stem_stretch': 1.0,
                'leaf_spread': 0.7,
                'flower_scale': 0.2
            },
            'flowering': {
                'scale': self.base_scale * 3,
                'duration': 5,
                'color': VBase4(0.1, 0.6, 0.1, 1.0),
                'stem_stretch': 1.5,
                'leaf_spread': 1.0,
                'flower_scale': 0.8
            },
            'mature': {
                'scale': self.base_scale * 4,
                'duration': 15,
                'color': VBase4(0.0, 0.5, 0.0, 1.0),
                'stem_stretch': 2.0,
                'leaf_spread': 1.2,
                'flower_scale': 1.0
            }
        }
        
        # Setup scene and load model parts
        self.setup_scene()
        self.setup_lighting()
        self.load_plant_model()
        self.setup_growth_system()
        
        # Start simulation
        self.taskMgr.add(self.growthTask, "GrowthTask")
        self.taskMgr.add(self.environmentalEffectsTask, "EnvironmentalEffectsTask")
        
    def setup_scene(self):
        """Setup the 3D scene"""
        self.cam.setPos(0, -1, 0.5)
        self.cam.lookAt(Point3(0, 0, 0.1))
        
    def load_plant_model(self):
        """Load and separate the sunflower model parts"""
        try:
            self.plant_model = self.loader.loadModel(self.model_path, 
                                                   loaderOptions=self.loader_options,
                                                   noCache=True)
            
            if not self.plant_model:
                raise Exception("Model failed to load")
            
            # Calculate appropriate scale
            self.base_scale = self.calculate_model_scale(self.plant_model)
            
            # Separate model into components (assuming model has these node names)
            self.stem = self.find_or_create_node("stem")
            self.leaves = self.find_or_create_node("leaves")
            self.flower_head = self.find_or_create_node("flower")
            
            # Set up materials for different parts
            self.setup_materials()
            
            # Initial positioning
            self.plant_model.setPos(0, 0, 0)
            self.plant_model.reparentTo(self.render)
            self.plant_model.setScale(self.base_scale)
            
            print(f"Successfully loaded model: {self.model_path}")
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            print(f"Attempted to load from path: {self.model_path}")
            return False

    def find_or_create_node(self, node_name):
        """Find node in model or create a new one if not found"""
        node = self.plant_model.find("**/" + node_name)
        if node.isEmpty():
            print(f"Warning: {node_name} node not found, creating placeholder")
            node = self.plant_model.attachNewNode(node_name)
        return node
            
    def setup_materials(self):
        """Setup materials for different plant parts"""
        # Stem material
        self.stem_material = Material()
        self.stem_material.setDiffuse(VBase4(0.1, 0.5, 0.1, 1.0))
        self.stem.setMaterial(self.stem_material)
        
        # Leaves material
        self.leaves_material = Material()
        self.leaves_material.setDiffuse(VBase4(0.2, 0.8, 0.2, 1.0))
        self.leaves.setMaterial(self.leaves_material)
        
        # Flower material
        self.flower_material = Material()
        self.flower_material.setDiffuse(VBase4(1.0, 1.0, 0.0, 1.0))  # Yellow for sunflower
        self.flower_head.setMaterial(self.flower_material)
        
    def update_plant_visualization(self):
        """Update plant appearance based on growth stage"""
        stage_data = self.growth_stages[self.current_stage]
        
        # Update overall scale with smooth transition
        current_scale = self.plant_model.getScale()
        target_scale = stage_data['scale']
        new_scale = current_scale[0] + (target_scale - current_scale[0]) * 0.1
        self.plant_model.setScale(new_scale)
        
        # Update stem shape
        stem_stretch = stage_data['stem_stretch']
        self.stem.setScale(1, 1, stem_stretch)
        
        # Update leaf spread
        leaf_spread = stage_data['leaf_spread']
        self.leaves.setScale(leaf_spread, leaf_spread, 1)
        
        # Update flower head
        flower_scale = stage_data['flower_scale']
        self.flower_head.setScale(flower_scale)
        
        # Update colors based on growth stage
        stem_color = VBase4(0.1, 0.5 * stage_data['stem_stretch'], 0.1, 1.0)
        leaf_color = stage_data['color']
        flower_color = VBase4(1.0, 1.0, 0.0, 1.0) if flower_scale > 0.5 else VBase4(0.5, 0.5, 0.0, 1.0)
        
        self.stem_material.setDiffuse(stem_color)
        self.leaves_material.setDiffuse(leaf_color)
        self.flower_material.setDiffuse(flower_color)

    def setup_growth_system(self):
        """Initialize growth system variables"""
        self.growth_time = 0
        self.current_stage = 'seedling'
        self.is_harvestable = False
        self.growth_rate = 1.0
        
    def growthTask(self, task):
        """Main growth simulation task"""
        dt = globalClock.getDt()
        self.growth_time += dt * self.growth_rate
        
        # Update growth stage
        total_time = 0
        for stage, params in self.growth_stages.items():
            total_time += params['duration']
            if self.growth_time <= total_time:
                if stage != self.current_stage:
                    print(f"Sunflower entered {stage} stage")
                    self.current_stage = stage
                break
        
        # Update visualization
        self.update_plant_visualization()
        
        # Check harvest readiness
        if self.growth_time >= sum(stage['duration'] for stage in self.growth_stages.values()):
            if not self.is_harvestable:
                self.is_harvestable = True
                print("Sunflower is ready for harvest!")
        
        return Task.cont
        
    def environmentalEffectsTask(self, task):
        """Simulate environmental effects"""
        dt = globalClock.getDt()
        
        # Add gentle swaying motion
        stem_sway = math.sin(task.time * 2) * 0.05
        leaf_sway = math.cos(task.time * 3) * 0.08
        
        self.stem.setH(stem_sway)
        self.leaves.setH(leaf_sway)
        
        # Add subtle flower head tracking of sun (rotation)
        sun_tracking = math.sin(task.time * 0.5) * 15  # 15 degree rotation
        if self.growth_stages[self.current_stage]['flower_scale'] > 0:
            self.flower_head.setH(sun_tracking)
        
        return Task.cont

    def calculate_model_scale(self, model):
        """Calculate scale to fit model within max_size"""
        bounds = model.getTightBounds()
        if not bounds:
            print("Warning: Could not get model bounds")
            return self.base_scale
            
        min_point, max_point = bounds
        dimensions = max_point - min_point
        
        scale_factors = [
            self.max_size[0] / dimensions[0],
            self.max_size[1] / dimensions[1],
            self.max_size[2] / dimensions[2]
        ]
        
        base_scale = min(scale_factors)
        return base_scale * 0.01

def main():
    import os
    obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")  # Replace with your actual sunflower model path
    
    simulation = SunflowerGrowthSimulation(
        obj_path,
        max_size=(2, 2, 3)
    )
    simulation.run()

if __name__ == "__main__":
    main()