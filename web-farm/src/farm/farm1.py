from direct.showbase.ShowBase import ShowBase
from direct.task import Task
from panda3d.core import NodePath, Point3, Filename, LoaderOptions
from panda3d.core import Material, AmbientLight, DirectionalLight
from panda3d.core import VBase4
import math
import random

class PlantGrowthSimulation(ShowBase):
    def __init__(self, model_path):
        ShowBase.__init__(self)
        
        # Configure model loading
        self.model_path = Filename.fromOsSpecific(model_path)
        self.loader_options = LoaderOptions()
        self.loader_options.setFlags(LoaderOptions.LFSearch)
        
        # Growth parameters
        self.growth_stages = {
            'seedling': {
                'scale': 0.2,
                'duration': 5,
                'color': VBase4(0.2, 0.8, 0.2, 1.0)  # Using VBase4 for color
            },
            'vegetative': {
                'scale': 0.6,
                'duration': 10,
                'color': VBase4(0.1, 0.7, 0.1, 1.0)
            },
            'flowering': {
                'scale': 0.8,
                'duration': 5,
                'color': VBase4(0.1, 0.6, 0.1, 1.0)
            },
            'mature': {
                'scale': 1.0,
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
        self.cam.setPos(0, -10, 5)
        self.cam.lookAt(Point3(0, 0, 0))
        
    def setup_lighting(self):
        """Setup basic lighting"""
        # Ambient light
        alight = AmbientLight('ambient')
        alight.setColor(VBase4(0.4, 0.4, 0.4, 1.0))
        self.ambient_np = self.render.attachNewNode(alight)
        self.render.setLight(self.ambient_np)
        
        # Directional light (sun)
        dlight = DirectionalLight('sun')
        dlight.setColor(VBase4(0.8, 0.8, 0.8, 1.0))
        self.sun_np = self.render.attachNewNode(dlight)
        self.sun_np.setHpr(45, -45, 0)
        self.render.setLight(self.sun_np)
        
    def load_plant_model(self):
        """Load the OBJ model"""
        try:
            self.plant_model = self.loader.loadModel(self.model_path, 
                                                   loaderOptions=self.loader_options,
                                                   noCache=True)
            
            if not self.plant_model:
                raise Exception("Model failed to load")
            
            # Position and scale the model
            self.plant_model.setPos(0, 0, 0)
            self.plant_model.reparentTo(self.render)
            self.plant_model.setScale(0.2)  # Start with seedling scale
            
            # Create and apply material
            self.plant_material = Material()
            initial_color = VBase4(0.2, 0.8, 0.2, 1.0)
            self.plant_material.setAmbient(initial_color)    # Base color
            self.plant_material.setDiffuse(initial_color)    # Main color
            self.plant_material.setSpecular(VBase4(0.1, 0.1, 0.1, 1.0))  # Slight shine
            self.plant_model.setMaterial(self.plant_material)
            
            print(f"Successfully loaded model: {self.model_path}")
            return True
            
        except Exception as e:
            print(f"Error loading model: {e}")
            print(f"Attempted to load from path: {self.model_path}")
            return False
            
    def setup_growth_system(self):
        """Initialize growth system variables"""
        self.growth_time = 0
        self.current_stage = 'seedling'
        self.is_harvestable = False
        self.growth_rate = 1.0
        
    def update_plant_visualization(self):
        """Update plant appearance based on growth stage"""
        stage_data = self.growth_stages[self.current_stage]
        
        # Update scale
        current_scale = self.plant_model.getScale()
        target_scale = stage_data['scale']
        
        # Smooth scale transition
        new_scale = current_scale[0] + (target_scale - current_scale[0]) * 0.1
        self.plant_model.setScale(new_scale)
        
        # Update color - now using VBase4
        color = stage_data['color']
        self.plant_material.setDiffuse(color)  # Pass color as single VBase4
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
        
        # Simple swaying animation
        sway = math.sin(task.time * 2) * 2
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
            self.plant_model.setScale(0.2)
            
            # Reset material color
            initial_color = VBase4(0.2, 0.8, 0.2, 1.0)
            self.plant_material.setDiffuse(initial_color)
            self.plant_material.setAmbient(VBase4(0.1, 0.4, 0.1, 1.0))
            
            return True
        return False

def main():
    import os
    obj_path = os.path.abspath("10454_Sugarcane_Field_v1_2009_it2.obj")  # Replace with your actual path
    simulation = PlantGrowthSimulation(obj_path)
    simulation.run()

if __name__ == "__main__":
    main()