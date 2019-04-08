export const handleResponse = (res, status, message, data, success) => {
    return res.status(status).json({
        message,
        data,
        success
    })
}