import { Router } from "express";
import { Add_Job, all_Jobs_specific_company, all_Jobs_With_filters, Delete_Job, Jobs_with_company, Update_Job } from "./jop.controler.js";
import { catchErrors } from "../../Middlewares/catchError.middleware.js";
import { validationMiddleware } from "../../Middlewares/Validation.middleware.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Utils/system-roles.utils.js";
import { verify_Registration_Token } from "../../Middlewares/authentication.middleware.js";
import { checkCompany_Exists, checkCompany_HrId_forJob, get_Company_byName } from "../../Middlewares/jobMiddlewares/companyHrId_Exisits.js";
import { Add_Job_Validation, all_Jobs_specific_company_Validation, all_Jobs_With_filters_Validation, Delete_Job_Validation, Jobs_with_company_Validation, Update_Job_Validation } from "./job.schema.js";

const routes = Router();

routes.use(catchErrors(verify_Registration_Token))



routes.post("/Add_Job",
    catchErrors(validationMiddleware(Add_Job_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(checkCompany_HrId_forJob),
    catchErrors(Add_Job),
)


routes.put("/Update_Job/:id",
    catchErrors(validationMiddleware(Update_Job_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(checkCompany_HrId_forJob),
    catchErrors(Update_Job),
)

routes.delete("/Delete_Job/:id",
    catchErrors(validationMiddleware(Delete_Job_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(Delete_Job),
)

routes.get("/Jobs_with_company",
    catchErrors(validationMiddleware(Jobs_with_company_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(Jobs_with_company),
)

routes.get("/all_Jobs_specific_company",
    catchErrors(validationMiddleware(all_Jobs_specific_company_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(get_Company_byName),
    catchErrors(all_Jobs_specific_company),
)



routes.get("/all_Jobs_With_filters",
    catchErrors(validationMiddleware(all_Jobs_With_filters_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(all_Jobs_With_filters),
)


export default routes