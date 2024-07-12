const systemRoles = {
    USER: "user",
    COMPANY_HR: "company_HR",
}


const { COMPANY_HR, USER } = systemRoles


export const roles = {
    COMPANY_HR$USER: [COMPANY_HR, USER],
    USER: [USER],
    COMPANY_HR: [COMPANY_HR],
}