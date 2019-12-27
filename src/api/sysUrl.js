//文件\图片 上传地址获取,

export default function(str) {
  let path='oss/';
  let path2='base/base/';
  const sys = {
    url: {
      PUBLICFORMUPLOAD: path2+"oss/aliyun_public_form_upload", //图片上传
      PROVINCES:path2+"china_area/provinces",//获取省市
      CITIES:path2+"china_area/cities",//获取城市
      AREAS:path2+"china_area/areas",//获取区县
    }
  }
  let url = sys.url[str] || null
  if (url) url = `${url}`;
  return url;
}