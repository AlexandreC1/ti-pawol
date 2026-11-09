const {get}=require('@vercel/blob');
const crypto=require('crypto');
async function authenticate(id,key){if(!/^[a-f0-9]{32}$/.test(id||'')||!/^[a-f0-9]{64}$/.test(key||''))return false;const box=await get('boxes/'+id+'/settings.json',{access:'private'});if(!box||box.statusCode!==200)return false;const {hash}=JSON.parse(await new Response(box.stream).text());const expected=Buffer.from(hash,'hex'),actual=crypto.createHash('sha256').update(key).digest();return expected.length===actual.length&&crypto.timingSafeEqual(expected,actual)}
module.exports={authenticate};
