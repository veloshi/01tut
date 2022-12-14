const apirequest = async (url ='', optionsObj = null ,errMsg = null) =>
{
try{
const response = await fetch(url,optionsObj);
if ( !response.ok) throw Error('Please reload teh app');
}
catch(err){
    errMsg = err.message;
    //console.log(err.msg)
}
finally{
 return errMsg;
}
}

export default apirequest