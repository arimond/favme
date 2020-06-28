const sql = require("../config/database.js");

module.exports = class Profile{
    constructor(profile){
        this.email = profile.email;
        this.profession = profile.profession;
        this.phone = profile.phone;
        this.description = profile.description;
        this.image = profile.image;
    }

    // Get One profile by the profileId
    static getById(userId, result) {
        sql.query(
            'select profileEmail, profileProfession, profilePhone, profileDescription, profileImage from users where userId = ?',
            [userId],
            (err, res) => {
                 
                //Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Found profile for the User
                if(res.length){
                    //Create the return Object with proper keys
                    let myProfile = {
                        userId: userId,
                        email: res[0].profileEmail,
                        profession: res[0].profileProfession,
                        phone: res[0].profilePhone,
                        description: res[0].profileDescription,
                        image: res[0].profileImage
                    }
                    result(null, myProfile);
                    return;
                }
            }
        );
    }

    // Update a profile 
    static updateById(userId, profile, result) {
        sql.query(
            'UPDATE users SET profileEmail = ?, profileProfession = ?, profilePhone = ?, profileDescription = ?, profileImage = ? WHERE userId = ?',
            [profile.email, profile.profession, profile.phone, profile.description, profile.image, userId],
            (err, res) => {
                //Database Error
                if(err){
                    result(err, null);
                    return;
                }

                //Updated the Profile
                result(null, {userId: userId, ...profile});
            }    
        );
    }
}
