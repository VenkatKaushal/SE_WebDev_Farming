import React from 'react';
import './fertilizer_info.css'; // Make sure this path is correct

const FertilizerInfo = () => {
    return (
        <div className="info-fertilizer">
            <h1>Fertilizers and Pesticides Information</h1>

            <h2>1. Neem Oil</h2>
            <p>Neem oil is a natural pesticide derived from the seeds of the neem tree. It's effective against a variety of pests and diseases.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Dilution:</strong> Mix 2 tablespoons of neem oil with 1 gallon of water.</li>
                <li><strong>Application:</strong> Spray on affected plants in the early morning or late afternoon.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Test before full application on a small area.</li>
                <li>Apply every 7-14 days for best results.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Don’t apply in direct sunlight.</li>
                <li>Avoid overuse to protect beneficial insects.</li>
            </ul>

            <h2>2. Pyrethrin</h2>
            <p>Pyrethrin is a natural insecticide made from chrysanthemum flowers that targets many common pests.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Dilution:</strong> Follow the manufacturer’s instructions.</li>
                <li><strong>Application:</strong> Spray directly onto pests for immediate effect.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Wear protective gear like gloves and a mask.</li>
                <li>Apply in calm weather to prevent drift.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Avoid overuse to prevent resistance in pest populations.</li>
                <li>Don’t spray near water sources.</li>
            </ul>

            <h2>3. Glyphosate</h2>
            <p>Glyphosate is a broad-spectrum herbicide used to kill weeds, especially annual broadleaf weeds and grasses.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Dilution:</strong> Mix according to the manufacturer’s guidelines.</li>
                <li><strong>Application:</strong> Apply on a dry, calm day.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Use spot treatment to avoid harming desired plants.</li>
                <li>Wait until spray dries before allowing pets in the area.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Avoid application before rain.</li>
                <li>Don’t use on weeds in flower to protect pollinators.</li>
            </ul>

            <h2>4. Compost (Organic Fertilizer)</h2>
            <p>Compost is decomposed organic matter that enriches soil and improves plant health.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Application Rate:</strong> Spread 1-2 inches on garden beds.</li>
                <li><strong>Top Dressing:</strong> Apply around existing plants for a nutrient boost.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Keep it moist after applying.</li>
                <li>Monitor for odors; properly made compost should smell earthy.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Avoid using too much compost.</li>
                <li>Don’t apply fresh compost to prevent burning plants.</li>
            </ul>

            <h2>5. Bone Meal (Organic Fertilizer)</h2>
            <p>Bone meal is high in phosphorus and beneficial for root development and flowering.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Application Rate:</strong> Use 1-2 cups per 10 square feet.</li>
                <li><strong>Mixing:</strong> Incorporate into the soil or top-dress.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Water after application.</li>
                <li>Use in fall or spring before the growing season.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Don’t overapply, as it can lead to environmental issues.</li>
                <li>Avoid using in wet conditions.</li>
            </ul>

            <h2>6. Epsom Salt (Magnesium Sulfate)</h2>
            <p>Epsom salt provides magnesium and sulfur, essential nutrients for plant growth.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Dissolve:</strong> Mix 1 tablespoon in 1 gallon of water.</li>
                <li><strong>Application:</strong> Spray on foliage or apply to the soil.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Use sparingly every 4-6 weeks during the growing season.</li>
                <li>Check soil levels to ensure magnesium is needed.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Avoid overapplication.</li>
                <li>Don’t ignore soil tests.</li>
            </ul>

            <h2>7. Liquid Fertilizers</h2>
            <p>Liquid fertilizers provide quick nutrition to plants and are easily absorbed.</p>
            <h3>How to Use:</h3>
            <ul>
                <li><strong>Dilution:</strong> Follow package instructions.</li>
                <li><strong>Application:</strong> Watered into the soil or sprayed, typically every 2-4 weeks.</li>
            </ul>
            <h3>What to Do:</h3>
            <ul>
                <li>Water plants first to prevent root burn.</li>
                <li>Use during the growing season.</li>
            </ul>
            <h3>What Not to Do:</h3>
            <ul>
                <li>Avoid using too frequently to prevent salt buildup.</li>
                <li>Don’t apply during dormancy.</li>
            </ul>

            <footer>
                <p>For more information, consult agricultural resources or local extension services.</p>
            </footer>
        </div>
    );
};

export default FertilizerInfo;