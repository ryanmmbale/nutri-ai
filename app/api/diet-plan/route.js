import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.static('.'));
app.use(express.json());
app.use(cors());

const users = {};
const dietPlans = {
    hypertension: {
        name: 'Hypertension Management',
        meals: [
            {
                breakfast: 'Oatmeal with berries, low-fat milk',
                lunch: 'Grilled chicken salad with olive oil dressing',
                dinner: 'Baked fish with steamed vegetables'
            }
        ],
        tips: [
            'Limit sodium intake',
            'Eat more fruits and vegetables',
            'Avoid processed foods'
        ]
    },
    weight_management: {
        name: 'Weight Management',
        meals: [
            {
                breakfast: 'Greek yogurt with honey and nuts',
                lunch: 'Quinoa bowl with vegetables and lean protein',
                dinner: 'Grilled chicken breast with sweet potato'
            }
        ],
        tips: [
            'Control portion sizes',
            'Eat protein-rich foods',
            'Stay hydrated'
        ]
    },
    diabetes: {
        name: 'Diabetes Control',
        meals: [
            {
                breakfast: 'Whole grain toast with avocado',
                lunch: 'Turkey and vegetable wrap',
                dinner: 'Lentil soup with mixed vegetables'
            }
        ],
        tips: [
            'Monitor carbohydrate intake',
            'Eat at regular intervals',
            'Choose low glycemic foods'
        ]
    }
};

app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

app.get('/api/diet-plan/:planType', (req, res) => {
    const planType = req.params.planType;
    if (dietPlans[planType]) {
        return res.json(dietPlans[planType]);
    }
    res.status(404).json({ error: 'Plan not found' });
});

app.post('/api/track-health', (req, res) => {
    const { user_id, weight, blood_pressure, date } = req.body;
    if (!users[user_id]) {
        users[user_id] = [];
    }
    users[user_id].push({ weight, blood_pressure, date });
    res.json({ message: 'Health data recorded successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
