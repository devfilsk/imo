interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    }
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: "34i5h23kjtfnaw845uiq2j3r92tp8fnq24juf9p", 
                user: { 
                    name: "Filipe Maciel",
                    email: "devfilsk@gmail.com"
                }
            })
        }, 2000)
    });
}