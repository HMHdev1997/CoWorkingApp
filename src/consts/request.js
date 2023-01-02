export const API={
    Host: "http://192.168.0.105:5000/api/",
    User: "User",
    Customer: "Customer",
    UserLogin: "User/Login",
    Office: "Office/paging",
    OfficeID: "Office",

    CategoryOffice: "CategoryOffice",
    CategoryOfficeAll: "CategoryOffice/all",

    Booking: "Booking",
    AreaId: 1,
}


export async function sendReq(path, method, formData)  {
    try {
        const url = Host + path
        const response = await fetch(url,
            {
                body: formData,
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
            });
            
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data    
    } catch (e) {
        throw e
    }
}
