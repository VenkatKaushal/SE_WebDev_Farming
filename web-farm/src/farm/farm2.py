from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from panda3d.core import NodePath, Point3, Filename, LoaderOptions
from panda3d.core import Material, AmbientLight, DirectionalLight
from panda3d.core import VBase4, BoundingBox, Point3D
import math
import random

class PlantGrowthSimulation(ShowBase):
    def __init__(self, model_path, max_size=(0.2, 0.2, 0.3)):  # Reduced max_size by factor of 10
        ShowBase.__init__(self)
        
        # Size constraints
        self.max_size = max_size
        self.base_scale = 0.01  # Reduced base_scale from 0.1 to 0.01
        
        # Configure model loading
        self.model_path = Filename.fromOsSpecific(model_path)
        self.loader_options = LoaderOptions()
        self.loader_options.setFlags(LoaderOptions.LFSearch)
        
        # Growth parameters with smaller scales
        self.growth_stages = {
            'seedling': {
                'scale': self.base_scale,
                'duration': 5,
                'color': VBase4(0.2, 0.8, 0.2, 1.0)
            },
            'vegetative': {
                'scale': self.base_scale * 2,
                'duration': 10,
                'color': VBase4(0.1, 0.7, 0.1, 1.0)
            },
            'flowering': {
                'scale': self.base_scale * 3,
                'duration': 5,
                'color': VBase4(0.1, 0.6, 0.1, 1.0)
            },
            'mature': {
                'scale': self.base_scale * 4,
                'duration': 15,
                'color': VBase4(0.0, 0.5, 0.0, 1.0)
            }
        }
        
        # Setup scene and load model
        self.setup_scene()
        self.setup_lighting()
        self.load_plant_model()
        self.setup_growth_system()
        
        # Start simulation
        self.taskMgr.add(self.growthTask, "GrowthTask")
        self.taskMgr.add(self.environmentalEffectsTask, "EnvironmentalEffectsTask")
        
    def setup_scene(self):
        """Setup the 3D scene"""
        # Adjusted camera position for better viewing of smaller model
        self.cam.setPos(0, -1, 0.5)  # Moved camera closer
        self.cam.lookAt(Point3(0, 0, 0.1))  # Looking at a lower point
        
    def calculate_model_scale(self, model):
        """Calculate scale to fit model within max_size"""
        # Get model bounds
        bounds = model.getTightBounds()
        if not bounds:
            print("Warning: Could not get model bounds")
            return self.base_scale
            
        min_point, max_point = bounds
        
        # Calculate model dimensions
        dimensions = max_point - min_point
        
        # Calculate scale factors for each axis
        scale_factors = [
            self.max_size[0] / dimensions[0],
            self.max_size[1] / dimensions[1],
            self.max_size[2] / dimensions[2]
        ]
        
        # Use the smallest scale factor to maintain proportions
        base_scale = min(scale_factors)
        
        print(f"Model dimensions: {dimensions}")
        print(f"Calculated base scale: {base_scale}")
        
        return base_scale * 0.01  # Additional reduction factor for better visibility
        
    def load_plant_model(self):
        """Load the OBJ model with size constraints"""
        try:
            self.plant_model = self.loader.loadModel(self.model_path, 
                                                   loaderOptions=self.loader_options,
                                                   noCache=True)
            
            if not self.plant_model:
                raise Exception("Model failed to load")
            
            # Calculate appropriate scale
            self.base_scale = self.calculate_model_scale(self.plant_model)
            
            # Update growth stages with new base_scale
            for stage in self.growth_stages.values():
                stage['scale'] *= self.base_scale
            
            # Position and scale the model
            self.plant_model.setPos(0, 0, 0)
            self.plant_model.reparentTo(self.render)
            self.plant_model.setScale(self.base_scale)
            
            # Create and apply material
            self.plant_material = Material()
            initial_color = VBase4(0.2, 0.8, 0.2, 1.0)
            self.plant_material.setAmbient(initial_color)
            self.plant_material.setDiffuse(initial_color)
            self.plant_material.setSpecular(VBase4(0.1, 0.1, 0.1, 1.0))
            self.plant_model.setMaterial(self.plant_material)
            
            print(f"Successfully loaded model: {self.model_path}")
            print(f"Initial scale: {self.base_scale}")
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            print(f"Attempted to load from path: {self.model_path}")
            return False
            
    def setup_lighting(self):
        """Setup basic lighting for the scene"""
        # Add ambient light
        alight = AmbientLight('ambient')
        alight.setColor(VBase4(0.3, 0.3, 0.3, 1))
        alnp = self.render.attachNewNode(alight)
        self.render.setLight(alnp)
        
        # Add directional light
        dlight = DirectionalLight('directional')
        dlight.setColor(VBase4(0.7, 0.7, 0.7, 1))
        dlnp = self.render.attachNewNode(dlight)
        dlnp.setHpr(45, -45, 0)
        self.render.setLight(dlnp)
            
    def setup_growth_system(self):
        """Initialize growth system variables"""
        self.growth_time = 0
        self.current_stage = 'seedling'
        self.is_harvestable = False
        self.growth_rate = 1.0
        
    def update_plant_visualization(self):
        """Update plant appearance based on growth stage"""
        stage_data = self.growth_stages[self.current_stage]
        
        # Update scale with smoother transition
        current_scale = self.plant_model.getScale()
        target_scale = stage_data['scale']
        
        # Smooth scale transition
        new_scale = current_scale[0] + (target_scale - current_scale[0]) * 0.1
        self.plant_model.setScale(new_scale)
        
        # Update color
        color = stage_data['color']
        self.plant_material.setDiffuse(color)
        ambient_color = VBase4(color[0] * 0.5, color[1] * 0.5, color[2] * 0.5, 1.0)
        self.plant_material.setAmbient(ambient_color)

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
                    print(f"Plant entered {stage} stage")
                    self.current_stage = stage
                break
        
        # Update visualization
        self.update_plant_visualization()
        
        # Check harvest readiness
        if self.growth_time >= sum(stage['duration'] for stage in self.growth_stages.values()):
            if not self.is_harvestable:
                self.is_harvestable = True
                print("Plant is ready for harvest!")
        
        return Task.cont
        
    def environmentalEffectsTask(self, task):
        """Simulate environmental effects"""
        dt = globalClock.getDt()
        
        # Reduced sway amount for smaller model
        sway = math.sin(task.time * 2) * 0.1  # Reduced sway from 1 to 0.1
        self.plant_model.setH(sway)
        
        return Task.cont
        
    def harvest(self):
        """Harvest the plant if ready"""
        if self.is_harvestable:
            print("Harvesting plant...")
            
            # Reset growth parameters
            self.growth_time = 0
            self.current_stage = 'seedling'
            self.is_harvestable = False
            self.plant_model.setScale(self.base_scale)
            
            # Reset material color
            initial_color = VBase4(0.2, 0.8, 0.2, 1.0)
            self.plant_material.setDiffuse(initial_color)
            self.plant_material.setAmbient(VBase4(0.1, 0.4, 0.1, 1.0))
            
            return True
        return False

def main():
    import os
    obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")
    # obj_path = os.path.abspath("10439_Corn_Field_v1_max2010_it2.obj")
    # obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")
    # obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")
    # obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")
    
    simulation = PlantGrowthSimulation(
        obj_path,
        max_size=(200,200,300) 
    )
    simulation.run()

if __name__ == "__main__":
    main()