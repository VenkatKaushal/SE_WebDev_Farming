describe('Simulation Workflow', () => {
    it('should allow a user to drag and drop a crop onto the canvas', () => {
      cy.visit('your-app-url');
      
      // Drag and drop the crop
      cy.get('[data-testid="crop-item"]').trigger('dragstart');
      cy.get('[data-testid="simulation-canvas"]').trigger('drop');
  
      // Assert that the crop appears on the canvas
      cy.get('[data-testid="canvas-content"]').should('contain', 'Crop Name'); // Check for crop presence
    });
  });
  