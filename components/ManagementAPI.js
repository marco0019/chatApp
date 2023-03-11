import Axios from 'axios'
const serverLink = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/data-kxsej/service/exampleApi/incoming_webhook/"
export class Api{
    static getAll(database, collection){
        var response;
        Axios.get(`${serverLink}getAll?secret=getAll&database=${database}&collection=${collection}`)
        .then((res)=>response = res.data)
        .catch((err)=>response = null)
        return response;
    }
    static insertMessage(user, type, content){
        Axios.post(`${serverLink}insertMessage?secret=insertMessage&user=${user}&type=${type}&content=${content}`)
    }
    static insertUser(usr, email, pass){
        Axios.post(`${serverLink}insertUser?secret=insertUser&usr=${usr}$email=${email}&pass=${pass}`)
    }
    static getUser(usr){
        var response;
        Axios.get(`${serverLink}getUser?secret=getUser&usr=${usr}`)
        .then((res)=>response = res.data)
        .catch((err)=>response=null)
        return response;
    }
    static getChatList(){

    }
}