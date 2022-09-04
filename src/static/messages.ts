let messages = {
    
    "auth": {
        "password": {
            "min_chars": "Password should be minimum 8 characters!",
            "max_chars": "Password should not be more than 100 charcters!",
            "no_spaces": "Password should not have any spaces",
        },
        "login": {
            "success": "Login successful.",
            "failed": "Login failed.",
    
        },
        "logout": {
            "success": "Logout successful.",
            "failed": "Logout failed.",
        },
        "register": {
            "success": "Registration successful.",
            "fail": "Registration failed.",
        },
        "delete": {
            "success": "Account deleted.",
            "fail": "Deletion failed.",
        },
        
    },
    "permissions": {
        "cant_do_that": "You can't do that!",
        "not_allowed": "You're not allowed to do this!",
        "user_already_exists": "This user already exists!",
        "not_logged_in": "You're not logged in!",
    },
    "error": {
        "internal_error": "Something went wrong.",
        "bad_request": "One or more fields is missing.",
        "error_occured": "An error occured.",
    },




}

export default messages;