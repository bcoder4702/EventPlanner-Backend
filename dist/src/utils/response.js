/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array | null} data
 * @param   {number} statusCode
 */
const success = (message, data, statusCode) => {
    return {
        message,
        error: false,
        code: statusCode,
        data: data
    };
};
/**
 * @desc    Send any error response
 *
 * @param   {string} message
 * @param   {number} statusCode
 */
const error = (message, statusCode) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    const findCode = codes.find((code) => code == statusCode);
    if (!findCode)
        statusCode = 500;
    else
        statusCode = findCode;
    return {
        message,
        code: statusCode,
        error: true
    };
};
/**
 * @desc    Send any validation response
 *
 * @param   {object | array} errors
 */
const validation = (errors) => {
    return {
        message: 'Validation errors',
        error: true,
        code: 422,
        errors
    };
};
export { success, error, validation };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFPLEdBQUcsQ0FBQyxPQUFlLEVBQUUsSUFBYSxFQUFFLFVBQWtCLEVBQUUsRUFBRTtJQUNyRSxPQUFPO1FBQ0wsT0FBTztRQUNQLEtBQUssRUFBRSxLQUFLO1FBQ1osSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLElBQUk7S0FDWCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7Ozs7O0dBS0c7QUFDSCxNQUFNLEtBQUssR0FBRyxDQUFDLE9BQWUsRUFBRSxVQUFrQixFQUFFLEVBQUU7SUFDcEQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDdkQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDO0lBRTFELElBQUksQ0FBQyxRQUFRO1FBQUUsVUFBVSxHQUFHLEdBQUcsQ0FBQzs7UUFDM0IsVUFBVSxHQUFHLFFBQVEsQ0FBQztJQUUzQixPQUFPO1FBQ0wsT0FBTztRQUNQLElBQUksRUFBRSxVQUFVO1FBQ2hCLEtBQUssRUFBRSxJQUFJO0tBQ1osQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQWUsRUFBRSxFQUFFO0lBQ3JDLE9BQU87UUFDTCxPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLEdBQUc7UUFDVCxNQUFNO0tBQ1AsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDIn0=