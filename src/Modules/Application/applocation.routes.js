import { Router } from "express";
import { verify_Registration_Token } from "../../Middlewares/authentication.middleware.js";
import { validationMiddleware } from "../../Middlewares/Validation.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Utils/system-roles.utils.js";
import { catchErrors } from "../../Middlewares/catchError.middleware.js";
import { new_Application } from "./applocation.controler.js";
import { check_job_With_User, check_jobId } from "../../Middlewares/ApplicationMiddleware/CheckApplicationData.js";
import { new_Application_Validation } from "./applicatio.schema.js";



const routes = Router();


// verify Registration Token routes 
routes.use(catchErrors(verify_Registration_Token))


routes.post("/new_Application",
    // validations routes 
    catchErrors(validationMiddleware(new_Application_Validation)),

    // authorization routes 
    catchErrors(authorizationMiddleware(roles.USER)),

    catchErrors(check_jobId),

    catchErrors(check_job_With_User),

    catchErrors(new_Application),
)


export default routes