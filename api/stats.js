const {list,get}=require('@vercel/blob');
const crypto=require('crypto');
const READ_BATCH_SIZE=10;
module.exports=async(req,res)=>{
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).end();
  try{
    const {id,key}=req.body||{};
    if(!/^[a-f0-9]{32}$/.test(id||'')||!/^[a-f0-9]{64}$/.test(key||''))return res.status(401).end();
    const box=await get('boxes/'+id+'/settings.json',{access:'private'});
    if(!box||box.statusCode!==200)return res.status(401).end();
    const {hash}=JSON.parse(await new Response(box.stream).text());
    const actual=crypto.createHash('sha256').update(key).digest(),expected=Buffer.from(hash,'hex');
    if(expected.length!==actual.length||!crypto.timingSafeEqual(actual,expected))return res.status(401).end();
    let count=0,cursor;const devices={mobile:0,tablet:0,desktop:0,unknown:0};
    do{
      const page=await list({prefix:'boxes/'+id+'/visits/',cursor,limit:100});
      for(let i=0;i<page.blobs.length;i+=READ_BATCH_SIZE){
        const entries=await Promise.all(page.blobs.slice(i,i+READ_BATCH_SIZE).map(async blob=>{
          const value=await get(blob.pathname,{access:'private'});
          return value?.statusCode===200?JSON.parse(await new Response(value.stream).text()):null;
        }));
        for(const item of entries){if(item){if(Object.hasOwn(devices,item.device))devices[item.device]++;count++}}
      }
      cursor=page.hasMore?page.cursor:undefined;
    }while(cursor);
    return res.json({visits:count,devices});
  }catch(e){return res.status(500).end()}
};
