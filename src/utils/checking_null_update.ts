
export const CheckIsNull = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (data[key] != undefined || data[key] != null) {
                data[key] = update_data[key]
            }
        })
    }

    return update_data

}

export const CheckIsNullWithNumber = (data: Record<string, any>) => {

    const update_data: Record<string, any> = {}

    if (data && typeof data == "object") {
        Object.keys(data).forEach((key) => {
            if (typeof data[key] == "number") {
                data[key] = Number(update_data[key])
            }
            data[key] = update_data[key]
        })
    }

    return update_data

}