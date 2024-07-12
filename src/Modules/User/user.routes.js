import { Router } from "express";
import { Delete_account, Get_all_specific_recovery_Email, Get_another_user, Get_user, set_New_Password, SignIn, SignUp, update_account, Update_Password, verifyMail } from "./user.controler.js";
import { catchErrors } from "../../Middlewares/catchError.middleware.js";
import { emailExists, user_Found } from "../../Middlewares/emailExists.moddleware.js";
import { comparePass, hashPass } from "../../Middlewares/hashingPassword.middleware.js";
import { verify_ConfirmMail_Token, verify_Registration_Token } from "../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../Middlewares/Validation.middleware.js";
import { Delete_account_Validation, Forget_Password_check_otp_Validation, Forget_Password_reset_password_Validation, Forget_Password_sendOtp_Validation, Get_all_specific_recovery_Email_Validation, Get_another_user_Validation, Get_user_Validation, SignIn_Validation, signUpValidation, update_account_Validation, Update_Password_Validation, verify_Mail_Validation } from "./user.schema.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Utils/system-roles.utils.js";
import { check_otp_exsists, forget_Password_Middleware } from "../../Middlewares/forgetPass.middleWare.js";

const routes = Router();

routes.post("/",
    catchErrors(validationMiddleware(signUpValidation)),
    catchErrors(emailExists),
    catchErrors(hashPass),
    catchErrors(SignUp)
)



routes.get("/verifyMail/:token",
    catchErrors(validationMiddleware(verify_Mail_Validation)),
    catchErrors(verify_ConfirmMail_Token),
    catchErrors(verifyMail),
)

routes.post("/SignIn",
    catchErrors(validationMiddleware(SignIn_Validation)),
    catchErrors(SignIn),
)



routes.put("/update_account",
    catchErrors(validationMiddleware(update_account_Validation)),
    catchErrors(emailExists),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.USER)),
    catchErrors(update_account),
)

routes.delete("/Delete_account/:id",
    catchErrors(validationMiddleware(Delete_account_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.USER)),
    catchErrors(Delete_account),
)

routes.get("/",
    catchErrors(validationMiddleware(Get_user_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.USER)),
    catchErrors(Get_user),
)

routes.get("/Get_another_user/:id",
    catchErrors(validationMiddleware(Get_another_user_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(Get_another_user),
)


routes.patch("/Update_Password",
    catchErrors(validationMiddleware(Update_Password_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.USER)),
    catchErrors(hashPass),
    catchErrors(Update_Password),
)


// Forget_Password middleware

routes.post("/Forget_Password/sendOtp",
    catchErrors(validationMiddleware(Forget_Password_sendOtp_Validation)),
    catchErrors(forget_Password_Middleware),
)

routes.post("/Forget_Password/check_otp",
    catchErrors(validationMiddleware(Forget_Password_check_otp_Validation)),
    catchErrors(check_otp_exsists),
)


routes.post("/Forget_Password/reset_password",
    catchErrors(validationMiddleware(Forget_Password_reset_password_Validation)),
    catchErrors(user_Found),
    catchErrors(hashPass),
    catchErrors(set_New_Password),
)

//===========




routes.get("/Get_all_specific_recovery_Email",
    catchErrors(validationMiddleware(Get_all_specific_recovery_Email_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(Get_all_specific_recovery_Email),
)


routes.get("/Update_company_data",
    catchErrors(validationMiddleware(Get_all_specific_recovery_Email_Validation)),
    catchErrors(verify_Registration_Token),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(Get_all_specific_recovery_Email),
)








export default routes