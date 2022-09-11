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
        "edit": {
            "success": "Password updated successfully.",
            "fail": "Password update failed.",
        },
    },
    "url": {
        "add": {
            "success": "URL added successfully.",
            "failed": "Failed to add the URL.",
        },
        "get": {
            "fail": "Failed to add URL.",
        },
        "delete": {
            "success": "URL deleted successfully.",
            "fail": "Failed to delete URL.",
        },
        "edit": {
            "success": "URL edited successfully.",
            "fail": "Failed to edit URL.",
        },
    },
    "permissions": {
        "cant_do_that": "You can't do that!",
        "not_allowed": "You're not allowed to do this!",
        "user_already_exists": "This user already exists!",
        "url_already_exists": "This short URL already exists!",
        "not_logged_in": "You're not logged in!",
    },
    "error": {
        "internal_error": "Something went wrong.",
        "bad_request": "One or more fields is missing.",
        "error_occured": "An error occured.",
    },




}

export default messages;