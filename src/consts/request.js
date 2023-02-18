import axios from "axios";

export const API = {
    Host: "http://192.168.0.105:5000/api/",
    User: "User",
    Customer: "Customer",
    Point: "Customer/Point",
    UserLogin: "User/Login",
    Office: "Office/paging",
    OfficeID: "Office",

    CategoryOffice: "CategoryOffice",
    CategoryOfficeAll: "CategoryOffice/all",

    OfficeImage: "OfficeImage/id",
    Booking: "Booking",
    BookingDetail: "BookingDetail",
    BookingHistory: "Booking/User",
    AreaId: 1,
}

export const checkContainId = (array, id) => {
    return array.find((x) => x.ID == id) !== undefined;
}
const officeCached = new Map();
export const clearCache = () => {
    officeCached.clear();
}
export const getOfficebyIdFromCache = async (id) => {
    const cached = officeCached.get(id)
    if (cached) {
        // console.log("get from cached getOfficebyId")

        return cached
    }
    const req = await getOfficebyId(id)
    if (req) {
        saveOfficebyIdToCache(id, req)
        return req
    }
    return undefined
}

export const saveOfficebyIdToCache = (id, item) => {
    // console.log("saved cache")
    officeCached.set(id, item)
}

export const getOfficebyId = async (id) => {
    // console.log("request getOfficebyId")

    try {
        const res = await axios({
            method: 'get',
            url: API.Host + API.OfficeID + `/ID?id=${id}`,
        })
        if (res.status == 200) {
            if (res.data) {
                if (res.data.OfficeImages) {
                    var imageList = []
                    await Promise.all(res.data.OfficeImages.map(async e => {
                        const imageData = await getImageById(e.ID)
                        if (imageData) {
                            imageList.push(imageData)
                        }
                    }))
                    res.data.ImageList = imageList
                }
                return res.data
            }
        }
    } catch (error) {
        console.log('[ERROR][getOfficebyId] ' + error.message)
        return undefined
    }
}
export const getListbyId = async (id) => {
    const url = API.Host + API.CategoryOffice + `?id=${id}`
    var data = []
    try {
        const res = await axios({
            method: 'get',
            url: url,
        })
        if (res.status == 200) {
            if (res.data) {
                if (res.data.OfficeInCategory) {
                    await Promise.all(res.data.OfficeInCategory.map(async e => {
                        const element = await getOfficebyIdFromCache(e.OfficeId)
                        if (element) {
                            data.push(element)
                        }
                    }))
                    return data
                }
            }
            return data
        }

        else {
            throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
        }
    } catch (error) {
        console.log('[ERROR][getCategoryInit] ' + error.message)
        return data
    }
}

export const getImageById = async (id) => {
    const url = API.Host + API.OfficeImage + `?id=${id}`
    try {
        const res = await axios({
            method: 'get',
            url: url,
        })
        if (res.status == 200) {
            if (res.data) {
                if (res.data) {
                    return res.data.FileContents
                }
            }
        }
    } catch (error) {
        console.log('[ERROR][getImageById] ' + error.message)
        return undefined
    }
}

export const formatDate = (str) => {
    var datetime = new Date(str);
    return datetime.getFullYear() + "-" + (datetime.getMonth() + 1) + "-" + datetime.getDate()
}