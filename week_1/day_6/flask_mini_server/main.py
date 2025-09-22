from flask import Flask, jsonify, request, abort
from math import ceil

app = Flask(__name__)

# Initial sample data
students = [
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com",
        "age": 20,
        "gender": "male"
    },
    {
        "id": 2,
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "age": 21,
        "gender": "female"
    },
    {
        "id": 3,
        "name": "Jim Doe",
        "email": "jim.doe@example.com",
        "age": 22,
        "gender": "male"
    },
    {
        "id": 4,
        "name": "Jill Doe",
        "email": "jill.doe@example.com",
        "age": 19,
        "gender": "female"
    },
    {
        "id": 5,
        "name": "Jack Doe",
        "email": "jack.doe@example.com",
        "age": 23,
        "gender": "male"
    }
]

# Helper function to find student by ID
def find_student(student_id):
    """
    Find a student by their ID.
    
    Args:
        student_id (int): The ID of the student to find
        
    Returns:
        dict or None: The student dictionary if found, None otherwise
    """
    for student in students:
        if student['id'] == student_id:
            return student
    return None

# Helper function to get next available ID
def get_next_id():
    """
    Get the next available student ID.
    
    Returns:
        int: The next available ID
    """
    if not students:
        return 1
    return max(student['id'] for student in students) + 1

# Error Handlers
@app.errorhandler(404)
def not_found(error):
    """
    Global 404 error handler.
    
    Returns:
        Response: JSON error response with 404 status code
    """
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(Exception)
def handle_exception(error):
    """
    Global exception handler.
    
    Returns:
        Response: JSON error response with 500 status code
    """
    return jsonify({
        "error": "An error occurred",
        "message": str(error)
    }), 500

# API Endpoints

@app.route('/students', methods=['GET'])
def get_students():
    """
    Retrieve all students with pagination support.
    
    Query Parameters:
        page (int, optional): Page number (default: 1)
        limit (int, optional): Number of students per page (default: 10)
        
    Returns:
        Response: JSON response with paginated students data
    """
    try:
        # Get pagination parameters with defaults
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 10))
        
        # Validate pagination parameters
        if page < 1 or limit < 1:
            return jsonify({"error": "Page and limit must be positive integers"}), 400
        
        # Calculate pagination
        start_index = (page - 1) * limit
        end_index = start_index + limit
        
        # Get paginated students
        paginated_students = students[start_index:end_index]
        
        # Prepare response
        response = {
            "students": paginated_students,
            "pagination": {
                "page": page,
                "limit": limit,
                "total_students": len(students),
                "total_pages": ceil(len(students) / limit),
                "has_next": end_index < len(students),
                "has_prev": page > 1
            }
        }
        
        return jsonify(response)
    
    except ValueError:
        return jsonify({"error": "Invalid page or limit parameter"}), 400

@app.route('/students/<int:student_id>', methods=['GET'])
def get_student(student_id):
    """
    Retrieve a specific student by ID.
    
    Args:
        student_id (int): The ID of the student to retrieve
        
    Returns:
        Response: JSON response with student data or null if not found
    """
    student = find_student(student_id)
    if student is None:
        return jsonify(None), 200
    return jsonify(student)

@app.route('/students', methods=['POST'])
def create_student():
    """
    Create a new student.
    
    Request Body:
        JSON object with student data (name, email, age, gender)
        
    Returns:
        Response: JSON response with created student data including assigned ID
    """
    try:
        # Get JSON data from request
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'age', 'gender']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Validate data types
        try:
            age = int(data['age'])
            if age <= 0:
                return jsonify({"error": "Age must be a positive integer"}), 400
        except ValueError:
            return jsonify({"error": "Age must be a valid integer"}), 400
        
        # Check if email already exists
        if any(student['email'] == data['email'] for student in students):
            return jsonify({"error": "Email already exists"}), 400
        
        # Create new student
        new_student = {
            "id": get_next_id(),
            "name": data['name'].strip(),
            "email": data['email'].strip(),
            "age": age,
            "gender": data['gender'].strip().lower()
        }
        
        # Add to students list
        students.append(new_student)
        
        return jsonify(new_student), 201
    
    except Exception as e:
        return jsonify({"error": "Invalid JSON data"}), 400

@app.route('/students/<int:student_id>', methods=['PUT'])
def update_student(student_id):
    """
    Update an existing student.
    
    Args:
        student_id (int): The ID of the student to update
        
    Returns:
        Response: JSON response with updated student data
    """
    try:
        # Find the student
        student = find_student(student_id)
        if student is None:
            return jsonify({"error": "Student not found"}), 404
        
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Update student fields if provided
        if 'name' in data:
            student['name'] = data['name'].strip()
        
        if 'email' in data:
            new_email = data['email'].strip()
            # Check if email already exists (excluding current student)
            if any(s['email'] == new_email and s['id'] != student_id for s in students):
                return jsonify({"error": "Email already exists"}), 400
            student['email'] = new_email
        
        if 'age' in data:
            try:
                age = int(data['age'])
                if age <= 0:
                    return jsonify({"error": "Age must be a positive integer"}), 400
                student['age'] = age
            except ValueError:
                return jsonify({"error": "Age must be a valid integer"}), 400
        
        if 'gender' in data:
            student['gender'] = data['gender'].strip().lower()
        
        return jsonify(student)
    
    except Exception as e:
        return jsonify({"error": "Invalid JSON data"}), 400

@app.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student(student_id):
    """
    Delete a student.
    
    Args:
        student_id (int): The ID of the student to delete
        
    Returns:
        Response: JSON response with deleted student data
    """
    student = find_student(student_id)
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    
    # Remove student from list
    students.remove(student)
    
    return jsonify(student)

@app.route('/')
def home():
    """
    Home endpoint with API information.
    
    Returns:
        Response: Welcome message and API information
    """
    return jsonify({
        "message": "Flask Student CRUD API",
        "version": "1.0.0",
        "endpoints": {
            "GET /students": "Get all students with pagination",
            "GET /students/<id>": "Get student by ID",
            "POST /students": "Create new student",
            "PUT /students/<id>": "Update student",
            "DELETE /students/<id>": "Delete student"
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)