

interface User{
    email:string,
    password:string
}

interface UserConfig{
    LoginUrl:string,
    LogoutUrl:string,
    RegisterUrl:string
}

export const UserConfig:UserConfig = {
    LoginUrl:"login",
    LogoutUrl:"logout",
    RegisterUrl:"register"
}