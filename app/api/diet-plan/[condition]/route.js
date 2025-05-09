export async function POST(request, { params }) {
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

    try {
        // Get params and body data
        const condition = await Promise.resolve(params.condition);
        const body = await request.json();
        const { age, weight, height } = body;

        // Check if the diet plan exists
        if (!dietPlans[condition]) {
            return new Response(
                JSON.stringify({ error: 'Plan not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        // Calculate BMI
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

        // Prepare response
        const response = {
            ...dietPlans[condition],
            personalStats: {
                bmi: bmi,
                age: age
            }
        };

        return new Response(
            JSON.stringify(response),
            {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-store'
                }
            }
        );

    } catch (error) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to generate diet plan' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}