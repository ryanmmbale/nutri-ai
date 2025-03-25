from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Sample data storage (in a real application, you'd use a database)
users = {}
diet_plans = {
    'hypertension': {
        'name': 'Hypertension Management',
        'meals': [
            {
                'breakfast': 'Oatmeal with berries, low-fat milk',
                'lunch': 'Grilled chicken salad with olive oil dressing',
                'dinner': 'Baked fish with steamed vegetables'
            }
        ],
        'tips': [
            'Limit sodium intake',
            'Eat more fruits and vegetables',
            'Avoid processed foods'
        ]
    },
    'weight_management': {
        'name': 'Weight Management',
        'meals': [
            {
                'breakfast': 'Greek yogurt with honey and nuts',
                'lunch': 'Quinoa bowl with vegetables and lean protein',
                'dinner': 'Grilled chicken breast with sweet potato'
            }
        ],
        'tips': [
            'Control portion sizes',
            'Eat protein-rich foods',
            'Stay hydrated'
        ]
    },
    'diabetes': {
        'name': 'Diabetes Control',
        'meals': [
            {
                'breakfast': 'Whole grain toast with avocado',
                'lunch': 'Turkey and vegetable wrap',
                'dinner': 'Lentil soup with mixed vegetables'
            }
        ],
        'tips': [
            'Monitor carbohydrate intake',
            'Eat at regular intervals',
            'Choose low glycemic foods'
        ]
    }
}

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/api/diet-plan/<plan_type>')
def get_diet_plan(plan_type):
    if plan_type in diet_plans:
        return jsonify(diet_plans[plan_type])
    return jsonify({'error': 'Plan not found'}), 404

@app.route('/api/track-health', methods=['POST'])
def track_health():
    data = request.json
    user_id = data.get('user_id')
    if user_id not in users:
        users[user_id] = []
    users[user_id].append({
        'weight': data.get('weight'),
        'blood_pressure': data.get('blood_pressure'),
        'date': data.get('date')
    })
    return jsonify({'message': 'Health data recorded successfully'})

if __name__ == '__main__':
    app.run(debug=True)