import * as actionTypes from '../consts/HomeConst'

export const setLocale = (data)=>{
    return {
        type:actionTypes.ENLOCALE,
        data
    }
}
