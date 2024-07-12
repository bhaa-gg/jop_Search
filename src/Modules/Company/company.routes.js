import { Router } from "express";
import { Add_company, applications_for_specific_Job, Delete_company, Get_company_data, search_Company_Name, Update_company_data } from "./company.controler.js";
import { catchErrors } from "../../Middlewares/catchError.middleware.js";
import { verify_Registration_Token } from "../../Middlewares/authentication.middleware.js";
import { roles } from "../../Utils/system-roles.utils.js";
import { authorizationMiddleware } from "../../Middlewares/authorization.middleware.js";
import { company_HR_Exists } from "../../Middlewares/companyMiddlewares/checkCompanyHr.js";
import { validationMiddleware } from "../../Middlewares/Validation.middleware.js";
import { Add_company__Validation, applications_for_specific_Job_Validation, Delete_company_Validation, Get_company_data_Validation, search_Company_Name_Validation } from "./company.schema.js";
import { Duplicate_company_Mail } from "../../Middlewares/companyMiddlewares/check-company-mail.js";



const routes = Router()


routes.use(catchErrors(verify_Registration_Token))


routes.post("/Add_company",
    catchErrors(validationMiddleware(Add_company__Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(Duplicate_company_Mail),
    catchErrors(company_HR_Exists),
    catchErrors(Add_company)
)

routes.post("/Update_company_data",
    catchErrors(validationMiddleware(Add_company__Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(Update_company_data)
)


routes.delete("/Delete_company",
    catchErrors(validationMiddleware(Delete_company_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(Delete_company)
)

routes.get("/Get_company_data/:id",
    catchErrors(validationMiddleware(Get_company_data_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(Get_company_data)
)


routes.get("/search_Company_Name",
    catchErrors(validationMiddleware(search_Company_Name_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR$USER)),
    catchErrors(search_Company_Name)
)

routes.get("/applications_for_specific_Job/:id",
    catchErrors(validationMiddleware(applications_for_specific_Job_Validation)),
    catchErrors(authorizationMiddleware(roles.COMPANY_HR)),
    catchErrors(applications_for_specific_Job)
)



export default routes