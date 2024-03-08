import Storage from "../Utils/Storage";
const getAccount = async () => {
    return Storage.get('account');
}

async function setAccount(data) {
    return await Storage.set('account', data);
}

async function logout() {
    return await Storage.set('account', null);
  }


const AuthService = {
    getAccount,
    setAccount,
    logout
}

export default AuthService;