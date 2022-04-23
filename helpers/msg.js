module.exports.msg = function(code,language){
    var codeArr = {
        "MSG001": "Invalid request data!",
        "MSG002": "Something went wrong! Please try again.",
        "MSG003": "Unauthorised user!",
        "MSG004" : "User Registration successfully",
        "MSG005" : "User Login successfully",
        "MSG006" : "Invalid Password",
        "MSG007" : "Get User Profile",
    }
    return (typeof codeArr[code] !== "undefined" ? codeArr[code] : "");
}