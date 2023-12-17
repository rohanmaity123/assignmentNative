import Storage from "../Utils/Storage";

const getAccount = async () => {
    return Storage.get('account');
}

const setAccount = async (data)=> {
    return Storage.set('account', data);
}
const AuthService = {
    getAccount,
    setAccount,
}

export default AuthService;